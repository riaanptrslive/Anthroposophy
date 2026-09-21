import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source=fs.readFileSync('docs/guided-study.v1.js','utf8');
class Node {
  constructor(value=''){this.value=value;this.textContent='';this.checked=false;this.dataset={};this.events={};this.attributes={};}
  addEventListener(name,fn){this.events[name]=fn;}
  setAttribute(k,v){this.attributes[k]=v;}
  fire(name){this.events[name]?.({currentTarget:this});}
}
function session({id,lang='en',storage=new Map(),failWrites=false}){
  const fields=['first','source','after','session1','session2','session3'].map(k=>{const n=new Node();n.dataset.noteField=k;return n;});
  const controls=Object.fromEntries(['note-status','save-notes','complete','first-preview','export','delete'].map(k=>[k,new Node()]));
  const root={dataset:{studyId:id},querySelector:s=>controls[s.slice(6,-1)]||null,querySelectorAll:s=>s==='[data-note-field]'?fields:[]};
  const events={},downloads=[];let pending;
  const context={
    document:{documentElement:{lang:lang==='pt'?'pt-BR':'en',classList:{add(){}}},querySelector:s=>s==='[data-study-id]'?root:s==='h1'?{textContent:'A fictional learning situation'}:null,body:{append(){}},createElement:()=>({click(){},remove(){}})},
    localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>{if(failWrites)throw Error('unavailable');storage.set(k,v);},removeItem:k=>storage.delete(k)},
    location:{href:'http://localhost/Anthroposophy/'+(lang==='pt'?'pt/':'')+id+'.html',pathname:'/Anthroposophy/'+id+'.html',origin:'http://localhost'},
    window:{addEventListener:(name,fn)=>{events[name]=fn;}},
    URL:class extends URL{static createObjectURL(blob){downloads.push(blob);return 'blob:test';}static revokeObjectURL(){}},Blob,
    setTimeout:(fn,delay)=>{if(delay===450)pending=fn;return 1;},clearTimeout:()=>{pending=null;}
  };
  vm.runInNewContext(source,context);
  return {fields,controls,storage,downloads,flush:()=>pending?.(),leave:()=>events.pagehide?.()};
}

for(const id of ['theosophy/01','foundations/02','meditation/03','biodynamics-companion/00','parents-educators/05']){
  const en=session({id});
  en.fields[0].value='Fictional observation';en.fields[0].fire('input');en.flush();
  assert.equal(en.storage.size,0,'No storage before consent');
  en.controls['save-notes'].checked=true;en.controls['save-notes'].fire('change');
  en.fields[3].value='First occasion';en.fields[3].fire('input');en.leave();
  en.controls.complete.fire('click');
  const restored=session({id,storage:en.storage});
  assert.equal(restored.fields[0].value,'Fictional observation');
  assert.equal(restored.fields[3].value,'First occasion');
  assert.equal(restored.controls.complete.attributes['aria-pressed'],'true');
  const pt=session({id,lang:'pt',storage:en.storage});
  assert.equal(pt.fields[0].value,'','Languages must not overwrite one another');
  pt.fields[0].value='Observação fictícia';pt.fields[0].fire('input');pt.leave();
  assert.equal(session({id,storage:en.storage}).fields[0].value,'Fictional observation');
  assert.equal(session({id,lang:'pt',storage:en.storage}).fields[0].value,'Observação fictícia');
  restored.controls.export.fire('click');
  const exported=await restored.downloads[0].text();
  assert.ok(exported.includes('Fictional observation')&&exported.includes('First occasion'));
  restored.controls['save-notes'].checked=false;restored.controls['save-notes'].fire('change');
  const before=restored.storage.get('anthro-study-v1:'+id);
  restored.fields[0].value='Not saved';restored.fields[0].fire('input');restored.leave();
  assert.equal(restored.storage.get('anthro-study-v1:'+id),before);
  restored.controls.delete.fire('click');
  assert.equal(restored.storage.has('anthro-study-v1:'+id),false,'Lesson deletion removes both languages only for this identity');
}
const blocked=session({id:'foundations/01',failWrites:true});
blocked.controls['save-notes'].checked=true;blocked.controls['save-notes'].fire('change');
assert.equal(blocked.controls['save-notes'].checked,false);
assert.match(blocked.controls['note-status'].textContent,/unavailable/);
const key='anthro-study-v1:theosophy/01';
const storage=new Map([['anthro-study-v1:enabled','yes'],[key,JSON.stringify({en:{first:'Earlier note',legacy:'Retain this'},pt:{first:'Nota anterior'}})]]);
const legacy=session({id:'theosophy/01',storage});legacy.fields[2].value='Revised';legacy.fields[2].fire('input');legacy.leave();
assert.equal(JSON.parse(storage.get(key)).en.legacy,'Retain this');
assert.equal(JSON.parse(storage.get(key)).pt.first,'Nota anterior');
console.log('Passed: notebook consent, reload persistence, six fields, language separation, completion, export, disabling, deletion, unavailable storage and preservation of older notes.');

