import fs from 'node:fs';
import {inLanguage} from './foodwise-helpers.mjs';
import a from './phases-a.mjs';
import b from './phases-b.mjs';
const passages=JSON.parse(fs.readFileSync(new URL('./phases-passages.json',import.meta.url),'utf8'));
export const phasesTitle={en:'Phases: Understanding the Course of a Life',pt:'Fases: compreender o percurso de uma vida'};
export const phasesSources={
 nhs:['NHS · The male menopause','https://www.nhs.uk/conditions/male-menopause/'],
 relationships:['Royal College of Psychiatrists · Sexual orientation','https://www.rcpsych.ac.uk/docs/default-source/improving-care/better-mh-policy/position-statements/ps02_2014.pdf?sfvrsn=b39bd77c_4'],
 therapy:['NIMH · Psychotherapies','https://www.nimh.nih.gov/health/topics/psychotherapies']
};
export const phasesLessons=[...a,...b].map(({id,references=[],...v})=>({...passages.find(p=>p.id===id),speaker:'Bernard Lievegoed',lecture:passages[id].section,references,en:inLanguage(v,'en'),pt:inLanguage(v,'pt')}));
export const phasesChapters=[
 {ids:[0],en:['Begin here','The book’s central question','Read biography through events, responses and a possible recurring theme.'],pt:['Comece aqui','A pergunta central do livro','Leia a biografia por acontecimentos, respostas e um possível tema recorrente.']},
 {ids:[1,2],en:['Chapter 1','Surveying the Terrain','Distinguish growth from development, relate body, psyche and spirit, and learn why phase ages are approximate.'],pt:['Capítulo 1','Reconhecendo o terreno','Distinga crescimento de desenvolvimento, relacione corpo, vida psíquica e espírito e compreenda as idades aproximadas.']},
 {ids:[3,4,5,6,7,8,9,10],en:['Chapter 2','The Course of Life','Follow all eight sections: the life lines, adolescence, the twenties, organization, a crisis of values, the forties, the fifties and after 56.'],pt:['Capítulo 2','O curso da vida','Percorra as oito seções: linhas de vida, adolescência, vinte anos, organização, crise de valores, quarenta, cinquenta e depois dos 56.']},
 {ids:[11],en:['Chapter 3','Male and Female Development—Marriage','Study projection, mutual freedom and shared culture, with explicit context for the book’s dated gender and sexuality claims.'],pt:['Capítulo 3','Desenvolvimento masculino e feminino — casamento','Estude projeção, liberdade mútua e cultura compartilhada, contextualizando afirmações ultrapassadas sobre gênero e sexualidade.']},
 {ids:[12],en:['Chapter 4','Basic Life Orientations','Recognize six ways of contributing, their strengths and excesses, without assigning people to fixed types.'],pt:['Capítulo 4','Orientações básicas da vida','Reconheça seis formas de contribuir, suas forças e excessos, sem fixar pessoas em tipos.']},
 {ids:[13],en:['Chapter 5','Career Prospects and Personnel Policy','Connect lifelong learning, meaningful work, mentoring and organizational renewal.'],pt:['Capítulo 5','Perspectivas profissionais e política de pessoal','Relacione aprendizagem contínua, trabalho significativo, orientação e renovação organizacional.']},
 {ids:[14,15,16],en:['Chapter 6','Images of Man, Biography and Psychotherapy','Compare explanatory models, examine their therapeutic assumptions and protect freedom and privacy in helping relationships.'],pt:['Capítulo 6','Imagens do ser humano, biografia e psicoterapia','Compare modelos explicativos, examine pressupostos terapêuticos e proteja liberdade e privacidade nas relações de ajuda.']},
 {ids:[17],en:['Chapter 7','Personal Development and Biography','Explore attention, inner and outer paths, and freedom within an unfinished life situation.'],pt:['Capítulo 7','Desenvolvimento pessoal e biografia','Explore atenção, caminhos interior e exterior e liberdade numa situação de vida inacabada.']},
 {ids:[18],en:['Final project','Compose a biographical portfolio','Bring all seven chapters together with evidence, an alternative reading and a realistic next step.'],pt:['Projeto final','Componha um portfólio biográfico','Reúna os sete capítulos com evidência, leitura alternativa e próximo passo realista.']}
];
