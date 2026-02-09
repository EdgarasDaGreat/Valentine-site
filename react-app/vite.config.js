import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/creditCalc/', // Ensures relative paths for assets
  plugins: [react()],
})
