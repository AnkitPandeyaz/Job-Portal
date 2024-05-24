// import React, { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/sign-in', { name, email, password }, { withCredentials: true });
//             console.log(response.data);
//             // Redirect or handle the response as needed
//             navigate('/dashboard'); // Navigate to the dashboard or appropriate page after successful signup
//         } catch (error) {
//             console.error('Error handling response:', error);
//         }
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });
//             console.log(response.data);
//             if (response.data.Status === "Success") {
//                 // Redirect to dashboard or perform other actions
//                 console.log('Login successful');
//                 // Here, you might want to redirect to the dashboard or reload the page to fetch dashboard data
//                 window.location.reload();
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };

//     const fetchDashboard = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/dashboard', { withCredentials: true });
//             console.log('Dashboard data:', response.data);
//         } catch (error) {
//             console.error('Error fetching dashboard:', error);
//         }
//     };

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/sign-in', { name, email, password }, { withCredentials: true });
            console.log(response.data);
            // Redirect or handle the response as needed
            navigate('/dashboard'); // Navigate to the dashboard or appropriate page after successful signup
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error: display error message to the user
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            className="form-input w-full border-gray-300"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            className="form-input w-full border-gray-300"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-input w-full border-gray-300"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-blue-700 transition duration-300">
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">Already have an account?</p>
                <Link to="/" className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md block text-center mt-2 hover:bg-red-600 transition duration-300">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;

