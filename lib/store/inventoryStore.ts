import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '@/lib/productData';

interface InventoryItem {
  productId: string;
  stock: number;
}

interface InventoryState {
  inventory: InventoryItem[];
  initializeInventory: () => void;
  getStock: (productId: string) => number;
  isInStock: (productId: string, quantity?: number) => boolean;
  decreaseStock: (productId: string, quantity: number) => boolean;
  increaseStock: (productId: string, quantity: number) => void;
  isLowStock: (productId: string, threshold?: number) => boolean;
  resetInventory: () => void;
}

const LOW_STOCK_THRESHOLD = 10;

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      inventory: [],

      // 초기 재고 설정 (products 데이터에서)
      initializeInventory: () => {
        const state = get();
        if (state.inventory.length === 0) {
          const initialInventory = products.map((product) => ({
            productId: product.id,
            stock: product.stock,
          }));
          set({ inventory: initialInventory });
        }
      },

      // 재고 조회
      getStock: (productId) => {
        const item = get().inventory.find((inv) => inv.productId === productId);
        if (!item) {
          // 재고 정보가 없으면 products 데이터에서 가져오기
          const product = products.find((p) => p.id === productId);
          return product?.stock || 0;
        }
        return item.stock;
      },

      // 재고 있는지 확인
      isInStock: (productId, quantity = 1) => {
        const stock = get().getStock(productId);
        return stock >= quantity;
      },

      // 재고 감소 (구매 시)
      decreaseStock: (productId, quantity) => {
        const state = get();
        const currentStock = state.getStock(productId);

        if (currentStock < quantity) {
          console.warn(`재고 부족: ${productId} (요청: ${quantity}, 현재: ${currentStock})`);
          return false;
        }

        set((state) => ({
          inventory: state.inventory.map((item) =>
            item.productId === productId
              ? { ...item, stock: item.stock - quantity }
              : item
          ),
        }));

        return true;
      },

      // 재고 증가 (반품, 재입고 시)
      increaseStock: (productId, quantity) => {
        set((state) => {
          const existingItem = state.inventory.find((inv) => inv.productId === productId);

          if (existingItem) {
            return {
              inventory: state.inventory.map((item) =>
                item.productId === productId
                  ? { ...item, stock: item.stock + quantity }
                  : item
              ),
            };
          } else {
            // 새로운 상품 추가
            return {
              inventory: [
                ...state.inventory,
                { productId, stock: quantity },
              ],
            };
          }
        });
      },

      // 재고 부족 여부 확인
      isLowStock: (productId, threshold = LOW_STOCK_THRESHOLD) => {
        const stock = get().getStock(productId);
        return stock > 0 && stock <= threshold;
      },

      // 재고 초기화 (테스트용)
      resetInventory: () => {
        const initialInventory = products.map((product) => ({
          productId: product.id,
          stock: product.stock,
        }));
        set({ inventory: initialInventory });
      },
    }),
    {
      name: 'little-nazareth-inventory',
    }
  )
);
