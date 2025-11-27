import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Allow popups spawned by auth flows to close themselves during dev
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    }
  },
})
