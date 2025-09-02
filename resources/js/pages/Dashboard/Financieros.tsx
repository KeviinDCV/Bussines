import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { 
    FileText,
    Wallet,
    PiggyBank,
    AlertTriangle,
    Calculator,
    BookOpen,
    DollarSign
} from 'lucide-react';

export default function Financieros() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];
    const user = (props as any).auth?.user;
    const isGerencia = user?.role === 'Gerencia';

    const modules = [
        {
            id: 1,
            title: 'Contabilidad',
            description: 'Gestión contable y estados financieros',
            icon: Calculator,
            route: '/financieros/contabilidad'
        },
        {
            id: 2,
            title: 'Presupuesto',
            description: 'Planificación y control presupuestario',
            icon: PiggyBank,
            route: '/financieros/presupuesto'
        },
        {
            id: 3,
            title: 'Tesorería',
            description: 'Gestión de flujo de caja y tesorería',
            icon: Wallet,
            route: '/financieros/tesoreria'
        },
        {
            id: 4,
            title: 'Facturación',
            description: 'Control de facturación y cartera',
            icon: FileText,
            route: '/financieros/facturacion'
        },
        {
            id: 5,
            title: 'Costos',
            description: 'Análisis y control de costos',
            icon: AlertTriangle,
            route: '/financieros/costos'
        },
        {
            id: 6,
            title: 'Auditoría Financiera',
            description: 'Auditoría y control financiero',
            icon: BookOpen,
            route: '/financieros/auditoria-financiera'
        }
    ];

    return (
        <AppLayout
            title="Dashboard Financieros - Business Intelligence HUV"
            pageTitle="Financieros"
            pageDescription="Subgerencia Financiera"
            icon={DollarSign}
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
                                onClick={() => router.get(module.route)}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Próximamente
                            </button>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
