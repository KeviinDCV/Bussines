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

        // Force a complete page reload to ensure CSRF token is updated in DOM
        // This prevents CSRF token mismatch after login
        $redirectUrl = $this->getRedirectUrlBasedOnRole($user->role);
        
        return Inertia::location($redirectUrl);
    }

    /**
     * Handle logout
     */
    public function logout(Request $request)
    {
        $user = Auth::user();
        
        \Log::info('Logout initiated', [
            'user_id' => $user?->id,
            'user_name' => $user?->name,
            'user_role' => $user?->role,
            'session_id' => $request->session()->getId(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);
        
        try {
            // Clear remember token if exists
            if ($user && $user->remember_token) {
                $user->remember_token = null;
                $user->save();
                \Log::info('Remember token cleared', ['user_id' => $user->id]);
            }
            
            // Clear user authentication
            Auth::logout();
            
            // Invalidate session
            $request->session()->invalidate();
            
            // Regenerate CSRF token
            $request->session()->regenerateToken();
            
            \Log::info('Logout completed successfully', [
                'user_id' => $user?->id,
                'ip' => $request->ip()
            ]);

            // Always redirect for Inertia - never return JSON
            return redirect()->route('login');
            
        } catch (\Exception $e) {
            \Log::error('Logout failed', [
                'user_id' => $user?->id,
                'error' => $e->getMessage(),
                'ip' => $request->ip()
            ]);
            
            // Even if logout fails, redirect to login
            return redirect()->route('login');
        }
    }

    /**
     * Get redirect URL based on user role
     */
    private function getRedirectUrlBasedOnRole(string $role): string
    {
        return match ($role) {
            'Asistenciales' => route('dashboard.asistenciales'),
            'Administrativos' => route('dashboard.administrativos'),
            'Direccionamiento' => route('dashboard.direccionamiento'),
            'Financieros' => route('dashboard.financieros'),
            'Administrador' => route('dashboard.administrador'),
            'Calidad' => route('dashboard.calidad'),
            'Gerencia' => route('dashboard.gerencia'),
            default => route('dashboard.general'),
        };
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
            'Calidad' => redirect()->route('dashboard.calidad'),
            'Gerencia' => redirect()->route('dashboard.gerencia'),
            default => redirect()->route('dashboard.general'),
        };
    }
}
