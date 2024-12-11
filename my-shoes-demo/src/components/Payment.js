import React, { useState } from "react";
import { useCart } from "../components/CartContext"; // Sử dụng CartContext để lấy dữ liệu
import { useNavigate } from "react-router-dom"; // Dùng để chuyển hướng
import "../styles/Payment.css"; // Import CSS

const PaymentPage = () => {
  const { cartItems } = useCart(); // Lấy danh sách sản phẩm và tổng tiền
  const [selectedPayment, setSelectedPayment] = useState("Thanh toán tiền mặt"); // Mặc định phương thức thanh toán
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Trạng thái hiển thị modal thanh toán
  const [showAddressModal, setShowAddressModal] = useState(false); // Trạng thái hiển thị modal địa chỉ
  const [showNewAddressModal, setShowNewAddressModal] = useState(false); // Trạng thái hiển thị modal thêm địa chỉ mới
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Đỗ Tiến Anh", phone: "(+84) 865923203", address: "Số 63, Ngách 63/5 Đường Lê Đức Thọ, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội" }
  ]); // Danh sách địa chỉ
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]); // Địa chỉ mặc định
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: ""
  }); // Địa chỉ mới

  // Lưu trữ giá trị ban đầu
  const [initialPayment, setInitialPayment] = useState(selectedPayment); // Lưu phương thức thanh toán ban đầu
  const [initialAddress, setInitialAddress] = useState(selectedAddress); // Lưu địa chỉ ban đầu
  const [initialNewAddress, setInitialNewAddress] = useState({ ...newAddress }); // Lưu địa chỉ mới ban đầu

  const navigate = useNavigate();

  // Hàm tính tổng số lượng sản phẩm
  const getTotalQuantity = () => {
    // return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    // Chuyển sang trang theo dõi đơn hàng
    navigate("/order-tracking", { state: { products: cartItems } });
  };

  const handleSavePaymentMethod = (method) => {
    setSelectedPayment(method);
    setShowPaymentModal(false);
  };

  const handleSaveAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handleChangeAddress = (e) => {
    const selectedId = e.target.value;
    const selectedAddr = addresses.find(addr => addr.id === parseInt(selectedId));
    setSelectedAddress(selectedAddr);
  };

  const handleAddNewAddress = () => {
    const newAddressData = {
      id: addresses.length + 1,
      name: newAddress.name,
      phone: newAddress.phone,
      address: newAddress.address
    };

    setAddresses([...addresses, newAddressData]);
    setSelectedAddress(newAddressData); // Chọn địa chỉ mới thêm vào
    setShowNewAddressModal(false); // Đóng modal
  };

  const handleDeleteAddress = (addressId) => {
    // Xử lý xóa địa chỉ theo ID
    const updatedAddresses = addresses.filter((address) => address.id !== addressId);
    setAddresses(updatedAddresses); // Cập nhật danh sách địa chỉ sau khi xóa
    setSelectedAddress({}); // Deselect địa chỉ đã bị xóa
  };

  const handleChangeNewAddress = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  // Hàm hủy thay đổi phương thức thanh toán
  const handleCancelPaymentModal = () => {
    setSelectedPayment(initialPayment); // Khôi phục lại phương thức thanh toán ban đầu
    setShowPaymentModal(false);
  };

  // Hàm hủy thay đổi địa chỉ nhận hàng
  const handleCancelAddressModal = () => {
    setSelectedAddress(initialAddress); // Khôi phục lại địa chỉ ban đầu
    setShowAddressModal(false);
  };

  // Hàm hủy thay đổi địa chỉ mới
  const handleCancelNewAddressModal = () => {
    setNewAddress(initialNewAddress); // Khôi phục lại địa chỉ mới ban đầu
    setShowNewAddressModal(false);
  };

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <h2>Thanh toán</h2>

        {/* Địa chỉ nhận hàng */}
        <div className="checkout-address">
          <h3>Địa Chỉ Nhận Hàng</h3>
          <div className="address-info">
            <p>
              <strong>{selectedAddress.name}</strong> {selectedAddress.phone}
            </p>
            <p>{selectedAddress.address}</p>
            <button
              className="change-address-btn"
              onClick={() => setShowAddressModal(true)}
            >
              Thay Đổi
            </button>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="checkout-products">
          <h3>Sản phẩm</h3>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Phân loại</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {/* {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <img src={item.img} alt={item.name} className="product-image" />
                      <p>{item.name}</p>
                    </div>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.price.toLocaleString("vi-VN")} đ</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>

        {/* Phương thức thanh toán */}
        <div className="checkout-payment">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-selected">
            <p>
              {selectedPayment}
              <button
                className="change-payment-btn"
                onClick={() => setShowPaymentModal(true)}
              >
                Thay Đổi
              </button>
            </p>
          </div>
        </div>

        {/* Tổng cộng */}
        <div className="checkout-total">
          <h3>Tổng số tiền<em>({getTotalQuantity()} sản phẩm)</em></h3>
          <p>
            <strong>
              {/* {(totalPrice).toLocaleString("vi-VN")} đ */}
            </strong>
          </p>
        </div>

        {/* Nút Thanh toán */}
        <div className="checkout-buttons">
          <button className="pay-now-btn" onClick={handleCheckout}>
            Thanh toán
          </button>
        </div>
      </div>

      {/* Modal thay đổi phương thức thanh toán */}
      {showPaymentModal && (
        <div className="payment-modal">
          <div className="modal-content">
            <h3>Chọn phương thức thanh toán</h3>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="Thanh toán tiền mặt"
                  checked={selectedPayment === "Thanh toán tiền mặt"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Thanh toán tiền mặt
              </label>
              <label>
                <input
                  type="radio"
                  value="Thanh toán bằng VnPay"
                  checked={selectedPayment === "Thanh toán bằng VnPay"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Thanh toán bằng VnPay
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={handleCancelPaymentModal}>Hủy</button>
              <button onClick={() => handleSavePaymentMethod(selectedPayment)}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thay đổi địa chỉ nhận hàng */}
      {showAddressModal && (
        <div className="address-modal">
          <div className="modal-content">
            <h3>Chọn địa chỉ nhận hàng</h3>
            <div className="address-options">
              {addresses.map((address) => (
                <label key={address.id}>
                  <input
                    type="radio"
                    value={address.id}
                    checked={selectedAddress.id === address.id}
                    onChange={handleChangeAddress}
                  />
                  {address.name} - {address.phone} - {address.address}
                </label>
              ))}
              <button onClick={() => setShowNewAddressModal(true)} className="add-address-btn">
                Thêm địa chỉ mới
              </button>
            </div>
            <div className="modal-buttons">
              <button onClick={handleCancelAddressModal}>Hủy</button>
              {/* Thêm nút Xóa */}
              {selectedAddress.id && (
                <button onClick={() => handleDeleteAddress(selectedAddress.id)} className="delete-address-btn">
                  Xóa
                </button>
              )}
              <button onClick={() => handleSaveAddress(selectedAddress)}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal nhập địa chỉ mới */}
      {showNewAddressModal && (
        <div className="new-address-modal">
          <div className="modal-content">
            <h3>Thêm địa chỉ mới</h3>
            <form>
              <label>
                <p>Tên người nhận:</p>
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleChangeNewAddress}
                  required
                />
              </label>
              <label>
                <p>Số điện thoại:</p>
                <input
                  type="text"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleChangeNewAddress}
                  required
                />
              </label>
              <label>
                <p>Địa chỉ:</p>
                <input
                  type="text"
                  name="address"
                  value={newAddress.address}
                  onChange={handleChangeNewAddress}
                  required
                />
              </label>
            </form>
            <div className="modal-buttons">
              <button onClick={handleCancelNewAddressModal}>Hủy</button>
              <button onClick={handleAddNewAddress}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentPage;
