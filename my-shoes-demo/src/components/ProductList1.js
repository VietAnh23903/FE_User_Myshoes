
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ProductList1.css";
import axios from 'axios';
import axiosInstance from '../config/axiosConfig';

const API_URL = "/product?page=0&size=100&sortBy=rating_desc";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi (nếu có)

  const itemsPerPage = 35; // Số sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(API_URL);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API không trả về dữ liệu JSON hợp lệ");
        }
        const data = await response.json();

        // Truy cập đúng trường `data.data` trong API
        setProducts(data.data.data || []); 
        setIsLoading(false); 
      } catch (err) {
        setError(err.message); 
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Tổng số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Lấy danh sách sản phẩm của trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
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
            {currentProducts.map((product) => (
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

          {/* Phân trang */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Trang trước
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
