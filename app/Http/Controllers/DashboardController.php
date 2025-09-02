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
        return Inertia::render('Dashboard/Direccionamiento');
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
        return Inertia::render('Dashboard/PlanDesarrollo');
    }

    /**
     * Display the Asistenciales module for Gerencia role.
     */
    public function asistencialesGerencia()
    {
        return Inertia::render('Dashboard/AsistencialesGerencia');
    }

    /**
     * Display the Administrativos module for Gerencia role.
     */
    public function administrativosGerencia()
    {
        return Inertia::render('Dashboard/AdministrativosGerencia');
    }

    /**
     * Display the Financieros module for Gerencia role.
     */
    public function financierosGerencia()
    {
        return Inertia::render('Dashboard/FinancierosGerencia');
    }

    /**
     * Display the Direccionamiento module for Gerencia role.
     */
    public function direccionamientoGerencia()
    {
        return Inertia::render('Dashboard/DireccionamientoGerencia');
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
        return Inertia::render('Dashboard/CalidadGerencia');
    }

    /**
     * Display the Asistenciales module for Administrador role.
     */
    public function asistencialesAdministrador()
    {
        return Inertia::render('Dashboard/AsistencialesAdministrador');
    }

    /**
     * Display the Administrativos module for Administrador role.
     */
    public function administrativosAdministrador()
    {
        return Inertia::render('Dashboard/AdministrativosAdministrador');
    }

    /**
     * Display the Financieros module for Administrador role.
     */
    public function financierosAdministrador()
    {
        return Inertia::render('Dashboard/FinancierosAdministrador');
    }

    /**
     * Display the Direccionamiento module for Administrador role.
     */
    public function direccionamientoAdministrador()
    {
        return Inertia::render('Dashboard/DireccionamientoAdministrador');
    }

    /**
     * Display the Calidad module for Administrador role.
     */
    public function calidadAdministrador()
    {
        return Inertia::render('Dashboard/CalidadAdministrador');
    }
}
