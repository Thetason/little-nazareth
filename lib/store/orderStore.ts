import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cartStore';

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  address: string;
  addressDetail: string;
  message: string;
}

export interface Order {
  id: string; // merchant_uid
  imp_uid: string; // 아임포트 결제 고유번호
  items: CartItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
  paidAt?: number;
  shippedAt?: number;
  deliveredAt?: number;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      getOrder: (id) => {
        return get().orders.find((order) => order.id === id);
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        }));
      },

      getAllOrders: () => {
        return get().orders.sort((a, b) => b.createdAt - a.createdAt);
      },
    }),
    {
      name: 'little-nazareth-orders',
    }
  )
);
