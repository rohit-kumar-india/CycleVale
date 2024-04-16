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

// components/PaymentOptions.js
const PaymentOptions = ({ onSelect }) => {
    return (
        <div>
            <h2 className="mt-[60px] text-xl font-semibold mb-4">Select Payment Method</h2>
            <div className="flex flex-col">
                <button onClick={() => onSelect('Credit Card')} className="px-4 py-2 border rounded mb-2 hover:bg-blue-50">Credit Card</button>
                <button onClick={() => onSelect('PayPal')} className="px-4 py-2 border rounded mb-2 hover:bg-blue-50">PayPal</button>
                <button onClick={() => onSelect('Bitcoin')} className="px-4 py-2 border rounded mb-2 hover:bg-blue-50">Bitcoin</button>
            </div>
        </div>
    );
};


export default PaymentOptions;