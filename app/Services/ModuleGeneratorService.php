<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ModuleGeneratorService
{
    /**
     * Genera todos los archivos necesarios para un módulo
     */
    public function generateModuleFiles($module)
    {
        try {
            $this->generateReactComponent($module);
            $this->generateRoute($module);
            
            Log::info("Archivos generados exitosamente para el módulo: {$module->name}");
            return true;
        } catch (\Exception $e) {
            Log::error("Error generando archivos para el módulo {$module->name}: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Genera el componente React para el módulo
     */
    private function generateReactComponent($module)
    {
        $componentName = Str::studly($module->name);
        $roleName = Str::studly($module->role);
        
        $template = $this->getComponentTemplate(
            $componentName, 
            $module->display_name, 
            $module->description, 
            $module->icon, 
            $module->role
        );
        
        // Crear directorio si no existe
        $directory = resource_path("js/pages/{$roleName}");
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }
        
        // Crear archivo del componente
        $filePath = "{$directory}/{$componentName}.tsx";
        File::put($filePath, $template);
        
        Log::info("Componente React creado: {$filePath}");
    }

    /**
     * Genera la ruta para el módulo
     */
    private function generateRoute($module)
    {
        $componentName = Str::studly($module->name);
        $roleName = Str::studly($module->role);
        
        $routeDefinition = "\n    // Ruta generada automáticamente para {$module->display_name}\n";
        $routeDefinition .= "    Route::get('{$module->route}', function () {\n";
        $routeDefinition .= "        return Inertia::render('{$roleName}/{$componentName}');\n";
        $routeDefinition .= "    })->name('module.{$module->name}');\n";
        
        $this->appendToRouteFile($routeDefinition);
        
        Log::info("Ruta generada para el módulo: {$module->route}");
    }

    /**
     * Agrega la ruta al archivo de rutas
     */
    private function appendToRouteFile($routeDefinition)
    {
        $routeFile = base_path('routes/web.php');
        $content = File::get($routeFile);
        
        // Buscar el final del archivo antes del último });
        $lastBracePos = strrpos($content, '});');
        
        if ($lastBracePos !== false) {
            // Insertar la nueva ruta antes del último });
            $newContent = substr($content, 0, $lastBracePos) . 
                         $routeDefinition . 
                         substr($content, $lastBracePos);
            
            File::put($routeFile, $newContent);
        } else {
            // Si no encuentra el patrón, agregar al final
            File::append($routeFile, $routeDefinition);
        }
    }

    /**
     * Genera el template del componente React
     */
    private function getComponentTemplate($componentName, $displayName, $description, $iconName, $role)
    {
        $backUrl = $role === 'Direccionamiento' ? '/dashboard/direccionamiento-administrador' : "/dashboard/" . strtolower($role);
        
        return "import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { {$iconName} } from 'lucide-react';

export default function {$componentName}() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    
    // Determinar la URL de regreso basada en el rol del usuario
    const getBackUrl = () => {
        if (user?.role === 'Administrador') {
            return '{$backUrl}';
        }
        return '/dashboard/" . strtolower($role) . "';
    };

    return (
        <AppLayout
            title=\"{$displayName} - Business Intelligence HUV\"
            pageTitle=\"{$displayName}\"
            pageDescription=\"{$description}\"
            icon={{$iconName}}
            showBackButton={true}
            backUrl={getBackUrl()}
        >
            <div className=\"bg-white rounded-lg shadow-sm p-4 sm:p-6\">
                <h2 className=\"text-xl sm:text-2xl font-bold text-gray-900 mb-6\">Módulo en Desarrollo</h2>
                <div className=\"text-center py-12\">
                    <{$iconName} className=\"w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4\" />
                    <p className=\"text-gray-600\">
                        El módulo de {$displayName} está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}";
    }

    /**
     * Elimina los archivos de un módulo cuando se elimina
     */
    public function deleteModuleFiles($module)
    {
        try {
            $componentName = Str::studly($module->name);
            $roleName = Str::studly($module->role);
            
            // Eliminar componente React
            $filePath = resource_path("js/pages/{$roleName}/{$componentName}.tsx");
            if (File::exists($filePath)) {
                File::delete($filePath);
                Log::info("Componente eliminado: {$filePath}");
            }
            
            // Nota: Las rutas no se eliminan automáticamente para evitar problemas
            // Se recomienda limpiarlas manualmente o crear un comando para ello
            
            return true;
        } catch (\Exception $e) {
            Log::error("Error eliminando archivos del módulo {$module->name}: " . $e->getMessage());
            throw $e;
        }
    }
}