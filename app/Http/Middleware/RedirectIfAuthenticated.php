<?php

namespace App\Http\Middleware;

use App\Http\Controllers\DashboardController;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // Redirigir al dashboard correspondiente según el rol del usuario
                $user = Auth::user();
                
                switch ($user->role) {
                    case 'Asistenciales':
                        return redirect()->route('dashboard.asistenciales');
                    case 'Administrativos':
                        return redirect()->route('dashboard.administrativos');
                    case 'Direccionamiento':
                        return redirect()->route('dashboard.direccionamiento');
                    case 'Financieros':
                        return redirect()->route('dashboard.financieros');
                    case 'Administrador':
                        return redirect()->route('dashboard.administrador');
                    default:
                        return redirect()->route('dashboard');
                }
            }
        }

        return $next($request);
    }
}
