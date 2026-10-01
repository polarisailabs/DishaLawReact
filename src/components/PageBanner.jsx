import { Link } from 'react-router-dom'
import { Photo } from './Art'
// Same light photo behind the title of every inner page (key "banner" in data/photos.js).
export default function PageBanner({title,crumb,children}){
  return <section className="relative isolate overflow-hidden border-b border-line bg-blush text-ink">
    <Photo k="banner" decorative eager/>
    <div className="absolute inset-0 bg-gradient-to-r from-paper/95 via-paper/80 to-paper/10" aria-hidden="true"/>
    <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20">
      <p className="text-sm text-brass"><Link to="/" className="underline">Home</Link> / {crumb||title}</p>
      <h1 className="text-3xl md:text-5xl mt-3">{title}</h1>
      {children&&<p className="mt-4 max-w-2xl text-lg text-ink/80">{children}</p>}</div></section>
}
