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
            ['name' => 'ambulatorio', 'display_name' => 'Ambulatorio', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 1],
            ['name' => 'banco-sangre', 'display_name' => 'Banco de Sangre', 'role' => 'Asistenciales', 'icon' => 'Activity', 'order' => 2],
            ['name' => 'cirugia', 'display_name' => 'Cirugía', 'role' => 'Asistenciales', 'icon' => 'Shield', 'order' => 3],
            ['name' => 'epidemiologia', 'display_name' => 'Epidemiología', 'role' => 'Asistenciales', 'icon' => 'BarChart3', 'order' => 4],
            ['name' => 'extension-hospitalaria', 'display_name' => 'Extensión Hospitalaria', 'role' => 'Asistenciales', 'icon' => 'Map', 'order' => 5],
            ['name' => 'ginecologia', 'display_name' => 'Ginecología', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 6],
            ['name' => 'hospitalizacion', 'display_name' => 'Hospitalización', 'role' => 'Asistenciales', 'icon' => 'Calendar', 'order' => 7],
            ['name' => 'imagenes', 'display_name' => 'Imágenes', 'role' => 'Asistenciales', 'icon' => 'PieChart', 'order' => 8],
            ['name' => 'laboratorio', 'display_name' => 'Laboratorio', 'role' => 'Asistenciales', 'icon' => 'Database', 'order' => 9],
            ['name' => 'medicina-fisica', 'display_name' => 'Medicina Física', 'role' => 'Asistenciales', 'icon' => 'Activity', 'order' => 10],
            ['name' => 'mortalidad', 'display_name' => 'Mortalidad', 'role' => 'Asistenciales', 'icon' => 'FileText', 'order' => 11],
            ['name' => 'uci-adultos', 'display_name' => 'UCI Adultos', 'role' => 'Asistenciales', 'icon' => 'Shield', 'order' => 12],
            ['name' => 'uci-neonatal', 'display_name' => 'UCI Neonatal', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 13],
            ['name' => 'uci-pediatrico', 'display_name' => 'UCI Pediátrico', 'role' => 'Asistenciales', 'icon' => 'Heart', 'order' => 14],
            ['name' => 'urgencias', 'display_name' => 'Urgencias', 'role' => 'Asistenciales', 'icon' => 'Clock', 'order' => 15],

            // Administrativos
            ['name' => 'ciau', 'display_name' => 'CIAU', 'role' => 'Administrativos', 'icon' => 'Users', 'order' => 1],
            ['name' => 'farmacia', 'display_name' => 'Farmacia', 'role' => 'Administrativos', 'icon' => 'Database', 'order' => 2],
            ['name' => 'gestion-tecnica', 'display_name' => 'Gestión Técnica y Logística', 'role' => 'Administrativos', 'icon' => 'Settings', 'order' => 3],
            ['name' => 'sistemas-informacion', 'display_name' => 'Sistemas de Información', 'role' => 'Administrativos', 'icon' => 'Database', 'order' => 4],
            ['name' => 'talento-humano', 'display_name' => 'Talento Humano', 'role' => 'Administrativos', 'icon' => 'Users', 'order' => 5],

            // Financieros
            ['name' => 'cartera', 'display_name' => 'Cartera', 'role' => 'Financieros', 'icon' => 'Briefcase', 'order' => 1],
            ['name' => 'contabilidad', 'display_name' => 'Contabilidad', 'role' => 'Financieros', 'icon' => 'BarChart3', 'order' => 2],
            ['name' => 'facturacion', 'display_name' => 'Facturación', 'role' => 'Financieros', 'icon' => 'FileText', 'order' => 3],
            ['name' => 'glosas', 'display_name' => 'Glosas', 'role' => 'Financieros', 'icon' => 'Target', 'order' => 4],
            ['name' => 'presupuesto', 'display_name' => 'Presupuesto', 'role' => 'Financieros', 'icon' => 'TrendingUp', 'order' => 5],
            ['name' => 'recaudo', 'display_name' => 'Recaudo', 'role' => 'Financieros', 'icon' => 'Briefcase', 'order' => 6],

            // Calidad
            ['name' => 'pamec', 'display_name' => 'PAMEC', 'role' => 'Calidad', 'icon' => 'Shield', 'order' => 1],
            ['name' => 'documentos', 'display_name' => 'Documentos', 'role' => 'Calidad', 'icon' => 'FileText', 'order' => 2],
            ['name' => 'habilitacion', 'display_name' => 'Habilitación', 'role' => 'Calidad', 'icon' => 'Settings', 'order' => 3],
            ['name' => 'indicadores', 'display_name' => 'Indicadores', 'role' => 'Calidad', 'icon' => 'BarChart3', 'order' => 4],
            ['name' => 'auditoria', 'display_name' => 'Auditoría', 'role' => 'Calidad', 'icon' => 'Shield', 'order' => 5],
            ['name' => 'mejoramiento', 'display_name' => 'Mejoramiento', 'role' => 'Calidad', 'icon' => 'TrendingUp', 'order' => 6],
            ['name' => 'humanizacion', 'display_name' => 'Humanización', 'role' => 'Calidad', 'icon' => 'Heart', 'order' => 7],
            ['name' => 'referenciaciones', 'display_name' => 'Referenciaciones', 'role' => 'Calidad', 'icon' => 'Map', 'order' => 8],
            ['name' => 'tecnovigilancia', 'display_name' => 'Tecnovigilancia', 'role' => 'Calidad', 'icon' => 'Activity', 'order' => 9],
            ['name' => 'centro-escucha', 'display_name' => 'Centro de Escucha', 'role' => 'Calidad', 'icon' => 'Users', 'order' => 10],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}