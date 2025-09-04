<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Module;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

class DiagnosticController extends Controller
{
    public function diagnoseModules(Request $request)
    {
        $role = $request->get('role', 'Administrativos');
        
        $results = [
            'timestamp' => now()->toDateTimeString(),
            'role' => $role,
            'environment' => app()->environment(),
            'debug_mode' => config('app.debug'),
            'cache_driver' => config('cache.default'),
        ];
        
        // Clear caches
        try {
            Cache::flush();
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('view:clear');
            Artisan::call('route:clear');
            
            if (function_exists('opcache_reset')) {
                opcache_reset();
                $results['opcache_cleared'] = true;
            }
            
            $results['caches_cleared'] = true;
        } catch (\Exception $e) {
            $results['cache_error'] = $e->getMessage();
        }
        
        // Check database directly
        try {
            $rawModules = DB::select("
                SELECT id, name, display_name, role, route, active, created_at, updated_at 
                FROM modules 
                WHERE role = ? AND active = 1 AND parent_id IS NULL 
                ORDER BY `order`
            ", [$role]);
            
            $results['database_modules'] = array_map(function($module) {
                return [
                    'id' => $module->id,
                    'name' => $module->name,
                    'display_name' => $module->display_name,
                    'route' => $module->route,
                    'created_at' => $module->created_at,
                    'updated_at' => $module->updated_at,
                ];
            }, $rawModules);
            
            $results['database_count'] = count($rawModules);
        } catch (\Exception $e) {
            $results['database_error'] = $e->getMessage();
        }
        
        // Check Eloquent
        try {
            DB::enableQueryLog();
            
            $eloquentModules = Module::with('children')
                ->forRole($role)
                ->rootModules()
                ->where('active', true)
                ->orderBy('order')
                ->get();
                
            $queries = DB::getQueryLog();
            DB::disableQueryLog();
            
            $results['eloquent_modules'] = $eloquentModules->map(function($module) {
                return [
                    'id' => $module->id,
                    'name' => $module->name,
                    'display_name' => $module->display_name,
                    'route' => $module->route,
                    'created_at' => $module->created_at,
                    'updated_at' => $module->updated_at,
                ];
            });
            
            $results['eloquent_count'] = $eloquentModules->count();
            $results['queries_executed'] = $queries;
            
        } catch (\Exception $e) {
            $results['eloquent_error'] = $e->getMessage();
        }
        
        // Check recent modules
        try {
            $recentModules = DB::select("
                SELECT id, name, display_name, created_at 
                FROM modules 
                WHERE role = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 DAY)
            ", [$role]);
            
            $results['recent_modules'] = array_map(function($module) {
                return [
                    'id' => $module->id,
                    'name' => $module->name,
                    'display_name' => $module->display_name,
                    'created_at' => $module->created_at,
                ];
            }, $recentModules);
            
        } catch (\Exception $e) {
            $results['recent_modules_error'] = $e->getMessage();
        }
        
        // Check routes file
        try {
            $routeFile = base_path('routes/web.php');
            if (file_exists($routeFile)) {
                $routeContent = file_get_contents($routeFile);
                $roleRoute = strtolower($role);
                $routeCount = substr_count($routeContent, "/{$roleRoute}/");
                
                $results['routes_file_exists'] = true;
                $results['routes_count'] = $routeCount;
                $results['routes_file_size'] = filesize($routeFile);
                $results['routes_file_modified'] = date('Y-m-d H:i:s', filemtime($routeFile));
            } else {
                $results['routes_file_exists'] = false;
            }
        } catch (\Exception $e) {
            $results['routes_error'] = $e->getMessage();
        }
        
        // Test cache functionality
        try {
            $testKey = 'diagnostic_test_' . time();
            Cache::put($testKey, 'test_value', 60);
            $testValue = Cache::get($testKey);
            Cache::forget($testKey);
            
            $results['cache_working'] = ($testValue === 'test_value');
        } catch (\Exception $e) {
            $results['cache_test_error'] = $e->getMessage();
        }
        
        return response()->json($results, 200, [], JSON_PRETTY_PRINT);
    }
    
    public function forceRefreshModules(Request $request)
    {
        $role = $request->get('role', 'Administrativos');
        
        try {
            // Nuclear cache clear
            Cache::flush();
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('view:clear');
            Artisan::call('route:clear');
            
            if (function_exists('opcache_reset')) {
                opcache_reset();
            }
            
            // Force fresh query
            $modules = Module::with('children')
                ->forRole($role)
                ->rootModules()
                ->where('active', true)
                ->orderBy('order')
                ->get()
                ->fresh();
            
            return response()->json([
                'success' => true,
                'message' => 'Cache limpiado y módulos refrescados',
                'modules_count' => $modules->count(),
                'modules' => $modules->map(function($module) {
                    return [
                        'id' => $module->id,
                        'name' => $module->name,
                        'display_name' => $module->display_name,
                        'route' => $module->route,
                    ];
                })
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}