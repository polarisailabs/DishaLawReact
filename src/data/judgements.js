// Text and order copies from the live "Our Latest Judgements" page. Order-copy PDFs are stored in /public/pdfs.
const P=f=>({href:'/pdfs/'+f})
const c=(t,ref,f)=>({t,ref,...P(f)})
const raw=[
{id:'ndps',art:'ndps',title:'Narcotic Drugs and Psychotropic Substances Act, 1985 (NDPS)-Bail',date:'March 30, 2023',
 blocks:[
  {h:'Consumer in Drug Cases',p:['consumer who is not liable for criminal prosecution'],cases:[c('','Criminal petition No.906 of 2023','ndps_act_criminal_petiton_no_906_of_2023.pdf')]},
  {h:'Bail in Drug Cases',p:['Bail in matters relating to Narcotic Drugs and Psychotropic Substances was granted in less than 3 weeks even though the minimum time required for mandatory bail is 6 months (180 days).','following are the : few of the Cases in which the bail was granted :-']},
  {h:'MDMA Drug :',cases:[
   c('Commercial Quantity of MDMA drug was seized at the time of arrest.Bail was granted in only 3 Weeks.','Criminal Petition No. 8529 of 2022,2022 SCC Online TS 2781','ndps_act_bail_order_copy_criminal_petition_no_scc_online_ts_2781_arvindkumarg_dishalawfirm_com.pdf'),
   c('48 packets of MDMA drug was seized during Arrest. Bail was granted in less than 1½ month','Criminal Petition No.616 of 2023,2023 SSC OnLine TS 341','ndps_act_bail_order_copy_petition__no_616_of_2023_dishalawfirm_com.pdf'),
   c('Commercial Quantity of MDMA drug was seized at the time of arrest.Bail was granted in only 5 Weeks.','Criminal Petition No. 6701 of 2022','ndps_act_mdma_drug_criminal_petition_no_6701_of_2022_dishalawfirm.pdf')]},
  {h:'Hash Oil :',cases:[
   c('1 kg of Hash Oil was seized at the time of arrest. Bail was granted in only 5 Weeks.','Criminal Petition No. 10408 of 2022','ndps_act_hash_oil_bail_order_copy_10408_of_2022_dishalawfirm.pdf'),
   c('48 packets of MDMA drug was seized during Arrest. Bail was granted in less than 1½ month','Criminal Petition No.616 of 2023,2023 SSC OnLine TS 341','ndps_act_bail_order_copy_petition__no_616_of_2023_dishalawfirm_com.pdf')]}]},
{id:'498a',art:'498a',title:'498A',
 blocks:[{h:'Cruelty to a women by her husband or relative of husband',
  p:['the purpose of section 498A is safegaurd married women form abuse by their husbands or their family members now a days there is a raise in 498A cases filed by women using baseless and bald allegations just to take revenge','there are several instances where the honourable court has decided if there is no specific allegations against family members of the husband 498A can be disposed and quashed'],
  cases:[c('','CRLP NO: 2948 of 2023, disposed with dispense to the parents of the husband','498a_act_domestic_violence_act_criminal_petition_10784_of_2022.pdf'),
   c('','CRLP NO: 10784 of 2022, charge sheet was quashed as there was no specific allegations against family members of the husband','498a_act_domestic_violence_act_criminal_petition_10784_of_2022.pdf')]}]},
{id:'pita',art:'pita',title:'Immoral Trafficking (370,370(A)2,3 to 5 PITA)',date:'March 30, 2023',
 blocks:[{h:'Exploitation of a Trafficked person for sexual purpose',
  p:['Any person who is an alleged customer in prostitution cases the sections 3 to 5 of PITA is not attracted and can be quashed,'],
  bullets:['if the said customer is found inside the premises only 370(A)2 of IPC is attracted and the rest sections can be quashed.','if there was no mention of customer being present in the room along with sex workers any of the above sections is not attracted and can be quashed'],
  cases:[c('','CRLP NO: 10303 and 10312 of 2022, date: 24-11-2022','pita_act_immoral_trafficking_10303_of_10312_dishalawfirm.pdf')]}]},
{id:'habeas',art:'habeas',title:'Habeas Corpus',date:'march 30, 2022',
 blocks:[{h:'Illegal/Unlawful Detention',
  p:['Preventing the unjust detention of any person who is detained against his/her will, this is a remedy available to the person who has lost his personal liberty','following are the : few of the Cases in which the Habeas Corpus was issued :-'],
  cases:[c('petitioners who were wives of the detenus in PITA challenged the detention orders passed by the commissioner of police and the honourable court was pleased to direct the repondants to set the detenus at liberty as they are no longer required in any other criminal case','WP NO: 10888 and 10892 of 2022 passed on,Date: 29-06-2022','habeus_corpus_criminal_petition_wp_number_10888_10892_dishalawfirm.pdf'),
   c('Detention of Daughter by father, writ was filed by the husband and it was disposed by the honourable court stating that it is illegal to detain her against her will','WP No: 19540 of 2022 passed on, Date: 25-04-2022.','habeus_corpus_wp_no_19540_of_2022_dishalawfirm_com.pdf'),
   c('preventive detention was invoked. on ground that the detenue might be released on bail .the Hon\'ble High Court set aside the detention order on the basis that solitary crime cannot be relaid upon for preventive detention.','WP No: 40841 of 2022 passed on, Date: 22-09-2022.','habeus_corpus_40841_bail_order_copy_dishalawfirm.pdf')]}]},
{id:'service',art:'service',title:'Service Matters',date:'oct 27, 2022',
 blocks:[{h:'Departmental Proceedings',
  p:['In a departmental enquiry where articles of charge were framed on vague grounds, the Hon\'ble High Court held that same is not sustainable in law because such departmental enquiry involves cosequences of termination of service like loss of job, which means loss of livelihood.'],
  cases:[c('','WP NO: 32572 of 2022, Dated: 27-10-2022, 2022 SCC OnLine TS 2892.','service_matters_2892_order_copy_dishalawfirm.pdf')]}]},
{id:'nala',art:'nala',title:'NALA Conversion Under Telangana Agricultural Land (Conversion for Non-Agricultural Purposes) Act, 2006',date:'oct 27, 2022',
 blocks:[{h:'',
  p:['In order to convert land for non agricultural purpose, an online application on dharani portal was to be submitted. However, the Online dharani portal provided no such option. The authorities did not consider the same and denied any physical application. the Hon\'ble Court held that appropriate provision for the same is made and enabled as District collector\'s login in TM 31, therefore the Hon\'ble Court permitted filing of application under module TM 31 and if the submission is not possible then representation is to be made to conserned authority so that they shall take necessary steps for conversion.'],
  cases:[c('','WP NO: 24716 of 2022, Dated: 28-09-2022','agricultural_land_nala_conversion_order_copy_24716_dishalawfirm.pdf')]}]},
{id:'pocso',art:'pocso',title:'POCSO ACT',date:'oct 27, 2022',
 blocks:[{h:'',p:['The accused is charged with offences punishable with life'],bullets:['Bail was granted in less than 1½ month'],
  cases:[c('','CRLP NO: 9721 of 2022, Dated: 14-11-2022','pocso_act_criminal_petition_9721_2022_dishalawfirm.pdf')]}]},
{id:'sarfaesi',art:'sarfaesi',title:'SARFAESI ACT',date:'oct 27, 2022',
 blocks:[{h:'',p:['warrent was issued for taking over phsyical position of property under SARFAESI Act. Petitioner approached Debts Recovery Tribunal but there is no presiding officer (PO) in DRT. The Hon\'ble High Court considering that there is no PO, passed an order directing the advocate commissioner to refering from taking any steps upon some conditions.'],
  cases:[c('','WP NO: 25663 of 2022, Dated: 15-06-2022','sarfaesi_act_dishalawfirm.pdf')]}]}
]
// Newest first. Dates are free text ("March 30, 2023", "oct 27, 2022"); entries with no date go last, in their original order.
const MONTHS={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11}
const when=d=>{const m=/^([a-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/i.exec((d||'').trim()); const mo=m&&MONTHS[m[1].slice(0,3).toLowerCase()]
  return mo===undefined||mo===null?-Infinity:Date.UTC(+m[3],mo,+m[2])}
const newestFirst=list=>list.map((j,n)=>[j,n]).sort((a,b)=>when(b[0].date)-when(a[0].date)||a[1]-b[1]).map(([j])=>j)
export const judgements=newestFirst(raw)
