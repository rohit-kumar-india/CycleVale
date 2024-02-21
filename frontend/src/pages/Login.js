import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login functionality
    console.log(email, password);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
        <p className="mt-4">
          Don't have an account? <Link href="/Signup" legacyBehavior><a className="text-blue-500">Register</a></Link>
        </p>
      </form>
    </div>
  );
}


// const Login = () => {
//   const { data: session } = useSession()
//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
//   return <>
//     Not signed in <br/>
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }

export default Login