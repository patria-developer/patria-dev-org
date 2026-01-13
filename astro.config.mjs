// @ts-check
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
)

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false,
    },
  }),
  integrations: [
    react(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: true,
      studioBasePath: '/admin',
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 7000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Sanity packages
            if (
              id.includes('node_modules/sanity') ||
              id.includes('node_modules/@sanity')
            ) {
              return 'sanity-vendor'
            }

            if (id.includes('node_modules/gsap')) {
              return 'gsap-vendor'
            }
          },
        },
      },
    },
  },
})
