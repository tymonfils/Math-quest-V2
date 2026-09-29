// uibar.js - Global Top Navigation Bar (HUD)
const UIBar = (function () {
  function init() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer || document.getElementById("global-ui-bar")) return;

    const bar = document.createElement("header");
    bar.id = "global-ui-bar";
    bar.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      pointer-events: none;
      user-select: none;
    `;

    // LEFT: Player Stats (Gold & Streak)
    const leftCluster = document.createElement("div");
    leftCluster.style.cssText = "display: flex; align-items: center; gap: 12px; pointer-events: auto;";
    leftCluster.innerHTML = `
🪙
0

🔥
0

`;

// RIGHT: Controls (Map & Settings Buttons)
const rightCluster = document.createElement("div");
rightCluster.style.cssText = "display: flex; align-items: center; gap: 10px; pointer-events: auto;";
rightCluster.innerHTML = `
  
    🗺️ Map
  
  
    ⚙️
  
`;

bar.appendChild(leftCluster);
bar.appendChild(rightCluster);
uiLayer.appendChild(bar);

// Initial value populate if Economy is available
if (window.Economy) {
  updateValues(window.Economy.getGold(), window.Economy.getStreak());
}

// Button event dispatches so other modules can handle them independently
document.getElementById("ui-btn-map")?.addEventListener("click", () => {
  window.dispatchEvent(new CustomEvent("ui-map-clicked"));
});

document.getElementById("ui-btn-settings")?.addEventListener("click", () => {
  window.dispatchEvent(new CustomEvent("ui-settings-clicked"));
});
}

function updateValues(gold, streak) {
const goldText = document.getElementById("ui-gold-val");
const streakText = document.getElementById("ui-streak-val");
const goldPill = document.getElementById("ui-gold-pill");

if (goldText) goldText.textContent = gold;
if (streakText) streakText.textContent = streak;

// Small pop feedback
if (goldPill) {
  goldPill.style.transform = "scale(1.15)";
  setTimeout(() => {
    goldPill.style.transform = "scale(1)";
  }, 150);
}
}

// Decoupled listener: reacts to economy notifications without touching economy code
window.addEventListener("economy-updated", (event) => {
const { gold, streak } = event.detail;
updateValues(gold, streak);
});

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}

return {
update: updateValues
};
})();
