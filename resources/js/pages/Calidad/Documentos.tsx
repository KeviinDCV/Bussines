import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { FileText, ArrowLeft } from 'lucide-react';

export default function Documentos() {
    return (
        <AppLayout
            title="Documentos - Business Intelligence HUV"
            pageTitle="Documentos"
            pageDescription="Gestión documental y control de versiones"
            icon={FileText}
            showBackButton={true}
            backUrl="/dashboard/calidad"
        >
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Documentos</h2>
                    <p className="text-gray-600">Sistema de gestión documental y control de versiones</p>
                </div>
                
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe 
                        title="Dashboard Documentos" 
                        width="100%" 
                        height="650" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiNzBiMDk5YjEtNzllMi00MmRmLWI5ZGYtMjU4N2U1YzcwMDQxIiwidCI6ImNmNGFhYjEzLWQwMDQtNDcwOC04MDFjLTQ0YmJiYWUxNmI0MyIsImMiOjR9" 
                        frameBorder="0" 
                        allowFullScreen={true}
                        className="w-full"
                    />
                </div>
            </div>
        </AppLayout>
    );
}