import React, { useEffect, useState } from 'react';
import '../styles/Banner1.css'; // Đường dẫn tương đối
import fetchAPI from '../config/axiosConfig';
import { Link } from 'react-router-dom';


const API_URL = "/category";
const Banner = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const callAPI = async () => {
      const response = await fetchAPI.get(API_URL);
      setCategories(response);
    };
    callAPI();

  }, []);
  return (
    <nav className='navbar2'>
      <ul className="nav-links">
        {categories && categories.map((item, id) => {
          return <li key={"item +" + id}>
            <Link to={`/product/category/${item.id}`}>{item.name}</Link>
          </li>
        })}
      </ul>
    </nav >
  );
};

export default Banner;
