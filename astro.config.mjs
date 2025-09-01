import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://plusui.com",
  output: "server", // Server-side rendering için gerekli
  adapter: vercel(),
  integrations: [mdx(), sitemap(), icon(), react()],
  
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    }
  },
  
  // Type-safe environment variables schema
  env: {
    schema: {
      // Public client variables (browser'da kullanılabilir)
      PUBLIC_DOCS_BASE_URL: envField.string({ 
        context: "client", 
        access: "public",
        default: "https://new-docs.plusui.com"
      }),
      PUBLIC_DOCS_API_URL: envField.string({ 
        context: "client", 
        access: "public",
        default: "https://new-docs.plusui.com/api"
      }),
      PUBLIC_DOCS_COMPONENTS_URL: envField.string({ 
        context: "client", 
        access: "public",
        default: "https://new-docs.plusui.com/components"
      }),
      PUBLIC_DOCS_GUIDES_URL: envField.string({ 
        context: "client", 
        access: "public",
        default: "https://new-docs.plusui.com/guides"
      }),
    }
  },
  
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@plusui/library/cdn/components/index.js"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['@fortawesome/fontawesome-free']
          },
          assetFileNames: (assetInfo) => {
            // Font dosyaları için hash kullanma
            if (assetInfo.name && (assetInfo.name.endsWith('.woff2') || assetInfo.name.endsWith('.woff') || assetInfo.name.endsWith('.ttf'))) {
              return 'fonts/[name][extname]';
            }
            // Diğer asset'ler için hash kullan
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  },
});
