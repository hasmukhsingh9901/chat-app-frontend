import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore } from '@/types/auth';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (phone: string, countryCode: string) => {
        set({ isLoading: true });
        
        // Simulate OTP verification delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const user: User = {
          id: Date.now().toString(),
          phone,
          countryCode,
          isAuthenticated: true,
        };
        
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
