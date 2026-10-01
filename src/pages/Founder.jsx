import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { useAppointment } from '../components/AppointmentForm'
import { award } from '../data/founder'
// Text copied from the live "Our Founder" page. Portrait: public/images/founder.webp
export default function Founder(){
  const {open}=useAppointment()
  return <><PageBanner title="Our Founder" crumb="About Us / Our Founder"/>
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <section aria-labelledby="award-h" className="card overflow-hidden border-coral border-2 shadow-[0_0_30px_rgba(240,128,128,.35)]">
        <div className="bg-aurora text-white px-6 md:px-10 py-6 md:py-8 flex flex-wrap items-center gap-5">
          <img src="/images/founder-profile.webp" alt="Advocate Nageshwar Rao Pujari" width="160" height="160" className="h-24 w-24 md:h-28 md:w-28 shrink-0 rounded-full bg-black border-4 border-white/90 shadow-lg"/>
          <div className="flex-1 min-w-[16rem]"><p className="text-sm uppercase tracking-widest text-white/90">Award &middot; {award.by} &middot; {award.when}</p>
            <h2 id="award-h" className="text-3xl md:text-4xl mt-1 leading-tight">{award.title}</h2>
            <p className="mt-2 text-white/90 just">Advocate Nageshwar Rao Pujari has been officially recognised as the world&rsquo;s first Psylawgist, and as a leading matrimonial lawyer, for his work in resolving family disputes.</p></div></div>
        <div className="p-6 md:p-10 space-y-6">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">{award.stats.map(s=><li key={s.label} className="rounded-lg bg-blush p-4">
            <p className="font-display text-3xl text-brass">{s.n}</p><p className="mt-1 text-sm">{s.label}</p></li>)}</ul>
          <div className="space-y-3 leading-relaxed just">
            <p>The recognition comes as a Certificate of Appreciation from the London Book of World Records. It credits Mr. Pujari with creating Psylawgist, a discipline that pairs legal knowledge with psychological insight to handle marriage and family disputes with more sensitivity and speed.</p>
            <p>In a 14-year career he has filed and resolved 5,160 divorce cases in courts across Telangana, Andhra Pradesh and the rest of India. He has built one of the largest matrimonial practices in the Telugu states, trained more than 1,000 junior advocates, and today the firm has 100 junior advocates on its own team and works with a network of over 150 associate lawyers in both states.</p>
            <p>The firm has also opened offices in the USA, the UK and Dubai to help NRI families with cross-border matrimonial disputes.</p></div>
          <dl className="grid md:grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-l-4 border-coral pl-5">
            <dt className="text-brass">Certificate No.</dt><dd>{award.certNo}</dd>
            <dt className="text-brass">Issued by</dt><dd><ul>{award.issuers.map(i=><li key={i}>{i}</li>)}</ul></dd></dl>
          <div><h3 className="text-lg">In the news</h3>
            <ul className="mt-2 flex flex-wrap gap-3">{award.press.map(p=><li key={p.href}><a className="btn-ghost !py-2 !px-4 text-sm" href={p.href} target="_blank" rel="noreferrer">{p.name}</a></li>)}</ul></div></div></section>
      <section className="card p-6 md:p-10 grid md:grid-cols-[2fr_3fr] gap-6 md:gap-10 items-start">
        <div className="border-l-4 border-coral pl-5"><p className="text-sm uppercase tracking-widest text-brass">Psylawgist</p>
          <h2 className="h2 mt-2">“Good Lawyers Should Be Good Psychologists”</h2></div>
        <div className="space-y-3 leading-relaxed just">
          <p>Although law and psychology are two separate disciplines, they are united by their interest in human behavior. Psychology seeks to understand and explain human behavior while law seeks to regulate human behavior.</p>
          <p>As a practicing advocate for more than a decade in all courts of law, Mr.Pujari intuited that an effective advocate must have a good understanding of how people think and make decisions. He started focusing on psychological insights in interviewing and providing initial counseling to clients in civil, criminal, and matrimonial cases.</p>
          <p>Over the time, he figured out that the best way is to combine his interest in human behavior and the law and evolved as Psylawgist, a unique and first of its kind role in the world.</p></div></section>
      <section className="card grid md:grid-cols-[18rem_1fr] overflow-hidden">
        <div className="relative min-h-72"><img src="/images/founder.webp" alt="Advocate Nageshwar Rao Pujari holding a High Range World Records certificate and medal at Disha Law Firm" width="360" height="364" className="absolute inset-0 w-full h-full object-cover" style={{objectPosition:'50% 20%'}}/></div>
        <div className="p-6 md:p-8"><h2 className="h2">Nageshwar Rao Pujari</h2><p className="text-brass mt-1 text-lg">Advocate &amp; Psylawgist</p>
          <div className="mt-4 space-y-3 leading-relaxed just">
            <p>Mr. Pujari is well known for multi-disciplinary knowledge and approach in handling any legal matters. His cases are drafted with masterly finesse. Mr. Pujari standout as an acclaimed figure among the High Court Advocates fraternity. He is known for uncompromising nature, quality work, strict adherence to professional ethics and a vast knowledge bank.</p>
            <p>Mr. Pujari brings perfection to his lawsuits and conducts profession with utmost seriousness and dedication. It is for this reason that Mr. Pujari is well known among the Best High Court Advocates in State of Telangana.</p>
            <p>Widely respected among the legal fraternity, Mr. Pujari is frequently invited as a guest to various television and radio talks and is looked upon for opinion on legal matters of grave social concerns. His comprehensive knowledge stems from a fruitful association with distinguished lawyers across the State.</p>
            <p>He shares legal awareness with the public through his videos and social media.</p></div></div></section>
      <section className="card p-6 flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl">Book Your Appointment</h2>
        <div className="flex flex-wrap gap-3"><Link to="/contact" className="btn-ghost">Contact Us</Link><button type="button" onClick={open} className="btn">Request Consultation</button></div></section></div></>
}
