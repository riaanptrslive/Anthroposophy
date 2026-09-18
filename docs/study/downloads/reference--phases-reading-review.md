# Phases — reading review and course design

## What the book teaches

Bernard Lievegoed reads adult biography as the interaction of bodily life, psychological experience and spiritual individuality. A recurring theme, or *leitmotiv*, can take different forms through changing roles. Development involves reorganizing a life and its values, rather than simply accumulating achievements. His phase ages are approximate landmarks, explicitly qualified on PDF capture 25.

The course follows all seven chapters, with separate lessons for all eight sections of Chapter 2 and all three sections of Chapter 6. Orientation and a final portfolio complete **19 lessons in English and 19 in Brazilian Portuguese**.

## Chapter map and key points

| Book chapter | Lessons | PDF captures | Key concepts |
|---|---|---|---|
| Preface and Introduction | 00 | 6–9 | Biography as a whole; three dimensions; recurring theme; past and future. |
| 1. Surveying the Terrain | 01–02 | 10–26 | Change, growth, development; differentiation and integration; creativity and wisdom; images of the human being; value-centres; approximate phases. |
| 2. The Course of Life | 03–10 | 27–61 | Three life lines; adolescence; exploratory twenties; organizational consolidation; changing values; midlife direction; mentoring; later creativity and letting go. |
| 3. Male and Female Development—Marriage | 11 | 62–75 | Projection, shadow, recognizing individuality, mutual freedom, shared culture and belonging. Context for the idealized marriage narrative and dated sexuality claims. |
| 4. Basic Life Orientations | 12 | 76–81 | Six orientations; contribution and excess; distinction from aptitude, temperament and leitmotiv. |
| 5. Career Prospects and Personnel Policy | 13 | 82–90 | Lifelong education; experience and training; specialist and managerial paths; mentoring; succession and organizational renewal. |
| 6. Images of Man, Biography and Psychotherapy | 14–16 | 91–129 | Four explanatory images; philosophical assumptions in therapy; Freud, Adler, Jung, Frankl, Assagioli and Steiner as presented by Lievegoed; levels of help; privacy and continuity. |
| 7. Personal Development and Biography | 17 | 130–141 | New realism; inward and outward paths; attention; Imagination, Inspiration, Intuition; ordinary practice; freedom and the unfinished letter. |
| Final synthesis | 18 | 6–141 | Seven-part portfolio, evidence, alternative interpretation, realistic action and review date. Recommended reading: captures 142–144. |

## Edition and source method

*Phases: The Spiritual Rhythms of Adult Life*, Sophia Books / Rudolf Steiner Press, 2012, translated by H. S. Lake (translation copyright 1979). Original: *De levensloop van de mens*, Lemniscaat, Rotterdam, 1976. ISBN 9781855843042.

Read the supplied Markdown/OCR across the book, including front matter, chapter divisions and recommended reading. References count the 145 PDF captures, not printed pages or Kindle locations. Some OCR is interrupted around highlights; this is not a complete verbatim transcription. All 19 selected passages were matched to their capture and visually checked against page-image crops. They are Lievegoed’s words, not unlabelled quotations from other authors. Line-break hyphenation is normalized. Portuguese quotations are labelled new course study translations beside the English original.

Full PDF, OCR and verification images remain private. `source-register.json` records both input fingerprints. The repository contains selected quotations and original teaching.

## Teaching and assessment

Every lesson supplies an objective, three explanatory paragraphs, verified quotation, close reading, worked example, three takeaways, activity and three explained answers. Tables compare the six orientations and four explanatory images. Students write, connect an explanation to a passage, and revise. The rubric rewards accuracy, evidence, distinguishing claims and reasoned revision; agreement is not required.

The final portfolio has one short section per chapter, with a passage/page for each. Personal and invented biographies are equally acceptable. Optional browser notes use the existing language-separated saving and export controls. No assignment is uploaded to a teacher.

## Interpretive boundaries

- Ages are not deadlines or diagnostic measurements. Worth and maturity are not inferred from employment, marriage, retirement or productivity.
- Gender assumptions and the developmental account of homosexuality receive historical context. Lesson 11 links the Royal College of Psychiatrists statement that homosexuality is not a psychiatric disorder.
- Lesson 08 links the NHS explanation of the misleading “male menopause” analogy. Symptoms must not be dismissed as a phase.
- Chapter 6 is philosophical and historical comparison, not clinical training. NIMH supplies a specific contemporary comparison. Spiritual meaning is not taught as the only effective treatment; reincarnation is not used to blame people for harm or illness.
- Privacy, silence, boundaries and the option of fictional material apply throughout.

## Implementation and validation

Teaching: `phases-a.mjs`, `phases-b.mjs`, assembled by `phases.mjs`. Quotations: `phases-passages.json`. Generator: `scripts/build-phases.mjs`.

Local pages: `docs/phases/index.html` and `docs/pt/phases/index.html`. Homepage cards and sequential language-paired lessons are integrated into the full build. `node scripts/check-phases.mjs` accepts private `.sources/phases-review/pages.json` to verify quotation locations. Shared checks cover local links, anchors, language pairs and notebook controls. Prepared locally; no deployment performed.
