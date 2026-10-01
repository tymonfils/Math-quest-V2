// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    const initialGold = window.Economy ? window.Economy.getGold() : 0;

    // Sleek, high-end UI styling for buttons
    const btnStyle = "background: #1e293b; border: 2px solid #334155; border-radius: 12px; padding: 10px 18px; font-size: 1rem; font-weight: 800; color: #f8fafc; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-family: 'Nunito', sans-serif;";
    
    // Custom glowing styling for the gold display
    const goldStyle = "background: rgba(15, 23, 42, 0.9); border: 2px solid #fbbf24; border-radius: 12px; padding: 10px 18px; font-size: 1rem; font-weight: 800; color: #fbbf24; box-shadow: 0 4px 12px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 8px; font-family: 'Nunito', sans-serif;";

    uiLayer.innerHTML = `
🗺️ Map

🪙 ${initialGold}

⚙

`;

// Reattach Event Listeners
const mapBtn = document.getElementById("ui-map-btn");
if (mapBtn) {
  mapBtn.addEventListener("click", () => window.dispatchEvent(new CustomEvent("ui-map-clicked")));
}

const settingsBtn = document.getElementById("ui-settings-btn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", () => window.dispatchEvent(new CustomEvent("ui-settings-clicked")));
}
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", renderUIBar);
} else {
renderUIBar();
}
})();
