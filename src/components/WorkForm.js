import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const WorkForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [owner, setOwner] = useState('');  // Added owner field
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/workspaces/${id}`)
        .then(response => {
          const workspace = response.data;
          setName(workspace.name);
          setDescription(workspace.description);
          setVisibility(workspace.visibility);
          setOwner(workspace.owner);  // Set owner
          setIsEditing(true);
        })
        .catch(error => console.error('Error fetching workspace:', error));
    }
  }, [id]);

  const handleSubmit = async () => {
    const workspaceData = { name, description, visibility, owner };  // Include owner in the data
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/workspaces/${id}`, workspaceData);
      } else {
        await axios.post('http://localhost:8000/workspaces', workspaceData);
      }
      navigate('/workspaces');  // Navigate to /workspaces after submission
    } catch (error) {
      console.error(isEditing ? 'Error updating workspace:' : 'Error creating workspace:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          {isEditing ? 'Edit Workspace' : 'Create New Workspace'}
        </Typography>
        <TextField
          fullWidth
          label="Workspace Name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
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
        <Typography gutterBottom>Visibility</Typography>
        <Select
          fullWidth
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </Select>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          {isEditing ? 'Update Workspace' : 'Add Workspace'}
        </Button>
      </Paper>
    </Container>
  );
};

export default WorkForm;
