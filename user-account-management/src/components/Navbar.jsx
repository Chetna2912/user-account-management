import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ onLogout, onEdit, toggleTheme, currentTheme }) {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        <a className={`navbar-brand ${styles['navbar-brand']}`} href="#dashboard" onClick={e => e.preventDefault()}>
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon`}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className={`nav-link active ${styles['nav-link']}`} href="#dashboard" onClick={e => e.preventDefault()}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${styles['nav-link']}`} href="#edit" onClick={e => { e.preventDefault(); onEdit(); }}>
                Edit Account
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-light me-3"
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              title="Toggle Dark/Light Mode"
            >
              {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="btn btn-outline-light" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
