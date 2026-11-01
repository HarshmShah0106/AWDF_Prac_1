import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''

  return {
    plugins: [react()],
    envPrefix: ['VITE_', 'GEMINI_'],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiKey),
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
    },
    preview: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
  }
})
