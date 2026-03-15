/**
 * Application state and data-access helpers.
 *
 * `state` is the in-memory UI state, synced to/from assessments.json via Store.
 * `state.activeFramework` values: "default" | "custom"
 */

const state = {
  activeFramework: "default",
  activeUser:      null,
  selectedRoles:   [],
};

// ── Sync with assessments.json ────────────────────────────────────────────────

function loadMeta() {
  const fw = Store.get("activeFramework", "default");
  state.activeFramework = fw === "custom" ? "custom" : "default";
  state.activeUser      = Store.get("activeUser", null);
}

function saveMeta() {
  Store.set("activeFramework", state.activeFramework);
  Store.set("activeUser",      state.activeUser);
}

// ── Framework accessor ────────────────────────────────────────────────────────

function getFramework() {
  return state.activeFramework === "custom" ? Store.getCustomFw() : DEFAULT_FRAMEWORK;
}

/** True when the active framework has at least one category defined. */
function frameworkIsConfigured() {
  const fw = getFramework();
  return Array.isArray(fw?.categories) && fw.categories.length > 0;
}

// ── User / assessment accessors ───────────────────────────────────────────────

function getUsers() {
  return Store.get("users", {});
}

/**
 * Returns a copy of the active user's assessment for the current framework.
 * Falls back to an all-zero array if nothing is saved yet.
 */
function getUserAssessment(fw) {
  if (!state.activeUser) return null;

  const user   = getUsers()[state.activeUser] || {};
  const stored = user[state.activeFramework];

  if (Array.isArray(stored) && stored.length === fw.categories.length) {
    return [...stored];
  }
  return new Array(fw.categories.length).fill(0);
}

function saveUserAssessment(assessment) {
  if (!state.activeUser) return;

  const users = getUsers();
  if (!users[state.activeUser]) users[state.activeUser] = {};
  users[state.activeUser][state.activeFramework] = assessment;
  Store.set("users", users);
}
