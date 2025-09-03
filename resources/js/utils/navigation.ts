/**
 * Utility functions for navigation and routing
 */

/**
 * Get the correct dashboard URL based on user role
 * @param baseRole - The base role (e.g., 'administrativos', 'asistenciales', 'financieros', 'calidad', 'direccionamiento')
 * @param userRole - The user's role (e.g., 'Administrador', 'Gerencia', 'Asistenciales', etc.)
 * @returns The correct dashboard URL
 */
export function getDashboardUrl(baseRole: string, userRole: string): string {
    const baseUrl = `/dashboard/${baseRole}`;
    
    if (userRole === 'Administrador') {
        return `${baseUrl}-administrador`;
    } else if (userRole === 'Gerencia') {
        return `${baseUrl}-gerencia`;
    }
    
    return baseUrl;
}

/**
 * Get the back URL for a module based on the user's role
 * @param moduleCategory - The module category (e.g., 'administrativos', 'asistenciales', 'financieros', 'calidad', 'direccionamiento')
 * @param user - The user object from Inertia props
 * @returns The correct back URL
 */
export function getModuleBackUrl(moduleCategory: string, user: any): string {
    const userRole = user?.role;
    return getDashboardUrl(moduleCategory, userRole);
}