import React from 'react';

const CallButton = ({ isValid, callStatus, onStartCall, onStopCall }) => {
  const getButtonConfig = () => {
    switch (callStatus) {
      case 'idle':
        return {
          text: 'Call to Order',
          icon: '📞',
          className: isValid
            ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed',
          disabled: !isValid,
          onClick: onStartCall
        };
      case 'connecting':
        return {
          text: 'Connecting...',
          icon: '⏳',
          className: 'bg-blue-500 text-white cursor-wait',
          disabled: true,
          onClick: null
        };
      case 'active':
        return {
          text: 'End Call',
          icon: '📞',
          className: 'bg-red-600 hover:bg-red-700 text-white cursor-pointer',
          disabled: false,
          onClick: onStopCall
        };
      case 'ended':
      case 'error':
        return {
          text: 'Call Again',
          icon: '📞',
          className: 'bg-green-600 hover:bg-green-700 text-white cursor-pointer',
          disabled: false,
          onClick: onStartCall
        };
      default:
        return {
          text: 'Call to Order',
          icon: '📞',
          className: 'bg-gray-400 text-gray-200 cursor-not-allowed',
          disabled: true,
          onClick: null
        };
    }
  };

  const config = getButtonConfig();

  return (
    <button
      type="button"
      onClick={config.onClick}
      disabled={config.disabled}
      className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg ${config.className}`}
      aria-label={config.text}
    >
      <span className="text-2xl">{config.icon}</span>
      <span>{config.text}</span>
      {callStatus === 'connecting' && (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      )}
    </button>
  );
};

export default CallButton;
