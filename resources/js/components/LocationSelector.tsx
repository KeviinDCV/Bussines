import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building, Users } from 'lucide-react';

interface LocationSelectorProps {
    onLocationSelect: (location: 'cali' | 'cartago') => void;
    userRole: string;
}

export default function LocationSelector({ onLocationSelect, userRole }: LocationSelectorProps) {
    const locations = [
        {
            id: 'cali' as const,
            name: 'Cali',
            fullName: 'Hospital Universitario del Valle - Sede Cali',
            description: 'Sede principal del Hospital Universitario del Valle',
            icon: Building,
            color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
            iconColor: 'text-blue-600',
            stats: userRole === 'Asistenciales' ? 'Servicios médicos especializados' : 'Centro financiero principal'
        },
        {
            id: 'cartago' as const,
            name: 'Cartago',
            fullName: 'Hospital Universitario del Valle - Sede Cartago',
            description: 'Sede regional del Hospital Universitario del Valle',
            icon: Users,
            color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
            iconColor: 'text-blue-600',
            stats: userRole === 'Asistenciales' ? 'Atención médica regional' : 'Gestión financiera regional'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                        <img src="/images/logo.png" alt="HUV Logo" className="w-16 h-16 object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#2a3d85] mb-2">
                        Seleccionar Ubicación
                    </h1>
                    <p className="text-gray-600 mb-2">
                        Hospital Universitario del Valle "Evaristo Garcia" E.S.E
                    </p>
                    <p className="text-sm text-gray-500">
                        Rol: <span className="font-semibold text-[#2a3d85]">{userRole}</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {locations.map((location) => {
                        const IconComponent = location.icon;
                        return (
                            <Card 
                                key={location.id}
                                className={`cursor-pointer transition-all duration-300 ${location.color} border-2 hover:shadow-lg hover:scale-105`}
                                onClick={() => onLocationSelect(location.id)}
                            >
                                <CardHeader className="text-center pb-4">
                                    <div className="flex justify-center mb-4">
                                        <div className={`p-4 rounded-full bg-white shadow-md`}>
                                            <IconComponent className={`w-8 h-8 ${location.iconColor}`} />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                        {location.name}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        {location.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-gray-700 mb-4">
                                        {location.stats}
                                    </p>
                                    <Button 
                                        className="w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLocationSelect(location.id);
                                        }}
                                    >
                                        Acceder a {location.name}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Seleccione la ubicación para acceder a los módulos correspondientes
                    </p>
                </div>
            </div>
        </div>
    );
}
