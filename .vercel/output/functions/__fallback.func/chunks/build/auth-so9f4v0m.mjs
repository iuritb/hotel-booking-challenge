import { p as pinia_prod } from './server.mjs';

const useAuthStore = pinia_prod.defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
    userBookings: []
  }),
  actions: {
    addBooking(booking) {
      var _a;
      if (this.isAuthenticated && ((_a = this.currentUser) == null ? void 0 : _a.id) === booking.userId) {
        this.userBookings.push(booking);
      }
    },
    initializeAuth() {
      console.log("Auth Store: initializeAuth() - In\xEDcio");
      {
        console.log("Auth Store: initializeAuth() - N\xE3o rodando no cliente, pulando verifica\xE7\xE3o do localStorage.");
      }
      console.log("Auth Store: initializeAuth() - Fim. isAuthenticated:", this.isAuthenticated);
    },
    async register(name, email, password) {
      console.log("Auth Store: register() - In\xEDcio para", email);
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.isAuthenticated = true;
      this.currentUser = { id: `user-${Date.now()}`, name, email };
      console.log("Auth Store: register() - Fim. isAuthenticated:", this.isAuthenticated);
      return { success: true, message: "Registro bem-sucedido!" };
    },
    async userLogin(email, password) {
      console.log("Auth Store: userLogin() - In\xEDcio para", email);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (email === "test@example.com" && password === "password123") {
        this.isAuthenticated = true;
        this.currentUser = { id: "user-123", name: "Test User", email: "test@example.com" };
        console.log("Auth Store: userLogin() - Fim. isAuthenticated:", this.isAuthenticated);
        return { success: true, message: "Login bem-sucedido!" };
      } else {
        this.logout();
        console.log("Auth Store: userLogin() - Login falhou para", email);
        return { success: false, message: "Email ou senha inv\xE1lidos." };
      }
    },
    logout() {
      console.log("Auth Store: logout() - In\xEDcio");
      this.isAuthenticated = false;
      this.currentUser = null;
      this.userBookings = [];
      console.log("Auth Store: logout() - Fim. isAuthenticated:", this.isAuthenticated);
    }
  }
});

export { useAuthStore as u };
//# sourceMappingURL=auth-so9f4v0m.mjs.map
