import fs from 'node:fs';
import assert from 'node:assert/strict';
import {foundationCourse} from '../content/foundation-course.mjs';
assert.deepEqual(foundationCourse.map(l=>l.id),Array.from({length:18},(_,i)=>i+1));
for(const lang of ['en','pt']){
 const base=lang==='en'?'docs':'docs/pt';
 const home=fs.readFileSync(base+'/index.html','utf8');
 assert.ok(home.includes('href="foundations/01.html"'));
 assert.ok(!home.includes('class="lesson-row"'),'Long book syllabus must not displace the main route');
 const book=fs.readFileSync(base+'/theosophy/index.html','utf8');
 assert.equal((book.match(/class="lesson-row"/g)||[]).length,23);
 for(const l of foundationCourse){
  const number=String(l.id).padStart(2,'0'),h=fs.readFileSync(`${base}/foundations/${number}.html`,'utf8');
  assert.ok(l[lang][2].length>=3,'Sufficient connected explanation '+number);
  assert.ok(h.includes(`data-foundation-id="${l.id}"`));
  assert.ok(h.indexOf('id="explanation"')<h.indexOf('class="practice"'));
  assert.ok(h.includes(l.source));
  assert.equal((h.match(/<details>/g)||[]).length,1,'One purposeful question');
  if(l.id<18)assert.ok(h.includes(`href="${String(l.id+1).padStart(2,'0')}.html"`));
  assert.ok(h.includes('rel="alternate"'));
 }
 for(const slug of ['theosophy','philosophy-of-freedom','higher-worlds','practical-thinking','understanding-temperaments','colour','encountering-the-self','according-to-luke','ancient-myths','meditation']){
  const h=fs.readFileSync(`${base}/${slug}/index.html`,'utf8');assert.ok(h.includes('id="foundation-route"'));assert.ok(h.includes('../foundations/'));
 }
}
console.log('Passed: 18 bilingual foundation lessons, sequential navigation, full Theosophy syllabus and preparation links for all ten courses.');
