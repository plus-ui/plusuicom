import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import lit from "@astrojs/lit";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://plusui.com",
  integrations: [mdx(), sitemap(), icon(), lit(), react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@plusui/library/cdn/components/index.js"],
    },
  },
});
