import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Building2, Users, Shield, Monitor, Wrench, Pill } from 'lucide-react';

export default function AdministrativosGerencia() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    const modules = [
        {
            id: 1,
            title: 'Talento Humano',
            description: 'Gestión del recurso humano y nómina',
            icon: Users,
            route: '/administrativos/talento-humano'
        },
        {
            id: 2,
            title: 'CIAU',
            description: 'Centro de Información y Atención al Usuario',
            icon: Shield,
            route: '/administrativos/ciau'
        },
        {
            id: 3,
            title: 'Sistemas de Información',
            description: 'Gestión de tecnología y sistemas',
            icon: Monitor,
            route: '/administrativos/sistemas-informacion'
        },
        {
            id: 4,
            title: 'Gestión Técnica y Logística',
            description: 'Mantenimiento y logística hospitalaria',
            icon: Wrench,
            route: '/administrativos/gestion-tecnica-logistica'
        },
        {
            id: 5,
            title: 'Farmacia',
            description: 'Gestión farmacéutica y medicamentos',
            icon: Pill,
            route: '/administrativos/farmacia'
        }
    ];

    return (
        <AppLayout
            title="Gerencia - Administrativos - Business Intelligence HUV"
            pageTitle="Administrativos - Gerencia"
            pageDescription="Subgerencia Administrativa - Vista Gerencial"
            icon={Building2}
            showBackButton={true}
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
                                onClick={() => router.get(module.route)}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Ver Módulo
                            </button>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
