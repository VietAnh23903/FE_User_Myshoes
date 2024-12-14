import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để chuyển hướng
import "../styles/Payment.css"; // Import CSS
import fetchAPI from "../config/axiosConfig";
import Loading from "./Loading";
import { Button, Checkbox, Flex, Form, Image, Modal, notification, Select, Space } from "antd";
import vnpay from "../assets/vnapy.png"

const ADDRESS_URL = "/address";
const ORDER_URL = "/order";
const PAYMENT_URL = "/payment";

const PaymentPage = () => {
  const [orderItems, setOrderItems] = useState(JSON.parse(localStorage.getItem("cart")));
  const [selectedPayment, setSelectedPayment] = useState("CASH"); // Mặc định phương thức thanh toán
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Trạng thái hiển thị modal thanh toán
  const [showNewAddressModal, setShowNewAddressModal] = useState(false); // Trạng thái hiển thị modal thêm địa chỉ mới
  const [addresses, setAddresses] = useState([]); // Danh sách địa chỉ
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  const [reload, setReload] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [openVNPAY, setOpenVNPAY] = useState(false);
  const [orderId, setOrderId] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message,
      placement: 'top',
    });
  };

  if (!user) {
    navigate("/");
  }
  useEffect(() => {
    const callAPI = async () => {
      setIsLoad(true);
      const addressResponse = await fetchAPI.get(ADDRESS_URL);
      setAddresses(addressResponse);
      setSelectedAddress(addressResponse.filter((item) => item.isDefault)[0]?.id)
      setIsLoad(false);
    };
    callAPI();
  }, [reload]);


  const handlePayWithVNPAY = async () => {
    const body = {
      paymentMethod: selectedPayment,
      orderId: orderId
    }
    console.log(body);
    try {
      const response = await fetchAPI.post(PAYMENT_URL, body);
      window.location.href = response.url;
    } catch (e) {
      openNotification('error', "Đơn hàng bạn đang trong quá trình tạo, vui lòng thử thanh toán lại sau 1-2s");
    }

  }
  const handleCheckout = async () => {
    // setIsLoad(true);
    const arr = orderItems?.map((item) => {
      return {
        id: item?.productVariant?.id,
        quantity: item?.quantity
      }
    });
    const body = {
      addressId: selectedAddress,
      productVariants: arr
    };
    try {
      const response = await fetchAPI.post(ORDER_URL, body);
      setOrderId(response.orderId);
      if (selectedPayment === "CASH") {
        const body = {
          paymentMethod: selectedPayment,
          orderId: response.orderId
        }
        try {
          await fetchAPI.post(PAYMENT_URL, body);
        } catch (e) {
          openNotification('error', "Đơn hàng bạn đang trong quá trình tạo, vui lòng thử thanh toán lại sau 1-2s");
        }
        navigate("/payment-success");
      }
      if (selectedPayment === "VNPAY") {
        console.log("VNPAY");
        setOpenVNPAY(true);
        // navigate("/success");
      }

    } catch (error) {

    } finally {
      // setIsLoad(false);
    }


    // Chuyển sang trang theo dõi đơn hàng
    // navigate("/order-tracking", { state: { products: cartItems } });
  };



  const createNewAddress = async (e) => {
    e.preventDefault();
    const callAPI = async () => {
      setIsLoad(true);
      const newAddress = {
        content: e.target.content.value,
        phone: e.target.phone.value,
        isDefault: e.target.isDefault.checked
      }
      const response = fetchAPI.post(ADDRESS_URL, newAddress);
      handleCancelNewAddressModal();
      setIsLoad(false);
      setReload(!reload);
    }
    callAPI();
  }

  // Hàm hủy thay đổi địa chỉ mới
  const handleCancelNewAddressModal = () => {
    setShowNewAddressModal(false);
  };
  return isLoad ? <Loading /> : <section className="checkout-section">
    {contextHolder}
    <div className="checkout-container">
      <h2>Thanh toán</h2>
      <Flex justify="center" vertical align="start">
        <h3>Địa Chỉ Nhận Hàng</h3>
        <Space>
          <Select
            showSearch
            style={{
              width: 500
            }}
            onChange={(value) => setSelectedAddress(value)}
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={selectedAddress}
            options={addresses.map((item) => ({
              value: item.id,
              label: item.content
            }))}
          />
          <Button type="default" onClick={() => setShowNewAddressModal(true)}>
            Thêm mới
          </Button>
        </Space>
      </Flex>

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
            {orderItems?.map((item, index) => (
              < tr key={"orderItem" + item?.id} >
                <td>
                  <div className="product-info">
                    <img src={item?.productVariant?.imageUrl} alt={item?.productVariant?.name} className="product-image" />
                    <p>{item?.productVariant?.name}</p>
                  </div>
                </td>
                <td>{Object.values(orderItems[index]?.productVariant?.attributes || [])[0]}</td>
                <td>{item?.productVariant?.price.toLocaleString("vi-VN")} đ</td>
                <td>{item?.quantity}</td>
                <td>{(item?.productVariant.price * item?.quantity).toLocaleString("vi-VN")} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phương thức thanh toán */}
      <Flex align="start" justify="center" vertical>
        <h3>Chọn phương thức thanh toán</h3>
        <Select
          showSearch
          style={{
            width: 500
          }}
          onChange={(value) => setSelectedPayment(value)}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          value={selectedPayment}
          options={[
            { value: "CASH", label: "Thanh toán bằng tiền mặt" },
            { value: "VNPAY", label: "Thanh toán bằng VNPAY" }
          ]}
        />
      </Flex>

      {/* Tổng cộng */}
      <div className="checkout-total">
        <h3>Tổng số tiền:<em> {orderItems.reduce((acc, item) => acc + (item.productVariant?.price || 0) * item?.quantity, 0).toLocaleString()} đ </em></h3>
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


    {/* Modal nhập địa chỉ mới */}
    {
      showNewAddressModal && (
        <div className="new-address-modal">
          <div className="modal-content">
            <h3>Thêm địa chỉ mới</h3>
            <form onSubmit={createNewAddress}>
              <label>
                <p>Số điện thoại:</p>
                <input
                  type="text"
                  name="phone"
                  required
                />
              </label>
              <label>
                <p>Địa chỉ:</p>
                <input
                  type="text"
                  name="content"
                  required
                />
              </label>
              <label>
                <p>Đặt làm mặc định:</p>
                <Checkbox name="isDefault"></Checkbox>
              </label>
              <div className="modal-buttons">
                <button onClick={handleCancelNewAddressModal}>Hủy</button>
                <button type="submit">Lưu</button>
              </div>
            </form>

          </div>
        </div>
      )
    }
    <Modal
      onOk={handlePayWithVNPAY}
      okText="Thanh toán"
      cancelText="Hủy"
      title={<Flex justify="center"><h3>Thanh toán bằng VNPAY</h3></Flex>} open={openVNPAY} onClose={() => setOpenVNPAY(false)} onCancel={() => setOpenVNPAY(false)} >
      <Flex justify="center">
        <Image src={vnpay} preview={false} />
      </Flex>
    </Modal>
  </section >;
};

export default PaymentPage;
