
import './App.css';
import React from 'react';
import {  Route } from 'react-router-dom';
import Login from './pages/Login.js'; // Assuming Login.jsx exports default correctly
import { Routes } from 'react-router-dom'; 
import Home from './pages/Home.js';
/* class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    );
  }
}
class IssueList extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <hr />
        <div style={{ height: '100vh', backgroundImage: 'url("/img1.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
        </div>
        <hr />
        <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
          This is a footer.
        </footer>
      </div>
    );
  }
} */
function App() {
  return (
    <div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </div>
  );
}

export default App;
