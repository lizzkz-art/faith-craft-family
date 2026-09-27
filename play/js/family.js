// Faith Craft Family Edition: who's playing, add player, level setup, placement quiz, parent area.
import { meta, saveMeta, profiles, activeProfile, getProfile, setActive, createProfile, updateProfile, deleteProfile, resetProfile, readProfileState, updateProfileState, state, saveState, MAX_PROFILES } from './save.js';
import { LV_SHORT, READ_DESC, VOCAB_DESC, clampLv, AGES, ageBand, BAND_PHRASES, SKINS, HAIRS, SHIRTS, FOCUS_SOUNDS } from './levels.js';
import { createPlacement, startLevels, TYPE_NAMES } from './placement.js';
import { SCHOOL_TOPICS } from './curriculum.js';
import { h, tap, openScreen, closeScreen, toast, pinPad, settingsGate, reportCard, settings, title } from './ui.js';
import { Speech } from './speech.js';
import { Sound } from './audio.js';

const PICKED = 'fcfamily.session.picked';
const lvName = lv => LV_SHORT[clampLv(lv)];
const today = () => new Date().toLocaleDateString('en-US');
const pick = a => a[Math.random() * a.length | 0];
const say = (t, o = {}) => { try { Speech.speak(t, o); } catch (e) { } };
export const DISCLAIMER = 'The placement quiz is a quick starting-point estimate, not a formal reading assessment.';

