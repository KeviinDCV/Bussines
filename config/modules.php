<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Module Caching Configuration
    |--------------------------------------------------------------------------
    |
    | These options control how modules are cached in the application.
    | In production environments, caching can cause delays in module updates.
    | Set cache_enabled to false to disable module caching entirely.
    |
    */

    'cache_enabled' => env('MODULES_CACHE_ENABLED', false),
    
    'cache_ttl' => env('MODULES_CACHE_TTL', 0),
    
    /*
    |--------------------------------------------------------------------------
    | Force Fresh Queries
    |--------------------------------------------------------------------------
    |
    | When enabled, this will force all module queries to fetch fresh data
    | from the database, bypassing any potential caching layers.
    | Useful for production environments with caching issues.
    |
    */
    
    'force_fresh' => env('MODULES_FORCE_FRESH', true),
    
    /*
    |--------------------------------------------------------------------------
    | Auto Clear Cache
    |--------------------------------------------------------------------------
    |
    | When enabled, caches will be automatically cleared after any module
    | create, update, or delete operation to ensure immediate visibility.
    |
    */
    
    'auto_clear_cache' => env('MODULES_AUTO_CLEAR_CACHE', true),

];