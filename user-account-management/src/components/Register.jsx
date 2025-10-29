import React, { useState } from 'react';
import styles from './Register.module.css';

export default function Register({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (!form.password) err.password = 'Password is required';
    if (!form.confirmPassword) err.confirmPassword = 'Confirm your password';
    if (form.password !== form.confirmPassword)
      err.confirmPassword = 'Passwords do not match';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === form.email)) {
      setMessage('Email already exists');
      return;
    }
    const newUser = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Registration successful. Redirecting to login...');
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
        <button type="button" className="btn btn-link mt-3 w-100" onClick={onCancel}>Back to Login</button>
      </form>
    </div>
  );
}
