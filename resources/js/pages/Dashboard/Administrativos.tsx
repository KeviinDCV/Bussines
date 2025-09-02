import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { 
    Users, 
    Shield, 
    Monitor, 
    Wrench, 
    Pill,
    Building
} from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Administrativos() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const userPermissions = (props as any).userPermissions || [];

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

    return (
        <AppLayout
            title="Dashboard Administrativos - Business Intelligence HUV"
            pageTitle="Administrativos"
            pageDescription="Subgerencia Administrativa y Financiera"
            icon={Building}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Talento Humano */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Users className="w-10 h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Talento Humano</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión de recursos humanos y personal</p>
                    <button 
                        onClick={() => router.get('/administrativos/talento-humano')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* CIAU */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Shield className="w-10 h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">CIAU</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Centro de Información y Atención al Usuario</p>
                    <button 
                        onClick={() => router.get('/administrativos/ciau')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Sistemas de Información */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Monitor className="w-10 h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistemas de Información</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión de tecnología y sistemas</p>
                    <button 
                        onClick={() => router.get('/administrativos/sistemas-informacion')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Gestión Técnica y Logística */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Wrench className="w-10 h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión Técnica y Logística</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Mantenimiento y gestión logística</p>
                    <button 
                        onClick={() => router.get('/administrativos/gestion-tecnica-logistica')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>

                {/* Farmacia */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col">
                    <div className="flex items-center mb-4">
                        <Pill className="w-10 h-10 text-[#2a3d85]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Farmacia</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">Gestión farmacéutica y medicamentos</p>
                    <button 
                        onClick={() => router.get('/administrativos/farmacia')}
                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto"
                    >
                        Acceder al Módulo
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
