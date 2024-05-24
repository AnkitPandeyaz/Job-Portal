// import { useState } from "react";
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:3000/sign-in', { name, email, password })
//         .then(res => {
//             navigate('/login');
//         }).catch(err => console.log(err));
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue to-purple-400">
//             <div className="bg-white p-3 rounded w-1/4">
//                 <h2 className="text-2xl mb-4">Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="font-semibold">Name</label>
//                         <input
//                             type="text"
//                             placeholder="Enter Name"
//                             autoComplete="off"
//                             name="name"
//                             className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="font-semibold">Email</label>
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             autoComplete="off"
//                             name="email"
//                             className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="font-semibold">Password</label>
//                         <input
//                             type="password"
//                             placeholder="Enter Password"
//                             name="password"
//                             className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
//                         Register
//                     </button>
//                 </form>
//                 <p className="mt-4">Already have an account?</p>
//                 <Link to="/login" className="border bg-blue text-gray font-bold py-2 px-4 rounded block mt-2 w-full text-center">
//                     Login
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Signup;


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
        } catch (error) {
          console.error('Error handling response:', error);
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

