// components/ConfirmOrder.js
const ConfirmOrder = ({ details, onConfirm }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
            <p>Please review your order details before confirming your purchase.</p>
            {/* Display order details here */}
            <button onClick={onConfirm} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Confirm Order</button>
        </div>
    );
};

export default ConfirmOrder;