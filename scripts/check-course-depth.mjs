import fs from 'node:fs';
import assert from 'node:assert/strict';
import {courseDepth} from './build-course-depth.mjs';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let pages=0;
for(const [course,units] of Object.entries(courseDepth)){
 const route=course==='theosophy'?'lessons':['foundations','meditation'].includes(course)?course:`${course}/lessons`;
 const ids=units.flatMap(u=>u.ids);
 assert.equal(new Set(ids).size,ids.length,`${course}: duplicate lesson`);
 for(const lang of ['en','pt']){
  const dir=`docs/${lang==='pt'?'pt/':''}${route}`;
  assert.deepEqual(fs.readdirSync(dir).filter(f=>/^\d\d\.html$/.test(f)).sort(),ids.map(id=>`${String(id).padStart(2,'0')}.html`).sort(),`${dir}: lesson coverage`);
  for(const unit of units){
   assert.equal(unit.en.length,unit.pt.length,`${course}: translation paragraph parity`);
   assert.ok(unit.source?.length,`${course}: missing source connection`);
   assert.ok(unit[lang].length>=3,`${course}: missing explanation`);
   for(const id of unit.ids){
    const file=`${dir}/${String(id).padStart(2,'0')}.html`;
    const html=fs.readFileSync(file,'utf8');
    assert.equal((html.match(/id="deeper-explanation"/g)||[]).length,1,`${file}: section count`);
    const block=html.match(/<!-- course-depth:start -->([\s\S]*?)<!-- course-depth:end -->/)?.[1];
    assert.ok(block,`${file}: explanation missing`);
    const plain=block.replace(/<a\b[^>]*class="constitution-ref"[^>]*>([\s\S]*?)<\/a>/g,'$1');
    for(const paragraph of unit[lang])assert.ok(plain.includes(esc(paragraph)),`${file}: missing authored text`);
    const next=html.slice(html.indexOf('<!-- course-depth:end -->')+25);
    assert.match(next,/^<section\b/,`${file}: reading placement`);
    pages++;
   }
  }
 }
}
console.log(`Course depth: complete coverage, source labels, translation parity and authored explanations verified on ${pages} pages across ${Object.keys(courseDepth).length} routes.`);
