# Chapter-led course revision — 21 September 2026

The teaching order is **book chapter or lecture → key concepts → lessons that explain them → source reading and understanding checks → everyday application**. Parents and educators remain the intended audience. Practical examples should help a learner understand a concept without replacing the author's spiritual account with generic advice.

## What changed across the website

- All 20 study paths now show a source-order curriculum. Each source unit lists its concepts, linked lessons, objectives and available reading locators. A chapter can contain several lessons.
- All 590 lesson pages identify the source unit and the concepts being developed. Their everyday application panels follow conceptual teaching and the source passage, where one is supplied.
- Book chapters, lectures, editorial sections, appendices and course syntheses are labelled separately. A teaching division within a single lecture is not called a chapter of a book.
- Selected and comparative routes identify their source relationships. Foundations, Meditation and the parent/educator route are not presented as additional complete books.
- The homepage begins with the book studies. The everyday-situation finder and parent/educator route remain available as applications.
- The Philosophy of Freedom keeps its 16-step core. Its six additional exercises are visibly optional and follow the corresponding main lesson in the chapter map.
- Existing lesson URLs, note identities and English/Portuguese notebooks are preserved. Theosophy's course-return links now lead directly to its chapter curriculum.

## Course-by-course coverage

Counts below are lesson identities, before counting translated pages. All routes are bilingual except the 36-session Biodynamics companion. Orientation and synthesis are included in the counts but are distinguished from source chapters on the site.

| Study path | Source structure used to devise the lesson map | Lessons |
|---|---|---:|
| Theosophy | Four chapters; six lessons for Chapter I, three for II, eight for III and four for IV; opening and synthesis | 23 |
| How to Know Higher Worlds | Ten chapters, appendix, opening and synthesis | 19 |
| The Philosophy of Freedom | Prefaces, fourteen chapters and conclusion; 16 core steps and six optional practices | 22 |
| According to Luke | Ten dated lectures, opening and synthesis | 12 |
| Colour | Twelve talks in the collection's order, opening and synthesis | 14 |
| The Four Temperaments | One lecture divided into teaching units, followed by course synthesis | 11 |
| The Mystery of Temperaments | One continuous source discussion divided into teaching units, followed by synthesis | 15 |
| Understand Your Temperament! | Nine chapters, two appendices, opening and synthesis | 13 |
| Encountering the Self | Eleven book sections, four appendices, opening and synthesis | 17 |
| Practical Training in Thought | One lecture developed through ten teaching units | 10 |
| Ancient Myths | Seven dated lectures plus orientation | 8 |
| Nutrition | Twelve thematic chapters plus opening and synthesis; editorial compilation remains attributed | 14 |
| Foodwise | Twenty chapters; three lessons for Chapter 19; opening and synthesis | 24 |
| Phases | Seven chapters; eight lessons for Chapter 2; opening and synthesis | 19 |
| What Is Biodynamics? | Courtney's introduction and seven source chapters/lectures, with synthesis | 9 |
| Biodynamics detailed companion | Opening, introduction, seven chapters and final assessment; existing page-by-page sessions retained | 36 |
| Foundations | Selected concepts with their actual source references | 18 |
| Meditation | Selected texts and exercises; no claim to cover all chapters of the contributing anthologies | 9 |
| Understanding Temperaments | Comparison of Steiner's lecture sources and Childs's chapters | 12 |
| Parents and educators | Eight application units linked back to the book-course concepts they use | 8 |

The machine-readable [coverage record](chapter-curriculum-coverage.json) contains each page's source unit, concepts, objective and review reference. The authored bilingual map is in [chapter-curriculum.mjs](chapter-curriculum.mjs).

## Substantive lesson changes in this revision

### Theosophy, Chapter I

Six lessons now follow the chapter's conceptual progression more closely, using the existing [sequential chapter analysis](knowledge-base/theosophy-chapter-01.md), especially T1.01–T1.16.

