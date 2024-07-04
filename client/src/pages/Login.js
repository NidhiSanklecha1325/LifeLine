import React from 'react';
import { handleLogin, handleRegister } from '../services/authService';
import NavBarComponent from './Nav';
import Footer from './Footer';
import Form from 'react-bootstrap/Form';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistering: false,
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        dateofBirth : '',
        password: '',
        confirmPassword: ''
      
      
    };
  }

  toggleRegister = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  }

  handleLogin = (event) => {
    
    return handleLogin(event,this.state.email,this.state.password,this.state.role)
  }

  handleRegister =  (event) => {
    
   /*  const query = `mutation addUser($userVar : UserInput!){
      addUser(user: $userVar){
      id}
  }`; 

  const result = await graphQLFetch(query, {userVar : user});
  if(result){
    console.log(result)
  }*/

   return handleRegister(event,this.state.firstName,this.state.lastName,this.state.email,this.state.password,this.state.dateOfBirth,this.state.role)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <>
      <NavBarComponent/>
      <div>
       
        {this.state.isRegistering ? (
          <form onSubmit={this.handleRegister}>
            <h2>Register</h2>
            <label>
              First Name:
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
            </label>
            <br />
            <label>
              Last Name:
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
            </label>
            <br/>
            <label>
              Role:
              <Form.Select aria-label="Default select example" name='role' value={this.state.role} onChange={this.handleChange}>
      
      <option value="donor">Donor</option>
      <option value="receiver">Receiver</option>
    </Form.Select>
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </label>
            <br />
            <label>
              Date of Birth:
              <input type="date" name="date" value={this.state.date} onChange={this.handleChange} required />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </label>
            <br />
            <label>
              Confirm Password:
              <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required />
            </label>
            <br />
            <button type="submit">Register</button>
            <p>Already have an account? <a style={{color: "red"}} onClick={this.toggleRegister}>Click Here</a> </p>
          </form>
        ) : (
          <form onSubmit={this.handleLogin}>
            <h2>Login</h2>
            
            <label>
              Email:
              <input type="email" name="email"  value={this.state.email} onChange={this.handleChange} required />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </label>
            <br />
            <Form.Select aria-label="Default select example" name='role' value={this.state.role} onChange={this.handleChange}>
      <option>Role</option>
      <option value="donor">Donor</option>
      <option value="receiver">Receiver</option>
    </Form.Select>
    <br/>
            <button type="submit">Login</button>
            <p>Don't have an account? <a style={{color: "red"}} onClick={this.toggleRegister}>Click Here</a></p>
          </form>
        )}
      </div>
      <Footer/>
      </>
    );
  }
}

export default Login;
