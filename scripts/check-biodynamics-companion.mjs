import fs from 'node:fs';
import assert from 'node:assert/strict';
import {sessions,chapters,highlights,evidence} from '../content/biodynamics-companion.mjs';
const root='docs/biodynamics/companion';
const coverage=JSON.parse(fs.readFileSync('content/biodynamics-coverage.json','utf8'));
assert.equal(sessions.length,36);
assert.equal(coverage.concepts.length,560);
assert.equal(highlights.length,11);
assert.deepEqual([...new Set(highlights.map(h=>h.page))],[76,101,102,114]);
assert(highlights.filter(h=>h.page===114).every(h=>h.voice==='Marcia Merryman Means'));
const seen=[];
for(const s of sessions){
 const html=fs.readFileSync(`${root}/session-${s.id}.html`,'utf8');
 const chapter=chapters.find(c=>c.id===s.chapter);
 assert(s.start>=chapter.start&&s.end<=chapter.end);
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 assert.equal((html.match(/<details>/g)||[]).length,2);
 assert(html.includes('Teaching example — introduced by the instructor'));
 for(let p=s.start;p<=s.end;p++){
  seen.push(p);assert(html.includes(`id="page-${p}"`));
  const section=html.split(`id="page-${p}"`)[1].split('</section>')[0];
  assert(section.replace(/<[^>]*>/g,' ').split(/\s+/).length>55,`Insufficient commentary on ${p}`);
 }
}
assert.deepEqual(seen,Array.from({length:135},(_,i)=>i+1));
for(const c of coverage.concepts){const [file,id]=c.section.split('#');assert(fs.readFileSync(`${root}/${file}`,'utf8').includes(`id="${id}"`));}
for(const h of highlights){const s=sessions.find(s=>h.page>=s.start&&h.page<=s.end);assert(fs.readFileSync(`${root}/session-${s.id}.html`,'utf8').includes(`id="${h.id}"`));}
assert(coverage.concepts.some(c=>c.page===24&&c.status.startsWith('partly')));
assert(evidence.length>=11);
for(const prefix of ['docs','docs/pt']){
 const html=fs.readFileSync(`${prefix}/biodynamics/index.html`,'utf8');
 assert.equal((html.match(/<!-- biodynamics-companion:start -->/g)||[]).length,1);
}
const all=fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>fs.readFileSync(`${root}/${f}`,'utf8')).join('\n');
assert(!/C:\\Users|Downloads[\\/]|page-\d+\.png/.test(all),'Private source path exposed');
console.log('Passed: 36 lessons, all 135 pages in order, 560 concept links, 11 highlight links with correct attribution, explicit partial coverage and private-source separation.');
