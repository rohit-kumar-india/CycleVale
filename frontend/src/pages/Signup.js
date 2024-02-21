import React, { useState } from 'react';
import Link from 'next/link';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration functionality
    console.log(email, password, confirmPassword);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
      <label htmlFor="email" className="block mb-2">Email</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 w-full" required />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block mb-2">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 w-full" required />
    </div>
    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
      <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border px-2 py-1 w-full" required />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    <p className="mt-4">
      Already have an account? <Link href="/auth/login" legacyBehavior><a className="text-blue-500">Login</a></Link>
    </p>
  </form>
</div>
)
}

export default Signup