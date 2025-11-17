<!-- components/sHotelCard.vue -->
<template>
  <NuxtLink :to="`/hotels/${hotel.id}`" class="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <img :src="hotel.imageUrl" :alt="hotel.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ hotel.name }}</h3>
      <p class="text-gray-600 text-sm mb-2">{{ hotel.location }}</p>
      <div class="flex items-center mb-2">
        <div class="flex text-yellow-500">
          <template v-for="n in 5" :key="n">
            <Icon v-if="n <= Math.floor(hotel.rating)" name="ic:round-star" />
            <Icon v-else-if="n - 0.5 === hotel.rating" name="ic:round-star-half" class="h-5 w-5" />
            <Icon v-else name="ic:round-star-border" class="h-5 w-5" />
          </template>
        </div>
        <span class="ml-2 text-gray-700 text-sm">{{ hotel.rating?.toFixed(1) || 'N/A' }} ({{ hotel.reviewsCount }} avaliações)</span>
      </div>
      <p class="text-gray-900 text-lg font-bold mb-4">R$ {{ hotel.pricePerNight?.toFixed(2) || '0.00' }} / noite</p>

      <button
        @click.prevent="toggleCompare"
        :class="[
            'w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
            isCompared ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        ]"
      >
        <template v-if="isCompared">
            <Icon name="ic:round-check" class="inline-block align-middle mr-1" /> Na Comparação
        </template>
        <template v-else>
            <Icon name="ic:round-add" class="inline-block align-middle mr-1" /> Adicionar à Comparação
        </template>
      </button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Hotel } from '~/types/hotel';
import { useCompareStore } from '~/stores/compare';

interface Props {
  hotel: Hotel;
}

const props = defineProps<Props>();

const compareStore = useCompareStore();

onMounted(() => {
  compareStore.loadComparisonFromLocalStorage();
});


const isCompared = computed(() => {
  return compareStore.isHotelInComparison(props.hotel.id);
});


const toggleCompare = () => {
  if (isCompared.value) {
    compareStore.removeHotelFromCompare(props.hotel.id);
  } else {
    compareStore.addHotelToCompare(props.hotel);
  }
};
</script>

<style scoped>

</style>