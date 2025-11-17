<!-- components/HotelComparisonTable.vue -->
<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow-md p-4">
    <h2 v-if="hotels.length === 0" class="text-center text-gray-600 text-lg py-8">
      Nenhum hotel selecionado para comparação.
    </h2>
    <table v-else class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Característica
          </th>
          <th v-for="hotel in hotels" :key="hotel.id" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ hotel.name }}
            <NuxtLink :to="`/hotels/${hotel.id}`" class="text-indigo-600 hover:text-indigo-900 ml-2">
              <Icon name="ic:round-info" class="h-4 w-4 inline-block align-text-bottom" />
            </NuxtLink>
            
            <button @click="$emit('remove-hotel', hotel.id)" class="text-red-600 hover:text-red-900 ml-2">
              <Icon name="ic:round-close" class="h-4 w-4 inline-block align-text-bottom" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Imagem</td>
          <td v-for="hotel in hotels" :key="hotel.id + '-image'" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <img :src="hotel.imageUrl" :alt="hotel.name" class="h-24 w-auto object-cover rounded-md" />
          </td>
        </tr>
        
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Localização</td>
          <td v-for="hotel in hotels" :key="hotel.id + '-location'" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ hotel.location }}
          </td>
        </tr>
        
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Avaliação</td>
          <td v-for="hotel in hotels" :key="hotel.id + '-rating'" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div class="flex items-center text-yellow-500">
              <template v-for="n in 5" :key="n">
                <Icon v-if="n <= Math.floor(hotel.rating)" name="ic:round-star" />
                <Icon v-else-if="n - 0.5 === hotel.rating" name="ic:round-star-half" class="h-5 w-5" />
                <Icon v-else name="ic:round-star-border" class="h-5 w-5" />
              </template>
              <span class="ml-2">{{ hotel.rating?.toFixed(1) || 'N/A' }}</span>
            </div>
          </td>
        </tr>
        
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Preço / Noite</td>
          <td v-for="hotel in hotels" :key="hotel.id + '-price'" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            R$ {{ hotel.pricePerNight?.toFixed(2) || '0.00' }}
          </td>
        </tr>
        
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Quartos Disponíveis</td>
          <td v-for="hotel in hotels" :key="hotel.id + '-rooms'" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ hotel.availableRooms }}
          </td>
        </tr>
        
        <tr>
          <td class="px-6 py-4 text-sm font-medium text-gray-900 align-top">Comodidades</td>
          <td v-for="hotel in hotels" :key="hotel.id + '-amenities'" class="px-6 py-4 text-sm text-gray-500">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="amenity in hotel.amenities" :key="amenity">{{ amenity }}</li>
            </ul>
          </td>
        </tr>
        
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '~/types/hotel'; 

interface Props {
  hotels: Hotel[];
}

const props = defineProps<Props>();

defineEmits(['remove-hotel']);
</script>

<style scoped>

</style>