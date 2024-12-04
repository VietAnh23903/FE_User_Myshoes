import React, { useState } from 'react';
import '../styles/LoginForm.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!phone || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Xử lý logic đăng nhập ở đây (có thể gọi API)
    console.log('Phone:', phone, 'Password:', password);

    // Nếu thành công
    // navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công
    setErrorMessage(''); // Reset lỗi nếu có

    // Xử lý trường hợp thất bại (nếu API trả lỗi)
    // setErrorMessage('Thông tin đăng nhập không chính xác!');
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Đăng Nhập</h2>
          <form onSubmit={submitForm}>
            {/* Hiển thị lỗi nếu có */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Số điện thoại hoặc email
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Nút đăng nhập */}
            <button type="submit" className="login-button">
              Đăng Nhập
            </button>
            {/* Tùy chọn khác */}
            <div className="login-options">
              <a href="/forgot-password" className="forgot-password">
                Quên mật khẩu?
              </a>
              <a href="/register" className="register-link">
                Đăng ký tài khoản
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
