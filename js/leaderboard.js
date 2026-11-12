// Leaderboard: sorted sample contributors with initials and badges
document.getElementById("lbBody").innerHTML = [...LEADERBOARD].sort((a, b) => b.points - a.points).map((s, i) => `
  <tr><td>${i + 1}</td>
  <td><div style="display:flex;gap:10px;align-items:center"><span class="avatar">${s.name.split(" ").map(w => w[0]).join("").slice(0,2)}</span>${escapeHTML(s.name)}</div></td>
  <td>${s.uploads}</td><td>${s.points}</td>
  <td>${s.badges.map(b => `<span class="tag">${escapeHTML(b)}</span>`).join("")}</td></tr>`).join("");
