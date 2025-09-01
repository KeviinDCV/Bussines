# Business Intelligence HUV

Sistema de Inteligencia de Negocios para el Hospital Universitario del Valle.

## Características

- **Sistema de Login por Roles**: Acceso diferenciado para 4 tipos de usuarios
- **Colores Institucionales**: Diseño con azul institucional (#2a3d85) y blanco
- **SweetAlert2**: Notificaciones elegantes para todos los mensajes del sistema
- **Responsive Design**: Interfaz adaptable a diferentes dispositivos

## Roles de Usuario

1. **Asistenciales**: Personal médico y de enfermería
2. **Administrativos**: Gestión administrativa
3. **Direccionamiento**: Dirección estratégica
4. **Financieros**: Gestión financiera

## Instalación

### Requisitos Previos

- PHP 8.2+
- Composer
- Node.js y npm
- MySQL (XAMPP recomendado)

### Pasos de Instalación

1. **Clonar el repositorio y instalar dependencias**:
   ```bash
   composer install
   npm install
   ```

2. **Configurar el archivo de entorno**:
   ```bash
   cp .env.example .env
   ```

3. **Generar la clave de aplicación**:
   ```bash
   php artisan key:generate
   ```

4. **Configurar la base de datos en `.env`**:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=business_intelligence_huv
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Crear la base de datos en MySQL**:
   ```sql
   CREATE DATABASE business_intelligence_huv;
   ```

6. **Ejecutar las migraciones y seeders**:
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

7. **Compilar los assets**:
   ```bash
   npm run build
   # o para desarrollo:
   npm run dev
   ```

8. **Iniciar el servidor**:
   ```bash
   php artisan serve
   ```

## Usuarios de Prueba

| Email | Contraseña | Rol |
|-------|------------|-----|
| asistencial@huv.com | password | Asistenciales |
| administrativo@huv.com | password | Administrativos |
| direccionamiento@huv.com | password | Direccionamiento |
| financiero@huv.com | password | Financieros |

## Tecnologías Utilizadas

- **Backend**: Laravel 12
- **Frontend**: React 19 + Inertia.js
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Notificaciones**: SweetAlert2
- **Base de Datos**: MySQL
- **Iconos**: Lucide React

## Estructura del Proyecto

```
├── app/
│   ├── Http/Controllers/
│   │   └── AuthController.php
│   ├── Http/Middleware/
│   │   └── RoleMiddleware.php
│   └── Models/
│       └── User.php
├── database/
│   ├── migrations/
│   │   └── 2024_01_01_000003_add_role_to_users_table.php
│   └── seeders/
│       └── UserSeeder.php
├── resources/
│   └── js/
│       ├── pages/
│       │   ├── Auth/Login.tsx
│       │   └── Dashboard/
│       │       ├── Asistenciales.tsx
│       │       ├── Administrativos.tsx
│       │       ├── Direccionamiento.tsx
│       │       ├── Financieros.tsx
│       │       └── General.tsx
│       └── utils/
│           └── sweetAlert.ts
└── routes/
    └── web.php
```

## Desarrollo

Para desarrollo, ejecutar:
```bash
npm run dev
php artisan serve
```

## Próximas Funcionalidades

- Dashboards específicos con datos reales
- Reportes y análisis por rol
- Gestión de usuarios
- Integración con sistemas hospitalarios
- Módulos de Business Intelligence avanzados

## Soporte

Para soporte técnico, contactar al equipo de desarrollo.
