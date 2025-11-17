// stores/compare.ts
import { defineStore } from 'pinia';
import type { Hotel } from '~/types/hotel';

interface CompareState {
  hotelsToCompare: Hotel[];
}

export const useCompareStore = defineStore('compare', {
  state: (): CompareState => ({
    hotelsToCompare: [],
  }),

  getters: {
    getHotelsToCompare: (state) => state.hotelsToCompare,
    isHotelInComparison: (state) => (hotelId: string) => {
      return state.hotelsToCompare.some(hotel => hotel.id === hotelId);
    },
    getComparisonCount: (state) => state.hotelsToCompare.length,
  },

  actions: {
    loadComparisonFromLocalStorage() {
      if (process.client) {
        const storedComparison = localStorage.getItem('hotelsToCompare');
        if (storedComparison) {
          try {
            this.hotelsToCompare = JSON.parse(storedComparison);
          } catch (e) {
            console.error('Erro ao parsear dados do localStorage para comparação:', e);
            this.hotelsToCompare = [];
          }
        }
      }
    },

    saveComparisonToLocalStorage() {
      if (process.client) {
        localStorage.setItem('hotelsToCompare', JSON.stringify(this.hotelsToCompare));
      }
    },

    addHotelToCompare(hotel: Hotel) {
      if (!this.isHotelInComparison(hotel.id)) {
        if (this.hotelsToCompare.length >= 5) {
          console.warn('Limite de 5 hotéis para comparação atingido. Não foi possível adicionar.'); 
          return;
        }
        this.hotelsToCompare.push(hotel);
        this.saveComparisonToLocalStorage();
      }
    },

    removeHotelFromCompare(hotelId: string) {
      this.hotelsToCompare = this.hotelsToCompare.filter(hotel => hotel.id !== hotelId);
      this.saveComparisonToLocalStorage();
    },

    clearComparison() {
      this.hotelsToCompare = [];
      this.saveComparisonToLocalStorage();
    }
  },
});