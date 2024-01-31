import React from 'react';

const PaymentStepper = ({ activeStep }) => {
  const steps = ['Personal Info', 'Ship address', 'Facturation address', 'Payment'];

  return (
    <div className="flex items-center justify-center mt-[150px] mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex items-center">
            <div
              className={`md:w-12 md:h-12 px-3 py-1 flex items-center justify-center rounded-full ${index === activeStep ? 'font-bold bg-blue-300' : ''} ${
                index < activeStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-10 bg-${
                  index < activeStep ? 'green' : 'gray'
                }-500 mx-2`}
              ></div>
            )}
          </div>
          <div className={`text-sm ${index === activeStep ? 'font-bold' : ''}`}>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentStepper;
