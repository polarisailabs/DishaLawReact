import { Link, useParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { Photo } from '../components/Art'
import { services } from '../data/services'
import { useAppointment } from '../components/AppointmentForm'
export default function Service(){
  const {open}=useAppointment()
  const {slug}=useParams(); const s=services.find(x=>x.slug===slug)
  if(!s) return <PageBanner title="Service not found"/>
  return <><PageBanner title={s.title}/><div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_20rem] gap-8 items-start">
    <div className="card p-6 md:p-8">
      <h2 className="text-2xl">{s.title}</h2>
      <div className="mt-4 space-y-3 leading-relaxed just">{s.paras.map(p=><p key={p}>{p}</p>)}</div>
      <h3 className="text-xl mt-8">{s.lead}</h3>
      {s.sub&&<p className="mt-2 just">{s.sub}</p>}
      <ul className="list-disc pl-5 mt-3 space-y-1.5 marker:text-coral leading-relaxed just">{s.items.map(i=><li key={i}>{i}</li>)}</ul>
      <div className="mt-6 space-y-3 leading-relaxed just">{s.outro.map(p=><p key={p}>{p}</p>)}</div>
      <button type="button" onClick={open} className="btn mt-8">Book Your Appointment</button></div>
    <aside className="lg:sticky lg:top-24 space-y-4"><div className="card relative overflow-hidden aspect-[16/10]"><Photo k={s.slug} label={s.title}/></div>
      <div className="card p-5"><h2 className="text-lg">Other services</h2><ul className="mt-2 space-y-1.5 text-sm">{services.filter(x=>x.slug!==s.slug).map(x=><li key={x.slug}><Link className="text-brass hover:underline" to={'/services/'+x.slug}>{x.title}</Link></li>)}</ul></div></aside></div></>
}
