import fs from 'node:fs';
import {curricula} from '../content/chapter-curriculum.mjs';
import {foundationCourse} from '../content/foundation-course.mjs';
import {meditationLessons} from '../content/meditation-course.mjs';
import {parentUnits} from '../content/parents-educators.mjs';
import {temperamentCourse} from '../content/temperament-course.mjs';
import {sessions,chapters as companionChapters} from '../content/biodynamics-companion.mjs';
import {biodynamicsLessons} from '../content/biodynamics.mjs';
import {courseContexts} from '../content/everyday-learning.mjs';
import {freedomPractice} from '../content/philosophy-of-freedom-consolidated.mjs';

const library=JSON.parse(fs.readFileSync('content/knowledge-base/library.json','utf8'));
const n=id=>String(id).padStart(2,'0');
const text=h=>h.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const normalized=(l,lang)=>{
  const v=l[lang],array=Array.isArray(v);
  return {title:array?v[0]:v.title,goal:array?v[1]:v.goal,reading:array?l.pages:v.reading||l.span||l.pages||l.refs||'',teaching:array?v[2]:v.theory||v.paragraphs||v.explain||[v.key,v.context].filter(Boolean)};
};
const section=(key,title,ids,kind='selected-study')=>({key,title,ids,kind});
export const coursePlans=[];
for(const [course,plan] of Object.entries(curricula)){
  const book=library.find(b=>b.id===plan.book);if(!book)throw Error('Missing source record '+plan.book);
  let lessons=[];
  for(const [module,key] of book.modules)lessons.push(...(await import('../content/'+module+'.mjs'))[key]);
  if(course==='biodynamics')lessons=biodynamicsLessons;
  if(course==='theosophy')lessons.unshift({id:0,en:['Study Theosophy','Distinguish active reading, understanding and direct perception.'],pt:['Estudar Teosofia','Distinga leitura ativa, compreensão e percepção direta.']});
  const groups=plan.groups||[...new Set(lessons.map(l=>l.chapter??(l.id===0?'opening':'synthesis')))].map(key=>{
    const selected=lessons.filter(l=>(l.chapter??(l.id===0?'opening':'synthesis'))===key),first=selected[0];
    const title=key==='opening'?{en:'Preface and introduction',pt:'Prefácio e introdução'}:key==='synthesis'?{en:'Connections across the book',pt:'Relações entre as partes do livro'}:plan.chapterTitles?.[key]||{en:first.en.title,pt:first.pt.title};
    return section(String(key),title,selected.map(l=>l.id),typeof key==='number'?'chapter':key);
  });
  const items=lessons.map(l=>({id:l.id,url:(course==='theosophy'?'lessons':course+'/lessons')+'/'+n(l.id)+'.html',optional:course==='philosophy-of-freedom'&&Object.hasOwn(freedomPractice,l.id),focus:plan.focus[l.id],en:normalized(l,'en'),pt:normalized(l,'pt')}));
  if(items.some(l=>!l.focus)||items.length!==plan.focus.length)throw Error('Concept coverage mismatch: '+course);
  coursePlans.push({course,book:book.title,author:book.author,bookId:book.id,witness:book.source,review:plan.review,structure:book.structure,type:'book',langs:['en','pt'],index:course+'/index.html',groups,items});
}

