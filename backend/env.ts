import { z } from 'zod'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Determine environment stage
process.env.APP_STAGE = process.env.APP_STAGE || 'dev'

const isProduction = process.env.APP_STAGE === 'production'
const isDevelopment = process.env.APP_STAGE === 'dev'
const isTesting = process.env.APP_STAGE === 'test'

/**
 * Environment variables schema with Zod validation
 * Ensures type safety and runtime validation of all env vars
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // Application stage
  APP_STAGE: z
    .enum(['dev', 'test', 'production'])
    .default('dev'),

  // Server configuration
  PORT: z
    .coerce
    .number()
    .positive('PORT must be a positive number')
    .default(3000),

  // CORS configuration
  CORS_ORIGIN: z
    .string()
    .url('CORS_ORIGIN must be a valid URL')
    .default('http://localhost:5173'),

  // Logging
  LOG_LEVEL: z
    .enum(['debug', 'info', 'warn', 'error'])
    .default('info'),

  // Data persistence
  DATA_DIR: z
    .string()
    .default('./data'),

  // Optional: For future database integration
  DATABASE_URL: z
    .string()
    .optional(),
})

export type Env = z.infer<typeof envSchema>

let env: Env

try {
  env = envSchema.parse(process.env)
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:')

    e.issues.forEach((err) => {
      const path = err.path.join('.')
      console.error(`  ${path}: ${err.message}`)
    })

    process.exit(1)
  }

  throw e
}

/**
 * Environment check functions
 */
export const isProd = () => env.APP_STAGE === 'production'
export const isDev = () => env.APP_STAGE === 'dev'
export const isTest = () => env.APP_STAGE === 'test'

/**
 * Export validated environment variables
 */
export { env }
export default env
