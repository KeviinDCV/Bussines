<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ModuleController extends Controller
{
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
            'name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:255',
            'route' => 'nullable|string|max:255',
            'role' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:modules,id',
            'order' => 'nullable|integer|min:0'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $module = Module::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
            'icon' => $request->icon ?? 'FileText',
            'route' => $request->route,
            'role' => $request->role,
            'parent_id' => $request->parent_id,
            'order' => $request->order ?? 0,
            'active' => true
        ]);

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

        return back()->with('success', 'Módulo actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        $module->delete();
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
}
