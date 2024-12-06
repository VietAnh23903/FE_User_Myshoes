import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar1.css';
import searchIcon from '../assets/search.png';
import { Link } from 'react-router-dom';


const API_URL="/cart";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
    const callAPI=async ()=>{

    };
    callAPI();
  }, []);

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

        {!isLogin ? <>
          <Link to="/login">
            <button className="sign-in">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="sign-up">Đăng ký</button>
          </Link>
        </> :
          <>
            <Link to="/cart">
              <button className="cart">Giỏ hàng</button>
            </Link>
            <Link to="/">
            <button className="cart" onClick={() =>{
               localStorage.removeItem("token");
               localStorage.removeItem("user");
               setIsLogin(false);
            }}>Đăng xuất</button>
            </Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
