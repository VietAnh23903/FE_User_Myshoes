import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy id sản phẩm từ URL
import fetchAPI from '../config/axiosConfig';
import "../styles/ProductDetail.css";
import Loading from './Loading';
import { Flex, Image, Input, notification, Radio } from "antd";

const API_URL = "/product";
const API_CART = "/cart";
const API_REVIEW_URL = "/review/product";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [productDetail, setProductDetail] = useState({});
  const [prirmaryImage, setPrimaryImage] = useState("");
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Số lượng
  const [reviews, setReviews] = useState([]);
  const [idSelected, setIdSelected] = useState(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message,
      placement: 'top',
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetchAPI.get(API_URL + `/${id}`);
      const reveiewsResponse = await fetchAPI.get(API_REVIEW_URL + `/${id}`);
      if (reveiewsResponse) {
        setReviews(reveiewsResponse.data);
      }
      if (response) {
        setPrimaryImage(response.images.find(item => item.isPrimary));
        setImages(response.images);
        setProductDetail(response);
        setVariants(response.productVariants);
        setPrice(response.price);
        const totalStock = response.productVariants.reduce((sum, product) => sum + product.stock, 0);
        setStock(totalStock);
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, []);
  console.log(reviews);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setPrice(value.price);
    setStock(value.stock);
    setIdSelected(value.id);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= stock) setQuantity(value);
  };

  const addToCart = () => {
    if (!idSelected) {
      openNotification('error', "vui lòng chọn kích thước");
      return;
    }
    const callToCart = async () => {
      const response = await fetchAPI.post(API_CART + `/${idSelected}`, { quantity });
      console.log(response);
      openNotification('success', "Thêm vào giỏ hàng thành công");

    }
    callToCart();
    console.log("add to cart", idSelected);

  }


  return (
    <>
      {contextHolder}
      {isLoading ? <Loading /> : <div className="product-detail">
        {/* Phần bên trái */}
        <div className="product-detail-left">
          <div className="main-image">
            <Image width={"100%"} height={"100%"} src={prirmaryImage.url} />
          </div>
          <div className="thumbnail-images">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-item ${prirmaryImage.id === img.id ? "active" : ""}`}
                onMouseEnter={() => setPrimaryImage(img)}
              >
                <img src={img.url} alt={`Thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="product-detail-right">
          <h1 className="product-name">{productDetail.name}</h1>
          <div className="product-rating-sold">
            <span>⭐ {productDetail.rating}/5.0</span>
            <b>|</b>
            <span>{productDetail.sold} đã bán</span>
          </div>
          <div className="product-price-section">
            <span className="product-price">
              Giá bán: {price.toLocaleString()}đ
            </span>
          </div>
          <div className="product-size">
            <h3>Kích thước:</h3>
            <Radio.Group onChange={handleSizeChange}>
              {variants.map(item => {
                const value = Object.values(item.attributes)[0];
                return (<Radio key={"size" + value} value={item}>{value}</Radio>)
              })}
            </Radio.Group>
          </div>
          <div className="product-quantity">
            <h3>Tồn kho: {stock}</h3>
            <div className="quantity-control">
              <h3>Số lượng: </h3>
              <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                max="99"
              />
              <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>
          </div>
          <div className="product-buttons">
            <button className="add-to-cart" onClick={addToCart}>Thêm vào giỏ hàng</button>
            <button className="buy-now">Mua ngay</button>
          </div>
        </div>

        {/* Phần đánh giá sản phẩm */}
        <section className="product-reviews">
          <h2>Đánh giá sản phẩm</h2>
          <div className="reviews-summary">
            <div className="rating-summary">
              <span className="average-rating">
                {productDetail.rating} / 5 ⭐
              </span>
              <span className="total-reviews">
                {reviews.length} Đánh giá
              </span>
            </div>
          </div>

          {/* Danh sách đánh giá */}

          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <img
                  src={review.user.avatar}
                  alt={review.user.username}
                  className="review-avatar"
                />
                <div className="review-info">
                  <span className="review-username">{review.user.username}</span>
                  <span className="review-rating">⭐ {review.rating}</span>
                  <span className="review-date">
                    {new Date(review.reviewedAt).toLocaleString()} | Phân loại hàng: {review.product.variants["kích cỡ"]}
                  </span>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-images">
                {review.imageUrls.map((img, index) => (
                  <img key={index} src={img} alt={`Review Image ${index}`} />
                ))}
              </div>
            </div>
          ))}

        </section>
      </div>}
    </>

  );

};



export default ProductDetail;
