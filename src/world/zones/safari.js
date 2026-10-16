// src/world/zones/safari.js - High-Detail Golden-Hour Serengeti Safari Biome
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadSafari() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("safari-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "safari-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes giraffeNeckSway {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(4.5deg); }
    }
    @keyframes giraffeNeckSway2 {
      0%, 100% { transform: rotate(2deg); }
      50% { transform: rotate(-3.5deg); }
    }
    @keyframes elephantTrunkIdle {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-8deg); }
    }
    @keyframes elephantEarFlap {
      0%, 100% { transform: scaleX(1); }
      50% { transform: scaleX(0.86); }
    }
    @keyframes hippoBob {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(4px); }
    }
    @keyframes waterRipplePulse {
      0%, 100% { transform: scaleX(1); opacity: 0.55; }
      50% { transform: scaleX(1.12); opacity: 0.85; }
    }
    @keyframes birdFlockDrift {
      0% { transform: translateX(-180px) translateY(10px); }
      50% { transform: translateX(50vw) translateY(-18px); }
      100% { transform: translateX(115vw) translateY(6px); }
    }
    @keyframes lionBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(2px) scaleY(0.985) scaleX(1.015); }
    }
    @keyframes lionTailSwish {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(12deg); }
    }
    @keyframes lionWaveArm {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-14deg); }
    }
    @keyframes lionCelebrateJump {
      0% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-28px) rotate(-4deg) scale(1.05); }
      50% { transform: translateY(0) rotate(3deg) scale(0.96, 1.04); }
      75% { transform: translateY(-16px) rotate(-2deg) scale(1.03); }
      100% { transform: translateY(0) scale(1); }
    }
    @keyframes lionShakeNo {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes waterSpoutErupt {
      0% { transform: scaleY(0) scaleX(0.4); opacity: 0; }
      18% { transform: scaleY(1.08) scaleX(1.1); opacity: 1; }
      45% { transform: scaleY(0.96) scaleX(0.95); opacity: 1; }
      70% { transform: scaleY(1.12) scaleX(1.06); opacity: 0.95; }
      100% { transform: scaleY(0) scaleX(1.35); opacity: 0; }
    }
    @keyframes safariParticleArc {
      0% { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 1; }
      55% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.2) rotate(var(--rot)); opacity: 0; }
    }
    .lion-ranger-idle {
      transform-origin: center bottom;
      animation: lionBreathe 3.3s ease-in-out infinite;
    }
    .lion-ranger-party {
      transform-origin: center bottom;
      animation: lionCelebrateJump 0.85s ease-in-out 2 !important;
    }
    .lion-ranger-oops {
      transform-origin: center bottom;
      animation: lionShakeNo 0.55s ease-in-out 1 !important;
    }
    #water-geyser-group {
      transform-origin: 965px 495px;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    #water-geyser-group.erupting {
      animation: waterSpoutErupt 1.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="safari-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #7c2d12 0%, #c2410c 22%, #f97316 45%, #fbbf24 72%, #fef08a 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN SERENGETI SAVANNA & WILDLIFE SVG LANDSCAPE -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Blazing Serengeti Sunset Sun & Volumetric Glow -->
          <radialGradient id="savannaSunGlow" cx="62%" cy="28%" r="48%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
            <stop offset="18%" stop-color="#fef08a" stop-opacity="0.92" />
            <stop offset="45%" stop-color="#f97316" stop-opacity="0.55" />
            <stop offset="80%" stop-color="#9a3412" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#7c2d12" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="sunDiscGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fffbeb" />
            <stop offset="55%" stop-color="#fde047" />
            <stop offset="100%" stop-color="#f97316" />
          </linearGradient>

          <!-- Distant Kilimanjaro / Savanna Mesa Mountains -->
          <linearGradient id="mesaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7c2d12" />
            <stop offset="60%" stop-color="#9a3412" />
            <stop offset="100%" stop-color="#b45309" />
          </linearGradient>

          <!-- Layered Savanna Grass Hills -->
          <linearGradient id="farSavannaHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#eab308" />
            <stop offset="100%" stop-color="#ca8a04" />
          </linearGradient>

          <linearGradient id="midSavannaStage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#d97706" />
            <stop offset="50%" stop-color="#b45309" />
            <stop offset="100%" stop-color="#78350f" />
          </linearGradient>

          <linearGradient id="nearSavannaBank" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#65a30d" />
            <stop offset="45%" stop-color="#3f6212" />
            <stop offset="100%" stop-color="#1a2e05" />
          </linearGradient>

          <!-- Oasis Watering Hole Lagoon -->
          <linearGradient id="oasisWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="40%" stop-color="#0284c7" />
            <stop offset="80%" stop-color="#0369a1" />
            <stop offset="100%" stop-color="#0c4a6e" />
          </linearGradient>

          <linearGradient id="waterGeyserGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="45%" stop-color="#38bdf8" />
            <stop offset="80%" stop-color="#bae6fd" />
            <stop offset="100%" stop-color="#ffffff" />
          </linearGradient>

          <!-- Acacia Canopy Foliage -->
          <linearGradient id="acaciaCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3f6212" />
            <stop offset="60%" stop-color="#1a2e05" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>

        <!-- Blazing Sunset Sky & Giant African Sun Disc -->
        <rect width="1440" height="900" fill="url(#savannaSunGlow)" />
        <circle cx="890" cy="255" r="135" fill="url(#sunDiscGrad)" opacity="0.92" filter="drop-shadow(0 0 45px rgba(254,240,138,0.75))" />

        <!-- Distant Crimson Clouds -->
        <g fill="#fed7aa" opacity="0.35">
          <rect x="120" y="110" width="240" height="14" rx="7" />
          <rect x="180" y="128" width="160" height="10" rx="5" />
          <rect x="980" y="95" width="290" height="16" rx="8" />
          <rect x="1060" y="116" width="190" height="10" rx="5" />
        </g>

        <!-- Distant Snow-Capped Kilimanjaro & Flat-Topped Mesas -->
        <path d="M -40 465 L 180 310 L 310 310 L 520 465 Z" fill="url(#mesaGrad)" opacity="0.65" />
        <polygon points="180,310 310,310 335,335 155,335" fill="#fef3c7" opacity="0.55" />
        <path d="M 460 465 L 680 355 L 810 355 L 1040 465 Z" fill="url(#mesaGrad)" opacity="0.45" />

        <!-- FAR GOLDEN SAVANNA HORIZON HILLS -->
        <path d="M -80 465 Q 280 390 680 450 T 1520 435 L 1520 900 L -80 900 Z" fill="url(#farSavannaHill)" />

        <!-- ========================================================================= -->
        <!-- ICONIC FLAT-TOPPED ACACIA TREE #1 (Left Horizon)                          -->
        <!-- ========================================================================= -->
        <g transform="translate(145, 225)">
          <!-- Gnarled Branching Trunk -->
          <path d="M 65 235 C 68 180, 58 135, 45 95 L 5 45 L 16 45 L 52 85 L 75 35 L 86 35 L 66 90 L 125 50 L 136 52 L 76 105 C 78 150, 82 195, 88 235 Z" fill="#451a03" />
          <!-- Layered Flat Umbrella Canopies -->
          <ellipse cx="12" cy="42" rx="68" ry="12" fill="url(#acaciaCanopy)" />
          <ellipse cx="78" cy="30" rx="95" ry="15" fill="url(#acaciaCanopy)" />
          <ellipse cx="138" cy="48" rx="62" ry="11" fill="url(#acaciaCanopy)" />
          <!-- Golden Rim-Lit Top Leaves -->
          <ellipse cx="78" cy="24" rx="82" ry="6" fill="#65a30d" opacity="0.65" />
          <ellipse cx="12" cy="37" rx="54" ry="5" fill="#65a30d" opacity="0.55" />
        </g>

        <!-- ========================================================================= -->
        <!-- WILDLIFE GROUP #1: TWO ANIMATED GIRAFFES NIBBLING ACACIA LEAVES (LEFT)    -->
        <!-- ========================================================================= -->
        <g transform="translate(235, 315)">
          <!-- Adult Giraffe -->
          <ellipse cx="42" cy="155" rx="34" ry="8" fill="rgba(120,53,15,0.45)" />
          <!-- Long Slender Legs -->
          <line x1="24" y1="95" x2="20" y2="155" stroke="#d97706" stroke-width="5.5" stroke-linecap="round" />
          <line x1="34" y1="95" x2="34" y2="155" stroke="#b45309" stroke-width="5" stroke-linecap="round" />
          <line x1="54" y1="98" x2="52" y2="155" stroke="#b45309" stroke-width="5" stroke-linecap="round" />
          <line x1="62" y1="98" x2="66" y2="155" stroke="#d97706" stroke-width="5.5" stroke-linecap="round" />
          <!-- Sloping Giraffe Torso & Tail -->
          <path d="M 18 82 C 18 65, 42 68, 66 82 C 72 95, 64 106, 48 105 C 32 104, 18 98, 18 82 Z" fill="#f59e0b" stroke="#78350f" stroke-width="2" />
          <path d="M 66 86 Q 76 105 72 124" fill="none" stroke="#78350f" stroke-width="2.5" />
          <!-- Giraffe Spots on Body -->
          <circle cx="32" cy="82" r="5" fill="#92400e" />
          <circle cx="46" cy="86" r="6" fill="#92400e" />
          <circle cx="56" cy="94" r="4.5" fill="#92400e" />
          <circle cx="28" cy="94" r="4" fill="#92400e" />

          <!-- Swaying Long Neck & Head -->
          <g style="transform-origin: 26px 78px; animation: giraffeNeckSway 4.2s ease-in-out infinite;">
            <path d="M 18 80 L -6 -12 L 8 -14 L 34 76 Z" fill="#f59e0b" stroke="#78350f" stroke-width="2" />
            <!-- Neck Spots & Mane -->
            <circle cx="18" cy="55" r="4" fill="#92400e" />
            <circle cx="12" cy="34" r="4.5" fill="#92400e" />
            <circle cx="6" cy="12" r="3.8" fill="#92400e" />
            <!-- Giraffe Head, Ears & Ossicone Horns -->
            <ellipse cx="-4" cy="-14" rx="13" ry="7.5" transform="rotate(-15 -4 -14)" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
            <line x1="-2" y1="-20" x2="-4" y2="-30" stroke="#78350f" stroke-width="2.5" />
            <circle cx="-4" cy="-31" r="3" fill="#451a03" />
            <line x1="4" y1="-19" x2="4" y2="-29" stroke="#78350f" stroke-width="2.5" />
            <circle cx="4" cy="-30" r="3" fill="#451a03" />
            <circle cx="-6" cy="-15" r="2.2" fill="#0f172a" />
          </g>

          <!-- Baby Giraffe Beside Parent -->
          <g transform="translate(68, 36) scale(0.72)">
            <line x1="22" y1="95" x2="20" y2="155" stroke="#d97706" stroke-width="5.5" />
            <line x1="56" y1="98" x2="58" y2="155" stroke="#d97706" stroke-width="5.5" />
            <ellipse cx="40" cy="88" rx="24" ry="14" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
            <circle cx="34" cy="86" r="5" fill="#92400e" />
            <circle cx="48" cy="90" r="4.5" fill="#92400e" />
            <g style="transform-origin: 24px 80px; animation: giraffeNeckSway2 3.6s ease-in-out infinite;">
              <path d="M 18 82 L 4 8 L 16 8 L 32 80 Z" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
              <circle cx="16" cy="48" r="4" fill="#92400e" />
              <circle cx="12" cy="26" r="3.5" fill="#92400e" />
              <ellipse cx="6" cy="6" rx="11" ry="6.5" fill="#fde047" stroke="#78350f" stroke-width="2" />
              <circle cx="4" cy="5" r="2" fill="#0f172a" />
            </g>
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- WILDLIFE GROUP #2: DISTANT ZEBRA HERD ON THE HORIZON RIDGE                -->
        <!-- ========================================================================= -->
        <g transform="translate(560, 412) scale(0.75)">
          <ellipse cx="30" cy="48" rx="20" ry="11" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
          <path d="M 16 38 L 6 14 L 18 12 L 26 36 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
          <ellipse cx="6" cy="14" rx="9" ry="5" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
          <line x1="18" y1="48" x2="16" y2="74" stroke="#0f172a" stroke-width="3.5" />
          <line x1="26" y1="48" x2="26" y2="74" stroke="#f8fafc" stroke-width="3" />
          <line x1="40" y1="48" x2="42" y2="74" stroke="#0f172a" stroke-width="3.5" />
          <!-- Zebra Stripes -->
          <path d="M 22 38 L 20 56 M 28 37 L 28 58 M 35 38 L 36 56 M 42 40 L 44 54" stroke="#0f172a" stroke-width="2.8" />
        </g>

        <!-- MIDGROUND SAVANNA STAGE PLATEAU -->
        <path d="M -100 520 Q 340 455 760 515 T 1540 495 L 1540 900 L -100 900 Z" fill="url(#midSavannaStage)" />

        <!-- ========================================================================= -->
        <!-- SHIMMERING SAVANNA OASIS WATERING HOLE + WILDLIFE                         -->
        <!-- ========================================================================= -->
        <g>
          <!-- Sandy Oasis Shoreline -->
          <ellipse cx="1065" cy="575" rx="345" ry="78" fill="#fde68a" opacity="0.85" />
          <!-- Turquoise Lagoon Water -->
          <ellipse cx="1075" cy="578" rx="320" ry="66" fill="url(#oasisWaterGrad)" stroke="#bae6fd" stroke-width="3" />

          <!-- Animated Water Shimmer Ripples -->
          <ellipse cx="980" cy="565" rx="65" ry="6" fill="#bae6fd" style="transform-origin:980px 565px;animation:waterRipplePulse 3.2s ease-in-out infinite;" />
          <ellipse cx="1140" cy="595" rx="85" ry="7" fill="#7dd3fc" style="transform-origin:1140px 595px;animation:waterRipplePulse 4s ease-in-out 1s infinite;" />

          <!-- SUBMERGED HIPPO IN THE WATERING HOLE -->
          <g style="animation: hippoBob 3.4s ease-in-out infinite;" transform="translate(1155, 558)">
            <ellipse cx="0" cy="18" rx="48" ry="8" fill="#bae6fd" opacity="0.6" />
            <!-- Hippo Back & Head Above Waterline -->
            <path d="M -38 16 C -38 -6, 2 -8, 12 16 Z" fill="#64748b" stroke="#334155" stroke-width="2.5" />
            <path d="M 6 16 C 6 -12, 44 -12, 46 16 Z" fill="#94a3b8" stroke="#334155" stroke-width="2.5" />
            <!-- Twitching Hippo Ears, Eyes & Snorting Nostrils -->
            <circle cx="14" cy="-8" r="4.5" fill="#64748b" stroke="#334155" stroke-width="2" />
            <circle cx="28" cy="-8" r="4.5" fill="#64748b" stroke="#334155" stroke-width="2" />
            <circle cx="20" cy="-1" r="3" fill="#0f172a" /><circle cx="19" cy="-2" r="1" fill="#ffffff" />
            <circle cx="36" cy="6" r="2.5" fill="#334155" />
            <circle cx="42" cy="6" r="2.5" fill="#334155" />
          </g>

          <!-- PINK FLAMINGOS WADING IN THE OASIS SHALLOWS -->
          <g transform="translate(1285, 505)">
            <line x1="0" y1="32" x2="0" y2="68" stroke="#fb7185" stroke-width="2.5" />
            <polyline points="0,48 -10,54 0,58" fill="none" stroke="#fb7185" stroke-width="2.2" />
            <ellipse cx="0" cy="28" rx="16" ry="10" fill="#f43f5e" stroke="#be123c" stroke-width="2" />
            <path d="M -12 24 C -24 10, -10 -12, -20 -16" fill="none" stroke="#fb7185" stroke-width="5" stroke-linecap="round" />
            <circle cx="-21" cy="-16" r="5" fill="#fb7185" />
            <polygon points="-25,-16 -32,-12 -25,-11" fill="#0f172a" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- BULL AFRICAN ELEPHANT BY THE WATERING HOLE (BLASTS WATER GEYSER!)         -->
        <!-- ========================================================================= -->
        <g transform="translate(915, 405)">
          <ellipse cx="85" cy="118" rx="68" ry="14" fill="rgba(12,74,110,0.45)" />
          <!-- Pillar Elephant Legs -->
          <rect x="42" y="75" width="20" height="42" rx="6" fill="#475569" stroke="#1e293b" stroke-width="2.5" />
          <rect x="68" y="78" width="20" height="42" rx="6" fill="#64748b" stroke="#1e293b" stroke-width="2.5" />
          <rect x="104" y="75" width="20" height="42" rx="6" fill="#475569" stroke="#1e293b" stroke-width="2.5" />
          <rect x="124" y="78" width="20" height="42" rx="6" fill="#64748b" stroke="#1e293b" stroke-width="2.5" />
          <!-- Massive Rounded Elephant Body -->
          <path d="M 38 55 C 38 15, 138 12, 148 58 C 152 85, 132 94, 88 94 C 48 94, 38 80, 38 55 Z" fill="#64748b" stroke="#1e293b" stroke-width="3" />
          <!-- Elephant Head & Raised Trunk -->
          <circle cx="38" cy="48" r="28" fill="#64748b" stroke="#1e293b" stroke-width="3" />
          <g style="transform-origin: 18px 48px; animation: elephantTrunkIdle 3s ease-in-out infinite;">
            <path d="M 16 48 C -12 48, -22 18, -8 -4 C -2 -10, 6 -4, 2 4 C -6 18, -2 34, 18 36 Z" fill="#64748b" stroke="#1e293b" stroke-width="2.8" />
          </g>
          <!-- Curved White Ivory Tusks -->
          <path d="M 18 58 C -4 64, -12 52, -6 44 C -2 52, 8 54, 20 52 Z" fill="#fefce8" stroke="#a16207" stroke-width="2" />
          <!-- Flapping African Elephant Ear -->
          <g style="transform-origin: 48px 42px; animation: elephantEarFlap 2.8s ease-in-out infinite;">
            <path d="M 46 24 C 78 18, 86 64, 54 74 C 42 72, 40 48, 46 24 Z" fill="#475569" stroke="#1e293b" stroke-width="2.5" />
          </g>
          <circle cx="26" cy="42" r="3.5" fill="#0f172a" /><circle cx="25" cy="41" r="1.2" fill="#ffffff" />
        </g>

        <!-- ========================================================================= -->
        <!-- GIANT OASIS WATER GEYSER & RAINBOW MIST (Triggers on Correct Answer!)     -->
        <!-- ========================================================================= -->
        <g id="water-geyser-group">
          <!-- Rainbow Mist Arc Behind Water Spout -->
          <path d="M 790 480 A 180 180 0 0 1 1140 480" fill="none" stroke="#f43f5e" stroke-width="8" opacity="0.45" />
          <path d="M 800 480 A 170 170 0 0 1 1130 480" fill="none" stroke="#fde047" stroke-width="8" opacity="0.45" />
          <path d="M 810 480 A 160 160 0 0 1 1120 480" fill="none" stroke="#34d399" stroke-width="8" opacity="0.45" />
          <path d="M 820 480 A 150 150 0 0 1 1110 480" fill="none" stroke="#38bdf8" stroke-width="8" opacity="0.45" />

          <!-- Towering Pressurized Water Column from Elephant Trunk & Lagoon -->
          <path d="M 895 495 Q 905 260 810 85 Q 890 35 965 20 Q 1040 35 1120 85 Q 1025 260 1035 495 Z" fill="url(#waterGeyserGrad)" filter="drop-shadow(0 0 25px rgba(56,189,248,0.8))" />
          <!-- White Foam Crest Crown -->
          <circle cx="830" cy="85" r="32" fill="#e0f2fe" />
          <circle cx="895" cy="52" r="42" fill="#ffffff" />
          <circle cx="965" cy="38" r="48" fill="#e0f2fe" />
          <circle cx="1035" cy="52" r="42" fill="#ffffff" />
          <circle cx="1100" cy="85" r="32" fill="#e0f2fe" />
        </g>

        <!-- ICONIC ACACIA TREE #2 (Far Right Horizon Framing Oasis) -->
        <g transform="translate(1240, 230)">
          <path d="M 85 250 C 82 190, 90 140, 102 95 L 55 45 L 66 45 L 106 85 L 138 35 L 148 35 L 116 95 C 108 145, 104 195, 106 250 Z" fill="#451a03" />
          <ellipse cx="62" cy="42" rx="75" ry="13" fill="url(#acaciaCanopy)" />
          <ellipse cx="135" cy="32" rx="90" ry="15" fill="url(#acaciaCanopy)" />
          <ellipse cx="135" cy="26" rx="74" ry="6" fill="#65a30d" opacity="0.6" />
        </g>

        <!-- FOREGROUND LUSH SAVANNA GRASSLANDS & ACACIA SHRUBBERY -->
        <path d="M -120 735 Q 280 680 680 745 T 1560 715 L 1560 920 L -120 920 Z" fill="url(#nearSavannaBank)" />
        <!-- Golden Grass Blades Along Foreground Ridge -->
        <path d="M 80 720 L 74 695 L 86 718 L 92 690 L 98 720 Z" fill="#eab308" opacity="0.75" />
        <path d="M 380 715 L 374 690 L 386 712 L 392 688 L 398 715 Z" fill="#eab308" opacity="0.75" />
        <path d="M 1220 725 L 1214 698 L 1226 722 L 1232 694 L 1238 725 Z" fill="#eab308" opacity="0.75" />
      </svg>

      <!-- 2. SOARING FLOCK OF SAVANNA BIRDS -->
      <div style="position: absolute; top: 14%; left: 0; width: 160px; height: 60px; pointer-events: none; opacity: 0.85; animation: birdFlockDrift 38s linear infinite;">
        <svg viewBox="0 0 160 60" style="width: 100%; height: 100%;">
          <path d="M 10 30 Q 20 18 30 30 Q 40 18 50 30" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round" />
          <path d="M 65 18 Q 73 8 81 18 Q 89 8 97 18" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" />
          <path d="M 105 38 Q 113 28 121 38 Q 129 28 137 38" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      </div>

      <!-- DYNAMIC PARTICLE LAYER FOR WATER DROPLETS & GOLDEN ACACIA LEAVES -->
      <div id="safari-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 3. GROUNDED MAIN SAFARI STAGE: CARVED BAOBAB TIMBER SIGNBOARD + RANGER LEO (LION GUIDE) -->
      <div style="position: absolute; bottom: 180px; left: 46%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 30px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- CARVED BAOBAB WOOD & TRIBAL SHIELD SIGNBOARD -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <!-- Main Carved Timber Plank Board -->
          <div id="safari-timber-board" style="position: relative; width: 400px; max-width: 55vw; min-height: 255px; background: radial-gradient(circle at 50% 45%, #92400e 0%, #78350f 62%, #451a03 100%); border: 6px solid #270e05; border-radius: 20px; box-shadow: 0 16px 32px rgba(41, 14, 4, 0.7), inset 0 3px 0 rgba(253, 224, 71, 0.45), inset 0 -6px 0 rgba(28, 10, 2, 0.85); padding: 26px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
            
            <!-- Carved Tribal Geometric Border Pattern Left & Right -->
            <svg viewBox="0 0 24 200" style="position: absolute; left: 10px; top: 24px; bottom: 24px; width: 20px; height: 80%; opacity: 0.75; pointer-events: none;">
              <polyline points="4,10 18,25 4,40 18,55 4,70 18,85 4,100 18,115 4,130 18,145 4,160 18,175 4,190" fill="none" stroke="#fde047" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg viewBox="0 0 24 200" style="position: absolute; right: 10px; top: 24px; bottom: 24px; width: 20px; height: 80%; opacity: 0.75; pointer-events: none;">
              <polyline points="20,10 6,25 20,40 6,55 20,70 6,85 20,100 6,115 20,130 6,145 20,160 6,175 20,190" fill="none" stroke="#fde047" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <!-- Hemp Rope Corner Lashings -->
            <div style="position: absolute; top: -6px; left: 26px; width: 24px; height: 14px; background: repeating-linear-gradient(90deg, #d97706, #d97706 4px, #92400e 4px, #92400e 8px); border: 2px solid #451a03; border-radius: 4px;"></div>
            <div style="position: absolute; top: -6px; right: 26px; width: 24px; height: 14px; background: repeating-linear-gradient(90deg, #d97706, #d97706 4px, #92400e 4px, #92400e 8px); border: 2px solid #451a03; border-radius: 4px;"></div>

            <!-- Top Safari Outpost Plaque -->
            <div style="position: absolute; top: -16px; background: linear-gradient(90deg, #3f6212, #65a30d, #3f6212); border: 3px solid #fde047; color: #fefce8; font-weight: 900; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 18px; border-radius: 999px; box-shadow: 0 4px 0 #1a2e05;">
              🦁 Savanna Safari Outpost
            </div>

            <!-- CARVED SUN-GOLD EQUATION READOUT ON BAOBAB WOOD -->
            <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
              <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', sans-serif; font-size: 3.9rem; font-weight: 900; color: #fef9c3; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 4px 0 #270e05, 0 0 14px rgba(254,240,138,0.4);">
                <div id="math-num1">15</div>
                <div style="display: flex; align-items: center; gap: 18px;">
                  <span id="math-op" style="color: #84cc16; font-size: 3.2rem; text-shadow: 0 4px 0 #1a2e05;">+</span>
                  <span id="math-num2">14</span>
                </div>
                <div style="width: 108%; height: 7px; background: #fde047; border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 3px 0 #270e05;"></div>
                <div id="math-question-mark" style="color: #fb923c; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 4px 0 #270e05;">??</div>
              </div>
            </div>
          </div>

          <!-- GROUNDED ACACIA LOG POSTS + SAVANNA ROCKS & GRASS TUFTS -->
          <div style="position: relative; width: 340px; height: 48px; margin-top: -8px; z-index: 1;">
            <!-- Ground Contact Shadow -->
            <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 360px; height: 28px; background: radial-gradient(ellipse at center, rgba(41, 14, 4, 0.78) 0%, rgba(41, 14, 4, 0.3) 58%, transparent 80%); border-radius: 50%;"></div>

            <!-- Left & Right Timber Support Logs -->
            <div style="position: absolute; left: 44px; top: 0; width: 26px; height: 44px; background: linear-gradient(90deg, #451a03, #78350f 45%, #270e05); border: 3px solid #1c0a02; border-radius: 5px;"></div>
            <div style="position: absolute; right: 44px; top: 0; width: 26px; height: 44px; background: linear-gradient(90deg, #451a03, #78350f 45%, #270e05); border: 3px solid #1c0a02; border-radius: 5px;"></div>

            <!-- Savanna Boulders & Grass Tufts Grounding the Posts -->
            <svg viewBox="0 0 340 52" style="position: absolute; bottom: -8px; left: 0; width: 100%; height: 52px; overflow: visible;">
              <ellipse cx="48" cy="40" rx="26" ry="12" fill="#57534e" stroke="#292524" stroke-width="2.5" />
              <ellipse cx="72" cy="43" rx="18" ry="9" fill="#78716c" stroke="#292524" stroke-width="2" />
              <path d="M 18 44 L 12 22 L 26 38 L 28 18 L 36 42 Z" fill="#65a30d" stroke="#1a2e05" stroke-width="1.8" />

              <ellipse cx="292" cy="40" rx="26" ry="12" fill="#57534e" stroke="#292524" stroke-width="2.5" />
              <ellipse cx="268" cy="43" rx="18" ry="9" fill="#78716c" stroke="#292524" stroke-width="2" />
              <path d="M 304 42 L 310 18 L 316 38 L 328 22 L 322 44 Z" fill="#65a30d" stroke="#1a2e05" stroke-width="1.8" />
            </svg>
          </div>
        </div>

        <!-- RANGER LEO — HIGH-DETAIL SAFARI LION GUIDE TEACHER -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -4px;">
          <!-- Speech Bubble -->
          <div id="safari-speech-bubble" style="background: #fefce8; color: #451a03; border: 3px solid #ca8a04; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #78350f, 0 8px 16px rgba(0,0,0,0.45); white-space: nowrap; transition: all 0.2s;">
            Solve it so the Elephant sprays the oasis! 🐘💦
          </div>

          <div style="position: relative; width: 215px; height: 245px; display: flex; justify-content: center; align-items: flex-end;">
            <!-- Ground Contact Shadow Under Lion Paws -->
            <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 185px; height: 28px; background: radial-gradient(ellipse at center, rgba(41, 14, 4, 0.8) 0%, rgba(41, 14, 4, 0.3) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>

            <div id="safari-lion-mascot" class="lion-ranger-idle" style="position: relative; width: 210px; height: 240px; z-index: 2; filter: drop-shadow(0 10px 16px rgba(41,14,4,0.55));">
              <svg viewBox="0 0 240 265" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <radialGradient id="lionManeGrad" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stop-color="#b45309" />
                    <stop offset="65%" stop-color="#78350f" />
                    <stop offset="100%" stop-color="#451a03" />
                  </radialGradient>

                  <radialGradient id="lionFurGold" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#fde047" />
                    <stop offset="55%" stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#b45309" />
                  </radialGradient>
                </defs>

                <!-- Swishing Tufted Lion Tail -->
                <g style="transform-origin: 155px 215px; animation: lionTailSwish 2.6s ease-in-out infinite;">
                  <path d="M 152 215 C 192 212, 214 182, 206 160" fill="none" stroke="#d97706" stroke-width="8" stroke-linecap="round" />
                  <path d="M 206 160 C 196 146, 214 136, 222 152 C 228 164, 212 170, 206 160 Z" fill="#451a03" stroke="#270e05" stroke-width="2" />
                </g>

                <!-- Planted Lion Hind Legs & Paws -->
                <ellipse cx="86" cy="242" rx="26" ry="15" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                <line x1="78" y1="246" x2="78" y2="254" stroke="#451a03" stroke-width="2.5" />
                <line x1="88" y1="246" x2="88" y2="255" stroke="#451a03" stroke-width="2.5" />
                <ellipse cx="154" cy="242" rx="26" ry="15" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                <line x1="146" y1="246" x2="146" y2="255" stroke="#451a03" stroke-width="2.5" />
                <line x1="156" y1="246" x2="156" y2="254" stroke="#451a03" stroke-width="2.5" />

                <!-- Lion Torso & Khaki Safari Ranger Vest -->
                <rect x="68" y="132" width="104" height="108" rx="42" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                <ellipse cx="120" cy="188" rx="30" ry="38" fill="#fef3c7" />

                <!-- Khaki Safari Ranger Utility Vest -->
                <path d="M 68 138 L 104 138 L 102 232 L 62 232 Z" fill="#d6d3d1" stroke="#57534e" stroke-width="2.8" stroke-linejoin="round" />
                <path d="M 136 138 L 172 138 L 178 232 L 138 232 Z" fill="#d6d3d1" stroke="#57534e" stroke-width="2.8" stroke-linejoin="round" />
                <!-- Red Ranger Neck Neckerchief -->
                <polygon points="88,132 152,132 120,158" fill="#dc2626" stroke="#7f1d1d" stroke-width="2.5" />
                <!-- Pocket & Golden Paw Badge -->
                <rect x="70" y="185" width="24" height="24" rx="4" fill="#a8a29e" stroke="#57534e" stroke-width="2" />
                <polygon points="156,162 160,170 168,170 162,175 164,183 156,178 148,183 150,175 144,170 152,170" fill="#fde047" stroke="#b45309" stroke-width="1.2" />

                <!-- Safari Binoculars Hanging Around Neck -->
                <path d="M 96 142 Q 120 175 144 142" fill="none" stroke="#292524" stroke-width="3" />
                <rect x="104" y="168" width="14" height="20" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
                <rect x="122" y="168" width="14" height="20" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
                <circle cx="111" cy="184" r="4.5" fill="#38bdf8" />
                <circle cx="129" cy="184" r="4.5" fill="#38bdf8" />

                <!-- Left Waving Lion Arm -->
                <g style="transform-origin: 68px 152px; animation: lionWaveArm 2.4s ease-in-out infinite;">
                  <ellipse cx="42" cy="156" rx="26" ry="15" transform="rotate(-20 42 156)" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                  <circle cx="24" cy="148" r="12" fill="#fde047" stroke="#451a03" stroke-width="2.5" />
                </g>

                <!-- Right Lion Arm -->
                <ellipse cx="196" cy="162" rx="26" ry="15" transform="rotate(22 196 162)" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                <circle cx="212" cy="170" r="12" fill="#fde047" stroke="#451a03" stroke-width="2.5" />

                <!-- ======================================================= -->
                <!-- SCULPTED LION MANE, FACE & SAFARI PITH HELMET           -->
                <!-- ======================================================= -->
                <!-- Full Scalloped Royal Lion Mane -->
                <path d="M 120 18 C 145 14, 168 26, 178 46 C 196 62, 198 88, 184 108 C 178 130, 154 146, 120 146 C 86 146, 62 130, 56 108 C 42 88, 44 62, 62 46 C 72 26, 95 14, 120 18 Z" fill="url(#lionManeGrad)" stroke="#270e05" stroke-width="3.5" />

                <!-- Rounded Lion Ears -->
                <circle cx="74" cy="48" r="14" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                <circle cx="74" cy="48" r="7" fill="#d97706" />
                <circle cx="166" cy="48" r="14" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />
                <circle cx="166" cy="48" r="7" fill="#d97706" />

                <!-- Lion Face -->
                <circle cx="120" cy="84" r="42" fill="url(#lionFurGold)" stroke="#451a03" stroke-width="3" />

                <!-- Expressive Golden-Amber Lion Eyes -->
                <ellipse cx="102" cy="78" rx="7" ry="8" fill="#270e05" />
                <circle cx="100" cy="75" r="2.8" fill="#ffffff" />
                <circle cx="104" cy="81" r="1.4" fill="#fde047" />

                <ellipse cx="138" cy="78" rx="7" ry="8" fill="#270e05" />
                <circle cx="136" cy="75" r="2.8" fill="#ffffff" />
                <circle cx="140" cy="81" r="1.4" fill="#fde047" />

                <!-- Sculpted Lion Muzzle, Whiskers & Nose -->
                <ellipse cx="108" cy="98" rx="15" ry="12" fill="#fef3c7" stroke="#451a03" stroke-width="2" />
                <ellipse cx="132" cy="98" rx="15" ry="12" fill="#fef3c7" stroke="#451a03" stroke-width="2" />
                <polygon points="108,88 132,88 120,100" fill="#9a3412" stroke="#451a03" stroke-width="2" stroke-linejoin="round" />
                <path d="M 106 108 Q 120 118 134 108" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round" />
                <!-- Whiskers -->
                <line x1="76" y1="95" x2="94" y2="97" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
                <line x1="74" y1="103" x2="94" y2="102" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
                <line x1="164" y1="95" x2="146" y2="97" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
                <line x1="166" y1="103" x2="146" y2="102" stroke="#451a03" stroke-width="2" stroke-linecap="round" />

                <!-- Classic Khaki Safari Pith Helmet on Top of Head -->
                <g transform="translate(0, -4)">
                  <ellipse cx="120" cy="42" rx="54" ry="11" fill="#e7e5e4" stroke="#57534e" stroke-width="3" />
                  <path d="M 80 40 C 80 10, 160 10, 160 40 Z" fill="#f5f5f4" stroke="#57534e" stroke-width="3" />
                  <!-- Leopard-Print Hat Band -->
                  <path d="M 81 34 Q 120 40 159 34 L 160 41 Q 120 47 80 41 Z" fill="#d97706" stroke="#451a03" stroke-width="2" />
                  <circle cx="98" cy="38" r="2.2" fill="#270e05" />
                  <circle cx="114" cy="40" r="2.5" fill="#270e05" />
                  <circle cx="130" cy="40" r="2.2" fill="#270e05" />
                  <circle cx="144" cy="38" r="2.2" fill="#270e05" />
                  <ellipse cx="120" cy="14" rx="10" ry="4" fill="#d6d3d1" stroke="#57534e" stroke-width="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- 4. ZEBRA-STRIPED SAFARI 4X4 JEEP DASHBOARD CONTROL DECK -->
      <div style="position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 24px rgba(28, 10, 2, 0.7));">
        <div style="background: linear-gradient(180deg, #451a03 0%, #270e05 100%); border: 4px solid #ca8a04; border-radius: 16px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; position: relative; overflow: hidden; box-shadow: inset 0 2px 0 rgba(254, 240, 138, 0.35);">
          
          <!-- Subtle Zebra-Stripe Safari Accent Along Left Edge -->
          <div style="position: absolute; top: 0; bottom: 0; left: 0; width: 14px; background: repeating-linear-gradient(45deg, #f8fafc, #f8fafc 6px, #0f172a 6px, #0f172a 12px);"></div>

          <!-- Jeep Radio Status Readout -->
          <div style="display: flex; flex-direction: column; min-width: 155px; padding-left: 8px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #fde047; letter-spacing: 0.14em; text-transform: uppercase;">🚙 SAFARI JEEP RADIO</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #fefce8; letter-spacing: 0.06em;">OASIS HERD: PEACEFUL</span>
          </div>

          <!-- Answer Number Input -->
          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.95rem; font-weight: 900; color: #270e05; background: #fefce8; border: 3px solid #eab308; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.25), 0 0 12px rgba(250,204,21,0.4);" />

          <!-- Clean "Submit" Button -->
          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #84cc16 0%, #4d7c0f 100%); color: #fefce8; font-weight: 900; font-size: 1.08rem; border: 2px solid #ecfccb; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 0 4px 12px rgba(0,0,0,0.45); transition: transform 0.1s;">
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

function triggerOasisWaterEruption() {
  const geyser = document.getElementById("water-geyser-group");
  const particleHost = document.getElementById("safari-eruption-particles");

  if (geyser) {
    geyser.classList.remove("erupting");
    void geyser.offsetWidth;
    geyser.classList.add("erupting");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#38bdf8", "#bae6fd", "#ffffff", "#fde047", "#84cc16", "#f97316"];

  for (let i = 0; i < 36; i++) {
    const p = document.createElement("div");
    const isWaterDrop = i < 22;
    const color = isWaterDrop ? colors[i % 3] : colors[3 + (i % 3)];
    const tx = (Math.random() - 0.5) * 540 + "px";
    const ty = -(130 + Math.random() * 340) + "px";
    const rot = (Math.random() * 540 - 270) + "deg";

    p.style.cssText = `
      position: absolute;
      left: 66%;
      top: 52%;
      width: ${isWaterDrop ? 12 + Math.random() * 12 : 16}px;
      height: ${isWaterDrop ? 12 + Math.random() * 12 : 9}px;
      border-radius: ${isWaterDrop ? "50%" : "50% 0 50% 0"};
      background: ${color};
      box-shadow: 0 3px 10px rgba(0,0,0,0.35);
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: safariParticleArc ${1.1 + Math.random() * 0.5}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const lion = document.getElementById("safari-lion-mascot");
  const speech = document.getElementById("safari-speech-bubble");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerOasisWaterEruption();

      if (lion) {
        lion.classList.remove("lion-ranger-party", "lion-ranger-oops");
        void lion.offsetWidth;
        lion.classList.add("lion-ranger-party");
      }
      if (speech) {
        speech.textContent = "ROAAAR! ELEPHANT SPLASH!! 🦁🐘💦";
        speech.style.borderColor = "#84cc16";
      }

      setStatus("🐘 OASIS GEYSER BLAST!!");
      input.style.borderColor = "#84cc16";

      setTimeout(() => {
        input.style.borderColor = "#eab308";
        input.value = "";
        setStatus("OASIS HERD: PEACEFUL");
        if (speech) {
          speech.textContent = "Awesome tracking! Next problem! 🧭";
          speech.style.borderColor = "#ca8a04";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (lion) {
        lion.classList.remove("lion-ranger-party", "lion-ranger-oops");
        void lion.offsetWidth;
        lion.classList.add("lion-ranger-oops");
      }
      if (speech) {
        speech.textContent = "Lost the trail! Try that math again! 🐾";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("COMPASS OFF! TRY AGAIN");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#eab308";
        input.value = "";
        setStatus("OASIS HERD: PEACEFUL");
        if (speech) {
          speech.textContent = "You got this, ranger! 🦁";
          speech.style.borderColor = "#ca8a04";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
