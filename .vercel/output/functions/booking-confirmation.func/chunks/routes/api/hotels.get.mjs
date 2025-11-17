import { d as defineEventHandler, g as getQuery } from '../../_/nitro.mjs';
import { m as mockHotels } from '../../_/hotels.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const hotels_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const location = query.location;
  const minPrice = query.minPrice ? parseFloat(query.minPrice) : void 0;
  const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : void 0;
  const minRating = query.minRating ? parseFloat(query.minRating) : void 0;
  const sortBy = query.sortBy;
  const sortOrder = query.sortOrder;
  let filteredHotels = [...mockHotels];
  if (location) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (minPrice !== void 0) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.pricePerNight >= minPrice);
  }
  if (maxPrice !== void 0) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.pricePerNight <= maxPrice);
  }
  if (minRating !== void 0) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= minRating);
  }
  if (sortBy) {
    filteredHotels.sort((a, b) => {
      let valA;
      let valB;
      if (sortBy === "pricePerNight") {
        valA = a.pricePerNight;
        valB = b.pricePerNight;
      } else if (sortBy === "rating") {
        valA = a.rating;
        valB = b.rating;
      } else {
        return 0;
      }
      if (sortOrder === "desc") {
        return valB - valA;
      }
      return valA - valB;
    });
  }
  return {
    hotels: filteredHotels,
    count: filteredHotels.length
  };
});

export { hotels_get as default };
//# sourceMappingURL=hotels.get.mjs.map
