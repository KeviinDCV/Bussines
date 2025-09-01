<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\PreventBackHistory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root to login (solo para usuarios no autenticados)
Route::get('/', function () {
    return redirect()->route('login');
})->middleware('guest');

// Authentication routes - solo accesibles por usuarios no autenticados
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

// Logout route - accesible solo por usuarios autenticados
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth.strict');

// Protected routes with role-based access - TODAS las rutas protegidas
Route::middleware(['auth.strict', 'prevent.back'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Dashboard routes for different roles
    Route::get('/dashboard/asistenciales', [DashboardController::class, 'asistenciales'])->name('dashboard.asistenciales');
    Route::get('/dashboard/administrativos', [DashboardController::class, 'administrativos'])->name('dashboard.administrativos');
    Route::get('/dashboard/direccionamiento', [DashboardController::class, 'direccionamiento'])->name('dashboard.direccionamiento');
    Route::get('/dashboard/financieros', [DashboardController::class, 'financieros'])->name('dashboard.financieros');
    Route::get('/dashboard/administrador', [DashboardController::class, 'administrador'])->name('dashboard.administrador');
    Route::get('/dashboard/general', [DashboardController::class, 'general'])->name('dashboard.general');
    Route::get('/plan-desarrollo', [DashboardController::class, 'planDesarrollo'])->name('dashboard.plan-desarrollo');

    // Asistenciales module routes
    Route::get('/asistenciales/urgencias', function () {
        return Inertia::render('Asistenciales/Urgencias');
    })->name('asistenciales.urgencias');
    
    Route::get('/asistenciales/ambulatorio', function () {
        return Inertia::render('Asistenciales/Ambulatorio');
    })->name('asistenciales.ambulatorio');
    
    Route::get('/asistenciales/hospitalizacion', function () {
        return Inertia::render('Asistenciales/Hospitalizacion');
    })->name('asistenciales.hospitalizacion');
    
    Route::get('/asistenciales/cirugia', function () {
        return Inertia::render('Asistenciales/Cirugia');
    })->name('asistenciales.cirugia');
    
    Route::get('/asistenciales/imagenes', function () {
        return Inertia::render('Asistenciales/Imagenes');
    })->name('asistenciales.imagenes');
    
    Route::get('/asistenciales/laboratorio', function () {
        return Inertia::render('Asistenciales/Laboratorio');
    })->name('asistenciales.laboratorio');
    
    Route::get('/asistenciales/ginecologia', function () {
        return Inertia::render('Asistenciales/Ginecologia');
    })->name('asistenciales.ginecologia');
    
    Route::get('/asistenciales/medicina-fisica', function () {
        return Inertia::render('Asistenciales/MedicinaFisica');
    })->name('asistenciales.medicina-fisica');
    
    Route::get('/asistenciales/mortalidad', function () {
        return Inertia::render('Asistenciales/Mortalidad');
    })->name('asistenciales.mortalidad');
    
    Route::get('/asistenciales/epidemiologia', function () {
        return Inertia::render('Asistenciales/Epidemiologia');
    })->name('asistenciales.epidemiologia');
    
    Route::get('/asistenciales/banco-sangre', function () {
        return Inertia::render('Asistenciales/BancoSangre');
    })->name('asistenciales.banco-sangre');
    
    Route::get('/asistenciales/extension-hospitalaria', function () {
        return Inertia::render('Asistenciales/ExtensionHospitalaria');
    })->name('asistenciales.extension-hospitalaria');

    // Financieros module routes
    Route::get('/financieros/facturacion', function () {
        return Inertia::render('Financieros/Facturacion');
    })->name('financieros.facturacion');
    
    Route::get('/financieros/cartera', function () {
        return Inertia::render('Financieros/Cartera');
    })->name('financieros.cartera');
    
    Route::get('/financieros/recaudo', function () {
        return Inertia::render('Financieros/Recaudo');
    })->name('financieros.recaudo');
    
    Route::get('/financieros/glosas', function () {
        return Inertia::render('Financieros/Glosas');
    })->name('financieros.glosas');
    
    Route::get('/financieros/presupuesto', function () {
        return Inertia::render('Financieros/Presupuesto');
    })->name('financieros.presupuesto');
    
    Route::get('/financieros/contabilidad', function () {
        return Inertia::render('Financieros/Contabilidad');
    })->name('financieros.contabilidad');

    // Profile routes - only for administrators
    Route::middleware('role:Administrador')->group(function () {
        Route::patch('/profile/email', [ProfileController::class, 'updateEmail'])->name('profile.update-email');
        Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.update-password');
    });

    // Admin routes - only accessible by administrators
    Route::middleware('role:Administrador')->group(function () {
        Route::resource('admin/users', UserController::class);
        Route::patch('admin/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('admin.users.toggle-status');
    });
});

require __DIR__.'/settings.php';
