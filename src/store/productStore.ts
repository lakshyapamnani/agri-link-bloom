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

// Global product store
let globalProducts: Product[] = [...initialProducts];
let listeners: Array<(products: Product[]) => void> = [];

export const productStore = {
  getProducts: () => globalProducts,
  
  addProduct: (newProductData: Omit<Product, 'id' | 'rating'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
      rating: 4.5 + Math.random() * 0.5 // Random rating between 4.5-5.0
    };
    
    globalProducts = [newProduct, ...globalProducts];
    listeners.forEach(listener => listener(globalProducts));
  },
  
  subscribe: (listener: (products: Product[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};

export const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>(globalProducts);
  
  // Subscribe to product updates
  useEffect(() => {
    const unsubscribe = productStore.subscribe(setProducts);
    // Clean up on unmount
    return unsubscribe;
  }, []);
  
  return {
    products,
    addProduct: productStore.addProduct
  };
};

export type { Product };