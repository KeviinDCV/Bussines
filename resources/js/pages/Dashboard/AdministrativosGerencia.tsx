import { Head, router, usePage } from '@inertiajs/react';
import { Building2, Users, Shield, Monitor, Wrench, Pill, User, LogOut, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function AdministrativosGerencia() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const handleBackToGerencia = () => {
        router.get('/dashboard/gerencia');
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Módulo Administrativos - Gerencia - Business Intelligence HUV" />
            
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
                            <Building2 className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Gerencia - Administrativos</h1>
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
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Subgerencia Administrativa</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Users className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Talento Humano</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión de recursos humanos y personal</p>
                            <button 
                                onClick={() => router.get('/administrativos/talento-humano?from=gerencia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Shield className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">CIAU</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Centro de Información y Atención al Usuario</p>
                            <button 
                                onClick={() => router.get('/administrativos/ciau?from=gerencia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Monitor className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistemas de Información</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión de tecnología y sistemas</p>
                            <button 
                                onClick={() => router.get('/administrativos/sistemas-informacion?from=gerencia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Wrench className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión Técnica y Logística</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Mantenimiento y gestión logística</p>
                            <button 
                                onClick={() => router.get('/administrativos/gestion-tecnica-logistica?from=gerencia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Pill className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Farmacia</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión farmacéutica y medicamentos</p>
                            <button 
                                onClick={() => router.get('/administrativos/farmacia?from=gerencia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}