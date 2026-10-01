// Downloads every photo listed in src/data/photos.js into public/images/ (file names include a hash of the source URL).
// Skips files already on disk, deletes old/unused photo files, and never fails the build:
// if a download fails, the site loads the photo from its remote URL instead.
import { mkdir, writeFile, readdir, rm, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PHOTOS } from '../src/data/photos.js'

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')
await mkdir(dir, { recursive: true })
const force = process.argv.includes('--force')
let ok = 0, skipped = 0, removed = 0, failed = []

async function get(p) {
  const file = join(dir, p.file)
  if (!force) { try { await access(file); skipped++; return } catch {} }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(p.remote, { headers: { 'User-Agent': 'Mozilla/5.0 (disha-law-firm image fetch)' }, signal: AbortSignal.timeout(30000) })
      const type = r.headers.get('content-type') || ''
      if (!r.ok || !type.startsWith('image/')) throw new Error(r.status + ' ' + type)
      await writeFile(file, Buffer.from(await r.arrayBuffer()))
      ok++; return
    } catch (e) { if (attempt === 3) failed.push(p.file + ' (' + e.message + ')') }
  }
}

const list = Object.values(PHOTOS)
for (let i = 0; i < list.length; i += 4) await Promise.all(list.slice(i, i + 4).map(get))

// remove photos from older versions (e.g. banner.jpg) that are no longer referenced; other files (founder.webp) are kept
const keep = new Set(list.map(p => p.file))
for (const f of await readdir(dir)) if ((f.endsWith('.jpg') && !keep.has(f)) || f === 'sources.json') { await rm(join(dir, f)); removed++ }

console.log(`images: ${ok} downloaded, ${skipped} already present, ${removed} old removed, ${failed.length} failed`)
if (failed.length) console.warn('  failed (site will use the remote URL for these):\n  ' + failed.join('\n  '))
process.exit(0)
