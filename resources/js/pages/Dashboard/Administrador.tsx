import { Head, Link, router, usePage } from '@inertiajs/react';
import { Shield, Users, Settings, Database, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Administrador() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;

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

    const modules = [
        {
            id: 1,
            title: 'Gestión de Usuarios',
            description: 'Administrar usuarios del sistema, roles y permisos de acceso',
            icon: Users,
            color: 'bg-[#2a3d85]',
            hoverColor: 'hover:bg-[#1e2d5f]'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard Administrador - Business Intelligence HUV" />
            
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Shield className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">MÓDULOS Administrador</h1>
                                <p className="opacity-90">Administración del sistema</p>
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
                                            <button 
                                                onClick={() => setShowSettings(!showSettings)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between transition-colors"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Settings className="w-4 h-4" />
                                                    <span>Ajustes</span>
                                                </div>
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`} />
                                            </button>
                                            
                                            <div className={`transition-all duration-200 overflow-hidden ${
                                                showSettings ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                                <button 
                                                    onClick={handleChangeEmail}
                                                    className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                                                >
                                                    <User className="w-3 h-3" />
                                                    <span>Cambiar Email</span>
                                                </button>
                                                <button 
                                                    onClick={handleChangePassword}
                                                    className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                                                >
                                                    <Settings className="w-3 h-3" />
                                                    <span>Cambiar Contraseña</span>
                                                </button>
                                            </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => {
                        const IconComponent = module.icon;
                        return (
                            <div
                                key={module.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                            >
                                <div className={`${module.color} ${module.hoverColor} transition-colors duration-300 p-6 rounded-t-lg`}>
                                    <IconComponent className="w-12 h-12 text-white mb-4" />
                                    <h3 className="text-xl font-bold text-white">{module.title}</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4">{module.description}</p>
                                    <button 
                                        onClick={() => {
                                            if (module.id === 1) {
                                                router.get('/admin/users');
                                            }
                                        }}
                                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        {module.id === 1 ? 'Acceder al Módulo' : 'Próximamente'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
