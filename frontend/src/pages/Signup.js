import React, { useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDynamicText('User Onboarding...');
      setProcessing(true);
      if (password === confirmPassword) {
        const response = await axios.post("http://localhost:5000/api/users/signup", { name, email, password });
        if (response.status === 201) {
          toast.success("User Registerd Successfully.. Redirecting to Login page.", toastOptions)
          setTimeout(() => {
            router.push('/Login');
          }, 2000);
        }
      } else {
        toast.error("Password and confirmPassword are not same.", toastOptions)
        console.error("Password and confirmPassword are not same.")
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message, toastOptions)
      } else {
        toast.error(error.message, toastOptions)
      }
      console.error('Failed to save address:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 to-orange-500 py-8">
      <div className="max-w-md w-full bg-black bg-opacity-70 backdrop-filter backdrop-blur-md p-8 rounded-md shadow-md text-white">
        {/* Set text color to white and add transparency, blur effect, and shadow */}
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Full Name</label>
            <input type="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Sign Up</button>
          <p className="mt-4 text-center">
            Already have an account? <Link href="/Login" legacyBehavior><a className="text-blue-500">Login</a></Link>
          </p>
        </form>
      </div>
      {/* Processing popup */}
      {processing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          <div className="text-white text-lg ml-4">{dynamicText}</div>
        </div>
      )}
    </div>
  );
}

export default Signup;
