<template>
  <div class="p-4">
    <!-- Título da Página e Saudação -->
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Encontre o hotel perfeito!</h1>
    <p v-if="authStore.isAuthenticated" class="text-lg text-gray-700 mb-8">
      Bem-vindo de volta, <span class="font-semibold">{{ authStore.currentUser?.name || 'Usuário' }}</span>!
      Vamos encontrar sua próxima estadia?
    </p>
    <p v-else class="text-lg text-gray-700 mb-8">
      Faça login ou cadastre-se para aproveitar todas as nossas funcionalidades de reserva!
    </p>

    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Buscar Hotéis</h2>
      <form @submit.prevent="searchHotels" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div class="md:col-span-2">
          <BaseInput
            id="location-search"
            v-model="searchCriteria.location"
            label="Localização"
            placeholder="Ex: Rio de Janeiro, São Paulo..."
            type="text"
          />
        </div>
        <div>
          <BaseInput
            id="check-in-date"
            v-model="searchCriteria.checkInDate"
            label="Check-in"
            type="date"
          />
        </div>
        <div>
          <BaseInput
            id="check-out-date"
            v-model="searchCriteria.checkOutDate"
            label="Check-out"
            type="date"
          />
        </div>
        <div class="md:col-span-1">
          <BaseInput
            id="guests"
            v-model.number="searchCriteria.guests"
            label="Hóspedes"
            type="number"
            min="1"
          />
        </div>
        <div class="md:col-span-1">
          <BaseButton type="submit" variant="primary" class="w-full">
            Buscar
          </BaseButton>
        </div>
      </form>
    </div>

    <!-- Resultados da Pesquisa de Hotéis -->
    <div v-if="pending" class="text-center text-lg text-gray-600">
      Carregando hotéis...
    </div>
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      Erro ao carregar hotéis: {{ error.message || 'Verifique sua conexão.' }}
    </div>
    <div v-else-if="!hotels || hotels.length === 0" class="text-center text-gray-600 text-lg">
      Nenhum hotel encontrado para sua pesquisa.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="hotel in hotels" :key="hotel.id" class="bg-white rounded-lg shadow-md overflow-hidden">
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
              R$ {{ hotel.pricePerNight.toFixed(2) }} <span class="text-sm font-normal text-gray-500">/ noite</span>
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { Hotel } from '~/server/data/hotels';

const authStore = useAuthStore();

const searchCriteria = ref({
  location: '',
  checkInDate: '',
  checkOutDate: '',
  guests: 1,
});

const { data, pending, error, refresh } = await useFetch('/api/hotels', {
  query: {
    location: computed(() => searchCriteria.value.location || undefined)
  },
  transform: (response: any) => response.hotels as Hotel[],
});

const hotels = computed<Hotel[]>(() => data.value || []);

const searchHotels = () => {
  refresh();
};

onMounted(() => {
  authStore.initializeAuth();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  searchCriteria.value.checkInDate = today.toISOString().split('T')[0];
  searchCriteria.value.checkOutDate = tomorrow.toISOString().split('T')[0];
});

const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Imagem+Indisponivel';
  (event.target as HTMLImageElement).onerror = null;
};
</script>

<style scoped>
</style>