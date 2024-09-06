import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Authentication
export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

// Tasks
export const getTasks = () => {
    return axios.get(`${API_URL}/task`);
};

export const createTask = (taskData) => {
    return axios.post(`${API_URL}/task`, taskData);
};

export const updateTask = (id, taskData) => {
    return axios.put(`${API_URL}/task/${id}`, taskData);
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/task/${id}`);
};

// Workspaces
export const getAllWorkspaces = () => {
    return axios.get(`${API_URL}/workspaces`);
};

export const createWorkspace = (workspaceData) => {
    return axios.post(`${API_URL}/workspaces`, workspaceData);
};

export const updateWorkspace = (id, workspaceData) => {
    return axios.put(`${API_URL}/workspaces/${id}`, workspaceData);
};

export const deleteWorkspace = (id) => {
    return axios.delete(`${API_URL}/workspaces/${id}`);
};


// Teams
export const getAllTeams = () => {
    return axios.get(`${API_URL}/teams`);
};

export const createTeam = (teamData) => {
    return axios.post(`${API_URL}/teams`, teamData);
};

export const updateTeam = (id, teamData) => {
    return axios.put(`${API_URL}/teams/${id}`, teamData);
};

export const deleteTeam = (id) => {
    return axios.delete(`${API_URL}/teams/${id}`);
};

// Projects
export const getAllProjects = () => {
    return axios.get(`${API_URL}/projects`);
};

export const createProject = (projectData) => {
    return axios.post(`${API_URL}/projects`, projectData);
};

export const updateProject = (id, projectData) => {
    return axios.put(`${API_URL}/projects/${id}`, projectData);
};

export const deleteProject = (id) => {
    return axios.delete(`${API_URL}/projects/${id}`);
};
