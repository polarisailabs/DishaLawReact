// Case-status lookup by CNR, via the eCourtsIndia partner API (https://ecourtsindia.com/api/docs).
// There is no official public eCourts API (the government portal needs a CAPTCHA and blocks browser calls),
// so this runs on the server and keeps the paid API token out of the browser.
//
// Env:  ECOURTS_API_TOKEN  (required)  Bearer token, looks like eci_live_...
//       ECOURTS_API_BASE   (optional)  defaults to https://webapi.ecourtsindia.com

const CNR_RE = /^[A-Z]{4}\d{12}$/
const CACHE_MS = 10 * 60 * 1000          // same CNR within 10 min is served from memory (saves credits)
const LIMIT = { max: 15, windowMs: 10 * 60 * 1000 }   // per visitor, because every live lookup is billed
const cache = new Map()
const hits = new Map()

export const normalizeCnr = v => String(v || '').trim().toUpperCase().replace(/[\s-]/g, '')

const strs = a => (Array.isArray(a) ? a : []).map(x => (typeof x === 'string' ? x : x?.name)).filter(Boolean)

export function shapeCase(json) {
  const c = json?.data?.courtCaseData
  if (!c) return null
  const lk = json.data.descriptions?.enumLookup || {}
  const pending = c.caseStatus === 'PENDING'
  return {
    cnr: c.cnr,
    court: c.courtName || lk.courtCode?.[c.cnrCourtCode] || '',
    caseType: lk.caseType?.[c.caseType] || c.caseTypeRaw || c.caseType || '',
    status: c.caseStatus || '',
    statusLabel: lk.caseStatus?.[c.caseStatus] || c.caseStatus || '',
    filingNumber: c.filingNumber || '', filingDate: c.filingDate || '',
    registrationNumber: c.registrationNumber || '', registrationDate: c.registrationDate || '',
    firstHearingDate: c.firstHearingDate || '',
    lastHearingDate: c.lastHearingDate || '',
    nextHearingDate: pending ? c.nextHearingDate || '' : '',   // for disposed cases the API repeats the decision date
    decisionDate: c.decisionDate || '',
    stage: pending ? c.purpose || '' : '',
    disposal: c.disposalTypeRaw || '',
    judges: strs(c.judges),
    petitioners: strs(c.petitioners), petitionerAdvocates: strs(c.petitionerAdvocates),
    respondents: strs(c.respondents), respondentAdvocates: strs(c.respondentAdvocates),
    hearingCount: c.hearingCount ?? (c.historyOfCaseHearings || []).length,
    hearings: (c.historyOfCaseHearings || []).slice(-10).reverse().map(h => ({
      date: h.businessOnDate || '', judge: h.judge || '', nextDate: h.hearingDate || '', purpose: h.purposeOfListing || ''
    })),
    updatedAt: json.data.entityInfo?.dateModified || ''
  }
}

function overLimit(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < LIMIT.windowMs)
  recent.push(now); hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < LIMIT.windowMs)) hits.delete(k)
  return recent.length > LIMIT.max
}

const fail = (status, error, message) => ({ status, body: { error, message } })

export async function lookupCase(rawCnr, ip = 'unknown', env = process.env, fetchImpl = fetch) {
  const cnr = normalizeCnr(rawCnr)
  if (!CNR_RE.test(cnr))
    return fail(400, 'invalid_cnr', 'A CNR has 16 characters: 4 letters followed by 12 digits, for example DLHC010012342023.')

  const token = env.ECOURTS_API_TOKEN
  if (!token) return fail(503, 'not_configured', 'Case status lookup is not set up yet.')

  const hit = cache.get(cnr)
  if (hit && Date.now() - hit.at < CACHE_MS) return { status: 200, body: hit.data }
  if (overLimit(ip)) return fail(429, 'rate_limited', 'Too many lookups. Please try again in a few minutes.')

  let res
  try {
    const base = (env.ECOURTS_API_BASE || 'https://webapi.ecourtsindia.com').replace(/\/$/, '')
    res = await fetchImpl(`${base}/api/partner/case/${cnr}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(25000)
    })
  } catch (e) {
    console.error('[case-status] upstream unreachable:', e.name)
    return fail(504, 'upstream_unreachable', 'The court records service did not respond. Please try again shortly.')
  }

  if (res.status === 404) return fail(404, 'not_found', 'No case found for this CNR. Check the number and try again.')
  if (!res.ok) {
    // 401/403 = bad token, 402 = out of credits: log for the site owner, show visitors a neutral message.
    console.error('[case-status] upstream status', res.status)
    if (res.status === 429) return fail(429, 'busy', 'The court records service is busy. Please try again in a minute.')
    return fail(502, 'upstream_error', 'Case status is temporarily unavailable.')
  }

  let data
  try { data = shapeCase(await res.json()) } catch { data = null }
  if (!data) return fail(502, 'bad_response', 'Case status is temporarily unavailable.')

  if (cache.size > 500) cache.clear()
  cache.set(cnr, { at: Date.now(), data })
  return { status: 200, body: data }
}
