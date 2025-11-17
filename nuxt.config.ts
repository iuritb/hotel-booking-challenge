import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Manter SSR ativado (padrão)
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  nitro: {
    preset: 'vercel',
    experimental: {
      wasm: true
    },
    rollupConfig: {
      external: []
    }
  },

  compatibilityDate: '2025-11-17',

  // Configurações específicas para resolver problemas de ESM no SSR
  experimental: {
    payloadExtraction: false
  },

  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia']
    },
    ssr: {
      noExternal: ['vue', 'vue-router', 'pinia', '@pinia/nuxt']
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false
    }
  },

  build: {
    transpile: ['vue', 'pinia']
  },

  css: [
    '~/assets/css/tailwind.css',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    viewer: true,
  },

  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,

    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
    },
  },

  app: {
    head: {
      title: 'Hotel Booking Challenge',
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Hotel Booking` : 'Hotel Booking Challenge';
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Desafio técnico de reserva de hotéis com Nuxt 3' },
      ],
      link: []
    }
  }
});