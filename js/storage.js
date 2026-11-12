// localStorage helpers and shared UI utilities
const KEY = {uploads:"nv_uploads", favs:"nv_favs", views:"nv_views", theme:"nv_theme"};
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const getUploads = () => load(KEY.uploads, []);
const getFavs = () => load(KEY.favs, []);
const allNotes = () => [...SAMPLE_NOTES, ...getUploads()];

function toggleFav(id){
  let f = getFavs();
  if (f.includes(id)) { f = f.filter(x => x !== id); save(KEY.favs, f); toast("Removed from favourites"); }
  else { f.push(id); save(KEY.favs, [...new Set(f)]); toast("Added to favourites"); }
}
function recordView(id){
  const v = load(KEY.views, []).filter(x => x !== id); v.unshift(id);
  save(KEY.views, v.slice(0, 6));
}
function bumpDownload(id){
  const u = getUploads(), i = u.findIndex(n => n.id === id);
  if (i > -1) { u[i].downloads++; save(KEY.uploads, u); }
}
function toast(msg, bad=false){
  let box = document.querySelector(".toasts");
  if (!box) { box = document.createElement("div"); box.className = "toasts"; document.body.appendChild(box); }
  const t = document.createElement("div"); t.className = "toast" + (bad ? " bad" : ""); t.textContent = msg;
  box.appendChild(t); setTimeout(() => t.remove(), 2800);
}
function confirmDialog(msg){ return window.confirm(msg); }
function escapeHTML(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
