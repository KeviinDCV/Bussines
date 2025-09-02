<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing modules
        Module::truncate();
        
        $roleMap = Role::pluck('id', 'display_name')->toArray();
        
        $modules = [
            // Asistenciales
            ['name' => 'ambulatorio', 'display_name' => 'Ambulatorio', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 1],
            ['name' => 'banco_sangre', 'display_name' => 'Banco de Sangre', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 2],
            ['name' => 'cirugia', 'display_name' => 'Cirugía', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 3],
            ['name' => 'epidemiologia', 'display_name' => 'Epidemiología', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 4],
            ['name' => 'extension_hospitalaria', 'display_name' => 'Extensión Hospitalaria', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 5],
            ['name' => 'ginecologia', 'display_name' => 'Ginecología', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 6],
            ['name' => 'hospitalizacion', 'display_name' => 'Hospitalización', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 7],
            ['name' => 'imagenes', 'display_name' => 'Imágenes', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 8],
            ['name' => 'laboratorio', 'display_name' => 'Laboratorio', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 9],
            ['name' => 'medicina_fisica', 'display_name' => 'Medicina Física', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 10],
            ['name' => 'mortalidad', 'display_name' => 'Mortalidad', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 11],
            ['name' => 'uci_adultos', 'display_name' => 'UCI Adultos', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 12],
            ['name' => 'uci_neonatal', 'display_name' => 'UCI Neonatal', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 13],
            ['name' => 'uci_pediatrico', 'display_name' => 'UCI Pediátrico', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 14],
            ['name' => 'urgencias', 'display_name' => 'Urgencias', 'role_id' => $roleMap['Asistenciales'] ?? 1, 'order' => 15],

            // Administrativos
            ['name' => 'ciau', 'display_name' => 'CIAU', 'role_id' => $roleMap['Administrativos'] ?? 2, 'order' => 1],
            ['name' => 'farmacia', 'display_name' => 'Farmacia', 'role_id' => $roleMap['Administrativos'] ?? 2, 'order' => 2],
            ['name' => 'gestion_tecnica', 'display_name' => 'Gestión Técnica y Logística', 'role_id' => $roleMap['Administrativos'] ?? 2, 'order' => 3],
            ['name' => 'sistemas_informacion', 'display_name' => 'Sistemas de Información', 'role_id' => $roleMap['Administrativos'] ?? 2, 'order' => 4],
            ['name' => 'talento_humano', 'display_name' => 'Talento Humano', 'role_id' => $roleMap['Administrativos'] ?? 2, 'order' => 5],

            // Direccionamiento
            ['name' => 'plan_desarrollo', 'display_name' => 'Plan de Desarrollo', 'role_id' => $roleMap['Direccionamiento'] ?? 3, 'order' => 1],

            // Financieros
            ['name' => 'cartera', 'display_name' => 'Cartera', 'role_id' => $roleMap['Financieros'] ?? 4, 'order' => 1],
            ['name' => 'contabilidad', 'display_name' => 'Contabilidad', 'role_id' => $roleMap['Financieros'] ?? 4, 'order' => 2],
            ['name' => 'facturacion', 'display_name' => 'Facturación', 'role_id' => $roleMap['Financieros'] ?? 4, 'order' => 3],
            ['name' => 'glosas', 'display_name' => 'Glosas', 'role_id' => $roleMap['Financieros'] ?? 4, 'order' => 4],
            ['name' => 'presupuesto', 'display_name' => 'Presupuesto', 'role_id' => $roleMap['Financieros'] ?? 4, 'order' => 5],
            ['name' => 'recaudo', 'display_name' => 'Recaudo', 'role_id' => $roleMap['Financieros'] ?? 4, 'order' => 6],

            // Calidad
            ['name' => 'pamec', 'display_name' => 'PAMEC', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 1],
            ['name' => 'documentos', 'display_name' => 'Documentos', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 2],
            ['name' => 'habilitacion', 'display_name' => 'Habilitación', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 3],
            ['name' => 'indicadores', 'display_name' => 'Indicadores', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 4],
            ['name' => 'auditoria', 'display_name' => 'Auditoría', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 5],
            ['name' => 'mejoramiento', 'display_name' => 'Mejoramiento', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 6],
            ['name' => 'humanizacion', 'display_name' => 'Humanización', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 7],
            ['name' => 'referenciaciones', 'display_name' => 'Referenciaciones', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 8],
            ['name' => 'tecnovigilancia', 'display_name' => 'Tecnovigilancia', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 9],
            ['name' => 'centro_escucha', 'display_name' => 'Centro de Escucha', 'role_id' => $roleMap['Calidad'] ?? 5, 'order' => 10],

            // Administrador
            ['name' => 'gestion_usuarios', 'display_name' => 'Gestión de Usuarios', 'role_id' => $roleMap['Administrador'] ?? 6, 'order' => 1],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}