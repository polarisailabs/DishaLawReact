// Sections of the Media Presence page, shown in this order. Add Instagram etc. here later, e.g.
//   {id:'instagram',title:'Instagram Presence',kind:'links',links:[{href:'https://instagram.com/…',label:'…'}]}
import { youtube } from './videos'
import { founderSocial } from './founder'
export const mediaSections=[
  {id:'founder',title:'Follow Our Founder',kind:'links',links:[
    {key:'youtube',name:'YouTube',handle:'@imnagpujari',href:founderSocial.youtube,text:'Legal awareness videos by Advocate Nageshwar Rao Pujari'},
    {key:'instagram',name:'Instagram',handle:'@iamnagpujari',href:founderSocial.instagram,text:'Updates and reels from our Founder'}]},
  {id:'youtube',title:'YouTube Presence',kind:'videos',videos:youtube}
]
