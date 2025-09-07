// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [dashboardMessage, setDashboardMessage] = useState('Loading dashboard data...');
    const API_URL = 'http://localhost:5000/api/auth';

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`${API_URL}/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setDashboardMessage(data.message);
                } else {
                    const errorData = await response.json();
                    setDashboardMessage(`Failed to load dashboard: ${errorData.message || 'Error'}`);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setDashboardMessage('Network error while fetching dashboard data.');
            }
        };
        fetchDashboardData();
    }, []);


    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            {user ? (
                <>
                    <p>Hello, {user.email}! You are logged in.</p>
                    <p>{dashboardMessage}</p>
                    <p>This is a protected route. Only authenticated users can see this content.</p>
                    <img src="https://via.placeholder.com/600x250?text=Welcome+to+Your+Dashboard" alt="Dashboard" style={{maxWidth: '100%', marginTop: '20px'}}/>
                </>
            ) : (
                <p>You need to be logged in to view this page.</p>
            )}
        </div>
    );
};

export default Dashboard;