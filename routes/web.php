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
    
    Route::get('/asistenciales/uci-adultos', function () {
        return Inertia::render('Asistenciales/UciAdultos');
    })->name('asistenciales.uci-adultos');
    
    Route::get('/asistenciales/uci-pediatrico', function () {
        return Inertia::render('Asistenciales/UciPediatrico');
    })->name('asistenciales.uci-pediatrico');
    
    Route::get('/asistenciales/uci-neonatal', function () {
        return Inertia::render('Asistenciales/UciNeonatal');
    })->name('asistenciales.uci-neonatal');

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

    // Administrativos module routes
    Route::get('/administrativos/talento-humano', function () {
        return Inertia::render('Administrativos/TalentoHumano');
    })->name('administrativos.talento-humano');
    
    Route::get('/administrativos/ciau', function () {
        return Inertia::render('Administrativos/Ciau');
    })->name('administrativos.ciau');
    
    Route::get('/administrativos/sistemas-informacion', function () {
        return Inertia::render('Administrativos/SistemasInformacion');
    })->name('administrativos.sistemas-informacion');
    
    Route::get('/administrativos/gestion-tecnica-logistica', function () {
        return Inertia::render('Administrativos/GestionTecnicaLogistica');
    })->name('administrativos.gestion-tecnica-logistica');
    
    Route::get('/administrativos/farmacia', function () {
        return Inertia::render('Administrativos/Farmacia');
    })->name('administrativos.farmacia');

    // Calidad module routes
    Route::get('/calidad/pamec', function () {
        return Inertia::render('Calidad/Pamec');
    })->name('calidad.pamec');
    
    Route::get('/calidad/documentos', function () {
        return Inertia::render('Calidad/Documentos');
    })->name('calidad.documentos');
    
    Route::get('/calidad/habilitacion', function () {
        return Inertia::render('Calidad/Habilitacion');
    })->name('calidad.habilitacion');
    
    Route::get('/calidad/indicadores', function () {
        return Inertia::render('Calidad/Indicadores');
    })->name('calidad.indicadores');
    
    Route::get('/calidad/auditoria', function () {
        return Inertia::render('Calidad/Auditoria');
    })->name('calidad.auditoria');
    
    Route::get('/calidad/mejoramiento', function () {
        return Inertia::render('Calidad/Mejoramiento');
    })->name('calidad.mejoramiento');
    
    Route::get('/calidad/humanizacion', function () {
        return Inertia::render('Calidad/Humanizacion');
    })->name('calidad.humanizacion');
    
    Route::get('/calidad/referenciaciones', function () {
        return Inertia::render('Calidad/Referenciaciones');
    })->name('calidad.referenciaciones');
    
    Route::get('/calidad/tecnovigilancia', function () {
        return Inertia::render('Calidad/Tecnovigilancia');
    })->name('calidad.tecnovigilancia');
    
    Route::get('/calidad/centro-escucha', function () {
        return Inertia::render('Calidad/CentroEscucha');
    })->name('calidad.centro-escucha');

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
    });

    // Ruta generada automáticamente para Plan operativo anual
    Route::get('/direccionamiento/ejemplo', function () {
        return Inertia::render('Direccionamiento/Ejemplo');
    })->name('module.ejemplo');

    // Ruta generada automáticamente para Ejemplo
    Route::get('/direccionamiento/test-test', function () {
        return Inertia::render('Direccionamiento/TestTest');
    })->name('module.test-test');
});

require __DIR__.'/settings.php';
