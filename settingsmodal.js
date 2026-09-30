// settingsmodal.js - Global Settings Overlay
const SettingsModal = (function () {
  function openSettings() {
    const modalLayer = document.getElementById("modal-layer");
    if (!modalLayer || document.getElementById("settings-overlay")) return;

    // Create the dark blur background
    const overlay = document.createElement("div");
    overlay.id = "settings-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;

    // Create the menu box
    const modalBox = document.createElement("div");
    modalBox.style.cssText = `
      background: #0f172a;
      border: 2px solid #64748b;
      border-radius: 16px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      color: #f8fafc;
      font-family: sans-serif;
      box-shadow: 0 10px 25px rgba(0,0,0,0.8);
      display: flex;
      flex-direction: column;
    `;

    // Reusable styles for the rows
    const headerStyle = "color: #94a3b8; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin: 16px 0 8px 4px; letter-spacing: 0.05em;";
    const rowStyle = "display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; border: 1px solid #334155; cursor: pointer;";
    const tagStyle = "color: #94a3b8; font-size: 0.8rem; background: #0f172a; padding: 4px 8px; border-radius: 6px;";

    modalBox.innerHTML = `
Menu
Navigation

🗺️ Fast Travel Go

🛒 The Shop Go

🎁 Reward Vault Go

System

🎵 Music & SFX On

🔲 Full Screen Toggle

Parent Zone

📊 Report Card View

🧮 Math Difficulty Edit

🔒 Parental Menu Enter

    Close Menu
  
`;

overlay.appendChild(modalBox);
modalLayer.appendChild(overlay);

// Close functionality
document.getElementById("close-settings-btn").addEventListener("click", () => {
  modalLayer.removeChild(overlay);
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    modalLayer.removeChild(overlay);
  }
});
}

window.addEventListener("ui-settings-clicked", openSettings);

return { open: openSettings };
})();
