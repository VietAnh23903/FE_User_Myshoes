
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ProductList1.css";
import fetchAPI from '../config/axiosConfig';
import { Pagination } from 'antd';

const API_URL = "/product";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi (nếu có)

  const itemsPerPage = 35; // Số sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchAPI.get(API_URL,{
          page:currentPage-1,
          size:itemsPerPage
        });
        const data = response.data;        
        setProducts(data || []);
        setTotalPages(response.totalPage||1)        
        setIsLoading(false);        
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

console.log("render");


  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="product-section">
      <h2 className="product-title">SẢN PHẨM MỚI</h2>
      {isLoading ? (
        <p>Đang tải sản phẩm...</p>
      ) : error ? (
        <p style={{ color: "red" }}>
          Đã xảy ra lỗi: {error}. Vui lòng thử lại sau.
        </p>
      ) : (
        <>
          <div className="product-list">
            {products&& products.map((product) => (
              <div key={product.id} className="product-item">
                <Link to={`/product/${product.id}`}>
                  <div className="product-card">
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="product-img"
                    />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price.toLocaleString()}đ</p>
                    <p className="product-rating">
                      ⭐ {product.rating > 0 ? product.rating : "Chưa có đánh giá"}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Pagination align='center' defaultCurrent={currentPage} total={totalPages} defaultPageSize={1} onChange={handlePageChange}  />
        </>
      )}
    </div>
  );
};

export default ProductList;
