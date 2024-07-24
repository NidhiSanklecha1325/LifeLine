import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/styles.css';
import Logo from '../../lifeline_logo.png';
import {Nav,Navbar,Button, Container} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
  const {user} = useSelector((state) => state.auth)
  
   
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.clear()
    
    alert('Logout Successfully')
    navigate('/login')
  }
  const handleLogin = () =>{
    
    navigate('/login')
  }
    return (
      <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Logo" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/inventory" className="nav-link-custom">Inventory</Nav.Link>
            <Nav.Link href="/donor" className="nav-link-custom">Donor</Nav.Link>
            <Nav.Link href="/add-donor-centers" className="nav-link-custom">Add Donor Centers</Nav.Link>
          </Nav>
          {user && user.firstName ? (
            <>
              <Navbar.Text className="text-white mr-3">
                Welcome: {user.firstName}
              </Navbar.Text>
              <Button type="button" onClick={handleLogout} className="btn-custom">Logout</Button>
            </>
          ) : (
            <Button type="button" onClick={handleLogin} className="btn-custom">Login</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      /* <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" height="50" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */
    );
  };
  
  export default NavBarComponent;