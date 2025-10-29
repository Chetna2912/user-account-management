## User Account Management Web Application


## Overview
This project is a functional user account management web application built with React.js (v16+) using the Vite build tool. It enables users to register, log in, and manage their accounts all within the browser. It features a dark mode/light mode toggle for improved user experience, and it stores user data temporarily in localStorage, requiring no backend integration.

## Features
User Registration: Users can create an account by providing their full name, valid email, and a password with confirmation. The form validates inputs thoroughly.

User Login: Registered users can log in using their email and password with client-side authentication.
Account Dashboard: After login, users access a dashboard where they can view and edit their full name and email. Updates are validated and saved locally.

Dark/Light Mode: A toggle button in the navigation bar lets users switch themes. The chosen theme preference is saved and persists across sessions.

Responsive Design: Developed with Bootstrap and CSS variables, the UI adapts seamlessly across desktop and mobile devices.

Navigation: Includes dashboard navigation with links to home, edit account, theme toggle, and logout.

## Technologies Used
React.js (v16+)

Vite for development and build

Bootstrap 5 for responsive and consistent styling

CSS Variables for easy and dynamic theming between dark and light modes

LocalStorage for client-side data persistence without backend

## Setup and Running Instructions
Clone or download the repository.

Run npm install to install dependencies.

Run npm run dev to start the development server.

Open your browser and navigate to http://localhost:5173 to use the app.
