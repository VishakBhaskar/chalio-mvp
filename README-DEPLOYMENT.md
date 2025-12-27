# Chalio Ordering - Deployment Overview

## How This Application Works

Chalio Ordering is a voice-based restaurant ordering system that combines:
- **Frontend**: React application for the user interface
- **Backend**: Express.js server that handles Retell AI API calls

## Deployment Architecture

This application is configured for **single-service deployment** on Railway:

```
┌─────────────────────────────────────┐
│   Railway Service (Single Process)  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Express Server (Node.js)   │  │
│  │                              │  │
│  │  • Serves React build files  │  │
│  │  • Handles /api/* routes     │  │
│  │  • Calls Retell AI API       │  │
│  └──────────────────────────────┘  │
│                                     │
│  URL: your-app.up.railway.app      │
└─────────────────────────────────────┘
```

### Benefits of Single Service Deployment

✅ **Simpler**: One service to deploy and manage
✅ **Cheaper**: Uses only one Railway service (within free tier)
✅ **No CORS**: Frontend and backend on same origin
✅ **Faster**: No cross-domain requests

## Deployment Options

### Option 1: Railway (Recommended - Simplest)

**Best for**: Quick deployment, free hosting, automatic SSL

📖 **See**: `RAILWAY-DEPLOYMENT.md` for complete guide
📋 **Use**: `RAILWAY-CHECKLIST.md` while deploying

**Quick Start**:
1. Push code to GitHub
2. Connect repository to Railway
3. Set 2 environment variables
4. Deploy! (automatic)

**Time**: 5-10 minutes
**Cost**: Free tier (up to $5/month usage)

### Option 2: Manual Deployment (VPS/Cloud)

**Best for**: Custom infrastructure, specific requirements

**Requirements**:
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx for reverse proxy (optional)

**Steps**:
```bash
# 1. Clone repository
git clone your-repo-url
cd restaurant-voice-ordering

# 2. Create server/.env file
cd server
cat > .env << EOF
RETELL_API_KEY=your_key
RETELL_AGENT_ID=your_id
PORT=3001
EOF
cd ..

# 3. Build and deploy
npm install
npm run build
cd server
npm install
node index.js
```

### Option 3: Docker Deployment

**Best for**: Containerized environments, Kubernetes

**Coming soon**: Docker configuration files

## Environment Variables

### Required (Production)

| Variable | Where to Set | Example |
|----------|--------------|---------|
| `RETELL_API_KEY` | Railway Variables | `key_abc123...` |
| `RETELL_AGENT_ID` | Railway Variables | `agent_xyz789...` |

### Optional (Development)

| Variable | Use Case | Example |
|----------|----------|---------|
| `REACT_APP_BACKEND_URL` | Local dev with separate ports | `http://localhost:3001` |
| `PORT` | Custom server port | `8080` |

## Project Structure

```
restaurant-voice-ordering/
├── public/              # Static assets
├── src/                 # React frontend source
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── data/           # Static data
├── server/             # Express backend
│   ├── index.js        # Main server file
│   ├── .env.example    # Environment template
│   └── package.json    # Backend dependencies
├── build/              # React production build (generated)
├── railway.toml        # Railway configuration
└── package.json        # Frontend dependencies

```

## Local Development

### Option A: Single Service (Production-like)

```bash
# Terminal 1: Build frontend and start server
npm install
npm run build
cd server
npm install
node index.js

# Visit: http://localhost:3001
```

### Option B: Separate Services (Hot Reload)

```bash
# Create .env file first:
echo "REACT_APP_BACKEND_URL=http://localhost:3001" > .env

# Terminal 1: Frontend (with hot reload)
npm start
# Runs on http://localhost:3000

# Terminal 2: Backend
npm run server
# Runs on http://localhost:3001
```

## Build Process

When deployed to Railway:

1. **Install dependencies**: `npm install`
2. **Build React app**: `npm run build` → Creates `build/` directory
3. **Install server deps**: `cd server && npm install`
4. **Start server**: `node index.js`
   - Serves React build from `build/`
   - Handles API routes at `/api/*`
   - Catches all other routes → serves `index.html`

## API Routes

All API routes are prefixed with `/api`:

- `GET /api/health` - Health check endpoint
- `POST /api/create-web-call` - Create Retell AI web call

Frontend requests go to same origin:
```javascript
// Production (Railway)
axios.post('/api/create-web-call', {...})

// Development (with REACT_APP_BACKEND_URL set)
axios.post('http://localhost:3001/api/create-web-call', {...})
```

## Deployment Guides

| Guide | Purpose |
|-------|---------|
| `RAILWAY-DEPLOYMENT.md` | Complete Railway deployment guide |
| `RAILWAY-CHECKLIST.md` | Quick checklist for Railway deployment |
| `DEPLOYMENT.md` | Original multi-service deployment guide (archived) |

## Security Best Practices

✅ **DO**:
- Store API keys in Railway environment variables
- Use `.gitignore` for `.env` files
- Keep dependencies updated
- Use HTTPS (automatic on Railway)

❌ **DON'T**:
- Commit `.env` files to Git
- Hardcode API keys in code
- Expose sensitive data in client-side code
- Use HTTP in production

## Monitoring

**Health Check**:
- URL: `https://your-app.up.railway.app/api/health`
- Expected: `{"status":"ok","message":"Restaurant ordering backend is running"}`

**Railway Metrics**:
- CPU usage
- Memory usage
- Network traffic
- Request logs

**Recommended Tools**:
- UptimeRobot (free uptime monitoring)
- Sentry (error tracking)
- LogRocket (session replay)

## Troubleshooting

### Build Fails
- Check Railway deployment logs
- Verify `package.json` has all dependencies
- Test build locally: `npm run build`

### App Won't Start
- Check environment variables are set
- Verify start command: `cd server && node index.js`
- Check server logs for errors

### API Calls Fail
- Verify `RETELL_API_KEY` is valid
- Check `RETELL_AGENT_ID` is correct
- Review Railway application logs

### Frontend Not Loading
- Verify build completed successfully
- Check that `build/` directory exists
- Ensure server is serving static files

## Support

- **Railway Issues**: https://docs.railway.app
- **Retell AI Docs**: https://docs.retellai.com
- **Project Issues**: Check deployment guides

## License

[Your License Here]

## Contributing

[Your Contribution Guidelines Here]

---

**Ready to deploy?** Start with `RAILWAY-DEPLOYMENT.md` 🚀
