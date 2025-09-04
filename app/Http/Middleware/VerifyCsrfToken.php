<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/logout',  // Exclude logout route from CSRF verification
        // 'admin/users/*',  // REMOVED: Restoring CSRF protection for user management
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, $next)
    {
        // Debug CSRF for logout requests - TEMPORARY
        if ($request->isMethod('POST') && $request->is('logout')) {
            Log::info('CSRF Debug - Logout Request', [
                'url' => $request->url(),
                'method' => $request->method(),
                'has_csrf_header' => $request->hasHeader('X-CSRF-TOKEN'),
                'csrf_header_value' => $request->header('X-CSRF-TOKEN') ? substr($request->header('X-CSRF-TOKEN'), 0, 20) . '...' : 'missing',
                'session_token' => $request->session()->token() ? substr($request->session()->token(), 0, 20) . '...' : 'missing',
                'tokens_match' => $request->header('X-CSRF-TOKEN') === $request->session()->token(),
                'excluded' => in_array('logout', $this->except) || in_array('/logout', $this->except),
                'except_array' => $this->except,
                'user_agent' => $request->userAgent(),
                'content_type' => $request->header('Content-Type'),
                'x_requested_with' => $request->header('X-Requested-With'),
            ]);
        }

        
        // Debug CSRF for user updates - TEMPORARY
        if ($request->isMethod('PATCH') && $request->is('admin/users/*')) {
            Log::info('CSRF Debug - User Update Request', [
                'url' => $request->url(),
                'method' => $request->method(),
                'has_csrf_header' => $request->hasHeader('X-CSRF-TOKEN'),
                'csrf_header_value' => $request->header('X-CSRF-TOKEN') ? substr($request->header('X-CSRF-TOKEN'), 0, 20) . '...' : 'missing',
                'session_token' => $request->session()->token() ? substr($request->session()->token(), 0, 20) . '...' : 'missing',
                'tokens_match' => $request->header('X-CSRF-TOKEN') === $request->session()->token(),
                'user_agent' => $request->userAgent(),
                'content_type' => $request->header('Content-Type'),
                'x_requested_with' => $request->header('X-Requested-With'),
                'all_headers' => $request->headers->all(),
            ]);
        }
        
        return parent::handle($request, $next);
    }
}