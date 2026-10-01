// Removes dead YouTube videos from src/data/videos.js (deleted, private, or embedding disabled).
// Run:  npm run videos   (needs internet). Review the result with `git diff`.
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { youtube } from '../src/data/videos.js'

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'videos.js')
const dead = [], unknown = []
async function check(id) {
  try {
    const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://youtu.be/' + id), { signal: AbortSignal.timeout(15000) })
    if ([401, 403, 404].includes(r.status)) dead.push(id)
    else if (!r.ok) unknown.push(id + ' (' + r.status + ')')
  } catch (e) { unknown.push(id + ' (' + e.message + ')') }
}
for (let i = 0; i < youtube.length; i += 6) await Promise.all(youtube.slice(i, i + 6).map(check))
const alive = youtube.filter(id => !dead.includes(id))
const src = await readFile(file, 'utf8')
await writeFile(file, src.replace(/export const youtube=\[[^\]]*\]/, 'export const youtube=' + JSON.stringify(alive)))
console.log(`videos: ${alive.length} kept, ${dead.length} removed${dead.length ? ' -> ' + dead.join(', ') : ''}`)
if (unknown.length) console.warn(`could not check ${unknown.length} (kept):\n  ` + unknown.join('\n  '))
