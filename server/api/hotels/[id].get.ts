// server/api/hotels/[id].get.ts
import { defineEventHandler } from 'h3';
import { mockHotels } from '../../data/hotels';

export default defineEventHandler(async (event) => {
  const hotelId = event.context.params?.id; 
  
  if (!hotelId) {
    event.res.statusCode = 400;
    return { message: 'ID do hotel não fornecido.' };
  }

  const hotel = mockHotels.find(h => h.id === hotelId);

  if (!hotel) {
    event.res.statusCode = 404;
    return { message: `Hotel com ID ${hotelId} não encontrado.` };
  }

  return { hotel };
});