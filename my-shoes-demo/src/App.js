import React from 'react';
import './App.css';
import Navbar from './components/Navbar1';
import Banner from './components/Banner1';
import ProductList from './components/ProductList1';
import Ads from './components/Ads';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Ads/>
      <ProductList />
    </div>
  );
}

export default App;
