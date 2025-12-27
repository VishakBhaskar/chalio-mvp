# 🚀 Deploy to Railway - Quick Start

Follow these 7 simple steps to deploy Chalio Ordering to Railway.

---

## Step 1: Push to GitHub

```bash
cd restaurant-voice-ordering
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2: Go to Railway

Open: **https://railway.app**

- Click "Login"
- Sign in with GitHub

---

## Step 3: Create New Project

- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose **your repository**
- Click on the deployed service when it appears

---

## Step 4: Set Environment Variables

Click **"Variables"** tab

Add these 2 variables:

```
Name: RETELL_API_KEY
Value: [paste your Retell API key here]

Name: RETELL_AGENT_ID
Value: [paste your Retell Agent ID here]
```

Get your credentials from: https://dashboard.retellai.com

---

## Step 5: Generate Domain

Click **"Settings"** tab

Scroll to **"Networking"**

Click **"Generate Domain"**

**Copy the URL** - this is your live app!

---

## Step 6: Wait for Deployment

Click **"Deployments"** tab

Wait for status to show: **✓ Success**

(Usually 2-3 minutes)

---

## Step 7: Test Your App

Open your Railway URL in browser

**Test these**:
- ✓ Page loads
- ✓ Enter phone number
- ✓ Click "Call to Order"
- ✓ Call connects

---

## ✅ That's It!

Your app is now live at: `https://your-app-name.up.railway.app`

---

## Need More Details?

- **Full Guide**: See `RAILWAY-DEPLOYMENT.md`
- **Checklist**: See `RAILWAY-CHECKLIST.md`
- **Troubleshooting**: Check Railway deployment logs

---

## Quick Troubleshooting

**Build failed?**
- Check Deployments → View Logs
- Fix errors and push again

**App not loading?**
- Verify both environment variables are set
- Check they match your Retell dashboard

**Call not working?**
- Press F12 → Check console for errors
- Verify RETELL_API_KEY is correct
- Check RETELL_AGENT_ID is correct

---

## Environment Variables Needed

Only **2 variables** required:

| Variable | Where to Get It |
|----------|-----------------|
| `RETELL_API_KEY` | https://dashboard.retellai.com → Settings → API Keys |
| `RETELL_AGENT_ID` | https://dashboard.retellai.com → Agents → Copy ID |

---

## What Railway Will Do

1. ✓ Detect Node.js project
2. ✓ Install dependencies
3. ✓ Build React frontend
4. ✓ Start Express server
5. ✓ Serve your app on HTTPS
6. ✓ Auto-deploy on future git pushes

---

## Security ✓

- ✅ API keys stored in Railway (not in code)
- ✅ .env files not committed to Git
- ✅ HTTPS enabled automatically
- ✅ Environment variables encrypted

---

**Happy Deploying! 🎉**
