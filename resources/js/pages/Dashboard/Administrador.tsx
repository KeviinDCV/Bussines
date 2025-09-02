import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Shield, Users, Settings, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Administrador() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    const adminModules = [
        {
            id: 1,
            title: 'Gestión de Usuarios',
            description: 'Administrar usuarios y permisos del sistema',
            icon: Users,
            route: '/admin/users'
        }
    ];

    return (
        <AppLayout
            title="Dashboard Administrador - Business Intelligence HUV"
            pageTitle="Administrador"
            pageDescription="Panel de Administración"
            icon={Shield}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminModules.map((module) => {
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
                            <Button 
                                onClick={() => router.get(module.route)}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Administrar
                            </Button>
                        </div>
                    );
                })}
            </div>

        </AppLayout>
    );
}
