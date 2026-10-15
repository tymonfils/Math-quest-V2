import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadSpaceSchool() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  // Ensure keyframe animations exist in document head
  let styleEl = document.getElementById("spaceschool-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "spaceschool-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes scrollStarsSlow {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes scrollStarsFast {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes twinkleLayer {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 0.95; }
    }
    @keyframes floatPlanet {
      0%, 100% { transform: translateY(0px) rotate(-12deg); }
      50% { transform: translateY(-8px) rotate(-10deg); }
    }
    @keyframes cometShoot1 {
      0% { transform: translate(-140px, -40px) rotate(24deg) scale(0.8); opacity: 0; }
      8% { opacity: 1; }
      38% { transform: translate(780px, 340px) rotate(24deg) scale(1.05); opacity: 0; }
      100% { transform: translate(780px, 340px) rotate(24deg) scale(1.05); opacity: 0; }
    }
    @keyframes cometShoot2 {
      0% { transform: translate(-160px, 20px) rotate(16deg) scale(0.9); opacity: 0; }
      10% { opacity: 1; }
      42% { transform: translate(820px, 260px) rotate(16deg) scale(1); opacity: 0; }
      100% { transform: translate(820px, 260px) rotate(16deg) scale(1); opacity: 0; }
    }
    @keyframes cometShoot3 {
      0% { transform: translate(-120px, -20px) rotate(31deg) scale(0.7); opacity: 0; }
      7% { opacity: 0.95; }
      32% { transform: translate(720px, 410px) rotate(31deg) scale(0.95); opacity: 0; }
      100% { transform: translate(720px, 410px) rotate(31deg) scale(0.95); opacity: 0; }
    }
    @keyframes cometShoot4 {
      0% { transform: translate(-150px, 0px) rotate(19deg) scale(1); opacity: 0; }
      9% { opacity: 1; }
      36% { transform: translate(800px, 290px) rotate(19deg) scale(1.1); opacity: 0; }
      100% { transform: translate(800px, 290px) rotate(19deg) scale(1.1); opacity: 0; }
    }
    @keyframes pulseFlameCore {
      0% { transform: scaleY(0.95) scaleX(0.9); opacity: 0.85; filter: drop-shadow(0 0 6px #38bdf8); }
      50% { transform: scaleY(1.3) scaleX(1.1); opacity: 1; filter: drop-shadow(0 0 18px #38bdf8); }
      100% { transform: scaleY(0.9) scaleX(0.95); opacity: 0.8; filter: drop-shadow(0 0 10px #38bdf8); }
    }
    @keyframes pulseShockRings {
      0% { opacity: 0.9; transform: translateY(0px) scale(0.9); }
      100% { opacity: 0; transform: translateY(35px) scale(1.4); }
    }
    .vfx-core { transform-origin: top center; animation: pulseFlameCore 0.12s infinite alternate; }
    .vfx-ring { transform-origin: top center; animation: pulseShockRings 0.4s infinite linear; }
    @keyframes hoverTeacher {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-7px) rotate(1.5deg); }
    }
    @keyframes botHandLeft {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    @keyframes botHandRight {
      0%, 100% { transform: translateY(-3px); }
      50% { transform: translateY(2px); }
    }
    @keyframes botAntennaPulse {
      0%, 100% { opacity: 0.6; r: 3.5; }
      50% { opacity: 1; r: 5; }
    }
    @keyframes flickerRepulsor {
      0% { opacity: 0.7; transform: scaleX(0.92) scaleY(0.95); }
      100% { opacity: 1; transform: scaleX(1.08) scaleY(1.08); }
    }
    @keyframes rocketLaunch {
      0% { transform: translateY(0); }
      45% { transform: translateY(-700px); opacity: 0; }
      50% { transform: translateY(700px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .rocket-launching {
      animation: rocketLaunch 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
  `;

  zoneLayer.innerHTML = [
    '<div style="width: 100%; height: 100%; background: #0f172a; display: grid; grid-template-columns: 4fr 5fr; gap: 20px; padding: 20px; box-sizing: border-box; font-family: \'Segoe UI\', sans-serif;">',
      
      // 2. LEFT: UPGRADED DEEP-SPACE OBSERVATION WINDOW
      '<div style="position: relative; border-radius: 20px; overflow: hidden; border: 4px solid #334155; box-shadow: inset 0 0 40px rgba(0,0,0,0.95);">',
        
        // Deep Space Gradient Void
        '<div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(ellipse at 30% 20%, #0b1528 0%, #030712 65%, #010206 100%);"></div>',
        
        // Cosmic Nebula Clouds (Multi-color atmospheric glow)
        '<div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at 72% 28%, rgba(56, 189, 248, 0.22) 0%, transparent 52%), radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.18) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.1) 0%, transparent 60%); pointer-events: none;"></div>',

        // Far Parallax Star Layer (Small, dense, slow drift)
        '<div style="position: absolute; width: 200%; height: 100%; background-image: radial-gradient(1px 1px at 18px 24px, #94a3b8 100%, transparent), radial-gradient(1px 1px at 74px 92px, #cbd5e1 100%, transparent), radial-gradient(1.2px 1.2px at 128px 40px, #64748b 100%, transparent), radial-gradient(1px 1px at 160px 135px, #e2e8f0 100%, transparent), radial-gradient(1px 1px at 45px 150px, #94a3b8 100%, transparent); background-size: 180px 180px; opacity: 0.65; animation: scrollStarsSlow 36s linear infinite;"></div>',

        // Mid Twinkling Star Layer (Colored stars + gentle pulse)
        '<div style="position: absolute; width: 200%; height: 100%; background-image: radial-gradient(1.6px 1.6px at 32px 48px, #f8fafc 100%, transparent), radial-gradient(1.8px 1.8px at 95px 85px, #38bdf8 100%, transparent), radial-gradient(1.5px 1.5px at 145px 30px, #f472b6 90%, transparent), radial-gradient(2px 2px at 60px 140px, #fde047 85%, transparent), radial-gradient(1.4px 1.4px at 185px 115px, #c084fc 90%, transparent); background-size: 200px 170px; animation: scrollStarsSlow 22s linear infinite, twinkleLayer 3.5s ease-in-out infinite;"></div>',

        // Near Foreground Star Layer (Bright crisp stars moving faster for 3D parallax)
        '<div style="position: absolute; width: 200%; height: 100%; background-image: radial-gradient(2.2px 2.2px at 45px 65px, #ffffff 100%, transparent), radial-gradient(2.5px 2.5px at 150px 125px, #bae6fd 100%, transparent), radial-gradient(2px 2px at 210px 40px, #fef08a 100%, transparent); background-size: 240px 210px; opacity: 0.9; filter: drop-shadow(0 0 3px #ffffff); animation: scrollStarsFast 12s linear infinite;"></div>',

        // Distant Ringed Exo-Planet in Top-Right Corner
        '<div style="position: absolute; top: 12%; right: 12%; width: 78px; height: 78px; pointer-events: none; animation: floatPlanet 9s ease-in-out infinite;">',
          '<svg viewBox="0 0 120 120" style="width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.25));">',
            '<defs>',
              '<radialGradient id="planetSphere" cx="35%" cy="30%" r="70%">',
                '<stop offset="0%" stop-color="#67e8f9" />',
                '<stop offset="45%" stop-color="#0284c7" />',
                '<stop offset="85%" stop-color="#1e1b4b" />',
                '<stop offset="100%" stop-color="#020617" />',
              '</radialGradient>',
            '</defs>',
            '<ellipse cx="60" cy="62" rx="54" ry="14" fill="none" stroke="rgba(125, 211, 252, 0.35)" stroke-width="5" />',
            '<circle cx="60" cy="60" r="28" fill="url(#planetSphere)" />',
            '<path d="M 6 62 A 54 14 0 0 0 114 62" fill="none" stroke="#38bdf8" stroke-width="3.5" opacity="0.65" />',
          '</svg>',
        '</div>',

        // Upgraded Shooting Comets (Glowing Head + Tapered Plasma Tail)
        '<div style="position: absolute; top: 10%; left: 0; width: 150px; height: 3px; background: linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.15) 35%, rgba(186, 230, 253, 0.85) 88%, #ffffff 100%); border-radius: 999px; filter: drop-shadow(0 0 6px #38bdf8); animation: cometShoot1 5.2s ease-in infinite;">',
          '<div style="position: absolute; right: -2px; top: -2.5px; width: 8px; height: 8px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 10px 2px #38bdf8;"></div>',
        '</div>',

        '<div style="position: absolute; top: 34%; left: 0; width: 185px; height: 2.5px; background: linear-gradient(90deg, transparent 0%, rgba(244, 114, 182, 0.15) 35%, rgba(251, 207, 232, 0.85) 88%, #ffffff 100%); border-radius: 999px; filter: drop-shadow(0 0 7px #f472b6); animation: cometShoot2 7.4s ease-in 1.8s infinite;">',
          '<div style="position: absolute; right: -2px; top: -2.5px; width: 7px; height: 7px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 10px 2px #f472b6;"></div>',
        '</div>',

        '<div style="position: absolute; top: 58%; left: 0; width: 125px; height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(253, 224, 71, 0.15) 40%, rgba(254, 240, 138, 0.9) 90%, #ffffff 100%); border-radius: 999px; filter: drop-shadow(0 0 5px #fde047); animation: cometShoot3 4.3s ease-in 3.1s infinite;">',
          '<div style="position: absolute; right: -2px; top: -2px; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 8px 2px #fde047;"></div>',
        '</div>',

        '<div style="position: absolute; top: 76%; left: 0; width: 165px; height: 2.5px; background: linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.15) 35%, rgba(216, 180, 254, 0.85) 88%, #ffffff 100%); border-radius: 999px; filter: drop-shadow(0 0 6px #c084fc); animation: cometShoot4 6.1s ease-in 0.9s infinite;">',
          '<div style="position: absolute; right: -2px; top: -2.5px; width: 7px; height: 7px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 9px 2px #c084fc;"></div>',
        '</div>',

        // Subtle Glass Reflection + Heavy Spaceship Window Frame Bevel
        '<div style="position: absolute; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 35%, transparent 100%); pointer-events: none;"></div>',
        '<div style="position: absolute; width: 100%; height: 100%; border: 18px solid #1e293b; box-sizing: border-box; box-shadow: inset 0 0 28px rgba(0,0,0,0.95); pointer-events: none;"></div>',
      '</div>',

      // 3. RIGHT: BOARD & CONSOLE
      '<div style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">',
        
        // 3A. MAIN WHITEBOARD HUD
        '<div id="classroom-hud" style="flex-grow: 1; margin: 0 0 16px 0; border: 4px solid #38bdf8; border-radius: 18px; background: rgba(15, 23, 42, 0.95); box-shadow: 0 0 25px rgba(56, 189, 248, 0.25), inset 0 0 20px rgba(0,0,0,0.7); display: grid; grid-template-columns: 2fr 1fr; align-items: center; position: relative; overflow: hidden; padding: 15px;">',
          '<div style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-image: linear-gradient(#1e293b 1.5px, transparent 1.5px), linear-gradient(90deg, #1e293b 1.5px, transparent 1.5px); background-size: 28px 28px; opacity: 0.5; pointer-events: none;"></div>',
          '<div id="equation-container" style="z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">',
            '<div style="display: flex; flex-direction: column; align-items: flex-end; font-family: monospace; font-size: 3.5rem; font-weight: bold; color: #f8fafc; letter-spacing: 0.1em; line-height: 1.1; text-shadow: 0 0 15px rgba(56, 189, 248, 0.6);">',
              '<div id="math-num1">54</div>',
              '<div style="display: flex; align-items: center; gap: 15px;">',
                '<span id="math-op" style="color: #38bdf8; font-size: 2.8rem;">-</span>',
                '<span id="math-num2">28</span>',
              '</div>',
              '<div style="width: 100%; height: 4px; background: #38bdf8; margin: 8px 0; box-shadow: 0 0 10px #38bdf8;"></div>',
              '<div style="color: #38bdf8; letter-spacing: 0.2em;">??</div>',
            '</div>',
          '</div>',
          '<div style="z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 2px dashed #334155; height: 85%; padding-left: 10px;">',
            '<svg id="rocket-svg" viewBox="0 0 200 320" style="width: 105px; filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));">',
              '<defs>',
                '<linearGradient id="plasmaCore" x1="0%" y1="0%" x2="0%" y2="100%">',
                  '<stop offset="0%" stop-color="#ffffff" />',
                  '<stop offset="25%" stop-color="#7dd3fc" />',
                  '<stop offset="65%" stop-color="#0284c7" />',
                  '<stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />',
                '</linearGradient>',
                '<linearGradient id="hullMetal" x1="0%" y1="0%" x2="100%" y2="0%">',
                  '<stop offset="0%" stop-color="#64748b" />',
                  '<stop offset="35%" stop-color="#cbd5e1" />',
                  '<stop offset="65%" stop-color="#94a3b8" />',
                  '<stop offset="100%" stop-color="#334155" />',
                '</linearGradient>',
              '</defs>',
              '<path d="M100 15 C85 60 60 120 60 210 L140 210 C140 120 115 60 100 15 Z" fill="url(#hullMetal)" stroke="#38bdf8" stroke-width="2" />',
              '<path d="M100 15 C92 45 80 80 80 80 L120 80 C120 80 108 45 100 15 Z" fill="#0284c7" opacity="0.8" />',
              '<line x1="100" y1="80" x2="100" y2="210" stroke="#0f172a" stroke-width="2" opacity="0.5" />',
              '<line x1="75" y1="140" x2="125" y2="140" stroke="#0f172a" stroke-width="1.5" opacity="0.4" />',
              '<line x1="70" y1="180" x2="130" y2="180" stroke="#0f172a" stroke-width="1.5" opacity="0.4" />',
              '<circle cx="100" cy="115" r="20" fill="#0f172a" stroke="#38bdf8" stroke-width="3" />',
              '<circle cx="100" cy="115" r="14" fill="#0284c7" opacity="0.6" />',
              '<path d="M92 105 A 12 12 0 0 1 108 107" fill="none" stroke="#e0f2fe" stroke-width="2" opacity="0.8" />',
              '<path d="M60 170 L25 220 L60 215 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />',
              '<path d="M140 170 L175 220 L140 215 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />',
              '<path d="M78 210 L68 230 L132 230 L122 210 Z" fill="#1e293b" stroke="#64748b" stroke-width="2" />',
              '<path class="vfx-core" d="M66 230 C66 270 90 310 100 320 C110 310 134 270 134 230 Z" fill="url(#plasmaCore)" opacity="0.8" />',
              '<path class="vfx-core" d="M78 230 C82 260 96 290 100 295 C104 290 118 260 122 230 Z" fill="#ffffff" opacity="0.9" />',
              '<ellipse class="vfx-ring" cx="100" cy="245" rx="16" ry="4" fill="none" stroke="#e0f2fe" stroke-width="2" />',
              '<ellipse class="vfx-ring" cx="100" cy="265" rx="22" ry="5" fill="none" stroke="#38bdf8" stroke-width="1.5" style="animation-delay: 0.2s;" />',
            '</svg>',
            '<span style="font-size: 0.75rem; color: #64748b; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 6px;">Propulsion</span>',
          '</div>',
        '</div>',

        // 3B. CONSOLE INTERFACE + UPGRADED ROBOT TEACHER + INPUT
        '<div style="height: 125px; border-radius: 16px; background: #1e293b; border: 3px solid #475569; box-shadow: 0 6px 20px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; box-sizing: border-box; gap: 12px;">',
          '<div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-width: 140px;">',
            '<div style="display: flex; gap: 10px; align-items: center;">',
              '<div style="width: 14px; height: 14px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 10px #38bdf8;"></div>',
              '<span id="system-status-text" style="font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.1em;">SYSTEM: READY</span>',
            '</div>',
            '<div style="width: 100%; height: 6px; border-radius: 3px; background: #334155; overflow: hidden;">',
              '<div style="width: 65%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8);"></div>',
            '</div>',
            '<div style="display: flex; gap: 8px;">',
              '<div style="width: 18px; height: 18px; border-radius: 4px; background: #f472b6; opacity: 0.75;"></div>',
              '<div style="width: 18px; height: 18px; border-radius: 4px; background: #38bdf8; opacity: 0.75;"></div>',
              '<div style="width: 18px; height: 18px; border-radius: 4px; background: #10b981; opacity: 0.75;"></div>',
            '</div>',
          '</div>',

          // UPGRADED FLOATING ROBOT INSTRUCTOR ("PROFESSOR ORBIT")
          '<div style="display: flex; justify-content: center; align-items: center; animation: hoverTeacher 3.6s ease-in-out infinite;">',
            '<svg style="width: 88px; height: 104px; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.55));" viewBox="0 0 120 135">',
              '<defs>',
                '<linearGradient id="botMetalHead" x1="0%" y1="0%" x2="100%" y2="100%">',
                  '<stop offset="0%" stop-color="#f8fafc" />',
                  '<stop offset="55%" stop-color="#cbd5e1" />',
                  '<stop offset="100%" stop-color="#64748b" />',
                '</linearGradient>',
                '<linearGradient id="botMetalBody" x1="0%" y1="0%" x2="100%" y2="0%">',
                  '<stop offset="0%" stop-color="#94a3b8" />',
                  '<stop offset="30%" stop-color="#f1f5f9" />',
                  '<stop offset="75%" stop-color="#cbd5e1" />',
                  '<stop offset="100%" stop-color="#475569" />',
                '</linearGradient>',
                '<radialGradient id="botCoreGlow" cx="50%" cy="50%" r="50%">',
                  '<stop offset="0%" stop-color="#ffffff" />',
                  '<stop offset="45%" stop-color="#38bdf8" />',
                  '<stop offset="100%" stop-color="#0284c7" stop-opacity="0" />',
                '</radialGradient>',
              '</defs>',

              // Antenna & Glowing Beacon
              '<line x1="60" y1="18" x2="60" y2="7" stroke="#64748b" stroke-width="3" stroke-linecap="round" />',
              '<circle cx="60" cy="6" r="4.5" fill="#38bdf8" style="animation: botAntennaPulse 1.5s infinite ease-in-out;" />',
              '<circle cx="60" cy="6" r="2" fill="#ffffff" />',

              // Ear Transceivers
              '<rect x="19" y="29" width="7" height="18" rx="3" fill="#38bdf8" stroke="#1e293b" stroke-width="2" />',
              '<rect x="94" y="29" width="7" height="18" rx="3" fill="#38bdf8" stroke="#1e293b" stroke-width="2" />',

              // Head Chassis + Forehead Brow Plate
              '<rect x="25" y="16" width="70" height="44" rx="14" fill="url(#botMetalHead)" stroke="#1e293b" stroke-width="2.5" />',
              '<path d="M 35 20 L 85 20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7" />',

              // Glossy Dark Visor Screen
              '<rect x="31" y="23" width="58" height="30" rx="9" fill="#090d16" stroke="#334155" stroke-width="1.5" />',

              // Glowing Cyan Eyes with Specular Highlights
              '<rect x="39" y="29" width="13" height="13" rx="4" fill="#38bdf8" />',
              '<circle cx="43" cy="33" r="2.2" fill="#ffffff" />',
              '<rect x="68" y="29" width="13" height="13" rx="4" fill="#38bdf8" />',
              '<circle cx="72" cy="33" r="2.2" fill="#ffffff" />',

              // Happy Digital Mouth / Voice Equalizer Arc
              '<path d="M 52 46 Q 60 51 68 46" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />',

              // Visor Glass Reflection Streak
              '<path d="M 35 26 L 48 26" stroke="#e0f2fe" stroke-width="1.5" stroke-linecap="round" opacity="0.35" />',

              // Neck Joint
              '<rect x="51" y="60" width="18" height="6" rx="2" fill="#334155" />',

              // Floating Left Hand
              '<g style="animation: botHandLeft 2.4s ease-in-out infinite;">',
                '<circle cx="14" cy="84" r="7" fill="url(#botMetalHead)" stroke="#1e293b" stroke-width="2" />',
                '<circle cx="14" cy="84" r="2.5" fill="#38bdf8" />',
              '</g>',

              // Floating Right Hand
              '<g style="animation: botHandRight 2.4s ease-in-out infinite;">',
                '<circle cx="106" cy="84" r="7" fill="url(#botMetalHead)" stroke="#1e293b" stroke-width="2" />',
                '<circle cx="106" cy="84" r="2.5" fill="#38bdf8" />',
              '</g>',

              // Torso Armor + Shoulder Pads
              '<path d="M 27 66 L 93 66 L 81 107 L 39 107 Z" fill="url(#botMetalBody)" stroke="#1e293b" stroke-width="2.5" stroke-linejoin="round" />',
              '<path d="M 31 70 L 89 70" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />',

              // Chest Arc Reactor & Telemetry Badge
              '<circle cx="60" cy="84" r="11" fill="#0f172a" stroke="#334155" stroke-width="2" />',
              '<circle cx="60" cy="84" r="7.5" fill="#38bdf8" opacity="0.9" />',
              '<circle cx="60" cy="84" r="3.5" fill="#ffffff" />',
              '<line x1="42" y1="98" x2="78" y2="98" stroke="#475569" stroke-width="2" stroke-linecap="round" />',

              // Bottom Thruster Nozzle
              '<path d="M 45 107 L 75 107 L 69 114 L 51 114 Z" fill="#1e293b" />',

              // Multi-Ring Repulsor Jet Plume
              '<g style="transform-origin: 60px 114px; animation: flickerRepulsor 0.18s infinite alternate;">',
                '<ellipse cx="60" cy="121" rx="14" ry="8" fill="url(#botCoreGlow)" />',
                '<ellipse cx="60" cy="118" rx="8" ry="4" fill="#e0f2fe" />',
              '</g>',
            '</svg>',
          '</div>',

          // ANSWER INPUT + SUBMIT BUTTON
          '<div style="display: flex; align-items: center; gap: 8px; position: relative; z-index: 5; pointer-events: auto;">',
            '<input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 70px; height: 50px; text-align: center; font-size: 1.8rem; font-weight: bold; color: #f8fafc; background: #0f172a; border: 2px solid #38bdf8; border-radius: 10px; outline: none; box-shadow: 0 0 12px rgba(56,189,248,0.3);" />',
            '<button id="math-submit-btn" style="pointer-events: auto; height: 50px; padding: 0 16px; background: linear-gradient(135deg, #0284c7, #38bdf8); color: #0f172a; font-weight: 800; font-size: 1rem; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(56,189,248,0.4); text-transform: uppercase; letter-spacing: 0.05em;">Launch</button>',
          '</div>',
        '</div>',
      '</div>',
    '</div>'
  ].join("");

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

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const rocket = document.getElementById("rocket-svg");
  const statusSpan = document.getElementById("system-status-text");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  setStatus("SYSTEM: READY");

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      if (rocket) {
        rocket.classList.remove("rocket-launching");
        void rocket.offsetWidth;
        rocket.classList.add("rocket-launching");
        setTimeout(() => {
          rocket.classList.remove("rocket-launching");
        }, 1400);
      }

      setStatus("LAUNCH SUCCESS");
      input.style.borderColor = "#10b981";
      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("SYSTEM: READY");
        loadNewEquation();
      }, 900);
    } else {
      setStatus("TRAJECTORY ERROR");
      input.style.borderColor = "#ef4444";
      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("SYSTEM: READY");
      }, 900);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
