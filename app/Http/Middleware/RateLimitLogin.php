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
                $minutes = ceil($seconds / 60);
                
                // Para peticiones Inertia, devolver redirect con errores
                if ($request->header('X-Inertia')) {
                    return redirect()->route('login')->withErrors([
                        'email' => "Demasiados intentos de login. Intenta nuevamente en {$minutes} minutos."
                    ]);
                }
                
                // Para peticiones AJAX normales
                return response()->json([
                    'message' => "Demasiados intentos de login. Intenta nuevamente en {$minutes} minutos.",
                    'errors' => ['email' => ['Cuenta temporalmente bloqueada por seguridad.']]
                ], 429);
            }
            
            // Incrementar contador de intentos antes de procesar
            RateLimiter::hit($key, 900); // 15 minutos
        }

        $response = $next($request);
        
        // Si el login fue exitoso (redirección a dashboard), limpiar el rate limiter
        if ($request->isMethod('POST') && $request->is('login') && $response->isRedirection()) {
            $redirectUrl = $response->headers->get('Location');
            // Si no es redirección de vuelta al login, significa que fue exitoso
            if ($redirectUrl && !str_contains($redirectUrl, '/login')) {
                $key = 'login_attempts:' . $request->ip();
                RateLimiter::clear($key);
            }
        }

        return $response;
    }
}
