import React, { useState } from 'react';
import CartSummary from '../Components/CartSummary';
import AddressSelection from '../Components/AddressSelection';
import PaymentOptions from '../Components/PaymentOptions';
import OrderConfirmation from '../Components/OrderConfirmation';

const steps = [
  'Cart Summary',
  'Shipping Address',
  'Payment Options',
  'Review & Confirm'
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CartSummary onNext={nextStep} />;
      case 1:
        return <AddressSelection addresses={user.addresses} onNext={nextStep} onBack={previousStep} />;
      case 2:
        return <PaymentOptions onNext={nextStep} onBack={previousStep} />;
      case 3:
        return <OrderConfirmation onBack={previousStep} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="mt-[60px] container mx-auto px-4 py-8">
      <div className="mb-8">
        <ul className="flex justify-around">
          {steps.map((step, index) => (
            <li key={step} className={`px-4 py-2 text-sm font-bold ${currentStep === index ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}>
              {step}
            </li>
          ))}
        </ul>
      </div>
      {renderStep()}
    </div>
  );
};

export default CheckoutPage;
