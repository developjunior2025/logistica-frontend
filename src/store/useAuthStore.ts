import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '@/modules/auth/types/auth.types';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser, token: string) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // local storage key
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
