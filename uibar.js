// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    const initialGold = window.Economy ? window.Economy.getGold() : 0;

    uiLayer.innerHTML = `
    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px; box-sizing: border-box; pointer-events: none;">
        
        <!-- LEFT SIDE: Map & Gold -->
        <div style="display: flex; gap: 15px; align-items: center;">
          <button id="ui-map-btn" style="pointer-events: auto; padding: 10px 20px; background: #1e293b; color: #f8fafc; border: none; border-radius: 8px; font-weight: 800; font-family: 'Nunito', sans-serif; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            🗺️ Fast Travel
          </button>
          
          <div style="pointer-events: auto; padding: 10px 20px; background: rgba(15, 23, 42, 0.9); border: 1px solid #fbbf24; border-radius: 8px; color: #fbbf24; font-weight: 800; font-family: 'Nunito', sans-serif; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            🪙 <span id="ui-gold-display">$<initialGold></span>
          </div>
        </div>

        <!-- RIGHT SIDE: Settings -->
        <button id="ui-settings-btn" style="pointer-events: auto; padding: 10px 16px; background: #1e293b; color: #f8fafc; border: none; border-radius: 8px; font-weight: 800; font-size: 1.2rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
          ⚙️
        </button>

      </div>
      `;

    // Attach Event Listeners
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
