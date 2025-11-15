// server/api/hotels.get.ts
import { defineEventHandler, getQuery } from 'h3';
import { mockHotels, Hotel } from '../data/hotels';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const location = query.location as string | undefined;

  let filteredHotels: Hotel[] = mockHotels;

  if (location) {
    filteredHotels = mockHotels.filter(hotel =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }


  return {
    hotels: filteredHotels,
    count: filteredHotels.length,
  };
});