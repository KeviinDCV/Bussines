import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { FileText } from 'lucide-react';

export default function PlanDesarrollo() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    return (
        <AppLayout
            title="Plan de Desarrollo - Business Intelligence HUV"
            pageTitle="Plan de Desarrollo"
            pageDescription="Planificación Estratégica Institucional"
            icon={FileText}
        >
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-[#2a3d85] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan de Desarrollo Institucional</h2>
                    <p className="text-gray-600 mb-8">
                        Módulo en desarrollo para la gestión del plan de desarrollo estratégico del Hospital Universitario del Valle.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Próximamente</h3>
                        <p className="text-blue-700">
                            Este módulo incluirá herramientas para la planificación estratégica, seguimiento de objetivos institucionales y gestión de proyectos de desarrollo.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
