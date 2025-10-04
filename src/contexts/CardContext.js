// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // بنخزن المعرّف الكامل للعنصر + qty
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("yasmin_cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed parsing cart from localStorage", e);
      return [];
    }
  });

  // كل تغيّر بالسلة نحتفظه بالـ localStorage
  useEffect(() => {
    try {
      localStorage.setItem("yasmin_cart_v1", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed writing cart to localStorage", e);
    }
  }, [cart]);

  // helpers
  const addItem = (product, qty = 1) => {
    setCart(prev => {
      const existIndex = prev.findIndex(p => p.id === product.id);
      if (existIndex !== -1) {
        const copy = [...prev];
        copy[existIndex].qty += qty;
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (productId, newQty) => {
    setCart(prev => prev.map(p => p.id === productId ? { ...p, qty: Math.max(0, newQty) } : p).filter(p => p.qty > 0));
  };

  const removeItem = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, it) => s + (it.qty || 0), 0);
  const totalPrice = cart.reduce((s, it) => s + (parseFloat(String(it.price).replace(/[^0-9.-]+/g,"")) || 0) * it.qty, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
