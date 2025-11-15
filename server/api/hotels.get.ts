// server/api/hotels.get.ts
import { defineEventHandler, getQuery } from 'h3';
import { mockHotels, Hotel } from '../data/hotels';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const location = query.location as string | undefined;
  const minPrice = query.minPrice ? parseFloat(query.minPrice as string) : undefined;
  const maxPrice = query.maxPrice ? parseFloat(query.maxPrice as string) : undefined;
  const minRating = query.minRating ? parseFloat(query.minRating as string) : undefined;
  const sortBy = query.sortBy as 'pricePerNight' | 'rating' | undefined; 
  const sortOrder = query.sortOrder as 'asc' | 'desc' | undefined; 

  let filteredHotels: Hotel[] = [...mockHotels]; 

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
        return 0; 
      }

      if (sortOrder === 'desc') {
        return valB - valA; 
      }
      return valA - valB; 
    });
  }

  return {
    hotels: filteredHotels,
    count: filteredHotels.length,
  };
});