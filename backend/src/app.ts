import express from 'express';
import cors from 'cors';
import { env, isDev } from './env';
import formRoutes from './routes/formRoutes';
import submissionRoutes from './routes/submissionRoutes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

// CORS configuration - allow both common dev ports
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    // In development, allow localhost on any port
    if (isDev() && origin.includes('localhost')) {
      callback(null, true);
      return;
    }

    // In production, only allow configured origin
    if (origin === env.CORS_ORIGIN) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api', formRoutes);
app.use('/api', submissionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Form Builder API is running',
    environment: env.APP_STAGE
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);
