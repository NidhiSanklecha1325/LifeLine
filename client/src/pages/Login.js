import React, {useState} from 'react';
import { handleLogin, handleRegister } from '../services/authService';
import NavBarComponent from '../components/shared/Nav';
import Footer from '../components/shared/Footer';
import Form from 'react-bootstrap/Form';
import{useSelector} from 'react-redux';
import Spinner from '../components/shared/Spinner';
import { Button } from 'react-bootstrap';

const Login = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode,setPostalcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState("true");

  

  const toggleRegister = () => {
    setIsRegistering(!isRegistering );
  }

  const checkIfPasswordsMatches = (pass1,pass2) => {
    if(pass1 == pass2){
      return true
    }else{
      return false
    }
  }


    const {loading,error} = useSelector(state => state.auth)
    return (
      <>
      {error && <span>{alert(error)}</span>}
     { loading ? <Spinner/> : (
        <>
          <NavBarComponent/>
          <div>
           
            {!isRegistering ? (
              <Form onSubmit={(event) => {
                if(checkIfPasswordsMatches(password,confirmPassword)){
                  return handleRegister(event,firstName,lastName,email,password,dateOfBirth,role,postalCode,phoneNumber)
                }else{
                  alert("Passwords don't match.")
                }
                
  
              }}>
                <h2>Register</h2>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={firstName} name='firstName' type='text' onChange={(e) => setFirstName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value={ lastName} onChange={(e) => setLastName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control type="date" name="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" name="phoneNumber" value={ phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" name="postalCode" value={ postalCode} onChange={(e) => setPostalcode(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select aria-label="Default select example" name='role' value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Select</option>
          <option value="donor">Donor</option>
          <option value="receiver">Receiver</option>
        </Form.Select>
                </Form.Group>
                <Button type='submit'>Register</Button>
                
                <p>Already have an account? <a style={{color: "red"}} onClick={toggleRegister}>Click Here</a> </p>
              </Form>
            ) : (
              <Form onSubmit={(event)=>{
                return handleLogin(event,email,password,role)
              }}>
                <h2>Login</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select aria-label="Default select example" name='role' value={role} onChange={(e) => setRole(e.target.value)}>
          
          <option value="donor">Donor</option>
          <option value="receiver">Receiver</option>
        </Form.Select>
                </Form.Group>
                <Button type="submit">Login</Button>
                <p>Don't have an account? <a style={{color: "red"}} onClick={toggleRegister}>Click Here</a></p>
              </Form>
            )}
          </div>
          <Footer/>
          </>
      )
    }
      
      </>
    );
  }


export default Login;
