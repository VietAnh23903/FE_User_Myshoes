import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar1.css';
import searchIcon from '../assets/search.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className="navbar">
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
        <Link to="/login">
          <button className="sign-in">Đăng nhập</button>
        </Link>
        <Link to="/register">
          <button className="sign-up">Đăng ký</button>
        </Link>
        <Link to="/cart">
          <button className="cart">Giỏ hàng</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
