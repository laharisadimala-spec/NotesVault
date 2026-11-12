// Shared layout: sidebar, theme, mobile menu, notification bell, helpers
KEY.requests = "nv_requests"; KEY.profile = "nv_profile"; KEY.notif = "nv_notif";
const NAV = [
  ["index.html","Home","home"],["dashboard.html","Dashboard","layout-dashboard"],["library.html","Explore Notes","book-open"],
  ["upload.html","Upload Notes","upload"],["question-papers.html","Question Papers","file-text"],
  ["important-questions.html","Important Questions","star"],["requests.html","Notes Requests","message-square-plus"],
  ["favourites.html","Favourites","heart"],["leaderboard.html","Leaderboard","trophy"],["profile.html","My Profile","user"],
  ["admin.html","Admin Panel","shield"],["profile.html#settings","Settings","settings"]
];
function fillSelect(id, vals, label){
  const el = document.getElementById(id);
  el.innerHTML = `<option value="">All ${label}</option>` + [...new Set(vals)].sort().map(v => `<option>${escapeHTML(v)}</option>`).join("");
}
function filterBy(items, pairs){
  return items.filter(it => pairs.every(([id, f]) => { const v = document.getElementById(id).value; return !v || String(it[f]) === v; }));
}
function closeModal(){ document.getElementById("modal").classList.remove("open"); }
function initBell(){
  const tb = document.getElementById("themeBtn"); if (!tb) return;
  const wrap = document.createElement("div"); wrap.className = "bell-wrap";
  wrap.innerHTML = `<button class="btn ghost" id="bellBtn" aria-label="Notifications"><i data-lucide="bell"></i></button><span class="dot"></span><div id="notifPanel" class="card"></div>`;
  tb.parentElement.insertBefore(wrap, tb);
  const items = [
    ...getUploads().map(u => u.status === "approved" ? `Your upload “${u.title}” was approved.` : u.status === "rejected" ? `Your upload “${u.title}” was rejected.` : `“${u.title}” is pending review.`),
    "New notes added to Operating Systems.", "Ananya Reddy reached 24 uploads."
  ];
  const panel = document.getElementById("notifPanel");
  panel.innerHTML = items.map(t => `<p>${escapeHTML(t)}</p>`).join("");
  document.getElementById("bellBtn").onclick = e => { e.stopPropagation(); panel.classList.toggle("open"); };
  document.addEventListener("click", e => { if (!wrap.contains(e.target)) panel.classList.remove("open"); });
}
function initLayout(){
  const cur = location.pathname.split("/").pop() || "index.html";
  const here = cur + (location.hash || "");
  const sb = document.getElementById("sidebar");
  sb.innerHTML = `<div class="brand">Notes<span>Vault</span></div><nav class="nav">` +
    NAV.map(([href,label,icon]) => {
      const active = href === here || (!href.includes("#") && href === cur && !location.hash);
      return `<a href="${href}" class="${active ? "active" : ""}"><i data-lucide="${icon}"></i>${label}</a>`;
    }).join("") + `</nav>`;
  document.documentElement.dataset.theme = localStorage.getItem(KEY.theme) || "light";
  const btn = document.getElementById("themeBtn");
  if (btn) btn.onclick = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next; localStorage.setItem(KEY.theme, next);
    const sel = document.getElementById("themeSel"); if (sel) sel.value = next;
  };
  const menu = document.getElementById("menuBtn");
  if (menu) menu.onclick = () => sb.classList.toggle("open");
  const modal = document.getElementById("modal");
  if (modal) modal.onclick = e => { if (e.target.id === "modal") closeModal(); };
  if (localStorage.getItem(KEY.notif) !== "off") initBell();
  if (window.lucide) lucide.createIcons();
}
document.addEventListener("DOMContentLoaded", initLayout);
