import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

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
