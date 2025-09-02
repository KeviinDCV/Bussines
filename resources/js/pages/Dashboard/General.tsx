import { Head, router, usePage } from '@inertiajs/react';
import { Home, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function General() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard General - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Home className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Dashboard General</h1>
                                <p className="opacity-90">Sistema de Inteligencia de Negocios</p>
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
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Bienvenido al Sistema</h2>
                    <div className="text-center py-12">
                        <Home className="w-16 h-16 text-[#2a3d85] mx-auto mb-4" />
                        <p className="text-gray-600">
                            Sistema de Inteligencia de Negocios del Hospital Universitario del Valle.
                            <br />
                            Selecciona tu rol específico para acceder a los módulos correspondientes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}