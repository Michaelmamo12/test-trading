import { create } from 'zustand';

type AuthType = 'signin' | 'signup';

interface AuthState {
  isOpen: boolean;
  type: AuthType;
  openAuth: (type: AuthType) => void;
  closeAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isOpen: false,
  type: 'signin',
  openAuth: (type) => set({ isOpen: true, type }),
  closeAuth: () => set({ isOpen: false }),
}));