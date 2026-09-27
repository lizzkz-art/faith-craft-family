# Curriculum sources: "Follow school order (MCPS)"

Checked on Sunday, September 27, 2026. The game copies only the **order of topics**. It does not copy any curriculum text, stories, word lists from lessons, or activities. All game items were written for this game.

## What was confirmed

### MCPS program (Pre-K to Grade 5): Amplify Core Knowledge Language Arts (CKLA)
- **MCPS, English Language Arts Elementary page** (official): https://www.montgomeryschoolsmd.org/curriculum/english/es
  - The page says "Amplify Core Knowledge Language Arts (CKLA) is a language arts program for Grades PreK–5 that combines a multi-sensory approach to phonics with rich texts…".
  - It says each day in PreK–2 includes one foundational-skills lesson and one knowledge lesson.
  - It links the CKLA Program Guide K-5, the CKLA PreK Overview, and the CKLA Caregiver Hub (parent guide).
- **MCPS school document, Back-to-School Night 2026–27** (on montgomeryschoolsmd.org, Ronald McNair ES): https://www.montgomeryschoolsmd.org/siteassets/schools/elementary-schools/p-s/ronaldmcnaires/uploadedfiles/news/curriculum-back-to-school-night-26-27.pdf
  - It says "Reading - changed from CKLA 2nd edition to CKLA 3rd edition" for 2026–27, and that DIBELS is given at the beginning, middle, and end of the year.
- **MCPS ELA home page** (official): https://www.montgomeryschoolsmd.org/curriculum/english/
  - It says instruction is grounded in the Maryland College and Career Ready Standards.
- Background (not official MCPS): Bethesda Magazine, March 20, 2024, reported that the Board adopted Amplify CKLA for PreK–5, replacing Benchmark, starting in 2024–25: https://bethesdamagazine.com/2024/03/20/school-board-adopts-new-elementary-english-language-arts-curricula/

### Middle school (Grades 6–8)
- **MCPS, English Language Arts Middle page** (official): https://www.montgomeryschoolsmd.org/curriculum/english/ms
  - It lists Grade 6, 7, and 8 English courses. Students work on reading literature, reading informational text, writing, speaking and listening, and language. It also lists vocabulary acquisition.
  - The page does **not** publish a word-study or phonics sequence for Grades 6–8.
- One MCPS middle school page (Forest Oak MS) says its 6th–8th grade classes use CKLA: https://www.montgomeryschoolsmd.org/schools/forestoakms/departments/english/
  - This is a single school's page, so the game does **not** treat it as district-wide.
- **Result:** for Grades 6–8 the game falls back to the Maryland standards order (see below).

### Order of phonics patterns (K–2): public CKLA Skills scope-and-sequence overviews (Amplify)
- Kindergarten: https://rebuild.prod.amplify.com/wp-content/uploads/2022/10/CKLA-Skills-ScopeSequence-K.pdf
  - Order: oral blending of syllables and sounds → single letter sounds (m, a, t, d, o, c, g, i, then n, h, s, f, v, z, p, e, then b, l, r, u, w, j, y, x, k) → one-syllable short-vowel words → consonant clusters → digraphs (ch, sh, th, qu, ng) → tricky words → ee, a_e, i_e, o_e, u_e at the end of K.
- Grade 1 (3rd edition): https://learning.amplify.com/m/35c2ce3d69c215f3/original/CKLA_G1_Skills_ScopeSequence_3E.pdf
  - Order: review of the basic code → ee, a_e, i_e, o_e, u_e → oo, ou, oi, aw → er, ar, or and two-syllable words → other spellings for consonant sounds (ch/tch, g for /j/, v/ve, soft c, kn, wh, ng) → ai/ay and oa.
- Grade 2: https://rebuild.prod.amplify.com/wp-content/uploads/2022/10/CKLA_G2_Skills_Scope_and_Sequence-4.pdf, plus Core Knowledge unit overviews (G2 Units 2–4) at coreknowledge.org
  - Order: review → spelling alternatives for /ae/, /oe/, /ie/, /ue/, /aw/ (ai, ay, oa, oe, ie, ue, au) → er/ur/ir, y, igh, ow, e/y/ey → two-syllable words.
- **Caveat:** these overviews are Amplify's public documents. The K and Grade 2 overviews may be for an earlier edition than the CKLA 3rd edition that MCPS started in 2026–27. The broad order (sounds → CVC → clusters → digraphs → magic e → vowel teams → r-controlled → alternatives → multisyllable) should be the same, but individual units may have moved.

### Maryland College and Career Ready Standards (MCCRS) for ELA (Common Core based)
- MSDE standards page: https://marylandpublicschools.org/programs/Pages/ELA/MCCR.aspx
  - This has revised PreK–12 standards (revisions were reviewed by the State Board in June 2025). It says a separate Pre-K document is "coming soon" and that Pre-K skills are listed as prerequisites in the K documents.
- MSDE vertical progressions: https://www.marylandpublicschools.org/programs/Pages/ELA/progressions.aspx
  - Foundational Skills progression (PDF). The game follows:
    - Pre-K: rhyming, syllables, onset-rime, some consonant sounds.
    - K: consonant sounds, long and short vowels, high-frequency words.
    - Grade 1: digraphs, final -e and common vowel teams, syllables, two-syllable words.
    - Grade 2: more vowel teams, two-syllable long-vowel words, common prefixes and suffixes.
    - Grade 3: meanings of prefixes and derivational suffixes, Latin suffixes, multisyllable words.
    - Grades 4–5: letter-sound knowledge, syllable patterns, and morphology (roots and affixes).
  - Language progression (PDF). The game follows:
    - Grade 1: sentence context and affixes.
    - Grades 4–8: Greek and Latin affixes and roots.
    - Grades 5–8: synonyms, antonyms, analogies, and connotation.
  - Reading Informational Text progression (PDF). The game follows:
    - Key details (K–2) → main idea (3–5) → central idea (6–8).
    - Inference with textual evidence (Grade 4 and up).

## How the game uses this
- `js/curriculum.js` holds the topic order per level (Pre-K, K, Grades 1–8) and a short topic list for parents.
- When **Follow school order (MCPS)** is on (the default, set per player in the Parent area):
  - Word Games are listed in that order, and the first game not yet at 80% is marked "Up next".
  - Some games unlock earlier to match school. For example, consonant clusters and digraphs appear in Kindergarten, prefixes and suffixes in Grade 2, and magic e at the end of K and in Grade 1.
  - Sight-word sentences in K and Grade 1 come in the order that high-frequency "tricky" words are introduced.
- When it is off, games use the game's own general level ranges.
- The placement quiz and adaptive levels work the same either way.

## Not confirmed
- The unit-by-unit order of CKLA **3rd edition** for K and Grade 2 was not in a public MCPS document. The public Amplify overviews were used as listed above.
- MCPS does not publish a phonics or word-study sequence for Grades 6–8 on its district pages. Those levels follow the MCCRS order.
