// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    uiLayer.innerHTML = ""; 

    // 1. The wrapper must take up the full screen width to separate left/right
    uiLayer.style.position = "fixed";
    uiLayer.style.top = "0";
    uiLayer.style.left = "0";
    uiLayer.style.width = "100%";
    uiLayer.style.pointerEvents = "none"; // Let clicks pass through to the game
    uiLayer.style.zIndex = "1000";

    // 2. The flex container that pushes them apart
    const topBar = document.createElement("div");
    topBar.style.display = "flex";
    topBar.style.justifyContent = "space-between";
    topBar.style.alignItems = "center";
    topBar.style.padding = "15px 20px";
    topBar.style.width = "100%";
    topBar.style.boxSizing = "border-box";

    // 3. LEFT SIDE: Map Button & Gold
    const leftGroup = document.createElement("div");
    leftGroup.style.display = "flex";
    leftGroup.style.alignItems = "center";
    leftGroup.style.gap = "15px";
    leftGroup.style.pointerEvents = "auto"; // Restores clickability

    const mapBtn = document.createElement("button");
    mapBtn.innerText = "🗺️ Map";
    mapBtn.style.padding = "10px 15px";
    mapBtn.style.fontSize = "18px";
    mapBtn.style.cursor = "pointer";
    mapBtn.onclick = () => window.dispatchEvent(new CustomEvent("ui-map-clicked"));

    const goldDisplay = document.createElement("div");
    goldDisplay.innerText = "💰 0";
    goldDisplay.style.fontSize = "20px";
    goldDisplay.style.fontWeight = "bold";
    goldDisplay.style.color = "#fbbf24";

    leftGroup.appendChild(mapBtn);
    leftGroup.appendChild(goldDisplay);

    // 4. RIGHT SIDE: Settings Gear
    const rightGroup = document.createElement("div");
    rightGroup.style.pointerEvents = "auto"; // Restores clickability

    const settingsBtn = document.createElement("button");
    settingsBtn.innerText = "⚙️";
    settingsBtn.style.padding = "10px 15px";
    settingsBtn.style.fontSize = "20px";
    settingsBtn.style.cursor = "pointer";
    settingsBtn.onclick = () => window.dispatchEvent(new CustomEvent("ui-settings-clicked"));

    rightGroup.appendChild(settingsBtn);

    // Assemble
    topBar.appendChild(leftGroup);
    topBar.appendChild(rightGroup);
    uiLayer.appendChild(topBar);
  }

  document.addEventListener("DOMContentLoaded", renderUIBar);
  if (document.readyState === "complete" || document.readyState === "interactive") {
    renderUIBar();
  }
})();
