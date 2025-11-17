import { defineStore } from 'pinia';

const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    message: "",
    type: "",
    isVisible: false,
    duration: 3e3,
    timeoutId: null
  }),
  actions: {
    showSnackbar(message, type = "info", duration = 3e3) {
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
      this.message = "";
      this.type = "";
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }
});

export { useSnackbarStore as u };
//# sourceMappingURL=snackbar-khJODdGS.mjs.map
