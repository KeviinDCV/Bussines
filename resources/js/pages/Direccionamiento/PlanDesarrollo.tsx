import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { FileText } from 'lucide-react';

export default function PlanDesarrollo() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];
    const user = (props as any).auth?.user;
    
    // Determinar la URL de regreso basada en el rol del usuario
    const getBackUrl = () => {
        if (user?.role === 'Administrador') {
            return '/dashboard/direccionamiento-administrador';
        }
        return '/dashboard/direccionamiento';
    };

    return (
        <AppLayout
            title="Plan de Desarrollo - Business Intelligence HUV"
            pageTitle="Plan de Desarrollo"
            pageDescription="Planificación Estratégica Institucional"
            icon={FileText}
            showBackButton={true}
            backUrl={getBackUrl()}
        >
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="w-full h-full">
                    <iframe 
                        title="Plan de Desarrollo" 
                        width="100%" 
                        height="800" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiNDQxZTA3NjYtYjc4ZS00YjFiLWFlOGItM2M5MjY3MTBjZGIyIiwidCI6ImNmNGFhYjEzLWQwMDQtNDcwOC04MDFjLTQ0YmJiYWUxNmI0MyIsImMiOjR9" 
                        frameBorder="0" 
                        allowFullScreen={true}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </AppLayout>
    );
}