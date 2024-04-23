import React, { useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDynamicText('Logging in...');
      setProcessing(true);
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);

      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.userName);

      if (response.status === 200) {
        toast.success("Login Successfull.. Redirecting..", toastOptions)
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message, toastOptions)
      } else {
        toast.error(error.message, toastOptions)
      }

      console.log(error);
    } finally {
      setProcessing(false);
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
      {/* Processing popup */}
      {processing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
          <div className="text-white text-lg ml-4">{dynamicText}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
