import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root='docs/study';
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const manifest=JSON.parse(read('manifest.json'));
assert.equal(manifest.books,20);
assert.equal(manifest.sessions,6);
assert.equal(manifest.generatedFiles.length,118);
for(const name of fs.readdirSync('content/knowledge-base').filter(n=>n.endsWith('.md'))){
  assert.equal(read('downloads/'+name),fs.readFileSync(path.join('content/knowledge-base',name),'utf8'),`Download changed: ${name}`);
  const html=read(name.replace('.md','.html'));
  assert.ok(html.includes('id="main"')&&html.includes('On this page'),`Missing reading navigation: ${name}`);
}
for(const [name,count] of [['theosophy',80],['freedom',108],['four-temperaments',23],['mystery-temperaments',18]]){
  const html=read(name+'-coverage.html');
  assert.equal((html.match(/>Read explanation<\/a>/g)||[]).length,count,`Incomplete coverage: ${name}`);
  assert.ok(!html.includes('See audit download'),`Unlinked explanation: ${name}`);
}
const fields=['Central question','Learning objectives','Core concepts','Book material used','Background expansion','Detailed teaching points','Examples and case studies','Important people and events','Misconceptions','Debate or complication','Connections to previous lessons','Discussion questions','Activity / exercise','Relevant book pages','Further research topics'];
for(let i=1;i<=6;i++)for(const field of fields)assert.ok(read(`temperaments-session-${i}.html`).includes('>'+field+'</h2>'),`Session ${i}: ${field}`);
for(let i=1;i<=14;i++)assert.ok(read(`freedom-chapter-${i}.html`).includes(`Chapter ${i} —`));
for(const lang of ['', 'pt/']){
  const html=fs.readFileSync('docs/'+lang+'index.html','utf8');
  assert.equal((html.match(/<!-- study-library:start -->/g)||[]).length,1,'Homepage integration must be unique');
}
console.log('Passed: 20 books, 118 library pages, 229 linked source explanations, 14 chapters, six complete sessions and unchanged source downloads.');
