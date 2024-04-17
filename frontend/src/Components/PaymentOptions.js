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

import { useState, useEffect } from "react";
import axios from "axios";

const demo = [
    { id: 1, cardNumber: "1234 5678 9012 3456", expiryDate: "12/24" },
    { id: 2, cardNumber: "5678 1234 9012 3456", expiryDate: "06/23" },
    { id: 3, cardNumber: "9012 3456 1234 5678", expiryDate: "09/25" },
]

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
    const [selectedCOD, setSelectedCOD] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [newCreditCard, setNewCreditCard] = useState({ cardNumber: "", expiryDate: "", cvv: "" });
    const [paymentDetails, setPaymentDetails] = useState({});

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setShowUPIOptions(true);
        setShowCCOptions(true);
        setShowWalletOptions(true);
        setShowCODOptions(true);
        setSelectedUPI('');
        setSelectedWallet('');
        setSelectedCOD('');
        setCaptcha('');
    };

    useEffect(() => {

        async function fetchPaymentDetails(id) {
            //setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback
            try {
                // Fetch the user's address
                const response = await axios.get(`http://localhost:5000/api/users/${id}/paymentDetails`);
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
    const handleCODSelection = (cod) => {
        setSelectedCOD(cod);
    };

    const handleProceed = () => {
        if (selectedOption == 'Credit Card') {
            onSelect({selectedOption , selectedCard});
        }else if(selectedOption == 'UPI') {
            onSelect({selectedOption , selectedUPI});
        }else if(selectedOption == 'Wallet'){
            onSelect({selectedOption , selectedWallet});
        }else if(selectedOption == 'Cash on Delivery'){
            onSelect({selectedOption});
        }
    };

    const handleAddCreditCard = () => {
        if (selectedOption) {
            onSelect(selectedOption);
        }
    };






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
                            onClick={() => handleSelectOption('Credit Card')}
                            className={`px-4 py-2 w-full mb-2 hover:bg-blue-50 ${selectedOption === 'Credit Card' ? 'bg-blue-100' : ''}`}
                        >
                            Credit Card
                        </button>
                        {showCCOptions && selectedOption === 'Credit Card' && (
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
                                <div className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
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
                                </div>
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

                                {/* Option to add a new credit card */}
                                <div className="my-2 py-2 cursor-pointer hover:bg-gray-200 border">
                                    <input
                                        type="radio"
                                        id="new"
                                        name="newUPI"
                                        checked={selectedUPI && selectedUPI === "new"}
                                        onChange={() => handleUPISelection("new")}
                                        className="form-radio mx-4 h-4 w-4 cursor-pointer"
                                    />
                                    <label htmlFor="new" className="text-lg font-semibold mb-2 cursor-pointer">
                                        Enter UPI
                                        {selectedUPI === "new" && (
                                            <form onSubmit={handleAddCreditCard} className="ml-12">
                                                <input
                                                    type="text"
                                                    placeholder="UPT Id"
                                                    value={newCreditCard.cardNumber}
                                                    onChange={(e) => setNewCreditCard({ ...newCreditCard, cardNumber: e.target.value })}
                                                    className="border rounded px-2 py-1 mt-2 mb-2 mr-2"
                                                    required
                                                />
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Card</button>
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
                            onClick={() => handleSelectOption('Cash on Delivery')}
                            className={`px-4 py-2 w-full mb-2 hover:bg-blue-50 ${selectedOption === 'Cash on Delivery' ? 'bg-blue-100' : ''}`}
                        >
                            Cash on Delivery
                        </button>
                        {showCODOptions && selectedOption === 'Cash on Delivery' && (
                            <div className="mx-4">
                                {/* Display captcha or other verification options */}
                                <input
                                    type="text"
                                    placeholder="Captcha"
                                    value="CycleVale"
                                    className="border rounded px-2 py-1 my-2 mr-2"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled={!selectedOption}
                >
                    Proceed
                </button>
            </div>

        </>
    );
};


export default PaymentOptions;