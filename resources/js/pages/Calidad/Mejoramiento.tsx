import { router } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { TrendingUp } from 'lucide-react';

export default function Mejoramiento() {
    return (
        <AppLayout
            title="Mejoramiento - Business Intelligence HUV"
            pageTitle="Mejoramiento"
            pageDescription="Planes de mejoramiento continuo"
            icon={TrendingUp}
            showBackButton={true}
            backUrl="/dashboard/calidad"
        >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dashboard de Mejoramiento</h2>
                <div className="w-full">
                    <iframe 
                        width="100%" 
                        height="960" 
                        src="https://lookerstudio.google.com/embed/reporting/44d9a50b-b027-4446-a8ac-658e381ccdd6/page/p_n7rfc4blld" 
                        frameBorder="0" 
                        style={{border: 0}} 
                        allowFullScreen
                        className="rounded-lg"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
