import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {courseContexts} from '../content/everyday-learning.mjs';
import {parentUnits} from '../content/parents-educators.mjs';

const coverage=JSON.parse(fs.readFileSync('content/everyday-learning-coverage.json','utf8'));
assert.equal(coverage.lessons,590);
assert.equal(coverage.courses.length,20);
assert.deepEqual(parentUnits.map(u=>u.id),[1,2,3,4,5,6,7,8]);
for(const entry of coverage.entries){
  const h=fs.readFileSync(path.join('docs',entry.url),'utf8');
  assert.equal((h.match(/data-everyday-enhanced=/g)||[]).length,1,entry.url);
  assert.ok(h.includes(`data-study-id="${entry.id}"`),entry.url+' identity');
  for(const field of ['first','source','after','session1','session2','session3'])assert.equal((h.match(new RegExp(`data-note-field="${field}"`,'g'))||[]).length,1,entry.url+' '+field);
  for(const key of ['save-notes','note-status','complete','export','delete','first-preview'])assert.equal((h.match(new RegExp(`data-${key}(?:[ =/>])`,'g'))||[]).length,1,entry.url+' '+key);
  assert.ok(h.includes('id="learning-notebook"')&&h.includes('class="everyday-nav"'),entry.url+' navigation');
  assert.ok(h.includes('guided-study.v1.js')&&h.includes('everyday-learning.js'),entry.url+' runtime');
  assert.ok(!h.includes('Define the central concept in ordinary language')&&!h.includes('Defina o conceito central em linguagem comum'),entry.url+' generic prompt');
  const source=h.indexOf('id="study-explanation"'),question=h.indexOf('class="study-attempt"');
  if(source>=0&&question>=0)assert.ok(source<question,entry.url+' teaching before attempt');
  if(entry.course!=='biodynamics-companion')assert.ok(coverage.entries.some(e=>e.id===entry.id&&e.lang!==entry.lang),'Missing language pair '+entry.id);
}
for(const [course]of Object.entries(courseContexts))for(const lang of ['en','pt']){
  if(course==='biodynamics-companion'&&lang==='pt')continue;
  const file=`docs/${lang==='pt'?'pt/':''}${course==='biodynamics-companion'?'biodynamics/companion':course}/index.html`;
  const h=fs.readFileSync(file,'utf8');assert.equal((h.match(/<!-- everyday-course:start -->/g)||[]).length,1,file);
}
for(const lang of ['en','pt']){
  const base=`docs/${lang==='pt'?'pt/':''}`,h=fs.readFileSync(base+'index.html','utf8');
  assert.equal((h.match(/data-situation=/g)||[]).length,8);
  assert.ok(h.indexOf('id="title"')<h.indexOf('study-library:start'),'Library must follow main entry');
  assert.equal((h.match(/<!-- everyday-finder:start -->/g)||[]).length,1);
  assert.ok(!/Ten bilingual|Dez cursos/.test(h));
  const notebook=fs.readFileSync(base+'notebook.html','utf8');
  const manifest=JSON.parse(notebook.match(/id="learning-catalog">([\s\S]*?)<\/script>/)[1]);
  assert.equal(manifest.length,lang==='en'?313:277);
  for(const e of manifest)assert.ok(fs.existsSync(path.resolve(base,e.url)),e.url);
  for(const unit of parentUnits){
    const v=unit[lang];for(const k of ['title','goal','home','classroom','question','answer','practice','change','review'])assert.ok(v[k]?.trim(),`${unit.id}/${lang}/${k}`);
    assert.ok(v.concepts.length>=2&&unit.readings.length>=3);
    const page=fs.readFileSync(`${base}parents-educators/${String(unit.id).padStart(2,'0')}.html`,'utf8');
    assert.ok(page.indexOf('id="explanation"')<page.indexOf('class="practice"'));
    assert.ok(page.includes('rel="alternate"'));
  }
}
console.log('Passed: 590 lesson pages, 20 course paths, bilingual route, specific questions, six notebook fields, stable identities, portfolio links and homepage hierarchy.');
