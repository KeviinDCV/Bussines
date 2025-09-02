import { Head, router, usePage } from '@inertiajs/react';
import { FileText, ArrowLeft, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Documentos() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleBackToDashboard = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const fromGerencia = urlParams.get('from') === 'gerencia';
        
        if (fromGerencia) {
            router.get('/dashboard/calidad-gerencia');
        } else {
            router.get('/dashboard/calidad');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Documentos - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center">
                            <button
                                onClick={handleBackToDashboard}
                                className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <FileText className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold">Documentos</h1>
                                <p className="text-sm sm:text-base opacity-90">Gestión documental y control de versiones</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                                <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                            </div>
                            
                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
                                >
                                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
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

            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                        <p className="text-gray-600">
                            El módulo de Documentos está siendo desarrollado.
                            <br />
                            Pronto estará disponible con todas las funcionalidades.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
