// uibar.js - Global Top Navigation Bar with Live Mini-Avatar, Streak & Shop Button
(function () {
  function openShopTrigger() {
    if (window.ShopModal && typeof window.ShopModal.open === "function") {
      window.ShopModal.open();
    } else {
      window.dispatchEvent(new CustomEvent("ui-shop-clicked"));
    }
  }

  function refreshMiniAvatar() {
    const badge = document.getElementById("ui-mini-avatar");
    if (!badge) return;
    if (window.AvatarRenderer && window.Economy) {
      const av = window.Economy.getAvatar();
      badge.innerHTML = window.AvatarRenderer.renderSVG(av, 44, 50, false);
    } else {
      badge.textContent = "👩‍🚀";
    }
  }

  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    const initialGold = window.Economy ? window.Economy.getGold() : 0;
    const initialStreak = window.Economy ? window.Economy.getStreak() : 0;

    uiLayer.innerHTML = `
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; box-sizing: border-box; pointer-events: none; flex-wrap: wrap; gap: 10px;">
        
        <!-- LEFT SIDE: Mini-Avatar, Map, Gold & Streak -->
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          
          <!-- Live Mini Avatar Badge (Clicks open Wardrobe/Shop) -->
          <div id="ui-avatar-btn" title="Open Wardrobe & Shop" style="pointer-events: auto; width: 44px; height: 44px; border-radius: 50%; background: radial-gradient(circle at 50% 40%, #1e293b, #0f172a); border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5); flex-shrink: 0;">
            <div id="ui-mini-avatar" style="transform: translateY(6px); display: flex; align-items: center; justify-content: center;"></div>
          </div>

          <!-- Fast Travel Button -->
          <button id="ui-map-btn" style="pointer-events: auto; padding: 10px 18px; background: #1e293b; color: #f8fafc; border: 1px solid #334155; border-radius: 10px; font-weight: 800; font-family: 'Nunito', sans-serif; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            🗺️ Fast Travel
          </button>
          
          <!-- Gold Counter (Also clickable to open Shop) -->
          <div id="ui-gold-pill" title="Open Galactic Shop" style="pointer-events: auto; padding: 9px 16px; background: rgba(15, 23, 42, 0.92); border: 1.5px solid #fbbf24; border-radius: 10px; color: #fbbf24; font-weight: 900; font-family: 'Nunito', sans-serif; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 6px;">
            🪙 <span id="ui-gold-display">${initialGold}</span>
          </div>

          <!-- Live Streak Counter -->
          <div id="ui-streak-pill" title="Current Answer Streak" style="pointer-events: auto; padding: 9px 14px; background: rgba(15, 23, 42, 0.92); border: 1.5px solid ${initialStreak > 0 ? '#f97316' : '#334155'}; border-radius: 10px; color: ${initialStreak > 0 ? '#fb923c' : '#94a3b8'}; font-weight: 900; font-family: 'Nunito', sans-serif; font-size: 0.95rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 5px; transition: all 0.2s;">
            🔥 <span id="ui-streak-display">${initialStreak}</span>
          </div>

        </div>

        <!-- RIGHT SIDE: Shop & Settings -->
        <div style="display: flex; gap: 10px; align-items: center;">
          <button id="ui-shop-btn" style="pointer-events: auto; padding: 10px 18px; background: linear-gradient(135deg, #f59e0b, #fbbf24); color: #0f172a; border: none; border-radius: 10px; font-weight: 900; font-family: 'Nunito', sans-serif; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 12px rgba(251, 191, 36, 0.35);">
            🛒 Shop
          </button>

          <button id="ui-settings-btn" title="Control Deck & Settings" style="pointer-events: auto; padding: 9px 14px; background: #1e293b; color: #f8fafc; border: 1px solid #334155; border-radius: 10px; font-weight: 800; font-size: 1.15rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            ⚙️
          </button>
        </div>

      </div>
    `;

    // Attach Button Listeners
    const mapBtn = document.getElementById("ui-map-btn");
    if (mapBtn) {
      mapBtn.addEventListener("click", () => window.dispatchEvent(new CustomEvent("ui-map-clicked")));
    }

    const shopBtn = document.getElementById("ui-shop-btn");
    if (shopBtn) shopBtn.addEventListener("click", openShopTrigger);

    const avatarBtn = document.getElementById("ui-avatar-btn");
    if (avatarBtn) avatarBtn.addEventListener("click", openShopTrigger);

    const goldPill = document.getElementById("ui-gold-pill");
    if (goldPill) goldPill.addEventListener("click", openShopTrigger);

    const settingsBtn = document.getElementById("ui-settings-btn");
    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => window.dispatchEvent(new CustomEvent("ui-settings-clicked")));
    }

    refreshMiniAvatar();
    // Retry once after 600ms in case avatar.js finished loading via main.js right after uibar.js
    setTimeout(refreshMiniAvatar, 600);
  }

  // Listen for Gold, Streak, and Avatar updates from economy.js
  window.addEventListener("economy-updated", (e) => {
    const detail = e.detail || {};
    const goldEl = document.getElementById("ui-gold-display");
    if (goldEl && typeof detail.gold === "number") {
      goldEl.textContent = detail.gold;
    }

    const streakEl = document.getElementById("ui-streak-display");
    const streakPill = document.getElementById("ui-streak-pill");
    if (streakEl && typeof detail.streak === "number") {
      streakEl.textContent = detail.streak;
      if (streakPill) {
        streakPill.style.borderColor = detail.streak > 0 ? "#f97316" : "#334155";
        streakPill.style.color = detail.streak > 0 ? "#fb923c" : "#94a3b8";
      }
    }

    refreshMiniAvatar();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderUIBar);
  } else {
    renderUIBar();
  }
})();
