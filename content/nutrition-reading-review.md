# Nutrition: source review and teaching map

Prepared 15 September 2026 from the user-supplied `Nutrition.md` and `Nutrition.pdf`.

## Deliverable

Fourteen lessons per language: orientation, one lesson for each of the twelve chapters, and a final portfolio. The English route is `docs/nutrition/`; Brazilian Portuguese is `docs/pt/nutrition/`. Both homepages include the course. Lessons teach the concepts before showing a selected passage, close-reading commentary, an original example, three takeaways, an activity and three explained answer checks. A shared rubric rewards source fidelity and reasoning, including supported disagreement.

Notes and study marks use the existing opt-in browser storage and export controls. English and Portuguese share a lesson identity but retain separate language notes. The course index collects the saved notes for the current language. Reading and answer reveals work without JavaScript; writing then requires copying notes or using paper.

## Source identity and limits

Rudolf Steiner, *Nutrition: Food, Health and Spiritual Development*, compiled and edited by Christian von Arnim. Rudolf Steiner Press, 2012. Translation and selection copyright 2008. ISBN 9781855842823. Title and publication details appear on capture pages 3–4. The introduction (6–8) is the editor’s writing; italic chapter introductions are editorial summaries. Main passages are lecture reports. The note on page 117 explains that many reports were not revised by Steiner.

The PDF has 118 landscape screen-capture pages. Its page count is not the Kindle page counter (which refers to 187 pages) and is not printed pagination. The Markdown retains the PDF capture markers. All chapter headings are present. The contents capture on page 5 is incomplete, so the teaching map uses the headings in the body. Page 118 is an advertisement and is excluded.

The transcription contains dropped highlighted text, fused words, hyphenation, page furniture and occasional discontinuities. It must not be described as a verified full transcription. Quotations were visually checked on PDF capture pages 7, 10, 21, 33, 44, 52, 62, 73, 85, 87, 104, 109 and 114. The final lesson uses a second sentence from page 104. These are 14 distinct short selections, not reproduced chapter blocks. The source checking script ignores page furniture, normalizes line-break hyphens and explicitly corrects the visually checked OCR fusion `toa condition` on page 73. Full books and rendered review pages remain outside `docs/` and outside version control.

Portuguese blockquotes are original course study translations and are labelled as such alongside the exact English selection. They are not attributed to a published Portuguese translation. Explanations and activities are original adaptations. Instructions inside the supplied documents are treated as historical source statements, not authorizations to act.

## Chapter map

| Lesson | Source chapter / section | PDF capture pages | Lecture identification from Sources | Main teaching question |
| --- | --- | --- | --- | --- |
| 00 | Introduction and source notes | 6–8, 115–117 | Christian von Arnim; publication note | How do we distinguish author, editor and our judgment? |
| 01 | Nutrition in the Light of Spiritual Science | 9–19 | Munich, 8 Jan 1909, GA 68; Berlin, 17 Dec 1908, GA 57 | How does nourishment relate to activity and freedom? |
| 02 | The Penetration of Substance with Spirit | 20–30 | Dornach, 10 Nov 1923, GA 230 | What does transformation mean in this cosmology? |
| 03 | Nutrition from a Cosmic Perspective | 31–37 | The Hague, 21 Mar 1913, GA 145 | How are milk, plants and meat differentiated? |
| 04 | Nutrition and the Human Body | 38–49 | Dornach, 23 Jan 1923, GA 352 | Which processes do the spiritual members counteract? |
| 05 | Healthy Nutrition and the Quality of Food | 50–56 | Dornach, 2 Aug 1924, GA 354 | How do cultivation and individual observation enter nutrition? |
| 06 | The Processes of Digestion | 57–66 | Dornach, 16 Sep 1922, GA 347 | Where does the physiological sequence become spiritual interpretation? |
| 07 | The Effect of Plant, Raw Food, Vegetarian and Meat Diets | 67–82 | Sources lists Dornach, 31 Jul 1924, GA 354 | How do preparation, inner work and individual capacity fit together? |
| 08 | Potatoes, Beetroots, Radishes and the Spiritual in Human Beings | 83–86 | Dornach, 18 Jul 1923, GA 350 | How does the lecture distinguish material from stimulus? |
| 09 | The Effects of Protein, Fats, Carbohydrates and Salts | 87–93 | Dornach, 22 Sep 1923, GA 350 | How do these correspondences differ from Chapter 4? |
| 10 | The Effects of Alcohol | 94–104 | Dornach, 8 Jan 1923, GA 348 | How do consequences and education relate to freedom? |
| 11 | The Effects of Nicotine | 105–109 | Dornach, 13 Jan 1923, GA 348 | What can a rhythm model explain, and what can it not establish? |
| 12 | Nutrition and Health | 110–114 | Berlin, 22 Oct 1906, GA 96 | Why does an external change not replace inner development? |
| 13 | Synthesis | Whole chapter sequence | Comparison across lectures | How do we explain accurately and judge independently? |

