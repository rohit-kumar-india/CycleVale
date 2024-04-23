// pages/checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AddressSelection from '../Components/AddressSelection';
import PaymentOptions from '../Components/PaymentOptions';
import ConfirmOrder from '../Components/ConfirmOrder';
import Steps from '../Components/Steps';
import OrderSummary from '@/Components/OrderSummary';

const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [processing, setProcessing] = useState(false); // State to manage processing status
    const [dynamicText, setDynamicText] = useState('');

    const fetchCartDetails = async (id) => {
        try {
            setDynamicText('Loading cart Items...');
            setProcessing(true);
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
            setProcessing(false);
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
        setPaymentDetails(method);
        console.log(paymentDetails)
        setCurrentStep(3); // Move to confirm order after payment selection
    };

    const processPayment = async () => {
        const stripe = useStripe();
        const elements = useElements();
        const [error, setError] = useState(null);

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements) {
                // Stripe.js has not yet loaded
                return;
            }

            const cardElement = elements.getElement(CardElement);

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.error('Error creating payment method:', error);
                setError(error.message);
            } else {
                // Send paymentMethod.id to your server
                try {
                    const response = await axios.post('/api/payment', {
                        paymentMethodId: paymentMethod.id,
                    });
                    onSuccess(response.data);
                } catch (error) {
                    console.error('Error making payment:', error);
                    setError('Error making payment. Please try again later.');
                }
            }
        }
    }

    const confirmOrder = async () => {
        setDynamicText('Processing Payments...');
        setProcessing(true);
        console.log(selectedAddress, paymentDetails);
        if (paymentDetails.selectedOption === 'card' || paymentDetails.selectedOption === 'newCard') {

            try {
                const response = await axios.post('http://localhost:5000/api/payments', {
                    paymentType: paymentDetails.selectedOption,
                    paymentCard: paymentDetails.selectedCard,
                    totalAmount: (totalPrice - discountPrice + 10).toFixed(2)
                });
                // Redirect to success page or handle next step
                console.log('Order placed:', response.data);
            } catch (error) {
                console.error('Failed to place order:', error);
            }

            // const { paymentMethod, error } = await stripe.createPaymentMethod({
            //     type: 'card',
            //     card: paymentDetails.selectedCard
            //   });
            //   console.log(paymentMethod)
        }
        try {
            const { data } = await axios.post('/api/orders', {
                address: selectedAddress,
                paymentDetails,
                items: cartItems.items,
                total: cartItems.total
            });
            // Redirect to success page or handle next step
            console.log('Order placed:', data);
        } catch (error) {
            console.error('Failed to place order:', error);
        } finally {
            // Hide the processing popup and set processing status to false
            setProcessing(false);
          }
    };

    return (
        <div className=" mt-[60px] flex flex-col md:flex-row justify-center max-w-7xl mx-auto px-4">
            {/* Left Section */}
            <div className='md:w-3/4'>
                <Steps currentStep={currentStep} />
                {currentStep === 1 && <AddressSelection onSelect={handleAddressSelect} />}
                {currentStep === 2 && <PaymentOptions onSelect={handlePaymentSelect} />}
                {currentStep === 3 && <ConfirmOrder details={{ selectedAddress, cartItems, paymentDetails }} onConfirm={confirmOrder} />}
            </div>

            {/* Right section */}
            <OrderSummary TotalPrice={totalPrice} DiscountPrice={discountPrice} itemNo={cartItems.length} />
            {/* Processing popup */}
            {processing && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
                <div className="text-white text-lg ml-4">{dynamicText}</div>
              </div>
            )}
        </div>
    );
};

export default CheckoutPage;
