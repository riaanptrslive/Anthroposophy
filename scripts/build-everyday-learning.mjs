import fs from 'node:fs';
import path from 'node:path';
import {courseContexts, foundationSituations, meditationSituations} from '../content/everyday-learning.mjs';
import {parentUnits} from '../content/parents-educators.mjs';
import {foundationCourse} from '../content/foundation-course.mjs';
import {meditationLessons} from '../content/meditation-course.mjs';
import {sessions as companionSessions} from '../content/biodynamics-companion.mjs';

const root = path.resolve('docs');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = h => String(h).replace(/<[^>]+>/g,' ').replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g,c=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&nbsp;':' '}[c])).replace(/\s+/g,' ').trim();
const paragraphs = h => [...h.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>text(m[1]));
const rel = (file,target) => path.relative(path.dirname(file),path.join(root,target)).replaceAll('\\','/');
const number = n => String(n).padStart(2,'0');
function element(h, pattern) {
  const m = typeof pattern === 'string' ? {index:h.indexOf(pattern),0:pattern} : pattern.exec(h);
  if(!m || m.index < 0) return '';
  const tag = m[0].match(/^<(\w+)/)[1];
  const tokens = new RegExp(`<\\/?${tag}\\b[^>]*>`,'g'); tokens.lastIndex=m.index;
  let depth=0;
  for(let token;(token=tokens.exec(h));){depth+=token[0].startsWith('</')?-1:1;if(depth===0)return h.slice(m.index,tokens.lastIndex);}
  throw Error('Unclosed '+tag);
}
function assets(h,file) {
  for(const name of ['guided-study.v1.css','everyday-learning.css']) if(!h.includes(name)) h=h.replace('</head>',`<link rel="stylesheet" href="${rel(file,name)}"></head>`);
  for(const name of ['guided-study.v1.js','everyday-learning.js']) if(!h.includes(name)) h=h.replace('</head>',`<script defer src="${rel(file,name)}"></script></head>`);
  return h.replace(/[ \t]+$/gm,'');
}
const labels = lang => {
  const pt=lang==='pt'; return {
    t:(en,br)=>pt?br:en, base:pt?'pt/':'',
    first:pt?'Minha explicação e sua razão':'My explanation and its reason',
    source:pt?'Fonte, referência e relação com a ideia':'Source, reference and connection',
    after:pt?'O que mudou e o que ainda preciso compreender':'What changed and what I still need to understand'
  };
};
function practiceJournal(lang) {
  const {t}=labels(lang);
  return `<details class="guided-practice everyday-practice"><summary>${t('Return to this practice over time','Retome esta prática ao longo do tempo')}</summary><p>${t('Use the activity above on separate occasions, or revisit its fictional situation. Include a date. An unchanged result is useful information too.','Use a atividade acima em ocasiões diferentes ou retome sua situação fictícia. Inclua a data. Um resultado que não mudou também é informação útil.')}</p>${[
    t('First occasion · situation, expectation and question','Primeira ocasião · situação, expectativa e pergunta'),
    t('Another occasion · action, response and what you learned','Outra ocasião · ação, resposta e o que aprendeu'),
    t('Review · compare, revise and choose a next step','Revisão · compare, reveja e escolha o próximo passo')
  ].map((label,i)=>`<label for="everyday-session-${i+1}">${label}</label><textarea class="study-note" id="everyday-session-${i+1}" data-note-field="session${i+1}" rows="3"></textarea>`).join('')}</details>`;
}
function notebook(lang, file, {reflection=false}={}) {
  const {t,base,first,source,after}=labels(lang);
  return `<section class="study-notebook everyday-notebook" id="learning-notebook"><h2>${t('Your learning notebook','Seu caderno de aprendizagem')}</h2><p>${t('Explain the idea, connect it to its source and revisit your response. A fictional example is welcome.','Explique a ideia, relacione-a à fonte e retome sua resposta. Você pode usar um exemplo fictício.')}</p>${reflection?'':`<label for="everyday-first">${first}</label><textarea class="study-note" id="everyday-first" data-note-field="first" rows="4"></textarea>`}<label for="everyday-source">${source}</label><textarea class="study-note" id="everyday-source" data-note-field="source" rows="3"></textarea><p data-first-preview></p><label for="everyday-after">${after}</label><textarea class="study-note" id="everyday-after" data-note-field="after" rows="4"></textarea>${practiceJournal(lang)}<label class="study-consent js-only"><input type="checkbox" data-save-notes> ${t('Save my notes and study marks on this device','Salvar minhas anotações e marcações neste dispositivo')}</label><p class="study-help">${t('Saving is optional and uses this browser on this device. Export a copy to keep elsewhere.','O salvamento é opcional e usa este navegador neste dispositivo. Exporte uma cópia para guardar em outro lugar.')}</p><p class="study-status" data-note-status role="status" aria-live="polite">${t('Notes stay in this page unless saving is enabled.','As anotações ficam nesta página enquanto o salvamento estiver desativado.')}</p><div class="study-actions js-only"><button type="button" class="study-button" data-complete aria-pressed="false">${t('Mark lesson studied','Marcar lição como estudada')}</button><button type="button" class="study-button" data-export>${t('Export notes','Exportar anotações')}</button><button type="button" class="study-button" data-delete>${t('Delete this lesson’s notes (both languages)','Excluir anotações desta lição (dois idiomas)')}</button></div><p><a href="${rel(file,base+'notebook.html')}">${t('Open my course notebooks','Abrir meus cadernos dos cursos')} →</a></p><noscript>${t('Use a paper notebook or copy your answers before leaving. The readings and explained answers work without JavaScript.','Use um caderno ou copie suas respostas antes de sair. As leituras e respostas comentadas funcionam sem JavaScript.')}</noscript></section>`;
}
function shell(file,lang,title,body,alternate) {
  const {t,base}=labels(lang);
  return assets(`<!doctype html><html lang="${lang==='pt'?'pt-BR':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · ${t('Anthroposophy','Antroposofia')}</title><meta name="description" content="${esc(title)}"><link rel="stylesheet" href="${rel(file,'site-watercolour.css')}">${alternate?`<link rel="alternate" hreflang="${lang==='pt'?'en':'pt-BR'}" href="${rel(file,alternate)}">`:''}</head><body><a class="skip" href="#main">${t('Skip to content','Pular para o conteúdo')}</a><header><a class="brand" href="${rel(file,base+'index.html')}">✳ ${t('Anthroposophy','Antroposofia')}</a><nav aria-label="${t('Language','Idioma')}"><a lang="en" href="${lang==='en'?path.basename(file):rel(file,alternate)}" ${lang==='en'?'aria-current="page"':''}>English</a><a lang="pt-BR" href="${lang==='pt'?path.basename(file):rel(file,alternate)}" ${lang==='pt'?'aria-current="page"':''}>Português</a></nav></header><main id="main" class="lesson-main">${body}</main><footer><a href="${rel(file,base+'index.html#courses')}">${t('All courses','Todos os cursos')}</a><a href="${rel(file,base+'notebook.html')}">${t('My notebook','Meu caderno')}</a></footer></body></html>`,file);
}

