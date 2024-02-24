import React, { useState } from 'react';
import Link from 'next/link';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement signup functionality
    console.log(email, password, confirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 to-orange-500 py-8">
      <div className="max-w-md w-full bg-black bg-opacity-70 backdrop-filter backdrop-blur-md p-8 rounded-md shadow-md text-white">
  {/* Set text color to white and add transparency, blur effect, and shadow */}
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-3 py-2 w-full rounded-md text-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-3 py-2 w-full rounded-md" required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border px-3 py-2 w-full rounded-md" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Sign Up</button>
          <p className="mt-4 text-center">
            Already have an account? <Link href="/Login" legacyBehavior><a className="text-blue-500">Login</a></Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
