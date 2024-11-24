import React from 'react';
import '../styles/Ads.css';
import img1 from '../assets/banner1.png';
import img2 from '../assets/banner2.png';
import img3 from '../assets/banner3.jpg';

const Ads = () => {
  return (
    <div className="ads-container">
      <img src={img1} alt="Ad 1" className="ad-img" id='img1'/>
      <img src={img2} alt="Ad 2" className="ad-img" id='img2'/>
      <img src={img3} alt="Ad 3" className="ad-img" id='img3'/>
    </div>
  );
};

export default Ads;
