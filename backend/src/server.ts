import { app } from './app';
import { env, isDev } from './env';

// Only start server if not in serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(env.PORT, () => {
    console.log(`✓ Backend server running at http://localhost:${env.PORT}`);
    console.log(`✓ Environment: ${env.APP_STAGE}`);
    console.log(`✓ CORS enabled for ${env.CORS_ORIGIN}`);
    if (isDev()) {
      console.log(`✓ Development mode - check .env for configuration`);
    }
  });
}

// Export for Vercel
export function createServer() {
  return app;
}
