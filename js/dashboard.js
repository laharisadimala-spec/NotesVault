// Dashboard: stats, shortcuts, recently viewed, popular and recent notes
const dNotes = allNotes();
const dRow = n => `<div class="list-row"><div><a href="library.html" style="font-weight:500">${escapeHTML(n.title)}</a><div class="muted">${escapeHTML(n.subject)}</div></div><span class="muted">⬇ ${n.downloads}</span></div>`;
const dEmpty = t => `<div class="empty">${t}</div>`;
document.getElementById("dStats").innerHTML = [
  ["Total available notes", dNotes.length],
  ["Total downloads", dNotes.reduce((s, n) => s + n.downloads, 0)],
  ["My uploads", getUploads().length],
  ["Saved favourites", getFavs().length]
].map(([l, v]) => `<div class="card stat"><b>${v}</b><span>${l}</span></div>`).join("");
document.getElementById("dSubjects").innerHTML = SUBJECTS.map(s =>
  `<a class="tag" style="padding:8px 14px;font-size:.85rem" href="library.html?subject=${encodeURIComponent(s)}">${escapeHTML(s)}</a>`).join("");
document.getElementById("dRecent").innerHTML = load(KEY.views, []).map(id => dNotes.find(n => n.id === id)).filter(Boolean).slice(0, 4).map(dRow).join("")
  || dEmpty("Nothing viewed yet. Open a note in the library.");
document.getElementById("dPopular").innerHTML = [...dNotes].sort((a, b) => b.downloads - a.downloads).slice(0, 4).map(dRow).join("");
document.getElementById("dUploads").innerHTML = [...dNotes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4).map(dRow).join("");
