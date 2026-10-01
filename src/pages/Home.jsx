import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { heroSlides, strengths, about, counters } from '../data/home'
import { homeServices } from '../data/services'
import { judgements } from '../data/judgements'
import { Photo, PhotoWhole, Glyph } from '../components/Art'
import Logo from '../components/Logo'
import { award } from '../data/founder'
import { useAppointment } from '../components/AppointmentForm'

// Both slides use the same picture frame: 448 x 188 (the shape of the slide-2 picture). Photos fill it without stretching (slide 1 is trimmed to fit).
const heroImg='block w-full max-w-md aspect-[448/188] object-cover mx-auto lg:mx-0 rounded-[10px] border-[3px] border-white/85 shadow-[0_8px_30px_rgba(0,0,0,.4)]'
function Hero(){
  const {open}=useAppointment()
  const [i,setI]=useState(0)
  const [paused,setPaused]=useState(false)
  useEffect(()=>{
    if(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t=setInterval(()=>setI(n=>(n+1)%heroSlides.length),6500)
    return()=>clearInterval(t)
  },[paused])
  // All slides share one grid cell, so the banner is as tall as the tallest photo and never jumps between slides.
  return <section aria-roledescription="carousel" aria-label="Highlights" className="relative isolate overflow-hidden bg-aurora"
      onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)}>
    <h1 className="sr-only">Disha Law Firm, advocates in Hyderabad</h1>
    <div className="grid">
    {heroSlides.map((s,n)=><div key={s.title} role="group" aria-roledescription="slide" aria-label={`${n+1} of ${heroSlides.length}`} aria-hidden={n!==i}
        className={'col-start-1 row-start-1 transition-opacity duration-500 '+(n===i?'opacity-100':'opacity-0 invisible')}>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-8 grid lg:grid-cols-[28rem_1fr] gap-6 lg:gap-10 items-center">
        {s.img
          ?<img src={s.img} alt={s.alt} width="896" height="376" loading="eager" decoding="async" className={heroImg}/>
          :<PhotoWhole k={'hero'+s.scene} label={s.alt} eager={n===0} className={heroImg}/>}
        <div className="max-w-2xl">
          <p className="font-display text-2xl md:text-4xl leading-tight">{s.title}</p>
          <p className="mt-2 text-base md:text-lg text-white/90 just">{s.sub}</p>
          {s.note&&<p className="mt-3 border-l-4 border-white pl-3 text-base md:text-lg font-medium just">{s.note}</p>}
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={open} className="btn !py-2 !px-4 text-sm">Request a consultation</button>
            {n===0&&<a href="/#judgements" className="btn-ghost !py-2 !px-4 text-sm !border-white !text-white hover:!bg-white/15">Our latest judgements</a>}</div></div></div></div>)}</div>
    <div className="absolute bottom-3 left-0 right-0"><div className="max-w-6xl mx-auto px-4 flex gap-2" role="group" aria-label="Choose slide">
      {heroSlides.map((s,n)=><button key={s.title} onClick={()=>setI(n)} aria-label={`Show slide ${n+1}: ${s.title}`} aria-current={n===i}
        className={'h-2.5 rounded-full transition-all '+(n===i?'w-8 bg-white':'w-2.5 bg-white/50 hover:bg-white')}/>)}</div></div>
  </section>
}

function Order({c}){
  return <li className="border-l-2 border-coral pl-3">
    {c.t&&<p>{c.t}</p>}<p className="text-sm text-slate-700">{c.ref}</p>
    <a href={c.href} target="_blank" rel="noreferrer" className="text-brass underline text-sm">Download Order Copy PDF</a></li>
}
function Entry({j}){
  return <article id={'j-'+j.id} className="card overflow-hidden grid md:grid-cols-[14rem_1fr]">
    <div className="relative min-h-40 md:min-h-full"><Photo k={j.art}/></div>
    <div className="p-5 md:p-6"><h3 className="text-xl">{j.title}</h3>{j.date&&<p className="text-sm text-slate-600 mt-1">{j.date}</p>}
      {j.blocks.map((b,n)=><div key={n} className="mt-4">
        {b.h&&<h4 className="text-lg">{b.h}</h4>}
        {b.p?.map(t=><p key={t} className="mt-2 leading-relaxed just">{t}</p>)}
        {b.bullets&&<ul className="list-disc pl-5 mt-2 space-y-1 marker:text-coral just">{b.bullets.map(t=><li key={t}>{t}</li>)}</ul>}
        {b.cases&&<ul className="mt-3 space-y-3">{b.cases.map(c=><Order key={c.ref+c.href} c={c}/>)}</ul>}</div>)}</div></article>
}

function Judgements(){
  return <section className="bg-blush border-t border-line"><div className="sec">
    <span id="judgements" className="block scroll-mt-24"/>
    <h2 className="h2">Our Latest Judgements</h2>
    <div className="mt-6 space-y-5">{judgements.map(j=><Entry key={j.id} j={j}/>)}</div></div></section>
}

