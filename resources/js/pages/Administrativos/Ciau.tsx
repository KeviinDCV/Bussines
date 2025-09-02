import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Shield } from 'lucide-react';

export default function Ciau() {
    return (
        <AppLayout
            title="CIAU - Business Intelligence HUV"
            pageTitle="CIAU"
            pageDescription="Centro de Información y Atención al Usuario"
            icon={Shield}
            showBackButton={true}
            backUrl="/dashboard/administrativos"
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo CIAU está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
