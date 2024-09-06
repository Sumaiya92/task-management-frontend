import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TeamForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leader, setLeader] = useState('');
  const [members, setMembers] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/teams/${id}`)
        .then(response => {
          const team = response.data;
          setName(team.name);
          setDescription(team.description);
          setLeader(team.leader);
          setMembers(team.members.join(', '));
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Error fetching team:', error);
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    const teamData = {
      name,
      description,
      leader,
      members: members.split(',').map(member => member.trim())
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/teams/${id}`, teamData);
      } else {
        await axios.post('http://localhost:8000/teams', teamData);
      }
      navigate('/teams');
    } catch (error) {
      console.error(isEditing ? 'Error updating team:' : 'Error creating team:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          {isEditing ? 'Edit Team' : 'Create New Team'}
        </Typography>
        <TextField
          fullWidth
          label="Team Name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Team Description"
          margin="normal"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Team Leader"
          margin="normal"
          variant="outlined"
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
        />
        <TextField
          fullWidth
          label="Team Members (comma separated)"
          margin="normal"
          variant="outlined"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          {isEditing ? 'Update Team' : 'Add Team'}
        </Button>
      </Paper>
    </Container>
  );
};

export default TeamForm;
