// src/world/zones/spaceschool.js - High-Detail Galactic Academy Classroom Interior with Panoramic Space Window
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
    @keyframes planetFloatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes stationRingSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes cruiserGlideWindow {
      0% { transform: translateX(180px) translateY(10px); }
      50% { transform: translateX(720px) translateY(-12px); }
      100% { transform: translateX(1280px) translateY(6px); }
    }
    @keyframes fighterStreakWindow {
      0% { transform: translateX(1300px) translateY(30px); }
      100% { transform: translateX(150px) translateY(-40px); }
    }
    @keyframes zeroGPropFloat {
      0%, 100% { transform: translateY(0px) rotate(-4deg); }
      50% { transform: translateY(-12px) rotate(6deg); }
    }
    @keyframes conduitPulse {
      0% { stroke-dashoffset: 140; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes starTwinkle {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 1; }
    }
    @keyframes profAstroBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-5px) scaleY(1.01); }
    }
    @keyframes profPointerWave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-12deg); }
    }
    @keyframes profCelebrateJump {
      0% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-28px) rotate(-5deg) scale(1.06); }
      50% { transform: translateY(-4px) rotate(4deg) scale(0.97, 1.03); }
      75% { transform: translateY(-18px) rotate(-3deg) scale(1.04); }
      100% { transform: translateY(0) scale(1); }
    }
    @keyframes profErrorShake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes windowWarpFlash {
      0% { opacity: 0; transform: scale(0.5); }
      20% { opacity: 1; transform: scale(1.04); }
      70% { opacity: 0.9; transform: scale(1.12); }
      100% { opacity: 0; transform: scale(1.25); }
    }
    @keyframes spaceParticleBurst {
      0% { transform: translate(0, 0) scale(0.3) rotate(0deg); opacity: 1; }
      60% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.3) rotate(var(--rot)); opacity: 0; }
    }
    .prof-astro-idle {
      transform-origin: center bottom;
      animation: profAstroBreathe 3.4s ease-in-out infinite;
    }
    .prof-astro-party {
      transform-origin: center bottom;
      animation: profCelebrateJump 0.88s ease-in-out 2 !important;
    }
    .prof-astro-oops {
      transform-origin: center bottom;
      animation: profErrorShake 0.55s ease-in-out 1 !important;
    }
    .floor-conduit-flow {
      stroke-dasharray: 18 18;
      animation: conduitPulse 1s linear infinite;
    }
    #window-hyperspace-fx {
      transform-origin: 720px 285px;
      opacity: 0;
      pointer-events: none;
    }
    #window-hyperspace-fx.warping {
      animation: windowWarpFlash 1.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="spaceschool-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: #050914; font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN GALACTIC CLASSROOM INTERIOR & PANORAMIC SPACE WINDOW SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Classroom Titanium Wall & Floor Gradients -->
          <linearGradient id="classroomWallMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="45%" stop-color="#1e293b" />
            <stop offset="85%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#060b16" />
          </linearGradient>

          <linearGradient id="steelRibBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#090d16" />
            <stop offset="30%" stop-color="#334155" />
            <stop offset="55%" stop-color="#64748b" />
            <stop offset="80%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>

          <linearGradient id="classroomFloorDeck" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="30%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#030711" />
          </linearGradient>

          <linearGradient id="copperTrimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fde047" />
            <stop offset="50%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#78350f" />
          </linearGradient>

          <!-- Volumetric Ceiling Light Cones Inside Classroom -->
          <linearGradient id="classroomCeilingLight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22" />
            <stop offset="65%" stop-color="#38bdf8" stop-opacity="0.05" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
          </linearGradient>

          <!-- Diagonal Hazard Stripe Pattern -->
          <pattern id="spaceHazardStripe" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="26" height="26" fill="#0f172a" />
            <rect width="13" height="26" fill="#eab308" />
          </pattern>

          <!-- =============================================================== -->
          <!-- PANORAMIC OBSERVATION WINDOW CLIP PATH (Beveled Octagonal Bay)  -->
          <!-- =============================================================== -->
          <clipPath id="panoramicWindowClip">
            <polygon points="265,78 1175,78 1225,128 1225,475 1175,522 265,522 215,475 215,128" />
          </clipPath>

          <!-- Deep Space Nebulae & Gas Giant Gradients (Inside Window) -->
          <linearGradient id="deepSpaceBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#03040c" />
            <stop offset="45%" stop-color="#0c0a26" />
            <stop offset="80%" stop-color="#15133c" />
            <stop offset="100%" stop-color="#040714" />
          </linearGradient>

          <radialGradient id="windowNebulaPink" cx="38%" cy="42%" r="45%">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.55" />
            <stop offset="45%" stop-color="#9333ea" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#03040c" stop-opacity="0" />
          </radialGradient>

          <radialGradient id="windowNebulaTeal" cx="62%" cy="36%" r="46%">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.5" />
            <stop offset="45%" stop-color="#0284c7" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#03040c" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="saturnPlanetBands" x1="0%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stop-color="#fef3c7" />
            <stop offset="18%" stop-color="#fcd34d" />
            <stop offset="36%" stop-color="#d97706" />
            <stop offset="54%" stop-color="#f59e0b" />
            <stop offset="72%" stop-color="#b45309" />
            <stop offset="88%" stop-color="#78350f" />
            <stop offset="100%" stop-color="#270e05" />
          </linearGradient>

          <radialGradient id="saturnShadow" cx="30%" cy="28%" r="72%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
            <stop offset="52%" stop-color="#000000" stop-opacity="0" />
            <stop offset="85%" stop-color="#020617" stop-opacity="0.76" />
            <stop offset="100%" stop-color="#02040a" stop-opacity="0.96" />
          </radialGradient>

          <clipPath id="saturnSphereClip">
            <circle cx="0" cy="0" r="128" />
          </clipPath>

          <linearGradient id="saturnRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.75" />
            <stop offset="25%" stop-color="#fef3c7" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#d97706" stop-opacity="0.7" />
            <stop offset="75%" stop-color="#fef3c7" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.75" />
          </linearGradient>

          <filter id="nebulaSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <!-- ========================================================================= -->
        <!-- 1. INTERIOR CLASSROOM WALLS & BULKHEADS (SURROUNDING THE GIANT WINDOW)    -->
        <!-- ========================================================================= -->
        <rect width="1440" height="565" fill="url(#classroomWallMetal)" />

        <!-- Horizontal Bulkhead Panel Seams -->
        <g stroke="#090d16" stroke-width="2.5" opacity="0.8">
          <line x1="0" y1="185" x2="215" y2="185" />
          <line x1="0" y1="345" x2="215" y2="345" />
          <line x1="1225" y1="185" x2="1440" y2="185" />
          <line x1="1225" y1="345" x2="1440" y2="345" />
        </g>

        <!-- ========================================================================= -->
        <!-- 2. GIANT PANORAMIC SPACE OBSERVATION WINDOW (CENTER OF THE CLASSROOM!)    -->
        <!-- ========================================================================= -->
        <!-- Outer Heavy Armored Window Bezel Frame -->
        <polygon points="255,64 1185,64 1242,120 1242,485 1185,538 255,538 198,485 198,120" fill="url(#steelRibBeam)" stroke="#020617" stroke-width="4" />
        <!-- Copper/Gold Inner Window Trim Bezel -->
        <polygon points="261,72 1179,72 1232,124 1232,480 1179,530 261,530 208,480 208,124" fill="none" stroke="url(#copperTrimGrad)" stroke-width="5" />

        <!-- EVERYTHING INSIDE THIS GROUP IS CLIPPED TO THE PANORAMIC CLASSROOM WINDOW -->
        <g clip-path="url(#panoramicWindowClip)">
          <!-- Deep Space Backdrop -->
          <rect x="200" y="70" width="1040" height="465" fill="url(#deepSpaceBg)" />
          <rect x="200" y="70" width="1040" height="465" fill="url(#windowNebulaPink)" />
          <rect x="200" y="70" width="1040" height="465" fill="url(#windowNebulaTeal)" />

          <!-- Glowing Magenta & Turquoise Nebula Clouds -->
          <g filter="url(#nebulaSoftBlur)" opacity="0.65">
            <path d="M 320 260 Q 460 120 620 210 T 880 150" fill="none" stroke="#f472b6" stroke-width="42" stroke-linecap="round" />
            <path d="M 480 340 Q 660 220 840 290 T 1150 180" fill="none" stroke="#2dd4bf" stroke-width="48" stroke-linecap="round" />
          </g>

          <!-- Crisp Starfield & Twinkling Beacons Outside Window -->
          <g fill="#ffffff">
            <circle cx="265" cy="125" r="1.8" /><circle cx="335" cy="105" r="2.4" /><circle cx="420" cy="145" r="1.6" />
            <circle cx="495" cy="108" r="2.2" /><circle cx="585" cy="128" r="1.8" /><circle cx="675" cy="98" r="2.5" />
            <circle cx="755" cy="135" r="1.5" /><circle cx="1145" cy="115" r="2.2" /><circle cx="1185" cy="185" r="1.8" />
            <circle cx="285" cy="395" r="2" /><circle cx="395" cy="445" r="1.6" /><circle cx="545" cy="465" r="2.2" />
            <polygon points="335,93 338,102 347,105 338,108 335,117 332,108 323,105 332,102" fill="#fde047" style="animation: starTwinkle 2.6s ease-in-out infinite;" />
            <polygon points="675,86 678,95 687,98 678,101 675,110 672,101 663,98 672,95" fill="#67e8f9" style="animation: starTwinkle 3.2s ease-in-out 1s infinite;" />
            <polygon points="1145,103 1148,112 1157,115 1148,118 1145,127 1142,118 1133,115 1142,112" fill="#f472b6" style="animation: starTwinkle 2.2s ease-in-out 0.4s infinite;" />
          </g>

          <!-- Distant Spiral Andromeda Galaxy in Bottom-Right Corner of Window -->
          <g transform="translate(1105, 425) rotate(-24) scale(0.85, 0.36)">
            <g style="animation: stationRingSpin 50s linear infinite;">
              <ellipse cx="0" cy="0" rx="85" ry="65" fill="none" stroke="#f472b6" stroke-width="12" opacity="0.5" filter="url(#nebulaSoftBlur)" />
              <path d="M 0 0 C 25 -8, 55 18, 68 48 C 78 75, 52 102, 16 102 C -32 102, -75 68, -85 16" fill="none" stroke="#fdf4ff" stroke-width="4.5" stroke-linecap="round" />
              <path d="M 0 0 C -25 8, -55 -18, -68 -48 C -78 -75, -52 -102, -16 -102 C 32 -102, 75 -68, 85 -16" fill="none" stroke="#bae6fd" stroke-width="4.5" stroke-linecap="round" />
              <circle cx="0" cy="0" r="24" fill="#fde047" opacity="0.8" filter="url(#nebulaSoftBlur)" />
              <circle cx="0" cy="0" r="12" fill="#ffffff" />
            </g>
          </g>

          <!-- Rotating Deep-Space Orbital Station Outside Left-Center of Window -->
          <g transform="translate(655, 215) rotate(-18) scale(0.72)">
            <g style="animation: stationRingSpin 38s linear infinite;">
              <ellipse cx="0" cy="0" rx="68" ry="26" fill="none" stroke="#94a3b8" stroke-width="8" />
              <ellipse cx="0" cy="0" rx="68" ry="26" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6 8" />
              <line x1="-64" y1="0" x2="64" y2="0" stroke="#64748b" stroke-width="4" />
              <line x1="0" y1="-24" x2="0" y2="24" stroke="#64748b" stroke-width="4" />
            </g>
            <rect x="-8" y="-48" width="16" height="96" rx="5" fill="#cbd5e1" stroke="#0f172a" stroke-width="2" />
            <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#fde047" stroke-width="2.5" />
          </g>

          <!-- Solar-Panel Research Satellite Drifting in Upper-Left of Window -->
          <g transform="translate(505, 185) rotate(28) scale(0.75)">
            <rect x="-56" y="-12" width="38" height="24" fill="#1d4ed8" stroke="#67e8f9" stroke-width="1.8" />
            <rect x="18" y="-12" width="38" height="24" fill="#1d4ed8" stroke="#67e8f9" stroke-width="1.8" />
            <line x1="-18" y1="0" x2="18" y2="0" stroke="#fde047" stroke-width="4" />
            <rect x="-12" y="-16" width="24" height="32" rx="6" fill="#e2e8f0" stroke="#334155" stroke-width="2" />
            <circle cx="0" cy="0" r="5" fill="#ef4444" />
          </g>

          <!-- Moving Galactic Star-Cruiser Gliding Across the Window -->
          <g style="animation: cruiserGlideWindow 34s linear infinite;">
            <g transform="translate(0, 445) scale(0.65)">
              <polygon points="10,24 -32,16 -18,24 -38,28 -18,32 -32,40 10,32" fill="#67e8f9" filter="drop-shadow(0 0 8px #38bdf8)" />
              <polygon points="12,14 125,24 148,28 125,32 12,42" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
              <polygon points="35,18 48,6 78,10 86,20" fill="#94a3b8" stroke="#334155" stroke-width="1.5" />
              <line x1="36" y1="28" x2="112" y2="28" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5 4" />
            </g>
          </g>

          <!-- Fast Starfighter Streaking Across Window -->
          <g style="animation: fighterStreakWindow 14s linear infinite;">
            <g transform="translate(0, 175) scale(0.7)">
              <polygon points="0,0 34,-9 26,0 34,9" fill="#f8fafc" stroke="#ef4444" stroke-width="1.8" />
              <line x1="30" y1="0" x2="75" y2="0" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
            </g>
          </g>

          <!-- =============================================================== -->
          <!-- COLOSSAL RINGED GAS GIANT PLANET OUTSIDE RIGHT SIDE OF WINDOW   -->
          <!-- =============================================================== -->
          <g transform="translate(935, 295)">
            <g style="animation: planetFloatSlow 6.5s ease-in-out infinite;">
              <!-- Back Half of Rings -->
              <g transform="rotate(-16)">
                <path d="M -255 0 A 255 62 0 0 1 255 0" fill="none" stroke="url(#saturnRingGrad)" stroke-width="26" opacity="0.78" />
                <path d="M -212 0 A 212 50 0 0 1 212 0" fill="none" stroke="#78350f" stroke-width="6" opacity="0.7" />
                <path d="M -185 0 A 185 43 0 0 1 185 0" fill="none" stroke="#fef3c7" stroke-width="10" opacity="0.65" />
              </g>

              <!-- Gas Giant Sphere with Atmospheric Bands -->
              <g clip-path="url(#saturnSphereClip)">
                <circle cx="0" cy="0" r="128" fill="url(#saturnPlanetBands)" />
                <g transform="rotate(-16)" opacity="0.55">
                  <path d="M -140 -72 Q -30 -58 50 -74 T 140 -66" fill="none" stroke="#fffbeb" stroke-width="12" />
                  <path d="M -140 -28 Q -10 -42 70 -20 T 140 -30" fill="none" stroke="#fde68a" stroke-width="16" />
                  <path d="M -140 20 Q -40 34 40 16 T 140 26" fill="none" stroke="#92400e" stroke-width="14" />
                  <path d="M -140 64 Q 10 48 90 66 T 140 58" fill="none" stroke="#fcd34d" stroke-width="12" />
                </g>
                <circle cx="0" cy="0" r="128" fill="url(#saturnShadow)" />
              </g>
              <circle cx="0" cy="0" r="128" fill="none" stroke="#fde68a" stroke-width="2.5" opacity="0.6" />

              <!-- Front Half of Rings (Passes in front of Planet Sphere) -->
              <g transform="rotate(-16)">
                <path d="M -255 0 A 255 62 0 0 0 255 0" fill="none" stroke="url(#saturnRingGrad)" stroke-width="26" opacity="0.95" filter="drop-shadow(0 10px 14px rgba(0,0,0,0.75))" />
                <path d="M -212 0 A 212 50 0 0 0 212 0" fill="none" stroke="#451a03" stroke-width="5" opacity="0.85" />
                <path d="M -185 0 A 185 43 0 0 0 185 0" fill="none" stroke="#fffbeb" stroke-width="9" opacity="0.8" />
              </g>

              <!-- Three Orbiting Moons Around the Planet -->
              <circle cx="38" cy="32" r="11" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))" />
              <circle cx="-82" cy="112" r="15" fill="#cbd5e1" stroke="#334155" stroke-width="1.5" />
              <circle cx="148" cy="68" r="12" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
            </g>
          </g>

          <!-- =============================================================== -->
          <!-- WINDOW HYPERSPACE WARP SURGE (Triggers on Correct Answer!)      -->
          <!-- =============================================================== -->
          <g id="window-hyperspace-fx">
            <circle cx="720" cy="285" r="260" fill="radial-gradient(circle, rgba(103,232,249,0.5), transparent)" />
            <g stroke="#67e8f9" stroke-width="4" stroke-linecap="round">
              <line x1="720" y1="285" x2="220" y2="85" /><line x1="720" y1="285" x2="1220" y2="85" />
              <line x1="720" y1="285" x2="220" y2="285" /><line x1="720" y1="285" x2="1220" y2="285" />
              <line x1="720" y1="285" x2="220" y2="495" /><line x1="720" y1="285" x2="1220" y2="495" />
            </g>
            <g stroke="#fde047" stroke-width="3.5" stroke-linecap="round">
              <line x1="720" y1="285" x2="420" y2="80" /><line x1="720" y1="285" x2="1020" y2="80" />
              <line x1="720" y1="285" x2="420" y2="510" /><line x1="720" y1="285" x2="1020" y2="510" />
            </g>
            <circle cx="655" cy="215" r="85" fill="none" stroke="#ffffff" stroke-width="6" stroke-dasharray="22 12" filter="drop-shadow(0 0 18px #38bdf8)" />
          </g>

          <!-- Subtle Diagonal Glass Specular Reflection Across the Observation Window -->
          <polygon points="280,78 390,78 235,420 215,310" fill="#ffffff" opacity="0.06" />
          <polygon points="430,78 465,78 260,522 225,522" fill="#ffffff" opacity="0.04" />
        </g>

        <!-- ========================================================================= -->
        <!-- 3. CLASSROOM CEILING TRUSSES, HANGING MONITORS & ACADEMY BANNER           -->
        <!-- ========================================================================= -->
        <!-- Angled Ceiling Bulkhead Architecture -->
        <polygon points="0,0 1440,0 1440,95 1235,64 205,64 0,95" fill="#1e293b" stroke="#090d16" stroke-width="3" />
        <!-- Recessed Ceiling Light Grilles & Copper Struts -->
        <polygon points="180,0 240,0 295,64 255,64" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />
        <polygon points="520,0 565,0 585,64 550,64" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />
        <polygon points="875,0 920,0 890,64 855,64" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />
        <polygon points="1200,0 1260,0 1185,64 1145,64" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />

        <!-- Volumetric Ceiling Light Cones Shining into the Classroom -->
        <polygon points="295,64 550,64 620,560 210,560" fill="url(#classroomCeilingLight)" />
        <polygon points="890,64 1145,64 1230,560 820,560" fill="url(#classroomCeilingLight)" />

        <!-- Left & Right Overhead Hanging Classroom Telemetry Screens -->
        <g transform="translate(275, 58)">
          <line x1="35" y1="0" x2="35" y2="28" stroke="#475569" stroke-width="6" />
          <rect x="0" y="22" width="82" height="54" rx="6" transform="rotate(-8 41 49)" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
          <rect x="6" y="28" width="70" height="42" rx="3" transform="rotate(-8 41 49)" fill="#0284c7" opacity="0.45" />
          <path d="M 14 52 L 32 40 L 48 54 L 66 36" fill="none" stroke="#67e8f9" stroke-width="2.5" />
        </g>
        <g transform="translate(1085, 58)">
          <line x1="45" y1="0" x2="45" y2="28" stroke="#475569" stroke-width="6" />
          <rect x="0" y="22" width="82" height="54" rx="6" transform="rotate(8 41 49)" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
          <rect x="6" y="28" width="70" height="42" rx="3" transform="rotate(8 41 49)" fill="#0284c7" opacity="0.45" />
          <circle cx="41" cy="49" r="14" fill="none" stroke="#67e8f9" stroke-width="2" stroke-dasharray="5 3" />
        </g>

        <!-- ========================================================================= -->
        <!-- 4. LEFT & RIGHT CLASSROOM WALLS, "GALACTIC ACADEMY" BANNER & STUDENT DESKS-->
        <!-- ========================================================================= -->
        <!-- LEFT CLASSROOM WALL: Galactic Academy Banner, Wall Consoles & Student Holo-Desk -->
        <g>
          <!-- Hanging Blue & Gold "GALACTIC ACADEMY" Wall Banner -->
          <polygon points="18,108 188,152 188,204 18,162" fill="#1e3a8a" stroke="#38bdf8" stroke-width="2.5" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.7))" />
          <text x="103" y="164" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="15" letter-spacing="1.5" text-anchor="middle" transform="skewY(14)">GALACTIC ACADEMY</text>

          <!-- Wall-Mounted Astro-Science Mainframe & Locker -->
          <rect x="24" y="220" width="155" height="195" rx="8" fill="#0f172a" stroke="#334155" stroke-width="3" />
          <rect x="34" y="232" width="65" height="52" rx="4" fill="#022c22" stroke="#10b981" stroke-width="1.8" />
          <path d="M 40 260 L 55 245 L 70 268 L 90 248" fill="none" stroke="#34d399" stroke-width="2" />
          <rect x="108" y="232" width="60" height="52" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.8" />
          <circle cx="125" cy="248" r="4" fill="#ef4444" /><circle cx="142" cy="248" r="4" fill="#fde047" /><circle cx="156" cy="248" r="4" fill="#22c55e" />

          <!-- Floating Zero-G Atomic Model Above Left Student Desk -->
          <g transform="translate(155, 365)">
            <g style="animation: zeroGPropFloat 4s ease-in-out infinite;">
              <ellipse cx="0" cy="0" rx="22" ry="8" transform="rotate(30)" fill="none" stroke="#38bdf8" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="22" ry="8" transform="rotate(-30)" fill="none" stroke="#38bdf8" stroke-width="2" />
              <circle cx="0" cy="0" r="5" fill="#fde047" />
              <circle cx="16" cy="9" r="3" fill="#f472b6" />
              <circle cx="-16" cy="9" r="3" fill="#4ade80" />
            </g>
          </g>

          <!-- Left Foreground Student Holo-Desk -->
          <g transform="translate(15, 455)">
            <polygon points="15,45 145,45 165,70 0,70" fill="#334155" stroke="#090d16" stroke-width="2.5" />
            <rect x="35" y="70" width="90" height="65" rx="6" fill="#1e293b" stroke="#090d16" stroke-width="2.5" />
            <!-- Glowing Angled Student Hologram Screen on Desk -->
            <polygon points="45,52 125,52 115,12 55,12" fill="rgba(56, 189, 248, 0.28)" stroke="#67e8f9" stroke-width="2" />
            <line x1="65" y1="26" x2="105" y2="26" stroke="#ffffff" stroke-width="2" />
            <line x1="62" y1="36" x2="95" y2="36" stroke="#fde047" stroke-width="2" />
          </g>
        </g>

        <!-- RIGHT CLASSROOM WALL: Star-Ship Blueprint Monitor, Floating Zero-G Tools & Student Desk -->
        <g>
          <!-- Large Wall-Mounted Starship Engineering Blueprint Screen -->
          <rect x="1265" y="195" width="155" height="175" rx="10" fill="#090d16" stroke="#475569" stroke-width="3.5" />
          <rect x="1275" y="205" width="135" height="135" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="2" />
          <!-- Wireframe Schematic Inside Screen -->
          <polygon points="1295,272 1385,245 1385,298" fill="none" stroke="#67e8f9" stroke-width="2" />
          <line x1="1285" y1="222" x2="1345" y2="222" stroke="#fde047" stroke-width="2" />
          <line x1="1285" y1="322" x2="1395" y2="322" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 4" />

          <!-- Floating Zero-G Astro-Spanner & Data Pad Near Right Desk -->
          <g transform="translate(1215, 425)">
            <g style="animation: zeroGPropFloat 4.6s ease-in-out 0.8s infinite;">
              <rect x="-18" y="-5" width="36" height="10" rx="4" transform="rotate(-28)" fill="#f59e0b" stroke="#0f172a" stroke-width="2" />
              <circle cx="-16" cy="8" r="7" fill="none" stroke="#94a3b8" stroke-width="4" />
              <circle cx="16" cy="-8" r="7" fill="none" stroke="#94a3b8" stroke-width="4" />
            </g>
          </g>

          <!-- Right Foreground Student Holo-Desk -->
          <g transform="translate(1155, 465)">
            <polygon points="20,45 165,45 185,72 0,72" fill="#334155" stroke="#090d16" stroke-width="2.5" />
            <rect x="45" y="72" width="105" height="75" rx="6" fill="#1e293b" stroke="#090d16" stroke-width="2.5" />
            <polygon points="48,54 138,54 148,10 58,10" fill="rgba(56, 189, 248, 0.28)" stroke="#67e8f9" stroke-width="2" />
            <circle cx="98" cy="32" r="12" fill="none" stroke="#fde047" stroke-width="2" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 5. CLASSROOM STEEL DECK FLOOR, CIRCULAR PLATFORM & POWER CONDUITS         -->
        <!-- ========================================================================= -->
        <polygon points="0,555 1440,555 1440,900 0,900" fill="url(#classroomFloorDeck)" />

        <!-- Window Sill Caution Striping & Baseboard -->
        <rect x="205" y="538" width="1030" height="16" fill="#1e293b" stroke="#090d16" stroke-width="2.5" />
        <rect x="640" y="538" width="160" height="16" fill="url(#spaceHazardStripe)" />

        <!-- Perspective Floor Deck Rings & Radial Panel Lines -->
        <g transform="translate(720, 685)">
          <ellipse cx="0" cy="0" rx="495" ry="125" fill="none" stroke="url(#copperTrimGrad)" stroke-width="8" opacity="0.75" />
          <ellipse cx="0" cy="0" rx="465" ry="115" fill="#0f172a" stroke="#334155" stroke-width="3" />
          <ellipse cx="0" cy="0" rx="340" ry="82" fill="#1e293b" stroke="#475569" stroke-width="2.5" />
          <ellipse cx="0" cy="0" rx="220" ry="52" fill="#090d16" stroke="#38bdf8" stroke-width="2" />
          <!-- Glowing Power Conduits Feeding into the Center Classroom Holotable -->
          <path class="floor-conduit-flow" d="M -460 0 L -180 0" stroke="#38bdf8" stroke-width="5" />
          <path class="floor-conduit-flow" d="M 460 0 L 180 0" stroke="#38bdf8" stroke-width="5" />
          <path class="floor-conduit-flow" d="M 0 115 L 0 50" stroke="#fde047" stroke-width="5" />
        </g>
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR HOLOGRAPHIC STARS & PLANETS ON CORRECT ANSWER -->
      <div id="spaceschool-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. GROUNDED CLASSROOM STAGE: PROFESSOR NOVA + CENTRAL HOLO-PROJECTOR PODIUM -->
      <div style="position: absolute; bottom: 172px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 28px; width: 95%; max-width: 940px; z-index: 5; pointer-events: none;">

        <!-- PROFESSOR NOVA — GALACTIC ACADEMY INSTRUCTOR (Left of Holotable, Just Like Your Reference!) -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -6px;">
          <!-- Speech Bubble -->
          <div id="nova-speech-bubble" style="background: rgba(8, 47, 73, 0.96); color: #67e8f9; border: 2.5px solid #38bdf8; border-radius: 16px; padding: 6px 14px; font-size: 0.82rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 6px 16px rgba(0,0,0,0.65), 0 0 12px rgba(56,189,248,0.3); white-space: nowrap; transition: all 0.2s;">
            Solve the holo-equation to jump the fleet! 🚀✨
          </div>

          <div style="position: relative; width: 210px; height: 255px; display: flex; justify-content: center; align-items: flex-end;">
            <!-- Ground Contact Shadow on Classroom Floor -->
            <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 175px; height: 26px; background: radial-gradient(ellipse at center, rgba(0,0,0,0.88) 0%, rgba(56,189,248,0.3) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>

            <div id="nova-mascot" class="prof-astro-idle" style="position: relative; width: 205px; height: 250px; z-index: 2; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.75));">
              <svg viewBox="0 0 230 275" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <linearGradient id="astroSuitBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#475569" />
                    <stop offset="50%" stop-color="#1e293b" />
                    <stop offset="100%" stop-color="#0f172a" />
                  </linearGradient>

                  <linearGradient id="copperArmor" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#b45309" />
                    <stop offset="50%" stop-color="#fbbf24" />
                    <stop offset="100%" stop-color="#78350f" />
                  </linearGradient>
                </defs>

                <!-- Jetpack & Glowing Blue Hover Thruster Plume -->
                <rect x="68" y="102" width="74" height="68" rx="10" fill="#334155" stroke="#090d16" stroke-width="2.8" />
                <ellipse cx="82" cy="176" rx="9" ry="22" fill="#38bdf8" opacity="0.85" filter="drop-shadow(0 0 12px #38bdf8)" />
                <ellipse cx="82" cy="172" rx="4.5" ry="14" fill="#ffffff" />

                <!-- Planted Astronaut Boots & Articulated Legs -->
                <rect x="82" y="188" width="22" height="54" rx="8" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.8" />
                <rect x="80" y="210" width="26" height="8" rx="3" fill="url(#copperArmor)" stroke="#090d16" stroke-width="1.8" />
                <path d="M 78 236 L 106 236 L 110 252 L 74 252 Z" fill="#334155" stroke="#090d16" stroke-width="2.8" />

                <rect x="112" y="188" width="22" height="54" rx="8" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.8" />
                <rect x="110" y="210" width="26" height="8" rx="3" fill="url(#copperArmor)" stroke="#090d16" stroke-width="1.8" />
                <path d="M 110 236 L 138 236 L 142 252 L 108 252 Z" fill="#334155" stroke="#090d16" stroke-width="2.8" />

                <!-- Sculpted EVA Flight Suit Torso, Chest Control Box & Belt -->
                <rect x="76" y="112" width="64" height="82" rx="18" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="3" />
                <!-- Copper Collar Ring & Utility Belt -->
                <ellipse cx="108" cy="114" rx="28" ry="8" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2.2" />
                <rect x="74" y="178" width="68" height="12" rx="4" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2.2" />
                <rect x="98" y="176" width="20" height="16" rx="3" fill="#fde047" stroke="#090d16" stroke-width="2" />
                <!-- Chest Telemetry Module -->
                <rect x="90" y="130" width="36" height="28" rx="5" fill="#090d16" stroke="#38bdf8" stroke-width="2" />
                <circle cx="100" cy="144" r="5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
                <line x1="110" y1="139" x2="120" y2="139" stroke="#fde047" stroke-width="2.5" />
                <line x1="110" y1="147" x2="118" y2="147" stroke="#4ade80" stroke-width="2.5" />

                <!-- Left Arm Holding Glowing Holographic Pointer Wand -->
                <path d="M 78 122 L 56 156 L 68 166 L 88 136 Z" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.6" />
                <circle cx="62" cy="162" r="8" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2" />
                <line x1="42" y1="184" x2="96" y2="142" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 8px #38bdf8)" />
                <circle cx="98" cy="140" r="6" fill="#ffffff" stroke="#38bdf8" stroke-width="2" />

                <!-- Right Waving Arm Gesturing Toward the Holo-Equation -->
                <g style="transform-origin: 138px 124px; animation: profPointerWave 2.6s ease-in-out infinite;">
                  <path d="M 136 122 L 178 102 L 184 116 L 142 138 Z" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.6" />
                  <circle cx="182" cy="108" r="8.5" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2" />
                </g>

                <!-- ======================================================= -->
                <!-- INSTRUCTOR HEAD & GLOWING GLASS BUBBLE SPACE HELMET     -->
                <!-- ======================================================= -->
                <!-- Outer Glowing Helmet Halo Ring -->
                <circle cx="108" cy="74" r="38" fill="rgba(56, 189, 248, 0.16)" stroke="#67e8f9" stroke-width="3" filter="drop-shadow(0 0 12px rgba(56,189,248,0.6))" />
                <!-- Sculpted Instructor Head & Hair Inside Helmet -->
                <circle cx="108" cy="76" r="25" fill="#fed7aa" stroke="#7c2d12" stroke-width="2.4" />
                <path d="M 83 72 C 82 48, 134 48, 133 72 C 125 58, 92 58, 83 72 Z" fill="#1e293b" />
                <!-- Expressive Eyes & Confident Instructor Smile -->
                <circle cx="99" cy="74" r="3.5" fill="#0f172a" /><circle cx="98" cy="72.8" r="1.2" fill="#ffffff" />
                <circle cx="117" cy="74" r="3.5" fill="#0f172a" /><circle cx="116" cy="72.8" r="1.2" fill="#ffffff" />
                <path d="M 94 68 L 103 69 M 113 69 L 122 68" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
                <path d="M 101 86 Q 108 92 115 86" fill="none" stroke="#7c2d12" stroke-width="2.5" stroke-linecap="round" />
                <!-- Curved Glass Helmet Specular Highlight -->
                <path d="M 82 54 A 28 28 0 0 1 128 48" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.75" />
              </svg>
            </div>
          </div>
        </div>

        <!-- THE CLASSROOM HOLO-PROJECTOR PODIUM & FLOATING HOLOGRAPHIC MATH RING -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <!-- Floating Translucent Hologram Projection Above the Table -->
          <div id="holotable-board" style="position: relative; width: 420px; max-width: 56vw; min-height: 235px; background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.28) 0%, rgba(8, 47, 73, 0.65) 65%, rgba(2, 6, 23, 0.82) 100%); border: 3px solid #67e8f9; border-radius: 28px; box-shadow: 0 0 32px rgba(56, 189, 248, 0.45), inset 0 0 28px rgba(56, 189, 248, 0.35); padding: 20px 28px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 3; backdrop-filter: blur(3px);">
            
            <!-- Rotating Holographic Astrolabe Target Rings Behind the Numbers -->
            <svg viewBox="0 0 240 240" style="position: absolute; width: 215px; height: 215px; opacity: 0.42; pointer-events: none; animation: stationRingSpin 24s linear infinite;">
              <circle cx="120" cy="120" r="104" fill="none" stroke="#67e8f9" stroke-width="3" stroke-dasharray="24 12" />
              <circle cx="120" cy="120" r="86" fill="none" stroke="#e879f9" stroke-width="2.5" stroke-dasharray="14 10" />
              <line x1="120" y1="6" x2="120" y2="30" stroke="#fde047" stroke-width="3" />
              <line x1="120" y1="210" x2="120" y2="234" stroke="#fde047" stroke-width="3" />
              <line x1="6" y1="120" x2="30" y2="120" stroke="#fde047" stroke-width="3" />
              <line x1="210" y1="120" x2="234" y2="120" stroke="#fde047" stroke-width="3" />
            </svg>

            <!-- Left & Right Holographic Telemetry Readouts (Just Like Reference!) -->
            <div style="position: absolute; left: 14px; top: 24px; bottom: 24px; display: flex; flex-direction: column; justify-content: space-between; font-family: monospace; font-size: 0.58rem; color: #67e8f9; opacity: 0.8;">
              <div>SYS: 99.8%</div>
              <div>ORB: STABLE</div>
              <div>VEC: 042.1</div>
            </div>
            <div style="position: absolute; right: 14px; top: 24px; bottom: 24px; display: flex; flex-direction: column; justify-content: space-between; font-family: monospace; font-size: 0.58rem; color: #fde047; opacity: 0.8; text-align: right;">
              <div>WARP: READY</div>
              <div>SECTOR: 01</div>
              <div>SYNC: LOCK</div>
            </div>

            <!-- Top Hologram Header Pill -->
            <div style="position: absolute; top: -15px; background: linear-gradient(90deg, #0284c7, #38bdf8, #0284c7); border: 2.5px solid #fde047; color: #ffffff; font-weight: 900; font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 16px; border-radius: 999px; box-shadow: 0 0 14px rgba(56,189,248,0.6);">
              🌌 Classroom Holo-Projector
            </div>

            <!-- CRISP GLOWING HOLOGRAPHIC EQUATION -->
            <div id="equation-container" style="position: relative; z-index: 4; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4px 20px;">
              <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', monospace; font-size: 3.8rem; font-weight: 900; color: #ffffff; letter-spacing: 0.06em; line-height: 1.02; text-shadow: 0 0 18px #38bdf8, 0 3px 0 #082f49;">
                <div id="math-num1">17</div>
                <div style="display: flex; align-items: center; gap: 18px;">
                  <span id="math-op" style="color: #67e8f9; font-size: 3.1rem; text-shadow: 0 0 14px #38bdf8;">+</span>
                  <span id="math-num2">15</span>
                </div>
                <div style="width: 108%; height: 6px; background: linear-gradient(90deg, #67e8f9, #e879f9); border-radius: 999px; margin: 6px -4% 5px 0; box-shadow: 0 0 12px #38bdf8;"></div>
                <div id="math-question-mark" style="color: #fde047; letter-spacing: 0.16em; font-size: 3rem; text-shadow: 0 0 14px #fde047;">??</div>
              </div>
            </div>
          </div>

          <!-- HEAVY BOLTED BRONZE & STEEL HOLO-TABLE PEDESTAL BASE ON CLASSROOM FLOOR -->
          <div style="position: relative; width: 390px; height: 78px; margin-top: -10px; z-index: 2; display: flex; justify-content: center;">
            <svg viewBox="0 0 390 82" style="width: 100%; height: 82px; overflow: visible; filter: drop-shadow(0 14px 20px rgba(0,0,0,0.85));">
              <!-- Emitter Light Cone Shooting Up From Table into Hologram -->
              <polygon points="85,18 305,18 345,-10 45,-10" fill="rgba(56, 189, 248, 0.25)" />
              <!-- Heavy Octagonal Bronze/Copper & Titanium Projector Table Rim -->
              <ellipse cx="195" cy="24" rx="165" ry="20" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="3" />
              <ellipse cx="195" cy="20" rx="135" ry="13" fill="#0284c7" stroke="#67e8f9" stroke-width="2" />
              <ellipse cx="195" cy="20" rx="95" ry="8" fill="#e0f2fe" />
              <!-- Armored Pedestal Column & Bolted Claws -->
              <path d="M 95 36 L 295 36 L 315 74 L 75 74 Z" fill="url(#steelRibBeam)" stroke="#090d16" stroke-width="3" />
              <rect x="115" y="42" width="52" height="22" rx="4" fill="#090d16" stroke="#38bdf8" stroke-width="1.8" />
              <rect x="223" y="42" width="52" height="22" rx="4" fill="#090d16" stroke="#38bdf8" stroke-width="1.8" />
              <path d="M 62 70 L 328 70 L 342 80 L 48 80 Z" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2.5" />
            </svg>
          </div>
        </div>

      </div>

      <!-- 3. GALACTIC CLASSROOM COMMAND CONSOLE CONTROL DECK -->
      <div style="position: absolute; bottom: 84px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 26px rgba(2, 6, 23, 0.9));">
        <div style="background: linear-gradient(180deg, #1e293b 0%, #090d16 100%); border: 3px solid #38bdf8; border-radius: 16px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 0 22px rgba(56,189,248,0.35);">
          
          <div style="display: flex; flex-direction: column; min-width: 155px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #38bdf8; letter-spacing: 0.14em; text-transform: uppercase;">🚀 ACADEMY CONSOLE</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #4ade80; letter-spacing: 0.06em;">GATEWAY: STANDBY</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.95rem; font-weight: 900; color: #f0fdf4; background: #020617; border: 3px solid #38bdf8; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.5), 0 0 12px rgba(56,189,248,0.45);" />

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

function triggerClassroomWarpJump() {
  const warpFx = document.getElementById("window-hyperspace-fx");
  const particleHost = document.getElementById("spaceschool-eruption-particles");

  if (warpFx) {
    warpFx.classList.remove("warping");
    void warpFx.offsetWidth;
    warpFx.classList.add("warping");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#38bdf8", "#67e8f9", "#fde047", "#ffffff", "#e879f9"];

  for (let i = 0; i < 38; i++) {
    const p = document.createElement("div");
    const color = colors[i % colors.length];
    const tx = (Math.random() - 0.5) * 580 + "px";
    const ty = -(130 + Math.random() * 360) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";
    const size = 8 + Math.random() * 12;

    p.style.cssText = `
      position: absolute;
      left: 54%;
      top: 52%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #ffffff, ${color});
      box-shadow: 0 0 14px ${color};
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: spaceParticleBurst ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
      triggerClassroomWarpJump();

      if (nova) {
        nova.classList.remove("prof-astro-party", "prof-astro-oops");
        void nova.offsetWidth;
        nova.classList.add("prof-astro-party");
      }
      if (speech) {
        speech.textContent = "HYPERSPACE JUMP COMPLETE! STELLAR WORK!! 🚀🌌";
        speech.style.borderColor = "#fde047";
      }

      setStatus("🚀 FLEET JUMP ACTIVE!!");
      input.style.borderColor = "#4ade80";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("GATEWAY: STANDBY");
        if (speech) {
          speech.textContent = "Brilliant math, cadet! Next coordinates! ✨";
          speech.style.borderColor = "#38bdf8";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (nova) {
        nova.classList.remove("prof-astro-party", "prof-astro-oops");
        void nova.offsetWidth;
        nova.classList.add("prof-astro-oops");
      }
      if (speech) {
        speech.textContent = "Coordinates off-course! Recalculate! ⚠️";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("⚠️ TRAJECTORY ERROR!");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("GATEWAY: STANDBY");
        if (speech) {
          speech.textContent = "Check the holo-projector numbers, cadet! 🚀";
          speech.style.borderColor = "#38bdf8";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}

export const loadSpaceAcademy = loadSpaceSchool;
