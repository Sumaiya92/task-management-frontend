import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Grid,Typography, Card, CardContent, CardActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const handleEdit = (project) => {
    navigate(`/project-form/${project._id}`);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:8000/projects/${projectId}`);
      setProjects(projects.filter(project => project._id !== projectId));
      setSnackbarMessage('Project deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting project:', error);
      setSnackbarMessage('Error deleting project');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleTitleClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  return (
    <div className="p-4 bg-background min-h-screen space-y-1">
      <Button 
        onClick={() => navigate('/project-form')} 
        variant="contained" 
        color="primary" 
        className="mb-4"
      >
        Add New Project
      </Button>

      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" onClick={() => handleTitleClick(project._id)} style={{ cursor: 'pointer' }}>
                  {project.name}
                </Typography>
                <Typography color="text.secondary">
                  {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Owner: {project.owner}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Workspace: {project.workspace}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team: {project.team || 'N/A'}
                </Typography>
              </CardContent>
              <CardActions>
              <CardActions>
  <Button size="small" onClick={() => handleEdit(project)} sx={{ backgroundColor: '#007bff', color: '#fff' }}>Edit</Button>
  <Button size="small" onClick={() => handleDelete(project._id)} sx={{ backgroundColor: '#ff0000', color: '#fff' }}>Delete</Button>
</CardActions>
</CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Projects;
