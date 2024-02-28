'use client';

import React, { createContext, useContext, useState } from 'react';

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartContextType = {
  coupon: any;
  payment: any;
  deliveryData: any;
  navChange: any;
  addressId: any;
  loadingContext: boolean;
  cart: any;

  setCoupon: React.Dispatch<React.SetStateAction<any>>;
  setPayment: React.Dispatch<React.SetStateAction<any>>;
  setDeliveryData: React.Dispatch<React.SetStateAction<any>>;
  setNavChange: React.Dispatch<React.SetStateAction<any>>;
  setAddressId: React.Dispatch<React.SetStateAction<any>>;
  setLoadingContext: React.Dispatch<React.SetStateAction<any>>;
  setCart: React.Dispatch<React.SetStateAction<any>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [coupon, setCoupon] = useState<any>(null);
  const [deliveryData, setDeliveryData] = useState<any>(null);
  const [payment, setPayment] = useState<any>('cod');
  const [navChange, setNavChange] = useState<any>(false);
  const [addressId, setAddressId] = useState<any>(null);
  const [cart, setCart] = useState<any>(null);
  const [loadingContext, setLoadingContext] = useState<boolean>(false);

  const contextValue: CartContextType = {
    coupon,
    deliveryData,
    payment,
    navChange,
    addressId,
    loadingContext,
    cart,

    setCoupon,
    setPayment,
    setDeliveryData,
    setNavChange,
    setAddressId,
    setLoadingContext,
    setCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Context should be inside CartContextProvider');
  }
  return context;
}
