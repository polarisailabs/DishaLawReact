import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { lookupCase } from './server/caseStatus.js'

// In `npm run dev`, serve /api/case-status from the same code the production server uses.
const caseStatusApi = env => ({
  name: 'case-status-api',
  configureServer(server) {
    server.middlewares.use('/api/case-status', async (req, res) => {
      const { status, body } = await lookupCase(new URL(req.url, 'http://x').searchParams.get('cnr'), req.socket.remoteAddress, env)
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
    })
  }
})

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), caseStatusApi(loadEnv(mode, process.cwd(), ''))]
}))
