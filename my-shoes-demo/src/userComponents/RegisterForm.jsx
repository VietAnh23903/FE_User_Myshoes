import React from 'react';
import '../styles/RegisterForm.css';
import { notification } from 'antd';
import fetchAPI from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const USER_API = "/auth/signup";

const Register = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const openNotification = (type, message) => {
    api[type]({
      message,
      placement: 'top',
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      openNotification('error', "Mật khẩu nhập lại không khớp!");
      return;
    } else {
      try {
        const body = { fullName, email, username, password };
        await fetchAPI.post(USER_API, body);
        navigate("/login");
      } catch (e) {
        openNotification('error', "Tên tài khoản đã tồn tại!");
      }
    }


    // Xử lý logic đăng ký ở đây
  };

  return (
    <section className="register-section">
      {contextHolder}
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Đăng Ký Tài Khoản</h2>
          <form onSubmit={submitForm}>
            {/* Họ và tên */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Nhập địa chỉ gmail"
                required
              />
            </div>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Tài khoản
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Nhập tài khoản"
                required
              />
            </div>
            {/* Mật khẩu */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            {/* Nhập lại mật khẩu */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Xác nhận mật khẩu"
                required
              />
            </div>
            {/* Nút đăng ký */}
            <button type="submit" className="register-button">
              Đăng Ký
            </button>
            {/* Tùy chọn khác */}
            <div className="register-options">
              <span>Bạn đã có tài khoản?</span>
              <a href="/login" className="login-link">
                Đăng nhập
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
