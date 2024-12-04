import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = ({ products }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho: "{searchQuery}"</h2>
      {filteredProducts.length > 0 ? (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}₫</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Không tìm thấy sản phẩm nào phù hợp.</p>
      )}
    </div>
  );
};

export default SearchResults;
