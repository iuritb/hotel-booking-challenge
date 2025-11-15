// server/api/bookings.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import { mockHotels } from '../data/hotels'; 
import type { Booking } from '~/types/booking'; 
import type { Hotel } from '~/types/hotel';

const mockBookings: Booking[] = [];
let nextBookingId = 1;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { hotelId, checkInDate, checkOutDate, guests, userId } = body;

 
  if (!hotelId || !checkInDate || !checkOutDate || !guests || !userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Campos obrigatórios faltando: hotelId, checkInDate, checkOutDate, guests, userId.',
    });
  }

  
  const hotel = mockHotels.find(h => h.id === hotelId);
  if (!hotel) {
    throw createError({
      statusCode: 404,
      statusMessage: `Hotel com ID ${hotelId} não encontrado.`,
    });
  }

 
  await new Promise(resolve => setTimeout(resolve, 500));

  
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) {
    throw createError({
        statusCode: 400,
        statusMessage: 'A data de check-out deve ser posterior à data de check-in.',
    });
  }

  const totalPrice = guests * hotel.pricePerNight * diffDays;

 
  const newBooking: Booking = {
    id: `booking-${nextBookingId++}`,
    hotelId,
    hotelName: hotel.name,
    hotelLocation: hotel.location,
    imageUrl: hotel.imageUrl,
    checkInDate,
    checkOutDate,
    guests,
    userId,
    bookingDate: new Date().toISOString(),
    totalPrice: parseFloat(totalPrice.toFixed(2)), 
  };

  
  const hotelIndex = mockHotels.findIndex(h => h.id === hotelId);
  if (hotelIndex !== -1) {
    if (mockHotels[hotelIndex].availableRooms > 0) {
      mockHotels[hotelIndex].availableRooms--;
    } else {
      throw createError({
        statusCode: 409, 
        statusMessage: 'Não há quartos disponíveis para este hotel nas datas selecionadas.',
      });
    }
  }

  mockBookings.push(newBooking); 

  return {
    message: 'Reserva criada com sucesso!',
    booking: newBooking,
  };
});