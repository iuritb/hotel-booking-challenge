<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Hotel Booking` : 'Hotel Booking Challenge';
  },
  meta: [
    { name: 'description', content: 'Desafio técnico de reserva de hotéis com Nuxt 3' }
  ],
});

defineNuxtRouteMiddleware('auth');

</script>

<style>
html, body, #__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>