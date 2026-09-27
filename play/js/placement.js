// "Let's find your starting spot!" A short adaptive placement quiz.
// A quick starting-point estimate, not a formal reading assessment.
// Two interleaved domains: reading (or pre-reading listening skills for ages 3-4) and listening vocabulary.
// Each level is checked with a small block of items taken from the SAME word banks the games use at that level
// (spelling, word parts, context clues, sight words, vocabulary), so the result predicts game difficulty.
// Climbing is deliberately careful: a level is passed only with about 3 of 4 right after allowing for lucky
// guesses, the walk moves up one level at a time, the top level gets extra confirmation items, and levels far
// above the child's age need very strong proof. The result is the highest level passed with good accuracy.
import { PIC, VOCAB, SYN, RHYME, FIRST, SIGHT, SPELL, AFFIX, CONTEXT, shuffle } from './bank.js';
import { LV_MAX, clampLv } from './levels.js';

// (b1) Hear a word, tap the written word. Distractors look or sound similar but are pronounced differently.
export const DEC = [
  [1, 'cat', ['cot', 'cap', 'bat']], [1, 'sun', ['sit', 'run', 'sap']], [1, 'dog', ['dig', 'log', 'dot']], [1, 'pig', ['peg', 'big', 'pin']], [1, 'bed', ['bad', 'red', 'bet']], [1, 'hop', ['hip', 'mop', 'hot']],
  [2, 'ship', ['chip', 'sip', 'shop']], [2, 'frog', ['from', 'fog', 'flag']], [2, 'black', ['block', 'back', 'blank']], [2, 'thin', ['then', 'tin', 'chin']], [2, 'stop', ['step', 'spot', 'top']], [2, 'chest', ['chess', 'best', 'cast']],
  [3, 'rain', ['ran', 'ruin', 'rail']], [3, 'boat', ['bat', 'beat', 'boot']], [3, 'cake', ['cape', 'cook', 'kick']], [3, 'star', ['stir', 'stare', 'store']], [3, 'night', ['net', 'knit', 'nice']], [3, 'shirt', ['short', 'shift', 'skirt']],
  [4, 'coin', ['corn', 'cone', 'cane']], [4, 'cloud', ['clod', 'could', 'clown']], [4, 'thunder', ['tender', 'hunter', 'thinner']], [4, 'careful', ['carpet', 'colorful', 'cheerful']], [4, 'unlock', ['unpack', 'uncle', 'unlike']], [4, 'toys', ['tries', 'toes', 'ties']],
  [5, 'disappear', ['disagree', 'disappoint', 'despair']], [5, 'carefully', ['cheerfully', 'carelessly', 'colorfully']], [5, 'adventure', ['advantage', 'adverb', 'avenue']], [5, 'telescope', ['telephone', 'television', 'envelope']], [5, 'mysterious', ['miserable', 'marvelous', 'mischievous']],
  [6, 'concentrate', ['congratulate', 'celebrate', 'contemplate']], [6, 'responsibility', ['possibility', 'respectable', 'reliability']], [6, 'transportation', ['transformation', 'translation', 'temptation']], [6, 'enormous', ['anonymous', 'numerous', 'nervous']], [6, 'furious', ['curious', 'various', 'glorious']],
  [7, 'hypothesis', ['hypocrisy', 'photosynthesis', 'parenthesis']], [7, 'magnificent', ['manufacture', 'significant', 'magnifying']], [7, 'perseverance', ['persistence', 'preference', 'appearance']], [7, 'accommodate', ['accumulate', 'accompany', 'accurate']], [7, 'deliberate', ['delicate', 'liberate', 'desperate']],
  [8, 'ambiguous', ['ambitious', 'amphibious', 'arduous']], [8, 'inevitable', ['invisible', 'inedible', 'indivisible']], [8, 'simultaneous', ['spontaneous', 'miscellaneous', 'similarity']], [8, 'circumstance', ['circumference', 'circulate', 'substance']], [8, 'phenomenon', ['pneumonia', 'phonetics', 'pheasant']],
  [9, 'meticulous', ['miraculous', 'ridiculous', 'metallic']], [9, 'pragmatic', ['dramatic', 'problematic', 'programmer']], [9, 'conscientious', ['contentious', 'conscious', 'consecutive']], [9, 'ubiquitous', ['ambiguous', 'iniquity', 'equitable']], [9, 'benevolent', ['belligerent', 'relevant', 'equivalent']],
];
// (b2) Read a word (not spoken), tap the matching picture. Picture names look alike.
export const READPIC = [
  [1, 'cat', ['hat', 'bat', 'cap']], [1, 'sun', ['nut', 'bus', 'bug']], [1, 'dog', ['log', 'fox', 'pig']], [1, 'bed', ['bell', 'web', 'hen']], [1, 'box', ['fox', 'bus', 'bat']],
  [2, 'frog', ['flag', 'fox', 'drum']], [2, 'ship', ['sheep', 'shell', 'chick']], [2, 'clock', ['lock', 'block', 'sock']], [2, 'truck', ['duck', 'drum', 'tree']], [2, 'crab', ['cake', 'car', 'crown']],
  [3, 'train', ['rain', 'tree', 'chain']], [3, 'boat', ['goat', 'coat', 'bat']], [3, 'star', ['car', 'shark', 'storm']], [3, 'snake', ['snail', 'cake', 'skate']], [3, 'horse', ['house', 'horn', 'nurse']],
  [4, 'turtle', ['turkey', 'button', 'kettle']], [4, 'castle', ['candle', 'camel', 'cactus']], [4, 'pumpkin', ['penguin', 'popcorn', 'puppet']], [4, 'feather', ['father', 'leather', 'weather']],
].filter(r => r[2].every(w => PIC[w]) && PIC[r[1]]);
// (c) Read a sentence or short passage, answer a question (context clues and inference at the top levels).
// Levels match the in-game passages: grades 6-8 need real inference, author's point, and advanced words.
export const SENT = [
  [3, 'The goat ate the green grass by the gate.', 'What did the goat eat?', 'grass', ['a gate', 'a coat', 'a cake']],
  [3, 'Sam put on his coat because it was cold.', 'Why did Sam put on his coat?', 'It was cold.', ['It was new.', 'It was red.', 'It was hot.']],
  [3, 'The bird flew to its nest in the tall tree.', 'Where did the bird go?', 'to its nest', ['to the pond', 'to a boat', 'to the barn']],
  [3, 'Mia fed her dog and then went to bed.', 'What did Mia do first?', 'fed her dog', ['went to bed', 'read a book', 'took a bath']],
  [4, 'Maya packed an extra snack because the hike would be long.', 'Why did Maya pack an extra snack?', 'The hike would be long.', ['She was bored.', 'The hike was short.', 'She wanted to share with a bird.']],
  [4, 'The baker was tired, but she stayed late to finish the bread for the village.', 'What does this tell you about the baker?', 'She works hard for others.', ['She does not like bread.', 'She lives far away.', 'She is always sleepy.']],
  [4, 'When the lights went out, Leo found a flashlight in the kitchen drawer.', 'What problem did Leo have?', 'The lights went out.', ['He lost his dog.', 'He was hungry.', 'The drawer was stuck.']],
  [4, 'The team practiced every day, so they felt ready for the big game.', 'Why did the team feel ready?', 'They practiced every day.', ['They had new shirts.', 'The game was cancelled.', 'They were very tall.']],
  [5, 'The puppy was so timid that it hid behind the couch when guests arrived.', 'What does timid mean?', 'shy and easily scared', ['very loud', 'very hungry', 'full of energy']],
  [5, 'After the long hike, the hikers were famished and ate every bite of their lunch.', 'What does famished mean?', 'very hungry', ['very cold', 'very happy', 'very lost']],
  [5, 'Ana was elated when she heard her poem had won first prize.', 'What does elated mean?', 'very happy', ['worried', 'confused', 'sleepy']],
  [5, 'The old bridge was unstable, so the town closed it until it could be repaired.', 'Why did the town close the bridge?', 'It was not safe to cross.', ['It was too crowded.', 'It was brand new.', 'It was painted red.']],
  [5, 'Priya reread the chapter twice and wrote notes in the margins before the test.', 'What can you infer about Priya?', 'She wanted to be well prepared.', ['She had never read the book.', 'She did not care about the test.', 'She forgot about the test.']],
  [6, 'Despite the drizzle, the team kept practicing; the light rain did not stop them.', 'What does drizzle mean?', 'light rain', ['heavy snow', 'strong wind', 'hot sun']],
  [6, 'The instructions were so vague that no one knew what to do first.', 'What does vague mean?', 'not clear', ['very long', 'very funny', 'written neatly']],
  [6, 'Grandpa is frugal; he fixes old things instead of buying new ones.', 'What does frugal mean?', 'careful about spending money', ['very forgetful', 'good at sports', 'always in a hurry']],
  [6, 'Jonah checked the sky, grabbed his umbrella, and zipped his jacket to his chin.', 'What does Jonah probably expect?', 'cold, rainy weather', ['a hot, sunny day', 'a birthday party', 'a day at the beach']],
  [6, 'Bees carry pollen from flower to flower. Without bees, many fruits and vegetables could not grow.', 'What is the main idea?', 'Bees are important for growing food.', ['Bees are yellow and black.', 'Flowers smell sweet.', 'Vegetables are healthy.']],
  [6, 'His recollection of the event was hazy, so the investigators relied on photographs instead.', 'Why did the investigators rely on photographs?', 'His memory was unclear.', ['The photographs were funny.', 'He refused to talk.', 'He took the photographs himself.']],
  [7, 'Unlike his talkative sister, Ben was reticent and rarely shared his opinions.', 'What does reticent mean?', 'quiet and reserved', ['loud and cheerful', 'angry and rude', 'curious and bold']],
  [7, 'The mayor’s plan was controversial; half the town praised it, and half protested.', 'What does controversial mean?', 'causing strong disagreement', ['liked by everyone', 'very expensive', 'kept secret']],
  [7, 'For years the canal was the fastest trade route. When railroads arrived, shipping on the canal slowly declined.', 'What can you infer?', 'Railroads became a faster way to ship goods.', ['The canal dried up.', 'People stopped trading.', 'Railroads were built on the canal.']],
  [7, 'Nehemiah’s builders held a tool in one hand and a weapon in the other as they rebuilt the wall.', 'What can you infer about their situation?', 'They expected an attack while they worked.', ['They did not know how to build.', 'They were building a new city far away.', 'They were practicing for a parade.']],
  [8, 'The novel’s ending was bittersweet: the friends finally won, but they had to say goodbye.', 'What does bittersweet mean?', 'both happy and sad', ['tasting like candy', 'completely tragic', 'very confusing']],
  [8, 'Although the author praises technology, she warns that constant screen time can crowd out real conversation.', 'What is the author’s main point?', 'Technology helps, but it should not replace real conversation.', ['Technology should be banned.', 'Screens make people smarter.', 'Conversation is old-fashioned.']],
  [8, 'The committee admired the proposal’s ambition but rejected it as financially untenable.', 'Why was the proposal rejected?', 'It would cost more than could be supported.', ['It was not ambitious enough.', 'The committee never read it.', 'It was too short.']],
  [8, 'To the tired travelers, the poem’s lines about home were deeply evocative, bringing back vivid memories of family.', 'What does evocative mean?', 'bringing strong memories or feelings to mind', ['hard to pronounce', 'written long ago', 'silly and funny']],
  [9, 'The senator’s remarks were so equivocal that both sides claimed she agreed with them.', 'What does equivocal mean?', 'open to more than one meaning', ['very angry', 'completely clear', 'extremely short']],
  [9, 'The general’s victory was pyrrhic: his army won the battle but lost so many soldiers that it could not fight again.', 'What does pyrrhic mean here?', 'won at too great a cost', ['won easily', 'won by a trick', 'lost on purpose']],
  [9, 'The author concedes that the old mill gave the town many jobs, yet she argues its pollution outweighed those benefits.', 'Which best describes the author’s position?', 'The mill’s harm was greater than its benefits.', ['The mill should have hired more people.', 'Pollution is not a serious problem.', 'The author has no opinion about the mill.']],
  [9, 'Critics called the speech sanctimonious, complaining that the speaker lectured others about virtues he rarely practiced.', 'What does sanctimonious mean?', 'acting morally better than others', ['deeply humble', 'poorly organized', 'too quiet to hear']],
];
export const LETTER_SETS = [['M', 'N', 'W', 'H'], ['S', 'Z', 'C', 'O'], ['B', 'D', 'P', 'R'], ['T', 'L', 'F', 'I'], ['A', 'K', 'X', 'V'], ['G', 'C', 'Q', 'O'], ['E', 'F', 'L', 'H']];


