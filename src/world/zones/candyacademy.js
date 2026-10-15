// src/world/zones/candyacademy.js - Full-Screen Outdoor Candy Kingdom Biome
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
      50% { transform: translateY(-5px) scaleX(1.03) scaleY(0.97); }
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
    .pinwheel- head-spin {
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
      animation: crackerPop 0.55s ease-out 1;
    }
    #choco-geyser-group {
      transform-origin: 730px 590px;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    #choco-geyser-group.erupting {
      animation: chocoGeyserColumn 1.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    #choco-splash-ring {
      transform-origin: 730px 590px;
      opacity: 0;
      pointer-events: none;
    }
    #choco-splash-ring.erupting {
      animation: chocoSplashWave 1.5s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="candy-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #ffafcc 0%, #ffc8dd 28%, #ffdfef 56%, #fef9c3 82%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN SCENIC SVG LANDSCAPE (SKY, PINWHEELS, FROSTING HILLS & CHOCOLATE RIVER) -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Sky Sunburst & Pastel Gradients -->
          <radialGradient id="sugarSunGlow" cx="72%" cy="22%" r="45%">
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
            <stop offset="100%" stop-color="#db2777" />
          </linearGradient>

          <linearGradient id="nearHillFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ec4899" />
            <stop offset="100%" stop-color="#9d174d" />
          </linearGradient>

          <linearGradient id="whippedCreamRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="75%" stop-color="#fce7f3" />
            <stop offset="100%" stop-color="#f9a8d4" />
          </linearGradient>

          <!-- Rich Hot-Fudge Chocolate River Gradients -->
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
        <path d="M-60 540 Q 180 370 430 490 T 940 440 T 1500 490 L 1500 900 L -60 900 Z" fill="#fbcfe8" opacity="0.65" />

        <!-- PEPPERMINT PINWHEEL #1 (Far Left Hilltop) -->
        <g transform="translate(210, 420)">
          <rect x="-5" y="0" width="10" height="190" rx="4" fill="url(#pinwheelStick)" stroke="#cbd5e1" stroke-width="1.5" />
          <g class="pinwheel-head-spin">
            <circle cx="0" cy="0" r="68" fill="#ffffff" stroke="#f43f5e" stroke-width="6" filter="drop-shadow(0 6px 12px rgba(157,23,77,0.25))" />
            <path d="M0 0 C25 -55 62 -35 66 0 Z" fill="#f43f5e" />
            <path d="M0 0 C55 25 35 62 0 66 Z" fill="#ec4899" />
            <path d="M0 0 C-25 55 -62 35 -66 0 Z" fill="#f43f5e" />
            <path d="M0 0 C-55 -25 -35 -62 0 -66 Z" fill="#ec4899" />
            <path d="M0 0 C40 -40 65 -5 50 30 Z" fill="#fda4af" opacity="0.55" />
            <path d="M0 0 C-40 40 -65 5 -50 -30 Z" fill="#fda4af" opacity="0.55" />
            <circle cx="0" cy="0" r="14" fill="#fde047" stroke="#ffffff" stroke-width="4" />
          </g>
        </g>

        <!-- PEPPERMINT PINWHEEL #2 (Right Horizon Giant) -->
        <g transform="translate(1195, 375)">
          <rect x="-6" y="0" width="12" height="240" rx="5" fill="url(#pinwheelStick)" stroke="#cbd5e1" stroke-width="1.5" />
          <g class="pinwheel-head-spin-fast">
            <circle cx="0" cy="0" r="84" fill="#ffffff" stroke="#ec4899" stroke-width="7" filter="drop-shadow(0 8px 16px rgba(157,23,77,0.3))" />
            <path d="M0 0 C32 -70 78 -42 82 0 Z" fill="#ec4899" />
            <path d="M0 0 C70 32 42 78 0 82 Z" fill="#34d399" />
            <path d="M0 0 C-32 70 -78 42 -82 0 Z" fill="#ec4899" />
            <path d="M0 0 C-70 -32 -42 -78 0 -82 Z" fill="#34d399" />
            <circle cx="0" cy="0" r="17" fill="#fde047" stroke="#ffffff" stroke-width="4" />
          </g>
        </g>

        <!-- PEPPERMINT PINWHEEL #3 (Mid-Right Valley) -->
        <g transform="translate(945, 455)">
          <rect x="-4" y="0" width="8" height="150" rx="3" fill="url(#pinwheelStick)" />
          <g class="pinwheel-head-spin">
            <circle cx="0" cy="0" r="50" fill="#ffffff" stroke="#a855f7" stroke-width="5" />
            <path d="M0 0 C18 -42 46 -25 48 0 Z" fill="#c084fc" />
            <path d="M0 0 C42 18 25 46 0 48 Z" fill="#f472b6" />
            <path d="M0 0 C-18 42 -46 25 -48 0 Z" fill="#c084fc" />
            <path d="M0 0 C-42 -18 -25 -46 0 -48 Z" fill="#f472b6" />
            <circle cx="0" cy="0" r="10" fill="#fef08a" stroke="#ffffff" stroke-width="3" />
          </g>
        </g>

        <!-- FAR ROLLING PINK FROSTING HILLS + PIPED WHITE ICING TRIM -->
        <path d="M-80 555 Q 240 430 570 535 T 1180 495 T 1540 550 L 1540 900 L -80 900 Z" fill="url(#farHillFrosting)" />
        <path d="M-80 555 Q 240 430 570 535 T 1180 495 T 1540 550" fill="none" stroke="url(#whippedCreamRim)" stroke-width="14" stroke-linecap="round" opacity="0.92" />

        <!-- MIDGROUND FROSTING HILLS (Left & Right Banks framing the Chocolate River Valley) -->
        <path d="M-100 610 Q 260 510 640 615 T 1540 585 L 1540 900 L -100 900 Z" fill="url(#midHillFrosting)" />
        <path d="M-100 610 Q 260 510 640 615 T 1540 585" fill="none" stroke="url(#whippedCreamRim)" stroke-width="16" stroke-linecap="round" />

        <!-- Sprinkles Embedded in the Frosting Hills -->
        <g opacity="0.85">
          <rect x="140" y="640" width="18" height="7" rx="3.5" fill="#fde047" transform="rotate(-18 140 640)" />
          <rect x="245" y="610" width="20" height="7" rx="3.5" fill="#34d399" transform="rotate(14 245 610)" />
          <rect x="330" y="665" width="18" height="7" rx="3.5" fill="#60a5fa" transform="rotate(-8 330 665)" />
          <rect x="1120" y="635" width="20" height="7" rx="3.5" fill="#fde047" transform="rotate(22 1120 635)" />
          <rect x="1260" y="655" width="18" height="7" rx="3.5" fill="#a78bfa" transform="rotate(-15 1260 655)" />
          <rect x="1030" y="675" width="18" height="7" rx="3.5" fill="#34d399" transform="rotate(9 1030 675)" />
        </g>

        <!-- WINDING GLOSSY HOT-FUDGE CHOCOLATE RIVER -->
        <!-- Whipped Cream Riverbank Border -->
        <path d="M 730 515 C 620 555, 860 605, 735 665 C 605 725, 920 785, 760 910 L 1140 910 C 1240 780, 910 720, 1005 660 C 1090 600, 860 555, 805 515 Z" fill="#fce7f3" opacity="0.9" />
        
        <!-- Main Liquid Chocolate River Channel -->
        <path d="M 742 518 C 640 558, 870 605, 748 665 C 625 725, 935 785, 785 910 L 1110 910 C 1210 780, 895 720, 985 660 C 1070 600, 845 555, 795 518 Z" fill="url(#chocolateRiverGrad)" />

        <!-- Animated Glossy Caramel/Fudge Flow Lines -->
        <path d="M 768 530 C 690 565, 885 610, 790 668 C 690 730, 960 790, 865 900" fill="none" stroke="#92400e" stroke-width="10" stroke-linecap="round" stroke-dasharray="28 32" style="animation: riverFlowDash 4.5s linear infinite;" opacity="0.75" />
        <path d="M 785 540 C 730 570, 925 615, 845 670 C 760 735, 1020 790, 955 900" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" stroke-dasharray="16 44" style="animation: riverFlowDash 3.2s linear infinite;" opacity="0.45" />

        <!-- Idle Bubbling Hot Fudge Blobs in the River -->
        <circle cx="775" cy="595" r="7" fill="#78350f" stroke="#b45309" stroke-width="2" style="animation: fudgeBubbleIdle 2.4s ease-in-out infinite;" />
        <circle cx="855" cy="645" r="9" fill="#78350f" stroke="#d97706" stroke-width="2" style="animation: fudgeBubbleIdle 3.1s ease-in-out 0.8s infinite;" />
        <circle cx="810" cy="705" r="8" fill="#5c2814" stroke="#b45309" stroke-width="2" style="animation: fudgeBubbleIdle 2.7s ease-in-out 1.4s infinite;" />
        <circle cx="920" cy="745" r="10" fill="#78350f" stroke="#f59e0b" stroke-width="2" style="animation: fudgeBubbleIdle 2.2s ease-in-out 0.4s infinite;" />

        <!-- VOLCANIC CHOCOLATE RIVER ERUPTION GEYSER (Triggered on Correct Math Answer!) -->
        <g id="choco-splash-ring">
          <ellipse cx="775" cy="595" rx="145" ry="34" fill="#fde047" opacity="0.4" />
          <ellipse cx="775" cy="595" rx="115" ry="26" fill="#5c2814" stroke="#fbbf24" stroke-width="4" />
        </g>

        <g id="choco-geyser-group">
          <!-- Main Towering Plume of Melted Fudge -->
          <path d="M 695 600 Q 715 330 620 120 Q 705 70 775 45 Q 845 70 930 120 Q 835 330 855 600 Z" fill="url(#chocoGeyserGrad)" filter="drop-shadow(0 0 25px rgba(92,40,20,0.65))" />
          <!-- Glossy Warm Highlight Core -->
          <path d="M 735 595 Q 748 350 700 145 Q 775 85 850 145 Q 802 350 815 595 Z" fill="#92400e" opacity="0.8" />
          <path d="M 760 585 Q 768 360 745 165 Q 775 120 805 165 Q 782 360 790 585 Z" fill="#fbbf24" opacity="0.35" />
          <!-- Top Erupting Fudge Crown Blobs -->
          <circle cx="635" cy="115" r="34" fill="#4d2110" />
          <circle cx="710" cy="72" r="44" fill="#5c2814" />
          <circle cx="780" cy="55" r="52" fill="#3e190b" />
          <circle cx="855" cy="78" r="42" fill="#5c2814" />
          <circle cx="918" cy="118" r="32" fill="#4d2110" />
          <!-- Whipped Cream & Rainbow Sprinkles inside the Eruption Crown -->
          <circle cx="745" cy="70" r="14" fill="#ffffff" opacity="0.9" />
          <circle cx="815" cy="65" r="18" fill="#fce7f3" opacity="0.9" />
          <rect x="680" y="95" width="22" height="8" rx="4" fill="#f472b6" transform="rotate(-25 680 95)" />
          <rect x="770" y="38" width="24" height="8" rx="4" fill="#34d399" transform="rotate(15 770 38)" />
          <rect x="840" y="92" width="22" height="8" rx="4" fill="#fde047" transform="rotate(32 840 92)" />
          <rect x="725" y="135" width="22" height="8" rx="4" fill="#60a5fa" transform="rotate(-12 725 135)" />
        </g>

        <!-- FOREGROUND FROSTING MEADOWS (Anchors the bottom & side banks) -->
        <path d="M-120 695 Q 220 620 595 725 T 1220 715 T 1560 680 L 1560 920 L -120 920 Z" fill="url(#nearHillFrosting)" opacity="0.95" />
        <path d="M-120 695 Q 220 620 595 725 T 1220 715 T 1560 680" fill="none" stroke="url(#whippedCreamRim)" stroke-width="18" stroke-linecap="round" />
      </svg>

      <!-- 2. DRIFTING PUFFY COTTON-CANDY CLOUDS -->
      <div style="position: absolute; top: 9%; left: 0; width: 220px; height: 85px; pointer-events: none; opacity: 0.9; animation: driftCandyCloud1 42s linear infinite;">
        <svg viewBox="0 0 220 90" style="width: 100%; height: 100%; filter: drop-shadow(0 8px 14px rgba(244,114,182,0.28));">
          <path d="M 35 72 Q 15 72 15 54 Q 15 36 38 34 Q 48 12 78 14 Q 104 4 128 20 Q 155 12 174 32 Q 202 34 202 54 Q 202 72 178 72 Z" fill="#fff1f2" stroke="#fbcfe8" stroke-width="3" />
        </svg>
      </div>

      <div style="position: absolute; top: 16%; left: 0; width: 180px; height: 70px; pointer-events: none; opacity: 0.82; animation: driftCandyCloud2 54s linear infinite;">
        <svg viewBox="0 0 220 90" style="width: 100%; height: 100%; filter: drop-shadow(0 8px 14px rgba(244,114,182,0.25));">
          <path d="M 35 72 Q 15 72 15 54 Q 15 36 38 34 Q 48 12 78 14 Q 104 4 128 20 Q 155 12 174 32 Q 202 34 202 54 Q 202 72 178 72 Z" fill="#fdf4ff" stroke="#f5d0fe" stroke-width="3" />
        </svg>
      </div>

      <!-- DYNAMIC PARTICLE LAYER FOR FLYING CHOCOLATE DROPS & SPRINKLES -->
      <div id="choco-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 3. MAIN OUTDOOR STAGE: GRAHAM CRACKER BOARD + GIANT GUMMY BEAR TEACHER -->
      <div style="position: absolute; top: 44%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: flex-end; justify-content: center; gap: 26px; width: 94%; max-width: 900px; z-index: 5; pointer-events: none;">

        <!-- THE GIANT TOASTED GRAHAM CRACKER CHALKBOARD -->
        <div id="graham-cracker-board" style="position: relative; width: 390px; max-width: 58vw; min-height: 255px; background: linear-gradient(145deg, #eab676 0%, #d99343 48%, #b87328 100%); border: 7px solid #8c4f14; border-radius: 22px; box-shadow: 0 20px 40px rgba(62, 25, 11, 0.55), inset 0 4px 0 rgba(255, 243, 214, 0.65), inset 0 -6px 0 rgba(102, 52, 10, 0.7); padding: 22px 28px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          
          <!-- Salted Pretzel Support Posts Holding the Graham Cracker in the Ground -->
          <div style="position: absolute; bottom: -42px; left: 52px; width: 22px; height: 46px; background: linear-gradient(90deg, #78350f, #b45309, #5c2814); border-radius: 6px; border: 3px solid #451a03; z-index: -1;"></div>
          <div style="position: absolute; bottom: -42px; right: 52px; width: 22px; height: 46px; background: linear-gradient(90deg, #78350f, #b45309, #5c2814); border-radius: 6px; border: 3px solid #451a03; z-index: -1;"></div>

          <!-- Inner Scored Graham Cracker Ridge & Perforation Dots -->
          <div style="position: absolute; inset: 10px; border: 2.5px dashed rgba(113, 55, 11, 0.55); border-radius: 14px; pointer-events: none;"></div>
          <div style="position: absolute; inset: 18px; background-image: radial-gradient(circle, rgba(113, 55, 11, 0.42) 3px, transparent 3.5px); background-size: 38px 34px; opacity: 0.65; pointer-events: none;"></div>

          <!-- Top Royal-Icing Ribbon Banner -->
          <div style="position: absolute; top: -17px; background: linear-gradient(90deg, #ec4899, #f472b6, #ec4899); border: 3px solid #ffffff; color: #ffffff; font-weight: 900; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(157,23,77,0.4);">
            🍭 Candy Academy
          </div>

          <!-- CRISP SUGAR-CRYSTAL EQUATION READOUT -->
          <div id="equation-container" style="position: relative; z-index: 2; background: rgba(74, 34, 8, 0.28); border: 2px solid rgba(255, 247, 237, 0.45); border-radius: 16px; padding: 14px 36px; backdrop-filter: blur(2px); box-shadow: inset 0 4px 14px rgba(0,0,0,0.28);">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', monospace; font-size: 3.7rem; font-weight: 900; color: #ffffff; letter-spacing: 0.08em; line-height: 1.06; text-shadow: 0 4px 0 #7c2d12, 0 0 18px rgba(255,255,255,0.55);">
              <div id="math-num1">12</div>
              <div style="display: flex; align-items: center; gap: 18px;">
                <span id="math-op" style="color: #fde047; font-size: 3rem; text-shadow: 0 4px 0 #7c2d12;">+</span>
                <span id="math-num2">15</span>
              </div>
              <div style="width: 100%; height: 6px; background: #ffffff; border-radius: 999px; margin: 8px 0; box-shadow: 0 3px 0 #7c2d12;"></div>
              <div id="math-question-mark" style="color: #fde047; letter-spacing: 0.18em; font-size: 3.1rem; text-shadow: 0 4px 0 #7c2d12;">??</div>
            </div>
          </div>
        </div>

        <!-- THE GIANT TRANSLUCENT GUMMY BEAR TEACHER ("BARNABY GUMDROP") -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
          <!-- Speech Bubble -->
          <div id="gummy-speech-bubble" style="background: #ffffff; color: #831843; border: 3px solid #f472b6; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 6px 15px rgba(131,24,67,0.25); white-space: nowrap; transition: all 0.2s;">
            Solve it to erupt the fudge river! 🍫
          </div>

          <div id="gummy-bear-mascot" class="gummy-mascot-idle" style="width: 185px; height: 225px; filter: drop-shadow(0 14px 20px rgba(131, 24, 67, 0.45));">
            <svg viewBox="0 0 220 260" style="width: 100%; height: 100%; overflow: visible;">
              <defs>
                <!-- Translucent Cherry-Strawberry Jelly Gradient (Bright internal light refraction) -->
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
              <!-- Inner Subsurface Jelly Glow -->
              <ellipse cx="110" cy="168" rx="46" ry="48" fill="url(#gummyBellyGlow)" />
              <!-- Glossy Specular Belly Highlights -->
              <path d="M 66 135 Q 58 165 68 195" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.42" />

              <!-- Chubby Gummy Legs / Paws -->
              <ellipse cx="76" cy="228" rx="28" ry="22" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
              <circle cx="68" cy="224" r="6" fill="#ffe4e6" opacity="0.55" />
              <ellipse cx="144" cy="228" rx="28" ry="22" fill="url(#gummyJellyBody)" stroke="#9f1239" stroke-width="3" />
              <circle cx="136" cy="224" r="6" fill="#ffe4e6" opacity="0.55" />

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

              <!-- Glossy Jelly Forehead Shine -->
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
        </div>

      </div>

      <!-- 4. GIANT FOILED CANDY BAR WRAPPER CONTROL DECK -->
      <div style="position: absolute; bottom: 92px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 12px 24px rgba(62, 25, 11, 0.55));">

        <!-- Left Crinkled Silver Foil End -->
        <svg viewBox="0 0 44 86" style="width: 38px; height: 78px; margin-right: -4px; flex-shrink: 0;">
          <polygon points="44,8 8,0 16,22 2,43 16,64 8,86 44,78" fill="url(#pinwheelStick)" stroke="#94a3b8" stroke-width="2.5" stroke-linejoin="round" />
          <line x1="14" y1="22" x2="40" y2="30" stroke="#94a3b8" stroke-width="2" />
          <line x1="14" y1="64" x2="40" y2="56" stroke="#94a3b8" stroke-width="2" />
        </svg>

        <!-- Main Glossy Candy Bar Wrapper Body -->
        <div style="background: linear-gradient(135deg, #be185d 0%, #ec4899 50%, #db2777 100%); border-top: 4px solid #fde047; border-bottom: 4px solid #fde047; border-left: 3px solid #701a45; border-right: 3px solid #701a45; border-radius: 14px; padding: 10px 22px; display: flex; align-items: center; gap: 18px; position: relative; overflow: hidden;">
          
          <!-- Diagonal Golden Wrapper Stripe Accent -->
          <div style="position: absolute; top: -20px; left: 28%; width: 36px; height: 140px; background: rgba(253, 224, 71, 0.18); transform: rotate(18deg); pointer-events: none;"></div>
          <div style="position: absolute; top: -20px; left: 38%; width: 14px; height: 140px; background: rgba(255, 255, 255, 0.16); transform: rotate(18deg); pointer-events: none;"></div>

          <!-- Wrapper Brand Tag & Status Readout -->
          <div style="display: flex; flex-direction: column; min-width: 145px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #fde047; letter-spacing: 0.14em; text-transform: uppercase;">WONKA-MATH BAR</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #ffffff; letter-spacing: 0.06em; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">FUDGE RIVER: CALM</span>
          </div>

          <!-- Answer Number Input -->
          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 82px; height: 52px; text-align: center; font-size: 1.9rem; font-weight: 900; color: #451a03; background: #fffbeb; border: 3px solid #fde047; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.18), 0 0 12px rgba(253,224,71,0.45);" />

          <!-- Clean "Submit" Button -->
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
      left: 53%;
      top: 63%;
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
          speech.style.borderColor = "#f472b6";
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
          speech.style.borderColor = "#f472b6";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
