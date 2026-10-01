# Disha Law Firm website

    npm install
    npm run dev        # http://localhost:5173

## Case status (eCourts lookup)

There is no official public eCourts API, so the site uses the eCourtsIndia partner API
(https://ecourtsindia.com/api/docs) through a small server-side proxy. The API token must stay on the server.

1. Get an API token from https://ecourtsindia.com/api (lookups are billed per request).
2. Copy `.env.example` to `.env` and set `ECOURTS_API_TOKEN`.
3. `npm run dev` already serves `/api/case-status` locally.

Deploy one of two ways:
- **Vercel**: add `ECOURTS_API_TOKEN` in Project Settings, Environment Variables. `api/case-status.js` is picked up automatically.
- **Any server / VPS**: `npm run build && node --env-file=.env server.js` (serves the site and the API on `PORT`, default 3000).

The proxy validates the CNR, caches each CNR for 10 minutes, and limits each visitor to 15 lookups per 10 minutes so the billed API cannot be drained.

## Content

- 
- `src/data/videos.js`: Vlog (YouTube IDs)
- `src/pages/Careers.jsx`: open roles

## Content and images

- Page text is copied from https://dishalawfirm.com/ and lives in `src/data/` (`services.js`, `home.js`, `judgements.js`, `site.js`) and in the page files.
- Photos come from Unsplash and Pexels (free commercial licence, no attribution required; no credit line is shown on the site). The key -> photo map is `src/data/photos.js`; swap a URL there to change an image everywhere it is used.
- Photos are served from `public/images/<key>.jpg`. `npm run images` downloads them (it also runs automatically before `npm run dev` and `npm run build`; add `-- --force` to re-download). File names include a hash of the source URL, so swapping a photo in `photos.js` never shows an old download. If a local file is missing, `<Photo>` in `src/components/Art.jsx` loads the remote Unsplash/Pexels URL, and if that fails too it shows the original SVG panel. Commit `public/images/` so deploys don't need the download. The logo, favicon, glyph icons and the founder portrait placeholder are still original SVG.
- Menu: Home, Services, Media Presence, Resources, Careers, About Us (Our Firm, Our Founder, Our Team, Contact Us). Latest Judgements is the last section of Home (`/#judgements`); Resources menu lists Latest Judgements, then Case Status.
