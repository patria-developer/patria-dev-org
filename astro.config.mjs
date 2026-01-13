// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: true,
      studioBasePath: '/admin',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Sanity packages
            if (id.includes('node_modules/sanity') || 
                id.includes('node_modules/@sanity')) {
              return 'sanity-vendor';
            }
            
            // React packages
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
            
            // GSAP
            if (id.includes('node_modules/gsap')) {
              return 'gsap-vendor';
            }
            
            // Other large vendors
            if (id.includes('node_modules/')) {
              return 'vendor';
            }
          }
        }
      },
      chunkSizeWarningLimit: 4000
    }
  }
});
