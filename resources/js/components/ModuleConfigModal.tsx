import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import { X, FileText, BarChart3, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ModuleFormData {
    name: string;
    display_name: string;
    description: string;
    content_type: 'module' | 'powerbi';
    powerbi_url: string;
    powerbi_config: Record<string, any>;
    parent_id: number | null;
    role: string;
    icon: string;
    route: string;
}

interface ModuleConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    parentModule?: any;
    editingModule?: any;
    onSave: () => void;
}

export default function ModuleConfigModal({ 
    isOpen, 
    onClose, 
    parentModule, 
    editingModule,
    onSave 
}: ModuleConfigModalProps) {
    const [contentType, setContentType] = useState<'module' | 'powerbi'>('module');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Crear el objeto de datos inicial sin useForm para evitar problemas de tipos
    const initialData = {
        name: editingModule?.name || '',
        display_name: editingModule?.display_name || '',
        description: editingModule?.description || '',
        content_type: editingModule?.content_type || 'module',
        powerbi_url: editingModule?.powerbi_url || '',
        powerbi_config: editingModule?.powerbi_config || {},
        parent_id: parentModule?.id || null,
        role: parentModule?.role || editingModule?.role || '',
        icon: editingModule?.icon || 'FileText',
        route: editingModule?.route || '',
    };
    
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState<any>({});
    
    const reset = () => {
        setData(initialData);
        setErrors({});
    };

    useEffect(() => {
        setContentType(data.content_type as 'module' | 'powerbi');
    }, [data.content_type]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Generar nombre y ruta automáticamente si no se proporcionan
        let finalData = { ...data };
        
        if (!finalData.name && finalData.display_name) {
            finalData.name = finalData.display_name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '_')
                .replace(/^_|_$/g, '');
        }

        if (!finalData.route && finalData.name && parentModule) {
            const parentRoute = parentModule.route || `/${parentModule.role.toLowerCase()}/${parentModule.name}`;
            finalData.route = `${parentRoute}/${finalData.name}`;
        }

        const url = editingModule 
            ? `/admin/modules/${editingModule.id}`
            : '/admin/modules';

        setIsProcessing(true);
        
        if (editingModule) {
            router.put(url, finalData, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onSave();
                    setIsProcessing(false);
                },
                onError: (errors: any) => {
                    console.error('Error guardando módulo:', errors);
                    setIsProcessing(false);
                }
            });
        } else {
            router.post(url, finalData, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onSave();
                    setIsProcessing(false);
                },
                onError: (errors: any) => {
                    console.error('Error guardando módulo:', errors);
                    setIsProcessing(false);
                }
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingModule ? 'Editar Contenido' : 'Agregar Contenido'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Tipo de contenido */}
                    <div className="space-y-2">
                        <Label>Tipo de Contenido</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setData(prev => ({ ...prev, content_type: 'module' }))}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    contentType === 'module'
                                        ? 'border-[#2a3d85] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <FileText className="w-8 h-8 mx-auto mb-2 text-[#2a3d85]" />
                                <p className="font-semibold">Submódulo</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Crear un submódulo dentro de este módulo
                                </p>
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setData(prev => ({ ...prev, content_type: 'powerbi' }))}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    contentType === 'powerbi'
                                        ? 'border-[#2a3d85] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-[#2a3d85]" />
                                <p className="font-semibold">Power BI</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Incrustar un informe de Power BI
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Información básica */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="display_name">Nombre a mostrar *</Label>
                            <Input
                                id="display_name"
                                value={data.display_name}
                                onChange={(e) => setData(prev => ({ ...prev, display_name: e.target.value }))}
                                placeholder="Ej: Indicadores de Gestión"
                                required
                            />
                            {errors.display_name && (
                                <p className="text-sm text-red-600">{errors.display_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Breve descripción del contenido"
                            />
                        </div>
                    </div>

                    {/* Configuración específica según tipo */}
                    {contentType === 'powerbi' ? (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-start space-x-2">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-900">
                                    <p className="font-semibold mb-1">Cómo obtener el enlace de Power BI:</p>
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>Abra su informe en Power BI</li>
                                        <li>Haga clic en "Archivo" → "Insertar informe" → "Sitio web o portal"</li>
                                        <li>Copie el enlace del iframe generado</li>
                                        <li>Pegue el enlace completo aquí</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="powerbi_url">URL de Power BI *</Label>
                                <Input
                                    id="powerbi_url"
                                    type="url"
                                    value={data.powerbi_url}
                                    onChange={(e) => setData(prev => ({ ...prev, powerbi_url: e.target.value }))}
                                    placeholder="https://app.powerbi.com/view?r=..."
                                    required={contentType === 'powerbi'}
                                />
                                {errors.powerbi_url && (
                                    <p className="text-sm text-red-600">{errors.powerbi_url}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Configuración avanzada (opcional)</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="height">Altura del iframe</Label>
                                        <Input
                                            id="height"
                                            value={data.powerbi_config.height || '800px'}
                                            onChange={(e) => setData(prev => ({ ...prev, powerbi_config: {
                                                ...prev.powerbi_config,
                                                height: e.target.value
                                            }}))}
                                            placeholder="800px"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="width">Ancho del iframe</Label>
                                        <Input
                                            id="width"
                                            value={data.powerbi_config.width || '100%'}
                                            onChange={(e) => setData(prev => ({ ...prev, powerbi_config: {
                                                ...prev.powerbi_config,
                                                width: e.target.value
                                            }}))}
                                            placeholder="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start space-x-2">
                                <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-gray-700">
                                    <p>Este submódulo aparecerá como una tarjeta dentro del módulo principal.</p>
                                    <p className="mt-1">Los usuarios podrán navegar a él haciendo clic en "Abrir".</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Icono</Label>
                                <Select 
                                    value={data.icon} 
                                    onValueChange={(value) => setData(prev => ({ ...prev, icon: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar icono" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FileText">Documento</SelectItem>
                                        <SelectItem value="BarChart3">Gráfico</SelectItem>
                                        <SelectItem value="Database">Base de datos</SelectItem>
                                        <SelectItem value="Settings">Configuración</SelectItem>
                                        <SelectItem value="Users">Usuarios</SelectItem>
                                        <SelectItem value="Shield">Seguridad</SelectItem>
                                        <SelectItem value="Heart">Salud</SelectItem>
                                        <SelectItem value="Activity">Actividad</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isProcessing}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isProcessing}
                            className="bg-[#2a3d85] hover:bg-[#1e2d5f]"
                        >
                            {isProcessing ? 'Guardando...' : (editingModule ? 'Actualizar' : 'Crear')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
