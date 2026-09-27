// "Let's find your starting spot!" A short adaptive placement quiz (staircase, IRT-lite).
// A quick starting-point estimate, not a formal reading assessment.
// Two interleaved staircases: reading (or pre-reading listening skills for ages 3-4) and listening vocabulary.
// Step 2 levels until the first reversal, then 1. Up after a correct answer, down after a miss.
import { PIC, VOCAB, SYN, RHYME, FIRST, shuffle } from './bank.js';
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
  [5, 'The path was so narrow that we had to walk in a single line.', 'What does narrow mean?', 'not wide', ['very long', 'very steep', 'not safe']],
  [6, 'Despite the drizzle, the team kept practicing; the light rain did not stop them.', 'What does drizzle mean?', 'light rain', ['heavy snow', 'strong wind', 'hot sun']],
  [6, 'The instructions were so vague that no one knew what to do first.', 'What does vague mean?', 'not clear', ['very long', 'very funny', 'written neatly']],
  [6, 'Grandpa is frugal; he fixes old things instead of buying new ones.', 'What does frugal mean?', 'careful about spending money', ['very forgetful', 'good at sports', 'always in a hurry']],
  [6, 'Jonah checked the sky, grabbed his umbrella, and zipped his jacket to his chin.', 'What does Jonah probably expect?', 'cold, rainy weather', ['a hot, sunny day', 'a birthday party', 'a day at the beach']],
  [7, 'The old bridge was unstable, so the town closed it until it could be repaired.', 'Why did the town close the bridge?', 'It was not safe to cross.', ['It was too crowded.', 'It was brand new.', 'It was painted red.']],
  [7, 'Priya reread the chapter twice and wrote notes in the margins before the test.', 'What can you infer about Priya?', 'She wanted to be well prepared.', ['She had never read the book.', 'She did not care about the test.', 'She forgot about the test.']],
  [7, 'Unlike his talkative sister, Ben was reticent and rarely shared his opinions.', 'What does reticent mean?', 'quiet and reserved', ['loud and cheerful', 'angry and rude', 'curious and bold']],
  [7, 'Bees carry pollen from flower to flower. Without bees, many fruits and vegetables could not grow.', 'What is the main idea?', 'Bees are important for growing food.', ['Bees are yellow and black.', 'Flowers smell sweet.', 'Vegetables are healthy.']],
  [8, 'The mayor’s plan was controversial; half the town praised it, and half protested.', 'What does controversial mean?', 'causing strong disagreement', ['liked by everyone', 'very expensive', 'kept secret']],
  [8, 'The scientist was skeptical of the claim and asked to see more evidence before believing it.', 'What does skeptical mean?', 'doubtful', ['excited', 'frightened', 'embarrassed']],
  [8, 'For years the canal was the fastest trade route. When railroads arrived, shipping on the canal slowly declined.', 'What can you infer?', 'Railroads became a faster way to ship goods.', ['The canal dried up.', 'People stopped trading.', 'Railroads were built on the canal.']],
  [8, 'Maria saved part of every paycheck, compared prices before buying, and avoided debt.', 'Which word best describes Maria?', 'responsible', ['careless', 'impatient', 'boastful']],
  [9, 'The senator’s remarks were so equivocal that both sides claimed she agreed with them.', 'What does equivocal mean?', 'open to more than one meaning', ['very angry', 'completely clear', 'extremely short']],
  [9, 'The novel’s ending was bittersweet: the friends finally won, but they had to say goodbye.', 'What does bittersweet mean?', 'both happy and sad', ['tasting like candy', 'completely tragic', 'very confusing']],
  [9, 'Although the author praises technology, she warns that constant screen time can crowd out real conversation.', 'What is the author’s main point?', 'Technology helps, but it should not replace real conversation.', ['Technology should be banned.', 'Screens make people smarter.', 'Conversation is old-fashioned.']],
  [9, 'His recollection of the event was hazy, so the investigators relied on photographs instead.', 'Why did the investigators rely on photographs?', 'His memory was unclear.', ['The photographs were funny.', 'He refused to talk.', 'He took the photographs himself.']],
];
export const LETTER_SETS = [['M', 'N', 'W', 'H'], ['S', 'Z', 'C', 'O'], ['B', 'D', 'P', 'R'], ['T', 'L', 'F', 'I'], ['A', 'K', 'X', 'V'], ['G', 'C', 'Q', 'O'], ['E', 'F', 'L', 'H']];

