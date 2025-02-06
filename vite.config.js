import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: './.cert/key.pem', // Path to the private key
      cert: './.cert/cert.pem', // Path to the certificate
    },
  },
})
