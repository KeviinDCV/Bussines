<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all()->keyBy('name');
        
        $users = [
            [
                'name' => 'Usuario Asistencial',
                'email' => 'asistencial@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Asistenciales',
                'role_id' => $roles['asistenciales']?->id,
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Administrativo',
                'email' => 'administrativo@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Administrativos',
                'role_id' => $roles['administrativos']?->id,
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Direccionamiento',
                'email' => 'direccionamiento@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Direccionamiento',
                'role_id' => $roles['direccionamiento']?->id,
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Financiero',
                'email' => 'financiero@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Financieros',
                'role_id' => $roles['financieros']?->id,
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Administrador',
                'email' => 'administrador@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Administrador',
                'role_id' => $roles['administrador']?->id,
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Calidad',
                'email' => 'calidad@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Calidad',
                'role_id' => $roles['calidad']?->id,
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Gerencia',
                'email' => 'gerencia@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Gerencia',
                'role_id' => $roles['gerencia']?->id,
                'is_active' => true,
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
