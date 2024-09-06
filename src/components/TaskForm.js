import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container, Slider, MenuItem, Select } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/task/${id}`)
        .then(response => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setDueDate(new Date(task.dueDate).toISOString().slice(0, 10)); // Formatting date
          setStatus(task.status);
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Error fetching task:', error);
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/task/${id}`, { title, description, dueDate, status });
      } else {
        await axios.post('http://localhost:8000/task', { title, description, dueDate, status });
      }
      navigate('/task');
    } catch (error) {
      console.error(isEditing ? 'Error updating task:' : 'Error creating task:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <TextField
          fullWidth
          label="Task Title"
          margin="normal"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Task Description"
          margin="normal"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Due Date"
          type="date"
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Typography gutterBottom>Status</Typography>
        <Select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </Paper>
    </Container>
  );
};

export default TaskForm;
