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
        // Log CSRF middleware usage for debugging
        if ($request->isMethod('POST') && $request->is('logout')) {
            Log::info('Custom CSRF middleware processing /logout request', [
                'url' => $request->url(),
                'method' => $request->method(),
                'excluded' => in_array('logout', $this->except) || in_array('/logout', $this->except),
                'except_array' => $this->except
            ]);
        }

        return parent::handle($request, $next);
    }
}