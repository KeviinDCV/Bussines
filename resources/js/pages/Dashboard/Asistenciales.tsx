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
        <AppLayout
            title="Dashboard Asistenciales - Business Intelligence HUV"
            pageTitle="Asistenciales"
            pageDescription="Subgerencia de Servicios de Salud"
            icon={Stethoscope}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        </AppLayout>
    );
}