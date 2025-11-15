<template>
  <div class="p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">
      Encontre o hotel perfeito!
    </h1>
    <p v-if="authStore.isAuthenticated" class="text-lg text-gray-700 mb-8">
      Bem-vindo de volta,
      <span class="font-semibold">{{
        authStore.currentUser?.name || "Usuário"
      }}</span
      >! Vamos encontrar sua próxima estadia?
    </p>
    <p v-else class="text-lg text-gray-700 mb-8">
      Faça login ou cadastre-se para aproveitar todas as nossas funcionalidades
      de reserva!
    </p>

    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        Buscar e Filtrar Hotéis
      </h2>
      <form
        @submit.prevent="searchHotels"
        class="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
      >
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
            id="min-price"
            v-model.number="searchCriteria.minPrice"
            label="Preço Mín."
            type="number"
            min="0"
            step="10"
          />
        </div>
        <div>
          <BaseInput
            id="max-price"
            v-model.number="searchCriteria.maxPrice"
            label="Preço Máx."
            type="number"
            min="0"
            step="10"
          />
        </div>
        <div>
          <BaseInput
            id="min-rating"
            v-model.number="searchCriteria.minRating"
            label="Avaliação Mín."
            type="number"
            min="1"
            max="5"
            step="0.1"
          />
        </div>
        <div class="md:col-span-1">
          <BaseButton type="submit" variant="primary" class="w-full">
            Buscar
          </BaseButton>
        </div>

        <div class="md:col-span-3 mt-4">
          <label
            for="sort-by"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Ordenar por</label
          >
          <select
            id="sort-by"
            v-model="searchCriteria.sortBy"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Nenhum</option>
            <option value="pricePerNight">Preço</option>
            <option value="rating">Avaliação</option>
          </select>
        </div>
        <div class="md:col-span-3 mt-4">
          <label
            for="sort-order"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Ordem</label
          >
          <select
            id="sort-order"
            v-model="searchCriteria.sortOrder"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>

        <div class="md:col-span-2 hidden">
          <BaseInput
            id="check-in-date"
            v-model="searchCriteria.checkInDate"
            label="Check-in"
            type="date"
          />
        </div>
        <div class="md:col-span-2 hidden">
          <BaseInput
            id="check-out-date"
            v-model="searchCriteria.checkOutDate"
            label="Check-out"
            type="date"
          />
        </div>
        <div class="md:col-span-2 hidden">
          <BaseInput
            id="guests"
            v-model.number="searchCriteria.guests"
            label="Hóspedes"
            type="number"
            min="1"
          />
        </div>
      </form>
    </div>

    <div v-if="pending" class="text-center text-lg text-gray-600">
      Carregando hotéis...
    </div>
    <div v-else-if="error" class="text-center text-red-600 text-lg">
      Erro ao carregar hotéis: {{ error.message || "Verifique sua conexão." }}
    </div>
    <div
      v-else-if="!hotels || hotels.length === 0"
      class="text-center text-gray-600 text-lg"
    >
      Nenhum hotel encontrado para sua pesquisa.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { Hotel } from '~/types/hotel'; 

const authStore = useAuthStore();

const searchCriteria = ref({
  location: "",
  minPrice: null as number | null, 
  maxPrice: null as number | null, 
  minRating: null as number | null, 
  sortBy: "" as "pricePerNight" | "rating" | "", 
  sortOrder: "asc" as "asc" | "desc", 
  checkInDate: "",
  checkOutDate: "",
  guests: 1,
});

const { data, pending, error, refresh } = await useFetch("/api/hotels", {
  query: computed(() => ({
    location: searchCriteria.value.location || undefined,
    minPrice: searchCriteria.value.minPrice || undefined, 
    maxPrice: searchCriteria.value.maxPrice || undefined, 
    minRating: searchCriteria.value.minRating || undefined, 
    sortBy: searchCriteria.value.sortBy || undefined,
    sortOrder: searchCriteria.value.sortBy
      ? searchCriteria.value.sortOrder
      : undefined, 
  })),
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

  searchCriteria.value.checkInDate = today.toISOString().split("T")[0];
  searchCriteria.value.checkOutDate = tomorrow.toISOString().split("T")[0];
});

watch(
  () => searchCriteria.value.sortBy,
  () => {
    if (searchCriteria.value.sortBy) {
      refresh();
    }
  }
);
watch(
  () => searchCriteria.value.sortOrder,
  () => {
    refresh();
  }
);
</script>

<style scoped>
</style>