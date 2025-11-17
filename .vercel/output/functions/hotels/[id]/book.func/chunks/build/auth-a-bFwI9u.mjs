import { p as pinia_prodExports } from './server.mjs';

const useAuthStore = pinia_prodExports.defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
    userBookings: []
  }),
  actions: {
    addBooking(booking) {
      if (this.isAuthenticated && this.currentUser?.id === booking.userId) {
        this.userBookings.push(booking);
      }
    },
    initializeAuth() {
      console.log("Auth Store: initializeAuth() - Início");
      {
        console.log("Auth Store: initializeAuth() - Não rodando no cliente, pulando verificação do localStorage.");
      }
      console.log("Auth Store: initializeAuth() - Fim. isAuthenticated:", this.isAuthenticated);
    },
    async register(name, email, password) {
      console.log("Auth Store: register() - Início para", email);
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.isAuthenticated = true;
      this.currentUser = { id: `user-${Date.now()}`, name, email };
      console.log("Auth Store: register() - Fim. isAuthenticated:", this.isAuthenticated);
      return { success: true, message: "Registro bem-sucedido!" };
    },
    async userLogin(email, password) {
      console.log("Auth Store: userLogin() - Início para", email);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (email === "test@example.com" && password === "password123") {
        this.isAuthenticated = true;
        this.currentUser = { id: "user-123", name: "Test User", email: "test@example.com" };
        console.log("Auth Store: userLogin() - Fim. isAuthenticated:", this.isAuthenticated);
        return { success: true, message: "Login bem-sucedido!" };
      } else {
        this.logout();
        console.log("Auth Store: userLogin() - Login falhou para", email);
        return { success: false, message: "Email ou senha inválidos." };
      }
    },
    logout() {
      console.log("Auth Store: logout() - Início");
      this.isAuthenticated = false;
      this.currentUser = null;
      this.userBookings = [];
      console.log("Auth Store: logout() - Fim. isAuthenticated:", this.isAuthenticated);
    }
  }
});

export { useAuthStore as u };
//# sourceMappingURL=auth-a-bFwI9u.mjs.map
