/**
 * main.js — application entry point.
 *
 * Responsibilities:
 *  - Boot: initialise the Store, then hand off to the welcome screen or the app.
 *  - render / renderApp: top-level orchestration that calls each UI module.
 *
 * All domain logic lives in data/, chart/, and ui/.
 */

// ── Top-level render ──────────────────────────────────────────────────────────

function render() {
  renderHeader()
  renderRoleSelector()
  renderAssessment()
  renderLevelsTable()
  updateChart()
  renderJournal()
}

/**
 * (Re)builds the main layout and renders all panels.
 * Called after a file is opened/created and whenever the layout needs resetting.
 */
function renderApp() {
  document.getElementById("main").innerHTML = `
    <div id="app-grid">
      <div id="chart-panel"><canvas id="chart"></canvas></div>
      <div id="side-panel">
        <section id="role-selector-section"></section>
        <div id="levels-table-section"></div>
      </div>
    </div>
    <div id="bottom-row">
      <section id="journal-section"></section>
      <section id="assessment-section"></section>
    </div>
  `
  render()
}

// ── Boot ──────────────────────────────────────────────────────────────────────

;(async function init() {
  const result = await Store.init()

  if (result === true) {
    loadMeta()
    // Guard: persisted active user may no longer exist in the file
    if (state.activeUser && !getUsers()[state.activeUser]) {
      state.activeUser = null
      saveMeta()
    }
    renderApp()
  } else {
    // result === "needs-permission" → show Resume button (needs user click)
    // result === false              → show Pick folder button
    renderWelcome(result === "needs-permission")
  }
})()
