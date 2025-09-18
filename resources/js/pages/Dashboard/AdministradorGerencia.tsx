import { Head, router, usePage } from '@inertiajs/react';
import { Users, ArrowLeft, User, LogOut, ChevronDown, Shield } from 'lucide-react';
import { useState } from 'react';

export default function AdministradorGerencia() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleBackToGerencia = () => {
        router.get('/dashboard/gerencia');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Gerencia - Administrador - Tableros de Gestión HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={handleBackToGerencia}
                                className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <Shield className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Gerencia - Administrador</h1>
                                <p className="opacity-90">Administración del sistema</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                        <div className="bg-[#2a3d85] hover:bg-[#1e2d5f] transition-colors duration-300 p-6 rounded-t-lg">
                            <Users className="w-12 h-12 text-white mb-4" />
                            <h3 className="text-xl font-bold text-white">Gestión de Usuarios</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 mb-4">Administrar usuarios del sistema, roles y permisos de acceso</p>
                            <button 
                                onClick={() => router.get('/admin/users?from=gerencia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Acceder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}