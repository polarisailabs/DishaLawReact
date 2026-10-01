import http from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lookupCase } from './server/caseStatus.js'

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' }

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  if (url.pathname === '/api/case-status') {
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress
    const { status, body } = await lookupCase(url.searchParams.get('cnr'), ip)
    res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    return res.end(JSON.stringify(body))
  }
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
  let file = join(root, rel)
  let data
  try { data = await readFile(file) } catch { file = join(root, 'index.html'); data = await readFile(file) }   // SPA fallback
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
  res.end(data)
}).listen(process.env.PORT || 3000, () => console.log('Disha Law Firm site on port', process.env.PORT || 3000))
