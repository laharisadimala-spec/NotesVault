// Question papers: filters and cards
function renderPapers(){
  const list = filterBy(PAPERS, [["fKind","kind"],["fSemester","semester"],["fSubject","subject"],["fYear","year"]]);
  document.getElementById("pGrid").innerHTML = list.length ? list.map(p => `
    <article class="card note-card"><span class="tag">${p.kind}</span><span class="tag">Sem ${p.semester}</span>
    <h3>${escapeHTML(p.title)}</h3><div class="muted">${escapeHTML(p.subject)} · ${p.year}</div>
    <div class="actions"><button class="btn sm" onclick="toast('Demo: sample papers have no file attached')"><i data-lucide="download"></i>Download</button></div></article>`).join("")
    : `<div class="empty card" style="grid-column:1/-1">No papers match these filters.</div>`;
  if (window.lucide) lucide.createIcons();
}
fillSelect("fKind", ["Mid","Semester","Supplementary","Model"], "types");
fillSelect("fSemester", PAPERS.map(p => p.semester), "semesters");
fillSelect("fSubject", PAPERS.map(p => p.subject), "subjects");
fillSelect("fYear", PAPERS.map(p => p.year), "years");
document.querySelectorAll(".filters select").forEach(s => s.onchange = renderPapers);
renderPapers();
