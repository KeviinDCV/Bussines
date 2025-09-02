import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Headphones } from 'lucide-react';

export default function CentroEscucha() {
    return (
        <AppLayout
            title="Centro de Escucha - Business Intelligence HUV"
            pageTitle="Centro de Escucha"
            pageDescription="Atención y seguimiento a usuarios"
            icon={Headphones}
            showBackButton={true}
            backUrl="/dashboard/calidad"
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <Headphones className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de Centro de Escucha está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
