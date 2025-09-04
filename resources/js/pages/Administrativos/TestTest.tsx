import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { FileText } from 'lucide-react';

export default function TestTest() {
    const { props } = usePage();
    const user = (props as any).auth?.user;
    
    // Determinar la URL de regreso basada en el rol del usuario
    const getBackUrl = () => {
        if (user?.role === 'Administrador') {
            return '/dashboard/administrativos';
        }
        return '/dashboard/administrativos';
    };

    return (
        <AppLayout
            title="TEST - Business Intelligence HUV"
            pageTitle="TEST"
            pageDescription="asdfasdf"
            icon={FileText}
            showBackButton={true}
            backUrl={getBackUrl()}
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Módulo en Desarrollo</h2>
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-[#2a3d85] mx-auto mb-4" />
                    <p className="text-gray-600">
                        El módulo de TEST está siendo desarrollado.
                        <br />
                        Pronto estará disponible con todas las funcionalidades.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}