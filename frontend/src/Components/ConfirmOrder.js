// components/ConfirmOrder.js
// components/ConfirmOrder.js
import React from 'react';

//const ConfirmOrder = ({ address, paymentMethod, products, onConfirm }) => {
const ConfirmOrder = ({ details, onConfirm }) => {
    console.log(details)

    const address = {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'Anytown',
        state: 'California',
        pincode: '12345',
    };

    const paymentMethod = 'Credit Card'; // Example payment method

    const products = [
        { name: 'Product 1', price: 20, quantity: 2 },
        { name: 'Product 2', price: 30, quantity: 1 },
    ];

    return (
        <div className="max-w-3xl mx-auto p-5 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>

            <div className="mb-4 border rounded p-2">
                <h3 className="text-lg font-semibold mb-2">Selected Address</h3>
                <p>{details.selectedAddress.name}</p>
                <p>{details.selectedAddress.address}, {details.selectedAddress.city}, {details.selectedAddress.state} - {details.selectedAddress.pincode}</p>
            </div>

            <div className="mb-4 border rounded p-2">
                <h3 className="text-lg font-semibold mb-2">Selected Payment Method</h3>
                <p>{details.paymentDetails.selectedOption==="COD"?"COD (Pay on Delivery)":details.paymentDetails.selectedOption}</p>
            </div>

            <div className="mb-4 border rounded p-2">
                <h3 className="text-lg font-semibold mb-2">Selected Products</h3>
                <ul>
                    {details.cartItems.map((item, index) => (
                        <li key={index} className="mb-2 border rounded p-2">
                            <p>{item.productDetails.name} - ₹{item.productDetails.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <p>Please review your order details before confirming your purchase.</p>

            <button onClick={onConfirm}
                className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded inline-block">
                Confirm Order {details.paymentDetails.selectedOption === "COD"? "":"& Pay"}
            </button>
        </div>
    );
};

export default ConfirmOrder;
