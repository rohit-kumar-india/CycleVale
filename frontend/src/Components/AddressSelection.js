import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

// components/AddressSelection.js
const AddressSelection = ({ onSelect }) => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [processing, setProcessing] = useState(false); // State to manage processing status
    const [dynamicText, setDynamicText] = useState('');

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });

    // Fetch addresses from API
    const fetchAddresses = async (id) => {
        try {
            setDynamicText('Fetching Addresses...');
            setProcessing(true);
            // Fetch the user's address
            const addressResponse = await axiosInstance.get(`/api/users/address/${id}`);
            const addresss = addressResponse.data;
            setAddresses(addresss);

        } catch (error) {
            console.error('Failed to fetch address or product details', error);
        } finally {
            setProcessing(false);
        }
    }

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        fetchAddresses(userId);
    }, []);

    const handleSelectionChange = (event) => {
        setSelectedAddressId(event.target.value);
    };

    const handleProceed = () => {
        const selectedAddress = addresses.find(address => address._id === selectedAddressId);
        onSelect(selectedAddress);
    };


    return (
        <div className="m-10">
            <h2 className="text-xl font-semibold mb-4">Choose a Delivery Address</h2>
            <form className="space-y-4">
                {addresses.length === 0 ? (
                    <>
                        <div className="m-6">No Address Found.</div>
                        <Link href="/profile/addresses" legacyBehavior >
                            <a className="flex mt-4 w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded disabled:opacity-50 cursor-pointer">Add Address to proceed</a>
                        </Link>
                    </>
                ) : (
                    <>
                        {addresses.map((address) => (
                            <div key={address._id} className="flex items-center space-x-4 border p-4 hover:bg-gray-200 cursor-pointer">
                                <input
                                    type="radio"
                                    id={address._id}
                                    name="address"
                                    value={address._id}
                                    checked={selectedAddressId === address._id}
                                    onChange={handleSelectionChange}
                                    className="form-radio h-5 w-5 text-blue-600 cursor-pointer"
                                />
                                <label htmlFor={address._id} className="flex-1 min-w-0 cursor-pointer">
                                    <p className="text-sm font-medium text-gray-900 truncate">{address.name}, {address.mobile}</p>
                                    <p className="text-sm text-gray-500 truncate">{address.address}, {address.landmark}, {address.city}, {address.state} {address.pincode}</p>
                                </label>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleProceed}
                            className="my-4 w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
                            disabled={!selectedAddressId}
                        >
                            Select Address & Proceed
                        </button>
                    </>
                )}
            </form>
            {/* Processing popup */}
            {processing && (
                <div className="fixed top-32 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                    <div className="text-white text-lg ml-4">{dynamicText}</div>
                </div>
            )}
        </div>
    );
};

export default AddressSelection;