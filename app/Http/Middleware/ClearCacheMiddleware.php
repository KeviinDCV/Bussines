<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ClearCacheMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Only clear cache for dashboard routes in production
        if (app()->environment('production') && str_contains($request->path(), 'dashboard/')) {
            try {
                // Clear specific cache keys that might affect module loading
                $cacheKeys = [
                    'modules_' . $request->user()?->role,
                    'dashboard_modules_' . $request->user()?->role,
                    'user_modules_' . $request->user()?->id,
                ];
                
                foreach ($cacheKeys as $key) {
                    Cache::forget($key);
                }
                
                // Clear OPcache if available
                if (function_exists('opcache_reset')) {
                    opcache_reset();
                }
                
                Log::info('Cache cleared for dashboard request: ' . $request->path());
                
            } catch (\Exception $e) {
                Log::warning('Failed to clear cache in middleware: ' . $e->getMessage());
            }
        }
        
        return $next($request);
    }
}