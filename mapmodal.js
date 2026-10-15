// mapmodal.js - Clean DOM Modular Map Deck (All 8 Canonical Zones Unlocked)
const MapModal = (function () {
  let currentZoneId = "spaceschool";

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
      "background:#0f172a;border:2px solid #fbbf24;border-radius:18px;padding:24px;width:90%;max-width:520px;color:#f8fafc;font-family:system-ui,sans-serif;box-shadow:0 20px 40px rgba(0,0,0,0.8);display:flex;flex-direction:column;max-height:85vh;box-sizing:border-box;";

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

    // The 8 Canonical Zones Data (All Unlocked!)
    const zones = [
      { id: "spaceschool", name: "Space School", icon: "🚀", color: "#38bdf8" },
      { id: "candyacademy", name: "Candy Academy", icon: "🍭", color: "#f472b6" },
      { id: "dinolab", name: "Dino Lab", icon: "🦖", color: "#22c55e" },
      { id: "safari", name: "Safari", icon: "🦁", color: "#eab308" },
      { id: "fairycastle", name: "Fairy Castle", icon: "🏰", color: "#c084fc" },
      { id: "treasurecove", name: "Treasure Cove", icon: "🏴‍☠️", color: "#f97316" },
      { id: "underwater", name: "Underwater", icon: "🐬", color: "#06b6d4" },
      { id: "fastlane", name: "Fast Lane", icon: "🏎️", color: "#ef4444" }
    ];

    zones.forEach((zone) => {
      const isCurrent = currentZoneId === zone.id;
      const btn = document.createElement("div");

      btn.style.cssText =
        "background:" +
        (isCurrent ? "rgba(251, 191, 36, 0.14)" : "rgba(30, 41, 59, 0.85)") +
        ";border:2px solid " +
        zone.color +
        ";border-radius:12px;padding:16px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:transform 0.12s;user-select:none;position:relative;";

      const icon = document.createElement("div");
      icon.textContent = zone.icon;
      icon.style.cssText = "font-size:2rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));";

      const name = document.createElement("div");
      name.textContent = zone.name;
      name.style.cssText = "font-size:0.92rem;font-weight:800;color:#f8fafc;text-align:center;";

      btn.appendChild(icon);
      btn.appendChild(name);

      if (isCurrent) {
        const badge = document.createElement("div");
        badge.textContent = "📍 HERE";
        badge.style.cssText =
          "position:absolute;top:6px;right:6px;font-size:0.65rem;font-weight:900;background:#fbbf24;color:#0f172a;padding:2px 6px;border-radius:999px;";
        btn.appendChild(badge);
      }

      btn.addEventListener("click", () => {
        currentZoneId = zone.id;
        window.dispatchEvent(
          new CustomEvent("travel-to-zone", { detail: { id: zone.id, name: zone.name } })
        );
        close();
      });

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

  window.addEventListener("ui-map-clicked", openMap);

  return { open: openMap };
})();
