// settingsmodal.js - Clean DOM Modular Settings Deck
const SettingsModal = (function () {
  function openSettings() {
    const modalLayer = document.getElementById("modal-layer");
    if (!modalLayer || document.getElementById("settings-overlay")) return;

    // Dimmed glass backdrop
    const overlay = document.createElement("div");
    overlay.id = "settings-overlay";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(4,7,18,0.85);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;z-index:10000;box-sizing:border-box;pointer-events:auto;";

    // Main Card Box
    const card = document.createElement("div");
    card.id = "settings-card";
    card.style.cssText =
      "background:#0f172a;border:2px solid #38bdf8;border-radius:18px;padding:24px;width:90%;max-width:420px;color:#f8fafc;font-family:system-ui,sans-serif;box-shadow:0 20px 40px rgba(0,0,0,0.8);display:flex;flex-direction:column;max-height:85vh;box-sizing:border-box;";

    // Header bar
    const header = document.createElement("div");
    header.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #334155;";

    const title = document.createElement("div");
    title.textContent = "⚙ Control Deck";
    title.style.cssText = "font-size:1.3rem;font-weight:800;color:#f8fafc;";

    const closeIcon = document.createElement("button");
    closeIcon.textContent = "✕";
    closeIcon.style.cssText =
      "background:none;border:none;color:#94a3b8;font-size:1.4rem;cursor:pointer;line-height:1;";

    header.appendChild(title);
    header.appendChild(closeIcon);
    card.appendChild(header);

    // Scrollable container
    const listContainer = document.createElement("div");
    listContainer.style.cssText =
      "overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding-right:4px;";

    function addSectionLabel(text, color) {
      const label = document.createElement("div");
      label.textContent = text;
      label.style.cssText =
        "font-size:0.75rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;margin:10px 0 2px 4px;color:" + color + ";";
      listContainer.appendChild(label);
    }

    function createRow(icon, text, tagText, tagBg, tagColor, onClick) {
      const row = document.createElement("div");
      row.style.cssText =
        "display:flex;justify-content:space-between;align-items:center;background:#1e293b;border:1px solid #334155;padding:12px 14px;border-radius:10px;cursor:pointer;user-select:none;";

      const left = document.createElement("div");
      left.style.cssText = "display:flex;align-items:center;gap:10px;font-weight:600;font-size:0.95rem;";
      left.textContent = icon + " " + text;

      const right = document.createElement("span");
      right.textContent = tagText;
      right.style.cssText =
        "background:" + tagBg + ";color:" + tagColor + ";font-size:0.75rem;font-weight:700;padding:4px 10px;border-radius:999px;";

      row.appendChild(left);
      row.appendChild(right);
      if (onClick) row.addEventListener("click", onClick);
      listContainer.appendChild(row);
    }

    addSectionLabel("Navigation", "#38bdf8");
    createRow("🗺️", "Fast Travel", "OPEN", "rgba(56,189,248,0.2)", "#38bdf8", () => {
      close();
      window.dispatchEvent(new CustomEvent("ui-map-clicked"));
    });
    createRow("🛒", "The Shop", "VISIT", "rgba(251,191,36,0.2)", "#fbbf24");
    
    addSectionLabel("System", "#94a3b8");
    createRow("🔲", "Full Screen", "TOGGLE", "rgba(255,255,255,0.15)", "#f8fafc", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    card.appendChild(listContainer);

    const resumeBtn = document.createElement("button");
    resumeBtn.textContent = "Resume Game";
    resumeBtn.style.cssText =
      "margin-top:16px;padding:12px;background:#ef4444;color:white;border:none;border-radius:10px;font-weight:700;font-size:0.95rem;cursor:pointer;";

    card.appendChild(resumeBtn);
    overlay.appendChild(card);
    modalLayer.appendChild(overlay);

    function close() {
      if (overlay.parentNode === modalLayer) modalLayer.removeChild(overlay);
    }

    closeIcon.addEventListener("click", close);
    resumeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
  }

  window.addEventListener("ui-settings-clicked", openSettings);
  return { open: openSettings };
})();

JavaScript
// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    const initialGold = window.Economy ? window.Economy.getGold() : 0;
    const initialStreak = window.Economy ? window.Economy.getStreak() : 0;

    uiLayer.innerHTML = `
🗺️ Map

🪙 Gold:${initialGold}

🔥 Streak:${initialStreak}

⚙ Settings

`;

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
