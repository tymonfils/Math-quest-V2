// src/world/zones/candyacademy.js - Full-Screen Outdoor Candy Kingdom Biome (Grounded & Baked-In Cracker Edition)
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadCandyAcademy() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("candyacademy-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "candyacademy-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes spinPinwheel {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes driftCandyCloud1 {
      0% { transform: translateX(-180px); }
      100% { transform: translateX(115vw); }
    }
    @keyframes driftCandyCloud2 {
      0% { transform: translateX(110vw); }
      100% { transform: translateX(-220px); }
    }
    @keyframes riverFlowDash {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -120; }
    }
    @keyframes fudgeBubbleIdle {
      0% { transform: translateY(0) scale(0.7); opacity: 0; }
      40% { opacity: 0.9; }
      100% { transform: translateY(-18px) scale(1.25); opacity: 0; }
    }
    @keyframes gummyBreathe {
      0%, 100% { transform: translateY(0px) scaleX(1) scaleY(1); }
      50% { transform: translateY(2px) scaleX(1.03) scaleY(0.97); }
    }
    @keyframes gummyWaveArm {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-18deg); }
    }
    @keyframes gummyCelebrateJump {
      0% { transform: translateY(0) scale(1, 1); }
      20% { transform: translateY(8px) scale(1.14, 0.86); }
      45% { transform: translateY(-42px) scale(0.92, 1.12) rotate(-5deg); }
      65% { transform: translateY(-28px) scale(1.05, 0.95) rotate(5deg); }
      82% { transform: translateY(6px) scale(1.1, 0.9); }
      100% { transform: translateY(0) scale(1, 1); }
    }
    @keyframes gummyShakeNo {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px) rotate(-3deg); }
      40% { transform: translateX(8px) rotate(3deg); }
      60% { transform: translateX(-6px) rotate(-2deg); }
      80% { transform: translateX(6px) rotate(2deg); }
    }
    @keyframes crackerPop {
      0%, 100% { transform: scale(1); }
      40% { transform: scale(1.04) rotate(1deg); }
      75% { transform: scale(0.98) rotate(-0.5deg); }
    }
    @keyframes chocoGeyserColumn {
      0% { transform: scaleY(0) scaleX(0.5); opacity: 0; }
      14% { transform: scaleY(1.08) scaleX(1.12); opacity: 1; }
      35% { transform: scaleY(0.96) scaleX(0.95); opacity: 1; }
      58% { transform: scaleY(1.14) scaleX(1.08); opacity: 1; }
      82% { transform: scaleY(0.6) scaleX(1.25); opacity: 0.85; }
      100% { transform: scaleY(0) scaleX(1.4); opacity: 0; }
    }
    @keyframes chocoSplashWave {
      0% { transform: scale(0.3); opacity: 0; }
      20% { transform: scale(1.1); opacity: 1; }
      70% { transform: scale(1.35); opacity: 0.8; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes chocoParticleArc {
      0% { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 1; }
      45% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.15) rotate(var(--rot)); opacity: 0; }
    }
    .pinwheel-head-spin {
      transform-origin: 0px 0px;
      animation: spinPinwheel 9s linear infinite;
    }
    .pinwheel-head-spin-fast {
      transform-origin: 0px 0px;
      animation: spinPinwheel 6.5s linear infinite;
    }
    .gummy-mascot-idle {
      transform-origin: center bottom;
      animation: gummyBreathe 3.2s ease-in-out infinite;
    }
    .gummy-mascot-party {
      transform-origin: center bottom;
      animation: gummyCelebrateJump 0.85s ease-in-out 2 !important;
    }
    .gummy-mascot-oops {
      transform-origin: center bottom;
      animation: gummyShakeNo 0.55s ease-in-out 1 !important;
    }
    .cracker-board-pop {
      transform-origin: center bottom;
      animation: crackerPop 0.55s ease-out 1;
    }
    #choco-geyser-group {
      transform-origin: 830px 560px;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    #choco-geyser-group.erupting {
      animation: chocoGeyserColumn 1.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    #choco-splash-ring {
      transform-origin: 830px 560px;
      opacity: 0;
      pointer-events: none;
    }
    #choco-splash-ring.erupting {
      animation: chocoSplashWave 1.5s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="candy-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #ffafcc 0%, #ffc8dd 26%, #ffdfef 50%, #f472b6 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN SCENIC SVG LANDSCAPE (SKY, PINWHEELS, FROSTING HILLS & CHOCOLATE RIVER) -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <radialGradient id="sugarSunGlow" cx="72%" cy="20%" r="45%">
            <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.95" />
            <stop offset="35%" stop-color="#fde68a" stop-opacity="0.55" />
            <stop offset="70%" stop-color="#f472b6" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#f472b6" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="farHillFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f9a8d4" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>

          <linearGradient id="midHillFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f472b6" />
            <stop offset="45%" stop-color="#ec4899" />
            <stop offset="100%" stop-color="#be185d" />
          </linearGradient>

          <linearGradient id="nearHillFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#db2777" />
            <stop offset="100%" stop-color="#831843" />
          </linearGradient>

          <linearGradient id="whippedCreamRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="75%" stop-color="#fce7f3" />
            <stop offset="100%" stop-color="#f9a8d4" />
          </linearGradient>

          <linearGradient id="chocolateRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5c2814" />
            <stop offset="35%" stop-color="#3e190b" />
            <stop offset="70%" stop-color="#4d2110" />
            <stop offset="100%" stop-color="#270e05" />
          </linearGradient>

          <linearGradient id="chocoGeyserGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#270e05" />
            <stop offset="40%" stop-color="#4d2110" />
            <stop offset="78%" stop-color="#78350f" />
            <stop offset="100%" stop-color="#a16207" />
          </linearGradient>

          <linearGradient id="pinwheelStick" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="50%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
        </defs>

        <!-- Warm Golden-Sugar Sunburst -->
        <rect width="1440" height="900" fill="url(#sugarSunGlow)" />

        <!-- Distant Pastel Sugar Mountains -->
        <path d="M-60 470 Q 180 310 430 420 T 940 380 T 1500 420 L 1500 900 L -60 900 Z" fill="#fbcfe8" opacity="0.65" />

        <!-- PEPPERMINT PINWHEEL #1 (Far Left Hilltop) -->
        <g transform="translate(185, 360)">
          <rect x="-5" y="0" width="10" height="190" rx="4" fill="url(#pinwheelStick)" stroke="#cbd5e1" stroke-width="1.5" />
          <g class="pinwheel-head-spin">
            <circle cx="0" cy="0" r="64" fill="#ffffff" stroke="#f43f5e" stroke-width="6" filter="drop-shadow(0 6px 12px rgba(157,23,77,0.25))" />
            <path d="M0 0 C25 -52 58 -32 62 0 Z" fill="#f43f5e" />
            <path d="M0 0 C52 25 32 58 0 62 Z" fill="#ec4899" />
            <path d="M0 0 C-25 52 -58 32 -62 0 Z" fill="#f43f5e" />
            <path d="M0 0 C-52 -25 -32 -58 0 -62 Z" fill="#ec4899" />
            <circle cx="0" cy="0" r="13" fill="#fde047" stroke="#ffffff" stroke-width="4" />
          </g>
        </g>

        <!-- PEPPERMINT PINWHEEL #2 (Right Horizon Giant) -->
        <g transform="translate(1225, 330)">
          <rect x="-6" y="0" width="12" height="240" rx="5" fill="url(#pinwheelStick)" stroke="#cbd5e1" stroke-width="1.5" />
          <g class="pinwheel-head-spin-fast">
            <circle cx="0" cy="0" r="80" fill="#ffffff" stroke="#ec4899" stroke-width="7" filter="drop-shadow(0 8px 16px rgba(157,23,77,0.3))" />
            <path d="M0 0 C30 -66 74 -40 78 0 Z" fill="#ec4899" />
            <path d="M0 0 C66 30 40 74 0 78 Z" fill="#34d399" />
            <path d="M0 0 C-30 66 -74 40 -78 0 Z" fill="#ec4899" />
            <path d="M0 0 C-66 -30 -40 -74 0 -78 Z" fill="#34d399" />
            <circle cx="0" cy="0" r="16" fill="#fde047" stroke="#ffffff" stroke-width="4" />
          </g>
        </g>

        <!-- PEPPERMINT PINWHEEL #3 (Mid-Right Valley) -->
        <g transform="translate(985, 395)">
          <rect x="-4" y="0" width="8" height="150" rx="3" fill="url(#pinwheelStick)" />
          <g class="pinwheel-head-spin">
            <circle cx="0" cy="0" r="46" fill="#ffffff" stroke="#a855f7" stroke-width="5" />
            <path d="M0 0 C16 -38 42 -22 44 0 Z" fill="#c084fc" />
            <path d="M0 0 C38 16 22 42 0 44 Z" fill="#f472b6" />
            <path d="M0 0 C-16 38 -42 22 -44 0 Z" fill="#c084fc" />
            <path d="M0 0 C-38 -16 -22 -42 0 -44 Z" fill="#f472b6" />
            <circle cx="0" cy="0" r="9" fill="#fef08a" stroke="#ffffff" stroke-width="3" />
          </g>
        </g>

        <!-- FAR ROLLING PINK FROSTING HILLS + PIPED WHITE ICING TRIM -->
        <path d="M-80 485 Q 240 375 570 465 T 1180 435 T 1540 485 L 1540 900 L -80 900 Z" fill="url(#farHillFrosting)" />
        <path d="M-80 485 Q 240 375 570 465 T 1180 435 T 1540 485" fill="none" stroke="url(#whippedCreamRim)" stroke-width="14" stroke-linecap="round" opacity="0.92" />

        <!-- MIDGROUND MAIN STAGE FROSTING PLATEAU (Where the Cracker & Bear Stand) -->
        <path d="M-100 535 Q 320 460 720 530 T 1540 520 L 1540 900 L -100 900 Z" fill="url(#midHillFrosting)" />
        <path d="M-100 535 Q 320 460 720 530 T 1540 520" fill="none" stroke="url(#whippedCreamRim)" stroke-width="16" stroke-linecap="round" />

        <!-- WINDING GLOSSY HOT-FUDGE CHOCOLATE RIVER -->
        <path d="M 815 465 C 725 510, 945 555, 820 620 C 695 685, 995 755, 845 910 L 1185 910 C 1275 750, 980 680, 1065 615 C 1145 555, 935 505, 885 465 Z" fill="#fce7f3" opacity="0.92" />
        <path d="M 825 468 C 742 512, 955 555, 832 620 C 712 685, 1005 755, 865 910 L 1155 910 C 1245 750, 965 680, 1045 615 C 1125 555, 920 505, 875 468 Z" fill="url(#chocolateRiverGrad)" />

        <!-- Animated Glossy Caramel/Fudge Flow Lines -->
        <path d="M 852 480 C 785 520, 970 565, 875 625 C 775 690, 1030 760, 945 900" fill="none" stroke="#92400e" stroke-width="10" stroke-linecap="round" stroke-dasharray="28 32" style="animation: riverFlowDash 4.5s linear infinite;" opacity="0.75" />
        <path d="M 865 490 C 820 525, 1005 570, 925 630 C 840 695, 1085 760, 1025 900" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" stroke-dasharray="16 44" style="animation: riverFlowDash 3.2s linear infinite;" opacity="0.45" />

        <!-- Idle Bubbling Hot Fudge Blobs in the River -->
        <circle cx="855" cy="555" r="7" fill="#78350f" stroke="#b45309" stroke-width="2" style="animation: fudgeBubbleIdle 2.4s ease-in-out infinite;" />
        <circle cx="925" cy="605" r="9" fill="#78350f" stroke="#d97706" stroke-width="2" style="animation: fudgeBubbleIdle 3.1s ease-in-out 0.8s infinite;" />
        <circle cx="885" cy="665" r="8" fill="#5c2814" stroke="#b45309" stroke-width="2" style="animation: fudgeBubbleIdle 2.7s ease-in-out 1.4s infinite;" />

        <!-- VOLCANIC CHOCOLATE RIVER ERUPTION GEYSER (Triggered on Correct Math Answer!) -->
        <g id="choco-splash-ring">
          <ellipse cx="855" cy="560" rx="145" ry="34" fill="#fde047" opacity="0.4" />
          <ellipse cx="855" cy="560" rx="115" ry="26" fill="#5c2814" stroke="#fbbf24" stroke-width="4" />
        </g>

        <g id="choco-geyser-group">
          <path d="M 775 565 Q 795 300 700 95 Q 785 45 855 25 Q 925 45 1010 95 Q 915 300 935 565 Z" fill="url(#chocoGeyserGrad)" filter="drop-shadow(0 0 25px rgba(92,40,20,0.65))" />
          <path d="M 815 560 Q 828 320 780 120 Q 855 65 930 120 Q 882 320 895 560 Z" fill="#92400e" opacity="0.8" />
          <path d="M 840 550 Q 848 330 825 140 Q 855 95 885 140 Q 862 330 870 550 Z" fill="#fbbf24" opacity="0.35" />
          <circle cx="715" cy="90" r="34" fill="#4d2110" />
          <circle cx="790" cy="50" r="44" fill="#5c2814" />
          <circle cx="860" cy="35" r="52" fill="#3e190b" />
          <circle cx="935" cy="55" r="42" fill="#5c2814" />
          <circle cx="998" cy="95" r="32" fill="#4d2110" />
          <circle cx="825" cy="48" r="14" fill="#ffffff" opacity="0.9" />
          <circle cx="895" cy="42" r="18" fill="#fce7f3" opacity="0.9" />
          <rect x="760" y="72" width="22" height="8" rx="4" fill="#f472b6" transform="rotate(-25 760 72)" />
          <rect x="850" y="18" width="24" height="8" rx="4" fill="#34d399" transform="rotate(15 850 18)" />
          <rect x="920" y="68" width="22" height="8" rx="4" fill="#fde047" transform="rotate(32 920 68)" />
        </g>

        <!-- Sprinkles Embedded in the Frosting Lawn -->
        <g opacity="0.85">
          <rect x="140" y="605" width="20" height="7" rx="3.5" fill="#fde047" transform="rotate(-15 140 605)" />
          <rect x="260" y="650" width="22" height="7" rx="3.5" fill="#34d399" transform="rotate(12 260 650)" />
          <rect x="1190" y="615" width="20" height="7" rx="3.5" fill="#fde047" transform="rotate(20 1190 615)" />
          <rect x="1290" y="655" width="18" height="7" rx="3.5" fill="#60a5fa" transform="rotate(-12 1290 655)" />
        </g>

        <!-- FOREGROUND FROSTING BANK (Frames bottom behind the Avatar Running Stage) -->
        <path d="M-120 735 Q 280 680 680 745 T 1560 715 L 1560 920 L -120 920 Z" fill="url(#nearHillFrosting)" opacity="0.96" />
        <path d="M-120 735 Q 280 680 680 745 T 1560 715" fill="none" stroke="url(#whippedCreamRim)" stroke-width="16" stroke-linecap="round" />
      </svg>

      <!-- 2. DRIFTING PUFFY COTTON-CANDY CLOUDS -->
      <div style="position: absolute; top: 8%; left: 0; width: 210px; height: 80px; pointer-events: none; opacity: 0.9; animation: driftCandyCloud1 42s linear infinite;">
        <svg viewBox="0 0 220 90" style="width: 100%; height: 100%; filter: drop-shadow(0 8px 14px rgba(244,114,182,0.28));">
          <path d="M 35 72 Q 15 72 15 54 Q 15 36 38 34 Q 48 12 78 14 Q 104 4 128 20 Q 155 12 174 32 Q 202 34 202 54 Q 202 72 178 72 Z" fill="#fff1f2" stroke="#fbcfe8" stroke-width="3" />
        </svg>
      </div>

      <div style="position: absolute; top: 15%; left: 0; width: 175px; height: 68px; pointer-events: none; opacity: 0.82; animation: driftCandyCloud2 54s linear infinite;">
        <svg viewBox="0 0 220 90" style="width: 100%; height: 100%; filter: drop-shadow(0 8px 14px rgba(244,114,182,0.25));">
          <path d="M 35 72 Q 15 72 15 54 Q 15 36 38 34 Q 48 12 78 14 Q 104 4 128 20 Q 155 12 174 32 Q 202 34 202 54 Q 202 72 178 72 Z" fill="#fdf4ff" stroke="#f5d0fe" stroke-width="3" />
        </svg>
      </div>

      <!-- DYNAMIC PARTICLE LAYER FOR FLYING CHOCOLATE DROPS & SPRINKLES -->
      <div id="choco-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 3. PLANTED OUTDOOR STAGE: GRAHAM CRACKER SIGNBOARD + GROUNDED GUMMY BEAR -->
      <div style="position: absolute; bottom: 185px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 34px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- GRAHAM CRACKER SIGNBOARD + PLANTED PRETZEL POSTS + FROSTING GROUND MOUNDS -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <!-- THE GIANT TOASTED GRAHAM CRACKER -->
          <div id="graham-cracker-board" style="position: relative; width: 395px; max-width: 56vw; min-height: 255px; background: radial-gradient(circle at 50% 42%, #f4c78e 0%, #e09f50 58%, #c17728 92%, #9e5814 100%); border: 6px solid #7c3f09; border-radius: 18px; box-shadow: 0 12px 24px rgba(82, 18, 50, 0.45), inset 0 3px 0 rgba(255, 245, 220, 0.7), inset 0 -6px 0 rgba(105, 50, 8, 0.8); padding: 26px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
            
            <!-- Outer Scalloped/Scored Biscuit Frame -->
            <div style="position: absolute; inset: 9px; border: 2.5px dashed rgba(113, 52, 9, 0.55); border-radius: 11px; pointer-events: none;"></div>

            <!-- Authentic Graham Cracker Vertical Center Score Crease (Top & Bottom Notches so numbers stay clear) -->
            <div style="position: absolute; top: 10px; bottom: 10px; left: 50%; width: 2px; background: linear-gradient(180deg, rgba(113,52,9,0.5) 0%, rgba(113,52,9,0.12) 22%, rgba(113,52,9,0.12) 78%, rgba(113,52,9,0.5) 100%); transform: translateX(-50%); pointer-events: none;"></div>

            <!-- Baked Docked Perforation Holes Framing the Left & Right Edges of the Cracker -->
            <div style="position: absolute; left: 24px; top: 28px; bottom: 28px; width: 28px; background-image: radial-gradient(circle, #7c3f09 3.5px, rgba(255,237,204,0.6) 4.5px, transparent 5.5px); background-size: 24px 36px; opacity: 0.75; pointer-events: none;"></div>
            <div style="position: absolute; right: 18px; top: 28px; bottom: 28px; width: 28px; background-image: radial-gradient(circle, #7c3f09 3.5px, rgba(255,237,204,0.6) 4.5px, transparent 5.5px); background-size: 24px 36px; opacity: 0.75; pointer-events: none;"></div>

            <!-- Subtle Cinnamon Sugar Crystals Dusted Across the Cracker -->
            <div style="position: absolute; inset: 14px; background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.45) 1.5px, transparent 2px), radial-gradient(circle at 75% 65%, rgba(124,63,9,0.35) 2px, transparent 2.5px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.4) 1.5px, transparent 2px); background-size: 44px 44px; pointer-events: none;"></div>

            <!-- Top Piped Icing Title Strip Directly on the Cracker -->
            <div style="position: absolute; top: -15px; background: #fff1f2; border: 3px solid #ec4899; color: #9d174d; font-weight: 900; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 16px; border-radius: 999px; box-shadow: 0 4px 0 #be185d;">
              🍭 Candy Academy
            </div>

            <!-- BAKED-IN / PIPED SUGAR EQUATION (Blends directly into the Graham Cracker surface!) -->
            <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
              <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', 'Comic Sans MS', sans-serif; font-size: 3.9rem; font-weight: 900; color: #5c2814; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 2px 0 #fef3c7, 0 4px 0 #fde68a, 0 -2px 2px rgba(69,26,3,0.35);">
                <div id="math-num1">12</div>
                <div style="display: flex; align-items: center; gap: 18px;">
                  <span id="math-op" style="color: #be185d; font-size: 3.2rem; text-shadow: 0 2px 0 #fce7f3, 0 4px 0 #fbcfe8;">+</span>
                  <span id="math-num2">15</span>
                </div>
                <!-- Piped White/Cinnamon Icing Divider Line -->
                <div style="width: 108%; height: 7px; background: #5c2814; border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 2.5px 0 #fef3c7;"></div>
                <div id="math-question-mark" style="color: #9d174d; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 2px 0 #fce7f3, 0 4px 0 #fbcfe8;">??</div>
              </div>
            </div>
          </div>

          <!-- GROUNDED SALTED PRETZEL LEGS + FROSTING ANCHOR MOUNDS & SHADOW -->
          <div style="position: relative; width: 340px; height: 46px; margin-top: -8px; z-index: 1;">
            <!-- Wide Ground Contact Shadow on the Frosting Hill -->
            <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 350px; height: 26px; background: radial-gradient(ellipse at center, rgba(112, 16, 60, 0.62) 0%, rgba(112, 16, 60, 0.25) 55%, transparent 78%); border-radius: 50%;"></div>

            <!-- Left Salted Pretzel Log Post -->
            <div style="position: absolute; left: 46px; top: 0; width: 26px; height: 42px; background: linear-gradient(90deg, #5c2814, #92400e 45%, #451a03); border: 3px solid #3e190b; border-radius: 6px;">
              <div style="position: absolute; top: 10px; left: 5px; width: 4px; height: 4px; background: #ffffff; border-radius: 1px;"></div>
              <div style="position: absolute; top: 22px; right: 5px; width: 4px; height: 4px; background: #ffffff; border-radius: 1px;"></div>
            </div>

            <!-- Right Salted Pretzel Log Post -->
            <div style="position: absolute; right: 46px; top: 0; width: 26px; height: 42px; background: linear-gradient(90deg, #5c2814, #92400e 45%, #451a03); border: 3px solid #3e190b; border-radius: 6px;">
              <div style="position: absolute; top: 12px; right: 5px; width: 4px; height: 4px; background: #ffffff; border-radius: 1px;"></div>
              <div style="position: absolute; top: 24px; left: 6px; width: 4px; height: 4px; background: #ffffff; border-radius: 1px;"></div>
            </div>

            <!-- Piped Whipped-Cream Frosting Mounds & Gumdrops Wrapping the Base of the Posts -->
            <svg viewBox="0 0 340 50" style="position: absolute; bottom: -8px; left: 0; width: 100%; height: 50px; overflow: visible;">
              <!-- Left Post Frosting Tuft + Gumdrop -->
              <path d="M 22 42 Q 32 22 48 30 Q 60 16 74 30 Q 88 22 96 42 Z" fill="#fce7f3" stroke="#f472b6" stroke-width="2.5" />
              <path d="M 34 42 Q 45 28 58 35 Q 72 28 82 42 Z" fill="#ffffff" />
              <ellipse cx="35" cy="40" rx="10" ry="7" fill="#34d399" stroke="#059669" stroke-width="2" />
              <ellipse cx="86" cy="41" rx="9" ry="6" fill="#fde047" stroke="#d97706" stroke-width="2" />

              <!-- Right Post Frosting Tuft + Gumdrop -->
              <path d="M 244 42 Q 254 22 268 30 Q 280 16 294 30 Q 308 22 318 42 Z" fill="#fce7f3" stroke="#f472b6" stroke-width="2.5" />
              <path d="M 256 42 Q 268 28 280 35 Q 294 28 304 42 Z" fill="#ffffff" />
              <ellipse cx="255" cy="41" rx="9" ry="6" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
              <ellipse cx="306" cy="40" rx="10" ry="7" fill="#f43f5e" stroke="#be123c" stroke-width="2" />
            </svg>
          </div>

        </div>

        <!-- GROUNDED TRANSLUCENT GUMMY BEAR TEACHER ("BARNABY GUMDROP") -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -4px;">
          <!-- Speech Bubble -->
          <div id="gummy-speech-bubble" style="background: #fff1f2; color: #831843; border: 3px solid #ec4899; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #be185d, 0 8px 15px rgba(131,24,67,0.28); white-space: nowrap; transition: all 0.2s;">
            Solve it to erupt the fudge river! 🍫
          </div>

          <div style="position: relative; width: 190px; height: 235px; display: flex; justify-content: center; align-items: flex-end;">
            
            <!-- Ground Contact Shadow + Frosting Cushion Under Gummy Bear's Paws -->
            <div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 165px; height: 28px; background: radial-gradient(ellipse at center, rgba(112, 16, 60, 0.65) 0%, rgba(112, 16, 60, 0.28) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>
            
            <div id="gummy-bear-mascot" class="gummy-mascot-idle" style="position: relative; width: 185px; height: 225px; z-index: 2; filter: drop-shadow(0 8px 12px rgba(131, 24, 67, 0.38));">
              <svg viewBox="0 0 220 260" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <radialGradient id="gummyJellyBody" cx="38%" cy="32%" r="68%">
                    <stop offset="0%" stop-color="#fda4af" stop-opacity="0.96" />
                    <stop offset="38%" stop-color="#f43f5e" stop-opacity="0.92" />
                    <stop offset="78%" stop-color="#be123c" stop-opacity="0.94" />
                    <stop offset="100%" stop-color="#881337" stop-opacity="0.96" />
                  </radialGradient>

                  <radialGradient id="gummyBellyGlow" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.65" />
                    <stop offset="55%" stop-color="#fb7185" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
                  </radialGradient>
                </defs>

                <!-- Rounded Jelly Ears -->
                <circle cx="58" cy="42" r="24" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
                <circle cx="52" cy="36" r="9" fill="#ffffff" opacity="0.45" />
                <circle cx="162" cy="42" r="24" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
                <circle cx="156" cy="36" r="9" fill="#ffffff" opacity="0.45" />

                <!-- Squishy Gummy Torso / Belly -->
                <rect x="46" y="108" width="128" height="122" rx="58" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3.5" />
                <ellipse cx="110" cy="168" rx="46" ry="48" fill="url(#gummyBellyGlow)" />
                <path d="M 66 135 Q 58 165 68 195" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.42" />

                <!-- Chubby Gummy Legs / Paws Planted on the Ground -->
                <ellipse cx="74" cy="232" rx="30" ry="20" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
                <circle cx="66" cy="228" r="6" fill="#ffe4e6" opacity="0.55" />
                <ellipse cx="146" cy="232" rx="30" ry="20" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
                <circle cx="138" cy="228" r="6" fill="#ffe4e6" opacity="0.55" />

                <!-- Left Waving Jelly Arm -->
                <g style="transform-origin: 54px 136px; animation: gummyWaveArm 2.2s ease-in-out infinite;">
                  <ellipse cx="32" cy="136" rx="26" ry="18" transform="rotate(-24 32 136)" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
                  <ellipse cx="26" cy="130" rx="10" ry="5" transform="rotate(-24 26 130)" fill="#ffffff" opacity="0.45" />
                </g>

                <!-- Right Jelly Arm -->
                <ellipse cx="186" cy="142" rx="26" ry="18" transform="rotate(22 186 142)" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
                <ellipse cx="182" cy="135" rx="10" ry="5" transform="rotate(22 182 135)" fill="#ffffff" opacity="0.45" />

                <!-- Squishy Gummy Bear Head -->
                <rect x="48" y="34" width="124" height="94" rx="46" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3.5" />
                <path d="M 72 48 Q 110 38 145 48" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.5" />
                <circle cx="64" cy="56" r="5" fill="#ffffff" opacity="0.55" />

                <!-- Cute Candy Eyes -->
                <circle cx="84" cy="78" r="10.5" fill="#270e05" />
                <circle cx="80" cy="74" r="4" fill="#ffffff" />
                <circle cx="87" cy="81" r="1.8" fill="#ffffff" />

                <circle cx="136" cy="78" r="10.5" fill="#270e05" />
                <circle cx="132" cy="74" r="4" fill="#ffffff" />
                <circle cx="139" cy="81" r="1.8" fill="#ffffff" />

                <!-- Translucent Jelly Muzzle & Gumdrop Nose -->
                <ellipse cx="110" cy="95" rx="22" ry="16" fill="#fecdd3" opacity="0.65" />
                <ellipse cx="110" cy="89" rx="9" ry="6.5" fill="#881337" />
                <path d="M 98 100 Q 110 111 122 100" fill="none" stroke="#881337" stroke-width="3.5" stroke-linecap="round" />

                <!-- Smart Little Candy Bowtie -->
                <polygon points="110,125 90,115 90,135" fill="#fde047" stroke="#b45309" stroke-width="2" />
                <polygon points="110,125 130,115 130,135" fill="#fde047" stroke="#b45309" stroke-width="2" />
                <circle cx="110" cy="125" r="6" fill="#34d399" stroke="#065f46" stroke-width="2" />
              </svg>
            </div>

            <!-- Foreground Piped Icing Tuft Overlapping the Bear's Lower Paws so he sits IN the frosting -->
            <svg viewBox="0 0 190 32" style="position: absolute; bottom: -2px; left: 0; width: 190px; height: 30px; z-index: 3; pointer-events: none;">
              <path d="M 16 26 Q 32 12 52 22 Q 70 14 95 24 Q 120 14 138 22 Q 158 12 174 26 Z" fill="#fce7f3" stroke="#f472b6" stroke-width="2.5" />
              <ellipse cx="28" cy="24" rx="8" ry="5" fill="#fde047" />
              <ellipse cx="162" cy="24" rx="8" ry="5" fill="#34d399" />
            </svg>
          </div>
        </div>

      </div>

      <!-- 4. GIANT FOILED CANDY BAR WRAPPER CONTROL DECK -->
      <div style="position: absolute; bottom: 88px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 12px 20px rgba(62, 25, 11, 0.5));">

        <!-- Left Crinkled Silver Foil End -->
        <svg viewBox="0 0 44 86" style="width: 38px; height: 78px; margin-right: -4px; flex-shrink: 0;">
          <polygon points="44,8 8,0 16,22 2,43 16,64 8,86 44,78" fill="url(#pinwheelStick)" stroke="#94a3b8" stroke-width="2.5" stroke-linejoin="round" />
          <line x1="14" y1="22" x2="40" y2="30" stroke="#94a3b8" stroke-width="2" />
          <line x1="14" y1="64" x2="40" y2="56" stroke="#94a3b8" stroke-width="2" />
        </svg>

        <!-- Main Glossy Candy Bar Wrapper Body -->
        <div style="background: linear-gradient(135deg, #be185d 0%, #ec4899 50%, #db2777 100%); border-top: 4px solid #fde047; border-bottom: 4px solid #fde047; border-left: 3px solid #701a45; border-right: 3px solid #701a45; border-radius: 14px; padding: 10px 22px; display: flex; align-items: center; gap: 18px; position: relative; overflow: hidden;">
          
          <div style="position: absolute; top: -20px; left: 28%; width: 36px; height: 140px; background: rgba(253, 224, 71, 0.18); transform: rotate(18deg); pointer-events: none;"></div>
          <div style="position: absolute; top: -20px; left: 38%; width: 14px; height: 140px; background: rgba(255, 255, 255, 0.16); transform: rotate(18deg); pointer-events: none;"></div>

          <div style="display: flex; flex-direction: column; min-width: 145px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #fde047; letter-spacing: 0.14em; text-transform: uppercase;">WONKA-MATH BAR</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #ffffff; letter-spacing: 0.06em; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">FUDGE RIVER: CALM</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 82px; height: 52px; text-align: center; font-size: 1.9rem; font-weight: 900; color: #451a03; background: #fffbeb; border: 3px solid #fde047; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.18), 0 0 12px rgba(253,224,71,0.45);" />

          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #fde047 0%, #f59e0b 100%); color: #451a03; font-weight: 900; font-size: 1.08rem; border: 2px solid #ffffff; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.35); text-transform: uppercase; letter-spacing: 0.06em; transition: transform 0.1s;">
            Submit
          </button>
        </div>

        <!-- Right Crinkled Silver Foil End -->
        <svg viewBox="0 0 44 86" style="width: 38px; height: 78px; margin-left: -4px; flex-shrink: 0;">
          <polygon points="0,8 36,0 28,22 42,43 28,64 36,86 0,78" fill="url(#pinwheelStick)" stroke="#94a3b8" stroke-width="2.5" stroke-linejoin="round" />
          <line x1="30" y1="22" x2="4" y2="30" stroke="#94a3b8" stroke-width="2" />
          <line x1="30" y1="64" x2="4" y2="56" stroke="#94a3b8" stroke-width="2" />
        </svg>

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

function triggerChocolateRiverEruption() {
  const geyser = document.getElementById("choco-geyser-group");
  const splash = document.getElementById("choco-splash-ring");
  const particleHost = document.getElementById("choco-eruption-particles");

  if (geyser) {
    geyser.classList.remove("erupting");
    void geyser.offsetWidth;
    geyser.classList.add("erupting");
  }
  if (splash) {
    splash.classList.remove("erupting");
    void splash.offsetWidth;
    splash.classList.add("erupting");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#3e190b", "#5c2814", "#78350f", "#f472b6", "#fde047", "#34d399", "#60a5fa", "#ffffff"];

  for (let i = 0; i < 34; i++) {
    const p = document.createElement("div");
    const isChocoBlob = i < 16;
    const color = isChocoBlob ? colors[i % 3] : colors[3 + (i % 5)];
    const tx = (Math.random() - 0.5) * 520 + "px";
    const ty = -(140 + Math.random() * 340) + "px";
    const rot = (Math.random() * 540 - 270) + "deg";

    p.style.cssText = `
      position: absolute;
      left: 58%;
      top: 58%;
      width: ${isChocoBlob ? 18 + Math.random() * 16 : 16}px;
      height: ${isChocoBlob ? 18 + Math.random() * 16 : 7}px;
      border-radius: ${isChocoBlob ? "50%" : "999px"};
      background: ${color};
      box-shadow: 0 3px 8px rgba(0,0,0,0.35);
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: chocoParticleArc ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const gummy = document.getElementById("gummy-bear-mascot");
  const speech = document.getElementById("gummy-speech-bubble");
  const board = document.getElementById("graham-cracker-board");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerChocolateRiverEruption();

      if (gummy) {
        gummy.classList.remove("gummy-mascot-party", "gummy-mascot-oops");
        void gummy.offsetWidth;
        gummy.classList.add("gummy-mascot-party");
      }
      if (board) {
        board.classList.remove("cracker-board-pop");
        void board.offsetWidth;
        board.classList.add("cracker-board-pop");
      }
      if (speech) {
        speech.textContent = "CHOCOLATE ERUPTION!! 🍫🌋";
        speech.style.borderColor = "#fde047";
      }

      setStatus("🌋 FUDGE ERUPTION!!");
      input.style.borderColor = "#34d399";

      setTimeout(() => {
        input.style.borderColor = "#fde047";
        input.value = "";
        setStatus("FUDGE RIVER: CALM");
        if (speech) {
          speech.textContent = "Yum! Solve another one! 🍬";
          speech.style.borderColor = "#ec4899";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (gummy) {
        gummy.classList.remove("gummy-mascot-party", "gummy-mascot-oops");
        void gummy.offsetWidth;
        gummy.classList.add("gummy-mascot-oops");
      }
      if (speech) {
        speech.textContent = "Ooh, sticky math! Try again! 🧸";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("SUGAR SPILL! TRY AGAIN");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#fde047";
        input.value = "";
        setStatus("FUDGE RIVER: CALM");
        if (speech) {
          speech.textContent = "You got this! 🍫";
          speech.style.borderColor = "#ec4899";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
