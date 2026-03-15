/**
 * Levels detail table — shown below the side panel when roles are selected.
 * Displays each category row with the rank name and description per role.
 */

function renderLevelsTable() {
  const el = document.getElementById("levels-table-section");
  if (!el) return;

  const fw = getFramework();

  if (state.selectedRoles.length === 0) {
    el.innerHTML = "";
    return;
  }

  const selected = state.selectedRoles
    .map((label) => fw.roles.find((r) => r.label === label))
    .filter(Boolean);

  el.innerHTML = `
    <div class="levels-table-wrapper">
      <h3>Level details</h3>
      <table class="levels-table">
        <thead>
          <tr>
            <th>Category</th>
            ${selected.map((r) => `<th>${esc(r.label)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${fw.categories.map((cat, i) => `
            <tr>
              <td class="cat-name">${esc(cat.name)}</td>
              ${selected.map((role) => {
                const rank = role.rank[i];
                const lv   = cat.levels.find((l) => l.level === rank);
                return `<td>
                  <span class="level-badge">${rank} &ndash; ${esc(lv?.name || "?")}</span>
                  <p class="level-desc">${lv?.description || ""}</p>
                </td>`;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}
