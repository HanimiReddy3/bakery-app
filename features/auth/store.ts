import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

type Order = {
  id: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillment: "delivery" | "collection";
  customer: any;
  createdAt: string;
};

type AuthStore = {
  user: User | null;
  isLoggedIn: boolean;
  orders: Order[];
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  orders: [],
  login: (email, password) =>
    set({
      user: {
        id: "user_123",
        name: "John Doe",
        email: email,
        phone: "+1 (555) 123-4567",
        address: "123 Bakery Street, NY"
      },
      isLoggedIn: true
    }),
  signup: (name, email, password) =>
    set({
      user: {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        phone: "",
        address: ""
      },
      isLoggedIn: true
    }),
  logout: () =>
    set({
      user: null,
      isLoggedIn: false
    }),
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order]
    }))
}));
