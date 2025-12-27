# Railway Deployment Checklist - Single Service

Quick checklist for deploying Chalio Ordering to Railway as a single service.

## Pre-Deployment ✓

- [ ] Have Retell AI API Key ready
- [ ] Have Retell AI Agent ID ready
- [ ] Code is committed to Git
- [ ] Code is pushed to GitHub

**Verify no secrets in Git**:
```bash
git check-ignore -v .env
git check-ignore -v server/.env
# Both should be ignored ✓
```

## Railway Setup ✓

### Create Project
- [ ] Login to https://railway.app
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your repository
- [ ] Wait for initial deployment to start

### Configure Service
Go to **Settings** tab:
- [ ] Verify Build Command: `npm install && npm run build && cd server && npm install`
- [ ] Verify Start Command: `cd server && node index.js`
- [ ] Root Directory should be empty (whole repo)

### Set Environment Variables
Go to **Variables** tab, add:
- [ ] `RETELL_API_KEY` = ______________________
- [ ] `RETELL_AGENT_ID` = ______________________

### Generate Domain
Go to **Settings** → **Networking**:
- [ ] Click "Generate Domain"
- [ ] Copy URL: ______________________

## Deployment ✓

- [ ] Go to **Deployments** tab
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Status shows "Success" ✓

## Testing ✓

Test these URLs (replace with your Railway domain):

- [ ] **Application**: `https://your-app.up.railway.app`
  - Should show Chalio Ordering homepage ✓

- [ ] **Health Check**: `https://your-app.up.railway.app/api/health`
  - Should return: `{"status":"ok","message":"Restaurant ordering backend is running"}` ✓

- [ ] **Phone Input**: Enter phone number with country code
  - Phone number validation works ✓

- [ ] **Voice Call**: Click "Call to Order"
  - Call connects successfully ✓
  - Can speak to AI agent ✓
  - Order confirmation shows ✓

## Post-Deployment ✓

- [ ] Save Railway URL for future reference
- [ ] Share URL with team/client
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)

## If Something Goes Wrong

### Build Fails
1. Go to Deployments → View logs
2. Fix errors in code
3. `git add . && git commit -m "Fix" && git push`

### Health Check Fails
1. Check Deployments logs for server errors
2. Verify environment variables are set
3. Verify Retell credentials are correct

### Call Not Working
1. Open browser console (F12)
2. Check for errors
3. Verify RETELL_API_KEY and RETELL_AGENT_ID in Railway

## Quick Commands

**Update deployment**:
```bash
git add .
git commit -m "Update"
git push
# Railway auto-deploys
```

**View local environment**:
```bash
# Create .env file first (not committed)
# Then run locally:
npm start  # Frontend on :3000
npm run server  # Backend on :3001
```

---

## ✅ Deployment Complete!

- **Live URL**: ______________________
- **Deployed**: ________ (date)
- **Status**: 🟢 Live

Need help? See **RAILWAY-DEPLOYMENT.md** for detailed instructions.