// Create the curated route before enhancing lesson pages.
for(const lang of ['en','pt']) {
  const {t,base}=labels(lang),other=lang==='en'?'pt/':'';
  const dir=path.join(root,base,'parents-educators');fs.mkdirSync(dir,{recursive:true});
  const title=t('Anthroposophy in everyday life','Antroposofia na vida cotidiana');
  for(const unit of parentUnits) {
    const v=unit[lang],file=path.join(dir,number(unit.id)+'.html');
    const body=`<p class="breadcrumb"><a href="index.html">← ${t('Parents and educators','Famílias e educadores')}</a></p><article><div class="eyebrow">${t('Unit','Unidade')} ${unit.id} / 8</div><h1>${esc(v.title)}</h1><p class="lead">${esc(v.goal)}</p><section class="everyday-settings"><h2>${t('At home','Em casa')}</h2><p>${esc(v.home)}</p><h2>${t('In a learning group','Num grupo de aprendizagem')}</h2><p>${esc(v.classroom)}</p></section><section id="explanation"><h2>${t('Understand the idea','Compreenda a ideia')}</h2>${v.concepts.map(p=>`<p>${esc(p)}</p>`).join('')}</section><section id="route-sources" class="source-note"><h2>${t('Read with the sources','Estude com as fontes')}</h2><p>${t('These original teaching applications connect the source explanations below. Open a reading for its author, passage and fuller context.','Estas aplicações originais relacionam as explicações das fontes abaixo. Abra uma leitura para encontrar autor, trecho e contexto completo.')}</p><ul>${unit.readings.map(([url,en,pt])=>`<li><a href="../${url}">${esc(t(en,pt))}</a></li>`).join('')}</ul></section><section class="practice"><h2>${t('Work with the idea','Trabalhe com a ideia')}</h2><p>${esc(v.practice)}</p></section><section><h2>${t('Check your understanding','Confira sua compreensão')}</h2><p>${esc(v.question)}</p><details class="guided-answer"><summary>${t('Compare with explained feedback','Compare com uma resposta comentada')}</summary><p>${esc(v.answer)}</p></details><h3>${t('When the situation changes','Quando a situação muda')}</h3><p>${esc(v.change)}</p><p>${esc(v.review)}</p></section></article><nav class="lesson-navigation" aria-label="${t('Unit navigation','Navegação das unidades')}"><a href="${unit.id===1?'index':number(unit.id-1)}.html">← ${t('Previous','Anterior')}</a><a href="index.html">${t('All eight units','As oito unidades')}</a><a href="${unit.id===8?'../notebook':number(unit.id+1)}.html">${unit.id===8?t('Review my notebook','Rever meu caderno'):t('Next unit','Próxima unidade')} →</a></nav>`;
    fs.writeFileSync(file,shell(file,lang,v.title,body,other+'parents-educators/'+number(unit.id)+'.html'));
  }
  const indexFile=path.join(dir,'index.html');
  const overview=`<div class="eyebrow">${t('Parents and educators · eight connected units','Famílias e educadores · oito unidades conectadas')}</div><h1>${title}</h1><p class="lead">${t('Understand and support children through observation, thoughtful guidance and the adult’s own development.','Compreenda e apoie as crianças pela observação, pela orientação refletida e pelo desenvolvimento do próprio adulto.')}</p><a class="button" href="01.html">${t('Begin with an everyday situation','Comece com uma situação cotidiana')} →</a><p>${t('The core examples concern early school-age children, roughly 7–12. This is a flexible route through existing teaching, with optional deeper reading and an adolescent extension. Allow two short study sessions per unit and return to a small practice on separate occasions; adjust the pace to your life.','Os exemplos centrais tratam de crianças em idade escolar, aproximadamente dos 7 aos 12 anos. O percurso conecta estudos existentes, com aprofundamentos opcionais e uma ampliação sobre adolescência. Reserve dois momentos curtos por unidade e retome uma pequena prática em ocasiões diferentes; adapte o ritmo à sua vida.')}</p><section><h2>${t('Understand → connect → practise → revisit','Compreenda → relacione → pratique → retome')}</h2><p>${t('Learn the concept before applying it. Distinguish the author’s account, the course adaptation and your observation. Keep one situation in your notebook and notice how your understanding develops. A fictional situation is sufficient.','Aprenda o conceito antes de aplicá-lo. Distinga a concepção do autor, a adaptação do curso e sua observação. Mantenha uma situação no caderno e perceba como sua compreensão se desenvolve. Uma situação fictícia é suficiente.')}</p></section><ol class="everyday-unit-list">${parentUnits.map(u=>`<li><a href="${number(u.id)}.html">${esc(u[lang].title)}</a><p>${esc(u[lang].goal)}</p></li>`).join('')}</ol><section class="source-note"><h2>${t('Keep growing your understanding','Continue aprofundando a compreensão')}</h2><p><a href="../foundations/01.html">${t('Study the foundations in order','Estude os fundamentos em sequência')}</a> · <a href="../index.html#courses">${t('Explore every course','Explore todos os cursos')}</a> · <a href="../notebook.html">${t('Review your portfolio','Reveja seu portfólio')}</a></p><p>${t('Judge progress by the clarity of your explanation, your source connection, the reasons for an action and what you reconsidered. Agreement with every claim and reports of spiritual attainment are not requirements.','Avalie o progresso pela clareza da explicação, pela relação com a fonte, pelas razões da ação e pelo que reconsiderou. Concordar com toda afirmação ou relatar realização espiritual não são requisitos.')}</p></section>`;
  fs.writeFileSync(indexFile,shell(indexFile,lang,title,overview,other+'parents-educators/index.html'));
}

