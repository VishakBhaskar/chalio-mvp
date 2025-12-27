const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Configure CORS to allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Restaurant ordering backend is running' });
});

// Create Retell web call endpoint
app.post('/api/create-web-call', async (req, res) => {
  try {
    const { phoneNumber, agentId } = req.body;

    // Validate required fields
    if (!phoneNumber) {
      return res.status(400).json({
        error: 'Phone number is required'
      });
    }

    // Use agent ID from request or fall back to environment variable
    const retellAgentId = agentId || process.env.RETELL_AGENT_ID;

    if (!retellAgentId) {
      return res.status(500).json({
        error: 'Agent ID not configured'
      });
    }

    if (!process.env.RETELL_API_KEY) {
      return res.status(500).json({
        error: 'Retell API key not configured'
      });
    }

    // Create web call with Retell API
    const response = await axios.post(
      'https://api.retellai.com/v2/create-web-call',
      {
        agent_id: retellAgentId,
        metadata: {
          customer_phone: phoneNumber,
          order_source: 'web_voice_ordering',
          timestamp: new Date().toISOString()
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return access token and call ID to frontend
    res.json({
      access_token: response.data.access_token,
      call_id: response.data.call_id
    });

  } catch (error) {
    console.error('Error creating web call:', error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      error: 'Failed to create web call',
      details: error.response?.data?.message || error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📞 Ready to create Retell web calls`);

  // Check for required environment variables
  if (!process.env.RETELL_API_KEY) {
    console.warn('⚠️  WARNING: RETELL_API_KEY not set in environment variables');
  }
  if (!process.env.RETELL_AGENT_ID) {
    console.warn('⚠️  WARNING: RETELL_AGENT_ID not set in environment variables');
  }
});
