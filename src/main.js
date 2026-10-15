import { loadSpaceSchool } from './world/zones/spaceschool.js';

console.log("Chunking architecture is online.");
console.log("Blue screen defeated.");

// Start in Space School by default
loadSpaceSchool();

// Listen for Fast Travel events and dynamically load each zone's standalone file
const ZONE_LOADERS = {
  spaceschool: { file: './world/zones/spaceschool.js', fn: 'loadSpaceSchool' },
  candyacademy: { file: './world/zones/candyacademy.js', fn: 'loadCandyAcademy' },
  dinolab: { file: './world/zones/dinolab.js', fn: 'loadDinoLab' },
  safari: { file: './world/zones/safari.js', fn: 'loadSafari' },
  fairycastle: { file: './world/zones/fairycastle.js', fn: 'loadFairyCastle' },
  treasurecove: { file: './world/zones/treasurecove.js', fn: 'loadTreasureCove' },
  underwater: { file: './world/zones/underwater.js', fn: 'loadUnderwater' },
  fastlane: { file: './world/zones/fastlane.js', fn: 'loadFastLane' }
};

window.addEventListener("travel-to-zone", async (e) => {
  const zoneId = e.detail && e.detail.id;
  const zoneName = (e.detail && e.detail.name) || zoneId;
  const entry = ZONE_LOADERS[zoneId];
  if (!entry) return;

  try {
    const mod = await import(entry.file + "?v=" + Date.now());
    if (mod && typeof mod[entry.fn] === "function") {
      mod[entry.fn]();
    }
  } catch (err) {
    console.warn("Zone file not built yet:", entry.file, err);
    alert("🚧 " + zoneName + " is being built next! Stay tuned!");
  }
});

// Auto-load Avatar Renderer, Playable Stage, and Shop Modal in order
function loadScript(src) {
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = src + "?v=" + Date.now();
    s.onload = resolve;
    s.onerror = resolve;
    document.body.appendChild(s);
  });
}

async function bootAvatarAndShop() {
  if (!window.AvatarRenderer) await loadScript("avatar.js");
  if (!document.getElementById("avatar-stage-layer")) {
    await loadScript("Avatarstage.js");
  }
  if (!window.ShopModal) await loadScript("shopmodal.js");
}

bootAvatarAndShop();
