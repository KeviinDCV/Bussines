import { Head, router, usePage } from '@inertiajs/react';
import { 
    FileText,
    Wallet,
    PiggyBank,
    AlertTriangle,
    Calculator,
    BookOpen,
    User,
    LogOut,
    ChevronDown,
    DollarSign
} from 'lucide-react';
import { useState } from 'react';

export default function Financieros() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const userPermissions = (props as any).userPermissions || [];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard Financieros - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <DollarSign className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Financieros</h1>
                                <p className="opacity-90">Subgerencia Financiera</p>
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
                                
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {/* Facturación */}
                    {userPermissions.includes('Facturación') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-4">
                            <FileText className="w-10 h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Facturación</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión y control de facturación de servicios médicos</p>
                        <button 
                            onClick={() => router.get('/financieros/facturacion')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Cartera */}
                    {userPermissions.includes('Cartera') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-4">
                            <Wallet className="w-10 h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cartera</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">Administración de cuentas por cobrar y seguimiento</p>
                        <button 
                            onClick={() => router.get('/financieros/cartera')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Recaudo */}
                    {userPermissions.includes('Recaudo') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-4">
                            <PiggyBank className="w-10 h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recaudo</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">Control de ingresos y recaudos hospitalarios</p>
                        <button 
                            onClick={() => router.get('/financieros/recaudo')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Glosas */}
                    {userPermissions.includes('Glosas') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-4">
                            <AlertTriangle className="w-10 h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Glosas</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión de glosas y objeciones de facturación</p>
                        <button 
                            onClick={() => router.get('/financieros/glosas')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Presupuesto */}
                    {userPermissions.includes('Presupuesto') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-4">
                            <Calculator className="w-10 h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Presupuesto</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">Planificación y control presupuestario institucional</p>
                        <button 
                            onClick={() => router.get('/financieros/presupuesto')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Contabilidad */}
                    {userPermissions.includes('Contabilidad') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-4">
                            <BookOpen className="w-10 h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Contabilidad</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">Registro contable y estados financieros</p>
                        <button 
                            onClick={() => router.get('/financieros/contabilidad')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}