import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import ModuleContent from '@/components/ModuleContent';
import { 
    FileText, BarChart3, PieChart, Target, Building, Users, Settings, 
    Database, Calendar, Clock, Map, Shield, Heart, Activity, Briefcase,
    Stethoscope, TrendingUp, DollarSign, Award 
} from 'lucide-react';

// Mapeo de iconos para módulos dinámicos
const iconMap: { [key: string]: any } = {
    FileText,
    BarChart3,
    PieChart,
    Target,
    Building,
    Users,
    Settings,
    Database,
    Calendar,
    Clock,
    Map,
    Shield,
    Heart,
    Activity,
    Briefcase,
    Stethoscope,
    TrendingUp,
    DollarSign,
    Award
};

interface Module {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    icon: string;
    route?: string;
    role: string;
    parent_id?: number;
    active: boolean;
    content_type: 'module' | 'powerbi';
    powerbi_url?: string;
    powerbi_config?: any;
    children?: Module[];
}

interface DynamicModuleProps {
    module: Module;
    submodules: Module[];
    role: string;
    canManageContent: boolean;
    breadcrumb: {
        dashboard: string;
        dashboardUrl: string;
        module: string;
    };
    [key: string]: any;
}

export default function DynamicModule() {
    const { props } = usePage<DynamicModuleProps>();
    const { module, submodules, role, canManageContent, breadcrumb } = props;
    
    // Obtener el icono del módulo
    const IconComponent = iconMap[module.icon] || FileText;
    
    // Mapear iconos de rol para el header
    const roleIconMap: { [key: string]: any } = {
        'Calidad': Award,
        'Administrativos': Building,
        'Asistenciales': Stethoscope,
        'Direccionamiento': TrendingUp,
        'Financieros': DollarSign
    };
    
    const RoleIcon = roleIconMap[role] || Building;

    return (
        <AppLayout
            title={`${module.display_name} - Tableros de Gestión HUV`}
            pageTitle={module.display_name}
            pageDescription={module.description || `Módulo del sistema ${role.toLowerCase()}`}
            icon={RoleIcon}
            showBackButton={true}
            backUrl={breadcrumb.dashboardUrl}
        >
            <div className="space-y-6">
                {/* Contenido del módulo con submódulos y Power BI */}
                <ModuleContent
                    module={module}
                    submodules={submodules}
                    displayName={module.display_name}
                    icon={IconComponent}
                    canManageContent={canManageContent}
                />
            </div>
        </AppLayout>
    );
}
