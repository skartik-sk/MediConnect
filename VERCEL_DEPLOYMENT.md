# Vercel Deployment Guide for MediConnect Backend

## Important: Vercel Project Settings

### Root Directory Configuration

**CRITICAL**: In your Vercel project settings, the **Root Directory** field must be **EMPTY** or set to `.` (repository root).

❌ **DO NOT** set Root Directory to "backend" or "backend " (with space)  
✅ **LEAVE EMPTY** - The vercel.json configuration handles the backend deployment

### How to Fix the Current Error

If you're seeing this error:
```
The specified Root Directory "backend " does not exist. Please update your Project Settings
```

**Steps to fix:**
1. Go to your project on Vercel Dashboard
2. Navigate to **Settings** → **General**
3. Find the **Root Directory** field
4. **Clear the field completely** (leave it empty)
5. Click **Save**
6. Trigger a new deployment

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

## Troubleshooting

### "Root Directory does not exist" Error
- **Cause**: Root Directory field has extra spaces or incorrect value
- **Fix**: Clear the Root Directory field in Vercel project settings

### "Missing dependencies" Error
- **Cause**: vercel.json might not be properly configured
- **Fix**: Ensure vercel.json exists at repository root

### "Module not found" Error
- **Cause**: Environment variables missing or incorrect paths
- **Fix**: Verify all required environment variables are set

### Build succeeds but routes fail
- **Cause**: CORS or environment variable issues
- **Fix**: Ensure CLIENT_URL is set correctly in environment variables

## Notes

- The backend is deployed as a **serverless function**
- Node.js version is set to `>=18.x` in `backend/package.json`
- Services (Razorpay, MongoDB, Cloudinary) degrade gracefully if credentials are missing
- The server won't start a listener in production mode (serverless-ready)
