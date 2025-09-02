<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles',
            'display_name' => 'required|string',
            'description' => 'nullable|string'
        ]);

        Role::create($request->all());

        return redirect()->back()->with('success', 'Rol creado exitosamente');
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id,
            'display_name' => 'required|string',
            'description' => 'nullable|string',
            'active' => 'boolean'
        ]);

        $role->update($request->all());

        return redirect()->back()->with('success', 'Rol actualizado exitosamente');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->back()->with('success', 'Rol eliminado exitosamente');
    }
}