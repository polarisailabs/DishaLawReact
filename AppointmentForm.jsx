import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../data/site'

const inp='w-full border border-line rounded-md px-3 py-2.5 bg-white mt-1'

// One form, used on the Book Appointment page, the Apply page and the Contact page. Submits to Formspree (SITE.formspree).
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
    {!role&&<div className="flex justify-end"><button type="button" className="btn-ghost" onClick={()=>setStatus('idle')}>Send another request</button></div>}</div>
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
    <div className="flex justify-end"><button className="btn" disabled={status==='sending'}>{status==='sending'?'Sending\u2026':role?'Submit application':'Send'}</button></div>
    {status==='error'&&<p role="alert" className="text-brass">{err}</p>}</form>
}

// Every "Book appointment" / "Request consultation" button opens its own page (no pop-up).
const Ctx=createContext({open:()=>{},apply:()=>{}})
export const useAppointment=()=>useContext(Ctx)

export function AppointmentProvider({children}){
  const navigate=useNavigate()
  const open=useCallback(()=>navigate('/book-appointment'),[navigate])
  const apply=useCallback(r=>navigate('/careers/apply?role='+encodeURIComponent(r)),[navigate])
  const value=useMemo(()=>({open,apply}),[open,apply])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
