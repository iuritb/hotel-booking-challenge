// server/api/hotels.get.ts
import { defineEventHandler, getQuery } from 'h3';
import { mockHotels, Hotel } from '../data/hotels';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const location = query.location as string | undefined;
  const minPrice = query.minPrice ? parseFloat(query.minPrice as string) : undefined;
  const maxPrice = query.maxPrice ? parseFloat(query.maxPrice as string) : undefined;
  const minRating = query.minRating ? parseFloat(query.minRating as string) : undefined;
  const sortBy = query.sortBy as 'pricePerNight' | 'rating' | undefined; // Propriedade para ordenar
  const sortOrder = query.sortOrder as 'asc' | 'desc' | undefined; // Ordem (ascendente/descendente)

  let filteredHotels: Hotel[] = [...mockHotels]; // Cópia para não modificar o array original

  // 1. Filtragem
  if (location) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (minPrice !== undefined) {
    filteredHotels = filteredHotels.filter(hotel => hotel.pricePerNight >= minPrice);
  }

  if (maxPrice !== undefined) {
    filteredHotels = filteredHotels.filter(hotel => hotel.pricePerNight <= maxPrice);
  }

  if (minRating !== undefined) {
    filteredHotels = filteredHotels.filter(hotel => hotel.rating >= minRating);
  }

  // 2. Ordenação
  if (sortBy) {
    filteredHotels.sort((a, b) => {
      let valA: number;
      let valB: number;

      if (sortBy === 'pricePerNight') {
        valA = a.pricePerNight;
        valB = b.pricePerNight;
      } else if (sortBy === 'rating') {
        valA = a.rating;
        valB = b.rating;
      } else {
        return 0; // Não faz nada se sortBy for inválido
      }

      if (sortOrder === 'desc') {
        return valB - valA; // Maior para menor
      }
      return valA - valB; // Menor para maior (padrão ou 'asc')
    });
  }

  // Em um cenário real, você adicionaria paginação, etc.
  return {
    hotels: filteredHotels,
    count: filteredHotels.length,
  };
});