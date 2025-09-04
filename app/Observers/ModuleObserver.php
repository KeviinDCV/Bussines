<?php

namespace App\Observers;

use App\Models\Module;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class ModuleObserver
{
    /**
     * Handle the Module "created" event.
     */
    public function created(Module $module): void
    {
        $this->clearModuleCaches('created', $module);
    }

    /**
     * Handle the Module "updated" event.
     */
    public function updated(Module $module): void
    {
        $this->clearModuleCaches('updated', $module);
    }

    /**
     * Handle the Module "deleted" event.
     */
    public function deleted(Module $module): void
    {
        $this->clearModuleCaches('deleted', $module);
    }

    /**
     * Clear all caches when module changes occur
     */
    private function clearModuleCaches(string $action, Module $module): void
    {
        // Only clear caches if auto_clear_cache is enabled
        if (!config('modules.auto_clear_cache', true)) {
            return;
        }

        try {
            // Clear Laravel application cache
            Cache::flush();
            
            // Clear specific Laravel caches
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('view:clear');
            
            Log::info("Module caches cleared after {$action} operation", [
                'module_id' => $module->id,
                'module_name' => $module->name,
                'module_role' => $module->role,
                'action' => $action
            ]);
        } catch (\Exception $e) {
            Log::warning("Failed to clear caches after {$action} operation", [
                'module_id' => $module->id,
                'module_name' => $module->name,
                'error' => $e->getMessage()
            ]);
        }
    }
}