// Tuning (see tools/placement_sim.mjs for the simulation that checks these)
export const CFG = {
  maxItems: 30,            // whole quiz, both domains
  domMax: { read: 17, vocab: 14, phono: 10 },
  perLevelMax: 6,          // items in one pass/fail block (strict levels allow 7)
  need: 3,                 // correct answers needed to pass a level
  passAdj: 0.6,            // guess-adjusted accuracy to pass (about 70% right with 4 choices)
  failAdj: 0.34,           // guess-adjusted accuracy at or below this, with 2+ misses, fails (2 of 4 or worse)
  confirmItems: 2,         // extra items at the top passed level
  supportItems: 3,         // if the level below the top was never checked: 2 of up to 3 quick items there
  acceptAdj: 0.55,         // guess-adjusted accuracy needed at the final level (about 67-70% right)
  strictAbove: 2,          // levels more than this many above the age-typical level need strong proof
  strictNeed: 5, strictAdj: 0.72, // strong proof: 5 of 5, 5 of 6, or 6 of 7
};
// Age-typical level: age 5 = K (1), age 6 = Grade 1 (2), ... age 9 = Grade 4 (5), age 13+ = Grade 8 (9)
export const ageLevel = age => clampLv((Number(age) || 7) - 4);
// Level suggestions used by "Choose a level" (unchanged)
export function startLevels(age) {
  const a = Number(age) || 7;
  return { read: clampLv(Math.max(1, Math.min(8, a - 5))), vocab: clampLv(Math.min(8, a - 4)), phono: 0 };
}
// The quiz starts one level below the age-typical level so the first questions feel doable.
export function quizStart(age) { const a = ageLevel(age); return { read: Math.max(1, Math.min(8, a - 1)), vocab: Math.max(0, Math.min(8, a - 1)), phono: 0 }; }
// Guess-adjusted accuracy: removes the share of right answers expected from pure guessing.
// adj = (right - expected guesses) / (items - expected guesses). Pure guessing scores about 0.
export function adjAcc(c, n, G) { if (!n) return 0; const den = n - G; return den <= 0 ? 0 : (c - G) / den; }

