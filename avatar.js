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
        '<circle cx="134" cy="82" r="16" fill="' + activeHairColor + '" />' +
        '<path d="M 48 80 C 34 110 38 136 52 140 C 58 124 58 98 56 80 Z" fill="' + activeHairColor + '" />' +
        '<path d="M 132 80 C 146 110 142 136 128 140 C 122 124 122 98 124 80 Z" fill="' + activeHairColor + '" />';
    } else if (style === "ponytail") {
      hairBack = '<path d="M 112 62 C 145 55 158 95 140 125 C 128 112 128 85 112 72 Z" fill="' + activeHairColor + '" />';
    } else if (style === "buns") {
      hairBack =
        '<circle cx="54" cy="52" r="16" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<circle cx="126" cy="52" r="16" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.5" />';
    } else if (style === "drills") {
      hairBack =
        '<path d="M 48 75 C 32 95 48 115 36 135 C 52 135 60 110 56 78 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2" />' +
        '<path d="M 132 75 C 148 95 132 115 144 135 C 128 135 120 110 124 78 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2" />';
    } else if (style === "starlight" || style === "prism") {
      hairBack =
        '<path d="M 52 70 C 30 105 35 155 58 165 C 75 150 105 150 122 165 C 145 155 150 105 128 70 Z" fill="' + activeHairColor + '" />' +
        '<circle cx="48" cy="125" r="3" fill="#ffffff" />' +
        '<circle cx="132" cy="115" r="3.5" fill="#fde047" />';
    } else if (style === "topknot") {
      hairBack = '<circle cx="90" cy="36" r="13" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.5" />';
    }

    // 3. HAIR FRONT LAYER
    let hairFront = "";
    if (gender === "girl") {
      if (style === "bob" || style === "braids") {
        hairFront =
          '<path d="M 54 98 C 48 52 70 42 90 42 C 110 42 132 52 126 98 C 122 72 112 62 90 60 C 68 62 58 72 54 98 Z" fill="' + activeHairColor + '" />';
      } else if (style === "flame") {
        hairFront =
          '<g style="transform-origin: 90px 55px; animation: avFlameFlicker 0.35s infinite alternate;">' +
            '<path d="M 54 76 C 48 40 72 28 78 16 C 86 30 94 12 102 26 C 112 16 130 42 126 76 C 112 58 68 58 54 76 Z" fill="#f97316" stroke="#fde047" stroke-width="2" />' +
          '</g>';
      } else {
        hairFront =
          '<path d="M 58 72 C 58 40 122 40 122 72 C 110 56 96 63 90 53 C 84 63 70 56 58 72 Z" fill="' + activeHairColor + '" />' +
          '<circle cx="53" cy="72" r="5.5" fill="' + accent + '" />' +
          '<circle cx="127" cy="72" r="5.5" fill="' + accent + '" />';
      }
    } else {
      if (style === "mohawk") {
        hairFront = '<path d="M 78 56 L 74 22 L 90 30 L 106 22 L 102 56 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2" />';
      } else if (style === "spiky" || style === "anime" || style === "plasma" || style === "solar" || style === "cosmic") {
        const spikeGlow = style === "solar" || style === "plasma" ? ' stroke="#fde047" stroke-width="2"' : ' stroke="#0f172a" stroke-width="2"';
        hairFront =
          '<path d="M 54 76 L 44 48 L 66 54 L 68 28 L 86 46 L 98 22 L 108 46 L 128 32 L 120 56 L 136 52 L 126 76 C 112 58 68 58 54 76 Z" fill="' + activeHairColor + '"' + spikeGlow + ' />';
      } else {
        hairFront =
          '<path d="M 56 76 C 52 44 80 36 90 40 C 98 32 112 36 118 44 C 130 46 132 62 126 76 C 118 58 104 54 90 56 C 76 54 62 60 56 76 Z" fill="' + activeHairColor + '" />';
      }
    }

    //Halo for rainbow tier
    const haloSVG =
      hairFx === "rainbow"
        ? '<ellipse cx="90" cy="24" rx="26" ry="6" fill="none" stroke="#fde047" stroke-width="3.5" />'
        : "";

    const lashes =
      gender === "girl"
        ? '<line x1="70" y1="81" x2="66" y2="77" stroke="#0f172a" stroke-width="2.3" stroke-linecap="round" />' +
          '<line x1="110" y1="81" x2="114" y2="77" stroke="#0f172a" stroke-width="2.3" stroke-linecap="round" />'
        : "";

    const runClass = isRunning ? "av-running" : "";

    return (
      '<svg class="' + runClass + '" viewBox="0 0 180 205" style="width:' + width + "px;height:" + height + 'px;overflow:visible;">' +
        backFxSVG +
        '<g' + hairExtraClass + '>' + hairBack + '</g>' +
        // Legs & Boots
        '<rect class="leg-l" x="71" y="164" width="13" height="26" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2.5" />' +
        '<rect class="leg-r" x="96" y="164" width="13" height="26" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2.5" />' +
        // Arms
        '<rect x="46" y="122" width="13" height="34" rx="6.5" transform="rotate(14 52 122)" fill="' + primary + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<rect x="121" y="122" width="13" height="34" rx="6.5" transform="rotate(-14 128 122)" fill="' + primary + '" stroke="#0f172a" stroke-width="2.5" />' +
        // Torso / Outfit
        '<path d="M 58 118 L 122 118 L 114 170 L 66 170 Z" fill="' + primary + '" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />' +
        '<circle cx="90" cy="144" r="14" fill="' + accent + '" />' +
        '<text x="90" y="150" font-size="14" text-anchor="middle">' + badge + '</text>' +
        // Head
        '<circle cx="90" cy="84" r="32" fill="' + skin + '" stroke="#0f172a" stroke-width="3" />' +
        // Cheeks
        '<ellipse cx="69" cy="92" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.35" />' +
        '<ellipse cx="111" cy="92" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.35" />' +
        // Eyes & Smile
        '<circle cx="78" cy="84" r="4.2" fill="#0f172a" />' +
        '<circle cx="76.5" cy="82.5" r="1.5" fill="#ffffff" />' +
        '<circle cx="102" cy="84" r="4.2" fill="#0f172a" />' +
        '<circle cx="100.5" cy="82.5" r="1.5" fill="#ffffff" />' +
        lashes +
        '<path d="M 83 95 Q 90 101 97 95" fill="none" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round" />' +
        '<g' + hairExtraClass + '>' + hairFront + '</g>' +
        haloSVG +
      '</svg>'
    );
  }

  function renderPetSVG(petId, size = 64) {
    if (!petId || !window.Economy) return "";
    const pet = window.Economy.getItemById(petId);
    if (!pet) return "";
    const glow = pet.tier === "insane" ? "filter: drop-shadow(0 0 10px " + pet.color + ");" : "filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));";
    return (
      '<div style="width:' + size + "px;height:" + size + "px;display:flex;align-items:center;justify-content:center;position:relative;" + glow + '">' +
        '<div style="position:absolute;width:85%;height:85%;border-radius:50%;background:radial-gradient(circle, ' + pet.color + '44 0%, transparent 70%);"></div>' +
        '<span style="font-size:' + Math.round(size * 0.62) + 'px;line-height:1;user-select:none;">' + pet.icon + '</span>' +
      '</div>'
    );
  }

  return { renderSVG, renderPetSVG };
})();
