import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';
import { verifySmtpConnection } from './utils/emailService.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
// 1. CORS Configuration (FIX 6)
// Allows frontend on http://localhost:3000, preview on 4173, and FRONTEND_URL
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// 2. Body Parser with strictly limited payload size to prevent DoS attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 3. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'nilesh-khatik-portfolio-backend',
    timestamp: new Date().toISOString(),
  });
});

// 4. Contact API Route
app.use('/api/contact', contactRouter);

// 5. 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// 6. Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack || err.message);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
  });
});

// 7. Start Server with robust error handling and clean signal management (FIX 1)
let server = null;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`[Backend Server] Running on http://localhost:${PORT}`);
    console.log(`[Backend Server] Contact endpoint active at POST http://localhost:${PORT}/api/contact`);
    console.log(`[Backend Server] Recipient email: ${process.env.RECIPIENT_EMAIL || 'nileshkhatik700@gmail.com'}`);

    // Startup safe SMTP connection verification (FIX 5)
    verifySmtpConnection().catch(() => {});
  });

  // Handle server port conflicts (EADDRINUSE) gracefully with clear diagnostic guidance
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n[Backend Server Error] Port ${PORT} is already in use by another running process.`);
      console.error(`[Backend Server Error] To free port ${PORT}, run the following command in PowerShell:`);
      console.error(`Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT} -ErrorAction SilentlyContinue).OwningProcess | Stop-Process -Force\n`);
    } else {
      console.error('[Backend Server Error]', err.message);
    }
    process.exit(1);
  });

  // Graceful shutdown on Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n[Backend Server] Received Ctrl+C. Shutting down gracefully...');
    server.close(() => {
      console.log('[Backend Server] Server stopped.');
      process.exit(0);
    });
  });

  // Graceful shutdown on SIGTERM
  process.on('SIGTERM', () => {
    console.log('\n[Backend Server] Received SIGTERM. Shutting down gracefully...');
    server.close(() => {
      process.exit(0);
    });
  });
}

export default app;
