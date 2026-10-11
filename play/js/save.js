// Faith Craft Family Edition saves. Several players per device (up to 6), each with separate progress and world.
// Every key starts with "fcfamily." so saves never mix with the original Faith Craft on the same site.
export const PREFIX = 'fcfamily.';
const META_KEY = PREFIX + 'profiles.v1';
export const MAX_PROFILES = 6;
const kState = id => PREFIX + 'p.' + id + '.state.v1', kWorld = id => PREFIX + 'p.' + id + '.world.v1';
export const DEFAULT_SETTINGS = { music: true, musicVol: 0.4, bob: true, helperCheck: false, calm: false, sound: true, rate: 0.9, autoRead: true, sens: 1, font: 'lexend', textSize: 1, spacing: true, cream: true, autoJump: true, view: 'back', zoom: 'normal', goButton: false, schoolOrder: true };
function freshLevel() { return { read: 2, vocab: 2, lock: false, how: null, history: [], upStreak: { read: 0, vocab: 0 }, lowStreak: { read: 0, vocab: 0 } }; }
function fresh() { return { v: 2, settings: { ...DEFAULT_SETTINGS }, level: freshLevel(), focus: [], placement: null, time: 0, speechCount: 0, stars: 0, xp: 0, quests: {}, active: null, badges: {}, words: {}, quiz: {}, practice: {}, player: null, hotbar: 0, started: false }; }
// ---------- storage layer: localStorage (primary) + IndexedDB mirror + rotating localStorage backups ----------
// Why: tablet browsers (Silk, Chrome private tabs, "clear data on exit") can wipe localStorage. Every write is mirrored to IndexedDB
// and to a rotating backup key; on start, anything missing or corrupt in the primary is restored from the backups.
const BAK1 = PREFIX + 'bak.1', BAK2 = PREFIX + 'bak.2', BAD = PREFIX + 'bad.';
export const storageInfo = { ok: true, idb: false, persistent: null, quotaMB: null, restored: false, lastError: null, lastSaved: 0, saveFailed: false, maybePrivate: false };
const listeners = new Set();
export const onSaveEvent = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = (type) => { for (const f of listeners) { try { f(type, storageInfo); } catch (e) { } } };
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { storageInfo.lastError = String(e && e.name || e); return false; } }, del: k => { try { localStorage.removeItem(k); } catch (e) { } } };
function parses(raw) { if (raw == null) return false; try { return JSON.parse(raw) != null; } catch (e) { return false; } }
function readJSON(k, d) {
  const raw = ls.get(k); if (raw == null) return d;
  try { const v = JSON.parse(raw); return v == null ? d : v; } catch (e) { ls.set(BAD + k.slice(PREFIX.length), raw.slice(0, 200000)); return d; } // keep a copy of anything unreadable instead of silently overwriting it
}
// --- IndexedDB mirror ---
let idbp = null;
function idb() {
  if (idbp) return idbp;
  idbp = new Promise(res => { try { const r = indexedDB.open('fcfamily-backup', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv'); r.onsuccess = () => { storageInfo.idb = true; res(r.result); }; r.onerror = r.onblocked = () => res(null); setTimeout(() => res(null), 2500); } catch (e) { res(null); } });
  return idbp;
}
async function idbPut(k, v) { const db = await idb(); if (!db) return; try { db.transaction('kv', 'readwrite').objectStore('kv').put(v, k); } catch (e) { } }
async function idbDel(k) { const db = await idb(); if (!db) return; try { db.transaction('kv', 'readwrite').objectStore('kv').delete(k); } catch (e) { } }
async function idbAll() { const db = await idb(); if (!db) return {}; return new Promise(res => { try { const out = {}; const q = db.transaction('kv').objectStore('kv').openCursor(); q.onsuccess = () => { const c = q.result; if (c) { out[c.key] = c.value; c.continue(); } else res(out); }; q.onerror = () => res(out); setTimeout(() => res(out), 2500); } catch (e) { res({}); } });
}
// --- rotating localStorage backups (snapshot of every save key, at most one rotation every 10 minutes) ---
const dataKeys = () => { const ks = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(PREFIX) && !k.startsWith(PREFIX + 'bak.') && !k.startsWith(BAD) && !k.startsWith(PREFIX + 'session.')) ks.push(k); } } catch (e) { } return ks; };
let bakT = null;
function snapshot() { const keys = {}; for (const k of dataKeys()) keys[k] = ls.get(k); return { t: Date.now(), keys }; }
function writeBackup() {
  bakT = null; const snap = snapshot(); const cur = ls.get(BAK1);
  try { const c = cur && JSON.parse(cur); if (c && Date.now() - c.t > 600000) ls.set(BAK2, cur); } catch (e) { }
  if (!ls.set(BAK1, JSON.stringify(snap))) { ls.del(BAK2); ls.set(BAK1, JSON.stringify(snap)); } // quota: drop the older copy first
}
const scheduleBackup = () => { if (!bakT) bakT = setTimeout(writeBackup, 3000); };
// --- write / remove ---
const lastWritten = {};
function putRaw(k, str) { // returns true when stored in localStorage; always mirrors to IndexedDB
  const ok = ls.set(k, str); idbPut(k, str); scheduleBackup(); return ok;
}
function writeJSON(k, v, quiet) {
  let str; try { str = JSON.stringify(v); } catch (e) { return false; }
  const ok = putRaw(k, str); storageInfo.saveFailed = !ok;
  if (ok) { storageInfo.lastSaved = Date.now(); if (!quiet && lastWritten[k] !== sig(k, str)) emit('saved'); lastWritten[k] = sig(k, str); } else emit('failed');
  return ok;
}
// Ignore play-time and position when deciding whether a save was "meaningful" (so the Saved note is not shown every few seconds)
function sig(k, str) { if (!k.endsWith('.state.v1')) return str; try { const o = JSON.parse(str); delete o.time; delete o.player; return JSON.stringify(o); } catch (e) { return str; } }
function removeKey(k) { ls.del(k); idbDel(k); scheduleBackup(); }
// Called once before the game loads: ask for durable storage, then repair anything missing or corrupt from the backups.
export async function initStorage() {
  try { // can this browser store anything at all?
    const probe = PREFIX + 'probe'; if (!ls.set(probe, '1') || ls.get(probe) !== '1') storageInfo.ok = false; ls.del(probe);
  } catch (e) { storageInfo.ok = false; }
  try {
    if (navigator.storage && navigator.storage.persisted) storageInfo.persistent = await navigator.storage.persisted();
    if (navigator.storage && navigator.storage.persist && !storageInfo.persistent) navigator.storage.persist().then(v => { storageInfo.persistent = !!v; }).catch(() => { });
    if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); storageInfo.quotaMB = Math.round((e.quota || 0) / 1048576); if (e.quota && e.quota < 130 * 1048576) storageInfo.maybePrivate = true; }
  } catch (e) { }
  const db = await idb(); if (!db) storageInfo.idb = false;
  if (!storageInfo.ok) { emit('blocked'); }
  // collect backup candidates: IndexedDB first, then the rotating localStorage copies
  const idbData = db ? await idbAll() : {};
  const cands = [idbData]; for (const b of [BAK1, BAK2]) { try { const o = JSON.parse(ls.get(b)); if (o && o.keys) cands.push(o.keys); } catch (e) { } }
  const present = k => parses(ls.get(k));
  let restored = 0;
  for (const src of cands) for (const k of Object.keys(src)) {
    if (!k.startsWith(PREFIX) || k.startsWith(PREFIX + 'bak.') || k.startsWith(BAD) || present(k) || !parses(src[k])) continue;
    // a player's save is only restored if that player still exists (or the profile list itself is being restored)
    if (ls.set(k, src[k])) restored++;
  }
  if (restored) { // drop restored player saves whose player is not in the (restored) player list
    try { const m = JSON.parse(ls.get(META_KEY) || 'null'); const ids = new Set(((m && m.list) || []).map(p => p.id)); for (const k of dataKeys()) { const mm = /^fcfamily\.p\.([^.]+)\./.exec(k); if (mm && !ids.has(mm[1])) { ls.del(k); } } } catch (e) { }
    storageInfo.restored = true; emit('restored');
  }
  // make sure the mirror holds everything currently in the primary
  if (db && storageInfo.ok) for (const k of dataKeys()) { const v = ls.get(k); if (v != null && idbData[k] !== v) idbPut(k, v); }
  scheduleBackup();
  // browsers usually grant persistence only after a user gesture; ask again on the first touch
  const again = () => { removeEventListener('pointerdown', again, true); try { navigator.storage && navigator.storage.persist && !storageInfo.persistent && navigator.storage.persist().then(v => { storageInfo.persistent = !!v; }); } catch (e) { } };
  addEventListener('pointerdown', again, true);
  return storageInfo;
}
// --- export / import (a safety net kept by a grown-up) ---
export function exportData() { const keys = {}; for (const k of dataKeys()) keys[k] = ls.get(k); return { fcf: 1, t: Date.now(), keys }; }
const b64u = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = t => { const s = atob(t.replace(/-/g, '+').replace(/_/g, '/')); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; };
async function pipe(u8, T) { const st = new Blob([u8]).stream().pipeThrough(new T('deflate-raw')); return new Uint8Array(await new Response(st).arrayBuffer()); }
export async function exportCode() {
  const u8 = new TextEncoder().encode(JSON.stringify(exportData()));
  try { if (typeof CompressionStream !== 'undefined') return 'FCF1.' + b64u(await pipe(u8, CompressionStream)); } catch (e) { }
  return 'FCF0.' + b64u(u8);
}
export async function parseCode(code) {
  const t = String(code || '').replace(/\s+/g, ''); const m = /^(FCF[01])\.([A-Za-z0-9_-]+)$/.exec(t); if (!m) throw new Error('That does not look like a progress code.');
  let u8 = unb64u(m[2]); if (m[1] === 'FCF1') { if (typeof DecompressionStream === 'undefined') throw new Error('This browser cannot read that code. Try a newer browser.'); u8 = await pipe(u8, DecompressionStream); }
  const o = JSON.parse(new TextDecoder().decode(u8)); if (!o || o.fcf !== 1 || !o.keys) throw new Error('That code is not a Faith Craft progress code.');
  return o;
}
export function summarize(o) { const m = o.keys[META_KEY] ? JSON.parse(o.keys[META_KEY]) : { list: [] }; return (m.list || []).map(p => p.name); }
export async function importData(o) { // replaces everything on this device with the imported progress
  if (!o || o.fcf !== 1 || !o.keys || !parses(o.keys[META_KEY])) throw new Error('No players found in that code.');
  writeBackup(); // keep what is here now as a backup, just in case
  for (const k of dataKeys()) removeKey(k);
  for (const [k, v] of Object.entries(o.keys)) { if (k.startsWith(PREFIX) && typeof v === 'string' && !k.startsWith(PREFIX + 'bak.')) { putRaw(k, v); } }
  await new Promise(r => setTimeout(r, 400));
}
// Save everything right now (page hiding, closing, going offline)
let worldPending = null;
export function flushAll() { clearTimeout(t); clearTimeout(wt); if (loadedId) { writeJSON(kState(loadedId), state, true); if (worldPending) { writeJSON(kWorld(loadedId), worldPending, true); worldPending = null; } } if (bakT) { clearTimeout(bakT); writeBackup(); } }
addEventListener('pagehide', flushAll); addEventListener('beforeunload', flushAll); addEventListener('freeze', flushAll);
document.addEventListener('visibilitychange', () => { if (document.hidden) flushAll(); });

