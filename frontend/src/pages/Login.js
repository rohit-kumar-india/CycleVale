import React, { useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("entered");
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.userName);
      
      router.push('/');
      // Handle login success (e.g., store token, redirect)
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Implement login functionality
  //   console.log(email, password);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 to-orange-500 py-8">
      <div className="max-w-md w-full bg-black bg-opacity-70 backdrop-filter backdrop-blur-md p-8 rounded-md shadow-md text-white">
  {/* Set text color to white and add transparency, blur effect, and shadow */}
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" value={credentials.email} onChange={handleChange} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" value={credentials.password} onChange={handleChange} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Login</button>
          <p className="mt-4 text-center">
            Don't have an account? <Link href="/Signup" legacyBehavior><a className="text-blue-500">Register</a></Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
