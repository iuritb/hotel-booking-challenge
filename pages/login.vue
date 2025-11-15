<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-160px)] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça login na sua conta
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <BaseInput
            id="email-address"
            v-model="credentials.email"
            label="Endereço de E-mail"
            type="email"
            placeholder="seu@email.com"
            required
            class="mb-4"
            :error="authStore.error && authStore.error.includes('email') ? authStore.error : ''"
          />
          <BaseInput
            id="password"
            v-model="credentials.password"
            label="Senha"
            type="password"
            placeholder="********"
            required
            class="mt-4"
            :error="authStore.error && authStore.error.includes('credenciais') ? authStore.error : ''"
          />
        </div>

        <div v-if="authStore.error" class="text-red-600 text-sm text-center">
          {{ authStore.error }}
        </div>

        <div>
          <BaseButton type="submit" variant="primary" class="w-full" :disabled="authStore.loading">
            <span v-if="authStore.loading">Entrando...</span>
            <span v-else>Entrar</span>
          </BaseButton>
        </div>
      </form>
      <div class="text-sm text-center">
        Não tem uma conta?
        <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
          Cadastre-se
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth'; 

definePageMeta({
  layout: 'default',
});

const authStore = useAuthStore();
const credentials = ref({
  email: '',
  password: '',
});
const router = useRouter(); 

const handleLogin = async () => {
  const success = await authStore.login(credentials.value);
  if (success) {
    router.push('/');
  }
};
</script>

<style scoped>
</style>
