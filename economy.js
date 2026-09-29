// economy.js - Handles Gold & Streak State
const Economy = (function () {
  const STORAGE_KEY = "mathquest_player_gold";

  // Load existing gold from browser memory, or start at 0
  let gold = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  let streak = 0;

  function save() {
    localStorage.setItem(STORAGE_KEY, gold);
  }

  return {
    getGold: () => gold,
    getStreak: () => streak,

    // +4 to +9 gold, increases streak
    awardCorrectAnswer: function () {
      const earned = Math.floor(Math.random() * 6) + 4;
      gold += earned;
      streak += 1;
      save();
      return { earned, totalGold: gold, streak };
    },

    // -2 to -5 gold, resets streak, cannot go below 0
    penalizeWrongAnswer: function () {
      const lost = Math.floor(Math.random() * 4) + 2;
      gold = Math.max(0, gold - lost);
      streak = 0;
      save();
      return { lost, totalGold: gold, streak };
    },

    resetStreak: function () {
      streak = 0;
    }
  };
})();
