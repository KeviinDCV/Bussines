import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import ModuleContent from '@/components/ModuleContent';
import { BarChart3 } from 'lucide-react';

export default function ReporteDeIndicadores() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    const module = (props as any).module;
    const [submodules, setSubmodules] = useState((props as any).submodules || []);
    
    // Determinar la URL de regreso basada en el rol del usuario
    const getBackUrl = () => {
        if (user?.role === 'Administrador') {
            return '/dashboard/calidad';
        }
        return '/dashboard/calidad';
    };

    return (
        <AppLayout
            title="Reporte de Indicadores - Tableros de Gestión HUV"
            pageTitle="Reporte de Indicadores"
            pageDescription="Módulo de visualización de Reporte de Indicadores"
            icon={BarChart3}
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
                    displayName="Reporte de Indicadores"
                    icon={BarChart3}
                />
            )}
        </AppLayout>
    );
}