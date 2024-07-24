import React from 'react'
import Layout from '../../components/shared/Layout'
import Nav from 'react-bootstrap/Nav';
import {Row, Col, Button} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';


const Profile = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <Layout>
      <h2>My Profile</h2>
      <Tab.Container id="fill-tab-example" defaultActiveKey="myProfile" fill justify className="mb-3">
      <Row>
        
          <Nav variant="pills" >
            <Nav.Item>
              <Nav.Link eventKey="myProfile">My profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="changePassword">Change Password</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="changeEmail">Change Email</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="removeAccount">Remove Online Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="eligibilityQuiz">Eligibility Quiz</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="myProfile">
            <Form>
                <h3>Personal Information</h3>
               
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder={user.firstName} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder={user.lastName} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dateOfBirth">Date Of Birth</Form.Label>
                    <Row>
                        <Col sm>
                        <Form.Select id="dateOfBirth" disabled>
                        <option>02</option>
                    </Form.Select>
                        </Col>
                        <Col sm>
                        <Form.Select id="dateOfBirth" disabled>
                        <option>Feb</option>
                    </Form.Select>
                        </Col>
                        <Col sm>
                        <Form.Select id="dateOfBirth" disabled>
                        <option>1997</option>
                    </Form.Select>
                        </Col>
                    </Row>
                   
                    
                    
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Login ID</Form.Label>
                    <Form.Control placeholder={user.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control placeholder={user.email} disabled />
                </Form.Group>
                <br/>
                <h3>Contact Information</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control placeholder="" disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control placeholder={user.email} disabled />
                </Form.Group>
                </Form>
                

                
            </Tab.Pane>
            <Tab.Pane eventKey="changePassword">
                
                <Form>
                <h3>Update My Password</h3>
                <Form.Label htmlFor="currentPassword">Current Password</Form.Label>
      <Form.Control
        type="password"
        id="currentPassword"
        placeholder='Current Password'
        aria-describedby="passwordHelpBlock"
      />
      <Form.Label htmlFor="newPassword">New Password</Form.Label>
      <Form.Control
        type="password"
        id="newPassword"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Label htmlFor="repeatPassword">Repeat Password</Form.Label>
      <Form.Control
        type="password"
        id="repeatPassword"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      <Button type='submit'>Save Changes</Button>
                </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="changeEmail"><Form>
            <h3>Change Email</h3>
            <p>You are currently logged in with your {user.role} account <b>{user.email}</b></p>
            <Form.Label htmlFor="newEmail">New email</Form.Label>
      <Form.Control
        type="email"
        id="newEmail"
        placeholder='New email'
      />
      <Form.Label htmlFor="confirmNewEmail">Confirm new email</Form.Label>
      <Form.Control
        type="email"
        id="confirmNewEmail"
        placeholder='Confirm new email'
      />
      <p>An email will be sent to <b>{user.email}</b> in order to confirm this change.</p>
      <Button type='submit'>Sent Confirmation</Button>
            </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="removeAccount"><h3>Remove Online Account</h3>
            <p>
            Are you sure you would like to delete your online account?
<br /><br />
Your donor profile remains active, but you will no longer be able to login to the application.
            </p>
            <Button type='button'>Delete Account</Button>
            </Tab.Pane>
            <Tab.Pane eventKey="eligibilityQuiz">Eligibility Quiz</Tab.Pane>
          </Tab.Content>
        
      </Row>
    </Tab.Container>
    </Layout>
  )
}

export default Profile
