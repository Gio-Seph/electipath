# 🚀 Deployment Guide - Railway + Vercel

Complete step-by-step guide to deploy your Elective System.

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be on GitHub
2. **Railway Account** - Sign up at https://railway.app (free)
3. **Vercel Account** - Sign up at https://vercel.com (free)

---

## 🔧 Part 1: Deploy Backend to Railway

### Step 1: Prepare Your Code
1. Make sure all changes are committed to GitHub
2. Your `backend` folder should have:
   - ✅ `requirements.txt`
   - ✅ `Procfile`
   - ✅ Updated `settings.py` (with production config)

### Step 2: Create Railway Project
1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository
6. Railway will detect it's a Python project

### Step 3: Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. **Note the database connection details** (you'll need them)

### Step 4: Configure Environment Variables
1. Click on your **Django service** in Railway
2. Go to **"Variables"** tab
3. Add these environment variables:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**To generate SECRET_KEY:**
```bash
cd backend
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Important:** 
- Replace `your-app-name.railway.app` with your actual Railway domain (you'll see it after deployment)
- Replace `your-vercel-app.vercel.app` with your Vercel domain (we'll get this in Part 2)

### Step 5: Configure Build Settings
1. In Railway, go to your Django service
2. Click **"Settings"** tab
3. Set **Root Directory** to: `backend`
4. Set **Start Command** to: (leave empty, Procfile handles this)

### Step 6: Deploy
1. Railway will automatically deploy when you push to GitHub
2. Or click **"Deploy"** button
3. Wait for deployment to complete
4. **Copy your Railway URL** (e.g., `https://your-app-name.railway.app`)

### Step 7: Run Migrations
1. In Railway, go to your Django service
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Open **"Shell"** tab
5. Run:
```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend
1. Make sure your frontend code is on GitHub
2. Your `frontend` folder should have:
   - ✅ `vercel.json`
   - ✅ `.env.production.example` (for reference)

### Step 2: Create Vercel Project
1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variable
1. In Vercel project settings, go to **"Environment Variables"**
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-app.railway.app` (your Railway backend URL)
   - **Environment:** Production, Preview, Development (check all)

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. **Copy your Vercel URL** (e.g., `https://your-app-name.vercel.app`)

### Step 5: Update Railway CORS
1. Go back to Railway
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
3. Railway will automatically redeploy

---

## ✅ Part 3: Final Configuration

### Update CORS in Railway
1. Railway → Your Django service → Variables
2. Update `FRONTEND_URL` with your actual Vercel URL
3. Railway will redeploy automatically

### Test Your Deployment
1. Visit your Vercel frontend URL
2. Try registering a new user
3. Try logging in
4. Test the survey functionality

---

## 🔍 Troubleshooting

### Backend Issues

**Problem:** Database connection error
- **Solution:** Check `DATABASE_URL` is set automatically by Railway PostgreSQL

**Problem:** CORS errors
- **Solution:** Make sure `FRONTEND_URL` in Railway matches your Vercel URL exactly

**Problem:** Static files not loading
- **Solution:** Run `python manage.py collectstatic` in Railway shell

### Frontend Issues

**Problem:** API calls failing
- **Solution:** Check `VITE_API_URL` in Vercel environment variables matches Railway URL

**Problem:** Build fails
- **Solution:** Check Vercel build logs, ensure all dependencies are in `package.json`

---

## 📝 Quick Reference

### Railway Environment Variables
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-app.railway.app
FRONTEND_URL=https://your-vercel-app.vercel.app
DATABASE_URL=(auto-set by Railway)
```

### Vercel Environment Variables
```
VITE_API_URL=https://your-railway-app.railway.app
```

---

## 🎉 You're Done!

Your app should now be live at:
- **Frontend:** https://your-app-name.vercel.app
- **Backend:** https://your-app-name.railway.app

---

## 🔄 Updating Your App

1. Make changes locally
2. Commit and push to GitHub
3. Railway and Vercel will automatically redeploy
4. That's it! 🚀
