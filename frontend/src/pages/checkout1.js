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
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCartDetails = async (id) => {
        try {
            const cartResponse = await axios.get(`http://localhost:5000/api/carts/${id}`);
            const cartData = cartResponse.data.cart;
            const productDetails = await Promise.all(cartData.items.map(async (item) => {
                const productResponse = await axios.get(`http://localhost:5000/api/products/${item.product}`);
                return {
                    ...item,
                    productDetails: productResponse.data.product,
                };
            }));
            setCartItems(productDetails);

        } catch (error) {
            console.error('Failed to fetch cart or product details', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCartDetails('65db29ba433a6266a8d13f40');
    }, []);
console.log(cartItems)
    const totalPrice = cartItems.reduce((total, item) => total + item.productDetails.price * item.quantity, 0);
    const currentDate = new Date();
    const discountPrice = cartItems.reduce((totalD, item) =>
        totalD + ((item.productDetails.discountPercentage > 0 && currentDate >= new Date(item.productDetails.discountStart) && currentDate <= new Date(item.productDetails.discountEnd)) ? item.productDetails.price * item.productDetails.discountPercentage / 100 * item.quantity : 0), 0);


    if (isLoading) {
        return <div className='mt-[60px]'>Loading cart...</div>;
    }



    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setCurrentStep(2); // Move to payment options after address selection
    };

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
        setCurrentStep(3); // Move to confirm order after payment selection
    };

    const confirmOrder = async () => {
        console.log(selectedAddress, paymentMethod);
        try {
            const { data } = await axios.post('/api/orders', {
                address: selectedAddress,
                paymentMethod,
                items: cartItems.items,
                total: cartItems.total
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
                {currentStep === 3 && <ConfirmOrder details={{selectedAddress,cartItems,paymentMethod}} onConfirm={confirmOrder} />}
            </div>

            {/* Right section */}
            <OrderSummary TotalPrice={totalPrice} DiscountPrice={discountPrice} itemNo={cartItems.length}/>
        </div>
    );
};

export default CheckoutPage;
