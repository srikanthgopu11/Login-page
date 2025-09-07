// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/auth'; // Ensure this matches your backend URL

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/check-auth`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Important for sending cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUser(data.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important for receiving and sending cookies
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUser(data.user);
                return { success: true, message: data.message };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Login failed.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error or server unavailable.' };
        }
    };

    const register = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Registration failed.' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error or server unavailable.' };
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Important for sending cookies to clear them
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUser(null);
                return { success: true, message: 'Logged out successfully.' };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Logout failed.' };
            }
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Network error or server unavailable.' };
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};