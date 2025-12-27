# Chalio Ordering - Railway Deployment Guide

This guide will walk you through deploying the Chalio Ordering application (frontend and backend) to Railway.

## Prerequisites

1. A [Railway account](https://railway.app/) (sign up for free)
2. Your Retell AI credentials:
   - API Key (from https://dashboard.retellai.com)
   - Agent ID (from your Retell dashboard)
3. Git installed on your machine
4. This project ready to deploy

## Project Structure

This application consists of two separate services:
- **Frontend**: React application (root directory)
- **Backend**: Express.js API server (server directory)

## Deployment Steps

### Step 1: Prepare Your Code for Deployment

1. **Verify .gitignore is properly configured**
   - Ensure `.env` and `server/.env` are in `.gitignore`
   - Check that no sensitive files are tracked by Git

2. **Commit all your changes**
   ```bash
   cd restaurant-voice-ordering
   git add .
   git commit -m "Prepare for Railway deployment"
   ```

3. **Push to GitHub** (if not already done)
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Backend Service

1. **Login to Railway**
   - Go to https://railway.app/
   - Click "Login" and sign in with GitHub

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will detect it as a Node.js project

3. **Configure Backend Service**
   - After deployment starts, click on the service
   - Go to "Settings" tab
   - Under "Root Directory", set it to: `server`
   - Under "Start Command", it should auto-detect: `npm start`

4. **Set Environment Variables**
   - Go to "Variables" tab
   - Add the following variables:
     ```
     RETELL_API_KEY=your_actual_retell_api_key
     RETELL_AGENT_ID=your_actual_retell_agent_id
     PORT=3001
     FRONTEND_URL=https://your-frontend-url.railway.app
     ```
   - **Important**: Don't add FRONTEND_URL yet - we'll get this after deploying the frontend

5. **Generate Public Domain**
   - Go to "Settings" tab
   - Under "Networking", click "Generate Domain"
   - Copy this URL - you'll need it for the frontend
   - Example: `https://restaurant-backend-production.up.railway.app`

6. **Update FRONTEND_URL** (after deploying frontend)
   - Come back here after deploying frontend
   - Update the FRONTEND_URL variable with your frontend's Railway URL

### Step 3: Deploy Frontend Service

1. **Create Another Service in the Same Project**
   - Go back to your Railway project dashboard
   - Click "New Service"
   - Select "Deploy from GitHub repo"
   - Choose the same repository

2. **Configure Frontend Service**
   - Click on the new service
   - Go to "Settings" tab
   - Keep "Root Directory" as root (leave empty)
   - Under "Build Command", set: `npm run build`
   - Under "Start Command", set: `npx serve -s build -l $PORT`

3. **Set Environment Variables**
   - Go to "Variables" tab
   - Add the following variables:
     ```
     REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
     REACT_APP_RETELL_AGENT_ID=your_actual_retell_agent_id
     ```
   - Replace `your-backend-url.railway.app` with the backend URL from Step 2

4. **Generate Public Domain**
   - Go to "Settings" tab
   - Under "Networking", click "Generate Domain"
   - Copy this URL
   - Example: `https://restaurant-frontend-production.up.railway.app`

5. **Install serve package**
   - Locally, run: `npm install --save serve`
   - Commit and push:
     ```bash
     git add package.json package-lock.json
     git commit -m "Add serve for Railway deployment"
     git push
     ```

### Step 4: Update Backend CORS Configuration

1. **Go back to Backend Service**
   - In Railway, navigate to your backend service
   - Go to "Variables" tab
   - Update `FRONTEND_URL` with the frontend URL from Step 3
   - Example: `https://restaurant-frontend-production.up.railway.app`

2. **Redeploy Backend**
   - The service should automatically redeploy when you update variables
   - If not, go to "Deployments" and click "Redeploy"

### Step 5: Verify Deployment

1. **Check Backend Health**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - You should see: `{"status":"ok","message":"Restaurant ordering backend is running"}`

2. **Test Frontend**
   - Visit: `https://your-frontend-url.railway.app`
   - Enter a phone number
   - Try to place a call
   - Verify the call connects successfully

### Step 6: Custom Domain (Optional)

If you want to use your own domain:

1. **For Frontend**:
   - Go to frontend service → Settings → Networking
   - Click "Custom Domain"
   - Enter your domain (e.g., `order.chalio.com`)
   - Add the CNAME record to your DNS provider as shown

2. **For Backend**:
   - Go to backend service → Settings → Networking
   - Click "Custom Domain"
   - Enter your domain (e.g., `api.chalio.com`)
   - Add the CNAME record to your DNS provider as shown

3. **Update Environment Variables**:
   - Update `REACT_APP_BACKEND_URL` in frontend to use your custom backend domain
   - Update `FRONTEND_URL` in backend to use your custom frontend domain

## Environment Variables Summary

### Backend Service Environment Variables
```
RETELL_API_KEY=<your-retell-api-key>
RETELL_AGENT_ID=<your-retell-agent-id>
FRONTEND_URL=<your-frontend-railway-url>
PORT=3001
```

### Frontend Service Environment Variables
```
REACT_APP_BACKEND_URL=<your-backend-railway-url>
REACT_APP_RETELL_AGENT_ID=<your-retell-agent-id>
```

## Security Checklist

- ✅ .env files are in .gitignore
- ✅ No API keys or secrets committed to Git
- ✅ Environment variables set in Railway (not in code)
- ✅ CORS configured to only allow frontend domain
- ✅ All sensitive data stored in Railway environment variables

## Troubleshooting

### Frontend Can't Connect to Backend
- Check that `REACT_APP_BACKEND_URL` is set correctly in frontend
- Verify backend is running: visit `/api/health` endpoint
- Check browser console for CORS errors
- Ensure `FRONTEND_URL` is set in backend environment variables

### Backend Not Starting
- Check deployment logs in Railway
- Verify all required environment variables are set
- Check that `RETELL_API_KEY` and `RETELL_AGENT_ID` are valid

### Call Not Working
- Verify Retell AI credentials are correct
- Check backend logs for API errors
- Ensure phone number is in correct format
- Test the `/api/health` endpoint

### Build Failures
- Check Railway deployment logs
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## Monitoring

- **Logs**: Check deployment logs in Railway dashboard
- **Metrics**: Monitor CPU, memory, and network usage in Railway
- **Health Check**: Set up uptime monitoring for the `/api/health` endpoint

## Cost Considerations

Railway offers:
- **Free Tier**: $5 of usage credit per month
- **Pro Plan**: $5/month + usage fees

Both services should fit within the free tier for development/testing.

## Support

For Railway-specific issues:
- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway

For application issues:
- Check application logs in Railway
- Review Retell AI documentation: https://docs.retellai.com/

## Next Steps After Deployment

1. Test all functionality on production URLs
2. Set up monitoring and alerts
3. Configure custom domains (optional)
4. Set up CI/CD for automatic deployments
5. Consider adding staging environment

---

**Congratulations!** Your Chalio Ordering application is now deployed on Railway! 🎉
