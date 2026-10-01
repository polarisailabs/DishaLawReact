import { useState } from 'react'
import { photoFor } from '../data/photos'
// Line glyphs and SVG panels. <Photo> (below) shows a stock photo and falls back to the SVG panel if the image fails to load.
const G={
 'criminal-defence-lawyers-hyderabad':['M14 30l12-12 6 6-12 12z','M24 14l6-6 10 10-6 6z','M6 42h24'],
 'matrimonial-disputes':['M10 24a9 9 0 1018 0 9 9 0 10-18 0','M20 24a9 9 0 1018 0 9 9 0 10-18 0'],
 'civil-litigation':['M24 8v32','M12 40h24','M8 14h32','M8 14l-5 12a5 5 0 0010 0z','M40 14l-5 12a5 5 0 0010 0z'],
 'property-realestate':['M6 24L24 8l18 16','M12 21v19h24V21','M20 40V29h8v11'],
 'banking-finance':['M6 18L24 8l18 10z','M10 22v14','M19 22v14','M29 22v14','M38 22v14','M6 41h36'],
 'corporate-matters':['M12 42V8h24v34','M8 42h32','M18 14h4','M26 14h4','M18 22h4','M26 22h4','M18 30h4','M26 30h4'],
 'insolvency-bankrupts':['M8 8v32h32','M13 16l9 9 6-6 10 11','M38 32v-6h-6'],
 'intellectual-property':['M24 6a18 18 0 100 36 18 18 0 000-36z','M31 18a8 8 0 100 12'],
 'it-cyberlaw':['M10 32V12h28v20','M4 39h40','M24 16l8 3v5c0 5-4 8-8 10-4-2-8-5-8-10v-5z'],
 'consumer-disputes':['M10 16h28l-2 26H12z','M18 20v-6a6 6 0 0112 0v6'],
 'central-state-service-matters':['M12 8h24v34H12z','M24 22a4 4 0 100-8 4 4 0 000 8z','M17 36c1-6 13-6 14 0'],
 'arbitration-conciliation':['M8 18h28','M30 12l6 6-6 6','M40 32H12','M18 26l-6 6 6 6'],
 'crime-against-women-children':['M24 6l14 5v11c0 9-6 15-14 19-8-4-14-10-14-19V11z','M24 31s-7-4-7-9a4 4 0 017-2 4 4 0 017 2c0 5-7 9-7 9z'],
 'media-entertainment-law':['M8 14h32v26H8z','M8 22h32','M8 14l6 8','M18 14l6 8','M28 14l6 8'],
 ndps:['M10 28L28 10a8 8 0 0112 12L22 40a8 8 0 01-12-12z','M19 19l12 12'],
 '498a':['M24 6l14 5v11c0 9-6 15-14 19-8-4-14-10-14-19V11z','M18 22l5 5 8-9'],
 pita:['M12 6h24v36H12z','M18 16h12','M18 24h12','M18 32h7'],
 habeas:['M20 28l8-8','M17 24l-3 3a6 6 0 008 8l3-3','M31 24l3-3a6 6 0 00-8-8l-3 3'],
 service:['M6 16h36v24H6z','M17 16v-5h14v5','M6 27h36'],
 nala:['M4 40h40','M24 40V16','M24 24c-7 0-10-4-10-9 7 0 10 4 10 9','M24 30c7 0 10-4 10-9-7 0-10 4-10 9'],
 pocso:['M24 6l14 5v11c0 9-6 15-14 19-8-4-14-10-14-19V11z','M24 16v10','M24 31v1'],
 sarfaesi:['M6 18L24 8l18 10z','M10 22v14','M19 22v14','M29 22v14','M38 22v14','M6 41h36'],
 award:['M24 6a11 11 0 100 22 11 11 0 000-22z','M17 26l-3 16 10-5 10 5-3-16','M24 12l2 4 4 .6-3 3 .7 4.2-3.7-2-3.7 2 .7-4.2-3-3 4-.6z'],
 court:['M4 18L24 6l20 12z','M9 22v15','M17 22v15','M25 22v15','M33 22v15','M41 22v15','M4 41h40'],
 user:['M24 22a8 8 0 100-16 8 8 0 000 16z','M8 42c2-11 30-11 32 0'],
 scales:['M24 8v32','M12 40h24','M8 14h32','M8 14l-5 12a5 5 0 0010 0z','M40 14l-5 12a5 5 0 0010 0z'],
 briefcase:['M6 16h36v24H6z','M17 16v-5h14v5','M6 27h36'],
 phone:['M14 6h20v36H14z','M21 36h6'],
 doc:['M12 6h18l8 8v28H12z','M30 6v8h8','M18 24h14','M18 32h14'],
 mail:['M6 10h36v28H6z','M6 12l18 14L42 12'],
 pin:['M24 44S10 30 10 20a14 14 0 0128 0c0 10-14 24-14 24z','M24 25a5 5 0 100-10 5 5 0 000 10z'],
 clock:['M24 6a18 18 0 100 36 18 18 0 000-36z','M24 14v11l7 4']
}
export const Paths=({k})=>(G[k]||G.scales).map(d=><path key={d} d={d}/>)
export const Glyph=({k,className='',w=2.2})=><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><Paths k={k}/></svg>

