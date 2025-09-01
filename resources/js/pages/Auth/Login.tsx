import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showError, showSuccess } from '@/utils/sweetAlert';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface LoginProps {
    errors?: {
        email?: string;
        password?: string;
    };
}

interface LoginData {
    email: string;
    password: string;
}

export default function Login({ errors }: LoginProps) {
    const { data, setData, post, processing } = useForm<LoginData>({
        email: '',
        password: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (errors?.email) {
            showError('Error de autenticación', errors.email);
        }
    }, [errors]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!data.email || !data.password) {
            showError('Campos requeridos', 'Por favor ingrese su email y contraseña');
            return;
        }

        try {
            // Get fresh CSRF token before login attempt
            const response = await fetch('/login');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const freshToken = doc.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            if (freshToken) {
                // Update meta tag and axios headers with fresh token
                const metaTag = document.querySelector('meta[name="csrf-token"]');
                if (metaTag) {
                    metaTag.setAttribute('content', freshToken);
                }
                axios.defaults.headers.common['X-CSRF-TOKEN'] = freshToken;
            }
        } catch (error) {
            console.log('Could not refresh CSRF token');
        }

        post('/login', {
            onSuccess: () => {
                showSuccess('¡Bienvenido!', 'Ingreso exitoso al sistema');
            },
            onError: (errors) => {
                // If CSRF error (419), force page reload
                if (Object.keys(errors).length === 0) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    showError('Error de autenticación', 'Credenciales incorrectas o cuenta inactiva');
                }
            }
        });
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
            <Head title="Business Intelligence HUV - Login" />
            <style dangerouslySetInnerHTML={{
                __html: `
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        -webkit-box-shadow: 0 0 0 30px white inset !important;
                        -webkit-text-fill-color: #111827 !important;
                        background-color: white !important;
                        color: #111827 !important;
                    }
                `
            }} />
            
            <div className="w-full max-w-md mx-auto">
                {/* Centered Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                            <img src="/images/logo.png" alt="HUV Logo" className="w-16 h-16 object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#2a3d85] mb-2">
                            Business Intelligence HUV
                        </h1>
                        <p className="text-gray-600">
                            Hospital Universitario del Valle "Evaristo Garcia" E.S.E
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="usuario@huv.com"
                                className="h-12 border-gray-300 focus:border-[#2a3d85] focus:ring-[#2a3d85] text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a3d85]/20 selection:bg-[#2a3d85] selection:text-white"
                                style={{
                                    WebkitBoxShadow: '0 0 0 1000px white inset !important',
                                    WebkitTextFillColor: '#111827 !important',
                                    backgroundColor: 'white !important'
                                }}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="h-12 border-gray-300 focus:border-[#2a3d85] focus:ring-[#2a3d85] pr-12 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a3d85]/20 selection:bg-[#2a3d85] selection:text-white"
                                    style={{
                                        WebkitBoxShadow: '0 0 0 1000px white inset !important',
                                        WebkitTextFillColor: '#111827 !important',
                                        backgroundColor: 'white !important'
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2a3d85]/20"
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                    Ingresando...
                                </>
                            ) : (
                                'Ingresar al Sistema'
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            ¿Problemas para acceder? Contacte al administrador del sistema
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Bottom Left - Innovation */}
            <div className="absolute bottom-6 left-6">
                <p className="text-sm text-gray-500 font-medium">
                    Innovación y Desarrollo
                </p>
            </div>
            
            {/* Bottom Right - Quality Management */}
            <div className="absolute bottom-6 right-6">
                <p className="text-sm text-gray-500 font-medium">
                    Gestión de Calidad y Mejoramiento
                </p>
            </div>
        </div>
    );
}
