import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = useState('login'); // login, register, dashboard
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // On mount, load theme and user info
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const loggedInEmail = localStorage.getItem('loggedInUser');
    if (loggedInEmail) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === loggedInEmail);
      if (user) {
        setCurrentUser(user);
        setPage('dashboard');
      }
    }
  }, []);

  // Toggle light/dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const goToRegister = () => setPage('register');
  const goToLogin = () => setPage('login');
  const onLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
    setPage('login');
  };
  const onLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('loggedInUser', user.email);
    setPage('dashboard');
  };
  const onUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <>
      {page === 'register' && <Register onSuccess={goToLogin} onCancel={goToLogin} />}
      {page === 'login' && <Login onRegister={goToRegister} onLogin={onLoginSuccess} />}
      {page === 'dashboard' && currentUser && (
        <Dashboard
          user={currentUser}
          onLogout={onLogout}
          onUpdateUser={onUpdateUser}
          toggleTheme={toggleTheme}
          currentTheme={theme}
        />
      )}
    </>
  );
}
