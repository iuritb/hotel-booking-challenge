<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <p class="text-gray-600">Carregando detalhes do hotel...</p>
  </div>
  <div v-else-if="error" class="min-h-screen flex items-center justify-center">
    <p class="text-red-500">Erro ao carregar os detalhes do hotel: {{ error.message }}</p>
  </div>
  <div v-else-if="hotel" class="container mx-auto p-4 md:p-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="relative h-64 md:h-96">
        <img :src="hotel.imageUrl" :alt="hotel.name" class="w-full h-full object-cover"/>
        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 md:p-6">
          <h1 class="text-white text-3xl md:text-5xl font-bold">{{ hotel.name }}</h1>
        </div>
      </div>

      <div class="p-4 md:p-6 lg:flex lg:space-x-8">
        <div class="lg:w-2/3">
          <p class="text-gray-600 mb-4 text-lg">{{ hotel.location }}</p>
          <div class="flex items-center text-yellow-500 mb-4">
            <template v-for="n in 5" :key="n">
              <Icon v-if="n <= Math.floor(hotel.rating)" name="ic:round-star"/>
              <Icon v-else-if="n - 0.5 === hotel.rating" name="ic:round-star-half" class="h-5 w-5"/>
              <Icon v-else name="ic:round-star-border" class="h-5 w-5"/>
            </template>
            <span class="ml-2 text-gray-700 text-sm">
              {{ hotel.rating?.toFixed(1) || 'N/A' }} ({{ hotel.reviewsCount }} avaliações)
            </span>
          </div>

          <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Descrição</h2>
          <p class="text-gray-700 leading-relaxed mb-6">{{ hotel.description }}</p>

          <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Comodidades</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
            <li v-for="amenity in hotel.amenities" :key="amenity" class="flex items-center text-gray-700">
              <Icon name="ic:check" class="text-green-500 mr-2"/> {{ amenity }}
            </li>
          </ul>

          <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Disponibilidade e Preço</h2>
          <p class="text-gray-700 mb-4">Quartos disponíveis: <span class="font-bold">{{ hotel.availableRooms }}</span></p>
          <p class="text-3xl font-bold text-indigo-600 mb-6">R$ {{ hotel.pricePerNight?.toFixed(2) || '0.00' }} <span class="text-lg text-gray-500">/ noite</span></p>
        </div>

        <div class="lg:w-1/3 bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner mt-8 lg:mt-0">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Faça sua Reserva</h2>
          <div class="mb-4">
            <BaseInput
                id="checkInDate"
                v-model="checkInDate"
                label="Check-in"
                type="date"
                required
                class="w-full"
                :min="today"
            />
          </div>
          <div class="mb-4">
            <BaseInput
                id="checkOutDate"
                v-model="checkOutDate"
                label="Check-out"
                type="date"
                required
                class="w-full"
                :min="minCheckOutDate"
            />
          </div>
          <div class="mb-6">
            <BaseInput
                id="guests"
                v-model.number="guests"
                label="Número de Hóspedes"
                type="number"
                min="1"
                required
                class="w-full"
            />
          </div>
          <p v-if="bookingMessage" :class="bookingSuccess ? 'text-green-600' : 'text-red-600'" class="mb-4 text-center">
            {{ bookingMessage }}
          </p>
          <BaseButton
              v-if="authStore.isAuthenticated"
              @click="handleBooking"
              variant="primary"
              class="w-full"
              :disabled="isBooking || hotel.availableRooms === 0"
          >
            <span v-if="isBooking">Reservando...</span>
            <span v-else-if="hotel.availableRooms === 0">Esgotado</span>
            <span v-else>Reservar Agora</span>
          </BaseButton>
          <div v-else class="text-center text-gray-700">
            <p class="mb-2">Você precisa estar logado para fazer uma reserva.</p>
            <NuxtLink to="/login" class="text-indigo-600 hover:underline font-medium">
              Fazer Login
            </NuxtLink>
            ou
            <NuxtLink to="/register" class="text-indigo-600 hover:underline font-medium">
              Registrar
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <p class="text-gray-600">Hotel não encontrado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import type { Hotel } from '~/types/hotel';
import type { Booking } from '~/types/booking';

