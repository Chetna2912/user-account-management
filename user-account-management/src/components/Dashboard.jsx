import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Navbar from './Navbar';

export default function Dashboard({ user, onLogout, onUpdateUser, toggleTheme, currentTheme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user.fullName,
    email: user.email,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setMessage('');
  };

  const validateForm = () => {
    let err = {};
    if (!form.fullName.trim()) err.fullName = 'Full Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!validateEmail(form.email)) err.email = 'Invalid email format';
    return err;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUserIndex = users.findIndex(u => u.email === user.email);

    if (form.email !== user.email && users.find(u => u.email === form.email)) {
      setMessage('Email already exists');
      return;
    }

    if (existingUserIndex > -1) {
      users[existingUserIndex] = {
        ...users[existingUserIndex],
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: users[existingUserIndex].password, // Keep password unchanged
      };
      localStorage.setItem('users', JSON.stringify(users));

      if (form.email !== user.email) {
        localStorage.setItem('loggedInUser', form.email.trim());
      }

      onUpdateUser(users[existingUserIndex]);
      setMessage('Changes saved successfully');
      setIsEditing(false);
    } else {
      setMessage('User not found');
    }
  };

  return (
    <>
      <Navbar onLogout={onLogout} onEdit={() => setIsEditing(true)} toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <div className={styles.container}>
        <h2>Account Dashboard</h2>
        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        {!isEditing ? (
          <div>
            <p><strong>Full Name:</strong> {form.fullName}</p>
            <p><strong>Email Address:</strong> {form.email}</p>
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Account</button>
          </div>
        ) : (
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{errors.fullName}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <button type="button" className="btn btn-primary me-2" onClick={handleSave}>Save Changes</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setMessage('');
                setErrors({});
                setForm({ fullName: user.fullName, email: user.email });
              }}
            >Cancel</button>
          </form>
        )}
      </div>
    </>
  );
}
