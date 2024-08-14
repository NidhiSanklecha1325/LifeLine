import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import '../../pages/styles.css';
import Logo from '../../lifeline_logo.png';
//import Logo from '../../images/logo_temp.png'
import { Nav, Navbar, Button, Container,Toast ,ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
  var userDetail = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
    const [message,setMessage] = useState("")

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    
    setShow(true)
      setMessage("You are logged out.")
      setTimeout(() => {
        navigate('/');
      },1000
      )
  }
  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <>
    <ToastContainer
          className="p-3"
          position={'top-center'}
          style={{ zIndex: 100 }}
        >
        <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={1000} autohide animation>
          
          <Toast.Body className='text-white p-4'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
    <Navbar expand="lg" className="navbar-custom">
      <Container className="container-custom">
        <Navbar.Brand as={Link} to="/" className="logo-container">
          <img src={Logo} alt="Logo" className="logo-img" />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          {userDetail && userDetail.firstName ? (
            <>
              <Navbar.Text className="navbar-text-custom">
                Welcome: {userDetail.firstName} {userDetail.lastName}!
              </Navbar.Text>
              <Button type="button" onClick={handleLogout} className="btn-custom">Logout</Button>
            </>
          ) : (
            <Button type="button" onClick={handleLogin} className="btn-custom">Login</Button>
          )}
        </div>
      </Container>
    </Navbar>
    </>
  );
}

export default NavBarComponent;
