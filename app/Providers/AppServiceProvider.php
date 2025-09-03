<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure remember token duration
        $this->configureRememberTokenDuration();
    }

    /**
     * Configure the remember token duration.
     */
    protected function configureRememberTokenDuration(): void
    {
        // Set remember token duration from config (default 1 year)
        $duration = config('auth.remember_duration', 525600); // minutes
        
        // Configure the remember token lifetime
        config(['session.remember_duration' => $duration]);
    }
}
