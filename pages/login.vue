<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-6">Fazer Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <BaseInput
            id="email-login"
            v-model="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            required
            class="w-full"
          />
        </div>
        <div class="mb-6">
          <BaseInput
            id="password-login"
            v-model="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            required
            class="w-full"
          />
        </div>
        <BaseButton type="submit" variant="primary" class="w-full" :disabled="isLoading">
          <span v-if="isLoading">Entrando...</span>
          <span v-else>Entrar</span>
        </BaseButton>
        <p v-if="errorMessage" class="text-red-600 text-sm text-center mt-4">{{ errorMessage }}</p>
        <p class="text-center text-gray-600 text-sm mt-4">
          Não tem uma conta?
          <NuxtLink to="/register" class="text-blue-600 hover:underline">Registre-se aqui.</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = ''; 

  try {
    const result = await authStore.userLogin(email.value, password.value);

    if (result.success) {
      router.push('/'); 
    } else {
      errorMessage.value = result.message || 'Falha no login. Verifique suas credenciais.';
      console.log('Login falhou. Mensagem de erro para exibir:', errorMessage.value); 
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Ocorreu um erro inesperado durante o login.';
    console.error('Erro de login:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
</style>