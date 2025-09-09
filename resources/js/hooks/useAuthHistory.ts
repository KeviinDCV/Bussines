import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { authHistoryManager } from '@/utils/authHistoryManager';
import { type SharedData } from '@/types';

/**
 * Hook personalizado para manejar el historial de autenticación
 * Debe ser usado dentro de componentes que estén en el contexto de Inertia
 */
export function useAuthHistory() {
    const { props } = usePage<SharedData>();
    const isAuthenticated = !!props.auth?.user;

    useEffect(() => {
        // Actualizar el estado de autenticación en el manager
        if (isAuthenticated) {
            authHistoryManager.setAuthenticated(true);
            
            // Si estamos en una página autenticada, prevenir volver al login
            if (window.location.pathname !== '/login') {
                // Solo limpiar historial de login si no estamos viniendo de una recarga
                const navigation = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming);
                if (navigation.type !== 'reload') {
                    authHistoryManager.preventBackNavigation();
                }
            }
        } else {
            authHistoryManager.setUnauthenticated();
        }
    }, [isAuthenticated]);

    // Listener global para manejar navegación hacia atrás
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            try {
                if (isAuthenticated && window.location.pathname === '/login') {
                    // Si usuario autenticado intenta ir al login via botón atrás
                    event.preventDefault();
                    window.history.forward();
                    
                    // Redirigir al dashboard según el rol
                    const user = props.auth?.user;
                    let dashboardPath = '/dashboard';
                    
                    if (user?.role) {
                        switch (user.role) {
                            case 'Asistenciales':
                                dashboardPath = '/dashboard/asistenciales';
                                break;
                            case 'Administrativos':
                                dashboardPath = '/dashboard/administrativos';
                                break;
                            case 'Direccionamiento':
                                dashboardPath = '/dashboard/direccionamiento';
                                break;
                            case 'Financieros':
                                dashboardPath = '/dashboard/financieros';
                                break;
                            case 'Administrador':
                                dashboardPath = '/dashboard/administrador';
                                break;
                        }
                    }
                    
                    setTimeout(() => {
                        try {
                            window.location.href = dashboardPath;
                        } catch (err) {
                            console.error('Error redirecting to dashboard:', err);
                            // Fallback to default dashboard
                            window.location.href = '/dashboard';
                        }
                    }, 50);
                }
            } catch (error) {
                console.error('Error in popstate handler:', error);
            }
        };

        if (isAuthenticated) {
            window.addEventListener('popstate', handlePopState);
            return () => {
                try {
                    window.removeEventListener('popstate', handlePopState);
                } catch (error) {
                    console.warn('Error removing popstate listener:', error);
                }
            };
        }
    }, [isAuthenticated, props.auth?.user]);

    return {
        isAuthenticated,
        user: props.auth?.user
    };
}
