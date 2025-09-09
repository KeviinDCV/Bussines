/**
 * Maneja el historial del navegador para prevenir navegación no deseada después del login
 */

export class AuthHistoryManager {
    private static instance: AuthHistoryManager;
    private isAuthenticated: boolean = false;
    private loginUrl: string = '/login';

    private constructor() {
        this.setupPopstateListener();
    }

    public static getInstance(): AuthHistoryManager {
        if (!AuthHistoryManager.instance) {
            AuthHistoryManager.instance = new AuthHistoryManager();
        }
        return AuthHistoryManager.instance;
    }

    /**
     * Configura el listener para el evento popstate (botón atrás/adelante)
     */
    private setupPopstateListener(): void {
        window.addEventListener('popstate', (event) => {
            if (this.isAuthenticated && window.location.pathname === this.loginUrl) {
                // Si el usuario está autenticado e intenta ir al login via botón atrás
                // Prevenir la navegación y redirigir al dashboard
                event.preventDefault();
                window.history.forward();
                
                // Redirigir al dashboard apropiado
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 50);
            }
        });
    }

    /**
     * Marca al usuario como autenticado y limpia el historial del login
     */
    public setAuthenticated(clearLoginHistory: boolean = true): void {
        this.isAuthenticated = true;
        
        if (clearLoginHistory) {
            // Reemplazar la entrada del login en el historial
            // para que el botón atrás no vuelva al login
            setTimeout(() => {
                if (window.history.length > 1) {
                    window.history.replaceState(
                        { preventBack: true }, 
                        document.title, 
                        window.location.href
                    );
                }
            }, 100);
        }
    }

    /**
     * Marca al usuario como no autenticado
     */
    public setUnauthenticated(): void {
        this.isAuthenticated = false;
    }

    /**
     * Previene la navegación hacia atrás una vez
     */
    public preventBackNavigation(): void {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', this.handleBackButton, { once: true });
    }

    private handleBackButton = (event: PopStateEvent): void => {
        window.history.pushState(null, document.title, window.location.href);
    }
}

// Exportar instancia singleton
export const authHistoryManager = AuthHistoryManager.getInstance();
