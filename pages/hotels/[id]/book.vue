<!-- pages/hotels/[id]/book.vue -->
<template>
  <div class="container mx-auto p-4 md:p-8">
    <NuxtLink :to="`/hotels/${hotelId}`" class="text-indigo-600 hover:underline mb-6 inline-block">
      &larr; Voltar para os detalhes do hotel
    </NuxtLink>

    <div v-if="pending" class="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <p class="text-xl text-gray-700">Carregando detalhes do hotel...</p>
    </div>
    <div v-else-if="error" class="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <p class="text-red-500 text-lg">Erro ao carregar os detalhes do hotel: {{ error.message }}</p>
    </div>
    <div v-else-if="hotel" class="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Reservar {{ hotel.name }}</h1>
      <p class="text-lg text-gray-600 mb-6">Em {{ hotel.location }} por R$ {{ hotel.pricePerNight?.toFixed(2) }} / noite</p>

      <form @submit.prevent="submitBooking" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">Seus Dados</h2>
            <div class="mb-4">
              <BaseInput
                id="fullName"
                v-model="form.fullName"
                label="Nome Completo"
                type="text"
                required
                :error="errors.fullName"
              />
            </div>
            <div class="mb-4">
              <BaseInput
                id="email"
                v-model="form.email"
                label="Email"
                type="email"
                required
                :error="errors.email"
              />
            </div>
            <div class="mb-4">
              <BaseInput
                id="phone"
                v-model="form.phone"
                label="Telefone"
                type="tel"
                required
                :error="errors.phone"
              />
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">Período da Reserva</h2>
            <div class="mb-4">
              <BaseInput
                id="checkInDate"
                v-model="form.checkInDate"
                label="Data de Check-in"
                type="date"
                required
                :min="today"
                :error="errors.checkInDate"
              />
            </div>
            <div class="mb-4">
              <BaseInput
                id="checkOutDate"
                v-model="form.checkOutDate"
                label="Data de Check-out"
                type="date"
                required
                :min="minCheckOutDate"
                :error="errors.checkOutDate"
              />
            </div>
            <div class="mb-4">
              <BaseInput
                id="numberOfGuests"
                v-model.number="form.numberOfGuests"
                label="Número de Hóspedes"
                type="number"
                min="1"
                required
                :max="hotel.availableRooms"
                :error="errors.numberOfGuests"
              />
            </div>
          </div>
        </div>

        <hr class="my-8" />

        <div>
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Dados do Cartão de Crédito</h2>
          <p class="text-sm text-gray-500 mb-4">*Este é um sistema de reserva de demonstração. Não use dados de cartão de crédito reais.</p>
          <div class="mb-4">
            <BaseInput
              id="cardNumber"
              v-model="form.cardNumber"
              label="Número do Cartão"
              type="text"
              maxlength="19"
              required
              :error="errors.cardNumber"
            />
          </div>
          <div class="mb-4">
            <BaseInput
              id="cardHolderName"
              v-model="form.cardHolderName"
              label="Nome no Cartão"
              type="text"
              required
              :error="errors.cardHolderName"
            />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <BaseInput
                id="expiryDate"
                v-model="form.expiryDate"
                label="Data de Validade (MM/AA)"
                type="text"
                maxlength="5"
                placeholder="MM/AA"
                required
                :error="errors.expiryDate"
              />
            </div>
            <div>
              <BaseInput
                id="cvv"
                v-model="form.cvv"
                label="CVV"
                type="text"
                maxlength="4"
                required
                :error="errors.cvv"
              />
            </div>
          </div>
        </div>

        <div class="pt-5">
          <BaseButton
            type="submit"
            :disabled="submitting"
            variant="primary"
            class="w-full"
          >
            <span v-if="submitting">Enviando...</span>
            <span v-else>Confirmar Reserva</span>
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import type { Hotel } from '~/types/hotel';
import { useSnackbarStore } from '~/stores/snackbar';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const authStore = useAuthStore();
const hotelId = route.params.id as string;

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    snackbarStore.showSnackbar('Você precisa estar logado para fazer uma reserva.', 'info');
    router.push('/login');
    return;
  }

  const d = new Date();
  today.value = d.toISOString().split('T')[0];
  form.value.checkInDate = today.value;

  const nextDay = new Date(d);
  nextDay.setDate(d.getDate() + 1);
  form.value.checkOutDate = nextDay.toISOString().split('T')[0];

  await fetchHotel(); 

  console.log('--- onMounted: Hotel data after fetch ---');
  console.log('hotel.value:', hotel.value);
  if (hotel.value) {
    console.log('hotel.value.id:', hotel.value.id);
    console.log('hotel.value.name:', hotel.value.name);
  } else {
    console.warn('Hotel data is still null after fetchHotel. Check API response.');
  }
  console.log('authStore.currentUser?.id:', authStore.currentUser?.id);
  console.log('------------------------------------------');
});

