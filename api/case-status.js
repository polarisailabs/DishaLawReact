import { lookupCase } from '../server/caseStatus.js'
export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'method_not_allowed' }) }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
  const { status, body } = await lookupCase(req.query.cnr, ip)
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).json(body)
}
