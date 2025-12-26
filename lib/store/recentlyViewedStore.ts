import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/productData';

interface RecentlyViewedState {
  items: Product[];
  addItem: (product: Product) => void;
  getItems: () => Product[];
}

const MAX_RECENT_ITEMS = 10;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          // Remove if already exists
          const filtered = state.items.filter((item) => item.id !== product.id);

          // Add to the beginning
          const newItems = [product, ...filtered];

          // Keep only the last MAX_RECENT_ITEMS
          return { items: newItems.slice(0, MAX_RECENT_ITEMS) };
        });
      },

      getItems: () => {
        return get().items;
      },
    }),
    {
      name: 'little-nazareth-recently-viewed',
    }
  )
);
