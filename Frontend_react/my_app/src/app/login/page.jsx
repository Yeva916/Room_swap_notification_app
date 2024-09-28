'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const port= process.env.NEXT_PUBLIC_PORT
// console.log(port)

const LoginPage = () => {
    const [USN, setUSN] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post(`http://localhost:${port}/login`, { "USN": USN });

            if (response.status === 200) {
                router.push(`/home/?USN=${encodeURIComponent(USN)}`);
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed'); // Safe access to error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };
 
    return (
        <div className="max-w-md mx-auto mt-12 p-8 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-center transition-shadow duration-300 hover:shadow-xl">
            <h2 className="text-center mb-5 text-lg font-bold text-gray-800">Login</h2>
            <form onSubmit={handleLogin} className="w-full">
                <input
                    type="text"
                    onChange={(e) => setUSN(e.target.value)}
                    placeholder="Enter your USN"
                    required
                    className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition duration-300"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 rounded-md text-white font-semibold transition duration-300 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
