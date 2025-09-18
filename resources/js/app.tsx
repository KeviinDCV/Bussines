import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { AuthMiddleware } from './middleware/AuthMiddleware';

// Configure Inertia to use CSRF token
import { router } from '@inertiajs/react';
import axios from 'axios';

// Set up CSRF token globally for axios
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    // Configure axios defaults
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

// Axios interceptor to handle CSRF token refresh on 419 errors
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Ignore CanceledError messages as they are normal (navigation cancellations)
        if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
            return Promise.reject(error);
        }
        
        // Only log non-cancellation errors
        console.log('🐛 DEBUG: Axios interceptor caught error:', error);
        
        // Check if this is a 419 CSRF token error
        if (error.response && error.response.status === 419) {
            console.log('🔄 Detected CSRF token error (419). Refreshing token...');
            
            try {
                // Fetch fresh CSRF token from server
                const response = await fetch('/csrf-token', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const freshToken = data.csrf_token;
                    
                    if (freshToken) {
                        console.log('🔄 Updating CSRF token in DOM and axios...');
                        
                        // Update meta tag with fresh token
                        const metaTag = document.querySelector('meta[name="csrf-token"]');
                        if (metaTag) {
                            metaTag.setAttribute('content', freshToken);
                        }
                        
                        // Update axios defaults
                        axios.defaults.headers.common['X-CSRF-TOKEN'] = freshToken;
                        
                        console.log('✅ CSRF token refreshed successfully. Original request will be retried automatically.');
                        
                        // Retry the original request with the fresh token
                        if (error.config) {
                            error.config.headers['X-CSRF-TOKEN'] = freshToken;
                            return axios.request(error.config);
                        }
                    }
                }
            } catch (refreshError) {
                console.error('❌ Failed to refresh CSRF token:', refreshError);
            }
        }
        
        // If it's not a 419 error or refresh failed, reject the promise
        return Promise.reject(error);
    }
);

// Configure Inertia to always include CSRF token in all requests
router.on('before', (event) => {
    // Always get fresh CSRF token from DOM
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    if (csrfToken) {
        // Update axios defaults with fresh token
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
        
        // Ensure headers object exists and add CSRF token to Inertia request
        if (!event.detail.visit.headers) {
            event.detail.visit.headers = {};
        }
        
        event.detail.visit.headers['X-CSRF-TOKEN'] = csrfToken;
        event.detail.visit.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
});

// Handle CSRF token refresh on 419 errors (Page Expired)
router.on('error', async (event) => {
    console.log('🐛 DEBUG: Error event detected:', event.detail);
    
    const errors = event.detail.errors;
    console.log('🐛 DEBUG: Errors object:', errors);
    
    // Check if this is a 419 CSRF token error
    if (errors && (String(errors.status) === '419' || errors.message?.includes('CSRF') || errors.message?.includes('419'))) {
        console.log('🔄 Detected CSRF token error (419). Refreshing token and retrying...');
        
        try {
            // Fetch fresh CSRF token from server
            const response = await fetch('/csrf-token', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const freshToken = data.csrf_token;
                
                if (freshToken) {
                    // Update meta tag with fresh token
                    const metaTag = document.querySelector('meta[name="csrf-token"]');
                    if (metaTag) {
                        metaTag.setAttribute('content', freshToken);
                    }
                    
                    // Update axios defaults
                    axios.defaults.headers.common['X-CSRF-TOKEN'] = freshToken;
                    
                    console.log('✅ CSRF token refreshed successfully. Please retry your action.');
                }
            }
        } catch (error) {
            console.error('❌ Failed to refresh CSRF token:', error);
        }
    } else {
        console.log('🐛 DEBUG: Not a 419 error or condition not met');
    }
});

// Handle successful navigation to prevent back navigation to login after authentication
router.on('success', (event) => {
    const currentPage = event.detail.page;
    
    // If we successfully navigated away from login and user is authenticated
    if (currentPage.url !== '/login' && (currentPage.props as any)?.auth?.user) {
        // Clear login from browser history to prevent going back
        setTimeout(() => {
            if (document.referrer.includes('/login') || window.history.length > 1) {
                window.history.replaceState(
                    { preventLoginReturn: true }, 
                    document.title, 
                    window.location.href
                );
            }
        }, 100);
    }
});

// Handle logout to force complete page refresh
// DISABLED: This handler was causing race conditions with the robust logout utility
/*
router.on('success', (event) => {
    // If logout was successful, force hard refresh to clear all state
    if (event.detail.page.url.includes('/login') && document.referrer.includes('logout')) {
        setTimeout(() => {
            window.location.href = '/login';
        }, 100);
    }
});
*/

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#2a3d85',
        showSpinner: true,
        delay: 250,
    },
});

// This will set light / dark mode on load...
initializeTheme();
