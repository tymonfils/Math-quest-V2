// avatar.js - Master SVG Renderer for Boy/Girl Avatars, 18 Hairstyles, 18 Outfits & 9 Pets
window.AvatarRenderer = (function () {
  function ensureStyles() {
    if (document.getElementById("avatar-fx-styles")) return;
    const style = document.createElement("style");
    style.id = "avatar-fx-styles";
    style.textContent = `
      @keyframes avAuraPulse {
        0%, 100% { transform: scale(0.96); opacity: 0.65; }
        50% { transform: scale(1.08); opacity: 0.95; }
      }
      @keyframes avWingFlapLeft {
        0%, 100% { transform: rotate(-6deg); }
        50% { transform: rotate(14deg); }
      }
      @keyframes avWingFlapRight {
        0%, 100% { transform: rotate(6deg); }
        50% { transform: rotate(-14deg); }
      }
      @keyframes avOrbitSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes avFlameFlicker {
        0%, 100% { transform: scaleY(0.95) translateY(0px); }
        50% { transform: scaleY(1.12) translateY(-3px); }
      }
      @keyframes avRainbowCycle {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
      @keyframes avLegLeft {
        0%, 100% { transform: rotate(-18deg); }
        50% { transform: rotate(18deg); }
      }
      @keyframes avLegRight {
        0%, 100% { transform: rotate(18deg); }
        50% { transform: rotate(-18deg); }
      }
      .av-running .leg-l { transform-origin: 78px 168px; animation: avLegLeft 0.28s infinite ease-in-out; }
      .av-running .leg-r { transform-origin: 102px 168px; animation: avLegRight 0.28s infinite ease-in-out; }
    `;
    document.head.appendChild(style);
  }

  function renderSVG(avatarState, width = 140, height = 160, isRunning = false) {
    ensureStyles();
    const avatar = avatarState || (window.Economy ? window.Economy.getAvatar() : {});
    const gender = avatar.gender || "girl";
    const skin = avatar.skinTone || "#fcd34d";
    const hairColor = avatar.hairColor || "#78350f";
    const eq = avatar.equipped || { girl: {}, boy: {} };
    const genderEq = eq[gender] || {};
    const catalog = window.Economy ? window.Economy.getCatalog() : null;

    let outfitObj = null;
    let hairObj = null;

    if (catalog) {
      const oList = catalog.outfits[gender] || [];
      const hList = catalog.hairs[gender] || [];
      outfitObj = oList.find((i) => i.id === genderEq.outfit) || oList[0];
      hairObj = hList.find((i) => i.id === genderEq.hair) || hList[0];
    }

    const primary = outfitObj ? outfitObj.primary : "#0284c7";
    const accent = outfitObj ? outfitObj.accent : "#38bdf8";
    const badge = outfitObj ? outfitObj.badge : "⭐";
    const outfitFx = outfitObj ? outfitObj.fx : null;
    const style = hairObj ? hairObj.style : gender === "girl" ? "pigtails" : "sweep";
    const hairFx = hairObj ? hairObj.fx : null;

    const hairExtraClass = hairFx === "rainbow" ? ' style="animation: avRainbowCycle 3s linear infinite;"' : "";
    const activeHairColor = hairFx === "fire" ? "#f97316" : hairFx === "sparkle" ? "#38bdf8" : hairColor;

    // 1. INSANE OUTFIT BACK FX (Solar Cape, Energy Wings, Cosmic Aura)
    let backFxSVG = "";
    if (outfitFx === "solar") {
      backFxSVG =
        '<circle cx="90" cy="115" r="58" fill="rgba(251, 146, 60, 0.22)" style="transform-origin: 90px 115px; animation: avAuraPulse 1.6s infinite ease-in-out;" />' +
        '<path d="M 52 122 L 34 182 L 90 172 L 146 182 L 128 122 Z" fill="#ea580c" opacity="0.85" />' +
        '<path d="M 68 42 L 76 24 L 90 34 L 104 24 L 112 42 Z" fill="#fde047" stroke="#ea580c" stroke-width="2" />';
    } else if (outfitFx === "wings") {
      backFxSVG =
        '<g style="transform-origin: 75px 130px; animation: avWingFlapLeft 0.9s infinite ease-in-out;">' +
          '<path d="M 75 130 C 30 90 10 110 25 145 C 40 160 60 155 75 145 Z" fill="' + accent + '" opacity="0.8" stroke="#ffffff" stroke-width="2" />' +
        '</g>' +
        '<g style="transform-origin: 105px 130px; animation: avWingFlapRight 0.9s infinite ease-in-out;">' +
          '<path d="M 105 130 C 150 90 170 110 155 145 C 140 160 120 155 105 145 Z" fill="' + accent + '" opacity="0.8" stroke="#ffffff" stroke-width="2" />' +
        '</g>';
    } else if (outfitFx === "cosmic") {
      backFxSVG =
        '<circle cx="90" cy="110" r="64" fill="rgba(192, 132, 252, 0.2)" style="transform-origin: 90px 110px; animation: avAuraPulse 1.4s infinite ease-in-out;" />' +
        '<g style="transform-origin: 90px 110px; animation: avOrbitSpin 4s linear infinite;">' +
          '<ellipse cx="90" cy="110" rx="68" ry="18" fill="none" stroke="' + accent + '" stroke-width="2.5" stroke-dasharray="8 6" />' +
          '<circle cx="22" cy="110" r="6" fill="#fde047" />' +
          '<circle cx="158" cy="110" r="5" fill="#38bdf8" />' +
        '</g>';
    }

    // 2. HAIR BACK LAYER
    let hairBack = "";
    if (style === "pigtails") {
      hairBack =
        '<circle cx="46" cy="82" r="16" fill="' + activeHairColor + '" />' +
        '<circle cx="134" cy="82" r="16"
