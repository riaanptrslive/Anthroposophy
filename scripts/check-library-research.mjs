import fs from 'node:fs';
import path from 'node:path';
const root='content/knowledge-base';
const files=fs.readdirSync(root).filter(f=>f.endsWith('.md'));
const errors=[];
for(const file of files){
 const text=fs.readFileSync(path.join(root,file),'utf8');
 for(const m of text.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)){
  const href=m[1].split('#')[0];
  if(!href||/^[a-z]+:/i.test(href))continue;
  if(!fs.existsSync(path.resolve(root,href)))errors.push(`${file}: missing ${href}`);
 }
}
const course=fs.readFileSync(path.join(root,'four-temperaments-study-course.md'),'utf8');
const lessons=course.split(/^## FT-L\d+ — /m).slice(1);
const fields=['Central question','Learning objectives','Core concepts','Book material used','Background expansion','Detailed teaching points','Examples and case studies','Important people and events','Misconceptions','Debate or complication','Connections to previous lessons','Discussion questions','Activity / exercise','Relevant book pages','Further research topics'];
if(lessons.length!==6)errors.push('Expected six Four Temperaments sessions');
for(const [i,lesson] of lessons.entries())for(const field of fields)if(!lesson.includes(`### ${field}\n`))errors.push(`FT-L${i+1}: missing ${field}`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Checked local links in ${files.length} research Markdown files and all requested fields in six study sessions.`);
