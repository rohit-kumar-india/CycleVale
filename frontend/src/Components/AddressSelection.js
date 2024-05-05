import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

// components/AddressSelection.js
const AddressSelection = ({ onSelect }) => {
    const userId = "65db29ba433a6266a8d13f40";
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAddressId, setSelectedAddressId] = useState('');

    useEffect(() => {
        let id = localStorage.getItem('userId');
        console.log(id);
        // Fetch addresses from API
        async function fetchAddresses(id) {
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
        }

        fetchAddresses(id);
    }, []);

    if (isLoading) {
        return <div className='mt-[60px] min-h-screen height-[600px]'>Loading Products...</div>;
    }

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
                ):(
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
                    className="mt-4 w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded disabled:opacity-50 cursor-pointer"
                    disabled={!selectedAddressId}
                >
                    Proceed
                </button>
                </>
                )}
            </form>
        </div>
        // <div className="m-10">
        //     <h2 className="text-xl font-semibold mb-4">Choose a Delivery Address</h2>
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //         {addresses.map((address) => (
        //             <div key={address._id} className="p-4 border rounded hover:border-blue-500 cursor-pointer" onClick={() => onSelect(address)}>
        //                 <p>{address.name}, {address.mobile}</p>
        //                 <p>{address.address}, {address.landmark}, {address.city}, {address.state} {address.pincode}</p>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};


export default AddressSelection;