import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressModal from './addressModel';
import ProfileLayout from '.';

const Addresses = () => {
    const userId = "65db29ba433a6266a8d13f40";
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAddressDetails = async (id) => {
        setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback
        try {
            // Fetch the user's address
            const addressResponse = await axios.get(`http://localhost:5000/api/users/address/${id}`);
            const addresss = addressResponse.data;
            setAddresses(addresss); // Update the state once after processing all items

        } catch (error) {
            console.error('Failed to fetch address or product details', error);
        } finally {
            setIsLoading(false); // Update loading state
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            const response = await axios.delete('http://localhost:5000/api/users/address/delete', { data: { userId, addressId } });
            console.log(response);
            const updatedAddresses = addresses.filter(address => address._id !== addressId);
            // setWishlistItems(updatedWishlistItems);
            // product.wishlisted = false;
            //setProduct({ ...product, wishlisted: false });
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error('Failed to delete item from cart', error);
        }
    };

    useEffect(() => {
        fetchAddressDetails(userId);
        //fetchAddresses();
    }, []);




    if (isLoading) {
        return <div className='mt-[60px] height-[600px]'>Loading Products...</div>;
    }


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
                {addresses.map((address) => (
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
                ))}

                {modalOpen && (
                    <AddressModal address={currentAddress} closeModal={closeModal} />
                )}
            </div>
        </ProfileLayout>
    );
};

export default Addresses;
