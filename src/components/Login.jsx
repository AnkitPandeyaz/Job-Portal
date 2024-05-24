// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:3000/login', { username, email, password })
//             .then(res => {
//                 if (res && res.data && res.data.Status === "Success") {
//                     console.log("login: " + res.data);
//                     if (res.data.role === "admin") {
//                         navigate('/dashboard');
//                     } else {
//                         navigate('/');
//                     }
//                 } else {
//                     console.error("Invalid response:", res);
//                 }
//             })
//             .catch(err => console.error("Error handling response:", err));
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue to-purple-600">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//                 <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="username" className="block font-semibold text-gray-700 mb-2">Username</label>
//                         <input
//                             type="text"
//                             placeholder="Enter Username"
//                             autoComplete="off"
//                             name="username"
//                             className="form-input w-full  border-gray-300"
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">Email</label>
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             autoComplete="off"
//                             name="email"
//                             className="form-input w-full  border-gray-300"
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label htmlFor="password" className="block font-semibold text-gray-700 mb-2">Password</label>
//                         <input
//                             type="password"
//                             placeholder="Enter Password"
//                             name="password"
//                             className="form-input w-full  border-gray-300"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit" className="bg-blue text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-blue-700 transition duration-300">
//                         Login
//                     </button>
//                 </form>
//                 <p className="mt-6 text-center text-gray-600">Don't have an account?</p>
//                 <Link to="/sign-in" className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md block text-center mt-2 hover:bg-red-600 transition duration-300">
//                     Sign Up
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', { email, password })
            .then(res => {
                if (res && res.data && res.data.Status === "Success") {
                    navigate('/dashboard');
                } else {
                    console.error("Invalid response:", res);
                }
            })
            .catch(err => console.error("Error handling response:", err));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
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
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">Don't have an account?</p>
                <Link to="/sign-in" className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md block text-center mt-2 hover:bg-red-600 transition duration-300">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;


