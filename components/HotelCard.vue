<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <NuxtLink :to="`/hotels/${hotel.id}`">
      <img
        :src="hotel.imageUrl"
        :alt="hotel.name"
        class="w-full h-48 object-cover"
        @error="handleImageError"
      >
      <div class="p-4">
        <h3 class="font-bold text-xl mb-2 text-gray-800 hover:text-blue-600 transition-colors">{{ hotel.name }}</h3>
        <p class="text-gray-600 text-sm mb-1">{{ hotel.location }}</p>
        <div class="flex items-center text-sm text-gray-500 mb-2">
          <span class="text-yellow-500 mr-1">⭐</span> {{ hotel.rating }} ({{ hotel.reviewsCount }} avaliações)
        </div>
        <p class="text-gray-700 text-lg font-semibold">
          R\$ {{ hotel.pricePerNight.toFixed(2) }} <span class="text-sm font-normal text-gray-500">/ noite</span>
        </p>
        <div class="mt-4 text-xs text-gray-500">
          Disponibilidade: {{ hotel.availableRooms }} quartos
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '~/server/data/hotels'; // Importa a interface Hotel

// Define as props que este componente espera receber
const props = defineProps<{
  hotel: Hotel;
}>();

// Função para lidar com erros de carregamento de imagem, usando o fallback
const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = 'https://picsum.photos/400/200?grayscale&blur=2'; // Fallback mais robusto
  (event.target as HTMLImageElement).onerror = null; // Evita loop infinito
};
</script>

<style scoped>
/* Estilos específicos para o card do hotel, se necessário */
</style>