const hotel = ref<Hotel | null>(null);
const pending = ref(true);
const error = ref<Error | null>(null);

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  checkInDate: '',
  checkOutDate: '',
  numberOfGuests: 1,
  cardNumber: '',
  cardHolderName: '',
  expiryDate: '', 
  cvv: '',
});

const today = ref(''); 

const minCheckOutDate = computed(() => {
  if (form.value.checkInDate) {
    const d = new Date(form.value.checkInDate);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }
  return today.value;
});

watch(() => form.value.checkInDate, (newVal) => {
  if (newVal && form.value.checkOutDate && new Date(newVal) >= new Date(form.value.checkOutDate)) {
    const d = new Date(newVal);
    d.setDate(d.getDate() + 1);
    form.value.checkOutDate = d.toISOString().split('T')[0];
  }
});

const submitting = ref(false);
const errors = ref<Record<string, string>>({});

const bookingSchema = computed(() => z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório e deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Email inválido.'),
  phone: z.string().min(10, 'Telefone inválido. Ex: (XX) XXXX-XXXX').regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Formato de telefone inválido.'),
  checkInDate: z.string().refine((val) => {
    const checkIn = new Date(val);
    const dateToday = new Date();
    checkIn.setHours(0, 0, 0, 0);
    dateToday.setHours(0, 0, 0, 0);
    return checkIn.getTime() >= dateToday.getTime();
  }, 'A data de check-in não pode ser no passado.'),
  checkOutDate: z.string().refine((val) => {
    if (!form.value.checkInDate) return false;
    return new Date(val) > new Date(form.value.checkInDate);
  }, 'A data de check-out deve ser posterior à data de check-in.'),
  numberOfGuests: z.number().min(1, 'Pelo menos um hóspede é necessário.').max(hotel.value?.availableRooms || 5, `Número máximo de hóspedes é ${hotel.value?.availableRooms || 5} (baseado em quartos disponíveis).`),
  cardNumber: z.string().length(19, 'Número do cartão deve ter 16 dígitos (contando espaços/hífens).').regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Formato de cartão inválido (XXXX XXXX XXXX XXXX).'),
  cardHolderName: z.string().min(3, 'Nome no cartão é obrigatório.'),
  expiryDate: z.string().length(5, 'Data de validade inválida (MM/AA).').regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato MM/AA inválido ou mês/ano inválido.').refine((val) => {
    const [month, year] = val.split('/').map(Number);
    const fullYear = 2000 + year; 
    const today = new Date();
    const currentMonth = today.getMonth() + 1; 
    const currentYear = today.getFullYear();
    return fullYear > currentYear || (fullYear === currentYear && month >= currentMonth);
  }, 'Cartão expirado.'),
  cvv: z.string().min(3, 'CVV deve ter 3 ou 4 dígitos.').max(4, 'CVV deve ter 3 ou 4 dígitos.').regex(/^\d+$/, 'CVV inválido.'),
}));

