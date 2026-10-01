import PageBanner from '../components/PageBanner'
import { AppointmentForm } from '../components/AppointmentForm'
export default function BookAppointment(){
  return <><PageBanner title="Book Your Appointment" crumb="Book Appointment">Tell us a little about your matter and we will contact you shortly.</PageBanner>
    <div className="max-w-xl mx-auto px-4 py-10"><section className="card p-6 md:p-8">
      <AppointmentForm source="Book Appointment page"/></section></div></>
}