// Exercise the actual portfolio runtime with fixture notes, including broken old data.
function portfolioSession(lang='en',enabled=true){
  class Element extends Node {
    constructor(){super();this.children=[];}
    append(...nodes){this.children.push(...nodes);}
    replaceChildren(...nodes){this.children=nodes;}
    remove(){}
    click(){this.fire('click');}
  }
  const entries=[
    {id:'parents-educators/05',course:'parents-educators',courseTitle:'Parents',title:'Repair',url:'parents-educators/05.html'},
    {id:'foundations/02',course:'foundations',courseTitle:'Foundations',title:'Observation',url:'foundations/02.html'},
    {id:'foundations/03',course:'foundations',courseTitle:'Foundations',title:'Person',url:'foundations/03.html'}
  ];
  const stored=new Map([
    ['anthro-study-v1:enabled',enabled?'yes':''],
    ['anthro-study-v1:parents-educators/05',JSON.stringify({en:{first:'English explanation',session3:'Review this'},pt:{first:'Explicação em português'},complete:true})],
    ['anthro-study-v1:foundations/02',JSON.stringify({en:{source:'<script>text only</script>'}})],
    ['anthro-study-v1:foundations/03','invalid old data']
  ]);
  const select=new Element(),container=new Element(),count=new Element(),button=new Element(),body=new Element(),downloads=[];
  const portfolio={querySelector:s=>({'select':select,'[data-notebook-entries]':container,'[data-notebook-count]':count,'[data-export-portfolio]':button})[s]};
  vm.runInNewContext(fs.readFileSync('docs/everyday-learning.js','utf8'),{
    document:{documentElement:{lang:lang==='pt'?'pt-BR':'en'},querySelectorAll:()=>[],querySelector:s=>s==='[data-learning-notebooks]'?portfolio:s==='#learning-catalog'?{textContent:JSON.stringify(entries)}:null,createElement:()=>new Element(),body},
    localStorage:{getItem:k=>stored.get(k)||null},window:{addEventListener(){}},
    location:{hash:'',search:'?course=parents-educators',href:'https://example.test/Anthroposophy/notebook.html'},
    URL:class extends URL{static createObjectURL(blob){downloads.push(blob);return 'blob:portfolio-test';}static revokeObjectURL(){}},URLSearchParams,Blob,setTimeout(){}
  });
  return {select,container,count,button,body,downloads};
}
const portfolio=portfolioSession();
assert.equal(portfolio.select.value,'parents-educators');
assert.equal(portfolio.container.children.length,1);
assert.match(portfolio.count.textContent,/1 saved lesson entry/);
portfolio.button.fire('click');
const portfolioExport=await portfolio.downloads[0].text();
assert.ok(portfolioExport.includes('English explanation')&&portfolioExport.includes('Review this'));
assert.ok(portfolioExport.includes('https://example.test/Anthroposophy/parents-educators/05.html'));
assert.ok(!portfolioExport.includes('Explicação em português')&&!portfolioExport.includes('text only'));
assert.equal(portfolio.body.children[0].download,'anthroposophy-parents-educators-en-portfolio.txt');
portfolio.select.value='foundations';portfolio.select.fire('change');
assert.equal(portfolio.container.children.length,1,'Ignore corrupted storage');
assert.ok(portfolio.container.children[0].children.some(e=>e.textContent==='<script>text only</script>'),'Render notebook text literally');
const portuguesePortfolio=portfolioSession('pt');portuguesePortfolio.button.fire('click');
assert.ok((await portuguesePortfolio.downloads[0].text()).includes('Explicação em português'));
assert.ok(!(await portuguesePortfolio.downloads[0].text()).includes('English explanation'));
const disabledPortfolio=portfolioSession('en',false);
assert.equal(disabledPortfolio.button.disabled,true);
assert.match(disabledPortfolio.count.textContent,/0 saved lesson entries/);
console.log('Passed: portfolio filtering, language separation, opt-in visibility, malformed storage, literal note rendering and export contents/filename.');
