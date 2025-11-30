import express from 'express';
import cors from 'cors';
import { env, isDev } from '../env';

const app = express();

app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Form Builder API is running',
    environment: env.APP_STAGE
  });
});

app.listen(env.PORT, () => {
  console.log(`✓ Backend server running at http://localhost:${env.PORT}`);
  console.log(`✓ Environment: ${env.APP_STAGE}`);
  console.log(`✓ CORS enabled for ${env.CORS_ORIGIN}`);
  if (isDev()) {
    console.log(`✓ Development mode - check .env for configuration`);
  }
});
