import React from 'react';
import '../styles/Product1.css';

const Product = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-labels">
        <span className="new-arrival-label">HÀNG MỚI VỀ</span>
      </div>
      <div className="rating-label">{product.rating}</div>
      <img src={product.img} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-pricing">
        <span className="current-price">{product.price}</span>
        <span className="sold-price">Đã bán: {product.sold}</span>
      </div>
    </div>
  );
};

export default Product;
