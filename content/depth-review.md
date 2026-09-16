# Course explanation revision — 16 September 2026

This revision adds original explanatory teaching to every numbered lesson in all 18 course routes: 269 lesson identities, 538 English and Portuguese pages. It preserves the existing selected passages, close readings, activities, assessments, and study notes. Related lessons sometimes share a concept explanation; this is not a claim that every lesson received an independent chapter commentary.

The additions explain relationships behind summary ideas, introduce intermediate reasoning, and use everyday examples. They distinguish an author's spiritual interpretation from observation and from the learner's own judgment. The fourfold and ninefold accounts, perception and thinking, moral imagination, agricultural preparations, food processing, biography, and temperament are among the expanded topics.

## Source access and limits

The bibliography and provenance remain in `source-register.json`, course source records, chapter plans, and the individual reading-review files. Local PDFs, Markdown transcripts, OCR extracts, and previously verified passage records support this work. Foodwise, Nutrition, What Is Biodynamics?, and Phases have locally available supplied PDFs and working text; other books also have local PDFs or extracted text. Some older original Markdown filenames in the register were not located in Downloads. Their review records and extracted reading material remain. The original register is historical provenance, not a guarantee that every original file is currently present.

This revision uses the existing reviewed teaching and source mappings, with targeted consultation of Foodwise extracts. It does not represent a fresh cover-to-cover rereading or page-image verification of every book. It introduces no new attributed quotations. Foodwise references use PDF capture pages, matching its reading review. Gaps and interrupted captures recorded in earlier reviews still apply. Private source files remain outside the published site.

## Implementation and checks

Original bilingual additions live in `content/depth/`; `scripts/build-course-depth.mjs` inserts them before the source study or, in the three older temperament companions, before the worked example. Terminology linking runs afterward so new explanations can link to the existing reference. Nutrition's closing lesson now acknowledges the available Biodynamics companion.

`scripts/check-course-depth.mjs` checks every numbered lesson against the content map, translation paragraph parity, source labels, and preservation of the authored explanations after terminology linking. The existing course, source-passage, navigation, and study-control checks remain applicable.

Validation completed: all 16 check scripts passed, including local links and anchors on 579 pages. The four newer course quotation checks also passed against local OCR/Markdown sources. Browser checks covered Foodwise Chapter 1, its Portuguese language link, the explanation layout, and narrow-screen overflow. No study notes were changed.
