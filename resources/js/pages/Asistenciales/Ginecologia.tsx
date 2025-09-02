import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Baby } from 'lucide-react';

export default function Ginecologia() {
    return (
        <AppLayout
            title="Gestión integral de Ginecología y Obstetricia - Business Intelligence HUV"
            pageTitle="Gestión integral de Ginecología y Obstetricia"
            pageDescription="Atención especializada en salud femenina y materna"
            icon={Baby}
            showBackButton={true}
            backUrl="/dashboard/asistenciales"
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <Baby className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de Gestión integral de Ginecología y Obstetricia está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
