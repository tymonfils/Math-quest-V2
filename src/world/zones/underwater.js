// src/world/zones/underwater.js - High-Detail Bioluminescent Coral Reef & Giant Pearl Clam Biome
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadUnderwater() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("underwater-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "underwater-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes sunRayShimmer {
      0%, 100% { opacity: 0.32; transform: skewX(-12deg) scaleX(1); }
      50% { opacity: 0.62; transform: skewX(-10deg) scaleX(1.08); }
    }
    @keyframes kelpSway {
      0%, 100% { transform: rotate(-4deg) skewX(-3deg); }
      50% { transform: rotate(5deg) skewX(4deg); }
    }
    @keyframes swimRightSlow {
      0% { transform: translateX(-320px) translateY(0px); }
      50% { transform: translateX(50vw) translateY(-18px); }
      100% { transform: translateX(115vw) translateY(6px); }
    }
    @keyframes swimLeftMed {
      0% { transform: translateX(115vw) translateY(0px); }
      50% { transform: translateX(45vw) translateY(16px); }
      100% { transform: translateX(-280px) translateY(-8px); }
    }
    @keyframes swimRightFast {
      0% { transform: translateX(-220px) translateY(0px); }
      25% { transform: translateX(25vw) translateY(-14px); }
      50% { transform: translateX(55vw) translateY(10px); }
      75% { transform: translateX(85vw) translateY(-10px); }
      100% { transform: translateX(115vw) translateY(0px); }
    }
    @keyframes jellyfishPulse {
      0%, 100% { transform: translateY(0px) scaleX(1) scaleY(1); }
      45% { transform: translateY(-22px) scaleX(0.88) scaleY(1.12); }
    }
    @keyframes bubbleRiseStream {
      0% { transform: translateY(0px) translateX(0px) scale(0.5); opacity: 0; }
      15% { opacity: 0.85; }
      50% { transform: translateY(-280px) translateX(14px) scale(0.95); }
      85% { opacity: 0.8; }
      100% { transform: translateY(-580px) translateX(-12px) scale(1.35); opacity: 0; }
    }
    @keyframes clamTopBreathe {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-2.5deg); }
    }
    @keyframes clamShellCelebrate {
      0%, 100% { transform: scale(1); }
      30% { transform: scale(1.06) rotate(-1.5deg); }
      65% { transform: scale(0.98) rotate(1deg); }
    }
    @keyframes octoFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-7px); }
    }
    @keyframes tentacleWaveLeft {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-10deg); }
    }
    @keyframes tentacleWaveRight {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(12deg); }
    }
    @keyframes octoCelebrateJump {
      0% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-30px) rotate(-5deg) scale(1.06); }
      50% { transform: translateY(-6px) rotate(4deg) scale(0.96, 1.04); }
      75% { transform: translateY(-18px) rotate(-3deg) scale(1.03); }
      100% { transform: translateY(0) scale(1); }
    }
    @keyframes octoShakeNo {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes vortexGeyserErupt {
      0% { transform: scaleY(0) scaleX(0.4); opacity: 0; }
      18% { transform: scaleY(1.06) scaleX(1.1); opacity: 1; }
      50% { transform: scaleY(0.98) scaleX(0.96); opacity: 1; }
      80% { transform: scaleY(1.08) scaleX(1.12); opacity: 0.85; }
      100% { transform: scaleY(0) scaleX(1.35); opacity: 0; }
    }
    @keyframes oceanParticleBurst {
      0% { transform: translate(0, 0) scale(0.35) rotate(0deg); opacity: 1; }
      60% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.25) rotate(var(--rot)); opacity: 0; }
    }
    .octo-idle {
      transform-origin: center bottom;
      animation: octoFloat 3.2s ease-in-out infinite;
    }
    .octo-party {
      transform-origin: center bottom;
      animation: octoCelebrateJump 0.88s ease-in-out 2 !important;
    }
    .octo-oops {
      transform-origin: center bottom;
      animation: octoShakeNo 0.55s ease-in-out 1 !important;
    }
    .clam-pop-anim {
      animation: clamShellCelebrate 0.65s ease-out 1;
    }
    #reef-vortex-geyser {
      transform-origin: 540px 560px;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    #reef-vortex-geyser.erupting {
      animation: vortexGeyserErupt 1.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="underwater-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #0ea5e9 0%, #0284c7 18%, #0369a1 42%, #0c4a6e 72%, #041e3a 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN HIGH-DETAIL CORAL REEF, SUNBEAMS & MARINE ECOSYSTEM SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Volumetric Underwater Sunbeam Gradient -->
          <linearGradient id="godRayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.7" />
            <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
          </linearGradient>

          <!-- Sandy Seabed & Reef Ridge Gradients -->
          <linearGradient id="farReefRidge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#075985" />
            <stop offset="100%" stop-color="#082f49" />
          </linearGradient>

          <linearGradient id="midSandSeabed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="18%" stop-color="#0284c7" />
            <stop offset="65%" stop-color="#0c4a6e" />
            <stop offset="100%" stop-color="#041e3a" />
          </linearGradient>

          <linearGradient id="goldenSandDune" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7dd3fc" />
            <stop offset="35%" stop-color="#0ea5e9" />
            <stop offset="100%" stop-color="#075985" />
          </linearGradient>

          <linearGradient id="nearReefForeground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#082f49" />
            <stop offset="100%" stop-color="#020b18" />
          </linearGradient>

          <!-- Giant Clam Shell & Iridescent Mother-of-Pearl Gradients -->
          <linearGradient id="clamShellOuter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c084fc" />
            <stop offset="45%" stop-color="#7e22ce" />
            <stop offset="85%" stop-color="#4c1d95" />
            <stop offset="100%" stop-color="#2e1065" />
          </linearGradient>

          <radialGradient id="motherOfPearlNacre" cx="50%" cy="48%" r="56%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="32%" stop-color="#fdf4ff" />
            <stop offset="62%" stop-color="#bae6fd" />
            <stop offset="85%" stop-color="#f5d0fe" />
            <stop offset="100%" stop-color="#a855f7" />
          </radialGradient>

          <radialGradient id="giantPearlOrb" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="28%" stop-color="#fff1f2" />
            <stop offset="65%" stop-color="#fbcfe8" />
            <stop offset="90%" stop-color="#e879f9" />
            <stop offset="100%" stop-color="#a21caf" />
          </radialGradient>

          <!-- Glossy 3D Bubble Reflection -->
          <radialGradient id="bubble3DGrad" cx="32%" cy="30%" r="68%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
            <stop offset="25%" stop-color="#bae6fd" stop-opacity="0.45" />
            <stop offset="75%" stop-color="#38bdf8" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0.75" />
          </radialGradient>

          <!-- Coral Gradients -->
          <linearGradient id="staghornCoralPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fda4af" />
            <stop offset="50%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#881337" />
          </linearGradient>

          <linearGradient id="tubeCoralOrange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fde047" />
            <stop offset="45%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#9a3412" />
          </linearGradient>

          <linearGradient id="kelpBladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4ade80" />
            <stop offset="55%" stop-color="#0d9488" />
            <stop offset="100%" stop-color="#064e3b" />
          </linearGradient>

          <linearGradient id="vortexPlumeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.85" />
            <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.92" />
            <stop offset="80%" stop-color="#a5f3fc" stop-opacity="0.96" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- ========================================================================= -->
        <!-- 1. OCEAN SURFACE RIPPLES & VOLUMETRIC SUNLIGHT GOD-RAYS                   -->
        <!-- ========================================================================= -->
        <path d="M 0 0 L 1440 0 L 1440 48 Q 1260 68 1080 42 Q 900 18 720 46 Q 540 72 360 42 Q 180 16 0 48 Z" fill="#bae6fd" opacity="0.55" />
        <path d="M 0 0 L 1440 0 L 1440 26 Q 1180 46 920 22 Q 660 2 400 28 Q 180 48 0 24 Z" fill="#ffffff" opacity="0.65" />

        <!-- Shimmering Diagonal Sunbeams Piercing the Deep -->
        <g style="animation: sunRayShimmer 6s ease-in-out infinite;">
          <polygon points="180,0 320,0 520,680 260,680" fill="url(#godRayGrad)" />
          <polygon points="480,0 680,0 920,740 620,740" fill="url(#godRayGrad)" />
          <polygon points="860,0 1010,0 1240,680 990,680" fill="url(#godRayGrad)" />
          <polygon points="1180,0 1310,0 1490,620 1310,620" fill="url(#godRayGrad)" />
        </g>

        <!-- ========================================================================= -->
        <!-- 2. DEEP BACKGROUND: SUNKEN ATLANTEAN TEMPLE RUINS & DISTANT REEF          -->
        <!-- ========================================================================= -->
        <path d="M -60 495 Q 260 410 620 475 T 1320 445 L 1480 480 L 1480 900 L -60 900 Z" fill="url(#farReefRidge)" opacity="0.75" />

        <!-- Sunken Ancient Atlantean Columns & Archway on Distant Ridge -->
        <g transform="translate(880, 295)" opacity="0.42" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5">
          <rect x="20" y="55" width="22" height="145" />
          <rect x="14" y="48" width="34" height="10" />
          <rect x="85" y="35" width="22" height="165" />
          <rect x="79" y="28" width="34" height="10" />
          <rect x="150" y="75" width="22" height="125" />
          <path d="M 10 48 L 62 12 L 120 28 L 115 38 L 62 24 L 16 52 Z" />
        </g>

        <!-- ========================================================================= -->
        <!-- 3. MULTI-DEPTH SWIMMING MARINE LIFE (WHALE SHARK, TURTLE, SCHOOLS, JELLY) -->
        <!-- ========================================================================= -->

        <!-- LAYER A: Colossal Deep-Water Whale Shark Silhouette + Remora Fish -->
        <g style="animation: swimRightSlow 44s linear infinite;">
          <g transform="translate(0, 115)" opacity="0.48">
            <path d="M 20 55 C 65 22, 165 18, 245 45 C 275 54, 295 52, 325 22 L 315 58 L 328 86 C 295 66, 275 64, 245 72 C 185 88, 125 90, 65 76 L 35 108 L 48 72 C 30 68, 18 62, 20 55 Z" fill="#082f49" />
            <path d="M 135 28 L 162 -6 L 178 32 Z" fill="#082f49" />
            <!-- Whale Shark White Constellation Spots -->
            <g fill="#bae6fd" opacity="0.7">
              <circle cx="95" cy="48" r="2.5" /><circle cx="112" cy="42" r="2" /><circle cx="110" cy="58" r="2.5" />
              <circle cx="135" cy="46" r="2.5" /><circle cx="152" cy="54" r="2" /><circle cx="172" cy="48" r="2.5" />
              <circle cx="192" cy="56" r="2" /><circle cx="212" cy="52" r="2.5" />
            </g>
          </g>
        </g>

        <!-- LAYER B: Graceful Green Sea Turtle Gliding Across Mid-Water -->
        <g style="animation: swimLeftMed 28s linear infinite;">
          <g transform="translate(0, 185) scale(0.88)">
            <!-- Back Flipper -->
            <path d="M 118 52 C 138 48, 148 58, 132 64 Z" fill="#15803d" stroke="#052e16" stroke-width="2" />
            <!-- Sculpted Sea Turtle Head -->
            <path d="M 32 42 C 12 36, 4 48, 16 56 C 24 60, 34 56, 38 50 Z" fill="#22c55e" stroke="#052e16" stroke-width="2.2" />
            <circle cx="18" cy="45" r="3" fill="#0f172a" /><circle cx="17" cy="44" r="1" fill="#ffffff" />
            <!-- Domed Tortoiseshell Carapace with Hexagonal Scutes -->
            <path d="M 34 46 C 42 12, 108 12, 124 48 C 102 58, 52 58, 34 46 Z" fill="#b45309" stroke="#451a03" stroke-width="2.5" />
            <polygon points="56,28 74,24 82,36 68,44 52,38" fill="#d97706" stroke="#451a03" stroke-width="1.8" />
            <polygon points="84,26 102,30 106,42 86,44 82,36" fill="#d97706" stroke="#451a03" stroke-width="1.8" />
            <path d="M 34 46 Q 78 58 124 48" fill="none" stroke="#fde047" stroke-width="3" />
            <!-- Long Wing-Like Front Flipper -->
            <path d="M 48 48 C 36 74, 54 92, 68 78 C 66 64, 60 54, 56 48 Z" fill="#22c55e" stroke="#052e16" stroke-width="2.2" />
            <circle cx="48" cy="64" r="2.5" fill="#14532d" />
            <circle cx="54" cy="74" r="2.5" fill="#14532d" />
          </g>
        </g>

        <!-- LAYER C: School of 5 Vibrant Clownfish & Blue Tangs (Fast Midground) -->
        <g style="animation: swimRightFast 19s linear infinite;">
          <g transform="translate(0, 265)">
            <!-- Lead Regal Blue Tang ("Dory" Style) -->
            <g transform="translate(65, 0)">
              <polygon points="-14,0 -28,-12 -24,0 -28,12" fill="#fde047" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="22" ry="14" fill="#2563eb" stroke="#0f172a" stroke-width="2.2" />
              <path d="M -12 -4 C -2 -12, 12 -8, 14 2 C 6 4, -4 0, -12 6 Z" fill="#0f172a" />
              <circle cx="12" cy="-3" r="3" fill="#ffffff" /><circle cx="13" cy="-3" r="1.5" fill="#0f172a" />
            </g>
            <!-- 3 Striped Orange Clownfish -->
            <g transform="translate(12, 24) scale(0.82)">
              <circle cx="-18" cy="0" r="8" fill="#f97316" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="20" ry="11" fill="#f97316" stroke="#0f172a" stroke-width="2.2" />
              <path d="M -8 -10 Q -4 0 -8 10 M 4 -11 Q 8 0 4 11" fill="none" stroke="#ffffff" stroke-width="4.5" />
              <circle cx="12" cy="-2" r="2.5" fill="#0f172a" />
            </g>
            <g transform="translate(-28, -14) scale(0.72)">
              <circle cx="-18" cy="0" r="8" fill="#f97316" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="20" ry="11" fill="#f97316" stroke="#0f172a" stroke-width="2.2" />
              <path d="M -8 -10 Q -4 0 -8 10 M 4 -11 Q 8 0 4 11" fill="none" stroke="#ffffff" stroke-width="4.5" />
              <circle cx="12" cy="-2" r="2.5" fill="#0f172a" />
            </g>
            <g transform="translate(-45, 18) scale(0.65)">
              <circle cx="-18" cy="0" r="8" fill="#f97316" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="20" ry="11" fill="#f97316" stroke="#0f172a" stroke-width="2.2" />
              <path d="M -8 -10 Q -4 0 -8 10 M 4 -11 Q 8 0 4 11" fill="none" stroke="#ffffff" stroke-width="4.5" />
              <circle cx="12" cy="-2" r="2.5" fill="#0f172a" />
            </g>
          </g>
        </g>

        <!-- LAYER D: School of Golden Butterflyfish Swimming Left -->
        <g style="animation: swimLeftMed 22s linear 6s infinite;">
          <g transform="translate(0, 330)">
            <g transform="translate(0, 0) scale(0.85)">
              <polygon points="18,0 30,-10 28,10" fill="#fde047" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="22" ry="16" fill="#fef08a" stroke="#0f172a" stroke-width="2.2" />
              <line x1="-10" y1="-14" x2="-10" y2="14" stroke="#0f172a" stroke-width="4" />
              <line x1="2" y1="-15" x2="2" y2="15" stroke="#f59e0b" stroke-width="3" />
              <circle cx="-10" cy="-3" r="2.5" fill="#ffffff" />
            </g>
            <g transform="translate(42, 18) scale(0.68)">
              <polygon points="18,0 30,-10 28,10" fill="#fde047" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="22" ry="16" fill="#fef08a" stroke="#0f172a" stroke-width="2.2" />
              <line x1="-10" y1="-14" x2="-10" y2="14" stroke="#0f172a" stroke-width="4" />
            </g>
          </g>
        </g>

        <!-- LAYER E: Bioluminescent Pulsing Jellyfish Trio (Top Right & Left) -->
        <g transform="translate(1195, 195)">
          <g style="animation: jellyfishPulse 3.6s ease-in-out infinite;" filter="drop-shadow(0 0 14px rgba(244,114,182,0.8))">
            <!-- Trailing Frilly Oral Arms & Tentacles -->
            <path d="M -18 22 Q -26 55 -14 88 M -6 24 Q 4 60 -6 96 M 8 24 Q 18 58 8 92 M 20 22 Q 28 52 18 84" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-linecap="round" opacity="0.85" />
            <path d="M -12 24 C -2 48, 2 68, -8 90 M 12 24 C 2 48, 6 68, 14 90" fill="none" stroke="#67e8f9" stroke-width="2" opacity="0.75" />
            <!-- Translucent Glowing Bell Dome -->
            <path d="M -34 22 C -34 -16, 34 -16, 34 22 C 22 16, 10 26, 0 20 C -10 26, -22 16, -34 22 Z" fill="rgba(244, 114, 182, 0.72)" stroke="#fbcfe8" stroke-width="2.5" />
            <ellipse cx="0" cy="6" rx="18" ry="10" fill="#fdf4ff" opacity="0.6" />
          </g>
        </g>

        <g transform="translate(175, 225) scale(0.75)">
          <g style="animation: jellyfishPulse 4.2s ease-in-out 1.2s infinite;" filter="drop-shadow(0 0 12px rgba(103,232,249,0.8))">
            <path d="M -16 22 Q -22 52 -12 82 M 0 24 Q 8 56 -2 88 M 16 22 Q 24 50 14 80" fill="none" stroke="#67e8f9" stroke-width="2.5" opacity="0.85" />
            <path d="M -32 22 C -32 -14, 32 -14, 32 22 C 18 16, -18 16, -32 22 Z" fill="rgba(34, 211, 238, 0.72)" stroke="#cffafe" stroke-width="2.5" />
            <ellipse cx="0" cy="6" rx="16" ry="9" fill="#ffffff" opacity="0.6" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 4. MIDGROUND CORAL REEF PLATEAU, KELP FORESTS & BRAIN CORALS              -->
        <!-- ========================================================================= -->
        <path d="M -100 540 Q 320 465 760 535 T 1540 505 L 1540 900 L -100 900 Z" fill="url(#midSandSeabed)" />
        <path d="M -80 595 Q 380 530 820 595 T 1540 575 L 1540 900 L -80 900 Z" fill="url(#goldenSandDune)" opacity="0.65" />

        <!-- Swaying Giant Kelp Forest & Staghorn Coral Reef (Left Side) -->
        <g transform="translate(45, 255)">
          <g style="transform-origin: 55px 380px; animation: kelpSway 4.8s ease-in-out infinite;">
            <path d="M 55 380 C 35 310, 75 240, 45 170 C 20 100, 65 40, 48 -10 C 68 35, 38 100, 65 170 C 92 240, 52 310, 72 380 Z" fill="url(#kelpBladeGrad)" />
            <!-- Kelp Leaf Blades & Gas Bladders -->
            <path d="M 48 120 C 18 105, 12 125, 44 135 Z M 62 165 C 92 150, 98 170, 66 180 Z M 46 220 C 16 205, 10 225, 44 235 Z M 64 265 C 94 250, 100 270, 66 280 Z" fill="#2dd4bf" />
          </g>
          <g style="transform-origin: 115px 390px; animation: kelpSway 5.5s ease-in-out 0.9s infinite;">
            <path d="M 115 390 C 95 330, 135 270, 108 210 C 85 150, 125 90, 108 45 C 125 90, 102 150, 125 210 C 148 270, 112 330, 130 390 Z" fill="url(#kelpBladeGrad)" opacity="0.9" />
          </g>

          <!-- Branching Pink Staghorn Coral & Orange Tube Sponges -->
          <path d="M 145 365 C 145 325, 120 295, 105 265 C 115 260, 130 285, 148 310 C 148 275, 142 245, 152 230 C 162 245, 158 275, 158 308 C 175 285, 192 265, 202 272 C 188 298, 168 325, 165 365 Z" fill="url(#staghornCoralPink)" stroke="#fda4af" stroke-width="1.5" />
          <!-- Orange Organ-Pipe Tube Corals -->
          <rect x="18" y="305" width="16" height="65" rx="6" transform="rotate(-10 18 305)" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="1.8" />
          <ellipse cx="21" cy="306" rx="8" ry="3.5" transform="rotate(-10 21 306)" fill="#451a03" />
          <rect x="38" y="290" width="18" height="80" rx="7" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="1.8" />
          <ellipse cx="47" cy="290" rx="9" ry="4" fill="#451a03" />
          <rect x="60" y="312" width="15" height="58" rx="6" transform="rotate(12 60 312)" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="1.8" />
        </g>

        <!-- Swaying Giant Kelp & Bioluminescent Brain Coral (Right Side) -->
        <g transform="translate(1225, 275)">
          <g style="transform-origin: 120px 360px; animation: kelpSway 5.1s ease-in-out 0.4s infinite;">
            <path d="M 120 360 C 100 290, 140 220, 110 150 C 85 80, 130 20, 112 -20 C 132 20, 102 80, 128 150 C 155 220, 118 290, 136 360 Z" fill="url(#kelpBladeGrad)" />
            <path d="M 112 110 C 82 95, 76 115, 108 125 Z M 126 160 C 156 145, 162 165, 130 175 Z M 110 210 C 80 195, 74 215, 108 225 Z" fill="#2dd4bf" />
          </g>
          <!-- Glowing Purple/Cyan Brain Coral -->
          <ellipse cx="45" cy="335" rx="48" ry="32" fill="#7e22ce" stroke="#d8b4fe" stroke-width="2" />
          <path d="M 12 330 Q 28 315 45 330 T 78 330 M 18 342 Q 35 328 52 342 T 76 340 M 26 318 Q 45 308 64 318" fill="none" stroke="#67e8f9" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
        </g>

        <!-- ========================================================================= -->
        <!-- 5. CONTINUOUS RISING 3D BUBBLE STREAMS ACROSS THE REEF                    -->
        <!-- ========================================================================= -->
        <g>
          <circle cx="135" cy="680" r="9" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 6.5s linear infinite;" />
          <circle cx="155" cy="720" r="6" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 5.2s linear 1.8s infinite;" />
          <circle cx="385" cy="690" r="11" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 7.1s linear 0.6s infinite;" />
          <circle cx="745" cy="660" r="8" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 5.8s linear 2.4s infinite;" />
          <circle cx="1085" cy="700" r="12" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 6.8s linear 1.1s infinite;" />
          <circle cx="1115" cy="730" r="7" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 4.9s linear 3.2s infinite;" />
          <circle cx="1310" cy="675" r="10" fill="url(#bubble3DGrad)" style="animation: bubbleRiseStream 6.2s linear 0.3s infinite;" />
        </g>

        <!-- ========================================================================= -->
        <!-- 6. HYDROTHERMAL BUBBLE VORTEX GEYSER (Triggers on Correct Answer!)        -->
        <!-- ========================================================================= -->
        <g id="reef-vortex-geyser">
          <path d="M 410 560 C 420 350, 340 150, 260 40 L 820 40 C 740 150, 660 350, 670 560 Z" fill="url(#vortexPlumeGrad)" />
          <!-- Swirling Whirlpool Rings -->
          <ellipse cx="540" cy="440" rx="115" ry="18" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="28 16" />
          <ellipse cx="540" cy="310" rx="145" ry="22" fill="none" stroke="#67e8f9" stroke-width="6" stroke-dasharray="34 18" />
          <ellipse cx="540" cy="175" rx="185" ry="26" fill="none" stroke="#fde047" stroke-width="5" stroke-dasharray="24 16" />
        </g>

        <!-- FOREGROUND ABYSSAL REEF TRENCH SILHOUETTE -->
        <path d="M -120 735 Q 280 685 680 745 T 1560 715 L 1560 920 L -120 920 Z" fill="url(#nearReefForeground)" />
        <path d="M -120 735 Q 280 685 680 745 T 1560 715" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.45" />
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR BUBBLE SWARMS, PEARLS & STARFISH -->
      <div id="underwater-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. GROUNDED REEF STAGE: COLOSSAL OPEN GIANT CLAM (MATH BOARD) + PROFESSOR OCTAVIUS -->
      <div style="position: absolute; bottom: 172px; left: 49%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 28px; width: 95%; max-width: 950px; z-index: 5; pointer-events: none;">

        <!-- THE COLOSSAL OPEN GIANT CLAM & MOTHER-OF-PEARL MATH BOARD -->
        <div id="giant-clam-board" style="position: relative; width: 455px; max-width: 58vw; height: 315px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2;">
          
          <!-- Full Custom SVG Sculpted Giant Clam Shell (Upper Hinge, Nacre Interior, Golden Pearl & Lower Lip) -->
          <svg viewBox="0 0 480 340" style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 20px 32px rgba(2, 11, 24, 0.85));">
            <!-- Ground Contact Shadow on Coral Outcrop -->
            <ellipse cx="240" cy="322" rx="210" ry="24" fill="rgba(2, 11, 24, 0.85)" />

            <!-- Coral Reef Outcrop & Sea Anemones Anchoring the Clam Base -->
            <path d="M 45 318 C 35 285, 85 275, 130 292 L 350 292 C 395 275, 445 285, 435 318 Z" fill="#0f766e" stroke="#134e4a" stroke-width="3" />

            <!-- ======================================================= -->
            <!-- UPPER SCALLOPED GIANT CLAM VALVE (Gently Breathes Open) -->
            <!-- ======================================================= -->
            <g style="transform-origin: 240px 265px; animation: clamTopBreathe 4.2s ease-in-out infinite;">
              <!-- Outer Fluted Violet/Coral Shell Ribs -->
              <path d="M 28 195 C 12 125, 58 55, 115 48 C 145 22, 190 28, 240 14 C 290 28, 335 22, 365 48 C 422 55, 468 125, 452 195 C 395 245, 295 268, 240 268 C 185 268, 85 245, 28 195 Z" fill="url(#clamShellOuter)" stroke="#f5d0fe" stroke-width="4" />

              <!-- Sculpted Radial Fluted Shell Ridges -->
              <g stroke="#a855f7" stroke-width="3" opacity="0.65" fill="none">
                <path d="M 240 260 L 115 48" />
                <path d="M 240 260 L 175 28" />
                <path d="M 240 260 L 240 16" />
                <path d="M 240 260 L 305 28" />
                <path d="M 240 260 L 365 48" />
                <path d="M 240 260 L 55 110" />
                <path d="M 240 260 L 425 110" />
              </g>

              <!-- Iridescent Mother-of-Pearl (Nacre) Inner Upper Shell Cavity -->
              <path d="M 48 192 C 38 132, 75 75, 125 68 C 155 44, 195 48, 240 34 C 285 48, 325 44, 355 68 C 405 75, 442 132, 432 192 C 382 238, 292 256, 240 256 C 188 256, 98 238, 48 192 Z" fill="url(#motherOfPearlNacre)" stroke="#ffffff" stroke-width="3" />

              <!-- Shimmering Nacre Rainbow Lustre Rings -->
              <ellipse cx="240" cy="155" rx="155" ry="82" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.7" />
              <ellipse cx="240" cy="158" rx="125" ry="68" fill="rgba(255, 255, 255, 0.55)" />

              <!-- THE GIANT LUMINOUS PEARL BED CRADLING THE MATH EQUATION -->
              <circle cx="240" cy="158" r="88" fill="url(#giantPearlOrb)" stroke="#ffffff" stroke-width="3.5" filter="drop-shadow(0 0 22px rgba(244,114,182,0.65))" />
              <!-- Specular Pearl Glint -->
              <ellipse cx="208" cy="112" rx="26" ry="12" transform="rotate(-22 208 112)" fill="#ffffff" opacity="0.75" />
            </g>

            <!-- ======================================================= -->
            <!-- LOWER SCALLOPED GIANT CLAM LIP & MANTLE (Foreground)    -->
            <!-- ======================================================= -->
            <!-- Turquoise Bioluminescent Clam Mantle Cushion -->
            <path d="M 42 225 Q 140 265 240 265 Q 340 265 438 225 Q 415 282 240 286 Q 65 282 42 225 Z" fill="#06b6d4" stroke="#67e8f9" stroke-width="3" />

            <!-- Heavy Fluted Lower Clam Shell Bowl -->
            <path d="M 24 222 C 55 268, 145 278, 240 278 C 335 278, 425 268, 456 222 C 442 292, 355 322, 240 322 C 125 322, 38 292, 24 222 Z" fill="url(#clamShellOuter)" stroke="#f5d0fe" stroke-width="4" />
            <!-- Lower Shell Scallop Ribs -->
            <path d="M 110 262 L 135 314 M 175 274 L 188 320 M 240 278 L 240 322 M 305 274 L 292 320 M 370 262 L 345 314" stroke="#d8b4fe" stroke-width="3.5" stroke-linecap="round" opacity="0.75" />

            <!-- Cute Pink Sea Star & Barnacles Resting on the Lower Clam Lip -->
            <g transform="translate(88, 285) rotate(-15)">
              <polygon points="0,-16 5,-5 16,-4 8,4 10,15 0,9 -10,15 -8,4 -16,-4 -5,-5" fill="#fb7185" stroke="#be123c" stroke-width="2" stroke-linejoin="round" />
              <circle cx="0" cy="0" r="2.5" fill="#fde047" />
            </g>
            <!-- String of Small Glowing Pearls Along Left & Right Hinge -->
            <circle cx="95" cy="232" r="8" fill="url(#giantPearlOrb)" stroke="#ffffff" stroke-width="1.5" />
            <circle cx="114" cy="242" r="6.5" fill="url(#giantPearlOrb)" stroke="#ffffff" stroke-width="1.5" />
            <circle cx="385" cy="232" r="8" fill="url(#giantPearlOrb)" stroke="#ffffff" stroke-width="1.5" />
            <circle cx="366" cy="242" r="6.5" fill="url(#giantPearlOrb)" stroke="#ffffff" stroke-width="1.5" />
          </svg>

          <!-- Top Mother-of-Pearl Title Ribbon -->
          <div style="position: absolute; top: -6px; background: linear-gradient(90deg, #0284c7, #06b6d4, #0284c7); border: 3px solid #fde047; color: #ffffff; font-weight: 900; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(2,11,24,0.6); z-index: 4;">
            🦪 Pearl of Atlantis
          </div>

          <!-- CRISP EQUATION ETCHED DIRECTLY INSIDE THE GIANT PEARL -->
          <div id="equation-container" style="position: relative; z-index: 3; margin-top: -26px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', sans-serif; font-size: 3.6rem; font-weight: 900; color: #3b0764; letter-spacing: 0.06em; line-height: 1.02; text-shadow: 0 2px 0 #ffffff, 0 0 14px rgba(255,255,255,0.9);">
              <div id="math-num1">14</div>
              <div style="display: flex; align-items: center; gap: 16px;">
                <span id="math-op" style="color: #0284c7; font-size: 3rem; text-shadow: 0 2px 0 #ffffff;">+</span>
                <span id="math-num2">19</span>
              </div>
              <div style="width: 108%; height: 6px; background: linear-gradient(90deg, #0284c7, #db2777); border-radius: 999px; margin: 5px -4% 4px 0; box-shadow: 0 2px 0 #ffffff;"></div>
              <div id="math-question-mark" style="color: #db2777; letter-spacing: 0.16em; font-size: 2.9rem; text-shadow: 0 2px 0 #ffffff;">??</div>
            </div>
          </div>

        </div>

        <!-- PROFESSOR OCTAVIUS — HIGH-DETAIL 8-TENTACLED REEF SCHOLAR TEACHER -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -4px;">
          <!-- Speech Bubble -->
          <div id="octo-speech-bubble" style="background: #ecfeff; color: #0c4a6e; border: 3px solid #06b6d4; border-radius: 16px; padding: 6px 14px; font-size: 0.84rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #0e7490, 0 8px 16px rgba(0,0,0,0.5); white-space: nowrap; transition: all 0.2s;">
            Solve the Pearl to awaken the Reef Vortex! 🐙🫧
          </div>

          <div style="position: relative; width: 230px; height: 245px; display: flex; justify-content: center; align-items: flex-end;">
            <!-- Ground Contact Shadow on Coral Reef -->
            <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 195px; height: 28px; background: radial-gradient(ellipse at center, rgba(2, 11, 24, 0.85) 0%, rgba(6, 182, 212, 0.28) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>

            <div id="octo-mascot" class="octo-idle" style="position: relative; width: 225px; height: 240px; z-index: 2; filter: drop-shadow(0 12px 18px rgba(2, 11, 24, 0.65));">
              <svg viewBox="0 0 260 260" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <radialGradient id="octoBodyGrad" cx="38%" cy="30%" r="68%">
                    <stop offset="0%" stop-color="#fb7185" />
                    <stop offset="45%" stop-color="#e11d48" />
                    <stop offset="85%" stop-color="#9f1239" />
                    <stop offset="100%" stop-color="#4c0519" />
                  </radialGradient>

                  <linearGradient id="tentacleUnderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#fda4af" />
                    <stop offset="100%" stop-color="#be123c" />
                  </linearGradient>
                </defs>

                <!-- ======================================================= -->
                <!-- 8 CURLED OCTOPUS TENTACLES WITH SUCTION CUPS            -->
                <!-- ======================================================= -->
                <!-- Back Layer Tentacles -->
                <path d="M 95 168 C 52 178, 14 212, 28 238 C 40 252, 65 236, 54 222 C 46 212, 68 192, 102 184 Z" fill="#9f1239" stroke="#4c0519" stroke-width="2.5" />
                <path d="M 165 168 C 208 178, 246 212, 232 238 C 220 252, 195 236, 206 222 C 214 212, 192 192, 158 184 Z" fill="#9f1239" stroke="#4c0519" stroke-width="2.5" />

                <!-- Left Waving Tentacle Holding Golden Compass/Shell -->
                <g style="transform-origin: 95px 158px; animation: tentacleWaveLeft 2.6s ease-in-out infinite;">
                  <path d="M 98 152 C 48 142, 8 112, 18 84 C 26 68, 48 76, 40 92 C 32 108, 62 128, 102 138 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                  <!-- Suction Cups Along Left Tentacle -->
                  <circle cx="38" cy="102" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <circle cx="52" cy="116" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <circle cx="68" cy="126" r="5.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                </g>

                <!-- Right Waving Tentacle Wielding Glowing Golden Trident Pointer -->
                <g style="transform-origin: 165px 158px; animation: tentacleWaveRight 2.8s ease-in-out infinite;">
                  <path d="M 162 152 C 208 142, 244 114, 236 86 C 228 68, 208 78, 214 94 C 222 108, 196 128, 158 138 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                  <circle cx="218" cy="104" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <circle cx="204" cy="118" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <!-- Golden Atlantean Trident in Tentacle Tip -->
                  <line x1="215" y1="138" x2="238" y2="42" stroke="#fde047" stroke-width="4.5" stroke-linecap="round" />
                  <path d="M 224 46 L 230 22 L 238 42 L 246 20 L 252 48 Q 238 56 224 46 Z" fill="#fde047" stroke="#b45309" stroke-width="1.8" filter="drop-shadow(0 0 8px #fde047)" />
                </g>

                <!-- Front Planted Coiled Tentacle Legs & Suction Cups -->
                <path d="M 105 168 C 72 192, 54 232, 76 248 C 94 256, 112 238, 98 226 C 88 218, 98 196, 118 178 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                <circle cx="82" cy="242" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                <circle cx="94" cy="236" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />

                <path d="M 126 172 C 118 205, 114 242, 130 250 C 146 254, 150 232, 138 224 C 132 216, 134 195, 138 174 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />

                <path d="M 155 168 C 188 192, 206 232, 184 248 C 166 256, 148 238, 162 226 C 172 218, 162 196, 142 178 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                <circle cx="178" cy="242" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                <circle cx="166" cy="236" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />

                <!-- ======================================================= -->
                <!-- SCULPTED OCTOPUS MANTLE DOME, MONOCLE & CAPTAIN'S HAT   -->
                <!-- ======================================================= -->
                <!-- Bulbous Octopus Head Mantle -->
                <path d="M 74 114 C 64 52, 98 24, 130 24 C 162 24, 196 52, 186 114 C 182 152, 162 174, 130 174 C 98 174, 78 152, 74 114 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="3.2" />
                <!-- Glossy Mantle Texture Spots & Highlight -->
                <path d="M 92 52 Q 125 36 158 52" fill="none" stroke="#fda4af" stroke-width="6" stroke-linecap="round" opacity="0.45" />
                <circle cx="88" cy="78" r="6" fill="#fda4af" opacity="0.35" />
                <circle cx="172" cy="82" r="7" fill="#fda4af" opacity="0.35" />
                <circle cx="164" cy="62" r="4.5" fill="#fda4af" opacity="0.35" />

                <!-- Left Eye -->
                <ellipse cx="108" cy="112" rx="11" ry="13" fill="#ffffff" stroke="#4c0519" stroke-width="2.5" />
                <circle cx="109" cy="113" r="6.5" fill="#0f172a" />
                <circle cx="106" cy="109" r="2.8" fill="#ffffff" />

                <!-- Right Eye with Brass Diving Monocle & Gold Chain -->
                <ellipse cx="152" cy="112" rx="13" ry="14" fill="#e0f2fe" stroke="#fde047" stroke-width="4" />
                <circle cx="151" cy="113" r="6.5" fill="#0f172a" />
                <circle cx="148" cy="109" r="2.8" fill="#ffffff" />
                <!-- Monocle Chain -->
                <path d="M 165 114 Q 175 135 162 152" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="3 2" />

                <!-- Friendly Mustache / Tentacle Smile & Scholarly Bowtie -->
                <path d="M 116 134 Q 130 144 144 134" fill="none" stroke="#4c0519" stroke-width="3.2" stroke-linecap="round" />
                <polygon points="130,158 110,148 110,168" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
                <polygon points="130,158 150,148 150,168" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
                <circle cx="130" cy="158" r="5.5" fill="#fde047" stroke="#b45309" stroke-width="1.8" />

                <!-- Nautical White Captain's Hat with Gold Anchor Crest -->
                <g transform="translate(0, -6)">
                  <path d="M 86 38 C 86 10, 174 10, 174 38 Z" fill="#ffffff" stroke="#1e293b" stroke-width="2.8" />
                  <rect x="88" y="30" width="84" height="10" rx="3" fill="#0f172a" stroke="#fde047" stroke-width="1.8" />
                  <path d="M 80 38 Q 130 48 180 38 L 174 45 Q 130 54 86 45 Z" fill="#0284c7" stroke="#fde047" stroke-width="2" />
                  <circle cx="130" cy="24" r="8" fill="#0f172a" stroke="#fde047" stroke-width="1.8" />
                  <text x="130" y="28" font-size="10" text-anchor="middle">⚓</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. BRASS NAUTICAL SUBMARINE TELEGRAPH & PORTHOLE CONTROL DECK -->
      <div style="position: absolute; bottom: 84px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 26px rgba(2, 11, 24, 0.85));">
        <div style="background: linear-gradient(180deg, #0c4a6e 0%, #082f49 55%, #041e3a 100%); border: 4px solid #fbbf24; border-radius: 18px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; position: relative; box-shadow: inset 0 2px 0 rgba(254, 240, 138, 0.4), 0 0 20px rgba(56, 189, 248, 0.35);">
          
          <!-- Brass Porthole Rivets on Corners -->
          <div style="position: absolute; top: 6px; left: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>
          <div style="position: absolute; bottom: 6px; left: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>
          <div style="position: absolute; top: 6px; right: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>
          <div style="position: absolute; bottom: 6px; right: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>

          <div style="display: flex; flex-direction: column; min-width: 155px; padding-left: 4px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #67e8f9; letter-spacing: 0.14em; text-transform: uppercase;">🫧 SONAR TELEGRAPH</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #f0f9ff; letter-spacing: 0.06em;">REEF CURRENT: CALM</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.95rem; font-weight: 900; color: #082f49; background: #ecfeff; border: 3px solid #38bdf8; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.2), 0 0 12px rgba(56,189,248,0.45);" />

          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #fde047; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 0 4px 14px rgba(2,132,199,0.5); transition: transform 0.1s;">
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

function triggerReefBubbleVortex() {
  const vortex = document.getElementById("reef-vortex-geyser");
  const clam = document.getElementById("giant-clam-board");
  const particleHost = document.getElementById("underwater-eruption-particles");

  if (vortex) {
    vortex.classList.remove("erupting");
    void vortex.offsetWidth;
    vortex.classList.add("erupting");
  }
  if (clam) {
    clam.classList.remove("clam-pop-anim");
    void clam.offsetWidth;
    clam.classList.add("clam-pop-anim");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#bae6fd", "#67e8f9", "#f472b6", "#fde047", "#ffffff"];

  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    const color = colors[i % colors.length];
    const tx = (Math.random() - 0.5) * 560 + "px";
    const ty = -(150 + Math.random() * 380) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";
    const size = 10 + Math.random() * 16;

    p.style.cssText = `
      position: absolute;
      left: 42%;
      top: 56%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #ffffff, ${color});
      border: 1.5px solid #ffffff;
      box-shadow: 0 0 12px ${color};
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: oceanParticleBurst ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const octo = document.getElementById("octo-mascot");
  const speech = document.getElementById("octo-speech-bubble");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerReefBubbleVortex();

      if (octo) {
        octo.classList.remove("octo-party", "octo-oops");
        void octo.offsetWidth;
        octo.classList.add("octo-party");
      }
      if (speech) {
        speech.textContent = "SPLENDID! THE PEARL VORTEX AWAKENS!! 🦪🫧✨";
        speech.style.borderColor = "#fde047";
      }

      setStatus("🫧 PEARL VORTEX ERUPTION!!");
      input.style.borderColor = "#34d399";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("REEF CURRENT: CALM");
        if (speech) {
          speech.textContent = "Brilliant diving! Solve the next Pearl! 🐙";
          speech.style.borderColor = "#06b6d4";
        }
        loadNewEquation();
      }, 1550);
    } else {
      if (octo) {
        octo.classList.remove("octo-party", "octo-oops");
        void octo.offsetWidth;
        octo.classList.add("octo-oops");
      }
      if (speech) {
        speech.textContent = "Ink spill! Recalculate that Pearl! 🦑";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("⚠️ SONAR ECHO! TRY AGAIN");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("REEF CURRENT: CALM");
        if (speech) {
          speech.textContent = "Steady your compass, diver! 🦪";
          speech.style.borderColor = "#06b6d4";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}

// Export alias in case main.js imports loadOceanDeep instead of loadUnderwater
export const loadOceanDeep = loadUnderwater;
