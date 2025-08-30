/**
 * Central URL configuration for the PlusUI website
 * Type-safe environment variables kullanır (astro:env API)
 * URL'leri değiştirmek için .env dosyasını güncelleyin
 */

import { 
  PUBLIC_DOCS_BASE_URL, 
  PUBLIC_DOCS_API_URL, 
  PUBLIC_DOCS_COMPONENTS_URL, 
  PUBLIC_DOCS_GUIDES_URL 
} from 'astro:env/client';

export const SITE_URLS = {
  // Main site
  main: 'https://plusui.com',
  
  // Documentation site URLs - astro:env'dan type-safe şekilde alınır
  docs: {
    base: PUBLIC_DOCS_BASE_URL,
    api: PUBLIC_DOCS_API_URL,
    components: PUBLIC_DOCS_COMPONENTS_URL,
    guides: PUBLIC_DOCS_GUIDES_URL,
    examples: `${PUBLIC_DOCS_BASE_URL}/examples`
  },
  
  // External URLs
  github: 'https://github.com/plus-ui',
  npm: 'https://www.npmjs.com/org/plusui',
  figma: 'https://www.figma.com/@plusui'

} as const;

// Helper functions for easy URL building
export const getDocsUrl = (path: string = '') => {
  return path ? `${SITE_URLS.docs.base}${path.startsWith('/') ? path : `/${path}`}` : SITE_URLS.docs.base;
};

export const getApiDocsUrl = (endpoint: string = '') => {
  return endpoint ? `${SITE_URLS.docs.api}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}` : SITE_URLS.docs.api;
};

export const getComponentDocsUrl = (component: string = '') => {
  return component ? `${SITE_URLS.docs.components}${component.startsWith('/') ? component : `/${component}`}` : SITE_URLS.docs.components;
};
