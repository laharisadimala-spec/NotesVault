// Favourites: saved notes and bookmarked questions
function renderFavourites(){
  const favs = getFavs();
  const notes = allNotes().filter(n => favs.includes(n.id));
  const qs = QUESTIONS.filter(q => favs.includes("q" + q.id));
  document.getElementById("favNotes").innerHTML = notes.length ? notes.map(n => `
    <article class="card note-card"><span class="tag">${escapeHTML(n.type)}</span><h3>${escapeHTML(n.title)}</h3>
    <div class="muted">${escapeHTML(n.subject)} · Sem ${escapeHTML(n.semester)}</div>
    <div class="actions"><a class="btn sm ghost" href="library.html">Open in library</a>
    <button class="btn sm ghost" onclick="toggleFav('${n.id}');renderFavourites()">Remove</button></div></article>`).join("")
    : `<div class="empty card" style="grid-column:1/-1">No saved notes yet. Tap ♡ on a note in the library.</div>`;
  document.getElementById("favQs").innerHTML = qs.length ? qs.map(q => `
    <div class="list-row"><div><p style="font-weight:500">${escapeHTML(q.text)}</p><div class="muted">${escapeHTML(q.subject)} · ${q.marks} marks</div></div>
    <button class="btn sm ghost" onclick="toggleFav('q${q.id}');renderFavourites()">Remove</button></div>`).join("")
    : `<div class="empty">No bookmarked questions yet.</div>`;
  if (window.lucide) lucide.createIcons();
}
renderFavourites();
