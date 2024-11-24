import React from 'react';
import Product from './Product1';
import '../styles/ProductList1.css';

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


  
  // Thêm các sản phẩm khác
];

const ProductList = () => {
  return (
    <div className="product-section">
      {/* Thêm tiêu đề sản phẩm mới */}
      <h2 className="product-title">SẢN PHẨM MỚI</h2>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
};

export default ProductList;
