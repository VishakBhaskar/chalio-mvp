import React from 'react';

const OrderConfirmation = ({ isOpen, phoneNumber, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-mexican-brown mb-4">
          Order Placed Successfully!
        </h2>

        {/* Message */}
        <div className="space-y-4 text-center mb-8">
          <p className="text-gray-700 text-lg">
            Thank you for your order!
          </p>
          <div className="bg-mexican-yellow bg-opacity-20 rounded-lg p-4 border border-mexican-yellow">
            <p className="text-gray-800 font-medium">
              A payment link has been sent to:
            </p>
            <p className="text-mexican-orange font-bold text-xl mt-2">
              {phoneNumber}
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            Please check your messages to complete payment and confirm your order.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-mexican-orange hover:bg-mexican-red text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
