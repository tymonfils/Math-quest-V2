// src/world/zones/spaceschool.js - Flagship Opening Biome: Galactic Star-Academy Observatory, Ringed Gas Giant & Wormhole Stargate
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadSpaceSchool() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("spaceschool-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "spaceschool-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes planetHover {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-9px); }
    }
    @keyframes galaxySpinSlow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes galaxySpinReverse {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes cruiserFlyRight {
      0% { transform: translateX(-380px) translateY(12px); }
      50% { transform: translateX(50vw) translateY(-14px); }
      100% { transform: translateX(118vw) translateY(6px); }
    }
    @keyframes fighterSquadStreak {
      0% { transform: translateX(118vw) translateY(40px); }
      100% { transform: translateX(-360px) translateY(-55px); }
    }
    @keyframes satelliteDrift {
      0%, 100% { transform: translateY(0px) rotate(-4deg); }
      50% { transform: translateY(-14px) rotate(5deg); }
    }
    @keyframes shootingStarStreak {
      0%, 78% { transform: translate(0, 0) scale(0); opacity: 0; }
      82% { transform: translate(-40px, 18px) scale(1); opacity: 1; }
      94% { transform: translate(-380px, 165px) scale(1); opacity: 0.9; }
      100% { transform: translate(-480px, 210px) scale(0.2); opacity: 0; }
    }
    @keyframes crystalPulse {
      0%, 100% { opacity: 0.72; filter: drop-shadow(0 0 8px #38bdf8); }
      50% { opacity: 1; filter: drop-shadow(0 0 18px #67e8f9); }
    }
    @keyframes starTwinkle {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 1; }
    }
    @keyframes novaHover {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes novaThrusterFlame {
      0%, 100% { transform: scaleY(0.88); opacity: 0.8; }
      50% { transform: scaleY(1.22); opacity: 1; }
    }
    @keyframes novaStaffWave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-10deg); }
    }
    @keyframes novaCelebrate {
      0% { transform: translateY(0) scale(1) rotate(0deg); }
      25% { transform: translateY(-32px) rotate(-6deg) scale(1.06); }
      50% { transform: translateY(-8px) rotate(5deg) scale(0.96, 1.04); }
      75% { transform: translateY(-22px) rotate(-3deg) scale(1.03); }
      100% { transform: translateY(0) scale(1) rotate(0deg); }
    }
    @keyframes novaShakeNo {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes stargatePortalIgnite {
      0% { opacity: 0; transform: scale(0.15) rotate(0deg); }
      20% { opacity: 1; transform: scale(1.08) rotate(90deg); }
      65% { opacity: 0.96; transform: scale(1) rotate(240deg); }
      100% { opacity: 0; transform: scale(1.35) rotate(360deg); }
    }
    @keyframes hyperdriveStarLines {
      0% { opacity: 0; transform: scale(0.45); }
      20% { opacity: 0.95; transform: scale(1); }
      75% { opacity: 0.85; transform: scale(1.18); }
      100% { opacity: 0; transform: scale(1.4); }
    }
    @keyframes spaceParticleArc {
      0% { transform: translate(0, 0) scale(0.3) rotate(0deg); opacity: 1; }
      60% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.3) rotate(var(--rot)); opacity: 0; }
    }
    .nova-idle {
      transform-origin: center bottom;
      animation: novaHover 3.4s ease-in-out infinite;
    }
    .nova-party {
      transform-origin: center bottom;
      animation: novaCelebrate 0.9s ease-in-out 2 !important;
    }
    .nova-oops {
      transform-origin: center bottom;
      animation: novaShakeNo 0.55s ease-in-out 1 !important;
    }
    #wormhole-stargate-fx {
      transform-origin: 720px 285px;
      opacity: 0;
      pointer-events: none;
    }
    #wormhole-stargate-fx.ignited {
      animation: stargatePortalIgnite 1.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    #hyperdrive-warp-lines {
      transform-origin: 720px 285px;
      opacity: 0;
      pointer-events: none;
    }
    #hyperdrive-warp-lines.ignited {
      animation: hyperdriveStarLines 1.65s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="spaceschool-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: radial-gradient(circle at 50% 32%, #17153b 0%, #090d1e 52%, #02040a 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN DEEP-SPACE PANORAMA, RINGED GAS GIANT, ORBITAL CITADEL & LUNAR BASE SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <radialGradient id="nebulaCloudPink" cx="24%" cy="30%" r="44%">
            <stop offset="0%" stop-color="#f472b6" stop-opacity="0.48" />
            <stop offset="40%" stop-color="#9333ea" stop-opacity="0.28" />
            <stop offset="75%" stop-color="#3b0764" stop-opacity="0.12" />
            <stop offset="100%" stop-color="#02040a" stop-opacity="0" />
          </radialGradient>

          <radialGradient id="nebulaCloudCyan" cx="72%" cy="28%" r="46%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.52" />
            <stop offset="42%" stop-color="#0284c7" stop-opacity="0.26" />
            <stop offset="78%" stop-color="#1e1b4b" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#02040a" stop-opacity="0" />
          </radialGradient>

          <radialGradient id="nebulaCoreGold" cx="50%" cy="38%" r="38%">
            <stop offset="0%" stop-color="#fde047" stop-opacity="0.32" />
            <stop offset="45%" stop-color="#f97316" stop-opacity="0.14" />
            <stop offset="100%" stop-color="#02040a" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="gasGiantBands" x1="0%" y1="0%" x2="15%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="14%" stop-color="#f59e0b" />
            <stop offset="28%" stop-color="#ea580c" />
            <stop offset="42%" stop-color="#f43f5e" />
            <stop offset="56%" stop-color="#a855f7" />
            <stop offset="72%" stop-color="#6366f1" />
            <stop offset="88%" stop-color="#311042" />
            <stop offset="100%" stop-color="#090418" />
          </linearGradient>

          <radialGradient id="planetShadowMask" cx="28%" cy="26%" r="72%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2" />
            <stop offset="50%" stop-color="#000000" stop-opacity="0" />
            <stop offset="82%" stop-color="#020617" stop-opacity="0.72" />
            <stop offset="100%" stop-color="#02040a" stop-opacity="0.95" />
          </radialGradient>

          <clipPath id="gasGiantSphereClip">
            <circle cx="0" cy="0" r="118" />
          </clipPath>

          <linearGradient id="planetaryRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85" />
            <stop offset="25%" stop-color="#fde047" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#f472b6" stop-opacity="0.8" />
            <stop offset="75%" stop-color="#fde047" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.85" />
          </linearGradient>

          <radialGradient id="volcanicMoonGrad" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="35%" stop-color="#f97316" />
            <stop offset="75%" stop-color="#7c2d12" />
            <stop offset="100%" stop-color="#1c0a02" />
          </radialGradient>

          <radialGradient id="icyMoonGrad" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="45%" stop-color="#67e8f9" />
            <stop offset="85%" stop-color="#0369a1" />
            <stop offset="100%" stop-color="#082f49" />
          </radialGradient>

          <linearGradient id="stationHullMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="35%" stop-color="#94a3b8" />
            <stop offset="70%" stop-color="#475569" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <linearGradient id="solarPanelGrid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1d4ed8" />
            <stop offset="50%" stop-color="#1e3a8a" />
            <stop offset="100%" stop-color="#172554" />
          </linearGradient>

          <linearGradient id="farLunarRidge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="55%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>

          <linearGradient id="midLunarSurface" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="35%" stop-color="#1e293b" />
            <stop offset="80%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#040812" />
          </linearGradient>

          <linearGradient id="nearLunarDeck" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>

          <linearGradient id="wormholeEventHorizon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#9333ea" />
            <stop offset="100%" stop-color="#fde047" />
          </linearGradient>

          <filter id="cosmicGlowBlur" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#nebulaCloudPink)" />
        <rect width="1440" height="900" fill="url(#nebulaCloudCyan)" />
        <rect width="1440" height="900" fill="url(#nebulaCoreGold)" />

        <g filter="url(#cosmicGlowBlur)" opacity="0.55">
          <path d="M 80 320 Q 160 180 280 240 T 520 140 T 760 220" fill="none" stroke="#e879f9" stroke-width="45" stroke-linecap="round" />
          <path d="M 680 180 Q 860 90 1040 190 T 1380 120" fill="none" stroke="#38bdf8" stroke-width="50" stroke-linecap="round" />
        </g>

        <!-- Starfield & Constellations -->
        <g fill="#ffffff">
          <circle cx="85" cy="82" r="2.2" /><circle cx="145" cy="54" r="2.8" /><circle cx="210" cy="78" r="2" />
          <circle cx="245" cy="135" r="2.2" /><circle cx="165" cy="152" r="1.8" /><circle cx="380" cy="65" r="1.6" />
          <circle cx="495" cy="52" r="2.4" /><circle cx="565" cy="38" r="2" /><circle cx="635" cy="72" r="2.8" />
          <polygon points="380,52 383,62 393,65 383,68 380,78 377,68 367,65 377,62" fill="#fef08a" />
        </g>

        <!-- Spiral Andromeda Galaxy -->
        <g transform="translate(275, 165) rotate(-22) scale(1, 0.44)">
          <g style="animation: galaxySpinSlow 55s linear infinite;">
            <path d="M 0 0 C 35 -10, 75 25, 95 68 C 110 105, 75 145, 25 145 C -45 145, -110 95, -125 25" fill="none" stroke="#e879f9" stroke-width="14" stroke-linecap="round" opacity="0.45" filter="url(#cosmicGlowBlur)" />
            <circle cx="0" cy="0" r="34" fill="#fde047" opacity="0.65" filter="url(#cosmicGlowBlur)" />
            <circle cx="0" cy="0" r="16" fill="#ffffff" />
          </g>
        </g>

        <!-- Gas Giant Planet "Chronos Prime" -->
        <g transform="translate(1135, 225)">
          <g style="animation: planetHover 6s ease-in-out infinite;">
            <g transform="rotate(-18)">
              <path d="M -235 0 A 235 58 0 0 1 235 0" fill="none" stroke="url(#planetaryRingGrad)" stroke-width="22" opacity="0.78" />
            </g>
            <g clip-path="url(#gasGiantSphereClip)">
              <circle cx="0" cy="0" r="118" fill="url(#gasGiantBands)" />
              <ellipse cx="-28" cy="-18" rx="22" ry="13" transform="rotate(-18 -28 -18)" fill="#38bdf8" stroke="#fef08a" stroke-width="2.5" />
              <circle cx="0" cy="0" r="118" fill="url(#planetShadowMask)" />
            </g>
            <circle cx="0" cy="0" r="118" fill="none" stroke="#67e8f9" stroke-width="3" opacity="0.7" filter="drop-shadow(0 0 18px rgba(56,189,248,0.55))" />
            <g transform="rotate(-18)">
              <path d="M -235 0 A 235 58 0 0 0 235 0" fill="none" stroke="url(#planetaryRingGrad)" stroke-width="22" opacity="0.95" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.65))" />
            </g>
          </g>
        </g>

        <!-- Orbital Dyson Ring Station -->
        <g transform="translate(720, 285)" filter="drop-shadow(0 16px 28px rgba(0,0,0,0.85))">
          <g style="animation: galaxySpinSlow 45s linear infinite;">
            <circle cx="0" cy="0" r="128" fill="none" stroke="url(#stationHullMetal)" stroke-width="18" />
            <circle cx="0" cy="0" r="128" fill="none" stroke="#67e8f9" stroke-width="4" stroke-dasharray="8 14" />
          </g>
          <circle cx="0" cy="0" r="42" fill="#090d1e" stroke="#38bdf8" stroke-width="4" />
          <circle cx="0" cy="0" r="26" fill="#0284c7" stroke="#67e8f9" stroke-width="2.5" filter="drop-shadow(0 0 16px #38bdf8)" />
          <circle cx="0" cy="0" r="12" fill="#ffffff" />
        </g>

        <!-- Success Event Wormhole & Hyperspace Warp Lines -->
        <g id="hyperdrive-warp-lines">
          <g stroke="#67e8f9" stroke-width="3.5" stroke-linecap="round" opacity="0.85">
            <line x1="720" y1="285" x2="40" y2="20" /><line x1="720" y1="285" x2="1400" y2="20" />
            <line x1="720" y1="285" x2="0" y2="220" /><line x1="720" y1="285" x2="1440" y2="220" />
          </g>
        </g>

        <g id="wormhole-stargate-fx">
          <circle cx="720" cy="285" r="122" fill="url(#wormholeEventHorizon)" />
          <circle cx="720" cy="285" r="105" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="28 14" />
          <circle cx="720" cy="285" r="76" fill="none" stroke="#fde047" stroke-width="6" stroke-dasharray="18 12" />
        </g>

        <!-- Lunar Base Surface -->
        <path d="M -80 505 Q 260 430 640 490 T 1520 465 L 1520 900 L -80 900 Z" fill="url(#farLunarRidge)" />
        <path d="M -100 555 Q 340 485 760 550 T 1540 520 L 1540 900 L -100 900 Z" fill="url(#midLunarSurface)" />
      </svg>

      <div id="spaceschool-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. QUANTUM HOLO-TABLE COMMAND CONSOLE (MATH BOARD) + COMMANDER NOVA -->
      <div style="position: absolute; bottom: 178px; left: 47%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 32px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- THE QUANTUM HOLOLABEL TABLE -->
        <div id="holotable-board" style="position: relative; width: 410px; max-width: 56vw; min-height: 260px; background: radial-gradient(circle at 50% 35%, #0c4a6e 0%, #090d1e 70%, #02040a 100%); border: 7px solid #38bdf8; border-radius: 20px; box-shadow: 0 18px 38px rgba(2, 6, 23, 0.85), inset 0 0 28px rgba(56, 189, 248, 0.35); padding: 26px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
          
          <div style="position: absolute; top: -16px; background: linear-gradient(90deg, #0284c7, #38bdf8, #0284c7); border: 3px solid #fde047; color: #f0fdf4; font-weight: 900; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(2,132,199,0.5);">
            🌌 Quantum Astro-Holocron
          </div>

          <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', monospace; font-size: 3.9rem; font-weight: 900; color: #f0fdf4; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 0 16px rgba(56, 189, 248, 0.9);">
              <div id="math-num1">17</div>
              <div style="display: flex; align-items: center; gap: 18px;">
                <span id="math-op" style="color: #38bdf8; font-size: 3.2rem; text-shadow: 0 0 12px #38bdf8;">+</span>
                <span id="math-num2">15</span>
              </div>
              <div style="width: 108%; height: 7px; background: #38bdf8; border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 0 10px #38bdf8;"></div>
              <div id="math-question-mark" style="color: #fde047; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 0 12px rgba(250, 204, 21, 0.8);">??</div>
            </div>
          </div>
        </div>

        <!-- COMMANDER NOVA — HIGH-DETAIL GALAXY FLIGHT INSTRUCTOR -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -4px;">
          <div id="nova-speech-bubble" style="background: #082f49; color: #38bdf8; border: 3px solid #38bdf8; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #0284c7, 0 8px 16px rgba(0,0,0,0.55); white-space: nowrap; transition: all 0.2s;">
            Solve the coordinates to ignite the Stargate! 🚀✨
          </div>

          <div style="position: relative; width: 195px; height: 235px; display: flex; justify-content: center; align-items: flex-end;">
            <div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 165px; height: 26px; background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.55) 0%, rgba(2, 6, 23, 0.8) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>

            <div id="nova-mascot" class="nova-idle" style="position: relative; width: 190px; height: 220px; z-index: 2; filter: drop-shadow(0 10px 18px rgba(2, 6, 23, 0.7));">
              <svg viewBox="0 0 220 240" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <linearGradient id="novaSuit" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" />
                    <stop offset="50%" stop-color="#0284c7" />
                    <stop offset="100%" stop-color="#0f172a" />
                  </linearGradient>
                </defs>

                <!-- Jetpack & Hover Thrusters -->
                <rect x="92" y="110" width="36" height="52" rx="8" fill="#334155" stroke="#0f172a" stroke-width="2.5" />
                <ellipse cx="110" cy="165" rx="14" ry="7" fill="#67e8f9" filter="drop-shadow(0 0 10px #38bdf8)" />

                <!-- Space Suit Torso & Golden Pauldrons -->
                <rect x="74" y="122" width="72" height="74" rx="26" fill="url(#novaSuit)" stroke="#0f172a" stroke-width="2.8" />
                <circle cx="110" cy="155" r="9" fill="#fde047" stroke="#b45309" stroke-width="2" filter="drop-shadow(0 0 8px #fde047)" />
                <polygon points="76,122 56,132 74,146" fill="#fde047" stroke="#b45309" stroke-width="1.8" />
                <polygon points="144,122 164,132 146,146" fill="#fde047" stroke="#b45309" stroke-width="1.8" />

                <!-- Bubble Helmet & Face -->
                <circle cx="110" cy="78" r="34" fill="rgba(186, 230, 253, 0.24)" stroke="#38bdf8" stroke-width="3" />
                <circle cx="110" cy="78" r="26" fill="#fcd34d" stroke="#b45309" stroke-width="2" />
                <circle cx="98" cy="72" r="4" fill="#0f172a" />
                <circle cx="122" cy="72" r="4" fill="#0f172a" />
                <path d="M 102 90 Q 110 96 118 90" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
                <path d="M 82 65 A 24 24 0 0 1 138 65" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. STAR-ACADEMY CONSOLE CONTROL DECK -->
      <div style="position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 26px rgba(2, 6, 23, 0.85));">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #020617 100%); border: 3px solid #38bdf8; border-radius: 16px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 0 22px rgba(56,189,248,0.35);">
          
          <div style="display: flex; flex-direction: column; min-width: 155px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #38bdf8; letter-spacing: 0.14em; text-transform: uppercase;">🚀 COMMAND CONSOLE</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #f0fdf4; letter-spacing: 0.06em;">GATEWAY: STANDBY</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.95rem; font-weight: 900; color: #f0fdf4; background: #020617; border: 3px solid #38bdf8; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.4), 0 0 12px rgba(56,189,248,0.45);" />

          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #fde047; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 0 4px 14px rgba(56,189,248,0.45); transition: transform 0.1s;">
            Submit
          </button>
        </div>
      </div>

    </div>
  `;

  loadNewEquation();
  setupMathControls();
}

export function loadNewEquation() {
  const problem = getCurrentProblem();
  const elNum1 = document.getElementById("math-num1");
  const elNum2 = document.getElementById("math-num2");
  const elOp = document.getElementById("math-op");

  if (elNum1 && elNum2 && elOp) {
    elNum1.textContent = problem.num1;
    elNum2.textContent = problem.num2;
    elOp.textContent = problem.operation;
  }
}

function triggerStargateWarp() {
  const stargate = document.getElementById("wormhole-stargate-fx");
  const warpLines = document.getElementById("hyperdrive-warp-lines");
  const particleHost = document.getElementById("spaceschool-eruption-particles");

  if (stargate) {
    stargate.classList.remove("ignited");
    void stargate.offsetWidth;
    stargate.classList.add("ignited");
  }
  if (warpLines) {
    warpLines.classList.remove("ignited");
    void warpLines.offsetWidth;
    warpLines.classList.add("ignited");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#38bdf8", "#67e8f9", "#fde047", "#ffffff", "#f472b6"];

  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    const color = colors[i % colors.length];
    const tx = (Math.random() - 0.5) * 580 + "px";
    const ty = -(140 + Math.random() * 380) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";
    const size = 8 + Math.random() * 12;

    p.style.cssText = `
      position: absolute;
      left: 50%;
      top: 32%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #ffffff, ${color});
      box-shadow: 0 0 14px ${color};
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: spaceParticleArc ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const nova = document.getElementById("nova-mascot");
  const speech = document.getElementById("nova-speech-bubble");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerStargateWarp();

      if (nova) {
        nova.classList.remove("nova-party", "nova-oops");
        void nova.offsetWidth;
        nova.classList.add("nova-party");
      }
      if (speech) {
        speech.textContent = "STARGATE ENGAGED! HYPERSPACE JUMP!! 🚀✨";
        speech.style.borderColor = "#fde047";
      }

      setStatus("🚀 STARGATE JUMP ACTIVE!!");
      input.style.borderColor = "#34d399";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("GATEWAY: STANDBY");
        if (speech) {
          speech.textContent = "Outstanding piloting! Next coordinates! 🌌";
          speech.style.borderColor = "#38bdf8";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (nova) {
        nova.classList.remove("nova-party", "nova-oops");
        void nova.offsetWidth;
        nova.classList.add("nova-oops");
      }
      if (speech) {
        speech.textContent = "Jump coordinates misaligned! Retry! ⚠️";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("⚠️ WARP ERROR! RETRY");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("GATEWAY: STANDBY");
        if (speech) {
          speech.textContent = "Check your calculations, cadet! 🚀";
          speech.style.borderColor = "#38bdf8";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleKeyCheck); // fallback or direct bind
  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}

// Export aliases
export const loadSpaceAcademy = loadSpaceSchool;
