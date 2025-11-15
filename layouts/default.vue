<template>
  <div class="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-100">
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold hover:text-blue-200 transition-colors">
          🏨 Hotel Booking
        </NuxtLink>
        <div class="space-x-4">
          <template v-if="authStore.isAuthenticated">
            <span>Olá, {{ authStore.currentUser?.name || 'Usuário' }}!</span>
            <BaseButton @click="authStore.logout()" variant="outline" class="bg-blue-500 hover:bg-blue-400 text-white border-white">Logout</BaseButton>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="hover:text-blue-200 transition-colors">Login</NuxtLink>
            <NuxtLink to="/register" class="hover:text-blue-200 transition-colors">Registrar</NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto p-4">
      <slot />
    </main>

    <footer class="bg-blue-800 text-white p-4 text-center shadow-inner">
      <div class="container mx-auto">
        &copy; {{ new Date().getFullYear() }} Hotel Booking Challenge. Todos os direitos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeAuth();
});
</script>

<style scoped>
</style>