const catalog=[];
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html')).map(f=>f.replaceAll('\\','/'));
for(const relative of files) {
  const lang=relative.startsWith('pt/')?'pt':'en',r=relative.replace(/^pt\//,''),file=path.join(root,relative);
  let course,id;
  if(/^lessons\/\d{2}\.html$/.test(r)){course='theosophy';id=Number(path.basename(r,'.html'));}
  else if(/^biodynamics\/companion\/session-\d{2}\.html$/.test(r)){course='biodynamics-companion';id=Number(path.basename(r,'.html').replace('session-',''));}
  else {const m=r.match(/^([^/]+)\/(?:lessons\/)?(\d{2})\.html$/);if(!m)continue;course=m[1];id=Number(m[2]);}
  if(!courseContexts[course]&&course!=='parents-educators')continue;
  let h=fs.readFileSync(file,'utf8');
  const {t,base}=labels(lang),title=text(h.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'');
  const identity=`${course}/${number(id)}`;
  const courseTitle=course==='parents-educators'?t('Parents and educators','Famílias e educadores'):courseContexts[course][lang][0];
  catalog.push({id:identity,course,courseTitle,lang,title,url:relative});
  if(h.includes('data-everyday-enhanced='))continue;
  const lead=h.match(/<p class="lead">[\s\S]*?<\/p>/)?.[0]||h.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0];
  if(!lead)throw Error('Missing lesson lead: '+relative);
  const worked=element(h,/<section\b[^>]*class="worked-example"[^>]*>/);
  let situation=paragraphs(worked)[0],question,answer;
  const foundation=course==='foundations'?foundationCourse.find(l=>l.id===id):null;
  const meditation=course==='meditation'?meditationLessons.find(l=>l.id===id):null;
  const companion=course==='biodynamics-companion'?companionSessions.find(l=>Number(l.id)===id):null;
  const unit=course==='parents-educators'?parentUnits.find(l=>l.id===id):null;
  if(foundation){situation=foundationSituations[id-1][lang==='pt'?1:0];question=foundation[lang][3];answer=foundation[lang][4];}
  else if(meditation){situation=meditationSituations[id][lang==='pt'?1:0];question=meditation[lang].check;answer=meditation[lang].answer;}
  else if(companion){situation=companion.example;question=companion.question;answer=companion.answer;}
  else if(unit){situation=unit[lang].home;question=unit[lang].question;answer=unit[lang].answer;}
  if(!question){
    const check=h.match(/<h2[^>]*>(?:Check your understanding|Confira sua compreensão|Check the connection|Confira a ligação|Confira a conexão)<\/h2>/);
    const section=check?h.slice(check.index):h;
    const detail=element(section,/<details>/);
    if(detail){const before=section.slice(0,section.indexOf(detail));question=[...before.matchAll(/<(?:p|h3)\b[^>]*>([\s\S]*?)<\/(?:p|h3)>/g)].map(m=>text(m[1])).at(-1);answer=paragraphs(detail).join(' ');}
  }
  if(!situation||!question||!answer)throw Error('Missing source-specific situation or feedback: '+relative);
  // The opening carries the scene; keep its fuller explanation later without repeating it.
  if(worked&&paragraphs(worked).length>1)h=h.replace(worked,worked.replace(/<p\b[^>]*>[\s\S]*?<\/p>/,'').replace(/<h2[^>]*>[\s\S]*?<\/h2>/,`<h2>${t('Work through the situation','Examine a situação')}</h2>`));
  if(unit){const settings=element(h,'<section class="everyday-settings">');h=h.replace(settings,settings.replace(/<h2>[\s\S]*?<\/h2><p>[\s\S]*?<\/p>/,''));}
  // Restore purposeful questions lost to the generic passage-study wrapper.
  const attempt=element(h,'<section class="study-attempt">');
  if(attempt){
    let revised=attempt.replace(/<h2\b[^>]*>[\s\S]*?<\/h2>/,`<h2 class="study-question">${esc(question)}</h2>`)
      .replace(/<p>\s*(?:Define the central concept in ordinary language|Defina o conceito central em linguagem comum)[\s\S]*?<\/p>/,'');
    const hint=element(revised,'<details class="guided-hint">');
    if(hint)revised=revised.replace(hint,`<details class="guided-hint"><summary>${t('A clue from the explanation','Uma pista da explicação')}</summary><p>${esc(answer.match(/^.*?[.!?](?:\s|$)/)?.[0]||answer)}</p></details>`);
    h=h.replace(attempt,revised);
  }
  h=h.replace(/<main\b([^>]*)>/,(m,a)=>`<main${a} data-everyday-enhanced="true"${a.includes('data-study-id=')?'':` data-study-id="${identity}"`}>`);
  // Give existing sections stable navigation targets without disturbing their source anchors.
  function anchor(pattern,name){
    const opening=pattern.exec(h);if(!opening)return null;
    const existing=opening[0].match(/\bid="([^"]+)"/);if(existing)return existing[1];
    h=h.replace(opening[0],opening[0].replace(/>$/,` id="${name}">`));return name;
  }
  const explanation=h.includes('id="study-explanation"')?'study-explanation':h.includes('id="explanation"')?'explanation':anchor(/<section\b[^>]*class="course-depth"[^>]*>/,'learning-explanation')||anchor(/<section\b[^>]*class="page-commentary"[^>]*>/,'learning-explanation');
  const source=h.includes('id="book-passage"')?'book-passage':h.includes('id="route-sources"')?'route-sources':anchor(/<(?:section|aside)\b[^>]*class="(?:foundation-source|source-note)"[^>]*>/,'learning-source');
  const practice=anchor(/<section\b[^>]*class="practice"[^>]*>/,'learning-practice')||anchor(/<section\b[^>]*id="understanding"[^>]*>/,'learning-practice');
  if(!explanation||!practice)throw Error('Missing teaching/practice navigation: '+relative);
  const hadNotebook=h.includes('data-note-field="first"');
  if(!hadNotebook){
    if(meditation){
      h=h.replace('<textarea id="reflection"','<textarea class="study-note" data-note-field="first" id="reflection"')
        .replace('Optional notes stay only in this open page. Download before leaving if you want to keep them.', 'Use the notebook controls below to save this reflection or export your work.')
        .replace('Notas opcionais ficam apenas nesta página aberta. Baixe antes de sair para guardá-las.', 'Use os controles do caderno abaixo para salvar esta reflexão ou exportar seu trabalho.');
    }
    const marker=h.includes('</article>')?'</article>':'<nav class="sequence"';
    const notes=notebook(lang,file,{reflection:!!meditation});
    if(h.includes(marker))h=h.replace(marker,notes+marker);else h=h.replace('</main>',notes+'</main>');
  }else{
    if(!h.includes('data-note-field="session1"')){
      const p=element(h,/<section\b[^>]*class="practice"[^>]*>/);
      h=h.replace(p,p.replace(/<\/section>$/,practiceJournal(lang)+'</section>'));
    }
    anchor(/<section\b[^>]*class="study-notebook"[^>]*>/,'learning-notebook');
    const notebookBlock=element(h,/<section\b[^>]*class="study-notebook"[^>]*>/);
    h=h.replace(notebookBlock,notebookBlock.replace(/<\/section>$/,`<p><a href="${rel(file,base+'notebook.html')}">${t('Review all my course notebooks','Rever todos os meus cadernos')} →</a></p></section>`));
  }
  const navigation=`<nav class="everyday-nav" aria-label="${t('This lesson','Nesta lição')}"><a href="#${explanation}">${t('Understand','Compreenda')}</a>${source?`<a href="#${source}">${t('Source','Fonte')}</a>`:''}<a href="#${practice}">${t('Practise','Pratique')}</a><a href="#learning-notebook">${t('Notebook','Caderno')}</a></nav>`;
  const intro=`<aside class="everyday-opening"><span class="eyebrow">${t('A situation to understand','Uma situação para compreender')}</span><p>${esc(situation)}</p><p class="everyday-direction">${t('Read the explanation, connect it to the source, then work with the situation.','Leia a explicação, relacione-a à fonte e depois trabalhe com a situação.')}</p></aside>${navigation}`;
  h=h.replace(lead,lead+intro);
  h=assets(h,file);
  fs.writeFileSync(file,h);
}

