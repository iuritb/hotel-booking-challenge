<template>
  <div v-if="compareStore.getComparisonCount >= 2" class="fixed bottom-6 right-6 z-50">
    <NuxtLink to="/compare" class="flex items-center justify-center p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 ease-in-out cursor-pointer group">
      <Icon name="ic:round-compare-arrows" class="h-6 w-6 mr-2 transition-transform duration-200 group-hover:scale-110" />
      <span class="font-semibold text-lg">
        {{ compareStore.getComparisonCount }} Hotéis para Comparar
      </span>
      <Icon name="ic:round-arrow-forward" class="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useCompareStore } from '~/stores/compare';

const compareStore = useCompareStore();

onMounted(() => {
  compareStore.loadComparisonFromLocalStorage();
});
</script>

<style scoped>

</style>