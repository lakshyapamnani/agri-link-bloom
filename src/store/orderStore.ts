import { useState, useEffect } from "react";
import { CartItem } from "./productStore";

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  date: string;
  status: "Pending" | "Completed";
}

let globalOrders: Order[] = [];
let listeners: Array<() => void> = [];

const broadcast = () => {
  listeners.forEach((listener) => listener());
};

export const orderStore = {
  getOrders: () => globalOrders,

  addOrder: (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ORDER-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Pending",
    };
    globalOrders = [newOrder, ...globalOrders];
    broadcast();
  },

  updateOrderStatus: (orderId: string, status: "Completed") => {
    const order = globalOrders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      broadcast();
    }
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export const useOrderStore = () => {
  const [orders, setOrders] = useState<Order[]>(globalOrders);

  useEffect(() => {
    const onStoreChange = () => {
      setOrders([...orderStore.getOrders()]);
    };
    const unsubscribe = orderStore.subscribe(onStoreChange);
    return unsubscribe;
  }, []);

  return {
    orders,
    addOrder: orderStore.addOrder,
    updateOrderStatus: orderStore.updateOrderStatus,
  };
};
