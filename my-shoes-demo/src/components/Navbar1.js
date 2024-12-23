import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar1.css';
import searchIcon from '../assets/search.png';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dropdown, Form, Image, Input, Modal, notification, Space, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UploadOutlined } from "@ant-design/icons";
import fetchAPI from '../config/axiosConfig';
import Loading from './Loading';

const API_URL = "/cart";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [attr, setAttr] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);


  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message,
      placement: 'top',
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditing(false); // Khóa form khi modal mở
  };

  const handleUpdate = () => {
    form.validateFields()
      .then((values) => {
        const body = Object.keys(values).reduce((acc, key) => {
          if (values[key] !== '' && values[key]) {
            acc[key] = values[key];
          }
          return acc;
        }, {});
        if (avatar != null) {
          body.avatar = avatar;
        }
        const callAPI = async (body) => {
          try {
            setLoading(true);
            console.log(body);
            const response = await fetchAPI.patch("/user/profile", body, {
              "Content-Type": "multipart/form-data"
            });
            console.log(response);
            setUser(response);
            localStorage.setItem("user", JSON.stringify(response));
            openNotification("success", "Cập nhật thành công!");
          } catch (error) {
            console.log(error);
            openNotification("error", "Cập nhật thất bại!");
          } finally {
            setIsEditing(false);
            setAvatar(null);
            setLoading(false);
          }
        }
        callAPI(body);
      })
      .catch((info) => {
        console.log("Lỗi xác thực:", info);
      });

  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.setFieldsValue(user);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    setAvatar(file);
    setUploading(false);
    return false;
  };


  const items = [
    {
      key: '1',
      label: (
        <Link onClick={() => showModal()} className='dropdownLI'>
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/cart" className='dropdownLI'>
          Giỏ hàng
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/order-tracking" className='dropdownLI'>
          Theo dõi đơn hàng
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to="/" className='dropdownLI' onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLogin(false);
        }}>
          Đăng xuất
        </Link>
      ),
    },
  ];


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      if (user.avatar) {
        setAttr({ src: user.avatar })
      } else {
        setAttr({ icon: < UserOutlined /> })
      }
      form.setFieldsValue(user);
    }

  }, [form]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchQuery}`)
    console.log(searchQuery);
  };


  return (
    <nav className="navbar">
      {contextHolder}
      <div className="logo">
        <Link to="/" className="home-link">
          <h3>MyShoes</h3>
        </Link>
        <i className="slogan">Giày chính hãng!</i>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="search"
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </form>

      <div className="auth-cart">

        {!isLogin ? <>
          <Link to="/login">
            <button className="sign-in">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="sign-up">Đăng ký</button>
          </Link>
        </> :
          <>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Avatar className='avatar' size={48} {...attr} />
            </Dropdown>

            <Modal
              title="Thông Tin Người Dùng"
              open={isModalVisible}
              onOk={isEditing ? handleUpdate : undefined}
              onCancel={handleCancel}
              footer={
                isEditing ? (
                  <Space>
                    <Button onClick={handleCancelEdit}>Hủy</Button>
                    <Button type="primary" onClick={handleUpdate}>
                      Cập nhật
                    </Button>
                  </Space>
                ) : (
                  <Button type="primary" onClick={() => setIsEditing(true)}>
                    Cập nhật thông tin
                  </Button>
                )
              }
            >
              {loading ? <Loading /> : ""}
              <Form
                requiredMark={false}
                form={form}
                layout="vertical"
                disabled={!isEditing}
              >
                <Space direction="vertical" size="large" style={{ display: "flex" }}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                  >
                    <Input placeholder="Nhập email của bạn" />
                  </Form.Item>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                  <Form.Item
                    label="Ảnh đại diện"
                  >
                    <Space direction='vertical'>
                      {user.avatar && user.avatar != null && avatar == null && (
                        <Image
                          src={user.avatar}
                          alt="avatar"
                          width={100}
                          height={100}
                          style={{
                            marginBottom: "10px",
                            borderRadius: "8px",
                            border: "1px solid #d9d9d9",
                          }}
                          preview={false}
                        />
                      )}
                      {isEditing && <Upload
                        maxCount={1}
                        listType="picture-card"
                        beforeUpload={handleUpload}
                        onRemove={() => setAvatar(null)}
                        showUploadList={true}
                        disabled={!isEditing}
                      >
                        {avatar == null && isEditing ? <Button
                          icon={<UploadOutlined />}
                          loading={uploading}
                          disabled={!isEditing}
                        >

                        </Button> : ""}

                      </Upload>}
                    </Space>

                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                  >
                    <Input.Password placeholder="Nhập mật khẩu của bạn" />
                  </Form.Item>
                </Space>
              </Form>
            </Modal>

          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
