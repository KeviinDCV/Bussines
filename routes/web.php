<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root to login
Route::get('/', function () {
    return redirect()->route('login');
});

// Authentication routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected routes with role-based access
Route::middleware(['auth'])->group(function () {
    // General dashboard (fallback)
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/General');
    })->name('dashboard');

    // Role-specific dashboards with proper middleware
    Route::get('/dashboard/asistenciales', function () {
        return Inertia::render('Dashboard/Asistenciales');
    })->middleware('role:Asistenciales')->name('dashboard.asistenciales');

    Route::get('/dashboard/administrativos', function () {
        return Inertia::render('Dashboard/Administrativos');
    })->middleware('role:Administrativos')->name('dashboard.administrativos');

    Route::get('/dashboard/direccionamiento', function () {
        return Inertia::render('Dashboard/Direccionamiento');
    })->middleware('role:Direccionamiento')->name('dashboard.direccionamiento');

    Route::get('/dashboard/financieros', function () {
        return Inertia::render('Dashboard/Financieros');
    })->middleware('role:Financieros')->name('dashboard.financieros');

    Route::get('/dashboard/administrador', function () {
        return Inertia::render('Dashboard/Administrador');
    })->middleware('role:Administrador')->name('dashboard.administrador');

    // Admin routes - only for Administrador role
    Route::middleware('role:Administrador')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', App\Http\Controllers\Admin\UserController::class);
        Route::patch('/users/{user}/toggle-status', [App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])
            ->name('users.toggle-status');
    });

    // Plan de Desarrollo module - only for Direccionamiento role
    Route::get('/plan-desarrollo', function () {
        return Inertia::render('Dashboard/PlanDesarrollo');
    })->middleware('role:Direccionamiento')->name('plan-desarrollo');
});

require __DIR__.'/settings.php';
