import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Button, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/workspaces')
      .then(response => {
        setWorkspaces(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the workspaces!", error);
      });
  }, []);

  const handleEdit = (workspaceId) => {
    navigate(`/workspace-form/${workspaceId}`);
  };

  const handleDelete = async (workspaceId) => {
    try {
      await axios.delete(`http://localhost:8000/workspaces/${workspaceId}`);
      setWorkspaces(workspaces.filter(workspace => workspace._id !== workspaceId));
      setSnackbarMessage('Workspace deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting workspace:', error);
      setSnackbarMessage('Error deleting workspace');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="flex flex-col p-4 bg-background min-h-screen">
      <Button
        onClick={() => navigate('/workspace-form')}
        variant="contained"
        color="primary"
        size="large"
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '16px',
          marginBottom: '20px',
          alignSelf: 'start',
        }}
      >
        Add New Workspace
      </Button>

      {workspaces.length === 0 ? (
        <Typography variant="h6" align="center">
          No workspaces available. Click "Add New Workspace" to create one.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {workspaces.map((workspace) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={workspace._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {workspace.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {workspace.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(workspace._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(workspace._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Workspace;
