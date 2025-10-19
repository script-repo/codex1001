import { create } from 'zustand';

import type { ModalState, ModalType, ToastNotification } from '../types';

interface UIStore {
  modal: ModalState;
  toasts: ToastNotification[];
  sidebarCollapsed: boolean;
  openModal: (modalType: ModalType, data: ModalState['data']) => void;
  closeModal: () => void;
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  dismissToast: (toastId: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const randomId = () => Math.random().toString(36).slice(2);

const initialModal: ModalState = {
  isOpen: false,
  type: null,
  data: null
};

export const useUIStore = create<UIStore>((set) => ({
  modal: initialModal,
  toasts: [],
  sidebarCollapsed: false,
  openModal: (type, data) =>
    set({
      modal: {
        isOpen: true,
        type,
        data
      }
    }),
  closeModal: () => set({ modal: initialModal }),
  showToast: (toast) => {
    const { duration = 4000, ...rest } = toast;
    return set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: randomId(),
          duration,
          ...rest
        }
      ]
    }));
  },
  dismissToast: (toastId) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== toastId)
    })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed })
}));
