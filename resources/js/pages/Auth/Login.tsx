import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
    remember: boolean;
}

export default function Login({ errors }: LoginProps) {
    const { data, setData, post, processing } = useForm<LoginData>({
        email: '',
        password: '',
        remember: false,
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
            showError('Campos requeridos', 'Por favor ingrese su usuario/email y contraseña');
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
            onSuccess: (page) => {
                // Solo mostrar éxito si realmente se redirigió a una página diferente al login
                if (page.url !== '/login') {
                    showSuccess('¡Bienvenido!', 'Ingreso exitoso al sistema');
                }
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
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4 lg:p-8">
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
            
            {/* Contenedor principal con layout responsivo */}
            <div className="w-full max-w-7xl mx-auto">
                {/* Layout Mobile - Vertical Stack */}
                <div className="lg:hidden flex flex-col items-center space-y-8">
                    {/* Logo Innovación + Texto */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                            <img 
                                src="/images/logoinnov.png" 
                                alt="Logo Innovación y Desarrollo" 
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-base sm:text-lg font-semibold text-[#2a3d85]">
                                Innovación y Desarrollo
                            </h2>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="w-full max-w-sm mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                            {/* Logo del hospital dentro del card */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="Logo Hospital Universitario del Valle" 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>
                            
                            <div className="text-center mb-6 sm:mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#2a3d85] mb-2">
                                    Business Intelligence HUV
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 px-2">
                                    Hospital Universitario del Valle "Evaristo Garcia" E.S.E
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 font-medium">
                                        Usuario o Correo Electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="usuario@huv.com o usuario"
                                        className="h-10 sm:h-12 border-gray-300 focus:border-[#2a3d85] focus:ring-[#2a3d85] text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a3d85]/20 selection:bg-[#2a3d85] selection:text-white text-sm sm:text-base"
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
                                            className="h-10 sm:h-12 border-gray-300 focus:border-[#2a3d85] focus:ring-[#2a3d85] pr-10 sm:pr-12 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a3d85]/20 selection:bg-[#2a3d85] selection:text-white text-sm sm:text-base"
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
                                            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                            ) : (
                                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                        className="border-gray-300 data-[state=checked]:bg-[#2a3d85] data-[state=checked]:border-[#2a3d85] data-[state=checked]:text-white"
                                    />
                                    <Label 
                                        htmlFor="remember" 
                                        className="text-sm text-gray-600 cursor-pointer select-none"
                                    >
                                        Mantener sesión iniciada
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-10 sm:h-12 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2a3d85]/20 text-sm sm:text-base"
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

                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                                    ¿Problemas para acceder? Contacte al administrador
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Logo HUV + Texto */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                            <img 
                                src="/images/Imagen1.png" 
                                alt="Logo Hospital Universitario del Valle" 
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-base sm:text-lg font-semibold text-[#2a3d85]">
                                Gestión de Calidad y Mejoramiento
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Layout Desktop - 3 Columnas */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 items-center">
                    {/* Columna Izquierda - Logo Innovación */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-40 h-40 xl:w-48 xl:h-48 flex items-center justify-center">
                            <img 
                                src="/images/logoinnov.png" 
                                alt="Logo Innovación y Desarrollo" 
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg xl:text-xl font-semibold text-[#2a3d85]">
                                Innovación y Desarrollo
                            </h2>
                        </div>
                    </div>

                    {/* Columna Centro - Login Card */}
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            {/* Logo del hospital dentro del card */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="Logo Hospital Universitario del Valle" 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>
                            
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-[#2a3d85] mb-2">
                                    Business Intelligence HUV
                                </h1>
                                <p className="text-base text-gray-600 px-2">
                                    Hospital Universitario del Valle "Evaristo Garcia" E.S.E
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email-desktop" className="text-gray-700 font-medium">
                                        Usuario o Correo Electrónico
                                    </Label>
                                    <Input
                                        id="email-desktop"
                                        type="text"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="usuario@huv.com o usuario"
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
                                    <Label htmlFor="password-desktop" className="text-gray-700 font-medium">
                                        Contraseña
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password-desktop"
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

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember-desktop"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                        className="border-gray-300 data-[state=checked]:bg-[#2a3d85] data-[state=checked]:border-[#2a3d85] data-[state=checked]:text-white"
                                    />
                                    <Label 
                                        htmlFor="remember-desktop" 
                                        className="text-sm text-gray-600 cursor-pointer select-none"
                                    >
                                        Mantener sesión iniciada
                                    </Label>
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
                                <p className="text-sm text-gray-500 text-center px-2">
                                    ¿Problemas para acceder? Contacte al administrador
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha - Logo HUV */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-40 h-40 xl:w-48 xl:h-48 flex items-center justify-center">
                            <img 
                                src="/images/Imagen1.png" 
                                alt="Logo Hospital Universitario del Valle" 
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg xl:text-xl font-semibold text-[#2a3d85]">
                                Gestión de Calidad y Mejoramiento
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}