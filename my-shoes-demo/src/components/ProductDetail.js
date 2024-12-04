import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy id sản phẩm từ URL
import { useCart } from "../components/CartContext"; // Để thêm sản phẩm vào giỏ hàng
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const { addToCart } = useCart(); // Hàm để thêm sản phẩm vào giỏ hàng

  // Giả sử bạn lấy thông tin sản phẩm từ một mảng hoặc API
  const products = [
    { id: 1, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '1', rating: '5.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 2, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '2', rating: '5.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 3, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '3', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 4, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '4', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 5, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '5', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 6, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '6', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 7, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '7', rating: '5.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 8, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '8', rating: '5.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 9, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '9', rating: '5.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 10, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '10', rating: '5.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 11, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '11', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 12, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '12', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
  { id: 13, name: 'Giày Adidas EQ21', price: '1.890.000đ', sold: '13', rating: '4.0', img: 'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg' },
    // ... Các sản phẩm khác
  ];

  const product = products.find(product => product.id === parseInt(id)); // Tìm sản phẩm dựa trên id

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null); // Thêm state cho size

  // Tính tổng tiền
  const calculateTotal = () => {
    const price = parseFloat(product.price.replace(/\./g, "").replace("đ", ""));
    return (price * quantity).toLocaleString("vi-VN") + "đ";
  };

  // Hàm xử lý tăng giảm số lượng
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : prev));
  };

  // Xử lý chọn size
  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (size) {
      addToCart({ ...product, quantity, size });
      alert(`Đã thêm "${product.name}" với size ${size} vào giỏ hàng thành công!`);
    } else {
      alert("Vui lòng chọn size!");
    }
  };

  // Xử lý mua ngay
  const handleBuyNow = () => {
    if (size) {
      alert(`Mua ngay "${product.name}" với size ${size} và số lượng ${quantity}!`);
    } else {
      alert("Vui lòng chọn size!");
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-left">
        <img src={product.img} alt={product.name} className="product-detail-image" />
      </div>
      <div className="product-detail-right">
        <h1 className="product-name">{product.name}</h1>
        <div className="product-rating-sold">
          <span className="product-rating">⭐ {product.rating}/5.0</span>
          <span className="product-sold">{product.sold} đã bán</span>
        </div>
        <div className="product-price-section">
          <span className="product-price">{product.price}</span>
        </div>
        <div className="product-size">
          <h3>Chọn size:</h3>
          <div className="size-options">
            {["39", "40", "41", "42", "43"].map((sizeOption) => (
              <button 
                key={sizeOption} 
                className={`size-option ${size === sizeOption ? "selected" : ""}`}
                onClick={() => handleSizeChange(sizeOption)}
              >
                {sizeOption}
              </button>
            ))}
          </div>
        </div>
        <div className="product-quantity">
          <h3>Số lượng:</h3>
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange("decrease")}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange("increase")}>+</button>
          </div>
        </div>
        <div className="product-total">
          Tổng tiền: <span className="total-amount">{calculateTotal()}</span>
        </div>
        <div className="product-buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
          <button className="buy-now" onClick={handleBuyNow}>
            Mua hàng ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
