import { router } from '@inertiajs/react';
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
    Shield
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';

import { showSuccess, showError, showConfirm } from '@/utils/sweetAlert';
import Swal from 'sweetalert2';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
    module_permissions?: string[];
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

interface Role {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    active: boolean;
    created_at: string;
}

interface Module {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    icon?: string;
    route?: string;
    role_id: number;
    active: boolean;
    order: number;
}

interface Props {
    users: PaginatedUsers;
    filters: {
        search?: string;
        role?: string;
        status?: string;
    };
    roles: string[];
    rolesData: Role[];
    modules: Module[];
}

export default function UsersIndex({ users, filters, roles, rolesData, modules }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
    const [roleSearch, setRoleSearch] = useState('');
    const [roleStatusFilter, setRoleStatusFilter] = useState('all');
    const [filteredRoles, setFilteredRoles] = useState(rolesData);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/users', {
                search: search || undefined,
                role: selectedRole === 'all' ? undefined : selectedRole,
                status: selectedStatus === 'all' ? undefined : selectedStatus,
                // Always reset to page 1 when filters change
                page: 1,
            }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, selectedRole, selectedStatus]);

    // Filter roles based on search and status
    useEffect(() => {
        let filtered = rolesData;
        
        if (roleSearch) {
            filtered = filtered.filter(role => 
                role.display_name.toLowerCase().includes(roleSearch.toLowerCase()) ||
                role.name.toLowerCase().includes(roleSearch.toLowerCase()) ||
                (role.description && role.description.toLowerCase().includes(roleSearch.toLowerCase()))
            );
        }
        
        if (roleStatusFilter !== 'all') {
            const isActive = roleStatusFilter === 'active';
            filtered = filtered.filter(role => role.active === isActive);
        }
        
        setFilteredRoles(filtered);
    }, [roleSearch, roleStatusFilter, rolesData]);

    const handleSearch = () => {
        router.get('/admin/users', {
            search: search || undefined,
            role: selectedRole === 'all' ? undefined : selectedRole,
            status: selectedStatus === 'all' ? undefined : selectedStatus,
            // Reset to page 1 when manually searching
            page: 1,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setSearch('');
        setSelectedRole('all');
        setSelectedStatus('all');
        router.get('/admin/users', {
            // Reset to page 1 when clearing filters
            page: 1,
        }, {
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
        // Get modules from database
        const allModules = modules ? modules.map(module => module.display_name) : [];

        // Get current user modules (assuming they're available in user object)
        const currentModules = (user as any).module_permissions || [];

        const { value: formValues } = await Swal.fire({
            title: 'Editar Usuario',
            html: `
                <div class="space-y-4 text-left">
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
                    <div id="edit-modules-section">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Módulos disponibles</label>
                        <input type="text" id="edit-module-search" placeholder="Buscar módulos..." class="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent text-sm">
                        <div id="edit-modules-list" class="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1">
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Selecciona los módulos a los que tendrá acceso (todos los módulos disponibles)</p>
                    </div>
                </div>
            `,
            didOpen: () => {
                const roleSelect = document.getElementById('swal-edit-role');
                const modulesSection = document.getElementById('edit-modules-section');
                const modulesList = document.getElementById('edit-modules-list');
                const searchInput = document.getElementById('edit-module-search');
                
                const allModules = ['Ambulatorio', 'Banco de Sangre', 'Cirugía', 'Epidemiología', 'Extensión Hospitalaria', 'Ginecología', 'Hospitalización', 'Imágenes', 'Laboratorio', 'Medicina Física', 'Mortalidad', 'UCI Adultos', 'UCI Neonatal', 'UCI Pediátrico', 'Urgencias', 'CIAU', 'Farmacia', 'Gestión Técnica y Logística', 'Sistemas de Información', 'Talento Humano', 'Plan de Desarrollo', 'Cartera', 'Contabilidad', 'Facturación', 'Glosas', 'Presupuesto', 'Recaudo', 'PAMEC', 'Documentos', 'Habilitación', 'Indicadores', 'Auditoría', 'Mejoramiento', 'Humanización', 'Referenciaciones', 'Tecnovigilancia', 'Centro de Escucha', 'Gestión de Usuarios'];
                
                const renderEditModules = (modulesList) => {
                    // Group modules by role
                    const modulesByRole = {};
                    modules?.forEach(module => {
                        const roleName = module.role?.display_name || 'Sin Rol';
                        if (!modulesByRole[roleName]) {
                            modulesByRole[roleName] = [];
                        }
                        if (modulesList.includes(module.display_name)) {
                            modulesByRole[roleName].push(module.display_name);
                        }
                    });
                    
                    let html = '';
                    Object.keys(modulesByRole).sort().forEach(roleName => {
                        if (modulesByRole[roleName].length > 0) {
                            html += `<div class="mb-4">`;
                            html += `<h4 class="font-medium text-gray-700 mb-2 text-sm">${roleName}</h4>`;
                            html += `<div class="pl-4 space-y-1">`;
                            modulesByRole[roleName].forEach(module => {
                                const isChecked = currentModules.includes(module) ? 'checked' : '';
                                html += `<label class="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" name="edit-modules" value="${module}" ${isChecked} class="rounded border-gray-300 text-[#2a3d85] focus:ring-[#2a3d85]">
                                    <span>${module}</span>
                                </label>`;
                            });
                            html += `</div></div>`;
                        }
                    });
                    
                    return html;
                };
                
                const updateEditModules = () => {
                    modulesSection.style.display = 'block';
                    modulesList.innerHTML = renderEditModules(allModules);
                };
                
                const filterEditModules = () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    const filteredModules = allModules.filter(module => 
                        module.toLowerCase().includes(searchTerm)
                    );
                    modulesList.innerHTML = renderEditModules(filteredModules);
                };
                
                roleSelect.addEventListener('change', updateEditModules);
                searchInput.addEventListener('input', filterEditModules);
                updateEditModules(); // Initialize on open
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Actualizar Usuario',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '600px',
            preConfirm: () => {
                const name = (document.getElementById('swal-edit-name') as HTMLInputElement).value;
                const email = (document.getElementById('swal-edit-email') as HTMLInputElement).value;
                const password = (document.getElementById('swal-edit-password') as HTMLInputElement).value;
                const role = (document.getElementById('swal-edit-role') as HTMLSelectElement).value;
                
                // Get selected modules
                const moduleCheckboxes = document.querySelectorAll('input[name="edit-modules"]:checked');
                const selectedModules = Array.from(moduleCheckboxes).map((cb: any) => cb.value);
                
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
                
                return { name, email, password: password || undefined, role, module_permissions: selectedModules };
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

    const handleCreateRole = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Crear Nuevo Rol',
            html: `
                <div class="space-y-4 text-left">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre interno</label>
                        <input id="role-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: nuevo_rol">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre para mostrar</label>
                        <input id="role-display-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Rol">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea id="role-description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del rol (opcional)" rows="3"></textarea>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Crear Rol',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '500px',
            preConfirm: () => {
                const name = (document.getElementById('role-name') as HTMLInputElement).value;
                const display_name = (document.getElementById('role-display-name') as HTMLInputElement).value;
                const description = (document.getElementById('role-description') as HTMLTextAreaElement).value;
                
                if (!name || !display_name) {
                    Swal.showValidationMessage('Nombre interno y nombre para mostrar son obligatorios');
                    return false;
                }
                
                return { name, display_name, description };
            }
        });

        if (formValues) {
            router.post('/admin/roles', formValues, {
                onSuccess: () => {
                    showSuccess('Rol creado', 'El rol ha sido creado exitosamente.');
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join('\n');
                    showError('Error al crear rol', errorMessage);
                }
            });
        }
    };

    const handleCreateUser = async () => {
        // Get modules from database
        const allModules = modules ? modules.map(module => module.display_name) : [];

        const { value: formValues } = await Swal.fire({
            title: 'Crear Nuevo Usuario',
            html: `
                <div class="space-y-4 text-left">
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
                    <div id="modules-section" style="display: none;">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Módulos disponibles</label>
                        <input type="text" id="module-search" placeholder="Buscar módulos..." class="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent text-sm">
                        <div id="modules-list" class="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1">
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Selecciona los módulos a los que tendrá acceso (todos los módulos disponibles)</p>
                    </div>
                </div>
            `,
            didOpen: () => {
                const roleSelect = document.getElementById('swal-input4');
                const modulesSection = document.getElementById('modules-section');
                const modulesList = document.getElementById('modules-list');
                const searchInput = document.getElementById('module-search');
                
                const allModules = modules ? modules.map(module => module.display_name) : [];
                
                const renderModules = (modulesList, selectedRole) => {
                    const defaultModules = modules ? modules.filter(m => m.role?.display_name === selectedRole).map(m => m.display_name) : [];
                    
                    // Group modules by role
                    const modulesByRole = {};
                    modules?.forEach(module => {
                        const roleName = module.role?.display_name || 'Sin Rol';
                        if (!modulesByRole[roleName]) {
                            modulesByRole[roleName] = [];
                        }
                        if (modulesList.includes(module.display_name)) {
                            modulesByRole[roleName].push(module.display_name);
                        }
                    });
                    
                    let html = '';
                    Object.keys(modulesByRole).sort().forEach(roleName => {
                        if (modulesByRole[roleName].length > 0) {
                            html += `<div class="mb-4">`;
                            html += `<h4 class="font-medium text-gray-700 mb-2 text-sm">${roleName}</h4>`;
                            html += `<div class="pl-4 space-y-1">`;
                            modulesByRole[roleName].forEach(module => {
                                const isDefault = defaultModules.includes(module);
                                html += `<label class="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" name="modules" value="${module}" ${isDefault ? 'checked' : ''} class="rounded border-gray-300 text-[#2a3d85] focus:ring-[#2a3d85]">
                                    <span>${module}</span>
                                </label>`;
                            });
                            html += `</div></div>`;
                        }
                    });
                    
                    return html;
                };
                
                const updateModules = () => {
                    const role = roleSelect.value;
                    if (role) {
                        modulesSection.style.display = 'block';
                        modulesList.innerHTML = renderModules(allModules, role);
                        
                        // Auto-check default modules for role
                        const defaultModules = modules ? modules.filter(m => m.role?.display_name === role).map(m => m.display_name) : [];
                        setTimeout(() => {
                            defaultModules.forEach(moduleName => {
                                const checkbox = document.querySelector(`input[name="modules"][value="${moduleName}"]`);
                                if (checkbox) checkbox.checked = true;
                            });
                        }, 10);
                    } else {
                        modulesSection.style.display = 'none';
                    }
                };
                
                const filterModules = () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    const role = roleSelect.value;
                    const filteredModules = allModules.filter(module => 
                        module.toLowerCase().includes(searchTerm)
                    );
                    if (role) {
                        modulesList.innerHTML = renderModules(filteredModules, role);
                    }
                };
                
                roleSelect.addEventListener('change', updateModules);
                searchInput.addEventListener('input', filterModules);
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear Usuario',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '600px',
            preConfirm: () => {
                const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const email = (document.getElementById('swal-input2') as HTMLInputElement).value;
                const password = (document.getElementById('swal-input3') as HTMLInputElement).value;
                const passwordConfirmation = (document.getElementById('swal-input5') as HTMLInputElement).value;
                const role = (document.getElementById('swal-input4') as HTMLSelectElement).value;
                
                // Get selected modules
                const moduleCheckboxes = document.querySelectorAll('input[name="modules"]:checked');
                const selectedModules = Array.from(moduleCheckboxes).map((cb: any) => cb.value);
                
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
                
                return { name, email, password, password_confirmation: passwordConfirmation, role, module_permissions: selectedModules };
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

    const handleClearRoleFilters = () => {
        setRoleSearch('');
        setRoleStatusFilter('all');
    };

    const handleEditRole = async (role: Role) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Rol',
            html: `
                <div class="space-y-4 text-left">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre interno</label>
                        <input id="role-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${role.name}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre para mostrar</label>
                        <input id="role-display-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${role.display_name}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea id="role-description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" rows="3">${role.description || ''}</textarea>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input id="role-active" type="checkbox" ${role.active ? 'checked' : ''} class="mr-2">
                            Activo
                        </label>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Actualizar Rol',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '500px',
            preConfirm: () => {
                const name = (document.getElementById('role-name') as HTMLInputElement).value;
                const display_name = (document.getElementById('role-display-name') as HTMLInputElement).value;
                const description = (document.getElementById('role-description') as HTMLTextAreaElement).value;
                const active = (document.getElementById('role-active') as HTMLInputElement).checked;
                
                if (!name || !display_name) {
                    Swal.showValidationMessage('Nombre interno y nombre para mostrar son obligatorios');
                    return false;
                }
                
                return { name, display_name, description, active };
            }
        });

        if (formValues) {
            router.put(`/admin/roles/${role.id}`, formValues, {
                onSuccess: () => {
                    showSuccess('Rol actualizado', 'El rol ha sido actualizado exitosamente.');
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors).flat().join('\n');
                    showError('Error al actualizar rol', errorMessage);
                }
            });
        }
    };

    const handleDeleteRole = async (role: Role) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Eliminar rol?',
            text: `¿Estás seguro de que deseas eliminar el rol "${role.display_name}"? Esta acción no se puede deshacer.`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
            router.delete(`/admin/roles/${role.id}`, {
                onSuccess: () => {
                    showSuccess('Rol eliminado', 'El rol ha sido eliminado exitosamente.');
                },
                onError: () => {
                    showError('Error', 'No se pudo eliminar el rol.');
                }
            });
        }
    };

    return (
        <AppLayout
            title="Gestión de Usuarios - Business Intelligence HUV"
            pageTitle="Gestión de Usuarios"
            pageDescription="Administrar usuarios del sistema"
            icon={Users}
            showBackButton={true}
            backUrl="/dashboard/administrador"
        >
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 px-6">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'users'
                                    ? 'border-[#2a3d85] text-[#2a3d85]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Users className="w-4 h-4 inline mr-2" />
                            Usuarios
                        </button>
                        <button
                            onClick={() => setActiveTab('roles')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'roles'
                                    ? 'border-[#2a3d85] text-[#2a3d85]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Shield className="w-4 h-4 inline mr-2" />
                            Roles
                        </button>
                    </nav>
                </div>
            </div>

            {activeTab === 'users' && (
                <>
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
                    <Pagination 
                        data={users} 
                        preserveFilters={{
                            search: search || undefined,
                            role: selectedRole === 'all' ? undefined : selectedRole,
                            status: selectedStatus === 'all' ? undefined : selectedStatus,
                        }}
                    />
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
                </>
            )}

            {activeTab === 'roles' && (
                <>
                    {/* Filters and Actions for Roles */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        placeholder="Buscar por nombre o descripción..."
                                        value={roleSearch}
                                        onChange={(e) => setRoleSearch(e.target.value)}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2a3d85] focus:ring-2 focus:ring-[#2a3d85]/20 transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <Select value={roleStatusFilter} onValueChange={setRoleStatusFilter}>
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
                                <Button onClick={handleClearRoleFilters} className="bg-white border-2 border-[#2a3d85] text-[#2a3d85] hover:bg-[#2a3d85] hover:text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Limpiar
                                </Button>
                                <Button onClick={handleCreateRole} className="bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nuevo Rol
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-[#2a3d85] to-[#1e2d5f]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Rol
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Fecha Creación
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRoles.map((role) => (
                                        <tr key={role.id} className="hover:bg-blue-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{role.display_name}</div>
                                                    <div className="text-sm text-gray-500">{role.name}</div>
                                                    {role.description && (
                                                        <div className="text-xs text-gray-400 mt-1">{role.description}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={role.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                    {role.active ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(role.created_at).toLocaleDateString('es-ES')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-1">
                                                    <Button 
                                                        size="sm" 
                                                        onClick={() => handleEditRole(role)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-all duration-200 hover:shadow-md"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        onClick={() => handleDeleteRole(role)}
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
                    </div>

                    {filteredRoles.length === 0 && (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron roles</h3>
                            <p className="text-gray-500 mb-4">
                                {roleSearch || roleStatusFilter !== 'all'
                                    ? 'Intenta ajustar los filtros de búsqueda.'
                                    : 'Comienza creando tu primer rol.'}
                            </p>
                            <Button 
                                onClick={handleCreateRole}
                                className="bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Crear Rol
                            </Button>
                        </div>
                    )}
                </>
            )}
        </AppLayout>
    );
}
