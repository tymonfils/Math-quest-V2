// settingsmodal.js - Global Settings Overlay
const SettingsModal = (function () {
  function openSettings() {
    const modalLayer = document.getElementById("modal-layer");
    if (!modalLayer || document.getElementById("settings-overlay")) return;

    // Dimmed glass backdrop
    const overlay = document.createElement("div");
    overlay.id = "settings-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(4, 7, 18, 0.82);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: settingsFadeIn 0.18s ease-out;
    `;

    // Main Card
    const modalBox = document.createElement("div");
    modalBox.id = "settings-dialog-card";
    modalBox.style.cssText = `
      background: linear-gradient(180deg, #111827 0%, #0b0f19 100%);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 20px;
      padding: 24px;
      width: 92%;
      max-width: 440px;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.12);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      max-height: 85vh;
    `;

    // Header styling
    const sectionTitleStyle = "font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin: 14px 0 6px 4px;";
    
    modalBox.innerHTML = `
      
⚙️

Control Deck
✕

Navigation

🗺️ Fast Travel

OPEN

🛒 The Shop

VISIT

🎁 Reward Vault

CLAIM

System

🎵 Audio & SFX

ENABLED

🔲 Full Screen

TOGGLE

Parent Zone

📊 Report Card

VIEW

🔒 Parent Controls

PIN

    Resume Game
  
`;

overlay.appendChild(modalBox);
modalLayer.appendChild(overlay);

// Close logic helper
function closeModal() {
  if (overlay.parentNode === modalLayer) {
    modalLayer.removeChild(overlay);
  }
}

// Attach listeners safely
const closeBtn = document.getElementById("modal-close-action");
const closeIcon = document.getElementById("modal-close-icon");
if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (closeIcon) closeIcon.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// Wire up Fullscreen toggle directly
const fsRow = document.getElementById("toggle-fullscreen-row");
if (fsRow) {
  fsRow.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });
}
}

// Hook into event broadcast from uibar.js
window.addEventListener("ui-settings-clicked", openSettings);

return { open: openSettings };
})();
