# Restaurant Voice Ordering System

A modern restaurant website with integrated Retell AI voice agent ordering system. Customers can browse the menu while simultaneously placing orders through voice conversation.

## Features

- Phone number validation before calling
- Real-time voice ordering with Retell AI
- Interactive menu display with 85+ items
- Automatic categorization of menu items
- Order confirmation with payment link
- Responsive design for mobile and desktop
- Mexican restaurant themed UI

## Tech Stack

- **Frontend**: React 18 with Tailwind CSS
- **Backend**: Node.js/Express
- **Voice Agent**: Retell AI Web SDK
- **Phone Validation**: libphonenumber-js
- **HTTP Client**: Axios

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- npm or yarn
- Retell AI account ([Sign up here](https://dashboard.retellai.com))
- Retell API Key
- Retell Agent ID

## Getting Started

### 1. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

#### Backend Configuration
Create `server/.env` file:

```env
RETELL_API_KEY=your_retell_api_key_here
RETELL_AGENT_ID=your_agent_id_here
PORT=3001
```

#### Frontend Configuration (Optional)
Create `.env` file in root:

```env
REACT_APP_RETELL_AGENT_ID=your_agent_id_here
```

### 3. Get Retell AI Credentials

1. Go to [Retell Dashboard](https://dashboard.retellai.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Copy your API key
5. Create a new agent or use existing agent ID

### 4. Run the Application

#### Terminal 1 - Start Backend Server
```bash
cd server
npm start
```

Backend will run on `http://localhost:3001`

#### Terminal 2 - Start Frontend
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Project Structure

```
restaurant-voice-ordering/
├── server/
│   ├── index.js              # Express backend server
│   ├── .env                  # Backend environment variables
│   └── package.json
├── src/
│   ├── components/           # React components
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── App.js                # Main app component
├── public/
│   └── restaurant_menu.csv   # Menu data
└── README.md
```

## How It Works

1. **Phone Number Input**: User enters and validates phone number
2. **Voice Call**: User clicks "Call to Order" to start voice conversation
3. **Menu Display**: Full menu visible during call
4. **Order Processing**: Phone number sent to backend in metadata
5. **Confirmation**: Success modal with payment link details

## Menu Management

Edit `public/restaurant_menu.csv` to update menu items:

```csv
Name,Price
Birria Combo,28.07
Plato Birra,24.95
```

Categories are auto-detected based on item names.

## API Endpoints

### POST /api/create-web-call
Creates a new Retell web call with customer phone number in metadata.

### GET /api/health
Health check endpoint.

## Deployment

### Backend (Railway/Heroku/Render)
1. Set environment variables
2. Deploy server folder

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `build/` folder
3. Update backend URL in `src/hooks/useRetellCall.js`

## Troubleshooting

- **Call not connecting**: Check API key and agent ID
- **Menu not loading**: Verify CSV exists in public folder
- **Phone validation issues**: Ensure 10-digit US format

## Security

- API keys never exposed in frontend
- All Retell calls through backend
- Phone validation on client and server
- Use HTTPS in production

## Support

- Retell AI Docs: https://docs.retellai.com
- Retell Dashboard: https://dashboard.retellai.com

## License

MIT License
