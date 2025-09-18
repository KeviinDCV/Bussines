import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';

interface PowerBIEmbedProps {
    url: string;
    config?: {
        width?: string;
        height?: string;
        showToolbar?: boolean;
        showNavPane?: boolean;
    };
}

export default function PowerBIEmbed({ url, config }: PowerBIEmbedProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fullscreen, setFullscreen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const defaultConfig = {
        width: '100%',
        height: '800px',
        showToolbar: true,
        showNavPane: true,
        ...config
    };

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.onload = () => setLoading(false);
            iframe.onerror = () => {
                setLoading(false);
                setError('Error al cargar el informe de Power BI');
            };
        }
    }, [url]);

    const toggleFullscreen = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        if (!fullscreen) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setFullscreen(!fullscreen);
    };

    // Procesar la URL para asegurar que sea embebible
    const getEmbedUrl = (url: string) => {
        // Si ya es una URL de embed, usarla directamente
        if (url.includes('embed=true')) {
            return url;
        }
        
        // Si es una URL de Power BI regular, convertirla a embed
        if (url.includes('powerbi.com')) {
            // Agregar parámetros de embed si no están presentes
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}rs:embed=true`;
        }
        
        return url;
    };

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex flex-col items-center text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar el informe</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <p className="text-sm text-gray-500">
                        Por favor, verifica que la URL del informe sea correcta y que tengas los permisos necesarios.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Informe de Power BI</h3>
                <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                >
                    {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
            </div>
            
            <div className="relative" style={{ height: defaultConfig.height }}>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-8 h-8 text-[#2a3d85] animate-spin mb-3" />
                            <p className="text-gray-600">Cargando informe de Power BI...</p>
                        </div>
                    </div>
                )}
                
                <iframe
                    ref={iframeRef}
                    src={getEmbedUrl(url)}
                    width={defaultConfig.width}
                    height="100%"
                    frameBorder="0"
                    allowFullScreen={true}
                    className="w-full"
                    title="Power BI Report"
                />
            </div>
        </div>
    );
}
