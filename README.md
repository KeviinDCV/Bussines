# Business Intelligence HUV

Sistema de Inteligencia de Negocios para el Hospital Universitario del Valle "Evaristo Garcia" E.S.E.

## Arquitectura Técnica

### Stack Tecnológico

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 19 + TypeScript
- **SPA Framework**: Inertia.js
- **UI Framework**: Shadcn/ui + Tailwind CSS
- **Base de Datos**: MySQL 8.0+
- **Iconos**: Lucide React
- **Notificaciones**: SweetAlert2
- **Build Tool**: Vite
- **Package Manager**: Composer + npm

### Características del Sistema

- **Single Page Application (SPA)**: Navegación fluida sin recargas de página
- **Sistema de Autenticación**: Login con rate limiting (5 intentos/2 minutos)
- **Control de Acceso Basado en Roles (RBAC)**: 6 roles diferenciados
- **Arquitectura Modular**: Configuración centralizada de módulos
- **Responsive Design**: Interfaz adaptable a dispositivos móviles y desktop
- **Colores Institucionales**: Paleta corporativa HUV (#2a3d85)
- **Middleware de Seguridad**: Prevención de navegación hacia atrás y control de sesiones

## Roles y Permisos

### Roles del Sistema

1. **Asistenciales** (15 módulos)
   - Personal médico y de enfermería
   - Acceso a módulos clínicos y asistenciales

2. **Administrativos** (5 módulos)
   - Gestión administrativa y logística
   - Recursos humanos y sistemas

3. **Direccionamiento** (1 módulo)
   - Dirección estratégica
   - Planeación institucional

4. **Financieros** (6 módulos)
   - Gestión financiera y contable
   - Presupuesto y tesorería

5. **Calidad** (10 módulos)
   - Gestión de calidad y mejoramiento continuo
   - Auditoría y acreditación

6. **Gerencia** (Acceso total)
   - Vista consolidada de todos los módulos
   - Navegación por roles

7. **Administrador** (Acceso total + gestión)
   - Gestión de usuarios y permisos
   - Acceso a todos los módulos del sistema

## Módulos por Rol

### Asistenciales (15 módulos)
- Banco de Sangre
- Epidemiología
- Extensión Hospitalaria
- Gestión integral de Ambulatorio
- Gestión integral de Cirugía
- Gestión integral de Ginecología y Obstetricia
- Gestión integral de Hospitalización
- Gestión integral de Imágenes Diagnósticas
- Gestión integral de Laboratorio
- Gestión integral de Medicina Física
- Gestión integral de Urgencias
- Mortalidad
- UCI Adultos
- UCI Neonatal
- UCI Pediátrico

### Administrativos (5 módulos)
- CIAU
- Farmacia
- Gestión Técnica y Logística
- Sistemas de Información
- Talento Humano

### Calidad (10 módulos)
- Auditoría
- Centro de Escucha
- Documentos
- Habilitación
- Humanización
- Indicadores
- Mejoramiento
- PAMEC
- Referenciaciones
- Tecnovigilancia

### Financieros (6 módulos)
- Auditoría Financiera
- Contabilidad
- Costos
- Facturación
- Presupuesto
- Tesorería

### Direccionamiento (1 módulo)
- Plan de desarrollo

## Instalación y Configuración

### Requisitos del Sistema

- **PHP**: 8.2 o superior
- **Composer**: 2.x
- **Node.js**: 18.x o superior
- **npm**: 9.x o superior
- **MySQL**: 8.0 o superior
- **Extensiones PHP**: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML

### Instalación

1. **Clonar repositorio e instalar dependencias**:
   ```bash
   git clone <repository-url>
   cd Business-Intelligence-HUV
   composer install
   npm install
   ```

2. **Configuración del entorno**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configurar base de datos en `.env`**:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=business_intelligence_huv
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. **Crear base de datos y ejecutar migraciones**:
   ```sql
   CREATE DATABASE business_intelligence_huv;
   ```
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Compilar assets y ejecutar**:
   ```bash
   npm run build
   php artisan serve
   ```

### Desarrollo

```bash
# Terminal 1: Backend
php artisan serve

# Terminal 2: Frontend (hot reload)
npm run dev
```

## Usuarios de Prueba

| Email | Contraseña | Rol | Módulos |
|-------|------------|-----|----------|
| asistencial@huv.com | password | Asistenciales | 15 |
| administrativo@huv.com | password | Administrativos | 5 |
| direccionamiento@huv.com | password | Direccionamiento | 1 |
| financiero@huv.com | password | Financieros | 6 |
| calidad@huv.com | password | Calidad | 10 |
| gerencia@huv.com | password | Gerencia | Todos |
| admin@huv.com | password | Administrador | Todos + Gestión |

## Estructura del Proyecto

```
Business-Intelligence-HUV/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # Autenticación con rate limiting
│   │   │   ├── DashboardController.php     # Controlador principal de dashboards
│   │   │   └── Admin/
│   │   │       └── UserController.php     # Gestión de usuarios
│   │   └── Middleware/
│   │       ├── RoleMiddleware.php          # Control de acceso por roles
│   │       └── PreventBackHistory.php     # Prevención de navegación hacia atrás
│   └── Models/
│       └── User.php                       # Modelo de usuario con roles
├── database/
│   ├── migrations/
│   │   └── *_add_role_to_users_table.php  # Migración de roles
│   └── seeders/
│       └── UserSeeder.php                 # Datos de prueba
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── AppLayout.tsx          # Layout principal con navegación
│   │   │   └── ui/                        # Componentes Shadcn/ui
│   │   ├── config/
│   │   │   └── modules.ts                 # Configuración centralizada de módulos
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   └── Login.tsx              # Página de login con SweetAlert
│   │   │   └── Dashboard/
│   │   │       ├── Asistenciales.tsx      # Dashboard asistenciales
│   │   │       ├── Administrativos.tsx    # Dashboard administrativos
│   │   │       ├── Calidad.tsx           # Dashboard calidad
│   │   │       ├── Direccionamiento.tsx   # Dashboard direccionamiento
│   │   │       ├── Financieros.tsx       # Dashboard financieros
│   │   │       ├── Gerencia.tsx          # Dashboard gerencia
│   │   │       ├── Administrador.tsx     # Dashboard administrador
│   │   │       ├── General.tsx           # Dashboard general
│   │   │       ├── *Gerencia.tsx         # Dashboards específicos de gerencia
│   │   │       └── *Administrador.tsx    # Dashboards específicos de administrador
│   │   └── utils/
│   │       └── sweetAlert.ts             # Utilidades para notificaciones
│   └── css/
│       └── app.css                       # Estilos Tailwind CSS
├── routes/
│   └── web.php                           # Rutas del sistema
├── tailwind.config.js                    # Configuración Tailwind
├── vite.config.js                        # Configuración Vite
├── components.json                       # Configuración Shadcn/ui
└── package.json                          # Dependencias frontend
```

## Características Técnicas Avanzadas

### Seguridad
- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **CSRF Protection**: Tokens CSRF en todas las peticiones
- **Middleware de Autenticación**: Verificación estricta de sesiones
- **Prevención de Navegación**: Middleware para evitar acceso no autorizado

### Performance
- **SPA Architecture**: Navegación sin recargas de página
- **Lazy Loading**: Carga bajo demanda de componentes
- **Asset Optimization**: Minificación y compresión con Vite
- **Database Indexing**: Índices optimizados para consultas

### UX/UI
- **Design System**: Componentes consistentes con Shadcn/ui
- **Responsive Design**: Adaptable a móviles, tablets y desktop
- **Loading States**: Indicadores de carga en todas las acciones
- **Error Handling**: Manejo elegante de errores con SweetAlert2
- **Navigation**: Breadcrumbs y botones de navegación contextuales

### Arquitectura Modular
- **Configuración Centralizada**: Todos los módulos en un archivo de configuración
- **Actualización Dinámica**: Cambios automáticos en dashboards de Gerencia/Administrador
- **Orden Alfabético**: Organización automática de módulos
- **Escalabilidad**: Fácil adición de nuevos roles y módulos

## API y Rutas

### Rutas de Autenticación
- `GET /login` - Página de login
- `POST /login` - Procesar login
- `POST /logout` - Cerrar sesión

### Rutas de Dashboard
- `GET /dashboard` - Redirección basada en rol
- `GET /dashboard/{role}` - Dashboard específico por rol
- `GET /dashboard/{role}-gerencia` - Vista de gerencia por rol
- `GET /dashboard/{role}-administrador` - Vista de administrador por rol

### Rutas de Administración
- `GET /admin/users` - Gestión de usuarios
- `PATCH /admin/users/{user}/toggle-status` - Activar/desactivar usuario

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con hot reload
php artisan serve        # Servidor Laravel

# Producción
npm run build           # Compilar assets para producción
php artisan optimize    # Optimizar aplicación

# Base de datos
php artisan migrate     # Ejecutar migraciones
php artisan db:seed     # Ejecutar seeders
php artisan migrate:fresh --seed  # Recrear BD con datos

# Caché
php artisan config:cache    # Cachear configuración
php artisan route:cache     # Cachear rutas
php artisan view:cache      # Cachear vistas
```

## Próximas Funcionalidades

- **Dashboards con Datos Reales**: Integración con bases de datos hospitalarias
- **Reportes Avanzados**: Generación de reportes PDF y Excel
- **API REST**: Endpoints para integración con sistemas externos
- **Notificaciones en Tiempo Real**: WebSockets para notificaciones push
- **Módulos de BI**: Gráficos interactivos y análisis de datos
- **Auditoría**: Log de acciones de usuarios
- **Backup Automático**: Sistema de respaldos programados

## Soporte y Mantenimiento

Para soporte técnico, reportes de bugs o solicitudes de nuevas funcionalidades, contactar al equipo de desarrollo del Hospital Universitario del Valle.

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Licencia**: Propietaria - Hospital Universitario del Valle
