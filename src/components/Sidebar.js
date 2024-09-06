// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 z-10">
      <ul>
        <li>
          <Link to="/task" className="block p-4 hover:bg-gray-700">Tasks</Link>
        </li>
        <li>
          <Link to="/workspaces" className="block p-4 hover:bg-gray-700">Workspaces</Link>
        </li>
      
        <li>
          <Link to="/projects" className="block p-4 hover:bg-gray-700">Projects</Link>
        </li>
        <li>
          <Link to="/teams" className="block p-4 hover:bg-gray-700">Teams</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
