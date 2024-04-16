// pages/checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressSelection from '../Components/AddressSelection';
import PaymentOptions from '../Components/PaymentOptions';
import ConfirmOrder from '../Components/ConfirmOrder';
import Steps from '../Components/Steps';
import OrderSummary from '@/Components/OrderSummary';

const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setCurrentStep(2); // Move to payment options after address selection
    };

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
        setCurrentStep(3); // Move to confirm order after payment selection
    };

    const confirmOrder = async () => {
        try {
            const { data } = await axios.post('/api/orders', {
                address: selectedAddress,
                paymentMethod,
                items: orderDetails.items,
                total: orderDetails.total
            });
            // Redirect to success page or handle next step
            console.log('Order placed:', data);
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    return (
        <div className=" mt-[60px] flex flex-col md:flex-row justify-center max-w-7xl mx-auto px-4">
            {/* Left Section */}
            <div className='md:w-3/4'>
            <Steps currentStep={currentStep} />
            {currentStep === 1 && <AddressSelection onSelect={handleAddressSelect} />}
            {currentStep === 2 && <PaymentOptions onSelect={handlePaymentSelect} />}
            {currentStep === 3 && <ConfirmOrder details={orderDetails} onConfirm={confirmOrder} />}
            </div>

            {/* Right section */}
            <OrderSummary/>
        </div>
    );
};

export default CheckoutPage;
