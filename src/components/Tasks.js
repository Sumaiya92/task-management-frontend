import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Select, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/task')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleEdit = (task) => {
    navigate(`/task-form/${task._id}`);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/task/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      setSnackbarMessage('Task deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting task:', error);
      setSnackbarMessage('Error deleting task');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleStatusChange = async (task, status) => {
    try {
      await axios.put(`http://localhost:8000/task/${task._id}`, { ...task, progress: status });
      setTasks(tasks.map(t => t._id === task._id ? { ...t, progress: status } : t));
      setSnackbarMessage('Task status updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating task status:', error);
      setSnackbarMessage('Error updating task status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCheckboxChange = (task) => {
    handleStatusChange(task, task.progress === 'completed' ? 'pending' : 'completed');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleTitleClick = (taskId) => {
    navigate(`/task-details/${taskId}`);
  };

  return (
    <div className="flex space-y-1">
      <TableContainer component={Paper} className="p-4 bg-background min-h-screen">
        <Button 
          onClick={() => navigate('/task-form')} 
          variant="contained" 
          color="primary" 
          className="mb-4"
        >
          Add New Task
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Complete</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>
                  <Checkbox 
                    checked={task.progress === 'completed'} 
                    onChange={() => handleCheckboxChange(task)} 
                  />
                </TableCell>
                <TableCell 
                  onClick={() => handleTitleClick(task._id)} 
                  style={{ cursor: 'pointer' }}
                >
                  {task.title}
                </TableCell>
                <TableCell>
                  <Select
                    value={task.progress}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                <Button size="small" onClick={() => handleEdit(task)} sx={{ backgroundColor: '#007bff', color: '#fff' }}>Edit</Button>
                </TableCell>
                <TableCell>
                <Button size="small" onClick={() => handleDelete(task._id)} sx={{ backgroundColor: '#ff0000', color: '#fff' }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </TableContainer>
    </div>
  );
};

export default Tasks;
