import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Shield, Building2, TrendingUp, DollarSign, Stethoscope, Award, Users } from 'lucide-react';

export default function Administrador() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    const dashboards = [
        {
            id: 1,
            title: 'Administrativos',
            description: 'Subgerencia Administrativa',
            icon: Building2,
            route: '/dashboard/administrativos-administrador'
        },
        {
            id: 2,
            title: 'Asistenciales',
            description: 'Subgerencia de Servicios de Salud',
            icon: Stethoscope,
            route: '/dashboard/asistenciales-administrador'
        },
        {
            id: 3,
            title: 'Calidad',
            description: 'Subgerencia de Calidad',
            icon: Award,
            route: '/dashboard/calidad-administrador'
        },
        {
            id: 4,
            title: 'Direccionamiento',
            description: 'Direccionamiento Estratégico',
            icon: TrendingUp,
            route: '/dashboard/direccionamiento-administrador'
        },
        {
            id: 5,
            title: 'Financieros',
            description: 'Subgerencia Financiera',
            icon: DollarSign,
            route: '/dashboard/financieros-administrador'
        },
        {
            id: 6,
            title: 'Gestión de Usuarios',
            description: 'Administrar usuarios y permisos del sistema',
            icon: Users,
            route: '/admin/users'
        },
    ];

    return (
        <AppLayout
            title="Dashboard Administrador - Tableros de Gestión HUV"
            pageTitle="Administrador"
            pageDescription="Panel de Control Administrativo"
            icon={Shield}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboards.map((dashboard) => {
                    const IconComponent = dashboard.icon;
                    return (
                        <div
                            key={dashboard.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col"
                        >
                            <div className="flex items-center mb-4">
                                <IconComponent className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{dashboard.title}</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">{dashboard.description}</p>
                            <button 
                                onClick={() => router.get(dashboard.route)}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                {dashboard.id === 6 ? 'Administrar' : 'Ver Dashboard'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
