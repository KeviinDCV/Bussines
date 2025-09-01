<?php

namespace Database\Seeders;

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
        $users = [
            [
                'name' => 'Usuario Asistencial',
                'email' => 'asistencial@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Asistenciales',
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Administrativo',
                'email' => 'administrativo@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Administrativos',
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Direccionamiento',
                'email' => 'direccionamiento@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Direccionamiento',
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Financiero',
                'email' => 'financiero@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Financieros',
                'is_active' => true,
            ],
            [
                'name' => 'Usuario Administrador',
                'email' => 'administrador@huv.com',
                'password' => Hash::make('password'),
                'role' => 'Administrador',
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
