import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [team, setTeam] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/projects/${id}`)
        .then(response => {
          const project = response.data;
          setName(project.name);
          setDescription(project.description);
          setOwner(project.owner);
          setWorkspace(project.workspace);
          setTeam(project.team || '');
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Error fetching project:', error);
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/projects/${id}`, { name, description, owner, workspace, team });
      } else {
        await axios.post('http://localhost:8000/projects', { name, description, owner, workspace, team });
      }
      navigate('/projects');
    } catch (error) {
      console.error(isEditing ? 'Error updating project:' : 'Error creating project:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          {isEditing ? 'Edit Project' : 'Create New Project'}
        </Typography>
        <TextField
          fullWidth
          label="Project Name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Project Description"
          margin="normal"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Owner"
          margin="normal"
          variant="outlined"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <TextField
          fullWidth
          label="Workspace"
          margin="normal"
          variant="outlined"
          value={workspace}
          onChange={(e) => setWorkspace(e.target.value)}
        />
        <TextField
          fullWidth
          label="Team (Optional)"
          margin="normal"
          variant="outlined"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          {isEditing ? 'Update Project' : 'Add Project'}
        </Button>
      </Paper>
    </Container>
  );
};

export default ProjectForm;
