import React, { useState, ReactNode } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { User, LogOut, ChevronDown, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { robustLogout, forceLogout, logAuthError } from '@/utils/auth';
import { useAuthHistory } from '@/hooks/useAuthHistory';

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
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { props } = usePage();
    const user = (props as any).auth?.user;
    
    // Usar el hook para manejar el historial de autenticación
    useAuthHistory();

    const handleLogout = async () => {
        // Protección contra doble ejecución
        if (isLoggingOut) {
            return;
        }
        
        try {
            // Set flag to prevent duplicate executions
            setIsLoggingOut(true);
            
            // Close user menu immediately for better UX
            setShowUserMenu(false);
            
            // Use robust logout utility
            await robustLogout();
            
        } catch (error) {
            // Log error for debugging
            logAuthError('AppLayout.handleLogout', error);
            
            // This should never happen since robustLogout has its own fallback,
            // but just in case, force a redirect
            console.error('🚨 Unexpected logout error:', error);
            window.location.href = '/login';
        } finally {
            // Reset flag (aunque probablemente no se ejecute por redirect)
            setIsLoggingOut(false);
        }
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
        // Step 1: Current password
        const { value: currentPassword } = await Swal.fire({
            title: 'Cambiar Contraseña',
            text: 'Paso 1 de 3: Ingresa tu contraseña actual',
            input: 'password',
            inputLabel: 'Contraseña actual',
            inputPlaceholder: 'Ingresa tu contraseña actual',
            showCancelButton: true,
            confirmButtonText: 'Siguiente',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar tu contraseña actual';
                }
            }
        });

        if (!currentPassword) return;

        // Step 2: New password
        const { value: newPassword } = await Swal.fire({
            title: 'Cambiar Contraseña',
            text: 'Paso 2 de 3: Ingresa tu nueva contraseña',
            input: 'password',
            inputLabel: 'Nueva contraseña',
            inputPlaceholder: 'Mínimo 6 caracteres',
            showCancelButton: true,
            confirmButtonText: 'Siguiente',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar una nueva contraseña';
                }
                if (value.length < 6) {
                    return 'La nueva contraseña debe tener al menos 6 caracteres';
                }
            }
        });

        if (!newPassword) return;

        // Step 3: Confirm password
        const { value: confirmPassword } = await Swal.fire({
            title: 'Cambiar Contraseña',
            text: 'Paso 3 de 3: Confirma tu nueva contraseña',
            input: 'password',
            inputLabel: 'Confirmar nueva contraseña',
            inputPlaceholder: 'Repite tu nueva contraseña',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes confirmar tu nueva contraseña';
                }
                if (value !== newPassword) {
                    return 'Las contraseñas no coinciden';
                }
            }
        });

        if (!confirmPassword) return;

        const formValues = { currentPassword, newPassword };

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