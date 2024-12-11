import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/OderTracking.css"; // Import CSS cho trang

const OrderTrackingPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState(location.state?.products || []);
  const [currentStatus, setCurrentStatus] = useState("Chờ lấy hàng");

  // Tính tổng cộng giá tiền
  const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Xử lý khi ấn nút "Đã nhận được hàng"
  const handleConfirmReceived = () => {
    setProducts([]); // Xóa danh sách sản phẩm hiện tại (để đơn giản hóa logic)
    setCurrentStatus("Đã giao hàng");
  };

  return (
    <section className="order-tracking-section">
      <h2>Theo Dõi Đơn Hàng</h2>

      {/* Trạng thái đơn hàng */}
      <div className="order-status">
        <ul>
          {["Chờ lấy hàng", "Đang giao hàng", "Đã giao hàng", "Đã hủy", "Trả hàng"].map((status) => (
            <li
              key={status}
              className={currentStatus === status ? "active" : ""}
              onClick={() => setCurrentStatus(status)}
            >
              {status}
            </li>
          ))}
        </ul>
      </div>

      {/* Danh sách sản phẩm */}
      {(currentStatus === "Chờ lấy hàng" || currentStatus === "Đang giao hàng") && (
        <div className="order-products">
          <h3>Sản phẩm trong "{currentStatus}":</h3>
          {products.length === 0 ? (
            <p>Không có sản phẩm nào</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Kích thước</th>
                  <th>Số lượng</th>
                  <th>Giá tiền</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} className="product-image" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.size}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price.toLocaleString()} ₫</td>
                    <td>{(product.price * product.quantity).toLocaleString()} ₫</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" style={{ textAlign: "right", fontWeight: "bold" }}>Tổng cộng:</td>
                  <td style={{ fontWeight: "bold" }}>{totalAmount.toLocaleString()} ₫</td>
                </tr>
              </tfoot>
            </table>
          )}

          {/* Nút "Đã nhận được hàng" */}
          {currentStatus === "Đang giao hàng" && (
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <button
                onClick={handleConfirmReceived}
                style={{
                  padding: "10px 20px",
                  background: "#ee4d2d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Đã nhận được hàng
              </button>
            </div>
          )}
        </div>
      )}

      {/* Thông báo cho "Đã giao hàng" */}
      {currentStatus === "Đã giao hàng" && (
        <div className="order-products">
          <h3>Đơn hàng đã được giao!</h3>
          <p>Vui lòng liên hệ với người bán nếu có vấn đề phát sinh.</p>
        </div>
      )}
    </section>
  );
};

export default OrderTrackingPage;
