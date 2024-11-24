import React from 'react';
import '../styles/Banner1.css'; // Đường dẫn tương đối


const Banner = () => {
  return (
    <nav className='navbar2'>
        <ul className="nav-links">
            <li><a href="https://myshoes.vn/giay-nike">Giày Nike</a></li>
            <li><a href="https://myshoes.vn/giay-adidas">Giày Adidas</a></li>
            <li><a href="https://myshoes.vn/giay-lacoste">Giày Lacoste</a></li>
            <li><a href="https://myshoes.vn/giay-puma">Giày Puma</a></li>
            <li><a href="https://myshoes.vn/giay-asics">Giày Asics</a></li>
            <li><a href="https://myshoes.vn/giay-the-thao-chinh-hang">Giày Thể Thao</a></li>
        </ul>
    </nav>
  );    
};

export default Banner;
