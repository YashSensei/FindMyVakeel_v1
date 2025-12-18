import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import caseRoutes from './routes/cases.js';
import uploadRoutes from './routes/upload.js';
import chatRoutes from './routes/chat.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173', 'http://localhost:8080'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (same-origin requests, mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow if origin matches allowed origins or is the same as RENDER_EXTERNAL_URL
    const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed)) ||
                     (process.env.RENDER_EXTERNAL_URL && origin.startsWith(process.env.RENDER_EXTERNAL_URL));
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Find My Vakeel API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Keep-alive endpoint for Render (prevents spinning down)
app.get('/api/keep-alive', (req, res) => {
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing - serve index.html for all non-API routes
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // Skip if requesting static assets (has file extension)
  if (req.path.match(/\.\w+$/)) {
    return next();
  }
  
  // Serve index.html for all other routes (SPA routing)
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Self-ping to prevent Render from spinning down (only in production)
  if (process.env.NODE_ENV === 'production' && process.env.RENDER_EXTERNAL_URL) {
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
    console.log('Starting keep-alive pinger for Render...');
    
    // Ping every 14 minutes (Render free tier spins down after 15 min of inactivity)
    setInterval(async () => {
      try {
        const response = await fetch(`${RENDER_URL}/api/keep-alive`);
        if (response.ok) {
          console.log(`✓ Keep-alive ping successful at ${new Date().toISOString()}`);
        }
      } catch (error) {
        console.error('Keep-alive ping failed:', error.message);
      }
    }, 14 * 60 * 1000); // 14 minutes
  }
});
