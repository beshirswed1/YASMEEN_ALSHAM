// src/contexts/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // قراءة السلة من localStorage عند التحميل
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("yasmeen_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // مزامنة الlocalStorage عند تغيّر السلة
  useEffect(() => {
    try {
      localStorage.setItem("yasmeen_cart", JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // إضافة عنصر (إن كان موجود نزيِّد الكمية، وإن لم يكن نضيفه)
  const addItem = (product, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  // حذف عنصر
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // تحديث كمية عنصر
  const updateQty = (id, qty) => {
    setCartItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  // تفريغ السلة
  const clearCart = () => setCartItems([]);

  // حساب عدد العناصر الكلي (badge)
  const getTotalCount = () => cartItems.reduce((s, p) => s + (p.qty || 0), 0);

  // حساب السعر الإجمالي
  const getTotalPrice = () =>
    cartItems.reduce((s, p) => s + (p.price || 0) * (p.qty || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        getTotalCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
