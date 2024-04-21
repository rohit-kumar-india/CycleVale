import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddressModal = ({ userId, address, closeModal }) => {
    console.log(userId)
    //const userId = "65db29ba433a6266a8d13f40";
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: ''
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

    const states = [
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];

    useEffect(() => {
        if (address) {
            setFormData({ ...address });
        }
    }, [address]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // if (name === 'zip' && value.length === 5) {
        //     fetchCityAndState(value); // Implement this function based on your API
        // }
    };

    const fetchCityAndState = async (zip) => {
        try {
            const response = await axios.get(`https://api.example.com/zipcode/${zip}`);
            if (response.data) {
                setFormData(prev => ({
                    ...prev,
                    city: response.data.city,
                    state: response.data.state
                }));
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (address) {
                const response = await axios.put(`http://localhost:5000/api/users/address/${address._id}`,{userId, updatedAddress: formData});
                if(response.status===200){
                    toast.success(response.data.message, toastOptions)
                }else{
                    toast.error(response.data.message, toastOptions)
                }
            } else {
                const response = await axios.post('http://localhost:5000/api/users/address',{userId,newAddress: formData});
                if(response.status===200){
                    toast.success(response.data.message, toastOptions)
                }else{
                    toast.error(response.data.message, toastOptions)
                }
            }
            closeModal();
        } catch (error) {
            console.error('Failed to save address:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border min-w-fit w-[40%] shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold">{address ? 'Edit Address' : 'Add Address'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                    <div className='flex flex-row justify-between gap-2'>
                        <div className='w-[50%]'>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input id="name" name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                        <div className='w-[50%]'>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile No</label>
                            <input id="mobile" name="mobile" type="tel" placeholder="10-digit mobile number" value={formData.mobile} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between gap-2'>
                        <div>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                            <input id="pincode" name="pincode" type="text" placeholder="Postal Code" value={formData.pincode} onChange={handleInputChange} rows="5" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                        <div className=''>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <select id="state" name="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                                <option key={0} value={0}>--Select State--</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address (Street, Locality)</label>
                        <textarea id="address" name="address" type="text" placeholder="Street, Locality" rows={3} value={formData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                        <input id="landmark" name="landmark" type="text" placeholder="Nearby landmark" value={formData.landmark} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City/District</label>
                        <input id="city" name="city" type="text" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                        <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddressModal;