// ---------- profiles (device level) ----------
export let meta = { v: 1, pin: null, active: null, list: [] };
export function loadMeta() { const m = readJSON(META_KEY, null); meta = m && Array.isArray(m.list) ? { v: 1, pin: m.pin || null, active: m.active || null, list: Array.isArray(m.list) ? m.list : [] } : { v: 1, pin: null, active: null, list: [] }; return meta; }
export function saveMeta() { writeJSON(META_KEY, meta); }
export const profiles = () => meta.list;
export const activeProfile = () => meta.list.find(p => p.id === meta.active) || null;
export const getProfile = id => meta.list.find(p => p.id === id) || null;
export function setActive(id) { meta.active = id; saveMeta(); }
export function newId() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
// Create a profile with its starting level. Returns the profile.
export function createProfile({ name, age, look, level }) {
  const id = newId(); const p = { id, name: (name || '').trim().slice(0, 20) || ('Player ' + (meta.list.length + 1)), age: Number(age) || 7, look, created: new Date().toLocaleDateString('en-US') };
  meta.list.push(p); saveMeta();
  const st = fresh(); if (level) Object.assign(st.level, level);
  st.level.history.push({ d: p.created, read: st.level.read, vocab: st.level.vocab, why: level && level.how === 'quiz' ? 'Placement quiz' : 'Chosen by a parent' });
  writeJSON(kState(id), st); return p;
}
export function updateProfile(id, patch) { const p = getProfile(id); if (!p) return; Object.assign(p, patch); saveMeta(); }
export function deleteProfile(id) { meta.list = meta.list.filter(p => p.id !== id); if (meta.active === id) meta.active = null; saveMeta(); removeKey(kState(id)); removeKey(kWorld(id)); }
export function resetProfile(id) { const old = readProfileState(id); const st = fresh(); st.level = old.level; st.focus = old.focus || []; st.settings = old.settings; st.level.history.push({ d: new Date().toLocaleDateString('en-US'), read: st.level.read, vocab: st.level.vocab, why: 'Progress reset' }); writeJSON(kState(id), st); removeKey(kWorld(id)); if (id === meta.active) state = normalize(st); }
function normalize(s) { const st = Object.assign(fresh(), s || {}); st.settings = { ...DEFAULT_SETTINGS, ...((s && s.settings) || {}) }; st.level = Object.assign(freshLevel(), (s && s.level) || {}); return st; }
export function readProfileState(id) { if (id === meta.active && loadedId === id) return state; return normalize(readJSON(kState(id), null)); }
// Change another profile's saved state (or the live one, if it is the active player)
export function updateProfileState(id, fn) { if (id === meta.active && loadedId === id) { fn(state); saveState(true); return state; } const st = readProfileState(id); fn(st); writeJSON(kState(id), st); return st; }

// ---------- the active player's state ----------
export let state = fresh();
let loadedId = null;
export function loadState() {
  loadMeta(); const p = activeProfile(); loadedId = p ? p.id : null;
  state = p ? normalize(readJSON(kState(p.id), null)) : fresh();
  return state;
}
var t = null;
export function saveState(now) { if (!loadedId) return; clearTimeout(t); const id = loadedId, f = () => writeJSON(kState(id), state); if (now) f(); else t = setTimeout(f, 250); }
export function loadWorldEdits() { return loadedId ? readJSON(kWorld(loadedId), {}) : {}; }
var wt = null;
export function saveWorld(edits, now) { if (!loadedId) return; clearTimeout(wt); worldPending = edits; const id = loadedId, f = () => { worldPending = null; writeJSON(kWorld(id), edits); }; if (now) f(); else wt = setTimeout(f, 400); }
export function hasPlayer() { return !!loadedId; }
