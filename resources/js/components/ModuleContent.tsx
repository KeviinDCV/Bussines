import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, BarChart3, FolderOpen, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Swal from 'sweetalert2';

interface Module {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    route: string;
    content_type?: 'module' | 'powerbi';
    powerbi_url?: string;
    powerbi_config?: any;
    children?: Module[];
    icon?: string;
    role?: string;
    parent_id?: number;
}

interface ModuleContentProps {
    module?: Module;
    submodules: Module[];
    displayName: string;
    icon: any;
    canManageContent?: boolean;
}

export default function ModuleContent({ module, submodules, displayName, icon: Icon, canManageContent = false }: ModuleContentProps) {
    const isAdmin = canManageContent;

    const handleAddContent = async () => {
        // Si ya hay Power BI, solo permitir submódulos
        const powerbiOption = hasPowerBI ? '' : '<option value="powerbi">Power BI</option>';
        const warningMessage = hasPowerBI ? '<p class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-2">⚠️ Ya existe un Power BI en este módulo. Solo puedes agregar submódulos.</p>' : '';
        
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Contenido',
            html: `
                <div class="space-y-4">
                    ${warningMessage}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="module">Submódulo</option>
                            ${powerbiOption}
                        </select>
                    </div>
                    
                    <!-- Campos para Submódulo -->
                    <div id="module-fields">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input id="swal-input1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: nuevo-contenido">
                                <p class="text-xs text-gray-500 mt-1">Solo letras, números y guiones. Se usará para generar la URL.</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre a Mostrar *</label>
                                <input id="swal-input2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Contenido">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-input3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del contenido..." rows="3"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                            <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FileText">Documento</option>
                                <option value="BarChart3">Gráfico de Barras</option>
                                <option value="PieChart">Gráfico Circular</option>
                                <option value="Database">Base de Datos</option>
                                <option value="Settings">Configuración</option>
                                <option value="Users">Usuarios</option>
                                <option value="Shield">Escudo</option>
                                <option value="Heart">Corazón</option>
                                <option value="Activity">Actividad</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campo para Power BI (solo URL) -->
                    <div id="powerbi-fields" class="hidden">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="https://app.powerbi.com/view?r=...">
                            <p class="text-xs text-gray-500 mt-1">Pega aquí el enlace de implementación desde Power BI (Archivo → Insertar informe → Sitio web)</p>
                        </div>
                    </div>
                </div>
            `,
            didOpen: () => {
                // Configurar event listener para cambiar entre tipos de contenido
                const contentTypeSelect = document.getElementById('swal-content-type') as HTMLSelectElement;
                const moduleFields = document.getElementById('module-fields');
                const powerbiFields = document.getElementById('powerbi-fields');
                
                if (contentTypeSelect && moduleFields && powerbiFields) {
                    contentTypeSelect.addEventListener('change', function() {
                        if (this.value === 'powerbi') {
                            // Solo mostrar campo de URL para Power BI
                            moduleFields.classList.add('hidden');
                            powerbiFields.classList.remove('hidden');
                        } else {
                            // Mostrar todos los campos para submódulo
                            moduleFields.classList.remove('hidden');
                            powerbiFields.classList.add('hidden');
                        }
                    });
                }
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear Contenido',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '600px',
            preConfirm: () => {
                const contentType = (document.getElementById('swal-content-type') as HTMLSelectElement).value;
                const powerbiUrl = (document.getElementById('swal-powerbi-url') as HTMLInputElement).value;
                
                if (contentType === 'powerbi') {
                    // Para Power BI solo validamos la URL
                    if (!powerbiUrl) {
                        Swal.showValidationMessage('La URL de Power BI es obligatoria');
                        return false;
                    }
                    
                    // Generar nombre automáticamente para Power BI
                    const timestamp = Date.now();
                    const name = `powerbi-${timestamp}`;
                    const route = `${module?.route || '/dashboard'}/${name}`;
                    
                    return {
                        name,
                        display_name: 'Power BI Dashboard',
                        description: 'Dashboard de Power BI integrado',
                        content_type: contentType,
                        powerbi_url: powerbiUrl,
                        icon: 'BarChart3',
                        route,
                        parent_id: module?.id,
                        role: module?.role
                    };
                } else {
                    // Para submódulos, validamos los campos requeridos
                    const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
                    const displayName = (document.getElementById('swal-input2') as HTMLInputElement).value;
                    const description = (document.getElementById('swal-input3') as HTMLTextAreaElement).value;
                    const icon = (document.getElementById('swal-input4') as HTMLSelectElement).value;
                    
                    if (!name || !displayName) {
                        Swal.showValidationMessage('El nombre y el nombre a mostrar son obligatorios para submódulos');
                        return false;
                    }

                    // Validar formato del nombre (solo letras, números y guiones)
                    if (!/^[a-z0-9-]+$/.test(name)) {
                        Swal.showValidationMessage('El nombre solo puede contener letras minúsculas, números y guiones');
                        return false;
                    }

                    // Generar ruta automáticamente
                    const route = `${module?.route || '/dashboard'}/${name}`;

                    return {
                        name,
                        display_name: displayName,
                        description,
                        content_type: contentType,
                        powerbi_url: '',
                        icon,
                        route,
                        parent_id: module?.id,
                        role: module?.role
                    };
                }
            }
        });

        if (formValues) {
            try {
                await router.post('/admin/modules', formValues, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Contenido creado exitosamente',
                            icon: 'success',
                            confirmButtonColor: '#2a3d85'
                        }).then(() => {
                            router.reload({ only: ['submodules'] });
                        });
                    },
                    onError: (errors) => {
                        let errorMessage = 'Ocurrió un error al crear el contenido';
                        
                        // Manejar errores específicos de validación
                        if (errors.name && errors.name.includes('validation.unique')) {
                            errorMessage = 'Ya existe contenido con ese nombre. Por favor, elige un nombre diferente.';
                        } else if (errors.route && errors.route.includes('validation.unique')) {
                            errorMessage = 'Ya existe contenido con esa ruta. Por favor, elige un nombre diferente.';
                        } else {
                            // Mostrar todos los errores si no son de unicidad
                            const errorMessages = Object.values(errors).flat();
                            if (errorMessages.length > 0) {
                                errorMessage = errorMessages.join('\n');
                            }
                        }
                        
                        Swal.fire({
                            title: 'Error al crear contenido',
                            text: errorMessage,
                            icon: 'error',
                            confirmButtonColor: '#2a3d85'
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al crear el contenido',
                    icon: 'error',
                    confirmButtonColor: '#2a3d85'
                });
            }
        }
    };

    const handleEditSubmodule = async (submodule: Module) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Contenido',
            html: `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="module" ${submodule.content_type === 'module' ? 'selected' : ''}>Submódulo</option>
                            <option value="powerbi" ${submodule.content_type === 'powerbi' ? 'selected' : ''}>Power BI</option>
                        </select>
                    </div>
                    
                    <!-- Campos para Submódulo -->
                    <div id="module-fields" class="${submodule.content_type === 'powerbi' ? 'hidden' : ''}">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input id="swal-input1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${submodule.name}" placeholder="ej: nuevo-contenido">
                                <p class="text-xs text-gray-500 mt-1">Solo letras, números y guiones. Se usará para generar la URL.</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre a Mostrar *</label>
                                <input id="swal-input2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${submodule.display_name}" placeholder="ej: Nuevo Contenido">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-input3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del contenido..." rows="3">${submodule.description || ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                            <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FileText" ${submodule.icon === 'FileText' ? 'selected' : ''}>Documento</option>
                                <option value="BarChart3" ${submodule.icon === 'BarChart3' ? 'selected' : ''}>Gráfico de Barras</option>
                                <option value="PieChart" ${submodule.icon === 'PieChart' ? 'selected' : ''}>Gráfico Circular</option>
                                <option value="Database" ${submodule.icon === 'Database' ? 'selected' : ''}>Base de Datos</option>
                                <option value="Settings" ${submodule.icon === 'Settings' ? 'selected' : ''}>Configuración</option>
                                <option value="Users" ${submodule.icon === 'Users' ? 'selected' : ''}>Usuarios</option>
                                <option value="Shield" ${submodule.icon === 'Shield' ? 'selected' : ''}>Escudo</option>
                                <option value="Heart" ${submodule.icon === 'Heart' ? 'selected' : ''}>Corazón</option>
                                <option value="Activity" ${submodule.icon === 'Activity' ? 'selected' : ''}>Actividad</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campo para Power BI (solo URL) -->
                    <div id="powerbi-fields" class="${submodule.content_type === 'powerbi' ? '' : 'hidden'}">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${submodule.powerbi_url || ''}" placeholder="https://app.powerbi.com/view?r=...">
                            <p class="text-xs text-gray-500 mt-1">Pega aquí el enlace de implementación desde Power BI (Archivo → Insertar informe → Sitio web)</p>
                        </div>
                    </div>
                </div>
            `,
            didOpen: () => {
                // Configurar event listener para cambiar entre tipos de contenido
                const contentTypeSelect = document.getElementById('swal-content-type') as HTMLSelectElement;
                const moduleFields = document.getElementById('module-fields');
                const powerbiFields = document.getElementById('powerbi-fields');
                
                if (contentTypeSelect && moduleFields && powerbiFields) {
                    contentTypeSelect.addEventListener('change', function() {
                        if (this.value === 'powerbi') {
                            // Solo mostrar campo de URL para Power BI
                            moduleFields.classList.add('hidden');
                            powerbiFields.classList.remove('hidden');
                        } else {
                            // Mostrar todos los campos para submódulo
                            moduleFields.classList.remove('hidden');
                            powerbiFields.classList.add('hidden');
                        }
                    });
                }
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Actualizar Contenido',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2a3d85',
            width: '600px',
            preConfirm: () => {
                const contentType = (document.getElementById('swal-content-type') as HTMLSelectElement).value;
                const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const displayName = (document.getElementById('swal-input2') as HTMLInputElement).value;
                const description = (document.getElementById('swal-input3') as HTMLTextAreaElement).value;
                const icon = (document.getElementById('swal-input4') as HTMLSelectElement).value;
                const powerbiUrl = (document.getElementById('swal-powerbi-url') as HTMLInputElement).value;

                if (!name || !displayName) {
                    Swal.showValidationMessage('El nombre y el nombre a mostrar son obligatorios');
                    return false;
                }

                if (contentType === 'powerbi' && !powerbiUrl) {
                    Swal.showValidationMessage('La URL de Power BI es obligatoria para contenido de tipo Power BI');
                    return false;
                }

                return {
                    name,
                    display_name: displayName,
                    description,
                    content_type: contentType,
                    powerbi_url: contentType === 'powerbi' ? powerbiUrl : '',
                    icon: contentType === 'module' ? icon : 'BarChart3',
                    route: submodule.route,
                    parent_id: submodule.parent_id,
                    role: submodule.role
                };
            }
        });

        if (formValues) {
            try {
                await router.put(`/admin/modules/${submodule.id}`, formValues, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Contenido actualizado exitosamente',
                            icon: 'success',
                            confirmButtonColor: '#2a3d85'
                        }).then(() => {
                            router.reload({ only: ['submodules'] });
                        });
                    },
                    onError: (errors) => {
                        let errorMessage = 'Ocurrió un error al actualizar el contenido';
                        
                        // Manejar errores específicos de validación
                        if (errors.name && errors.name.includes('validation.unique')) {
                            errorMessage = 'Ya existe contenido con ese nombre. Por favor, elige un nombre diferente.';
                        } else if (errors.route && errors.route.includes('validation.unique')) {
                            errorMessage = 'Ya existe contenido con esa ruta. Por favor, elige un nombre diferente.';
                        } else {
                            const errorMessages = Object.values(errors).flat();
                            if (errorMessages.length > 0) {
                                errorMessage = errorMessages.join('\n');
                            }
                        }
                        
                        Swal.fire({
                            title: 'Error al actualizar contenido',
                            text: errorMessage,
                            icon: 'error',
                            confirmButtonColor: '#2a3d85'
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al actualizar el contenido',
                    icon: 'error',
                    confirmButtonColor: '#2a3d85'
                });
            }
        }
    };

    const handleDeleteSubmodule = async (submoduleId: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            router.delete(`/admin/modules/${submoduleId}`, {
                onSuccess: () => {
                    router.reload({ only: ['submodules'] });
                }
            });
        }
    };

    const handleNavigateToSubmodule = (submodule: Module) => {
        router.visit(submodule.route);
    };

    // Verificar si hay Power BI
    const hasPowerBI = submodules.some(s => s.content_type === 'powerbi');
    const hasContent = submodules.length > 0;

    return (
        <>
            <div className="max-w-6xl mx-auto p-4 sm:p-6">
                {/* Header solo si NO hay contenido */}
                {!hasContent && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                            <Icon className="w-8 h-8 text-[#2a3d85]" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{displayName}</h1>
                        </div>
                        
                        {isAdmin && (
                            <button
                                onClick={handleAddContent}
                                className="flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Agregar Contenido</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Botón de agregar contenido cuando hay contenido pero no Power BI */}
                {hasContent && !hasPowerBI && isAdmin && (
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={handleAddContent}
                            className="flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Agregar Contenido</span>
                        </button>
                    </div>
                )}

                {/* Contenido de submódulos y Power BI */}
                {submodules.length > 0 ? (
                    <div className="space-y-6">
                        {/* Power BI embebidos directamente */}
                        {submodules.filter(s => s.content_type === 'powerbi').map((powerbiItem) => (
                            <div key={powerbiItem.id} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                                {isAdmin && (
                                    <div className="flex justify-end space-x-2 mb-4">
                                        <button
                                            onClick={() => handleEditSubmodule(powerbiItem)}
                                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                                            title="Editar Power BI"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSubmodule(powerbiItem.id)}
                                            className="p-2 hover:bg-red-50 rounded transition-colors"
                                            title="Eliminar Power BI"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                )}
                                <div className="w-full h-full">
                                    <iframe 
                                        title="Power BI Dashboard" 
                                        width="100%" 
                                        height="800" 
                                        src={powerbiItem.powerbi_url} 
                                        frameBorder="0" 
                                        allowFullScreen={true}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        ))}
                        
                        {/* Submódulos como tarjetas */}
                        {submodules.filter(s => s.content_type === 'module').length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {submodules.filter(s => s.content_type === 'module').map((submodule) => (
                                    <div key={submodule.id} className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <FolderOpen className="w-6 h-6 text-[#2a3d85]" />
                                                <h3 className="font-semibold text-gray-900">
                                                    {submodule.display_name}
                                                </h3>
                                            </div>
                                            
                                            {isAdmin && (
                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={() => handleEditSubmodule(submodule)}
                                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSubmodule(submodule.id)}
                                                        className="p-1 hover:bg-red-50 rounded transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {submodule.description && (
                                            <p className="text-sm text-gray-600 mb-3">{submodule.description}</p>
                                        )}
                                        
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Submódulo</span>
                                            
                                            <button
                                                onClick={() => handleNavigateToSubmodule(submodule)}
                                                className="flex items-center space-x-1 text-[#2a3d85] hover:text-[#1e2d5f] text-sm font-medium"
                                            >
                                                <span>Abrir</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                            {isAdmin ? (
                                <>No hay contenido agregado aún. <br />
                                Haga clic en "Agregar Contenido" para empezar.</>
                            ) : (
                                <>El módulo de {displayName} está siendo desarrollado.<br />
                                Pronto estará disponible con todas las funcionalidades.</>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
