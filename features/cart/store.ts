import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  fulfillment: "delivery" | "collection";
  deliveryFee: number;
  setFulfillment: (f: "delivery" | "collection") => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  fulfillment: "collection",
  deliveryFee: 0,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      const qtyToAdd = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
      // when item already exists, replace its quantity rather than increment

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: qtyToAdd }
              : i
          )
        };
      }

      return { items: [...state.items, { ...item, quantity: qtyToAdd }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id)
    })),
  updateItem: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        )
      };
    })
  ,
  setFulfillment: (f) =>
    set((state) => {
      const fee = f === "delivery" ? 3 : 0;
      return { fulfillment: f, deliveryFee: fee };
    })
  ,
  clearCart: () =>
    set({
      items: [],
      fulfillment: "collection",
      deliveryFee: 0
    })
}));
