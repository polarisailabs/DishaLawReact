import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { SITE } from '../data/site'
import { services } from '../data/services'
import Logo from './Logo'

// Menu: Home, Services, Media Presence, Resources, Careers, About Us (Contact Us sits inside About Us).
const MENU=[
  {to:'/',label:'Home',end:true},
  {label:'Services',match:['/services'],items:services.map(s=>({to:'/services/'+s.slug,label:s.title}))},
  {to:'/media-presence',label:'Media Presence'},
  {label:'Resources',match:['/case-status'],items:[{to:'/#judgements',label:'Latest Judgements'},{to:'/case-status',label:'Case Status'}]},
  {to:'/careers',label:'Careers'},
  {label:'About Us',match:['/about','/founder','/team','/contact'],items:[{to:'/about',label:'Our Firm'},{to:'/founder',label:'Our Founder'},{to:'/team',label:'Our Team'},{to:'/contact',label:'Contact Us'}]}
]
// Footer social icons: white glyph on the app's own colour (24x24 glyphs)
const SOCIAL={
  Twitter:{bg:'#1DA1F2',g:<path transform="translate(5.2 5.4) scale(.58)" fill="#fff" d="M23.95 4.57a10 10 0 0 1-2.82.78 4.96 4.96 0 0 0 2.16-2.72c-.95.56-2 .96-3.13 1.18a4.92 4.92 0 0 0-8.38 4.48C7.69 8.1 4.07 6.13 1.64 3.16a4.82 4.82 0 0 0-.67 2.48c0 1.71.87 3.21 2.19 4.1a4.9 4.9 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.83 5 5 0 0 1-2.21.08 4.94 4.94 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a14 14 0 0 0 7.56 2.21c9.05 0 14-7.5 14-13.98 0-.21 0-.42-.02-.63A9.94 9.94 0 0 0 24 4.59z"/>},
  Facebook:{bg:'#1877F2',g:<path fill="#fff" d="M14 8h2.2V5H13.6C11 5 10 6.6 10 8.6V11H8v3h2v6h3v-6h2.3l.5-3H13V8.9c0-.6.3-.9 1-.9z"/>},
  Instagram:{bg:'url(#ig-grad)',g:<g fill="none" stroke="#fff" strokeWidth="1.8"><rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3.3"/><circle cx="16.3" cy="7.7" r=".5" fill="#fff"/></g>},
  LinkedIn:{bg:'#0A66C2',g:<g fill="#fff"><rect x="5" y="9.3" width="2.8" height="9.2"/><circle cx="6.4" cy="6.2" r="1.7"/><path d="M10.2 9.3H13v1.3c.5-.9 1.5-1.5 2.9-1.5 2.4 0 3.6 1.4 3.6 4v5.4h-2.8v-4.8c0-1.3-.5-2-1.6-2s-1.9.8-1.9 2.1v4.7h-3z"/></g>},
  WhatsApp:{bg:'#25D366',g:<g fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round"><path d="M4.5 19.5l1.2-3.8A7.6 7.6 0 1 1 8.4 18.4z"/><path d="M9.6 8.7c-.2 2.8 2.2 5.3 5 5.3l.9-1.2-1.7-.9-.9.7c-.9-.3-1.7-1.2-2-2l.7-.9-.9-1.7z" fill="#fff" stroke="none"/></g>}
}
const Chevron=({open})=><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={'ml-1.5 transition-transform '+(open?'rotate-180':'')}><path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const base='px-3 py-2 text-[15px] rounded-md hover:text-brass '

function Dropdown({item,pathname,mobile}){
  const [open,setOpen]=useState(false)
  const ref=useRef(null)
  const active=item.match.some(m=>pathname.startsWith(m))
  useEffect(()=>setOpen(false),[pathname])
  useEffect(()=>{
    if(!open||mobile) return
    const off=e=>{ if(ref.current&&!ref.current.contains(e.target)) setOpen(false) }
    const esc=e=>{ if(e.key==='Escape') setOpen(false) }
    document.addEventListener('mousedown',off); document.addEventListener('keydown',esc)
    return()=>{document.removeEventListener('mousedown',off);document.removeEventListener('keydown',esc)}
  },[open,mobile])
  const id='menu-'+item.label.toLowerCase().replace(/\W+/g,'-')
  return <div ref={ref} className={mobile?'':'relative'} onMouseEnter={mobile?undefined:()=>setOpen(true)} onMouseLeave={mobile?undefined:()=>setOpen(false)}>
    <button type="button" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(o=>mobile?!o:true)}
      className={base+'inline-flex items-center '+(mobile?'w-full justify-between text-left ':'')+(active?'text-brass':'')}>{item.label}<Chevron open={open}/></button>
    {open&&<ul id={id} className={mobile?'pl-3 pb-2':'absolute left-1/2 -translate-x-1/2 top-full pt-1 w-72 z-40'}>
      <div className={mobile?'':'bg-white border border-line rounded-lg shadow-lg py-2 max-h-[70vh] overflow-y-auto'}>
        {item.items.map(i=><li key={i.to}><Link to={i.to} className="block px-4 py-2 text-[15px] hover:bg-blush">{i.label}</Link></li>)}</div></ul>}
  </div>
}

export default function Layout(){
  const [open,setOpen]=useState(false)
  const {pathname,hash}=useLocation()
  useEffect(()=>{
    setOpen(false)
    const el=hash&&document.getElementById(hash.slice(1))
    if(el) el.scrollIntoView(); else window.scrollTo(0,0)
  },[pathname,hash])
  const items=mobile=>MENU.map(m=>m.items
    ?<Dropdown key={m.label} item={m} pathname={pathname} mobile={mobile}/>
    :<NavLink key={m.to} to={m.to} end={m.end} className={({isActive})=>base+(isActive?'text-brass':'')}>{m.label}</NavLink>)
  return <div className="min-h-screen flex flex-col">
    <header className="border-b border-line bg-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
        <Link to="/" aria-label="Disha Law Firm, home"><Logo hideTagMobile/></Link>
        <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5">{items(false)}</nav>
        <button className="lg:hidden p-2 -mr-2" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open?<path d="M5 5l14 14M19 5L5 19"/>:<path d="M4 7h16M4 12h16M4 17h16"/>}</svg></button></div>
      {open&&<nav aria-label="Main" className="lg:hidden border-t border-line bg-white max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="flex flex-col p-4 items-stretch">{items(true)}</div></nav>}
    </header>
    <main className="flex-1"><Outlet/></main>
    <footer className="bg-footer text-ink/90"><div className="max-w-6xl mx-auto px-4 py-5 grid md:grid-cols-[1.3fr_1.4fr_1fr] gap-x-8 gap-y-4 text-[13px] leading-snug">
      <div><Logo/><p className="mt-2 just">{SITE.about}</p>
        <svg width="0" height="0" className="absolute" aria-hidden="true"><defs><linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#FEDA75"/><stop offset=".35" stopColor="#FA7E1E"/><stop offset=".6" stopColor="#D62976"/><stop offset=".85" stopColor="#962FBF"/><stop offset="1" stopColor="#4F5BD5"/></linearGradient></defs></svg>
        <ul className="mt-3 flex flex-wrap gap-2.5" aria-label="Follow Disha Law Firm">{Object.entries(SITE.social).map(([n,u])=><li key={n}>
          <a href={u} target="_blank" rel="noreferrer" aria-label={n} title={n} className="block h-9 w-9 hover:-translate-y-0.5 transition-transform">
            <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true"><circle cx="12" cy="12" r="12" fill={SOCIAL[n].bg}/>{SOCIAL[n].g}</svg></a></li>)}</ul></div>
      <div><p className="text-base text-ink mb-1.5 font-display">Useful Links</p><ul className="grid sm:grid-cols-2 gap-x-6 gap-y-0.5">{services.map(s=><li key={s.slug}><Link to={'/services/'+s.slug} className="hover:text-brass">Best {s.title} Lawyers In Hyderabad</Link></li>)}</ul></div>
      <div><p className="text-base text-ink mb-1.5 font-display">Contact Us</p>{SITE.address.map(a=><p key={a}>{a}</p>)}
        <p className="mt-1.5">Phone: <a href={'tel:'+SITE.tel}>{SITE.phone}</a><br/>Email: <a href={'mailto:'+SITE.email}>{SITE.email}</a></p></div></div>
      <p className="border-t border-ink/20 text-center py-2 text-xs">2026 © Disha Law Firm. All Rights Reserved</p></footer></div>
}
