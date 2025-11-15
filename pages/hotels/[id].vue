<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <div v-if="pending" class="text-center text-xl text-gray-600">
      Carregando detalhes do hotel...
    </div>
    <div v-else-if="error" class="text-center text-red-600 text-xl">
      Erro ao carregar os detalhes do hotel: {{ error.message || 'Hotel não encontrado ou erro de conexão.' }}
    </div>
    <div v-else-if="hotel" class="bg-white rounded-lg shadow-xl overflow-hidden">
      <!-- Imagem do Hotel -->
      <img :src="hotel.imageUrl" :alt="hotel.name" class="w-full h-80 object-cover" @error="handleImageError">

      <div class="p-6">
        <!-- Título e Localização -->
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">{{ hotel.name }}</h1>
        <p class="text-xl text-gray-600 mb-4">{{ hotel.location }}</p>

        <!-- Rating e Avaliações -->
        <div class="flex items-center text-lg text-gray-700 mb-4">
          <span class="text-yellow-500 text-2xl mr-2">⭐</span>
          <span class="font-bold">{{ hotel.rating }}</span> ({{ hotel.reviewsCount }} avaliações)
          <span class="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
            {{ hotel.availableRooms }} Quartos Disponíveis
          </span>
        </div>

        <!-- Descrição -->
        <p class="text-gray-800 text-lg leading-relaxed mb-6">{{ hotel.description }}</p>

        <!-- Comodidades -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Comodidades</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
            <li v-for="amenity in hotel.amenities" :key="amenity" class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              {{ amenity }}
            </li>
          </ul>
        </div>

        <!-- Preço por Noite -->
        <div class="bg-blue-50 p-4 rounded-lg flex justify-between items-center mb-6">
          <span class="text-gray-800 text-2xl font-semibold">
            Preço: <span class="text-blue-600">R$ {{ hotel.pricePerNight.toFixed(2) }}</span> / noite
          </span>
          <BaseButton variant="primary" size="lg">Reservar Agora</BaseButton>
        </div>

        <!-- Formulário de Reserva Simplificado (Mock) -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Fazer uma Reserva</h2>
          <form @submit.prevent="handleBooking" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <BaseInput
                id="check-in-date-booking"
                v-model="bookingDetails.checkInDate"
                label="Check-in"
                type="date"
                required
              />
            </div>
            <div>
              <BaseInput
                id="check-out-date-booking"
                v-model="bookingDetails.checkOutDate"
                label="Check-out"
                type="date"
                required
              />
            </div>
            <div>
              <BaseInput
                id="guests-booking"
                v-model.number="bookingDetails.guests"
                label="Hóspedes"
                type="number"
                min="1"
                required
              />
            </div>
            <div class="md:col-span-3 mt-4">
              <BaseButton type="submit" variant="primary" class="w-full">
                Confirmar Reserva
              </BaseButton>
            </div>
          </form>
          <p v-if="bookingMessage" :class="{ 'text-green-600': bookingSuccess, 'text-red-600': !bookingSuccess }" class="mt-4 text-center">
            {{ bookingMessage }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-xl text-gray-600">
      Hotel não encontrado. Verifique o ID.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Hotel } from '~/server/data/hotels'; 

const route = useRoute();
const hotelId = route.params.id;

const bookingDetails = ref({
  checkInDate: '',
  checkOutDate: '',
  guests: 1,
});

const bookingMessage = ref('');
const bookingSuccess = ref(false);

const { data, pending, error } = await useFetch(`/api/hotels/${hotelId}`, {
  transform: (response: any) => response.hotel as Hotel, 
});

const hotel = computed<Hotel | null>(() => data.value || null);

const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = 'https://picsum.photos/800/600?grayscale&blur=2'; 
  (event.target as HTMLImageElement).onerror = null;
};

const handleBooking = () => {
  if (!bookingDetails.value.checkInDate || !bookingDetails.value.checkOutDate || bookingDetails.value.guests < 1) {
    bookingMessage.value = 'Por favor, preencha todos os campos de reserva.';
    bookingSuccess.value = false;
    return;
  }

  bookingSuccess.value = true;
  bookingMessage.value = `Reserva para ${bookingDetails.value.guests} hóspedes de ${bookingDetails.value.checkInDate} a ${bookingDetails.value.checkOutDate} confirmada com sucesso para o hotel ${hotel.value?.name}!`;

  setTimeout(() => {
    bookingMessage.value = '';
  }, 5000);
};

onMounted(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  bookingDetails.value.checkInDate = today.toISOString().split('T')[0];
  bookingDetails.value.checkOutDate = tomorrow.toISOString().split('T')[0];
});

useHead({
  title: hotel.value ? `${hotel.value.name} - Detalhes do Hotel` : 'Detalhes do Hotel',
});
</script>

<style scoped>
</style>