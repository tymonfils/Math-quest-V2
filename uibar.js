// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    // Fetch initial values from Economy module if available
    const initialGold = window.Economy ? window.Economy.getGold() : 0;
    const initialStreak = window.Economy ? window.Economy.getStreak() : 0;

    uiLayer.innerHTML = `
🗺️ Map

🪙 Gold:
${initialGold}

🔥 Streak:
${initialStreak}

⚙️️ Settings

`;

// 1. Dispatch Events on click
const mapBtn = document.getElementById("ui-map-btn");
if (mapBtn) {
  mapBtn.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("ui-map-clicked"));
  });
}

const settingsBtn = document.getElementById("ui-settings-btn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("ui-settings-clicked"));
  });
}

// 2. Listen for Economy updates to keep stats live
window.addEventListener("economy-updated", (e) => {
  const goldSpan = document.getElementById("ui-gold-display");
  const streakSpan = document.getElementById("ui-streak-display");

  if (goldSpan && e.detail && e.detail.gold !== undefined) {
    goldSpan.textContent = e.detail.gold;
  }
  if (streakSpan && e.detail && e.detail.streak !== undefined) {
    streakSpan.textContent = e.detail.streak;
  }
});
}

// Mount when DOM is ready
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", renderUIBar);
} else {
renderUIBar();
}
})();
