import fs from 'node:fs';
import assert from 'node:assert/strict';
import {coursePlans} from './chapter-curriculum-data.mjs';
import {chapterOneRevision} from '../content/theosophy-chapter-one-revision.mjs';
import {lukeConceptRevision} from '../content/luke-concept-revision.mjs';
const coverage=JSON.parse(fs.readFileSync('content/chapter-curriculum-coverage.json','utf8'));
const everyday=JSON.parse(fs.readFileSync('content/everyday-learning-coverage.json','utf8'));
assert.equal(coursePlans.length,20);assert.equal(coverage.pages,590);
assert.deepEqual(coverage.entries.map(e=>e.url).sort(),everyday.entries.map(e=>e.url).sort());
const plan=id=>coursePlans.find(p=>p.course===id);
for(const [id,kind,count] of [['theosophy','chapter',4],['philosophy-of-freedom','chapter',14],['according-to-luke','lecture',10],['colour','lecture',12],['temperaments','lecture',1],['mystery-temperaments','discussion',1],['practical-thinking','lecture',1],['ancient-myths','lecture',7],['nutrition','chapter',12],['foodwise','chapter',20],['phases','chapter',7],['biodynamics','chapter',7]])assert.equal(plan(id).groups.filter(g=>g.kind===kind).length,count,id+' real source structure');
assert.deepEqual(plan('foodwise').groups.find(g=>g.key==='19').ids,[19,20,21]);
assert.deepEqual(plan('phases').groups.find(g=>g.key==='2').ids,[3,4,5,6,7,8,9,10]);
assert.equal(plan('parents-educators').type,'application');assert.equal(plan('understanding-temperaments').type,'comparison');
const plain=h=>h.replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
for(const course of coursePlans)for(const lang of course.langs){
  const base='docs/'+(lang==='pt'?'pt/':''),index=fs.readFileSync(base+course.index,'utf8');
  assert.equal((index.match(/id="chapter-curriculum"/g)||[]).length,1);
  assert.equal((index.match(/data-concept-lesson=/g)||[]).length,course.items.length);
  if(course.course==='philosophy-of-freedom'){
    assert.equal((index.match(/data-optional-practice/g)||[]).length,6,'Six optional practices stay visibly optional');
    for(const group of course.groups){
      const core=group.ids.find(id=>!course.items.find(item=>item.id===id).optional);
      for(const id of group.ids.filter(id=>course.items.find(item=>item.id===id).optional))assert.ok(index.indexOf(`data-concept-lesson="${core}"`)<index.indexOf(`data-concept-lesson="${id}"`),'Main chapter lesson precedes optional practice');
    }
  }
  for(const item of course.items){
    const file=base+item.url,h=fs.readFileSync(file,'utf8');
    assert.equal((h.match(/id="chapter-focus"/g)||[]).length,1,file);
    assert.ok(index.includes(`id="source-chapter-${item.group}"`),file+' source return anchor');
    assert.ok(h.includes(`data-source-unit="${item.group}"`),file+' chapter assignment');
    const focus=h.indexOf('id="chapter-focus"'),example=h.indexOf('class="everyday-opening"');
    const nav=h.match(/<nav class="everyday-nav"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    const target=nav?.match(/href="#([^"]+)"/)?.[1],teaching=h.indexOf(`id="${target}"`);
    assert.ok(focus>0&&teaching>focus&&example>teaching,file+' concepts/teaching/application order');
    if(h.includes('id="book-passage"'))assert.ok(h.indexOf('id="book-passage"')<example,file+' source before application');
    assert.ok(h.includes('chapter-curriculum.css'),file);
    for(const concept of item.focus[lang])assert.ok(plain(h).includes(concept),file+' concept text');
    if(course.course==='theosophy'&&chapterOneRevision[item.id])assert.ok(plain(h).includes(chapterOneRevision[item.id].check[lang][0]),file+' source argument check');
    if(course.course==='according-to-luke'&&lukeConceptRevision[item.id])assert.ok(plain(h).includes(lukeConceptRevision[item.id][lang==='en'?4:5]),file+' source concept check');
  }
}
for(const lang of ['en','pt']){
  const h=fs.readFileSync('docs/'+(lang==='pt'?'pt/':'')+'index.html','utf8');
  assert.ok(h.includes('href="theosophy/index.html#chapter-curriculum"'));
  assert.ok(h.indexOf('id="courses"')<h.indexOf('id="find-a-situation"'),'Book courses precede application finder');
}
console.log('Passed: actual chapter/lecture structures, every lesson assigned once, 590 concept maps, book-before-application order, source return links and new conceptual questions.');
