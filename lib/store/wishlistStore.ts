import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/productData';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id);
          if (exists) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      toggleItem: (product) => {
        const state = get();
        if (state.isInWishlist(product.id)) {
          state.removeItem(product.id);
        } else {
          state.addItem(product);
        }
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'little-nazareth-wishlist',
    }
  )
);
