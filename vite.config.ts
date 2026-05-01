import { defineConfig } from 'vite'

const APP_PORTS: Record<string, number> = {
  'ai-study': 5174,
  'bitcoin-study': 5175,
  'invest-study': 5176,
  'math-speeed': 5177,
  'dev-study': 5178,
}

const proxy = Object.fromEntries(
  Object.entries(APP_PORTS).map(([app, port]) => [
    `/${app}`,
    { target: `http://localhost:${port}`, changeOrigin: true, ws: true },
  ])
)

export default defineConfig({
  root: 'landing',
  server: { port: 5190, host: true, proxy },
})
