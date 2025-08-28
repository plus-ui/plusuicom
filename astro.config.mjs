import { defineConfig } from "astro/config";
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
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@plusui/library/cdn/components/index.js"],
    },
  },
});