// Course-level applications and links make the same learning method visible everywhere.
for(const [course,context] of Object.entries(courseContexts))for(const lang of ['en','pt']){
  if(course==='biodynamics-companion'&&lang==='pt')continue;
  const {t,base}=labels(lang),route=course==='biodynamics-companion'?'biodynamics/companion':course;
  const file=path.join(root,base,route,'index.html');if(!fs.existsSync(file))throw Error('Missing course index '+file);
  let h=fs.readFileSync(file,'utf8').replace(/<!-- everyday-course:start -->[\s\S]*?<!-- everyday-course:end -->/g,'');
  const v=context[lang];
  const block=`<!-- everyday-course:start --><section class="everyday-course" id="everyday-course"><h2>${t('Bring this study into everyday life','Leve este estudo à vida cotidiana')}</h2><p class="everyday-purpose">${esc(v[1])}</p><div class="everyday-context-grid"><div><h3>${t('At home','Em casa')}</h3><p>${esc(v[2])}</p></div><div><h3>${t('As an educator','Como educador')}</h3><p>${esc(v[3])}</p></div></div><p>${t('These are original course applications. Learn the source concepts, use the lesson’s worked example, then revisit a practice across separate occasions. Keep the author’s account and what you observed distinct.','Estas são aplicações originais do curso. Estude os conceitos da fonte, use o exemplo da lição e retome uma prática em ocasiões diferentes. Distinga a concepção do autor daquilo que observou.')}</p><p><a href="${rel(file,base+'parents-educators/index.html')}">${t('Follow the parent and educator route','Siga o percurso para famílias e educadores')}</a> · <a href="${rel(file,base+'notebook.html')}?course=${course}">${t('My notebook for this course','Meu caderno deste curso')}</a></p></section><!-- everyday-course:end -->`;
  // Put the new overview after the start link where available, avoiding another preamble above it.
  const start=h.match(/<a class="button"[^>]*>[\s\S]*?<\/a>/);
  if(start)h=h.replace(start[0],start[0]+block);else h=h.replace(/(<p class="lead">[\s\S]*?<\/p>)/,'$1'+block);
  h=h.replace('These new companion pages do not save responses.','The lesson notebooks offer optional saving on this browser and export.');
  fs.writeFileSync(file,assets(h,file));
}

