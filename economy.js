// economy.js - Master Economy, 45-Item Catalog, Boy/Girl Avatar & 3 Parent Reward Slots
const Economy = (function () {
  const GOLD_KEY = "mathquest_player_gold";
  const AVATAR_KEY = "mathquest_player_avatar_v2";
  const REWARDS_KEY = "mathquest_parent_rewards_v1";
  const PIN_KEY = "mathquest_parent_pin";

  let gold = parseInt(localStorage.getItem(GOLD_KEY), 10) || 0;
  let streak = 0;
  let parentPin = localStorage.getItem(PIN_KEY) || "1234";

  // Default 3 Parent Reward Slots (Parents can customize title, cost, and icon!)
  const DEFAULT_PARENT_REWARDS = [
    { id: "reward_1", slot: 1, title: "Ice Cream Treat", icon: "🍦", cost: 250, claimed: false },
    { id: "reward_2", slot: 2, title: "30m Extra Screen Time", icon: "🎮", cost: 500, claimed: false },
    { id: "reward_3", slot: 3, title: "Special Toy / Surprise", icon: "🎁", cost: 1000, claimed: false }
  ];

  // Complete 45-Item Master Catalog (9 Outfits + 9 Hairs per gender + 9 Shared Pets)
  const CATALOG = {
    outfits: {
      girl: [
        { id: "g_out_1", name: "Starlight Tee", tier: "basic", cost: 0, primary: "#ec4899", accent: "#f472b6", badge: "⭐" },
        { id: "g_out_2", name: "Candy Hoodie", tier: "basic", cost: 30, primary: "#a855f7", accent: "#fde08a", badge: "🍭" },
        { id: "g_out_3", name: "Explorer Overalls", tier: "basic", cost: 50, primary: "#14b8a6", accent: "#fef08a", badge: "🧭" },
        { id: "g_out_4", name: "Astro-Valkyrie", tier: "mid", cost: 120, primary: "#0284c7", accent: "#38bdf8", badge: "🚀" },
        { id: "g_out_5", name: "Crystal Ballgown", tier: "mid", cost: 180, primary: "#c084fc", accent: "#e879f9", badge: "💎" },
        { id: "g_out_6", name: "Cyber-Ninja Suit", tier: "mid", cost: 250, primary: "#1e293b", accent: "#22d3ee", badge: "⚡" },
        { id: "g_out_7", name: "Solar Empress", tier: "insane", cost: 500, primary: "#ea580c", accent: "#fde047", badge: "☀️", fx: "solar" },
        { id: "g_out_8", name: "Starlight Seraph", tier: "insane", cost: 750, primary: "#6366f1", accent: "#bae6fd", badge: "🪽", fx: "wings" },
        { id: "g_out_9", name: "Cosmic Nova Queen", tier: "insane", cost: 1000, primary: "#7e22ce", accent: "#f472b6", badge: "🌌", fx: "cosmic" }
      ],
      boy: [
        { id: "b_out_1", name: "Cadet Crew Tee", tier: "basic", cost: 0, primary: "#0284c7", accent: "#38bdf8", badge: "⚓" },
        { id: "b_out_2", name: "Velocity Jacket", tier: "basic", cost: 30, primary: "#dc2626", accent: "#facc15", badge: "🏎️" },
        { id: "b_out_3", name: "Jungle Ranger", tier: "basic", cost: 50, primary: "#15803d", accent: "#a3e635", badge: "🦖" },
        { id: "b_out_4", name: "Orbital Armor", tier: "mid", cost: 120, primary: "#334155", accent: "#38bdf8", badge: "🛡️" },
        { id: "b_out_5", name: "Dino-Hunter Gear", tier: "mid", cost: 180, primary: "#92400e", accent: "#fbbf24", badge: "🦴" },
        { id: "b_out_6", name: "Shadow Shinobi", tier: "mid", cost: 250, primary: "#0f172a", accent: "#ef4444", badge: "🥷" },
        { id: "b_out_7", name: "Plasma Mecha-Knight", tier: "insane", cost: 500, primary: "#1d4ed8", accent: "#67e8f9", badge: "🤖", fx: "solar" },
        { id: "b_out_8", name: "Void Dragon Lord", tier: "insane", cost: 750, primary: "#4c1d95", accent: "#c084fc", badge: "🐉", fx: "wings" },
        { id: "b_out_9", name: "Hyper-Nova Emperor", tier: "insane", cost: 1000, primary: "#b45309", accent: "#fef08a", badge: "👑", fx: "cosmic" }
      ]
    },
    hairs: {
      girl: [
        { id: "g_hair_1", name: "Classic Pigtails", tier: "basic", cost: 0, style: "pigtails" },
        { id: "g_hair_2", name: "High Pony Bounce", tier: "basic", cost: 30, style: "ponytail" },
        { id: "g_hair_3", name: "Wavy Bob Cut", tier: "basic", cost: 50, style: "bob" },
        { id: "g_hair_4", name: "Double Space Buns", tier: "mid", cost: 120, style: "buns" },
        { id: "g_hair_5", name: "Royal Braided Crown", tier: "mid", cost: 180, style: "braids" },
        { id: "g_hair_6", name: "Twin Drill Curls", tier: "mid", cost: 250, style: "drills" },
        { id: "g_hair_7", name: "Zero-G Starlight", tier: "insane", cost: 500, style: "starlight", fx: "sparkle" },
        { id: "g_hair_8", name: "Phoenix Flame Locks", tier: "insane", cost: 750, style: "flame", fx: "fire" },
        { id: "g_hair_9", name: "Prism Halo Tresses", tier: "insane", cost: 1000, style: "prism", fx: "rainbow" }
      ],
      boy: [
        { id: "b_hair_1", name: "Classic Side-Sweep", tier: "basic", cost: 0, style: "sweep" },
        { id: "b_hair_2", name: "Spiky Maverick", tier: "basic", cost: 30, style: "spiky" },
        { id: "b_hair_3", name: "Skater Shag", tier: "basic", cost: 50, style: "shag" },
        { id: "b_hair_4", name: "Cyber Mohawk", tier: "mid", cost: 120, style: "mohawk" },
        { id: "b_hair_5", name: "Samurai Top-Knot", tier: "mid", cost: 180, style: "topknot" },
        { id: "b_hair_6", name: "Anime Hero Spikes", tier: "mid", cost: 250, style: "anime" },
        { id: "b_hair_7", name: "Plasma Volt Spikes", tier: "insane", cost: 500, style: "plasma", fx: "sparkle" },
        { id: "b_hair_8", name: "Solar Flare Mane", tier: "insane", cost: 750, style: "solar", fx: "fire" },
        { id: "b_hair_9", name: "Cosmic Void Hair", tier: "insane", cost: 1000, style: "cosmic", fx: "rainbow" }
      ]
    },
    pets: [
      { id: "pet_1", name: "Astro-Pup", tier: "basic", cost: 30, icon: "🐶", color: "#fbbf24" },
      { id: "pet_2", name: "Star-Cat", tier: "basic", cost: 50, icon: "🐱", color: "#f472b6" },
      { id: "pet_3", name: "Lunar Bunny", tier: "basic", cost: 75, icon: "🐰", color: "#e2e8f0" },
      { id: "pet_4", name: "Mini T-Rex", tier: "mid", cost: 150, icon: "🦖", color: "#4ade80" },
      { id: "pet_5", name: "Holo-Drone", tier: "mid", cost: 200, icon: "🛸", color: "#38bdf8" },
      { id: "pet_6", name: "Baby Pegasus", tier: "mid", cost: 275, icon: "🦄", color: "#c084fc" },
      { id: "pet_7", name: "Celestial Dragon", tier: "insane", cost: 550, icon: "🐉", color: "#22d3ee", fx: "dragon" },
      { id: "pet_8", name: "Solar Phoenix", tier: "insane", cost: 800, icon: "🦅", color: "#fb923c", fx: "phoenix" },
      { id: "pet_9", name: "Galaxy Kitsune", tier: "insane", cost: 1000, icon: "🦊", color: "#e879f9", fx: "kitsune" }
    ]
  };

  const DEFAULT_AVATAR = {
    gender: "girl",
    skinTone: "#fcd34d",
    hairColor: "#78350f",
    ownedItems: ["g_out_1", "b_out_1", "g_hair_1", "b_hair_1"],
    equipped: {
      girl: { outfit: "g_out_1", hair: "g_hair_1" },
      boy: { outfit: "b_out_1", hair: "b_hair_1" },
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
          ? Array.from(new Set([...DEFAULT_AVATAR.ownedItems, ...parsed.ownedItems]))
          : [...DEFAULT_AVATAR.ownedItems],
        equipped: {
          girl: { ...DEFAULT_AVATAR.equipped.girl, ...(parsed.equipped && parsed.equipped.girl ? parsed.equipped.girl : {}) },
          boy: { ...DEFAULT_AVATAR.equipped.boy, ...(parsed.equipped && parsed.equipped.boy ? parsed.equipped.boy : {}) },
          pet: parsed.equipped && parsed.equipped.pet ? parsed.equipped.pet : null
        }
      };
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_AVATAR));
    }
  }

  function loadParentRewards() {
    try {
      const saved = localStorage.getItem(REWARDS_KEY);
      if (!saved) return JSON.parse(JSON.stringify(DEFAULT_PARENT_REWARDS));
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length !== 3) {
        return JSON.parse(JSON.stringify(DEFAULT_PARENT_REWARDS));
      }
      return parsed;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_PARENT_REWARDS));
    }
  }

  let avatar = loadAvatar();
  let parentRewards = loadParentRewards();

  function saveGold() {
    localStorage.setItem(GOLD_KEY, gold);
  }

  function saveAvatar() {
    localStorage.setItem(AVATAR_KEY, JSON.stringify(avatar));
  }

  function saveParentRewards() {
    localStorage.setItem(REWARDS_KEY, JSON.stringify(parentRewards));
  }

  function notifyChange() {
    window.dispatchEvent(
      new CustomEvent("economy-updated", {
        detail: { gold, streak, avatar, parentRewards }
      })
    );
  }

  function findItemById(itemId) {
    const all = [
      ...CATALOG.outfits.girl,
      ...CATALOG.outfits.boy,
      ...CATALOG.hairs.girl,
      ...CATALOG.hairs.boy,
      ...CATALOG.pets
    ];
    return all.find((i) => i.id === itemId) || null;
  }

  return {
    getGold: () => gold,
    getStreak: () => streak,
    getAvatar: () => avatar,
    getCatalog: () => CATALOG,
    getItemById: findItemById,
    getParentRewards: () => parentRewards,

    verifyPin: (inputPin) => String(inputPin).trim() === String(parentPin).trim(),
    setPin: function (newPin) {
      if (newPin && String(newPin).trim().length >= 4) {
        parentPin = String(newPin).trim();
        localStorage.setItem(PIN_KEY, parentPin);
        return true;
      }
      return false;
    },

    updateParentRewardSlot: function (slotIndex, { title, icon, cost, claimed }) {
      if (slotIndex < 0 || slotIndex > 2) return false;
      const target = parentRewards[slotIndex];
      if (title !== undefined) target.title = title.trim() || "Custom Reward";
      if (icon !== undefined) target.icon = icon;
      if (cost !== undefined) target.cost = Math.max(1, parseInt(cost, 10) || 100);
      if (claimed !== undefined) target.claimed = Boolean(claimed);
      saveParentRewards();
      notifyChange();
      return true;
    },

    claimParentReward: function (slotIndex) {
      if (slotIndex < 0 || slotIndex > 2) return { success: false, reason: "Invalid slot" };
      const reward = parentRewards[slotIndex];
      if (reward.claimed) {
        return { success: false, reason: "Already claimed! Ask a parent to reset." };
      }
      if (gold < reward.cost) {
        return { success: false, reason: "Need " + (reward.cost - gold) + " more gold!" };
      }
      gold -= reward.cost;
      reward.claimed = true;
      saveGold();
      saveParentRewards();
      notifyChange();
      return { success: true, reward, gold };
    },

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

    buyItem: function (itemId) {
      const item = findItemById(itemId);
      if (!item) return { success: false, reason: "Item not found" };
      if (avatar.ownedItems.includes(itemId)) {
        return { success: true, alreadyOwned: true };
      }
      if (gold < item.cost) {
        return { success: false, reason: "Need " + (item.cost - gold) + " more gold!" };
      }
      gold -= item.cost;
      avatar.ownedItems.push(itemId);
      saveGold();
      saveAvatar();
      notifyChange();
      return { success: true, gold };
    },

    equipItem: function (category, itemId) {
      if (!avatar.ownedItems.includes(itemId) && itemId !== null) return false;
      const g = avatar.gender;
      if (category === "outfits") {
        avatar.equipped[g].outfit = itemId;
      } else if (category === "hairs") {
        avatar.equipped[g].hair = itemId;
      } else if (category === "pets") {
        avatar.equipped.pet = avatar.equipped.pet === itemId ? null : itemId;
      }
      saveAvatar();
      notifyChange();
      return true;
    }
  };
})();

window.Economy = Economy;
