# Everyday learning implementation — 20 September 2026

The owner's approved audience is parents and educators seeking practical guidance. This update implements the [course audit](parents-educators-course-audit.md) across the existing courses and adds a connected introductory route. The generated site is prepared locally; it has not been published.

## What learners receive

- A shorter homepage introduction with a direct start, an eight-situation finder, access to Foundations and a learning notebook. Detailed research remains available further down the page.
- Eight units in English and Brazilian Portuguese: observation; understanding different aspects of the person; daily rhythm; different ways into learning; boundaries and repair; imagination and making; development; and moving from intention to a thoughtful deed.
- Each new unit includes home and educator situations, an explanation of the underlying ideas, attributed further reading, a specific question with explained feedback, a changed situation and a practice to revisit. The primary situations concern children roughly 7–12; this is stated on the route overview.
- Everyday applications on every course overview, with direct access to the parent/educator route and the selected course's notebook.
- A consistent learning structure across all lesson pages: a situation to understand, access to the conceptual teaching and sources, a question particular to that lesson, explained feedback and a notebook for returning to practice. Existing complete source sequences and lesson addresses remain available. Meditation retains its verse-led order and download.
- Six notebook fields per lesson: explanation, source connection, revision and three occasions of practice. Saving is optional and uses the existing browser format. English and Portuguese notes remain separate, while the study mark is shared. A course filter and portfolio export bring saved work together.

## Coverage

The build records **590 lesson pages across 20 paths** in [the generated coverage manifest](everyday-learning-coverage.json): 313 English and 277 Portuguese pages. They comprise 484 existing guided pages, 36 Foundations pages, 18 Meditation pages, 36 English Biodynamics companion pages and 16 new parent/educator pages. The whole site has 758 HTML pages, including overviews and references.

The 20 paths comprise the 14 primary courses, Foundations, Meditation, two shorter practice routes, the detailed Biodynamics companion and the new parent/educator route. The two shorter practice routes are already included in the guided-page count. The detailed companion remains English-only; this release does not claim a translation of that material.

Everyday examples are original teaching applications. Existing source passages and distinctions between Steiner's account, later interpretations and observation remain in place. The new route connects the existing source lessons; it does not claim to have added a complete study of *The Education of the Child*. Further educational-source research, early-childhood/adolescent extensions, learner trials and expert review remain editorial work for future releases.

## Maintenance

Run `node scripts/build-all.mjs` for the complete build. It regenerates the underlying courses, library and shared everyday-learning pass, then links glossary terms. Running only an individual course builder omits the final shared enhancement pass. Content is maintained in `everyday-learning.mjs` and `parents-educators.mjs`; the generator is `scripts/build-everyday-learning.mjs`. The shared scripts are `docs/guided-study.v1.js` and `docs/everyday-learning.js`.

Existing notebook identities are retained. Saving merges known fields with prior language data, preserving older fields. The builder removes duplicate generated library panels on repeated builds and retries brief Windows write locks during the complete build.

## Verification

All 21 `scripts/check-*.mjs` checks pass. New coverage checks verify every lesson's six notebook fields, controls, specific question, stable identity, expected language pairing, course links and portfolio manifest. Runtime tests cover opt-in saving, persistence, language separation, shared completion, export, deletion, disabled/unavailable storage and preservation of older fields. Portfolio runtime tests also verify course filtering, malformed saved data, literal text rendering, export contents and filenames. Existing source-depth, glossary, navigation, foundation, meditation and course checks remain in place.

Local browser verification covers the mobile homepage and situation search, a new unit, English/Portuguese note persistence and completion, course filtering, notebook entries, deletion of the temporary test notes, and Foundation/Meditation navigation. The tested mobile pages had no horizontal overflow and no captured script errors. Browser tests use a separate local preview origin so existing study notes are unaffected. The in-app browser's download-event wait timed out; a completed native download was not verified there. Portfolio contents and filenames passed the runtime test. Structural tests and browser checks do not establish educational effectiveness or constitute expert review of the full translation.