// A small blocky face that matches the player's look
export function faceSVG(look = {}, size = 64) {
  const sk = SKINS[look.skin ?? 1], hr = HAIRS[look.hair ?? 1], sh = SHIRTS[look.shirt ?? 0];
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><rect x="0" y="50" width="64" height="14" fill="${sh}"/><rect x="12" y="8" width="40" height="42" rx="3" fill="${sk}"/><rect x="10" y="4" width="44" height="12" fill="${hr}"/><rect x="10" y="4" width="6" height="24" fill="${hr}"/><rect x="48" y="4" width="6" height="24" fill="${hr}"/><rect x="21" y="26" width="7" height="7" fill="#fff"/><rect x="36" y="26" width="7" height="7" fill="#fff"/><rect x="23" y="28" width="4" height="5" fill="#2a4a8a"/><rect x="38" y="28" width="4" height="5" fill="#2a4a8a"/><rect x="25" y="40" width="14" height="3" fill="#b04a3e"/></svg>`;
}
function bandClass(age) { const b = document.body; b.classList.remove('age-young', 'age-mid', 'age-teen'); b.classList.add('age-' + ageBand(age)); b.classList.toggle('prereader', age <= 4); }
function restoreBand() { const p = activeProfile(); if (p) bandClass(p.age); else document.body.classList.remove('age-young', 'age-mid', 'age-teen', 'prereader'); if (p) document.body.classList.toggle('prereader', clampLv(state.level.read) === 0); }
const face = (look, size) => h('span', { class: 'pface', html: faceSVG(look, size) });

// ---------- Boot ----------
export function boot() {
  const picked = sessionStorage.getItem(PICKED); sessionStorage.removeItem(PICKED);
  if (!activeProfile() || (profiles().length > 1 && !picked)) whoIsPlaying(); else title();
}
function switchTo(id) {
  if (activeProfile() && activeProfile().id === id) { title(); return; }
  setActive(id); sessionStorage.setItem(PICKED, '1'); location.reload();
}

// ---------- Who's playing ----------
export function whoIsPlaying() {
  restoreBand();
  const list = profiles();
  const body = openScreen('Who’s playing?', { cls: 'who', onBack: activeProfile() ? title : () => { }, backLabel: activeProfile() ? '‹ Back' : ' ' });
  if (!list.length) body.append(h('div', { class: 'card center intro' }, h('h3', {}, 'Welcome to Faith Craft Family Edition'), h('div', {}, 'Each child gets their own player, level, and saved world. A grown-up should add the first player.')));
  const grid = h('div', { class: 'profgrid' });
  for (const p of list) grid.append(h('button', { class: 'profcard' + (activeProfile() && activeProfile().id === p.id ? ' on' : ''), 'data-id': p.id, onclick: tap(() => switchTo(p.id)) },
    face(p.look, 72), h('div', { class: 'pname' }, p.name), h('div', { class: 'pmeta' }, `Age ${p.age} · Reading ${lvName(readProfileState(p.id).level.read)}`)));
  if (list.length < MAX_PROFILES) grid.append(h('button', { class: 'profcard add', 'data-act': 'add', onclick: tap(() => (meta.pin ? settingsGate(addPlayer) : addPlayer())) }, h('div', { class: 'plus' }, '+'), h('div', { class: 'pname' }, 'Add player')));
  body.append(grid, h('div', { class: 'row center' }, h('button', { class: 'btn big', 'data-act': 'parent', onclick: tap(() => settingsGate(() => parentArea())) }, '🔒 Parent area')),
    h('div', { class: 'muted small center' }, `Up to ${MAX_PROFILES} players. Saves stay on this device only.`));
}

// ---------- Add player ----------
export function addPlayer(onBack) {
  const n = profiles().length + 1; const look = { skin: 1, hair: 1, shirt: (n - 1) % SHIRTS.length }; let age = 7;
  const body = openScreen('Add a player', { onBack: onBack || whoIsPlaying });
  const nameIn = h('input', { type: 'text', maxlength: '20', placeholder: 'Player ' + n, 'aria-label': 'Name', id: 'pname' });
  const ageRow = h('div', { class: 'agepick' }, AGES.map(a => h('button', { class: 'btn agebtn' + (a === age ? ' on' : ''), 'data-age': String(a), onclick: tap(e => { age = a; ageRow.querySelectorAll('.agebtn').forEach(b => b.classList.toggle('on', b === e.currentTarget)); }) }, String(a))));
  const prev = h('div', { class: 'lookprev' }); const upd = () => { prev.innerHTML = faceSVG(look, 96); };
  const swatches = (key, cols) => h('div', { class: 'swatches' }, cols.map((c, i) => h('button', { class: 'sw' + (look[key] === i ? ' on' : ''), style: `background:${c}`, 'aria-label': key + ' ' + (i + 1), onclick: tap(e => { look[key] = i; e.currentTarget.parentNode.querySelectorAll('.sw').forEach(b => b.classList.toggle('on', b === e.currentTarget)); upd(); }) })));
  upd();
  body.append(h('div', { class: 'card form' },
    h('label', { class: 'set' }, h('span', {}, 'Name (optional)'), nameIn),
    h('div', { class: 'set col' }, h('span', {}, 'Age'), ageRow, h('div', { class: 'muted small' }, 'Age sets where the placement quiz starts and how the game talks and looks. Reading level is set separately.')),
    h('div', { class: 'lookrow' }, prev, h('div', {}, h('div', { class: 'small' }, 'Skin'), swatches('skin', SKINS), h('div', { class: 'small' }, 'Hair'), swatches('hair', HAIRS), h('div', { class: 'small' }, 'Shirt'), swatches('shirt', SHIRTS)))),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'next', onclick: tap(() => levelSetup({ draft: { name: nameIn.value, age, look } })) }, 'Next: starting level ›')));
}

// ---------- Level setup: choose or take the quiz ----------
// o.draft = new player (created at the end), or o.id = existing player
export function levelSetup(o) {
  restoreBand();
  const age = o.draft ? o.draft.age : getProfile(o.id).age; const nm = o.draft ? (o.draft.name || 'this player') : getProfile(o.id).name;
  const body = openScreen('Starting level', { onBack: o.onBack || (o.draft ? () => addPlayer() : () => parentArea()) });
  body.append(h('div', { class: 'muted center' }, `Pick how to set the starting level for ${nm}. You can change it any time in the Parent area.`),
    h('div', { class: 'setupgrid' },
      h('button', { class: 'card setupopt', 'data-act': 'quiz', onclick: tap(() => placementIntro(o)) }, h('div', { class: 'big' }, '🧭'), h('h3', {}, 'Take the placement quiz'), h('div', {}, age <= 4 ? 'About 3 to 5 minutes. Listening only: pictures and sounds, no reading needed.' : 'About 3 to 6 minutes. Short reading and word questions that adjust as your child answers.')),
      h('button', { class: 'card setupopt', 'data-act': 'choose', onclick: tap(() => chooseLevel(o)) }, h('div', { class: 'big' }, '🎚️'), h('h3', {}, 'Choose a level'), h('div', {}, 'A grown-up picks the reading and vocabulary levels.'))));
}
export function chooseLevel(o, preset) {
  const age = o.draft ? o.draft.age : getProfile(o.id).age; const s = startLevels(age);
  const cur = preset || (o.id ? readProfileState(o.id).level : { read: age <= 4 ? 0 : s.read, vocab: age <= 4 ? 0 : s.vocab });
  let read = clampLv(cur.read), vocab = clampLv(cur.vocab);
  const body = openScreen('Choose a level', { onBack: () => levelSetup(o) });
  const mk = (label, val, desc, set, id) => { const d = h('div', { class: 'lvdesc' }); const topics = h('div', { class: 'muted small' });
    const upd = v => { d.textContent = desc[v]; topics.textContent = id === 'read' ? 'At school around this level: ' + SCHOOL_TOPICS[v].join(', ') + '.' : ''; };
    const sel = h('select', { id: 'lv-' + id }, LV_SHORT.map((n, i) => { const op = h('option', { value: String(i) }, n); if (i === val) op.selected = true; return op; }));
    sel.addEventListener('change', () => { set(Number(sel.value)); upd(Number(sel.value)); }); upd(val);
    return h('div', { class: 'card' }, h('label', { class: 'set' }, h('span', {}, label), sel), d, topics); };
  body.append(h('div', { class: 'muted center' }, `Suggested for age ${age}: reading ${lvName(age <= 4 ? 0 : s.read)}, vocabulary ${lvName(age <= 4 ? 0 : s.vocab)}. Pick what fits your child best.`),
    mk('Reading level', read, READ_DESC, v => read = v, 'read'), mk('Vocabulary level', vocab, VOCAB_DESC, v => vocab = v, 'vocab'),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'save-level', onclick: tap(() => finishLevel(o, { read, vocab, how: 'chosen' }, null)) }, 'Save level')));
}
function finishLevel(o, lv, placement) {
  if (o.draft) {
    const p = createProfile({ ...o.draft, level: { read: lv.read, vocab: lv.vocab, how: lv.how } });
    if (placement) updateProfileState(p.id, st => { st.placement = placement; });
    toast(`${p.name} is ready.`); switchTo(p.id); return;
  }
  updateProfileState(o.id, st => { st.level.read = lv.read; st.level.vocab = lv.vocab; st.level.how = lv.how; st.level.upStreak = { read: 0, vocab: 0 }; st.level.lowStreak = { read: 0, vocab: 0 };
    st.level.history.push({ d: today(), read: lv.read, vocab: lv.vocab, why: lv.how === 'quiz' ? 'Placement quiz' : 'Changed by a parent' }); if (placement) st.placement = placement; });
  if (activeProfile() && o.id === activeProfile().id) dirty = true;
  toast('Level saved.'); (o.after || (() => parentArea()))();
}

// ---------- Placement quiz ----------
function placementIntro(o) {
  const age = o.draft ? o.draft.age : getProfile(o.id).age; bandClass(age); const listen = age <= 4; const band = ageBand(age);
  const body = openScreen('Placement quiz', { onBack: () => levelSetup(o) });
  const hi = band === 'teen' ? 'Quick check to find your starting point.' : band === 'mid' ? 'Let’s find your starting spot!' : 'Let’s find your starting spot!';
  const sub = listen ? 'Listen to each question, then tap a picture. There is no timer.' : band === 'teen' ? 'Some questions are easy and some are hard. That is expected. Answer what you can, and guess if you are not sure. No timer.' : 'Some questions are easy and some are tricky. That is okay! Just try your best. There is no timer.';
  body.append(h('div', { class: 'card center intro' }, h('h3', {}, hi), h('div', {}, sub), h('div', { class: 'muted small' }, 'A grown-up can sit nearby. Please do not give answers; this is only to pick a good starting level.'),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary huge', 'data-act': 'start-quiz', onclick: tap(() => runPlacement(o)) }, 'Start'))));
  say(hi + ' ' + sub);
}
export function runPlacement(o) {
  const age = o.draft ? o.draft.age : getProfile(o.id).age; const listen = age <= 4; const band = ageBand(age);
  const P = createPlacement({ age, listeningOnly: listen }); let it = null, busy = false;
  const body = openScreen(band === 'teen' ? 'Placement check' : 'Finding your starting spot', { cls: 'placement', onBack: () => levelSetup(o), backLabel: '‹ Stop' });
  const bar = h('div', { class: 'pbar' }, h('i')); const stage = h('div', { class: 'pstage' }); const cheer = h('div', { class: 'pcheer', 'aria-live': 'polite' });
  body.append(bar, stage, cheer);
  const spoken = x => x.type === 'dec' || x.type === 'letter' || x.type === 'rhyme' || x.type === 'first' || x.type === 'vpic';
  const promptSay = x => x.type === 'dec' ? `Tap the word: ${x.word}.` : x.type === 'letter' ? x.prompt : x.prompt;
  
  function show() {
    it = P.next(); if (!it) return done();
    busy = false; stage.innerHTML = ''; cheer.textContent = '';
    bar.firstChild.style.width = Math.min(100, Math.round(P.total / 24 * 100)) + '%';
    const hear = h('button', { class: 'btn hear', 'data-act': 'hear', onclick: tap(() => say(promptSay(it), { slow: it.type === 'dec' })) }, '🔊 Hear it again');
    let text;
    if (it.type === 'dec') text = 'Listen. Tap the word you hear.';
    else if (it.type === 'letter') text = 'Listen. Tap the letter you hear.';
    else if (listen) text = '';
    else text = it.prompt;
    stage.append(h('div', { class: 'pq', 'data-type': it.type, 'data-lv': String(it.lv) }, text ? h('div', { class: 'pprompt' }, text) : null,
      it.show ? h('div', { class: 'pshow' }, it.show) : null,
      it.passage ? h('div', { class: 'ppassage' }, it.passage) : null, it.question ? h('div', { class: 'pquestion' }, it.question) : null,
      (spoken(it) || listen || it.type === 'vmean' || it.type === 'syn') ? hear : null));
    const wrap = h('div', { class: 'pchoices' + (it.choices.some(c => c.pic) ? ' pics' : '') + (it.choices.some(c => c.big) ? ' bigtext' : '') });
    it.choices.forEach(c => {
      const b = h('button', { class: 'pchoice', 'data-v': c.v, 'aria-label': c.pic ? c.v : c.text }, c.pic ? h('span', { class: 'emoji' }, c.pic) : null, c.text ? h('span', { class: 'ptext' }, c.text) : null);
      b.addEventListener('click', tap(() => { if (busy) return; busy = true; b.classList.add('picked'); P.answer(c.v); Sound.tap && Sound.tap();
        const ph = pick(BAND_PHRASES[band].placement); cheer.textContent = ph; say(ph); setTimeout(show, 900); }));
      const row = h('div', { class: 'pchoice-row' }, b, (it.speakChoices || (c.pic && (listen || it.names))) ? h('button', { class: 'btn spk', 'aria-label': 'Hear ' + c.v, onclick: tap(() => say(c.text || c.v)) }, '🔊') : null);
      wrap.append(row);
    });
    stage.append(wrap);
    if (spoken(it) || listen || it.type === 'vmean' || it.type === 'syn') say(promptSay(it), { slow: it.type === 'dec' });
  }
  function done() {
    const r = P.result(); const res = { date: today(), age, listeningOnly: listen, reading: r.reading, vocab: r.vocab, items: r.items, byType: r.byType, log: r.log };
    if (listen) res.reading = Math.min(res.reading, 1); // pre-readers start at Pre-K or K
    const body2 = openScreen('All done!', { onBack: () => levelSetup(o) });
    body2.append(h('div', { class: 'card center intro' }, h('h3', {}, band === 'teen' ? 'Done. Thanks.' : 'You did it! Thank you!'), h('div', {}, `${r.items} questions answered.`),
      h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'see-results', onclick: tap(() => (meta.pin ? settingsGate(() => results(o, res)) : results(o, res))) }, meta.pin ? '🔒 Grown-up: see the results' : 'See the results'))));
    say(band === 'teen' ? 'Done. Thanks.' : 'You did it! Thank you!');
  }
  show();
}
export function placementSummary(res) {
  const rows = Object.entries(res.byType || {}).map(([t, b]) => h('tr', {}, h('td', {}, TYPE_NAMES[t] || t), h('td', {}, `${b.ok} of ${b.n}`), h('td', {}, b.top >= 0 ? lvName(b.top) : '–')));
  return h('div', { class: 'card psum' },
    h('div', {}, h('b', {}, 'Reading: '), lvName(res.reading), ' — ', READ_DESC[clampLv(res.reading)]),
    h('div', {}, h('b', {}, 'Vocabulary: '), lvName(res.vocab), ' — ', VOCAB_DESC[clampLv(res.vocab)]),
    h('div', { class: 'muted small' }, `${res.date} · ${res.items} questions · ${res.listeningOnly ? 'listening-only version' : 'reading and vocabulary version'} · started at the level suggested for age ${res.age}`),
    h('div', { class: 'tablewrap' }, h('table', { class: 'rc' }, h('tr', {}, h('th', {}, 'Question type'), h('th', {}, 'Correct'), h('th', {}, 'Hardest correct')), rows)),
    h('div', { class: 'muted small disclaimer' }, DISCLAIMER));
}
function results(o, res) {
  const body = openScreen('Placement results', { onBack: () => levelSetup(o) });
  body.append(h('div', { class: 'muted center' }, 'Here is a suggested starting level in plain words. Accept it, or adjust it if you know your child needs something different.'), placementSummary(res),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'accept', onclick: tap(() => finishLevel(o, { read: res.reading, vocab: res.vocab, how: 'quiz' }, res)) }, 'Accept'),
      h('button', { class: 'btn big', 'data-act': 'adjust', onclick: tap(() => { o.pendingPlacement = res; chooseLevelAfterQuiz(o, res); }) }, 'Adjust')));
}
function chooseLevelAfterQuiz(o, res) {
  chooseLevel(o, { read: res.reading, vocab: res.vocab });
  const btn = document.querySelector('[data-act="save-level"]'); if (!btn) return;
  const nb = btn.cloneNode(true); btn.replaceWith(nb);
  nb.addEventListener('click', tap(() => finishLevel(o, { read: Number(document.getElementById('lv-read').value), vocab: Number(document.getElementById('lv-vocab').value), how: 'quiz-adjusted' }, res)));
}

// ---------- Parent area ----------
let dirty = false;
function leaveParent() { if (dirty) { dirty = false; sessionStorage.setItem(PICKED, '1'); location.reload(); return; } if (activeProfile()) title(); else whoIsPlaying(); }
function confirmBox(msg, yes, label = 'Yes') {
  const pop = h('div', { class: 'modal', id: 'confirm' }, h('div', { class: 'card pin' }, h('h3', {}, msg), h('div', { class: 'row center' },
    h('button', { class: 'btn primary big', 'data-act': 'yes', onclick: tap(() => { pop.remove(); yes(); }) }, label), h('button', { class: 'btn big', 'data-act': 'no', onclick: tap(() => pop.remove()) }, 'Cancel'))));
  document.body.append(pop);
}
export function parentArea() {
  restoreBand();
  const body = openScreen('Parent area', { onBack: leaveParent, backLabel: '‹ Done' });
  body.append(h('div', { class: 'muted center' }, 'Report cards, levels, focus sounds, and players. Saves stay on this device.'));
  for (const p of profiles()) {
    const st = readProfileState(p.id); const L = st.level; const isActive = activeProfile() && activeProfile().id === p.id;
    body.append(h('div', { class: 'card pcard', 'data-id': p.id },
      h('div', { class: 'row' }, face(p.look, 56), h('div', {}, h('h3', {}, p.name + (isActive ? ' (playing now)' : '')), h('div', { class: 'small' }, `Age ${p.age} · Reading ${lvName(L.read)} · Vocabulary ${lvName(L.vocab)}${L.lock ? ' · locked' : ''} · School order ${st.settings.schoolOrder !== false ? 'on' : 'off'}`))),
      h('div', { class: 'pactions' },
        h('button', { class: 'btn', 'data-act': 'report', onclick: tap(() => reportCard({ prof: p, st: readProfileState(p.id), onBack: parentArea })) }, 'Report card'),
        h('button', { class: 'btn', 'data-act': 'levels', onclick: tap(() => levelsPanel(p)) }, 'Levels & school order'),
        h('button', { class: 'btn', 'data-act': 'retake', onclick: tap(() => placementIntro({ id: p.id, onBack: parentArea })) }, 'Retake placement'),
        h('button', { class: 'btn', 'data-act': 'focus', onclick: tap(() => focusPanel(p)) }, 'Focus sounds'),
        h('button', { class: 'btn', 'data-act': 'edit', onclick: tap(() => editPanel(p)) }, 'Name, age & look'),
        isActive ? h('button', { class: 'btn', 'data-act': 'settings', onclick: tap(() => settings(parentArea)) }, 'Game settings') : null,
        h('button', { class: 'btn', 'data-act': 'reset', onclick: tap(() => confirmBox(`Reset ${p.name}’s progress? Levels are kept; stars, missions, and the world start over.`, () => { resetProfile(p.id); try { localStorage.removeItem('fcfamily.p.' + p.id + '.world.v1'); } catch (e) { } if (isActive) dirty = true; toast('Progress reset.'); parentArea(); }, 'Reset')) }, 'Reset progress'),
        h('button', { class: 'btn danger', 'data-act': 'delete', onclick: tap(() => confirmBox(`Delete ${p.name}? This removes their save from this device.`, () => pinPad('Enter the parent PIN to delete', v => { if (v !== meta.pin) return toast('That PIN did not match.'); deleteProfile(p.id); if (isActive) { sessionStorage.removeItem(PICKED); location.reload(); return; } toast('Player deleted.'); parentArea(); }), 'Delete')) }, 'Delete player'))));
  }
  body.append(h('div', { class: 'row center' },
    profiles().length < MAX_PROFILES ? h('button', { class: 'btn big', 'data-act': 'add', onclick: tap(() => addPlayer(parentArea)) }, '+ Add player') : null,
    h('button', { class: 'btn big', 'data-act': 'pin', onclick: tap(() => pinPad('Choose a new 4-digit PIN', v => pinPad('Type it again', v2 => { if (v === v2) { meta.pin = v; saveMeta(); toast('PIN changed.'); } else toast('The PINs did not match.'); }))) }, 'Change PIN'),
    h('button', { class: 'btn big', 'data-act': 'switch', onclick: tap(whoIsPlaying) }, '👥 Who’s playing')),
    h('div', { class: 'muted small center' }, DISCLAIMER + ' Faith Craft practices reading, vocabulary, and speech skills. It is not a medical or therapy product.'));
}
function levelsPanel(p) {
  const st = readProfileState(p.id); let read = clampLv(st.level.read), vocab = clampLv(st.level.vocab), lock = !!st.level.lock, school = st.settings.schoolOrder !== false;
  const body = openScreen(`${p.name}: levels`, { onBack: parentArea });
  const sel = (id, v, desc, set) => { const d = h('div', { class: 'lvdesc' }, desc[v]); const s = h('select', { id }, LV_SHORT.map((n, i) => { const o = h('option', { value: String(i) }, n); if (i === v) o.selected = true; return o; })); s.addEventListener('change', () => { set(Number(s.value)); d.textContent = desc[Number(s.value)]; }); return [s, d]; };
  const [rs, rd] = sel('lv-read', read, READ_DESC, v => read = v), [vs, vd] = sel('lv-vocab', vocab, VOCAB_DESC, v => vocab = v);
  const lk = h('input', { type: 'checkbox', id: 'lv-lock' }); lk.checked = lock; lk.addEventListener('change', () => lock = lk.checked);
  const so = h('input', { type: 'checkbox', id: 'school-order' }); so.checked = school; so.addEventListener('change', () => school = so.checked);
  body.append(h('div', { class: 'card' }, h('label', { class: 'set' }, h('span', {}, 'Reading level'), rs), rd, h('label', { class: 'set' }, h('span', {}, 'Vocabulary level'), vs), vd,
    h('label', { class: 'set' }, h('span', {}, 'Lock levels (stop automatic changes)'), lk),
    h('label', { class: 'set' }, h('span', {}, 'Follow school order (MCPS)'), so),
    h('div', { class: 'muted small' }, 'School order lists games in the order topics usually come up in Montgomery County Public Schools (Amplify CKLA in Pre-K to Grade 5, Maryland standards in Grades 6 to 8). Sources are listed in the Curriculum sources file linked from the Faith Craft Family website.')),
    (L => L.length ? h('div', { class: 'card small' }, h('b', {}, 'Recent changes: '), L.slice(-4).reverse().map(x => `${x.d}: ${lvName(x.read)} / ${lvName(x.vocab)} (${x.why})`).join(' · ')) : null)(st.level.history || []),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'save', onclick: tap(() => {
      updateProfileState(p.id, s => { const ch = s.level.read !== read || s.level.vocab !== vocab; s.level.read = read; s.level.vocab = vocab; s.level.lock = lock; s.settings.schoolOrder = school; if (ch) { s.level.how = 'chosen'; s.level.history.push({ d: today(), read, vocab, why: 'Changed by a parent' }); } });
      if (activeProfile() && activeProfile().id === p.id) dirty = true; toast('Saved.'); parentArea(); }) }, 'Save')));
}
function focusPanel(p) {
  const st = readProfileState(p.id); const f = new Set(st.focus || []);
  const body = openScreen(`${p.name}: focus sounds`, { onBack: parentArea });
  body.append(h('div', { class: 'muted center' }, 'Words with these sounds come first in Say It With Me. Practice is never graded.'),
    h('div', { class: 'card' }, Object.entries(FOCUS_SOUNDS).map(([k, n]) => { const c = h('input', { type: 'checkbox', 'data-f': k }); c.checked = f.has(k); c.addEventListener('change', () => c.checked ? f.add(k) : f.delete(k)); return h('label', { class: 'set' }, h('span', {}, n + ' sound' + (k === 'bl' ? 's (bl, cl, fl, gr…)' : '')), c); })),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'save', onclick: tap(() => { updateProfileState(p.id, s => { s.focus = [...f]; }); toast('Saved.'); parentArea(); }) }, 'Save')));
}
function editPanel(p) {
  const look = { ...(p.look || {}) }; let age = p.age;
  const body = openScreen(`Edit ${p.name}`, { onBack: parentArea });
  const nameIn = h('input', { type: 'text', maxlength: '20', value: p.name, id: 'pname' });
  const ageSel = h('select', { id: 'page' }, AGES.map(a => { const o = h('option', { value: String(a) }, String(a)); if (a === age) o.selected = true; return o; })); ageSel.addEventListener('change', () => age = Number(ageSel.value));
  const prev = h('div', { class: 'lookprev' }); const upd = () => { prev.innerHTML = faceSVG(look, 96); }; upd();
  const swatches = (key, cols) => h('div', { class: 'swatches' }, cols.map((c, i) => h('button', { class: 'sw' + (look[key] === i ? ' on' : ''), style: `background:${c}`, onclick: tap(e => { look[key] = i; e.currentTarget.parentNode.querySelectorAll('.sw').forEach(b => b.classList.toggle('on', b === e.currentTarget)); upd(); }) })));
  body.append(h('div', { class: 'card form' }, h('label', { class: 'set' }, h('span', {}, 'Name'), nameIn), h('label', { class: 'set' }, h('span', {}, 'Age'), ageSel),
    h('div', { class: 'muted small' }, 'Changing age changes the tone and look of the game, not the reading level.'),
    h('div', { class: 'lookrow' }, prev, h('div', {}, h('div', { class: 'small' }, 'Skin'), swatches('skin', SKINS), h('div', { class: 'small' }, 'Hair'), swatches('hair', HAIRS), h('div', { class: 'small' }, 'Shirt'), swatches('shirt', SHIRTS)))),
    h('div', { class: 'row center' }, h('button', { class: 'btn primary big', 'data-act': 'save', onclick: tap(() => { updateProfile(p.id, { name: nameIn.value.trim().slice(0, 20) || p.name, age, look }); if (activeProfile() && activeProfile().id === p.id) dirty = true; toast('Saved.'); parentArea(); }) }, 'Save')));
}
