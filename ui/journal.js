/**
 * Journal — progress notes for the active user.
 *
 * Layout:
 *   - Dropdown to browse past entries (read-only when a past date is selected)
 *   - Textarea for writing/viewing the note
 *   - Save button (only active in new-entry mode, i.e. today's date)
 *
 * Notes are stored per-user in assessments.json via data/journal.js helpers.
 */

function renderJournal() {
  const el = document.getElementById("journal-section")
  if (!el) return

  if (!state.activeUser) {
    el.innerHTML = `
      <h3>Progress Notes</h3>
      <p class="hint">Select a direct report above to view or add progress notes.</p>
    `
    return
  }

  const journal = getJournal()
  const today = _today()
  const todayEntry = journal.find((e) => e.date === today)

  el.innerHTML = `
    <h3>Progress Notes &mdash; <em>${esc(state.activeUser)}</em></h3>
    <div class="journal-controls">
      <select id="journal-history-select" class="journal-history-select">
        <option value="">New entry &mdash; ${today}</option>
        ${journal.map((e) => `<option value="${esc(e.date)}">${esc(e.date)}</option>`).join("")}
      </select>
    </div>
    <div class="journal-entry">
      <textarea
        id="journal-textarea"
        class="journal-textarea"
        rows=7
        placeholder="Add a progress note for today..."
      >${todayEntry ? esc(todayEntry.text) : ""}</textarea>
      <div class="journal-footer">
        <button id="journal-save-btn" class="btn btn-primary btn-sm">Save note</button>
        <span id="journal-status" class="journal-status"></span>
      </div>
    </div>
  `

  const historySelect = el.querySelector("#journal-history-select")
  const textarea = el.querySelector("#journal-textarea")
  const saveBtn = el.querySelector("#journal-save-btn")
  const statusEl = el.querySelector("#journal-status")

  historySelect.addEventListener("change", () => {
    const selectedDate = historySelect.value

    if (!selectedDate) {
      // New-entry mode
      textarea.disabled = false
      textarea.value = todayEntry ? todayEntry.text : ""
      saveBtn.disabled = false
      statusEl.textContent = ""
    } else {
      // Read-only past entry
      const entry = journal.find((e) => e.date === selectedDate)
      textarea.disabled = true
      textarea.value = entry ? entry.text : ""
      saveBtn.disabled = true
      statusEl.textContent = ""
    }
  })

  saveBtn.addEventListener("click", () => {
    const text = textarea.value.trim()
    if (!text) return
    saveJournalEntry(today, text)
    statusEl.textContent = "Saved."
    setTimeout(() => {
      statusEl.textContent = ""
    }, 2000)
    // Refresh the dropdown so the saved entry appears
    renderJournal()
  })
}

function _today() {
  return new Date().toISOString().split("T")[0]
}
