import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {biodynamicsLessons as lessons,biodynamicsSources} from '../content/biodynamics.mjs';
assert.deepEqual(lessons.map(l=>l.id),Array.from({length:9},(_,i)=>i));
assert.deepEqual([...new Set(lessons.map(l=>l.chapter).filter(Boolean))],Array.from({length:7},(_,i)=>i+1));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const clean=s=>s.replace(/^Biodynamics\s*$/gm,'').replace(/^P[áa]gina[^\r\n]*$/gm,'').replace(/([a-z])-\s+(?=[a-z])/gi,'$1').toLowerCase().replace(/[^a-z0-9]/g,'');
const original=process.argv[2];
const pages=original?JSON.parse(fs.readFileSync(original,'utf8')):null;
for(const l of lessons){
 assert.ok(l.quotePage>=1&&l.quotePage<=135&&l.quote.trim());
 if(pages)assert.ok(clean(pages.find(p=>p.page===l.quotePage)?.text||'').includes(clean(l.quote)),`Quote ${l.id} missing from capture ${l.quotePage}`);
 assert.ok(l.references.every(k=>biodynamicsSources[k]));
 for(const lang of ['en','pt']){
  const v=l[lang],base=lang==='pt'?'docs/pt':'docs',other=lang==='pt'?'docs':'docs/pt';
  const file=`${base}/biodynamics/lessons/${String(l.id).padStart(2,'0')}.html`,h=fs.readFileSync(file,'utf8').replace(/<a class="constitution-ref"[^>]*>([^<]*)<\/a>/g,'$1');
  assert.equal(v.theory.length,3);assert.equal(v.takeaways.length,3);assert.equal(v.checks.length,3);
  for(const s of [...v.theory,...v.takeaways,...v.checks.flat(),v.title,v.goal,v.close,v.example,v.explanation,v.activity,v.context])assert.ok(typeof s==='string'&&s.trim()&&h.includes(esc(s)),`${file}: missing authored content`);
  assert.ok(h.includes(esc(l.quote)));if(lang==='pt')assert.ok(v.quoteTranslation&&h.includes(esc(v.quoteTranslation)));
  assert.ok(h.indexOf('class="biodynamics-theory"')<h.indexOf('id="book-passage"'));
  assert.ok(h.indexOf('id="book-passage"')<h.indexOf('data-note-field="first"'));
  assert.ok(h.includes(esc(l.speaker)+' · <cite>What Is Biodynamics?</cite>'));
  const alternate=h.match(/<link rel="alternate"[^>]*href="([^"]+)"/)[1];
  assert.equal(path.resolve(path.dirname(file),alternate),path.resolve(other,'biodynamics','lessons',path.basename(file)));
  assert.ok(!/C:\\Users|undefined|NaN|14 lessons|Fourteen lessons|Christian von Arnim|GA 68|ISBN 9781855842823/.test(h));
  assert.ok(h.includes(`data-study-id="biodynamics/${String(l.id).padStart(2,'0')}"`));
  if(l.id===8)assert.ok(!h.includes('href="09.html"'));
 }
}
for(const base of ['docs','docs/pt']){
 const home=fs.readFileSync(base+'/index.html','utf8'),index=fs.readFileSync(base+'/biodynamics/index.html','utf8');
 assert.equal((home.match(/href="biodynamics\/index.html"/g)||[]).length,1);
 assert.equal((index.match(/data-biodynamics-lesson=/g)||[]).length,9);
 assert.ok(index.includes('data-course-journal="biodynamics"'));
 assert.ok(index.includes('Hugh J. Courtney')&&index.includes('Marcia Merryman Means'));
}
console.log('Passed: nine bilingual lessons, all seven lectures, teaching content, source quotations, language pairs and course integration.');
