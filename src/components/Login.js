import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/task');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="xs" className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        {error && <Typography color="error" align="center" className="mb-4">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
