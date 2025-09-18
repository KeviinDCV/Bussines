import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, User, Mail, Shield, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

export default function ShowUser({ user }: Props) {
    const getRoleBadgeColor = (role: string) => {
        const colors = {
            'Asistenciales': 'bg-blue-100 text-blue-800',
            'Administrativos': 'bg-green-100 text-green-800',
            'Direccionamiento': 'bg-purple-100 text-purple-800',
            'Financieros': 'bg-orange-100 text-orange-800',
            'Administrador': 'bg-red-100 text-red-800',
        };
        return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Usuario: ${user.name} - Tableros de Gestión HUV`} />
            
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
                                <h1 className="text-2xl font-bold">Detalles del Usuario</h1>
                                <p className="opacity-90">Información completa de {user.name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                            <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* User Header */}
                    <div className="bg-gradient-to-r from-[#2a3d85] to-[#1e2d5f] text-white p-8">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-6">
                                <User className="w-10 h-10" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        <span>{user.email}</span>
                                    </div>
                                    <Badge className={getRoleBadgeColor(user.role)}>
                                        {user.role}
                                    </Badge>
                                    <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {user.is_active ? (
                                            <>
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Activo
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-3 h-3 mr-1" />
                                                Inactivo
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Información Personal */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-[#2a3d85]" />
                                    Información Personal
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="border-l-4 border-[#2a3d85] pl-4">
                                        <label className="text-sm font-medium text-gray-500">ID del Usuario</label>
                                        <p className="text-lg text-gray-900">#{user.id}</p>
                                    </div>
                                    
                                    <div className="border-l-4 border-[#2a3d85] pl-4">
                                        <label className="text-sm font-medium text-gray-500">Nombre Completo</label>
                                        <p className="text-lg text-gray-900">{user.name}</p>
                                    </div>
                                    
                                    <div className="border-l-4 border-[#2a3d85] pl-4">
                                        <label className="text-sm font-medium text-gray-500">Correo Electrónico</label>
                                        <p className="text-lg text-gray-900">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Configuración y Permisos */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <Shield className="w-5 h-5 mr-2 text-[#2a3d85]" />
                                    Configuración y Permisos
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="border-l-4 border-[#2a3d85] pl-4">
                                        <label className="text-sm font-medium text-gray-500">Rol del Sistema</label>
                                        <div className="mt-1">
                                            <Badge className={getRoleBadgeColor(user.role)} variant="secondary">
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div className="border-l-4 border-[#2a3d85] pl-4">
                                        <label className="text-sm font-medium text-gray-500">Estado de la Cuenta</label>
                                        <div className="mt-1">
                                            <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                {user.is_active ? (
                                                    <>
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        Cuenta Activa
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-3 h-3 mr-1" />
                                                        Cuenta Inactiva
                                                    </>
                                                )}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div className="border-l-4 border-[#2a3d85] pl-4">
                                        <label className="text-sm font-medium text-gray-500">Acceso al Sistema</label>
                                        <p className="text-lg text-gray-900">
                                            {user.is_active ? 'Permitido' : 'Denegado'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fechas y Actividad */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
                                <Calendar className="w-5 h-5 mr-2 text-[#2a3d85]" />
                                Fechas y Actividad
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-medium text-gray-500">Fecha de Creación</label>
                                    <p className="text-lg text-gray-900 mt-1">
                                        {new Date(user.created_at).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-medium text-gray-500">Última Actualización</label>
                                    <p className="text-lg text-gray-900 mt-1">
                                        {new Date(user.updated_at).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Información sobre el Rol */}
                        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h4 className="text-lg font-semibold text-blue-900 mb-3">
                                Información del Rol: {user.role}
                            </h4>
                            <div className="text-sm text-blue-800">
                                {user.role === 'Asistenciales' && (
                                    <p>Personal médico y de enfermería con acceso a módulos clínicos y de atención al paciente.</p>
                                )}
                                {user.role === 'Administrativos' && (
                                    <p>Personal administrativo con acceso a módulos de gestión administrativa y recursos humanos.</p>
                                )}
                                {user.role === 'Direccionamiento' && (
                                    <p>Personal directivo con acceso a módulos estratégicos y de planificación institucional.</p>
                                )}
                                {user.role === 'Financieros' && (
                                    <p>Personal financiero con acceso a módulos de gestión financiera y contable.</p>
                                )}
                                {user.role === 'Administrador' && (
                                    <p>Administrador del sistema con acceso completo a todos los módulos y configuraciones.</p>
                                )}
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                            <Link href="/admin/users">
                                <Button variant="outline" className="px-6">
                                    Volver a la Lista
                                </Button>
                            </Link>
                            <Link href={`/admin/users/${user.id}/edit`}>
                                <Button className="px-6 bg-[#2a3d85] hover:bg-[#1e2d5f]">
                                    Editar Usuario
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
