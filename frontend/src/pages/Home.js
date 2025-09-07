// frontend/src/pages/Home.js
import React from 'react';

const Home = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to the Auth App!</h1>
            <p>Register or Login to access the dashboard.</p>
            <img
                src="/images/welcome-auth.png" // <--- UPDATED PATH
                alt="Welcome to AuthApp"
                style={{ maxWidth: '600px', width: '100%', marginTop: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
        </div>
    );
};

export default Home;