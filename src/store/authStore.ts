import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IUser } from '@/modules/shared/types'

// ── Tipos ─────────────────────────────────────────────────────────────────

interface IAuthState {
  user: IUser | null
  accessToken: string | null
  isAuthenticated: boolean

  // Actions
  setAuth: (user: IUser, accessToken: string) => void
  setAccessToken: (token: string) => void
  logout: () => void
  updateUser: (partial: Partial<IUser>) => void
}

// ── Store ─────────────────────────────────────────────────────────────────
// NOTA DE SEGURIDAD:
// - El accessToken se persiste en sessionStorage (no localStorage) para que
//   expire al cerrar la pestaña.
// - El refreshToken vive SOLO en una httpOnly cookie manejada por el servidor.
//   Nunca se toca desde JS.

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),

      setAccessToken: (accessToken) =>
        set({ accessToken }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),

      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'mla-auth', // marketplace-logistico-auth
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
