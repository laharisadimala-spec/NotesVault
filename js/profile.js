// Demo profile and settings. Everything is stored locally in this browser.
const PDEF = {name:"Lahari", college:"Stanley College of Engineering and Technology for Women", branch:"CSE", semester:"6"};
const pForm = document.getElementById("profileForm");
const pData = {...PDEF, ...load(KEY.profile, {})};
for (const k of ["name","college","branch","semester"]) pForm[k].value = pData[k];
function renderProfileHeader(d){
  document.getElementById("pAvatar").textContent = d.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  document.getElementById("pName").textContent = d.name;
  document.getElementById("pSub").textContent = `${d.branch} · Semester ${d.semester}`;
}
renderProfileHeader(pData);
pForm.onsubmit = e => {
  e.preventDefault();
  if (!pForm.name.value.trim() || !pForm.college.value.trim()) return toast("Name and college are required", true);
  const d = {name:pForm.name.value.trim(), college:pForm.college.value.trim(), branch:pForm.branch.value, semester:pForm.semester.value};
  save(KEY.profile, d); renderProfileHeader(d); toast("Profile saved");
};
const themeSel = document.getElementById("themeSel");
themeSel.value = document.documentElement.dataset.theme || "light";
themeSel.onchange = () => {
  document.documentElement.dataset.theme = themeSel.value; localStorage.setItem(KEY.theme, themeSel.value);
};
const notifChk = document.getElementById("notifChk");
notifChk.checked = localStorage.getItem(KEY.notif) !== "off";
notifChk.onchange = () => { localStorage.setItem(KEY.notif, notifChk.checked ? "on" : "off"); toast("Saved. Reload to apply."); };
document.getElementById("clearBtn").onclick = () => {
  if (!confirmDialog("Clear all demo data saved in this browser?")) return;
  [KEY.uploads, KEY.favs, KEY.views, KEY.requests, KEY.profile].forEach(k => localStorage.removeItem(k));
  toast("Demo data cleared"); setTimeout(() => location.reload(), 600);
};
