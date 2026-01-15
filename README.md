# MediConnect - Doctor Appointment Booking System

A full-stack web application for booking doctor appointments with admin and user portals.

## 📁 Project Structure

```
MediConnect/
├── backend/          # Node.js + Express API (deployed to Vercel)
├── frontend/         # React frontend
├── admin/           # Admin dashboard
└── vercel.json      # Vercel deployment configuration
```

## 🚀 Deploying Backend to Vercel

### ⚠️ Important: Root Directory Setting

**In Vercel Project Settings, the Root Directory MUST be EMPTY (or set to `.`)**

If you see this error during deployment:
```
The specified Root Directory "backend " does not exist
```

**Fix it:**
1. Open Vercel Dashboard → Your Project → Settings → General
2. Find **"Root Directory"** field
3. **Clear it completely** (remove any text including "backend", "backend ", etc.)
4. Save and redeploy

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment guide.

### Quick Start

1. **Connect GitHub repo to Vercel**
2. **Clear Root Directory** in project settings (leave empty)
3. **Add environment variables** (see below)
4. Deploy!

### Required Environment Variables

```env
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

Optional (for specific features):
```env
RAZORPAY_TEST_API_KEY=your-key
RAZORPAY_TEST_KEY_SECRET=your-secret
CLOUDINARY_NAME=your-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_SECRET_KEY=your-secret
```

## 🏗️ Backend Architecture

- **Serverless deployment** using Vercel Functions
- **Node.js >=18.x** runtime
- **Graceful degradation** - app works even if optional services (Razorpay, Cloudinary) aren't configured
- **ES Modules** - Uses `import`/`export` syntax

## 📝 Features

- User registration and authentication
- Doctor profiles and availability
- Appointment booking system
- Payment integration (Razorpay)
- Admin dashboard for managing doctors
- Image uploads (Cloudinary)

## 🧪 Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

Base URL: `https://your-project.vercel.app`

### Public Endpoints
- `GET /` - Health check
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login

### Protected Endpoints (require JWT token)
- `GET /api/v1/user/get-profile` - Get user profile
- `POST /api/v1/user/book-appointment` - Book appointment
- `GET /api/v1/user/appointments` - List user appointments

For complete API documentation, see the backend route files.

## 🐛 Troubleshooting Vercel Deployment

| Error | Cause | Solution |
|-------|-------|----------|
| "Root Directory does not exist" | Root Directory has spaces or wrong value | Clear Root Directory field |
| Module not found | Missing dependencies | Check vercel.json build config |
| Env variable undefined | Missing environment variables | Add variables in Vercel dashboard |
| CORS errors | Wrong CLIENT_URL | Set CLIENT_URL to your frontend domain |

## 📄 License

ISC

## 👤 Author

Yash Panchal
