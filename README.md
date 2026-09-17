# Anthroposophy

A bilingual learning website for studying Anthroposophy in English and Brazilian Portuguese.

Research, source comparisons, lecture timestamps, illustration briefs and future improvements are tracked in the [research index](content/research-index.md). The [source register](content/source-register.json) identifies reviewed input files by filename and fingerprint. Full source books and lecture transcripts remain local; they are not backed up by this repository.

## Website

### Detailed Biodynamics companion — 17 September 2026

The new English companion at `docs/biodynamics/companion/index.html` follows the introduction and all seven chapters in **36 lessons**, with **135 page commentaries**, **560 source-inventory items**, and **11 distinct ideas from four highlighted passages**. It includes a source map prepared before lessons, glossary, original teaching examples, explained questions, scientific comparisons, a downloadable complete Markdown companion and a concept-by-concept coverage audit. The earlier nine-lesson bilingual route links to this expansion.

The audit explicitly retains a partial transcription of Figure 7’s fine handwritten details and distinguishes referenced works outside this anthology. See the [review](content/biodynamics-companion-review.md). Edit `content/biodynamics-source-inventory.tsv`, `content/biodynamics-page-notes.md` and `content/biodynamics-companion.mjs`; build with `node scripts/build-biodynamics-companion.mjs` or the complete site build. Validate with `node scripts/check-biodynamics-companion.mjs` and the shared site checker. Prepared locally; not deployed.

### Phases course — 15 September 2026

**Phases**, by Bernard Lievegoed, now has **19 lessons in each language**, covering all seven chapters, an orientation and a final biographical portfolio. Each lesson includes original teaching, a verified passage, example, takeaways, activity and explained answers. Open `docs/phases/index.html` or `docs/pt/phases/index.html`. See the [reading review and chapter map](content/phases-reading-review.md).

Edit `content/phases-a.mjs`, `content/phases-b.mjs`, `content/phases-passages.json` and `scripts/build-phases.mjs`. Build with `node scripts/build-all.mjs`; validate with `node scripts/check-phases.mjs` and shared checks. Current site: **14 primary courses, 579 HTML pages and 242 bilingual guided lesson pairs**. Prepared locally; no deployment performed. Counts below document earlier stages.

### Biodynamics course — 15 September 2026

**What Is Biodynamics?** now has **nine lessons in each language**, covering Hugh J. Courtney’s introduction, all seven selected Rudolf Steiner lectures and a final garden/farm portfolio. Open `docs/biodynamics/index.html` or `docs/pt/biodynamics/index.html`. Every lesson has original teaching, a visually checked quotation with its PDF capture page, a worked example, three takeaways, an activity and three explained answers. Preparation and elemental tables support the reading.

Edit `content/biodynamics.mjs` and `scripts/build-biodynamics.mjs`. Build with `node scripts/build-all.mjs`; check with `node scripts/check-biodynamics.mjs` and the shared site checks. An optional private `pages.json` argument verifies quotation locations. See [source review](content/biodynamics-reading-review.md).

Current site: **13 primary courses, 539 HTML pages including the learning review, 223 bilingual guided lesson pairs**. Nutrition, Foodwise and Biodynamics link to one another. Prepared locally; no deployment performed. Counts below describe earlier stages.

### Foodwise course — 15 September 2026

**Foodwise**, by Wendy E. Cook, now has **24 lessons in English and 24 in Brazilian Portuguese**, covering all twenty chapters. Chapter 19 is split into menu planning, cooking methods and shared meals; orientation and a final meal portfolio complete the route. Open `docs/foodwise/index.html` or `docs/pt/foodwise/index.html`. Each lesson includes original teaching, a visually verified quotation, capture-page references, an example, three takeaways, an activity and three explained answers. Notes use the existing optional local saving and export controls.

Edit `content/foodwise-part-one.mjs`, `content/foodwise-foods.mjs`, `content/foodwise-practice.mjs` and `content/foodwise-passages.json`; `content/foodwise.mjs` assembles them. Build with `node scripts/build-foodwise.mjs` or `node scripts/build-all.mjs`. Validate with `node scripts/check-foodwise.mjs` and the shared site and guided-study checks. An optional path to a private OCR `pages.json` enables quotation-location checks. See [source review and chapter map](content/foodwise-reading-review.md).

Current generated site: **12 primary courses, 519 HTML pages including the existing learning review**. The source PDF and OCR remain private. Foodwise and Nutrition are prepared locally; this work does not deploy the live site. Counts below document earlier stages.

### Nutrition course — 15 September 2026

