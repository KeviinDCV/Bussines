<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SessionTimeout
{
    /**
     * Handle an incoming request.
     * Implementa timeout automático de sesión para seguridad de datos confidenciales
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $lastActivity = Session::get('last_activity');
            $timeout = config('session.lifetime') * 60; // Convertir minutos a segundos
            
            if ($lastActivity && (time() - $lastActivity) > $timeout) {
                Auth::logout();
                Session::flush();
                
                if ($request->expectsJson() || $request->header('X-Inertia')) {
                    return response()->json(['message' => 'Sesión expirada por inactividad'], 401);
                }
                
                return redirect()->route('login')->with('warning', 'Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.');
            }
            
            // Actualizar última actividad
            Session::put('last_activity', time());
        }

        return $next($request);
    }
}
