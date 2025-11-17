// stores/snackbar.ts
import { defineStore } from 'pinia';

interface SnackbarState {
  message: string;
  type: 'success' | 'error' | 'info' | '';
  isVisible: boolean;
  duration: number; 
  timeoutId: ReturnType<typeof setTimeout> | null;
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): SnackbarState => ({
    message: '',
    type: '',
    isVisible: false,
    duration: 3000, 
    timeoutId: null,
  }),
  actions: {
    showSnackbar(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      this.message = message;
      this.type = type;
      this.duration = duration;
      this.isVisible = true;

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