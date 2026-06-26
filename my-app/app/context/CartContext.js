"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Safe Initialization: Initialize state directly from localStorage if in browser
  const [cart, setcart] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("vieux-cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error("Error reading initial Cart memory", error);
          return [];
        }
      }
    }
    return [];
  });

  // 2. Synchronize localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("vieux-cart", JSON.stringify(cart));
  }, [cart]);

  // ADD ITEM TO CART ENGINE
  const addCart = (product, selectedSize) => {
    const itemExists = cart.some(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (itemExists) {
     
      const updatedCart = cart.map((item) =>
        item.id === product.id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setcart(updatedCart);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedSize: selectedSize,
        quantity: 1,
      };
      setcart([...cart, newItem]);
    }
  };


  const removeCart = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.selectedSize === size)
    );
    setcart(updatedCart);
  };


  const clearCart = () => {
    setcart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be executed within an active <CartProvider /> wrapping layout");
  }
  return context;
}