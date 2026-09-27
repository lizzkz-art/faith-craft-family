// School order (MCPS). Sequence of TOPICS only, taken from public sources listed in CURRICULUM_SOURCES.md:
// - MCPS uses Amplify CKLA for PreK–5 (montgomeryschoolsmd.org/curriculum/english/es).
// - Order of phonics patterns follows the public CKLA Skills scope-and-sequence overviews (K, Grade 1, Grade 2).
// - Grades 3–8 follow the Maryland College and Career Ready Standards (MCCRS) vertical progressions.
// No curriculum text, stories, or lessons are copied; only the order in which topics come up.
// Level index: 0 = Pre-K, 1 = K, 2..9 = Grades 1..8.

// Games in the order a child meets these topics at school, for each level.
// When "Follow school order (MCPS)" is on, the Word Games list uses this order and range,
// and the first game not yet at 80% is marked "Up next".
export const SCHOOL_SEQ = {
  0: ['rhyme', 'first', 'letters', 'vocab'],                                   // PreK: rhyme, words/syllables, onset, some letter sounds
  1: ['rhyme', 'first', 'letters', 'cvc', 'bd', 'blend', 'digraph', 'sight', 'magic_e', 'vocab'], // K: sounds → CVC → clusters → digraphs → tricky words → magic e (end of K)
  2: ['cvc', 'blend', 'digraph', 'magic_e', 'sort_ee', 'diph', 'rctrl', 'sort_ai', 'sight', 'syll', 'vocab'], // G1: review → magic e/ee → oo ou oi aw → er ar or → consonant alternatives → ai/ay, oa
  3: ['magic_e', 'sort_ai', 'sort_ee', 'fill_vt', 'rctrl', 'diph', 'syll', 'sight', 'spell', 'affix', 'vocab'], // G2: vowel spelling alternatives → er/ir/ur → y, igh, ow → two-syllable words, prefixes & suffixes
  4: ['syll', 'affix', 'spell', 'sight', 'fill_vt', 'diph', 'vocab'],          // G3: prefixes/derivational suffixes, Latin suffixes, multisyllable words
  5: ['affix', 'syll', 'spell', 'context', 'sight', 'vocab'],                  // G4: roots & affixes, Greek/Latin affixes and roots, context
  6: ['affix', 'context', 'syll', 'spell', 'vocab'],                           // G5
  7: ['affix', 'context', 'syll', 'spell', 'vocab'],                           // G6: Greek/Latin affixes and roots, context, connotation
  8: ['context', 'affix', 'spell', 'syll', 'vocab'],                           // G7: synonym/antonym, analogy, connotation
  9: ['context', 'affix', 'spell', 'syll', 'vocab'],                           // G8
};

// Plain-language topics for parents ("At school around this level"). Topics only.
export const SCHOOL_TOPICS = {
  0: ['Rhyming words', 'Clapping syllables', 'First sounds in words', 'Some letter sounds', 'Listening to stories and new words'],
  1: ['Blending sounds into words', 'Letter sounds, one at a time', 'Short-vowel words (cat, dog)', 'Consonant clusters (st, fr)', 'Digraphs (ch, sh, th, qu, ng)', 'Tricky words (the, said, was)', 'Magic e and ee at the end of the year'],
  2: ['Short-vowel review', 'Magic e (a_e, i_e, o_e, u_e) and ee', 'oo, ou, oi, aw', 'R-controlled vowels (er, ar, or)', 'Other spellings for consonant sounds (tch, soft c and g, kn, wh)', 'Vowel teams ai, ay, oa', 'Two-syllable words', 'Main topic and key details'],
  3: ['Spelling alternatives for long vowels (ai, ay, oa, oe, ie, ue)', 'er, ir, ur', 'y, igh, ow', 'Two-syllable words with long vowels', 'Common prefixes and suffixes', 'Who, what, where, when, why, how questions'],
  4: ['Meaning of common prefixes and suffixes', 'Latin suffixes', 'Multisyllable words', 'Main idea and key details', 'Using context as a clue'],
  5: ['Roots and affixes to read long words', 'Greek and Latin affixes and roots', 'Inference from details', 'Main idea and summary'],
  6: ['Greek and Latin roots', 'Quoting the text for inferences', 'Two or more main ideas', 'Context clues'],
  7: ['Greek and Latin affixes and roots (audience, auditory)', 'Citing evidence for inferences', 'Central idea', 'Connotation of similar words'],
  8: ['More Greek and Latin roots', 'Several pieces of evidence', 'Two or more central ideas', 'Synonyms, antonyms, analogies'],
  9: ['Advanced roots (precede, recede)', 'Strongest evidence for an inference', 'Central idea development', 'Connotation and word choice'],
};

// Tricky (high-frequency) words in the order CKLA introduces them in K and Grade 1 (public scope and sequence).
export const TRICKY_ORDER = ['one', 'two', 'three', 'the', 'a', 'blue', 'yellow', 'look', 'are', 'little', 'down', 'out', 'of', 'funny', 'all', 'from', 'was', 'when', 'why', 'to', 'where', 'no', 'what', 'so', 'which', 'once', 'said', 'says', 'were', 'here', 'there', 'he', 'she', 'we', 'be', 'me', 'they', 'their', 'my', 'by', 'you', 'your'];

export function schoolGames(all, readLv) {
  const seq = SCHOOL_SEQ[readLv] || SCHOOL_SEQ[9];
  return seq.map(id => all.find(g => g.id === id)).filter(Boolean);
}
