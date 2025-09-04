<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Role;
use App\Services\ModuleGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class ModuleController extends Controller
{
    protected $moduleGenerator;

    public function __construct(ModuleGeneratorService $moduleGenerator)
    {
        $this->moduleGenerator = $moduleGenerator;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modules = Module::with(['role', 'parent', 'children'])
            ->rootModules()
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Modules/Index', [
            'modules' => $modules
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:modules,name',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:255',
            'route' => 'nullable|string|max:255|unique:modules,route',
            'role' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:modules,id',
            'order' => 'nullable|integer|min:0'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Crear el módulo en la base de datos
        $module = Module::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description ?? 'Módulo del sistema de ' . strtolower($request->role),
            'icon' => $request->icon ?? 'FileText',
            'route' => $request->route,
            'role' => $request->role,
            'parent_id' => $request->parent_id,
            'order' => $request->order ?? 0,
            'active' => true
        ]);

        // Generar archivos automáticamente
        try {
            $this->moduleGenerator->generateModuleFiles($module);
            Log::info("Módulo creado exitosamente con archivos generados: {$module->name}");
        } catch (\Exception $e) {
            Log::error("Error generando archivos para el módulo {$module->name}: " . $e->getMessage());
            // No fallar la creación del módulo, solo registrar el error
        }

        // Clear caches to ensure immediate visibility in production
        $this->clearModuleCaches();

        return back()->with('success', 'Módulo creado exitosamente con página y ruta generadas automáticamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Module $module)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:255',
            'route' => 'nullable|string|max:255',
            'role' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:modules,id',
            'order' => 'nullable|integer|min:0',
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $module->update([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
            'icon' => $request->icon ?? 'FileText',
            'route' => $request->route,
            'role' => $request->role,
            'parent_id' => $request->parent_id,
            'order' => $request->order ?? 0,
            'active' => $request->active ?? true
        ]);

        // Clear caches to ensure immediate visibility in production
        $this->clearModuleCaches();

        return back()->with('success', 'Módulo actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        // Eliminar archivos generados
        try {
            $this->moduleGenerator->deleteModuleFiles($module);
            Log::info("Archivos eliminados para el módulo: {$module->name}");
        } catch (\Exception $e) {
            Log::error("Error eliminando archivos del módulo {$module->name}: " . $e->getMessage());
            // Continuar con la eliminación del módulo aunque falle la limpieza de archivos
        }

        $module->delete();
        
        // Clear caches to ensure immediate visibility in production
        $this->clearModuleCaches();
        
        return back()->with('success', 'Módulo eliminado exitosamente');
    }

    /**
     * Get modules for a specific role
     */
    public function getModulesForRole(Request $request)
    {
        $roleName = $request->get('role');
        
        if (!$roleName) {
            return response()->json(['modules' => []]);
        }

        $modules = Module::with('children')
            ->forRole($roleName)
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return response()->json(['modules' => $modules]);
    }

    /**
     * Clear all caches to ensure immediate visibility of module changes in production
     */
    private function clearModuleCaches()
    {
        try {
            // Clear Laravel application cache
            Cache::flush();
            
            // Clear specific Laravel caches
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('view:clear');
            
            Log::info('Module caches cleared successfully');
        } catch (\Exception $e) {
            Log::warning('Failed to clear some caches: ' . $e->getMessage());
        }
    }
}
