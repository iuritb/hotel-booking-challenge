import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Nuxt Plugin: auth.client.ts - Plugin sendo executado.'); 
  const authStore = useAuthStore();
  authStore.initializeAuth();
  console.log('Nuxt Plugin: auth.client.ts - authStore.initializeAuth() chamada.'); 
});