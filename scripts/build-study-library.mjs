import fs from 'node:fs';
import path from 'node:path';

// Publish the authored notes without turning research status into a completion claim.
const source = path.resolve('content/knowledge-base');
const out = path.resolve('docs/study');
fs.mkdirSync(out, {recursive:true});
const books = JSON.parse(fs.readFileSync(path.join(source,'library.json'),'utf8'));
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const slug = s => s.toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}\s_.-]/gu,'').trim().replace(/\s/g,'-');
const files = new Map();
const root = path.resolve('content');
function outputName(file) {
  const relative=path.relative(root,file).replaceAll('\\','/');
  return (relative.startsWith('knowledge-base/') ? relative.slice(15) : 'reference--'+relative.replaceAll('/','--')).replace(/\.md$/,'.html');
}
function collect(file) {
  file=path.resolve(file);
  if(files.has(file))return;
  if(!file.startsWith(root+path.sep))throw Error('Source outside content: '+file);
  const text=fs.readFileSync(file,'utf8'); files.set(file,text);
  for(const m of text.matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const target=m[1].split('#')[0];
    if(!/^[a-z]+:/i.test(target)&&target.endsWith('.md')) {
      const resolved=path.resolve(path.dirname(file),target);
      if(fs.existsSync(resolved)&&resolved.startsWith(root+path.sep))collect(resolved);
    }
  }
}
for(const file of fs.readdirSync(source).filter(f=>f.endsWith('.md')))collect(path.join(source,file));
function href(target,file) {
  if(/^(https?:|mailto:|#)/i.test(target))return target;
  if(/^[a-z]+:/i.test(target))return '#main';
  const [name,anchor]=target.split('#');
  const resolved=path.resolve(path.dirname(file),name);
  if(files.has(resolved))return outputName(resolved)+(anchor?'#'+anchor:'');
  if(resolved.startsWith(path.resolve('docs')+path.sep))return path.relative(out,resolved).replaceAll('\\','/')+(anchor?'#'+anchor:'');
  if(fs.existsSync(resolved)&&resolved.startsWith(root+path.sep))return 'https://github.com/riaanptrslive/Anthroposophy/blob/main/content/'+path.relative(root,resolved).replaceAll('\\','/')+(anchor?'#'+anchor:'');
  return target;
}
function inline(text,file) {
  const tokens=[];
  const keep=html=>{tokens.push(html);return '\u0000'+(tokens.length-1)+'\u0000';};
  text=text.replace(/`([^`]+)`/g,(_,s)=>keep('<code>'+esc(s)+'</code>'));
  text=text.replace(/\[([^\]\n]+)\]\(([^)\n]+)\)/g,(_,label,url)=>keep(`<a href="${esc(href(url,file))}">${esc(label)}</a>`));
  return esc(text).replace(/ {2}\n/g,'<br>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/\u0000(\d+)\u0000/g,(_,n)=>tokens[n]);
}
function markdown(text,file) {
  const lines=text.replaceAll('\r','').split('\n'); const html=[], headings=[], ids=new Map();
  for(let i=0;i<lines.length;) {
    const line=lines[i];
    if(!line.trim()){i++;continue;}
    if(line.startsWith('```')){let code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);i++;html.push('<pre><code>'+esc(code.join('\n'))+'</code></pre>');continue;}
    const heading=line.match(/^(#{1,6}) (.+)$/);
    if(heading){const level=heading[1].length;let id=slug(heading[2]);const count=ids.get(id)||0;ids.set(id,count+1);if(count)id+='-'+count;headings.push({level,id,title:heading[2]});html.push(`<h${level} id="${id}">${inline(heading[2],file)}</h${level}>`);i++;continue;}
    if(/^\s*\|/.test(line)&&/^\s*\|?\s*:?-{3}/.test(lines[i+1]||'')) {
      const cells=s=>s.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
      const head=cells(line);i+=2;const rows=[];while(i<lines.length&&/^\s*\|/.test(lines[i]))rows.push(cells(lines[i++]));
      html.push(`<div class="table-scroll" tabindex="0" role="region" aria-label="Study table"><table><thead><tr>${head.map(c=>'<th scope="col">'+inline(c,file)+'</th>').join('')}</tr></thead><tbody>${rows.map(row=>'<tr>'+row.map(c=>'<td>'+inline(c,file)+'</td>').join('')+'</tr>').join('')}</tbody></table></div>`);continue;
    }
    if(/^\s*([-*]|\d+\.)\s/.test(line)) {
      const ordered=/^\s*\d+\./.test(line),tag=ordered?'ol':'ul',items=[];
      while(i<lines.length&&/^\s*([-*]|\d+\.)\s/.test(lines[i]))items.push(lines[i++].replace(/^\s*([-*]|\d+\.)\s+/,''));
      html.push(`<${tag}>${items.map(s=>'<li>'+inline(s,file)+'</li>').join('')}</${tag}>`);continue;
    }
    if(/^---+$/.test(line)){html.push('<hr>');i++;continue;}
    if(line.startsWith('> ')){html.push('<blockquote><p>'+inline(line.slice(2),file)+'</p></blockquote>');i++;continue;}
    const paragraph=[line];i++;
    while(i<lines.length&&lines[i].trim()&&!/^(#{1,6} |```|\s*([-*]|\d+\.)\s|\|)/.test(lines[i]))paragraph.push(lines[i++]);
    html.push('<p>'+inline(paragraph.join('\n'),file)+'</p>');
  }
  return {html:html.join('\n'),headings};
}
const route={ 'four-temperaments':'temperaments','understand-your-temperament':'understand-temperament','start-now':'meditation','weekly-meditations':'meditation','foundation-stone':'meditation','what-is-anthroposophy':'foundations','edmunds-introduction':'foundations'};
const titleOf=text=>(text.match(/^# (.+)/m)||[])[1]||'Reading notes';
function shell(title,body,toc='') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · Anthroposophy study library</title><link rel="stylesheet" href="../site-watercolour.css"><link rel="stylesheet" href="study.css"><script src="study.js" defer></script></head><body><a class="skip" href="#main">Skip to content</a><header><a class="brand" href="../index.html">✳ Anthroposophy</a><nav aria-label="Study library"><a href="index.html">All books</a><a href="READING-METHOD.html">Reading method</a><a href="source-audit.html">Sources &amp; gaps</a></nav></header><div class="study-layout">${toc}<main id="main">${body}</main></div><footer><a href="index.html">Return to the study library</a><a href="../pt/index.html" lang="pt-BR">Cursos em português</a><p>These detailed reading notes are in English. Spiritual claims, teaching interpretations and evidence are distinguished within each source record.</p></footer></body></html>`;
}
function write(name,title,body,toc=''){fs.writeFileSync(path.join(out,name),shell(title,body,toc));}
function contents(headings){return `<aside class="contents"><details open><summary>On this page</summary><nav aria-label="Page contents">${headings.filter(h=>h.level===2).map(h=>`<a href="#${h.id}">${esc(h.title)}</a>`).join('')}</nav></details></aside>`;}
const specials={theosophy:['theosophy-front-matter','theosophy-chapter-01','theosophy-chapter-02','theosophy-chapter-03','theosophy-chapter-04','theosophy-synthesis'], 'philosophy-of-freedom':['freedom-source-map','freedom-chapter-notes','freedom-framing-and-appendix','freedom-essential-comparison','freedom-synthesis'],'four-temperaments':['four-temperaments-close-reading','four-temperaments-study-course'],'mystery-temperaments':['mystery-temperaments-close-reading']};
const status=id=>id==='theosophy'?'All chapters: detailed reading notes':id==='philosophy-of-freedom'?'All supplied chapters: detailed reading notes':id==='four-temperaments'?'Six detailed study sessions':id==='mystery-temperaments'?'Detailed notes; translation questions':id==='biodynamics'?'36 lessons and page commentary':'Existing teaching; deeper analysis pending';
for(const [file,text] of files) {
  const name=outputName(file),rendered=markdown(text,file),book=books.find(b=>name===b.id+'.html');
  fs.mkdirSync(path.join(out,'downloads'),{recursive:true});
  fs.writeFileSync(path.join(out,'downloads',name.replace('.html','.md')),text);
  let intro=`<p class="breadcrumb"><a href="index.html">Study library</a> / Reading notes</p><div class="reading-note"><p>Research record dated September 2026. The original notes below retain their source limitations and drafting status. Publishing them here does not certify missing source coverage.</p><a href="downloads/${name.replace('.html','.md')}" download>Download these notes (.md)</a></div>`;
  if(book){const links=specials[book.id]||[];intro+=`<section class="book-route"><h2>Study this book</h2><p class="status">${esc(status(book.id))}</p><p><a href="../${route[book.id]||book.id}/index.html">Open the existing course →</a></p>${book.id==='biodynamics'?'<p><a href="../biodynamics/companion/index.html">Open the 36-lesson detailed companion →</a></p>':''}<ol>${links.map(id=>`<li><a href="${id}.html">${esc(titleOf(files.get(path.join(source,id+'.md'))))}</a></li>`).join('')}</ol>${fs.existsSync(path.join(source,book.id+'-teaching-bank.md'))?`<p><a href="${book.id}-teaching-bank.html">Existing explanations, activities and answer checks</a></p>`:''}</section>`;}
  if(name==='four-temperaments-study-course.html')intro+='<section><h2>Read one session at a time</h2><ol>'+Array.from({length:6},(_,i)=>`<li><a href="temperaments-session-${i+1}.html">Session ${i+1}</a></li>`).join('')+'</ol></section>';
  if(name==='freedom-chapter-notes.html'||name==='philosophy-of-freedom.html')intro+='<section><h2>Read chapter by chapter</h2><ol>'+Array.from({length:14},(_,i)=>`<li><a href="freedom-chapter-${i+1}.html">Chapter ${i+1}</a></li>`).join('')+'</ol></section>';
  write(name,titleOf(text),intro+rendered.html,contents(rendered.headings));
}
const courseFile=path.join(source,'four-temperaments-study-course.md');
const sessions=files.get(courseFile).split(/^## Coverage audit/m)[0].split(/^## (?=FT-L\d+ — )/m).slice(1);
for(const [i,session] of sessions.entries()) {
  const rendered=markdown('# '+session.replace(/^#{3,}/gm,m=>m.slice(1)),courseFile),title=session.split('\n')[0];
  write(`temperaments-session-${i+1}.html`,title,`<p class="breadcrumb"><a href="four-temperaments.html">The Four Temperaments</a> / Session ${i+1} of 6</p>${rendered.html}<nav class="sequence" aria-label="Session sequence">${i?`<a href="temperaments-session-${i}.html">← Previous session</a>`:'<a href="four-temperaments-close-reading.html">← Source analysis</a>'}<a href="four-temperaments-study-course.html">All sessions</a>${i<5?`<a href="temperaments-session-${i+2}.html">Next session →</a>`:'<a href="four-temperaments-coverage.html">Review coverage →</a>'}</nav>`,contents(rendered.headings));
}
const freedomFile=path.join(source,'freedom-chapter-notes.md');
const freedomChapters=files.get(freedomFile).split(/^## (?=Chapter \d+ — )/m).slice(1);
if(freedomChapters.length!==14||sessions.length!==6)throw Error('Incomplete chapter or session split');
for(const [i,chapter] of freedomChapters.entries()) {
  const rendered=markdown('# '+chapter.replace(/^#{3,}/gm,m=>m.slice(1)),freedomFile);
  write(`freedom-chapter-${i+1}.html`,chapter.split('\n')[0],`<p class="breadcrumb"><a href="philosophy-of-freedom.html">The Philosophy of Freedom</a> / Chapter ${i+1}</p><p class="reading-note">Detailed source analysis and proposed teaching activities. <a href="freedom-source-map.html">Read the edition and source map first.</a></p>${rendered.html}<nav class="sequence" aria-label="Chapter sequence">${i?`<a href="freedom-chapter-${i}.html">← Previous chapter</a>`:'<a href="freedom-source-map.html">← Source map</a>'}<a href="freedom-chapter-notes.html">All chapters</a>${i<13?`<a href="freedom-chapter-${i+2}.html">Next chapter →</a>`:'<a href="freedom-framing-and-appendix.html">Appendix and framing →</a>'}</nav>`,contents(rendered.headings));
}
for(const name of fs.readdirSync(source).filter(n=>n.endsWith('-coverage.json'))) {
  const data=JSON.parse(fs.readFileSync(path.join(source,name),'utf8'));
  // Keep the machine-readable audit intact alongside a readable web rendering.
  fs.copyFileSync(path.join(source,name),path.join(out,name));
  const units=data.units||data.concepts||[];
  const rows=units.map(unit=>{
    const file=unit.file?path.join(source,unit.file):null;
    const heading=file&&markdown(files.get(file)||'',file).headings.find(h=>h.title.startsWith(unit.id));
    let link=heading?`${outputName(file)}#${heading.id}`:null;
    if(name.startsWith('four-temperaments')&&unit.lesson){const index=Number(unit.lesson.replace('FT-L',''))-1;const section=markdown(sessions[index],courseFile).headings.find(h=>h.title.startsWith(unit.id+' '));if(!section)throw Error('Missing session explanation: '+unit.id);link=`temperaments-session-${index+1}.html#${section.id}`;}
    if(!link&&name.startsWith('mystery'))link='mystery-temperaments-close-reading.html';
    if(!link)throw Error('No explanation link for '+unit.id);
    return `<tr><th scope="row">${esc(unit.id)}</th><td>${esc(unit.heading||unit.sourcePages||unit.explanationSection||'')}</td><td>${esc(unit.status||'See source record')}</td><td>${link?`<a href="${link}">Read explanation</a>`:'See audit download'}</td></tr>`;
  }).join('');
  write(name.replace('.json','.html'),'Coverage — '+name.replace('-coverage.json','').replaceAll('-',' '),`<h1>Source coverage</h1><p>Coverage refers to the explanations linked below. It does not certify every final lesson, highlight or missing passage. Consult each book’s source record for qualifications.</p><p><a href="${name}" download>Download the full coverage audit (.json)</a></p><div class="table-scroll"><table><thead><tr><th>Idea</th><th>Source / section</th><th>Status</th><th>Explanation</th></tr></thead><tbody>${rows}</tbody></table></div>`);
}
const cards=books.map(b=>`<article class="book-card" data-book="${esc((b.title+' '+b.author).toLowerCase())}"><p class="status">${esc(status(b.id))}</p><h2><a href="${b.id}.html">${esc(b.title)}</a></h2><p>${esc(b.author)}</p><p>${esc(b.problem)}</p><a href="${b.id}.html">Source map &amp; study materials →</a></article>`).join('');
write('index.html','Study library',`<p class="eyebrow">Read · understand · question · connect</p><h1>A closer reading of the books</h1><p class="lead">Explore 20 source records, chapter explanations, teaching examples and coverage reports alongside the existing courses.</p><section class="featured"><h2>Begin a detailed study</h2><a href="theosophy.html">Theosophy: all four chapters</a><a href="philosophy-of-freedom.html">Freedom: fourteen chapters and appendices</a><a href="temperaments-session-1.html">The Four Temperaments: six sessions</a><a href="../biodynamics/companion/index.html">Biodynamics: 36 lessons</a></section><section class="reading-note"><h2>Choose your depth</h2><p>The existing courses offer guided lessons and exercises. The new chapter notes explain source arguments in greater detail. Complete final lesson expansion is still pending for several books; each record identifies source gaps and remaining work.</p><p><a href="READING-METHOD.html">How to use the study method</a> · <a href="source-audit.html">Source availability and requested uploads</a></p><p>Coverage reports: <a href="theosophy-coverage.html">Theosophy</a> · <a href="freedom-coverage.html">Freedom</a> · <a href="four-temperaments-coverage.html">Four Temperaments</a> · <a href="mystery-temperaments-coverage.html">Mystery of Temperaments</a></p></section><label for="book-search">Find a book or author</label><input id="book-search" type="search" placeholder="Try freedom, Steiner or nutrition"><p id="book-count" role="status" aria-live="polite">20 books and source records</p><div class="book-grid">${cards}</div><p id="no-results" hidden>No matching books. Try another title or author.</p>`);

// Make the library reachable from both language homepages and related course indexes.
const targetBooks=new Map();
for(const book of books){const r=route[book.id]||book.id;if(!targetBooks.has(r))targetBooks.set(r,[]);targetBooks.get(r).push(book);}
targetBooks.set('understanding-temperaments',books.filter(b=>['four-temperaments','mystery-temperaments','understand-your-temperament'].includes(b.id)));
for(const lang of ['', 'pt/'])for(const [r,list] of [['',books],...targetBooks]) {
  const file=path.resolve('docs',lang,r,'index.html');if(!fs.existsSync(file))continue;
  const relative=path.relative(path.dirname(file),out).replaceAll('\\','/');const pt=!!lang;
  const panel=`<!-- study-library:start --><section class="study-library-entry" style="padding:1.5rem;margin:2rem 0;border:1px solid #b8bdae;border-radius:12px;background:#f6f5ed"><h2>${pt?'Biblioteca de estudo detalhado':'Detailed study library'}</h2><p>${pt?'Mapas das fontes, explicações por capítulo e relatórios de cobertura. Os novos materiais detalhados estão em inglês; cada livro indica as lacunas e o trabalho pendente.':'Source maps, chapter explanations and coverage reports. Each book identifies its available material and remaining work.'}</p><p><a href="${relative}/index.html">${pt?'Explorar os 20 livros e fontes':'Explore all 20 books and sources'} →</a></p>${r?'<ul>'+list.map(b=>`<li><a href="${relative}/${b.id}.html">${esc(b.title)}</a></li>`).join('')+'</ul>':''}</section><!-- study-library:end -->`;
  let html=fs.readFileSync(file,'utf8').replace(/<!-- study-library:start -->[\s\S]*?<!-- study-library:end -->/g,'');
  html=html.replace(/(<main\b[^>]*>)/, '$1'+panel);fs.writeFileSync(file,html);
}
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({books:books.length,readingPages:files.size,sessions:sessions.length,generatedFiles:fs.readdirSync(out).filter(n=>n.endsWith('.html'))},null,2)+'\n');
console.log(`Published ${books.length} book records, ${files.size} reading pages and ${sessions.length} study sessions.`);
