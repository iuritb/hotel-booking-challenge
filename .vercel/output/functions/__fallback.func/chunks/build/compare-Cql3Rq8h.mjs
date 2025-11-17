import { defineStore } from 'pinia';

const useCompareStore = defineStore("compare", {
  state: () => ({
    hotelsToCompare: []
  }),
  getters: {
    getHotelsToCompare: (state) => state.hotelsToCompare,
    isHotelInComparison: (state) => (hotelId) => {
      return state.hotelsToCompare.some((hotel) => hotel.id === hotelId);
    },
    getComparisonCount: (state) => state.hotelsToCompare.length
  },
  actions: {
    loadComparisonFromLocalStorage() {
    },
    saveComparisonToLocalStorage() {
    },
    addHotelToCompare(hotel) {
      if (!this.isHotelInComparison(hotel.id)) {
        if (this.hotelsToCompare.length >= 5) {
          console.warn("Limite de 5 hot\xE9is para compara\xE7\xE3o atingido. N\xE3o foi poss\xEDvel adicionar.");
          return;
        }
        this.hotelsToCompare.push(hotel);
        this.saveComparisonToLocalStorage();
      }
    },
    removeHotelFromCompare(hotelId) {
      this.hotelsToCompare = this.hotelsToCompare.filter((hotel) => hotel.id !== hotelId);
      this.saveComparisonToLocalStorage();
    },
    clearComparison() {
      this.hotelsToCompare = [];
      this.saveComparisonToLocalStorage();
    }
  }
});

export { useCompareStore as u };
//# sourceMappingURL=compare-Cql3Rq8h.mjs.map
