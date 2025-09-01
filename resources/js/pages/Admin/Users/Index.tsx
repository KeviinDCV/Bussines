import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    Users, 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye, 
    UserCheck, 
    UserX,
    Filter,
    ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showError, showConfirm } from '@/utils/sweetAlert';
import Swal from 'sweetalert2';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    users: PaginatedUsers;
    filters: {
        search?: string;
        role?: string;
        status?: string;
    };
    roles: string[];
}

export default function UsersIndex({ users, filters, roles }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/users', {
                search: search || undefined,
                role: selectedRole === 'all' ? undefined : selectedRole,
                status: selectedStatus === 'all' ? undefined : selectedStatus,
            }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, selectedRole, selectedStatus]);

    const handleSearch = () => {
        router.get('/admin/users', {
            search: search || undefined,
            role: selectedRole === 'all' ? undefined : selectedRole,
            status: selectedStatus === 'all' ? undefined : selectedStatus,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setSearch('');
        setSelectedRole('all');
        setSelectedStatus('all');
        router.get('/admin/users', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = async (user: User) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Eliminar usuario?',
            text: `¿Estás seguro de que deseas eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
            router.delete(`/admin/users/${user.id}`, {
                onSuccess: () => {
                    showSuccess('Usuario eliminado', 'El usuario ha sido eliminado exitosamente.');
                },
                onError: () => {
                    showError('Error', 'No se pudo eliminar el usuario.');
                }
            });
        }
    };

    const handleToggleStatus = async (user: User) => {
        const action = user.is_active ? 'desactivar' : 'activar';
        const result = await Swal.fire({
            icon: 'question',
            title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} usuario?`,
            text: `¿Estás seguro de que deseas ${action} al usuario "${user.name}"?`,
            showCancelButton: true,
            confirmButtonText: action.charAt(0).toUpperCase() + action.slice(1),
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
            router.patch(`/admin/users/${user.id}/toggle-status`, {}, {
                onSuccess: () => {
                    const status = user.is_active ? 'desactivado' : 'activado';
                    showSuccess(`Usuario ${status}`, `El usuario ha sido ${status} exitosamente.`);
                },
                onError: () => {
                    showError('Error', 'No se pudo cambiar el estado del usuario.');
                }
            });
        }
    };

    const handleViewUser = async (user: User) => {
        await Swal.fire({
            title: 'Detalles del Usuario',
            html: `
                <div class="text-left space-y-4">
                    <div>
                        <strong class="text-gray-700">Nombre:</strong>
                        <p class="text-gray-900">${user.name}</p>
                    </div>
                    <div>
                        <strong class="text-gray-700">Email:</strong>
                        <p class="text-gray-900">${user.email}</p>
                    </div>
                    <div>
                        <strong class="text-gray-700">Rol:</strong>
                        <p class="text-gray-900">${user.role}</p>
                    </div>
                    <div>
                        <strong class="text-gray-700">Estado:</strong>
                        <p class="text-gray-900">${user.is_active ? 'Activo' : 'Inactivo'}</p>
                    </div>
                    <div>
                        <strong class="text-gray-700">Fecha de creación:</strong>
                        <p class="text-gray-900">${new Date(user.created_at).toLocaleDateString('es-ES')}</p>
                    </div>
                </div>
            `,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#2a3d85',
            width: '500px'
        });
    };

    const handleEditUser = async (user: User) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Usuario',
            html: `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                        <input id="swal-edit-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${user.name}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input id="swal-edit-email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${user.email}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña (dejar vacío para mantener actual)</label>
                        <input id="swal-edit-password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="••••••••">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                        <select id="swal-edit-role" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            ${roles.map(role => `<option value="${role}" ${role === user.role ? 'selected' : ''}>${role}</option>`).join('')}
                        </select>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Actualizar Usuario',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '500px',
            preConfirm: () => {
                const name = (document.getElementById('swal-edit-name') as HTMLInputElement).value;
                const email = (document.getElementById('swal-edit-email') as HTMLInputElement).value;
                const password = (document.getElementById('swal-edit-password') as HTMLInputElement).value;
                const role = (document.getElementById('swal-edit-role') as HTMLSelectElement).value;
                
                if (!name || !email || !role) {
                    Swal.showValidationMessage('Nombre, email y rol son obligatorios');
                    return false;
                }
                
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    Swal.showValidationMessage('El formato del email no es válido');
                    return false;
                }
                
                if (password && password.length < 6) {
                    Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres');
                    return false;
                }
                
                return { name, email, password: password || undefined, role };
            }
        });

        if (formValues) {
            router.patch(`/admin/users/${user.id}`, formValues, {
                onSuccess: () => {
                    showSuccess('Usuario actualizado', 'El usuario ha sido actualizado exitosamente.');
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join('\n');
                    showError('Error al actualizar usuario', errorMessage);
                }
            });
        }
    };

    const handleCreateUser = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Crear Nuevo Usuario',
            html: `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                        <input id="swal-input1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Nombre completo">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input id="swal-input2" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="usuario@huv.com">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input id="swal-input3" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="••••••••">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                        <input id="swal-input5" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="••••••••">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                        <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="">Seleccionar rol</option>
                            ${roles.map(role => `<option value="${role}">${role}</option>`).join('')}
                        </select>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear Usuario',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '500px',
            preConfirm: () => {
                const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const email = (document.getElementById('swal-input2') as HTMLInputElement).value;
                const password = (document.getElementById('swal-input3') as HTMLInputElement).value;
                const passwordConfirmation = (document.getElementById('swal-input5') as HTMLInputElement).value;
                const role = (document.getElementById('swal-input4') as HTMLSelectElement).value;
                
                if (!name || !email || !password || !passwordConfirmation || !role) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    Swal.showValidationMessage('El formato del email no es válido');
                    return false;
                }
                
                if (password.length < 6) {
                    Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres');
                    return false;
                }
                
                if (password !== passwordConfirmation) {
                    Swal.showValidationMessage('Las contraseñas no coinciden');
                    return false;
                }
                
                return { name, email, password, password_confirmation: passwordConfirmation, role };
            }
        });

        if (formValues) {
            router.post('/admin/users', formValues, {
                onSuccess: () => {
                    showSuccess('Usuario creado', 'El usuario ha sido creado exitosamente.');
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join('\n');
                    showError('Error al crear usuario', errorMessage);
                }
            });
        }
    };

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
            <Head title="Gestión de Usuarios - Business Intelligence HUV" />
            
            {/* Header */}
            <div className="bg-[#2a3d85] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/dashboard/administrador" className="mr-4">
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Volver
                                </Button>
                            </Link>
                            <Users className="w-8 h-8 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                                <p className="opacity-90">Administrar usuarios del sistema</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">Hospital Universitario del Valle</p>
                            <p className="text-xs opacity-90">"Evaristo Garcia" E.S.E</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {/* Filters and Actions */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Buscar por nombre o email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2a3d85] focus:ring-2 focus:ring-[#2a3d85]/20 transition-all duration-200 text-gray-900 placeholder-gray-500"
                                />
                            </div>
                            <Select value={selectedRole} onValueChange={setSelectedRole}>
                                <SelectTrigger className="w-full sm:w-48 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2a3d85] focus:ring-2 focus:ring-[#2a3d85]/20 transition-all duration-200 text-gray-700 font-medium">
                                    <SelectValue placeholder="Filtrar por rol" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg border-2 border-gray-200 shadow-lg">
                                    <SelectItem value="all" className="font-medium">Todos los roles</SelectItem>
                                    {roles.map((role) => (
                                        <SelectItem key={role} value={role} className="font-medium">
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-full sm:w-48 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2a3d85] focus:ring-2 focus:ring-[#2a3d85]/20 transition-all duration-200 text-gray-700 font-medium">
                                    <SelectValue placeholder="Filtrar por estado" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg border-2 border-gray-200 shadow-lg">
                                    <SelectItem value="all" className="font-medium">Todos los estados</SelectItem>
                                    <SelectItem value="active" className="font-medium">Activos</SelectItem>
                                    <SelectItem value="inactive" className="font-medium">Inactivos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleClearFilters} className="bg-white border-2 border-[#2a3d85] text-[#2a3d85] hover:bg-[#2a3d85] hover:text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                                <Filter className="w-4 h-4 mr-2" />
                                Limpiar
                            </Button>
                            <Button onClick={handleCreateUser} className="bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                                <Plus className="w-4 h-4 mr-2" />
                                Nuevo Usuario
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-[#2a3d85] to-[#1e2d5f]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Fecha Registro
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge className={getRoleBadgeColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                {user.is_active ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-1">
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleViewUser(user)}
                                                    className="bg-[#2a3d85] hover:bg-[#1e2d5f] text-white p-2 rounded-md transition-all duration-200 hover:shadow-md"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleEditUser(user)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-all duration-200 hover:shadow-md"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={`p-2 rounded-md transition-all duration-200 hover:shadow-md text-white ${
                                                        user.is_active 
                                                            ? 'bg-orange-500 hover:bg-orange-600' 
                                                            : 'bg-green-500 hover:bg-green-600'
                                                    }`}
                                                >
                                                    {user.is_active ? (
                                                        <UserX className="w-4 h-4" />
                                                    ) : (
                                                        <UserCheck className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleDelete(user)}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all duration-200 hover:shadow-md"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {users.links[0].url && (
                                    <Link href={users.links[0].url || '#'} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Anterior
                                    </Link>
                                )}
                                {users.links[users.links.length - 1].url && (
                                    <Link href={users.links[users.links.length - 1].url || '#'} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Siguiente
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Mostrando <span className="font-medium">{(users.current_page - 1) * users.per_page + 1}</span> a{' '}
                                        <span className="font-medium">
                                            {Math.min(users.current_page * users.per_page, users.total)}
                                        </span>{' '}
                                        de <span className="font-medium">{users.total}</span> resultados
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {users.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-[#2a3d85] border-[#2a3d85] text-white'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === users.links.length - 1 ? 'rounded-r-md' : ''
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {users.data.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
                        <p className="text-gray-500 mb-4">
                            {filters.search || filters.role || filters.status
                                ? 'Intenta ajustar los filtros de búsqueda.'
                                : 'Comienza creando tu primer usuario.'}
                        </p>
                        <Button 
                            onClick={handleCreateUser}
                            className="bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Crear Usuario
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
