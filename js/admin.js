// Simulated admin panel. Not a secure administrative system.
function renderAdmin(){
  const up = getUploads();
  const count = s => up.filter(u => u.status === s).length;
  document.getElementById("adminStats").innerHTML = [
    ["Total documents", allNotes().length], ["Pending uploads", count("pending")],
    ["Approved uploads", count("approved")], ["Reported documents", 0], ["Registered users (demo)", 124]
  ].map(([l,v]) => `<div class="card stat"><b>${v}</b><span>${l}</span></div>`).join("");
  document.getElementById("uploadRows").innerHTML = up.length ? up.map(u => `
    <tr><td>${escapeHTML(u.title)}</td><td>${escapeHTML(u.subject)}</td><td>${escapeHTML(u.contributor)}</td>
    <td><span class="pill ${u.status}">${u.status}</span></td>
    <td class="actions" style="margin:0">
      <button class="btn sm ghost" onclick="viewDetails('${u.id}')">View</button>
      <button class="btn sm" onclick="setStatus('${u.id}','approved')">Approve</button>
      <button class="btn sm ghost" onclick="setStatus('${u.id}','rejected')">Reject</button>
      <button class="btn sm ghost" onclick="removeUpload('${u.id}')">Remove</button>
    </td></tr>`).join("")
    : `<tr><td colspan="5"><div class="empty">No uploads yet. Submit one from the Upload page.</div></td></tr>`;
  if (window.lucide) lucide.createIcons();
}
function setStatus(id, status){
  const up = getUploads(), u = up.find(x => x.id === id); if (!u) return;
  u.status = status; save(KEY.uploads, up); toast(`Upload ${status}`); renderAdmin();
}
function removeUpload(id){
  if (!confirmDialog("Remove this document permanently from the demo?")) return;
  save(KEY.uploads, getUploads().filter(x => x.id !== id)); toast("Document removed"); renderAdmin();
}
function viewDetails(id){
  const u = getUploads().find(x => x.id === id); if (!u) return;
  document.getElementById("modalTitle").textContent = "Upload details";
  document.getElementById("modalBody").innerHTML = `<table>${
    Object.entries(u).filter(([k]) => k !== "id").map(([k,v]) => `<tr><th>${k}</th><td>${escapeHTML(v)}</td></tr>`).join("")}</table>`;
  document.getElementById("modal").classList.add("open");
}
document.addEventListener("DOMContentLoaded", renderAdmin);
