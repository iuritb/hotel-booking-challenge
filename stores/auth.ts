// stores/auth.ts
import { defineStore } from 'pinia';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    initializeAuth() {
      if (process.client) { 
        const token = localStorage.getItem('authToken');
        if (token) {
          this.token = token;
          this.user = { id: 1, email: 'user@example.com', name: 'Usuário Teste' };
        }
      } else { 
        const tokenCookie = useCookie('auth_token');
        if (tokenCookie.value) {
          this.token = tokenCookie.value;
          this.user = { id: 1, email: 'user@example.com', name: 'Usuário Teste' };
        }
      }
    },

    async login(credentials: any) {
      this.loading = true;
      this.error = null;
      try {
        const { token, user } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });

        this.token = token;
        this.user = user;

        const authTokenCookie = useCookie('auth_token');
        authTokenCookie.value = token;
        
        if (process.client) {
            localStorage.setItem('authToken', token);
        }

        return true;
      } catch (e: any) {
        this.error = e.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(userData: any) {
      this.loading = true;
      this.error = null;
      try {
        const { token, user } = await $fetch('/api/auth/register', {
          method: 'POST',
          body: userData,
        });

        this.token = token;
        this.user = user;

        const authTokenCookie = useCookie('auth_token');
        authTokenCookie.value = token;

        if (process.client) {
            localStorage.setItem('authToken', token);
        }
        
        return true;
      } catch (e: any) {
        this.error = e.data?.message || 'Erro ao registrar. Tente novamente.';
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;

      const authTokenCookie = useCookie('auth_token');
      authTokenCookie.value = null; 
      
      if (process.client) {
          localStorage.removeItem('authToken');
      }
      
      useRouter().push('/login');
    },
  },
});