The new **Nutrition: Food, Health and Spiritual Development** course follows all twelve chapters of the supplied Rudolf Steiner collection, with an orientation and final portfolio: **14 lessons in English and 14 in Brazilian Portuguese**. Open `docs/nutrition/index.html` or `docs/pt/nutrition/index.html`. Every chapter has original concept teaching, a PDF-checked quotation with its capture-page reference, close reading, an example, three takeaways, an activity and three explained answer checks. Notes and completion marks use the existing opt-in browser saving and export system.

Edit `content/nutrition.mjs` and `content/nutrition-part-two.mjs`; build with `node scripts/build-nutrition.mjs` or the complete build. Run `node scripts/check-nutrition.mjs` and the shared site/guided-study checks. Pass the supplied Markdown path to the Nutrition checker to verify quotation wording against its cited capture pages. See [source limits and chapter map](content/nutrition-reading-review.md). The full book remains private. Chapter 5 now connects to the dedicated Biodynamics course through cultivation and food quality.

Current generated site: **11 primary courses, 469 HTML pages including the existing learning review**, with the foundation and optional source-library routes retained. Earlier counts below describe previous stages. Nutrition is prepared locally; this task did not deploy the live site.

The project repository is https://github.com/riaanptrslive/Anthroposophy.

The generated static website lives in `docs/`. Viewing or hosting it needs no installation.
Open `docs/index.html` locally to preview it. The Portuguese edition is in `docs/pt/index.html`.

To publish with GitHub Pages, use **Settings → Pages → Deploy from a branch**, choose the branch containing these files, and select **/docs**. The expected address is https://riaanptrslive.github.io/Anthroposophy/ once Pages is enabled and deployment succeeds.

## Developing the lessons

The homepage now starts with **18 bilingual foundation lessons**, followed by full book studies and optional subjects. Edit `content/foundation-course.mjs`; `scripts/build-foundation-course.mjs` builds `/foundations/`, the dedicated `/theosophy/` index, and preparation links for all ten established courses. Existing lesson URLs and notebook identities are preserved. Foundation questions use a personal notebook; they do not yet have browser saving. Run `node scripts/check-foundation-course.mjs` with the existing checks.

Reading lessons now teach concepts and the chapter explanation before the cited excerpt, example, and practice. Meditation retains its verse-led sessions with relevant prerequisite teaching. The threefold and fourfold accounts are explained progressively in the shared human constitution reference and in 64 bilingual lesson introductions. Edit `content/concept-foundations.mjs` for these foundations; see [the teaching revision](content/theory-first-review.md). Run `node scripts/check-concept-foundations.mjs` after the complete build.

The 133 selections in `content/passage-study.json` cover all 146 English primary-course lessons and their Portuguese partners. Edit that file to revise passages or close-reading notes, then run the complete build and `node scripts/check-passage-study.mjs`. See [edition choices and verification](content/passage-study-review.md).

The introduction and selected lessons now include original bilingual connections with *The Philosophy of Freedom* and the teaching method from Brian's two preface lectures. Edit these in `content/philosophy-of-freedom-connections.mjs`; both course builders apply them without changing the main books' reading references. Lesson 0 includes a responsive two-question map and four expandable inquiry steps. GA 9 Lesson 18 now asks students to reconstruct and check a chain of reasoning. The separate GA 4 course now publishes the reviewed material through Chapter 14 and the conclusion: 16 core lessons and six optional exercises, in both languages.

The site now offers **ten primary bilingual courses**: Myth, Meaning and Human Consciousness (8 lessons), Practical Training in Thought (10 lessons), Understanding Temperaments (12 lessons), Theosophy (23), How to Know Higher Worlds (19), The Philosophy of Freedom (16 core lessons plus 6 optional exercises), According to Luke (12), Colour (14), Encountering the Self (17), and Meditation (9). Three earlier temperament book companions remain in the optional source library, with all 39 lessons, URLs and notebooks preserved. The new temperament core combines their teaching into one subject path.

Edit Course 2 in `content/higher-worlds.mjs` and its four short GA 9 supplements in `content/higher-worlds-connections.mjs`. Every Course 2 lesson includes a worked example, explanation, source assignment, glossary, activity, three answer checks, a rubric and a link back to Course 1. Its page references use the replacement **107-page transcription**, not the original 294-marker file. Full source books remain private; selected, attributed passages appear in the public lessons.

`node scripts/build-all.mjs` (or `node scripts/build-lessons.mjs`) builds all courses and source companions in order. `node scripts/check-site.mjs` checks all **397 pages**, their links and anchors, language pairs, required learning sections and content completeness. The source comparison and editorial history remain in `content/higher-worlds-reading-review.md` and `content/higher-worlds-course-plan.md`.

