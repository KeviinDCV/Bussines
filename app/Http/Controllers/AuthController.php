<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
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
        // Log para depuración
        \Log::info('Login attempt', [
            'email' => $request->input('email'),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);

        $request->validate([
            'email' => 'required|string',
            'password' => 'required',
            'remember' => 'boolean',
        ]);



        // Determine if input is email or username
        $login = $request->input('email');
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        
        \Log::info('Login field determined', [
            'login' => $login,
            'field' => $field
        ]);
        
        // Attempt authentication with remember option
        $credentials = [$field => $login, 'password' => $request->input('password')];
        $remember = $request->boolean('remember', false);
        
        \Log::info('Authentication attempt', [
            'field' => $field,
            'login' => $login,
            'remember' => $remember
        ]);
        
        if (!Auth::attempt($credentials, $remember)) {
            \Log::warning('Login failed', [
                'field' => $field,
                'login' => $login,
                'ip' => $request->ip()
            ]);
            
            return redirect()->route('login')->withErrors([
                'email' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
            ])->withInput($request->only('email'));
        }

        // Check if user is active
        $user = Auth::user();
        
        \Log::info('Login successful', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_role' => $user->role,
            'is_active' => $user->is_active
        ]);
        
        if (!$user->is_active) {
            Auth::logout();
            
            \Log::warning('Login blocked - inactive user', [
                'user_id' => $user->id,
                'user_name' => $user->name
            ]);
            
            return redirect()->route('login')->withErrors([
                'email' => 'Su cuenta está desactivada. Contacte al administrador.',
            ]);
        }

        // Clear rate limiter on successful login (handled by middleware)
        
        // Regenerate session
        $request->session()->regenerate();

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
