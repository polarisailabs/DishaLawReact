import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site'

const inp='w-full border border-line rounded-md px-3 py-2.5 bg-white mt-1'

// One form, used both in the pop-up and on the Contact page. Submits to Formspree (SITE.formspree).
export function AppointmentForm({source,role}){
  const [status,setStatus]=useState('idle')   // idle | sending | sent | error
  const [err,setErr]=useState('')
  async function submit(e){
    e.preventDefault()
    const form=e.currentTarget
    const data=new FormData(form)
    const who=String(data.get('name')||'').trim()||'website visitor'
    data.set('_subject',role?`Job application: ${role} - ${who}`:'Appointment request from '+who)
    if(role) data.set('role',role)
    data.set('page',source||window.location.pathname)
    setStatus('sending'); setErr('')
    try{
      const r=await fetch(SITE.formspree,{method:'POST',body:data,headers:{Accept:'application/json'}})
      if(!r.ok){
        const j=await r.json().catch(()=>null)
        const msg=j?.errors?.map(x=>x.message).filter(Boolean).join(', ')
        throw new Error(msg||'')
      }
      form.reset(); setStatus('sent')
    }catch(x){
      setErr(x.message&&x.message!=='Failed to fetch'?x.message:`We could not send your request. Please try again or call us on ${SITE.phone}.`)
      setStatus('error')
    }
  }
  if(status==='sent') return <div role="status" className="space-y-4">
    <p className="text-lg text-brass">{role?'Thank you for applying! Our recruitment team will get back to you within 15 working days.':'Thank you! We have received your request and will contact you shortly.'}</p>
    {!role&&<button type="button" className="btn-ghost" onClick={()=>setStatus('idle')}>Send another request</button>}</div>
  return <form onSubmit={submit} className="space-y-4">
    <label className="block">Name<input name="name" required autoComplete="name" className={inp}/></label>
    <label className="block">Phone<input name="phone" type="tel" required autoComplete="tel" className={inp}/></label>
    {role
      ?<><label className="block">Email<input name="email" type="email" required autoComplete="email" className={inp}/></label>
        <label className="block">Resume link <span className="text-sm text-slate-600">(Google Drive, Dropbox, etc.)</span><input name="resume_link" type="url" placeholder="https://" className={inp}/></label>
        <label className="block">Cover note <span className="text-sm text-slate-600">(optional)</span><textarea name="message" rows="4" className={inp}/></label></>
      :<><label className="block">Email <span className="text-sm text-slate-600">(optional)</span><input name="email" type="email" autoComplete="email" className={inp}/></label>
        <label className="block">Message<textarea name="message" required rows="4" className={inp}/></label></>}
    <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="_gotcha" type="text" tabIndex={-1} autoComplete="off"/></label></div>
    <button className="btn" disabled={status==='sending'}>{status==='sending'?'Sending\u2026':role?'Submit application':'Send'}</button>
    {status==='error'&&<p role="alert" className="text-brass">{err}</p>}</form>
}

// Pop-up that every "Book appointment" / "Request consultation" button opens.
const Ctx=createContext({open:()=>{},apply:()=>{}})
export const useAppointment=()=>useContext(Ctx)

export function AppointmentProvider({children}){
  const [isOpen,setIsOpen]=useState(false)
  const [n,setN]=useState(0)
  const [role,setRole]=useState(null)
  const ref=useRef(null)
  const opener=useRef(null)
  const show=r=>{opener.current=document.activeElement;setRole(r);setN(k=>k+1);setIsOpen(true)}
  const open=useCallback(()=>show(null),[])
  const apply=useCallback(r=>show(r),[])
  useEffect(()=>{
    const d=ref.current; if(!d) return
    if(isOpen&&!d.open) d.showModal()
    if(!isOpen&&d.open) d.close()
  },[isOpen])
  return <Ctx.Provider value={{open,apply}}>{children}
    <dialog ref={ref} aria-labelledby="appt-h"
      onClose={()=>{setIsOpen(false);opener.current?.focus?.()}}
      onClick={e=>{if(e.target===ref.current) setIsOpen(false)}}
      className="m-auto w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto rounded-xl border border-line bg-white text-ink p-0 shadow-2xl backdrop:bg-black/50">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4"><h2 id="appt-h" className="text-2xl">{role?`Apply: ${role}`:'Book Your Appointment'}</h2>
          <button type="button" onClick={()=>setIsOpen(false)} aria-label="Close" className="-mr-2 -mt-2 p-2 text-2xl leading-none hover:text-brass">&times;</button></div>
        <div className="mt-4">{isOpen&&<AppointmentForm key={n} role={role} source={'Pop-up on '+window.location.pathname}/>}</div></div>
    </dialog></Ctx.Provider>
}
