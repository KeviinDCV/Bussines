import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { TrendingUp } from 'lucide-react';
import { getModulesByRole } from '@/config/modules';

export default function DireccionamientoAdministrador() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];
    const modules = getModulesByRole('direccionamiento');

    return (
        <AppLayout
            title="Dashboard Direccionamiento - Business Intelligence HUV"
            pageTitle="Direccionamiento (Administrador)"
            pageDescription="Planeación Estratégica y Direccionamiento"
            icon={TrendingUp}
            showBackButton={true}
            backUrl="/dashboard/administrador"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {modules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                        <div
                            key={module.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col"
                        >
                            <div className="flex items-center mb-3 sm:mb-4">
                                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">{module.description}</p>
                            <button 
                                onClick={() => router.get(module.route)}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}