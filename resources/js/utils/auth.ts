/**
 * Simplified authentication utilities
 * Focuses on reliable logout with proper server communication
 */

import { router } from '@inertiajs/react';
import { authHistoryManager } from './authHistoryManager';

/**
 * Simple and reliable logout function
 * Uses Inertia router for proper logout handling
 */
export const simpleLogout = (): void => {
    // Mark user as unauthenticated in history manager
    authHistoryManager.setUnauthenticated();
    
    // Use Inertia router.post which handles redirects properly
    router.post('/logout', {}, {
        onSuccess: () => {
            // Clear authentication state and allow normal navigation
            authHistoryManager.setUnauthenticated();
            // Inertia will handle the redirect automatically
        },
        onError: (errors) => {
            console.warn('❌ Server logout failed:', errors);
            // Clear auth state even on error
            authHistoryManager.setUnauthenticated();
            // Fallback: force redirect to login
            window.location.href = '/login';
        }
    });
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use simpleLogout() instead
 */
export const robustLogout = simpleLogout;

/**
 * Alternative server logout (for debugging/testing)
 * Uses the original server-based approach
 */
export const serverLogout = async (): Promise<void> => {
    try {
        // Simple approach with proper timeout cancellation
        await new Promise<void>((resolve, reject) => {
            let isCompleted = false;
            
            const timeoutId = setTimeout(() => {
                if (!isCompleted) {
                    isCompleted = true;
                    console.warn('⏰ Logout timeout - forcing client logout');
                    reject(new Error('Timeout'));
                }
            }, 3000);
            
            router.post('/logout', {}, {
                onSuccess: () => {
                    if (!isCompleted) {
                        isCompleted = true;
                        clearTimeout(timeoutId);
                        resolve();
                    }
                },
                onError: (errors) => {
                    if (!isCompleted) {
                        isCompleted = true;
                        clearTimeout(timeoutId);
                        console.warn('❌ Server logout failed:', errors);
                        reject(new Error('Server logout failed'));
                    }
                }
            });
        });
        
    } catch (error) {
        console.warn('🚨 Server logout failed, forcing client-side logout:', error);
        forceClientLogout();
    }
};

/**
 * Forces immediate client-side logout (most reliable)
 * Use this when you want to bypass server logout entirely
 */
export const forceLogout = (): void => {
    console.log('🔐 Forcing immediate logout');
    forceClientLogout();
};

/**
 * Forces a complete client-side logout with enhanced cookie clearing
 * Specifically targets Laravel session cookies and performs thorough cleanup
 */
const forceClientLogout = (): void => {
    console.log('🧹 Performing enhanced client-side cleanup');
    
    // Clear storage
    try {
        localStorage.clear();
        sessionStorage.clear();
        console.log('✅ Storage cleared');
    } catch (e) {
        console.warn('⚠️ Failed to clear storage:', e);
    }
    
    // Enhanced cookie clearing - target Laravel session cookies specifically
    try {
        // Based on Laravel session config, the app name creates the session cookie name
        const appName = 'business_intelligence_huv'; // Derived from APP_NAME
        const cookiesToClear = [
            `${appName}_session`,
            'laravel_session',
            'XSRF-TOKEN',
            'remember_web',
            'remember_token',
            'business_intelligence_huv_session', // Explicit app session cookie
        ];
        
        console.log('🎯 Clearing specific Laravel cookies:', cookiesToClear);
        
        // Clear specific Laravel cookies with multiple domain variations
        cookiesToClear.forEach(cookieName => {
            // Current path
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            // With current domain
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
            // With subdomain wildcard
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
            // Without domain (for localhost)
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
        });
        
        // Clear all existing cookies as additional fallback
        const allCookies = document.cookie.split(";");
        console.log('🧹 Clearing all existing cookies:', allCookies.length, 'found');
        
        allCookies.forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            if (name) {
                // Multiple clearing attempts with different domain/path combinations
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
            }
        });
        
        console.log('✅ Enhanced cookies cleared');
    } catch (e) {
        console.warn('⚠️ Failed to clear cookies:', e);
    }
    
    // Add delay to ensure cookies are processed before redirect
    setTimeout(() => {
        console.log('🔄 Redirecting to login after cleanup delay');
        window.location.href = '/login';
    }, 200);
};

/**
 * EMERGENCY CLIENT LOGOUT - Guaranteed to work for presentations
 * Uses aggressive cleanup and forced navigation
 */
const emergencyClientLogout = (): void => {
    console.log('🚨 EMERGENCY CLIENT LOGOUT - Aggressive cleanup mode');
    
    // Immediate storage clearing
    try {
        localStorage.clear();
        sessionStorage.clear();
        console.log('✅ Emergency storage cleared');
    } catch (e) {
        console.warn('⚠️ Storage clear failed:', e);
    }
    
    // Aggressive cookie clearing
    try {
        // Get all cookies and clear them immediately
        const cookies = document.cookie.split(";");
        console.log('🚨 Emergency cookie clearing:', cookies.length, 'cookies found');
        
        cookies.forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            if (name) {
                // Aggressive clearing with all possible combinations
                const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = `${name}=;${expiry};path=/`;
                document.cookie = `${name}=;${expiry};path=/;domain=${window.location.hostname}`;
                document.cookie = `${name}=;${expiry};path=/;domain=.${window.location.hostname}`;
                document.cookie = `${name}=;${expiry};path=/;domain=localhost`;
                document.cookie = `${name}=;${expiry};path=/;secure`;
                document.cookie = `${name}=;${expiry};path=/;samesite=strict`;
                document.cookie = `${name}=;${expiry};path=/;samesite=lax`;
            }
        });
        
        console.log('✅ Emergency cookies cleared aggressively');
    } catch (e) {
        console.warn('⚠️ Cookie clear failed:', e);
    }
    
    // Force immediate redirect with replace (no back button)
    console.log('🚨 EMERGENCY REDIRECT - Forcing navigation to login with bypass');
    
    // Use replace to prevent back button issues and bypass middleware
    setTimeout(() => {
        window.location.replace('/login?force=1&logout=1');
    }, 100);
};

/**
 * Logs authentication-related errors for debugging
 */
export const logAuthError = (context: string, error: any): void => {
    const errorInfo = {
        context,
        error: error?.message || error,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        csrfToken: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ? 'present' : 'missing'
    };
    
    console.error('🔐 Auth Error:', errorInfo);
    
    // In production, you might want to send this to a logging service
    // logToService('auth_error', errorInfo);
};