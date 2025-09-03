import React, { useState, ReactNode } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { User, LogOut, ChevronDown, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

interface AppLayoutProps {
    children: ReactNode;
    title: string;
    pageTitle: string;
    pageDescription: string;
    icon: React.ComponentType<any>;
    showBackButton?: boolean;
    backUrl?: string;
}

export default function AppLayout({ 
    children, 
    title, 
    pageTitle, 
    pageDescription, 
    icon: IconComponent,
    showBackButton = false,
    backUrl = '/dashboard'
}: AppLayoutProps) {
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
            router.patch('/profile/email', { email: newEmail }, {
                onSuccess: () => {
                    Swal.fire({
                        title: '¡Email actualizado!',
                        text: `Tu nuevo email es: ${newEmail}`,
                        icon: 'success',
                        confirmButtonColor: '#2a3d85'
                    });
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join('\n');
                    Swal.fire({
                        title: 'Error',
                        text: errorMessage || 'No se pudo actualizar el email',
                        icon: 'error',
                        confirmButtonColor: '#2a3d85'
                    });
                }
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
            router.patch('/profile/password', { 
                current_password: formValues.currentPassword,
                password: formValues.newPassword,
                password_confirmation: formValues.newPassword
            }, {
                onSuccess: () => {
                    Swal.fire({
                        title: '¡Contraseña actualizada!',
                        text: 'Tu contraseña ha sido cambiada exitosamente',
                        icon: 'success',
                        confirmButtonColor: '#2a3d85'
                    });
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join('\n');
                    Swal.fire({
                        title: 'Error',
                        text: errorMessage || 'No se pudo actualizar la contraseña',
                        icon: 'error',
                        confirmButtonColor: '#2a3d85'
                    });
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title} />
            
            {/* Header */}
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {showBackButton && (
                                <button
                                    onClick={() => router.get(backUrl)}
                                    className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            )}
                            <IconComponent className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">{pageTitle}</h1>
                                <p className="opacity-90">{pageDescription}</p>
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

            {/* Content */}
            <div className="max-w-7xl mx-auto p-6">
                {children}
            </div>
        </div>
    );
}