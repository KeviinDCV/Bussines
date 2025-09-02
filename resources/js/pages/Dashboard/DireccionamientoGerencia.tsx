import { Head, router, usePage } from '@inertiajs/react';
import { TrendingUp, Target, BarChart3, PieChart, FileText, User, LogOut, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function DireccionamientoGerencia() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const handleBackToGerencia = () => {
        router.get('/dashboard/gerencia');
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const modules = [
        {
            id: 1,
            title: 'Plan de desarrollo',
            description: 'Gestión y seguimiento del plan estratégico institucional',
            icon: FileText,
        },
        {
            id: 2,
            title: 'Módulo 2',
            description: 'Funcionalidad en desarrollo',
            icon: Target,
        },
        {
            id: 3,
            title: 'Módulo 3',
            description: 'Funcionalidad en desarrollo',
            icon: BarChart3,
        },
        {
            id: 4,
            title: 'Módulo 4',
            description: 'Funcionalidad en desarrollo',
            icon: PieChart,
        },
        {
            id: 5,
            title: 'Módulo 5',
            description: 'Funcionalidad en desarrollo',
            icon: TrendingUp,
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Módulo Direccionamiento - Gerencia - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={handleBackToGerencia}
                                className="mr-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                title="Volver a Gerencia"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <TrendingUp className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Gerencia - Direccionamiento</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                                <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                            </div>
                            
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="text-sm">{user?.name || ''}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>
                                
                                <div className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transition-all duration-200 origin-top-right ${
                                    showUserMenu 
                                        ? 'opacity-100 scale-100 translate-y-0' 
                                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }`}>
                                    <div className="py-2">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user?.name || ''}</p>
                                            <p className="text-xs text-gray-500">{user?.email || 'email@huv.com'}</p>
                                        </div>
                                        
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors mt-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
                                            router.get('/plan-desarrollo?from=gerencia');
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
            </div>
        </div>
    );
}