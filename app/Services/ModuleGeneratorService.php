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
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import ModuleContent from '@/components/ModuleContent';
import { {$iconName} } from 'lucide-react';

export default function {$componentName}() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const module = (props as any).module;
    const [submodules, setSubmodules] = useState((props as any).submodules || []);
    
    // Determinar la URL de regreso basada en el rol del usuario
    const getBackUrl = () => {
        if (user?.role === 'Administrador') {
            return '{$backUrl}';
        }
        return '/dashboard/" . strtolower($role) . "';
    };

    return (
        <AppLayout
            title=\"{$displayName} - Tableros de Gestión HUV\"
            pageTitle=\"{$displayName}\"
            pageDescription=\"{$description}\"
            icon={{$iconName}}
            showBackButton={true}
            backUrl={getBackUrl()}
        >
            {module?.content_type === 'powerbi' && module?.powerbi_url ? (
                <PowerBIEmbed 
                    url={module.powerbi_url}
                    config={module.powerbi_config}
                />
            ) : (
                <ModuleContent 
                    module={module}
                    submodules={submodules}
                    displayName=\"{$displayName}\"
                    icon={{$iconName}}
                />
            )}
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