// ---------- Item bank for each domain and level ----------
const DEC_MAX = 5;            // hearing a word and finding it in print checks decoding up to Grade 4
const SPELL_CH = lv => lv <= 2 ? 3 : 4; // same number of choices as the spelling game
export function itemsAt(dom, lv) {
  const opts = [];
  const mc = (o, answer, others) => { const ch = shuffle([answer, ...others]); o.choices = ch.map(x => ({ v: x, text: x })); o.answer = answer; o.g = 1 / ch.length; return o; };
  if (dom === 'phono') {
    if (lv === 0) RHYME.forEach(([w, r, o]) => opts.push({ key: 'rh:' + w, type: 'rhyme', lv, prompt: `Which one rhymes with ${w}?`, word: w, answer: r, g: 1 / (1 + o.length), choices: shuffle([r, ...o]).map(x => ({ v: x, pic: PIC[x] })), names: true }));
    else FIRST.filter(f => f[0] !== f[1]).forEach(([w, same, o]) => opts.push({ key: 'fs:' + w, type: 'first', lv, prompt: `Which one starts like ${w}?`, word: w, answer: same, g: 1 / (1 + o.length), choices: shuffle([same, ...o]).map(x => ({ v: x, pic: PIC[x] })), names: true }));
  } else if (dom === 'vocab') {
    const here = VOCAB.filter(v => v.lv === lv);
    for (const v of here) {
      const sib = shuffle(here.filter(x => x.w !== v.w)).slice(0, 3);
      if (v.pic) opts.push({ key: 'v:' + v.w, type: 'vpic', lv, prompt: `Tap the ${v.w}.`, word: v.w, answer: v.w, g: 1 / (sib.length + 1), choices: shuffle([v, ...sib]).map(x => ({ v: x.w, pic: x.pic })) });
      else opts.push(mc({ key: 'v:' + v.w, type: 'vmean', lv, prompt: `What does ${v.w} mean?`, word: v.w, speakChoices: true }, v.def, sib.map(x => x.def)));
    }
    for (const [l, w, syn, dd] of SYN) if (l === lv) opts.push(mc({ key: 'syn:' + w, type: 'syn', lv, prompt: `Which word means almost the same as ${w}?`, word: w, speakChoices: true }, syn, dd));
  } else {
    if (lv === 0) LETTER_SETS.forEach(set => { const L = set[0]; opts.push({ key: 'L:' + L, type: 'letter', lv, prompt: `Find the letter ${L}.`, answer: L, g: 1 / set.length, choices: shuffle(set).map(x => ({ v: x, text: x, big: true })) }); });
    if (lv <= DEC_MAX) for (const [l, w, dd] of DEC) if (l === lv) { const o = mc({ key: 'd:' + w, type: 'dec', lv, prompt: `Tap the word ${w}.`, word: w }, w, dd); o.choices.forEach(c => c.big = true); opts.push(o); }
    for (const [l, w, dd] of READPIC) if (l === lv) opts.push({ key: 'rp:' + w, type: 'readpic', lv, prompt: 'Read the word. Tap the picture that matches it.', show: w, answer: w, g: 1 / (dd.length + 1), choices: shuffle([w, ...dd]).map(x => ({ v: x, pic: PIC[x] })) });
    for (const [s, a, dd, l] of SIGHT) if (l === lv) opts.push(mc({ key: 'sw:' + s, type: 'sight', lv, prompt: 'Read the sentence. Pick the word that fits in the blank.', passage: s.replace('___', '_____') }, a, dd));
    for (const [w, l, clue, wrong] of SPELL) if (l === lv) { const o = mc({ key: 'sp:' + w, type: 'spell', lv, prompt: 'Read the clue. Pick the word that is spelled correctly.', question: 'Clue: ' + clue, word: w }, w, wrong.slice(0, SPELL_CH(lv) - 1)); o.choices.forEach(c => c.big = true); opts.push(o); }
    for (const [l, q, a, dd] of AFFIX) if (l === lv) opts.push(mc({ key: 'af:' + q, type: 'affix', lv, prompt: 'Use the word parts to pick the best answer.', question: q }, a, dd));
    for (const [l, s, word, a, dd] of CONTEXT) if (l === lv) opts.push(mc({ key: 'cx:' + s, type: 'context', lv, prompt: 'Read the sentence. Use the clues to find what the bold word means.', passage: s, bold: word, question: `What does “${word}” mean in this sentence?` }, a, dd));
    for (const [l, sen, q, a, dd] of SENT) if (l === lv) opts.push(mc({ key: 's:' + sen, type: 'sent', lv, prompt: 'Read it. Then tap the best answer.', passage: sen, question: q }, a, dd));
  }
  return opts;
}

