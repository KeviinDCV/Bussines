import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { Home } from 'lucide-react';

export default function General() {
    const { props } = usePage();
    const userPermissions = (props as any).userPermissions || [];

    return (
        <AppLayout
            title="Dashboard General - Business Intelligence HUV"
            pageTitle="Dashboard General"
            pageDescription="Sistema de Inteligencia de Negocios"
            icon={Home}
        >
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido al Sistema de Business Intelligence</h2>
                <p className="text-lg text-gray-600 mb-8">Hospital Universitario del Valle "Evaristo Garcia" E.S.E</p>
                
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceso a Dashboards</h3>
                    <p className="text-gray-600 mb-6">
                        Seleccione el dashboard correspondiente a su área de trabajo desde el menú principal.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900">Dashboards Disponibles</h4>
                            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                <li>• Asistenciales</li>
                                <li>• Administrativos</li>
                                <li>• Calidad</li>
                                <li>• Direccionamiento</li>
                                <li>• Financieros</li>
                            </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900">Información del Sistema</h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Sistema de inteligencia de negocios para la gestión hospitalaria integral.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}