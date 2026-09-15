import fs from 'node:fs';
import path from 'node:path';
import {reviews} from '../content/learning-logic-review.mjs';

const snapshot = JSON.parse(fs.readFileSync('content/learning-audit-snapshot.json','utf8'));
const overview = fs.readFileSync('content/learning-logic-overview.md','utf8');
const meta = {
  'practical-thinking':['Practical Thinking','Observe → follow change → predict → reconstruct → concentrate → check a mental picture → conclude → review. This is currently the clearest practice sequence.'],
  'theosophy':['Theosophy','Human being → memory and destiny → soul and spiritual worlds → path of knowledge → synthesis. The book has an architecture; the lesson transitions need to make it more visible.'],
  'philosophy-of-freedom':['The Philosophy of Freedom','Question freedom → investigate knowing and thinking → examine motives and ethical action → understand individuals → connect both halves. Six additional pages are optional help.'],
  'higher-worlds':['How to Know Higher Worlds','Preparation and attention → character and conditions → proposed spiritual capacities → self-knowledge and responsibility → service. Teach the positive account as well as its limits.'],
  'understanding-temperaments':['Understanding the Four Temperaments','Meet one person → learn the framework → compare four tendencies → consider mixtures → support learning, cooperation and relationships → practise self-education → revisit the person.'],
  'colour':['Colour','Observe and compare → make forms and spatial relationships → distinguish artistic experience from spiritual interpretation → compose and revise. The cosmology needs a clearly signposted place.'],
  'encountering-the-self':['Encountering the Self','Understand the developing I → compare child-adult encounters → explain developmental models → consider educational responses → synthesize. Several appendices belong in optional specialist study.'],
  'according-to-luke':['According to Luke','Learn the modes of cognition → understand Buddha’s role → distinguish the Jesus narratives and spiritual streams → follow baptism and Christ → understand Golgotha and the ethical culmination. General kindness exercises alone do not teach this argument.'],
  'ancient-myths':['Ancient Myths','Retell → distinguish interpretations → investigate changing consciousness and knowing → connect individuality and learning → bring an idea into an encounter → revise a myth-based learning activity.'],
  'temperaments':['The Four Temperaments — source pathway','Eleven reference lessons supporting the unified course. They should not create another mandatory course and portfolio.'],
  'understand-temperament':['Understanding Temperament — Childs source pathway','Thirteen reference lessons. Use the later author’s distinctive applications and arguments where they clarify the unified course.'],
  'mystery-temperaments':['The Mystery of Temperaments — source pathway','Fifteen reference lessons. Retain useful passages and comparisons without restarting the same four portraits and final assignment.'],
};
const order = Object.keys(meta);
const sections = [];
let seen = 0;
for (const course of snapshot.courses) {
  const authored = reviews[course.course];
  if (!authored || authored.length !== course.lessons.length) throw new Error(`Coverage mismatch: ${course.course}`);
  if (new Set(authored.map(r=>r.id)).size !== authored.length) throw new Error('Duplicate review id');
  for (const lesson of course.lessons) {
    if (!authored.find(r=>r.id===lesson.id)) throw new Error(`Missing review ${course.course}/${lesson.id}`);
    if (!fs.existsSync(path.join('docs',lesson.path))) throw new Error(`Missing page ${lesson.path}`);
    seen++;
  }
}
if (seen !== 176) throw new Error(`Unexpected count ${seen}`);
for (const optional of [false,true]) {
  for (const slug of order) {
    const course = snapshot.courses.find(c=>c.course===slug);
    const lessons = course.lessons.filter(l=>l.optional===optional);
    if (lessons.length) sections.push({slug,optional,lessons,title:meta[slug][0]+(optional&&slug==='philosophy-of-freedom'?' — optional deeper readings':''),intro:meta[slug][1],anchor:slug+(optional?'-reference':'')});
  }
}
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
// Small controlled renderer for this authored overview: paragraphs, headings, lists and tables.
function renderOverview(md) {
  const lines=md.trim().split(/\r?\n/); let out='',para=[],list=false,table=false;
  const flush=()=>{if(para.length){out+=`<p>${inline(para.join(' '))}</p>`;para=[];}};
  const close=()=>{flush();if(list){out+='</ol>';list=false;}if(table){out+='</tbody></table></div>';table=false;}};
  for(const line of lines){
    if(!line.trim()){close();continue;}
    const heading=line.match(/^(#{1,3}) (.+)$/);
    if(heading){close();out+=`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;continue;}
    if(line.startsWith('|')){flush();const cells=line.split('|').slice(1,-1).map(x=>x.trim());if(cells.every(x=>/^[-:]+$/.test(x)))continue;if(!table){out+='<div class="table-scroll"><table><thead><tr>'+cells.map(c=>`<th>${inline(c)}</th>`).join('')+'</tr></thead><tbody>';table=true;}else out+='<tr>'+cells.map(c=>`<td>${inline(c)}</td>`).join('')+'</tr>';continue;}
    const item=line.match(/^\d+\. (.+)$/);if(item){flush();if(!list){out+='<ol>';list=true;}out+=`<li>${inline(item[1])}</li>`;continue;}
    para.push(line);
  }close();return out;
}
let md=overview+'\n\n## Detailed course and lesson review\n';
const sectionHtml=sections.map(section=>{
  md+=`\n## ${section.title}\n\n${section.intro}\n`;
  const entries=section.lessons.map((l,i)=>{
    const r=reviews[section.slug].find(r=>r.id===l.id);
    const url='https://riaanptrs.github.io/Anthroposophy/'+l.path;
    const id=`${section.anchor}-${String(l.id).padStart(2,'0')}`;
    md+=`\n### ${i+1}. ${l.title}\n\n[Existing lesson: ${l.path}](${url})\n\n**Current goal:** ${l.goal}\n\n**Current exercise:** ${l.practice}\n\n**What it teaches and why here:** ${r.logic}\n\n**Exercise assessment and proposed revision:** ${r.revision}\n\n**Evidence of understanding:** ${r.evidence}\n`;
    return `<article class="lesson" id="${id}"><h3><span class="step">${i+1}</span> ${esc(l.title)}</h3><a class="source" href="${esc(url)}" target="_blank" rel="noopener">Open existing lesson ↗ <span>${esc(l.path)}</span></a><p class="goal"><strong>Current goal</strong> ${esc(l.goal)}</p><h4>What it teaches and why here</h4><p>${esc(r.logic)}</p><details class="current"><summary>Read the current scene and exercise</summary><p><strong>Scene:</strong> ${esc(l.scene)}</p><p><strong>Exercise:</strong> ${esc(l.practice)}</p></details><h4>Exercise assessment and proposed revision</h4><p>${esc(r.revision)}</p><p class="evidence"><strong>Evidence of understanding</strong><br>${esc(r.evidence)}</p><a class="back" href="#course-map">Back to course list ↑</a></article>`;
  }).join('');
  return `<details class="course" id="${section.anchor}" data-optional="${section.optional}"><summary><span class="tag">${section.optional?'Reference':'Main route'} · ${section.lessons.length} pages</span><h2>${esc(section.title)}</h2></summary><p class="course-intro">${esc(section.intro)}</p>${entries}</details>`;
}).join('');
const nav=sections.map(s=>`<a href="#${s.anchor}" data-open="${s.anchor}">${esc(s.title)} <span>${s.lessons.length}</span></a>`).join('');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The learning logic — Anthroposophy course review</title><style>
:root{color-scheme:light;--ink:#243b39;--muted:#566866;--line:#cfdbd5;--paper:#fffef9;--accent:#285e55}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);font:17px/1.72 Georgia,serif;background:radial-gradient(ellipse at 0 0,#dfeae2,transparent 50%),radial-gradient(ellipse at 100% 10%,#eeddd0,transparent 40%),#f6f4ed}main{max-width:1020px;margin:40px auto;padding:0 28px 70px}a{color:var(--accent);text-underline-offset:4px}h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.13;max-width:800px;font-weight:500;margin:16px 0 24px}h2{font-size:1.6rem;line-height:1.3;margin-top:36px}h3{font-size:1.35rem;line-height:1.4;margin:0 0 9px}h4{font:700 .82rem/1.4 system-ui,sans-serif;letter-spacing:.045em;text-transform:uppercase;margin:24px 0 6px}p{margin:12px 0 20px}li{margin:12px 0}header,.overview,.map,.course{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:30px;margin-bottom:24px;box-shadow:0 8px 30px #283d3010}.eyebrow,.tag,.status{font:600 .78rem/1.5 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}.status{padding:10px 14px;background:#f4e8d5;border-radius:7px;display:inline-block;letter-spacing:0;text-transform:none}.overview>summary{font-size:1.5rem;cursor:pointer}.course>summary{cursor:pointer;padding:6px 0}.course>summary h2{display:inline;margin:0;font-size:1.55rem}.tag{display:block;margin:0 0 8px 20px}.course-intro{font-size:1.13rem;color:var(--muted);padding:15px 0 23px;border-bottom:1px solid var(--line)}.lesson{padding:28px 0 32px;border-bottom:1px solid var(--line);scroll-margin-top:25px}.lesson:last-child{border-bottom:0}.step{font:600 .85rem system-ui,sans-serif;background:#e7eee7;border-radius:50%;width:30px;height:30px;display:inline-grid;place-items:center;vertical-align:middle;margin-right:7px}.source,.back{font: .8rem/1.6 system-ui,sans-serif}.source span{display:block;color:var(--muted);overflow-wrap:anywhere}.goal{color:var(--muted);font-size:.98rem}.goal strong{display:block}.current{background:#f6f5ef;border:1px solid #e1e4da;border-radius:8px;padding:13px 18px;margin:18px 0}.current summary{cursor:pointer;font:600 .85rem/1.5 system-ui,sans-serif}.current p{font-size:.94rem}.evidence{background:#edf3ed;border-left:3px solid #648776;border-radius:0 8px 8px 0;padding:17px 20px}.evidence strong{font:700 .82rem/1.5 system-ui,sans-serif}.map nav{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px}.map nav a{display:flex;justify-content:space-between;gap:14px;font-size:.97rem}.map nav span{color:var(--muted)}.controls{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px;align-items:center}input{width:100%;padding:14px;font:1rem system-ui,sans-serif;border:1px solid #839e93;border-radius:7px;margin-top:6px}label{display:block;font:600 .9rem system-ui,sans-serif;margin-top:22px}button{padding:10px 16px;border:1px solid #839e93;background:#fffef9;color:var(--ink);border-radius:7px;font:600 .85rem system-ui,sans-serif;cursor:pointer}button:hover{background:#edf3ed}a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible{outline:3px solid #bd813f;outline-offset:4px}.table-scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.94rem}th,td{padding:13px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}th{background:#edf3ed}#result-count{font:.9rem system-ui,sans-serif;color:var(--muted)}[hidden]{display:none!important}footer{font:.85rem/1.6 system-ui,sans-serif;color:var(--muted)}@media(max-width:620px){main{margin:18px auto;padding:0 12px 40px}header,.overview,.map,.course{padding:21px}.map nav{grid-template-columns:1fr}body{font-size:16px}.course>summary h2{font-size:1.35rem}th,td{padding:10px}}@media print{body{background:white}main{max-width:none;margin:0;padding:0}.map,.controls,.back,.source span,.current{display:none}header,.overview,.course{box-shadow:none;border:0;padding:0}.lesson{break-inside:avoid}.course>summary{list-style:none}a{color:inherit}h2{break-after:avoid}}
</style></head><body><main><header><div class="eyebrow">Anthroposophy · curriculum review · 13 September 2026</div><h1>The learning logic, lesson by lesson</h1><p>What each lesson teaches, why its exercise belongs, and what needs to change.</p><p><strong>131 main-route lessons · 45 optional reading pages · 176 individual reviews</strong></p><span class="status">Review and recommendations — live course lessons are unchanged</span></header><details class="overview" open><summary>Read the overall assessment and recommended learning path</summary>${renderOverview(overview)}</details><section class="map" id="course-map"><h2>Choose a course</h2><p>Each review follows the existing reading order. Main routes come first; optional source readings follow. Open a course to read its lessons one by one.</p><nav aria-label="Courses in this review">${nav}</nav><label for="search">Find a concept, lesson or exercise</label><input id="search" type="search" placeholder="For example: compassion, I, memory, colour"><div class="controls"><button id="expand" type="button">Open all course reviews</button><button id="collapse" type="button">Close all course reviews</button><button id="clear" type="button">Clear search</button><span id="result-count" role="status" aria-live="polite">176 lesson reviews</span></div></section>${sectionHtml}<footer>Based on the current English lesson snapshot. Recommendations describe proposed revisions, not changes already made to the courses. Portuguese wording and the full source books have not been independently re-audited for this report.</footer></main><script>
const courses=[...document.querySelectorAll('.course')];const search=document.querySelector('#search');const count=document.querySelector('#result-count');
function filter(){const q=search.value.toLocaleLowerCase().trim();let n=0;for(const c of courses){let shown=0;for(const l of c.querySelectorAll('.lesson')){const match=!q||(c.querySelector('h2').textContent+' '+l.textContent).toLocaleLowerCase().includes(q);l.hidden=!match;if(match){shown++;n++;}}c.hidden=!shown;if(q&&shown)c.open=true;}count.textContent=n+' of 176 lesson reviews'+(q?' match your search':'');}
search.addEventListener('input',filter);document.querySelector('#clear').addEventListener('click',()=>{search.value='';filter();search.focus();});document.querySelector('#expand').addEventListener('click',()=>courses.filter(c=>!c.hidden).forEach(c=>c.open=true));document.querySelector('#collapse').addEventListener('click',()=>courses.forEach(c=>c.open=false));
function revealHash(){const el=document.getElementById(location.hash.slice(1));if(el){const course=el.classList.contains('course')?el:el.closest('.course');if(course){if(search.value){search.value='';filter();}course.open=true;requestAnimationFrame(()=>el.scrollIntoView());}}}window.addEventListener('hashchange',revealHash);revealHash();
window.addEventListener('beforeprint',()=>document.querySelectorAll('details').forEach(d=>{d.dataset.wasOpen=d.open;d.open=true;}));window.addEventListener('afterprint',()=>document.querySelectorAll('details').forEach(d=>{d.open=d.dataset.wasOpen==='true';}));
</script></body></html>`;
fs.writeFileSync('content/learning-logic-review.md',md);
fs.writeFileSync('docs/learning-review.html',html);
console.log(`Built ${seen} authored lesson reviews: ${sections.filter(s=>!s.optional).length} main courses; ${sections.filter(s=>s.optional).reduce((n,s)=>n+s.lessons.length,0)} optional pages.\nHTML: docs/learning-review.html\nMarkdown: content/learning-logic-review.md\nWords in Markdown: ${md.split(/\s+/).length}`);
