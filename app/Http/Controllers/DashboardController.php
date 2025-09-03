<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard based on user role.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Redirect to role-specific dashboard
        switch ($user->role) {
            case 'Asistenciales':
                return redirect()->route('dashboard.asistenciales');
            case 'Administrativos':
                return redirect()->route('dashboard.administrativos');
            case 'Direccionamiento':
                return redirect()->route('dashboard.direccionamiento');
            case 'Financieros':
                return redirect()->route('dashboard.financieros');
            case 'Administrador':
                return redirect()->route('dashboard.administrador');
            case 'Calidad':
                return redirect()->route('dashboard.calidad');
            case 'Gerencia':
                return redirect()->route('dashboard.gerencia');
            default:
                return redirect()->route('dashboard.general');
        }
    }

    /**
     * Display the Asistenciales dashboard.
     */
    public function asistenciales()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Asistenciales', [
            'userPermissions' => $user->module_permissions ?? []
        ]);
    }

    /**
     * Display the Administrativos dashboard.
     */
    public function administrativos()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Administrativos', [
            'userPermissions' => $user->module_permissions ?? []
        ]);
    }

    /**
     * Display the Direccionamiento dashboard.
     */
    public function direccionamiento()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Direccionamiento')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/Direccionamiento', [
            'modules' => $modules,
            'canCreateModules' => $user->role === 'Administrador'
        ]);
    }

    /**
     * Display the Financieros dashboard.
     */
    public function financieros()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Financieros', [
            'userPermissions' => $user->module_permissions ?? []
        ]);
    }

    /**
     * Display the Administrador dashboard.
     */
    public function administrador()
    {
        return Inertia::render('Dashboard/Administrador');
    }

    /**
     * Display the General dashboard.
     */
    public function general()
    {
        return Inertia::render('Dashboard/General');
    }

    /**
     * Display the Calidad dashboard.
     */
    public function calidad()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Calidad', [
            'userPermissions' => $user->module_permissions ?? []
        ]);
    }

    /**
     * Display the Gerencia dashboard.
     */
    public function gerencia()
    {
        return Inertia::render('Dashboard/Gerencia');
    }

    /**
     * Display the Plan de Desarrollo page.
     */
    public function planDesarrollo()
    {
        return Inertia::render('Direccionamiento/PlanDesarrollo');
    }

    /**
     * Display the Asistenciales module for Gerencia role.
     */
    public function asistencialesGerencia()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Asistenciales')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/AsistencialesGerencia', [
            'modules' => $modules,
            'canCreateModules' => false // Gerencia solo visualiza, no puede crear/eliminar
        ]);
    }

    /**
     * Display the Administrativos module for Gerencia role.
     */
    public function administrativosGerencia()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Administrativos')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/AdministrativosGerencia', [
            'modules' => $modules,
            'canCreateModules' => false // Gerencia solo visualiza, no puede crear/eliminar
        ]);
    }

    /**
     * Display the Financieros module for Gerencia role.
     */
    public function financierosGerencia()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Financieros')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/FinancierosGerencia', [
            'modules' => $modules,
            'canCreateModules' => false // Gerencia solo visualiza, no puede crear/eliminar
        ]);
    }

    /**
     * Display the Direccionamiento module for Gerencia role.
     */
    public function direccionamientoGerencia()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Direccionamiento')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/DireccionamientoGerencia', [
            'modules' => $modules,
            'canCreateModules' => false // Gerencia solo visualiza, no puede crear/eliminar
        ]);
    }

    /**
     * Display the Administrador module for Gerencia role.
     */
    public function administradorGerencia()
    {
        return Inertia::render('Dashboard/AdministradorGerencia');
    }

    /**
     * Display the Calidad module for Gerencia role.
     */
    public function calidadGerencia()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Calidad')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/CalidadGerencia', [
            'modules' => $modules,
            'canCreateModules' => false // Gerencia solo visualiza, no puede crear/eliminar
        ]);
    }

    /**
     * Display the Asistenciales module for Administrador role.
     */
    public function asistencialesAdministrador()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Asistenciales')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/AsistencialesAdministrador', [
            'modules' => $modules,
            'canCreateModules' => true // Administrador puede crear/eliminar
        ]);
    }

    /**
     * Display the Administrativos module for Administrador role.
     */
    public function administrativosAdministrador()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Administrativos')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/AdministrativosAdministrador', [
            'modules' => $modules,
            'canCreateModules' => true // Administrador puede crear/eliminar
        ]);
    }

    /**
     * Display the Financieros module for Administrador role.
     */
    public function financierosAdministrador()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Financieros')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/FinancierosAdministrador', [
            'modules' => $modules,
            'canCreateModules' => true // Administrador puede crear/eliminar
        ]);
    }

    /**
     * Display the Direccionamiento module for Administrador role.
     */
    public function direccionamientoAdministrador()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Direccionamiento')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/DireccionamientoAdministrador', [
            'modules' => $modules,
            'canCreateModules' => true
        ]);
    }

    /**
     * Display the Calidad module for Administrador role.
     */
    public function calidadAdministrador()
    {
        $user = auth()->user();
        
        $modules = \App\Models\Module::with('children')
            ->forRole('Calidad')
            ->rootModules()
            ->where('active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Dashboard/CalidadAdministrador', [
            'modules' => $modules,
            'canCreateModules' => true // Administrador puede crear/eliminar
        ]);
    }
}
