import PageBanner from '../components/PageBanner'
import { Photo } from '../components/Art'
// Text copied from the live "Our Team" page.
export default function Team(){
  return <><PageBanner title="Our Team" crumb="About Us / Our Team"/><div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-[1fr_16rem] gap-8 items-start">
    <div className="space-y-6">
      <section><h2 className="h2">PEOPLE ARE OUR MOST VALUABLE ASSET</h2>
        <p className="mt-3 leading-relaxed just">We are a full service law firm in Hyderabad established with the sole aim of providing the best legal services to our clients. Our strength is our team of experienced and trained lawyers who treasure the value of diligence and knowledge as well as creativity and innovation in addressing our client’s needs.</p></section>
      <section><h3 className="text-xl">OUR PEOPLE</h3>
        <p className="mt-2 leading-relaxed just">We are a team of 100+ qualified professionals – a comprehensive unit of Advocates committed to serving the strategic needs of each client. With office at Hyderabad and services across the state, our team have their presence in all the courts, tribunals and any authorities of law in Telangana.</p></section>
      <section><h3 className="text-xl">UNDERSTANDING OUR CLIENT’S NEEDS</h3>
        <p className="mt-2 leading-relaxed just">Our team aims is to deliver comprehensive legal solutions to all our clients requirements. And to achieve this end we take special care in identifying our client’s requirements to their minute detail, ensuring that the advice provided is technically correct and business oriented so as to ultimately manage client assignments surpassing their expectations.</p>
        <p className="mt-3 leading-relaxed just">Disha Law Firm legal team have unrivalled expertise in advising on matters relaiting to Civil suits, Criminal proceeedings, Economic offences, Family &amp; Divorce Disputes , Adoption &amp; Custody, Banking &amp; Finance issues, Corporate Matters, Property &amp; Realestate Dispute Resolution, Employment &amp; Labour Law, Intellectual Property Rights, Personal Injury, Technology &amp; Cyber Law, Central and State Government Service Matters etc</p>
        <p className="mt-3 leading-relaxed just">The firm prides itself in the fact that most of its team members possess multiple industry qualifications in addition to legal expertise and experience. Besides, a dedicated team of domain/ technical experts from various fields including management, psychology, information technology, arbitrtators etc. is also on standby to help us with domain specific or technical issues relating to the work we undertake.</p></section>
      <section><h3 className="text-xl">PERSONALIZED SERVICE</h3>
        <p className="mt-2 leading-relaxed just">Our team are dedicated to prompt and integrated service to our clients, based on their requirements, whichever part of the state they may be located in. Time is of essence and we know how to respect it. ‘Quick and Quality turn around’ is the motto of every member of our firm.</p>
        <p className="mt-3 leading-relaxed just">The Firm tailors its services to meet its client’s specific needs, adapting its approach to the size and complexity of the matter at hand.</p></section></div>
    <div className="card relative overflow-hidden aspect-[4/5] md:sticky md:top-24"><Photo k="team"/></div></div></>
}
