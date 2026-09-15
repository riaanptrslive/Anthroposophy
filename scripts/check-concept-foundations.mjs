import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
const read=f=>fs.readFileSync(path.join('docs',f),'utf8');
let primers=0;
for(const f of fs.readdirSync('docs',{recursive:true}).filter(f=>f.endsWith('.html'))){
 const route=f.replaceAll('\\','/'),h=read(f);
 if(!h.includes('id="concept-primer"'))continue;
 primers++;
 const partner=read(route.startsWith('pt/')?route.slice(3):'pt/'+route);
 assert.ok(partner.includes('id="concept-primer"'),route+' missing bilingual prerequisite teaching');
 const first=h.indexOf('id="concept-primer"');
 for(const marker of ['id="book-passage"','id="study-explanation"','data-note-field="first"']){
  const target=h.indexOf(marker);if(target>=0)assert.ok(first<target,route+' definition must precede '+marker);
 }
 assert.equal((h.match(/id="concept-primer"/g)||[]).length,1,route+' duplicated prerequisites');
}
assert.ok(primers>50);
for(const prefix of ['','pt/']){
 const reference=read(prefix+'reference/human-constitution.html');
 let previous=-1;
 for(const id of ['concept-foundations','threefold-human-being','thinking-feeling-willing','fourfold-human-being','compare-models','physical-body']){
  const at=reference.indexOf(`id="${id}"`);assert.ok(at>previous,id+' teaching order');previous=at;
 }
 assert.ok(read(prefix+'index.html').includes('href="foundations/01.html"'));
 for(const id of ['01','03','06'])assert.ok(read(prefix+'lessons/'+id+'.html').includes('id="concept-primer"'));
}
console.log(`Passed: ${primers} bilingual prerequisite sections; definitions before source and practice; progressive foundation route.`);
