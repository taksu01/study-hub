import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/study-hub/bitcoin-study/' : '/bitcoin-study/',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5175, strictPort: true },
}))
