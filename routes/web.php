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
