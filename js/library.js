// Notes library: filters, search, cards, preview modal
let query = "";
function fillFilters(){
  const notes = allNotes();
  const opts = (sel, vals, label) => {
    const el = document.getElementById(sel);
    el.innerHTML = `<option value="">All ${label}</option>` + [...new Set(vals)].sort().map(v => `<option>${escapeHTML(v)}</option>`).join("");
  };
  opts("fBranch", notes.map(n => n.branch), "branches");
  opts("fSemester", notes.map(n => n.semester), "semesters");
  opts("fSubject", notes.map(n => n.subject), "subjects");
  opts("fUnit", notes.map(n => n.unit), "units");
  opts("fType", notes.map(n => n.type), "types");
}
function filtered(){
  const v = id => document.getElementById(id).value;
  return allNotes().filter(n =>
    (!v("fBranch") || n.branch === v("fBranch")) &&
    (!v("fSemester") || n.semester === v("fSemester")) &&
    (!v("fSubject") || n.subject === v("fSubject")) &&
    (!v("fUnit") || n.unit === v("fUnit")) &&
    (!v("fType") || n.type === v("fType")) &&
    (!query || (n.title + " " + n.subject).toLowerCase().includes(query)));
}
function render(){
  const list = filtered(), favs = getFavs(), el = document.getElementById("grid");
  if (!list.length) { el.innerHTML = `<div class="empty card" style="grid-column:1/-1"><i data-lucide="search-x"></i>No notes match these filters.</div>`; }
  else el.innerHTML = list.map(n => `
    <article class="card note-card">
      <span class="tag">${escapeHTML(n.type)}</span><span class="tag">Sem ${escapeHTML(n.semester)}</span>
      <h3>${escapeHTML(n.title)}</h3>
      <div class="muted">${escapeHTML(n.subject)}</div>
      <div class="note-meta">
        <span>Branch: ${escapeHTML(n.branch)}</span><span>Unit: ${escapeHTML(n.unit)}</span>
        <span>Uploaded: ${escapeHTML(n.date)}</span><span>By ${escapeHTML(n.contributor)}</span>
        <span>⬇ ${n.downloads}</span><span>★ ${n.rating}</span>
      </div>
      <div class="actions">
        <button class="btn sm ghost" onclick="preview('${n.id}')"><i data-lucide="eye"></i>Preview</button>
        <button class="btn sm" onclick="download('${n.id}')"><i data-lucide="download"></i>Download</button>
        <button class="btn sm ghost" onclick="toggleFav('${n.id}');render()">${favs.includes(n.id) ? "♥" : "♡"}</button>
      </div>
    </article>`).join("");
  if (window.lucide) lucide.createIcons();
}
function preview(id){
  const n = allNotes().find(x => x.id === id); if (!n) return;
  recordView(id);
  document.getElementById("modalTitle").textContent = n.title;
  document.getElementById("modalBody").innerHTML = n.url
    ? `<iframe src="${n.url}"></iframe>`
    : `<div class="empty"><i data-lucide="file-text"></i>Sample notes have no file attached in this demo. Uploaded files can be previewed in the same session.</div>`;
  document.getElementById("modal").classList.add("open");
  if (window.lucide) lucide.createIcons();
}
function download(id){
  const n = allNotes().find(x => x.id === id);
  if (n && !n.sample) bumpDownload(id);
  toast(n?.sample ? "Demo: sample notes have no file to download" : "Download started");
  render();
}
function closeModal(){ document.getElementById("modal").classList.remove("open"); }
document.addEventListener("DOMContentLoaded", () => {
  fillFilters();
  document.querySelectorAll(".filters select").forEach(s => s.onchange = render);
  const s = document.getElementById("search");
  s.oninput = () => { query = s.value.trim().toLowerCase(); render(); };
  document.getElementById("modal").onclick = e => { if (e.target.id === "modal") closeModal(); };
  render();
});
document.addEventListener("DOMContentLoaded", () => {
  const dl = document.createElement("datalist"); dl.id = "sugg";
  dl.innerHTML = [...new Set(allNotes().map(n => n.title))].map(t => `<option value="${escapeHTML(t)}">`).join("");
  document.body.appendChild(dl);
  document.getElementById("search").setAttribute("list", "sugg");
  const subj = new URLSearchParams(location.search).get("subject");
  if (subj) { document.getElementById("fSubject").value = subj; render(); }
});
