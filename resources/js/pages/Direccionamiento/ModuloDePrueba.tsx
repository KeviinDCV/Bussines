import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import ModuleContent from '@/components/ModuleContent';
import { FileText } from 'lucide-react';

export default function ModuloDePrueba() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const module = (props as any).module;
    const [submodules, setSubmodules] = useState((props as any).submodules || []);
    
    // Determinar la URL de regreso basada en el rol del usuario
    const getBackUrl = () => {
        if (user?.role === 'Administrador') {
            return '/dashboard/direccionamiento-administrador';
        }
        return '/dashboard/direccionamiento';
    };

    return (
        <AppLayout
            title="Modulo de prueba - Tableros de Gestión HUV"
            pageTitle="Modulo de prueba"
            pageDescription="Modulo de prueba"
            icon={FileText}
            showBackButton={true}
            backUrl={getBackUrl()}
        >
            {module?.content_type === 'powerbi' && module?.powerbi_url ? (
                <PowerBIEmbed 
                    url={module.powerbi_url}
                    config={module.powerbi_config}
                />
            ) : (
                <ModuleContent 
                    module={module}
                    submodules={submodules}
                    displayName="Modulo de prueba"
                    icon={FileText}
                />
            )}
        </AppLayout>
    );
}