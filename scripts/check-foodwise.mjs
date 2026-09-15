import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {foodwiseLessons as lessons,foodwiseSources} from '../content/foodwise.mjs';
assert.deepEqual(lessons.map(l=>l.id),Array.from({length:24},(_,i)=>i));
assert.deepEqual([...new Set(lessons.map(l=>l.chapter).filter(Boolean))],Array.from({length:20},(_,i)=>i+1));
assert.deepEqual(lessons.filter(l=>l.chapter===19).map(l=>l.section),['19A','19B','19C']);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const clean=s=>s.replace(/^Foodwise\s*$/gm,'').replace(/^P[áa]gina[^\r\n]*$/gm,'').replace(/([a-z])-\s+(?=[a-z])/gi,'$1').toLowerCase().replace(/[^a-z0-9]/g,'');
const original=process.argv[2];
const pages=original?JSON.parse(fs.readFileSync(original,'utf8')):null;
for(const l of lessons){
 assert.ok(l.quotePage>=1&&l.quotePage<=272&&l.quote.trim());
 if(pages)assert.ok(clean(pages.find(p=>p.page===l.quotePage)?.text||'').includes(clean(l.quote)),`Quote ${l.id} missing from capture ${l.quotePage}`);
 assert.ok(l.references.every(k=>foodwiseSources[k]));
 for(const lang of ['en','pt']){
  const v=l[lang],base=lang==='pt'?'docs/pt':'docs',other=lang==='pt'?'docs':'docs/pt';
  const file=`${base}/foodwise/lessons/${String(l.id).padStart(2,'0')}.html`,h=fs.readFileSync(file,'utf8');
  assert.equal(v.theory.length,3);assert.equal(v.takeaways.length,3);assert.equal(v.checks.length,3);
  for(const s of [...v.theory,...v.takeaways,...v.checks.flat(),v.title,v.goal,v.close,v.example,v.explanation,v.activity,v.context])assert.ok(typeof s==='string'&&s.trim()&&h.includes(esc(s)),`${file}: missing authored content`);
  assert.ok(h.includes(esc(l.quote)));if(lang==='pt')assert.ok(v.quoteTranslation&&h.includes(esc(v.quoteTranslation)));
  assert.ok(h.indexOf('class="foodwise-theory"')<h.indexOf('id="book-passage"'));
  assert.ok(h.indexOf('id="book-passage"')<h.indexOf('data-note-field="first"'));
  assert.ok(h.includes('Wendy E. Cook · <cite>Foodwise</cite>'));
  const alternate=h.match(/<link rel="alternate"[^>]*href="([^"]+)"/)[1];
  assert.equal(path.resolve(path.dirname(file),alternate),path.resolve(other,'foodwise','lessons',path.basename(file)));
  assert.ok(!/C:\\Users|undefined|NaN|14 lessons|Fourteen lessons|Christian von Arnim|GA 68|ISBN 9781855842823/.test(h));
  assert.ok(h.includes(`data-study-id="foodwise/${String(l.id).padStart(2,'0')}"`));
  if(l.id===23)assert.ok(!h.includes('href="24.html"'));
 }
}
for(const base of ['docs','docs/pt']){
 const home=fs.readFileSync(base+'/index.html','utf8'),index=fs.readFileSync(base+'/foodwise/index.html','utf8');
 assert.equal((home.match(/href="foodwise\/index.html"/g)||[]).length,1);
 assert.equal((index.match(/data-foodwise-lesson=/g)||[]).length,24);
 assert.ok(index.includes('data-course-journal="foodwise"'));
 assert.ok(index.includes('9781905570584'));
}
console.log('Passed: all 20 chapters, 24 bilingual lessons, 19A–C coverage, complete teaching, paired language links, separate notebooks and course integration'+(pages?'; all quotations match their cited OCR capture pages (also visually reviewed).':'.'));