export default function Art({k,label,className=''}){
  const id='g'+k.replace(/[^a-z0-9]/gi,'')
  const n=[...k].reduce((a,c)=>a+c.charCodeAt(0),0)
  const [a,b]=[['#F08080','#FAC9BF'],['#EC7479','#F8BDB3'],['#F4938B','#FDD8CC']][n%3]
  return <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={'w-full h-full '+className} role={label?'img':undefined} aria-label={label} aria-hidden={label?undefined:true}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient></defs>
    <rect width="400" height="250" fill={`url(#${id})`}/>
    <circle cx={60+n%80} cy="40" r="90" fill="#fff" opacity=".12"/><circle cx={340-n%60} cy="230" r="110" fill="#fff" opacity=".14"/>
    <g transform="translate(116 41) scale(3.6)" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><Paths k={k}/></g>
  </svg>
}

// Hero illustration: a courthouse facade. variant 1 adds a dome (the Supreme Court), variant 2 a plain pediment (the High Court).
export function CourtScene({variant=1,label}){
  const cols=[96,138,180,222,264]
  return <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="w-full h-full" role="img" aria-label={label}>
    <defs><linearGradient id={'sky'+variant} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={variant===1?'#F9C2B8':'#F5A89F'}/><stop offset="1" stopColor="#FFF1EC"/></linearGradient></defs>
    <rect width="400" height="250" fill={`url(#sky${variant})`}/>
    <circle cx={variant===1?320:80} cy="62" r="34" fill="#fff" opacity=".7"/>
    {variant===1&&<g fill="#fff"><path d="M160 92a40 40 0 0180 0z"/><rect x="196" y="40" width="8" height="14"/><rect x="150" y="92" width="100" height="8"/></g>}
    <g fill="#fff"><path d="M70 100L200 56l130 44z"/><rect x="82" y="104" width="236" height="10" fill="#FBD3CB"/>
      {cols.map(x=><rect key={x} x={x} y="118" width="22" height="86" rx="3"/>)}
      <rect x="62" y="204" width="276" height="10" fill="#FBD3CB"/><rect x="50" y="214" width="300" height="12" fill="#F7BDB2"/><rect x="38" y="226" width="324" height="14" fill="#F0A0A0"/></g>
    <path d="M200 74a8 8 0 100-.01" stroke="#E86F76" strokeWidth="3" fill="none"/>
  </svg>
}

// Same lookup as <Photo>, but the whole picture is shown at its own shape (never cropped). Give it a className for size/frame.
export function PhotoWhole({k,label='',eager=false,className=''}){
  const p=photoFor(k), [stage,setStage]=useState(0)
  if(!p||stage>1) return <div className={'relative aspect-[3/2] w-full overflow-hidden '+className}><Art k={k} label={label}/></div>
  return <img key={stage} src={stage?p.remote:p.src} alt={label||p.alt} loading={eager?'eager':'lazy'} decoding="async" onError={()=>setStage(n=>n+1)} className={className}/>
}

// Stock photo for key `k' (see data/photos.js): local file first, then the remote CDN, then the SVG panel.
// Parent must be `relative` with a height (aspect ratio, min-h or grid stretch).
export function Photo({k,label='',eager=false,decorative=false}){
  const p=photoFor(k), [stage,setStage]=useState(0)
  if(!p||stage>1) return <div className="absolute inset-0"><Art k={k} label={decorative?'':label}/></div>
  return <img key={stage} src={stage?p.remote:p.src} alt={decorative?'':(label||p.alt)} loading={eager?'eager':'lazy'} decoding="async" onError={()=>setStage(n=>n+1)}
    className="absolute inset-0 w-full h-full object-cover" style={{objectPosition:p.pos}}/>
}
