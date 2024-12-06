// import React, { createContext, useState, useContext } from 'react';

// // Tạo Context cho giỏ hàng
// const CartContext = createContext();

// // Custom Hook để sử dụng CartContext
// export const useCart = () => {
//   return useContext(CartContext);
// };

// // Provider để cung cấp CartContext cho các component khác
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Thêm sản phẩm vào giỏ hàng
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingProduct = prevItems.find(item => item.id === product.id && item.size === product.size);
//       if (existingProduct) {
//         return prevItems.map(item => 
//           item.id === product.id && item.size === product.size 
//           ? { ...item, quantity: item.quantity + product.quantity }
//           : item
//         );
//       } else {
//         return [...prevItems, product];
//       }
//     });
//   };

//   // Xóa sản phẩm khỏi giỏ hàng
//   const removeFromCart = (productId, size) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId || item.size !== size));
//   };

//   // Cập nhật số lượng sản phẩm
//   const updateQuantity = (productId, size, quantity) => {
//     setCartItems(prevItems => prevItems.map(item => 
//       item.id === productId && item.size === size ? { ...item, quantity } : item
//     ));
//   };

//   // Tính tổng giá trị giỏ hàng
//   const totalPrice = cartItems.reduce((total, item) => 
//     total + parseFloat(item.price.replace(/\./g, "").replace("đ", "")) * item.quantity, 0
//   );

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Hàm để cập nhật giỏ hàng
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id || item.size !== size));
  };

  const updateQuantity = (id, size, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // Tổng giá tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
