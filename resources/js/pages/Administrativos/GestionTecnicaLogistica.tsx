import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Wrench } from 'lucide-react';
import { getModuleBackUrl } from '@/utils/navigation';

export default function GestionTecnicaLogistica() {
    const { props } = usePage();
    const user = (props as any).auth?.user;

    return (
        <AppLayout
            title="Gestión Técnica y Logística - Business Intelligence HUV"
            pageTitle="Gestión Técnica y Logística"
            pageDescription="Mantenimiento técnico y gestión logística hospitalaria"
            icon={Wrench}
            showBackButton={true}
            backUrl={getModuleBackUrl('administrativos', user)}
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <Wrench className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de Gestión Técnica y Logística está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
