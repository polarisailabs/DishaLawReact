// Disha Law Firm mark: a light-coral roundel with a "D" whose stem is a court pillar, under a balance beam.
export function Mark({size=40,className=''}){
  return <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="23" fill="#F08080"/><circle cx="24" cy="24" r="20.5" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1"/>
    <path d="M13 11h22" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/><path d="M24 8v3" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M13 11v3M35 11v3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/><circle cx="13" cy="16" r="2.6" fill="#fff"/><circle cx="35" cy="16" r="2.6" fill="#fff"/>
    <path d="M16.5 21v19M16.5 21h6a9.5 9.5 0 010 19h-6" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
export default function Logo({light=false,large=false,hideTagMobile=false}){
  return <span className="inline-flex items-center gap-2.5 md:gap-3.5"><Mark size={large?56:40}/>
    <span className="leading-none"><span className={'block font-display '+(large?'text-[28px] md:text-[34px]':'text-[22px]')+' '+(light?'text-white':'text-ink')}>Disha Law Firm</span>
    <span className={(hideTagMobile?'hidden lg:block ':'block ')+'mt-1 tracking-wide '+(large?'text-xs md:text-sm':'text-[11px]')+' '+(light?'text-white/80':'text-brass')}>Think Human. Argue Law.</span></span></span>
}
