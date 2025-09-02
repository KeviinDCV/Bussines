<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Show the login form
     */
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle login request
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Rate limiting
        $key = 'login.' . $request->ip();
        $maxAttempts = 5;
        $decayMinutes = 2;

        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($key);
            $minutes = ceil($seconds / 60);
            
            return back()->withErrors([
                'email' => "Demasiados intentos de login. Intenta nuevamente en {$minutes} minutos.",
            ]);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            RateLimiter::hit($key, $decayMinutes * 60);
            
            return back()->withErrors([
                'email' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
            ]);
        }

        if (!$user->is_active) {
            return back()->withErrors([
                'email' => 'Su cuenta está desactivada. Contacte al administrador.',
            ]);
        }

        // Clear rate limiter on successful login
        RateLimiter::clear($key);
        
        Auth::login($user);

        // Redirect based on role
        return $this->redirectBasedOnRole($user->role);
    }

    /**
     * Handle logout
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    /**
     * Redirect user based on their role
     */
    private function redirectBasedOnRole(string $role)
    {
        return match ($role) {
            'Asistenciales' => redirect()->route('dashboard.asistenciales'),
            'Administrativos' => redirect()->route('dashboard.administrativos'),
            'Direccionamiento' => redirect()->route('dashboard.direccionamiento'),
            'Financieros' => redirect()->route('dashboard.financieros'),
            'Administrador' => redirect()->route('dashboard.administrador'),
            default => redirect()->route('dashboard'),
        };
    }
}
