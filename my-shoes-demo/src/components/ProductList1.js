import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ProductList1.css";
import fetchAPI from '../config/axiosConfig';
import { Card, Flex, Pagination, Space } from 'antd';
import Loading from './Loading';

const { Meta } = Card;
const API_URL = "/product";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi (nếu có)

  const itemsPerPage = 36; // Số sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchAPI.get(API_URL, {
          page: currentPage - 1,
          size: itemsPerPage
        });
        const data = response.data;
        setProducts(data || []);
        setTotalPages(response.totalPage || 1)
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
    setIsLoading(true)
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="product-section">
      <h2 className="product-title">SẢN PHẨM MỚI</h2>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p style={{ color: "red" }}>
          Đã xảy ra lỗi: {error}. Vui lòng thử lại sau.
        </p>
      ) : (
        <>
          <Flex gap="middle" align="center" wrap justify='space-around' >
            {products && products.map((product) => (
              <Link to={`/product/${product.id}`}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={product.imageUrl || "https://via.placeholder.com/150"} />}
                >
                  <Meta title={product.name} description={
                    <>
                      <Flex align='center' justify='center' vertical>
                        <div className="product-price">{product.price.toLocaleString()}đ</div>
                        <Space direction='vertical' align='center' >
                          <div className="product-rating">
                            {product.rating > 0 ? product.rating : "Chưa có đánh giá"} ⭐
                          </div>
                          <div >Đã bán: {product.sold}</div>
                        </Space>
                      </Flex>
                    </>

                  } />
                </Card>
              </Link>
            ))}
          </Flex>

          <Pagination align='center' defaultCurrent={currentPage} total={totalPages} defaultPageSize={1} onChange={handlePageChange} />
        </>
      )
      }
    </div >
  );
};

export default ProductList;
