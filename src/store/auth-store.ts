import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, Student, Faculty, Supervisor } from '@/types'
import { LOCAL_STORAGE_KEYS } from '@/config/constants'

interface AuthStore extends AuthState {
  login: (user: Student | Faculty | Supervisor, token: string) => void
  logout: () => void
  updateUser: (user: Partial<Student | Faculty | Supervisor>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      role: null,

      login: (user, token) => {
        set({
          isAuthenticated: true,
          user,
          token,
          role: user.role,
        })
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token)
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          role: null,
        })
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
      },

      updateUser: (userData) => {
        set((state) => {
          if (!state.user) return { user: null }
          return {
            user: { ...state.user, ...userData } as typeof state.user,
          }
        })
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER_DATA,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        role: state.role,
      }),
    }
  )
)
