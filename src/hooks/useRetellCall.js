import { useState, useEffect, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import axios from 'axios';

const useRetellCall = () => {
  const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, active, ended, error
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const retellWebClient = useRef(null);
  const [callId, setCallId] = useState(null);

  // Initialize Retell client
  useEffect(() => {
    retellWebClient.current = new RetellWebClient();

    // Set up event listeners
    const client = retellWebClient.current;

    // Call started
    client.on('call_started', () => {
      console.log('Call started successfully');
      setCallStatus('active');
      setError(null);
    });

    // Call ended
    client.on('call_ended', () => {
      console.log('Call ended');
      setCallStatus('ended');
      setAgentSpeaking(false);
    });

    // Agent start talking
    client.on('agent_start_talking', () => {
      console.log('Agent started talking');
      setAgentSpeaking(true);
    });

    // Agent stop talking
    client.on('agent_stop_talking', () => {
      console.log('Agent stopped talking');
      setAgentSpeaking(false);
    });

    // Real-time updates
    client.on('update', (update) => {
      // Update transcript if available
      if (update.transcript) {
        setTranscript(update.transcript);
      }
    });

    // Error handling
    client.on('error', (err) => {
      console.error('Call error:', err);
      setError(err.message || 'An error occurred during the call');
      setCallStatus('error');
      if (retellWebClient.current) {
        retellWebClient.current.stopCall();
      }
    });

    // Cleanup on unmount
    return () => {
      if (retellWebClient.current) {
        retellWebClient.current.stopCall();
      }
    };
  }, []);

  // Start call function
  const startCall = async (phoneNumber, agentId) => {
    try {
      setCallStatus('connecting');
      setError(null);

      // Call backend to get access token
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
      const response = await axios.post(`${backendUrl}/api/create-web-call`, {
        phoneNumber,
        agentId
      });

      const { access_token, call_id } = response.data;
      setCallId(call_id);

      // Start call with Retell SDK
      await retellWebClient.current.startCall({
        accessToken: access_token,
        sampleRate: 24000,
        emitRawAudioSamples: false
      });

    } catch (err) {
      console.error('Error starting call:', err);
      setError(err.response?.data?.error || err.message || 'Failed to start call');
      setCallStatus('error');
    }
  };

  // Stop call function
  const stopCall = () => {
    if (retellWebClient.current) {
      retellWebClient.current.stopCall();
    }
  };

  return {
    callStatus,
    agentSpeaking,
    transcript,
    error,
    callId,
    startCall,
    stopCall
  };
};

export default useRetellCall;
