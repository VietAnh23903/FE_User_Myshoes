import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy id sản phẩm từ URL
import { useCart } from "../components/CartContext"; // Để thêm sản phẩm vào giỏ hàng
import fetchAPI from '../config/axiosConfig';
import "../styles/ProductDetail.css";
import Loading from './Loading';
import { Flex, Image, Radio } from "antd";

const API_URL = "/product";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const { addToCart } = useCart(); // Hàm để thêm sản phẩm vào giỏ hàng
  const [productDetail, setProductDetail] = useState({});
  const [prirmaryImage, setPrimaryImage] = useState("");
  const [images, setImages] = useState("");
  const [variants, setVariants] = useState("");
  const [price, setPrice] = useState(0);
  const [stock,setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetchAPI.get(API_URL + `/${id}`);
      setPrimaryImage(response.images.find(item => item.isPrimary));
      setImages(response.images.filter(item=>!item.isPrimasry));
      setProductDetail(response);
      setVariants(response.productVariants);
      setPrice(productDetail.price);
      const totalStock = response.productVariants.reduce((sum, product) => sum + product.stock, 0);
      setStock(totalStock);
      setIsLoading(false);
    }
    fetchProduct();


  }, []);


  // const [quantity, setQuantity] = useState(1);
  // const [size, setSize] = useState(null); // Thêm state cho size

  // // Tính tổng tiền
  // const calculateTotal = () => {
  //   const price = parseFloat(product.price.replace(/\./g, "").replace("đ", ""));
  //   return (price * quantity).toLocaleString("vi-VN") + "đ";
  // };

  // // Hàm xử lý tăng giảm số lượng
  // const handleQuantityChange = (type) => {
  //   setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : prev));
  // };

  // Xử lý chọn size
  const handleSizeChange = (e) => {
    const value = e.target.value;
    setPrice(value.price);
    setStock(value.stock);
  };

  // // Xử lý thêm vào giỏ hàng
  // const handleAddToCart = () => {
  //   if (size) {
  //     addToCart({ ...product, quantity, size });
  //     alert(`Đã thêm "${product.name}" với size ${size} vào giỏ hàng thành công!`);
  //   } else {
  //     alert("Vui lòng chọn size!");
  //   }
  // };

  // // Xử lý mua ngay
  // const handleBuyNow = () => {
  //   if (size) {
  //     alert(`Mua ngay "${product.name}" với size ${size} và số lượng ${quantity}!`);
  //   } else {
  //     alert("Vui lòng chọn size!");
  //   }
  // };

  return (
    <div className="product-detail">
      {isLoading ?
        <Loading /> : <>
          <Image
            width={200}
            src={prirmaryImage}
          />
          <div className="product-detail-left">
            <img src={prirmaryImage.url} alt={productDetail.name} className="product-detail-image" />
          </div>
          <div className="product-detail-right">
            <h1 className="product-name">{productDetail.name}</h1>
            <div className="product-rating-sold">
              <span className="product-rating">⭐ {productDetail.rating}/5.0</span>
              <span className="product-sold">{productDetail.sold} đã bán</span>
            </div>
            <div className="product-price-section">
              <span className="product-price">{productDetail.price}</span>
            </div>
            <div>Số lượng: {stock}</div>
            <div className="product-size">
              <h3>Chọn size:</h3>
              <Radio.Group onChange={handleSizeChange}>
                {variants.map(item=>{
                  const value = Object.values(item.attributes)[0];
                  return (<Radio key={"size"+value} value={item}>{value}</Radio>)
                })}
              </Radio.Group>
            </div>
            {/*
            <div className="product-quantity">
              <h3>Số lượng:</h3>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange("decrease")}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange("increase")}>+</button>
              </div>
            </div>
            <div className="product-total">
              Tổng tiền: <span className="total-amount">{calculateTotal()}</span>
            </div>
            <div className="product-buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Mua hàng ngay
              </button>
            </div> */}
          </div>

        </>}
    </div>
  );
};

export default ProductDetail;
