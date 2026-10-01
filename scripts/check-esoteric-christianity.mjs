import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {lessons, sources, course} from '../content/esoteric-christianity.mjs';
import * as part2 from '../content/esoteric-christianity-part-2.mjs';
import * as part3 from '../content/esoteric-christianity-part-3.mjs';

const dir='docs/esoteric-christianity';
const number=n=>String(n).padStart(2,'0');
const time=s=>s.split(':').reduce((n,v)=>n*60+Number(v),0);
const ranges=lessons.flatMap(l=>l.time.split('; ').map(r=>r.split('–').map(time)));
ranges.push([3,time('00:03:16')]);
for(let second=3;second<time(course.end);second++) assert.ok(ranges.some(([a,b])=>a<=second&&b>second),'Uncovered transcript second: '+second);
assert.deepEqual(lessons.map(l=>l.id),[1,2,3,4,5,6,7,8,9,10]);
assert.equal(lessons.reduce((sum,l)=>sum+l.minutes,0),350);
const intro=fs.readFileSync(dir+'/index.html','utf8');
const guide=fs.readFileSync(dir+'/sources.html','utf8');
const markdown=fs.readFileSync(dir+'/part-1-course.md','utf8');
for(const lesson of lessons){
  const file=number(lesson.id)+'.html',h=fs.readFileSync(dir+'/'+file,'utf8');
  assert.ok(h.includes(lesson.title),file+' title');
  assert.ok(h.includes(lesson.time),file+' timestamp');
  assert.ok(markdown.includes('## Lesson '+lesson.id+': '+lesson.title),file+' download');
  assert.ok(intro.includes(`href="${file}"`),file+' reachable from index');
  assert.ok(h.includes(`data-study-id="esoteric-christianity/${number(lesson.id)}"`),file+' stable notebook identity');
  for(const field of ['first','source','after','session1','session2','session3'])assert.equal((h.match(new RegExp(`data-note-field="${field}"`,'g'))||[]).length,1,file+' notebook field '+field);
  for(const id of ['study-explanation','reading','activity','checks','learning-notebook'])assert.ok(h.includes(`id="${id}"`),file+' section '+id);
  for(const reading of lesson.readings)assert.ok(h.includes(reading[1]),file+' reading link');
  assert.ok(h.includes('Original course activity'),file+' activity attribution');
  if(lesson.id<10)assert.ok(h.includes(`href="${number(lesson.id+1)}.html">Lesson ${lesson.id+1}`),file+' next lesson');
  assert.ok(!/\baudio\b[^>]*src=|C:\\Users\\|Transcription is pending|recording started/i.test(h),file+' private capture or invented audio');
}
for(const s of sources)assert.ok(guide.includes(`id="${s.id}"`)&&guide.includes(s.url.replaceAll('&','&amp;')),s.id+' bibliography');
for(const phrase of ['Part 1 · Available','Part 2 · Available','Part 3 · Available'])assert.ok(intro.includes(phrase),'Part availability: '+phrase);
assert.ok(!/Not yet supplied|awaits the next recording|Part 3 status/.test(intro),'No stale pending status');
assert.ok(fs.readFileSync(dir+'/10.html','utf8').includes('Explicitly the speaker’s conjecture; Steiner proof disclaimed'));
assert.ok(fs.readFileSync(dir+'/07.html','utf8').includes('5 BCE')&&fs.readFileSync(dir+'/07.html','utf8').includes('7 BCE'));
for(const p of ['docs/index.html','docs/pt/index.html'])assert.equal((fs.readFileSync(p,'utf8').match(/<!-- esoteric-course:start -->/g)||[]).length,1,p+' integration');
const nh=fs.readFileSync('docs/notebook.html','utf8');
const catalog=JSON.parse(nh.match(/id="learning-catalog">([\s\S]*?)<\/script>/)[1]);
const entries=catalog.filter(e=>e.course==='esoteric-christianity');
assert.equal(entries.length,33);
assert.equal(new Set(entries.map(e=>e.id)).size,33);
for(const entry of entries)assert.ok(fs.existsSync('docs/'+entry.url),entry.url+' notebook return link');
assert.ok(fs.readFileSync('scripts/build-all.mjs','utf8').includes("import('./build-esoteric-christianity.mjs')"),'Complete build integration');

