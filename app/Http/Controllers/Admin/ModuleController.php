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
            'order' => 'nullable|integer|min:0',
            'content_type' => 'nullable|in:module,powerbi',
            'powerbi_url' => 'nullable|required_if:content_type,powerbi|url',
            'powerbi_config' => 'nullable|array'
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
            'active' => true,
            'content_type' => $request->content_type ?? 'module',
            'powerbi_url' => $request->powerbi_url,
            'powerbi_config' => $request->powerbi_config
        ]);

        // Generar archivos automáticamente solo si es un módulo regular
        if ($module->content_type === 'module') {
            try {
                $this->moduleGenerator->generateModuleFiles($module);
                Log::info("Módulo creado exitosamente con archivos generados: {$module->name}");
            } catch (\Exception $e) {
                Log::error("Error generando archivos para el módulo {$module->name}: " . $e->getMessage());
                // No fallar la creación del módulo, solo registrar el error
            }
        } else {
            Log::info("Módulo Power BI creado exitosamente: {$module->name}");
        }

        // Clear caches to ensure immediate visibility in production
        $this->clearModuleCaches();

        return back()->with('success', 'Módulo creado exitosamente');
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
            'active' => 'boolean',
            'content_type' => 'nullable|in:module,powerbi',
            'powerbi_url' => 'nullable|required_if:content_type,powerbi|url',
            'powerbi_config' => 'nullable|array'
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
            'active' => $request->active ?? true,
            'content_type' => $request->content_type ?? 'module',
            'powerbi_url' => $request->powerbi_url,
            'powerbi_config' => $request->powerbi_config
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
     * Show a dynamic module with its submodules and content
     */
    public function showDynamicModule(Request $request, $role, $moduleName)
    {
        $user = auth()->user();
        
        // Buscar el módulo por nombre y rol
        $module = Module::with('children')
            ->where('name', $moduleName)
            ->forRole(ucfirst($role))
            ->where('active', true)
            ->first();
            
        if (!$module) {
            abort(404, 'Módulo no encontrado');
        }
        
        // Obtener submódulos (hijos) del módulo actual
        $submodules = Module::where('parent_id', $module->id)
            ->where('active', true)
            ->orderBy('display_name')
            ->get();
        
        // Verificar permisos para gestionar contenido
        $canManageContent = $user->role === 'Administrador';
        
        // Mapeo de nombres de dashboard
        $dashboardNames = [
            'calidad' => 'Dashboard Calidad',
            'administrativos' => 'Dashboard Administrativos',
            'asistenciales' => 'Dashboard Asistenciales', 
            'direccionamiento' => 'Dashboard Direccionamiento',
            'financieros' => 'Dashboard Financieros'
        ];
        
        // Generar URL del dashboard según el rol del usuario
        $dashboardUrl = '/dashboard/' . $role;
        if ($user->role === 'Administrador') {
            $dashboardUrl .= '-administrador';
        } elseif ($user->role === 'Gerencia') {
            $dashboardUrl .= '-gerencia';
        }
        
        $breadcrumb = [
            'dashboard' => $dashboardNames[$role] ?? 'Dashboard',
            'dashboardUrl' => $dashboardUrl,
            'module' => $module->display_name
        ];
        
        return Inertia::render('Modules/DynamicModule', [
            'module' => $module,
            'submodules' => $submodules,
            'role' => ucfirst($role),
            'canManageContent' => $canManageContent,
            'breadcrumb' => $breadcrumb
        ]);
    }

    /**
     * Show a dynamic submodule with its content (Power BI)
     */
    public function showDynamicSubmodule(Request $request, $role, $moduleName, $submoduleName)
    {
        $user = auth()->user();
        
        // Buscar el módulo padre por nombre y rol
        $parentModule = Module::where('name', $moduleName)
            ->forRole(ucfirst($role))
            ->where('active', true)
            ->first();
            
        if (!$parentModule) {
            abort(404, 'Módulo padre no encontrado');
        }
        
        // Buscar el submódulo por nombre y parent_id
        $submodule = Module::where('name', $submoduleName)
            ->where('parent_id', $parentModule->id)
            ->where('active', true)
            ->first();
            
        if (!$submodule) {
            abort(404, 'Submódulo no encontrado');
        }
        
        // Obtener contenido del submódulo (Power BI, etc.)
        $submoduleContent = Module::where('parent_id', $submodule->id)
            ->where('active', true)
            ->orderBy('display_name')
            ->get();
        
        // Verificar permisos para gestionar contenido
        $canManageContent = $user->role === 'Administrador';
        
        // Mapeo de nombres de dashboard
        $dashboardNames = [
            'calidad' => 'Dashboard Calidad',
            'administrativos' => 'Dashboard Administrativos',
            'asistenciales' => 'Dashboard Asistenciales', 
            'direccionamiento' => 'Dashboard Direccionamiento',
            'financieros' => 'Dashboard Financieros'
        ];
        
        // Generar URL del dashboard según el rol del usuario
        $dashboardUrl = '/dashboard/' . $role;
        if ($user->role === 'Administrador') {
            $dashboardUrl .= '-administrador';
        } elseif ($user->role === 'Gerencia') {
            $dashboardUrl .= '-gerencia';
        }
        
        $breadcrumb = [
            'dashboard' => $dashboardNames[$role] ?? 'Dashboard',
            'dashboardUrl' => $dashboardUrl,
            'module' => $parentModule->display_name,
            'moduleUrl' => '/' . $role . '/' . $parentModule->name,
            'submodule' => $submodule->display_name
        ];
        
        return Inertia::render('Modules/DynamicModule', [
            'module' => $submodule, // Pasar el submódulo como módulo principal
            'submodules' => $submoduleContent, // Contenido del submódulo (Power BI)
            'role' => ucfirst($role),
            'canManageContent' => $canManageContent,
            'breadcrumb' => $breadcrumb,
            'parentModule' => $parentModule // Información del módulo padre
        ]);
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
            Artisan::call('route:clear');
            
            // Clear OPcache if available (important for production)
            if (function_exists('opcache_reset')) {
                opcache_reset();
                Log::info('OPcache cleared successfully');
            }
            
            // Clear any query cache
            if (method_exists(\DB::class, 'flushQueryLog')) {
                \DB::flushQueryLog();
            }
            
            Log::info('All module caches cleared successfully');
        } catch (\Exception $e) {
            Log::warning('Failed to clear some caches: ' . $e->getMessage());
        }
    }
}
