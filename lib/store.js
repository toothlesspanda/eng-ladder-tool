/**
 * Store — persists data to two JSON files inside a folder the user picks once.
 *
 *   assessments.json   — who is being assessed and their scores
 *   framework.json     — the manager's custom framework definition
 *
 * The folder handle is remembered in IndexedDB so it reopens automatically.
 * Uses the File System Access API (Chrome / Edge).
 * Falls back to manual import/export for browsers without it (Firefox).
 *
 * ── assessments.json schema ───────────────────────────────────────────────────
 * {
 *   "version": 1,
 *   "activeUser":      string | null,
 *   "activeFramework": "default" | "custom",
 *   "users": {
 *     "[name]": { "default": number[], "custom": number[] }
 *   }
 * }
 *
 * ── framework.json schema ─────────────────────────────────────────────────────
 * {
 *   "version":    1,
 *   "name":       string,
 *   "categories": [{ "name": string, "levels": [{ "level": number, "name": string, "description": string }] }],
 *   "maxRank":    number,
 *   "roles":      [{ "label": string, "category": string, "rank": number[] }]
 * }
 */

const Store = (() => {

  const DATA_FILE = "assessments.json";
  const FW_FILE   = "framework.json";

  // ── IndexedDB — stores the directory handle between sessions ───────────────

  const IDB = {
    NAME:  "elg-handles",
    STORE: "handles",
    KEY:   "directory",

    open() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(this.NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(this.STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror   = () => reject(req.error);
      });
    },
    async get(key) {
      const db = await this.open();
      return new Promise((resolve) => {
        const req = db.transaction(this.STORE, "readonly").objectStore(this.STORE).get(key);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror   = () => resolve(null);
      });
    },
    async set(key, val) {
      const db = await this.open();
      return new Promise((resolve) => {
        const tx = db.transaction(this.STORE, "readwrite");
        tx.objectStore(this.STORE).put(val, key);
        tx.oncomplete = resolve;
      });
    },
    async del(key) {
      const db = await this.open();
      return new Promise((resolve) => {
        const tx = db.transaction(this.STORE, "readwrite");
        tx.objectStore(this.STORE).delete(key);
        tx.oncomplete = resolve;
      });
    },
  };

  // ── File helpers ───────────────────────────────────────────────────────────

  async function readJSON(handle) {
    const text = await (await handle.getFile()).text();
    if (!text.trim()) return null;
    return JSON.parse(text);
  }

  async function writeJSON(handle, data) {
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
  }

  // ── Default file contents ──────────────────────────────────────────────────

  function freshAssessments() {
    return {
      version:         1,
      activeUser:      null,
      activeFramework: "default",
      users:           {},
    };
  }

  function freshFramework() {
    return {
      version:    1,
      name:       "Custom Framework",
      categories: [],
      maxRank:    5,
      roles:      [],
    };
  }

  // ── Internal state ─────────────────────────────────────────────────────────

  let _dir       = null;
  let _dataH     = null;
  let _fwH       = null;
  let _data      = null;   // contents of assessments.json
  let _customFw  = null;   // contents of framework.json
  let _timer     = null;

  // ── Load both files from a directory handle ────────────────────────────────

  async function loadFromDir(dir) {
    _dataH    = await dir.getFileHandle(DATA_FILE, { create: true });
    _fwH      = await dir.getFileHandle(FW_FILE,   { create: true });
    _data     = (await readJSON(_dataH))  || freshAssessments();
    _customFw = (await readJSON(_fwH))    || freshFramework();

    // Safe defaults for missing keys (forward-compat with older files)
    if (_data.activeUser      === undefined) _data.activeUser      = null;
    if (!_data.activeFramework)              _data.activeFramework = "default";
    if (!_data.users)                        _data.users           = {};
    if (!_customFw.categories)               _customFw.categories  = [];
    if (!_customFw.roles)                    _customFw.roles       = [];
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    hasAPI: typeof window.showDirectoryPicker === "function",

    isReady()  { return _data !== null; },
    dirName()  { return _dir?.name ?? null; },

    /**
     * Called on startup — no user gesture available.
     * Only checks existing permission; never prompts.
     * Returns true | "needs-permission" | false.
     */
    async init() {
      if (!this.hasAPI) return false;

      _dir = await IDB.get(IDB.KEY);
      if (!_dir) return false;

      const perm = await _dir.queryPermission({ mode: "readwrite" });
      if (perm !== "granted") return "needs-permission";

      try { await loadFromDir(_dir); return true; }
      catch { _dir = null; return false; }
    },

    /**
     * Picks a folder and loads (or creates) both files.
     * Works for both first-time setup and re-opening an existing folder.
     * Must be called from a user gesture.
     */
    async pickFolder() {
      const dir = await window.showDirectoryPicker({ mode: "readwrite" });
      await loadFromDir(dir);
      _dir = dir;
      await IDB.set(IDB.KEY, dir);
    },

    /** Re-requests permission for the stored directory. Must be called from a click. */
    async resumeFolder() {
      if (!_dir) return false;
      const perm = await _dir.requestPermission({ mode: "readwrite" });
      if (perm !== "granted") { _dir = null; return false; }
      try { await loadFromDir(_dir); return true; }
      catch { _dir = null; return false; }
    },

    async forgetFolder() {
      await IDB.del(IDB.KEY);
      _dir = null; _data = null; _customFw = null; _dataH = null; _fwH = null;
    },

    // ── assessments.json accessors ───────────────────────────────────────────

    get(key, fallback = null)  { return _data?.[key] ?? fallback; },
    set(key, val)              { if (!_data) return; _data[key] = val; this._scheduleSave(); },

    // ── framework.json accessors ─────────────────────────────────────────────

    getCustomFw()    { return _customFw; },
    setCustomFw(fw)  { _customFw = fw; this._scheduleSave(); },

    // ── No-API fallbacks ─────────────────────────────────────────────────────

    async importAssessments(file) {
      _data = JSON.parse(await file.text());
      if (!_data.activeFramework) _data.activeFramework = "default";
      if (!_data.users)           _data.users = {};
    },

    async importFramework(file) {
      _customFw = JSON.parse(await file.text());
    },

    exportAssessments() { _download(_data,     DATA_FILE); },
    exportFramework()   { _download(_customFw, FW_FILE);   },

    // ── Internals ────────────────────────────────────────────────────────────

    _scheduleSave() {
      clearTimeout(_timer);
      _timer = setTimeout(() => this._save(), 400);
    },

    async _save() {
      if (_dataH && _data)     await writeJSON(_dataH, _data);
      if (_fwH   && _customFw) await writeJSON(_fwH,   _customFw);
    },
  };

  function _download(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), { href: url, download: filename }).click();
    URL.revokeObjectURL(url);
  }

})();
