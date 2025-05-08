import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch user data from API or global state
    setUser({ name: 'John Doe', email: 'john@example.com' });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Display other user info or options */}
      </div>
    </div>
  );
}

export default Profile