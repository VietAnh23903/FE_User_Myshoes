import React from 'react';
import '../styles/Navbar1.css';
import searchIcon from '../assets/search.png';  // search-icon


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h3>MyShoes</h3>
        <i className='slogan'>Giày chính hãng!</i>
      </div>

      <div className="search-bar">
        <input className='search' type="text" placeholder="Tìm kiếm sản phẩm..." />
        <button className="search-btn">
          <img src={searchIcon} alt='Search' className='search-icon'></img>
        </button>
      </div>

      <div className="auth-cart">
        <button className="sign-in">Đăng nhập</button>
        <button className="sign-up">Đăng kí</button>
        <button className="cart">Giỏ hàng</button>
      </div>
    </nav>
  );
};

export default Navbar;
