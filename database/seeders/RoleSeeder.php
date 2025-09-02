<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'asistenciales',
                'display_name' => 'Asistenciales',
                'description' => 'Personal médico y de enfermería'
            ],
            [
                'name' => 'administrativos',
                'display_name' => 'Administrativos',
                'description' => 'Gestión administrativa'
            ],
            [
                'name' => 'direccionamiento',
                'display_name' => 'Direccionamiento',
                'description' => 'Dirección estratégica'
            ],
            [
                'name' => 'financieros',
                'display_name' => 'Financieros',
                'description' => 'Gestión financiera'
            ],
            [
                'name' => 'gerencia',
                'display_name' => 'Gerencia',
                'description' => 'Gerencia general'
            ],
            [
                'name' => 'calidad',
                'display_name' => 'Calidad',
                'description' => 'Gestión de calidad'
            ],
            [
                'name' => 'administrador',
                'display_name' => 'Administrador',
                'description' => 'Administrador del sistema'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
