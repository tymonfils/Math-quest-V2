// economy.js - Player Economy, Streaks & Avatar Wardrobe Data
const Economy = (function () {
  const GOLD_KEY = "mathquest_player_gold";
  const AVATAR_KEY = "mathquest_player_avatar";

  let gold = parseInt(localStorage.getItem(GOLD_KEY), 10) || 0;
  let streak = 0;

  const DEFAULT_AVATAR = {
    gender: "girl", // "girl" or "boy"
    skinTone: "#fcd34d",
    hairColor: "#78350f",
    ownedItems: ["outfit_space_blue"],
    equipped: {
      hat: null,
      glasses: null,
      outfit: "outfit_space_blue",
      pet: null
    }
  };

  function loadAvatar() {
    try {
      const saved = localStorage.getItem(AVATAR_KEY);
      if (!saved) return JSON.parse(JSON.stringify(DEFAULT_AVATAR));
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_AVATAR,
        ...parsed,
        ownedItems: Array.isArray(parsed.ownedItems)
          ? parsed.ownedItems
          : [...DEFAULT_AVATAR.ownedItems],
        equipped: { ...DEFAULT_AVATAR.equipped, ...(parsed.equipped || {}) }
      };
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_AVATAR));
    }
  }

  let avatar = loadAvatar();

  function saveGold() {
    localStorage.setItem(GOLD_KEY, gold);
  }

  function saveAvatar() {
    localStorage.setItem(AVATAR_KEY, JSON.stringify(avatar));
  }

  function notifyChange() {
    window.dispatchEvent(
      new CustomEvent("economy-updated", {
        detail: { gold, streak, avatar }
      })
    );
  }

  return {
    getGold: () => gold,
    getStreak: () => streak,
    getAvatar: () => avatar,

    awardCorrectAnswer: function () {
      const earned = Math.floor(Math.random() * 6) + 4;
      gold += earned;
      streak += 1;
      saveGold();
      notifyChange();
      return { earned, totalGold: gold, streak };
    },

    penalizeWrongAnswer: function () {
      const lost = Math.floor(Math.random() * 4) + 2;
      gold = Math.max(0, gold - lost);
      streak = 0;
      saveGold();
      notifyChange();
      return { lost, totalGold: gold, streak };
    },

    resetStreak: function () {
      streak = 0;
      notifyChange();
    },

    setGender: function (gender) {
      if (gender === "boy" || gender === "girl") {
        avatar.gender = gender;
        saveAvatar();
        notifyChange();
      }
    },

    setAppearance: function (skinTone, hairColor) {
      if (skinTone) avatar.skinTone = skinTone;
      if (hairColor) avatar.hairColor = hairColor;
      saveAvatar();
      notifyChange();
    },

    ownsItem: function (itemId) {
      return avatar.ownedItems.includes(itemId);
    },

    buyItem: function (itemId, cost) {
      if (avatar.ownedItems.includes(itemId)) {
        return { success: true, alreadyOwned: true };
      }
      if (gold < cost) {
        return { success: false, reason: "Not enough gold!" };
      }
      gold -= cost;
      avatar.ownedItems.push(itemId);
      saveGold();
      saveAvatar();
      notifyChange();
      return { success: true, gold };
    },

    equipItem: function (slot, itemId) {
      if (!avatar.equipped.hasOwnProperty(slot)) return;
      // Toggle off if already equipped (except outfit, keep a default)
      if (avatar.equipped[slot] === itemId && slot !== "outfit") {
        avatar.equipped[slot] = null;
      } else {
        avatar.equipped[slot] = itemId;
      }
      saveAvatar();
      notifyChange();
    }
  };
})();

window.Economy = Economy;
