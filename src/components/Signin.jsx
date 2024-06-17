import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';



function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Redirect to dashboard after successful signup
            navigate('/dashboard');
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
                <Link to="/login" className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md block text-center mt-2 hover:bg-red-600 transition duration-300">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
