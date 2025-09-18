import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import ModuleContent from '@/components/ModuleContent';
import { FolderOpen } from 'lucide-react';

export default function SubmoduloPrueba() {
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
            title="Submódulo prueba - Tableros de Gestión HUV"
            pageTitle="Submódulo prueba"
            pageDescription="Prueba de submódulo"
            icon={FolderOpen}
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
                    displayName="Submódulo prueba"
                    icon={FolderOpen}
                    canManageContent={user?.role === 'Administrador' || user?.role?.includes('Administrador')}
                />
            )}
        </AppLayout>
    );
}