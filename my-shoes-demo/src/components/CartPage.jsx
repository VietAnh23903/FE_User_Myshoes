import React from 'react';
import { useCart } from '../components/CartContext'; // Import CartContext
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng trang thanh toán
import "../styles/CartPage.css"; // Import CSS cho trang giỏ hàng

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart(); // Lấy giỏ hàng và hàm từ CartContext
  const navigate = useNavigate(); // Khai báo navigate để chuyển hướng tới trang thanh toán

  // Tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return totalPrice;
  };

  // Xử lý hành động "Mua ngay" cho từng sản phẩm
  const handleBuyNow = (product) => {
    alert(`Đang tiến hành mua ngay "${product.name}" với kích thước ${product.size} và số lượng ${product.quantity}`);
    navigate("/checkout"); // Điều hướng đến trang thanh toán
  };

  // Xử lý thanh toán giỏ hàng
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert("Đang chuyển đến trang thanh toán!");
      navigate("/checkout"); // Điều hướng đến trang thanh toán
    } else {
      alert("Giỏ hàng của bạn đang trống!");
    }
  };

  return (
    <section className="cart-section">
      <div className="cart-container">
        <h2>Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn trống</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Hình ảnh</th> {/* Cột Hình ảnh */}
                <th>Tên sản phẩm</th>
                <th>Kích thước</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                <th>Tổng giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id + item.size}>
                  <td>
                    <img src={item.img} alt={item.name} className="cart-item-image" /> {/* Hiển thị hình ảnh sản phẩm */}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                  </td>
                  <td>{item.price}</td>
                  <td>{(item.price.replace(/\./g, "").replace("đ", "") * item.quantity).toLocaleString()} đ</td>
                  <td className="cart-actions">
                    <button onClick={() => removeFromCart(item.id, item.size)}>Xóa</button>
                    <button onClick={() => handleBuyNow(item)} className="buy-now-btn">
                      Mua ngay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-total">
          <p><strong>Tổng cộng:</strong> {getTotalPrice().toLocaleString()} VND</p>
        </div>

        {/* Nút "Thanh toán" cho toàn bộ giỏ hàng */}
        <div className="cart-buttons">
          <button onClick={handleCheckout} className="checkout-btn">
            Thanh toán giỏ hàng
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
