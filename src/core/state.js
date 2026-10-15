const STORAGE_KEY = "MATH_QUEST_SAVE";

const DEFAULT_STATE = {
  gold: 0,
  currentZone: "spaceschool",
  math: {
    grade: "2",
    topic: "mixed", // "mixed" = 50/50 split! Can also be "addition", "subtraction", "multiplication", "division"
    regrouping: true,
    streak: 0
  },
  parent: {
    pin: "1234",
    pinSet: false
  }
};

class GameState {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return JSON.parse(JSON.stringify(DEFAULT_STATE));
      
      const parsed = JSON.parse(saved);
      // Merge with defaults in case new settings were added
      const merged = {
        ...DEFAULT_STATE,
        ...parsed,
        math: { ...DEFAULT_STATE.math, ...(parsed.math || {}) }
      };

      // Upgrade old hardcoded "subtraction" save from earlier to "mixed" 50/50 split
      if (!localStorage.getItem("MATH_QUEST_MIXED_MIGRATED")) {
        merged.math.topic = "mixed";
        localStorage.setItem("MATH_QUEST_MIXED_MIGRATED", "true");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }

      return merged;
    } catch (e) {
      console.error("Failed to load save data, using defaults:", e);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save game state:", e);
    }
  }

  setGrade(gradeStr) {
    this.data.math.grade = String(gradeStr);
    this.save();
    window.dispatchEvent(new CustomEvent("math-settings-changed", { detail: this.data.math }));
  }

  setTopic(topicStr) {
    this.data.math.topic = topicStr;
    this.save();
    window.dispatchEvent(new CustomEvent("math-settings-changed", { detail: this.data.math }));
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  }
}

export const gameState = new GameState();
window.GameState = gameState;
