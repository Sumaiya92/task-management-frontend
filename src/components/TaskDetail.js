import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Paper, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetail = () => {
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/task/${id}`)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error('Error fetching task details:', error);
      });
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 800 }}>
        {task ? (
          <>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
              {task.title}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                {task.description}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Due Date
              </Typography>
              <Typography variant="body1" paragraph>
                {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Status
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
                {task.status}
              </Typography>
            </Box>
            <Button
              onClick={() => navigate('/task')}
              variant="contained"
              color="primary"
              sx={{ display: 'block', mx: 'auto', mt: 2 }}
            >
              Back to Task List
            </Button>
          </>
        ) : (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default TaskDetail;
