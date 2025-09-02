import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Award, FileText, Settings, BarChart3, Search, TrendingUp, Heart, RefreshCw, Stethoscope, Headphones, Shield } from 'lucide-react';

export default function CalidadGerencia() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    const modules = [
        {
            id: 1,
            title: 'PAMEC',
            description: 'Programa de Auditoría para el Mejoramiento de la Calidad',
            icon: Shield,
            route: '/calidad/pamec'
        },
        {
            id: 2,
            title: 'Documentos',
            description: 'Gestión documental y control de versiones',
            icon: FileText,
            route: '/calidad/documentos'
        },
        {
            id: 3,
            title: 'Habilitación',
            description: 'Procesos de habilitación y acreditación',
            icon: Settings,
            route: '/calidad/habilitacion'
        },
        {
            id: 4,
            title: 'Indicadores',
            description: 'Métricas e indicadores de calidad',
            icon: BarChart3,
            route: '/calidad/indicadores'
        },
        {
            id: 5,
            title: 'Auditoría',
            description: 'Auditorías internas y externas',
            icon: Search,
            route: '/calidad/auditoria'
        },
        {
            id: 6,
            title: 'Mejoramiento',
            description: 'Planes de mejoramiento continuo',
            icon: TrendingUp,
            route: '/calidad/mejoramiento'
        },
        {
            id: 7,
            title: 'Humanización',
            description: 'Programa de humanización en salud',
            icon: Heart,
            route: '/calidad/humanizacion'
        },
        {
            id: 8,
            title: 'Referenciaciones',
            description: 'Sistema de referencias y contrarreferencias',
            icon: RefreshCw,
            route: '/calidad/referenciaciones'
        },
        {
            id: 9,
            title: 'Tecnovigilancia',
            description: 'Vigilancia de dispositivos médicos',
            icon: Stethoscope,
            route: '/calidad/tecnovigilancia'
        },
        {
            id: 10,
            title: 'Centro de Escucha',
            description: 'Atención y seguimiento a usuarios',
            icon: Headphones,
            route: '/calidad/centro-escucha'
        }
    ];

    return (
        <AppLayout
            title="Gerencia - Calidad - Business Intelligence HUV"
            pageTitle="Calidad - Gerencia"
            pageDescription="Subgerencia de Calidad - Vista Gerencial"
            icon={Award}
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
