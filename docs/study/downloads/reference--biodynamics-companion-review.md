# Detailed Biodynamics companion — 17 September 2026

The earlier nine-lesson bilingual course remains intact. A new English close-reading route at `docs/biodynamics/companion/index.html` supplies 36 lessons, page commentary, source map, glossary, scientific comparisons, downloadable Markdown and a post-draft coverage audit.

## Source inspected

- Private PDF: `What is biodinamics.pdf`, 135 capture pages; SHA-256 `2a46f2eec5d9d6b11cdbc53fad74d8b490bbff125b5bd67ea987f2f3e767400c`.
- Supplied OCR: `What is biodinamics (2).md`; SHA-256 `0641886646d24c0e32420c24dfea782fd74aec12b3127e6256407bde3880d63a`.
- Full page text read throughout. Images extracted directly from the PDF were screened in 12 contact sheets, and all four visible highlighted passages were inspected at full size. The PDF has no annotation objects; highlighting is flattened into images.
- An existing external image directory contained pages beyond the 135-page book. It was not trusted as the inventory boundary; the PDF itself established the page count and the final highlight set.
- Four highlighted passages: PDF 76, 101, 102, 114. Eleven distinct ideas were mapped. PDF 114 is Means's introduction, not Steiner's lecture. Page 76’s highlighted sentence continues in unhighlighted text; pages 101–102 require surrounding text and the earlier horn/antler comparison.

## Order of work and coverage

The 135-page inventory in `biodynamics-source-inventory.tsv` was authored before the lesson commentary. Its 560 items cover the introduction, seven chapters, their discussions, notes, figures and bibliography. `biodynamics-page-notes.md` supplies original explanations; `biodynamics-companion.mjs` supplies the chapter-preserving lesson sequence, instructor examples, questions, answers, glossary, scientific comparisons and highlight ledger.

`biodynamics-coverage.json` maps every inventory item and highlighted idea to the precise lesson/page section. Explanation is editorially assessed, not proven by a link or word-count check. One inventory item remains partial: Figure 7’s fine handwritten dates and alternative labels are not fully transcribed or independently reconciled. The conceptual role of the diagram and dates discussed in the prose are taught. Referenced books, original lecture material outside the anthology, and a systematic efficacy review remain outside this task; these limits appear prominently in the student audit.

The chapter-specific course teaches assertions as assertions, distinguishes analogy from demonstration, retains uncertainty from question sessions, and preserves the tension between experiments and Steiner’s claim of inherent certainty. It includes specific comparisons for fertilization, microbes, nitrogen, sound, digestion, toxic forage, plant disease, animal classification, earthquakes, contrails and the 1945 chronology. It makes no global efficacy conclusion about biodynamic systems.

## Build and checks

Run `node scripts/build-biodynamics-companion.mjs` for the companion alone. `build-biodynamics.mjs` and the complete site build also include it. Source books, OCR and page images remain private and outside `docs`.

Run `node scripts/check-biodynamics-companion.mjs`, `node scripts/check-biodynamics.mjs .sources/biodynamics-review/pages.json`, and `node scripts/check-site.mjs`. Browser review checks navigation, highlighted attribution, source-map filtering and answer expansion. The expansion is prepared locally; no deployment is performed.
