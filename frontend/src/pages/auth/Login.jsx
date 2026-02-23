import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { FaSignInAlt } from "react-icons/fa";
import axios from 'axios';
import '../../assets/css/Login.css';
import Swal from 'sweetalert2'

const Login = () => {
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, form);
      // console.log('Login successful:', response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      // console.error('Login failed:', error);
      setErrors(error.response?.data?.errors || {});
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || 'Login failed!',
        footer: 'An error occurred during login. Please try again.'
      });
      setLoading(false);
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
                error={!!errors.email}
                helperText={errors.email}
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
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
              >
                {loading ? 
                  <CircularProgress size={20} color="inherit" style={{ marginRight: 8 }} />
                  :
                  <FaSignInAlt className="me-2" />
                }
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
