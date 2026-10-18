// src/world/zones/spaceschool.js - Polished Galactic Classroom Interior, Moving Deep-Space Parallax Window, Shooting Stars & Quantum Equation Boards
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
    /* Multi-Layer Parallax Space Drift (Makes the ship feel like it's moving through space!) */
    @keyframes deepStarfieldPan {
      0% { transform: translate3d(0px, 0px, 0); }
      50% { transform: translate3d(-110px, 18px, 0); }
      100% { transform: translate3d(0px, 0px, 0); }
    }
    @keyframes midNebulaCruise {
      0% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
      50% { transform: translate3d(-165px, 24px, 0) rotate(-1.2deg); }
      100% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
    }
    @keyframes foregroundPlanetCruise {
      0% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
      33% { transform: translate3d(-95px, -14px, 0) rotate(0.8deg); }
      66% { transform: translate3d(-180px, 12px, 0) rotate(-0.8deg); }
      100% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
    }
    @keyframes spaceDustStream {
      0% { transform: translateX(1080px) translateY(0px); opacity: 0; }
      10% { opacity: 0.75; }
      90% { opacity: 0.75; }
      100% { transform: translateX(-180px) translateY(35px); opacity: 0; }
    }
    @keyframes stationRingSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes cruiserSmoothGlide {
      0% { transform: translateX(-220px) translateY(15px); }
      50% { transform: translateX(520px) translateY(-10px); }
      100% { transform: translateX(1260px) translateY(8px); }
    }
    /* 6 Staggered Tapered Shooting Stars */
    @keyframes meteorShoot {
      0% { transform: translate(0px, 0px) rotate(-22deg) scaleX(0.2); opacity: 0; }
      6% { transform: translate(-60px, 24px) rotate(-22deg) scaleX(1); opacity: 1; }
      22% { transform: translate(-520px, 210px) rotate(-22deg) scaleX(1.15); opacity: 0.9; }
      28%, 100% { transform: translate(-680px, 275px) rotate(-22deg) scaleX(0.1); opacity: 0; }
    }
    @keyframes zeroGPropFloat {
      0%, 100% { transform: translateY(0px) rotate(-3deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
    }
    @keyframes equationGlowPulse {
      0%, 100% { opacity: 0.78; }
      50% { opacity: 1; }
    }
    @keyframes sineWaveMorph {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -120; }
    }
    @keyframes conduitPulse {
      0% { stroke-dashoffset: 140; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes starTwinkle {
      0%, 100% { opacity: 0.25; transform: scale(0.85); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    @keyframes profAstroBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-5px) scaleY(1.01); }
    }
    @keyframes profPointerWave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-11deg); }
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

      <!-- 1. FULL-SCREEN GALACTIC CLASSROOM INTERIOR & MOVING SPACE WINDOW SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Smooth Brushed Titanium Wall & Floor Gradients -->
          <linearGradient id="classroomWallMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="45%" stop-color="#1e293b" />
            <stop offset="85%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#050a14" />
          </linearGradient>

          <linearGradient id="steelRibBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#090d16" />
            <stop offset="28%" stop-color="#334155" />
            <stop offset="52%" stop-color="#64748b" />
            <stop offset="78%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>

          <linearGradient id="classroomFloorDeck" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="32%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#020611" />
          </linearGradient>

          <linearGradient id="copperTrimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="45%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#78350f" />
          </linearGradient>

          <!-- Quantum Glass Equation Chalkboard Gradient -->
          <linearGradient id="quantumBoardGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#042f2e" stop-opacity="0.92" />
            <stop offset="50%" stop-color="#082f49" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98" />
          </linearGradient>

          <!-- Volumetric Ceiling Light Cones Inside Classroom -->
          <linearGradient id="classroomCeilingLight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2" />
            <stop offset="65%" stop-color="#38bdf8" stop-opacity="0.04" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
          </linearGradient>

          <!-- Tapered Shooting Star Tail Gradients (No Mouse Cursors!) -->
          <linearGradient id="shootingStarCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="18%" stop-color="#67e8f9" stop-opacity="0.9" />
            <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
          </linearGradient>

          <linearGradient id="shootingStarGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="20%" stop-color="#fef08a" stop-opacity="0.9" />
            <stop offset="60%" stop-color="#f472b6" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#f472b6" stop-opacity="0" />
          </linearGradient>

          <!-- Smooth Rounded Panoramic Observation Window Clip Path -->
          <clipPath id="panoramicWindowClip">
            <path d="M 285 74 L 1155 74 Q 1222 74 1222 140 L 1222 462 Q 1222 524 1155 524 L 285 524 Q 218 524 218 462 L 218 140 Q 218 74 285 74 Z" />
          </clipPath>

          <!-- Deep Space Nebulae & Gas Giant Gradients -->
          <linearGradient id="deepSpaceBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#02030a" />
            <stop offset="45%" stop-color="#0b0924" />
            <stop offset="80%" stop-color="#131138" />
            <stop offset="100%" stop-color="#030612" />
          </linearGradient>

          <radialGradient id="windowNebulaPink" cx="38%" cy="42%" r="45%">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.52" />
            <stop offset="45%" stop-color="#9333ea" stop-opacity="0.26" />
            <stop offset="100%" stop-color="#02030a" stop-opacity="0" />
          </radialGradient>

          <radialGradient id="windowNebulaTeal" cx="62%" cy="36%" r="46%">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.48" />
            <stop offset="45%" stop-color="#0284c7" stop-opacity="0.24" />
            <stop offset="100%" stop-color="#02030a" stop-opacity="0" />
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
        <!-- 1. SMOOTH INTERIOR CLASSROOM BULKHEAD WALLS                               -->
        <!-- ========================================================================= -->
        <rect width="1440" height="565" fill="url(#classroomWallMetal)" />

        <!-- Subtle Curved Structural Ribbing on Side Bulkheads -->
        <path d="M 0 145 Q 110 155 205 165 M 0 435 Q 110 425 205 415" fill="none" stroke="#090d16" stroke-width="3" opacity="0.75" />
        <path d="M 1440 145 Q 1330 155 1235 165 M 1440 435 Q 1330 425 1235 415" fill="none" stroke="#090d16" stroke-width="3" opacity="0.75" />

        <!-- ========================================================================= -->
        <!-- 2. GIANT FILLETED PANORAMIC OBSERVATION WINDOW (MOVING THROUGH SPACE!)    -->
        <!-- ========================================================================= -->
        <!-- Outer Smooth Rounded Armored Window Bezel Frame -->
        <path d="M 278 58 L 1162 58 Q 1240 58 1240 136 L 1240 466 Q 1240 540 1162 540 L 278 540 Q 200 540 200 466 L 200 136 Q 200 58 278 58 Z" fill="url(#steelRibBeam)" stroke="#020617" stroke-width="4" filter="drop-shadow(0 12px 28px rgba(0,0,0,0.85))" />
        <!-- Smooth Copper/Gold Inner Window Fillet Trim -->
        <path d="M 282 68 L 1158 68 Q 1228 68 1228 138 L 1228 464 Q 1228 530 1158 530 L 282 530 Q 212 530 212 464 L 212 138 Q 212 68 282 68 Z" fill="none" stroke="url(#copperTrimGrad)" stroke-width="4.5" />

        <!-- EVERYTHING INSIDE THIS GROUP IS CLIPPED TO THE SMOOTH ROUNDED WINDOW -->
        <g clip-path="url(#panoramicWindowClip)">
          <rect x="200" y="65" width="1040" height="470" fill="url(#deepSpaceBg)" />

          <!-- PARALLAX LAYER 1: SLOW-PANNING DEEP STARFIELD & CONSTELLATIONS -->
          <g style="animation: deepStarfieldPan 48s ease-in-out infinite;">
            <rect x="180" y="50" width="1250" height="500" fill="url(#windowNebulaPink)" />
            <rect x="180" y="50" width="1250" height="500" fill="url(#windowNebulaTeal)" />
            <g fill="#ffffff" opacity="0.9">
              <circle cx="245" cy="115" r="1.8" /><circle cx="315" cy="98" r="2.2" /><circle cx="395" cy="142" r="1.5" />
              <circle cx="465" cy="105" r="2.4" /><circle cx="545" cy="128" r="1.8" /><circle cx="635" cy="94" r="2.5" />
              <circle cx="715" cy="135" r="1.6" /><circle cx="805" cy="108" r="2.1" /><circle cx="895" cy="148" r="1.8" />
              <circle cx="985" cy="96" r="2.4" /><circle cx="1095" cy="118" r="1.9" /><circle cx="1195" cy="155" r="2.2" />
              <circle cx="1275" cy="112" r="2" /><circle cx="1325" cy="175" r="1.7" />
              <circle cx="265" cy="285" r="1.7" /><circle cx="355" cy="365" r="2.1" /><circle cx="445" cy="435" r="1.6" />
              <circle cx="565" cy="465" r="2.2" /><circle cx="695" cy="415" r="1.8" /><circle cx="825" cy="475" r="2" />
              <circle cx="1025" cy="455" r="1.9" /><circle cx="1185" cy="425" r="2.2" /><circle cx="1290" cy="395" r="1.8" />
              <!-- Twinkling 4-Point Beacon Stars -->
              <polygon points="315,86 318,95 327,98 318,101 315,110 312,101 303,98 312,95" fill="#fde047" style="animation: starTwinkle 2.6s ease-in-out infinite;" />
              <polygon points="635,82 638,91 647,94 638,97 635,106 632,97 623,94 632,91" fill="#67e8f9" style="animation: starTwinkle 3.2s ease-in-out 1s infinite;" />
              <polygon points="985,84 988,93 997,96 988,99 985,108 982,99 973,96 982,93" fill="#f472b6" style="animation: starTwinkle 2.2s ease-in-out 0.4s infinite;" />
            </g>
          </g>

          <!-- PARALLAX LAYER 2: CRUISING NEBULA CLOUDS & DISTANT SPIRAL GALAXY -->
          <g style="animation: midNebulaCruise 36s ease-in-out infinite;">
            <g filter="url(#nebulaSoftBlur)" opacity="0.62">
              <path d="M 280 260 Q 440 110 620 210 T 940 140 T 1260 220" fill="none" stroke="#f472b6" stroke-width="44" stroke-linecap="round" />
              <path d="M 420 350 Q 620 220 820 290 T 1220 175" fill="none" stroke="#2dd4bf" stroke-width="48" stroke-linecap="round" />
            </g>

            <!-- Distant Spiral Andromeda Galaxy -->
            <g transform="translate(1155, 425) rotate(-24) scale(0.88, 0.38)">
              <g style="animation: stationRingSpin 50s linear infinite;">
                <ellipse cx="0" cy="0" rx="88" ry="68" fill="none" stroke="#f472b6" stroke-width="12" opacity="0.5" filter="url(#nebulaSoftBlur)" />
                <path d="M 0 0 C 25 -8, 55 18, 68 48 C 78 75, 52 102, 16 102 C -32 102, -75 68, -85 16" fill="none" stroke="#fdf4ff" stroke-width="4.5" stroke-linecap="round" />
                <path d="M 0 0 C -25 8, -55 -18, -68 -48 C -78 -75, -52 -102, -16 -102 C 32 -102, 75 -68, 85 -16" fill="none" stroke="#bae6fd" stroke-width="4.5" stroke-linecap="round" />
                <circle cx="0" cy="0" r="24" fill="#fde047" opacity="0.8" filter="url(#nebulaSoftBlur)" />
                <circle cx="0" cy="0" r="12" fill="#ffffff" />
              </g>
            </g>
          </g>

          <!-- =============================================================== -->
          <!-- 6 REAL TAPERED SHOOTING STARS STREAKING ACROSS THE WINDOW!      -->
          <!-- =============================================================== -->
          <g>
            <!-- Shooting Star #1 -->
            <g transform="translate(1180, 85)">
              <g style="animation: meteorShoot 5.5s linear 0.2s infinite;">
                <polygon points="0,0 145,-3.5 145,3.5" fill="url(#shootingStarCyan)" />
                <circle cx="0" cy="0" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 8px #67e8f9)" />
              </g>
            </g>
            <!-- Shooting Star #2 -->
            <g transform="translate(880, 75)">
              <g style="animation: meteorShoot 6.8s linear 1.9s infinite;">
                <polygon points="0,0 175,-4 175,4" fill="url(#shootingStarGold)" />
                <circle cx="0" cy="0" r="4" fill="#ffffff" filter="drop-shadow(0 0 10px #fde047)" />
              </g>
            </g>
            <!-- Shooting Star #3 -->
            <g transform="translate(1280, 195)">
              <g style="animation: meteorShoot 4.8s linear 3.1s infinite;">
                <polygon points="0,0 130,-3 130,3" fill="url(#shootingStarCyan)" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" filter="drop-shadow(0 0 8px #67e8f9)" />
              </g>
            </g>
            <!-- Shooting Star #4 -->
            <g transform="translate(690, 82)">
              <g style="animation: meteorShoot 7.2s linear 4.4s infinite;">
                <polygon points="0,0 155,-3.5 155,3.5" fill="url(#shootingStarGold)" />
                <circle cx="0" cy="0" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 8px #f472b6)" />
              </g>
            </g>
            <!-- Shooting Star #5 -->
            <g transform="translate(1040, 120)">
              <g style="animation: meteorShoot 5.9s linear 2.6s infinite;">
                <polygon points="0,0 160,-3.5 160,3.5" fill="url(#shootingStarCyan)" />
                <circle cx="0" cy="0" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />
              </g>
            </g>
          </g>

          <!-- PARALLAX LAYER 3: FOREGROUND RINGED GAS GIANT, STATION & CRUISER -->
          <g style="animation: foregroundPlanetCruise 28s ease-in-out infinite;">
            
            <!-- Rotating Deep-Space Orbital Station -->
            <g transform="translate(665, 205) rotate(-18) scale(0.74)">
              <g style="animation: stationRingSpin 38s linear infinite;">
                <ellipse cx="0" cy="0" rx="68" ry="26" fill="none" stroke="#94a3b8" stroke-width="8" />
                <ellipse cx="0" cy="0" rx="68" ry="26" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6 8" />
                <line x1="-64" y1="0" x2="64" y2="0" stroke="#64748b" stroke-width="4" />
                <line x1="0" y1="-24" x2="0" y2="24" stroke="#64748b" stroke-width="4" />
              </g>
              <rect x="-8" y="-48" width="16" height="96" rx="5" fill="#cbd5e1" stroke="#0f172a" stroke-width="2" />
              <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#fde047" stroke-width="2.5" />
            </g>

            <!-- Solar-Panel Research Satellite -->
            <g transform="translate(485, 175) rotate(24) scale(0.75)">
              <rect x="-56" y="-12" width="38" height="24" rx="2" fill="#1d4ed8" stroke="#67e8f9" stroke-width="1.8" />
              <rect x="18" y="-12" width="38" height="24" rx="2" fill="#1d4ed8" stroke="#67e8f9" stroke-width="1.8" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#fde047" stroke-width="4" />
              <rect x="-12" y="-16" width="24" height="32" rx="6" fill="#e2e8f0" stroke="#334155" stroke-width="2" />
              <circle cx="0" cy="0" r="5" fill="#ef4444" />
            </g>

            <!-- Colossal Ringed Gas Giant Planet -->
            <g transform="translate(975, 290)">
              <g transform="rotate(-16)">
                <path d="M -255 0 A 255 62 0 0 1 255 0" fill="none" stroke="url(#saturnRingGrad)" stroke-width="26" opacity="0.78" />
                <path d="M -212 0 A 212 50 0 0 1 212 0" fill="none" stroke="#78350f" stroke-width="6" opacity="0.7" />
                <path d="M -185 0 A 185 43 0 0 1 185 0" fill="none" stroke="#fef3c7" stroke-width="10" opacity="0.65" />
              </g>

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

              <g transform="rotate(-16)">
                <path d="M -255 0 A 255 62 0 0 0 255 0" fill="none" stroke="url(#saturnRingGrad)" stroke-width="26" opacity="0.95" filter="drop-shadow(0 10px 14px rgba(0,0,0,0.75))" />
                <path d="M -212 0 A 212 50 0 0 0 212 0" fill="none" stroke="#451a03" stroke-width="5" opacity="0.85" />
                <path d="M -185 0 A 185 43 0 0 0 185 0" fill="none" stroke="#fffbeb" stroke-width="9" opacity="0.8" />
              </g>

              <!-- Orbiting Moons -->
              <circle cx="38" cy="32" r="11" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))" />
              <circle cx="-82" cy="112" r="15" fill="#cbd5e1" stroke="#334155" stroke-width="1.5" />
              <circle cx="148" cy="68" r="12" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
            </g>
          </g>

          <!-- Moving Science Vessel Cruiser with Saucer Ring (No Cursor Shapes!) -->
          <g style="animation: cruiserSmoothGlide 32s linear infinite;">
            <g transform="translate(0, 440) scale(0.75)">
              <ellipse cx="-18" cy="24" rx="18" ry="5" fill="#67e8f9" filter="drop-shadow(0 0 8px #38bdf8)" />
              <rect x="-8" y="18" width="48" height="12" rx="6" fill="#94a3b8" stroke="#1e293b" stroke-width="2" />
              <ellipse cx="52" cy="24" rx="34" ry="10" fill="#e2e8f0" stroke="#334155" stroke-width="2" />
              <ellipse cx="52" cy="22" rx="16" ry="5" fill="#38bdf8" />
            </g>
          </g>

          <!-- Foreground Space Dust Motes Streaming Past Window Glass (Sells Forward Ship Speed!) -->
          <g fill="#bae6fd">
            <circle cx="0" cy="160" r="2.2" style="animation: spaceDustStream 9s linear infinite;" />
            <circle cx="0" cy="280" r="3" style="animation: spaceDustStream 7s linear 2.5s infinite;" />
            <circle cx="0" cy="390" r="2" style="animation: spaceDustStream 11s linear 5s infinite;" />
            <circle cx="0" cy="220" r="2.5" style="animation: spaceDustStream 8s linear 6.2s infinite;" />
          </g>

          <!-- WINDOW HYPERSPACE WARP SURGE (Triggers on Correct Answer!) -->
          <g id="window-hyperspace-fx">
            <g stroke="#67e8f9" stroke-width="4" stroke-linecap="round">
              <line x1="720" y1="285" x2="220" y2="85" /><line x1="720" y1="285" x2="1220" y2="85" />
              <line x1="720" y1="285" x2="220" y2="285" /><line x1="720" y1="285" x2="1220" y2="285" />
              <line x1="720" y1="285" x2="220" y2="495" /><line x1="720" y1="285" x2="1220" y2="495" />
            </g>
            <g stroke="#fde047" stroke-width="3.5" stroke-linecap="round">
              <line x1="720" y1="285" x2="420" y2="80" /><line x1="720" y1="285" x2="1020" y2="80" />
              <line x1="720" y1="285" x2="420" y2="510" /><line x1="720" y1="285" x2="1020" y2="510" />
            </g>
            <circle cx="720" cy="285" r="165" fill="none" stroke="#ffffff" stroke-width="6" stroke-dasharray="24 14" filter="drop-shadow(0 0 18px #38bdf8)" />
          </g>

          <!-- Soft Curved Window Glass Specular Sheen -->
          <path d="M 275 74 L 385 74 L 235 425 L 218 310 Z" fill="#ffffff" opacity="0.05" />
        </g>

        <!-- ========================================================================= -->
        <!-- 3. SMOOTH CURVED CEILING ARCHES & VOLUMETRIC LIGHT CONES                  -->
        <!-- ========================================================================= -->
        <path d="M 0 0 L 1440 0 L 1440 96 Q 1340 64 1185 60 L 255 60 Q 100 64 0 96 Z" fill="#1e293b" stroke="#090d16" stroke-width="3" />
        <polygon points="185,0 242,0 295,60 255,60" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />
        <polygon points="520,0 565,0 585,60 550,60" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />
        <polygon points="875,0 920,0 890,60 855,60" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />
        <polygon points="1198,0 1255,0 1185,60 1145,60" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2" />

        <polygon points="295,60 550,60 620,560 210,560" fill="url(#classroomCeilingLight)" />
        <polygon points="890,60 1145,60 1230,560 820,560" fill="url(#classroomCeilingLight)" />

        <!-- ========================================================================= -->
        <!-- 4. LEFT & RIGHT QUANTUM EQUATION CHALKBOARDS (PACKED WITH WEIRD MATH!)    -->
        <!-- ========================================================================= -->

        <!-- LEFT WALL: ASTRO-PHYSICS & WORMHOLE METRIC EQUATION BOARD -->
        <g filter="drop-shadow(0 12px 22px rgba(0,0,0,0.85))">
          <!-- Curved Perspective Metallic Frame on Left Wall -->
          <path d="M 14 118 C 14 106, 26 102, 38 106 L 178 148 C 188 152, 192 162, 192 174 L 192 436 C 192 448, 184 454, 174 452 L 34 422 C 20 418, 14 408, 14 394 Z" fill="url(#steelRibBeam)" stroke="url(#copperTrimGrad)" stroke-width="3.5" />
          <!-- Dark Quantum Slate Glass Surface -->
          <path d="M 24 130 L 180 172 L 180 434 L 24 402 Z" fill="url(#quantumBoardGlass)" stroke="#38bdf8" stroke-width="2" />

          <!-- Glowing Neon Equations Skewed in Perspective to Match the Left Wall -->
          <g transform="translate(32, 154) skewY(13)" style="animation: equationGlowPulse 4s ease-in-out infinite;">
            <text x="0" y="0" fill="#fde047" font-family="monospace" font-weight="900" font-size="10.5" letter-spacing="0.5">// WORMHOLE METRIC</text>
            <!-- Einstein Field Tensor Equation -->
            <text x="0" y="22" fill="#67e8f9" font-family="serif" font-style="italic" font-weight="bold" font-size="13.5">Rμν - ½Rgμν + Λgμν = κTμν</text>
            <!-- Schrödinger Wave Equation -->
            <text x="0" y="45" fill="#f472b6" font-family="serif" font-style="italic" font-weight="bold" font-size="13">iℏ ∂Ψ/∂t = [-ℏ²/2m ∇² + V]Ψ</text>
            <!-- Relativistic Spacetime Interval -->
            <text x="0" y="68" fill="#4ade80" font-family="serif" font-style="italic" font-weight="bold" font-size="12.5">ds² = -c²dt² + dr²/(1 - rₛ/r)</text>
            <!-- Path Integral & Planck Summation -->
            <text x="0" y="92" fill="#fdf4ff" font-family="serif" font-style="italic" font-size="12.5">∮ B·ds = μ₀I + μ₀ε₀ dΦₑ/dt</text>
            <text x="0" y="114" fill="#fde047" font-family="serif" font-style="italic" font-size="12.5">ζ(s) = ∑ n⁻ˢ = ∏ (1 - p⁻ˢ)⁻¹</text>

            <!-- Glowing Wormhole Funnel & Sine-Wave Telemetry Diagram Drawn on the Board -->
            <ellipse cx="68" cy="145" rx="48" ry="10" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 3" />
            <path d="M 20 145 Q 58 168 54 198 M 116 145 Q 78 168 82 198" fill="none" stroke="#67e8f9" stroke-width="2" />
            <ellipse cx="68" cy="198" rx="14" ry="4" fill="none" stroke="#f472b6" stroke-width="2" />
            <path d="M 4 218 Q 26 198 48 218 T 92 218 T 136 218" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="8 4" style="animation: sineWaveMorph 3s linear infinite;" />
          </g>
        </g>

        <!-- RIGHT WALL: QUANTUM ASTRO-NAVIGATION & HYPERDRIVE EQUATION BOARD -->
        <g filter="drop-shadow(0 12px 22px rgba(0,0,0,0.85))">
          <!-- Curved Perspective Metallic Frame on Right Wall -->
          <path d="M 1426 118 C 1426 106, 1414 102, 1402 106 L 1262 148 C 1252 152, 1248 162, 1248 174 L 1248 436 C 1248 448, 1256 454, 1266 452 L 1406 422 C 1420 418, 1426 408, 1426 394 Z" fill="url(#steelRibBeam)" stroke="url(#copperTrimGrad)" stroke-width="3.5" />
          <!-- Dark Quantum Slate Glass Surface -->
          <path d="M 1416 130 L 1260 172 L 1260 434 L 1416 402 Z" fill="url(#quantumBoardGlass)" stroke="#38bdf8" stroke-width="2" />

          <!-- Glowing Neon Equations Skewed in Perspective to Match the Right Wall -->
          <g transform="translate(1268, 188) skewY(-13)" style="animation: equationGlowPulse 4.5s ease-in-out 1s infinite;">
            <text x="0" y="0" fill="#fde047" font-family="monospace" font-weight="900" font-size="10.5" letter-spacing="0.5">// HYPERDRIVE FLUX</text>
            <!-- Tsiolkovsky Relativistic Rocket Integral -->
            <text x="0" y="22" fill="#4ade80" font-family="serif" font-style="italic" font-weight="bold" font-size="13">Δv = c·tanh((Iₛₚg₀/c)ln(m₀/mf))</text>
            <!-- Dirac Equation & Euler Identity -->
            <text x="0" y="45" fill="#67e8f9" font-family="serif" font-style="italic" font-weight="bold" font-size="13.5">(iγᵘ∂ᵤ - m)ψ = 0   eⁱᵖ + 1 = 0</text>
            <!-- Partition Function & Fourier Transform -->
            <text x="0" y="68" fill="#f472b6" font-family="serif" font-style="italic" font-weight="bold" font-size="12.5">f̂(ξ) = ∫₋∞^∞ f(x)e⁻²ᵖⁱˣᵡ dx</text>
            <!-- Navier-Stokes / Orbital Kepler Law -->
            <text x="0" y="92" fill="#fdf4ff" font-family="serif" font-style="italic" font-size="12.5">T² = (4π²/GM)a³   ∇×E = -∂B/∂t</text>
            <text x="0" y="114" fill="#fde047" font-family="serif" font-style="italic" font-size="12.5">S = k_B ln(Ω) = A·c³/(4Gℏ)</text>

            <!-- Glowing Orbital Slingshot & Phase-Space Spiral Drawn on Right Board -->
            <ellipse cx="72" cy="158" rx="54" ry="22" transform="rotate(-14 72 158)" fill="none" stroke="#67e8f9" stroke-width="1.8" stroke-dasharray="5 3" />
            <circle cx="52" cy="162" r="8" fill="#fde047" opacity="0.85" />
            <circle cx="116" cy="146" r="4.5" fill="#f472b6" />
            <!-- Coordinate Grid & Vector Arrow -->
            <path d="M 12 208 L 132 208 M 24 190 L 24 224" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
            <path d="M 24 218 C 52 188, 88 228, 126 192" fill="none" stroke="#f472b6" stroke-width="2.2" />
          </g>
        </g>

        <!-- Smooth Rounded Student Holo-Desks at Left & Right Foreground Corners -->
        <g transform="translate(18, 468)">
          <rect x="8" y="38" width="144" height="22" rx="10" fill="#334155" stroke="#090d16" stroke-width="2.5" />
          <rect x="32" y="58" width="96" height="65" rx="8" fill="#1e293b" stroke="#090d16" stroke-width="2.5" />
          <rect x="42" y="6" width="76" height="36" rx="6" transform="skewX(-10)" fill="rgba(56, 189, 248, 0.25)" stroke="#67e8f9" stroke-width="2" />
          <path d="M 52 24 Q 68 12 84 24 T 106 24" fill="none" stroke="#fde047" stroke-width="2" />
        </g>

        <g transform="translate(1268, 468)">
          <rect x="8" y="38" width="144" height="22" rx="10" fill="#334155" stroke="#090d16" stroke-width="2.5" />
          <rect x="32" y="58" width="96" height="65" rx="8" fill="#1e293b" stroke="#090d16" stroke-width="2.5" />
          <rect x="36" y="6" width="76" height="36" rx="6" transform="skewX(10)" fill="rgba(56, 189, 248, 0.25)" stroke="#67e8f9" stroke-width="2" />
          <circle cx="80" cy="24" r="10" fill="none" stroke="#67e8f9" stroke-width="2" stroke-dasharray="4 3" />
        </g>

        <!-- ========================================================================= -->
        <!-- 5. SMOOTH CURVED CLASSROOM DECK FLOOR & POWER CONDUITS                    -->
        <!-- ========================================================================= -->
        <path d="M 0 555 Q 720 538 1440 555 L 1440 900 L 0 900 Z" fill="url(#classroomFloorDeck)" />
        <path d="M 0 555 Q 720 538 1440 555" fill="none" stroke="url(#copperTrimGrad)" stroke-width="4" opacity="0.8" />

        <!-- Concentric Circular Classroom Deck Rings -->
        <g transform="translate(720, 685)">
          <ellipse cx="0" cy="0" rx="505" ry="125" fill="none" stroke="url(#copperTrimGrad)" stroke-width="7" opacity="0.72" />
          <ellipse cx="0" cy="0" rx="475" ry="115" fill="#0f172a" stroke="#334155" stroke-width="3" />
          <ellipse cx="0" cy="0" rx="345" ry="82" fill="#1e293b" stroke="#475569" stroke-width="2.5" />
          <ellipse cx="0" cy="0" rx="220" ry="52" fill="#090d16" stroke="#38bdf8" stroke-width="2" />
          <path class="floor-conduit-flow" d="M -470 0 L -180 0" stroke="#38bdf8" stroke-width="5" />
          <path class="floor-conduit-flow" d="M 470 0 L 180 0" stroke="#38bdf8" stroke-width="5" />
          <path class="floor-conduit-flow" d="M 0 115 L 0 50" stroke="#fde047" stroke-width="5" />
        </g>
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR HOLOGRAPHIC STARS & PLANETS ON CORRECT ANSWER -->
      <div id="spaceschool-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. GROUNDED CLASSROOM STAGE: PROFESSOR NOVA + CENTRAL HOLO-PROJECTOR PODIUM -->
      <div style="position: absolute; bottom: 172px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 28px; width: 95%; max-width: 940px; z-index: 5; pointer-events: none;">

        <!-- PROFESSOR NOVA — GALACTIC ACADEMY INSTRUCTOR -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -6px;">
          <div id="nova-speech-bubble" style="background: rgba(8, 47, 73, 0.96); color: #67e8f9; border: 2.5px solid #38bdf8; border-radius: 16px; padding: 6px 14px; font-size: 0.82rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 6px 16px rgba(0,0,0,0.65), 0 0 12px rgba(56,189,248,0.3); white-space: nowrap; transition: all 0.2s;">
            Solve the holo-equation to jump the fleet! 🚀✨
          </div>

          <div style="position: relative; width: 210px; height: 255px; display: flex; justify-content: center; align-items: flex-end;">
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

                <!-- Jetpack & Hover Thruster Plume -->
                <rect x="68" y="102" width="74" height="68" rx="12" fill="#334155" stroke="#090d16" stroke-width="2.8" />
                <ellipse cx="82" cy="176" rx="9" ry="22" fill="#38bdf8" opacity="0.85" filter="drop-shadow(0 0 12px #38bdf8)" />
                <ellipse cx="82" cy="172" rx="4.5" ry="14" fill="#ffffff" />

                <!-- Planted Astronaut Boots & Articulated Legs -->
                <rect x="82" y="188" width="22" height="54" rx="9" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.8" />
                <rect x="80" y="210" width="26" height="8" rx="4" fill="url(#copperArmor)" stroke="#090d16" stroke-width="1.8" />
                <rect x="75" y="236" width="34" height="16" rx="7" fill="#334155" stroke="#090d16" stroke-width="2.8" />

                <rect x="112" y="188" width="22" height="54" rx="9" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.8" />
                <rect x="110" y="210" width="26" height="8" rx="4" fill="url(#copperArmor)" stroke="#090d16" stroke-width="1.8" />
                <rect x="108" y="236" width="34" height="16" rx="7" fill="#334155" stroke="#090d16" stroke-width="2.8" />

                <!-- Sculpted EVA Flight Suit Torso -->
                <rect x="76" y="112" width="64" height="82" rx="20" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="3" />
                <ellipse cx="108" cy="114" rx="28" ry="8" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2.2" />
                <rect x="74" y="178" width="68" height="12" rx="5" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2.2" />
                <rect x="98" y="176" width="20" height="16" rx="4" fill="#fde047" stroke="#090d16" stroke-width="2" />
                <rect x="90" y="130" width="36" height="28" rx="6" fill="#090d16" stroke="#38bdf8" stroke-width="2" />
                <circle cx="100" cy="144" r="5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
                <line x1="110" y1="139" x2="120" y2="139" stroke="#fde047" stroke-width="2.5" stroke-linecap="round" />
                <line x1="110" y1="147" x2="118" y2="147" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" />

                <!-- Left Arm Holding Glowing Holographic Pointer Wand -->
                <rect x="56" y="120" width="18" height="44" rx="9" transform="rotate(28 65 120)" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.6" />
                <circle cx="62" cy="162" r="8" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2" />
                <line x1="42" y1="184" x2="96" y2="142" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 8px #38bdf8)" />
                <circle cx="98" cy="140" r="6" fill="#ffffff" stroke="#38bdf8" stroke-width="2" />

                <!-- Right Waving Arm Gesturing Toward the Holo-Equation -->
                <g style="transform-origin: 138px 124px; animation: profPointerWave 2.6s ease-in-out infinite;">
                  <rect x="134" y="114" width="48" height="18" rx="9" transform="rotate(-22 138 124)" fill="url(#astroSuitBlue)" stroke="#090d16" stroke-width="2.6" />
                  <circle cx="180" cy="108" r="8.5" fill="url(#copperArmor)" stroke="#090d16" stroke-width="2" />
                </g>

                <!-- INSTRUCTOR HEAD & GLOWING GLASS BUBBLE SPACE HELMET -->
                <circle cx="108" cy="74" r="38" fill="rgba(56, 189, 248, 0.16)" stroke="#67e8f9" stroke-width="3" filter="drop-shadow(0 0 12px rgba(56,189,248,0.6))" />
                <circle cx="108" cy="76" r="25" fill="#fed7aa" stroke="#7c2d12" stroke-width="2.4" />
                <path d="M 83 72 C 82 48, 134 48, 133 72 C 125 58, 92 58, 83 72 Z" fill="#1e293b" />
                <circle cx="99" cy="74" r="3.5" fill="#0f172a" /><circle cx="98" cy="72.8" r="1.2" fill="#ffffff" />
                <circle cx="117" cy="74" r="3.5" fill="#0f172a" /><circle cx="116" cy="72.8" r="1.2" fill="#ffffff" />
                <path d="M 94 68 L 103 69 M 113 69 L 122 68" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
                <path d="M 101 86 Q 108 92 115 86" fill="none" stroke="#7c2d12" stroke-width="2.5" stroke-linecap="round" />
                <path d="M 82 54 A 28 28 0 0 1 128 48" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.75" />
              </svg>
            </div>
          </div>
        </div>

        <!-- THE CLASSROOM HOLO-PROJECTOR PODIUM & FLOATING HOLOGRAPHIC MATH RING -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <div id="holotable-board" style="position: relative; width: 420px; max-width: 56vw; min-height: 235px; background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.28) 0%, rgba(8, 47, 73, 0.68) 65%, rgba(2, 6, 23, 0.85) 100%); border: 3px solid #67e8f9; border-radius: 32px; box-shadow: 0 0 32px rgba(56, 189, 248, 0.45), inset 0 0 28px rgba(56, 189, 248, 0.35); padding: 20px 28px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 3; backdrop-filter: blur(3px);">
            
            <!-- Rotating Holographic Astrolabe Target Rings -->
            <svg viewBox="0 0 240 240" style="position: absolute; width: 215px; height: 215px; opacity: 0.42; pointer-events: none; animation: stationRingSpin 24s linear infinite;">
              <circle cx="120" cy="120" r="104" fill="none" stroke="#67e8f9" stroke-width="3" stroke-dasharray="24 12" />
              <circle cx="120" cy="120" r="86" fill="none" stroke="#e879f9" stroke-width="2.5" stroke-dasharray="14 10" />
              <line x1="120" y1="6" x2="120" y2="30" stroke="#fde047" stroke-width="3" />
              <line x1="120" y1="210" x2="120" y2="234" stroke="#fde047" stroke-width="3" />
              <line x1="6" y1="120" x2="30" y2="120" stroke="#fde047" stroke-width="3" />
              <line x1="210" y1="120" x2="234" y2="120" stroke="#fde047" stroke-width="3" />
            </svg>

            <!-- Left & Right Holographic Telemetry Readouts -->
            <div style="position: absolute; left: 16px; top: 26px; bottom: 26px; display: flex; flex-direction: column; justify-content: space-between; font-family: monospace; font-size: 0.6rem; color: #67e8f9; opacity: 0.85;">
              <div>ψ(x,t): LOCK</div>
              <div>ORB: 14.2 km/s</div>
              <div>Δv: NOMINAL</div>
            </div>
            <div style="position: absolute; right: 16px; top: 26px; bottom: 26px; display: flex; flex-direction: column; justify-content: space-between; font-family: monospace; font-size: 0.6rem; color: #fde047; opacity: 0.85; text-align: right;">
              <div>WARP: READY</div>
              <div>FLUX: 99.4%</div>
              <div>SYNC: 100%</div>
            </div>

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

          <!-- SMOOTH ROUNDED BRONZE & TITANIUM HOLO-TABLE PEDESTAL BASE -->
          <div style="position: relative; width: 390px; height: 78px; margin-top: -10px; z-index: 2; display: flex; justify-content: center;">
            <svg viewBox="0 0 390 82" style="width: 100%; height: 82px; overflow: visible; filter: drop-shadow(0 14px 20px rgba(0,0,0,0.85));">
              <polygon points="85,18 305,18 345,-10 45,-10" fill="rgba(56, 189, 248, 0.25)" />
              <ellipse cx="195" cy="24" rx="165" ry="20" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="3" />
              <ellipse cx="195" cy="20" rx="135" ry="13" fill="#0284c7" stroke="#67e8f9" stroke-width="2" />
              <ellipse cx="195" cy="20" rx="95" ry="8" fill="#e0f2fe" />
              <path d="M 95 36 Q 195 44 295 36 L 312 72 Q 195 78 78 72 Z" fill="url(#steelRibBeam)" stroke="#090d16" stroke-width="3" />
              <rect x="115" y="44" width="52" height="20" rx="6" fill="#090d16" stroke="#38bdf8" stroke-width="1.8" />
              <rect x="223" y="44" width="52" height="20" rx="6" fill="#090d16" stroke="#38bdf8" stroke-width="1.8" />
              <rect x="52" y="68" width="286" height="12" rx="6" fill="url(#copperTrimGrad)" stroke="#090d16" stroke-width="2.5" />
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
