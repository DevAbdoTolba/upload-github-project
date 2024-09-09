// import adapter from '@sveltejs/adapter-auto';
import adapterStatic from "@sveltejs/adapter-static";

// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  prerender: {
    default: true, // Prerender all pages by default
  },

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapterStatic({
      pages: "public", // Directory where the static files will be placed
      assets: "public", // Same directory for assets like CSS and JS
      fallback: "index.html", // This will serve index.html for all routes
    }),
  },
};

export default config;
