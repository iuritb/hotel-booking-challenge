// types/booking.d.ts
export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  hotelName: string;
  hotelLocation: string;
  imageUrl: string;
  checkInDate: string; // Formato YYYY-MM-DD
  checkOutDate: string; // Formato YYYY-MM-DD
  guests: number;
  bookingDate: string; // Data da criação da reserva (ISO string)
  totalPrice: number;
}