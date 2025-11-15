<template>
  <div class="flex flex-col items-center justify-center h-full p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Bem-vindo ao Hotel Booking Challenge!</h1>

    <div class="space-y-4 max-w-sm w-full">
      <BaseInput
        v-model="testInputValue"
        label="Nome de Usuário"
        placeholder="Digite seu nome"
        required
      />
      <BaseButton @click="handleClick" variant="primary">
        Buscar Hotéis
      </BaseButton>
      <BaseButton @click="handleClick" variant="secondary">
        Ver Detalhes
      </BaseButton>
      <BaseButton @click="handleClick" variant="danger" disabled>
        Excluir (Desabilitado)
      </BaseButton>
      <BaseButton @click="handleClick" variant="outline">
        Outras Opções
      </BaseButton>
    </div>

    <p class="mt-4 text-gray-600">Valor do Input: {{ testInputValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const testInputValue = ref<string>('');

const handleClick = () => {
  alert(`Botão clicado! Valor do input: ${testInputValue.value}`);
};


</script>

<style scoped>
</style>