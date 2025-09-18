import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { AlertTriangle } from 'lucide-react';
import { getModuleBackUrl } from '@/utils/navigation';

export default function Urgencias() {
    const { props } = usePage();
    const user = (props as any).auth?.user;

    return (
        <AppLayout
            title="Gestión integral de Urgencias - Tableros de Gestión HUV"
            pageTitle="Gestión integral de Urgencias"
            pageDescription="Monitoreo y gestión de servicios de urgencias médicas"
            icon={AlertTriangle}
            showBackButton={true}
            backUrl={getModuleBackUrl('asistenciales', user)}
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de Gestión integral de Urgencias está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}