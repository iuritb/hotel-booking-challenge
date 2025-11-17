<template>
  <div class="container mx-auto p-4 md:p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Comparar Hotéis</h1>

    <div v-if="compareStore.getComparisonCount === 0" class="text-center py-10">
      <p class="text-gray-600 text-lg">Nenhum hotel selecionado para comparação.</p>
      <NuxtLink to="/" class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
        Voltar para a lista de hotéis
      </NuxtLink>
    </div>
    <div v-else>
      <HotelComparisonTable
        :hotels="compareStore.getHotelsToCompare"
        @remove-hotel="handleRemoveHotel"
      />
      <div class="mt-6 text-center">
        <button
          @click="compareStore.clearComparison()"
          class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Limpar Todos os Hotéis
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCompareStore } from '~/stores/compare'; 
import HotelComparisonTable from '~/components/HotelComparisonTable.vue';


const compareStore = useCompareStore();


onMounted(() => {
  compareStore.loadComparisonFromLocalStorage();
});


const handleRemoveHotel = (hotelId: string) => {
  compareStore.removeHotelFromCompare(hotelId);
};


definePageMeta({
  layout: 'default',
});


useHead({
  title: 'Comparar Hotéis - Meu App de Reservas',
});
</script>

<style scoped>

</style>