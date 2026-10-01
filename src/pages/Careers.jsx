import PageBanner from '../components/PageBanner'
import { Photo } from '../components/Art'
import { useAppointment } from '../components/AppointmentForm'
// Text copied from the live Careers page.
const roles=[
 {name:'Legal Interns',closed:true,text:'We welcome law students who are pursuing their 5/3 years Bachelor’s degree or Master’s degree to our Internship program which extends for a period of 3 months to provide a platform to demonstrate their potential. Scope of work for the Interns ranges from basic legal research, preparing case notes, drafting research memorandum, case briefs and to assist our advocates in case preparation and transactions.'},
 {name:'Trainee Advocates',text:'Looking for candidates who have passed LLB recently and have zeal to pursue law as a fulltime career. A strong awareness of the legal issues and demonstrated experience practicing in a relevant area or areas of law may be advantageous.'},
 {name:'Junior Advocates',text:'Looking for candidates with 3+ years of experience in handling proceedings in various courts of law. The ideal candidate will be a solutions-oriented person who enjoys working in a fast-paced, team atmosphere. He/She should be adept in demonstrating an active and dedicated commitment towards the firm.'},
 {name:'Senior Advocates',text:'Looking for highly experienced and technically proficient advocates with 15+ years of experience. He/She should be passionate in combining their expertise with legal specialism. The Senior Advocates will provide high quality, targeted and accessible legal advice across a range of practice areas and will work as a valued associate to deliver effective legal solutions to our clients.'},
 {name:'High Court Advocates',text:'Looking for both practicing and aspiring advocates for the High Court of Telangana. (A) Candidates who have passed LLB recently and are passionate to work on High Court matters are welcome to be a part of the leading law firm in Telangana. (B) Candidates with 3+ years of experience in providing high-quality service to clients in relation to the legal issues before the High Court. He/She should ensure that the clients’ legal and related needs are identified and actioned in an effective and consistent way and all timelines are met.'},
 {name:'Legal Drafting Associates',text:'Looking for advocates with 3+ years of experience who are well-equipped with legal drafting skills. The candidates should possess expertise in legal documentation with precision, clearly depict all essential facts with complete understanding of the legal issue and remedies sought from the case.'}
]
export default function Careers(){
  const {apply}=useAppointment()
  return <><PageBanner title="Careers">Join Us</PageBanner>
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <section className="card grid md:grid-cols-[1fr_20rem] overflow-hidden">
        <div className="p-6 md:p-8"><h2 className="h2">We’re in search of passionate advocates</h2>
          <p className="mt-3 leading-relaxed just">We are looking for the best and brightest to help us continue to grow throughout the Telangana region.</p>
          <p className="mt-3 leading-relaxed just">Before you decide to apply – make sure you fulfill the basic criteria of completing LLB(pursuing for Interns) with exceptional drafting &amp; oratory skills along with the highest quality and attention to the client’s needs.</p>
          <p className="mt-3 leading-relaxed just">If that sounds like something you would like to be a part of, then apply for the open positions that suits your profile.</p>
          <p className="mt-3 leading-relaxed just">Click “Apply for this role” on the position that suits your profile and fill in the application form, including a link to your resume. Our recruitment team will get back to you within 15 working days.</p>
          <p className="mt-4 font-display text-xl text-brass">NO CALL, QUERY OR WALK-IN.</p></div>
        <div className="relative min-h-56"><Photo k="briefcase"/></div></section>
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map(r=><article key={r.name} className="card p-6 flex flex-col border-t-4 border-t-coral">
          <h3 className="text-xl">{r.name}</h3>
          {r.closed&&<p className="mt-2 text-brass">***** Due to large number of applications we are not accepting legal interns *****</p>}
          <p className="mt-2 leading-relaxed just flex-1">{r.text}</p>
          {!r.closed&&<button type="button" className="btn mt-4 self-start" onClick={()=>apply(r.name)}>Apply for this role</button>}</article>)}</div></div></>
}
