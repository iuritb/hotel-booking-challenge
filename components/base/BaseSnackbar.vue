<!-- components/BaseSnackbar.vue -->
<template>
  <Transition name="fade">
    <div
      v-if="snackbarStore.isVisible"
      :class="['fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-[9999]', snackbarTypeClass]"
      role="alert"
    >
      <div class="flex items-center">
        <Icon v-if="snackbarStore.type === 'success'" name="ic:round-check-circle" class="h-6 w-6 mr-2" />
        <Icon v-else-if="snackbarStore.type === 'error'" name="ic:round-error" class="h-6 w-6 mr-2" />
        <Icon v-else-if="snackbarStore.type === 'info'" name="ic:round-info" class="h-6 w-6 mr-2" />
        <span class="font-medium">{{ snackbarStore.message }}</span>
        <button @click="snackbarStore.hideSnackbar()" class="ml-auto p-1 -mr-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          <Icon name="ic:round-close" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSnackbarStore } from '~/stores/snackbar';

const snackbarStore = useSnackbarStore();

const snackbarTypeClass = computed(() => {
  switch (snackbarStore.type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'info':
      return 'bg-blue-500';
    default:
      return 'bg-gray-700'; // Cor padrão
  }
});
</script>

<style scoped>
/* Transição para o efeito de fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>