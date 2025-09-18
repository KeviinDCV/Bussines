import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { TrendingUp, Target, BarChart3, PieChart, FileText, Plus, Users, Settings, Database, Calendar, Clock, Map, Shield, Heart, Activity, Briefcase } from 'lucide-react';
import Swal from 'sweetalert2';

// Mapeo de iconos
const iconMap: { [key: string]: any } = {
    FileText,
    BarChart3,
    PieChart,
    Target,
    TrendingUp,
    Users,
    Settings,
    Database,
    Calendar,
    Clock,
    Map,
    Shield,
    Heart,
    Activity,
    Briefcase
};

interface Module {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    icon: string;
    route?: string;
    role: string;
    parent_id?: number;
    active: boolean;
    order: number;
    children?: Module[];
}

export default function Direccionamiento() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const modules = (props as any).modules || [];
    const canCreateModules = (props as any).canCreateModules || false;
    const isGerencia = user?.role === 'Gerencia';
    const isAdministrador = user?.role === 'Administrador';

    // Nombre del rol
    const roleName = 'Direccionamiento';

    const iconOptions = [
        { value: 'FileText', label: 'Documento' },
        { value: 'BarChart3', label: 'Gráfico de Barras' },
        { value: 'PieChart', label: 'Gráfico Circular' },
        { value: 'TrendingUp', label: 'Tendencia' },
        { value: 'Target', label: 'Objetivo' },
        { value: 'Users', label: 'Usuarios' },
        { value: 'Settings', label: 'Configuración' },
        { value: 'Database', label: 'Base de Datos' },
        { value: 'Calendar', label: 'Calendario' },
        { value: 'Clock', label: 'Reloj' },
        { value: 'Map', label: 'Mapa' },
        { value: 'Shield', label: 'Escudo' },
        { value: 'Heart', label: 'Corazón' },
        { value: 'Activity', label: 'Actividad' },
        { value: 'Briefcase', label: 'Maletín' }
    ];

    const handleModuleClick = (module: Module) => {
        if (module.route) {
            router.get(module.route);
        } else if (module.name === 'plan-desarrollo') {
            router.get('/plan-desarrollo');
        }
    };

    const handleCreateModule = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Crear Nuevo Módulo',
            html: `
                <div class="space-y-4 text-left">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Módulo *</label>
                            <input id="swal-input1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: nuevo-modulo">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre a Mostrar *</label>
                            <input id="swal-input2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Módulo">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea id="swal-input3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del módulo..." rows="3"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                            <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                ${iconOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                            <input id="swal-input5" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" type="number" value="0" min="0">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Ruta (Opcional)</label>
                        <input id="swal-input6" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: /nuevo-modulo">
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear Módulo',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '600px',
            preConfirm: () => {
                const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const displayName = (document.getElementById('swal-input2') as HTMLInputElement).value;
                const description = (document.getElementById('swal-input3') as HTMLTextAreaElement).value;
                const icon = (document.getElementById('swal-input4') as HTMLSelectElement).value;
                const order = parseInt((document.getElementById('swal-input5') as HTMLInputElement).value) || 0;
                const route = (document.getElementById('swal-input6') as HTMLInputElement).value;

                if (!name || !displayName) {
                    Swal.showValidationMessage('El nombre del módulo y el nombre a mostrar son obligatorios');
                    return false;
                }

                return {
                    name,
                    display_name: displayName,
                    description,
                    icon,
                    order,
                    route,
                    role: roleName
                };
            }
        });

        if (formValues) {
            try {
                await router.post('/admin/modules', formValues, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Módulo creado exitosamente',
                            icon: 'success',
                            confirmButtonColor: '#2a3d85'
                        }).then(() => {
                            // Forzar recarga de datos para mostrar el nuevo módulo inmediatamente
                            router.reload({ only: ['modules'] });
                        });
                    },
                    onError: (errors) => {
                        const errorMessages = Object.values(errors).flat().join('\n');
                        Swal.fire({
                            title: 'Error',
                            text: errorMessages,
                            icon: 'error',
                            confirmButtonColor: '#2a3d85'
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al crear el módulo',
                    icon: 'error',
                    confirmButtonColor: '#2a3d85'
                });
            }
        }
    };

    return (
        <AppLayout
            title="Dashboard Direccionamiento - Tableros de Gestión HUV"
            pageTitle="Direccionamiento"
            pageDescription="Planeación Estratégica y Direccionamiento"
            icon={TrendingUp}
            showBackButton={isGerencia || isAdministrador}
            backUrl={isGerencia ? "/dashboard/gerencia" : "/dashboard/administrador"}
        >
            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module: Module) => {
                        const IconComponent = iconMap[module.icon] || FileText;
                        return (
                            <div
                                key={module.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col"
                            >
                                <div className="flex items-center mb-4">
                                    <IconComponent className="w-10 h-10 text-[#2a3d85]" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.display_name}</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">
                                    {module.description || 'Módulo del sistema de direccionamiento'}
                                </p>
                                <button 
                                    onClick={() => handleModuleClick(module)}
                                    className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                                >
                                    {module.route ? 'Acceder al Módulo' : 'Próximamente'}
                                </button>
                            </div>
                        );
                    })}

                    {/* Mensaje cuando no hay módulos */}
                    {modules.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay módulos disponibles</h3>
                            <p className="text-gray-600 mb-4">
                                {canCreateModules 
                                    ? 'Comienza creando el primer módulo para este rol.'
                                    : 'Los módulos serán visibles una vez que sean creados por el administrador.'
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Botón flotante para crear módulos (solo para administradores) */}
                {canCreateModules && (
                    <button
                        onClick={handleCreateModule}
                        className="fixed bottom-6 right-6 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
                        title="Crear nuevo módulo"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                )}
            </div>
        </AppLayout>
    );
}
