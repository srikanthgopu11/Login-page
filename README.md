# React.js & Node.js Authentication System

This project implements a simple user authentication system with registration, login, session-based authentication, and logout functionalities using React.js for the frontend and Node.js (Express) for the backend, with SQLite as the database. Passwords are securely hashed using `bcryptjs`.

## Features

*   **User Registration:** Create a new user account with email and password.
*   **User Login:** Authenticate existing users.
*   **Session Management:** Users remain logged in using session/cookie-based authentication.
*   **User Logout:** Clear the session and log out the user.
*   **Protected Route:** An example dashboard route that only authenticated users can access.
*   **Password Hashing:** Passwords are securely stored using `bcryptjs`.
*   **Basic Validation:** Prevents duplicate email registration.
*   **Styling:** Basic CSS styling for better user experience.

## Technologies Used

*   **Frontend:**
    *   React.js
    *   React Router DOM
    *   `fetch` API for HTTP requests
*   **Backend:**
    *   Node.js
    *   Express.js
    *   SQLite3 (with `sqlite3` package)
    *   `bcryptjs` for password hashing
    *   `express-session` for session management
    *   `connect-session-sqlite` for SQLite session store
    *   `cors` for cross-origin requests

