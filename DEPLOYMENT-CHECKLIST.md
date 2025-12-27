# Railway Deployment Checklist

Use this checklist to ensure a successful deployment.

## Pre-Deployment

- [ ] Verify `.env` files are not committed to Git
  ```bash
  git check-ignore -v .env
  git check-ignore -v server/.env
  ```

- [ ] Have your Retell AI credentials ready:
  - [ ] Retell API Key
  - [ ] Retell Agent ID

- [ ] Commit all changes
  ```bash
  git add .
  git commit -m "Prepare for deployment"
  ```

- [ ] Push to GitHub
  ```bash
  git push origin main
  ```

## Backend Deployment

- [ ] Login to Railway (https://railway.app)
- [ ] Create new project from GitHub repo
- [ ] Configure backend service:
  - [ ] Set Root Directory: `server`
  - [ ] Verify Start Command: `npm start`
- [ ] Set environment variables:
  - [ ] `RETELL_API_KEY`
  - [ ] `RETELL_AGENT_ID`
  - [ ] `PORT=3001`
  - [ ] `FRONTEND_URL` (will update after frontend deployment)
- [ ] Generate public domain
- [ ] Save backend URL: ________________________________

## Frontend Deployment

- [ ] Create new service in same Railway project
- [ ] Configure frontend service:
  - [ ] Root Directory: (leave empty)
  - [ ] Build Command: `npm run build`
  - [ ] Start Command: `npx serve -s build -l $PORT`
- [ ] Set environment variables:
  - [ ] `REACT_APP_BACKEND_URL` (use backend URL from above)
  - [ ] `REACT_APP_RETELL_AGENT_ID`
- [ ] Generate public domain
- [ ] Save frontend URL: ________________________________

## Post-Deployment

- [ ] Update backend `FRONTEND_URL` with frontend URL
- [ ] Wait for backend to redeploy
- [ ] Test backend health: `https://your-backend-url/api/health`
- [ ] Test frontend: `https://your-frontend-url`
- [ ] Test phone number input
- [ ] Test voice call functionality
- [ ] Verify call connects successfully

## Optional

- [ ] Set up custom domains
- [ ] Configure monitoring
- [ ] Set up error tracking
- [ ] Add CI/CD pipeline

## Troubleshooting

If something doesn't work:

1. Check Railway deployment logs
2. Verify all environment variables are set correctly
3. Test backend `/api/health` endpoint
4. Check browser console for errors
5. Review DEPLOYMENT.md for detailed troubleshooting steps

---

**Need help?** See DEPLOYMENT.md for detailed step-by-step instructions.
