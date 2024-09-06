import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Card, CardContent, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const handleEdit = (team) => {
    navigate(`/team-form/${team._id}`);
  };

  const handleDelete = async (teamId) => {
    try {
      await axios.delete(`http://localhost:8000/teams/${teamId}`);
      setTeams(teams.filter(team => team._id !== teamId));
      setSnackbarMessage('Team deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting team:', error);
      setSnackbarMessage('Error deleting team');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-4 space-y-1">
      <Button 
        onClick={() => navigate('/team-form')} 
        variant="contained" 
        color="primary" 
        className="mb-4"
      >
        Add New Team
      </Button>

      <Grid container spacing={3}>
        {teams.map(team => (
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {team.name}
                </Typography>
                <Typography color="text.secondary">
                  Leader: {team.leader}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Members: {team.members ? team.members.join(', ') : 'No members'}
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small" onClick={() => handleEdit(team)} sx={{ backgroundColor: '#007bff', color: '#fff' }}>Edit</Button>                
              <Button size="small" onClick={() => handleDelete(team._id)} sx={{ backgroundColor: '#ff0000', color: '#fff' }}>Delete</Button>
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

export default Teams;
