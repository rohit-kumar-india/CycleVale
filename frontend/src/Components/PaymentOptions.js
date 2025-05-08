// const PaymentOptions = ({ onNext, onBack }) => {
//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">Payment Options</h2>
//             {/* Display payment options */}
//             <button onClick={onNext} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Review Order</button>
//             <button onClick={onBack} className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Back to Address</button>
//         </div>
//     );
// };

import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";
import axios from "axios";
import StripeForm from './StripeForm';

// components/PaymentOptions.js
const PaymentOptions = ({ onSelect }) => {
    const userId = "65db29ba433a6266a8d13f40";
    const [selectedOption, setSelectedOption] = useState('');
    const [showUPIOptions, setShowUPIOptions] = useState(false);
    const [showCCOptions, setShowCCOptions] = useState(false);
    const [showWalletOptions, setShowWalletOptions] = useState(false);
    const [showCODOptions, setShowCODOptions] = useState(false);
    const [selectedCard, setSelectedCard] = useState('');
    const [selectedUPI, setSelectedUPI] = useState('');
    const [selectedWallet, setSelectedWallet] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [newUPI, setNewUPI] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({});

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setShowUPIOptions(true);
        setShowCCOptions(true);
        setShowWalletOptions(true);
        setShowCODOptions(true);
        setSelectedCard('');
        setSelectedUPI('');
        setSelectedWallet('');
        setCaptcha('');
    };


    const STRIPE_PUBLISHABLE_KEY = "pk_test_51P8KyQSDDXXhwxjmtDRh8o5OZuRulHmyl5ZwMKZzfffP0GJvkaL9pKWjRY07pGmxkXedei74UarR2dhxdiNgsVo000Kdp8zOsx"
    // Load Stripe outside of component to ensure it's only loaded once
    const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

    useEffect(() => {

        async function fetchPaymentDetails(id) {
            //setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback
            try {
                // Fetch the user's address
                const response = await axiosInstance.get(`/api/users/${id}/paymentDetails`);
                setPaymentDetails(response.data.data); // Update the state once after processing all items

            } catch (error) {
                console.error('Failed to fetch address or product details', error);
            } finally {
                //setIsLoading(false); // Update loading state
            }
        }

        fetchPaymentDetails(userId);
    }, []);


    const handleSavedCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleUPISelection = (upi) => {
        setSelectedUPI(upi);
    };

    const handleWalletSelection = (wallet) => {
        setSelectedWallet(wallet);
    };

    const handleProceed = () => {
        console.log(selectedOption, selectedCard)
        if (selectedOption == 'card') {
            onSelect({ selectedOption, selectedCard });
        } else if (selectedOption == 'UPI') {
            onSelect({ selectedOption, selectedUPI });
        } else if (selectedOption == 'Wallet') {
            onSelect({ selectedOption, selectedWallet });
        } else if (selectedOption == 'COD') {
            onSelect({ selectedOption });
        }
    };

    const handleUPI = () => {
        setSelectedUPI(newUPI);
        handleProceed();
    };

    const handleCard = (card) => {
        setSelectedCard(card);
        handleProceed();
    }




    // const [selectedOption, setSelectedOption] = useState('');

    // const handleSelectOption = (option) => {
    //     setSelectedOption(option);
    // };

    // const handleProceed = () => {
    //     if (selectedOption) {
    //         onSelect(selectedOption);
    //     }
    // };

    return (
        <>
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                <div className="flex flex-col space-y-4">
                    <div className="border rounded">
                        <button
                            onClick={() => handleSelectOption('card')}
                            className={`px-4 py-2 w-full mb-2 hover:bg-blue-50 ${selectedOption === 'card' ? 'bg-blue-100' : ''}`}
                        >
                            Card Payment
                        </button>
                        {showCCOptions && selectedOption === 'card' && (
                            <div className="mx-4">
                                {/* Display saved credit cards */}
                                {/* Map through saved credit cards and display each one */}
                                {paymentDetails.cards.map((card) => (
                                    <div key={card.cardNumber.slice(-4)} className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                        <input
                                            type="radio"
                                            id={`card${card.cardNumber.slice(-4)}`}
                                            name="savedCard"
                                            checked={selectedCard && selectedCard === card}
                                            onChange={() => handleSavedCardClick(card)}
                                            className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                        />
                                        <label htmlFor={`card${card.cardNumber.slice(-4)}`} className="cursor-pointer">
                                            {card.cardName} - XXXX XXXX XXXX {card.cardNumber.slice(-4)}
                                        </label>
                                    </div>
                                ))}

                                {/* Option to add a new credit card */}
                                {/* <div className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                    <input
                                        type="radio"
                                        id="new"
                                        name="newCard"
                                        checked={selectedCard && selectedCard === "new"}
                                        onChange={() => handleSavedCardClick("new")}
                                        className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                    />
                                    <label htmlFor="new" className="text-lg font-semibold mb-2 cursor-pointer">
                                        Enter Card Details
                                        {selectedCard === "new" && (
                                            <form onSubmit={handleAddCreditCard} className="ml-12">
                                                <input
                                                    type="text"
                                                    placeholder="Card Number"
                                                    value={newCreditCard.cardNumber}
                                                    onChange={(e) => setNewCreditCard({ ...newCreditCard, cardNumber: e.target.value })}
                                                    className="border rounded px-2 py-1 mt-2 mb-2 mr-2"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Expiry Date"
                                                    value={newCreditCard.expiryDate}
                                                    onChange={(e) => setNewCreditCard({ ...newCreditCard, expiryDate: e.target.value })}
                                                    className="border rounded px-2 py-1 mt-2 mb-2 mr-2"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Cvv"
                                                    value={newCreditCard.cvv}
                                                    onChange={(e) => setNewCreditCard({ ...newCreditCard, cvv: e.target.value })}
                                                    className="border rounded px-2 py-1 mt-2 mb-2 mr-2"
                                                    required
                                                />
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Card</button>
                                            </form>
                                        )}
                                    </label>
                                </div> */}
                                <Elements stripe={stripePromise}>
                                    <stripeForm />
                                    <div className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                        <input
                                            type="radio"
                                            id="newCard"
                                            name="newCard"
                                            checked={selectedCard && selectedCard === "newCard"}
                                            onChange={() => handleSavedCardClick("newCard")}
                                            className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                        />
                                        <label htmlFor="newCard" className="text-lg font-semibold mb-2 cursor-pointer">
                                            Enter stripe Card Details
                                            {selectedCard === "newCard" && (
                                                <StripeForm onConfirm={handleCard} />
                                                // <form onSubmit={handleAddCreditCard} className="ml-12">
                                                //     <div id="card-details" className="max-w-md my-2 border border-gray-300 rounded p-2">
                                                //         <CardElement
                                                //             options={{
                                                //                 style: {
                                                //                     base: {
                                                //                         fontSize: '16px', color: '#424770',
                                                //                         '::placeholder': {
                                                //                             color: '#aab7c4',
                                                //                         },
                                                //                     },
                                                //                     invalid: {
                                                //                         color: '#9e2146',
                                                //                     },
                                                //                 },
                                                //                 hidePostalCode: true, // Hide the postal code or zip field
                                                //             }}
                                                //         />
                                                //     </div>
                                                //     <button
                                                //         type="submit"
                                                //         disabled={!stripe}
                                                //         className="bg-green-500 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                //     >
                                                //         Pay Now
                                                //     </button>
                                                // </form>
                                            )}
                                        </label>
                                    </div>
                                </Elements>
                            </div>

                        )}
                    </div>
                    <div className="border rounded">
                        <button
                            onClick={() => handleSelectOption('UPI')}
                            className={`px-4 py-2 w-full mb-2 hover:bg-blue-50 ${selectedOption === 'UPI' ? 'bg-blue-100' : ''}`}
                        >
                            UPI
                        </button>
                        {showUPIOptions && selectedOption === 'UPI' && (
                            <div className="mx-4">
                                {/* Display saved UPIs and option to add new */}
                                {/* Implement as per your data structure and requirements */}
                                {paymentDetails.upis.map((upi) => (
                                    <div key={upi.upiId} className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                        <input
                                            type="radio"
                                            id={`upi${upi.upiId}`}
                                            name="savedCard"
                                            checked={selectedUPI && selectedUPI === upi}
                                            onChange={() => handleUPISelection(upi)}
                                            className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                        />
                                        <label htmlFor={`upi${upi.upiId}`} className="cursor-pointer">
                                            {upi.upiId}
                                        </label>
                                    </div>
                                ))}

                                {/* Option to enter new UPI Details */}
                                <div className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                    <input
                                        type="radio"
                                        id="new"
                                        name="newUPI"
                                        checked={selectedUPI && selectedUPI === "new"}
                                        onChange={() => handleUPISelection("new")}
                                        className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                    />
                                    <label htmlFor="new" className="text-lg font-semibold my-2 cursor-pointer">
                                        Enter UPI
                                        {selectedUPI === "new" && (
                                            <form onSubmit={handleUPI} className="flex ml-12 my-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter UPI Id"
                                                    value={newUPI}
                                                    onChange={(e) => setNewUPI(e.target.value)}
                                                    className="border rounded p-2 w-96 font-normal text-base"
                                                    required
                                                />
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded min-w-max">Select UPI</button>
                                            </form>
                                        )}
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="border rounded">
                        <button
                            onClick={() => handleSelectOption('Wallet')}
                            className={`px-4 py-2 w-full mb-2 hover:bg-blue-50 ${selectedOption === 'Wallet' ? 'bg-blue-100' : ''}`}
                        >
                            Wallet
                        </button>
                        {showWalletOptions && selectedOption === 'Wallet' && (
                            <div className="mx-4">
                                {/* Display saved UPIs and option to add new */}
                                {/* Implement as per your data structure and requirements */}
                                {paymentDetails.wallets.map((wallet) => (
                                    <div key={wallet.walletName} className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                        <input
                                            type="radio"
                                            id={`wallet${wallet.walletName}`}
                                            name="wallet"
                                            checked={selectedWallet && selectedWallet === wallet}
                                            onChange={() => handleWalletSelection(wallet)}
                                            className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                        />
                                        <label htmlFor={`wallet${wallet.walletName}`} className="cursor-pointer">
                                            {wallet.walletName} - ₹{wallet.walletBalance}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Add more payment options as needed */}
                    <div className="border rounded">
                        <button
                            onClick={() => handleSelectOption('COD')}
                            className={`px-4 py-2 w-full mb-2 hover:bg-blue-50 ${selectedOption === 'COD' ? 'bg-blue-100' : ''}`}
                        >
                            Cash on Delivery
                        </button>
                        {showCODOptions && selectedOption === 'COD' && (
                            <div className="mx-4">
                                {/* Display captcha or other verification options */}
                                <input
                                    type="text"
                                    placeholder="Captcha"
                                    value="CycleVale"
                                    className="border rounded px-2 py-1 my-2 mr-2 font-semibold"
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Captcha"
                                    value={captcha}
                                    onChange={(e) => setCaptcha(e.target.value)}
                                    className="border rounded px-2 py-1 mt-2 mb-2"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleProceed}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 my-4"
                    disabled={!(selectedOption && ((selectedCard && selectedCard !== "newCard") || (selectedUPI && selectedUPI !== "new") || selectedWallet || captcha === "CycleVale"))}
                >
                    Select Payment & Proceed
                </button>
            </div>
        </>
    );
};


export default PaymentOptions;