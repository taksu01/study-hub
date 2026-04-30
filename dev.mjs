import { readdirSync, statSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { concurrently } from 'concurrently'

const __dirname = dirname(fileURLToPath(import.meta.url))
const appsDir = resolve(__dirname, 'apps')

const apps = readdirSync(appsDir)
  .filter(name => statSync(resolve(appsDir, name)).isDirectory())
  .sort()

const commands = [
  { command: 'vite', name: 'landing', prefixColor: 'magenta' },
  ...apps.map((app, i) => ({
    command: `npm --prefix apps/${app} run dev`,
    name: app,
    prefixColor: ['cyan', 'yellow', 'green', 'blue'][i % 4],
  })),
]

const { result } = concurrently(commands, { killOthers: ['failure'] })

result.then(() => process.exit(0)).catch(() => process.exit(1))