function makeDomain(name, start, lo, hi, age) {
  return { name, lv: start, start, lo, hi, cap: Math.min(hi, ageLevel(age) + CFG.strictAbove), hist: [], stats: {}, state: {}, phase: 'walk', conf: null, confLeft: 0, result: null, why: '', done: false, used: new Set(), blk: null, retried: {}, support: null };
}
const st = (d, lv) => d.stats[lv] ||= { c: 0, n: 0, G: 0 };
const strictLv = (d, lv) => lv > d.cap;
// Decide a level from everything answered at it: 'pass', 'fail', or null (ask more)
export function judge(s, strict) {
  const a = adjAcc(s.c, s.n, s.G), miss = s.n - s.c;
  if (strict) {
    if (s.c >= CFG.strictNeed && a >= CFG.strictAdj) return 'pass';
    if (miss >= 2) return 'fail';
    return s.n >= CFG.perLevelMax + 1 ? 'fail' : null;
  }
  if (s.c >= CFG.need && a >= CFG.passAdj) return 'pass';
  if (miss >= 2 && a <= CFG.failAdj) return 'fail';
  if (s.n >= CFG.perLevelMax) return a >= CFG.acceptAdj ? 'pass' : 'fail';
  return null;
}
const accepted = (d, lv) => { const s = d.stats[lv]; if (!s || !s.n) return false; const a = adjAcc(s.c, s.n, s.G); return strictLv(d, lv) ? (s.c >= CFG.strictNeed && a >= CFG.strictAdj) : a >= CFG.acceptAdj; };

