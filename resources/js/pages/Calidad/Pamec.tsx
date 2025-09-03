import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Shield } from 'lucide-react';

export default function Pamec() {
    return (
        <AppLayout
            title="PAMEC - Business Intelligence HUV"
            pageTitle="PAMEC"
            pageDescription="Programa de Auditoría para el Mejoramiento de la Calidad"
            icon={Shield}
            showBackButton={true}
            backUrl="/dashboard/calidad"
        >
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ejes de Acreditación</h2>
                    <p className="text-gray-600">Programa de Auditoría para el Mejoramiento de la Calidad</p>
                </div>
                
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe 
                        title="Ejes de Acreditación" 
                        width="100%" 
                        height="650" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiNGU1YTVjODQtZGQxNS00NTdjLWE0MDgtMjBmNWFmODJjOGM3IiwidCI6ImNmNGFhYjEzLWQwMDQtNDcwOC04MDFjLTQ0YmJiYWUxNmI0MyIsImMiOjR9" 
                        frameBorder="0" 
                        allowFullScreen={true}
                        className="w-full"
                    />
                </div>
            </div>
        </AppLayout>
    );
}