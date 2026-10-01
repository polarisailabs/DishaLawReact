import { Link, useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { AppointmentForm } from '../components/AppointmentForm'
export default function Apply(){
  const [q]=useSearchParams()
  const role=q.get('role')||'Open position'
  return <><PageBanner title={'Apply: '+role} crumb="Careers / Apply"/>
    <div className="max-w-xl mx-auto px-4 py-10"><section className="card p-6 md:p-8">
      <AppointmentForm role={role} source={'Apply page: '+role}/></section>
      <p className="mt-4 text-sm"><Link to="/careers" className="text-brass underline">&larr; Back to Careers</Link></p></div></>
}
