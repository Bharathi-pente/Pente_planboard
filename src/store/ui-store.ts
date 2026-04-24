import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LOCAL_STORAGE_KEYS } from '@/config/constants'

interface UIStore {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  modalOpen: string | null
  openModal: (modalId: string) => void
  closeModal: () => void

  drawerOpen: boolean
  drawerContent: React.ReactNode | null
  openDrawer: (content: React.ReactNode) => void
  closeDrawer: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      modalOpen: null,
      openModal: (modalId) => set({ modalOpen: modalId }),
      closeModal: () => set({ modalOpen: null }),

      drawerOpen: false,
      drawerContent: null,
      openDrawer: (content) => set({ drawerOpen: true, drawerContent: content }),
      closeDrawer: () => set({ drawerOpen: false, drawerContent: null }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.SIDEBAR_STATE,
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)
