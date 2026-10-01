import PageBanner from '../components/PageBanner'
import { Glyph, Photo } from '../components/Art'
import { SITE } from '../data/site'
import { AppointmentForm, useAppointment } from '../components/AppointmentForm'
export default function Contact(){
  const {open}=useAppointment()
  return <><PageBanner title="Contact Us" crumb="About Us / Contact Us"/><div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
    <section><h2 className="h2">Contact Us / Book Your Appointment</h2>
      <div className="mt-6 card relative overflow-hidden aspect-[16/9]"><Photo k="contact1"/></div>
      <ul className="mt-6 space-y-4">
        <li className="card p-5 flex gap-4"><Glyph k="pin" className="h-8 w-8 text-brass shrink-0"/><a href={SITE.map} target="_blank" rel="noreferrer">Location: 406, 4th floor, Riviera Apartments, Dwarakapuri colony, Punjagutta, Hyderabad, Telangana 500082</a></li>
        <li className="card p-5 flex gap-4"><Glyph k="mail" className="h-8 w-8 text-brass shrink-0"/><a href={'mailto:'+SITE.email}>Email Us: {SITE.email}</a></li>
        <li className="card p-5 flex gap-4"><Glyph k="phone" className="h-8 w-8 text-brass shrink-0"/><a href={'tel:'+SITE.tel}>Call Us: {SITE.phone}</a></li>
        <li className="card p-5 flex gap-4"><Glyph k="clock" className="h-8 w-8 text-brass shrink-0"/><span>Open Hours: Mon-Sun: 24/7</span></li></ul>
      <div className="mt-6"><div className="card overflow-hidden"><iframe title="Disha Law Firm on Google Maps" src={SITE.mapEmbed} className="block w-full h-72 md:h-80 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div>
        <p className="mt-2 text-sm"><a className="text-brass underline" href={SITE.map} target="_blank" rel="noreferrer">Open in Google Maps</a></p></div>
      <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={open} className="btn">Request Consultation</button><a className="btn-wa" href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></section>
    <div className="space-y-6 self-start"><section className="card p-6 md:p-8"><h2 className="text-2xl">Book Your Appointment</h2>
      <div className="mt-4"><AppointmentForm source="Contact page"/></div></section>
      <div className="card relative overflow-hidden aspect-[16/9]"><Photo k="contact2"/></div></div></div></>
}
