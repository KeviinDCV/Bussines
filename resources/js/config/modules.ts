import { 
    Stethoscope, 
    Building2, 
    Scissors, 
    Camera, 
    TestTube, 
    Baby, 
    Dumbbell,
    Activity,
    Heart,
    TrendingUp,
    Droplets,
    Building,
    AlertTriangle,
    Users,
    Shield,
    Monitor,
    Wrench,
    Pill,
    FileText,
    Wallet,
    PiggyBank,
    Calculator,
    BookOpen,
    DollarSign,
    Target
} from 'lucide-react';

export interface Module {
    id: string;
    title: string;
    description: string;
    icon: any;
    route: string;
    role: string;
}

export const MODULES: Module[] = [
    // Asistenciales
    { id: 'banco-sangre', title: 'Banco de Sangre', description: 'Gestión de donaciones y transfusiones sanguíneas', icon: Droplets, route: '/asistenciales/banco-sangre', role: 'asistenciales' },
    { id: 'epidemiologia', title: 'Epidemiología', description: 'Vigilancia epidemiológica y control de enfermedades', icon: TrendingUp, route: '/asistenciales/epidemiologia', role: 'asistenciales' },
    { id: 'extension-hospitalaria', title: 'Extensión Hospitalaria', description: 'Servicios de atención domiciliaria y extensión', icon: Building, route: '/asistenciales/extension-hospitalaria', role: 'asistenciales' },
    { id: 'ambulatorio', title: 'Gestión integral de Ambulatorio', description: 'Control de consultas externas y atención ambulatoria', icon: Stethoscope, route: '/asistenciales/ambulatorio', role: 'asistenciales' },
    { id: 'cirugia', title: 'Gestión integral de Cirugía', description: 'Control de quirófanos y procedimientos quirúrgicos', icon: Scissors, route: '/asistenciales/cirugia', role: 'asistenciales' },
    { id: 'ginecologia', title: 'Gestión integral de Ginecología y Obstetricia', description: 'Control de servicios ginecológicos y obstétricos', icon: Baby, route: '/asistenciales/ginecologia', role: 'asistenciales' },
    { id: 'hospitalizacion', title: 'Gestión integral de Hospitalización', description: 'Administración de pacientes hospitalizados', icon: Building2, route: '/asistenciales/hospitalizacion', role: 'asistenciales' },
    { id: 'imagenes', title: 'Gestión integral de Imágenes Diagnósticas', description: 'Control de radiología y estudios de imagen', icon: Camera, route: '/asistenciales/imagenes', role: 'asistenciales' },
    { id: 'laboratorio', title: 'Gestión integral de Laboratorio', description: 'Control de análisis clínicos y pruebas de laboratorio', icon: TestTube, route: '/asistenciales/laboratorio', role: 'asistenciales' },
    { id: 'medicina-fisica', title: 'Gestión integral de Medicina Física', description: 'Control de rehabilitación y medicina física', icon: Dumbbell, route: '/asistenciales/medicina-fisica', role: 'asistenciales' },
    { id: 'urgencias', title: 'Gestión integral de Urgencias', description: 'Control de servicios de urgencias y emergencias', icon: AlertTriangle, route: '/asistenciales/urgencias', role: 'asistenciales' },
    { id: 'mortalidad', title: 'Mortalidad', description: 'Análisis y seguimiento de indicadores de mortalidad', icon: Heart, route: '/asistenciales/mortalidad', role: 'asistenciales' },
    { id: 'uci-adultos', title: 'UCI Adultos', description: 'Unidad de Cuidados Intensivos para adultos', icon: Activity, route: '/asistenciales/uci-adultos', role: 'asistenciales' },
    { id: 'uci-neonatal', title: 'UCI Neonatal', description: 'Unidad de Cuidados Intensivos neonatales', icon: Heart, route: '/asistenciales/uci-neonatal', role: 'asistenciales' },
    { id: 'uci-pediatrico', title: 'UCI Pediátrico', description: 'Unidad de Cuidados Intensivos pediátricos', icon: Baby, route: '/asistenciales/uci-pediatrico', role: 'asistenciales' },

    // Administrativos
    { id: 'ciau', title: 'CIAU', description: 'Centro de Información y Atención al Usuario', icon: Shield, route: '/administrativos/ciau', role: 'administrativos' },
    { id: 'farmacia', title: 'Farmacia', description: 'Gestión farmacéutica y medicamentos', icon: Pill, route: '/administrativos/farmacia', role: 'administrativos' },
    { id: 'gestion-tecnica-logistica', title: 'Gestión Técnica y Logística', description: 'Mantenimiento y gestión logística', icon: Wrench, route: '/administrativos/gestion-tecnica-logistica', role: 'administrativos' },
    { id: 'sistemas-informacion', title: 'Sistemas de Información', description: 'Gestión de tecnología y sistemas', icon: Monitor, route: '/administrativos/sistemas-informacion', role: 'administrativos' },
    { id: 'talento-humano', title: 'Talento Humano', description: 'Gestión de recursos humanos y personal', icon: Users, route: '/administrativos/talento-humano', role: 'administrativos' },

    // Direccionamiento
    { id: 'plan-desarrollo', title: 'Plan de desarrollo', description: 'Gestión y seguimiento del plan estratégico institucional', icon: FileText, route: '/plan-desarrollo', role: 'direccionamiento' },

    // Financieros
    { id: 'auditoria-financiera', title: 'Auditoría Financiera', description: 'Auditoría y control financiero', icon: BookOpen, route: '/financieros/auditoria-financiera', role: 'financieros' },
    { id: 'contabilidad', title: 'Contabilidad', description: 'Gestión contable y estados financieros', icon: Calculator, route: '/financieros/contabilidad', role: 'financieros' },
    { id: 'costos', title: 'Costos', description: 'Análisis y control de costos', icon: AlertTriangle, route: '/financieros/costos', role: 'financieros' },
    { id: 'facturacion', title: 'Facturación', description: 'Control de facturación y cartera', icon: FileText, route: '/financieros/facturacion', role: 'financieros' },
    { id: 'presupuesto', title: 'Presupuesto', description: 'Planificación y control presupuestario', icon: PiggyBank, route: '/financieros/presupuesto', role: 'financieros' },
    { id: 'tesoreria', title: 'Tesorería', description: 'Gestión de flujo de caja y tesorería', icon: Wallet, route: '/financieros/tesoreria', role: 'financieros' }
];

export const getModulesByRole = (role: string): Module[] => {
    return MODULES.filter(module => module.role === role).sort((a, b) => a.title.localeCompare(b.title));
};

export const getAllModules = (): Module[] => {
    return MODULES.sort((a, b) => a.title.localeCompare(b.title));
};