import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Award, FileText, Search, BarChart3, Settings, Heart, TrendingUp, Shield, RefreshCw, Stethoscope, Headphones } from 'lucide-react';

// Mapeo de iconos para módulos dinámicos
const iconMap: { [key: string]: any } = {
    'FileText': FileText,
    'Search': Search,
    'BarChart3': BarChart3,
    'Settings': Settings,
    'Heart': Heart,
    'TrendingUp': TrendingUp,
    'Shield': Shield,
    'RefreshCw': RefreshCw,
    'Stethoscope': Stethoscope,
    'Headphones': Headphones,
};

export default function Calidad() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];
    const user = (props as any).auth?.user;
    const isGerencia = user?.role === 'Gerencia';
    const isAdministrador = user?.role === 'Administrador';
    const canCreateModules = (props as any).canCreateModules || false;
    
    // Usar solo módulos dinámicos de la base de datos (ya incluyen estáticos y dinámicos ordenados)
    const allModules = (props as any).modules || [];

    return (
        <AppLayout
            title="Dashboard Calidad - Tableros de Gestión HUV"
            pageTitle="Calidad"
            pageDescription="Gestión de Calidad y Mejoramiento Continuo"
            icon={Award}
            showBackButton={isGerencia || isAdministrador}
            backUrl={isGerencia ? "/dashboard/gerencia" : "/dashboard/administrador"}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {allModules.map((module: any) => {
                    // Obtener el componente de icono
                    const IconComponent = typeof module.icon === 'string' 
                        ? iconMap[module.icon] || FileText 
                        : module.icon || FileText;
                    
                    return (
                        <div
                            key={module.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col"
                        >
                            <div className="flex items-center mb-3 sm:mb-4">
                                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                {module.display_name || module.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">
                                {module.description || 'Módulo del sistema de calidad'}
                            </p>
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
