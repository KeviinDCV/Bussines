<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuditLogger
{
    /**
     * Handle an incoming request.
     * Registra actividades de seguridad para auditoría
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Registrar eventos de seguridad críticos
        if (Auth::check()) {
            $user = Auth::user();
            
            // Log de acceso a áreas sensibles
            if ($request->is('admin/*') || $request->is('dashboard/*')) {
                Log::channel('security')->info('Acceso a área protegida', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'role' => $user->role,
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'timestamp' => now()->toISOString()
                ]);
            }
            
            // Log de operaciones administrativas
            if ($request->is('admin/*') && in_array($request->method(), ['POST', 'PATCH', 'DELETE'])) {
                Log::channel('security')->warning('Operación administrativa', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'action' => $request->method(),
                    'url' => $request->fullUrl(),
                    'ip' => $request->ip(),
                    'data' => $request->except(['password', '_token']),
                    'timestamp' => now()->toISOString()
                ]);
            }
        }

        // Log de intentos de acceso no autorizados
        if (!Auth::check() && !$request->is('login') && !$request->is('/')) {
            Log::channel('security')->warning('Intento de acceso no autorizado', [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'timestamp' => now()->toISOString()
            ]);
        }

        return $response;
    }
}
