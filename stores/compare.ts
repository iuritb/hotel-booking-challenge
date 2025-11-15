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

    // AÇÃO ATUALIZADA AQUI: Limite agora é 5 hotéis
    addHotelToCompare(hotel: Hotel) {
      if (!this.isHotelInComparison(hotel.id)) {
        // Limita a 5 hotéis para comparação
        if (this.hotelsToCompare.length >= 5) { // <--- MUDANÇA: de 4 para 5
          console.warn('Limite de 5 hotéis para comparação atingido. Não foi possível adicionar.'); // <--- MUDANÇA na mensagem
          // Opcional: Aqui você pode adicionar uma lógica para notificar o usuário na UI
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