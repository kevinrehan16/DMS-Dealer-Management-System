import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, CircularProgress, Typography, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { FaSignInAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { logo } from '../../../public/dms.png';
import axios from 'axios';
import '../../assets/css/Login.css';
import { useNotification } from '../../context/NotificationContext';

const Login = () => {
  const notify = useNotification();
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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
      const { token, permissions, user } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("permissions", JSON.stringify(permissions));

      const modules = [...new Set(permissions.map(p => p.split(" ")[1]))];
      const priorityOrder = ["dashboard", "inquiry", "investigation", "evaluation"];
      const moduleToNavigate = priorityOrder.find(module => modules.includes(module));

      setUser(user);
      setLoading(false);
      notify.toast('success', 'Welcome ' + user.firstName + ' ' + user.lastName);
      navigate(`/${moduleToNavigate || "dashboard"}`);
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
      notify.alertMsg(
        error.response?.data?.message || "Login failed!",
        "An error occurred during login. Please try again.",
        "error",
        "Oops..."
      );
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: '#ffff' }}>
      {/* LEFT SIDE: Branding Area */}
      <Box sx={{ 
        flex: 1, 
        display: { xs: 'none', md: 'flex' },
        bgcolor: '#1e1f26',
        backgroundImage: 'linear-gradient(rgba(30,31,38,0.85), rgba(30,31,38,0.85)), url("https://media.istockphoto.com/id/526731250/photo/motorcycles-standing-in-the-row.jpg?s=612x612&w=0&k=20&c=FnZQ-6Or50JcAX6tREPF138tVEv955ykeuTGSlpH5WY=")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        p: 5
      }}>
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="bold" gutterBottom>Dealer Management</Typography>
          <Typography variant="h5" color="#ffc107">Enterprise Solution</Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE: Login Form */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Paper elevation={0} sx={{ width: '100%', maxWidth: 400, bgcolor: 'transparent' }}>
          <Box mb={4} textAlign="center">
            <img src="/dms.png" alt="Logo" style={{ width: 140, marginBottom: 20 }} />
            <Typography variant="h5" fontWeight="bold" color="#343a40">Sign In</Typography>
            <Typography color="textSecondary">Access your secure dashboard</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Email Address" variant="outlined" name="email"
              value={form.email} onChange={handleChange} margin="normal"
              error={!!errors.email} helperText={errors.email}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              fullWidth label="Password" type={showPassword ? 'text' : 'password'}
              variant="outlined" name="password" value={form.password}
              onChange={handleChange} margin="normal" error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              fullWidth type="submit" variant="contained" size="large" disabled={loading}
              sx={{ 
                mt: 3, py: 1.5, borderRadius: 2, bgcolor: '#1e1f26', color: '#ffc107',
                '&:hover': { bgcolor: '#343a40' }, fontWeight: 'bold' 
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <><FaSignInAlt style={{marginRight: 8}}/> LOGIN</>}
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Don’t have an account? <a href="/signup" style={{ color: '#1e1f26', fontWeight: 'bold' }}>Sign up</a>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;