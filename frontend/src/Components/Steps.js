// components/Steps.js
const Steps = ({ currentStep }) => {
    const steps = ['Select Address', 'Payment Method', 'Confirm Order'];

    return (
        <div className="flex justify-between text-center p-5">
            {steps.map((step, index) => (
                <div key={index} className={`w-1/3 ${index + 1 <= currentStep ? 'text-blue-500' : 'text-gray-400'}`}>
                    <div className="text-xs uppercase tracking-wide">{step}</div>
                    <div className={`w-10 h-10 mx-auto mt-1 rounded-full ${index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                </div>
            ))}
        </div>
    );
};

export default Steps;