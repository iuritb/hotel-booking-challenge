import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { m as mockHotels } from '../../_/hotels.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

let nextBookingId = 1;
const bookings_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { hotelId, checkInDate, checkOutDate, guests, userId } = body;
  if (!hotelId || !checkInDate || !checkOutDate || !guests || !userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos obrigat\xF3rios faltando: hotelId, checkInDate, checkOutDate, guests, userId."
    });
  }
  const hotel = mockHotels.find((h) => h.id === hotelId);
  if (!hotel) {
    throw createError({
      statusCode: 404,
      statusMessage: `Hotel com ID ${hotelId} n\xE3o encontrado.`
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1e3 * 60 * 60 * 24));
  if (diffDays <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "A data de check-out deve ser posterior \xE0 data de check-in."
    });
  }
  const totalPrice = guests * hotel.pricePerNight * diffDays;
  const newBooking = {
    id: `booking-${nextBookingId++}`,
    hotelId,
    hotelName: hotel.name,
    hotelLocation: hotel.location,
    imageUrl: hotel.imageUrl,
    checkInDate,
    checkOutDate,
    guests,
    userId,
    bookingDate: (/* @__PURE__ */ new Date()).toISOString(),
    totalPrice: parseFloat(totalPrice.toFixed(2))
  };
  const hotelIndex = mockHotels.findIndex((h) => h.id === hotelId);
  if (hotelIndex !== -1) {
    if (mockHotels[hotelIndex].availableRooms > 0) {
      mockHotels[hotelIndex].availableRooms--;
    } else {
      throw createError({
        statusCode: 409,
        statusMessage: "N\xE3o h\xE1 quartos dispon\xEDveis para este hotel nas datas selecionadas."
      });
    }
  }
  return {
    message: "Reserva criada com sucesso!",
    booking: newBooking
  };
});

export { bookings_post as default };
//# sourceMappingURL=bookings.post.mjs.map
