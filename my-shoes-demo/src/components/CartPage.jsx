// import React from 'react';
// import { useCart } from '../components/CartContext'; // Import CartContext
// import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng trang thanh toán
// import "../styles/CartPage.css"; // Import CSS cho trang giỏ hàng

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart(); // Lấy giỏ hàng và hàm từ CartContext
//   const navigate = useNavigate(); // Khai báo navigate để chuyển hướng tới trang thanh toán

//   // Tính tổng giá trị giỏ hàng
//   const getTotalPrice = () => {
//     return totalPrice;
//   };

//   // Xử lý hành động "Mua ngay" cho từng sản phẩm
//   const handleBuyNow = (product) => {
//     alert(`Đang tiến hành mua ngay "${product.name}" với kích thước ${product.size} và số lượng ${product.quantity}`);
//     navigate("/checkout"); // Điều hướng đến trang thanh toán
//   };

//   // Xử lý thanh toán giỏ hàng
//   const handleCheckout = () => {
//     if (cartItems.length > 0) {
//       alert("Đang chuyển đến trang thanh toán!");
//       navigate("/checkout"); // Điều hướng đến trang thanh toán
//     } else {
//       alert("Giỏ hàng của bạn đang trống!");
//     }
//   };

//   return (
//     <section className="cart-section">
//       <div className="cart-container">
//         <h2>Giỏ Hàng</h2>
//         {cartItems.length === 0 ? (
//           <p>Giỏ hàng của bạn trống</p>
//         ) : (
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Hình ảnh</th> {/* Cột Hình ảnh */}
//                 <th>Tên sản phẩm</th>
//                 <th>Kích thước</th>
//                 <th>Số lượng</th>
//                 <th>Giá tiền</th>
//                 <th>Tổng giá</th>
//                 <th>Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id + item.size}>
//                   <td>
//                     <img src={item.img} alt={item.name} className="cart-item-image" /> {/* Hiển thị hình ảnh sản phẩm */}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.size}</td>
//                   <td>
//                     <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
//                     {item.quantity}
//                     <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
//                   </td>
//                   <td>{item.price}</td>
//                   <td>{(item.price.replace(/\./g, "").replace("đ", "") * item.quantity).toLocaleString()} đ</td>
//                   <td className="cart-actions">
//                     <button onClick={() => removeFromCart(item.id, item.size)}>Xóa</button>
//                     <button onClick={() => handleBuyNow(item)} className="buy-now-btn">
//                       Mua ngay
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         <div className="cart-total">
//           <p><strong>Tổng cộng:</strong> {getTotalPrice().toLocaleString()} VND</p>
//         </div>

//         {/* Nút "Thanh toán" cho toàn bộ giỏ hàng */}
//         <div className="cart-buttons">
//           <button onClick={handleCheckout} className="checkout-btn">
//             Thanh toán giỏ hàng
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CartPage;

// import React, { useEffect } from "react";
// import { useCart } from "../components/CartContext"; // Import CartContext
// import { useNavigate } from "react-router-dom"; // Dùng để điều hướng trang thanh toán
// import "../styles/CartPage.css"; // Import CSS cho trang giỏ hàng

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, totalPrice, setCartItems } = useCart(); // Lấy và cập nhật giỏ hàng từ CartContext
//   const navigate = useNavigate(); // Khai báo navigate để chuyển hướng tới trang thanh toán

//   // Khởi tạo dữ liệu mẫu vào giỏ hàng
//   useEffect(() => {
//     const sampleCart = [
//       {
//         id: 1,
//         name: "Giày Adidas",
//         size: "42",
//         quantity: 2,
//         price: 1000000,
//         img: "https://via.placeholder.com/100", // Hình ảnh tạm thời
//       },
//       {
//         id: 2,
//         name: "Giày Nike",
//         size: "40",
//         quantity: 1,
//         price: 1200000,
//         img: "https://via.placeholder.com/100", // Hình ảnh tạm thời
//       },
//     ];
//     setCartItems(sampleCart); // Cập nhật giỏ hàng với dữ liệu mẫu
//   }, [setCartItems]);

//   // Tính tổng giá trị giỏ hàng
//   const getTotalPrice = () => {
//     return totalPrice;
//   };

//   // Xử lý hành động "Mua ngay" cho từng sản phẩm
//   const handleBuyNow = (product) => {
//     alert(`Đang tiến hành mua ngay "${product.name}" với kích thước ${product.size} và số lượng ${product.quantity}`);
//     navigate("/checkout"); // Điều hướng đến trang thanh toán
//   };

//   // Xử lý thanh toán giỏ hàng
//   const handleCheckout = () => {
//     if (cartItems.length > 0) {
//       alert("Đang chuyển đến trang thanh toán!");
//       navigate("/checkout"); // Điều hướng đến trang thanh toán
//     } else {
//       alert("Giỏ hàng của bạn đang trống!");
//     }
//   };

