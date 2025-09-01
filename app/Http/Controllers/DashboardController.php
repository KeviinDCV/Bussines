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
            default:
                return redirect()->route('dashboard.general');
        }
    }

    /**
     * Display the Asistenciales dashboard.
     */
    public function asistenciales()
    {
        return Inertia::render('Dashboard/Asistenciales');
    }

    /**
     * Display the Administrativos dashboard.
     */
    public function administrativos()
    {
        return Inertia::render('Dashboard/Administrativos');
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
        return Inertia::render('Dashboard/Financieros');
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
     * Display the Plan de Desarrollo page.
     */
    public function planDesarrollo()
    {
        return Inertia::render('Dashboard/PlanDesarrollo');
    }
}
