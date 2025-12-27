import React, { useState } from 'react';
import './App.css';
import PhoneInput from './components/PhoneInput';
import CallButton from './components/CallButton';
import CallStatus from './components/CallStatus';
import Menu from './components/Menu';
import OrderConfirmation from './components/OrderConfirmation';
import useRetellCall from './hooks/useRetellCall';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    callStatus,
    agentSpeaking,
    error,
    startCall,
    stopCall
  } = useRetellCall();

  // Show confirmation when call ends
  React.useEffect(() => {
    if (callStatus === 'ended' && !error) {
      setShowConfirmation(true);
    }
  }, [callStatus, error]);

  const handleStartCall = async () => {
    if (!isPhoneValid || !phoneNumber) {
      alert('Please enter a valid phone number');
      return;
    }

    // Use environment variable or default agent ID
    const agentId = process.env.REACT_APP_RETELL_AGENT_ID;
    await startCall(phoneNumber, agentId);
  };

  const handleStopCall = () => {
    stopCall();
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // Keep phone number for easier reordering
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige via-mexican-yellow to-mexican-orange">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-mexican-brown mb-2">
            La Casa Del Sabor
          </h1>
          <p className="text-xl text-mexican-red font-medium">
            Authentic Mexican Cuisine
          </p>
          <p className="text-gray-700 mt-2">
            Order by voice - Browse our menu while you call
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Powered by Burn Media Group
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Order Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-mexican-brown mb-6">
              Place Your Order
            </h2>

            {/* Phone Input */}
            <div className="mb-6">
              <PhoneInput
                onPhoneChange={setPhoneNumber}
                onValidationChange={setIsPhoneValid}
              />
            </div>

            {/* Call Button */}
            <CallButton
              isValid={isPhoneValid}
              callStatus={callStatus}
              onStartCall={handleStartCall}
              onStopCall={handleStopCall}
            />

            {/* Call Status */}
            <CallStatus
              callStatus={callStatus}
              agentSpeaking={agentSpeaking}
              error={error}
            />
          </div>

          {/* Menu Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-mexican-brown mb-6 text-center">
              Our Menu
            </h2>
            <Menu />
          </div>
        </div>

        {/* Order Confirmation Modal */}
        <OrderConfirmation
          isOpen={showConfirmation}
          phoneNumber={phoneNumber}
          onClose={handleCloseConfirmation}
        />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-8">
      </footer>
    </div>
  );
}

export default App;
