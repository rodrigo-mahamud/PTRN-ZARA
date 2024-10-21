"use client";
import { CartContextType, CartItem } from "@/Types/types";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
         setCartItems(JSON.parse(savedCart));
      }
      setIsLoading(false);
   }, []);

   useEffect(() => {
      if (!isLoading) {
         localStorage.setItem("cart", JSON.stringify(cartItems));
      }
   }, [cartItems, isLoading]);

   const addToCart = useCallback((item: CartItem) => {
      setCartItems((prevItems) => [...prevItems, item]);
   }, []);

   const removeFromCart = useCallback((itemId: string) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
   }, []);

   const removeAllById = useCallback((itemId: string) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
   }, []);

   const cartCount = cartItems.length;

   return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeAllById, cartCount, isLoading }}>{children}</CartContext.Provider>
   );
};

export const useCart = (): CartContextType => {
   const context = useContext(CartContext);

   if (context === undefined) {
      throw new Error("useCart must be used within a CartProvider");
   }
   return context;
};
