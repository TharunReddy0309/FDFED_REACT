import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Dashboard from './Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;