export default function Home(){
  const {open}=useAppointment()
  return <>
    <Hero/>

    <section className="max-w-6xl mx-auto px-4 py-8" aria-label="At a glance">
      <ul className="grid md:grid-cols-3 gap-4">{strengths.map(s=><li key={s.title} className="card flex items-center gap-4 p-5">
        <span className="grid place-items-center h-14 w-14 shrink-0 rounded-full bg-coral text-white"><Glyph k={s.k} className="h-8 w-8"/></span>
        <div><h2 className="text-xl">{s.title}</h2>{s.lines.map(l=><p key={l}>{l}</p>)}</div></li>)}</ul></section>

    <section className="max-w-6xl mx-auto px-4 py-8"><div className="card grid md:grid-cols-2 overflow-hidden">
      <div className="p-6 md:p-10"><h2 className="m-0 font-normal"><Logo large/></h2>
        <p className="text-brass mt-2 text-lg">{about.tagline}</p>
        <div className="mt-4 space-y-3 leading-relaxed just">{about.text.map(t=><p key={t}>{t}</p>)}</div>
        <ul className="mt-5 grid grid-cols-2 gap-2">{about.points.map(p=><li key={p} className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-coral" aria-hidden="true"/>{p}</li>)}</ul>
        <Link to="/about" className="btn mt-6">Read more</Link></div>
      <div className="relative min-h-64"><Photo k="scales"/></div></div></section>

    <section className="max-w-6xl mx-auto px-4 py-8" aria-labelledby="founder-h"><div className="card grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 p-6 md:p-10 items-center">
      <img src="/images/founder-profile.webp" alt="Advocate Nageshwar Rao Pujari, Founder of Disha Law Firm" width="160" height="160" loading="lazy"
        className="h-36 w-36 md:h-40 md:w-40 rounded-full bg-black shadow-lg mx-auto md:mx-0"/>
      <div><p className="text-sm uppercase tracking-widest text-brass">Our Founder</p>
        <h2 id="founder-h" className="h2 mt-1">Nageshwar Rao Pujari</h2><p className="text-brass mt-1 text-lg">Advocate &amp; Psylawgist</p>
        <p className="mt-4 leading-relaxed just">Founder &amp; CEO of Disha Law Firm. Mr. Pujari believes a good lawyer must understand how people think, and built his practice around combining law with psychology, a role he calls <em>Psylawgist</em>. He has led the firm for 14 years across civil, criminal and matrimonial matters.</p>
        <p className="mt-4 inline-flex items-center gap-3 rounded-lg border border-coral bg-blush px-4 py-3">
          <Glyph k="award" className="h-9 w-9 shrink-0 text-brass"/>
          <span><strong className="font-medium">{award.by}</strong> recognised him as the <strong className="font-medium">{award.title}</strong></span></p>
        <div><Link to="/founder" className="btn mt-5">Read more</Link></div></div></div></section>

    <section className="max-w-6xl mx-auto px-4 py-8" aria-labelledby="services-h">
      <h2 id="services-h" className="h2">Practice Areas</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {homeServices.map(s=><article key={s.slug} className="card overflow-hidden flex flex-col">
          <div className="relative aspect-[16/10]"><Photo k={s.slug}/></div>
          <div className="p-5 flex-1 flex flex-col"><h3 className="text-xl">{s.card||s.title}</h3>
            <p className="mt-2 leading-relaxed just flex-1">{s.h}</p>
            <Link to={'/services/'+s.slug} className="btn mt-5 self-start" aria-label={`Read more about ${s.title}`}>Read more</Link></div></article>)}</div></section>

    <section className="bg-coral-soft/50 my-8" aria-labelledby="here-h"><div className="max-w-6xl mx-auto px-4 py-14 text-center">
      <h2 id="here-h" className="h2">WE ARE HERE FOR YOU</h2>
      <p className="mt-2">Meet us &amp; We can help you. Every Client Matters</p>
      <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">{counters.map(c=><div key={c.label}>
        <dd className="font-display text-4xl md:text-5xl text-brass">{c.n}+</dd><dt className="mt-2">{c.label}</dt></div>)}</dl></div></section>

    <section className="max-w-6xl mx-auto px-4 py-8"><div className="card grid md:grid-cols-[2fr_3fr] overflow-hidden items-stretch">
      <div className="relative min-h-56"><Photo k="phone"/></div>
      <div className="p-6 md:p-10 flex flex-col justify-center"><h2 className="h2">Book Your Appointment</h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" onClick={open} className="btn">Request Consultation</button>
          <a href={'tel:'+SITE.tel} className="text-xl text-brass">{SITE.phone}</a></div></div></div></section>

    <section className="max-w-6xl mx-auto px-4 pt-4 pb-14"><h2 className="h2">Contact Us</h2>
      <ul className="mt-6 grid md:grid-cols-2 gap-4">
        <li className="card p-5 flex gap-4"><Glyph k="pin" className="h-8 w-8 text-brass shrink-0"/><a href={SITE.map} target="_blank" rel="noreferrer">Location: 406, 4th floor, Riviera Apartments, Dwarakapuri colony, Punjagutta, Hyderabad, Telangana 500082</a></li>
        <li className="card p-5 flex gap-4"><Glyph k="mail" className="h-8 w-8 text-brass shrink-0"/><a href={'mailto:'+SITE.email}>Email Us: {SITE.email}</a></li>
        <li className="card p-5 flex gap-4"><Glyph k="phone" className="h-8 w-8 text-brass shrink-0"/><a href={'tel:'+SITE.tel}>Call Us: {SITE.phone}</a></li>
        <li className="card p-5 flex gap-4"><Glyph k="clock" className="h-8 w-8 text-brass shrink-0"/><span>Open Hours: Mon-Sun: 24/7</span></li></ul>
      <div className="mt-4"><div className="card overflow-hidden"><iframe title="Disha Law Firm on Google Maps" src={SITE.mapEmbed} className="block w-full h-72 md:h-80 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div>
        <p className="mt-2 text-sm"><a className="text-brass underline" href={SITE.map} target="_blank" rel="noreferrer">Open in Google Maps</a></p></div></section>

    <Judgements/>
  </>
}