Start with the [agreed course outline](content/course-outline.md): a beginner course built around Rudolf Steiner's **Theosophy / Teosofia (GA 9)**. The [chapter-by-chapter teaching plan](content/theosophy-chapter-teaching-plan.md) records the source analysis. The website now contains the orientation, 21 book lessons, and a final synthesis in both languages.

Begin with the new **Why study anthroposophy? / Por que estudar antroposofia?** introduction (Lesson 0). It includes an everyday example, the purpose of the study, a linked course map, and a comprehension check. Selected connections with *What Is Anthroposophy?* deepen Lessons 1, 5, 6, 7, 18, 19, 21, and 22 while keeping *Theosophy* as the main sequence. The general study guide remains available on the homepage.

Edit the introduction in `content/introduction.mjs`, the later-lecture connections in `content/anthroposophy-connections.mjs`, and the main lessons in `content/lessons.mjs` and `content/lessons-chapter-2.mjs` through `content/lessons-chapter-4.mjs`. Run `node scripts/build-lessons.mjs` to regenerate the lesson pages and course indexes. Run `node scripts/check-site.mjs` to check every local link, language pair, and lesson structure before publishing. No packages are required. Source limitations and the follow-up for a replacement transcription are recorded in `content/anthroposophy-introduction-review.md`.

The course uses original worked examples, explanations, one key takeaway per lesson, notebook exercises, expandable suggested answers, and a self-assessment rubric. Edit the bilingual examples in `content/lesson-examples.mjs`. Examples explicitly distinguish what they illustrate from the wider claims they do not establish. The opening lesson distinguishes soul from emotion alone and spirit from reasoning alone. The 1971 English edition supplies printed-page references; the edition comparison records OCR limitations and recovered parallel readings. Portuguese explanations are original Brazilian Portuguese course text, not quotations from a published Portuguese translation.

1. Supply a book, excerpt, or transcript, together with available author, edition, page, or timestamp information.
2. Identify the learning objectives and create a draft using `content/lesson-template.md`.
3. Prepare matching English and Brazilian Portuguese lessons, a glossary, reflection questions, and review answers.
4. Review source accuracy and translations before adding published lesson pages under `docs/` and linking them from both homepages.

The editorial plan remains a working record. The published lessons are introductory reading companions, with source assignments for deeper study; they do not reproduce the book or claim expert endorsement.

Keep original source files intended only for preparation in `.sources/` (ignored by Git). Publish only material intended for the website. The `content/` folder contains editorial templates and is outside the Pages publishing folder.

## Design

Responsive, accessible static HTML and CSS with matching language navigation, semantic headings, visible keyboard focus, and no third-party scripts or services.

## According to Luke course

Course 4 starts at `docs/according-to-luke/index.html`, with matching Portuguese pages under `docs/pt/according-to-luke/`. Edit `content/according-to-luke.mjs` and the three supplements in `content/according-to-luke-connections.mjs`. The supplied capture includes only the introduction and part of Lecture 1; the complete ten-lecture sequence uses a clearly identified parallel primary edition. See the [source review and lecture map](content/according-to-luke-reading-review.md). Lessons distinguish Gospel text, spiritual interpretation and the reader's judgment, with original examples, activities, answer checks and a final portfolio. The build adds six supplementary sections across the English and Portuguese versions of GA 10 Lesson 10 and GA 4 Lessons 16 and 20.

## Philosophy of Freedom course

The course starts at `docs/philosophy-of-freedom/index.html`, with matching Portuguese pages under `docs/pt/philosophy-of-freedom/`. Edit the extracted, reviewed student lessons in `content/philosophy-of-freedom-lessons.json` and the orientation and Chapter 12 lessons in `content/philosophy-of-freedom-additions.mjs`, Chapter 13 in `content/philosophy-of-freedom-chapter-13.mjs`, and Chapter 14 in `content/philosophy-of-freedom-chapter-14.mjs`. Editorial review files remain the provenance record; changes to them do not automatically change the published student text. The course currently covers the prefaces and Chapters 1–14, retaining the planned two-lesson splits. The concluding section and synthesis are in preparation.

## Colour course

Course 5 starts at `docs/colour/index.html`, with matching Portuguese pages under `docs/pt/colour/`. It follows all twelve lectures in the supplied collection, with an orientation and a final portfolio: fourteen lessons per language. Edit `content/colour.mjs`, `content/colour-visuals.mjs` and `content/colour-connections.mjs`. Labelled colour studies support the exercises; written alternatives are included. Three existing lessons gain bilingual supplements: GA 9 Lessons 1 and 17, and GA 10 Lesson 10. See the [reading map and editorial review](content/colour-reading-review.md) for source limitations, lecture dates and distinctions between artistic practice and spiritual interpretation.

