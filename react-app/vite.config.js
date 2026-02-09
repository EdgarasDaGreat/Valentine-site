import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Valentine-site/', // Ensures relative paths for assets
  plugins: [react()],
})
