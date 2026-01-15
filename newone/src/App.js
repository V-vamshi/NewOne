import React from 'react';
import LoginPage from './AuthPage';
import './App.css';
import Dashboard from './Dashboard';
function App() {
  if (localStorage.getItem('user')) {
    return <Dashboard />;
  }
  return <LoginPage />;
}

export default App;
