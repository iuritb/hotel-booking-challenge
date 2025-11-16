<!-- pages/booking-confirmation.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
      <div class="text-green-500 mb-6">
        <Icon name="ic:round-check-circle" class="h-24 w-24 mx-auto" />
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Reserva Confirmada!</h1>
      <p class="text-lg text-gray-600 mb-6">
        Sua reserva foi realizada com sucesso. Você receberá um e-mail de confirmação em breve com todos os detalhes.
      </p>
      <NuxtLink to="/" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Voltar para a Página Inicial
        <Icon name="ic:round-arrow-right-alt" class="ml-3 -mr-1 h-5 w-5" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app';

// Define o layout padrão
definePageMeta({
  layout: 'default',
});

// Define o título da página
useHead({
  title: 'Reserva Confirmada - Meu App de Reservas',
});
</script>

<style scoped>
/* Estilos específicos para a página de confirmação (se necessário) */
</style>