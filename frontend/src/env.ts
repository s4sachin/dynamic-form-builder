import { z } from 'zod'

/**
 * Frontend environment variables schema with Zod validation
 * Note: All variables must be prefixed with VITE_ to be exposed to the client bundle
 * 
 * These are evaluated at build time and baked into the client bundle
 */
const envSchema = z.object({
  // API Configuration
  VITE_API_BASE_URL: z
    .url('VITE_API_BASE_URL must be a valid URL')
    .default('http://localhost:3000'),

  // API Paths
  VITE_API_FORM_SCHEMA_ENDPOINT: z
    .string()
    .default('/api/form-schema'),

  VITE_API_SUBMISSIONS_ENDPOINT: z
    .string()
    .default('/api/submissions'),

  // Feature Flags
  VITE_ENABLE_DEMO_MODE: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .default(() => false),

  // UI Configuration
  VITE_TOAST_POSITION: z
    .enum(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'])
    .default('top-right'),

  // Logging
  VITE_LOG_LEVEL: z
    .enum(['debug', 'info', 'warn', 'error'])
    .default('info'),

  // Optional: Application mode
  VITE_APP_MODE: z
    .enum(['development', 'production'])
    .default('development'),
})

export type FrontendEnv = z.infer<typeof envSchema>

let env: FrontendEnv = {} as FrontendEnv

try {
  env = envSchema.parse(import.meta.env)
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error('❌ Invalid frontend environment variables:')
    
    e.issues.forEach((err) => {
      const path = err.path.join('.')
      console.error(`  ${path}: ${err.message}`)
    })

    // In development, don't crash the app
    if (import.meta.env.MODE === 'development') {
      console.warn('⚠️  Using defaults for invalid env vars in development mode')
    } else {
      throw new Error('Invalid environment configuration')
    }
  }
}

/**
 * Helper functions for environment checks
 */
export const isDev = () => import.meta.env.MODE === 'development'
export const isProd = () => import.meta.env.MODE === 'production'
export const isDemoMode = () => env.VITE_ENABLE_DEMO_MODE

/**
 * API URL helpers
 */
export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = env.VITE_API_BASE_URL
  return endpoint ? `${baseUrl}${endpoint}` : baseUrl
}

export const getFormSchemaUrl = () =>
  getApiUrl(env.VITE_API_FORM_SCHEMA_ENDPOINT)

export const getSubmissionsUrl = () =>
  getApiUrl(env.VITE_API_SUBMISSIONS_ENDPOINT)

/**
 * Export validated environment variables
 */
export { env }
export default env
