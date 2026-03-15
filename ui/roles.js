/**
 * Role selector — pill checkboxes grouped by role category.
 * Up to 4 roles can be selected simultaneously.
 */

function renderRoleSelector() {
  const el = document.getElementById("role-selector-section");
  if (!el) return;

  const fw = getFramework();

  if (!frameworkIsConfigured()) {
    el.innerHTML = state.activeFramework === "custom"
      ? `<p class="hint">Set up your custom framework below first.</p>`
      : `<p class="hint">No roles defined.</p>`;
    return;
  }

  el.innerHTML = `
    <h3>Compare with roles <small>(max 4)</small></h3>
    ${_groupedRoles(fw.roles)}
  `;

  el.querySelectorAll("input[type=checkbox]").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const label = e.target.value;

      if (e.target.checked) {
        if (state.selectedRoles.length >= 4) { e.target.checked = false; return; }
        state.selectedRoles.push(label);
      } else {
        state.selectedRoles = state.selectedRoles.filter((r) => r !== label);
      }

      el.querySelectorAll(".role-label").forEach((pill) => {
        pill.classList.toggle("checked", pill.querySelector("input").checked);
      });

      updateChart();
      renderLevelsTable();
    });
  });
}

function _groupedRoles(roles) {
  // Group by category, preserving original order
  const groups = [];
  const seen   = {};

  roles.forEach((role) => {
    const cat = role.category || "Other";
    if (!seen[cat]) { seen[cat] = []; groups.push({ cat, roles: seen[cat] }); }
    seen[cat].push(role);
  });

  return groups.map(({ cat, roles }) => `
    <div class="role-group">
      <span class="role-group-label">${esc(cat)}</span>
      <div class="role-checkboxes">
        ${roles.map((role) => {
          const checked = state.selectedRoles.includes(role.label);
          return `
            <label class="role-label ${checked ? "checked" : ""}">
              <input type="checkbox" value="${esc(role.label)}" ${checked ? "checked" : ""}>
              ${esc(role.label)}
            </label>`;
        }).join("")}
      </div>
    </div>
  `).join("");
}
