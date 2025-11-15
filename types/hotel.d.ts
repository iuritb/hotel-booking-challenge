// types/hotel.d.ts
export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  pricePerNight: number;
  rating: number; // 1.0 to 5.0
  reviewsCount: number;
  amenities: string[];
  availableRooms: number;
}