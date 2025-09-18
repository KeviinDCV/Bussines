import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Activity } from 'lucide-react';

export default function UciAdultos() {
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
            title="UCI Adultos - Tableros de Gestión HUV"
            pageTitle="UCI Adultos"
            pageDescription="Unidad de Cuidados Intensivos para pacientes adultos"
            icon={Activity}
            showBackButton={true}
            backUrl="/dashboard/asistenciales"
        >
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de UCI Adultos está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
