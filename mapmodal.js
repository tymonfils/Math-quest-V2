// mapmodal.js - Clean DOM Modular Map Deck
const MapModal = (function () {
  function openMap() {
    const modalLayer = document.getElementById("modal-layer");
    if (!modalLayer || document.getElementById("map-overlay")) return;

    // Dimmed glass backdrop
    const overlay = document.createElement("div");
    overlay.id = "map-overlay";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(4,7,18,0.85);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;z-index:10000;box-sizing:border-box;pointer-events:auto;";

    // Main Card Box
    const card = document.createElement("div");
    card.id = "map-card";
    card.style.cssText =
      "background:#0f172a;border:2px solid #fbbf24;border-radius:18px;padding:24px;width:90%;max-width:500px;color:#f8fafc;font-family:system-ui,sans-serif;box-shadow:0 20px 40px rgba(0,0,0,0.8);display:flex;flex-direction:column;max-height:85vh;box-sizing:border-box;";

    // Header bar
    const header = document.createElement("div");
    header.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #334155;";

    const title = document.createElement("div");
    title.textContent = "🗺️ Fast Travel";
    title.style.cssText = "font-size:1.4rem;font-weight:900;color:#fbbf24;letter-spacing:0.05em;";

    const closeIcon = document.createElement("button");
    closeIcon.textContent = "✕";
    closeIcon.style.cssText =
      "background:none;border:none;color:#94a3b8;font-size:1.4rem;cursor:pointer;line-height:1;";

    header.appendChild(title);
    header.appendChild(closeIcon);
    card.appendChild(header);

    // 2-Column Grid for the 8 Zones
    const grid = document.createElement("div");
    grid.style.cssText =
      "display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;overflow-y:auto;padding-right:4px;";

    // The 8 Canonical Zones Data
    const zones = [
      { name: "Space School", icon: "🚀", color: "#38bdf8", locked: false },
      { name: "Candy Academy", icon: "🍭", color: "#f472b6", locked: true },
      { name: "Dino Lab", icon: "🦖", color: "#22c55e", locked: true },
      { name: "Safari", icon: "🦁", color: "#eab308", locked: true },
      { name: "Fairy Castle", icon: "🏰", color: "#c084fc", locked: true },
      { name: "Treasure Cove", icon: "🏴‍☠️", color: "#f97316", locked: true },
      { name: "Underwater", icon: "🐬", color: "#06b6d4", locked: true },
      { name: "Fast Lane", icon: "🏎️", color: "#ef4444", locked: true }
    ];

    // Generate Buttons
    zones.forEach((zone) => {
      const btn = document.createElement("div");

      const borderCol = zone.locked ? "#334155" : zone.color;
      const opacity = zone.locked ? "0.5" : "1";
      const cursor = zone.locked ? "not-allowed" : "pointer";
      const bg = zone.locked ? "#1e293b" : "rgba(30, 41, 59, 0.8)";

      btn.style.cssText =
        "background:" + bg + ";border:2px solid " + borderCol + ";border-radius:12px;padding:16px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:" + cursor + ";opacity:" + opacity + ";transition:transform 0.1s;user-select:none;";

      const icon = document.createElement("div");
      icon.textContent = zone.locked ? "🔒" : zone.icon;
      icon.style.cssText = "font-size:2rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));";

      const name = document.createElement("div");
      name.textContent = zone.name;
      name.style.cssText = "font-size:0.9rem;font-weight:700;color:#f8fafc;text-align:center;";

      btn.appendChild(icon);
      btn.appendChild(name);

      if (!zone.locked) {
        btn.addEventListener("click", () => {
          console.log("Traveling to " + zone.name + "...");
          close();
        });
      }

      grid.appendChild(btn);
    });

    card.appendChild(grid);
    overlay.appendChild(card);
    modalLayer.appendChild(overlay);

    function close() {
      if (overlay.parentNode === modalLayer) {
        modalLayer.removeChild(overlay);
      }
    }

    closeIcon.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
  }

  // Listen for the shout from uibar.js
  window.addEventListener("ui-map-clicked", openMap);

  return { open: openMap };
})();
