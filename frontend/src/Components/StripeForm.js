// components/CheckoutForm.js
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const StripeForm = ({ onConfirm }) => {
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
    console.log(cardElement)

    onConfirm(cardElement);

  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-left ml-12 my-2">
      {/* <div className="mb-4"> */}
      {/* <label htmlFor="card-details" className="block text-sm font-semibold mb-1">
          Card Details
        </label> */}
      <div id="card-details" className="border border-gray-300 rounded p-2 w-96">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: true, // Hide the postal code or zip field
          }}
        />
        {/* </div> */}
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold ml-4 py-2 px-4 min-w-max rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Select Card
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default StripeForm;