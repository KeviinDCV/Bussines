import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { TrendingUp, Target, BarChart3, PieChart, FileText } from 'lucide-react';

export default function Direccionamiento() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const isGerencia = user?.role === 'Gerencia';

    const modules = [
        {
            id: 1,
            title: 'Plan de desarrollo',
            description: 'Gestión y seguimiento del plan estratégico institucional',
            icon: FileText,
            color: 'bg-[#2a3d85]',
            hoverColor: 'hover:bg-[#1e2d5f]'
        }
    ];

    return (
        <AppLayout
            title="Dashboard Direccionamiento - Business Intelligence HUV"
            pageTitle="Direccionamiento"
            pageDescription="Planeación Estratégica y Direccionamiento"
            icon={TrendingUp}
            showBackButton={isGerencia}
            backUrl="/dashboard/gerencia"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                        <div
                            key={module.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col"
                        >
                            <div className="flex items-center mb-4">
                                <IconComponent className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">{module.description}</p>
                            <button 
                                onClick={() => {
                                    if (module.id === 1) {
                                        router.get('/plan-desarrollo');
                                    }
                                }}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                {module.id === 1 ? 'Acceder al Módulo' : 'Próximamente'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
