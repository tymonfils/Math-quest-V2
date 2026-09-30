// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    uiLayer.style.position = "fixed";
    uiLayer.style.top = "0";
    uiLayer.style.left = "0";
    uiLayer.style.width = "100%";
    uiLayer.style.zIndex = "9000";
    uiLayer.style.pointerEvents = "auto";

    const initialGold = window.Economy ? window.Economy.getGold() : 0;
    const initialStreak = window.Economy ? window.Economy.getStreak() : 0;

    // Wipe out the old plain text sitting inside ui-layer
    uiLayer.innerHTML = "";

    const header = document.createElement("header");
    header.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px 20px; background:rgba(15,23,42,0.95); backdrop-filter:blur(8px); border-bottom:2px solid #334155; color:#f8fafc; font-family:sans-serif; box-sizing:border-box; width:100%;";

    // 1. Map Button
    const leftDiv = document.createElement("div");
    leftDiv.style.cssText = "display:flex; align-items:center; gap:12px;";
    const mapBtn = document.createElement("button");
    mapBtn.id = "ui-map-btn";
    mapBtn.type = "button";
    mapBtn.style.cssText = "background:#1e293b; color:#38bdf8; border:1px solid #38bdf8; padding:8px 14px; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.9rem;";
    mapBtn.textContent = "🗺️ Map";
    leftDiv.appendChild(mapBtn);

    // 2. Economy Stats
    const centerDiv = document.createElement("div");
    centerDiv.style.cssText = "display:flex; align-items:center; gap:24px; font-weight:700; font-size:1rem;";
    
    const goldDiv = document.createElement("div");
    goldDiv.style.cssText = "display:flex; align-items:center; gap:6px;";
    goldDiv.textContent = "🪙 Gold: ";
    const goldSpan = document.createElement("span");
    goldSpan.id = "ui-gold-display";
    goldSpan.style.color = "#fbbf24";
    goldSpan.textContent = initialGold;
    goldDiv.appendChild(goldSpan);

    const streakDiv = document.createElement("div");
    streakDiv.style.cssText = "display:flex; align-items:center; gap:6px;";
    streakDiv.textContent = "🔥 Streak: ";
    const streakSpan = document.createElement("span");
    streakSpan.id = "ui-streak-display";
    streakSpan.style.color = "#f97316";
    streakSpan.textContent = initialStreak;
    streakDiv.appendChild(streakSpan);

    centerDiv.appendChild(goldDiv);
    centerDiv.appendChild(streakDiv);

    // 3. Settings Button
    const rightDiv = document.createElement("div");
    rightDiv.style.cssText = "display:flex; align-items:center;";
    const settingsBtn = document.createElement("button");
    settingsBtn.id = "ui-settings-btn";
    settingsBtn.type = "button";
    settingsBtn.style.cssText = "background:#1e293b; color:#f8fafc; border:1px solid #64748b; padding:8px 14px; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.9rem;";
    settingsBtn.textContent = "⚙ Settings";
    rightDiv.appendChild(settingsBtn);

    // Assemble the bar
    header.appendChild(leftDiv);
    header.appendChild(centerDiv);
    header.appendChild(rightDiv);
    uiLayer.appendChild(header);

    // Attach listeners directly to the new buttons
    settingsBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent("ui-settings-clicked"));
    };

    mapBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent("ui-map-clicked"));
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderUIBar);
  } else {
    renderUIBar();
  }
})();
