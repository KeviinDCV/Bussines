<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateStrict
{
    /**
     * Handle an incoming request.
     * Protege TODAS las rutas excepto login - redirección inmediata para usuarios no autenticados
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar si el usuario está autenticado
        if (!Auth::check()) {
            // Si es una petición AJAX/Inertia, devolver error 401
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                return response()->json(['message' => 'No autenticado'], 401);
            }
            
            // Redirección inmediata al login para cualquier otra petición
            return redirect()->route('login');
        }

        // Verificar que la sesión sea válida y el usuario exista
        $user = Auth::user();
        if (!$user || !$user->exists) {
            Auth::logout();
            return redirect()->route('login');
        }

        // Verificar que el usuario esté activo
        if (isset($user->status) && $user->status !== 'active') {
            Auth::logout();
            return redirect()->route('login')->with('error', 'Tu cuenta ha sido desactivada. Contacta al administrador.');
        }

        return $next($request);
    }
}
