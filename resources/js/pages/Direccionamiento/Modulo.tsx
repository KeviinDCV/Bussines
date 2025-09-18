import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import ModuleContent from '@/components/ModuleContent';
import { Shield } from 'lucide-react';

export default function Modulo() {
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
            title="Módulo de prueba - Tableros de Gestión HUV"
            pageTitle="Módulo de prueba"
            pageDescription="Esto es una prueba"
            icon={Shield}
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
                    displayName="Módulo de prueba"
                    icon={Shield}
                    canManageContent={user?.role === 'Administrador' || user?.role?.includes('Administrador')}
                />
            )}
        </AppLayout>
    );
}