//   return (
//     <section className="cart-section">
//       <div className="cart-container">
//         <h2>Giỏ Hàng</h2>
//         {cartItems.length === 0 ? (
//           <p>Giỏ hàng của bạn trống</p>
//         ) : (
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Hình ảnh</th> {/* Cột Hình ảnh */}
//                 <th>Tên sản phẩm</th>
//                 <th>Kích thước</th>
//                 <th>Số lượng</th>
//                 <th>Giá tiền</th>
//                 <th>Tổng giá</th>
//                 <th>Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id + item.size}>
//                   <td>
//                     <img src={item.img} alt={item.name} className="cart-item-image" /> {/* Hiển thị hình ảnh sản phẩm */}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.size}</td>
//                   <td>
//                     <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
//                     {item.quantity}
//                     <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
//                   </td>
//                   <td>{item.price.toLocaleString("vi-VN")} đ</td>
//                   <td>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</td>
//                   <td className="cart-actions">
//                     <button onClick={() => removeFromCart(item.id, item.size)}>Xóa</button>
//                     <button onClick={() => handleBuyNow(item)} className="buy-now-btn">
//                       Mua ngay
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         <div className="cart-total">
//           <p>
//             <strong>Tổng cộng:</strong> {getTotalPrice().toLocaleString("vi-VN")} đ
//           </p>
//         </div>

//         {/* Nút "Thanh toán" cho toàn bộ giỏ hàng */}
//         <div className="cart-buttons">
//           <button onClick={handleCheckout} className="checkout-btn">
//             Thanh toán giỏ hàng
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CartPage;
 
import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext"; // Import CartContext
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng trang thanh toán
import "../styles/CartPage.css"; // Import CSS cho trang giỏ hàng

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, setCartItems } = useCart(); // Lấy và cập nhật giỏ hàng từ CartContext
  const navigate = useNavigate(); // Khai báo navigate để chuyển hướng tới trang thanh toán
  const [selectedItems, setSelectedItems] = useState([]); // Trạng thái lưu các sản phẩm đã chọn

  // Khởi tạo dữ liệu mẫu vào giỏ hàng
  useEffect(() => {
    const sampleCart = [
      {
        id: 1,
        name: "Giày Adidas",
        size: "42",
        quantity: 2,
        price: 1000000,
        img: "https://via.placeholder.com/100", // Hình ảnh tạm thời
      },
      {
        id: 2,
        name: "Giày Nike",
        size: "40",
        quantity: 1,
        price: 1200000,
        img: "https://via.placeholder.com/100", // Hình ảnh tạm thời
      },
    ];
    setCartItems(sampleCart); // Cập nhật giỏ hàng với dữ liệu mẫu
  }, [setCartItems]);

  // Tính tổng giá trị của các sản phẩm đã chọn
  const calculateTotalSelected = () => {
    return selectedItems.reduce((total, itemId) => {
      const selectedItem = cartItems.find(item => item.id === itemId);
      return selectedItem ? total + selectedItem.price * selectedItem.quantity : total;
    }, 0);
  };

  // Xử lý khi chọn hoặc bỏ chọn một sản phẩm
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(itemId => itemId !== id) // Bỏ chọn
        : [...prevSelectedItems, id] // Chọn
    );
  };

  // Tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return calculateTotalSelected();
  };

  // Xử lý hành động "Mua ngay" cho từng sản phẩm
  const handleBuyNow = (product) => {
    alert(`Đang tiến hành mua ngay "${product.name}" với kích thước ${product.size} và số lượng ${product.quantity}`);
    navigate("/checkout"); // Điều hướng đến trang thanh toán
  };

  // Xử lý thanh toán giỏ hàng
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert("Đang chuyển đến trang thanh toán!");
      navigate("/checkout"); // Điều hướng đến trang thanh toán
    } else {
      alert("Giỏ hàng của bạn đang trống!");
    }
  };

  return (
    <section className="cart-section">
      <div className="cart-container">
        <h2>Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn trống</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Chọn</th> {/* Thêm cột checkbox */}
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Kích thước</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                <th>Tổng giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id + item.size}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(item.id)}
                      checked={selectedItems.includes(item.id)} // Kiểm tra sản phẩm có được chọn không
                    />
                  </td>
                  <td>
                    <img src={item.img} alt={item.name} className="cart-item-image" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                  </td>
                  <td>{item.price.toLocaleString("vi-VN")} đ</td>
                  <td>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</td>
                  <td className="cart-actions">
                    <button onClick={() => removeFromCart(item.id, item.size)}>Xóa</button>
                    <button onClick={() => handleBuyNow(item)} className="buy-now-btn">
                      Mua ngay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-total">
          <p>
            <strong>Tổng cộng:</strong> {getTotalPrice().toLocaleString("vi-VN")} đ
          </p>
        </div>

        {/* Nút "Thanh toán" cho toàn bộ giỏ hàng */}
        <div className="cart-buttons">
          <button onClick={handleCheckout} className="checkout-btn">
            Thanh toán giỏ hàng
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
