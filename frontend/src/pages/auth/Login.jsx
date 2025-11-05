import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import '../../assets/css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/login`, form);
      console.log('Login successful:', response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    }
  };

  return (
    <Container className="login-container d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={5} lg={4}>
          <Card className="p-4 shadow-lg login-card">
            <h3 className="text-center mb-4">Welcome Back</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mb-3"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mb-4"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
              >
                Login
              </Button>
            </form>
            <p className="text-center mt-3">
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
