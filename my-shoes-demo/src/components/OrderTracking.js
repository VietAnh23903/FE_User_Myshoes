import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/OderTracking.css"; // Import CSS cho trang
import fetchAPI from "../config/axiosConfig";
import { Button, Collapse, Flex, Form, Input, Modal, notification, Rate, Space, Upload } from "antd";
import Loading from "./Loading";
import { PlusOutlined } from "@ant-design/icons";

const API_URL = "/order"
const PAYMENT_URL = "/payment";
const REVIEW_URL = "/review";

const OrderTrackingPage = () => {
  const [products, setProducts] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("PAYMENT_CONFIRMED");
  const [orders, setOrders] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedReview, setSelectedReview] = useState();
  const openNotification = (type, message) => {
    api[type]({
      message,
      placement: 'top',
    });
  };

  // Mở Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form sau khi đóng
    setFileList([]); // Reset danh sách ảnh
  };

  // Xử lý upload ảnh
  const handleUpload = async (file) => {
    try {
      // Giả lập gọi API upload ảnh
      const response = await fetchAPI.post("/image", { image: file }, {
        "Content-Type": "multipart/form-data"
      }); // Thay bằng API thực tế
      setFileList([...fileList, {
        uid: response.id,
        status: 'done',
        url: response.url,
        thumbUrl: response.url
      }]) // Thêm ID vào danh sách
      console.log("Image uploaded successfully!");
      return false; // Ngăn Upload tự động
    } catch (error) {
      console.log("Image upload failed.");
      return false;
    }
  };

  // Xử lý khi Submit Form
  const onFinish = async (values) => {
    const payload = {
      ...values,
      imageIds: fileList.map((item) => item.uid),
    };
    await fetchAPI.patch(REVIEW_URL + `/${selectedReview}`, payload)
    handleCancel(); // Đóng Modal sau khi submit
    setProducts((pre) => pre.filter((item) => item.id != selectedReview));
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
      if (currentStatus != "NOT_REVIEWED" && currentStatus != "REVIEW") {
        const response = await fetchAPI.get(API_URL, { page: 0, size: 100, status: currentStatus });
        setOrders(response.data);
        setProducts([]);
      }
      else {
        setOrders([]);
        const isReview = currentStatus == "NOT_REVIEWED" ? false : true;
        const response = await fetchAPI.get(REVIEW_URL, { page: 0, size: 100, isReview });
        console.log(response);
        setProducts(response.data)
      }
      setIsLoad(false);
    }
    callAPI();
  }, [currentStatus]);

  console.log(products);

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
          { value: "NOT_REVIEWED", label: "Chưa Đánh giá" },
          { value: "REVIEW", label: "Đã Đánh giá" }
        ].map((status) => (
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

    {currentStatus !== "NOT_REVIEWED" && currentStatus != "REVIEW" ? "" : <table className="cart-table">
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Kích thước</th>
          {currentStatus == "NOT_REVIEWED" &&
            <th>Hành động</th>
          }
          {currentStatus == "REVIEW" &&
            <>
              <th>Đánh giá</th>
              <th>Bình luận</th>
            </>
          }
        </tr>
      </thead>
      <tbody>
        {products?.map((item, index) => (
          <tr key={"fsadf" + item.id + index}>
            <td>
              <img src={item?.productVariant?.image} alt={item?.productVariant?.name} className="product-image" />
            </td>
            <td><Link to={`/product/${item.productVariant.productId}`}>{item?.productVariant?.name}</Link></td>
            <td>{Object.values(item?.productVariant?.variants || [])[0]}</td>
            {currentStatus == "NOT_REVIEWED" &&
              <td><Button onClick={() => {
                setSelectedReview(item.id);
                showModal();
              }}>Đánh giá</Button></td>
            }
            {currentStatus == "REVIEW" &&
              <>
                <td>{item.rating} ⭐</td>
                <td>{item.comment}</td>
              </>
            }

          </tr>
        ))}
      </tbody>
    </table>}

    <Modal
      title="Viết Đánh giá"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null} // Tùy chỉnh Footer nếu cần
    >
      <Form
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <Flex align="center" justify="center">
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: "Vui lòng đánh giá!" }]}
          >
            <Rate allowHalf />
          </Form.Item>
        </Flex>


        <Form.Item
          label="Viết bình luận"
          name="comment"
          rules={[{ required: true, message: "Vui lòng nhập bình luận!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Tải ảnh">
          <Upload
            fileList={fileList}
            listType="picture-card"
            beforeUpload={handleUpload}
            showUploadList={{ showRemoveIcon: true }}
            onRemove={(file) => {
              console.log(fileList);
              setFileList((pre) =>
                pre.filter((item) => item.uid !== file.uid))
            }}
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Thêm</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  </section>
};

export default OrderTrackingPage;
