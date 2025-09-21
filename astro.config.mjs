import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://plusui.com",
  output: "server", // Server-side rendering için gerekli
  adapter: vercel(),
  integrations: [
    mdx(), 
    sitemap(), 
    icon(), 
    react()
  ],

  // Syntax highlighting configuration
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: ['html', 'css', 'javascript', 'typescript', 'jsx', 'tsx', 'vue', 'astro', 'json'],
      wrap: true
    }
  },
  
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
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  },
});