1. **Body, soul and spirit:** Goethe's distinction between personal preference and inquiry; the meadow across two years; encountering, retaining experience and understanding a recurring relationship.
2. **Embodiment and inner experience:** bodily conditions, sensation, feeling and willing; why describing a condition is not yet a complete account of experience or logical validity.
3. **Life and form:** quartz and oak, formative organization, the meaning of etheric in this text, and the distinction between life and sensation.
4. **Differentiated soul life:** sentient, intellectual and consciousness soul; how reasoning may serve desire, and how truth differs from personal preference.
5. **The I and spiritual individuality:** the I as a standpoint; consciousness soul and spirit self; the chapter's analogical account of life spirit and spirit man.
6. **Several classifications:** the actual grouping relationships between nine, seven and four members. The existing complete member lists are retained.

These revisions include original English and Portuguese explanations and a source-specific question with an explained answer for each lesson. They are implemented in [theosophy-chapter-one-revision.mjs](theosophy-chapter-one-revision.mjs).

### According to Luke

All ten lecture lessons have revised titles, objectives and opening understanding questions keyed to their substantive concepts: the three modes of cognition; Bodhisattva and Buddha; the Eightfold Path and Nirmanakaya; the two Jesus children; Zarathustra; Moses, Elijah and John; the baptism; healing narratives; Buddha's teaching and Christ's love; Golgotha and initiation.

The existing attributed lecture explanations remain. Lessons 2 and 3 additionally define Bodhisattva/Buddha, identify the Eightfold Path disciplines and explain Nirmanakaya before applying the ideas. These additions were checked against the explicitly identified Osmond/Barfield parallel witness: [Lecture 2, 16 September 1909](https://rsarchive.org/Lectures/GospLuke/19090916p01.html) and [Lecture 3, 17 September 1909](https://rsarchive.org/Lectures/GospLuke/19090917p01.html). They do not restore or certify the incomplete supplied edition. The changes are in [luke-concept-revision.mjs](luke-concept-revision.mjs).

### Other courses

Each course received an authored concept-to-lesson map against its existing chapter/lecture review, and its pages now follow the common source-first sequence. Existing explanations, source passages, examples and questions were retained where available. This revision does **not** claim that every lesson's prose was newly rewritten, that every original source was freshly reread, or that a structural check proves complete conceptual coverage.

## Source status and editorial boundaries

The [17 September source audit](knowledge-base/source-audit.md) and [reading method](knowledge-base/READING-METHOD.md) remain records of the earlier source work. The current revision uses those records; it does not represent a new search of the user's original files. In particular, the incorrect Higher Worlds PDF, partial Luke capture, unavailable Koepke original, incomplete Foundation Stone booklet, missing Freedom opening pages and uncertain Mystery translation retain their recorded limitations. Parallel editions and surviving analyses remain attributed.

The two previously unpublished source reviews used by the new curriculum—Biodynamics and Practical Thinking—are now included in the study library. Source books and working extractions remain outside the public website.

Continued close reading should follow the existing fifteen-part chapter record and concept coverage method. A concept label or a link is not evidence that every aspect has been explained. The all-library fresh-reading project remains distinct from this structural revision and the specific lesson rewrites above.

## Implementation and verification

Run `node scripts/build-all.mjs`. The chapter curriculum pass runs after the everyday-learning pass and before the final terminology-linking pass. Editing generated HTML alone will not survive rebuilding.

- Full build: 760 HTML pages, including 120 study-library pages.
- All 22 `scripts/check-*.mjs` scripts pass. Checks cover source-unit structures, complete and unique lesson assignments, core/optional Freedom ordering, source-before-application placement, bilingual links and anchors, preserved reading material and notebook behavior.
- Browser checks: English chapter expansion, lesson navigation and return to the correct expanded chapter; English/Portuguese switching; desktop and 390-pixel responsive layouts.
- Prepared locally. No commit, push or deployment is part of this revision.
