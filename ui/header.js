/**
 * Header — direct report selector, framework toggle, and folder status,
 * all in a single navbar row.
 */

function renderHeader() {
  const users     = getUsers();
  const userNames = Object.keys(users);

  const folderHtml = Store.isReady()
    ? `<div class="control-group folder-group">
         <span class="folder-name">&#128193; ${esc(Store.dirName() || "local folder")}</span>
         <button id="change-folder-btn" class="btn btn-xs btn-ghost">change folder</button>
         ${!Store.hasAPI ? `
           <button id="export-data-btn" class="btn btn-xs btn-ghost">&#8595; assessments</button>
           <button id="export-fw-btn"   class="btn btn-xs btn-ghost">&#8595; framework</button>
         ` : ""}
       </div>`
    : `<div class="control-group">
         <span class="folder-name muted">no folder open</span>
       </div>`;

  document.getElementById("header").innerHTML = `
    <div class="header-main">
      <div class="header-title"><h1>Engineering Ladder</h1></div>
      <div class="header-controls">

        ${folderHtml}

        <div class="header-divider"></div>

        <div class="control-group">
          <label>Direct report:</label>
          <select id="user-select">
            <option value="">— select or add —</option>
            ${userNames.map((n) =>
              `<option value="${esc(n)}" ${n === state.activeUser ? "selected" : ""}>${esc(n)}</option>`
            ).join("")}
          </select>
          <button id="add-user-btn" class="btn btn-sm btn-primary" title="Add new direct report">+</button>
          <button id="del-user-btn" class="btn btn-sm btn-danger" ${!state.activeUser ? "disabled" : ""} title="Remove direct report">&times;</button>
        </div>

        <div class="control-group">
          <label>Framework:</label>
          <div class="toggle-group">
            <button class="toggle-btn ${state.activeFramework === "default" ? "active" : ""}" data-fw="default">Default</button>
            <button class="toggle-btn ${state.activeFramework === "custom"  ? "active" : ""}" data-fw="custom">Custom</button>
          </div>
        </div>

      </div>
    </div>
  `;

  _bindHeaderEvents();
}

function _bindHeaderEvents() {
  document.getElementById("change-folder-btn")?.addEventListener("click", async () => {
    if (!confirm("Change folder? All changes are saved automatically.")) return;
    await Store.forgetFolder();
    renderWelcome();
  });

  document.getElementById("export-data-btn")?.addEventListener("click", () => Store.exportAssessments());
  document.getElementById("export-fw-btn")?.addEventListener("click",   () => Store.exportFramework());

  document.getElementById("user-select").addEventListener("change", (e) => {
    state.activeUser = e.target.value || null;
    saveMeta();
    render();
  });

  document.getElementById("add-user-btn").addEventListener("click", () => {
    const name = prompt("Name of direct report:")?.trim();
    if (!name) return;
    const users = getUsers();
    if (users[name]) { alert(`"${name}" already exists.`); return; }
    users[name] = {};
    Store.set("users", users);
    state.activeUser = name;
    saveMeta();
    render();
  });

  document.getElementById("del-user-btn").addEventListener("click", () => {
    if (!state.activeUser) return;
    if (!confirm(`Remove "${state.activeUser}" and all their data?`)) return;
    const users = getUsers();
    delete users[state.activeUser];
    Store.set("users", users);
    state.activeUser = null;
    saveMeta();
    render();
  });

  document.querySelectorAll(".toggle-btn[data-fw]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.activeFramework === btn.dataset.fw) return;
      state.activeFramework = btn.dataset.fw;
      state.selectedRoles   = [];
      saveMeta();
      render();
    });
  });
}
