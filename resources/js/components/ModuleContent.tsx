import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, BarChart3, FolderOpen, Edit2, Trash2, ExternalLink, FileText, Settings, Users, Shield, Monitor, Database, Search, TrendingUp, Heart, RefreshCw, Headphones, Award, Wrench, Pill, Activity, Target, Map, Briefcase, Stethoscope } from 'lucide-react';
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

    // Verificar si hay Power BI y contenido
    const hasPowerBI = submodules.some(s => s.content_type === 'powerbi');
    const hasContent = submodules.length > 0;

    // Mapeo de iconos
    const iconMap: { [key: string]: any } = {
        FolderOpen, FileText, Settings, BarChart3, Users, Shield, Monitor, Database,
        Search, TrendingUp, Heart, RefreshCw, Headphones, Award, Wrench, Pill,
        Activity, Target, Map, Briefcase, Stethoscope
    };

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
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del submódulo *</label>
                            <input type="text" id="swal-display-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Submódulo">
                            <small class="text-gray-500 text-xs mt-1 block">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del submódulo..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ícono</label>
                            <select id="swal-icon" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FolderOpen">Carpeta (FolderOpen)</option>
                                <option value="FileText">Documento (FileText)</option>
                                <option value="Settings">Configuración (Settings)</option>
                                <option value="BarChart3">Gráfico (BarChart3)</option>
                                <option value="Users">Usuarios (Users)</option>
                                <option value="Shield">Escudo (Shield)</option>
                                <option value="Monitor">Monitor (Monitor)</option>
                                <option value="Database">Base de Datos (Database)</option>
                                <option value="Search">Buscar (Search)</option>
                                <option value="TrendingUp">Tendencia (TrendingUp)</option>
                                <option value="Heart">Corazón (Heart)</option>
                                <option value="RefreshCw">Actualizar (RefreshCw)</option>
                                <option value="Headphones">Audífonos (Headphones)</option>
                                <option value="Stethoscope">Estetoscopio (Stethoscope)</option>
                                <option value="Award">Premio (Award)</option>
                                <option value="Wrench">Herramientas (Wrench)</option>
                                <option value="Pill">Pastilla (Pill)</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campos para Power BI -->
                    <div id="powerbi-fields" style="display: none;">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="https://app.powerbi.com/reportEmbed?reportId=...">
                            <p class="text-xs text-gray-500 mt-1">Pegue la URL de inserción del informe de Power BI</p>
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            width: '600px',
            didOpen: () => {
                const contentTypeSelect = document.getElementById('swal-content-type') as HTMLSelectElement;
                const moduleFields = document.getElementById('module-fields') as HTMLElement;
                const powerbiFields = document.getElementById('powerbi-fields') as HTMLElement;

                const toggleFields = () => {
                    if (contentTypeSelect.value === 'powerbi') {
                        moduleFields.style.display = 'none';
                        powerbiFields.style.display = 'block';
                    } else {
                        moduleFields.style.display = 'block';
                        powerbiFields.style.display = 'none';
                    }
                };

                contentTypeSelect.addEventListener('change', toggleFields);
                toggleFields();
            },
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
                    const displayName = (document.getElementById('swal-display-name') as HTMLInputElement).value;
                    const description = (document.getElementById('swal-description') as HTMLTextAreaElement).value;
                    const icon = (document.getElementById('swal-icon') as HTMLSelectElement).value;
                    
                    if (!displayName) {
                        Swal.showValidationMessage('El nombre del submódulo es obligatorio');
                        return false;
                    }

                    // Generar slug automáticamente a partir del nombre a mostrar
                    const name = displayName
                        .toLowerCase()
                        .normalize('NFD') // Normalizar para manejar acentos
                        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                        .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
                        .replace(/\s+/g, '-') // Convertir espacios a guiones
                        .replace(/-+/g, '-') // Eliminar guiones duplicados
                        .replace(/^-|-$/g, ''); // Eliminar guiones al inicio y final

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
                            text: 'Contenido agregado correctamente',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    onError: (errors) => {
                        let errorMessage = 'Error al agregar el contenido';
                        if (typeof errors === 'object' && errors !== null) {
                            const errorKeys = Object.keys(errors);
                            if (errorKeys.length > 0) {
                                errorMessage = errors[errorKeys[0]];
                            }
                        }
                        Swal.fire({
                            title: 'Error',
                            text: errorMessage,
                            icon: 'error'
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al procesar la solicitud',
                    icon: 'error'
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
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido</label>
                        <input type="text" value="${submodule.content_type === 'powerbi' ? 'Power BI' : 'Submódulo'}" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readonly>
                    </div>
                    
                    ${submodule.content_type === 'powerbi' ? `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" value="${submodule.powerbi_url || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="https://app.powerbi.com/reportEmbed?reportId=...">
                        </div>
                    ` : `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del submódulo *</label>
                            <input type="text" id="swal-display-name" value="${submodule.display_name}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <small class="text-gray-500 text-xs mt-1 block">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">${submodule.description || ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ícono</label>
                            <select id="swal-icon" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FolderOpen" ${submodule.icon === 'FolderOpen' ? 'selected' : ''}>Carpeta (FolderOpen)</option>
                                <option value="FileText" ${submodule.icon === 'FileText' ? 'selected' : ''}>Documento (FileText)</option>
                                <option value="Settings" ${submodule.icon === 'Settings' ? 'selected' : ''}>Configuración (Settings)</option>
                                <option value="BarChart3" ${submodule.icon === 'BarChart3' ? 'selected' : ''}>Gráfico (BarChart3)</option>
                                <option value="Users" ${submodule.icon === 'Users' ? 'selected' : ''}>Usuarios (Users)</option>
                                <option value="Shield" ${submodule.icon === 'Shield' ? 'selected' : ''}>Escudo (Shield)</option>
                                <option value="Monitor" ${submodule.icon === 'Monitor' ? 'selected' : ''}>Monitor (Monitor)</option>
                                <option value="Database" ${submodule.icon === 'Database' ? 'selected' : ''}>Base de Datos (Database)</option>
                                <option value="Search" ${submodule.icon === 'Search' ? 'selected' : ''}>Buscar (Search)</option>
                                <option value="TrendingUp" ${submodule.icon === 'TrendingUp' ? 'selected' : ''}>Tendencia (TrendingUp)</option>
                                <option value="Heart" ${submodule.icon === 'Heart' ? 'selected' : ''}>Corazón (Heart)</option>
                                <option value="RefreshCw" ${submodule.icon === 'RefreshCw' ? 'selected' : ''}>Actualizar (RefreshCw)</option>
                                <option value="Headphones" ${submodule.icon === 'Headphones' ? 'selected' : ''}>Audífonos (Headphones)</option>
                                <option value="Stethoscope" ${submodule.icon === 'Stethoscope' ? 'selected' : ''}>Estetoscopio (Stethoscope)</option>
                                <option value="Award" ${submodule.icon === 'Award' ? 'selected' : ''}>Premio (Award)</option>
                                <option value="Wrench" ${submodule.icon === 'Wrench' ? 'selected' : ''}>Herramientas (Wrench)</option>
                                <option value="Pill" ${submodule.icon === 'Pill' ? 'selected' : ''}>Pastilla (Pill)</option>
                            </select>
                        </div>
                    `}
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            width: '600px',
            preConfirm: () => {
                if (submodule.content_type === 'powerbi') {
                    const powerbiUrl = (document.getElementById('swal-powerbi-url') as HTMLInputElement).value;
                    if (!powerbiUrl) {
                        Swal.showValidationMessage('La URL de Power BI es obligatoria');
                        return false;
                    }
                    return { powerbi_url: powerbiUrl };
                } else {
                    const displayName = (document.getElementById('swal-display-name') as HTMLInputElement).value;
                    const description = (document.getElementById('swal-description') as HTMLTextAreaElement).value;
                    const icon = (document.getElementById('swal-icon') as HTMLSelectElement).value;
                    
                    if (!displayName) {
                        Swal.showValidationMessage('El nombre del submódulo es obligatorio');
                        return false;
                    }

                    // Generar slug automáticamente a partir del nombre a mostrar
                    const name = displayName
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-|-$/g, '');

                    const route = `${module?.route || '/dashboard'}/${name}`;

                    return {
                        name,
                        display_name: displayName,
                        description,
                        icon,
                        route
                    };
                }
            }
        });

        if (formValues) {
            try {
                await router.put(`/admin/modules/${submodule.id}`, formValues, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Contenido actualizado correctamente',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    onError: (errors) => {
                        let errorMessage = 'Error al actualizar el contenido';
                        if (typeof errors === 'object' && errors !== null) {
                            const errorKeys = Object.keys(errors);
                            if (errorKeys.length > 0) {
                                errorMessage = errors[errorKeys[0]];
                            }
                        }
                        Swal.fire({
                            title: 'Error',
                            text: errorMessage,
                            icon: 'error'
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al procesar la solicitud',
                    icon: 'error'
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
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            router.delete(`/admin/modules/${submoduleId}`, {
                onSuccess: () => {
                    Swal.fire('¡Eliminado!', 'El contenido ha sido eliminado.', 'success');
                }
            });
        }
    };

    const handleNavigateToSubmodule = (submodule: Module) => {
        router.visit(submodule.route);
    };

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
                        {/* Power BI embebido directamente */}
                        {submodules.filter(s => s.content_type === 'powerbi').map((powerbiItem) => (
                            <div key={powerbiItem.id} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                                {isAdmin && (
                                    <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                        <button
                                            onClick={() => handleEditSubmodule(powerbiItem)}
                                            className="p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded shadow transition-colors"
                                            title="Editar Power BI"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSubmodule(powerbiItem.id)}
                                            className="p-1 bg-white/80 hover:bg-white text-red-600 hover:text-red-800 rounded shadow transition-colors"
                                            title="Eliminar Power BI"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <iframe
                                    src={powerbiItem.powerbi_url}
                                    width="100%"
                                    height="800"
                                    frameBorder="0"
                                    allowFullScreen
                                    className="border-0"
                                    title="Power BI Report"
                                />
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
