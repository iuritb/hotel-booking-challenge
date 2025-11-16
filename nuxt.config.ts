
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  nitro: {
    preset: 'vercel',
    compatibilityDate: '2025-11-16',
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
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
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
      link: [
      ]
    }
  },

  build: {
    transpile: ['pinia'],
  },

});