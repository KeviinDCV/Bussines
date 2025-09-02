import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { 
    Shield, 
    FileText, 
    Settings, 
    BarChart3, 
    Search, 
    TrendingUp, 
    Heart, 
    RefreshCw, 
    Stethoscope, 
    Headphones,
    Award
} from 'lucide-react';
export default function Calidad() {

    return (
        <AppLayout
            title="Dashboard Calidad - Business Intelligence HUV"
            pageTitle="Calidad"
            pageDescription="Gestión de Calidad y Mejoramiento Continuo"
            icon={Award}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* PAMEC */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">PAMEC</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Programa de Auditoría para el Mejoramiento de la Calidad</p>
                    <button 
                        onClick={() => router.get('/calidad/pamec')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Documentos */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Documentos</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión documental y control de versiones</p>
                    <button 
                        onClick={() => router.get('/calidad/documentos')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Habilitación */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Habilitación</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Procesos de habilitación y acreditación</p>
                    <button 
                        onClick={() => router.get('/calidad/habilitacion')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Indicadores */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Indicadores</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Métricas e indicadores de calidad</p>
                    <button 
                        onClick={() => router.get('/calidad/indicadores')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Auditoría */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Auditoría</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Auditorías internas y externas</p>
                    <button 
                        onClick={() => router.get('/calidad/auditoria')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Mejoramiento */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Mejoramiento</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Planes de mejoramiento continuo</p>
                    <button 
                        onClick={() => router.get('/calidad/mejoramiento')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Humanización */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Humanización</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Programa de humanización en salud</p>
                    <button 
                        onClick={() => router.get('/calidad/humanizacion')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Referenciaciones */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Referenciaciones</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Sistema de referencias y contrarreferencias</p>
                    <button 
                        onClick={() => router.get('/calidad/referenciaciones')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Tecnovigilancia */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Tecnovigilancia</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Vigilancia de dispositivos médicos</p>
                    <button 
                        onClick={() => router.get('/calidad/tecnovigilancia')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Centro de Escucha */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Centro de Escucha</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Atención y seguimiento a usuarios</p>
                    <button 
                        onClick={() => router.get('/calidad/centro-escucha')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
