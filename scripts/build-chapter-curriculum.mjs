import fs from 'node:fs';
import path from 'node:path';
import {coursePlans} from './chapter-curriculum-data.mjs';

const root=path.resolve('docs');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rel=(file,url)=>path.relative(path.dirname(file),path.join(root,url)).replaceAll('\\','/');
const element=(h,pattern)=>{
  const match=pattern.exec(h);if(!match)return '';
  const tag=match[0].match(/^<(\w+)/)[1],tokens=new RegExp(`<\\/?${tag}\\b[^>]*>`,'g');tokens.lastIndex=match.index;let depth=0;
  for(let token;(token=tokens.exec(h));){depth+=token[0].startsWith('</')?-1:1;if(!depth)return h.slice(match.index,tokens.lastIndex);}
  throw Error('Unclosed '+tag);
};
const studyPage=review=>'study/'+(review.startsWith('knowledge-base/')?review.slice(15):'reference--'+review.replaceAll('/','--')).replace(/\.md$/,'.html');
const assets=(h,file)=>h.includes('chapter-curriculum.css')?h:h.replace('</head>',`<link rel="stylesheet" href="${rel(file,'chapter-curriculum.css')}"></head>`);
const kindLabels={chapter:['Chapter','Capítulo'],lecture:['Lecture','Palestra'],discussion:['Source discussion','Discussão da fonte'],section:['Book section','Seção do livro'],appendix:['Appendix','Apêndice'],opening:['Opening material','Material de abertura'],synthesis:['Course synthesis','Síntese do curso'],conclusion:['Book conclusion','Conclusão do livro'],'selected-study':['Selected source study','Estudo de fontes selecionadas'],application:['Source-based application','Aplicação fundamentada nas fontes']};
let pages=0;
const coverage=[];
for(const plan of coursePlans)for(const lang of plan.langs){
  const pt=lang==='pt',base=pt?'pt/':'',t=(en,br)=>pt?br:en,indexFile=path.join(root,base+plan.index);
  const firstStudy=plan.groups.find(g=>!['opening','synthesis'].includes(g.kind))||plan.groups[0];
  const outline=plan.groups.map(g=>{
    const name=g.title[lang],kind=kindLabels[g.kind]?.[pt?1:0]||g.kind;
    const optional=g.ids.filter(id=>plan.items.find(item=>item.id===id).optional).length;
    const count=optional?t(`${g.ids.length-optional} core + ${optional} optional`,`${g.ids.length-optional} principal + ${optional} opcional`):`${g.ids.length} ${t(g.ids.length===1?'lesson':'lessons',g.ids.length===1?'lição':'lições')}`;
    // The core chapter lesson comes before any supporting practice, even where
    // the older lesson-number sequence places the practice first.
    const ordered=[...g.ids].sort((a,b)=>Number(plan.items.find(l=>l.id===a).optional)-Number(plan.items.find(l=>l.id===b).optional));
    return `<details class="chapter-unit" id="source-chapter-${esc(g.key)}"${g===firstStudy?' open':''}><summary><span class="chapter-kind">${esc(kind)}</span><strong>${esc(name)}</strong><span>${count}</span></summary><ol>${ordered.map(id=>{const l=plan.items.find(item=>item.id===id),v=l[lang];return `<li data-concept-lesson="${id}"${l.optional?' data-optional-practice':''}>${l.optional?`<p class="chapter-reading"><strong>${t('Optional supporting practice','Prática complementar opcional')}</strong></p>`:''}<p class="chapter-concepts">${l.focus[lang].map(esc).join(' · ')}</p><h3><a href="${rel(indexFile,base+l.url)}">${esc(v.title)}</a></h3><p>${esc(v.goal)}</p>${v.reading?`<p class="chapter-reading">${t('Reading','Leitura')}: ${esc(v.reading)}</p>`:''}</li>`;}).join('')}</ol></details>`;
  }).join('');
  const explanation=plan.type==='book'?t('Follow the book’s chapters or lectures. Each source unit identifies the concepts to learn and the lessons that develop them. Read the conceptual teaching and its source before working with an everyday example.','Siga os capítulos ou palestras do livro. Cada unidade da fonte identifica os conceitos a aprender e as lições que os desenvolvem. Estude a explicação conceitual e sua fonte antes de trabalhar com um exemplo cotidiano.'):t('This is a selected learning route, rather than a separate book. The source connections below show where its concepts come from; follow the linked book courses for their complete sequence.','Este é um percurso de estudos selecionados, não um livro separado. As relações abaixo mostram de onde vêm seus conceitos; siga os cursos dos livros indicados para estudar a sequência completa.');
  const sourceLinks=plan.review?`<p><a href="${rel(indexFile,studyPage(plan.review))}">${t('Chapter analysis and source references (English)','Análise dos capítulos e referências das fontes (em inglês)')}</a></p>`:'';
  const curriculum=`<!-- chapter-curriculum:start --><section class="chapter-curriculum" id="chapter-curriculum" data-curriculum-course="${plan.course}"><div class="eyebrow">${t('Source → concepts → lessons → application','Fonte → conceitos → lições → aplicação')}</div><h2>${t('How this course follows its sources','Como este curso acompanha suas fontes')}</h2><p>${explanation}</p>${sourceLinks}${plan.witness?`<details class="chapter-source-status"><summary>${t('About the edition and source coverage','Sobre a edição e a cobertura das fontes')}</summary><p>${esc(plan.book)} · ${esc(plan.author)}</p><p lang="en">${esc(plan.witness)}</p><p>${t('This curriculum uses the existing chapter analyses. It does not certify a new complete reading or fill a missing source with a different edition without attribution.','Este currículo utiliza as análises existentes dos capítulos. Não certifica uma nova leitura integral nem substitui silenciosamente uma fonte ausente por outra edição.')}</p></details>`:''}<div class="chapter-units">${outline}</div></section><!-- chapter-curriculum:end -->`;
  let index=fs.readFileSync(indexFile,'utf8').replace(/<!-- chapter-curriculum:start -->[\s\S]*?<!-- chapter-curriculum:end -->/g,'');
  // Keep the established index for old anchors and course-journal bindings.
  // Readers first see the source/concept outline, not two competing open lists.
  const list=element(index,/<section\b[^>]*id="(?:lessons|sessions)"[^>]*>/);
  const oldWrapper=element(index,/<details class="chapter-legacy-index">/);
  if(oldWrapper)index=index.replace(oldWrapper,list);
  if(list)index=index.replace(list,`<details class="chapter-legacy-index"><summary>${t('Full lesson list','Lista completa de lições')}</summary>${list}</details>`);
  const everyday=index.match(/<!-- everyday-course:start -->[\s\S]*?<!-- everyday-course:end -->/)?.[0];
  if(everyday)index=index.replace(everyday,'');
  const intro=element(index,/<section\b[^>]*class="intro\b[^>]*>/);
  const preparation=element(index,/<section\b[^>]*class="foundation-route\b[^>]*>/);
  if(intro)index=index.replace(intro,/<h1\b/.test(intro)?intro+curriculum:curriculum+intro);
  else if(preparation)index=index.replace(preparation,curriculum+preparation);
  else if(list)index=index.replace('<details class="chapter-legacy-index">',curriculum+'<details class="chapter-legacy-index">');
  else index=index.replace('</main>',curriculum+'</main>');
  if(everyday)index=index.replace('</main>',everyday+'</main>');
  fs.writeFileSync(indexFile,assets(index,indexFile));

  for(const item of plan.items){
    const file=path.join(root,base+item.url),group=plan.groups.find(g=>g.key===item.group);
    let h=fs.readFileSync(file,'utf8').replace(/<!-- chapter-focus:start -->[\s\S]*?<!-- chapter-focus:end -->/g,'');
    const nav=element(h,/<nav class="everyday-nav"[^>]*>/),target=nav.match(/href="#([^"]+)"/)?.[1];
    if(!target)throw Error('No concept-teaching navigation '+file);
    const sources=item.sources?.map(s=>`<a href="${esc(/^https?:/.test(s.url)?s.url:rel(file,base+s.url))}">${esc(pt?s.pt||s.label:s.label)}</a>`).join(' · ');
    const focus=`<!-- chapter-focus:start --><section class="chapter-focus" id="chapter-focus" data-source-unit="${esc(group.key)}"><p class="chapter-location"><a href="${rel(file,base+plan.index)}#source-chapter-${esc(group.key)}">${esc(group.title[lang])}</a></p><h2>${t('Concepts developed in this lesson','Conceitos desenvolvidos nesta lição')}</h2><ul>${item.focus[lang].map(c=>`<li>${esc(c)}</li>`).join('')}</ul>${sources?`<p class="chapter-reading">${t('Source lessons','Lições das fontes')}: ${sources}</p>`:''}<p class="chapter-method">${t('Understand these ideas in their source context, then explain how the example relates to them.','Compreenda estas ideias no contexto da fonte; depois explique como o exemplo se relaciona com elas.')}</p></section><!-- chapter-focus:end -->`;
    const lead=h.match(/<p class="lead">[\s\S]*?<\/p>/)?.[0];
    if(!lead)throw Error('Missing lesson goal '+file);
    h=h.replace(lead,lead+focus);
    const everydayOpening=element(h,/<aside class="everyday-opening">/);
    if(!everydayOpening)throw Error('Missing everyday application '+file);
    h=h.replace(everydayOpening,'');
    const application=everydayOpening.replace(/<span class="eyebrow">[\s\S]*?<\/span>/,`<span class="eyebrow">${t('Apply the chapter’s concepts','Aplique os conceitos estudados')}</span>`).replace(/<p class="everyday-direction">[\s\S]*?<\/p>/,`<p class="everyday-direction">${t('Which of the concepts above helps explain this situation? Keep the illustration distinct from the author’s wider claims.','Qual dos conceitos acima ajuda a explicar esta situação? Distinga a ilustração das afirmações mais amplas do autor.')}</p>`);
    const insertion=/<section\b[^>]*(?:class="worked-example"|id="teaching-example"|class="practice"|id="understanding")[^>]*>/.exec(h);
    if(!insertion)throw Error('No application point '+file);
    h=h.slice(0,insertion.index)+application+h.slice(insertion.index);
    // Mark the source relationship without changing saved-note identities.
    h=h.replace(/ data-curriculum-course="[^"]*"/g,'').replace(/<main\b/,`<main data-curriculum-course="${plan.course}"`);
    if(plan.course==='theosophy')h=h.replace(/href="\.\.\/(?:index\.html)?#lessons"/g,'href="../theosophy/index.html#chapter-curriculum"');
    fs.writeFileSync(file,assets(h,file));pages++;
    coverage.push({course:plan.course,lang,url:base+item.url,sourceUnit:group.key,sourceTitle:group.title[lang],kind:group.kind,concepts:item.focus[lang],goal:item[lang].goal,review:plan.review||null});
  }
}

// The homepage's primary start now leads into a book; applications remain available.
for(const lang of ['en','pt']){
  const pt=lang==='pt',base=pt?'pt/':'',t=(en,br)=>pt?br:en,file=path.join(root,base+'index.html');let h=fs.readFileSync(file,'utf8');
  const hero=element(h,/<section class="intro course-intro everyday-hero">/);
  if(!hero)throw Error('Missing home introduction');
  const revised=`<section class="intro course-intro everyday-hero"><div><div class="eyebrow">${t('Anthroposophy · understand the books, apply the ideas','Antroposofia · compreenda os livros, aplique as ideias')}</div><h1 id="title">${t('Understand the ideas.<br>Bring them into everyday life.','Compreenda as ideias.<br>Leve-as à vida cotidiana.')}</h1><p class="lead">${t('Begin with the book’s chapters, learn their key concepts, then work through lessons and practical applications for parents and educators.','Comece pelos capítulos do livro, aprenda seus conceitos-chave e avance pelas lições e aplicações práticas para famílias e educadores.')}</p><a class="button" href="theosophy/index.html#chapter-curriculum">${t('Start with Theosophy: chapters and concepts','Comece por Teosofia: capítulos e conceitos')} →</a><p class="everyday-hero-links"><a href="#courses">${t('Explore the book courses','Explore os cursos dos livros')}</a> · <a href="foundations/01.html">${t('Prepare with the foundations','Prepare-se com os fundamentos')}</a> · <a href="parents-educators/index.html">${t('Parent and educator applications','Aplicações para famílias e educadores')}</a> · <a href="notebook.html">${t('My notebook','Meu caderno')}</a></p></div></section>`;
  h=h.replace(hero,revised);
  const finder=h.match(/<!-- everyday-finder:start -->[\s\S]*?<!-- everyday-finder:end -->/)?.[0];
  if(finder){h=h.replace(finder,'');h=h.includes('<!-- study-library:start -->')?h.replace('<!-- study-library:start -->',finder+'<!-- study-library:start -->'):h.replace('</main>',finder+'</main>');}
  const rhythm=h.match(/<h3>(?:A rhythm for each lesson|Um ritmo para cada lição)<\/h3>[\s\S]*?<\/ol>/)?.[0];
  if(rhythm)h=h.replace(rhythm,`<h3>${t('A rhythm for each lesson','Um ritmo para cada lição')}</h3><ol><li>${t('Locate the chapter and its question.','Localize o capítulo e sua pergunta.')}</li><li>${t('Learn the concepts and follow the author’s explanation.','Aprenda os conceitos e acompanhe a explicação do autor.')}</li><li>${t('Read the source and check your understanding.','Leia a fonte e confira sua compreensão.')}</li><li>${t('Apply the ideas, revisit the result and revise your explanation.','Aplique as ideias, retome o resultado e revise sua explicação.')}</li></ol>`);
  fs.writeFileSync(file,assets(h,file).replace(/[ \t]+$/gm,''));
}
fs.writeFileSync('content/chapter-curriculum-coverage.json',JSON.stringify({scope:'Chapter/section-to-concept-to-lesson alignment using existing source analyses; not a new full-source reading certification.',courses:coursePlans.map(p=>({id:p.course,type:p.type,source:p.book,groups:p.groups.length,lessons:p.items.length,review:p.review||null})),pages,entries:coverage},null,2)+'\n');
console.log(`Chapter curricula: ${pages} lesson pages across ${coursePlans.length} study paths; source concepts precede everyday applications.`);
