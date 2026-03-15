/**
 * Assessment form — one dropdown per category for the active user.
 *
 * When the custom framework has no categories yet, shows a setup prompt instead.
 */

function renderAssessment() {
  const el = document.getElementById("assessment-section");
  if (!el) return;

  if (state.activeFramework === "custom" && !frameworkIsConfigured()) {
    _renderFrameworkSetup(el);
    return;
  }

  if (!state.activeUser) {
    el.innerHTML = `<p class="hint">Select or add a direct report above to start an assessment.</p>`;
    return;
  }

  const fw         = getFramework();
  const assessment = getUserAssessment(fw);

  el.innerHTML = `
    <h3>Assessment &mdash; <em>${esc(state.activeUser)}</em></h3>
    <div class="assessment-form">
      ${fw.categories.map((cat, i) => {
        const val  = assessment[i] || 0;
        const hint = val > 0 ? (cat.levels.find((l) => l.level === val)?.description || "") : "";
        return `
          <div class="assessment-row">
            <label>${esc(cat.name)}</label>
            <select data-index="${i}">
              <option value="0">—</option>
              ${cat.levels.map((lv) =>
                `<option value="${lv.level}" ${val === lv.level ? "selected" : ""}>${lv.level} &ndash; ${esc(lv.name)}</option>`
              ).join("")}
            </select>
            <span class="level-hint">${hint}</span>
          </div>`;
      }).join("")}
    </div>
  `;

  el.querySelectorAll("select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const idx     = parseInt(e.target.dataset.index, 10);
      const val     = parseInt(e.target.value, 10);
      const updated = getUserAssessment(fw);
      updated[idx]  = val;
      saveUserAssessment(updated);

      e.target.closest(".assessment-row").querySelector(".level-hint").textContent =
        val > 0 ? (fw.categories[idx].levels.find((l) => l.level === val)?.description || "") : "";

      updateChart();
    });
  });
}

// ── Custom framework setup prompt ─────────────────────────────────────────────

function _renderFrameworkSetup(el) {
  el.innerHTML = `
    <h3>Set up custom framework</h3>
    <p class="setup-description">
      <code>framework.json</code> has no categories yet.
      You can start from a copy of the default framework and adapt it,
      or edit the file directly in your folder.
    </p>
    <div class="setup-actions">
      <button id="copy-default-btn" class="btn btn-primary">
        Copy from Default Framework
      </button>
      <p class="level-hint">
        This copies all 5 categories and roles into <code>framework.json</code>
        so you can rename and adjust them freely.
      </p>
    </div>
  `;

  document.getElementById("copy-default-btn").addEventListener("click", () => {
    // Deep copy DEFAULT_FRAMEWORK, keep the existing custom name if set
    const existing = Store.getCustomFw();
    const copy = JSON.parse(JSON.stringify(DEFAULT_FRAMEWORK));
    copy.version = 1;
    copy.name    = (existing?.name && existing.name !== "Custom Framework")
                   ? existing.name
                   : "Custom Framework";
    Store.setCustomFw(copy);
    render();
  });
}
