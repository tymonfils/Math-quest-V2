// avatar.js - High-Detail Master SVG Renderer (18 Bespoke Outfits, 18 Volumetric Hairstyles & 9 Custom SVG Pets)
window.AvatarRenderer = (function () {
  function ensureStyles() {
    if (document.getElementById("avatar-fx-styles")) return;
    const style = document.createElement("style");
    style.id = "avatar-fx-styles";
    style.textContent = `
      @keyframes avAuraPulse {
        0%, 100% { transform: scale(0.96); opacity: 0.65; }
        50% { transform: scale(1.06); opacity: 0.95; }
      }
      @keyframes avWingFlapLeft {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(13deg); }
      }
      @keyframes avWingFlapRight {
        0%, 100% { transform: rotate(5deg); }
        50% { transform: rotate(-13deg); }
      }
      @keyframes avOrbitSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes avFlameFlicker {
        0%, 100% { transform: scaleY(0.96) translateY(0px); }
        50% { transform: scaleY(1.08) translateY(-3px); }
      }
      @keyframes avRainbowCycle {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
      @keyframes avLegLeft {
        0%, 100% { transform: rotate(-20deg); }
        50% { transform: rotate(20deg); }
      }
      @keyframes avLegRight {
        0%, 100% { transform: rotate(20deg); }
        50% { transform: rotate(-20deg); }
      }
      @keyframes avArmLeft {
        0%, 100% { transform: rotate(16deg); }
        50% { transform: rotate(-16deg); }
      }
      @keyframes avArmRight {
        0%, 100% { transform: rotate(-16deg); }
        50% { transform: rotate(16deg); }
      }
      @keyframes avBlinkEyes {
        0%, 94%, 100% { transform: scaleY(1); }
        97% { transform: scaleY(0.1); }
      }
      .av-running .leg-l { transform-origin: 76px 158px; animation: avLegLeft 0.26s infinite ease-in-out; }
      .av-running .leg-r { transform-origin: 104px 158px; animation: avLegRight 0.26s infinite ease-in-out; }
      .av-running .arm-l { transform-origin: 62px 118px; animation: avArmLeft 0.26s infinite ease-in-out; }
      .av-running .arm-r { transform-origin: 118px 118px; animation: avArmRight 0.26s infinite ease-in-out; }
      .av-eyes-blink { transform-origin: 90px 80px; animation: avBlinkEyes 4.2s infinite; }
    `;
    document.head.appendChild(style);
  }

  // Build bespoke back-layer capes, wings, katanas, and auras per Outfit ID
  function buildOutfitBackLayer(outfitId, primary, accent, fx) {
    let svg = "";

    // Insane Tier Ambient Auras
    if (fx === "solar") {
      svg +=
        '<circle cx="90" cy="118" r="64" fill="rgba(251, 146, 60, 0.22)" style="transform-origin:90px 118px;animation:avAuraPulse 1.6s infinite ease-in-out;" />' +
        '<circle cx="90" cy="118" r="50" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="10 6" style="transform-origin:90px 118px;animation:avOrbitSpin 8s linear infinite;" />';
    } else if (fx === "cosmic") {
      svg +=
        '<circle cx="90" cy="116" r="66" fill="rgba(192, 132, 252, 0.22)" style="transform-origin:90px 116px;animation:avAuraPulse 1.5s infinite ease-in-out;" />';
    }

    // Specific Outfit Back Attachments
    if (outfitId === "g_out_4") {
      // Astro-Valkyrie Half-Cape
      svg += '<path d="M 60 114 L 44 176 L 90 168 L 136 176 L 120 114 Z" fill="#0369a1" stroke="#0f172a" stroke-width="2.5" />';
    } else if (outfitId === "g_out_6" || outfitId === "b_out_6") {
      // Cyber-Ninja / Shadow Shinobi Dual Crossed Katana Scabbards + Flowing Scarf Tail
      const bladeAcc = outfitId === "g_out_6" ? "#22d3ee" : "#ef4444";
      svg +=
        '<g stroke="#0f172a" stroke-width="2">' +
          '<rect x="42" y="88" width="8" height="72" rx="3" transform="rotate(-32 90 125)" fill="#1e293b" />' +
          '<rect x="42" y="82" width="10" height="14" rx="2" transform="rotate(-32 90 125)" fill="' + bladeAcc + '" />' +
          '<rect x="130" y="88" width="8" height="72" rx="3" transform="rotate(32 90 125)" fill="#1e293b" />' +
          '<rect x="129" y="82" width="10" height="14" rx="2" transform="rotate(32 90 125)" fill="' + bladeAcc + '" />' +
        '</g>' +
        '<path d="M 105 110 C 138 106, 156 122, 148 142 C 134 138, 122 126, 108 118 Z" fill="' + bladeAcc + '" stroke="#0f172a" stroke-width="2" />';
    } else if (outfitId === "g_out_7") {
      // Solar Empress Royal Sunburst Mantle & Flowing Floor Cape
      svg +=
        '<path d="M 52 112 L 28 188 L 62 182 L 90 190 L 118 182 L 152 188 L 128 112 Z" fill="#c2410c" stroke="#7c2d12" stroke-width="2.5" />' +
        '<path d="M 58 114 L 40 180 L 90 172 L 140 180 L 122 114 Z" fill="#ea580c" />' +
        '<path d="M 42 118 L 24 98 L 48 104 L 38 82 L 62 96 L 118 96 L 142 82 L 132 104 L 156 98 L 138 118 Z" fill="#fde047" stroke="#b45309" stroke-width="2" />';
    } else if (outfitId === "b_out_7") {
      // Plasma Mecha-Knight Dual Jet Wing Binders
      svg +=
        '<g style="transform-origin:72px 124px;animation:avWingFlapLeft 1.2s infinite ease-in-out;">' +
          '<polygon points="72,120 18,92 12,114 58,136" fill="#1e3a8a" stroke="#0f172a" stroke-width="2.5" />' +
          '<polygon points="66,126 22,120 28,136 64,138" fill="#67e8f9" stroke="#0284c7" stroke-width="1.5" />' +
        '</g>' +
        '<g style="transform-origin:108px 124px;animation:avWingFlapRight 1.2s infinite ease-in-out;">' +
          '<polygon points="108,120 162,92 168,114 122,136" fill="#1e3a8a" stroke="#0f172a" stroke-width="2.5" />' +
          '<polygon points="114,126 158,120 152,136 116,138" fill="#67e8f9" stroke="#0284c7" stroke-width="1.5" />' +
        '</g>';
    } else if (outfitId === "g_out_8") {
      // Starlight Seraph Multi-Feathered Angelic Wings
      svg +=
        '<g style="transform-origin:74px 124px;animation:avWingFlapLeft 0.95s infinite ease-in-out;">' +
          '<path d="M 74 124 C 36 82, 6 96, 14 128 C 22 134, 34 130, 22 146 C 34 152, 52 144, 38 158 C 54 160, 68 148, 74 138 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2.5" />' +
          '<path d="M 68 126 C 42 98, 22 108, 28 126" fill="none" stroke="#bae6fd" stroke-width="2" />' +
        '</g>' +
        '<g style="transform-origin:106px 124px;animation:avWingFlapRight 0.95s infinite ease-in-out;">' +
          '<path d="M 106 124 C 144 82, 174 96, 166 128 C 158 134, 146 130, 158 146 C 146 152, 128 144, 142 158 C 126 160, 112 148, 106 138 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2.5" />' +
          '<path d="M 112 126 C 138 98, 158 108, 152 126" fill="none" stroke="#bae6fd" stroke-width="2" />' +
        '</g>';
    } else if (outfitId === "b_out_8") {
      // Void Dragon Lord Bat/Dragon Wings & Spiked Tail
      svg +=
        '<g style="transform-origin:74px 124px;animation:avWingFlapLeft 1s infinite ease-in-out;">' +
          '<path d="M 74 124 L 22 86 L 12 124 C 28 118, 38 128, 34 146 C 48 138, 62 144, 72 142 Z" fill="#3b0764" stroke="#c084fc" stroke-width="2.5" />' +
          '<line x1="74" y1="124" x2="34" y2="146" stroke="#a855f7" stroke-width="2" />' +
        '</g>' +
        '<g style="transform-origin:106px 124px;animation:avWingFlapRight 1s infinite ease-in-out;">' +
          '<path d="M 106 124 L 158 86 L 168 124 C 152 118, 142 128, 146 146 C 132 138, 118 144, 108 142 Z" fill="#3b0764" stroke="#c084fc" stroke-width="2.5" />' +
          '<line x1="106" y1="124" x2="146" y2="146" stroke="#a855f7" stroke-width="2" />' +
        '</g>';
    } else if (outfitId === "g_out_9" || outfitId === "b_out_9") {
      // Cosmic Nova Queen / Hyper-Nova Emperor Grand Star-Cloak
      const cloakCol = outfitId === "g_out_9" ? "#581c87" : "#78350f";
      const trimCol = outfitId === "g_out_9" ? "#f472b6" : "#fde047";
      svg +=
        '<path d="M 50 112 L 24 188 L 90 180 L 156 188 L 130 112 Z" fill="' + cloakCol + '" stroke="' + trimCol + '" stroke-width="3" />' +
        '<circle cx="48" cy="162" r="2.5" fill="#ffffff" />' +
        '<circle cx="132" cy="154" r="3" fill="#fde047" />' +
        '<circle cx="65" cy="142" r="2" fill="#38bdf8" />';
    }

    return svg;
  }

  // Build bespoke torso, legs, boots, armor, skirts, and collars per Outfit ID
  function buildOutfitBodyLayer(outfitId, gender, primary, accent, badge, skin) {
    // Default Boots & Legs
    let bootCol = "#1e293b";
    let pantCol = "#334155";
    let shoeTrim = accent;

    if (outfitId === "g_out_1") { pantCol = skin; bootCol = "#db2777"; }
    else if (outfitId === "g_out_2") { pantCol = "#4c1d95"; bootCol = "#fde047"; }
    else if (outfitId === "g_out_3") { pantCol = "#0f766e"; bootCol = "#78350f"; }
    else if (outfitId === "g_out_4") { pantCol = "#e2e8f0"; bootCol = "#0284c7"; }
    else if (outfitId === "g_out_5") { pantCol = "#a855f7"; bootCol = "#f472b6"; }
    else if (outfitId === "g_out_6") { pantCol = "#0f172a"; bootCol = "#22d3ee"; }
    else if (outfitId === "g_out_7") { pantCol = "#9a3412"; bootCol = "#fde047"; }
    else if (outfitId === "g_out_8") { pantCol = "#e0f2fe"; bootCol = "#6366f1"; }
    else if (outfitId === "g_out_9") { pantCol = "#3b0764"; bootCol = "#f472b6"; }
    else if (outfitId === "b_out_1") { pantCol = "#1e3a8a"; bootCol = "#0284c7"; }
    else if (outfitId === "b_out_2") { pantCol = "#1e293b"; bootCol = "#dc2626"; }
    else if (outfitId === "b_out_3") { pantCol = "#78350f"; bootCol = "#3f6212"; }
    else if (outfitId === "b_out_4") { pantCol = "#475569"; bootCol = "#38bdf8"; }
    else if (outfitId === "b_out_5") { pantCol = "#451a03"; bootCol = "#d97706"; }
    else if (outfitId === "b_out_6") { pantCol = "#090d16"; bootCol = "#ef4444"; }
    else if (outfitId === "b_out_7") { pantCol = "#1e3a8a"; bootCol = "#67e8f9"; }
    else if (outfitId === "b_out_8") { pantCol = "#2e1065"; bootCol = "#c084fc"; }
    else if (outfitId === "b_out_9") { pantCol = "#451a03"; bootCol = "#fde047"; }

    const legsSVG =
      '<g class="leg-l">' +
        '<rect x="69" y="156" width="15" height="24" rx="6" fill="' + pantCol + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<path d="M 66 176 L 85 176 L 86 190 L 64 190 C 64 182, 66 176, 66 176 Z" fill="' + bootCol + '" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round" />' +
        '<line x1="65" y1="186" x2="85" y2="186" stroke="' + shoeTrim + '" stroke-width="2.5" />' +
      '</g>' +
      '<g class="leg-r">' +
        '<rect x="96" y="156" width="15" height="24" rx="6" fill="' + pantCol + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<path d="M 95 176 L 114 176 L 116 190 L 94 190 C 94 182, 95 176, 95 176 Z" fill="' + bootCol + '" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round" />' +
        '<line x1="95" y1="186" x2="115" y2="186" stroke="' + shoeTrim + '" stroke-width="2.5" />' +
      '</g>';

    // Arms + Hands
    const sleeveCol = outfitId === "g_out_3" ? "#fef08a" : outfitId === "b_out_5" ? skin : primary;
    const armsSVG =
      '<g class="arm-l">' +
        '<rect x="46" y="116" width="14" height="34" rx="7" transform="rotate(15 53 116)" fill="' + sleeveCol + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<circle cx="45" cy="149" r="6.5" fill="' + skin + '" stroke="#0f172a" stroke-width="2.2" />' +
      '</g>' +
      '<g class="arm-r">' +
        '<rect x="120" y="116" width="14" height="34" rx="7" transform="rotate(-15 127 116)" fill="' + sleeveCol + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<circle cx="135" cy="149" r="6.5" fill="' + skin + '" stroke="#0f172a" stroke-width="2.2" />' +
      '</g>';

    // Bespoke Torso & Skirt/Armor Designs
    let torsoSVG = "";

    switch (outfitId) {
      case "g_out_1": // Starlight Tee + Pleated Skirt
        torsoSVG =
          '<path d="M 60 114 L 120 114 L 116 150 L 64 150 Z" fill="#ec4899" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />' +
          '<path d="M 76 114 Q 90 123 104 114" fill="none" stroke="#fbcfe8" stroke-width="3" />' +
          '<path d="M 62 148 L 118 148 L 126 168 L 54 168 Z" fill="#db2777" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />' +
          '<line x1="76" y1="149" x2="72" y2="167" stroke="#0f172a" stroke-width="2" />' +
          '<line x1="90" y1="149" x2="90" y2="167" stroke="#0f172a" stroke-width="2" />' +
          '<line x1="104" y1="149" x2="108" y2="167" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="90" cy="133" r="11" fill="#fce7f3" stroke="#f472b6" stroke-width="2" />' +
          '<text x="90" y="138" font-size="13" text-anchor="middle">⭐</text>';
        break;

      case "g_out_2": // Candy Hoodie (Hood collar, drawstrings, kangaroo pocket)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 118 164 L 62 164 Z" fill="#a855f7" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />' +
          '<path d="M 64 158 L 116 158 L 116 165 L 64 165 Z" fill="#fde047" stroke="#0f172a" stroke-width="2" />' +
          '<path d="M 70 144 L 110 144 L 114 157 L 66 157 Z" fill="#9333ea" stroke="#0f172a" stroke-width="2" />' +
          '<line x1="82" y1="115" x2="82" y2="132" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" />' +
          '<line x1="98" y1="115" x2="98" y2="132" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" />' +
          '<circle cx="82" cy="133" r="3" fill="#f472b6" />' +
          '<circle cx="98" cy="133" r="3" fill="#f472b6" />' +
          '<text x="90" y="140" font-size="14" text-anchor="middle">🍭</text>';
        break;

      case "g_out_3": // Explorer Overalls (Yellow shirt under teal denim bib & straps)
        torsoSVG =
          '<path d="M 60 114 L 120 114 L 116 164 L 64 164 Z" fill="#fef08a" stroke="#0f172a" stroke-width="2.8" />' +
          '<path d="M 64 128 L 116 128 L 116 166 L 64 166 Z" fill="#14b8a6" stroke="#0f172a" stroke-width="2.8" />' +
          '<rect x="68" y="113" width="9" height="20" fill="#14b8a6" stroke="#0f172a" stroke-width="2" />' +
          '<rect x="103" y="113" width="9" height="20" fill="#14b8a6" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="72.5" cy="128" r="3" fill="#fbbf24" stroke="#0f172a" stroke-width="1.2" />' +
          '<circle cx="107.5" cy="128" r="3" fill="#fbbf24" stroke="#0f172a" stroke-width="1.2" />' +
          '<rect x="77" y="135" width="26" height="20" rx="4" fill="#0d9488" stroke="#0f172a" stroke-width="2" />' +
          '<text x="90" y="150" font-size="13" text-anchor="middle">🧭</text>';
        break;

      case "g_out_4": // Astro-Valkyrie (Armored Pauldrons, Winged Chestplate, Pleated Battle Skirt)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 114 152 L 66 152 Z" fill="#0284c7" stroke="#0f172a" stroke-width="2.8" />' +
          '<path d="M 62 150 L 118 150 L 126 168 L 54 168 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />' +
          '<polygon points="66,150 90,166 114,150" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />' +
          '<path d="M 42 122 Q 56 106 72 118 L 62 128 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2" />' +
          '<path d="M 138 122 Q 124 106 108 118 L 118 128 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2" />' +
          '<polygon points="90,122 106,134 90,146 74,134" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />' +
          '<text x="90" y="139" font-size="12" text-anchor="middle">🚀</text>';
        break;

      case "g_out_5": // Crystal Ballgown (Puff shoulders, corset bodice, sweeping layered ballgown skirt)
        torsoSVG =
          '<path d="M 64 114 L 116 114 L 108 146 L 72 146 Z" fill="#a855f7" stroke="#0f172a" stroke-width="2.6" />' +
          '<path d="M 70 144 C 46 152, 42 178, 48 184 L 132 184 C 138 178, 134 152, 110 144 Z" fill="#c084fc" stroke="#0f172a" stroke-width="2.8" />' +
          '<path d="M 52 172 Q 70 162 90 174 Q 110 162 128 172" fill="none" stroke="#fdf4ff" stroke-width="3" />' +
          '<circle cx="56" cy="120" r="10" fill="#e879f9" stroke="#0f172a" stroke-width="2.2" />' +
          '<circle cx="124" cy="120" r="10" fill="#e879f9" stroke="#0f172a" stroke-width="2.2" />' +
          '<polygon points="90,120 100,132 90,144 80,132" fill="#fdf4ff" stroke="#e879f9" stroke-width="2" />' +
          '<text x="90" y="137" font-size="12" text-anchor="middle">💎</text>';
        break;

      case "g_out_6": // Cyber-Ninja Suit (Stealth black armor, neon cyan X-harness & high scarf collar)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 114 166 L 66 166 Z" fill="#0f172a" stroke="#22d3ee" stroke-width="2.5" />' +
          '<line x1="64" y1="118" x2="114" y2="162" stroke="#22d3ee" stroke-width="3.5" />' +
          '<line x1="116" y1="118" x2="66" y2="162" stroke="#22d3ee" stroke-width="3.5" />' +
          '<rect x="64" y="152" width="52" height="8" rx="3" fill="#22d3ee" stroke="#0f172a" stroke-width="2" />' +
          '<path d="M 68 109 L 112 109 L 106 122 L 74 122 Z" fill="#06b6d4" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="90" cy="138" r="11" fill="#090d16" stroke="#22d3ee" stroke-width="2" />' +
          '<text x="90" y="143" font-size="12" text-anchor="middle">⚡</text>';
        break;

      case "g_out_7": // Solar Empress (Golden Sun-Armor Bodice & Layered Flame Gown)
        torsoSVG =
          '<path d="M 62 114 L 118 114 L 110 146 L 70 146 Z" fill="#ea580c" stroke="#7c2d12" stroke-width="2.8" />' +
          '<path d="M 66 144 L 114 144 L 128 180 L 52 180 Z" fill="#f97316" stroke="#7c2d12" stroke-width="2.8" />' +
          '<polygon points="70,144 90,176 110,144" fill="#fde047" stroke="#b45309" stroke-width="2" />' +
          '<circle cx="90" cy="131" r="12" fill="#fde047" stroke="#ffffff" stroke-width="2" />' +
          '<text x="90" y="136" font-size="13" text-anchor="middle">☀️</text>';
        break;

      case "g_out_8": // Starlight Seraph (Celestial Tunic, Golden Sash & Winged Brooch)
        torsoSVG =
          '<path d="M 60 114 L 120 114 L 124 172 L 56 172 Z" fill="#4f46e5" stroke="#1e1b4b" stroke-width="2.8" />' +
          '<path d="M 74 114 L 106 114 L 112 172 L 68 172 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" />' +
          '<rect x="64" y="144" width="52" height="7" rx="3" fill="#fde047" stroke="#b45309" stroke-width="1.5" />' +
          '<circle cx="90" cy="130" r="11" fill="#6366f1" stroke="#bae6fd" stroke-width="2" />' +
          '<text x="90" y="135" font-size="12" text-anchor="middle">🪽</text>';
        break;

      case "g_out_9": // Cosmic Nova Queen (Nebula Royal Gown & Orbiting Starlight Belt)
        torsoSVG =
          '<path d="M 62 114 L 118 114 L 110 146 L 70 146 Z" fill="#581c87" stroke="#f472b6" stroke-width="2.6" />' +
          '<path d="M 66 144 C 48 154, 44 178, 50 184 L 130 184 C 136 178, 132 154, 114 144 Z" fill="#7e22ce" stroke="#f472b6" stroke-width="2.6" />' +
          '<ellipse cx="90" cy="146" rx="28" ry="6" fill="none" stroke="#fde047" stroke-width="2.5" />' +
          '<circle cx="62" cy="166" r="2.5" fill="#fde047" />' +
          '<circle cx="114" cy="162" r="2" fill="#ffffff" />' +
          '<circle cx="90" cy="130" r="12" fill="#f472b6" stroke="#fde047" stroke-width="2" />' +
          '<text x="90" y="135" font-size="13" text-anchor="middle">🌌</text>';
        break;

      case "b_out_1": // Cadet Crew Tee (Shoulder Epaulettes & Belt)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 115 164 L 65 164 Z" fill="#0284c7" stroke="#0f172a" stroke-width="2.8" />' +
          '<rect x="56" y="112" width="16" height="7" rx="3" fill="#fde047" stroke="#0f172a" stroke-width="2" />' +
          '<rect x="108" y="112" width="16" height="7" rx="3" fill="#fde047" stroke="#0f172a" stroke-width="2" />' +
          '<rect x="64" y="154" width="52" height="8" rx="2" fill="#0f172a" />' +
          '<rect x="84" y="153" width="12" height="10" rx="2" fill="#fbbf24" />' +
          '<circle cx="90" cy="136" r="12" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />' +
          '<text x="90" y="141" font-size="13" text-anchor="middle">⚓</text>';
        break;

      case "b_out_2": // Velocity Racing Jacket (Popped Collar, Dual Yellow Racing Stripes & Zipper)
        torsoSVG =
          '<path d="M 68 106 L 112 106 L 118 118 L 62 118 Z" fill="#991b1b" stroke="#0f172a" stroke-width="2.5" />' +
          '<path d="M 56 114 L 124 114 L 116 164 L 64 164 Z" fill="#dc2626" stroke="#0f172a" stroke-width="2.8" />' +
          '<rect x="68" y="115" width="7" height="48" fill="#facc15" />' +
          '<rect x="105" y="115" width="7" height="48" fill="#facc15" />' +
          '<line x1="90" y1="115" x2="90" y2="163" stroke="#0f172a" stroke-width="2.5" />' +
          '<circle cx="90" cy="136" r="11" fill="#0f172a" stroke="#facc15" stroke-width="2" />' +
          '<text x="90" y="141" font-size="12" text-anchor="middle">🏎️</text>';
        break;

      case "b_out_3": // Jungle Ranger (Khaki Explorer Vest, Cargo Pockets & Neck Bandana)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 115 164 L 65 164 Z" fill="#a3e635" stroke="#0f172a" stroke-width="2.8" />' +
          '<path d="M 58 114 L 82 114 L 80 164 L 63 164 Z" fill="#15803d" stroke="#0f172a" stroke-width="2.5" />' +
          '<path d="M 98 114 L 122 114 L 117 164 L 100 164 Z" fill="#15803d" stroke="#0f172a" stroke-width="2.5" />' +
          '<polygon points="72,113 108,113 90,128" fill="#ef4444" stroke="#0f172a" stroke-width="2" />' +
          '<rect x="65" y="142" width="13" height="14" rx="2" fill="#166534" stroke="#0f172a" stroke-width="1.8" />' +
          '<rect x="102" y="142" width="13" height="14" rx="2" fill="#166534" stroke="#0f172a" stroke-width="1.8" />' +
          '<text x="90" y="148" font-size="14" text-anchor="middle">🦖</text>';
        break;

      case "b_out_4": // Orbital Armor (Heavy Titanium Pauldrons & Glowing Arc Core)
        torsoSVG =
          '<path d="M 54 114 L 126 114 L 116 165 L 64 165 Z" fill="#334155" stroke="#0f172a" stroke-width="3" />' +
          '<path d="M 62 118 L 118 118 L 110 146 L 70 146 Z" fill="#475569" stroke="#38bdf8" stroke-width="2" />' +
          '<ellipse cx="52" cy="122" rx="14" ry="10" fill="#475569" stroke="#0f172a" stroke-width="2.5" />' +
          '<ellipse cx="128" cy="122" rx="14" ry="10" fill="#475569" stroke="#0f172a" stroke-width="2.5" />' +
          '<rect x="64" y="153" width="52" height="9" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />' +
          '<circle cx="90" cy="133" r="11" fill="#0284c7" stroke="#e0f2fe" stroke-width="2.5" />' +
          '<text x="90" y="138" font-size="12" text-anchor="middle">🛡️</text>';
        break;

      case "b_out_5": // Dino-Hunter Gear (Scale Pauldron, Claw Bandolier & Bone Buckle)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 115 165 L 65 165 Z" fill="#92400e" stroke="#0f172a" stroke-width="2.8" />' +
          '<line x1="62" y1="116" x2="114" y2="162" stroke="#451a03" stroke-width="7" />' +
          '<polygon points="72,122 78,118 80,128" fill="#fef3c7" stroke="#0f172a" stroke-width="1.2" />' +
          '<polygon points="84,132 90,128 92,138" fill="#fef3c7" stroke="#0f172a" stroke-width="1.2" />' +
          '<polygon points="96,142 102,138 104,148" fill="#fef3c7" stroke="#0f172a" stroke-width="1.2" />' +
          '<ellipse cx="54" cy="120" rx="13" ry="9" fill="#15803d" stroke="#0f172a" stroke-width="2.2" />' +
          '<rect x="64" y="154" width="52" height="9" rx="3" fill="#451a03" stroke="#fbbf24" stroke-width="2" />' +
          '<text x="90" y="142" font-size="14" text-anchor="middle">🦴</text>';
        break;

      case "b_out_6": // Shadow Shinobi (Black Anbu Chestplate, Red Sash & High Ninja Mask Collar)
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 114 165 L 66 165 Z" fill="#0f172a" stroke="#020617" stroke-width="2.8" />' +
          '<path d="M 64 118 L 116 118 L 110 150 L 70 150 Z" fill="#1e293b" stroke="#475569" stroke-width="2" />' +
          '<rect x="65" y="152" width="50" height="9" rx="3" fill="#ef4444" stroke="#0f172a" stroke-width="2" />' +
          '<path d="M 68 108 L 112 108 L 106 121 L 74 121 Z" fill="#dc2626" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="90" cy="135" r="11" fill="#090d16" stroke="#ef4444" stroke-width="2" />' +
          '<text x="90" y="140" font-size="12" text-anchor="middle">🥷</text>';
        break;

      case "b_out_7": // Plasma Mecha-Knight (Angular Gundam Chest Vents & Glowing Reactor)
        torsoSVG =
          '<path d="M 54 114 L 126 114 L 116 166 L 64 166 Z" fill="#1d4ed8" stroke="#0f172a" stroke-width="3" />' +
          '<polygon points="40,124 62,108 66,130 46,134" fill="#eff6ff" stroke="#0f172a" stroke-width="2.5" />' +
          '<polygon points="140,124 118,108 114,130 134,134" fill="#eff6ff" stroke="#0f172a" stroke-width="2.5" />' +
          '<polygon points="66,120 84,126 84,134 66,130" fill="#fde047" />' +
          '<polygon points="114,120 96,126 96,134 114,130" fill="#fde047" />' +
          '<polygon points="74,152 90,166 106,152" fill="#eff6ff" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="90" cy="138" r="11" fill="#67e8f9" stroke="#ffffff" stroke-width="2.5" />' +
          '<text x="90" y="143" font-size="12" text-anchor="middle">🤖</text>';
        break;

      case "b_out_8": // Void Dragon Lord (Spiked Dragon-ScalePauldrons & Abyssal Core)
        torsoSVG =
          '<path d="M 56 114 L 124 114 L 115 166 L 65 166 Z" fill="#4c1d95" stroke="#0f172a" stroke-width="3" />' +
          '<path d="M 42 124 L 58 106 L 68 126 Z" fill="#a855f7" stroke="#0f172a" stroke-width="2.2" />' +
          '<path d="M 138 124 L 122 106 L 112 126 Z" fill="#a855f7" stroke="#0f172a" stroke-width="2.2" />' +
          '<path d="M 72 120 L 90 132 L 108 120" fill="none" stroke="#e9d5ff" stroke-width="3" />' +
          '<path d="M 74 148 L 90 158 L 106 148" fill="none" stroke="#e9d5ff" stroke-width="3" />' +
          '<circle cx="90" cy="138" r="11" fill="#2e1065" stroke="#c084fc" stroke-width="2.5" />' +
          '<text x="90" y="143" font-size="12" text-anchor="middle">🐉</text>';
        break;

      case "b_out_9": // Hyper-Nova Emperor (Golden Sun-Plate Armor & Royal Sash)
        torsoSVG =
          '<path d="M 54 114 L 126 114 L 116 166 L 64 166 Z" fill="#b45309" stroke="#451a03" stroke-width="3" />' +
          '<path d="M 62 116 L 118 116 L 108 156 L 72 156 Z" fill="#f59e0b" stroke="#fef08a" stroke-width="2" />' +
          '<ellipse cx="52" cy="120" rx="15" ry="10" fill="#fde047" stroke="#78350f" stroke-width="2.5" />' +
          '<ellipse cx="128" cy="120" rx="15" ry="10" fill="#fde047" stroke="#78350f" stroke-width="2.5" />' +
          '<circle cx="90" cy="136" r="12" fill="#fef08a" stroke="#ffffff" stroke-width="2.5" />' +
          '<text x="90" y="141" font-size="13" text-anchor="middle">👑</text>';
        break;

      default:
        torsoSVG =
          '<path d="M 58 114 L 122 114 L 114 166 L 66 166 Z" fill="' + primary + '" stroke="#0f172a" stroke-width="3" />' +
          '<circle cx="90" cy="140" r="13" fill="' + accent + '" />' +
          '<text x="90" y="145" font-size="13" text-anchor="middle">' + badge + '</text>';
    }

    return legsSVG + armsSVG + torsoSVG;
  }

  // Build Volumetric, Properly-Fitted Hair Back & Front Layers (All 18 Styles)
  function buildHairLayers(style, gender, activeHairColor, accent, hairFx) {
    let back = "";
    let front = "";

    // Universal Specular Hair Shine Ribbon along the Crown
    const shineArc =
      '<path d="M 64 52 Q 90 42 116 52" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.32" />';

    if (gender === "girl") {
      switch (style) {
        case "pigtails":
          back =
            // Full back-of-head volume + high twin tails with hair scrunchies
            '<ellipse cx="90" cy="74" rx="39" ry="36" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<path d="M 48 64 C 20 62, 14 108, 32 138 C 46 132, 52 104, 52 74 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />' +
            '<path d="M 132 64 C 160 62, 166 108, 148 138 C 134 132, 128 104, 128 74 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" stroke-linejoin="round" />' +
            '<circle cx="49" cy="67" r="7.5" fill="' + accent + '" stroke="#0f172a" stroke-width="2" />' +
            '<circle cx="131" cy="67" r="7.5" fill="' + accent + '" stroke="#0f172a" stroke-width="2" />';
          front =
            '<path d="M 52 84 C 48 44, 72 34, 90 34 C 108 34, 132 44, 128 84 C 124 66, 114 58, 98 64 C 92 52, 86 62, 76 62 C 64 62, 56 68, 52 84 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" stroke-linejoin="round" />' +
            shineArc;
          break;

        case "ponytail":
          back =
            '<ellipse cx="90" cy="74" rx="39" ry="36" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<path d="M 104 46 C 142 34, 166 78, 146 124 C 130 116, 132 82, 112 64 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<ellipse cx="112" cy="50" rx="8" ry="6" transform="rotate(25 112 50)" fill="' + accent + '" stroke="#0f172a" stroke-width="2" />';
          front =
            '<path d="M 52 84 C 48 44, 72 34, 90 34 C 108 34, 132 44, 128 84 C 122 62, 102 54, 78 64 C 64 68, 56 72, 52 84 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            shineArc;
          break;

        case "bob":
          back =
            '<path d="M 46 80 C 42 40, 68 32, 90 32 C 112 32, 138 40, 134 80 C 138 106, 126 118, 112 116 L 68 116 C 54 118, 42 106, 46 80 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />';
          front =
            '<path d="M 48 106 C 44 68, 52 36, 90 36 C 128 36, 136 68, 132 106 C 124 92, 122 72, 114 62 C 98 66, 78 64, 66 58 C 58 70, 56 92, 48 106 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            '<rect x="112" y="60" width="12" height="5" rx="2.5" transform="rotate(18 118 62)" fill="' + accent + '" stroke="#0f172a" stroke-width="1.5" />' +
            shineArc;
          break;

        case "buns":
          back =
            '<ellipse cx="90" cy="74" rx="39" ry="36" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<circle cx="52" cy="44" r="19" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<circle cx="128" cy="44" r="19" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<path d="M 42 40 A 12 12 0 0 1 58 34" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.35" />' +
            '<path d="M 118 40 A 12 12 0 0 1 134 34" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.35" />' +
            '<circle cx="58" cy="54" r="5" fill="' + accent + '" />' +
            '<circle cx="122" cy="54" r="5" fill="' + accent + '" />';
          front =
            '<path d="M 52 86 C 48 44, 72 34, 90 34 C 108 34, 132 44, 128 86 C 122 66, 108 62, 90 54 C 72 62, 58 66, 52 86 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            shineArc;
          break;

        case "braids":
          back =
            '<ellipse cx="90" cy="74" rx="39" ry="36" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            // Left & Right Thick Textured Braids Resting Over Shoulders
            '<g fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.4">' +
              '<circle cx="52" cy="96" r="10" /><circle cx="50" cy="110" r="9.5" /><circle cx="49" cy="124" r="8.5" /><circle cx="48" cy="136" r="7" />' +
              '<circle cx="128" cy="96" r="10" /><circle cx="130" cy="110" r="9.5" /><circle cx="131" cy="124" r="8.5" /><circle cx="132" cy="136" r="7" />' +
            '</g>' +
            '<circle cx="48" cy="142" r="4.5" fill="' + accent + '" stroke="#0f172a" stroke-width="1.5" />' +
            '<circle cx="132" cy="142" r="4.5" fill="' + accent + '" stroke="#0f172a" stroke-width="1.5" />';
          front =
            '<path d="M 52 84 C 48 44, 72 34, 90 34 C 108 34, 132 44, 128 84 C 120 64, 106 58, 90 58 C 74 58, 60 64, 52 84 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            // Braided Crown Halo Band Across Top
            '<path d="M 56 56 Q 90 42 124 56" fill="none" stroke="#fde047" stroke-width="4" stroke-dasharray="7 5" />' +
            shineArc;
          break;

        case "drills":
          back =
            '<ellipse cx="90" cy="74" rx="39" ry="36" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            // Tiered Princess Spiral Drill Curls
            '<g fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.4">' +
              '<path d="M 38 72 L 56 78 L 52 94 L 34 88 Z" />' +
              '<path d="M 34 92 L 52 98 L 48 114 L 30 108 Z" />' +
              '<path d="M 32 112 L 48 118 L 40 138 L 28 126 Z" />' +
              '<path d="M 142 72 L 124 78 L 128 94 L 146 88 Z" />' +
              '<path d="M 146 92 L 128 98 L 132 114 L 150 108 Z" />' +
              '<path d="M 148 112 L 132 118 L 140 138 L 152 126 Z" />' +
            '</g>';
          front =
            '<path d="M 52 84 C 48 44, 72 34, 90 34 C 108 34, 132 44, 128 84 C 118 62, 102 62, 90 54 C 78 62, 62 62, 52 84 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            '<polygon points="48,66 36,60 38,74" fill="' + accent + '" stroke="#0f172a" stroke-width="1.8" />' +
            '<polygon points="132,66 144,60 142,74" fill="' + accent + '" stroke="#0f172a" stroke-width="1.8" />' +
            shineArc;
          break;

        case "starlight":
        case "prism":
          back =
            '<path d="M 48 68 C 24 102, 26 156, 52 172 C 72 158, 108 158, 128 172 C 154 156, 156 102, 132 68 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<circle cx="44" cy="124" r="3.5" fill="#ffffff" />' +
            '<circle cx="136" cy="116" r="4" fill="#fde047" />' +
            '<circle cx="52" cy="148" r="2.5" fill="#fde047" />' +
            '<circle cx="128" cy="144" r="3" fill="#ffffff" />';
          front =
            '<path d="M 50 92 C 46 42, 70 32, 90 32 C 110 32, 134 42, 130 92 C 122 66, 108 58, 90 52 C 72 58, 58 66, 50 92 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            shineArc;
          break;

        case "flame":
          back =
            '<g style="transform-origin:90px 90px;animation:avFlameFlicker 0.35s infinite alternate;">' +
              '<path d="M 46 76 C 22 48, 30 14, 54 28 C 66 4, 90 2, 90 22 C 90 2, 114 4, 126 28 C 150 14, 158 48, 134 76 C 152 114, 142 154, 120 164 C 102 148, 78 148, 60 164 C 38 154, 28 114, 46 76 Z" fill="#ea580c" stroke="#fde047" stroke-width="2.5" />' +
            '</g>';
          front =
            '<g style="transform-origin:90px 55px;animation:avFlameFlicker 0.3s infinite alternate;">' +
              '<path d="M 50 84 C 44 42, 66 24, 76 12 C 84 28, 92 8, 102 24 C 114 12, 134 42, 130 84 C 118 60, 104 56, 90 52 C 76 56, 62 60, 50 84 Z" fill="#f97316" stroke="#fde047" stroke-width="2.5" />' +
            '</g>';
          break;

        default:
          back = '<ellipse cx="90" cy="74" rx="39" ry="36" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />';
          front = '<path d="M 52 84 C 48 44, 72 34, 90 34 C 108 34, 132 44, 128 84 C 118 60, 62 60, 52 84 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' + shineArc;
      }
    } else {
      // BOY HAIRSTYLES (All 9 Volumetric Styles)
      switch (style) {
        case "sweep":
          back = '<ellipse cx="90" cy="72" rx="38" ry="34" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />';
          front =
            '<path d="M 52 82 C 48 42, 72 32, 96 34 C 118 34, 136 44, 130 82 C 124 64, 114 58, 96 62 C 78 66, 62 62, 52 82 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" stroke-linejoin="round" />' +
            shineArc;
          break;

        case "spiky":
          back = '<ellipse cx="90" cy="72" rx="37" ry="33" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />';
          front =
            '<path d="M 52 82 L 42 52 L 62 56 L 64 28 L 84 46 L 96 22 L 110 46 L 130 32 L 122 58 L 138 56 L 128 82 C 118 62, 102 58, 90 58 C 78 58, 62 62, 52 82 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" stroke-linejoin="round" />' +
            shineArc;
          break;

        case "shag":
          back =
            '<path d="M 46 78 C 40 38, 68 32, 90 32 C 112 32, 140 38, 134 78 C 138 98, 130 110, 120 106 L 60 106 C 50 110, 42 98, 46 78 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />';
          front =
            '<path d="M 48 92 C 44 46, 66 34, 90 34 C 114 34, 136 46, 132 92 C 124 74, 114 66, 100 68 C 88 70, 74 64, 62 68 C 54 72, 52 82, 48 92 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            shineArc;
          break;

        case "mohawk":
          back =
            // Shaved fade sides + tall multi-blade cyberpunk mohawk crest
            '<ellipse cx="90" cy="74" rx="35" ry="30" fill="#334155" opacity="0.35" />';
          front =
            '<path d="M 74 62 L 64 26 L 82 34 L 90 10 L 98 34 L 116 26 L 106 62 C 98 54, 82 54, 74 62 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" stroke-linejoin="round" />' +
            '<path d="M 78 56 L 90 18 L 102 56" fill="none" stroke="' + accent + '" stroke-width="2.5" />';
          break;

        case "topknot":
          back =
            '<ellipse cx="90" cy="72" rx="37" ry="33" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            '<circle cx="90" cy="26" r="15" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.8" />' +
            '<path d="M 88 12 C 108 6, 122 18, 114 32" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.5" />' +
            '<rect x="78" y="34" width="24" height="6" rx="3" fill="' + accent + '" stroke="#0f172a" stroke-width="1.8" />';
          front =
            '<path d="M 52 82 C 50 44, 72 36, 90 36 C 108 36, 130 44, 128 82 C 120 62, 104 56, 90 56 C 76 56, 60 62, 52 82 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' +
            shineArc;
          break;

        case "anime":
        case "plasma":
        case "solar":
        case "cosmic":
          const isFire = style === "solar" || style === "plasma";
          const strokeCol = isFire ? "#fde047" : "#0f172a";
          const animWrapStart = isFire ? '<g style="transform-origin:90px 55px;animation:avFlameFlicker 0.32s infinite alternate;">' : "";
          const animWrapEnd = isFire ? "</g>" : "";
          back =
            '<path d="M 46 84 L 26 64 L 46 54 L 32 28 L 64 42 L 116 42 L 148 28 L 134 54 L 154 64 L 134 84 Z" fill="' + activeHairColor + '" stroke="' + strokeCol + '" stroke-width="2.5" stroke-linejoin="round" />';
          front =
            animWrapStart +
            '<path d="M 50 84 L 34 48 L 58 52 L 56 18 L 80 42 L 92 8 L 106 42 L 130 18 L 122 52 L 146 48 L 130 84 C 118 60, 104 56, 90 56 C 76 56, 62 60, 50 84 Z" fill="' + activeHairColor + '" stroke="' + strokeCol + '" stroke-width="2.6" stroke-linejoin="round" />' +
            shineArc +
            animWrapEnd;
          break;

        default:
          back = '<ellipse cx="90" cy="72" rx="38" ry="34" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />';
          front = '<path d="M 52 82 C 48 42, 72 34, 90 34 C 108 34, 132 42, 128 82 C 118 60, 62 60, 52 82 Z" fill="' + activeHairColor + '" stroke="#0f172a" stroke-width="2.6" />' + shineArc;
      }
    }

    return { back, front };
  }

  // Headgear / Crowns / Tiara / Helmets per Insane Outfit or Halo Tier
  function buildHeadgearOverlay(outfitId, hairFx) {
    let svg = "";
    if (outfitId === "g_out_7") {
      // Solar Empress Sun Crown
      svg += '<polygon points="66,38 74,16 84,30 90,10 96,30 106,16 114,38" fill="#fde047" stroke="#b45309" stroke-width="2.2" />';
    } else if (outfitId === "g_out_9" || outfitId === "b_out_9") {
      // Cosmic / Emperor Royal Crown
      svg +=
        '<polygon points="68,38 72,18 84,28 90,12 96,28 108,18 112,38" fill="#fde047" stroke="#0f172a" stroke-width="2.2" />' +
        '<circle cx="90" cy="26" r="4" fill="#ec4899" />';
    } else if (outfitId === "b_out_7") {
      // Plasma Mecha-Knight Gundam V-Fin Crest
      svg +=
        '<polygon points="90,46 56,22 62,16 90,36 118,16 124,22" fill="#fde047" stroke="#0f172a" stroke-width="2" />' +
        '<rect x="85" y="32" width="10" height="14" rx="2" fill="#ef4444" stroke="#0f172a" stroke-width="1.8" />';
    } else if (outfitId === "b_out_8") {
      // Void Dragon Lord Curved Horns
      svg +=
        '<path d="M 64 44 C 44 30, 38 12, 52 8 C 52 22, 62 32, 72 38 Z" fill="#e9d5ff" stroke="#3b0764" stroke-width="2.2" />' +
        '<path d="M 116 44 C 136 30, 142 12, 128 8 C 128 22, 118 32, 108 38 Z" fill="#e9d5ff" stroke="#3b0764" stroke-width="2.2" />';
    }

    if (hairFx === "rainbow") {
      svg += '<ellipse cx="90" cy="18" rx="30" ry="7" fill="none" stroke="#fde047" stroke-width="4" filter="drop-shadow(0 0 6px #fde047)" />';
    }
    return svg;
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

    const outfitId = outfitObj ? outfitObj.id : gender === "girl" ? "g_out_1" : "b_out_1";
    const primary = outfitObj ? outfitObj.primary : "#0284c7";
    const accent = outfitObj ? outfitObj.accent : "#38bdf8";
    const badge = outfitObj ? outfitObj.badge : "⭐";
    const outfitFx = outfitObj ? outfitObj.fx : null;
    const style = hairObj ? hairObj.style : gender === "girl" ? "pigtails" : "sweep";
    const hairFx = hairObj ? hairObj.fx : null;

    const hairExtraClass = hairFx === "rainbow" ? ' style="animation: avRainbowCycle 3s linear infinite;"' : "";
    const activeHairColor = hairFx === "fire" ? "#f97316" : hairFx === "sparkle" ? "#38bdf8" : hairColor;

    const backFxSVG = buildOutfitBackLayer(outfitId, primary, accent, outfitFx);
    const hairLayers = buildHairLayers(style, gender, activeHairColor, accent, hairFx);
    const bodySVG = buildOutfitBodyLayer(outfitId, gender, primary, accent, badge, skin);
    const headgearSVG = buildHeadgearOverlay(outfitId, hairFx);

    // Expressive Anime-Style Layered Eyes (Iris + Pupil + Dual Catchlights)
    const eyeColor = gender === "girl" ? "#0284c7" : "#059669";
    const lashes =
      gender === "girl"
        ? '<path d="M 67 76 Q 76 70 84 76" fill="none" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" />' +
          '<path d="M 96 76 Q 104 70 113 76" fill="none" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" />' +
          '<line x1="68" y1="75" x2="64" y2="72" stroke="#0f172a" stroke-width="2.2" stroke-linecap="round" />' +
          '<line x1="112" y1="75" x2="116" y2="72" stroke="#0f172a" stroke-width="2.2" stroke-linecap="round" />'
        : '<path d="M 68 73 L 84 75" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" />' +
          '<path d="M 112 73 L 96 75" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" />';

    // Foreground Cosmic Orbit Ring (passes in front of waist)
    const frontCosmicRing =
      outfitFx === "cosmic"
        ? '<g style="transform-origin:90px 124px;animation:avOrbitSpin 5s linear infinite;">' +
            '<ellipse cx="90" cy="124" rx="68" ry="16" fill="none" stroke="' + accent + '" stroke-width="2.5" stroke-dasharray="10 6" />' +
            '<circle cx="22" cy="124" r="6" fill="#fde047" stroke="#ffffff" stroke-width="1.5" />' +
            '<circle cx="158" cy="124" r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />' +
          '</g>'
        : "";

    const runClass = isRunning ? "av-running" : "";

    return (
      '<svg class="' + runClass + '" viewBox="0 0 180 205" style="width:' + width + "px;height:" + height + 'px;overflow:visible;">' +
        // Ground Contact Shadow
        '<ellipse cx="90" cy="192" rx="38" ry="7" fill="rgba(0,0,0,0.38)" />' +
        backFxSVG +
        '<g' + hairExtraClass + ">" + hairLayers.back + "</g>" +
        // Neck with Chin Shadow
        '<rect x="82" y="104" width="16" height="14" rx="4" fill="' + skin + '" stroke="#0f172a" stroke-width="2.5" />' +
        bodySVG +
        // Ears
        '<circle cx="56" cy="82" r="6.5" fill="' + skin + '" stroke="#0f172a" stroke-width="2.5" />' +
        '<circle cx="124" cy="82" r="6.5" fill="' + skin + '" stroke="#0f172a" stroke-width="2.5" />' +
        // Sculpted Head
        '<circle cx="90" cy="78" r="33" fill="' + skin + '" stroke="#0f172a" stroke-width="3" />' +
        // Rosy Blush Cheeks
        '<ellipse cx="68" cy="88" rx="5.5" ry="3" fill="#f43f5e" opacity="0.38" />' +
        '<ellipse cx="112" cy="88" rx="5.5" ry="3" fill="#f43f5e" opacity="0.38" />' +
        // Animated Blinking Eyes Group
        '<g class="av-eyes-blink">' +
          '<ellipse cx="76" cy="81" rx="6" ry="6.8" fill="#ffffff" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="76" cy="81.5" r="4.5" fill="' + eyeColor + '" />' +
          '<circle cx="76" cy="81.5" r="2.5" fill="#0f172a" />' +
          '<circle cx="74" cy="79" r="1.8" fill="#ffffff" />' +
          '<circle cx="78" cy="83.5" r="1" fill="#ffffff" />' +

          '<ellipse cx="104" cy="81" rx="6" ry="6.8" fill="#ffffff" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="104" cy="81.5" r="4.5" fill="' + eyeColor + '" />' +
          '<circle cx="104" cy="81.5" r="2.5" fill="#0f172a" />' +
          '<circle cx="102" cy="79" r="1.8" fill="#ffffff" />' +
          '<circle cx="106" cy="83.5" r="1" fill="#ffffff" />' +
          lashes +
        '</g>' +
        // Cute Nose & Happy Smile
        '<path d="M 89 85 Q 91 87 89 88" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" opacity="0.6" />' +
        '<path d="M 82 93 Q 90 100 98 93" fill="none" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" />' +
        // Hair Front Bangs & Side Locks
        '<g' + hairExtraClass + ">" + hairLayers.front + "</g>" +
        headgearSVG +
        frontCosmicRing +
      "</svg>"
    );
  }

  // Custom Vector-Illustrated SVG Pets for all 9 Pet IDs
  function renderPetSVG(petId, size = 72) {
    if (!petId || !window.Economy) return "";
    const pet = window.Economy.getItemById(petId);
    if (!pet) return "";

    let art = "";
    switch (petId) {
      case "pet_1": // Astro-Pup (Golden Retriever Puppy in Glass Space Helmet)
        art =
          '<ellipse cx="50" cy="72" rx="22" ry="16" fill="#f59e0b" stroke="#0f172a" stroke-width="3" />' +
          '<circle cx="38" cy="84" r="6" fill="#fef3c7" stroke="#0f172a" stroke-width="2.5" />' +
          '<circle cx="62" cy="84" r="6" fill="#fef3c7" stroke="#0f172a" stroke-width="2.5" />' +
          '<path d="M 68 68 Q 84 58 78 76" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" />' +
          '<rect x="34" y="56" width="32" height="7" rx="3" fill="#ef4444" stroke="#0f172a" stroke-width="2" />' +
          '<path d="M 24 38 C 16 48, 20 62, 30 56 Z" fill="#b45309" stroke="#0f172a" stroke-width="2.5" />' +
          '<path d="M 76 38 C 84 48, 80 62, 70 56 Z" fill="#b45309" stroke="#0f172a" stroke-width="2.5" />' +
          '<circle cx="50" cy="42" r="21" fill="#fbbf24" stroke="#0f172a" stroke-width="3" />' +
          '<ellipse cx="50" cy="47" rx="9" ry="7" fill="#fef3c7" />' +
          '<circle cx="42" cy="39" r="3.8" fill="#0f172a" /><circle cx="41" cy="37.5" r="1.3" fill="#ffffff" />' +
          '<circle cx="58" cy="39" r="3.8" fill="#0f172a" /><circle cx="57" cy="37.5" r="1.3" fill="#ffffff" />' +
          '<ellipse cx="50" cy="44" rx="4" ry="3" fill="#0f172a" />' +
          // Glass Space Helmet Bubble
          '<circle cx="50" cy="42" r="28" fill="rgba(186,230,253,0.22)" stroke="#38bdf8" stroke-width="2.5" />' +
          '<path d="M 32 26 A 20 20 0 0 1 58 20" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75" />';
        break;

      case "pet_2": // Star-Cat (Pink Cosmic Kitten with Star Gem & Curled Tail)
        art =
          '<path d="M 68 74 C 86 68, 88 46, 74 48" fill="none" stroke="#f472b6" stroke-width="6" stroke-linecap="round" />' +
          '<ellipse cx="50" cy="72" rx="20" ry="15" fill="#f472b6" stroke="#0f172a" stroke-width="3" />' +
          '<polygon points="28,42 26,18 44,30" fill="#f472b6" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />' +
          '<polygon points="31,38 30,24 41,32" fill="#fce7f3" />' +
          '<polygon points="72,42 74,18 56,30" fill="#f472b6" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />' +
          '<polygon points="69,38 70,24 59,32" fill="#fce7f3" />' +
          '<circle cx="50" cy="45" r="21" fill="#f9a8d4" stroke="#0f172a" stroke-width="3" />' +
          '<polygon points="50,27 52,32 57,32 53,35 55,40 50,37 45,40 47,35 43,32 48,32" fill="#fde047" />' +
          '<circle cx="41" cy="45" r="4" fill="#0f172a" /><circle cx="39.5" cy="43.5" r="1.5" fill="#ffffff" />' +
          '<circle cx="59" cy="45" r="4" fill="#0f172a" /><circle cx="57.5" cy="43.5" r="1.5" fill="#ffffff" />' +
          '<polygon points="48,50 52,50 50,53" fill="#db2777" />' +
          '<line x1="22" y1="47" x2="32" y2="49" stroke="#0f172a" stroke-width="2" />' +
          '<line x1="78" y1="47" x2="68" y2="49" stroke="#0f172a" stroke-width="2" />';
        break;

      case "pet_3": // Lunar Bunny (Long-Eared Moon Rabbit with Crescent Crest)
        art =
          '<ellipse cx="38" cy="24" rx="7" ry="19" transform="rotate(-12 38 24)" fill="#f8fafc" stroke="#0f172a" stroke-width="2.8" />' +
          '<ellipse cx="38" cy="25" rx="3.5" ry="13" transform="rotate(-12 38 25)" fill="#fbcfe8" />' +
          '<ellipse cx="62" cy="24" rx="7" ry="19" transform="rotate(12 62 24)" fill="#f8fafc" stroke="#0f172a" stroke-width="2.8" />' +
          '<ellipse cx="62" cy="25" rx="3.5" ry="13" transform="rotate(12 62 25)" fill="#fbcfe8" />' +
          '<circle cx="72" cy="74" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" />' +
          '<ellipse cx="50" cy="72" rx="20" ry="16" fill="#f1f5f9" stroke="#0f172a" stroke-width="3" />' +
          '<circle cx="50" cy="48" r="20" fill="#ffffff" stroke="#0f172a" stroke-width="3" />' +
          '<circle cx="42" cy="47" r="3.8" fill="#e11d48" /><circle cx="40.5" cy="45.5" r="1.4" fill="#ffffff" />' +
          '<circle cx="58" cy="47" r="3.8" fill="#e11d48" /><circle cx="56.5" cy="45.5" r="1.4" fill="#ffffff" />' +
          '<ellipse cx="50" cy="52" rx="3" ry="2" fill="#f472b6" />';
        break;

      case "pet_4": // Mini T-Rex (Chibi Prehistoric Dino Companion)
        art =
          '<path d="M 32 72 L 12 64 L 28 82 Z" fill="#16a34a" stroke="#0f172a" stroke-width="2.8" />' +
          '<ellipse cx="48" cy="68" rx="22" ry="18" fill="#22c55e" stroke="#0f172a" stroke-width="3" />' +
          '<ellipse cx="54" cy="70" rx="12" ry="13" fill="#bbf7d0" />' +
          '<path d="M 32 30 C 32 16, 68 16, 74 32 C 78 44, 72 54, 48 54 C 36 54, 32 44, 32 30 Z" fill="#4ade80" stroke="#0f172a" stroke-width="3" />' +
          '<polygon points="52,52 55,58 58,52" fill="#ffffff" />' +
          '<polygon points="62,52 65,58 68,52" fill="#ffffff" />' +
          '<polygon points="32,24 24,20 30,30" fill="#fde047" stroke="#0f172a" stroke-width="1.5" />' +
          '<polygon points="30,36 22,34 28,42" fill="#fde047" stroke="#0f172a" stroke-width="1.5" />' +
          '<circle cx="58" cy="32" r="4.5" fill="#0f172a" /><circle cx="56.5" cy="30.5" r="1.6" fill="#fde047" />';
        break;

      case "pet_5": // Holo-Drone (Sci-Fi Floating AI Companion Bot)
        art =
          '<ellipse cx="50" cy="56" rx="34" ry="10" fill="#334155" stroke="#38bdf8" stroke-width="2.5" />' +
          '<circle cx="50" cy="48" r="20" fill="#0f172a" stroke="#38bdf8" stroke-width="3" />' +
          '<circle cx="50" cy="48" r="11" fill="#0284c7" />' +
          '<circle cx="50" cy="48" r="5" fill="#e0f2fe" />' +
          '<line x1="50" y1="28" x2="50" y2="14" stroke="#38bdf8" stroke-width="3" />' +
          '<circle cx="50" cy="12" r="4.5" fill="#fde047" />' +
          '<ellipse cx="50" cy="74" rx="14" ry="5" fill="rgba(56,189,248,0.45)" />';
        break;

      case "pet_6": // Baby Pegasus (Winged Magical Unicorn Foal)
        art =
          '<path d="M 70 64 Q 88 56 82 76" fill="none" stroke="#e879f9" stroke-width="7" stroke-linecap="round" />' +
          '<ellipse cx="50" cy="68" rx="22" ry="15" fill="#fdf4ff" stroke="#0f172a" stroke-width="2.8" />' +
          '<path d="M 48 64 C 24 44, 14 56, 26 72 Z" fill="#bae6fd" stroke="#38bdf8" stroke-width="2" />' +
          '<circle cx="42" cy="42" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="2.8" />' +
          '<polygon points="36,28 24,8 44,24" fill="#fde047" stroke="#b45309" stroke-width="2" />' +
          '<path d="M 48 26 Q 64 28 58 46" fill="#c084fc" stroke="#0f172a" stroke-width="2" />' +
          '<circle cx="36" cy="40" r="3.8" fill="#7e22ce" /><circle cx="35" cy="38.5" r="1.4" fill="#ffffff" />';
        break;

      case "pet_7": // Celestial Dragon (Cyan Winged Sky Dragon with Golden Horns)
        art =
          '<path d="M 38 62 L 10 38 L 18 68 Z" fill="#0284c7" stroke="#22d3ee" stroke-width="2.2" />' +
          '<path d="M 62 62 L 90 38 L 82 68 Z" fill="#0284c7" stroke="#22d3ee" stroke-width="2.2" />' +
          '<ellipse cx="50" cy="68" rx="18" ry="16" fill="#06b6d4" stroke="#0f172a" stroke-width="2.8" />' +
          '<circle cx="50" cy="42" r="19" fill="#22d3ee" stroke="#0f172a" stroke-width="2.8" />' +
          '<polygon points="36,28 24,10 44,24" fill="#fde047" stroke="#b45309" stroke-width="2" />' +
          '<polygon points="64,28 76,10 56,24" fill="#fde047" stroke="#b45309" stroke-width="2" />' +
          '<circle cx="42" cy="42" r="4" fill="#fef08a" /><circle cx="42" cy="42" r="1.8" fill="#0f172a" />' +
          '<circle cx="58" cy="42" r="4" fill="#fef08a" /><circle cx="58" cy="42" r="1.8" fill="#0f172a" />';
        break;

      case "pet_8": // Solar Phoenix (Blazing Firebird with Golden Crest & Flame Wings)
        art =
          '<path d="M 36 58 C 8 32, 6 62, 32 70 Z" fill="#f97316" stroke="#fde047" stroke-width="2.2" />' +
          '<path d="M 64 58 C 92 32, 94 62, 68 70 Z" fill="#f97316" stroke="#fde047" stroke-width="2.2" />' +
          '<ellipse cx="50" cy="64" rx="17" ry="16" fill="#ea580c" stroke="#fde047" stroke-width="2.5" />' +
          '<circle cx="50" cy="40" r="17" fill="#fb923c" stroke="#fde047" stroke-width="2.5" />' +
          '<polygon points="42,24 50,6 58,24" fill="#fde047" />' +
          '<polygon points="46,44 54,44 50,52" fill="#fde047" stroke="#b45309" stroke-width="1.5" />' +
          '<circle cx="42" cy="38" r="3.5" fill="#fef08a" />' +
          '<circle cx="58" cy="38" r="3.5" fill="#fef08a" />';
        break;

      case "pet_9": // Galaxy Kitsune (Mystic 3-Tailed Cosmic Fox)
        art =
          // Three Glowing Star-Tipped Fox Tails
          '<path d="M 62 72 C 88 52, 96 74, 72 80 Z" fill="#c084fc" stroke="#fdf4ff" stroke-width="2" />' +
          '<path d="M 60 66 C 86 34, 96 52, 70 68 Z" fill="#e879f9" stroke="#fdf4ff" stroke-width="2" />' +
          '<path d="M 56 62 C 74 22, 88 34, 66 58 Z" fill="#a855f7" stroke="#fdf4ff" stroke-width="2" />' +
          '<ellipse cx="46" cy="70" rx="18" ry="14" fill="#d946ef" stroke="#0f172a" stroke-width="2.6" />' +
          '<polygon points="26,38 22,12 42,28" fill="#e879f9" stroke="#0f172a" stroke-width="2.6" />' +
          '<polygon points="66,38 70,12 50,28" fill="#e879f9" stroke="#0f172a" stroke-width="2.6" />' +
          '<path d="M 24 44 C 24 26, 68 26, 68 44 C 68 56, 46 64, 46 64 C 46 64, 24 56, 24 44 Z" fill="#f0abfc" stroke="#0f172a" stroke-width="2.6" />' +
          '<circle cx="38" cy="44" r="3.8" fill="#fde047" />' +
          '<circle cx="54" cy="44" r="3.8" fill="#fde047" />' +
          '<circle cx="46" cy="34" r="3" fill="#38bdf8" />';
        break;

      default:
        art = '<text x="50" y="62" font-size="42" text-anchor="middle">' + pet.icon + "</text>";
    }

    const glow =
      pet.tier === "insane"
        ? "filter: drop-shadow(0 0 12px " + pet.color + ");"
        : "filter: drop-shadow(0 5px 8px rgba(0,0,0,0.55));";

    return (
      '<svg viewBox="0 0 100 96" style="width:' + size + "px;height:" + size + "px;overflow:visible;" + glow + '">' +
        '<ellipse cx="50" cy="86" rx="26" ry="5" fill="rgba(0,0,0,0.35)" />' +
        art +
      "</svg>"
    );
  }

  return { renderSVG, renderPetSVG };
})();
