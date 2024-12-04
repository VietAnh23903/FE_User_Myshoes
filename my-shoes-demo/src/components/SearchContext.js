import React, { createContext, useState } from 'react';

// Tạo Context
export const SearchContext = createContext();

// Tạo Provider
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái tìm kiếm

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
