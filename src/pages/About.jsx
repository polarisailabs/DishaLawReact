import PageBanner from '../components/PageBanner'
import { useAppointment } from '../components/AppointmentForm'
import { Photo } from '../components/Art'
// Text copied from the live "Our Firm" page.
const courts=['High Court of Delhi, Mumbai, Ahmedabad & Bangalore.','NCLT at Hyderabad & NCLAT at New Delhi','District & Session Courts, at Hyderabad, Secunderabad & across Telangana','DRT at Hyderabad & DRAT at Kolkata','Central Administrative Tribunal, Delhi','Consumer Forums & Commissions [SCDRC / NCDRC]','Central & State Information Commission','Arbitrators across the country','and other Authorities of Justice']
const why=['Professionalism & transparency in dealings','Exemplary service motive','Integrity and die-hard attitude in supporting our clients','Disciplined hard-work with 24×7 availability','Unbiased, unprejudiced & dedicated support','Honest advisory, loyal and dedicated representation','Reputed & intellectually competent law practitioners','Strong emphasis on research, drafting & oratory skills','A thoroughly devised action plan for each lawsuit','Proven track record and commanding reputation','Over 20 years of trust & excellence']
// Card with a photo beside the text (photo on the right when `flip`).
const Block=({img,flip,children})=><section className={'card overflow-hidden md:grid '+(flip?'md:grid-cols-[1fr_20rem]':'md:grid-cols-[20rem_1fr]')}>
  <div className={'relative min-h-52 '+(flip?'md:order-2':'')}><Photo k={img}/></div>
  <div className="p-6 md:p-8">{children}</div></section>
export default function About(){
  const {open}=useAppointment()
  return <><PageBanner title="Our Firm" crumb="About Us / Our Firm"/><div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <Block img="about1"><h2 className="h2">WHO WE ARE</h2>
      <p className="mt-4 leading-relaxed just">Disha Law Firm Is The Leading Law Firm in Hyderabad founded in the year 2003 by a group of Lawyers with an expertise in dealing with legal matters of various kinds. Our core competence is at providing suitable and commercially viable legal solutions to our clients – both individuals and companies. The firm is strategically located in the heart of the Hyderabad in Panjagutta to enable easy accessibility to our clients. The Firm is renowned for its client-centric approach and die-hard approach in the process of litigating matters for our clients. Our service standards, distinct ability to build legal strategies and our availability to our clients 24 X 7 cuts us above the rest of the Law firms in the market.</p></Block>
    <Block img="about2" flip><h2 className="h2">WHAT WE DO</h2>
      <p className="mt-4 leading-relaxed just">Our practice areas include (but not limited to) Civil Litigations, Criminal Defense, Law related to economic offences-ED/CBI, Family &amp; Divorce Disputes , Adoption &amp; Custody, Banking &amp; Finance, Corporate Matters, Property &amp; Realestate Dispute Resolution, Employment &amp; Labour Law, Intellectual Property Rights, Personal Injury, Technology &amp; Cyber Law, Central and State Government Service Matters etc.</p>
      <p className="mt-3 leading-relaxed just">Our firm operates through an integrated network throughout state of Telangana, representing our clients in any area of law and before any court of law. The courts includes –</p>
      <ul className="list-disc pl-5 mt-3 space-y-1 marker:text-coral just">{courts.map(c=><li key={c}>{c}</li>)}</ul>
      <p className="mt-3 leading-relaxed just">Our aim is to deliver comprehensive legal solutions to all legal requirements of our clients. We have a highly qualified and responsive team of lawyers comprising of young as well as senior legal professionals who have attained specific expertise in their specific area of laws. Our emphasis is on identifying the client’s needs down to the last detail, ensuring that our work is technically faultless and ultimately managing our cases to surpass our client’s expectations. In a very short span of time, we have been reckoned as one of the best law firm in Hyderabad. We take pride in our high success rates in the above matters litigated in various courts at District level and High Courts in Telangana state. We thrive in the patronage of our clients and major percentage of our business emanates from reference or repeat business opportunities by our existing clientele.</p></Block>
    <Block img="about3"><h2 className="h2">WHY CHOOSE US</h2>
      <ul className="list-disc pl-5 mt-4 space-y-1.5 marker:text-coral just">{why.map(c=><li key={c}>{c}</li>)}</ul>
      <button type="button" onClick={open} className="btn mt-6">Book Your Appointment</button></Block></div></>
}
