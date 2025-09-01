<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class RateLimitLogin
{
    /**
     * Handle an incoming request.
     * Implementa rate limiting para intentos de login
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('POST') && $request->is('login')) {
            $key = 'login_attempts:' . $request->ip();
            
            // Permitir máximo 5 intentos por IP cada 15 minutos
            if (RateLimiter::tooManyAttempts($key, 5)) {
                $seconds = RateLimiter::availableIn($key);
                
                return response()->json([
                    'message' => 'Demasiados intentos de login. Intenta nuevamente en ' . ceil($seconds / 60) . ' minutos.',
                    'errors' => ['email' => ['Cuenta temporalmente bloqueada por seguridad.']]
                ], 429);
            }
            
            // Incrementar contador de intentos
            RateLimiter::hit($key, 900); // 15 minutos
        }

        return $next($request);
    }
}