const route = useRoute();
const authStore = useAuthStore();
const hotelId = route.params.id as string;

const today = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');
const guests = ref(1);

const isBooking = ref(false);
const bookingMessage = ref('');
const bookingSuccess = ref(false);


const minCheckOutDate = computed(() => {
  if (checkInDate.value) {
    const d = new Date(checkInDate.value);
    d.setDate(d.getDate() + 1); 
    return d.toISOString().split('T')[0];
  }
  return today.value; 
});

onMounted(() => {
  const d = new Date();
  today.value = d.toISOString().split('T')[0];
  checkInDate.value = today.value;

  const nextDay = new Date(d);
  nextDay.setDate(d.getDate() + 1);
  checkOutDate.value = nextDay.toISOString().split('T')[0];
});

watch(checkInDate, (newVal) => {
  if (newVal && checkOutDate.value && new Date(newVal) >= new Date(checkOutDate.value)) {
    const d = new Date(newVal);
    d.setDate(d.getDate() + 1);
    checkOutDate.value = d.toISOString().split('T')[0];
  }
});

const { data: response, pending, error } = await useFetch<{ hotel: Hotel }>(`/api/hotels/${hotelId}`);

const hotel = computed(() => response.value?.hotel);

console.log('--- Debug Hotel Details ---');
console.log('Hotel ID from route:', hotelId);
console.log('Pending status:', pending.value);
console.log('Error status:', error.value);
if (response.value) { 
  console.log('Fetched raw response object:', response.value);
}
if (hotel.value) { 
  console.log('Computed hotel object:', hotel.value);
  console.log('Hotel rating property:', hotel.value.rating);
  console.log('Hotel pricePerNight property:', hotel.value.pricePerNight);
  if (typeof hotel.value.rating !== 'number') {
    console.error('ERRO DETECTADO: hotel.value.rating NÃO é um número!', hotel.value.rating);
  }
  if (typeof hotel.value.pricePerNight !== 'number') {
    console.error('ERRO DETECTADO: hotel.value.pricePerNight NÃO é um número!', hotel.value.pricePerNight);
  }
} else {
  console.log('Computed hotel object is NULL or UNDEFINED.');
}
console.log('--- End Debug Hotel Details ---');


const handleBooking = async () => {
  if (!authStore.isAuthenticated || !authStore.currentUser) {
    bookingMessage.value = 'Você precisa estar logado para fazer uma reserva.';
    bookingSuccess.value = false;
    return;
  }

  if (!hotel.value) {
    bookingMessage.value = 'Erro: Hotel não encontrado.';
    bookingSuccess.value = false;
    return;
  }

  isBooking.value = true;
  bookingMessage.value = '';

  try {
    const apiResponse = await $fetch('/api/bookings', { 
      method: 'POST',
      body: {
        hotelId: hotel.value.id,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        guests: guests.value,
        userId: authStore.currentUser.id, 
      },
    });

    const booked = apiResponse.booking as Booking;
    authStore.addBooking(booked); 
    bookingMessage.value = apiResponse.message || 'Reserva realizada com sucesso!';
    bookingSuccess.value = true;

    
    if (hotel.value.availableRooms > 0) {
      hotel.value.availableRooms--;
    }

  } catch (err: any) {
    console.error('Erro ao fazer reserva:', err);
    bookingMessage.value = err.data?.statusMessage || 'Erro ao realizar a reserva.';
    bookingSuccess.value = false;
  } finally {
    isBooking.value = false;
  }
};


if (!hotel.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Hotel não encontrado', fatal: true });
}
</script>

<style scoped>
</style>