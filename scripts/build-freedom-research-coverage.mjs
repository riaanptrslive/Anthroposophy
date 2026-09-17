import fs from 'node:fs';
const root='content/knowledge-base/';
const files=['freedom-framing-and-appendix.md','freedom-chapter-notes.md','freedom-essential-comparison.md'];
const units=[];
for(const file of files){
 const text=fs.readFileSync(root+file,'utf8').replaceAll('\r','');
 for(const m of text.matchAll(/^#### (F(?:\d+|F|C|A|N|E\d*)\.\d+) — (.+)$/gm)){
  const rest=text.slice(m.index+m[0].length),end=rest.search(/\n#{2,4} /);
  const explanation=rest.slice(0,end<0?rest.length:end).trim();
  // Catch empty placeholders; length is not a substitute for editorial coverage review.
  if(explanation.length<300)throw Error(`Explanation needs review: ${m[1]}`);
  units.push({id:m[1],heading:m[2],file,anchor:m[0].slice(5).toLowerCase().replace(/[—.]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').replaceAll(' ','-'),explanationWords:explanation.split(/\s+/).length,status:'explained-in-research-notes',finalWebsiteLesson:'pending'});
 }
}
if(new Set(units.map(x=>x.id)).size!==units.length)throw Error('Duplicate explanation ID');
for(let ch=1;ch<=14;ch++)if(!units.some(x=>x.id.startsWith(`F${ch}.`)))throw Error(`Missing chapter ${ch}`);
for(let a=1;a<=6;a++)if(!units.some(x=>x.id.startsWith(`FE${a}.`)))throw Error(`Missing editorial appendix ${a}`);
fs.writeFileSync(root+'freedom-coverage.json',JSON.stringify({scope:'Fresh sequential reading and explanatory research notes; not final website lessons',witnesses:[{id:'fuller',pdfPages:147,substantiveSuppliedPages:'1–144',missing:'Title/imprint, foreword, translation introduction and beginning of 1918 preface',excluded:'Part dividers and advertising at 145–147 are not substantive chapters'},{id:'essential',pdfPages:70,editor:'Frederick Amrine',year:2022,format:'Abridgement plus six editorial appendices',repetition:'Capture 63 repeats much of 62, then continues'}],units,highlights:{status:'All 217 capture pages reviewed in contact sheets; no obvious coloured text highlights seen',warning:'Faint marks and other user copies are not certified; editorial emphasis is not automatically a user highlight'},pending:['Fuller witness opening pages','Final lesson-format expansion and website integration','Faint-mark verification and any separate user highlights','Primary-source and scientific background checks','Fine-grained German/English and edition collation']},null,2)+'\n');
console.log(`${units.length} explained units; all fourteen fuller chapters and all six Essential appendices represented.`);
