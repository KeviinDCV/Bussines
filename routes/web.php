<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserController;

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\PreventBackHistory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root to login (solo para usuarios no autenticados)
Route::get('/', function () {
    return redirect()->route('login');
})->middleware('guest');

// CSRF token refresh endpoint - publicly accessible (CSRF tokens don't require authentication)
Route::get('/csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});

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
    Route::get('/dashboard/calidad', [DashboardController::class, 'calidad'])->name('dashboard.calidad');
    Route::get('/dashboard/gerencia', [DashboardController::class, 'gerencia'])->name('dashboard.gerencia');
    Route::get('/dashboard/general', [DashboardController::class, 'general'])->name('dashboard.general');
    Route::get('/dashboard/asistenciales-gerencia', [DashboardController::class, 'asistencialesGerencia'])->name('dashboard.asistenciales-gerencia');
    Route::get('/dashboard/administrativos-gerencia', [DashboardController::class, 'administrativosGerencia'])->name('dashboard.administrativos-gerencia');
    Route::get('/dashboard/financieros-gerencia', [DashboardController::class, 'financierosGerencia'])->name('dashboard.financieros-gerencia');
    Route::get('/dashboard/direccionamiento-gerencia', [DashboardController::class, 'direccionamientoGerencia'])->name('dashboard.direccionamiento-gerencia');
    Route::get('/dashboard/administrador-gerencia', [DashboardController::class, 'administradorGerencia'])->name('dashboard.administrador-gerencia');
    Route::get('/dashboard/calidad-gerencia', [DashboardController::class, 'calidadGerencia'])->name('dashboard.calidad-gerencia');
    Route::get('/dashboard/asistenciales-administrador', [DashboardController::class, 'asistencialesAdministrador'])->name('dashboard.asistenciales-administrador');
    Route::get('/dashboard/administrativos-administrador', [DashboardController::class, 'administrativosAdministrador'])->name('dashboard.administrativos-administrador');
    Route::get('/dashboard/financieros-administrador', [DashboardController::class, 'financierosAdministrador'])->name('dashboard.financieros-administrador');
    Route::get('/dashboard/direccionamiento-administrador', [DashboardController::class, 'direccionamientoAdministrador'])->name('dashboard.direccionamiento-administrador');
    Route::get('/dashboard/calidad-administrador', [DashboardController::class, 'calidadAdministrador'])->name('dashboard.calidad-administrador');
    Route::get('/plan-desarrollo', [DashboardController::class, 'planDesarrollo'])->name('dashboard.plan-desarrollo');

    // NOTA: Todas las rutas estáticas de módulos han sido eliminadas.
    // Ahora todos los módulos usan el sistema dinámico con submódulos y Power BI.
    // Las rutas dinámicas están definidas al final del archivo.

    // Profile routes - only for administrators
    Route::middleware('role:Administrador')->group(function () {
        Route::patch('/profile/email', [ProfileController::class, 'updateEmail'])->name('profile.update-email');
        Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.update-password');
    });

    // Admin routes - only accessible by administrators
    Route::middleware('role:Administrador')->group(function () {
        Route::resource('admin/users', UserController::class);
        Route::patch('admin/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('admin.users.toggle-status');

        Route::resource('admin/roles', RoleController::class)->except(['index', 'show', 'create', 'edit']);
        
        Route::resource('admin/modules', \App\Http\Controllers\Admin\ModuleController::class);
        Route::get('api/modules/role', [\App\Http\Controllers\Admin\ModuleController::class, 'getModulesForRole'])->name('api.modules.role');
        
        // Diagnostic routes for production debugging
        Route::get('diagnostic/modules', [\App\Http\Controllers\DiagnosticController::class, 'diagnoseModules'])->name('diagnostic.modules');
        Route::post('diagnostic/refresh-modules', [\App\Http\Controllers\DiagnosticController::class, 'forceRefreshModules'])->name('diagnostic.refresh');
    });

    
    // Ruta generada automáticamente para Prueba
    Route::get('/calidad/prueba', function () {
        return Inertia::render('Calidad/Prueba');
    })->name('module.prueba');

    // Ruta generada automáticamente para Prueba
    Route::get('/administrativos/prueba', function () {
        return Inertia::render('Administrativos/Prueba');
    })->name('module.prueba');

    // Rutas dinámicas para módulos creados por administradores
    // Estas rutas capturan cualquier módulo dinámico y lo manejan con ModuleContent
    Route::get('/{role}/{moduleName}', [App\Http\Controllers\Admin\ModuleController::class, 'showDynamicModule'])
        ->where('role', '(calidad|administrativos|asistenciales|direccionamiento|financieros)')
        ->where('moduleName', '[a-z0-9-]+')
        ->name('module.dynamic');

    // Ruta generada automáticamente para Módulo de prueba
    Route::get('/direccionamiento/modulo', function () {
        return Inertia::render('Direccionamiento/Modulo');
    })->name('module.modulo');

    // Ruta generada automáticamente para Módulo de prueba 2
    Route::get('/direccionamiento/modulo/modulo2', function () {
        return Inertia::render('Direccionamiento/Modulo2');
    })->name('module.modulo2');

    // Ruta generada automáticamente para Prueba
    Route::get('/direccionamiento/prueba', function () {
        return Inertia::render('Direccionamiento/Prueba');
    })->name('module.prueba');

    // Ruta generada automáticamente para Submodulo de prueba
    Route::get('/direccionamiento/prueba/submodulo-de-prueba', function () {
        return Inertia::render('Direccionamiento/SubmoduloDePrueba');
    })->name('module.submodulo-de-prueba');
});

require __DIR__.'/settings.php';
