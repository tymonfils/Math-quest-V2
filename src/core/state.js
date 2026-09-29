const STORAGE_KEY = "MATH_QUEST_SAVE";

const DEFAULT_STATE = {
  gold: 0,
  currentZone: "spaceschool",
  math: {
    grade: "2",
    topic: "subtraction",
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
      return saved ? JSON.parse(saved) : { ...DEFAULT_STATE };
    } catch (e) {
      console.error("Failed to load save data, using defaults:", e);
      return { ...DEFAULT_STATE };
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save game state:", e);
    }
  }

  reset() {
    this.data = { ...DEFAULT_STATE };
    this.save();
  }
}

export const gameState = new GameState();