export function createPlacement({ age, listeningOnly }) {
  const s = quizStart(age);
  const doms = listeningOnly ? [makeDomain('phono', 0, 0, 1, age), makeDomain('vocab', s.vocab, 0, LV_MAX, age)] : [makeDomain('read', s.read, 0, LV_MAX, age), makeDomain('vocab', s.vocab, 0, LV_MAX, age)];
  let turn = 0, total = 0, cur = null;
  const log = [];
  const finish = (d, lv, why) => { d.result = clampLv(Math.max(d.lo, Math.min(d.hi, lv))); d.why = why; d.done = true; };
  function startConfirm(d, lv) { d.phase = 'confirm'; d.conf = lv; d.confLeft = CFG.confirmItems; d.lv = lv; }
  // after a confirmation block: accept, or step down and keep checking
  function afterConfirm(d) {
    const P = d.conf;
    if (accepted(d, P)) {
      // a real reader at level P also does well one level lower; check it if it was never asked (stops lucky streaks)
      const B = P - 1;
      if (B >= d.lo && !(d.stats[B] && d.stats[B].n)) { d.phase = 'support'; d.support = { top: P, left: CFG.supportItems }; d.lv = B; return; }
      return finish(d, P, 'confirmed');
    }
    d.state[P] = 'fail'; d.phase = 'walk'; d.conf = null;
    const below = P - 1;
    if (below < d.lo) return finish(d, d.lo, 'lowest level');
    if (d.state[below] === 'pass') { if (accepted(d, below)) return finish(d, below, 'confirmed below'); return startConfirm(d, below); }
    d.lv = below;
  }
  function afterSupport(d) {
    const { top } = d.support; const B = top - 1; d.support = null;
    const s = d.stats[B];
    if (s.c >= 2 && s.c >= s.n - 1) { d.state[B] = 'pass'; return finish(d, top, 'confirmed'); }
    // not supported: the top level was probably luck. Keep checking from the level below.
    d.state[top] = 'fail'; d.phase = 'walk'; d.lv = B; d.blk = null;
    const v = judge(s, strictLv(d, B)); if (v) step(d, B, v);
  }
  // one second chance for a borderline miss at or below the starting level (a nervous start, not a real ceiling)
  const canRetry = (d, lv) => !d.retried[lv] && lv <= d.start && lv >= d.start - 1 && d.stats[lv] && d.stats[lv].c >= 1;
  function retry(d, lv) { d.retried[lv] = true; d.state[lv] = null; d.lv = lv; d.blk = { c: 0, n: 0, G: 0 }; }
  function step(d, lv, verdict) {
    d.state[lv] = verdict; d.blk = null;
    if (verdict === 'pass') {
      if (d.state[lv + 1] === 'fail' && canRetry(d, lv + 1)) return retry(d, lv + 1);
      if (lv >= d.hi || d.state[lv + 1] === 'fail') return startConfirm(d, lv);
      d.lv = lv + 1; return;                               // up one level at a time
    }
    // fail
    if (lv <= d.lo) return finish(d, d.lo, 'lowest level');
    const s = d.stats[lv];
    if (d.state[lv - 1] === 'pass') {
      // one second chance for a borderline miss at or below the starting level (a nervous start, not a real ceiling)
      if (canRetry(d, lv)) return retry(d, lv);
      return startConfirm(d, lv - 1);
    } const noPassYet = !Object.values(d.state).includes('pass');
    // far too hard: before anything is passed, skip down faster (2 levels, then 3)
    d.fails = (d.fails || 0) + 1;
    let to = noPassYet ? lv - Math.min(1 + d.fails, 3) : lv - 1;
    to = Math.max(to, Math.min(lv - 1, d.lo + 1));  // big jumps stop at K; Pre-K is only checked after K is missed
    while (to < lv - 1 && d.state[to] != null) to++;
    d.lv = to;
  }
  // best level from what we have (used when the item budget runs out before a level is confirmed)
  function fallback(d) {
    // monotone: the highest level answered well where no easier level was clearly missed
    const lvls = Object.keys(d.stats).map(Number).filter(lv => d.stats[lv].n).sort((a, b) => a - b);
    const weak = lv => { const s = d.stats[lv]; return s.n - s.c >= 2 && adjAcc(s.c, s.n, s.G) <= CFG.failAdj; };
    let best = null;
    for (const lv of lvls) { if (lvls.some(m => m < lv && weak(m))) break; if (accepted(d, lv) && d.stats[lv].c >= CFG.need) best = lv; }
    if (best != null) return best;
    return Math.max(d.lo, (lvls.length ? lvls[0] : d.start) - 1);
  }
  function itemFor(d, lv) {
    const avail = itemsAt(d.name, lv).filter(o => !d.used.has(o.key)); if (!avail.length) return null;
    // rotate item types so a level is checked in different ways
    const types = [...new Set(avail.map(o => o.type))]; const lastT = d.hist.length ? d.hist[d.hist.length - 1].type : null;
    const seen = t => d.hist.filter(h => h.lv === lv && h.type === t).length;
    const minSeen = Math.min(...types.map(seen));
    let prefer = types.filter(t => seen(t) === minSeen); if (prefer.length > 1) { const f = prefer.filter(t => t !== lastT); if (f.length) prefer = f; }
    const t = prefer[Math.random() * prefer.length | 0];
    const pool = avail.filter(o => o.type === t); return pool[Math.random() * pool.length | 0];
  }
  function pickDomain() {
    const open = doms.filter(d => !d.done);
    if (!open.length) return null;
    return open[turn++ % open.length];
  }
  return {
    doms, log,
    get total() { return total; },
    next() {
      for (let tries = 0; tries < 4; tries++) {
        if (total >= CFG.maxItems) { doms.forEach(d => { if (!d.done) finish(d, fallback(d), 'item limit'); }); return null; }
        const d = pickDomain(); if (!d) return null;
        if (d.hist.length >= CFG.domMax[d.name]) { finish(d, fallback(d), 'item limit'); continue; }
        const it = itemFor(d, d.lv);
        if (!it) { // ran out of questions at this level: decide from what we have
          const v = judge(st(d, d.lv), strictLv(d, d.lv)) || (accepted(d, d.lv) ? 'pass' : 'fail');
          if (d.phase === 'confirm') { d.confLeft = 0; afterConfirm(d); } else if (d.phase === 'support') { finish(d, d.support.top, 'confirmed'); } else step(d, d.lv, v);
          if (!d.done && !itemFor(d, d.lv)) finish(d, fallback(d), 'no more questions');
          continue;
        }
        cur = { d, it }; return { ...it, domain: d.name, n: total + 1 };
      }
      return null;
    },
    answer(val) {
      if (!cur) return; const { d, it } = cur; cur = null; const ok = val === it.answer;
      d.used.add(it.key); d.hist.push({ lv: it.lv, ok, type: it.type }); log.push({ domain: d.name, lv: it.lv, type: it.type, ok }); total++;
      const s = st(d, it.lv); s.n++; if (ok) s.c++; s.G += it.g || 0.25;
      if (d.blk) { d.blk.n++; if (ok) d.blk.c++; d.blk.G += it.g || 0.25; }
      if (d.phase === 'confirm') { if (--d.confLeft <= 0) afterConfirm(d); }
      else if (d.phase === 'support') { const b = d.stats[it.lv]; if (b.c >= 2 || b.n - b.c >= 2 || --d.support.left <= 0) afterSupport(d); }
      else { const v = judge(d.blk || s, strictLv(d, it.lv)); if (v) step(d, it.lv, v); }
      return ok;
    },
    result() {
      const out = {};
      for (const d of doms) {
        let r = d.done ? d.result : fallback(d);
        // sanity cap: never more than 2 levels above the age-typical level without strong proof at that level
        while (r > d.cap && !accepted(d, r)) r--;
        out[d.name] = r;
      }
      const reading = out.read != null ? out.read : out.phono; const vocab = out.vocab;
      const by = {}; for (const e of log) { const b = by[e.type] ||= { ok: 0, n: 0, top: -1 }; b.n++; if (e.ok) { b.ok++; b.top = Math.max(b.top, e.lv); } }
      const levels = {}; for (const d of doms) levels[d.name] = Object.keys(d.stats).map(Number).sort((a, b) => a - b).map(lv => { const s = d.stats[lv]; return { lv, ok: s.c, n: s.n, adj: Math.round(100 * Math.max(0, adjAcc(s.c, s.n, s.G))) }; });
      return { reading, vocab, items: total, byType: by, log: log.slice(), levels, ageLevel: ageLevel(age) };
    },
  };
}
export const TYPE_NAMES = { letter: 'Letter names', dec: 'Hearing a word and finding it in print (decoding)', readpic: 'Reading a word and matching a picture', sight: 'Sight words in sentences', spell: 'Spelling (same words as the spelling game)', affix: 'Word parts: prefixes, suffixes, roots', context: 'Context clues', sent: 'Understanding sentences and passages', vpic: 'Listening vocabulary (pictures)', vmean: 'Listening vocabulary (meanings)', syn: 'Synonyms', rhyme: 'Rhyming (listening)', first: 'First sounds (listening)' };
