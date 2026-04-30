import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/study-hub/math-speeed/' : '/math-speeed/',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5177, strictPort: true },
}))
