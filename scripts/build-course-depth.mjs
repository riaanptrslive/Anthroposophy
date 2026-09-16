import fs from 'node:fs';
import {foodwiseDepth} from '../content/depth/foodwise.mjs';
import {nutritionDepth} from '../content/depth/nutrition.mjs';
import {biodynamicsDepth} from '../content/depth/biodynamics.mjs';
import {phasesDepth} from '../content/depth/phases.mjs';
import {humanDepth} from '../content/depth/human.mjs';
import {freedomDepth,practicalDepth} from '../content/depth/thinking.mjs';
import {higherDepth,meditationDepth} from '../content/depth/inner-life.mjs';
import {temperamentDepth,selfDepth} from '../content/depth/people.mjs';
import {colourDepth,mythDepth,lukeDepth} from '../content/depth/arts-and-myth.mjs';
export const courseDepth={foodwise:foodwiseDepth,nutrition:nutritionDepth,biodynamics:biodynamicsDepth,phases:phasesDepth,...humanDepth,'philosophy-of-freedom':freedomDepth,'practical-thinking':practicalDepth,'higher-worlds':higherDepth,meditation:meditationDepth,...temperamentDepth,'encountering-the-self':selfDepth,colour:colourDepth,'ancient-myths':mythDepth,'according-to-luke':lukeDepth};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function buildCourseDepth(){
 let pages=0;
 for(const [course,units] of Object.entries(courseDepth)){
  const seen=new Set();
  for(const unit of units)for(const id of unit.ids){
   if(seen.has(id))throw Error(`Duplicate depth lesson: ${course}/${id}`);
   seen.add(id);
   for(const lang of ['en','pt']){
    const route=course==='theosophy'?'lessons':course==='foundations'||course==='meditation'?course:`${course}/lessons`;
    const file=`docs/${lang==='pt'?'pt/':''}${route}/${String(id).padStart(2,'0')}.html`;
    let h=fs.readFileSync(file,'utf8').replace(/<!-- course-depth:start -->[\s\S]*?<!-- course-depth:end -->/g,'');
    const [title,...paragraphs]=unit[lang];
    if(!title||paragraphs.length<2)throw Error(`Incomplete depth lesson: ${course}/${id}/${lang}`);
    const section=`<!-- course-depth:start --><section class="course-depth" id="deeper-explanation" aria-labelledby="deeper-explanation-title"><h2 id="deeper-explanation-title">${esc(title)}</h2>${paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="closing">${lang==='pt'?'Leitura relacionada':'Reading connection'}: ${esc(unit.source)}.</p></section><!-- course-depth:end -->`;
    const marker=course==='foundations'?/<section\b[^>]*class="foundation-source"[^>]*>/:['temperaments','understand-temperament','mystery-temperaments'].includes(course)?/<section\b[^>]*class="worked-example"[^>]*>/:/<section\b[^>]*id="book-passage"[^>]*>/;
    if(!marker.test(h))throw Error(`No source placement: ${file}`);
    h=h.replace(marker,m=>section+m);
    fs.writeFileSync(file,h);pages++;
   }
  }
 }
 console.log(`Expanded concept teaching on ${pages} bilingual lesson pages.`);
}