for(const lang of ['en','pt']){
  const {t,base}=labels(lang),file=path.join(root,base,'index.html');
  let h=fs.readFileSync(file,'utf8').replace(/<!-- everyday-finder:start -->[\s\S]*?<!-- everyday-finder:end -->/g,'');
  const intro=element(h,/<section class="intro\b[^>]*>/);
  const hero=`<section class="intro course-intro everyday-hero"><div><div class="eyebrow">${t('Anthroposophy for parents and educators','Antroposofia para famílias e educadores')}</div><h1 id="title">${t('Understand the child.<br>Grow through everyday life.','Compreenda a criança.<br>Desenvolva-se no cotidiano.')}</h1><p class="lead">${t('Explore Steiner’s ideas through real questions about learning, relationships and your own development. Begin with one situation and a clear next step.','Explore as ideias de Steiner pelas questões da aprendizagem, das relações e do seu desenvolvimento. Comece com uma situação e um próximo passo claro.')}</p><a class="button" href="parents-educators/01.html">${t('Start with an everyday situation','Comece com uma situação cotidiana')} →</a><p class="everyday-hero-links"><a href="parents-educators/index.html">${t('See the eight-unit route','Veja o percurso de oito unidades')}</a> · <a href="foundations/01.html">${t('Start the foundations','Comece os fundamentos')}</a> · <a href="notebook.html">${t('My notebook','Meu caderno')}</a></p></div></section>`;
  if(!intro)throw Error('Missing homepage introduction');h=h.replace(intro,hero);
  h=h.replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${t('Anthroposophy for parents and educators: everyday situations, eight connected units, eighteen foundations and fourteen bilingual courses.','Antroposofia para famílias e educadores: situações cotidianas, oito unidades conectadas, dezoito fundamentos e quatorze cursos bilíngues.')}">`);
  const finder=`<!-- everyday-finder:start --><section class="everyday-finder" id="find-a-situation"><h2>${t('What would you like to understand?','O que você gostaria de compreender?')}</h2><label class="js-only" for="situation-search">${t('Find a situation or topic','Encontre uma situação ou tema')}</label><input class="js-only" id="situation-search" type="search" placeholder="${t('Try rhythm, learning, repair or freedom','Experimente ritmo, aprendizagem, reparação ou liberdade')}"><p class="js-only" data-finder-count role="status" aria-live="polite"></p><div class="everyday-finder-grid">${parentUnits.map(u=>`<a class="everyday-choice" href="parents-educators/${number(u.id)}.html" data-situation="${esc([u[lang].title,u[lang].goal,u[lang].home,u[lang].classroom].join(' '))}"><strong>${esc(u[lang].title)}</strong><span>${esc(u[lang].goal)}</span></a>`).join('')}</div><p data-finder-empty hidden>${t('No matching situations. Try a broader word or browse all courses below.','Nenhuma situação encontrada. Tente uma palavra mais ampla ou explore os cursos abaixo.')}</p></section><!-- everyday-finder:end -->`;
  h=h.replace(hero,hero+finder);
  const rhythm=h.match(/<h3>(?:A rhythm for each lesson|Um ritmo para cada lição)<\/h3>[\s\S]*?<\/ol>/);
  if(rhythm)h=h.replace(rhythm[0],`<h3>${t('A rhythm for each lesson','Um ritmo para cada lição')}</h3><ol><li>${t('Recognize the situation and understand the concept.','Reconheça a situação e compreenda o conceito.')}</li><li>${t('Connect the explanation with the attributed source.','Relacione a explicação à fonte identificada.')}</li><li>${t('Work through an example and explain your response.','Trabalhe com um exemplo e explique sua resposta.')}</li><li>${t('Practise, revisit and record what changed. Meditation keeps its verse-led sequence.','Pratique, retome e registre o que mudou. A meditação mantém a sequência orientada pelo verso.')}</li></ol>`);
  fs.writeFileSync(file,assets(h,file));

  const journalFile=path.join(root,base,'notebook.html');
  const entries=catalog.filter(e=>e.lang===lang),courses=[...new Map(entries.map(e=>[e.course,e.courseTitle])).entries()];
  const body=`<h1>${t('My learning notebooks','Meus cadernos de aprendizagem')}</h1><p class="lead">${t('Return to your explanations, practice records and revisions across every course.','Retome explicações, registros de prática e revisões de todos os cursos.')}</p><p>${t('Notes appear here after you enable saving in a lesson. They stay in this browser on this device. Export your work to keep a separate copy. English and Portuguese notes remain separate; study marks are shared.','As anotações aparecem aqui quando você ativa o salvamento numa lição. Elas ficam neste navegador e dispositivo. Exporte para guardar uma cópia separada. As notas em inglês e português ficam separadas; a marcação de estudo é compartilhada.')}</p><div data-learning-notebooks><label for="notebook-course">${t('Course','Curso')}</label><select id="notebook-course"><option value="">${t('All courses','Todos os cursos')}</option>${courses.map(([id,title])=>`<option value="${id}">${esc(title)}</option>`).join('')}</select><p role="status" aria-live="polite" data-notebook-count></p><button class="study-button js-only" type="button" data-export-portfolio>${t('Export this portfolio','Exportar este portfólio')}</button><div data-notebook-entries></div></div><noscript>${t('Open a lesson and use a paper notebook. Viewing saved browser notes requires JavaScript.','Abra uma lição e use um caderno. Consultar as notas salvas no navegador requer JavaScript.')}</noscript><script type="application/json" id="learning-catalog">${JSON.stringify(entries.map(e=>({...e,url:rel(journalFile,e.url)}))).replaceAll('<','\\u003c')}</script>`;
  fs.writeFileSync(journalFile,shell(journalFile,lang,t('My learning notebooks','Meus cadernos de aprendizagem'),body,(lang==='en'?'pt/':'')+'notebook.html'));
}
fs.writeFileSync('content/everyday-learning-coverage.json',JSON.stringify({lessons:catalog.length,courses:[...new Set(catalog.map(e=>e.course))],entries:catalog},null,2)+'\n');
console.log(`Everyday learning: ${catalog.length} lessons across ${new Set(catalog.map(e=>e.course)).size} course paths; eight bilingual parent/educator units, course notebooks and a situation finder.`);