if(process.argv[2]){
  const raw=fs.readFileSync(process.argv[2]);
  assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),'dee753f6d28a7a45d648f3a1f6bc66bed4ae64d8c691f2dd51d22b3efa7ad4ef','Different transcript from the reviewed input');
  const spans=[...raw.toString('utf8').matchAll(/\[(\d{2}:\d{2}:\d{2}) - (\d{2}:\d{2}:\d{2})\]/g)];
  assert.ok(spans.length>1500,'Expected the complete transcript');
  for(const [,a,b]of spans)assert.ok(ranges.some(([start,end])=>start<=time(a)&&end>=time(b)),a+'–'+b+' not covered by a lesson or introduction');
}
const p2ranges=part2.lessons.map(l=>l.time.split('–').map(time));
assert.deepEqual(part2.lessons.map(l=>l.id),Array.from({length:11},(_,i)=>i+11));
assert.equal(part2.lessons.reduce((sum,l)=>sum+l.minutes,0),400);
for(let second=time(part2.course.start);second<time(part2.course.end);second++)assert.ok(p2ranges.some(([a,b])=>a<=second&&b>second),'Uncovered Part 2 second: '+second);
const guide2=fs.readFileSync(dir+'/sources-part-2.html','utf8');
const md2=fs.readFileSync(dir+'/part-2-course.md','utf8');
for(const lesson of part2.lessons){
  const file=number(lesson.id)+'.html',h=fs.readFileSync(dir+'/'+file,'utf8');
  assert.ok(h.includes(lesson.title)&&h.includes(lesson.time),file+' title and source span');
  assert.ok(h.includes('Part 2 transcript'),file+' distinguish transcript numbering');
  assert.ok(intro.includes(`href="${file}"`),file+' index access');
  assert.ok(md2.includes('## Lesson '+lesson.id+': '+lesson.title),file+' complete download');
  assert.ok(h.includes(`data-study-id="esoteric-christianity/${number(lesson.id)}"`),file+' notebook identity');
  for(const field of ['first','source','after','session1','session2','session3'])assert.equal((h.match(new RegExp(`data-note-field="${field}"`,'g'))||[]).length,1,file+' notebook field '+field);
  for(const id of ['study-explanation','reading','activity','checks','learning-notebook'])assert.ok(h.includes(`id="${id}"`),file+' section '+id);
  if(lesson.id<21)assert.ok(h.includes(`href="${number(lesson.id+1)}.html">Lesson ${lesson.id+1}`),file+' next lesson');
  assert.ok(h.includes(`href="${number(lesson.id-1)}.html">← Previous lesson`),file+' previous lesson');
  assert.ok(!/\baudio\b[^>]*src=|C:\\Users\\|Transcription is pending|recording started/i.test(h),file+' no private capture or invented audio');
}
for(const ref of part2.sources)assert.ok(guide2.includes(`id="${ref.id}"`)&&guide2.includes(ref.url.replaceAll('&','&amp;')),ref.id+' Part 2 reference');
assert.ok(fs.readFileSync(dir+'/10.html','utf8').includes('href="11.html">Lesson 11'),'Part 1–2 bridge');
assert.ok(intro.includes('Part 2 · Available')&&!intro.includes('Part 2 · Not yet supplied'),'Part 2 is available');
assert.ok(intro.includes('Part 3 · Available'),'Part 3 is available');
assert.ok(guide2.includes('no new proof')&&guide2.includes('Michael')&&guide2.includes('unlocated'),'Attribution limits retained');
assert.ok(fs.readFileSync(dir+'/21.html','utf8').includes('Genesis 37')&&fs.readFileSync(dir+'/21.html','utf8').includes('1 Samuel 16'),'Retelling comparisons retained');
if(process.argv[3]){
  const raw=fs.readFileSync(process.argv[3]);
  assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),'2032adf9b5d4505cf90aa189671985c47a5aca7b9cf77c3cc55eeafa62134154','Different Part 2 input');
  const spans=[...raw.toString('utf8').matchAll(/\[(\d{2}:\d{2}:\d{2}) - (\d{2}:\d{2}:\d{2})\]/g)];
  assert.ok(spans.length>1600,'Expected complete Part 2 transcript');
  for(const [,a,b]of spans)for(let second=time(a);second<time(b);second++)assert.ok(p2ranges.some(([start,end])=>start<=second&&end>second),a+'–'+b+' not covered by Part 2');
}
const p3ranges=part3.lessons.map(l=>l.time.split('–').map(time));
assert.deepEqual(part3.lessons.map(l=>l.id),Array.from({length:12},(_,i)=>i+22));
assert.equal(part3.lessons.reduce((sum,l)=>sum+l.minutes,0),470);
for(let second=time(part3.course.start);second<time(part3.course.end);second++)assert.ok(p3ranges.some(([a,b])=>a<=second&&b>second),'Uncovered Part 3 second: '+second);
const guide3=fs.readFileSync(dir+'/sources-part-3.html','utf8');
const md3=fs.readFileSync(dir+'/part-3-course.md','utf8');
for(const lesson of part3.lessons){
  const file=number(lesson.id)+'.html',h=fs.readFileSync(dir+'/'+file,'utf8');
  assert.ok(h.includes(lesson.title)&&h.includes(lesson.time),file+' title and source span');
  assert.ok(h.includes('Part 3 transcript'),file+' distinguish transcript numbering');
  assert.ok(h.includes('href="sources-part-3.html">Sources'),file+' current part guide in header');
  assert.ok(intro.includes(`href="${file}"`),file+' index access');
  assert.ok(md3.includes('## Lesson '+lesson.id+': '+lesson.title),file+' complete download');
  assert.ok(h.includes(`data-study-id="esoteric-christianity/${number(lesson.id)}"`),file+' notebook identity');
  for(const field of ['first','source','after','session1','session2','session3'])assert.equal((h.match(new RegExp(`data-note-field="${field}"`,'g'))||[]).length,1,file+' notebook field '+field);
  for(const id of ['study-explanation','reading','activity','checks','learning-notebook'])assert.ok(h.includes(`id="${id}"`),file+' section '+id);
  if(lesson.id<33)assert.ok(h.includes(`href="${number(lesson.id+1)}.html">Lesson ${lesson.id+1}`),file+' next lesson');
  assert.ok(h.includes(`href="${number(lesson.id-1)}.html">← Previous lesson`),file+' previous lesson');
  assert.equal((h.match(/class="ec-check"/g)||[]).length,lesson.checks.length,file+' answer reveals');
  for(const reading of lesson.readings)assert.ok(h.includes(reading[1]),file+' reading link');
  assert.ok(!/\baudio\b[^>]*src=|C:\\Users\\|Transcription is pending|recording started/i.test(h),file+' no private capture or invented audio');
}
for(const ref of part3.sources)assert.ok(guide3.includes(`id="${ref.id}"`)&&guide3.includes(ref.url.replaceAll('&','&amp;')),ref.id+' Part 3 reference');
assert.ok(fs.readFileSync(dir+'/21.html','utf8').includes('href="22.html">Lesson 22'),'Part 2–3 bridge');
assert.ok(fs.readFileSync(dir+'/33.html','utf8').includes('href="index.html#synthesis">Course synthesis'),'Final lesson returns to synthesis');
assert.ok(guide3.includes('editorial Appendix I')&&guide3.includes('Luke 2:41–52')&&guide3.includes('GA 109')&&guide3.includes('conjectural'),'Part 3 attribution distinctions retained');
if(process.argv[4]){
  const raw=fs.readFileSync(process.argv[4]);
  assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),'b46653dc9796537f56908caf91cc890df1889106048b56b143ee930a094b0e38','Different Part 3 input');
  const spans=[...raw.toString('utf8').matchAll(/\[(\d{2}:\d{2}:\d{2}) - (\d{2}:\d{2}:\d{2})\]/g)];
  assert.ok(spans.length>1600,'Expected complete Part 3 transcript');
  for(const [,a,b]of spans)for(let second=time(a);second<time(b);second++)assert.ok(p3ranges.some(([start,end])=>start<=second&&end>second),a+'–'+b+' not covered by Part 3');
}
console.log('Passed: 33 lessons in three parts, full timestamp coverage, source attribution, navigation, three complete downloads and stable notebook identities.');
