import { loadSpaceSchool } from './world/zones/spaceschool.js';

console.log("Chunking architecture is online.");
console.log("Blue screen defeated.");

// Fire up the visual layer
loadSpaceSchool();

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
