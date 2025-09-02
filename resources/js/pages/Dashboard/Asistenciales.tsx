import { Head, router, usePage } from '@inertiajs/react';
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
    Building,
    User,
    LogOut,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export default function Asistenciales() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const userPermissions = (props as any).userPermissions || [];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard Asistenciales - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Stethoscope className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Asistenciales</h1>
                                <p className="opacity-90">Subgerencia de Servicios de Salud</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                    {/* Gestión integral de Urgencias */}
                    {userPermissions.includes('Urgencias') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Gestión integral de Urgencias</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">Monitoreo y gestión de servicios de urgencias médicas</p>
                        <button 
                            onClick={() => router.get('/asistenciales/urgencias')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Gestión integral de Ambulatorio */}
                    {userPermissions.includes('Ambulatorio') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Gestión integral de Ambulatorio</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">Control de consultas externas y atención ambulatoria</p>
                        <button 
                            onClick={() => router.get('/asistenciales/ambulatorio')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Gestión integral de Hospitalización */}
                    {userPermissions.includes('Hospitalización') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Gestión integral de Hospitalización</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">Administración de pacientes hospitalizados</p>
                        <button 
                            onClick={() => router.get('/asistenciales/hospitalizacion')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Gestión integral de Cirugía */}
                    {userPermissions.includes('Cirugía') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Gestión integral de Cirugía</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">Control de quirófanos y procedimientos quirúrgicos</p>
                        <button 
                            onClick={() => router.get('/asistenciales/cirugia')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
                        >
                            Acceder al Módulo
                        </button>
                    </div>
                    )}

                    {/* Gestión integral de Laboratorio */}
                    {userPermissions.includes('Laboratorio') && (
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <TestTube className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Gestión integral de Laboratorio</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">Control de análisis clínicos y pruebas de laboratorio</p>
                        <button 
                            onClick={() => router.get('/asistenciales/laboratorio')}
                            className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium mt-auto"
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