## The Four Temperaments course

Course 6 starts at `docs/temperaments/index.html`, with matching Portuguese pages under `docs/pt/temperaments/`. Eleven lessons divide the single Berlin lecture of 4 March 1909 into orientation, nine study sections and synthesis. Edit `content/temperaments.mjs` and `content/temperaments-visuals.mjs`. Three existing lessons receive bilingual supplements: GA 9 Lesson 6, GA 10 Lesson 7 and GA 4 Lesson 20. The [source review and teaching map](content/temperaments-reading-review.md) explains capture gaps, the parallel edition and the distinction between original claims and teaching adaptations. The course includes reading maps, examples, activities and explained answers, without a personality test.

## Understand Your Temperament! course

Course 7 starts at `docs/understand-temperament/index.html`, with Portuguese pages under `docs/pt/understand-temperament/`. This is Gilbert Childs’s later guide, kept distinct from Steiner’s lecture. Thirteen bilingual lessons cover the nine chapters, both appendices, orientation and synthesis. Edit `content/understand-temperament.mjs` and `content/understand-temperament-visuals.mjs`. Four lessons in the preceding Temperaments course gain bilingual supplements. The [source review and chapter map](content/understand-temperament-reading-review.md) records the capture gaps, original adaptations and outstanding need for a more complete source capture.

## Encountering the Self course

Course 8 starts at `docs/encountering-the-self/index.html`, with matching Portuguese pages under `docs/pt/encountering-the-self/`. Seventeen lessons follow Hermann Koepke’s parent conversations, biography, developmental account, curriculum, school-doctor contribution and all four appendices. Edit `content/encountering-the-self.mjs` and `content/encountering-the-self-visuals.mjs`. Three existing lessons gain bilingual supplements: GA 10 Lesson 03, Temperaments Lesson 08 and Colour Lesson 01. The [source review and section map](content/encountering-the-self-reading-review.md) records capture gaps, constructed conversations, historical medical claims and the limits of proposed cosmic correspondences.

## Guided study and Course 9

All 176 lesson pages per language now offer a first attempt, optional hint, expandable explanation, source connection and revised answer. Selected lessons include arithmetic feedback, colour comparisons, staged conversations and revealable diagrams. Notes and study marks save only after the learner opts in, on this browser and device; export a copy to retain it elsewhere. There is no account or device sync.

Run `node scripts/check-guided-study.mjs` alongside the site checker. See [implementation notes](content/guided-study-implementation.md) and [the Mystery source review](content/mystery-temperaments-reading-review.md).

## Consolidated Philosophy of Freedom

One main path integrates the fuller Wilson text, Amrine and the supplied lecture reviews: orientation, fourteen chapter lessons and conclusion/synthesis. Six former split-chapter exercises remain optional at their existing URLs. Edit `content/philosophy-of-freedom-consolidated.mjs` and build with `node scripts/build-all.mjs`. Run `node scripts/check-freedom-route.mjs` to check chapter coverage and core navigation. See the [consolidation review](content/philosophy-of-freedom-consolidation-review.md).

## Practice courses and unified temperaments

Edit `content/practical-thinking.mjs` and `content/temperament-course.mjs`; `scripts/build-practice-courses.mjs` generates the routes before the shared guided-study pass. Both new courses have three dated practice entries per lesson and a course journal with text export. The Philosophy of Freedom includes optional bridges to relevant exercises. Run `node scripts/check-practice-courses.mjs` as well as the existing checks. See [implementation and source decisions](content/practice-courses-implementation.md).

## Ancient Myths

The eight-lesson `ancient-myths` route follows the seven lectures in the supplied 1971 Cotterell edition, with orientation, original examples, interpretation maps, activities and a final adult teaching project. Edit `content/ancient-myths.mjs`; the builder adds four optional connections to existing courses. Run `node scripts/check-ancient-myths.mjs`. See [source and teaching review](content/ancient-myths-review.md).

## Meditation and Inner Life

Nine bilingual guided sessions at docs/meditation/index.html and docs/pt/meditation/index.html use Start Now!, Weekly Meditations and The Foundation Stone. They include a daily verse, four complete Calendar verses and the complete Foundation Stone in new study translations of its printed German original. Source directions, editorial commentary and course adaptations are distinguished. Build with node scripts/build-all.mjs; validate with node scripts/check-meditation.mjs and the existing site checks. See content/meditation-reading-review.md for source scope and transcription decisions.
