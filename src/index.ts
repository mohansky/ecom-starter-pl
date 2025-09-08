export interface Env {
  DB: any // D1Database type - will be available at runtime
  PAYLOAD_SECRET: string
  RESEND_API_KEY: string
  RESEND_FROM_EMAIL: string
  R2_BUCKET: string
  R2_ACCESS_KEY_ID: string
  R2_SECRET_ACCESS_KEY: string
  R2_ENDPOINT: string
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    
    // Set environment variables
    process.env.PAYLOAD_SECRET = env.PAYLOAD_SECRET
    process.env.RESEND_API_KEY = env.RESEND_API_KEY
    process.env.RESEND_FROM_EMAIL = env.RESEND_FROM_EMAIL
    process.env.R2_BUCKET = env.R2_BUCKET
    process.env.R2_ACCESS_KEY_ID = env.R2_ACCESS_KEY_ID
    process.env.R2_SECRET_ACCESS_KEY = env.R2_SECRET_ACCESS_KEY
    process.env.R2_ENDPOINT = env.R2_ENDPOINT
    process.env.NODE_ENV = 'production'

    try {
      // Dynamic import to avoid build-time issues
      const { getPayload } = await import('payload')
      const config = await import('./payload.config.js')
      
      const payload = await getPayload({
        config: {
          ...config.default,
          db: {
            client: env.DB,
          },
        },
      })

      // Handle admin routes
      if (url.pathname.startsWith('/admin')) {
        return await payload.handler(request)
      }

      // Handle API routes  
      if (url.pathname.startsWith('/api')) {
        return await payload.handler(request)
      }

      // Basic frontend response
      return new Response(`
        <html>
          <head><title>Ecom Payload Starter</title></head>
          <body>
            <h1>Ecom Payload Starter</h1>
            <p>Your Payload CMS is running!</p>
            <p><a href="/admin" target="_blank">Go to Admin Panel</a></p>
            <p><a href="/dashboard" target="_blank">Go to Dashboard</a></p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      })

    } catch (error) {
      console.error('Worker error:', error)
      return new Response(`Error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      })
    }
  },
}

export default worker