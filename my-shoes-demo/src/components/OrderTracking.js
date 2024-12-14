import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/OderTracking.css"; // Import CSS cho trang
import fetchAPI from "../config/axiosConfig";
import { Button, Collapse, Flex, notification, Space } from "antd";
import Loading from "./Loading";

const API_URL = "/order"
const PAYMENT_URL = "/payment";

const OrderTrackingPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState(location.state?.products || []);
  const [currentStatus, setCurrentStatus] = useState("PAYMENT_CONFIRMED");
  const [orders, setOrders] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message,
      placement: 'top',
    });
  };


  const handlePayWithVNPAY = async (id) => {
    const body = {
      paymentMethod: "VNPAY",
      orderId: id
    }
    try {
      setIsLoad(true);
      const response = await fetchAPI.post(PAYMENT_URL, body);
      window.location.href = response.url;

    } catch (e) {
      openNotification('error', "Đơn hàng bạn đang trong quá trình tạo, vui lòng thử thanh toán lại sau 1-2s");
    } finally {
      setIsLoad(false);
    }

  }

  useEffect(() => {
    const callAPI = async () => {
      setIsLoad(true);
      const response = await fetchAPI.get(API_URL, { page: 0, size: 100, status: currentStatus });
      setOrders(response.data);
      setIsLoad(false);
    }
    callAPI();
  }, [currentStatus]);

  // Tính tổng cộng giá tiền
  const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Xử lý khi ấn nút "Đã nhận được hàng"
  const handleConfirmReceived = () => {
    setProducts([]); // Xóa danh sách sản phẩm hiện tại (để đơn giản hóa logic)
    setCurrentStatus("Đã giao hàng");
  };

  return isLoad ? <Loading /> : <section className="order-tracking-section">
    <h2>Theo Dõi Đơn Hàng</h2>
    {contextHolder}
    {/* Trạng thái đơn hàng */}
    <div className="order-status">
      <ul>
        {[
          { value: "PENDING", label: "Chưa thanh toán" },
          { value: "PAYMENT_CONFIRMED", label: "Đang Chuẩn bị hàng" },
          { value: "SHIPPING", label: "Đang giao hàng" },
          { value: "SUCCESS", label: "Giao hàng thành công" },
          { value: "REVIEWED", label: "Chưa Đánh giá" }].map((status) => (
            <li
              key={status.value}
              className={currentStatus === status.value ? "active" : ""}
              onClick={() => setCurrentStatus(status.value)}
            >
              {status.label}
            </li>
          ))}
      </ul>
    </div>
    {/* Danh sách sản phẩm */}
    <Collapse items={
      orders.map((item) => {
        return {
          key: "ordeee:" + item.id,
          label: <Flex justify="space-between" align="center">
            <h3>Mã đơn hàng :{item.id}</h3>
            <Space direction="vertical" size={"small"}>
              <div> Địa chỉ nhận: {item.shippingAddress.content}</div>
              <div>Số điện thoại nhận: {item.shippingAddress.phone} </div>
              <div style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold"
              }}>Tổng tiền: {item.totalAmount.toLocaleString()} đ</div>
              {currentStatus == "PENDING" && <Button onClick={() => handlePayWithVNPAY(item.id)}>Thanh toán</Button>}
            </Space>
          </Flex>,
          children: <table className="cart-table">
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
              {item.items.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                  </td>
                  <td>{product.name}</td>
                  <td>{Object.values(product?.attributes || [])[0]}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price.toLocaleString()} ₫</td>
                  <td>{(product.price * product.quantity).toLocaleString()} ₫</td>
                </tr>
              ))}
            </tbody>
          </table>

        }
      })
    } />

    {/* <Collapse items={items} defaultActiveKey={['1']} /> */}

    {/* Thông báo cho "Đã giao hàng" */}
    {currentStatus === "Đã giao hàng" && (
      <div className="order-products">
        <h3>Đơn hàng đã được giao!</h3>
        <p>Vui lòng liên hệ với người bán nếu có vấn đề phát sinh.</p>
      </div>
    )}
  </section>
};

export default OrderTrackingPage;
