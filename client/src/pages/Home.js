import React from 'react';
import NavBarComponent from './Nav';
import Footer from './Footer';
import BannerComponent from './Banner';
import './styles.css'
const Home = () => {
  return (
    <>
      <NavBarComponent />
      <header className="bg-primary text-white text-center py-5 mb-4">
        <div className="container">
          <h1 className="display-4">Welcome to LifeLine</h1>
          <p className="lead">Find nearby donor centers and filter by blood type availability</p>
        </div>
      </header>
      <div className="container mt-5">
        <div className="form-group">
          <label htmlFor="location">Search Nearby Donor Centers</label>
          <input type="text" className="form-control" id="location" placeholder="Enter your location" />
        </div>
        <div className="form-group">
          <label htmlFor="bloodType">Filter by Blood Type Availability</label>
          <select className="form-control" id="bloodType">
            <option>All</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          <button className="btn btn-danger btn-lg btn-block mt-3">Search</button>
        </div>
      </div>
      <BannerComponent />
      <Footer />
    </>
  );
};

export default Home;