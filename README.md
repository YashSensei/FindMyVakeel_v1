# This is the copy repo, original one is now moved to an organisation - v1 of Find My Vakeel

# Find My Vakeel - Legal Services Platform

A modern legal services platform connecting clients with qualified lawyers through AI-powered matching and consultation services.

## 🌟 Project Overview

**Live Demo**: https://axsyn-tech.onrender.com/

Find My Vakeel is a comprehensive legal services marketplace that leverages AI to match clients with the right lawyers based on their legal needs. The platform includes features like AI-powered case analysis, lawyer matching, real-time chat, and document management.

## 🚀 Technologies Used

### Frontend
- **Vite** - Fast build tool and dev server
- **React 18.3.1** - UI framework
- **TypeScript 5.8.3** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **EmailJS** - Email verification service

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **MegaLLM API** - AI-powered legal analysis

## 📋 Features

### Core Features
- ✅ User authentication with JWT (login/register)
- ✅ Email verification using OTP
- ✅ AI-powered legal problem analysis
- ✅ Smart lawyer matching based on case type
- ✅ Real-time chat with lawyers
- ✅ Document upload and management
- ✅ User profile with avatar upload
- ✅ Responsive design (mobile-first)

### AI Integration
- Legal category classification
- Urgency level assessment
- Case complexity estimation
- Lawyer recommendations
- Interactive legal consultation chat

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- MegaLLM API key
- EmailJS account (for email verification)

### Installation

1. **Clone the repository**
```sh
git clone https://github.com/YashSensei/axsyn-tech-launchpad.git
cd axsyn-tech-launchpad
```

2. **Install dependencies**
```sh
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and fill in your values:
```sh
cp .env.example .env
```

Required environment variables:
```env
# Frontend
VITE_API_URL=http://localhost:3001/api

# Backend
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
MEGALLM_API_KEY=your_megallm_api_key
PORT=3001
NODE_ENV=development

# EmailJS (for email verification)
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id

# Render deployment (optional)
RENDER_EXTERNAL_URL=https://your-app.onrender.com
```

4. **Start development servers**
```sh
npm run dev:all
```

This runs both frontend (port 8080) and backend (port 3001) concurrently.

Or run them separately:
```sh
# Frontend only
npm run dev

# Backend only
npm run server

# both at once
npm run dev:all
```


## 📧 Email Verification Setup

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions on setting up EmailJS for email verification.

Quick steps:
1. Create account at https://www.emailjs.com/
2. Connect your email service (Gmail recommended)
3. Create OTP email template
4. Copy Public Key, Service ID, and Template ID to `.env`

## 🚢 Deployment

### Frontend (Vercel)
```sh
npm run build
vercel deploy
```

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm run server`
5. Add environment variables from `.env`
6. Set `NODE_ENV=production` and `RENDER_EXTERNAL_URL` for keep-alive

**Keep-Alive Feature**: The server automatically pings itself every 14 minutes to prevent Render free tier from spinning down.

## 📁 Project Structure

```
axsyn-tech-launchpad/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── EmailVerification.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── pages/                   # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Register.tsx
│   │   ├── Profile.tsx
│   │   └── ...
│   ├── services/                # API services
│   │   ├── api.ts
│   │   ├── emailService.ts
│   │   └── aiService.ts
│   ├── context/                 # React context
│   │   └── AuthContext.tsx
│   └── types/                   # TypeScript types
├── server/                       # Backend source code
│   ├── models/                  # MongoDB models
│   │   ├── User.js
│   │   ├── Case.js
│   │   └── Lawyer.js
│   ├── routes/                  # Express routes
│   │   ├── auth.js
│   │   ├── cases.js
│   │   └── ...
│   ├── middleware/              # Express middleware
│   │   ├── auth.js
│   │   └── validate.js
│   └── index.js                 # Server entry point
├── public/                       # Static assets
├── .env.example                 # Environment template
├── EMAILJS_SETUP.md            # Email setup guide
└── package.json
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS configuration
- XSS protection
- File upload validation (1MB limit)
- Email verification with OTP

## 🎨 UI Components

Built with shadcn/ui:
- Forms and inputs
- Dialogs and modals
- Cards and layouts
- Buttons and navigation
- Toast notifications
- Progress indicators

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `xs` (475px), `sm` (640px), `md` (768px), `lg` (1024px)
- Touch-friendly interface
- Optimized for all screen sizes

## 🧪 Testing

```sh
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

**Axsyn Tech**
- Repository: https://github.com/YashSensei/axsyn-tech-launchpad
- Branch: `fmv` (Find My Vakeel)

## 🐛 Known Issues

- Profile image upload limited to 1MB (use compressed images)
- OTP stored in localStorage (should use backend in production)
- Free tier Render may experience cold starts

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for email configuration
- Review `.env.example` for required environment variables

---

Built with ❤️ by Axsyn Tech
