import fs from 'node:fs';
const root='content/knowledge-base/';
const specs=[['front-matter','TF',[[1,3,'LF.1'],[4,7,'LF.2'],[8,9,'LF.3']]],['chapter-01','T1',[[1,3,'1A'],[4,7,'1B'],[8,9,'1C'],[10,12,'1D'],[13,15,'1E'],[16,16,'1F']]],['chapter-02','T2',[[1,4,'2A'],[5,8,'2B'],[9,9,'2C'],[10,13,'2D'],[14,14,'2E']]],['chapter-03','T3',[[1,3,'L3.1'],[4,5,'L3.2'],[6,7,'L3.3'],[8,10,'L3.4'],[11,12,'L3.5'],[13,14,'L3.6'],[15,17,'L3.7'],[18,19,'L3.8'],[20,22,'L3.9'],[23,23,'L3.10'],[24,26,'L3.11'],[27,28,'L3.12'],[29,29,'L3.13']]],['chapter-04','T4',[[1,2,'L4.1'],[3,4,'L4.2'],[5,5,'L4.3'],[6,7,'L4.4'],[8,8,'L4.5'],[9,9,'L4.3'],[10,10,'L4.5'],[11,12,'L4.6']]]];
const units=[];
for(const [part,prefix,ranges] of specs){
 const file=`theosophy-${part}.md`, text=fs.readFileSync(root+file,'utf8').replaceAll('\r','');
 const re=new RegExp(`^#{3,4} (${prefix}\\.(\\d+))[^\\n]*$`,'gm');
 for(const m of text.matchAll(re)){
  const tail=text.slice(m.index+m[0].length), end=tail.search(/\n#{2,4} /);
  const explanation=tail.slice(0,end<0?tail.length:end).trim();
  const target=ranges.find(([a,b])=>Number(m[2])>=a&&Number(m[2])<=b)?.[2];
  if(!target||explanation.length<400)throw Error(`Incomplete explanation/assignment: ${m[1]}`);
  units.push({id:m[1],heading:m[0].replace(/^#+ /,''),file,lessonCandidate:target,explanationWords:explanation.split(/\s+/).length,status:'explained-in-research-notes',finalWebsiteLesson:'pending'});
 }
}
if(units.length!==80)throw Error(`Expected 80 units; found ${units.length}`);
fs.writeFileSync(root+'theosophy-coverage.json',JSON.stringify({edition:'1971 Monges/Church',scope:'Text-reading and research-note explanations; not a completed website course',units,highlights:{pdfAnnotations:0,contactSheetPagesReviewed:228,result:'No obvious coloured text highlights seen; faint marks and other user copies not certified'},pending:['Complete lesson-format expansion','Bilingual website integration','Independent historical and scientific background checks']},null,2)+'\n');
console.log(`Validated ${units.length} explained units; ${new Set(units.map(x=>x.lessonCandidate)).size} proposed sessions.`);
