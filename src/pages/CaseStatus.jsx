import { useState } from 'react'
import PageBanner from '../components/PageBanner'
import { SITE } from '../data/site'

const CNR_RE=/^[A-Z]{4}\d{12}$/
const d=v=>{ if(!v) return '\u2014'; const [y,m,day]=String(v).slice(0,10).split('-'); return y&&m&&day?`${day}-${m}-${y}`:v }
const list=a=>a&&a.length?a.join(', '):'\u2014'

function Field({label,children}){
  return <div><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-0.5">{children||'\u2014'}</dd></div>
}

export default function CaseStatus(){
  const [cnr,setCnr]=useState('')
  const [state,setState]=useState('idle')   // idle | loading | done | error
  const [data,setData]=useState(null)
  const [err,setErr]=useState('')
  const value=cnr.replace(/[\s-]/g,'').toUpperCase()
  const valid=CNR_RE.test(value)

  async function submit(e){
    e.preventDefault()
    if(!valid){ setState('error'); setErr('A CNR has 16 characters: 4 letters followed by 12 digits, for example DLHC010012342023.'); return }
    setState('loading'); setErr('')
    try{
      const r=await fetch('/api/case-status?cnr='+value)
      const j=await r.json().catch(()=>null)
      if(!r.ok||!j) throw new Error(j?.message||'Case status is not available right now. Please call us or use the official portals below.')
      setData(j); setState('done')
    }catch(x){ setErr(x.message||'Something went wrong. Please try again.'); setState('error') }
  }

  return <><PageBanner title="Case status">Enter the CNR number of your case to see its current status.</PageBanner>
    <div className="max-w-6xl mx-auto px-4 pb-16"><div className="max-w-4xl space-y-6">
      <form onSubmit={submit} className="card p-6 md:p-8" noValidate>
        <label htmlFor="cnr" className="">CNR number</label>
        <p id="cnr-help" className="text-sm text-slate-600 mt-1">16 characters, for example DLHC010012342023. You can find it on your case papers or on the eCourts portal.</p>
        <div className="mt-3 flex flex-col sm:flex-row gap-3">
          <input id="cnr" value={cnr} onChange={e=>setCnr(e.target.value.toUpperCase())} maxLength={20} autoComplete="off" autoCapitalize="characters" spellCheck="false"
            aria-describedby={'cnr-help'+(state==='error'?' cnr-err':'')} aria-invalid={state==='error'}
            className="flex-1 border border-line rounded-md px-3 py-2.5 tracking-wide text-ink bg-white" placeholder="DLHC010012342023"/>
          <button className="btn" disabled={state==='loading'}>{state==='loading'?'Checking\u2026':'Check status'}</button></div>
        {state==='error'&&<p id="cnr-err" role="alert" className="mt-3 text-sm text-brass">{err}</p>}</form>

      {state==='done'&&data&&<section className="card p-6 md:p-8" aria-live="polite">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="text-xs text-slate-500">CNR</p><p className=" text-lg">{data.cnr}</p><p className="text-sm mt-1">{data.court}</p></div>
          <span className="chip text-sm">{data.statusLabel||'Status unavailable'}</span></div>
        <dl className="mt-6 grid sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
          <Field label="Case type">{data.caseType}</Field>
          <Field label="Filing number and date">{data.filingNumber&&`${data.filingNumber}, ${d(data.filingDate)}`}</Field>
          <Field label="Registration number and date">{data.registrationNumber&&`${data.registrationNumber}, ${d(data.registrationDate)}`}</Field>
          <Field label="First hearing">{d(data.firstHearingDate)}</Field>
          {data.status==='PENDING'
            ?<><Field label="Next hearing">{d(data.nextHearingDate)}</Field><Field label="Stage">{data.stage}</Field></>
            :<><Field label="Decided on">{d(data.decisionDate)}</Field><Field label="Nature of disposal">{data.disposal}</Field></>}
          <Field label="Judge">{list(data.judges)}</Field></dl>
        <div className="mt-6 grid sm:grid-cols-2 gap-6 text-sm">
          <div><h3 className="font-medium text-base">Petitioner</h3><p className="mt-1">{list(data.petitioners)}</p>
            {data.petitionerAdvocates.length>0&&<p className="mt-1 text-slate-600">Advocate: {list(data.petitionerAdvocates)}</p>}</div>
          <div><h3 className="font-medium text-base">Respondent</h3><p className="mt-1">{list(data.respondents)}</p>
            {data.respondentAdvocates.length>0&&<p className="mt-1 text-slate-600">Advocate: {list(data.respondentAdvocates)}</p>}</div></div>
        {data.hearings.length>0&&<div className="mt-8"><h3 className="font-medium text-base">Recent hearings{data.hearingCount>data.hearings.length&&` (latest ${data.hearings.length} of ${data.hearingCount})`}</h3>
          <div className="mt-2 overflow-x-auto"><table className="w-full text-sm text-left">
            <thead><tr className="border-b border-line text-slate-500"><th className="py-2 pr-4">Hearing date</th><th className="pr-4">Judge</th><th className="pr-4">Next date</th><th className="">Purpose</th></tr></thead>
            <tbody>{data.hearings.map((h,i)=><tr key={i} className="border-b border-line/70"><td className="py-2 pr-4 whitespace-nowrap">{d(h.date)}</td><td className="pr-4">{h.judge||'\u2014'}</td><td className="pr-4 whitespace-nowrap">{d(h.nextDate)}</td><td>{h.purpose||'\u2014'}</td></tr>)}</tbody></table></div></div>}
        <p className="mt-6 text-xs text-slate-500">Information comes from eCourts records and may lag the court by a day or more{data.updatedAt&&`; last refreshed ${d(data.updatedAt)}`}. It is not legal advice. Please confirm important dates with your advocate or on the official portal.</p></section>}

      <div className="card p-6 text-sm">
        <h2 className="font-medium text-base">Prefer the official portals?</h2>
        <ul className="mt-2 space-y-1.5">
          <li><a className="underline" href="https://services.ecourts.gov.in/ecourtindia_v6/" target="_blank" rel="noreferrer">eCourts services</a>: district and magistrate courts, by CNR number</li>
          <li><a className="underline" href="http://tshcstatus.nic.in/" target="_blank" rel="noreferrer">High Court of Telangana case status</a>: by case number</li></ul>
        <p className="mt-3">Not sure which number to use? Call us on <a className="underline" href={'tel:'+SITE.tel}>{SITE.phone}</a>.</p></div>
    </div></div></>
}
