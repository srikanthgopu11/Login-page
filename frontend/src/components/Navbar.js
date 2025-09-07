// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // We'll create this soon

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/login');
        } else {
            alert(result.message);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">AuthApp</Link>
            </div>
            <ul className="navbar-links">
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        <li>Welcome, {user?.email}!</li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;