// Notes requests: validated form, saved to localStorage
const reqForm = document.getElementById("reqForm");
reqForm.subject.innerHTML = `<option value="">Select subject</option>` + SUBJECTS.map(s => `<option>${s}</option>`).join("");
function renderRequests(){
  const mine = load(KEY.requests, []);
  const all = [...mine, ...SAMPLE_REQUESTS];
  document.getElementById("reqList").innerHTML = all.map(r => {
    const mineFlag = mine.some(m => m.id === r.id);
    return `<div class="list-row"><div style="flex:1;min-width:200px"><b>${escapeHTML(r.title)}</b>
      <div class="muted">${escapeHTML(r.subject)} · Sem ${escapeHTML(r.semester)} · ${escapeHTML(r.date)}</div>
      <div class="muted" style="margin-top:4px">${escapeHTML(r.description)}</div></div>
      <div style="display:flex;gap:8px;align-items:center"><span class="pill ${r.status === "Fulfilled" ? "approved" : "pending"}">${r.status}</span>
      ${mineFlag && r.status === "Pending" ? `<button class="btn sm ghost" onclick="markFulfilled('${r.id}')">Mark fulfilled</button>` : ""}</div></div>`;
  }).join("");
}
function markFulfilled(id){
  const list = load(KEY.requests, []), r = list.find(x => x.id === id);
  if (r) { r.status = "Fulfilled"; save(KEY.requests, list); toast("Request marked fulfilled"); renderRequests(); }
}
reqForm.onsubmit = e => {
  e.preventDefault();
  let ok = true;
  reqForm.querySelectorAll("[data-req]").forEach(el => {
    const bad = !el.value.trim(), err = el.parentElement.querySelector(".err");
    err.textContent = bad ? "This field is required" : ""; if (bad) ok = false;
  });
  if (!ok) return toast("Please fill in the highlighted fields", true);
  const list = load(KEY.requests, []);
  list.push({id:"r" + Date.now(), title:reqForm.title.value.trim(), subject:reqForm.subject.value,
    semester:reqForm.semester.value, description:reqForm.description.value.trim(), status:"Pending",
    date:new Date().toISOString().slice(0,10)});
  save(KEY.requests, list); reqForm.reset(); toast("Request submitted"); renderRequests();
};
renderRequests();
