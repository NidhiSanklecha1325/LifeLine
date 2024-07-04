import React from 'react';
import './banner.css' // Ensure to create this CSS file for styling

const BannerComponent = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>Great news! Now even more of us can make all the difference.</h2>
        <p>We’ve updated donor eligibility criteria related to the ‘mad cow’ disease outbreak.</p>
        <button className="btn btn-light btn-lg">Book now</button>
      </div>
    </div>
  );
};

export default BannerComponent;
