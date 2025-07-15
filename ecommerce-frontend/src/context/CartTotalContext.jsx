import React, { useState } from "react";
const CartTotalContext = React.createContext();

export const CartTotalProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);

  const updateCartTotal = (newTotal) => {
    setCartTotal(newTotal); 
    }

  return (
    <CartTotalContext.Provider value={{ cartTotal, updateCartTotal }}>
      {children}
    </CartTotalContext.Provider>
  );
}
export const useCartTotal = () => {
    const context = React.useContext(CartTotalContext);

    return context;
    }