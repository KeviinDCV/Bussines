import { Head, router, usePage } from '@inertiajs/react';
import { 
    DollarSign, 
    CreditCard, 
    TrendingDown, 
    TrendingUp, 
    User, 
    LogOut, 
    ChevronDown,
    FileText,
    Wallet,
    PiggyBank,
    AlertTriangle,
    Calculator,
    BookOpen
} from 'lucide-react';
import LocationSelector from '@/components/LocationSelector';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Financieros() {
    const [selectedLocation, setSelectedLocation] = useState<'cali' | 'cartago' | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

    useEffect(() => {
        const savedLocation = localStorage.getItem('financieros_location') as 'cali' | 'cartago' | null;
        if (savedLocation) {
            setSelectedLocation(savedLocation);
        }
    }, []);

    const handleLocationSelect = (location: 'cali' | 'cartago') => {
        setSelectedLocation(location);
        localStorage.setItem('financieros_location', location);
    };

    const handleLocationChange = () => {
        setSelectedLocation(null);
        localStorage.removeItem('financieros_location');
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
        return <LocationSelector onLocationSelect={handleLocationSelect} userRole="Financieros" />;
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard Financieros - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <DollarSign className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">MÓDULOS Financieros - {selectedLocation === 'cali' ? 'Cali' : 'Cartago'}</h1>
                                <p className="opacity-90">Gestión financiera - Sede {selectedLocation === 'cali' ? 'Cali' : 'Cartago'}</p>
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

                {/* Financial Management Modules */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Subgerencia Financiera</h2>
                        <button 
                            onClick={handleLocationChange}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                        >
                            Cambiar Ubicación
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {/* Facturación */}
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

                        {/* Cartera */}
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

                        {/* Recaudo */}
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

                        {/* Glosas */}
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

                        {/* Presupuesto */}
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

                        {/* Contabilidad */}
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
                    </div>
                </div>

            </div>
        </div>
    );
}
