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
    Calendar,
    FileText,
    Users,
    User,
    LogOut,
    ChevronDown,
    MapPin,
    Heart,
    TrendingUp,
    Droplets,
    Building
} from 'lucide-react';
import LocationSelector from '@/components/LocationSelector';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Asistenciales() {
    const [selectedLocation, setSelectedLocation] = useState<'cali' | 'cartago' | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    useEffect(() => {
        const savedLocation = localStorage.getItem('asistenciales_location') as 'cali' | 'cartago' | null;
        if (savedLocation) {
            setSelectedLocation(savedLocation);
        }
    }, []);

    const handleLocationSelect = (location: 'cali' | 'cartago') => {
        setSelectedLocation(location);
        localStorage.setItem('asistenciales_location', location);
    };

    const handleLocationChange = () => {
        setSelectedLocation(null);
        localStorage.removeItem('asistenciales_location');
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleChangeEmail = async () => {
        const { value: newEmail } = await Swal.fire({
            title: 'Cambiar Email',
            input: 'email',
            inputLabel: 'Nuevo correo electrónico',
            inputValue: user?.email || '',
            inputPlaceholder: 'usuario@huv.com',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar un email válido';
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'El formato del email no es válido';
                }
            }
        });

        if (newEmail) {
            Swal.fire({
                title: '¡Email actualizado!',
                text: `Tu nuevo email es: ${newEmail}`,
                icon: 'success',
                confirmButtonColor: '#2a3d85'
            });
        }
    };

    const handleChangePassword = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Cambiar Contraseña',
            html: `
                <input id="current-password" type="password" class="swal2-input" placeholder="Contraseña actual">
                <input id="new-password" type="password" class="swal2-input" placeholder="Nueva contraseña">
                <input id="confirm-password" type="password" class="swal2-input" placeholder="Confirmar nueva contraseña">
            `,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            focusConfirm: false,
            preConfirm: () => {
                const currentPassword = (document.getElementById('current-password') as HTMLInputElement)?.value;
                const newPassword = (document.getElementById('new-password') as HTMLInputElement)?.value;
                const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement)?.value;
                
                if (!currentPassword || !newPassword || !confirmPassword) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                
                if (newPassword.length < 6) {
                    Swal.showValidationMessage('La nueva contraseña debe tener al menos 6 caracteres');
                    return false;
                }
                
                if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage('Las contraseñas no coinciden');
                    return false;
                }
                
                return { currentPassword, newPassword };
            }
        });

        if (formValues) {
            Swal.fire({
                title: '¡Contraseña actualizada!',
                text: 'Tu contraseña ha sido cambiada exitosamente',
                icon: 'success',
                confirmButtonColor: '#2a3d85'
            });
        }
    };

    if (!selectedLocation) {
        return <LocationSelector onLocationSelect={handleLocationSelect} userRole="Asistenciales" />;
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard Asistenciales - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Users className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Asistenciales - {selectedLocation === 'cali' ? 'Cali' : 'Cartago'}</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                                <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                            </div>
                            
                            {/* User Menu */}
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
                                        
                                        <div className="py-1">
                                            {/* Settings only visible for Administrator role */}
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

                {/* Healthcare Management Modules */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Subgerencia de Servicios de Salud</h2>
                        <button 
                            onClick={handleLocationChange}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                        >
                            Cambiar Ubicación
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {/* Gestión integral de Urgencias */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <AlertTriangle className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Urgencias</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Monitoreo y gestión de servicios de urgencias médicas</p>
                            <button 
                                onClick={() => router.get('/asistenciales/urgencias')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Ambulatorio */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Stethoscope className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Ambulatorio</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Control de consultas externas y atención ambulatoria</p>
                            <button 
                                onClick={() => router.get('/asistenciales/ambulatorio')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Hospitalización */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Building2 className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Hospitalización</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Administración de pacientes hospitalizados</p>
                            <button 
                                onClick={() => router.get('/asistenciales/hospitalizacion')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Cirugía */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Scissors className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Cirugía</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Control de quirófanos y procedimientos quirúrgicos</p>
                            <button 
                                onClick={() => router.get('/asistenciales/cirugia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Imágenes */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Camera className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Imágenes</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Administración de estudios radiológicos e imágenes</p>
                            <button 
                                onClick={() => router.get('/asistenciales/imagenes')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Laboratorio */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <TestTube className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Laboratorio</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Control de análisis clínicos y pruebas de laboratorio</p>
                            <button 
                                onClick={() => router.get('/asistenciales/laboratorio')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Ginecología y Obstetricia */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Baby className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Ginecología y Obstetricia</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Atención especializada en salud femenina y materna</p>
                            <button 
                                onClick={() => router.get('/asistenciales/ginecologia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Gestión integral de Medicina Física */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Dumbbell className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión integral de Medicina Física</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Rehabilitación y terapia física especializada</p>
                            <button 
                                onClick={() => router.get('/asistenciales/medicina-fisica')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Mortalidad */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Heart className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortalidad</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Análisis y seguimiento de indicadores de mortalidad</p>
                            <button 
                                onClick={() => router.get('/asistenciales/mortalidad')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Epidemiología */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <TrendingUp className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Epidemiología</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Vigilancia epidemiológica y control de enfermedades</p>
                            <button 
                                onClick={() => router.get('/asistenciales/epidemiologia')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Banco de Sangre */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Droplets className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Banco de Sangre</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión de donaciones y transfusiones sanguíneas</p>
                            <button 
                                onClick={() => router.get('/asistenciales/banco-sangre')}
                                className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                            >
                                Acceder al Módulo
                            </button>
                        </div>

                        {/* Extensión Hospitalaria */}
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                            <div className="flex items-center mb-4">
                                <Building className="w-10 h-10 text-[#2a3d85]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Extensión Hospitalaria</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">Programas de extensión y servicios comunitarios</p>
                            <button 
                                onClick={() => router.get('/asistenciales/extension-hospitalaria')}
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
