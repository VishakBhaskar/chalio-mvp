import React from 'react';

const CallStatus = ({ callStatus, agentSpeaking, error }) => {
  if (callStatus === 'idle') {
    return null;
  }

  return (
    <div className="mt-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <span className="text-red-600 text-xl mr-2">⚠️</span>
            <div>
              <h3 className="text-red-800 font-semibold">Call Error</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Active Call Indicator */}
      {callStatus === 'active' && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3">
                {agentSpeaking && (
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                )}
                <div className={`w-4 h-4 rounded-full ${agentSpeaking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Call in Progress</h3>
                <p className="text-green-600 text-sm">
                  {agentSpeaking ? 'Agent is speaking...' : 'Listening...'}
                </p>
              </div>
            </div>
            <div className="text-2xl animate-pulse">🎤</div>
          </div>
        </div>
      )}

      {/* Connecting Indicator */}
      {callStatus === 'connecting' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <h3 className="text-blue-800 font-semibold">Connecting...</h3>
              <p className="text-blue-600 text-sm">Please wait while we connect your call</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallStatus;
