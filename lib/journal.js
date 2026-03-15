/**
 * Journal — per-user progress notes stored in assessments.json.
 *
 * Schema (inside each user object):
 *   "journal": [{ "date": "YYYY-MM-DD", "text": "..." }, ...]
 *
 * Entries are kept sorted newest-first.
 */

/** Returns the journal entries for the active user (newest first). */
function getJournal() {
  if (!state.activeUser) return [];
  const user = getUsers()[state.activeUser] || {};
  return Array.isArray(user.journal) ? user.journal : [];
}

/**
 * Saves or updates a journal entry for the active user on the given date.
 * If an entry already exists for that date it is overwritten.
 */
function saveJournalEntry(date, text) {
  if (!state.activeUser) return;

  const users = getUsers();
  if (!users[state.activeUser]) users[state.activeUser] = {};

  const journal = Array.isArray(users[state.activeUser].journal)
    ? users[state.activeUser].journal
    : [];

  const idx = journal.findIndex((e) => e.date === date);
  if (idx >= 0) {
    journal[idx] = { date, text };
  } else {
    journal.unshift({ date, text });
    journal.sort((a, b) => b.date.localeCompare(a.date));
  }

  users[state.activeUser].journal = journal;
  Store.set("users", users);
}
