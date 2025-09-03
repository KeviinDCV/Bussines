import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { DollarSign, Target, BarChart3, PieChart, FileText, Users, Settings, Database, Calendar, Clock, Map, Shield, Heart, Activity, Briefcase } from 'lucide-react';

// Mapeo de iconos (igual que DireccionamientoAdministrador)
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

export default function FinancierosGerencia() {
    const { props } = usePage();
    const modules = (props as any).modules || []; // Módulos dinámicos de la BD
    const canCreateModules = (props as any).canCreateModules || false;

    const handleModuleClick = (module: Module) => {
        if (module.route) {
            router.get(module.route);
        }
    };

    return (
        <AppLayout
            title="Dashboard Financieros - Business Intelligence HUV"
            pageTitle="Financieros (Gerencia)"
            pageDescription="Subgerencia Financiera"
            icon={DollarSign}
            showBackButton={true}
            backUrl="/dashboard/gerencia"
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
                                Los módulos serán visibles una vez que sean creados por el administrador.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}