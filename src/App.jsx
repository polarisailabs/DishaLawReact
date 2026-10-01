import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Service from './pages/Service'
import CaseStatus from './pages/CaseStatus'
import Vlog from './pages/Vlog'
import Careers from './pages/Careers'
import About from './pages/About'
import Team from './pages/Team'
import Founder from './pages/Founder'
import Contact from './pages/Contact'
import { AppointmentProvider } from './components/AppointmentForm'
export default function App(){
  return <AppointmentProvider><Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="services/:slug" element={<Service/>}/>
    <Route path="media-presence" element={<Vlog/>}/>
    <Route path="case-status" element={<CaseStatus/>}/>
    <Route path="careers" element={<Careers/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="founder" element={<Founder/>}/>
    <Route path="team" element={<Team/>}/>
    <Route path="contact" element={<Contact/>}/>
    {/* old links keep working */}
    <Route path="judgements" element={<Navigate to="/#judgements" replace/>}/>
    <Route path="updates" element={<Navigate to="/#judgements" replace/>}/>
    <Route path="vlog" element={<Navigate to="/media-presence" replace/>}/>
    <Route path="*" element={<Home/>}/>
  </Route></Routes></AppointmentProvider>
}
