import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { register } from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Register
        </Typography>
        {error && <Typography color="error" align="center" className="mb-4">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
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
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
