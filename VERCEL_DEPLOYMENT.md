# Vercel Deployment Guide for MediConnect Backend

## ⚠️ Critical: Vercel Project Settings

### Root Directory Configuration

**MOST COMMON ERROR**: In your Vercel project settings, the **Root Directory** field must be **EMPTY**.

❌ **DO NOT** set Root Directory to:
- "backend"
- "backend " (with trailing space)
- "./" or any other value

✅ **LEAVE COMPLETELY EMPTY** - The vercel.json configuration at repository root handles everything

### How to Fix "Root Directory does not exist" Error

If deployment fails with:
```
The specified Root Directory "backend " does not exist. Please update your Project Settings
```

**Fix (takes 30 seconds):**
1. Go to https://vercel.com/dashboard
2. Select your project → **Settings** → **General**
3. Scroll to **"Root Directory"** section
4. Click the **X** or backspace to **completely clear** the field
5. Ensure it shows as empty/blank (not ".", not "./", just empty)
6. Click **Save** at the bottom of the page
7. Go to **Deployments** tab → Click **"Redeploy"** on the latest deployment

### Alternative: Framework Preset

If clearing Root Directory doesn't work, try setting the Framework Preset:

1. Go to **Settings** → **General**
2. Set **Framework Preset** to "Other"
3. Ensure **Root Directory** is still empty
4. **Build Command**: Leave empty (Vercel auto-detects)
5. **Output Directory**: Leave empty
6. **Install Command**: Leave empty (Vercel auto-detects)
7. Save and redeploy

## Vercel Configuration

The `vercel.json` file at the repository root configures:
- Build source: `backend/server.js`
- Runtime: `@vercel/node`
- All routes forward to the backend serverless function

## Environment Variables

Configure these in Vercel Dashboard → Settings → Environment Variables:

### Required Variables
```
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-jwt-secret
CLIENT_URL=https://your-frontend-domain.vercel.app
PORT=8080
NODE_ENV=production
```

### Optional Variables (for specific features)
```
RAZORPAY_TEST_API_KEY=your-razorpay-key
RAZORPAY_TEST_KEY_SECRET=your-razorpay-secret
CURRENCY=INR
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_SECRET_KEY=your-cloudinary-secret
```

## Deployment Architecture

```
Repository Root (/)
├── vercel.json          ← Deployment configuration
├── backend/
│   ├── server.js        ← Entry point for Vercel serverless function
│   ├── package.json     ← Dependencies and Node.js version
│   └── ...
├── frontend/            ← Not deployed with this config
└── admin/              ← Not deployed with this config
```

## Verification Steps

After fixing the Root Directory setting:

1. **Check Build Logs**: Verify "Cloning" shows the correct commit
2. **Verify Build**: Should see "Installing dependencies" for backend
3. **Check Function**: Should create serverless function from `backend/server.js`
4. **Test Endpoint**: Visit `https://your-project.vercel.app/` - should return "app is listing"

## Troubleshooting Common Deployment Issues

### Issue 1: "Root Directory does not exist" Error
**Symptoms:**
```
The specified Root Directory "backend " does not exist. Please update your Project Settings
```

**Solution:**
1. Vercel Dashboard → Project → Settings → General
2. Clear **Root Directory** field completely (must be empty)
3. Save and redeploy

**Still failing?**
- Check for invisible characters or spaces
- Try setting Framework Preset to "Other"
- Ensure you're editing the correct project

---

### Issue 2: "Cannot find module" or Build Fails
**Symptoms:**
- Build fails during "Installing dependencies"
- Error: "Cannot find module 'express'" or similar

**Solution:**
1. Verify `backend/package.json` exists with all dependencies
2. Check Node.js version in `engines` field (should be `>=18.x`)
3. Ensure `vercel.json` points to `backend/server.js`

**Command to test locally:**
```bash
cd backend
npm install
node server.js
```

---

### Issue 3: Deployment Succeeds but Returns 404
**Symptoms:**
- Build succeeds
- Visiting URL returns 404 or "Not Found"

**Solution:**
1. Check `vercel.json` routes configuration
2. Verify `backend/server.js` exports `app` as default:
   ```javascript
   export default app;
   ```
3. Check Vercel Functions tab to see if function was created

---

### Issue 4: "ENOENT: no such file or directory"
**Symptoms:**
- Error during build mentioning missing files

**Solution:**
1. Ensure file paths in imports use correct case (case-sensitive)
2. Check `.vercelignore` isn't excluding required files
3. Verify all imports in `server.js` point to existing files

---

### Issue 5: Build Succeeds but API Returns Errors
**Symptoms:**
- Deployment successful
- API returns 500 or connection errors

**Solution:**
1. Check Vercel Function logs (Dashboard → Project → Functions → View Logs)
2. Verify environment variables are set:
   - MONGO_URI (required for database)
   - JWT_SECRET (required for auth)
   - CLIENT_URL (required for CORS)
3. Services degrade gracefully:
   - MongoDB: Logs warning if MONGO_URI missing
   - Razorpay: Payment endpoints return "not configured"
   - Cloudinary: Image uploads disabled

**Check logs command:**
```bash
vercel logs <your-deployment-url>
```

---

### Issue 6: CORS Errors from Frontend
**Symptoms:**
- API works in Postman but not from browser
- Console shows CORS policy errors

**Solution:**
1. Set `CLIENT_URL` environment variable to your frontend URL
2. Format: `https://your-frontend.vercel.app` (no trailing slash)
3. For local testing, update `backend/server.js` CORS fallback

---

### Issue 7: Vercel Build Timeout
**Symptoms:**
- Build exceeds time limit
- Error: "Task timed out"

**Solution:**
1. Reduce `maxLambdaSize` in `vercel.json` if needed
2. Check for large dependencies
3. Consider splitting into multiple functions if needed

---

### Getting More Help

**View Build Logs:**
1. Vercel Dashboard → Deployments → Click on deployment
2. View full build log for detailed errors

**View Runtime Logs:**
1. Dashboard → Project → Functions
2. Click on function → View Logs

**Test Locally First:**
```bash
cd backend
npm install
NODE_ENV=production node server.js
# Should start without errors even without env vars
```

## Notes

- The backend is deployed as a **serverless function**
- Node.js version is set to `>=18.x` in `backend/package.json`
- Services (Razorpay, MongoDB, Cloudinary) degrade gracefully if credentials are missing
- The server won't start a listener in production mode (serverless-ready)
