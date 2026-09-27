// Faith Craft Family Edition: levels, ages, and age-appropriate wording.
// Reading level and vocabulary level are separate (0 = Pre-K ... 9 = Grade 8). Age sets tone and styling only.
export const LV_MAX = 9;
export const LV_SHORT = ['Pre-K', 'K', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
export const READ_DESC = [
  'Pre-K: pre-reader. Listening, rhymes, letter sounds, and first sounds. Everything is read aloud; no reading needed.',
  'Kindergarten: letter sounds, short-vowel words like cat and sun, blends (st, fr), digraphs (sh, ch, th), first tricky words.',
  'Grade 1: magic e (cake, kite), ee, oo, ou, oi, r-controlled vowels (er, ar, or), ai/ay and oa, two-syllable words.',
  'Grade 2: other spellings for long vowels (ai, ay, oa, ie), er/ir/ur, two-syllable words, common prefixes and suffixes.',
  'Grade 3: meanings of prefixes and suffixes, multisyllable words, main idea.',
  'Grade 4: longer multisyllable words, prefixes and suffixes, context clues.',
  'Grade 5: harder multisyllable words, first Greek and Latin roots, longer passages.',
  'Grade 6: morphology (roots and affixes), context clues, inference, longer passages.',
  'Grade 7: academic words, inference and main idea across a passage.',
  'Grade 8: complex academic words, inference, author’s point, longer passages.',
];
export const VOCAB_DESC = [
  'Pre-K: everyday naming words (animals, food, things at home).',
  'Kindergarten: more naming words (animals, food, objects in stories).',
  'Grade 1: less common everyday words (anchor, feather, tent).',
  'Grade 2: story and world words (volcano, compass, scroll).',
  'Grade 3: precise describing and action words (enormous, fragile, gather).',
  'Grade 4: words for feelings, actions and ideas (reluctant, observe, scarce).',
  'Grade 5: school-subject words (evidence, habitat, consequence).',
  'Grade 6: academic words (analyze, perspective, resilient).',
  'Grade 7: abstract words and shades of meaning (inevitable, ambiguous, candid).',
  'Grade 8: advanced words (meticulous, pragmatic, benevolent).',
];
export const clampLv = v => Math.max(0, Math.min(LV_MAX, Math.round(Number(v) || 0)));
// Suggested level from age (a gentle guess used as a starting point only)
export const lvForAge = age => clampLv((Number(age) || 7) - 5);
// Story/mission text tiers: 0 = Pre-K/K, 1..3 = grades 1..3, 4 = grades 4-5, 5 = grades 6-8
export const textTier = lv => lv <= 1 ? 0 : lv <= 4 ? lv - 1 : lv <= 6 ? 4 : 5;
// Mission dialog: 'k' (Pre-K, K), 'base' (grades 1-3), 'adv' (grades 4-8)
export const missionTier = lv => lv <= 1 ? 'k' : lv <= 4 ? 'base' : 'adv';
export const AGES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export const ageBand = age => (Number(age) || 7) <= 7 ? 'young' : (Number(age) || 7) <= 11 ? 'mid' : 'teen';
export const isPreReader = lv => lv === 0;

// Short spoken feedback per age band. Never "wrong". Teens get a calm, grown-up tone.
export const BAND_PHRASES = {
  young: {
    right: ['Yes! That’s right.', 'You got it!', 'Nice work!', 'Great job!', 'That’s it!', 'Awesome!'],
    tryAgain: ['Good try. Here’s the answer.', 'Nice try. Let’s look at the answer.'],
    placement: ['Great listening!', 'Thanks! Here comes the next one.', 'You’re doing great!', 'Nice! Let’s keep going.', 'Good thinking!'],
    stepDone: ['Step done! Nice work.', 'Great! On to the next step.', 'You did it! Step done.'],
    results: ['Goal reached! You mastered this.', 'Good work! Keep practicing to reach the goal.', 'Good effort! Practice helps. You can try again anytime.'],
    levelUp: 'Level up! You are ready for harder words.',
    levelDown: 'Let’s practice some easier words for a while.',
  },
  mid: {
    right: ['Correct!', 'Nice work.', 'That’s it.', 'Well done.', 'Right!'],
    tryAgain: ['Not quite. Here’s the answer.', 'Close. Here’s the answer.'],
    placement: ['Thanks. Next one.', 'Got it. Keep going.', 'Nice. Here’s the next one.', 'Good. Keep it up.'],
    stepDone: ['Step complete.', 'Nice work. Next step.', 'Done. On to the next step.'],
    results: ['Goal reached. Well done.', 'Good work. Keep practicing to reach the goal.', 'Good effort. You can try again anytime.'],
    levelUp: 'Level up. Harder words are unlocked.',
    levelDown: 'Switching to slightly easier practice for a while.',
  },
  teen: {
    right: ['Correct.', 'Nice work.', 'Right.', 'Good call.', 'Solid.'],
    tryAgain: ['Not quite. Here’s the answer.', 'Close. The answer is shown.'],
    placement: ['Got it. Next.', 'Thanks. Next one.', 'Okay. Keep going.', 'Noted. Next one.'],
    stepDone: ['Step complete.', 'Objective done.', 'Done. Next objective.'],
    results: ['Goal reached. Well done.', 'Good work. A little more practice will reach the goal.', 'Good effort. You can retry anytime.'],
    levelUp: 'Level up. Harder material unlocked.',
    levelDown: 'Adjusting to slightly easier practice for now.',
  },
};
// Player looks for the profile picker
export const SKINS = ['#f3d2b3', '#e3a97e', '#c68b59', '#9a6440', '#6b4428'];
export const HAIRS = ['#2a1b10', '#5a3818', '#a0612a', '#e2c16b', '#b8412c', '#8a8a8a'];
export const SHIRTS = ['#2bb3a3', '#4a90d9', '#e25a5a', '#8e5cc7', '#f0a030', '#3aa76d', '#555c66'];
export const FOCUS_SOUNDS = { r: 'R', l: 'L', s: 'S', th: 'TH', bl: 'Blends' };
