/**
 * Development setup and initialization script
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function initializeDevEnvironment() {
  console.log('Initializing development environment...')

  // Create db directory if it doesn't exist
  const dbDir = path.join(__dirname, 'db')
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
    console.log('✓ Created db directory')
  }

  // Check for schema file
  const schemaPath = path.join(dbDir, 'scema.sql')
  if (!fs.existsSync(schemaPath)) {
    console.warn('⚠ Schema file not found at:', schemaPath)
  } else {
    console.log('✓ Schema file found')
  }

  console.log('✓ Development environment ready')
}
