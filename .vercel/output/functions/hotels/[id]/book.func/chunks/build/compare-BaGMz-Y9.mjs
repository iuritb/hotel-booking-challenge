import { p as pinia_prodExports } from './server.mjs';

const useCompareStore = pinia_prodExports.defineStore("compare", {
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
          console.warn("Limite de 5 hotéis para comparação atingido. Não foi possível adicionar.");
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
//# sourceMappingURL=compare-BaGMz-Y9.mjs.map
