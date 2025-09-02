import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Baby } from 'lucide-react';

export default function UciPediatrico() {
    const handleBackToDashboard = () => {
        // Detectar si viene desde Gerencia usando parámetro URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('from') === 'gerencia') {
            router.get('/dashboard/asistenciales-gerencia');
        } else {
            router.get('/dashboard/asistenciales');
        }
    };

    return (
        <AppLayout
            title="UCI Pediátrico - Business Intelligence HUV"
            pageTitle="UCI Pediátrico"
            pageDescription="Unidad de Cuidados Intensivos para pacientes pediátricos"
            icon={Baby}
            showBackButton={true}
            backUrl="/dashboard/asistenciales"
        >
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <Baby className="w-16 h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de UCI Pediátrico está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
