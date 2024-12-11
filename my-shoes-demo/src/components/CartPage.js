import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Dùng để điều hướng trang thanh toán
import "../styles/CartPage.css"; // Import CSS cho trang giỏ hàng
import fetchAPI from '../config/axiosConfig';
import Loading from './Loading';
import { Button, Checkbox, Form, Input, InputNumber, Space } from 'antd';
import { useCart } from "../components/CartContext";

const API_URL = "/cart";

const CartPage = () => {
  const { clearCart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate(); // Khai báo navigate để chuyển hướng tới trang thanh toán
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartItems, setCartItems] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [reload, setReload] = useState(false);
  if (!user) {
    navigate("/");
  }

  const [form] = Form.useForm();

  const onFinish = (values) => {
    clearCart();
    const selectedItems = values.cartItems
      ?.filter((item) => item.checked);
    console.log(selectedItems);
    addToCart(selectedItems);
    navigate("/payment")
  };

  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetchAPI.get(API_URL, { page: 0, size: 100 });
        setCartItems(response.data);
        console.log(response.data);
        setIsLoad(false);
      } catch (e) {

      }
    }
    callAPI();
  }, [reload]);

  const handleChange = (id, productId, value) => {
    const updateQuantity = async () => {
      await fetchAPI.patch(API_URL + `/${id}`, {
        productVariantId: `${productId}`,
        quantity: value
      })
      setReload(!reload);
    };
    updateQuantity();
  };

  const handleDelete = (id) => {
    const deleteCart = async () => {
      await fetchAPI.delete(API_URL + `/${id}`)
      removeFromCart(id);
      const updatedCartItems = cartItems.filter((item) => item.id !== id); // Lọc bỏ sản phẩm
      setCartItems(updatedCartItems); // Cập nhật danh sách sản phẩm
      form.setFieldsValue({ cartItems: updatedCartItems });
      setReload(!reload);
    };
    deleteCart();
  };

  return isLoad ? <Loading /> : <Form layout='vertical' form={form} onFinish={onFinish}>
    <table className="cart-table">
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Kích thước</th>
          <th>Số lượng</th>
          <th>Giá tiền</th>
          <th>Tổng giá</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <Form.List name="cartItems" initialValue={cartItems}>
          {(fields) => {
            return fields.map((field, index) => {
              return (
                <tr key={field.key}>
                  <td>
                    <Form.Item
                      {...field}
                      name={[field.name, "checked"]}
                      valuePropName="checked"
                      initialValue={false}
                      noStyle
                    >
                      <Space>
                        <Checkbox value={cartItems[index]?.productVariant.id} />
                        <img
                          src={cartItems[index]?.productVariant?.imageUrl}
                          alt={cartItems[index]?.productVariant?.name}
                          className="cart-item-image"
                        />
                      </Space>
                    </Form.Item>

                  </td>
                  <td>
                    <Link to={`/product/${cartItems[index]?.productVariant.productId}`}>
                      {cartItems[index]?.productVariant?.name}
                    </Link>
                  </td>
                  <td>{Object.values(cartItems[index]?.productVariant?.attributes || [])[0]}</td>
                  <td>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      initialValue={cartItems[index]?.quantity}
                      rules={[{ required: true, message: "Số lượng là bắt buộc" }]}
                      noStyle
                    >
                      <InputNumber
                        min={1}
                        max={cartItems[index]?.productVariant?.stock}
                        onChange={(value) =>
                          handleChange(
                            cartItems[index]?.id,
                            cartItems[index]?.productVariant?.id,
                            value
                          )
                        }
                      />
                    </Form.Item>
                  </td>
                  <td>{cartItems[index]?.productVariant?.price.toLocaleString()} đ</td>
                  <td>
                    {(
                      cartItems[index]?.productVariant?.price *
                      cartItems[index]?.quantity
                    ).toLocaleString()}{" "}
                    đ
                  </td>
                  <td>
                    <Space>
                      <Button
                        danger
                        type="primary"
                        onClick={() => handleDelete(cartItems[index]?.id)}
                      >
                        Xóa
                      </Button>
                    </Space>
                  </td>
                </tr>
              )
            }
            )
          }
          }
        </Form.List>
      </tbody>
    </table>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
        Đặt Mua
      </Button>
    </Form.Item>
  </Form>;

};

export default CartPage;
