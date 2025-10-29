import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onRegister, onLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setMessage('');
  };

  const validateForm = () => {
    let err = {};
    if (!form.email.trim()) err.email = 'Email is required';
    if (!form.password) err.password = 'Password is required';
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
    const foundUser = users.find(
      u => u.email === form.email.trim() && u.password === form.password
    );
    if (!foundUser) {
      setMessage('Invalid email or password');
      return;
    }
    setMessage('');
    onLogin(foundUser);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
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
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <div className="mt-3 text-center">
        Don't have an account?{' '}
        <button className="btn btn-link p-0" onClick={onRegister}>
          Register Here
        </button>
      </div>
    </div>
  );
}
