#!/usr/bin/env node

// Script to run local development with D1 database
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

console.log('🚀 Starting local development with D1 database...')

// Start Next.js dev server with D1 environment
const nextDev = spawn('pnpm', ['run', 'dev'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    DATABASE_URI: 'file:./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/0114e14bd3182b4217f5f3895a55655369522dace6ff29e9fefdc211b87af026.sqlite',
    NODE_ENV: 'development'
  }
})

nextDev.on('close', (code) => {
  console.log(`\n✅ Development server exited with code ${code}`)
})

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...')
  nextDev.kill('SIGINT')
})