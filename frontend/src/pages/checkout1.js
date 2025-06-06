// pages/checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AddressSelection from '../Components/AddressSelection';
import PaymentOptions from '../Components/PaymentOptions';
import ConfirmOrder from '../Components/ConfirmOrder';
import Steps from '../Components/Steps';
import OrderSummary from '@/Components/OrderSummary';

const CheckoutPage = () => {
    const currentDate = new Date();
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [processing, setProcessing] = useState(false); // State to manage processing status
    const [dynamicText, setDynamicText] = useState('');

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });

    const fetchCartDetails = async (id) => {
        try {
            setDynamicText('Loading cart Items...');
            setProcessing(true);
            const cartResponse = await axiosInstance.get(`/api/carts/${id}`);
            const cartData = cartResponse.data.cart;
            const productDetails = await Promise.all(cartData.items.map(async (item) => {
                const productResponse = await axiosInstance.get(`/api/products/${item.product}`);
                return {
                    ...item,
                    productDetails: productResponse.data.product,
                    purchasePrice: (productResponse.data.product.discountPercentage > 0 && currentDate >= new Date(productResponse.data.product.discountStart) && currentDate <= new Date(productResponse.data.product.discountEnd)) ? productResponse.data.product.price * (100 - productResponse.data.product.discountPercentage) / 100 : productResponse.data.product.price
                };
            }));
            setCartItems(productDetails);
            setUserId(id);
        } catch (error) {
            console.error('Failed to fetch cart or product details', error);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            router.push('/Login')
        } else {
            let id = localStorage.getItem('userId');
            fetchCartDetails(id);
        }
    }, []);
    console.log(cartItems)
    const totalPrice = cartItems.reduce((total, item) => total + item.productDetails.price * item.quantity, 0);

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

    const ProcessPayment = async () => {
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
                    const response = await axiosInstance.post('/api/payment', {
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
        try {
            if (paymentDetails.selectedOption === 'card' || paymentDetails.selectedOption === 'newCard') {


                const paymentResponse = await axiosInstance.post('/api/payments', {
                    paymentType: paymentDetails.selectedOption,
                    paymentCard: paymentDetails.selectedCard,
                    totalAmount: (totalPrice - discountPrice + 10).toFixed(2)
                });
                // Redirect to success page or handle next step
                console.log('Order placed:', paymentResponse.data);

                //setPaymentDetails(prevPaymentDetails => ({ ...prevPaymentDetails, paymentMethod: paymentDetails.selectedOption, paymentStatus: 'Complete', transactionId: paymentResponse.data.paymentIntent.id }));
                //console.log(paymentDetails);
                var paymentId = paymentResponse.data.paymentIntent.id;
                var paymentStatus = "Complete";
                // const { paymentMethod, error } = await stripe.createPaymentMethod({
                //     type: 'card',
                //     card: paymentDetails.selectedCard
                //   });
                //   console.log(paymentMethod)
            } else if (paymentDetails.selectedOption === 'UPI') {
                var paymentStatus = "Complete";

            } else if (paymentDetails.selectedOption === 'Wallet') {
                var paymentStatus = "Complete";

            } else if (paymentDetails.selectedOption === 'COD') {
                var paymentStatus = "Pending";
            }

            setDynamicText('Payment Done... Placing your order...');

            const orderResponse = await axiosInstance.post('/api/orders/place-order', {
                userId,
                shippingDetails: selectedAddress,
                paymentDetails: {
                    paymentMethod: paymentDetails.selectedOption,
                    paymentStatus,
                    transactionId: paymentDetails.selectedOption === 'card' ? paymentId : null
                },
                items: cartItems,
                totalAmount: (totalPrice - discountPrice + 10).toFixed(2)
            });
            // Redirect to success page or handle next step
            console.log('Order placed:', orderResponse);
            if (orderResponse.status === 201) {
                setTimeout(() => {
                    router.push(`/orders/${orderResponse.data.order._id}`);
                }, 2000);
            }
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
            <OrderSummary TotalPrice={totalPrice} DiscountPrice={discountPrice} itemNo={cartItems.length} page={"checkout"} step={currentStep} paymentMethod={paymentDetails.selectedOption} onConfirm={confirmOrder} />
            {/* Processing popup */}
            {processing && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                    <div className="text-white text-lg ml-4">{dynamicText}</div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
