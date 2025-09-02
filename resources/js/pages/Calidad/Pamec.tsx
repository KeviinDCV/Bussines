import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Shield, ArrowLeft } from 'lucide-react';

export default function Pamec() {
    const handleBackToDashboard = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const fromGerencia = urlParams.get('from') === 'gerencia';
        
        if (fromGerencia) {
            router.get('/dashboard/calidad-gerencia');
        } else {
            router.get('/dashboard/calidad');
        }
    };

    return (
        <AppLayout
            title="PAMEC - Business Intelligence HUV"
            pageTitle="PAMEC"
            pageDescription="Programa de Auditoría para el Mejoramiento de la Calidad"
            icon={Shield}
            showBackButton={true}
            backUrl="/dashboard/calidad"
        >
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                    <div className="text-center py-12">
                        <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                        <p className="text-gray-600">
                            El módulo PAMEC está siendo desarrollado.
                            <br />
                            Pronto estará disponible con todas las funcionalidades.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