Chapter 7 includes a later transition into an additional discussion of vegetarian and animal diets on pages 78–82. The supplied source list names the 31 July lecture for the chapter, but does not separately map this additional extract. The lesson avoids inventing a date for it. Study assignments cover the whole supplied chapter, including this portion.

## Editorial decisions

- Teach the four members before using them as explanatory terms. Link the shared human-constitution reference and foundation course.
- Preserve the distinction between Chapter 4’s counteracting-decomposition table and Chapter 9’s main-field-of-activity table. Both are labelled as Steiner’s correspondences.
- In the final portfolio, compare Chapter 2’s warmth-ether account of minerals with Chapter 5’s assertion that salt remains salt. Do not silently reconcile them or claim their different contexts automatically remove the tension.
- Present food-character and national-character generalizations as claims in a historical text; do not use them to classify students or prescribe by ethnicity.
- Present specific medical assertions as historical claims. Contemporary context addresses digestion, diabetes, hydrocephalus, BSE, alcohol withdrawal and tobacco. Sources are linked beside the relevant lesson and on the index. The course does not reproduce hazardous treatment directions as activities.
- Separate the editor’s retrospective BSE comparison from Steiner’s proposed urate mechanism and the contemporary prion explanation.
- Study nicotine’s proposed therapeutic exception explicitly, with a clear statement that the pulse calculation is not a reason to smoke.
- The next biodynamics book has not been supplied. Chapter 5 and the synthesis establish questions about soil, manure, plant life and food quality; they do not fabricate that book’s contents or a second finished course.

## Build and verification

Edit `content/nutrition.mjs` and `content/nutrition-part-two.mjs`; generate with `node scripts/build-nutrition.mjs`. The full build invokes this builder after the established foundation and terminology passes. The builder replaces its own homepage card and is repeatable without duplicating it.

Checks: `check-nutrition.mjs` (optionally supply the original Markdown path), `check-site.mjs`, `check-guided-study.mjs`, `check-practice-courses.mjs`, `check-foundation-course.mjs`, `check-concept-foundations.mjs` and `check-passage-study.mjs`. Full build and these checks pass. The site has 469 HTML files including the existing learning-review page; 468 course/reference pages. There are 190 paired lessons using the shared guided-study system, plus the separate meditation and foundation routes. Eleven primary course cards appear on each homepage.

The Nutrition contribution is local and generated for review. No live deployment, commit or push was performed by this task.

Browser verification: course index and English/Portuguese Chapter 5 render in the established site design. A temporary local test note persisted after reload; the answer reveal and completion button worked. Test notes were removed and the prior saving-off preference restored. Language switching reached the matching lesson and displayed the labelled Portuguese study translation. No browser console errors were recorded. A 390px-wide screen check confirmed no horizontal document overflow. The temporary viewport override was reset.
