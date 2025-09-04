<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Module;
use Illuminate\Support\Facades\Cache;

class VerifyModuleSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'modules:verify-sync {role?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verify module synchronization between admin and user views';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $role = $this->argument('role');
        
        if ($role) {
            $this->verifyRoleModules($role);
        } else {
            $roles = ['Administrativos', 'Direccionamiento', 'Financieros', 'Asistenciales', 'Calidad'];
            foreach ($roles as $role) {
                $this->verifyRoleModules($role);
            }
        }
    }

    private function verifyRoleModules($role)
    {
        $this->info("Verificando módulos para el rol: {$role}");
        
        // Clear cache first
        Cache::flush();
        
        // Get modules from database
        $modules = Module::with('children')
            ->forRole($role)
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();
            
        $this->info("Módulos encontrados: " . $modules->count());
        
        foreach ($modules as $module) {
            $this->line("- {$module->display_name} (ID: {$module->id}, Route: {$module->route})");
        }
        
        // Verify routes exist
        $routeFile = base_path('routes/web.php');
        $routeContent = file_get_contents($routeFile);
        
        foreach ($modules as $module) {
            if ($module->route && !str_contains($routeContent, $module->route)) {
                $this->warn("⚠️  Ruta no encontrada en web.php: {$module->route}");
            } else {
                $this->info("✅ Ruta verificada: {$module->route}");
            }
        }
        
        $this->newLine();
    }
}