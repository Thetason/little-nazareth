import { create } from 'zustand';

interface User {
  id: number;
  kakaoId: string;
  name: string;
  email?: string;
  profileImage?: string;
  kakaoChannelAdded: boolean;
  favoriteCharacter?: string;
  tumblbugNotify: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/me');
      const data = await response.json();

      if (response.ok && data.user) {
        set({ user: data.user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: null, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      set({ user: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
}));
