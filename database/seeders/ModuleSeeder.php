<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing modules
        Module::truncate();
        
        $modules = [
            // Direccionamiento
            [
                'name' => 'plan-desarrollo', 
                'display_name' => 'Plan de Desarrollo', 
                'description' => 'Gestión y seguimiento del plan estratégico institucional',
                'icon' => 'FileText',
                'route' => '/plan-desarrollo',
                'role' => 'Direccionamiento', 
                'order' => 1
            ],

            // Asistenciales
            ['name' => 'ambulatorio', 'display_name' => 'Ambulatorio', 'route' => '/asistenciales/ambulatorio', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 1],
            ['name' => 'banco-sangre', 'display_name' => 'Banco de Sangre', 'route' => '/asistenciales/banco-sangre', 'role' => 'Asistenciales', 'icon' => 'Activity', 'order' => 2],
            ['name' => 'cirugia', 'display_name' => 'Cirugía', 'route' => '/asistenciales/cirugia', 'role' => 'Asistenciales', 'icon' => 'Shield', 'order' => 3],
            ['name' => 'epidemiologia', 'display_name' => 'Epidemiología', 'route' => '/asistenciales/epidemiologia', 'role' => 'Asistenciales', 'icon' => 'BarChart3', 'order' => 4],
            ['name' => 'extension-hospitalaria', 'display_name' => 'Extensión Hospitalaria', 'route' => '/asistenciales/extension-hospitalaria', 'role' => 'Asistenciales', 'icon' => 'Map', 'order' => 5],
            ['name' => 'ginecologia', 'display_name' => 'Ginecología', 'route' => '/asistenciales/ginecologia', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 6],
            ['name' => 'hospitalizacion', 'display_name' => 'Hospitalización', 'route' => '/asistenciales/hospitalizacion', 'role' => 'Asistenciales', 'icon' => 'Calendar', 'order' => 7],
            ['name' => 'imagenes', 'display_name' => 'Imágenes', 'route' => '/asistenciales/imagenes', 'role' => 'Asistenciales', 'icon' => 'PieChart', 'order' => 8],
            ['name' => 'laboratorio', 'display_name' => 'Laboratorio', 'route' => '/asistenciales/laboratorio', 'role' => 'Asistenciales', 'icon' => 'Database', 'order' => 9],
            ['name' => 'medicina-fisica', 'display_name' => 'Medicina Física', 'route' => '/asistenciales/medicina-fisica', 'role' => 'Asistenciales', 'icon' => 'Activity', 'order' => 10],
            ['name' => 'mortalidad', 'display_name' => 'Mortalidad', 'route' => '/asistenciales/mortalidad', 'role' => 'Asistenciales', 'icon' => 'FileText', 'order' => 11],
            ['name' => 'uci-adultos', 'display_name' => 'UCI Adultos', 'route' => '/asistenciales/uci-adultos', 'role' => 'Asistenciales', 'icon' => 'Shield', 'order' => 12],
            ['name' => 'uci-neonatal', 'display_name' => 'UCI Neonatal', 'route' => '/asistenciales/uci-neonatal', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 13],
            ['name' => 'uci-pediatrico', 'display_name' => 'UCI Pediátrico', 'route' => '/asistenciales/uci-pediatrico', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 14],
            ['name' => 'urgencias', 'display_name' => 'Urgencias', 'route' => '/asistenciales/urgencias', 'role' => 'Asistenciales', 'icon' => 'Clock', 'order' => 15],

            // Administrativos
            ['name' => 'ciau', 'display_name' => 'CIAU', 'route' => '/administrativos/ciau', 'role' => 'Administrativos', 'icon' => 'Users', 'order' => 1],
            ['name' => 'farmacia', 'display_name' => 'Farmacia', 'route' => '/administrativos/farmacia', 'role' => 'Administrativos', 'icon' => 'Database', 'order' => 2],
            ['name' => 'gestion-tecnica', 'display_name' => 'Gestión Técnica y Logística', 'route' => '/administrativos/gestion-tecnica-logistica', 'role' => 'Administrativos', 'icon' => 'Settings', 'order' => 3],
            ['name' => 'sistemas-informacion', 'display_name' => 'Sistemas de Información', 'route' => '/administrativos/sistemas-informacion', 'role' => 'Administrativos', 'icon' => 'Database', 'order' => 4],
            ['name' => 'talento-humano', 'display_name' => 'Talento Humano', 'route' => '/administrativos/talento-humano', 'role' => 'Administrativos', 'icon' => 'Users', 'order' => 5],

            // Financieros
            ['name' => 'cartera', 'display_name' => 'Cartera', 'route' => '/financieros/cartera', 'role' => 'Financieros', 'icon' => 'Briefcase', 'order' => 1],
            ['name' => 'contabilidad', 'display_name' => 'Contabilidad', 'route' => '/financieros/contabilidad', 'role' => 'Financieros', 'icon' => 'BarChart3', 'order' => 2],
            ['name' => 'facturacion', 'display_name' => 'Facturación', 'route' => '/financieros/facturacion', 'role' => 'Financieros', 'icon' => 'FileText', 'order' => 3],
            ['name' => 'glosas', 'display_name' => 'Glosas', 'route' => '/financieros/glosas', 'role' => 'Financieros', 'icon' => 'Target', 'order' => 4],
            ['name' => 'presupuesto', 'display_name' => 'Presupuesto', 'route' => '/financieros/presupuesto', 'role' => 'Financieros', 'icon' => 'TrendingUp', 'order' => 5],
            ['name' => 'recaudo', 'display_name' => 'Recaudo', 'route' => '/financieros/recaudo', 'role' => 'Financieros', 'icon' => 'Briefcase', 'order' => 6],

            // Calidad
            ['name' => 'pamec', 'display_name' => 'PAMEC', 'route' => '/calidad/pamec', 'role' => 'Calidad', 'icon' => 'Shield', 'order' => 1],
            ['name' => 'documentos', 'display_name' => 'Documentos', 'route' => '/calidad/documentos', 'role' => 'Calidad', 'icon' => 'FileText', 'order' => 2],
            ['name' => 'habilitacion', 'display_name' => 'Habilitación', 'route' => '/calidad/habilitacion', 'role' => 'Calidad', 'icon' => 'Settings', 'order' => 3],
            ['name' => 'indicadores', 'display_name' => 'Indicadores', 'route' => '/calidad/indicadores', 'role' => 'Calidad', 'icon' => 'BarChart3', 'order' => 4],
            ['name' => 'auditoria', 'display_name' => 'Auditoría', 'route' => '/calidad/auditoria', 'role' => 'Calidad', 'icon' => 'Shield', 'order' => 5],
            ['name' => 'mejoramiento', 'display_name' => 'Mejoramiento', 'route' => '/calidad/mejoramiento', 'role' => 'Calidad', 'icon' => 'TrendingUp', 'order' => 6],
            ['name' => 'humanizacion', 'display_name' => 'Humanización', 'route' => '/calidad/humanizacion', 'role' => 'Calidad', 'icon' => 'Heart', 'order' => 7],
            ['name' => 'referenciaciones', 'display_name' => 'Referenciaciones', 'route' => '/calidad/referenciaciones', 'role' => 'Calidad', 'icon' => 'Map', 'order' => 8],
            ['name' => 'tecnovigilancia', 'display_name' => 'Tecnovigilancia', 'route' => '/calidad/tecnovigilancia', 'role' => 'Calidad', 'icon' => 'Activity', 'order' => 9],
            ['name' => 'centro-escucha', 'display_name' => 'Centro de Escucha', 'route' => '/calidad/centro-escucha', 'role' => 'Calidad', 'icon' => 'Users', 'order' => 10],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}