// economy.js - Pure Player Economy & Streaks Data
const Economy = (function () {
const STORAGE_KEY = "mathquest_player_gold";

let gold = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
let streak = 0;

function save() {
localStorage.setItem(STORAGE_KEY, gold);
}

function notifyChange() {
window.dispatchEvent(new CustomEvent("economy-updated", {
detail: { gold, streak }
}));
}

return {
getGold: () => gold,
getStreak: () => streak,

awardCorrectAnswer: function () {
  const earned = Math.floor(Math.random() * 6) + 4;
  gold += earned;
  streak += 1;
  save();
  notifyChange();
  return { earned, totalGold: gold, streak };
},

penalizeWrongAnswer: function () {
  const lost = Math.floor(Math.random() * 4) + 2;
  gold = Math.max(0, gold - lost);
  streak = 0;
  save();
  notifyChange();
  return { lost, totalGold: gold, streak };
},

resetStreak: function () {
  streak = 0;
  notifyChange();
}
};
})();

window.Economy = Economy;
