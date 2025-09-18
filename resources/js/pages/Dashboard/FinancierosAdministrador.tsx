import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { DollarSign, Target, BarChart3, PieChart, FileText, Plus, Users, Settings, Database, Calendar, Clock, Map, Shield, Heart, Activity, Briefcase, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

// Mapeo de iconos
const iconMap: { [key: string]: any } = {
    FileText,
    BarChart3,
    PieChart,
    Target,
    DollarSign,
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

export default function FinancierosAdministrador() {
    const { props } = usePage();
    const modules = (props as any).modules || [];
    const canCreateModules = (props as any).canCreateModules || false;

    // Nombre del rol
    const roleName = 'Financieros';

    const iconOptions = [
        { value: 'FileText', label: 'Documento' },
        { value: 'BarChart3', label: 'Gráfico de Barras' },
        { value: 'PieChart', label: 'Gráfico Circular' },
        { value: 'DollarSign', label: 'Dinero' },
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
        }
    };

    const handleDeleteModule = async (module: Module) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el módulo "${module.display_name}"? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await router.delete(`/admin/modules/${module.id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'El módulo ha sido eliminado exitosamente',
                            icon: 'success',
                            confirmButtonColor: '#2a3d85'
                        }).then(() => {
                            // Forzar recarga de datos para ocultar el módulo eliminado inmediatamente
                            router.reload({ only: ['modules'] });
                        });
                    },
                    onError: (errors) => {
                        const errorMessages = Object.values(errors).flat().join('\n');
                        Swal.fire({
                            title: 'Error',
                            text: errorMessages || 'Ocurrió un error al eliminar el módulo',
                            icon: 'error',
                            confirmButtonColor: '#2a3d85'
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al eliminar el módulo',
                    icon: 'error',
                    confirmButtonColor: '#2a3d85'
                });
            }
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
                            <p class="text-xs text-gray-500 mt-1">Solo letras, números y guiones. Se usará para generar la URL.</p>
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
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                        <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            ${iconOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                        </select>
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


                if (!name || !displayName) {
                    Swal.showValidationMessage('El nombre del módulo y el nombre a mostrar son obligatorios');
                    return false;
                }

                // Validar formato del nombre (solo letras, números y guiones)
                if (!/^[a-z0-9-]+$/.test(name)) {
                    Swal.showValidationMessage('El nombre del módulo solo puede contener letras minúsculas, números y guiones');
                    return false;
                }

                // Generar ruta automáticamente basada en el nombre
                const route = `/financieros/${name}`;

                return {
                    name,
                    display_name: displayName,
                    description,
                    icon,
                    route,
                    role: roleName
                    // Nota: El orden se manejará automáticamente en el backend de forma alfabética
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
                        let errorMessage = 'Ocurrió un error al crear el módulo';
                        
                        // Manejar errores específicos de validación
                        if (errors.name && errors.name.includes('validation.unique')) {
                            errorMessage = 'Ya existe un módulo con ese nombre. Por favor, elige un nombre diferente.';
                        } else if (errors.route && errors.route.includes('validation.unique')) {
                            errorMessage = 'Ya existe un módulo con esa ruta. Por favor, elige un nombre diferente.';
                        } else {
                            // Mostrar todos los errores si no son de unicidad
                            const errorMessages = Object.values(errors).flat();
                            if (errorMessages.length > 0) {
                                errorMessage = errorMessages.join('\n');
                            }
                        }
                        
                        Swal.fire({
                            title: 'Error al crear módulo',
                            text: errorMessage,
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
            title="Dashboard Financieros - Tableros de Gestión HUV"
            pageTitle="Financieros (Administrador)"
            pageDescription="Subgerencia Financiera"
            icon={DollarSign}
            showBackButton={true}
            backUrl="/dashboard/administrador"
        >
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {modules.map((module: Module) => {
                        const IconComponent = iconMap[module.icon] || FileText;
                        return (
                            <div
                                key={module.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col relative"
                            >
                                {canCreateModules && (
                                    <button
                                        onClick={() => handleDeleteModule(module)}
                                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                        title="Eliminar módulo"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <div className="flex items-center mb-3 sm:mb-4">
                                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{module.display_name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">
                                    {module.description || 'Módulo del sistema financiero'}
                                </p>
                                <button
                                    onClick={() => handleModuleClick(module)}
                                    className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
                                >
                                    Acceder al Módulo
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