'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage=()=>{
    const [USN,setUSN] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            // console.log({"USN":USN})
            
            const response = await axios.post('http://localhost:5000/login', {"USN":USN},);
            

            if (response.status === 200) {
                router.push(`/home/?USN=${encodeURIComponent(USN)}`)
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed'); // Safe access to error message
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input
                type="text"
                onChange={(e) => setUSN(e.target.value)}
                placeholder="Enter your USN"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </div>
    )
}

export default LoginPage