import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { BarChart3 } from 'lucide-react';

export default function Indicadores() {
    return (
        <AppLayout
            title="Indicadores - Business Intelligence HUV"
            pageTitle="Indicadores"
            pageDescription="Métricas e indicadores de calidad"
            icon={BarChart3}
            showBackButton={true}
            backUrl="/dashboard/calidad"
        >
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Indicadores</h2>
                    <p className="text-gray-600">Métricas e indicadores de calidad hospitalaria</p>
                </div>
                
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe 
                        title="Indicadores" 
                        width="100%" 
                        height="650" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiNzY4YWJhNmQtZDJmNi00MTU1LWJjYmUtYjQ3MDgxNjJlOTEwIiwidCI6ImNmNGFhYjEzLWQwMDQtNDcwOC04MDFjLTQ0YmJiYWUxNmI0MyIsImMiOjR9" 
                        frameBorder="0" 
                        allowFullScreen={true}
                        className="w-full"
                    />
                </div>
            </div>
        </AppLayout>
    );
}