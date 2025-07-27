import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  farmer: string;
  location: string;
  rating: number;
  isExpressDelivery: boolean;
  inStock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

// Initial products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 45,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546470427-e0b89e81b24f?w=400&h=300&fit=crop',
    description: 'Fresh, organic tomatoes perfect for salads and cooking. Grown with natural farming methods.',
    farmer: 'Rajesh Kumar',
    location: 'Pune, Maharashtra',
    rating: 4.8,
    isExpressDelivery: true,
    inStock: 25
  },
  {
    id: '2',
    name: 'Green Capsicum',
    price: 60,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
    description: 'Crisp and fresh green bell peppers, perfect for stir-fries and salads.',
    farmer: 'Priya Sharma',
    location: 'Nashik, Maharashtra',
    rating: 4.6,
    isExpressDelivery: false,
    inStock: 15
  },
  {
    id: '3',
    name: 'Fresh Carrots',
    price: 40,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
    description: 'Sweet and crunchy carrots, rich in vitamins and minerals.',
    farmer: 'Amit Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 4.9,
    isExpressDelivery: true,
    inStock: 30
  },
  {
    id: '4',
    name: 'Organic Spinach',
    price: 35,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
    description: 'Fresh organic spinach leaves, perfect for healthy meals.',
    farmer: 'Sunita Devi',
    location: 'Jaipur, Rajasthan',
    rating: 4.7,
    isExpressDelivery: false,
    inStock: 8
  }
];

// Global store
let globalProducts: Product[] = [...initialProducts];
let globalCart: CartItem[] = [];
let listeners: Array<() => void> = [];

const broadcast = () => {
  listeners.forEach(listener => listener());
};

export const productStore = {
  getProducts: () => globalProducts,
  getCart: () => globalCart,
  
  addProduct: (newProductData: Omit<Product, 'id' | 'rating'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
      rating: 4.5 + Math.random() * 0.5
    };
    globalProducts = [newProduct, ...globalProducts];
    broadcast();
  },

  addToCart: (product: Product) => {
    const existingItem = globalCart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      globalCart.push({ ...product, quantity: 1 });
    }
    broadcast();
  },

  removeFromCart: (productId: string) => {
    globalCart = globalCart.filter(item => item.id !== productId);
    broadcast();
  },

  updateQuantity: (productId: string, quantity: number) => {
    const item = globalCart.find(item => item.id === productId);
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        globalCart = globalCart.filter(item => item.id !== productId);
      }
    }
    broadcast();
  },
  
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};

export const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>(globalProducts);
  const [cart, setCart] = useState<CartItem[]>(globalCart);
  
  useEffect(() => {
    const onStoreChange = () => {
      setProducts([...productStore.getProducts()]);
      setCart([...productStore.getCart()]);
    };
    const unsubscribe = productStore.subscribe(onStoreChange);
    return unsubscribe;
  }, []);
  
  return {
    products,
    cart,
    addProduct: productStore.addProduct,
    addToCart: productStore.addToCart,
    removeFromCart: productStore.removeFromCart,
    updateQuantity: productStore.updateQuantity
  };
};

export type { Product };