/* Local discovery and a portfolio of explicitly saved study notes. */
(()=>{
  'use strict';
  const pt=document.documentElement.lang==='pt-BR',lang=pt?'pt':'en',t=(en,br)=>pt?br:en;
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
  function revealTarget(hash){
    if(!hash)return;let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return;}
    for(let node=target;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;
  }
  for(const link of document.querySelectorAll('.everyday-nav a'))link.addEventListener('click',()=>revealTarget(link.hash));
  window.addEventListener('hashchange',()=>revealTarget(location.hash));revealTarget(location.hash);
  const search=document.querySelector('#situation-search');
  if(search){
    const cards=[...document.querySelectorAll('[data-situation]')],count=document.querySelector('[data-finder-count]'),empty=document.querySelector('[data-finder-empty]');
    const filter=()=>{const words=normalize(search.value).trim().split(/\s+/).filter(Boolean);let visible=0;for(const card of cards){card.hidden=!words.every(w=>normalize(card.dataset.situation).includes(w));if(!card.hidden)visible++;}count.textContent=visible===1?t('1 situation','1 situação'):t(`${visible} situations`,`${visible} situações`);empty.hidden=visible>0;};
    search.addEventListener('input',filter);filter();
  }
  const portfolio=document.querySelector('[data-learning-notebooks]');if(!portfolio)return;
  const catalog=JSON.parse(document.querySelector('#learning-catalog').textContent);
  const select=portfolio.querySelector('select'),container=portfolio.querySelector('[data-notebook-entries]'),count=portfolio.querySelector('[data-notebook-count]'),button=portfolio.querySelector('[data-export-portfolio]');
  const labels={first:t('My explanation','Minha explicação'),source:t('Source and connection','Fonte e relação'),after:t('Revision and open question','Revisão e pergunta aberta'),session1:t('First occasion','Primeira ocasião'),session2:t('Another occasion','Outra ocasião'),session3:t('Review and next step','Revisão e próximo passo')};
  const requested=new URLSearchParams(location.search).get('course');if(catalog.some(e=>e.course===requested))select.value=requested;
  let shown=[];
  function collect(){
    let enabled=false;try{enabled=localStorage.getItem('anthro-study-v1:enabled')==='yes';}catch{}if(!enabled)return [];
    return catalog.filter(e=>!select.value||e.course===select.value).flatMap(e=>{
      let saved;try{saved=JSON.parse(localStorage.getItem('anthro-study-v1:'+e.id)||'null');}catch{return [];}
      if(!saved||typeof saved!=='object')return [];
      const notes=Object.fromEntries(Object.entries(saved[lang]||{}).filter(([key,value])=>Object.hasOwn(labels,key)&&typeof value==='string'&&value.trim()));
      return Object.keys(notes).length||saved.complete?[{...e,notes,complete:!!saved.complete}]:[];
    });
  }
  function render(){
    shown=collect();container.replaceChildren();button.disabled=!shown.length;
    const studied=shown.filter(e=>e.complete).length;
    count.textContent=t(`${shown.length} saved lesson ${shown.length===1?'entry':'entries'} · ${studied} marked studied`,`${shown.length} ${shown.length===1?'registro de lição salvo':'registros de lições salvos'} · ${studied} ${studied===1?'marcado como estudado':'marcados como estudados'}`);
    if(!shown.length){const p=document.createElement('p');p.textContent=t('No saved entries in this selection. Enable saving in a lesson and write a note, or choose another course.','Nenhum registro salvo nesta seleção. Ative o salvamento numa lição e escreva uma nota, ou escolha outro curso.');container.append(p);}
    for(const entry of shown){
      const detail=document.createElement('details');detail.className='notebook-entry';
      const summary=document.createElement('summary');summary.textContent=entry.courseTitle+' · '+entry.title+(entry.complete?' ✓':'');
      const link=document.createElement('a');link.href=entry.url;link.textContent=t('Return to lesson','Voltar à lição');detail.append(summary,link);
      for(const [key,label] of Object.entries(labels))if(entry.notes[key]){const heading=document.createElement('h3'),p=document.createElement('p');heading.textContent=label;p.textContent=entry.notes[key];detail.append(heading,p);}
      container.append(detail);
    }
  }
  select.addEventListener('change',render);window.addEventListener('pageshow',render);window.addEventListener('storage',render);render();
  button.addEventListener('click',()=>{
    const body=shown.map(e=>e.courseTitle+' · '+e.title+'\n'+new URL(e.url,location.href).href+'\n'+t('Studied: ','Estudada: ')+(e.complete?t('yes','sim'):t('no','não'))+'\n\n'+Object.entries(labels).filter(([k])=>e.notes[k]).map(([k,label])=>label+'\n'+e.notes[k]).join('\n\n')).join('\n\n---\n\n');
    const url=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`anthroposophy-${select.value||'all'}-${lang}-portfolio.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
})();
