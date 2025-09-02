import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { 
    AlertTriangle, 
    Stethoscope, 
    Building2, 
    Scissors, 
    Camera, 
    TestTube, 
    Baby, 
    Dumbbell,
    Activity,
    Heart,
    TrendingUp,
    Droplets,
    Building
} from 'lucide-react';

export default function AsistencialesGerencia() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    const modules = [
        {
            id: 1,
            title: 'UCI Adultos',
            description: 'Unidad de Cuidados Intensivos para pacientes adultos',
            icon: Activity,
            route: '/asistenciales/uci-adultos'
        },
        {
            id: 2,
            title: 'UCI Pediátrico',
            description: 'Unidad de Cuidados Intensivos Pediátrica',
            icon: Baby,
            route: '/asistenciales/uci-pediatrico'
        },
        {
            id: 3,
            title: 'UCI Neonatal',
            description: 'Unidad de Cuidados Intensivos Neonatal',
            icon: Heart,
            route: '/asistenciales/uci-neonatal'
        },
        {
            id: 4,
            title: 'Urgencias',
            description: 'Servicio de Urgencias y Emergencias',
            icon: AlertTriangle,
            route: '/asistenciales/urgencias'
        },
        {
            id: 5,
            title: 'Cirugía',
            description: 'Servicios Quirúrgicos',
            icon: Scissors,
            route: '/asistenciales/cirugia'
        },
        {
            id: 6,
            title: 'Hospitalización',
            description: 'Servicios de Hospitalización',
            icon: Building2,
            route: '/asistenciales/hospitalizacion'
        },
        {
            id: 7,
            title: 'Imágenes Diagnósticas',
            description: 'Servicios de Diagnóstico por Imágenes',
            icon: Camera,
            route: '/asistenciales/imagenes-diagnosticas'
        },
        {
            id: 8,
            title: 'Laboratorio',
            description: 'Servicios de Laboratorio Clínico',
            icon: TestTube,
            route: '/asistenciales/laboratorio'
        },
        {
            id: 9,
            title: 'Rehabilitación',
            description: 'Servicios de Rehabilitación y Fisioterapia',
            icon: Dumbbell,
            route: '/asistenciales/rehabilitacion'
        },
        {
            id: 10,
            title: 'Hemodiálisis',
            description: 'Unidad de Hemodiálisis',
            icon: Droplets,
            route: '/asistenciales/hemodialisis'
        },
        {
            id: 11,
            title: 'Consulta Externa',
            description: 'Servicios de Consulta Externa',
            icon: Building,
            route: '/asistenciales/consulta-externa'
        },
        {
            id: 12,
            title: 'Indicadores Gerenciales',
            description: 'Métricas e indicadores de gestión asistencial',
            icon: TrendingUp,
            route: '/asistenciales/indicadores-gerenciales'
        }
    ];

    return (
        <AppLayout
            title="Gerencia - Asistenciales - Business Intelligence HUV"
            pageTitle="Asistenciales - Gerencia"
            pageDescription="Subgerencia de Servicios de Salud - Vista Gerencial"
            icon={Stethoscope}
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