function addSelected(course,items,groups,{book,type='selected-readings',index=course+'/index.html',langs=['en','pt'],bookId,review}={}){
  coursePlans.push({course,book:book||courseContexts[course]?.en[0],bookId,review,type,langs,index,groups,items});
}
addSelected('foundations',foundationCourse.map(l=>({id:l.id,url:'foundations/'+n(l.id)+'.html',focus:{en:[l.en[0]],pt:[l.pt[0]]},en:{...normalized(l,'en'),reading:l.locator},pt:{...normalized(l,'pt'),reading:l.locator},sources:[{label:l.locator,url:l.source}]})),foundationCourse.map(l=>section(String(l.id),{en:l.locator,pt:l.locator},[l.id])),{book:'Foundations · selected concepts from Steiner’s works'});
addSelected('meditation',meditationLessons.map(l=>({id:l.id,url:'meditation/'+n(l.id)+'.html',focus:{en:[l.en.title],pt:[l.pt.title]},en:normalized(l,'en'),pt:normalized(l,'pt')})),meditationLessons.map(l=>section(String(l.id),{en:l.en.title,pt:l.pt.title},[l.id])),{book:'Meditation · selected texts and exercises',bookId:'start-now',review:'meditation-reading-review.md'});
addSelected('understanding-temperaments',temperamentCourse.map(l=>{
  const source=l.en.sources[0].url.replace(/^\.\.\/\.\.\//,'');
  const linked=coursePlans.flatMap(p=>p.items).find(item=>item.url===source);
  if(!linked)throw Error('Unmapped temperament source '+source);
  return {id:l.id,url:'understanding-temperaments/lessons/'+n(l.id)+'.html',focus:linked.focus,en:normalized(l,'en'),pt:normalized(l,'pt'),sources:l.en.sources.map(s=>({label:s.label,url:s.url.replace(/^\.\.\/\.\.\//,'')}))};
}),[
  section('steiner-theory',{en:'Steiner’s temperament lectures · individuality and constitution',pt:'Palestras de Steiner sobre temperamentos · individualidade e constituição'},[0,1]),
  section('steiner-portraits',{en:'Steiner’s temperament lectures · portraits and mixtures',pt:'Palestras de Steiner sobre temperamentos · retratos e misturas'},[2,3,4,5,6]),
  section('steiner-education',{en:'Steiner’s temperament lectures · education',pt:'Palestras de Steiner sobre temperamentos · educação'},[7]),
  section('childs',{en:'Childs · Chapters 7 and 8: work and compatibility',pt:'Childs · capítulos 7 e 8: trabalho e compatibilidade'},[8,9]),
  section('self-education',{en:'Steiner’s temperament lectures · self-education and synthesis',pt:'Palestras de Steiner sobre temperamentos · autoeducação e síntese'},[10,11])
],{book:'Understanding Temperaments · comparison of three books',type:'comparison'});
addSelected('parents-educators',parentUnits.map(l=>{
  const related=l.readings.map(([url])=>coursePlans.flatMap(p=>p.items).find(item=>item.url===url));
  if(related.some(r=>!r))throw Error('Unmapped parent/educator reading '+l.id);
  return {id:l.id,url:'parents-educators/'+n(l.id)+'.html',focus:{en:related.map(r=>r.focus.en[0]),pt:related.map(r=>r.focus.pt[0])},en:{title:l.en.title,goal:l.en.goal},pt:{title:l.pt.title,goal:l.pt.goal},sources:l.readings.map(([url,en,pt])=>({url,label:en,pt}))};
}),parentUnits.map(l=>section(String(l.id),{en:l.en.title,pt:l.pt.title},[l.id],'application')),{book:'Parents and educators · applications of selected source concepts',type:'application'});
addSelected('biodynamics-companion',sessions.map(l=>({id:Number(l.id),url:'biodynamics/companion/session-'+l.id+'.html',focus:{en:[l.title]},en:{title:l.title,goal:l.goal,reading:'PDF captures '+l.start+'–'+l.end}})),companionChapters.map(c=>section(c.id,{en:c.title},sessions.filter(s=>s.chapter===c.id).map(s=>Number(s.id)),/^\d+$/.test(c.id)?'chapter':c.id==='reading'?'synthesis':'opening')),{book:'What Is Biodynamics? · detailed companion',type:'book',index:'biodynamics/companion/index.html',langs:['en'],bookId:'biodynamics',review:'biodynamics-companion-review.md'});

// A source unit can have several lessons, but a lesson has one primary place.
for(const plan of coursePlans){
  const ids=plan.groups.flatMap(g=>g.ids);
  if(new Set(ids).size!==ids.length||ids.length!==plan.items.length||plan.items.some(l=>!ids.includes(l.id)))throw Error('Invalid chapter assignment '+plan.course);
  for(const item of plan.items){item.group=plan.groups.find(g=>g.ids.includes(item.id)).key;
    for(const lang of plan.langs){if(!item[lang]?.title||!item[lang]?.goal||!item.focus[lang]?.length)throw Error('Incomplete lesson specification '+plan.course+'/'+item.id+'/'+lang);}
  }
}
