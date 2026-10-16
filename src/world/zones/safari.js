// src/world/zones/safari.js - Ultra-Polished Golden-Hour Serengeti Safari Biome
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
      50% { transform: rotate(3.8deg); }
    }
    @keyframes giraffeNeckSway2 {
      0%, 100% { transform: rotate(1.5deg); }
      50% { transform: rotate(-3.2deg); }
    }
    @keyframes elephantTrunkIdle {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-7deg); }
    }
    @keyframes elephantEarFlap {
      0%, 100% { transform: scaleX(1) rotate(0deg); }
      50% { transform: scaleX(0.84) rotate(-3deg); }
    }
    @keyframes zebraTailFlick {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(14deg); }
    }
    @keyframes hippoBob {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(3.5px); }
    }
    @keyframes waterRipplePulse {
      0%, 100% { transform: scaleX(1); opacity: 0.45; }
      50% { transform: scaleX(1.14); opacity: 0.85; }
    }
    @keyframes birdFlockDrift {
      0% { transform: translateX(-180px) translateY(10px); }
      50% { transform: translateX(50vw) translateY(-18px); }
      100% { transform: translateX(115vw) translateY(6px); }
    }
    @keyframes lionBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(2px) scaleY(0.986) scaleX(1.014); }
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
    @keyframes smoothGeyserErupt {
      0% { transform: scaleY(0) scaleX(0.45); opacity: 0; }
      14% { transform: scaleY(1.05) scaleX(1.05); opacity: 1; }
      38% { transform: scaleY(0.97) scaleX(0.96); opacity: 1; }
      65% { transform: scaleY(1.08) scaleX(1.04); opacity: 0.98; }
      86% { transform: scaleY(0.55) scaleX(1.18); opacity: 0.7; }
      100% { transform: scaleY(0) scaleX(1.3); opacity: 0; }
    }
    @keyframes rainbowMistFade {
      0% { opacity: 0; transform: scale(0.82); }
      25% { opacity: 0.92; transform: scale(1); }
      75% { opacity: 0.88; transform: scale(1.04); }
      100% { opacity: 0; transform: scale(1.1); }
    }
    @keyframes safariParticleArc {
      0% { transform: translate(0, 0) scale(0.35) rotate(0deg); opacity: 0.95; }
      55% { opacity: 0.95; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.15) rotate(var(--rot)); opacity: 0; }
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
    #water-geyser-stream {
      transform-origin: 902px 440px;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    #water-geyser-stream.erupting {
      animation: smoothGeyserErupt 1.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    #rainbow-mist-halo {
      transform-origin: 960px 380px;
      opacity: 0;
      pointer-events: none;
    }
    #rainbow-mist-halo.erupting {
      animation: rainbowMistFade 1.85s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="safari-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #5c1d0c 0%, #9a3412 18%, #ea580c 38%, #f59e0b 62%, #fef08a 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN SERENGETI SAVANNA & HIGH-DETAIL WILDLIFE SVG LANDSCAPE -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Blazing Serengeti Sunset Sun & Volumetric Glow -->
          <radialGradient id="savannaSunGlow" cx="62%" cy="26%" r="48%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
            <stop offset="16%" stop-color="#fef08a" stop-opacity="0.92" />
            <stop offset="42%" stop-color="#f97316" stop-opacity="0.58" />
            <stop offset="78%" stop-color="#9a3412" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#5c1d0c" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="sunDiscGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="45%" stop-color="#fef08a" />
            <stop offset="100%" stop-color="#f97316" />
          </linearGradient>

          <!-- Distant Kilimanjaro / Savanna Mesa Mountains -->
          <linearGradient id="mesaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#6c2410" />
            <stop offset="55%" stop-color="#9a3412" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>

          <!-- Layered Savanna Grass Hills -->
          <linearGradient id="farSavannaHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#b45309" />
          </linearGradient>

          <linearGradient id="midSavannaStage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#d97706" />
            <stop offset="48%" stop-color="#b45309" />
            <stop offset="100%" stop-color="#78350f" />
          </linearGradient>

          <linearGradient id="nearSavannaBank" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#65a30d" />
            <stop offset="45%" stop-color="#3f6212" />
            <stop offset="100%" stop-color="#1a2e05" />
          </linearGradient>

          <!-- Oasis Watering Hole Lagoon -->
          <linearGradient id="oasisWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7dd3fc" />
            <stop offset="32%" stop-color="#0ea5e9" />
            <stop offset="72%" stop-color="#0369a1" />
            <stop offset="100%" stop-color="#082f49" />
          </linearGradient>

          <!-- Silky Pressurized Water Geyser Gradient -->
          <linearGradient id="waterGeyserGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9" />
            <stop offset="30%" stop-color="#38bdf8" stop-opacity="0.95" />
            <stop offset="70%" stop-color="#bae6fd" stop-opacity="0.98" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />
          </linearGradient>

          <!-- Soft Optical Blur for Smooth Rainbow Water Mist -->
          <filter id="rainbowMistBlur" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter id="waterSprayBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <!-- Fade Mask so Rainbow Arc Blends Seamlessly Into Sky & Lagoon -->
          <linearGradient id="rainbowFadeMaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="65%" stop-color="#ffffff" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <mask id="rainbowArcMask">
            <rect x="680" y="60" width="560" height="440" fill="url(#rainbowFadeMaskGrad)" />
          </mask>

          <!-- Multi-Layered Lush Acacia Canopy Gradients -->
          <linearGradient id="acaciaShadowFoliage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a2e05" />
            <stop offset="100%" stop-color="#091102" />
          </linearGradient>

          <linearGradient id="acaciaMidFoliage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4d7c0f" />
            <stop offset="65%" stop-color="#365314" />
            <stop offset="100%" stop-color="#1a2e05" />
          </linearGradient>

          <linearGradient id="acaciaSunlitCrown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#bef264" />
            <stop offset="55%" stop-color="#84cc16" />
            <stop offset="100%" stop-color="#4d7c0f" />
          </linearGradient>

          <linearGradient id="acaciaBarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#270e05" />
            <stop offset="40%" stop-color="#5c2814" />
            <stop offset="75%" stop-color="#3e190b" />
            <stop offset="100%" stop-color="#1c0a02" />
          </linearGradient>

          <!-- Elephant Sculpted Hide Gradients -->
          <radialGradient id="elephantHideGrad" cx="38%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#94a3b8" />
            <stop offset="50%" stop-color="#64748b" />
            <stop offset="85%" stop-color="#475569" />
            <stop offset="100%" stop-color="#1e293b" />
          </radialGradient>

          <!-- Giraffe Golden Coat Gradient -->
          <linearGradient id="giraffeCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="45%" stop-color="#fbbf24" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
        </defs>

        <!-- Blazing Sunset Sky & Giant African Sun Disc -->
        <rect width="1440" height="900" fill="url(#savannaSunGlow)" />
        <circle cx="885" cy="245" r="138" fill="url(#sunDiscGrad)" opacity="0.94" filter="drop-shadow(0 0 55px rgba(254,240,138,0.85))" />

        <!-- Layered Sunset Stratocumulus Clouds -->
        <g opacity="0.42">
          <path d="M 80 120 Q 160 98 250 112 Q 340 96 410 120 Z" fill="#fde047" />
          <path d="M 140 135 Q 220 122 310 135 Z" fill="#fed7aa" />
          <path d="M 960 95 Q 1080 72 1210 90 Q 1310 78 1390 100 Z" fill="#fde047" />
          <path d="M 1040 114 Q 1160 100 1290 114 Z" fill="#fed7aa" />
        </g>

        <!-- Distant Snow-Capped Mount Kilimanjaro & Terraced Mesas -->
        <path d="M -50 465 L 165 292 L 315 292 L 545 465 Z" fill="url(#mesaGrad)" opacity="0.72" />
        <path d="M 165 292 L 315 292 L 348 328 L 295 318 L 265 332 L 220 316 L 185 330 L 138 322 Z" fill="#fef3c7" opacity="0.7" />
        <path d="M 450 465 L 665 348 L 815 348 L 1045 465 Z" fill="url(#mesaGrad)" opacity="0.48" />

        <!-- FAR GOLDEN SAVANNA HORIZON HILLS -->
        <path d="M -80 465 Q 280 388 680 448 T 1520 432 L 1520 900 L -80 900 Z" fill="url(#farSavannaHill)" />

        <!-- ========================================================================= -->
        <!-- LUSH FULL ACACIA TREE #1 (Left Horizon — Multi-Tiered Billowy Canopy)     -->
        <!-- ========================================================================= -->
        <g transform="translate(75, 155)" filter="drop-shadow(0 12px 18px rgba(41,14,4,0.38))">
          <!-- Ground Root Shadow -->
          <ellipse cx="145" cy="312" rx="75" ry="11" fill="rgba(69,26,3,0.45)" />

          <!-- Deep Shadow Under-Canopy Layer -->
          <g fill="url(#acaciaShadowFoliage)">
            <ellipse cx="62" cy="112" rx="78" ry="18" />
            <ellipse cx="155" cy="86" rx="115" ry="22" />
            <ellipse cx="248" cy="116" rx="82" ry="18" />
            <ellipse cx="105" cy="98" rx="85" ry="20" />
            <ellipse cx="205" cy="100" rx="88" ry="20" />
          </g>

          <!-- Gnarled Buttressed Trunk & Interlocking Boughs -->
          <path d="M 118 312 C 126 265, 132 215, 130 168 C 102 142, 72 124, 38 108 L 52 102 C 84 116, 112 132, 134 152 C 136 122, 118 98, 88 82 L 104 78 C 128 94, 142 116, 145 142 C 152 112, 168 90, 194 76 L 208 80 C 180 96, 162 118, 154 148 C 182 130, 214 116, 254 106 L 264 112 C 220 124, 184 142, 154 170 C 154 218, 162 268, 176 312 Z" fill="url(#acaciaBarkGrad)" />
          <!-- Bark Crease Highlights -->
          <path d="M 136 305 Q 142 230 138 165 M 152 305 Q 148 235 152 172" fill="none" stroke="#92400e" stroke-width="2" opacity="0.6" />

          <!-- Lush Mid-Tone Billowy Foliage Clusters -->
          <g fill="url(#acaciaMidFoliage)">
            <ellipse cx="55" cy="102" rx="76" ry="18" />
            <circle cx="18" cy="102" r="16" />
            <circle cx="92" cy="98" r="18" />
            <ellipse cx="252" cy="106" rx="78" ry="17" />
            <circle cx="215" cy="104" r="17" />
            <circle cx="295" cy="108" r="15" />
            <ellipse cx="152" cy="74" rx="118" ry="24" />
            <circle cx="78" cy="76" r="20" />
            <circle cx="122" cy="66" r="24" />
            <circle cx="178" cy="66" r="24" />
            <circle cx="226" cy="76" r="20" />
          </g>

          <!-- Sun-Kissed Golden-Lime Top Crown Highlights -->
          <g fill="url(#acaciaSunlitCrown)">
            <ellipse cx="52" cy="94" rx="58" ry="9" />
            <ellipse cx="152" cy="62" rx="96" ry="12" />
            <ellipse cx="125" cy="58" rx="48" ry="10" />
            <ellipse cx="182" cy="59" rx="46" ry="10" />
            <ellipse cx="252" cy="98" rx="60" ry="9" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- WILDLIFE GROUP #1: ANATOMICALLY DETAILED RETICULATED GIRAFFES (LEFT)      -->
        <!-- ========================================================================= -->
        <g transform="translate(245, 305)">
          <!-- Ground Shadow -->
          <ellipse cx="48" cy="168" rx="42" ry="9" fill="rgba(69,26,3,0.48)" />

          <!-- Back Pair of Legs (Darker Shaded) -->
          <path d="M 30 98 L 28 132 L 25 166 L 31 166 L 35 132 L 38 98 Z" fill="#b45309" stroke="#451a03" stroke-width="1.8" />
          <path d="M 62 100 L 66 134 L 68 166 L 74 166 L 73 134 L 70 100 Z" fill="#b45309" stroke="#451a03" stroke-width="1.8" />

          <!-- Front Pair of Legs with Articulated Knee Joints & Dark Hooves -->
          <path d="M 18 96 L 14 132 L 12 166 L 19 166 L 22 132 L 28 96 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="1.8" />
          <circle cx="18" cy="132" r="3.8" fill="#d97706" />
          <rect x="11" y="162" width="9" height="5" rx="1.5" fill="#270e05" />

          <path d="M 52 98 L 54 134 L 52 166 L 59 166 L 61 134 L 62 98 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="1.8" />
          <circle cx="57" cy="134" r="3.8" fill="#d97706" />
          <rect x="51" y="162" width="9" height="5" rx="1.5" fill="#270e05" />

          <!-- Sculpted Sloping Giraffe Torso & Hindquarters -->
          <path d="M 14 82 C 14 62, 38 64, 68 80 C 78 88, 76 104, 60 106 C 42 108, 16 102, 14 82 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2.2" />
          <!-- Polygonal Reticulated Giraffe Patches on Body -->
          <polygon points="24,74 36,72 38,83 26,85" fill="#92400e" />
          <polygon points="42,75 54,78 52,89 40,86" fill="#78350f" />
          <polygon points="22,88 35,88 33,98 20,96" fill="#78350f" />
          <polygon points="39,90 50,92 48,101 37,99" fill="#92400e" />
          <polygon points="56,84 68,87 65,98 54,95" fill="#92400e" />

          <!-- Long Tufted Tail -->
          <path d="M 72 86 Q 82 110 78 134" fill="none" stroke="#92400e" stroke-width="2.8" />
          <path d="M 78 132 C 74 140, 80 146, 83 138 Z" fill="#270e05" />

          <!-- Animated Swaying Neck, Mane & Sculpted Head -->
          <g style="transform-origin: 24px 78px; animation: giraffeNeckSway 4.2s ease-in-out infinite;">
            <!-- Bristled Dorsal Neck Mane -->
            <path d="M 32 74 L 6 -12 L 12 -14 L 38 72 Z" fill="#78350f" />
            <!-- Tapering Muscular Neck -->
            <path d="M 14 80 L -6 -12 L 8 -14 L 32 76 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2.2" />
            <!-- Polygonal Neck Patches -->
            <polygon points="14,62 24,60 22,72 12,70" fill="#92400e" />
            <polygon points="9,44 19,42 17,54 7,52" fill="#78350f" />
            <polygon points="4,26 14,25 12,36 2,35" fill="#92400e" />
            <polygon points="-1,8 8,7 7,18 -2,17" fill="#78350f" />
            <polygon points="-4,-6 4,-6 3,3 -5,2" fill="#92400e" />

            <!-- Sculpted Giraffe Head, Snout, Ears & Ossicones -->
            <path d="M 8 -16 C 8 -24, -4 -25, -12 -19 C -22 -14, -26 -10, -22 -5 C -16 -2, -4 -4, 6 -9 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2" />
            <!-- Leaf-Shaped Ears -->
            <path d="M 6 -18 C 14 -24, 18 -16, 8 -12 Z" fill="#fbbf24" stroke="#451a03" stroke-width="1.5" />
            <!-- Pair of Tufted Ossicones (Horns) -->
            <line x1="-1" y1="-21" x2="-3" y2="-32" stroke="#92400e" stroke-width="2.8" />
            <circle cx="-3" cy="-33" r="3.5" fill="#270e05" />
            <line x1="4" y1="-20" x2="4" y2="-30" stroke="#92400e" stroke-width="2.5" />
            <circle cx="4" cy="-31" r="3" fill="#270e05" />
            <!-- Expressive Dark Eye & Nostril -->
            <circle cx="-6" cy="-14" r="2.6" fill="#0f172a" />
            <circle cx="-7" cy="-15" r="0.9" fill="#ffffff" />
            <ellipse cx="-18" cy="-9" rx="2" ry="1.2" fill="#451a03" />
          </g>

          <!-- Juvenile Giraffe Beside Adult -->
          <g transform="translate(76, 40) scale(0.74)">
            <ellipse cx="38" cy="168" rx="34" ry="8" fill="rgba(69,26,3,0.4)" />
            <path d="M 20 96 L 16 166 L 23 166 L 28 96 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2" />
            <path d="M 30 98 L 28 166 L 34 166 L 38 98 Z" fill="#b45309" stroke="#451a03" stroke-width="1.8" />
            <path d="M 52 98 L 54 166 L 61 166 L 60 98 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2" />
            <path d="M 16 82 C 16 64, 40 66, 64 82 C 70 92, 64 104, 48 104 C 30 104, 16 98, 16 82 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2.2" />
            <polygon points="26,76 38,75 36,86 24,86" fill="#92400e" />
            <polygon points="42,80 54,82 52,93 40,91" fill="#78350f" />
            <g style="transform-origin: 24px 78px; animation: giraffeNeckSway2 3.6s ease-in-out infinite;">
              <path d="M 16 80 L 0 2 L 12 0 L 30 76 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2.2" />
              <polygon points="12,52 21,50 19,62 10,60" fill="#92400e" />
              <polygon points="7,28 16,26 14,38 5,36" fill="#78350f" />
              <path d="M 12 -2 C 12 -10, 0 -10, -8 -5 C -16 -1, -18 4, -12 7 C -6 9, 4 7, 10 2 Z" fill="url(#giraffeCoatGrad)" stroke="#451a03" stroke-width="2" />
              <line x1="3" y1="-6" x2="2" y2="-15" stroke="#92400e" stroke-width="2.5" />
              <circle cx="2" cy="-16" r="3" fill="#270e05" />
              <circle cx="-2" cy="0" r="2.5" fill="#0f172a" />
            </g>
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- WILDLIFE GROUP #2: DETAILED GRAZING ZEBRA PAIR ON THE RIDGE               -->
        <!-- ========================================================================= -->
        <g transform="translate(535, 398) scale(0.84)">
          <!-- Lead Zebra -->
          <ellipse cx="42" cy="76" rx="32" ry="6" fill="rgba(69,26,3,0.45)" />
          <!-- Back Legs -->
          <path d="M 24 46 L 22 75 L 27 75 L 30 46 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.8" />
          <path d="M 56 46 L 60 75 L 65 75 L 62 46 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.8" />
          <!-- Front Legs -->
          <path d="M 16 45 L 12 75 L 18 75 L 22 45 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
          <path d="M 48 46 L 50 75 L 56 75 L 55 46 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
          <!-- Sculpted Equine Body, Neck & Head -->
          <path d="M 12 36 C 12 22, 34 22, 58 26 C 68 28, 70 44, 58 48 C 42 50, 14 48, 12 36 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
          <!-- Upright Striped Mane -->
          <path d="M 8 8 L 22 24 L 27 22 L 13 4 Z" fill="#0f172a" />
          <!-- Neck & Muzzle -->
          <path d="M 12 34 L 2 10 L 12 6 L 26 26 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
          <path d="M 12 6 C 6 2, -6 8, -10 14 C -12 18, -6 21, 0 18 L 10 14 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
          <!-- Dark Zebra Muzzle Tip -->
          <path d="M -6 11 C -11 14, -11 18, -5 19 L -1 17 L -2 11 Z" fill="#0f172a" />
          <!-- Contoured Zebra Stripes -->
          <path d="M 6 12 L 15 14 M 9 18 L 20 20 M 12 24 L 24 25 M 18 24 L 16 46 M 25 23 L 24 48 M 32 24 L 32 48 M 39 24 L 40 48 M 46 25 Q 54 34 48 48 M 53 26 Q 62 34 56 47" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
          <!-- Flicking Zebra Tail -->
          <g style="transform-origin: 65px 30px; animation: zebraTailFlick 2.2s ease-in-out infinite;">
            <path d="M 65 30 Q 76 42 72 56" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
          </g>

          <!-- Second Grazing Zebra (Head Bowed Eating Grass) -->
          <g transform="translate(78, 12) scale(0.86)">
            <ellipse cx="38" cy="74" rx="28" ry="5" fill="rgba(69,26,3,0.4)" />
            <path d="M 18 44 L 16 73 L 22 73 L 24 44 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
            <path d="M 50 44 L 52 73 L 58 73 L 56 44 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
            <path d="M 14 34 C 14 20, 36 20, 58 24 C 66 26, 68 42, 56 46 C 40 48, 14 46, 14 34 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
            <!-- Bowed Grazing Neck & Head -->
            <path d="M 16 30 L -4 52 L 4 58 L 24 38 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
            <ellipse cx="-6" cy="57" rx="8" ry="4.5" transform="rotate(-25 -6 57)" fill="#0f172a" />
            <path d="M 20 23 L 18 45 M 28 22 L 27 46 M 36 22 L 36 46 M 44 23 L 45 46 M 52 24 Q 60 32 54 45 M 14 34 L 20 40 M 8 40 L 14 46" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
          </g>
        </g>

        <!-- MIDGROUND SAVANNA STAGE PLATEAU -->
        <path d="M -100 520 Q 340 455 760 515 T 1540 495 L 1540 900 L -100 900 Z" fill="url(#midSavannaStage)" />

        <!-- ========================================================================= -->
        <!-- SHIMMERING SAVANNA OASIS WATERING HOLE + DETAILED HIPPO & FLAMINGOS       -->
        <!-- ========================================================================= -->
        <g>
          <!-- Sandy Oasis Shoreline & Mud Bank -->
          <ellipse cx="1065" cy="576" rx="355" ry="82" fill="#fde68a" opacity="0.82" />
          <ellipse cx="1072" cy="578" rx="335" ry="72" fill="#d97706" opacity="0.45" />
          <!-- Turquoise Lagoon Water -->
          <ellipse cx="1075" cy="580" rx="322" ry="66" fill="url(#oasisWaterGrad)" stroke="#bae6fd" stroke-width="3" />

          <!-- Animated Water Shimmer Ripples -->
          <ellipse cx="965" cy="565" rx="68" ry="5.5" fill="#bae6fd" style="transform-origin:965px 565px;animation:waterRipplePulse 3.2s ease-in-out infinite;" />
          <ellipse cx="1145" cy="602" rx="88" ry="6.5" fill="#7dd3fc" style="transform-origin:1145px 602px;animation:waterRipplePulse 4s ease-in-out 1s infinite;" />
          <ellipse cx="865" cy="588" rx="48" ry="4.5" fill="#e0f2fe" style="transform-origin:865px 588px;animation:waterRipplePulse 2.8s ease-in-out 0.5s infinite;" />

          <!-- Oasis Reeds, Cattails & Lily Pads -->
          <g transform="translate(765, 535)">
            <path d="M 10 42 Q 4 12 -2 -4 M 16 42 Q 16 8 18 -10 M 22 42 Q 28 15 34 0" fill="none" stroke="#3f6212" stroke-width="3" stroke-linecap="round" />
            <rect x="15" y="-6" width="5" height="16" rx="2.5" fill="#451a03" />
            <ellipse cx="48" cy="40" rx="14" ry="5" fill="#65a30d" stroke="#365314" stroke-width="1.5" />
            <ellipse cx="72" cy="46" rx="11" ry="4" fill="#84cc16" stroke="#365314" stroke-width="1.5" />
          </g>

          <!-- DETAILED SUBMERGED RIVER HIPPO -->
          <g style="animation: hippoBob 3.4s ease-in-out infinite;" transform="translate(1145, 556)">
            <!-- Water Line Ring Around Hippo -->
            <ellipse cx="8" cy="20" rx="58" ry="9" fill="#bae6fd" opacity="0.65" />
            <!-- Sculpted Hippo Back, Neck & Brow -->
            <path d="M -46 18 C -44 -8, -4 -10, 12 18 Z" fill="#475569" stroke="#1e293b" stroke-width="2.2" />
            <path d="M 0 18 C 2 -14, 28 -16, 34 18 Z" fill="#64748b" stroke="#1e293b" stroke-width="2.2" />
            <!-- Bulbous Hippo Snout & Jowls -->
            <path d="M 24 18 C 22 -6, 56 -6, 56 18 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="2.2" />
            <ellipse cx="42" cy="12" rx="14" ry="7" fill="#fda4af" opacity="0.45" />
            <!-- Rounded Hippo Ears -->
            <ellipse cx="10" cy="-10" rx="4" ry="6" transform="rotate(-15 10 -10)" fill="#475569" stroke="#1e293b" stroke-width="2" />
            <ellipse cx="22" cy="-11" rx="4" ry="6" transform="rotate(12 22 -11)" fill="#475569" stroke="#1e293b" stroke-width="2" />
            <!-- Raised Brow Ridge & Eyes -->
            <circle cx="18" cy="-3" r="5" fill="#475569" />
            <circle cx="19" cy="-3" r="3" fill="#0f172a" />
            <circle cx="18" cy="-4" r="1.1" fill="#ffffff" />
            <!-- Flared Nostrils & Water Bubbles -->
            <ellipse cx="38" cy="5" rx="3" ry="2" transform="rotate(-15 38 5)" fill="#1e293b" />
            <ellipse cx="47" cy="5" rx="3" ry="2" transform="rotate(15 47 5)" fill="#1e293b" />
            <circle cx="38" cy="-2" r="2.5" fill="#e0f2fe" opacity="0.85" />
            <circle cx="45" cy="-6" r="1.8" fill="#ffffff" opacity="0.85" />
          </g>

          <!-- PAIR OF DETAILED PINK FLAMINGOS IN THE SHALLOWS -->
          <g transform="translate(1285, 502)">
            <!-- Flamingo #1 (Standing on One Leg) -->
            <ellipse cx="0" cy="70" rx="18" ry="4" fill="rgba(255,255,255,0.65)" />
            <line x1="0" y1="30" x2="0" y2="69" stroke="#fb7185" stroke-width="2.6" />
            <polyline points="0,46 -12,52 0,56" fill="none" stroke="#fb7185" stroke-width="2.4" stroke-linejoin="round" />
            <circle cx="0" cy="48" r="2.5" fill="#f43f5e" />
            <!-- Layered Wing Feathers & Tail Plumage -->
            <path d="M -18 26 C -18 14, 14 14, 22 30 C 12 36, -12 36, -18 26 Z" fill="#fb7185" stroke="#be123c" stroke-width="2" />
            <path d="M -10 24 C -4 18, 10 20, 15 28 C 6 32, -6 30, -10 24 Z" fill="#f43f5e" />
            <!-- Graceful S-Curved Neck & Two-Tone Hooked Beak -->
            <path d="M -13 24 C -26 12, -10 -14, -22 -18" fill="none" stroke="#fb7185" stroke-width="5.5" stroke-linecap="round" />
            <circle cx="-23" cy="-18" r="5.5" fill="#fb7185" stroke="#be123c" stroke-width="1.5" />
            <path d="M -27 -19 C -34 -18, -36 -11, -31 -10 L -26 -14 Z" fill="#0f172a" />
            <path d="M -26 -18 L -31 -16 L -26 -14 Z" fill="#fce7f3" />
            <circle cx="-24" cy="-19" r="1.4" fill="#fef08a" />

            <!-- Flamingo #2 (Wading Beside) -->
            <g transform="translate(46, 14) scale(0.85)">
              <ellipse cx="0" cy="68" rx="16" ry="4" fill="rgba(255,255,255,0.55)" />
              <line x1="-3" y1="30" x2="-5" y2="67" stroke="#fb7185" stroke-width="2.5" />
              <line x1="4" y1="30" x2="7" y2="67" stroke="#f43f5e" stroke-width="2.5" />
              <path d="M -16 26 C -16 14, 14 14, 20 30 C 10 35, -10 35, -16 26 Z" fill="#fb7185" stroke="#be123c" stroke-width="2" />
              <path d="M -12 24 C -24 14, -12 -8, -22 -12" fill="none" stroke="#fb7185" stroke-width="5.5" stroke-linecap="round" />
              <circle cx="-23" cy="-12" r="5.5" fill="#fb7185" stroke="#be123c" stroke-width="1.5" />
              <path d="M -27 -13 C -33 -12, -35 -6, -30 -5 L -26 -9 Z" fill="#0f172a" />
            </g>
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- SMOOTH REFRACTED RAINBOW MIST + FLUID WATER GEYSER (ON CORRECT ANSWER!)   -->
        <!-- ========================================================================= -->
        <!-- 1. Soft Blurred Prismatic Rainbow Mist Arc -->
        <g id="rainbow-mist-halo" mask="url(#rainbowArcMask)">
          <g filter="url(#rainbowMistBlur)" opacity="0.82" fill="none" stroke-linecap="round">
            <path d="M 730 475 A 225 225 0 0 1 1180 475" stroke="#ef4444" stroke-width="14" />
            <path d="M 742 475 A 213 213 0 0 1 1168 475" stroke="#f97316" stroke-width="14" />
            <path d="M 754 475 A 201 201 0 0 1 1156 475" stroke="#fde047" stroke-width="14" />
            <path d="M 766 475 A 189 189 0 0 1 1144 475" stroke="#4ade80" stroke-width="14" />
            <path d="M 778 475 A 177 177 0 0 1 1132 475" stroke="#38bdf8" stroke-width="14" />
            <path d="M 790 475 A 165 165 0 0 1 1120 475" stroke="#a855f7" stroke-width="14" />
          </g>
          <!-- Fine Shimmering Mist Veil -->
          <ellipse cx="955" cy="275" rx="185" ry="130" fill="#ffffff" opacity="0.18" filter="url(#rainbowMistBlur)" />
        </g>

        <!-- 2. Silky Multi-Layered Pressurized Water Plume -->
        <g id="water-geyser-stream">
          <!-- Outer Soft Mist Spray Halo -->
          <path d="M 885 440 C 885 280, 825 140, 745 85 C 835 35, 970 35, 1060 85 C 980 140, 920 280, 920 440 Z" fill="#bae6fd" opacity="0.55" filter="url(#waterSprayBlur)" />

          <!-- Core Pressurized Water Jet -->
          <path d="M 892 440 C 894 290, 850 150, 785 95 C 855 52, 950 52, 1020 95 C 955 150, 910 290, 912 440 Z" fill="url(#waterGeyserGrad)" />

          <!--Cascading Parabolic Water Ribbons Left & Right -->
          <path d="M 902 420 C 895 250, 835 120, 755 110 C 720 106, 700 145, 715 190" fill="none" stroke="#e0f2fe" stroke-width="7" stroke-linecap="round" opacity="0.85" />
          <path d="M 902 420 C 910 250, 970 120, 1050 110 C 1085 106, 1105 145, 1090 190" fill="none" stroke="#e0f2fe" stroke-width="7" stroke-linecap="round" opacity="0.85" />
          <path d="M 902 380 C 898 220, 865 95, 815 72" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.95" />
          <path d="M 902 380 C 906 220, 940 95, 990 72" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.95" />

          <!-- Base Splash Foam Ring on the Lagoon -->
          <ellipse cx="902" cy="442" rx="46" ry="12" fill="#ffffff" opacity="0.85" filter="url(#waterSprayBlur)" />
        </g>

        <!-- ========================================================================= -->
        <!-- SCULPTED AFRICAN BULL ELEPHANT BY THE WATERING HOLE                       -->
        <!-- ========================================================================= -->
        <g transform="translate(905, 398)" filter="drop-shadow(0 10px 16px rgba(12,74,110,0.4))">
          <!-- Ground/Water Shadow -->
          <ellipse cx="92" cy="126" rx="76" ry="14" fill="rgba(8,47,73,0.48)" />

          <!-- Far Side Legs (Darker Slate) -->
          <path d="M 42 74 L 38 122 L 58 122 L 60 74 Z" fill="#334155" stroke="#0f172a" stroke-width="2.2" />
          <path d="M 110 74 L 108 122 L 128 122 L 126 74 Z" fill="#334155" stroke="#0f172a" stroke-width="2.2" />

          <!-- Near Side Pillar Legs with Toenails & Knee Wrinkles -->
          <path d="M 56 76 L 52 124 L 74 124 L 76 76 Z" fill="url(#elephantHideGrad)" stroke="#1e293b" stroke-width="2.4" />
          <ellipse cx="56" cy="122" rx="3.5" ry="2.5" fill="#cbd5e1" />
          <ellipse cx="63" cy="123" rx="3.5" ry="2.5" fill="#cbd5e1" />
          <ellipse cx="70" cy="122" rx="3.5" ry="2.5" fill="#cbd5e1" />

          <path d="M 124 76 L 122 124 L 144 124 L 142 76 Z" fill="url(#elephantHideGrad)" stroke="#1e293b" stroke-width="2.4" />
          <ellipse cx="126" cy="122" rx="3.5" ry="2.5" fill="#cbd5e1" />
          <ellipse cx="133" cy="123" rx="3.5" ry="2.5" fill="#cbd5e1" />
          <ellipse cx="140" cy="122" rx="3.5" ry="2.5" fill="#cbd5e1" />

          <!-- Contoured Elephant Back, Shoulder & Hindquarters -->
          <path d="M 38 54 C 38 14, 78 8, 108 14 C 142 18, 158 42, 154 74 C 150 94, 128 98, 92 96 C 54 96, 38 82, 38 54 Z" fill="url(#elephantHideGrad)" stroke="#1e293b" stroke-width="2.6" />
          <!-- Hide Wrinkle Creases & Tail -->
          <path d="M 88 28 Q 84 52 90 74 M 106 32 Q 102 54 106 72" fill="none" stroke="#334155" stroke-width="2" opacity="0.55" />
          <path d="M 152 52 Q 166 74 162 98" fill="none" stroke="#334155" stroke-width="3.5" stroke-linecap="round" />
          <path d="M 162 96 L 158 106 L 166 106 Z" fill="#0f172a" />

          <!-- Sculpted Elephant Head & Raised S-Curved Trunk -->
          <path d="M 48 22 C 24 14, 6 28, 10 54 C 14 72, 36 78, 52 68 Z" fill="url(#elephantHideGrad)" stroke="#1e293b" stroke-width="2.6" />
          <g style="transform-origin: 14px 48px; animation: elephantTrunkIdle 3.2s ease-in-out infinite;">
            <path d="M 16 42 C -12 42, -24 16, -8 -6 C -3 -12, 6 -6, 2 2 C -8 16, -2 28, 18 30 Z" fill="url(#elephantHideGrad)" stroke="#1e293b" stroke-width="2.5" />
            <!-- Trunk Annular Ring Folds -->
            <path d="M -2 28 L 4 24 M -8 20 L -1 18 M -11 10 L -4 10 M -10 0 L -3 2" stroke="#334155" stroke-width="2" stroke-linecap="round" />
          </g>

          <!-- Pair of Curved Ivory Tusks -->
          <path d="M 18 54 C -6 60, -18 46, -12 36 C -6 46, 6 48, 20 46 Z" fill="#fefce8" stroke="#a16207" stroke-width="2" />
          <path d="M 22 58 C -2 66, -14 52, -8 42 C -2 52, 10 54, 24 52 Z" fill="#fffbeb" stroke="#78350f" stroke-width="2" />

          <!-- Expressive Eye & Brow -->
          <circle cx="26" cy="40" r="3.8" fill="#0f172a" />
          <circle cx="25" cy="38.8" r="1.3" fill="#ffffff" />
          <path d="M 20 34 Q 26 31 32 35" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />

          <!-- Large Flapping African Ear with Veins -->
          <g style="transform-origin: 46px 36px; animation: elephantEarFlap 2.8s ease-in-out infinite;">
            <path d="M 44 18 C 82 10, 92 56, 62 76 C 48 84, 38 64, 44 18 Z" fill="url(#elephantHideGrad)" stroke="#1e293b" stroke-width="2.6" />
            <path d="M 50 32 Q 66 38 68 52 M 48 44 Q 60 52 58 64" fill="none" stroke="#475569" stroke-width="1.8" opacity="0.7" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- LUSH FULL ACACIA TREE #2 (Right Horizon Framing the Oasis)                -->
        <!-- ========================================================================= -->
        <g transform="translate(1165, 165)" filter="drop-shadow(0 12px 18px rgba(41,14,4,0.38))">
          <g fill="url(#acaciaShadowFoliage)">
            <ellipse cx="82" cy="108" rx="88" ry="19" />
            <ellipse cx="185" cy="84" rx="110" ry="22" />
            <ellipse cx="135" cy="96" rx="82" ry="18" />
          </g>
          <path d="M 148 310 C 145 255, 150 205, 158 162 C 128 136, 98 118, 64 102 L 78 96 C 108 112, 136 128, 162 148 C 168 118, 184 94, 210 78 L 224 82 C 196 98, 180 122, 172 156 C 166 205, 166 255, 172 310 Z" fill="url(#acaciaBarkGrad)" />
          <g fill="url(#acaciaMidFoliage)">
            <ellipse cx="78" cy="98" rx="84" ry="18" />
            <circle cx="35" cy="98" r="16" />
            <circle cx="118" cy="94" r="18" />
            <ellipse cx="185" cy="72" rx="112" ry="23" />
            <circle cx="122" cy="70" r="21" />
            <circle cx="175" cy="62" r="24" />
            <circle cx="232" cy="68" r="21" />
          </g>
          <g fill="url(#acaciaSunlitCrown)">
            <ellipse cx="76" cy="90" rx="64" ry="9" />
            <ellipse cx="185" cy="60" rx="92" ry="12" />
            <ellipse cx="158" cy="56" rx="46" ry="9" />
          </g>
        </g>

        <!-- FOREGROUND LUSH SAVANNA GRASSLANDS & ACACIA SHRUBBERY -->
        <path d="M -120 735 Q 280 680 680 745 T 1560 715 L 1560 920 L -120 920 Z" fill="url(#nearSavannaBank)" />
        <g fill="#84cc16" opacity="0.82">
          <path d="M 75 722 L 68 692 L 82 718 L 88 686 L 96 720 L 106 696 L 102 724 Z" />
          <path d="M 365 715 L 358 688 L 372 712 L 378 684 L 386 715 Z" />
          <path d="M 1195 725 L 1188 694 L 1202 720 L 1210 688 L 1218 724 L 1228 698 L 1222 726 Z" />
        </g>
      </svg>

      <!-- 2. SOARING FLOCK OF SAVANNA BIRDS -->
      <div style="position: absolute; top: 13%; left: 0; width: 170px; height: 65px; pointer-events: none; opacity: 0.85; animation: birdFlockDrift 38s linear infinite;">
        <svg viewBox="0 0 170 65" style="width: 100%; height: 100%;">
          <path d="M 10 32 Q 22 18 32 30 Q 42 18 54 32" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round" />
          <path d="M 68 18 Q 78 6 86 18 Q 94 6 104 18" fill="none" stroke="#451a03" stroke-width="2.6" stroke-linecap="round" />
          <path d="M 112 38 Q 122 26 130 38 Q 138 26 148 38" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      </div>

      <!-- DYNAMIC PARTICLE LAYER FOR WATER DROPLETS & GOLDEN ACACIA LEAVES -->
      <div id="safari-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 3. GROUNDED MAIN SAFARI STAGE: CARVED BAOBAB TIMBER SIGNBOARD + RANGER LEO -->
      <div style="position: absolute; bottom: 180px; left: 46%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 30px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- CARVED BAOBAB WOOD & TRIBAL SHIELD SIGNBOARD -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <div id="safari-timber-board" style="position: relative; width: 400px; max-width: 55vw; min-height: 255px; background: radial-gradient(circle at 50% 45%, #92400e 0%, #78350f 62%, #451a03 100%); border: 6px solid #270e05; border-radius: 20px; box-shadow: 0 16px 32px rgba(41, 14, 4, 0.7), inset 0 3px 0 rgba(253, 224, 71, 0.45), inset 0 -6px 0 rgba(28, 10, 2, 0.85); padding: 26px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
            
            <!-- Carved Tribal Geometric Border Pattern Left & Right -->
            <svg viewBox="0 0 24 200" style="position: absolute; left: 10px; top: 24px; bottom: 24px; width: 20px; height: 80%; opacity: 0.78; pointer-events: none;">
              <polyline points="4,10 18,25 4,40 18,55 4,70 18,85 4,100 18,115 4,130 18,145 4,160 18,175 4,190" fill="none" stroke="#fde047" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg viewBox="0 0 24 200" style="position: absolute; right: 10px; top: 24px; bottom: 24px; width: 20px; height: 80%; opacity: 0.78; pointer-events: none;">
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
            <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 360px; height: 28px; background: radial-gradient(ellipse at center, rgba(41, 14, 4, 0.78) 0%, rgba(41, 14, 4, 0.3) 58%, transparent 80%); border-radius: 50%;"></div>

            <div style="position: absolute; left: 44px; top: 0; width: 26px; height: 44px; background: linear-gradient(90deg, #451a03, #78350f 45%, #270e05); border: 3px solid #1c0a02; border-radius: 5px;"></div>
            <div style="position: absolute; right: 44px; top: 0; width: 26px; height: 44px; background: linear-gradient(90deg, #451a03, #78350f 45%, #270e05); border: 3px solid #1c0a02; border-radius: 5px;"></div>

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
          <div id="safari-speech-bubble" style="background: #fefce8; color: #451a03; border: 3px solid #ca8a04; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #78350f, 0 8px 16px rgba(0,0,0,0.45); white-space: nowrap; transition: all 0.2s;">
            Solve it so the Elephant sprays a rainbow! 🐘🌈
          </div>

          <div style="position: relative; width: 215px; height: 245px; display: flex; justify-content: center; align-items: flex-end;">
            <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 185px; height: 28px; background: radial-gradient(ellipse at center, rgba(41, 14, 4, 0.8) 0%, rgba(41, 14, 4, 0.3) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>

            <div id="safari-lion-mascot" class="lion-ranger-idle" style="position: relative; width: 210px; height: 240px; z-index: 2; filter: drop-shadow(0 10px 16px rgba(41,14,4,0.55));">
              <svg viewBox="0 0 240 265" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <radialGradient id="lionManeGrad" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stop-color="#d97706" />
                    <stop offset="55%" stop-color="#92400e" />
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
                <polygon points="88,132 152,132 120,158" fill="#dc2626" stroke="#7f1d1d" stroke-width="2.5" />
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

                <!-- Full Scalloped Royal Lion Mane -->
                <path d="M 120 18 C 145 14, 168 26, 178 46 C 196 62, 198 88, 184 108 C 178 130, 154 146, 120 146 C 86 146, 62 130, 56 108 C 42 88, 44 62, 62 46 C 72 26, 95 14, 120 18 Z" fill="url(#lionManeGrad)" stroke="#270e05" stroke-width="3.5" />
                <path d="M 68 58 Q 56 82 68 106 M 172 58 Q 184 82 172 106" fill="none" stroke="#b45309" stroke-width="3" opacity="0.6" />

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
                <line x1="76" y1="95" x2="94" y2="97" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
                <line x1="74" y1="103" x2="94" y2="102" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
                <line x1="164" y1="95" x2="146" y2="97" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
                <line x1="166" y1="103" x2="146" y2="102" stroke="#451a03" stroke-width="2" stroke-linecap="round" />

                <!-- Classic Khaki Safari Pith Helmet -->
                <g transform="translate(0, -4)">
                  <ellipse cx="120" cy="42" rx="54" ry="11" fill="#e7e5e4" stroke="#57534e" stroke-width="3" />
                  <path d="M 80 40 C 80 10, 160 10, 160 40 Z" fill="#f5f5f4" stroke="#57534e" stroke-width="3" />
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
          
          <div style="position: absolute; top: 0; bottom: 0; left: 0; width: 14px; background: repeating-linear-gradient(45deg, #f8fafc, #f8fafc 6px, #0f172a 6px, #0f172a 12px);"></div>

          <div style="display: flex; flex-direction: column; min-width: 155px; padding-left: 8px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #fde047; letter-spacing: 0.14em; text-transform: uppercase;">🚙 SAFARI JEEP RADIO</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #fefce8; letter-spacing: 0.06em;">OASIS HERD: PEACEFUL</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.95rem; font-weight: 900; color: #270e05; background: #fefce8; border: 3px solid #eab308; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.25), 0 0 12px rgba(250,204,21,0.4);" />

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
  const geyser = document.getElementById("water-geyser-stream");
  const rainbow = document.getElementById("rainbow-mist-halo");
  const particleHost = document.getElementById("safari-eruption-particles");

  if (geyser) {
    geyser.classList.remove("erupting");
    void geyser.offsetWidth;
    geyser.classList.add("erupting");
  }
  if (rainbow) {
    rainbow.classList.remove("erupting");
    void rainbow.offsetWidth;
    rainbow.classList.add("erupting");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#e0f2fe", "#7dd3fc", "#38bdf8", "#ffffff", "#fde047", "#84cc16"];

  for (let i = 0; i < 38; i++) {
    const p = document.createElement("div");
    const isMistDrop = i < 28;
    const color = isMistDrop ? colors[i % 4] : colors[4 + (i % 2)];
    const tx = (Math.random() - 0.5) * 480 + "px";
    const ty = -(120 + Math.random() * 320) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";
    const size = isMistDrop ? 8 + Math.random() * 12 : 14;

    p.style.cssText = `
      position: absolute;
      left: 63%;
      top: 47%;
      width: ${size}px;
      height: ${isMistDrop ? size : 8}px;
      border-radius: ${isMistDrop ? "50%" : "50% 0 50% 0"};
      background: ${isMistDrop ? `radial-gradient(circle at 35% 35%, #ffffff, ${color})` : color};
      box-shadow: 0 0 10px rgba(186, 230, 253, 0.7);
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: safariParticleArc ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        speech.textContent = "ROAAAR! RAINBOW OASIS SPLASH!! 🦁🐘🌈";
        speech.style.borderColor = "#84cc16";
      }

      setStatus("🌈 RAINBOW GEYSER BLAST!!");
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
