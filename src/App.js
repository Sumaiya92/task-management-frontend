import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Import Sidebar component
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import Workspace from './components/Workspace';
import WorkspaceForm from './components/WorkForm'; // Updated import name
import TeamForm from './components/TeamForm';
import Teams from './components/Teams';

import ProjectForm from './components/ProjectForm';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-4 bg-gray-100 min-h-screen">
          <Routes>
            {/* Redirect root to /tasks */}
            <Route path="/" element={<Navigate to="/tasks" />} />
            
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Routes */}
            <Route path="/task" element={<Tasks />} />
            <Route path="/task-details/:id" element={<TaskDetail />} />
            <Route path="/task-form/:id?" element={<TaskForm />} />
            <Route path="/workspaces" element={<Workspace />} />
            <Route path="/workspace-form/:id?" element={<WorkspaceForm />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/team-form/:id?" element={<TeamForm />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project-form/:id?" element={<ProjectForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
