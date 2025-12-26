import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/productData';
import { useInventoryStore } from './inventoryStore';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        // Check inventory stock
        const { isInStock, getStock } = useInventoryStore.getState();
        const existingItem = get().items.find((item) => item.product.id === product.id);
        const currentCartQuantity = existingItem?.quantity || 0;
        const requestedTotal = currentCartQuantity + quantity;

        if (!isInStock(product.id, requestedTotal)) {
          const availableStock = getStock(product.id);
          console.warn(
            `재고 부족: ${product.koreanName} (요청: ${requestedTotal}, 가능: ${availableStock})`
          );
          // Still add what we can
          const addableQuantity = Math.max(0, availableStock - currentCartQuantity);
          if (addableQuantity === 0) return;
          quantity = addableQuantity;
        }

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        // Check inventory stock
        const { isInStock, getStock } = useInventoryStore.getState();
        if (!isInStock(productId, quantity)) {
          const availableStock = getStock(productId);
          console.warn(`재고 부족: 최대 ${availableStock}개까지 가능`);
          quantity = Math.max(1, availableStock);
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'little-nazareth-cart',
    }
  )
);
