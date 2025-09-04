<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Module;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DiagnoseModuleIssue extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'modules:diagnose {role?}';

    /**
     * The console command description.
     */
    protected $description = 'Diagnose module synchronization issues in production';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 DIAGNÓSTICO COMPLETO DE MÓDULOS');
        $this->newLine();

        // Clear all caches first
        $this->info('1. Limpiando todos los caches...');
        $this->clearAllCaches();
        
        $role = $this->argument('role') ?? 'Administrativos';
        
        $this->info("2. Analizando rol: {$role}");
        $this->newLine();

        // Check database directly
        $this->checkDatabase($role);
        
        // Check Eloquent queries
        $this->checkEloquentQueries($role);
        
        // Check routes
        $this->checkRoutes($role);
        
        // Check file system
        $this->checkFileSystem($role);
        
        // Environment info
        $this->checkEnvironment();
    }

    private function clearAllCaches()
    {
        try {
            Cache::flush();
            \Artisan::call('cache:clear');
            \Artisan::call('config:clear');
            \Artisan::call('view:clear');
            \Artisan::call('route:clear');
            
            if (function_exists('opcache_reset')) {
                opcache_reset();
                $this->info('   ✅ OPcache limpiado');
            }
            
            $this->info('   ✅ Todos los caches limpiados');
        } catch (\Exception $e) {
            $this->error('   ❌ Error limpiando caches: ' . $e->getMessage());
        }
        $this->newLine();
    }

    private function checkDatabase($role)
    {
        $this->info('📊 VERIFICACIÓN DE BASE DE DATOS');
        
        // Raw SQL query
        $rawModules = DB::select("
            SELECT id, name, display_name, role, route, active, created_at, updated_at 
            FROM modules 
            WHERE role = ? AND active = 1 AND parent_id IS NULL 
            ORDER BY `order`
        ", [$role]);
        
        $this->info("   Módulos en BD (SQL directo): " . count($rawModules));
        
        foreach ($rawModules as $module) {
            $this->line("   - {$module->display_name} (ID: {$module->id}) - Creado: {$module->created_at}");
        }
        
        // Check for recent modules
        $recentModules = DB::select("
            SELECT id, name, display_name, created_at 
            FROM modules 
            WHERE role = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 DAY)
        ", [$role]);
        
        if (count($recentModules) > 0) {
            $this->info("   📅 Módulos creados en las últimas 24h: " . count($recentModules));
            foreach ($recentModules as $module) {
                $this->line("   - {$module->display_name} - {$module->created_at}");
            }
        }
        
        $this->newLine();
    }

    private function checkEloquentQueries($role)
    {
        $this->info('🔍 VERIFICACIÓN DE CONSULTAS ELOQUENT');
        
        // Enable query logging
        DB::enableQueryLog();
        
        // Test the exact query used in DashboardController
        $modules = Module::with('children')
            ->forRole($role)
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();
            
        $queries = DB::getQueryLog();
        
        $this->info("   Módulos encontrados por Eloquent: " . $modules->count());
        $this->info("   Consultas ejecutadas: " . count($queries));
        
        foreach ($queries as $query) {
            $this->line("   SQL: " . $query['query']);
            $this->line("   Bindings: " . json_encode($query['bindings']));
        }
        
        foreach ($modules as $module) {
            $this->line("   - {$module->display_name} (ID: {$module->id})");
        }
        
        DB::disableQueryLog();
        $this->newLine();
    }

    private function checkRoutes($role)
    {
        $this->info('🛣️  VERIFICACIÓN DE RUTAS');
        
        $routeFile = base_path('routes/web.php');
        if (!file_exists($routeFile)) {
            $this->error("   ❌ Archivo de rutas no encontrado: {$routeFile}");
            return;
        }
        
        $routeContent = file_get_contents($routeFile);
        $roleRoute = strtolower($role);
        
        // Count routes for this role
        $routeCount = substr_count($routeContent, "/{$roleRoute}/");
        $this->info("   Rutas encontradas para {$role}: {$routeCount}");
        
        // Check for recent route additions
        $lines = explode("\n", $routeContent);
        $recentRoutes = [];
        
        foreach ($lines as $lineNum => $line) {
            if (str_contains($line, "/{$roleRoute}/") && str_contains($line, 'Route::get')) {
                $recentRoutes[] = "Línea " . ($lineNum + 1) . ": " . trim($line);
            }
        }
        
        foreach ($recentRoutes as $route) {
            $this->line("   - {$route}");
        }
        
        $this->newLine();
    }

    private function checkFileSystem($role)
    {
        $this->info('📁 VERIFICACIÓN DE ARCHIVOS');
        
        $componentDir = resource_path("js/pages/" . $role);
        
        if (is_dir($componentDir)) {
            $files = scandir($componentDir);
            $tsxFiles = array_filter($files, fn($file) => str_ends_with($file, '.tsx'));
            
            $this->info("   Componentes encontrados en {$componentDir}: " . count($tsxFiles));
            foreach ($tsxFiles as $file) {
                $filePath = $componentDir . '/' . $file;
                $modTime = date('Y-m-d H:i:s', filemtime($filePath));
                $this->line("   - {$file} (Modificado: {$modTime})");
            }
        } else {
            $this->warn("   ⚠️  Directorio no encontrado: {$componentDir}");
        }
        
        $this->newLine();
    }

    private function checkEnvironment()
    {
        $this->info('🌍 INFORMACIÓN DEL ENTORNO');
        
        $this->line("   Entorno: " . app()->environment());
        $this->line("   Debug: " . (config('app.debug') ? 'Activado' : 'Desactivado'));
        $this->line("   Cache Driver: " . config('cache.default'));
        $this->line("   Session Driver: " . config('session.driver'));
        
        // Check if we're in production
        if (app()->environment('production')) {
            $this->warn("   ⚠️  ENTORNO DE PRODUCCIÓN DETECTADO");
            $this->line("   - Verificar configuración de cache");
            $this->line("   - Verificar permisos de archivos");
            $this->line("   - Verificar OPcache");
        }
        
        // Check cache status
        try {
            Cache::put('test_key', 'test_value', 60);
            $testValue = Cache::get('test_key');
            if ($testValue === 'test_value') {
                $this->info("   ✅ Cache funcionando correctamente");
            } else {
                $this->error("   ❌ Cache no funciona correctamente");
            }
            Cache::forget('test_key');
        } catch (\Exception $e) {
            $this->error("   ❌ Error probando cache: " . $e->getMessage());
        }
        
        $this->newLine();
    }
}