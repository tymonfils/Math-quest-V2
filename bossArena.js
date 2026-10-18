// bossArena.js - Standalone Boss Radar, Dimensional Rift Colosseum, 6 Zone Bosses & 3-Tier Loot Chest
(function () {
  let mathEngine = null;

  // Dynamically load mathEngine regardless of folder depth
  async function loadMathEngine() {
    if (mathEngine) return mathEngine;
    const paths = [
      "./src/math/mathEngine.js",
      "./math/mathEngine.js",
      "../math/mathEngine.js"
    ];
    for (const p of paths) {
      try {
        mathEngine = await import(p);
        if (mathEngine && mathEngine.getCurrentProblem) return mathEngine;
      } catch (e) {
        // try next path
      }
    }
    return null;
  }

  // Safely award bonus chest gold to window.Economy & localStorage
  function awardBonusGold(amount) {
    if (!window.Economy) return;
    const before = typeof window.Economy.getGold === "function" ? window.Economy.getGold() : 0;

    if (typeof window.Economy.addGold === "function") {
      window.Economy.addGold(amount);
    } else if (typeof window.Economy.earnGold === "function") {
      window.Economy.earnGold(amount);
    } else if (typeof window.Economy.modifyGold === "function") {
      window.Economy.modifyGold(amount);
    } else if (typeof window.Economy.setGold === "function") {
      window.Economy.setGold(before + amount);
    }

    const after = typeof window.Economy.getGold === "function" ? window.Economy.getGold() : before;

    // Fallback: if Economy didn't expose a direct setter, update localStorage state directly
    if (after === before) {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        try {
          const raw = localStorage.getItem(k);
          if (raw && raw.includes('"gold"')) {
            const parsed = JSON.parse(raw);
            if (typeof parsed.gold === "number") {
              parsed.gold += amount;
              localStorage.setItem(k, JSON.stringify(parsed));
            }
          }
        } catch (e) {}
      }
    }
    window.dispatchEvent(new CustomEvent("economy-updated"));
  }

  // --- BOSS RADAR STATE ---
  let streakCount = 0;
  let bossReady = false;
  let arenaOpen = false;
  let lastKnownGold = -1;

  // Escalating RNG probabilities starting at 5th correct problem
  const ESCALATING_CHANCES = [0.35, 0.55, 0.80, 1.0];

  function ensureArenaStyles() {
    if (document.getElementById("boss-arena-styles")) return;
    const style = document.createElement("style");
    style.id = "boss-arena-styles";
    style.textContent = `
      @keyframes bossRadarPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 18px rgba(239, 68, 68, 0.75), inset 0 0 12px rgba(250, 204, 21, 0.5); }
        50% { transform: scale(1.06); box-shadow: 0 0 32px rgba(250, 204, 21, 0.95), inset 0 0 18px rgba(239, 68, 68, 0.8); }
      }
      @keyframes riftVortexSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.06); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes monolithFloatLeft {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-14px) rotate(1deg); }
      }
      @keyframes monolithFloatRight {
        0%, 100% { transform: translateY(-6px) rotate(2deg); }
        50% { transform: translateY(10px) rotate(-1.5deg); }
      }
      @keyframes bossHoverIdle {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-12px) scale(1.02); }
      }
      @keyframes bossHitDamage {
        0%, 100% { transform: translate(0, 0) scale(1); filter: brightness(1); }
        15% { transform: translate(-18px, -10px) rotate(-6deg) scale(0.94); filter: brightness(3) drop-shadow(0 0 35px #ffffff); }
        35% { transform: translate(18px, 6px) rotate(6deg) scale(1.05); filter: brightness(2.2) hue-rotate(90deg); }
        55% { transform: translate(-12px, -4px) rotate(-4deg) scale(0.97); filter: brightness(2.5); }
        75% { transform: translate(10px, 4px) rotate(3deg) scale(1.02); }
      }
      @keyframes bossLaughBlock {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-14px) scale(1.08); }
        50% { transform: translateY(4px) scale(0.96); }
        75% { transform: translateY(-10px) scale(1.05); }
      }
      @keyframes bossDefeatExplode {
        0% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(1); }
        30% { transform: scale(1.15) rotate(-5deg); opacity: 1; filter: brightness(4) drop-shadow(0 0 50px #fde047); }
        70% { transform: scale(0.4) rotate(18deg); opacity: 0.6; filter: brightness(5) blur(4px); }
        100% { transform: scale(0) rotate(45deg); opacity: 0; }
      }
      @keyframes orbitalBeamFire {
        0% { transform: scaleX(0.1) scaleY(0); opacity: 0; }
        15% { transform: scaleX(1.3) scaleY(1); opacity: 1; }
        50% { transform: scaleX(0.9) scaleY(1); opacity: 1; }
        85% { transform: scaleX(1.4) scaleY(1); opacity: 0.85; }
        100% { transform: scaleX(2.2) scaleY(1); opacity: 0; }
      }
      @keyframes shieldOrbPulse {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px #38bdf8); }
        50% { transform: scale(1.1); filter: drop-shadow(0 0 16px #67e8f9); }
      }
      @keyframes chestDropIn {
        0% { transform: translateY(-260px) scale(0.4); opacity: 0; }
        60% { transform: translateY(14px) scale(1.08, 0.92); opacity: 1; }
        80% { transform: translateY(-8px) scale(0.97, 1.03); opacity: 1; }
        100% { transform: translateY(0px) scale(1); opacity: 1; }
      }
      @keyframes chestIdleHover {
        0%, 100% { transform: translateY(0px) rotate(-1deg); }
        50% { transform: translateY(-6px) rotate(1deg); }
      }
      @keyframes chestRollShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        15% { transform: translate(-10px, -6px) rotate(-8deg) scale(1.06); }
        30% { transform: translate(10px, 4px) rotate(8deg) scale(1.08); }
        45% { transform: translate(-12px, -4px) rotate(-10deg) scale(1.1); }
        60% { transform: translate(12px, 6px) rotate(10deg) scale(1.12); }
        75% { transform: translate(-8px, -8px) rotate(-6deg) scale(1.14); }
        90% { transform: translate(8px, 4px) rotate(6deg) scale(1.15); }
      }
      @keyframes coinFountainArc {
        0% { transform: translate(0, 0) scale(0.3) rotate(0deg); opacity: 1; }
        65% { opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(1.25) rotate(var(--rot)); opacity: 0; }
      }
      @keyframes plasmaConduitFlow {
        0% { stroke-dashoffset: 160; }
        100% { stroke-dashoffset: 0; }
      }
      .boss-actor-idle { animation: bossHoverIdle 3.2s ease-in-out infinite; }
      .boss-actor-hit { animation: bossHitDamage 0.75s ease-out 1 !important; }
      .boss-actor-laugh { animation: bossLaughBlock 0.65s ease-in-out 1 !important; }
      .boss-actor-dead { animation: bossDefeatExplode 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards !important; }
      #arena-laser-beam {
        transform-origin: 720px 640px;
        transform: scaleY(0);
        opacity: 0;
        pointer-events: none;
      }
      #arena-laser-beam.firing {
        animation: orbitalBeamFire 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================================================
  // 1. THE BOSS RADAR HUD WIDGET (CHARGES 1/5 -> 5/5 + ESCALATING RNG)
  // ============================================================================
  let radarContainer = null;

  function initBossRadarHUD() {
    ensureArenaStyles();
    if (document.getElementById("boss-radar-hud")) return;

    radarContainer = document.createElement("div");
    radarContainer.id = "boss-radar-hud";
    radarContainer.style.cssText =
      "position:fixed;bottom:16px;right:18px;z-index:8650;pointer-events:auto;font-family:'Nunito','Segoe UI',sans-serif;user-select:none;";

    document.body.appendChild(radarContainer);
    if (window.Economy && typeof window.Economy.getGold === "function") {
      lastKnownGold = window.Economy.getGold();
    }
    renderRadarHUD();
  }

  function renderRadarHUD() {
    if (!radarContainer) return;
    const clampedFive = Math.min(5, streakCount);

    if (bossReady) {
      radarContainer.innerHTML = `
        <button id="boss-summon-btn" style="cursor:pointer;background:linear-gradient(135deg,#dc2626 0%,#7f1d1d 55%,#450a0a 100%);border:3px solid #fde047;border-radius:16px;padding:10px 18px;display:flex;align-items:center;gap:12px;color:#ffffff;animation:bossRadarPulse 1.3s ease-in-out infinite;">
          <span style="font-size:1.7rem;filter:drop-shadow(0 0 8px #fde047);">⚔️</span>
          <div style="display:flex;flex-direction:column;align-items:flex-start;">
            <span style="font-size:0.65rem;font-weight:900;color:#fde047;letter-spacing:0.14em;text-transform:uppercase;">🚨 BOSS SIGNAL LOCKED!</span>
            <span style="font-size:0.95rem;font-weight:900;color:#ffffff;letter-spacing:0.04em;">ENTER BOSS ARENA</span>
          </div>
        </button>
      `;
      const btn = document.getElementById("boss-summon-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          openBossArena();
        });
      }
    } else {
      let barsHTML = "";
      for (let i = 0; i < 5; i++) {
        const active = i < clampedFive;
        barsHTML += `<div style="width:16px;height:10px;border-radius:3px;background:${
          active ? "linear-gradient(180deg,#fde047,#f97316)" : "#1e293b"
        };border:1.5px solid ${active ? "#fef08a" : "#334155"};box-shadow:${
          active ? "0 0 8px #f97316" : "none"
        };transition:all 0.25s;"></div>`;
      }

      const subLabel =
        streakCount < 5
          ? `CHARGE: ${clampedFive} / 5`
          : `SCANNING RIFT... (${Math.round(
              ESCALATING_CHANCES[Math.min(3, streakCount - 5)] * 100
            )}%)`;

      radarContainer.innerHTML = `
        <div style="background:rgba(9,13,24,0.92);border:2.5px solid ${
          streakCount >= 5 ? "#f59e0b" : "#334155"
        };border-radius:14px;padding:8px 14px;display:flex;flex-direction:column;gap:5px;box-shadow:0 8px 20px rgba(0,0,0,0.7);">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
            <span style="font-size:0.65rem;font-weight:900;color:#38bdf8;letter-spacing:0.12em;text-transform:uppercase;">📡 BOSS RADAR</span>
            <span style="font-size:0.68rem;font-weight:900;color:${
              streakCount >= 5 ? "#fde047" : "#94a3b8"
            };">${subLabel}</span>
          </div>
          <div style="display:flex;gap:5px;">${barsHTML}</div>
        </div>
      `;
    }
  }

  // Detect whenever player solves a problem in ANY zone by watching gold increase
  function onEconomyUpdated() {
    if (!window.Economy || typeof window.Economy.getGold !== "function") return;
    const currentGold = window.Economy.getGold();

    if (lastKnownGold === -1) {
      lastKnownGold = currentGold;
      return;
    }

    // If gold increased while outside the boss arena, the player just solved a math problem!
    if (currentGold > lastKnownGold && !arenaOpen) {
      streakCount++;
      if (!bossReady && streakCount >= 5) {
        const idx = Math.min(ESCALATING_CHANCES.length - 1, streakCount - 5);
        const chance = ESCALATING_CHANCES[idx];
        if (Math.random() <= chance) {
          bossReady = true;
        }
      }
      renderRadarHUD();
    }
    lastKnownGold = currentGold;
  }

  window.addEventListener("economy-updated", onEconomyUpdated);

  // ============================================================================
  // 2. ZONE-AWARE HIGH-DETAIL SVG BOSSES (6 UNIQUE APEX TITANS)
  // ============================================================================
  function detectCurrentZoneBoss() {
    if (document.getElementById("dino-world-root")) {
      return {
        id: "cyber_rex",
        name: "OMEGA CYBER-REX // SPECIMEN #00",
        title: "Bio-Mechanical Apex Predator",
        taunt: "ROAAAR!! My titanium jaws will crush your equations!",
        hitQuote: "GRAAAH! My bio-reactor shield cracked!",
        missQuote: "HAHA! My armor deflected that weak calculation!",
        accent: "#10b981",
        secondary: "#fde047"
      };
    }
    if (document.getElementById("underwater-world-root")) {
      return {
        id: "mecha_kraken",
        name: "LEVIATHAN KRAKEN-09",
        title: "Abyssal Trench Dreadnought",
        taunt: "From the sunken trench of Atlantis, I summon the abyss!",
        hitQuote: "SCREEEE! Direct hit to my pressure mantle!",
        missQuote: "Your sonar missed! The deep swallows your math!",
        accent: "#06b6d4",
        secondary: "#f472b6"
      };
    }
    if (document.getElementById("fastlane-world-root")) {
      return {
        id: "apex_valkyrie",
        name: "PHANTOM V12 VALKYRIE",
        title: "Twin-Turbine Hyper-Mecha",
        taunt: "300 MPH on the apex! You'll never overtake my telemetry!",
        hitQuote: "WARNING! Turbocharger shield overloaded!",
        missQuote: "Too slow on the throttle! Eat my titanium exhaust!",
        accent: "#ef4444",
        secondary: "#38bdf8"
      };
    }
    if (document.getElementById("safari-world-root")) {
      return {
        id: "solar_mammoth",
        name: "SOLAR BEHEMOTH TUSK-KING",
        title: "Gilded Savanna Colossus",
        taunt: "The Serengeti trembles beneath my golden war-tusks!",
        hitQuote: "GROOOAAAR! My sun-shield armor fractured!",
        missQuote: "My gilded hide is unbreakable! Try again, ranger!",
        accent: "#f59e0b",
        secondary: "#84cc16"
      };
    }
    if (document.getElementById("fairy-world-root")) {
      return {
        id: "eclipse_wyrm",
        name: "MALAKOR THE ECLIPSE WYRM",
        title: " Sovereign of the Void-Crystal",
        taunt: "Your moonstone magic is no match for my starfire breath!",
        hitQuote: "HSSSSS! The prism light pierced my dark scales!",
        missQuote: "Foolish apprentice! My wings blot out your spell!",
        accent: "#d946ef",
        secondary: "#67e8f9"
      };
    }
    // Default / Space School Boss
    return {
      id: "void_imperator",
      name: "IMPERATOR VOID-PRIME",
      title: "Galactic Singularity Dreadnought",
      taunt: "I command the Andromeda sector! Prepare your coordinates!",
      hitQuote: "CRITICAL ALERT! Quantum shield generator breached!",
      missQuote: "Trajectory miscalculated! My dark-matter barrier holds!",
      accent: "#38bdf8",
      secondary: "#e879f9"
    };
  }

  function renderBossSVG(bossId) {
    switch (bossId) {
      case "cyber_rex":
        return `
          <svg viewBox="0 0 380 310" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));">
            <defs>
              <linearGradient id="cyberRexArmor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#475569" />
                <stop offset="50%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#020617" />
              </linearGradient>
              <linearGradient id="cyberRexHide" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="55%" stop-color="#047857" />
                <stop offset="100%" stop-color="#022c22" />
              </linearGradient>
            </defs>
            <!-- Glowing Neon Dorsal Spines -->
            <polygon points="85,165 45,135 75,140 55,105 95,120 85,78 125,102 128,62 162,92" fill="#34d399" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 12px #10b981)" />
            <!-- Whip Cyber-Tail & Leg Pistons -->
            <path d="M 110 195 C 45 210, 12 175, 22 140 C 32 165, 65 175, 115 168 Z" fill="url(#cyberRexHide)" stroke="#022c22" stroke-width="3" />
            <path d="M 115 215 L 95 275 L 135 280 L 148 220 Z" fill="url(#cyberRexArmor)" stroke="#34d399" stroke-width="2.5" />
            <path d="M 185 215 L 175 282 L 222 285 L 220 220 Z" fill="url(#cyberRexArmor)" stroke="#34d399" stroke-width="2.5" />
            <!-- Massive Armored Torso & Glowing Bio-Reactor Rib Core -->
            <path d="M 95 145 C 85 95, 155 75, 225 110 C 255 135, 245 215, 195 228 C 145 238, 102 205, 95 145 Z" fill="url(#cyberRexHide)" stroke="#022c22" stroke-width="3.5" />
            <path d="M 115 120 L 215 120 L 205 198 L 125 198 Z" fill="url(#cyberRexArmor)" stroke="#10b981" stroke-width="3" />
            <circle cx="168" cy="158" r="22" fill="#022c22" stroke="#34d399" stroke-width="3" />
            <circle cx="168" cy="158" r="12" fill="#6ee7b7" filter="drop-shadow(0 0 14px #10b981)" />
            <!-- Mecha-Claw Forearms -->
            <path d="M 220 152 L 268 168 L 258 186 L 212 172 Z" fill="url(#cyberRexArmor)" stroke="#fde047" stroke-width="2" />
            <polygon points="268,168 286,162 276,178 288,182 262,188" fill="#fde047" />
            <!-- Colossal Titanium-Plated T-Rex Skull & Laser Visor -->
            <path d="M 155 95 C 155 42, 215 22, 295 38 C 335 46, 355 68, 342 88 L 265 92 L 332 118 C 318 142, 265 142, 215 124 C 180 114, 155 110, 155 95 Z" fill="url(#cyberRexArmor)" stroke="#34d399" stroke-width="3" />
            <!-- Serrated Titanium Fangs -->
            <polygon points="268,91 274,106 282,91 290,108 298,90 306,106 314,90 322,104 330,89" fill="#f8fafc" />
            <polygon points="272,115 278,102 286,116 296,102 304,116 314,104 322,118" fill="#f8fafc" />
            <!-- Glowing Crimson-Gold Targeting Visor Eye -->
            <polygon points="215,52 268,46 258,68 208,66" fill="#ef4444" stroke="#fde047" stroke-width="2" filter="drop-shadow(0 0 12px #ef4444)" />
            <circle cx="242" cy="57" r="4" fill="#ffffff" />
          </svg>
        `;

      case "mecha_kraken":
        return `
          <svg viewBox="0 0 380 310" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));">
            <defs>
              <radialGradient id="krakenMantle" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#ec4899" />
                <stop offset="50%" stop-color="#7e22ce" />
                <stop offset="100%" stop-color="#1e1b4b" />
              </radialGradient>
            </defs>
            <!-- 6 Writhing Bioluminescent Armored Tentacles -->
            <g stroke="#67e8f9" stroke-width="2.5" fill="url(#krakenMantle)">
              <path d="M 125 185 C 55 195, 8 145, 22 95 C 34 65, 62 85, 48 115 C 36 140, 75 165, 130 165 Z" />
              <path d="M 255 185 C 325 195, 372 145, 358 95 C 346 65, 318 85, 332 115 C 344 140, 305 165, 250 165 Z" />
              <path d="M 110 205 C 35 235, 18 285, 55 292 C 82 295, 85 265, 68 258 C 52 250, 82 225, 128 215 Z" />
              <path d="M 270 205 C 345 235, 362 285, 325 292 C 298 295, 295 265, 312 258 C 328 250, 298 225, 252 215 Z" />
              <path d="M 155 215 C 125 258, 122 295, 152 298 C 172 298, 172 272, 158 265 L 175 215 Z" />
              <path d="M 225 215 C 255 258, 258 295, 228 298 C 208 298, 208 272, 222 265 L 205 215 Z" />
            </g>
            <!-- Colossal Spiked Kraken Mantle Dome -->
            <path d="M 105 165 C 82 75, 135 18, 190 12 C 245 18, 298 75, 275 165 C 262 205, 232 225, 190 225 C 148 225, 118 205, 105 165 Z" fill="url(#krakenMantle)" stroke="#f472b6" stroke-width="3.5" />
            <!-- Bioluminescent Mantle Stripes & Brain Core -->
            <path d="M 135 65 Q 190 38 245 65 M 122 102 Q 190 72 258 102" fill="none" stroke="#67e8f9" stroke-width="4" stroke-linecap="round" filter="drop-shadow(0 0 10px #38bdf8)" />
            <!-- Golden Atlantean Trident Crown -->
            <polygon points="145,42 155,4 178,28 190,-10 202,28 225,4 235,42" fill="#fde047" stroke="#b45309" stroke-width="2.5" filter="drop-shadow(0 0 12px #fde047)" />
            <!-- 4 Glowing Abyssal Eyes -->
            <polygon points="125,138 168,148 158,168 118,156" fill="#fde047" stroke="#0f172a" stroke-width="2" filter="drop-shadow(0 0 10px #fde047)" />
            <polygon points="255,138 212,148 222,168 262,156" fill="#fde047" stroke="#0f172a" stroke-width="2" filter="drop-shadow(0 0 10px #fde047)" />
            <circle cx="145" cy="122" r="6" fill="#67e8f9" />
            <circle cx="235" cy="122" r="6" fill="#67e8f9" />
            <!-- Armored Beak Maw -->
            <polygon points="172,178 190,212 208,178" fill="#0f172a" stroke="#67e8f9" stroke-width="2.5" />
          </svg>
        `;

      case "apex_valkyrie":
        return `
          <svg viewBox="0 0 380 310" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));">
            <defs>
              <linearGradient id="valkyrieRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f87171" />
                <stop offset="45%" stop-color="#dc2626" />
                <stop offset="100%" stop-color="#450a0a" />
              </linearGradient>
            </defs>
            <!-- Twin Gullwing Carbon-Fiber Aero Blades & Jet Thrusters -->
            <polygon points="145,135 12,55 28,115 135,165" fill="#1e293b" stroke="#ef4444" stroke-width="3" />
            <polygon points="235,135 368,55 352,115 245,165" fill="#1e293b" stroke="#ef4444" stroke-width="3" />
            <polygon points="140,152 38,142 52,178 140,175" fill="#38bdf8" filter="drop-shadow(0 0 12px #38bdf8)" />
            <polygon points="240,152 342,142 328,178 240,175" fill="#38bdf8" filter="drop-shadow(0 0 12px #38bdf8)" />
            <!-- Shoulder Pirelli Slick Tire Pauldrons -->
            <rect x="78" y="88" width="44" height="78" rx="12" transform="rotate(-14 100 127)" fill="#0f172a" stroke="#fde047" stroke-width="3" />
            <rect x="258" y="88" width="44" height="78" rx="12" transform="rotate(14 280 127)" fill="#0f172a" stroke="#fde047" stroke-width="3" />
            <!-- F1 Nosecone Chest & V12 Plasma Turbine Core -->
            <polygon points="122,98 258,98 232,235 148,235" fill="url(#valkyrieRed)" stroke="#fde047" stroke-width="3" />
            <polygon points="178,98 202,98 196,235 184,235" fill="#fde047" />
            <circle cx="190" cy="162" r="24" fill="#090d16" stroke="#38bdf8" stroke-width="3.5" />
            <circle cx="190" cy="162" r="13" fill="#67e8f9" filter="drop-shadow(0 0 14px #38bdf8)" />
            <!-- Mecha Head & Gundam V-Fin Racing Crest -->
            <polygon points="158,96 168,42 212,42 222,96" fill="url(#valkyrieRed)" stroke="#0f172a" stroke-width="3" />
            <polygon points="190,56 128,18 138,10 190,42 242,10 252,18" fill="#fde047" stroke="#0f172a" stroke-width="2" />
            <polygon points="168,64 212,64 206,78 174,78" fill="#38bdf8" filter="drop-shadow(0 0 10px #38bdf8)" />
          </svg>
        `;

      case "solar_mammoth":
        return `
          <svg viewBox="0 0 380 310" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));">
            <defs>
              <radialGradient id="mammothHide" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#b45309" />
                <stop offset="60%" stop-color="#78350f" />
                <stop offset="100%" stop-color="#270e05" />
              </radialGradient>
            </defs>
            <!-- Massive Flapping Armored Ears with Tribal Sun Patterns -->
            <path d="M 120 75 C 35 45, 18 165, 85 195 C 115 202, 125 145, 120 75 Z" fill="url(#mammothHide)" stroke="#fde047" stroke-width="4" />
            <path d="M 260 75 C 345 45, 362 165, 295 195 C 265 202, 255 145, 260 75 Z" fill="url(#mammothHide)" stroke="#fde047" stroke-width="4" />
            <!-- Colossal Armored Body & Pillar Legs -->
            <rect x="98" y="195" width="42" height="82" rx="10" fill="url(#mammothHide)" stroke="#fde047" stroke-width="3" />
            <rect x="240" y="195" width="42" height="82" rx="10" fill="url(#mammothHide)" stroke="#fde047" stroke-width="3" />
            <ellipse cx="190" cy="155" rx="95" ry="78" fill="url(#mammothHide)" stroke="#fde047" stroke-width="3.5" />
            <!-- Golden Sun-God Crest Crown -->
            <polygon points="135,75 152,18 175,55 190,4 205,55 228,18 245,75" fill="#fde047" stroke="#b45309" stroke-width="3" filter="drop-shadow(0 0 14px #fde047)" />
            <!-- Quadruple Gilded War-Tusks -->
            <path d="M 142 165 C 65 215, 25 145, 52 98 C 65 135, 95 168, 148 152 Z" fill="#fefce8" stroke="#ca8a04" stroke-width="3" />
            <path d="M 238 165 C 315 215, 355 145, 328 98 C 315 135, 285 168, 232 152 Z" fill="#fefce8" stroke="#ca8a04" stroke-width="3" />
            <!-- Armored Trunk & Glowing Savanna Emerald Eyes -->
            <path d="M 168 135 C 165 215, 195 268, 225 245 C 238 232, 222 212, 212 225 C 198 235, 198 185, 208 135 Z" fill="url(#mammothHide)" stroke="#fde047" stroke-width="3" />
            <polygon points="138,118 168,126 158,140 132,132" fill="#84cc16" filter="drop-shadow(0 0 10px #84cc16)" />
            <polygon points="242,118 212,126 222,140 248,132" fill="#84cc16" filter="drop-shadow(0 0 10px #84cc16)" />
          </svg>
        `;

      case "eclipse_wyrm":
        return `
          <svg viewBox="0 0 380 310" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));">
            <defs>
              <linearGradient id="wyrmWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f472b6" stop-opacity="0.9" />
                <stop offset="50%" stop-color="#7e22ce" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#090418" stop-opacity="0.95" />
              </linearGradient>
            </defs>
            <!-- Colossal Stained-Glass Void-Dragon Wings -->
            <path d="M 165 145 L 18 35 L 8 135 C 45 125, 68 148, 55 188 C 92 168, 128 182, 162 175 Z" fill="url(#wyrmWingGrad)" stroke="#fde047" stroke-width="3" />
            <path d="M 215 145 L 362 35 L 372 135 C 335 125, 312 148, 325 188 C 288 168, 252 182, 218 175 Z" fill="url(#wyrmWingGrad)" stroke="#fde047" stroke-width="3" />
            <!-- Serpentine Dragon Body & Glowing Starfire Chest Core -->
            <path d="M 145 115 L 235 115 L 222 245 L 158 245 Z" fill="#3b0764" stroke="#e879f9" stroke-width="3" />
            <polygon points="190,132 214,168 190,204 166,168" fill="#67e8f9" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 14px #38bdf8)" />
            <!-- Horned Dragon Head & Amethyst Crown -->
            <path d="M 135 55 C 102 25, 92 2, 118 6 C 128 24, 145 42, 162 52 Z" fill="#fde047" stroke="#b45309" stroke-width="2.5" />
            <path d="M 245 55 C 278 25, 288 2, 262 6 C 252 24, 235 42, 218 52 Z" fill="#fde047" stroke="#b45309" stroke-width="2.5" />
            <polygon points="148,52 232,52 242,108 190,128 138,108" fill="#581c87" stroke="#fde047" stroke-width="3" />
            <polygon points="155,76 182,84 174,96 150,88" fill="#67e8f9" filter="drop-shadow(0 0 10px #67e8f9)" />
            <polygon points="225,76 198,84 206,96 230,88" fill="#67e8f9" filter="drop-shadow(0 0 10px #67e8f9)" />
          </svg>
        `;

      default: // void_imperator (Space School & Universal Dreadnought Overlord)
        return `
          <svg viewBox="0 0 380 310" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));">
            <defs>
              <linearGradient id="imperatorArmor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#64748b" />
                <stop offset="45%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#020617" />
              </linearGradient>
            </defs>
            <!-- Floating Orbital Plasma Wing-Cannons -->
            <polygon points="118,125 18,45 32,125 18,185 118,165" fill="url(#imperatorArmor)" stroke="#38bdf8" stroke-width="3" />
            <polygon points="262,125 362,45 348,125 362,185 262,165" fill="url(#imperatorArmor)" stroke="#38bdf8" stroke-width="3" />
            <circle cx="52" cy="118" r="14" fill="#e879f9" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 14px #e879f9)" />
            <circle cx="328" cy="118" r="14" fill="#e879f9" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 14px #e879f9)" />
            <!-- Massive Spiked Shoulder Pauldrons -->
            <polygon points="75,118 135,78 148,142 88,155" fill="url(#imperatorArmor)" stroke="#fde047" stroke-width="3" />
            <polygon points="305,118 245,78 232,142 292,155" fill="url(#imperatorArmor)" stroke="#fde047" stroke-width="3" />
            <!-- Dreadnought Torso & Black-Hole Singularity Core -->
            <polygon points="122,98 258,98 232,245 148,245" fill="url(#imperatorArmor)" stroke="#38bdf8" stroke-width="3.5" />
            <circle cx="190" cy="168" r="32" fill="#020617" stroke="#fde047" stroke-width="3" />
            <circle cx="190" cy="168" r="20" fill="#9333ea" stroke="#67e8f9" stroke-width="2.5" filter="drop-shadow(0 0 16px #a855f7)" />
            <circle cx="190" cy="168" r="8" fill="#ffffff" />
            <!-- Crowned Mecha-Emperor Head & Glowing Visor -->
            <polygon points="152,96 162,38 218,38 228,96" fill="url(#imperatorArmor)" stroke="#fde047" stroke-width="3" />
            <polygon points="145,42 165,6 182,30 190,-6 198,30 215,6 235,42" fill="#fde047" stroke="#b45309" stroke-width="2" />
            <polygon points="162,62 218,62 210,78 170,78" fill="#ef4444" stroke="#fde047" stroke-width="1.8" filter="drop-shadow(0 0 12px #ef4444)" />
          </svg>
        `;
    }
  }

  // ============================================================================
  // 3. THE DIMENSIONAL RIFT BOSS ARENA OVERLAY & 3-TIER LOOT CHEST
  // ============================================================================
  async function openBossArena() {
    if (arenaOpen || document.getElementById("boss-arena-overlay")) return;
    ensureArenaStyles();

    const engine = await loadMathEngine();
    if (!engine) return;

    arenaOpen = true;
    bossReady = false;
    streakCount = 0;
    renderRadarHUD();

    const boss = detectCurrentZoneBoss();
    let shieldsLeft = 3;
    let isTransitioning = false;

    const overlay = document.createElement("div");
    overlay.id = "boss-arena-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;z-index:9500;background:#04020c;font-family:'Nunito','Segoe UI',sans-serif;user-select:none;overflow:hidden;pointer-events:auto;";

    overlay.innerHTML = `
      <!-- 1. EXTRAORDINARY DIMENSIONAL RIFT COLOSSEUM SVG BACKGROUND -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
        <defs>
          <radialGradient id="riftVortexGrad" cx="50%" cy="28%" r="55%">
            <stop offset="0%" stop-color="${boss.accent}" stop-opacity="0.52" />
            <stop offset="38%" stop-color="#4c1d95" stop-opacity="0.45" />
            <stop offset="75%" stop-color="#090418" stop-opacity="0.92" />
            <stop offset="100%" stop-color="#020108" stop-opacity="1" />
          </radialGradient>

          <linearGradient id="obsidianPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="45%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>

          <linearGradient id="arenaDeckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e1b4b" />
            <stop offset="40%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#02040a" />
          </linearGradient>

          <linearGradient id="orbitalBeamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="35%" stop-color="${boss.accent}" />
            <stop offset="75%" stop-color="${boss.secondary}" />
            <stop offset="100%" stop-color="#ffffff" />
          </linearGradient>
        </defs>

        <!-- Deep Dimensional Vortex Sky -->
        <rect width="1440" height="900" fill="url(#riftVortexGrad)" />

        <!-- Swirling Dimensional Singularity Portal Behind Boss -->
        <g transform="translate(720, 235)">
          <g style="animation: riftVortexSpin 28s linear infinite;">
            <circle cx="0" cy="0" r="245" fill="none" stroke="${boss.accent}" stroke-width="3" stroke-dasharray="32 18" opacity="0.45" />
            <circle cx="0" cy="0" r="195" fill="none" stroke="${boss.secondary}" stroke-width="4" stroke-dasharray="18 14" opacity="0.6" />
            <polygon points="0,-165 142,82 -142,82" fill="none" stroke="${boss.accent}" stroke-width="2" opacity="0.35" />
            <polygon points="0,165 142,-82 -142,-82" fill="none" stroke="${boss.secondary}" stroke-width="2" opacity="0.35" />
          </g>
        </g>

        <!-- Shattered Floating Obsidian Monoliths & Glowing Rune Chains (Left & Right) -->
        <g transform="translate(95, 110)">
          <g style="animation: monolithFloatLeft 5.5s ease-in-out infinite;">
            <polygon points="40,10 135,45 115,340 15,310" fill="url(#obsidianPillarGrad)" stroke="${boss.accent}" stroke-width="2.5" />
            <text x="68" y="135" fill="${boss.accent}" font-size="26" font-weight="900" opacity="0.8">ᚠ</text>
            <text x="62" y="195" fill="${boss.secondary}" font-size="26" font-weight="900" opacity="0.8">ᛟ</text>
            <text x="56" y="255" fill="${boss.accent}" font-size="26" font-weight="900" opacity="0.8">ᚷ</text>
          </g>
        </g>
        <g transform="translate(1210, 110)">
          <g style="animation: monolithFloatRight 6s ease-in-out infinite;">
            <polygon points="95,10 15,45 35,340 135,310" fill="url(#obsidianPillarGrad)" stroke="${boss.accent}" stroke-width="2.5" />
            <text x="65" y="135" fill="${boss.secondary}" font-size="26" font-weight="900" opacity="0.8">ᛉ</text>
            <text x="72" y="195" fill="${boss.accent}" font-size="26" font-weight="900" opacity="0.8">ᛞ</text>
            <text x="78" y="255" fill="${boss.secondary}" font-size="26" font-weight="900" opacity="0.8">ᛏ</text>
          </g>
        </g>

        <!-- Colosseum Battle Floor & Surging Plasma Conduits -->
        <polygon points="-80,555 1520,555 1520,900 -80,900" fill="url(#arenaDeckGrad)" stroke="${boss.accent}" stroke-width="3" />
        <g transform="translate(720, 680)">
          <ellipse cx="0" cy="0" rx="540" ry="135" fill="none" stroke="${boss.accent}" stroke-width="4" stroke-dasharray="24 14" opacity="0.55" />
          <ellipse cx="0" cy="0" rx="390" ry="95" fill="#090d1e" stroke="${boss.secondary}" stroke-width="3" opacity="0.8" />
          <path d="M -520 0 L -190 0" stroke="${boss.accent}" stroke-width="6" stroke-dasharray="18 18" style="animation: plasmaConduitFlow 0.9s linear infinite;" />
          <path d="M 520 0 L 190 0" stroke="${boss.accent}" stroke-width="6" stroke-dasharray="18 18" style="animation: plasmaConduitFlow 0.9s linear infinite;" />
        </g>

        <!-- ORBITAL LASER CANNON BEAM (Fires from Math Board into Boss on Correct Answer!) -->
        <g id="arena-laser-beam">
          <rect x="650" y="90" width="140" height="550" fill="url(#orbitalBeamGrad)" opacity="0.45" />
          <rect x="692" y="90" width="56" height="550" fill="#ffffff" filter="drop-shadow(0 0 28px ${boss.accent})" />
          <circle cx="720" cy="245" r="115" fill="none" stroke="#fde047" stroke-width="8" stroke-dasharray="24 12" />
        </g>
      </svg>

      <!-- PARTICLE LAYER FOR SHIELD SHATTER & GOLD FOUNTAIN -->
      <div id="boss-arena-particles" style="position:absolute;inset:0;pointer-events:none;z-index:20;overflow:hidden;"></div>

      <!-- 2. TOP BAR: BOSS NAMEPLATE, 3 ENERGY SHIELDS & RETREAT BUTTON -->
      <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);width:94%;max-width:920px;display:flex;justify-content:space-between;align-items:center;z-index:15;">
        
        <div style="background:rgba(9,13,26,0.92);border:2.5px solid ${boss.accent};border-radius:14px;padding:8px 18px;box-shadow:0 8px 20px rgba(0,0,0,0.75);">
          <div style="font-size:0.68rem;font-weight:900;color:${boss.secondary};letter-spacing:0.14em;text-transform:uppercase;">⚠️ ${boss.title}</div>
          <div style="font-size:1.15rem;font-weight:900;color:#ffffff;letter-spacing:0.05em;">${boss.name}</div>
        </div>

        <!-- 3 BOSS ENERGY SHIELDS -->
        <div id="boss-shields-row" style="display:flex;align-items:center;gap:12px;background:rgba(9,13,26,0.92);border:2.5px solid #fde047;border-radius:999px;padding:8px 22px;box-shadow:0 8px 20px rgba(0,0,0,0.75);"></div>

        <button id="boss-retreat-btn" style="cursor:pointer;background:#1e293b;border:2px solid #64748b;color:#cbd5e1;font-weight:900;font-size:0.82rem;padding:9px 16px;border-radius:12px;">
          ✕ Retreat
        </button>
      </div>

      <!-- 3. CENTER STAGE: BOSS MONSTER + SPEECH TAUNT + LOOT CHEST CONTAINER -->
      <div id="boss-center-stage" style="position:absolute;top:88px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;z-index:10;width:92%;max-width:680px;pointer-events:none;">
        
        <div id="boss-speech-bubble" style="background:rgba(15,23,42,0.96);color:#fef08a;border:2.5px solid ${boss.accent};border-radius:16px;padding:7px 18px;font-size:0.88rem;font-weight:900;margin-bottom:6px;box-shadow:0 8px 20px rgba(0,0,0,0.75);text-align:center;">
          "${boss.taunt}"
        </div>

        <div id="boss-svg-holder" class="boss-actor-idle" style="width:320px;height:255px;display:flex;align-items:center;justify-content:center;">
          ${renderBossSVG(boss.id)}
        </div>
      </div>

      <!-- 4. BOTTOM STAGE: ORBITAL MATH CANNON BOARD & INPUT DECK -->
      <div id="boss-combat-controls" style="position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:14px;z-index:15;width:94%;max-width:540px;">
        
        <!-- Orbital Cannon Targeting Screen (The Math Equation) -->
        <div style="width:360px;max-width:88vw;background:radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%);border:4px solid ${boss.accent};border-radius:22px;padding:14px 28px;box-shadow:0 16px 35px rgba(0,0,0,0.9), 0 0 24px ${boss.accent}55;display:flex;justify-content:space-between;align-items:center;">
          
          <div style="display:flex;flex-direction:column;gap:4px;font-family:monospace;font-size:0.68rem;color:#67e8f9;font-weight:900;">
            <span>🎯 ORBITAL CANNON</span>
            <span id="boss-cannon-status" style="color:#fde047;">CHARGE: ARMED</span>
            <span style="color:#4ade80;">POWER: 100%</span>
          </div>

          <div style="display:flex;flex-direction:column;align-items:flex-end;font-family:'Nunito',monospace;font-size:3.1rem;font-weight:900;color:#ffffff;line-height:1.02;text-shadow:0 0 14px ${boss.accent};">
            <div id="boss-math-num1">12</div>
            <div style="display:flex;align-items:center;gap:14px;">
              <span id="boss-math-op" style="color:${boss.secondary};font-size:2.6rem;">+</span>
              <span id="boss-math-num2">15</span>
            </div>
            <div style="width:108%;height:5px;background:${boss.accent};border-radius:999px;margin:4px -4% 3px 0;"></div>
            <div style="color:#fde047;font-size:2.4rem;letter-spacing:0.14em;">??</div>
          </div>
        </div>

        <!-- Fire Cannon Input Row -->
        <div style="background:linear-gradient(180deg,#1e293b,#090d16);border:3px solid #fde047;border-radius:16px;padding:8px 20px;display:flex;align-items:center;gap:14px;box-shadow:0 12px 28px rgba(0,0,0,0.85);">
          <input id="boss-answer-input" type="number" placeholder="?" style="width:86px;height:50px;text-align:center;font-size:1.95rem;font-weight:900;color:#fde047;background:#020617;border:3px solid ${boss.accent};border-radius:12px;outline:none;" />
          <button id="boss-fire-btn" style="height:50px;padding:0 24px;background:linear-gradient(180deg,#ef4444 0%,#991b1b 100%);color:#ffffff;font-weight:900;font-size:1.05rem;border:2px solid #fde047;border-radius:12px;cursor:pointer;text-transform:uppercase;letter-spacing:0.06em;box-shadow:0 4px 14px rgba(239,68,68,0.6);">
            🔥 FIRE CANNON!
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    const shieldsRow = document.getElementById("boss-shields-row");
    const num1El = document.getElementById("boss-math-num1");
    const num2El = document.getElementById("boss-math-num2");
    const opEl = document.getElementById("boss-math-op");
    const inputEl = document.getElementById("boss-answer-input");
    const fireBtn = document.getElementById("boss-fire-btn");
    const retreatBtn = document.getElementById("boss-retreat-btn");
    const bossHolder = document.getElementById("boss-svg-holder");
    const speechEl = document.getElementById("boss-speech-bubble");
    const statusEl = document.getElementById("boss-cannon-status");
    const beamEl = document.getElementById("arena-laser-beam");

    function renderShields() {
      if (!shieldsRow) return;
      let html = `<span style="font-size:0.74rem;font-weight:900;color:#fde047;letter-spacing:0.1em;margin-right:4px;">BOSS SHIELDS:</span>`;
      for (let i = 0; i < 3; i++) {
        const intact = i < shieldsLeft;
        html += `<div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.05rem;background:${
          intact ? "radial-gradient(circle,#67e8f9,#0284c7)" : "#1e293b"
        };border:2px solid ${intact ? "#ffffff" : "#475569"};opacity:${
          intact ? "1" : "0.35"
        };${intact ? "animation:shieldOrbPulse 1.8s infinite;" : ""}">${
          intact ? "🛡️" : "💥"
        }</div>`;
      }
      shieldsRow.innerHTML = html;
    }

    function loadArenaProblem() {
      const p = engine.getCurrentProblem();
      if (p && num1El && num2El && opEl) {
        num1El.textContent = p.num1;
        num2El.textContent = p.num2;
        opEl.textContent = p.operation;
      }
      if (inputEl) {
        inputEl.value = "";
        inputEl.focus();
      }
    }

    function spawnBurstParticles(originX, originY, colors, count = 36) {
      const host = document.getElementById("boss-arena-particles");
      if (!host) return;
      host.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        const c = colors[i % colors.length];
        const tx = (Math.random() - 0.5) * 620 + "px";
        const ty = (Math.random() - 0.65) * 460 + "px";
        const rot = (Math.random() * 540 - 270) + "deg";
        const sz = 10 + Math.random() * 14;
        p.style.cssText = `
          position:absolute;left:${originX};top:${originY};width:${sz}px;height:${sz}px;border-radius:50%;
          background:radial-gradient(circle at 30% 30%,#ffffff,${c});box-shadow:0 0 14px ${c};
          --tx:${tx};--ty:${ty};--rot:${rot};
          animation:coinFountainArc ${1.0 + Math.random() * 0.5}s cubic-bezier(0.16,1,0.3,1) forwards;
        `;
        host.appendChild(p);
      }
    }

    // --- 3-TIER LOOT CHEST CEREMONY ---
    function showThreeTierLootChest() {
      const controls = document.getElementById("boss-combat-controls");
      if (controls) controls.style.display = "none";

      const centerStage = document.getElementById("boss-center-stage");
      if (!centerStage) return;
      centerStage.style.pointerEvents = "auto";
      centerStage.style.top = "135px";

      centerStage.innerHTML = `
        <div id="chest-banner-title" style="font-size:1.55rem;font-weight:900;color:#fde047;text-shadow:0 0 18px #f59e0b;letter-spacing:0.06em;margin-bottom:6px;text-align:center;">
          🏆 BOSS DEFEATED! MYSTERY BOUNTY UNLOCKED!
        </div>
        <div id="chest-sub-prompt" style="font-size:0.95rem;font-weight:800;color:#67e8f9;margin-bottom:18px;text-align:center;">
          👇 Tap the Boss Chest to roll your 3-Tier Gold Reward! (25g / 35g / 50g)
        </div>

        <!-- INTERACTIVE SVG BOSS TREASURE CHEST -->
        <div id="boss-loot-chest-actor" style="width:250px;height:220px;cursor:pointer;animation:chestDropIn 0.75s cubic-bezier(0.22,1,0.36,1) forwards;">
          <svg viewBox="0 0 260 230" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 30px rgba(0,0,0,0.85));">
            <ellipse cx="130" cy="205" rx="95" ry="16" fill="rgba(250,204,21,0.35)" />
            <!-- Chest Base Box -->
            <rect x="42" y="105" width="176" height="92" rx="12" fill="#78350f" stroke="#fde047" stroke-width="5" />
            <rect x="52" y="115" width="156" height="72" rx="6" fill="#92400e" />
            <!-- Heavy Gold Corner Straps & Rivets -->
            <rect x="68" y="105" width="20" height="92" fill="#eab308" stroke="#451a03" stroke-width="2" />
            <rect x="172" y="105" width="20" height="92" fill="#eab308" stroke="#451a03" stroke-width="2" />
            <!-- Domed Chest Lid -->
            <path d="M 38 105 C 38 48, 222 48, 222 105 Z" fill="#b45309" stroke="#fde047" stroke-width="5" />
            <path d="M 68 105 L 68 62 L 88 58 L 88 105 Z M 172 105 L 172 58 L 192 62 L 192 105 Z" fill="#fde047" stroke="#451a03" stroke-width="2" />
            <!-- Center Glowing Gem Lock -->
            <rect x="112" y="88" width="36" height="42" rx="8" fill="#fef08a" stroke="#451a03" stroke-width="3" />
            <polygon points="130,96 140,109 130,122 120,109" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 8px #ef4444)" />
          </svg>
        </div>

        <div id="chest-collect-area" style="margin-top:18px;min-height:60px;display:flex;flex-direction:column;align-items:center;gap:10px;"></div>
      `;

      const chestEl = document.getElementById("boss-loot-chest-actor");
      let chestOpened = false;

      if (chestEl) {
        chestEl.addEventListener("click", () => {
          if (chestOpened) return;
          chestOpened = true;

          const subPrompt = document.getElementById("chest-sub-prompt");
          if (subPrompt) subPrompt.textContent = "🎲 Rolling Boss Loot Table...";
          chestEl.style.animation = "chestRollShake 0.85s ease-in-out infinite";

          // 3-Tier RNG Roll: 70% Bronze (25g), 25% Silver (35g), 5% Mega Golden Jackpot (50g)
          const roll = Math.random();
          let tier = {
            name: "🥉 BRONZE VANGUARD CHEST",
            gold: 25,
            color: "#38bdf8",
            glow: "#67e8f9",
            coins: 28
          };
          if (roll >= 0.95) {
            tier = {
              name: "🥇 MEGA GOLDEN JACKPOT!!",
              gold: 50,
              color: "#fde047",
              glow: "#f59e0b",
              coins: 65
            };
          } else if (roll >= 0.70) {
            tier = {
              name: "🥈 SILVER MYTHIC STASH!",
              gold: 35,
              color: "#e879f9",
              glow: "#c084fc",
              coins: 42
            };
          }

          setTimeout(() => {
            awardBonusGold(tier.gold);
            lastKnownGold =
              window.Economy && typeof window.Economy.getGold === "function"
                ? window.Economy.getGold()
                : lastKnownGold;

            spawnBurstParticles(
              "50%",
              "48%",
              ["#fde047", tier.color, "#ffffff", "#f59e0b"],
              tier.coins
            );

            const titleEl = document.getElementById("chest-banner-title");
            if (titleEl) {
              titleEl.textContent = tier.name;
              titleEl.style.color = tier.color;
            }
            if (subPrompt) {
              subPrompt.textContent = `🪙 +${tier.gold} BONUS GOLD ADDED TO YOUR BANK!`;
              subPrompt.style.color = "#4ade80";
              subPrompt.style.fontSize = "1.2rem";
            }

            // Render Open Chest Overflowing with Gold & Gems
            chestEl.style.animation = "chestIdleHover 2.6s ease-in-out infinite";
            chestEl.innerHTML = `
              <svg viewBox="0 0 260 230" style="width:100%;height:100%;overflow:visible;filter:drop-shadow(0 0 32px ${tier.color});">
                <circle cx="130" cy="115" r="95" fill="radial-gradient(circle, ${tier.color}55, transparent)" />
                <!-- Open Lid Tilted Back -->
                <path d="M 42 78 C 42 22, 218 22, 218 78 Z" fill="#78350f" stroke="${tier.color}" stroke-width="4" />
                <!-- Overflowing Mountain of Gold Coins & Gems Inside Chest -->
                <ellipse cx="130" cy="108" rx="78" ry="26" fill="#fde047" stroke="#f59e0b" stroke-width="3" filter="drop-shadow(0 0 16px #fde047)" />
                <circle cx="95" cy="102" r="11" fill="#fef08a" /><circle cx="122" cy="95" r="13" fill="#ffffff" />
                <circle cx="148" cy="98" r="12" fill="#fef08a" /><circle cx="168" cy="106" r="10" fill="#fde047" />
                <polygon points="112,92 120,76 128,92" fill="#38bdf8" />
                <polygon points="142,94 152,78 160,94" fill="#f43f5e" />
                <!-- Chest Base -->
                <rect x="42" y="108" width="176" height="88" rx="12" fill="#78350f" stroke="${tier.color}" stroke-width="5" />
                <rect x="68" y="108" width="20" height="88" fill="#eab308" />
                <rect x="172" y="108" width="20" height="88" fill="#eab308" />
                <text x="130" y="164" fill="#fef08a" font-size="34" font-weight="900" text-anchor="middle" filter="drop-shadow(0 4px 0 #451a03)">+${tier.gold}g</text>
              </svg>
            `;

            const collectArea = document.getElementById("chest-collect-area");
            if (collectArea) {
              const returnBtn = document.createElement("button");
              returnBtn.textContent = "🪙 Collect Bounty & Return to World";
              returnBtn.style.cssText =
                "cursor:pointer;padding:13px 28px;border-radius:14px;background:linear-gradient(135deg,#22c55e,#16a34a);border:3px solid #fef08a;color:#ffffff;font-weight:900;font-size:1.05rem;box-shadow:0 8px 24px rgba(34,197,94,0.6);";
              returnBtn.addEventListener("click", closeBossArena);
              collectArea.appendChild(returnBtn);
            }
          }, 950);
        });
      }
    }

    function handleFireCannon() {
      if (isTransitioning || !inputEl) return;
      const val = inputEl.value.trim();
      if (!val) return;

      const res = engine.submitAnswer(val);
      if (res && res.ignored) return;

      // Sync gold tracker so radar doesn't double-count arena answers
      if (window.Economy && typeof window.Economy.getGold === "function") {
        lastKnownGold = window.Economy.getGold();
      }

      if (res && res.success) {
        isTransitioning = true;
        shieldsLeft = Math.max(0, shieldsLeft - 1);
        renderShields();

        // Fire Orbital Cannon Beam
        if (beamEl) {
          beamEl.classList.remove("firing");
          void beamEl.offsetWidth;
          beamEl.classList.add("firing");
        }
        if (bossHolder) {
          bossHolder.classList.remove("boss-actor-hit", "boss-actor-laugh");
          void bossHolder.offsetWidth;
          bossHolder.classList.add("boss-actor-hit");
        }
        spawnBurstParticles("50%", "34%", [boss.accent, boss.secondary, "#fde047", "#ffffff"], 32);

        if (shieldsLeft > 0) {
          if (speechEl) {
            speechEl.textContent = `"${boss.hitQuote} (${shieldsLeft} Shield${
              shieldsLeft === 1 ? "" : "s"
            } left!)"`;
            speechEl.style.borderColor = "#4ade80";
          }
          if (statusEl) statusEl.textContent = "💥 DIRECT HIT!!";

          setTimeout(() => {
            isTransitioning = false;
            if (statusEl) statusEl.textContent = "CHARGE: ARMED";
            loadArenaProblem();
          }, 1050);
        } else {
          // ALL 3 SHIELDS SHATTERED -> BOSS DEFEATED!
          if (speechEl) {
            speechEl.textContent = `"NOOOO!! MY CORE IS OVERLOADING—!!"`;
            speechEl.style.borderColor = "#fde047";
          }
          if (statusEl) statusEl.textContent = "🏆 BOSS VAPORIZED!";
          if (bossHolder) {
            bossHolder.classList.remove("boss-actor-hit");
            bossHolder.classList.add("boss-actor-dead");
          }

          setTimeout(() => {
            showThreeTierLootChest();
          }, 1150);
        }
      } else {
        // Wrong Answer -> Boss blocks and laughs (no penalty!)
        if (bossHolder) {
          bossHolder.classList.remove("boss-actor-hit", "boss-actor-laugh");
          void bossHolder.offsetWidth;
          bossHolder.classList.add("boss-actor-laugh");
        }
        if (speechEl) {
          speechEl.textContent = `"${boss.missQuote}"`;
          speechEl.style.borderColor = "#ef4444";
        }
        if (statusEl) statusEl.textContent = "⚠️ SHOT DEFLECTED!";
        inputEl.style.borderColor = "#ef4444";

        setTimeout(() => {
          inputEl.style.borderColor = boss.accent;
          inputEl.value = "";
          inputEl.focus();
          if (statusEl) statusEl.textContent = "CHARGE: ARMED";
        }, 750);
      }
    }

    function closeBossArena() {
      arenaOpen = false;
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      // Refresh active zone equation so it's in sync
      const zoneInput = document.getElementById("math-answer-input");
      if (zoneInput) zoneInput.value = "";
      const p = engine ? engine.getCurrentProblem() : null;
      if (p) {
        const n1 = document.getElementById("math-num1");
        const n2 = document.getElementById("math-num2");
        const op = document.getElementById("math-op");
        if (n1 && n2 && op) {
          n1.textContent = p.num1;
          n2.textContent = p.num2;
          op.textContent = p.operation;
        }
      }
    }

    if (fireBtn) fireBtn.addEventListener("click", handleFireCannon);
    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleFireCannon();
      });
    }
    if (retreatBtn) retreatBtn.addEventListener("click", closeBossArena);

    renderShields();
    loadArenaProblem();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBossRadarHUD);
  } else {
    initBossRadarHUD();
  }
// Expose to window safely
  if (typeof window !== "undefined") {
    window.BossArena = {
      open: openBossArena,
      triggerReady: function () {
        bossReady = true;
        streakCount = 5;
        renderRadarHUD();
      }
    };
  }
})();
 
