// frontend/src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [usn, setUsn] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('http://localhost:5000/login', { usn });

            if (response.status === 200) {
                navigate(`/profile/${usn}`);
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed'); // Safe access to error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    placeholder="Enter your USN"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
