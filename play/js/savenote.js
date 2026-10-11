// Small "Progress saved" note (bottom-left, never blocks taps) and a grown-up warning when this browser cannot keep progress.
import { onSaveEvent, storageInfo } from './save.js';
let note, bar, hideT = null, dismissed = false;
function ensure() {
  if (note) return;
  note = document.createElement('div'); note.id = 'savednote'; note.setAttribute('aria-live', 'polite'); document.body.append(note);
  bar = document.createElement('div'); bar.id = 'savewarn'; bar.className = 'hidden'; document.body.append(bar);
}
function show(text, bad) { ensure(); note.textContent = text; note.classList.toggle('bad', !!bad); note.classList.add('show'); clearTimeout(hideT); hideT = setTimeout(() => note.classList.remove('show'), bad ? 6000 : 1600); }
function warn(html) {
  ensure(); if (dismissed) return; bar.className = '';
  bar.innerHTML = ''; const m = document.createElement('span'); m.textContent = html; const b = document.createElement('button'); b.textContent = 'OK'; b.onclick = () => { dismissed = true; bar.className = 'hidden'; }; bar.append(m, b);
}
export function initSaveNote() {
  ensure();
  onSaveEvent(type => {
    if (type === 'saved') show('✓ Progress saved');
    else if (type === 'failed') { show('⚠ Could not save', true); warn('Grown-up: progress could not be saved on this device. It may be private mode or full storage. Open the Parent area > Keep progress safe.'); }
    else if (type === 'blocked') warn('Grown-up: progress can’t be saved in private mode (or with site data blocked). Use a normal tab, not a private one, or progress will be lost.');
    else if (type === 'restored') show('✓ Progress restored');
  });
  if (!storageInfo.ok) warn('Grown-up: progress can’t be saved in private mode (or with site data blocked). Use a normal tab, not a private one, or progress will be lost.');
  if (storageInfo.restored) show('✓ Progress restored');
}