const fetchHotel = async () => {
  try {
    pending.value = true;
    const response = await $fetch<{ hotel: Hotel }>(`/api/hotels/${hotelId}`); 
    if (response && response.hotel && typeof response.hotel.id === 'string' && typeof response.hotel.name === 'string') {
      hotel.value = response.hotel;
    } else {
      throw new Error('Dados do hotel inválidos ou incompletos recebidos da API.');
    }
  } catch (err: any) {
    error.value = new Error(err.message || 'Falha ao carregar detalhes do hotel');
    console.error('Erro ao buscar detalhes do hotel:', err);
    snackbarStore.showSnackbar(error.value.message, 'error');
    router.replace('/');
  } finally {
    pending.value = false;
  }
};

watch(() => form.value.cardNumber, (newValue) => {
  let cleaned = newValue.replace(/\D/g, ''); 
  let formatted = '';
  for (let i = 0; i < cleaned.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' ';
    }
    formatted += cleaned[i];
  }
  form.value.cardNumber = formatted;
}, { immediate: true });

watch(() => form.value.expiryDate, (newValue) => {
  let cleaned = newValue.replace(/\D/g, '');
  if (cleaned.length > 2) {
    cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  }
  form.value.expiryDate = cleaned;
}, { immediate: true }); 

const submitBooking = async () => {
  errors.value = {}; 
  snackbarStore.hideSnackbar(); 

  console.log('--- submitBooking: Checking critical data ---');
  console.log('hotel.value:', hotel.value);
  console.log('hotel.value?.id:', hotel.value?.id);
  console.log('hotel.value?.name:', hotel.value?.name);
  console.log('authStore.currentUser?.id:', authStore.currentUser?.id);
  console.log('-------------------------------------------');

  if (!hotel.value || typeof hotel.value.id !== 'string' || typeof hotel.value.name !== 'string') {
    snackbarStore.showSnackbar('Erro interno: Dados do hotel ausentes ou inválidos. Recarregue a página.', 'error');
    console.error('Hotel data is invalid or missing before API call:', hotel.value);
    return;
  }
  if (!authStore.currentUser?.id || typeof authStore.currentUser.id !== 'string') {
    snackbarStore.showSnackbar('Erro: ID do usuário não encontrado. Tente relogar.', 'error');
    console.error('User ID is missing or invalid:', authStore.currentUser);
    return;
  }

  try {
    const validatedData = bookingSchema.value.parse(form.value);

    submitting.value = true;

    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(validatedData.checkInDate);
    const secondDate = new Date(validatedData.checkOutDate);
    const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
    const totalPrice = (hotel.value.pricePerNight || 0) * diffDays;

    const apiResponse = await $fetch('/api/bookings/create', {
      method: 'POST',
      body: {
        hotelId: hotel.value.id, 
        hotelName: hotel.value.name, 
        userId: authStore.currentUser.id,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        checkInDate: validatedData.checkInDate,
        checkOutDate: validatedData.checkOutDate,
        numberOfGuests: validatedData.numberOfGuests, 
        cardNumber: validatedData.cardNumber,
        cardHolderName: validatedData.cardHolderName,
        expiryDate: validatedData.expiryDate,
        cvv: validatedData.cvv,
        totalPrice: totalPrice,
      },
    });

    snackbarStore.showSnackbar(apiResponse.message || 'Reserva realizada com sucesso!', 'success');

    if (hotel.value.availableRooms > 0) {
      hotel.value.availableRooms--;
    }

    setTimeout(() => {
      router.push('/booking-confirmation');
    }, 2000);

  } catch (err: any) {
    submitting.value = false;
    if (err instanceof z.ZodError) {
      err.errors.forEach((e) => {
        if (e.path.length > 0) {
          errors.value[e.path[0]] = e.message;
        }
      });
      snackbarStore.showSnackbar('Por favor, corrija os erros no formulário.', 'error');
    } else {
      const errorMessage = err.data?.message || err.message || 'Erro ao processar a reserva. Tente novamente.';
      snackbarStore.showSnackbar(errorMessage, 'error');
      console.error('Erro na submissão da reserva:', err);
    }
  } finally {
    submitting.value = false;
  }
};

definePageMeta({
  layout: 'default',
});

useHead({
  title: computed(() => hotel.value ? `Reservar ${hotel.value.name} - Meu App de Reservas` : 'Reservar Hotel'),
});
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>