import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { showError, showSuccess } from '@/utils/sweetAlert';

interface Props {
    roles: string[];
}

interface UserFormData {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    is_active: boolean;
}

export default function CreateUser({ roles }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        is_active: true,
    });

    const handleRoleChange = (newRole: string) => {
        setData('role', newRole);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!data.name || !data.email || !data.password || !data.role) {
            showError('Campos requeridos', 'Por favor complete todos los campos obligatorios.');
            return;
        }

        if (data.password !== data.password_confirmation) {
            showError('Error de validación', 'Las contraseñas no coinciden.');
            return;
        }

        post('/admin/users', {
            onSuccess: () => {
                showSuccess('Usuario creado', 'El usuario ha sido creado exitosamente.');
            },
            onError: () => {
                showError('Error', 'No se pudo crear el usuario. Verifique los datos ingresados.');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Crear Usuario - Tableros de Gestión HUV" />
            
            {/* Header */}
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/admin/users" className="mr-4">
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Volver a Usuarios
                                </Button>
                            </Link>
                            <User className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Crear Nuevo Usuario</h1>
                                <p className="opacity-90">Agregar un nuevo usuario al sistema</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                            <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Información Personal */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#2a3d85]" />
                                Información Personal
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700 font-medium">
                                        Nombre Completo *
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ej: Juan Pérez García"
                                        className={`h-12 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-[#2a3d85] focus:ring-[#2a3d85]`}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-gray-700 font-medium">
                                        Nombre de Usuario
                                    </Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="Ej: juan.perez (opcional)"
                                        className={`h-12 ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:border-[#2a3d85] focus:ring-[#2a3d85]`}
                                    />
                                    {errors.username && (
                                        <p className="text-sm text-red-600">{errors.username}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Solo letras, números, puntos, guiones y guiones bajos
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 font-medium">
                                        Correo Electrónico *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="usuario@huv.com"
                                        className={`h-12 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#2a3d85] focus:ring-[#2a3d85]`}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Credenciales de Acceso */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Lock className="w-5 h-5 mr-2 text-[#2a3d85]" />
                                Credenciales de Acceso
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 font-medium">
                                        Contraseña *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Mínimo 8 caracteres"
                                            className={`h-12 pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#2a3d85] focus:ring-[#2a3d85]`}
                                            required
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">
                                        Confirmar Contraseña *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? "text" : "password"}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Repetir contraseña"
                                            className={`h-12 pr-12 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} focus:border-[#2a3d85] focus:ring-[#2a3d85]`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPasswordConfirmation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Permisos y Configuración */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Shield className="w-5 h-5 mr-2 text-[#2a3d85]" />
                                Permisos y Configuración
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-gray-700 font-medium">
                                        Rol del Usuario *
                                    </Label>
                                    <Select value={data.role} onValueChange={handleRoleChange}>
                                        <SelectTrigger className={`h-12 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}>
                                            <SelectValue placeholder="Seleccionar rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    {role}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <p className="text-sm text-red-600">{errors.role}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-700 font-medium">Estado del Usuario</Label>
                                    <div className="flex items-center space-x-2 h-12">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                        />
                                        <Label htmlFor="is_active" className="text-sm text-gray-600">
                                            Usuario activo (puede acceder al sistema)
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Información Adicional */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Información Importante:</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• La contraseña debe tener al menos 8 caracteres</li>
                                <li>• El nombre de usuario es opcional y debe ser único</li>
                                <li>• El usuario puede iniciar sesión con email o nombre de usuario</li>
                                <li>• Solo los usuarios activos pueden acceder al sistema</li>
                                <li>• El rol determina los permisos del usuario en el sistema</li>
                            </ul>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link href="/admin/users">
                                <Button type="button" variant="outline" className="px-6">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="px-6 bg-[#2a3d85] hover:bg-[#1e2d5f]"
                            >
                                {processing ? 'Creando...' : 'Crear Usuario'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
