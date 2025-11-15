<template>
  <div class="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-100">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold hover:text-blue-200 transition-colors">
          🏨 Hotel Booking
        </NuxtLink>
        <div class="space-x-4">
          <NuxtLink to="/login" class="hover:text-blue-200 transition-colors">Login</NuxtLink>
          <NuxtLink to="/register" class="hover:text-blue-200 transition-colors">Register</NuxtLink>
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
</script>

<style scoped>
</style>
