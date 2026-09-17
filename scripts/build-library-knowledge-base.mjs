import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'content/knowledge-base');
const books=JSON.parse(fs.readFileSync(path.join(dir,'library.json'),'utf8'));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,t)=>fs.writeFileSync(path.join(dir,p),t+'\n');
const prose=x=>typeof x==='string'?x:Array.isArray(x)?x.map(prose).filter(Boolean).join('\n\n'):'';
function normalize(s){
 const e=s.en;
 if(Array.isArray(e))return {title:e[0],goal:e[1],paragraphs:e[2],example:e[3],explanation:e[4],activity:e[5],checks:e[6],takeaway:e[7],glossary:e[8]};
 return e||{};
}
function block(title,x){const t=prose(x);return t?`\n#### ${title}\n\n${t}\n`:'';}
const stats=[];
for(const b of books){
 const lessons=[];
 for(const [m,k]of b.modules){const module=await import(new URL(`../content/${m}.mjs`,import.meta.url));for(const s of module[k])lessons.push({...s,origin:m});}
 const bank=lessons.map(s=>{
  const e=normalize(s), ref=e.reading||s.refs||s.span||s.pages||s.lecture||'See source assignment in the existing course.';
  let text=`### ${String(s.id).padStart(2,'0')} — ${e.title}\n\n**Prior course source:** \`${s.origin}.mjs\`; **prior reference:** ${ref}. These references retain the old edition/marker system and are not newly verified PDF locators.\n\n**[INTERPRETATION — existing instructor teaching]** Source paraphrases below remain distinguishable from a fresh [BOOK] extraction.\n`;
  for(const [key,title]of Object.entries({goal:'Learning objective',key:'Core explanation',context:'Context and qualifications',theory:'Detailed teaching',paragraphs:'Detailed teaching',explain:'Detailed teaching',why:'Reason for the sequence',example:'Example — instructor-created unless explicitly attributed',explanation:'Explanation of the example',steps:'Activity sequence',activity:'Activity',question:'Understanding question',checks:'Questions and explained answers',takeaway:'Teaching conclusion',glossary:'Existing concept definitions'}))text+=block(title,e[key]);
  return text;
 }).join('\n');
 if(bank)write(`${b.id}-teaching-bank.md`,`# ${b.title} — retained teaching bank\n\nThis preserves existing English course explanations and exercises for the new research pass. It is not a new full-book extraction, and importing it does not verify source coverage. Original modules retain the Portuguese material.\n\n${bank}`);
 const glossary=lessons.flatMap(s=>normalize(s).glossary||[]).map(prose).filter(Boolean);
 const map=b.review?`[Prior source map and reading record](../${b.review})`:'The user’s Edmunds example supplies a provisional chapter map; consult the original supplied file.';
 const special=b.id==='mystery-temperaments'?'\n\n**Fresh qualified source reading:** [Complete readable-discussion record](mystery-temperaments-close-reading.md), with eighteen explained units. Edition identity, damaged joins, full highlight review and final lessons remain unresolved.':b.id==='four-temperaments'?'\n\n**Fresh complete supplied-lecture study:** [Fifteen-part chapter record](four-temperaments-close-reading.md), [six-session English course](four-temperaments-study-course.md), and [23-unit coverage ledger](four-temperaments-coverage.json). Bilingual website integration remains pending.':b.id==='theosophy'?'\n\n**Fresh full-text research:** [Cumulative synthesis, all chapters and addenda](theosophy-synthesis.md), with 80 explained reading units and 33 proposed sessions. Full lesson-format expansion and website integration remain pending.':b.id==='philosophy-of-freedom'?'\n\n**Fresh supplied-text research:** [Cumulative synthesis](freedom-synthesis.md), [all fourteen chapters](freedom-chapter-notes.md), [framing and appendix](freedom-framing-and-appendix.md), and [Essential edition comparison and six appendices](freedom-essential-comparison.md). 108 explanation units; missing fuller-edition opening and final lessons remain pending.':b.id==='biodynamics'?'\n\n**Detailed existing source inventory:** [135-page map](../biodynamics-source-inventory.tsv), [page explanations](../biodynamics-page-notes.md), [coverage ledger](../biodynamics-coverage.json). This book is substantially further advanced than a migrated teaching bank.':'';
 const glossaryBody=glossary.length? [...new Set(glossary)].map(x=>'- '+x).join('\n'):'A separately verified concept dictionary is still required. Do not treat a list of terms in an old lesson as a definition checked in this source.';
 write(`${b.id}.md`,`# ${b.title} — cumulative working knowledge base

**Author/source voices:** ${b.author}.

**Status: source audit and prior-work consolidation.** Unless a fresh chapter record is linked below, this file is a research starting point, not a claim that the book has been deeply processed in the new format. The existing course remains a selective teaching route. Follow [the adopted reading method](READING-METHOD.md).

## 1. Book Map

${b.structure}

${map}. Its historic coverage and pagination statements must be read with their dates and reconciled against the current source.

**Current source check:** ${b.source}

**Governing question [INTERPRETATION]:** ${b.problem}

## 2. Chapter Notes

${map} preserves prior findings, limitations and chapter/lecture divisions. The new fifteen-part chapter records must be added after sequential reading, including notes and appendices. A source map is not itself a completed chapter explanation.${special}

## 3. Concept Dictionary

The following definitions, where present, are retained instructor formulations. They are **[INTERPRETATION — prior teaching]**, to be collated with the source's exact context before marking them [BOOK].

${glossaryBody}

## 4. People Index

**Voices requiring separate attribution:** ${b.voices}

Named figures within the book must receive their own locator and role during extraction. This source-voice register is not yet a complete index of everyone mentioned. A thinker reported by this author is not an independently read primary source.

## 5. Timeline / Event Index

Use the dates and edition information in the linked prior source map as leads. Record publication, translation, lecture date, narrated event and alleged spiritual epoch as different categories. Do not infer a continuous lecture sequence from a thematic anthology. The newly audited PDF page count is not a historical date or printed-page range.

## 6. Argument Index

**Argument to investigate:** ${b.problem}

${bank?`The [retained teaching bank](${b.id}-teaching-bank.md) preserves the existing explanations and qualifications. Extract each source argument into claim, reasons, evidence, assumptions, mechanism, conclusion and counterpoint before certifying full coverage.`:'The linked prior reading record supplies the starting questions. A fresh argument-by-argument index is pending; no unsupported argument is invented to fill this heading.'}

## 7. Example / Case Study Bank

${bank?`[Existing examples and explained activities](${b.id}-teaching-bank.md) are retained in full. Most are original instructor examples, not incidents in the book. The source's anecdotes and examples require a separate sequential extraction.`:'Use the prior source record to locate selected examples. A complete bank of the book’s own cases is pending.'}

For each book example, preserve what happens, the details that make the inference work, its locator, what it illustrates and what it does not establish. Do not silently substitute an everyday exercise for the source's explanation.

## 8. Interesting Detail Bank

**Specific issue worth retaining:** ${b.next}

During reading, collect details that change interpretation: a qualification, an alternative term, an exception, a narrator's identity or a change of audience. Do not convert missing details into trivia or speculative history.

## 9. Idea Dossiers

The governing question above identifies the first dossier problem. Populate each dossier from checked passages with source account, background, origins/development where documented, people, mechanism, example, limitation, debate, misconception, connections and teaching use. Unknown origins remain unknown. ${b.id==='theosophy'?'Fifteen dossiers are in the five fresh reading records linked by the cumulative synthesis.':b.id==='biodynamics'?'The existing page commentaries supply substantive material; consolidating their argument, person and event indexes into this format is still pending.':'New source-grounded dossiers remain pending rather than being manufactured from headings.'}

## 10. Cross-Chapter and Cross-Book Connections

**[INTERPRETATION — curriculum comparisons, not claims of documented influence]**

${b.links.map(id=>{const target=books.find(x=>x.id===id);return `- [${target.title}](${id}.md): compare the actual passages and the meaning of shared terms; preserve differences in author, date and explanatory purpose.`;}).join('\n')}

Cross-chapter connections must identify first appearance, later development, changed meaning and culmination as reading proceeds. A shared word alone is insufficient.

## 11. Potential Lesson Bank

${bank?`The [retained ${lessons.length}-unit teaching bank](${b.id}-teaching-bank.md) preserves objectives, explanations, examples, exercises and answer checks available in the existing modules. These are candidates for revision, not evidence that the new deep-reading requirements are satisfied.`:'This source is represented selectively in existing courses or is the supplied format example. Its own complete lesson bank has not been fabricated.'}

Design new lessons around questions and mechanisms after extraction. Keep an explicit book-order crosswalk and allow multiple lessons per chapter. Preserve current bilingual course addresses and learner notes while the research pass is incomplete.

## 12. Questions Requiring Research and Coverage Status

**Next concrete source work:** ${b.next}

**File request:** ${b.need}

**Unfinished coverage:** full fresh chapter inventory, concept-to-explanation crosswalk and visual highlight census remain open unless specifically documented in a linked fresh record. Existing selected quotations do not establish coverage of every highlight. External background and scientific comparisons require separately checked sources before being taught as established findings.
`);
 stats.push({id:b.id,retainedLessons:lessons.length,freshReading:b.id==='mystery-temperaments'?'Readable discussion processed; eighteen explained units; edition and wording uncertain':b.id==='four-temperaments'?'Complete supplied lecture and back matter; 23 explained units; six English study sessions':b.id==='theosophy'?'All chapters, prefaces, introduction and addenda; 80 explained units; lessons pending':b.id==='philosophy-of-freedom'?'All supplied chapters and both editions’ appendices; 108 explained units; missing opening and final lessons pending':b.id==='biodynamics'?'Prior full 135-page companion; one partial diagram':'Pending'});
}
write('progress.json',JSON.stringify(stats,null,2));
write('README.md',`# Course library — knowledge-base index

17 September 2026. The user's requested method has been adopted across the library. This index separates **source audit**, **retained prior teaching** and **fresh sequential extraction**. It does not call all books complete.

Start with [source availability and upload requests](source-audit.md), [reading method](READING-METHOD.md), [Theosophy research synthesis](theosophy-synthesis.md), and [Philosophy of Freedom research synthesis](freedom-synthesis.md).

## Working book records

| Book / source | Existing teaching units retained | Fresh pass status |
|---|---:|---|
${books.map((b,i)=>`| [${b.title}](${b.id}.md) | ${stats[i].retainedLessons||'See linked companion/review'} | ${stats[i].freshReading} |`).join('\n')}

The book count differs from the number of website courses: Meditation uses three books; the unified Temperaments course uses three source companions; the foundation and human-constitution routes synthesize multiple sources. Those routes must draw from the book records rather than be mistaken for additional source books. The Edmunds document is the newly supplied format example, not an already published website course.

## Continuation order and release gate

1. Theosophy's complete text-reading pass is recorded in its synthesis. Expand its 33 proposed sessions into the full lesson format while the other source passes proceed.
2. Follow the website's main learning path: Philosophy of Freedom and the correct GA 10 source, retaining their distinct questions; then Practical Thinking.
3. Work through each source behind Temperaments, Encountering the Self, Colour and Ancient Myths.
4. Extend Nutrition, Foodwise, Phases and the existing Biodynamics companion with the new indexes and remaining coverage checks.
5. Process all three meditation sources as separate books before revising their shared course. Recover the supplied Luke edition while retaining the clearly identified complete parallel witness.

Work that depends on a missing edition remains open; available books can proceed independently. New courses are not declared final before sufficient sequential reading. No new website lessons, translations or publication are claimed by this research consolidation.
`);
console.log(`Prepared ${books.length} working book records and ${stats.reduce((n,s)=>n+s.retainedLessons,0)} retained teaching units; source completion remains explicitly separate.`);
