// routes/payment.js
const stripeConfig = require('../config/stripeConfig');
const stripe = require('stripe')(stripeConfig.Secret_key);

exports.processPayment = async (req, res) => {
    const { paymentType, paymentCard, totalAmount } = req.body;
    try {
        // Collect card details from the user (example card details)
        const cardDetails = {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2034,
            cvc: '123'
        };
        var testCard;

        if (paymentType === 'card') {
            testCard = { token: 'tok_visa' };
        } else {
            testCard = paymentCard;
        }
        console.log(paymentType)
        console.log(testCard)
        // Use a test token provided by Stripe
        const testToken = 'tok_visa'; // Example test token for a Visa card

        // Create a payment method using the collected card details
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            //card: cardDetails,

            card: testCard
        });

        // Use the payment method ID in your API request
        const paymentMethodId = paymentMethod.id;
        console.log(paymentMethodId);
        //const { paymentMethodId } = req.body;

        // Convert amount to the smallest currency unit (e.g., paise for INR)
const totalAmountInPaise = Math.round(totalAmount * 100);

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method: paymentMethodId,
            amount: totalAmountInPaise, // in paisa
            currency: 'inr',
            description: 'Example Charge',
            confirm: true,
            return_url: 'https://yourwebsite.com/payment/success'
        });

        // Handle successful paymentIntent
        // Save order details in database, send confirmation email, etc.

        res.status(200).json({ message: 'Payment successful', paymentMethodId, paymentIntent });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Error processing payment' });
    }
};

