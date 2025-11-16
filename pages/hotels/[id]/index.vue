<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <p class="text-gray-600">Carregando detalhes do hotel...</p>
  </div>
  <div v-else-if="error" class="min-h-screen flex items-center justify-center">
    <p class="text-red-500">Erro ao carregar os detalhes do hotel: {{ error.message }}</p>
  </div>
  <div v-else-if="hotel" class="container mx-auto p-4 md:p-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="relative h-64 md:h-96">
        <img :src="hotel.imageUrl" :alt="hotel.name" class="w-full h-full object-cover"/>
        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 md:p-6">
          <h1 class="text-white text-3xl md:text-5xl font-bold">{{ hotel.name }}</h1>
        </div>
      </div>

      <div class="p-4 md:p-6 lg:flex lg:space-x-8">
        <div class="lg:w-2/3">
          <p class="text-gray-600 mb-4 text-lg">{{ hotel.location }}</p>
          <div class="flex items-center text-yellow-500 mb-4">
            <template v-for="n in 5" :key="n">
              <Icon v-if="n <= Math.floor(hotel.rating)" name="ic:round-star"/>
              <Icon v-else-if="n - 0.5 === hotel.rating" name="ic:round-star-half" class="h-5 w-5"/>
              <Icon v-else name="ic:round-star-border" class="h-5 w-5"/>
            </template>
            <span class="ml-2 text-gray-700 text-sm">
              {{ hotel.rating?.toFixed(1) || 'N/A' }} ({{ hotel.reviewsCount }} avaliações)
            </span>
          </div>

          <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Descrição</h2>
          <p class="text-gray-700 leading-relaxed mb-6">{{ hotel.description }}</p>

          <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Comodidades</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
            <li v-for="amenity in hotel.amenities" :key="amenity" class="flex items-center text-gray-700">
              <Icon name="ic:check" class="text-green-500 mr-2"/> {{ amenity }}
            </li>
          </ul>

          <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Disponibilidade e Preço</h2>
          <p class="text-gray-700 mb-4">Quartos disponíveis: <span class="font-bold">{{ hotel.availableRooms }}</span></p>
          <p class="text-3xl font-bold text-indigo-600 mb-6">R$ {{ hotel.pricePerNight?.toFixed(2) || '0.00' }} <span class="text-lg text-gray-500">/ noite</span></p>
        </div>

        <!-- Este bloco agora é apenas um gatilho para a página de reserva -->
        <div class="lg:w-1/3 bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner mt-8 lg:mt-0">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Reservar este Hotel</h2>
          <p class="text-gray-700 mb-6">
            Para prosseguir com a reserva de {{ hotel.name }}, clique no botão abaixo.
            Você será direcionado para um formulário de reserva detalhado.
          </p>

          <BaseButton
              v-if="authStore.isAuthenticated"
              @click="navigateToBookingPage"
              variant="primary"
              class="w-full"
              :disabled="hotel.availableRooms === 0"
          >
            <span v-if="hotel.availableRooms === 0">Esgotado</span>
            <span v-else>Reservar Agora</span>
          </BaseButton>
          <div v-else class="text-center text-gray-700">
            <p class="mb-2">Você precisa estar logado para fazer uma reserva.</p>
            <NuxtLink to="/login" class="text-indigo-600 hover:underline font-medium">
              Fazer Login
            </NuxtLink>
            ou
            <NuxtLink to="/register" class="text-indigo-600 hover:underline font-medium">
              Registrar
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <p class="text-gray-600">Hotel não encontrado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import type { Hotel } from '~/types/hotel';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const hotelId = route.params.id as string;

// Removemos todas as refs relacionadas ao formulário de reserva (checkInDate, checkOutDate, guests, etc.)
// e a lógica Zod e de snackbar daqui.

const { data: response, pending, error } = await useFetch<{ hotel: Hotel }>(`/api/hotels/${hotelId}`);

const hotel = computed(() => response.value?.hotel);

const navigateToBookingPage = () => {
  if (hotel.value) {
    router.push(`/hotels/${hotel.value.id}/book`);
  }
};

if (!hotel.value && !pending.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Hotel não encontrado', fatal: true });
}
</script>

<style scoped>
/* Estilos específicos para a página de detalhes do hotel */
</style>