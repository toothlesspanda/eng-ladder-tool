/**
 * Welcome screen — shown on first visit or when no folder is open.
 *
 * Picking a folder will:
 *  - Create `data.json` and `custom-framework.json` if they don't exist yet, OR
 *  - Load them if they already exist (i.e. re-opening a previous session).
 */

function renderWelcome(needsPermission = false) {
  document.getElementById("header").innerHTML = `
    <div class="header-main">
      <div class="header-title"><h1>Engineering Ladder</h1></div>
    </div>
  `;

  const folderName = Store.dirName();

  document.getElementById("main").innerHTML = `
    <div id="welcome">
      <div class="welcome-card">
        <h2>Welcome</h2>
        <p>
          All data is stored locally in a folder you choose —
          two JSON files, no accounts, no server.
        </p>
        ${Store.hasAPI ? _apiActions(needsPermission, folderName) : _fallbackActions()}
      </div>
    </div>
  `;

  _bindEvents();
}

function _apiActions(needsPermission, folderName) {
  return `
    <div class="welcome-actions">
      ${needsPermission ? `
        <button id="resume-folder-btn" class="btn btn-primary">
          &#128274; Allow access to &ldquo;${esc(folderName)}&rdquo;
        </button>
        <div class="welcome-divider"></div>
      ` : ""}
      <button id="pick-folder-btn" class="btn ${needsPermission ? "btn-secondary" : "btn-primary"}">
        &#128193; ${needsPermission ? "Pick a different folder" : "Pick a folder to get started"}
      </button>
      <p class="welcome-hint">
        Creates <code>assessments.json</code> + <code>framework.json</code> if new,
        or loads them if they already exist.
      </p>
    </div>
  `;
}

function _fallbackActions() {
  return `
    <p class="muted small">
      Your browser doesn't support direct folder access.<br>
      Import both files manually to get started.
    </p>
    <div class="welcome-actions">
      <label class="btn btn-primary">
        &#128194; Import assessments.json
        <input id="import-data-input" type="file" accept=".json" style="display:none">
      </label>
      <label class="btn btn-secondary">
        &#128194; Import framework.json
        <input id="import-fw-input" type="file" accept=".json" style="display:none">
      </label>
    </div>
  `;
}

function _bindEvents() {
  document.getElementById("resume-folder-btn")?.addEventListener("click", async () => {
    try {
      const ok = await Store.resumeFolder();
      if (ok) { loadMeta(); renderApp(); }
      else alert("Permission denied. Please pick the folder manually.");
    } catch (e) {
      if (e.name !== "AbortError") alert("Could not resume: " + e.message);
    }
  });

  document.getElementById("pick-folder-btn")?.addEventListener("click", async () => {
    try {
      await Store.pickFolder();
      loadMeta();
      renderApp();
    } catch (e) {
      if (e.name !== "AbortError") alert("Could not open folder: " + e.message);
    }
  });

  document.getElementById("import-data-input")?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { await Store.importAssessments(file); loadMeta(); renderApp(); }
    catch { alert("Invalid assessments.json file."); }
  });

  document.getElementById("import-fw-input")?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { await Store.importFramework(file); render(); }
    catch { alert("Invalid framework.json file."); }
  });
}