const ITEM_TARGET = { min: 20, max: 28 };
const DOM = { read: { min: 10, max: 15 }, vocab: { min: 8, max: 13 }, phono: { min: 8, max: 12 } };

export function startLevels(age) {
  const a = Number(age) || 7;
  return { read: clampLv(Math.max(1, Math.min(8, a - 5))), vocab: clampLv(Math.min(8, a - 4)), phono: 0 };
}
function makeDomain(name, start, lo, hi) { return { name, lv: start, start, lo, hi, hist: [], rev: [], dir: 0, step: 2, done: false, used: new Set() }; }

export function createPlacement({ age, listeningOnly }) {
  const s = startLevels(age);
  const doms = listeningOnly ? [makeDomain('phono', 0, 0, 1), makeDomain('vocab', s.vocab, 0, LV_MAX)] : [makeDomain('read', s.read, 0, LV_MAX), makeDomain('vocab', s.vocab, 0, LV_MAX)];
  let turn = 0, total = 0, cur = null;
  const log = [];
  function itemFor(d, lv) {
    const fresh = (key) => !d.used.has(key);
    const opts = [];
    if (d.name === 'phono') {
      if (lv === 0) RHYME.forEach(([w, r, o]) => opts.push({ key: 'rh:' + w, type: 'rhyme', lv, prompt: `Which one rhymes with ${w}?`, word: w, answer: r, choices: shuffle([r, ...o]).map(x => ({ v: x, pic: PIC[x] })), names: true }));
      else FIRST.filter(f => f[0] !== f[1]).forEach(([w, same, o]) => opts.push({ key: 'fs:' + w, type: 'first', lv, prompt: `Which one starts like ${w}?`, word: w, answer: same, choices: shuffle([same, ...o]).map(x => ({ v: x, pic: PIC[x] })), names: true }));
    } else if (d.name === 'vocab') {
      const here = VOCAB.filter(v => v.lv === lv);
      for (const v of here) {
        const sib = shuffle(here.filter(x => x.w !== v.w)).slice(0, 3);
        if (v.pic) opts.push({ key: 'v:' + v.w, type: 'vpic', lv, prompt: `Tap the ${v.w}.`, word: v.w, answer: v.w, choices: shuffle([v, ...sib]).map(x => ({ v: x.w, pic: x.pic })) });
        else opts.push({ key: 'v:' + v.w, type: 'vmean', lv, prompt: `What does ${v.w} mean?`, word: v.w, answer: v.def, choices: shuffle([v.def, ...sib.map(x => x.def)]).map(x => ({ v: x, text: x })), speakChoices: true });
      }
      for (const [l, w, syn, dd] of SYN) if (l === lv) opts.push({ key: 'syn:' + w, type: 'syn', lv, prompt: `Which word means almost the same as ${w}?`, word: w, answer: syn, choices: shuffle([syn, ...dd]).map(x => ({ v: x, text: x })), speakChoices: true });
    } else {
      if (lv === 0) LETTER_SETS.forEach((set, i) => { const L = set[0]; opts.push({ key: 'L:' + L, type: 'letter', lv, prompt: `Find the letter ${L}.`, answer: L, choices: shuffle(set).map(x => ({ v: x, text: x, big: true })) }); });
      for (const [l, w, dd] of DEC) if (l === lv) opts.push({ key: 'd:' + w, type: 'dec', lv, prompt: `Tap the word ${w}.`, word: w, answer: w, choices: shuffle([w, ...dd]).map(x => ({ v: x, text: x, big: true })) });
      for (const [l, w, dd] of READPIC) if (l === lv) opts.push({ key: 'rp:' + w, type: 'readpic', lv, prompt: 'Read the word. Tap the picture that matches it.', show: w, answer: w, choices: shuffle([w, ...dd]).map(x => ({ v: x, pic: PIC[x] })) });
      for (const [l, sen, q, a, dd] of SENT) if (l === lv) opts.push({ key: 's:' + sen, type: 'sent', lv, prompt: 'Read it. Then tap the best answer.', passage: sen, question: q, answer: a, choices: shuffle([a, ...dd]).map(x => ({ v: x, text: x })) });
    }
    const avail = opts.filter(o => fresh(o.key)); if (!avail.length) return null;
    // rotate item types so a level is checked in different ways
    const types = [...new Set(avail.map(o => o.type))]; const lastT = d.hist.length ? d.hist[d.hist.length - 1].type : null;
    const prefer = types.length > 1 ? types.filter(t => t !== lastT) : types; const t = prefer[Math.random() * prefer.length | 0];
    const pool = avail.filter(o => o.type === t); return pool[Math.random() * pool.length | 0];
  }
  function settled(d) {
    const n = d.hist.length, cfg = DOM[d.name];
    if (n >= cfg.max) return true;
    const tail = d.hist.slice(-4);
    const ceil = tail.length === 4 && tail.every(h => h.ok && h.lv === d.hi);
    const floor = tail.length >= 3 && d.hist.slice(-3).every(h => !h.ok && h.lv === d.lo);
    if (ceil || floor) return true;
    return n >= cfg.min && d.rev.length >= 4;
  }
  function pickDomain() {
    const open = doms.filter(d => !d.done);
    if (open.length) { const d = open[turn++ % open.length]; return d; }
    if (total >= ITEM_TARGET.min) return null;
    return doms.slice().sort((a, b) => a.hist.length - b.hist.length)[0]; // keep going gently until the minimum
  }
  return {
    doms, log,
    get total() { return total; },
    next() {
      if (total >= ITEM_TARGET.max) return null;
      for (let tries = 0; tries < 3; tries++) {
        const d = pickDomain(); if (!d) return null;
        let it = itemFor(d, d.lv);
        for (let k = 1; !it && k <= 2; k++) it = itemFor(d, clampLv(d.lv - k)) || itemFor(d, Math.min(d.hi, d.lv + k));
        if (it) { cur = { d, it }; return { ...it, domain: d.name, n: total + 1 }; }
        d.done = true;
      }
      return null;
    },
    answer(val) {
      if (!cur) return; const { d, it } = cur; cur = null; const ok = val === it.answer;
      d.used.add(it.key); d.hist.push({ lv: it.lv, ok, type: it.type }); log.push({ domain: d.name, lv: it.lv, type: it.type, ok }); total++;
      const dir = ok ? 1 : -1;
      if (d.dir && dir !== d.dir) { d.rev.push(it.lv); d.step = 1; }
      d.dir = dir; d.lv = Math.max(d.lo, Math.min(d.hi, it.lv + dir * d.step));
      if (settled(d)) d.done = true;
      return ok;
    },
    // IRT-lite: maximum-likelihood ability on a 0-9 scale with a guessing floor and a small slip rate,
    // plus a weak prior at the age-based start. Placement = the level just below the estimated ability.
    estimate(d) {
      const h = d.hist; if (!h.length) return d.lo;
      const g = d.name === 'phono' ? 0.33 : 0.25, slip = 0.06, start = d.start;
      let best = d.lo, bestL = -Infinity;
      for (let th = d.lo - 0.5; th <= d.hi + 1.001; th += 0.125) {
        let L = -((th - start) ** 2) / (2 * 9);
        for (const x of h) { const p = g + (1 - g - slip) / (1 + Math.exp(-2.2 * (th - x.lv - 0.5))); L += Math.log(x.ok ? p : 1 - p); }
        if (L > bestL + 1e-9) { bestL = L; best = th; }
      }
      return Math.max(d.lo, Math.min(d.hi, Math.floor(best - 0.5)));
    },
    result() {
      const out = {}; for (const d of doms) out[d.name] = this.estimate(d);
      const reading = out.read != null ? out.read : out.phono; const vocab = out.vocab;
      const by = {}; for (const e of log) { const b = by[e.type] ||= { ok: 0, n: 0, top: -1 }; b.n++; if (e.ok) { b.ok++; b.top = Math.max(b.top, e.lv); } }
      return { reading, vocab, items: total, byType: by, log: log.slice() };
    },
  };
}
export const TYPE_NAMES = { letter: 'Letter names', dec: 'Hearing a word and finding it in print (decoding)', readpic: 'Reading a word and matching a picture', sent: 'Understanding sentences and passages', vpic: 'Listening vocabulary (pictures)', vmean: 'Listening vocabulary (meanings)', syn: 'Synonyms', rhyme: 'Rhyming (listening)', first: 'First sounds (listening)' };
