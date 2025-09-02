import { Head, router, usePage } from '@inertiajs/react';
import { Activity, ArrowLeft, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function UciAdultos() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleBackToDashboard = () => {
        // Detectar si viene desde Gerencia usando parámetro URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('from') === 'gerencia') {
            router.get('/dashboard/asistenciales-gerencia');
        } else {
            router.get('/dashboard/asistenciales');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="UCI Adultos - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={handleBackToDashboard}
                                className="mr-2 sm:mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <Activity className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold">UCI Adultos</h1>
                                <p className="text-xs sm:text-base opacity-90 hidden sm:block">Unidad de Cuidados Intensivos para pacientes adultos</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                                <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                            </div>
                            
                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-1 sm:space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-2 sm:px-3 py-2 transition-colors"
                                >
                                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-xs sm:text-sm hidden sm:inline">{user?.name || ''}</span>
                                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
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

            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Módulo en Desarrollo</h2>
                    <div className="text-center py-8 sm:py-12">
                        <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                        <p className="text-sm sm:text-base text-gray-600 px-4">
                            El módulo de UCI Adultos está siendo desarrollado.
                            <br />
                            Pronto estará disponible con todas las funcionalidades.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
