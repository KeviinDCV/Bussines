<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     * Añade headers de seguridad para proteger datos confidenciales
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Headers de seguridad para datos confidenciales
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        
        // Content Security Policy adaptada para desarrollo y producción
        $isDevelopment = app()->environment('local');
        
        if ($isDevelopment) {
            // CSP más permisiva para desarrollo con Vite
            $csp = "default-src 'self'; " .
                   "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 http://127.0.0.1:5173 http://192.168.2.202:5173 ws://localhost:5173 ws://127.0.0.1:5173 ws://192.168.2.202:5173 https://*.google.com https://*.gstatic.com; " .
                   "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://*.google.com https://*.gstatic.com; " .
                   "img-src 'self' data: blob: https://*.google.com https://*.gstatic.com; " .
                   "font-src 'self' https://fonts.bunny.net https://*.google.com https://*.gstatic.com; " .
                   "connect-src 'self' http://localhost:5173 http://127.0.0.1:5173 http://192.168.2.202:5173 ws://localhost:5173 ws://127.0.0.1:5173 ws://192.168.2.202:5173 https://*.google.com https://*.googleapis.com; " .
                   "frame-src 'self' https://app.powerbi.com https://*.powerbi.com https://lookerstudio.google.com https://*.google.com; " .
                   "frame-ancestors 'none'; " .
                   "base-uri 'self'; " .
                   "form-action 'self'";
        } else {
            // CSP estricta para producción
            $csp = "default-src 'self'; " .
                   "script-src 'self' 'unsafe-inline' https://*.google.com https://*.gstatic.com; " .
                   "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://*.google.com https://*.gstatic.com; " .
                   "img-src 'self' data: blob: https://*.google.com https://*.gstatic.com; " .
                   "font-src 'self' https://fonts.bunny.net https://*.google.com https://*.gstatic.com; " .
                   "connect-src 'self' https://*.google.com https://*.googleapis.com; " .
                   "frame-src 'self' https://app.powerbi.com https://*.powerbi.com https://lookerstudio.google.com https://*.google.com; " .
                   "frame-ancestors 'none'; " .
                   "base-uri 'self'; " .
                   "form-action 'self'";
        }
        
        $response->headers->set('Content-Security-Policy', $csp);

        // Prevenir cache de TODAS las páginas protegidas (crítico para seguridad)
        if (!$request->is('login') && !$request->is('/')) {
            $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');
            $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s') . ' GMT');
        }

        return $response;
    }
}
