import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileLayout from '.';
import { toast } from 'react-toastify';

const PersonalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    id:'',
    name: '',
    email: '',
    phoneNo: '',
    gender: '',
    dob: ''
  });
  
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

  // Fetch user data
  useEffect(() => {
    let id = localStorage.getItem('userId');

    const fetchUserData = async (id) => {
      try {
        const response = await axiosInstance.get(`/api/users/${id}`); // API call to fetch user data
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    console.log(user);
    fetchUserData(id);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/api/users/${user._id}`, user); // API call to update user data
      setEditMode(false);
      toast.success("Information updated successfully!", toastOptions)
    } catch (error) {
      console.error('Failed to update user data:', error);
      alert('Failed to update information.');
    }
  };

  return (
    <ProfileLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone No</label>
              <input
                type="tel"
                name="phoneNo"
                value={user.phoneNo}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={!editMode}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {editMode ? (
            <div className="flex justify-end space-x-4">
              <button type="submit" className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
                Save Changes
              </button>
              <button onClick={() => setEditMode(false)} className="inline-flex items-center justify-center px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setEditMode(true)} className="inline-flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md">
              Edit Info
            </button>
          )}
        </form>
      </div>

    </ProfileLayout>
  );
};

export default PersonalInfo;
