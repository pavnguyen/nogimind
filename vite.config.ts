import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(
    `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`
  ),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'NoGi Mind',
        short_name: 'NoGi Mind',
        description: 'Modern no-gi grappling knowledge system for studying skills, positions, concepts, and live problem solving.',
        theme_color: '#0f766e',
        background_color: '#020617',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'any',
        lang: 'en',
        categories: ['sports', 'education', 'reference'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        runtimeCaching: [
          {
            // Cache generated content JSON files, including video mappings.
            urlPattern: /^https?:\/\/.*\/generated\/(skills|concepts|positions|manifest|videos)\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nogimind-content',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'nogimind-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache YouTube video thumbnails
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nogimind-yt-thumbnails',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // Vendor chunks
            { name: 'vendor-react', test: /node_modules\/(react(-dom)?|react-router|react-router-dom)/ },
            { name: 'vendor-query', test: /node_modules\/(@tanstack\/react-query)/ },
            { name: 'vendor-i18n', test: /node_modules\/(i18next|react-i18next)/ },
            { name: 'vendor-lucide', test: /node_modules\/lucide-react/ },

            // Legacy data (active files still in src/data/)
            { name: 'defensive-data', test: /src\/data\/(defensiveLayers|archetypes|techniqueStateMachines)/ },
            { name: 'mastery-data', test: /src\/data\/(masteryStages|trainingMethods|sharedKnowledge)/ },
            { name: 'reference-data', test: /src\/data\/(glossaryTerms|concepts|positions)/ },

            // Search
            { name: 'search-vendor', test: /node_modules\/minisearch/ },
            { name: 'search-engine', test: /src\/(utils\/searchEngine|workers\/searchWorker)/ },
          ],
        },
      },
    },
  },
})
