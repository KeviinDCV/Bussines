<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventBackHistory
{
    /**
     * Handle an incoming request.
     * Previene el acceso a páginas mediante botón atrás del navegador después del logout
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Headers para prevenir cache y acceso mediante botón atrás
        $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', 'Sat, 26 Jul 1997 05:00:00 GMT');
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s') . ' GMT');
        
        // Header adicional para forzar revalidación
        $response->headers->set('Vary', 'Cookie');

        return $response;
    }
}
