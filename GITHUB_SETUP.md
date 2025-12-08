# 📤 How to Push Your Code to GitHub

Step-by-step guide to upload your Elective System to GitHub.

---

## 🚀 Quick Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `elective-system` (or any name you like)
   - **Description:** "Elective Selection System with Interest Survey"
   - **Visibility:** Public or Private (your choice)
   - **DO NOT** check "Initialize with README" (we already have code)
4. Click **"Create repository"**
5. **Copy the repository URL** (e.g., `https://github.com/yourusername/elective-system.git`)

---

### Step 2: Initialize Git (if not already done)

Open PowerShell or Command Prompt in your project folder:

```bash
cd c:\Users\Admin\elective-system
git init
```

---

### Step 3: Add All Files

```bash
git add .
```

This adds all files to staging (except those in `.gitignore`)

---

### Step 4: Make Your First Commit

```bash
git commit -m "Initial commit: Elective System with Railway/Vercel deployment setup"
```

---

### Step 5: Connect to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub details:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/elective-system.git
```

---

### Step 6: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You'll be asked to enter your GitHub username and password (or personal access token).

---

## 🔐 If You Get Authentication Errors

GitHub no longer accepts passwords. Use a **Personal Access Token**:

### Create Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name: "Elective System"
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

### Use Token Instead of Password:

When pushing, use:
- **Username:** Your GitHub username
- **Password:** Paste your personal access token

---

## ✅ Complete Command Sequence

Copy and paste these commands one by one:

```bash
# Navigate to project
cd c:\Users\Admin\elective-system

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Elective System with deployment setup"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 Future Updates

After making changes, push updates with:

```bash
git add .
git commit -m "Description of your changes"
git push
```

---

## 📝 What Gets Pushed

✅ **Will be pushed:**
- All source code (frontend & backend)
- Configuration files
- Documentation

❌ **Won't be pushed** (thanks to `.gitignore`):
- `node_modules/` (frontend dependencies)
- `venv/` (Python virtual environment)
- `db.sqlite3` (local database)
- `.env` files (environment variables)
- Build files

---

## 🆘 Troubleshooting

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Error: "failed to push some refs"**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Error: Authentication failed**
- Use Personal Access Token instead of password
- Make sure token has "repo" scope

---

## 🎉 Done!

Your code is now on GitHub! You can:
- Share the repository URL
- Deploy to Railway/Vercel (they connect to GitHub)
- Collaborate with others
- Track changes with version control
