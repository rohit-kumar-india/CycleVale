import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressModal from './addressModel';
import ProfileLayout from '.';
import { toast } from 'react-toastify';

const Addresses = () => {
    const [userId, setUserId] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
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

    const fetchAddressDetails = async (id) => {
        try {
            setDynamicText('Fetching Addresses...');
            setProcessing(true);
            // Fetch the user's address
            const addressResponse = await axios.get(`http://localhost:5000/api/users/address/${id}`);
            console.log(addressResponse)
            const addresss = addressResponse.data;
            setAddresses(addresss);
            setUserId(id);
        } catch (error) {
            console.error('Failed to fetch address or product details', error);
        } finally {
            setProcessing(false);
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            setDynamicText('Deleting Address...');
            setProcessing(true);
            const response = await axios.delete('http://localhost:5000/api/users/address/delete', { data: { userId, addressId } });
            if (response.status === 200) {
                toast.success(response.data.message, toastOptions)
            } else {
                toast.error(response.data.message, toastOptions)
            }
            const updatedAddresses = addresses.filter(address => address._id !== addressId);
            setAddresses(updatedAddresses);

        } catch (error) {
            console.error('Failed to delete item from cart', error);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        let id = localStorage.getItem('userId');
        fetchAddressDetails(id);
    }, []);

    const openModal = (address = null) => {
        setCurrentAddress(address); // null for new address
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        fetchAddressDetails(userId); // Refetch addresses after closing modal to reflect changes
    };

    return (
        <ProfileLayout>
            <div className="p-4">
                <div className='flex flex-row justify-between mb-4'>
                    <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
                    <button
                        onClick={() => openModal()}
                        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        + Add New Address
                    </button>
                </div>
                {addresses.length === 0 ? (
                    <>
                        <div className="m-6">No Address Found.</div>
                        <button
                            onClick={() => openModal()}
                            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Add Address
                        </button>
                    </>
                ) : (
                    addresses.map((address) => (
                        <div key={address._id} className="p-4 border border-gray-300 rounded mb-2 flex justify-between items-center">
                            <div>
                                <p>{address.name}, {address.mobile}</p>
                                <p>{address.address}, {address.landmark}{address.landmark && ","} {address.city}, {address.state} - {address.pincode}</p>
                            </div>
                            <div>
                                <button onClick={() => openModal(address)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={() => deleteAddress(address._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    )))}

                {modalOpen && (
                    <AddressModal userId={userId} address={currentAddress} closeModal={closeModal} />
                )}
                {/* Processing popup */}
                {processing && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                        <div className="text-white text-lg ml-4">{dynamicText}</div>
                    </div>
                )}
            </div>
        </ProfileLayout>
    );
};

export default Addresses;
