import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderTrackingPage = () => {
  const location = useLocation();
  const products = location.state?.products || [];

  return (
    <section className="order-tracking-section">
      <h2>Theo Dõi Đơn Hàng</h2>
      <div className="order-status">
        <ul>
          <li>Chờ lấy hàng</li>
          <li>Đang giao hàng</li>
          <li>Đã giao hàng</li>
          <li>Đã hủy</li>
          <li>Trả hàng</li>
        </ul>
      </div>
      <div className="order-products">
        <h3>Sản phẩm trong "Chờ lấy hàng":</h3>
        {products.length === 0 ? (
          <p>Không có sản phẩm nào</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id + product.size}>
                {product.name} - Kích thước: {product.size} - Số lượng: {product.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default OrderTrackingPage;
