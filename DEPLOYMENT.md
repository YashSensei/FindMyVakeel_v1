# Deployment Guide for Render

This guide walks you through deploying **Find My Vakeel** on Render (both frontend and backend).

## Prerequisites

- [x] GitHub repository pushed (✅ Already done: `fmv` branch)
- [ ] MongoDB Atlas account (free tier available)
- [ ] Render account (free tier available)
- [ ] MegaLLM API key

---

## Step 1: Set Up MongoDB Atlas (if not already done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IPs: `0.0.0.0/0` (for Render to connect)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/fmv`)

---

## Step 2: Deploy Backend on Render

### Option A: Using Blueprint (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Select branch: `fmv`
5. Render will detect `render.yaml` and create both services

### Option B: Manual Setup

1. Click **New** → **Web Service**
2. Connect GitHub → Select repository → Select `fmv` branch
3. Configure:
   - **Name**: `axsyn-backend` (or your choice)
   - **Runtime**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node index.js`
   - **Instance Type**: `Free`

4. **Add Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   MEGALM_API_KEY=your_megalm_api_key
   FRONTEND_URL=https://axsyn-frontend.onrender.com
   ```

5. Click **Create Web Service**
6. Wait for deployment (takes 2-5 minutes)
7. Copy the service URL: `https://axsyn-backend.onrender.com`

---

## Step 3: Deploy Frontend on Render

1. Click **New** → **Static Site**
2. Connect GitHub → Select repository → Select `fmv` branch
3. Configure:
   - **Name**: `axsyn-frontend` (or your choice)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Auto-Deploy**: `Yes`

4. **Add Environment Variables**:
   ```
   VITE_API_URL=https://axsyn-backend.onrender.com
   ```
   
   **Important**: Replace with YOUR actual backend URL from Step 2!

5. **Add Rewrite Rules** (for React Router):
   - Click **Redirects/Rewrites**
   - Add rule:
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Action**: `Rewrite`

6. Click **Create Static Site**
7. Wait for deployment (takes 2-5 minutes)

---

## Step 4: Update CORS in Backend

1. Go to your backend service on Render
2. Update `FRONTEND_URL` environment variable with your actual frontend URL:
   ```
   FRONTEND_URL=https://axsyn-frontend.onrender.com
   ```
3. Trigger manual deploy to apply changes

---

## Step 5: Test Your Deployment

1. Visit your frontend URL: `https://axsyn-frontend.onrender.com`
2. Test registration: Create a new account
3. Test login: Sign in with your account
4. Test case submission: Submit a problem
5. Test chat: Send messages in dashboard

---

## Important Notes

### Free Tier Limitations

- **Backend**: Spins down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds (cold start)
  - Consider upgrading to paid tier ($7/month) for always-on service
  
- **Frontend**: Always available (static hosting is instant)

- **Database**: MongoDB Atlas free tier (512MB storage)

### Environment Variables Checklist

**Backend** (Must have all of these):
- ✅ `MONGODB_URI` - Your MongoDB Atlas connection string
- ✅ `JWT_SECRET` - Random 32+ character string for JWT signing
- ✅ `MEGALM_API_KEY` - Your MegaLLM API key
- ✅ `FRONTEND_URL` - Your Render frontend URL (for CORS)
- ✅ `NODE_ENV` - Set to `production`
- ✅ `PORT` - Set to `10000`

**Frontend** (Must have):
- ✅ `VITE_API_URL` - Your Render backend URL

### Security Best Practices

1. **Never commit `.env` files** (✅ Already in `.gitignore`)
2. **Generate strong JWT_SECRET**: Use at least 32 random characters
3. **Rotate API keys** regularly
4. **Monitor MongoDB IP whitelist**: Only allow Render IPs if possible

### Troubleshooting

**Backend not connecting to MongoDB:**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format: `mongodb+srv://...`
- Check database user has read/write permissions

**Frontend can't reach backend:**
- Verify `VITE_API_URL` matches exact backend URL (no trailing slash)
- Check backend CORS `FRONTEND_URL` matches frontend URL
- Open browser DevTools → Network tab to see API errors

**Backend returns 503 after inactivity:**
- This is normal for free tier (cold start)
- Wait 30-60 seconds for backend to spin up
- Consider upgrading to paid tier for instant responses

**Build fails:**
- Check build logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node version compatibility (Render uses Node 20 by default)

---

## Post-Deployment Steps

### 1. Custom Domain (Optional)

**Frontend**:
1. Go to Render Dashboard → Your static site
2. Click **Custom Domain**
3. Add your domain (e.g., `findmyvakeel.com`)
4. Update DNS records as shown by Render
5. Enable HTTPS (automatic with Render)

**Backend**:
1. Go to Render Dashboard → Your web service
2. Click **Custom Domain**
3. Add subdomain (e.g., `api.findmyvakeel.com`)
4. Update frontend `VITE_API_URL` to use custom domain

### 2. Monitoring

- Enable Render's built-in monitoring
- Set up uptime monitoring (e.g., UptimeRobot)
- Monitor MongoDB usage in Atlas dashboard

### 3. Backups

- Enable MongoDB Atlas automated backups
- Export important data regularly
- Keep local development environment synced

---

## Deployment Commands (Git)

Already done, but for future updates:

```powershell
# Make your changes
git add .
git commit -m "feat: update description"
git push origin fmv
```

Render auto-deploys on push to `fmv` branch! 🎉

---

## Costs Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Render Backend** | ✅ 750 hours/month<br>⚠️ Spins down after 15min | 💰 $7/month<br>✅ Always on |
| **Render Frontend** | ✅ 100GB bandwidth<br>✅ Always on | 💰 $19/month<br>✅ 400GB bandwidth |
| **MongoDB Atlas** | ✅ 512MB storage<br>✅ Shared cluster | 💰 $9/month<br>✅ 2GB storage |

**Total**: $0/month (free tier) or $35/month (all paid)

---

## Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Render Community: https://community.render.com

---

**Your deployment URLs** (update after deployment):
- Frontend: `https://axsyn-frontend.onrender.com`
- Backend: `https://axsyn-backend.onrender.com`
- Backend Health Check: `https://axsyn-backend.onrender.com/api/health`
