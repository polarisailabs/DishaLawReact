// Stock photos for every page. Sources: Unsplash (unsplash.com/s/photos/law-firm) and Pexels (pexels.com/search/law firm).
// Both licences allow free commercial use without attribution; a credit line is still shown in the footer.
// Each photo is served from /images/<key>.<hash>.jpg (downloaded into public/images by `npm run images`, which also runs before dev/build).
// If the local file is missing, <Photo> tries the remote CDN URL, and if that fails too it shows the SVG panel from Art.jsx.
const U=(id,alt,pos='center',w=1200,h=750)=>({alt,pos,remote:`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=entropy&q=70&w=${w}&h=${h}`})
const P=(id,alt,pos='center',w=1200,h=750)=>({alt,pos,remote:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`})

// Whole-photo variants: no fit=crop and no height, so the image keeps its own shape.
const UN=(id,alt,w=1200)=>({alt,pos:'center',remote:`https://images.unsplash.com/photo-${id}?auto=format&q=75&w=${w}`})
const PN=(id,alt,w=1200)=>({alt,pos:'center',remote:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`})

const RAW={
  // hero slides (Home)
  // hero slides: requested without a crop size, so the whole photo is shown (see <PhotoWhole> in Art.jsx)
  hero1:UN('1589994965851-a8f479c573a9','Statue of Lady Justice holding scales and a sword'),
  hero2:PN('8112110','Lawyer working on a laptop beside a Lady Justice statue'),
  banner:P('8112115','Lady Justice statuette on a bright office desk','center 55%',1920,560),
  about1:P('5668799','Lawyers discussing strategy around a table in a law firm','center',1000,750),
  about2:P('5668798','Lawyer reviewing a new case on a laptop beside a gavel and scales of justice','center',1000,750),
  about3:P('7876155','A lawyer meeting clients to discuss legal matters','center 40%',1000,750),
  contact1:P('7876153','A lawyer consulting a couple in an elegant office','center 40%',1200,750),
  contact2:P('8111815','Justice figurine on a desk in a law office','center',1200,750),
  // services
  'criminal-defence-lawyers-hyderabad':U('1589216532372-1c2a367900d9','Wooden judge gavel on a dark background'),
  'matrimonial-disputes':P('7876146','A couple in discussion with their attorney in a law office','center 40%'),
  'civil-litigation':U('1618771623063-6c3faa854a61',"Judge's gavel resting on an open law book"),
  'property-realestate':P('7876088','Legal books and documents on a lawyer\'s desk'),
  'banking-finance':U('1687289133469-b2a07a13b78b','Golden scales of justice'),
  'corporate-matters':P('5673490','Colleagues discussing a contract in a law firm conference room'),
  'insolvency-bankrupts':P('7876093','Lawyer\'s workspace with a Lady Justice statue, documents and laptop'),
  'intellectual-property':P('8112110','Lawyer working on a laptop beside a Lady Justice statue'),
  'it-cyberlaw':P('7876144','Two lawyers in an office discussing legal matters beside a Lady Justice statue'),
  'consumer-disputes':P('8112154','A couple arriving for a consultation with a lawyer','center 40%'),
  'central-state-service-matters':P('5673483','Legal professionals around a table with scales of justice and case files'),
  'arbitration-conciliation':P('5673492','Colleagues shaking hands in a law office after reaching an agreement'),
  'crime-against-women-children':U('1589994965851-a8f479c573a9','Lady Justice statue with scales and sword'),
  'media-entertainment-law':P('20752572','Professionals meeting in a consulting office'),
  // judgement categories (Home > Judgements)
  ndps:U('1589307904488-7d60ff29c975','Wooden gavel in a dark room'),
  '498a':P('7876045','Lawyers reviewing and signing documents in a formal office'),
  pita:U('1593115057322-e94b77572f20','Wooden gavel on a white surface'),
  habeas:U('1668239596261-62f94059533e','Statue holding a staff'),
  service:P('5668792','Colleagues taking notes and using a laptop in a law office'),
  nala:U('1630265927428-a62b061a5270','Law office sign on the side of a building'),
  pocso:U('1589578527966-fdac0f44566c','Justice figurine holding a sword'),
  sarfaesi:U('1589829545856-d10d557cf95f','Statue of Lady Justice holding a sword'),
  // page sections
  scales:U('1721352794721-9a2f91f8dcbd','Statue of Lady Justice holding a sword and scales','center 25%',1000,900),
  phone:P('7876052','A lawyer meeting clients to discuss documents in a modern office','center 40%',900,900),
  briefcase:P('5673493','Colleagues in formal clothes shaking hands over a table of documents','center 40%',900,900),
  team:U('1630265927428-a62b061a5270','Law office sign on a building','center',1000,1250)
}
const hash=s=>[...s].reduce((h,c)=>(h*33+c.charCodeAt(0))>>>0,5381).toString(36)
// Local file name contains a hash of the source URL: swapping a photo here gives it a new file name, so an old download can never be shown.
export const PHOTOS=Object.fromEntries(Object.entries(RAW).map(([k,v])=>{const file=`${k}.${hash(v.remote)}.jpg`;return [k,{...v,file,src:`/images/${file}`}]}))
export const photoFor=k=>PHOTOS[k]
export const CREDITS=[['Unsplash','https://unsplash.com/s/photos/law-firm'],['Pexels','https://www.pexels.com/search/law%20firm/']]
