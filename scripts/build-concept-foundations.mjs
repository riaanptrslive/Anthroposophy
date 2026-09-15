import fs from 'node:fs';
import path from 'node:path';
import {foundations,renderFoundations} from '../content/concept-foundations.mjs';

function element(html,marker) {
 const start=html.indexOf(marker); if(start<0) return '';
 const tag=marker.match(/^<(\w+)/)[1],tokens=new RegExp(`<\\/?${tag}\\b[^>]*>`,'g');
 tokens.lastIndex=start; let depth=0;
 for(let m;(m=tokens.exec(html));){depth+=m[0].startsWith('</')?-1:1;if(!depth)return html.slice(start,tokens.lastIndex);}
 throw Error('Unclosed teaching section');
}
let count=0;
const originals=new Map(fs.readdirSync('docs',{recursive:true}).filter(f=>f.endsWith('.html')).map(f=>[f.replaceAll('\\','/'),fs.readFileSync(path.join('docs',f),'utf8')]));
for(const relative of fs.readdirSync('docs',{recursive:true}).filter(f=>f.endsWith('.html'))){
 const file=path.join('docs',relative),route=relative.replaceAll('\\','/');
 if(route==='learning-review.html')continue;
 let h=fs.readFileSync(file,'utf8');
 const pt=h.includes('<html lang="pt-BR"'),lang=pt?'pt':'en',v=foundations[lang],base=pt?'docs/pt':'docs';
 const url=path.relative(path.dirname(file),`${base}/reference/human-constitution.html`).replaceAll('\\','/');
 const t=(en,br)=>pt?br:en;
 if(route.endsWith('reference/human-constitution.html')){
  h=h.replace('<nav class="constitution-jumps"',renderFoundations(lang)+'<nav class="constitution-jumps"');
 }else if(h.includes('class="lesson-main"')){
  // Optional source companions also teach before requesting a first response.
  if(!h.includes('data-passage-study=')){
   const core=element(h,'<details class="guided-reveal"');
   if(core){h=h.replace(core,'');h=h.replace(/(<p class="lead">[\s\S]*?<\/p>)/,'$1'+core.replace('<details class="guided-reveal"','<details class="guided-reveal" open'));}
  }
  // Look at authored prose, not navigation, URLs, form fields or script text.
  const partner=originals.get(pt?route.slice(3):'pt/'+route)||'';
  const authored=h+' '+partner;
  const prose=[...authored.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].map(m=>m[1]).join(' ')
   .replace(/<(script|style|textarea|nav)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<[^>]*>/g,' ');
  const three=/threefold|three.fold|body,? soul|body–soul|tríplice|trimembra|corpo,? alma|corpo–alma/i.test(prose);
  const four=/fourfold|four.fold|etheric|ether body|astral|quádrupl|quadrimembra|etéric/i.test(prose);
  const activities=/thinking, feeling|thinking–feeling|pensar, sentir|pensar–sentir/i.test(prose);
  const blocks=[];
  if(three)blocks.push([v.sections[0].title.slice(3),[v.sections[0].paragraphs[0],...v.sections[0].paragraphs.slice(1,4)],'threefold-human-being']);
  if(activities)blocks.push([v.sections[1].title.slice(3),[v.sections[1].paragraphs[0],v.sections[1].paragraphs[2]],'thinking-feeling-willing']);
  if(four)blocks.push([v.sections[2].title.slice(3),v.sections[2].paragraphs.slice(0,5),'fourfold-human-being']);
  for(const block of blocks){
   const reminders={
    'threefold-human-being':t('Body concerns embodied contact with the world; soul, personal inward experience; spirit, the recognition of meaning and truth in Steiner’s account. These are aspects of one encounter.','Corpo diz respeito ao contato corporal com o mundo; alma, à experiência interior pessoal; espírito, ao reconhecimento de significado e verdade na concepção de Steiner. São aspectos de um encontro.'),
    'thinking-feeling-willing':t('Thinking connects meanings; feeling is how an experience matters inwardly; willing moves toward action. These activities cooperate and are not interchangeable with body, soul and spirit.','Pensar relaciona significados; sentir é como uma experiência importa interiormente; querer se dirige à ação. As atividades cooperam e não são intercambiáveis com corpo, alma e espírito.'),
    'fourfold-human-being':t('Physical names material existence; etheric, Steiner’s proposed living formative organization; astral, the organization of inward experience; I, spiritual individuality. They answer different questions about one human being.','Físico nomeia a existência material; etérico, a organização formativa viva proposta por Steiner; astral, a organização da experiência interior; Eu, a individualidade espiritual. Respondem a perguntas diferentes sobre um ser humano.')
   };
   block[1]=[reminders[block[2]]];
  }
  if(blocks.length){
   const primer=`<section class="concept-primer" id="concept-primer"><div class="eyebrow">${t('First · Learn the concepts','Primeiro · Aprenda os conceitos')}</div><h2>${t('A brief foundation reminder','Uma breve retomada dos fundamentos')}</h2><p>${t('Read these definitions before the chapter explanation. If the terms are familiar, continue to the lesson below.','Leia estas definições antes da explicação do capítulo. Se os termos já forem familiares, continue na lição abaixo.')}</p>${blocks.map(([title,paragraphs,anchor])=>`<h3>${title}</h3>${paragraphs.map(p=>`<p>${p}</p>`).join('')}<p><a href="${url}#${anchor}">${t('Follow the full explanation and example','Acompanhe a explicação completa e o exemplo')} →</a></p>`).join('')}${three&&four?`<p><strong>${t('Why the numbers differ','Por que os números diferem')}:</strong> ${v.sections[3].paragraphs[0]}</p>`:''}<p><a href="#${h.includes('id="study-explanation"')?'study-explanation':'book-passage'}">${t('Continue to this lesson','Continue nesta lição')} →</a></p></section>`;
   h=h.replace(/(<p class="lead">[\s\S]*?<\/p>)/,'$1'+primer);count++;
  }
 }else if(route.endsWith('index.html')){
  const start=path.relative(path.dirname(file),`${base}/lessons/01.html`).replaceAll('\\','/');
  const entry=`<section class="foundation-route" id="foundation-route"><div class="eyebrow">${t('Start with understanding','Comece pela compreensão')}</div><h2>${t('Learn the ideas before applying them','Aprenda as ideias antes de aplicá-las')}</h2><p>${t('Begin with what body, soul and spirit mean. Then distinguish thinking, feeling and willing. Only after that, study why Steiner introduces physical, living, experiencing and individual aspects of the human being.','Comece pelo significado de corpo, alma e espírito. Depois, distinga pensar, sentir e querer. Só então estude por que Steiner introduz aspectos físicos, vivos, sencientes e individuais do ser humano.')}</p><ol><li><a href="${url}#threefold-human-being">${t('Body, soul and spirit: the threefold account','Corpo, alma e espírito: a descrição tríplice')}</a></li><li><a href="${url}#thinking-feeling-willing">${t('Thinking, feeling and willing: three activities','Pensar, sentir e querer: três atividades')}</a></li><li><a href="${url}#fourfold-human-being">${t('The fourfold account: understand each member','A descrição quádrupla: compreenda cada membro')}</a></li><li><a href="${url}#compare-models">${t('Compare the accounts and explain the difference','Compare as descrições e explique a diferença')}</a></li></ol><p><a href="${start}">${t('Begin the foundational Theosophy lessons','Comece as lições de fundamentos de Teosofia')} →</a></p></section>`;
  h=h.replace(/(<p class="lead">[\s\S]*?<\/p>)/,'$1'+entry);
 }
 h=h.replaceAll('Begin with the book','Read the source with the concepts in mind').replaceAll('Comece pelo livro','Leia a fonte à luz dos conceitos')
  .replaceAll('1 · Read the passage','Read · Connect the theory to the source').replaceAll('1 · Leia o trecho','Leia · Relacione a teoria à fonte')
  .replaceAll('Read → understand → explain → apply. The chapter explanation is open from the start.','Understand the concepts → follow the explanation → read the source → explain → apply.')
  .replaceAll('Leia → compreenda → explique → aplique. A explicação do capítulo está aberta desde o início.','Compreenda os conceitos → acompanhe a explicação → leia a fonte → explique → aplique.')
  .replaceAll('Try → explore → read → revise. You can open the explanation whenever you need it.','Read the explanation first, then use the example and questions to develop your understanding.')
  .replaceAll('Tente → explore → leia → revise. Abra a explicação quando precisar.','Leia primeiro a explicação; depois use o exemplo e as perguntas para desenvolver sua compreensão.')
  .replaceAll('Every lesson starts with a selected source passage and explains its meaning and place in the chapter. Read the core ideas, then use the example and questions to check your understanding.','Learn the concepts and follow the chapter explanation before interpreting the source passage. Then use the example and questions to explain the reasoning in your own words. Meditation sessions retain their verse-led practice sequence, with relevant concepts explained first.')
  .replaceAll('Cada lição começa com um trecho selecionado da fonte e explica seu significado e lugar no capítulo. Leia as ideias centrais; depois use o exemplo e as perguntas para conferir a compreensão.','Aprenda os conceitos e acompanhe a explicação do capítulo antes de interpretar o trecho da fonte. Depois use o exemplo e as perguntas para explicar o raciocínio com suas palavras. As sessões de meditação mantêm a prática orientada por versos, com os conceitos pertinentes explicados antes.');
 if(/concept-primer|foundation-route|concept-foundations/.test(h)&&!h.includes('concept-foundations.css')){
  const css=path.relative(path.dirname(file),'docs/concept-foundations.css').replaceAll('\\','/');
  h=h.replace('</head>',`<link rel="stylesheet" href="${css}"></head>`);
 }
 fs.writeFileSync(file,h);
}
console.log(`Concepts before use: ${count} bilingual lesson primers, course entry routes and full foundation teaching.`);
