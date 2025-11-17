// types/booking.d.ts
export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  hotelName: string;
  hotelLocation: string;
  imageUrl: string;
  checkInDate: string; 
  checkOutDate: string; 
  guests: number;
  bookingDate: string; 
  totalPrice: number;
}