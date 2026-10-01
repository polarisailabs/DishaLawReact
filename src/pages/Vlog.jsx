import { useEffect, useState } from 'react'
import PageBanner from '../components/PageBanner'
import { mediaSections } from '../data/media'
const PAGE=12

// A card hides itself if YouTube says the video is gone: oEmbed 404 (deleted), 401/403 (private or embedding off),
// or the thumbnail is missing / is YouTube's 120px placeholder. Network errors keep the card visible.
function VideoCard({id}){
  const [play,setPlay]=useState(false)
  const [title,setTitle]=useState('')
  const [gone,setGone]=useState(false)
  useEffect(()=>{
    let off=false
    fetch('https://www.youtube.com/oembed?format=json&url='+encodeURIComponent('https://youtu.be/'+id))
      .then(r=>{ if([401,403,404].includes(r.status)){ if(!off) setGone(true); return null } return r.ok?r.json():null })
      .then(j=>{if(!off&&j?.title)setTitle(j.title)}).catch(()=>{})
    return()=>{off=true}
  },[id])
  if(gone) return null
  const label=title||'Disha Law Firm video'
  return <li className="card overflow-hidden flex flex-col">
    <div className="relative aspect-video bg-ink">
      {play
        ?<iframe className="absolute inset-0 w-full h-full" src={'https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0'} title={label}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen/>
        :<button className="absolute inset-0" onClick={()=>setPlay(true)} aria-label={'Play: '+label}>
            <img src={'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'} alt="" loading="lazy" onError={()=>setGone(true)}
              onLoad={e=>{ if(e.currentTarget.naturalWidth<=120) setGone(true) }} className="w-full h-full object-cover"/>
            <span className="absolute inset-0 grid place-items-center"><span className="grid place-items-center w-14 h-14 rounded-full bg-coral text-ink shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span></span></button>}
    </div>
    <div className="p-3 text-sm flex-1 flex flex-col justify-between gap-2">
      <p className="line-clamp-2">{label}</p>
      <a className="underline" href={'https://youtu.be/'+id} target="_blank" rel="noreferrer">Watch on YouTube</a></div></li>
}

// YouTube's play-button icon (red rounded rectangle, white triangle). For the exact artwork see youtube.com/howyoutubeworks/resources/brand-resources
const YTLogo=({h=30})=><svg height={h} viewBox="0 0 28 20" role="img" aria-label="YouTube" className="shrink-0"><rect width="28" height="20" rx="5.5" fill="#FF0000"/><path d="M11.2 5.7L18.4 10l-7.2 4.3z" fill="#fff"/></svg>

// Channel name/link are read from YouTube's oEmbed data for our own videos, so no channel URL is hard-coded.
function ChannelCard({ids}){
  const [ch,setCh]=useState(null)
  useEffect(()=>{
    let off=false
    ;(async()=>{
      for(const id of ids.slice(0,4)){
        try{
          const r=await fetch('https://www.youtube.com/oembed?format=json&url='+encodeURIComponent('https://youtu.be/'+id))
          if(r.ok){ const j=await r.json(); if(!off&&j.author_url) setCh({name:j.author_name,url:j.author_url}); return }
        }catch{}
      }
    })()
    return()=>{off=true}
  },[ids])
  return <div className="card p-5 md:p-6 mt-6 flex flex-wrap items-center justify-between gap-5 border-t-4 border-t-[#FF0000]">
    <div className="flex items-center gap-4">
      <span className="grid place-items-center h-14 w-14 rounded-full bg-blush"><YTLogo h={26}/></span>
      <div><p className="text-xl font-medium">{ch?.name||'Disha Law Firm'} on YouTube</p>
        <p className="text-sm text-slate-700">Legal awareness videos by our Founder, Advocate Nageshwar Rao Pujari · {ids.length}+ videos</p></div></div>
    {ch&&<div className="flex flex-wrap gap-3">
      <a className="btn !py-2 !px-4" href={ch.url+'?sub_confirmation=1'} target="_blank" rel="noreferrer">Subscribe</a>
      <a className="btn-ghost !py-2 !px-4" href={ch.url} target="_blank" rel="noreferrer">Visit channel</a></div>}
  </div>
}

const IGLogo=({h=30})=><svg height={h} viewBox="0 0 28 28" role="img" aria-label="Instagram" className="shrink-0">
  <defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#FD5949"/><stop offset=".5" stopColor="#D6249F"/><stop offset="1" stopColor="#285AEB"/></linearGradient></defs>
  <rect width="28" height="28" rx="8" fill="url(#ig)"/><rect x="6.5" y="6.5" width="15" height="15" rx="4.5" fill="none" stroke="#fff" strokeWidth="2"/>
  <circle cx="14" cy="14" r="3.6" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="19" cy="9" r="1.2" fill="#fff"/></svg>

function LinksSection({s}){
  return <section aria-labelledby={s.id+'-h'} className="mt-10 first:mt-0">
    <h2 id={s.id+'-h'} className="h2">{s.title}</h2>
    <ul className="mt-6 grid sm:grid-cols-2 gap-4">{s.links.map(l=><li key={l.key} className="card p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4"><span className="grid place-items-center h-14 w-14 rounded-full bg-blush">{l.key==='instagram'?<IGLogo h={26}/>:<YTLogo h={26}/>}</span>
        <div><p className="text-xl font-medium">{l.name} <span className="text-base text-brass font-normal">{l.handle}</span></p><p className="text-sm text-slate-700">{l.text}</p></div></div>
      <a className="btn !py-2 !px-4" href={l.href} target="_blank" rel="noreferrer" aria-label={`Open ${l.name}: ${l.handle}`}>{l.key==='instagram'?'Follow':'Visit channel'}</a></li>)}</ul>
  </section>
}

function VideoSection({s}){
  const [n,setN]=useState(PAGE)
  return <section aria-labelledby={s.id+'-h'} className="mt-10 first:mt-0">
    <h2 id={s.id+'-h'} className="h2 flex items-center gap-3"><YTLogo/>{s.title}</h2>
    <ChannelCard ids={s.videos}/>
    <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{s.videos.slice(0,n).map(id=><VideoCard key={id} id={id}/>)}</ul>
    {n<s.videos.length&&<div className="mt-8 text-center"><button className="btn" onClick={()=>setN(n+PAGE)}>Show more videos ({s.videos.length-n} left)</button></div>}
  </section>
}

export default function Vlog(){
  return <><PageBanner title="Media Presence">Latest videos of our Founder, Nageshwar Pujari</PageBanner>
    <div className="max-w-6xl mx-auto px-4 py-12">
      {mediaSections.map(s=>s.kind==='videos'?<VideoSection key={s.id} s={s}/>:s.kind==='links'?<LinksSection key={s.id} s={s}/>:null)}
    </div></>
}
