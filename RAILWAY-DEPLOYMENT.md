# Railway Single-Service Deployment Guide

This guide shows you how to deploy the entire Chalio Ordering application (frontend + backend) as a **single service** on Railway.

## What This Deployment Does

- Builds the React frontend into static files
- Serves the frontend and API from the same Express server
- Deploys everything from one GitHub repository
- Uses same-origin for API calls (no CORS issues)

## Prerequisites

✅ Railway account (sign up at https://railway.app)
✅ GitHub account with your repository pushed
✅ Retell AI credentials:
  - API Key from https://dashboard.retellai.com
  - Agent ID from your Retell dashboard

## Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

```bash
cd restaurant-voice-ordering

# Add all changes
git add .

# Commit
git commit -m "Prepare for Railway deployment"

# Push to GitHub (if you haven't already created a repo)
# Create a new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Create New Project on Railway

1. Go to https://railway.app
2. Click **"Login"** and sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository from the list
6. Railway will automatically detect it as a Node.js project

### Step 3: Configure Build and Deploy Settings

Railway should auto-detect the configuration from `railway.toml`, but verify:

1. Click on your deployed service
2. Go to **"Settings"** tab
3. Verify the following:
   - **Build Command**: `npm install && npm run build && cd server && npm install`
   - **Start Command**: `cd server && node index.js`
   - **Root Directory**: (leave empty - deploy whole repo)

### Step 4: Set Environment Variables

1. Go to the **"Variables"** tab
2. Click **"Add Variable"**
3. Add these variables one by one:

```
RETELL_API_KEY=<paste_your_retell_api_key_here>
RETELL_AGENT_ID=<paste_your_retell_agent_id_here>
```

**Important**: Replace the values with your actual credentials from Retell AI dashboard.

### Step 5: Generate Public Domain

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Railway will create a URL like: `https://your-app-name.up.railway.app`
5. Copy this URL - this is your live application!

### Step 6: Wait for Deployment

1. Go to **"Deployments"** tab
2. Watch the build logs
3. Wait for status to show **"Success"** (usually 2-3 minutes)
4. You'll see:
   - ✓ Building frontend
   - ✓ Installing dependencies
   - ✓ Starting server

### Step 7: Test Your Application

1. **Visit your Railway URL**: `https://your-app-name.up.railway.app`
2. **Test the health endpoint**: `https://your-app-name.up.railway.app/api/health`
   - Should return: `{"status":"ok","message":"Restaurant ordering backend is running"}`
3. **Test phone input**: Enter a phone number with country code
4. **Test voice call**: Click "Call to Order" and verify it connects

## Environment Variables Summary

Only **2 variables** are required for Railway deployment:

| Variable | Value | Where to Get It |
|----------|-------|-----------------|
| `RETELL_API_KEY` | Your API key | https://dashboard.retellai.com → Settings → API Keys |
| `RETELL_AGENT_ID` | Your agent ID | https://dashboard.retellai.com → Agents → Copy Agent ID |

## Troubleshooting

### Build Fails

**Check logs in Railway**:
- Go to Deployments tab → Click on failed deployment → View logs
- Common issues:
  - Missing dependencies in package.json
  - Build errors in React code

**Solution**: Fix the errors locally, commit, and push again

### Application Won't Start

**Check deployment logs**:
- Look for errors in the start command output
- Verify environment variables are set correctly

**Verify**:
```bash
# In Railway Variables tab, ensure you have:
RETELL_API_KEY (set)
RETELL_AGENT_ID (set)
```

### Health Check Fails

**Visit**: `https://your-app-name.up.railway.app/api/health`

**If it fails**:
- Check deployment logs for server startup errors
- Verify the start command is: `cd server && node index.js`
- Ensure server/index.js exists in your repository

### Frontend Loads but API Calls Fail

**Check browser console** for errors:
- Press F12 → Console tab
- Look for network errors

**Common issues**:
- Environment variables not set in Railway
- Retell API credentials are invalid
- Check Railway logs for backend errors

### Call Button Not Working

**Verify**:
1. Phone number is valid and complete
2. Backend environment variables are set correctly
3. Check browser console for errors
4. Check Railway logs for API errors

## Security Checklist

Before deploying, verify:

- [ ] `.env` files are in `.gitignore`
- [ ] No API keys committed to GitHub
- [ ] Environment variables set in Railway (not in code)
- [ ] Repository is either private or contains no secrets

**Verify**:
```bash
# These should show the files are ignored:
git check-ignore -v .env
git check-ignore -v server/.env

# This should show NO .env files:
git status
```

## Viewing Logs

To debug issues, check Railway logs:

1. Go to your project in Railway
2. Click on your service
3. Go to **"Deployments"** tab
4. Click on the latest deployment
5. View **"Build Logs"** or **"Deploy Logs"**

## Updating Your Application

After making changes:

```bash
# Make your changes to the code
# Then commit and push:
git add .
git commit -m "Description of changes"
git push

# Railway will automatically:
# 1. Detect the push
# 2. Rebuild the application
# 3. Redeploy with zero downtime
```

## Custom Domain (Optional)

To use your own domain:

1. In Railway, go to **Settings** → **Networking**
2. Click **"Custom Domain"**
3. Enter your domain (e.g., `order.yourdomain.com`)
4. Railway will show you DNS records to add
5. Add the CNAME record to your domain's DNS settings
6. Wait for DNS propagation (5-30 minutes)

## Cost

Railway pricing:
- **Free Tier**: $5 of usage credit per month
- **Pro Plan**: $5/month + usage

This application should easily fit within the free tier for development and small-scale production use.

## Monitoring

**Check application health**:
- Health endpoint: `https://your-app.up.railway.app/api/health`
- Set up uptime monitoring with services like:
  - UptimeRobot (free)
  - Pingdom
  - StatusCake

**Monitor in Railway**:
- Go to **"Metrics"** tab to see:
  - CPU usage
  - Memory usage
  - Network traffic

## Getting Help

**Railway Issues**:
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

**Application Issues**:
- Check Railway deployment logs
- Check browser console
- Review Retell AI docs: https://docs.retellai.com

**Common Questions**:

**Q: Do I need to set REACT_APP_BACKEND_URL?**
A: No! Since everything runs from one service, the frontend automatically uses the same origin for API calls.

**Q: Can I run frontend and backend separately locally?**
A: Yes! Create a `.env` file with `REACT_APP_BACKEND_URL=http://localhost:3001`, then run:
- Terminal 1: `npm start` (frontend on port 3000)
- Terminal 2: `npm run server` (backend on port 3001)

**Q: How do I see what's deployed?**
A: In Railway, go to Deployments tab to see all deployment history and currently active deployment.

## Next Steps

After successful deployment:

- [ ] Test all functionality on production URL
- [ ] Set up monitoring
- [ ] Configure custom domain (optional)
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Share your app URL with users!

---

## Quick Reference

**Your URLs**:
- Application: `https://your-app-name.up.railway.app`
- Health Check: `https://your-app-name.up.railway.app/api/health`
- Railway Dashboard: `https://railway.app/project/your-project-id`

**Required Environment Variables**:
```
RETELL_API_KEY=<your-key>
RETELL_AGENT_ID=<your-id>
```

**One-Command Deployment**:
```bash
git add . && git commit -m "Deploy" && git push
```

---

**Congratulations! Your Chalio Ordering application is live! 🎉🌮📞**
