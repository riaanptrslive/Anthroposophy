import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {nutritionLessons as lessons} from '../content/nutrition.mjs';
assert.deepEqual(lessons.map(l=>l.id),Array.from({length:14},(_,i)=>i));
assert.deepEqual(lessons.filter(l=>l.chapter).map(l=>l.chapter),Array.from({length:12},(_,i)=>i+1));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const original=process.argv[2];
const clean=s=>s.replaceAll('toa condition','to a condition').replace(/^Nutrition\s*$/gm,'').replace(/^Pagina[^\r\n]*$/gm,'').replace(/([a-zA-Z])-\s+(?=[a-z])/g,'$1').replace(/\s+/g,' ').trim();
const pages=original?fs.readFileSync(original,'utf8').split(/<!-- page: (\d+) -->/):null;
for(const l of lessons){
 assert.ok(l.quote&&l.quotePage>=1&&l.quotePage<=118);
 if(pages){const at=pages.findIndex((p,i)=>i%2===1&&Number(p)===l.quotePage);assert.ok(at>0&&clean(pages[at+1]).includes(clean(l.quote)),`Quote not in cited capture page: ${l.id}`);}
 for(const lang of ['en','pt']){
  const v=l[lang],base=lang==='pt'?'docs/pt':'docs',other=lang==='pt'?'docs':'docs/pt',file=`${base}/nutrition/lessons/${String(l.id).padStart(2,'0')}.html`,h=fs.readFileSync(file,'utf8');
  assert.equal(v.theory.length,3);assert.equal(v.takeaways.length,3);assert.equal(v.checks.length,3);
  for(const text of [...v.theory,...v.takeaways,v.goal,v.close,v.example,v.explanation,v.activity,v.context,...v.checks.flat()])assert.ok(text?.trim()&&h.includes(esc(text)),`${file}: missing authored content`);
  assert.ok(h.includes(esc(l.quote)));if(lang==='pt')assert.ok(v.quoteTranslation&&h.includes(esc(v.quoteTranslation)));
  assert.ok(h.indexOf('class="nutrition-theory"')<h.indexOf('id="book-passage"'));
  assert.ok(h.indexOf('id="book-passage"')<h.indexOf('data-note-field="first"'));
  const alternate=h.match(/<link rel="alternate"[^>]*href="([^"]+)"/)[1];
  assert.equal(path.resolve(path.dirname(file),alternate),path.resolve(other,'nutrition','lessons',path.basename(file)));
  assert.ok(!/C:\\Users|Kindle|Conversion review|undefined|NaN/.test(h),file+' leaked source noise or invalid values');
  assert.ok(h.includes(`data-study-id="nutrition/${String(l.id).padStart(2,'0')}"`));
 }
}
for(const base of ['docs','docs/pt']){
 const home=fs.readFileSync(base+'/index.html','utf8'),index=fs.readFileSync(base+'/nutrition/index.html','utf8');
 assert.equal((home.match(/href="nutrition\/index.html"/g)||[]).length,1);
 assert.equal((index.match(/data-nutrition-lesson=/g)||[]).length,14);
 assert.ok(index.includes('data-course-journal="nutrition"'));
}
console.log('Passed: all 12 chapters, 14 bilingual lessons, complete teaching, quotations, language partners, course links and notebook identities'+(pages?'; quotation wording matched to all cited Markdown capture pages.':'. Pass a source Markdown path to verify quote wording.'));
