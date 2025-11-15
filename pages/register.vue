<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-160px)] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <BaseInput
            id="name"
            v-model="userData.name"
            label="Nome Completo"
            type="text"
            placeholder="Seu nome"
            required
            class="mb-4"
          />
          <BaseInput
            id="email-address"
            v-model="userData.email"
            label="Endereço de E-mail"
            type="email"
            placeholder="seu@email.com"
            required
            class="mb-4"
            :error="authStore.error && authStore.error.includes('Email') ? authStore.error : ''"
          />
          <BaseInput
            id="password"
            v-model="userData.password"
            label="Senha"
            type="password"
            placeholder="********"
            required
            class="mb-4"
            :error="authStore.error && authStore.error.includes('Senha') ? authStore.error : ''"
          />
          <BaseInput
            id="confirm-password"
            v-model="userData.confirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="********"
            required
            class="mt-4"
            :error="passwordMismatchError || (authStore.error && authStore.error.includes('Senha') ? authStore.error : '')"
          />
        </div>

        <div v-if="passwordMismatchError" class="text-red-600 text-sm text-center">
          {{ passwordMismatchError }}
        </div>
        <div v-if="authStore.error && !passwordMismatchError" class="text-red-600 text-sm text-center">
          {{ authStore.error }}
        </div>

        <div>
          <BaseButton type="submit" variant="primary" class="w-full" :disabled="authStore.loading || passwordMismatchError !== ''">
            <span v-if="authStore.loading">Registrando...</span>
            <span v-else>Registrar</span>
          </BaseButton>
        </div>
      </form>
      <div class="text-sm text-center">
        Já tem uma conta?
        <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          Faça login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'default',
});

const authStore = useAuthStore();
const userData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const router = useRouter();

const passwordMismatchError = computed(() => {
  if (userData.value.password && userData.value.confirmPassword && userData.value.password !== userData.value.confirmPassword) {
    return 'As senhas não coincidem.';
  }
  return '';
});

const handleRegister = async () => {
  if (passwordMismatchError.value) {
    return;
  }
  const success = await authStore.register(userData.value);
  if (success) {
    router.push('/');
  }
};
</script>

<style scoped>
</style>
