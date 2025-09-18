import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Building2 } from 'lucide-react';

export default function Hospitalizacion() {
    return (
        <AppLayout
            title="Hospitalización - Tableros de Gestión HUV"
            pageTitle="Gestión integral de Hospitalización"
            pageDescription="Administración de pacientes hospitalizados"
            icon={Building2}
            showBackButton={true}
            backUrl="/dashboard/asistenciales"
        >
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Censo Hospitalario</h2>
                    <p className="text-gray-600">Control y seguimiento de pacientes hospitalizados</p>
                </div>
                
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe 
                        title="Censo" 
                        width="100%" 
                        height="650" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiMGZlOGU5MGUtNTA5MC00YWE1LWFmNTktZDE4NTIwYTE5ZjQwIiwidCI6ImNmNGFhYjEzLWQwMDQtNDcwOC04MDFjLTQ0YmJiYWUxNmI0MyIsImMiOjR9" 
                        frameBorder="0" 
                        allowFullScreen={true}
                        className="w-full"
                    />
                </div>
            </div>
        </AppLayout>
    );
}