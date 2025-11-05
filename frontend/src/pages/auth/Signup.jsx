import React, { useState } from 'react'
import { Form, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Signup.css';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    userid: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    userName: '',
    password: '',
    userType: ''
  });

  const clearTextFields = () => {
    setFormData({
      userid: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      userName: '',
      password: '',
      userType: ''
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    try {
      const response = await axios.post(`${API_URL}/users`, formData);
      alert('Signup successful! Please login.');
      // console.log(response.data);
      clearTextFields();
      navigate("/");
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed!');
    }
  }

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  
  return (
    <Container fluid className='signup-container'>
      <Row className='justify-content-center align-items-center min-vh-100'>
        <Col md={4}>
          <Card className='shadow-lg p-4 rounded-4'>
            <Card.Body>
              <h3 className='text-center mb-4'>Create an Account</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formUserid' className='mb-3'>
                  <Form.Label>User ID</Form.Label>
                  <Form.Control type='text' name='userid' placeholder='Enter your user ID' value={formData.userid} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId='formFname' className='mb-3'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type='text' name='firstName' placeholder='Enter your first name' value={formData.firstName} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId='formLname' className='mb-3'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type='text' name='lastName' placeholder='Enter your last name' value={formData.lastName} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId='formEmail' className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId='formGender' className='mb-3'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as='select' name='gender' value={formData.gender} onChange={handleChange} required>
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='formUname' className='mb-3'>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type='text' name='userName' placeholder='Enter your user name' value={formData.userName} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId='formPassword' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' placeholder='Enter your password' value={formData.password} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId='formUsertype' className='mb-3'>
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as='select' name='userType' value={formData.userType} onChange={handleChange} required>
                    <option value=''>Select User Type</option>
                    <option value='administrator'>Administrator</option>
                    <option value='staff'>Staff</option>
                  </Form.Control>
                </Form.Group>
                
                <Button variant='primary' type='submit' className='w-100 mt-2'>
                  Sign Up
                </Button>

                <p className="mt-3 text-center">
                  Already have an account? <a href="/">Login</a>
                </p>
              </Form>
            </Card.Body>
          </Card>
        
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
