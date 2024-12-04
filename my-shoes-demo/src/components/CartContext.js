import React, { createContext, useState, useContext } from 'react';

// Tạo Context cho giỏ hàng
const CartContext = createContext();

// Custom Hook để sử dụng CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Provider để cung cấp CartContext cho các component khác
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id && item.size === product.size);
      if (existingProduct) {
        return prevItems.map(item => 
          item.id === product.id && item.size === product.size 
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId || item.size !== size));
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productId, size, quantity) => {
    setCartItems(prevItems => prevItems.map(item => 
      item.id === productId && item.size === size ? { ...item, quantity } : item
    ));
  };

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cartItems.reduce((total, item) => 
    total + parseFloat(item.price.replace(/\./g, "").replace("đ", "")) * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
