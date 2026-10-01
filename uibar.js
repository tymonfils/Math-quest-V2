// uibar.js - Global Top Navigation Bar
(function () {
  function renderUIBar() {
    const uiLayer = document.getElementById("ui-layer");
    if (!uiLayer) return;

    uiLayer.innerHTML = ""; 

    // Main top bar container - This splits the left and right sides
    const topBar = document.createElement("div");
    topBar.style.position = "fixed";
    topBar.style.top = "10px";
    topBar.style.left = "0";
    topBar.style.width = "100%";
    topBar.style.padding = "0 20px";
    topBar.style.display = "flex";
    topBar.style.justifyContent = "space-between"; // Pushes Gear to the right
    topBar.style.alignItems = "center";
    topBar.style.pointerEvents = "none"; 
    topBar.style.zIndex = "1000";
    topBar.style.boxSizing = "border-box";

    // LEFT SIDE: Map Button & Gold
    const leftGroup = document.createElement("div");
    leftGroup.style.display = "flex";
    leftGroup.style.alignItems = "center";
    leftGroup.style.gap = "15px";
    leftGroup.style.pointerEvents = "auto"; 

    const mapBtn = document.createElement("button");
    mapBtn.innerText = "🗺️ Map";
    mapBtn.style.padding = "10px 15px";
    mapBtn.style.fontSize = "18px";
    mapBtn.style.cursor = "pointer";
    mapBtn.style.borderRadius = "8px";
    mapBtn.style.border = "2px solid #333";
    mapBtn.style.backgroundColor = "#fff";
    mapBtn.style.fontWeight = "bold";
    mapBtn.onclick = () => window.dispatchEvent(new CustomEvent("ui-map-clicked"));

    const goldDisplay = document.createElement("div");
    goldDisplay.id = "gold-display";
    goldDisplay.innerText = "💰 0";
    goldDisplay.style.fontSize = "20px";
    goldDisplay.style.fontWeight = "bold";
    goldDisplay.style.color = "#fbbf24";
    goldDisplay.style.textShadow = "1px 1px 2px #000";

    leftGroup.appendChild(mapBtn);
    leftGroup.appendChild(goldDisplay);

    // RIGHT SIDE: Settings Gear
    const rightGroup = document.createElement("div");
    rightGroup.style.pointerEvents = "auto"; 

    const settingsBtn = document.createElement("button");
    settingsBtn.innerHTML = "⚙️";
    settingsBtn.style.padding = "10px 15px";
    settingsBtn.style.fontSize = "20px";
    settingsBtn.style.cursor = "pointer";
    settingsBtn.style.borderRadius = "8px";
    settingsBtn.style.border = "2px solid #333";
    settingsBtn.style.backgroundColor = "#fff";
    settingsBtn.onclick = () => window.dispatchEvent(new CustomEvent("ui-settings-clicked"));

    rightGroup.appendChild(settingsBtn);

    // Put it all together
    topBar.appendChild(leftGroup);
    topBar.appendChild(rightGroup);
    uiLayer.appendChild(topBar);
  }

  document.addEventListener("DOMContentLoaded", renderUIBar);
  if (document.readyState === "complete" || document.readyState === "interactive") {
    renderUIBar();
  }
})();
