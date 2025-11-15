// stores/auth.ts
import { defineStore } from 'pinia';
import type { User } from '~/types/user';
import type { Booking } from '~/types/booking';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null as User | null,
    userBookings: [] as Booking[], 
  }),
  actions: {
    
    addBooking(booking: Booking) {
      if (this.isAuthenticated && this.currentUser?.id === booking.userId) {
        this.userBookings.push(booking);
      }
    },
    
    initializeAuth() {
      console.log('Auth Store: initializeAuth() - Início'); 
      if (process.client) { 
        console.log('Auth Store: initializeAuth() - Rodando no cliente, verificando localStorage...'); 
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            this.currentUser = JSON.parse(storedUser);
            this.isAuthenticated = true;
            console.log('Auth Store: initializeAuth() - Usuário restaurado do localStorage:', this.currentUser); 
          } catch (e) {
            console.error("Auth Store: initializeAuth() - Falha ao fazer parse do usuário salvo:", e); 
            this.logout(); 
          }
        } else {
          console.log('Auth Store: initializeAuth() - Nenhum usuário encontrado no localStorage.'); 
        }
      } else {
        console.log('Auth Store: initializeAuth() - Não rodando no cliente, pulando verificação do localStorage.'); 
      }
      console.log('Auth Store: initializeAuth() - Fim. isAuthenticated:', this.isAuthenticated); 
    },
    
    async register(name: string, email: string, password: string) {
      console.log('Auth Store: register() - Início para', email); 
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      this.isAuthenticated = true;
      this.currentUser = { id: `user-${Date.now()}`, name, email };
      if (process.client) { // Protege o acesso a localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        console.log('Auth Store: register() - Usuário salvo no localStorage:', this.currentUser); 
      }
      console.log('Auth Store: register() - Fim. isAuthenticated:', this.isAuthenticated); 
      return { success: true, message: 'Registro bem-sucedido!' };
    },
    
    async userLogin(email: string, password: string) {
      console.log('Auth Store: userLogin() - Início para', email); 
      await new Promise(resolve => setTimeout(resolve, 500)); 

      
      if (email === 'test@example.com' && password === 'password123') { 
        this.isAuthenticated = true;
        this.currentUser = { id: 'user-123', name: 'Test User', email: 'test@example.com' };
        if (process.client) { 
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          console.log('Auth Store: userLogin() - Usuário logado e salvo no localStorage:', this.currentUser); 
        }
        console.log('Auth Store: userLogin() - Fim. isAuthenticated:', this.isAuthenticated); 
        return { success: true, message: 'Login bem-sucedido!' };
      } else {
        this.logout();
        console.log('Auth Store: userLogin() - Login falhou para', email); 
        return { success: false, message: 'Email ou senha inválidos.' };
      }
    },
    
    logout() {
      console.log('Auth Store: logout() - Início'); 
      this.isAuthenticated = false;
      this.currentUser = null;
      this.userBookings = [];
      if (process.client) {
        localStorage.removeItem('currentUser'); 
        console.log('Auth Store: logout() - currentUser removido do localStorage.'); 
      }
      console.log('Auth Store: logout() - Fim. isAuthenticated:', this.isAuthenticated); 
    },
  },
});