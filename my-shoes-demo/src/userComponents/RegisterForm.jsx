import React from 'react';
import '../styles/RegisterForm.css';

const Register = () => {
  const submitForm = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký ở đây
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Đăng Ký Tài Khoản</h2>
          <form onSubmit={submitForm}>
            {/* Họ và tên */}
            <div className="form-group">
              <label htmlFor="fullname" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="form-input"
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Nhập email"
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
              <label htmlFor="confirm-password" className="form-label">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
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
