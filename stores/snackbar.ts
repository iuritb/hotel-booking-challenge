// stores/snackbar.ts
import { defineStore } from 'pinia';

interface SnackbarState {
  message: string;
  type: 'success' | 'error' | 'info' | '';
  isVisible: boolean;
  duration: number; // em milissegundos
  timeoutId: ReturnType<typeof setTimeout> | null;
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): SnackbarState => ({
    message: '',
    type: '',
    isVisible: false,
    duration: 3000, // Padrão 3 segundos
    timeoutId: null,
  }),
  actions: {
    showSnackbar(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
      // Limpa qualquer timeout anterior para evitar múltiplos snackbars ou sobreposições
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      this.message = message;
      this.type = type;
      this.duration = duration;
      this.isVisible = true;

      // Define um novo timeout para esconder o snackbar automaticamente
      this.timeoutId = setTimeout(() => {
        this.hideSnackbar();
      }, this.duration);
    },
    hideSnackbar() {
      this.isVisible = false;
      this.message = '';
      this.type = '';
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    },
  },
});