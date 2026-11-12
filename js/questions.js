// Important questions: filters and bookmarks (stored in favourites as "q" + id)
function renderQuestions(){
  const list = filterBy(QUESTIONS, [["fSubject","subject"],["fUnit","unit"],["fType","type"],["fMarks","marks"]]);
  document.getElementById("qGrid").innerHTML = list.length ? list.map(q => {
    const saved = getFavs().includes("q" + q.id);
    return `<article class="card"><span class="tag">${escapeHTML(q.type)}</span><span class="tag">${q.marks} marks</span>
      <p style="margin:10px 0;font-weight:500">${escapeHTML(q.text)}</p>
      <div class="muted">${escapeHTML(q.subject)} · Unit ${q.unit}</div>
      <div class="actions"><button class="btn sm ghost" onclick="toggleFav('q${q.id}');renderQuestions()">${saved ? "♥ Bookmarked" : "♡ Bookmark"}</button></div></article>`;
  }).join("") : `<div class="empty card" style="grid-column:1/-1">No questions match these filters.</div>`;
}
fillSelect("fSubject", QUESTIONS.map(q => q.subject), "subjects");
fillSelect("fUnit", QUESTIONS.map(q => q.unit), "units");
fillSelect("fType", QUESTIONS.map(q => q.type), "types");
fillSelect("fMarks", QUESTIONS.map(q => String(q.marks)), "marks");
document.querySelectorAll(".filters select").forEach(s => s.onchange = renderQuestions);
renderQuestions();
