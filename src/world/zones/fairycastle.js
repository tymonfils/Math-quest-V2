// src/world/zones/fairycastle.js - High-Detail Celestial Floating Fairy Citadel & Bioluminescent Feywild
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadFairyCastle() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("fairycastle-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "fairycastle-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes floatingIslandBob {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes floatingMiniIsland {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(8px); }
    }
    @keyframes waterfallFlow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -90; }
    }
    @keyframes waterfallMistPulse {
      0%, 100% { transform: scale(1); opacity: 0.55; }
      50% { transform: scale(1.16); opacity: 0.88; }
    }
    @keyframes auroraWave {
      0%, 100% { transform: translateY(0px); opacity: 0.65; }
      50% { transform: translateY(-12px); opacity: 0.95; }
    }
    @keyframes lanternSwing {
      0%, 100% { transform: rotate(-5deg); }
      50% { transform: rotate(5deg); }
    }
    @keyframes swanGlide {
      0%, 100% { transform: translateX(0px) translateY(0px); }
      50% { transform: translateX(-18px) translateY(2px); }
    }
    @keyframes fireflyTwinkle {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 1; }
    }
    @keyframes titaniaHover {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-7px); }
    }
    @keyframes monarchWingFlapLeft {
      0%, 100% { transform: scaleX(1) rotate(0deg); }
      50% { transform: scaleX(0.55) rotate(6deg); }
    }
    @keyframes monarchWingFlapRight {
      0%, 100% { transform: scaleX(1) rotate(0deg); }
      50% { transform: scaleX(0.55) rotate(-6deg); }
    }
    @keyframes scepterWandWave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-12deg); }
    }
    @keyframes titaniaCelebrate {
      0% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-28px) rotate(-4deg) scale(1.06); }
      50% { transform: translateY(-10px) rotate(4deg) scale(0.97, 1.03); }
      75% { transform: translateY(-22px) rotate(-2deg) scale(1.04); }
      100% { transform: translateY(0) scale(1); }
    }
    @keyframes titaniaError {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes citadelBeamErupt {
      0% { transform: scaleX(0.1) scaleY(0); opacity: 0; }
      15% { transform: scaleX(1.2) scaleY(1); opacity: 1; }
      45% { transform: scaleX(0.9) scaleY(1); opacity: 1; }
      75% { transform: scaleX(1.35) scaleY(1); opacity: 0.9; }
      100% { transform: scaleX(2) scaleY(1); opacity: 0; }
    }
    @keyframes feyButterflyFlight {
      0% { transform: translate(0, 0) scale(0.3) rotate(0deg); opacity: 1; }
      50% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.25) rotate(var(--rot)); opacity: 0; }
    }
    .titania-idle {
      transform-origin: center bottom;
      animation: titaniaHover 3.2s ease-in-out infinite;
    }
    .titania-party {
      transform-origin: center bottom;
      animation: titaniaCelebrate 0.9s ease-in-out 2 !important;
    }
    .titania-oops {
      transform-origin: center bottom;
      animation: titaniaError 0.55s ease-in-out 1 !important;
    }
    #citadel-sky-beam {
      transform-origin: 1095px 450px;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    #citadel-sky-beam.awakened {
      animation: citadelBeamErupt 1.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="fairy-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #070b24 0%, #131b4d 24%, #2e1a68 50%, #5b21b6 76%, #1e1b4b 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN HIGH-DETAIL CELESTIAL FAIRY CITADEL & FEYWILD SANCTUARY SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Celestial Night & Left-Positioned Moon Halo Glow -->
          <radialGradient id="moonHaloGlow" cx="20%" cy="20%" r="42%">
            <stop offset="0%" stop-color="#fdf4ff" stop-opacity="0.95" />
            <stop offset="22%" stop-color="#f5d0fe" stop-opacity="0.65" />
            <stop offset="55%" stop-color="#c084fc" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
          </radialGradient>

          <!-- Clean Crescent Moon Cutout Mask -->
          <mask id="crescentMoonMask">
            <rect x="-150" y="-150" width="300" height="300" fill="black" />
            <circle cx="0" cy="0" r="88" fill="white" />
            <circle cx="34" cy="-22" r="76" fill="black" />
          </mask>

          <linearGradient id="auroraRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0" />
            <stop offset="20%" stop-color="#2dd4bf" stop-opacity="0.65" />
            <stop offset="50%" stop-color="#e879f9" stop-opacity="0.75" />
            <stop offset="80%" stop-color="#38bdf8" stop-opacity="0.65" />
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0" />
          </linearGradient>

          <!-- Castle Pearlescent Marble & Rose-Gold Spire Gradients -->
          <linearGradient id="castleMarbleWall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fdf4ff" />
            <stop offset="45%" stop-color="#f3e8ff" />
            <stop offset="80%" stop-color="#d8b4fe" />
            <stop offset="100%" stop-color="#9333ea" />
          </linearGradient>

          <linearGradient id="castleSpireRoof" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60a5fa" />
            <stop offset="40%" stop-color="#3b82f6" />
            <stop offset="78%" stop-color="#1d4ed8" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>

          <linearGradient id="roseGoldSpire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="35%" stop-color="#f472b6" />
            <stop offset="75%" stop-color="#db2777" />
            <stop offset="100%" stop-color="#831843" />
          </linearGradient>

          <linearGradient id="stainedGlassGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="50%" stop-color="#f472b6" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>

          <!-- Floating Sky-Island Cliff Rock & Under-Crystal -->
          <linearGradient id="floatingCliffRock" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4c1d95" />
            <stop offset="45%" stop-color="#2e1065" />
            <stop offset="100%" stop-color="#090418" />
          </linearGradient>

          <!-- Bioluminescent Lagoon & Waterfall Gradients -->
          <linearGradient id="feyLagoonWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#67e8f9" />
            <stop offset="35%" stop-color="#0ea5e9" />
            <stop offset="70%" stop-color="#4f46e5" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>

          <linearGradient id="skyWaterfallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="35%" stop-color="#a5f3fc" />
            <stop offset="80%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#e0f2fe" />
          </linearGradient>

          <!-- Feywild Terraced Meadow Hills -->
          <linearGradient id="farFeyMeadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0d9488" />
            <stop offset="55%" stop-color="#115e59" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>

          <linearGradient id="midFeyMeadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#14b8a6" />
            <stop offset="35%" stop-color="#0f766e" />
            <stop offset="80%" stop-color="#3b0764" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>

          <linearGradient id="nearFeyForeground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#311042" />
            <stop offset="100%" stop-color="#090414" />
          </linearGradient>

          <!-- Glowing Mushroom Cap Gradients -->
          <radialGradient id="mushroomCapPink" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#fbcfe8" />
            <stop offset="45%" stop-color="#ec4899" />
            <stop offset="85%" stop-color="#9d174d" />
            <stop offset="100%" stop-color="#500724" />
          </radialGradient>

          <radialGradient id="mushroomCapCyan" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#cffafe" />
            <stop offset="45%" stop-color="#06b6d4" />
            <stop offset="85%" stop-color="#0e7490" />
            <stop offset="100%" stop-color="#164e63" />
          </radialGradient>

          <linearGradient id="citadelBeamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95" />
            <stop offset="35%" stop-color="#f472b6" stop-opacity="0.85" />
            <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>

          <filter id="softMagicBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <!-- ========================================================================= -->
        <!-- 1. CELESTIAL NIGHT SKY, STARFIELD, AURORA RIBBONS & LEFT CRESCENT MOON    -->
        <!-- ========================================================================= -->
        <rect width="1440" height="900" fill="url(#moonHaloGlow)" />

        <!-- Crisp Starfield Constellation Dots -->
        <g fill="#ffffff" opacity="0.85">
          <circle cx="95" cy="68" r="1.8" /><circle cx="485" cy="42" r="2.4" /><circle cx="590" cy="95" r="1.5" />
          <circle cx="420" cy="54" r="2.2" /><circle cx="540" cy="88" r="1.6" /><circle cx="660" cy="38" r="2.5" />
          <circle cx="780" cy="76" r="1.8" /><circle cx="1290" cy="55" r="2.2" /><circle cx="1380" cy="110" r="1.6" />
          <polygon points="420,42 423,51 432,54 423,57 420,66 417,57 408,54 417,51" fill="#fef08a" />
          <polygon points="660,26 663,35 672,38 663,41 660,50 657,41 648,38 657,35" fill="#bae6fd" />
        </g>

        <!-- Shimmering Aurora Borealis Sky Ribbons -->
        <g style="animation: auroraWave 8s ease-in-out infinite;" filter="url(#softMagicBlur)">
          <path d="M -60 190 Q 280 95 620 175 T 1280 135 T 1520 180 L 1520 245 Q 1280 195 620 235 T -60 250 Z" fill="url(#auroraRibbonGrad)" />
          <path d="M 80 130 Q 440 55 780 125 T 1440 95 L 1440 140 Q 780 165 440 95 T 80 165 Z" fill="url(#auroraRibbonGrad)" opacity="0.7" />
        </g>

        <!-- GIANT LUMINOUS CRESCENT MOON IN THE TOP-LEFT SKY -->
        <g transform="translate(275, 165)">
          <!-- Soft Outer Moonbeam Halo -->
          <circle cx="0" cy="0" r="115" fill="#fdf4ff" opacity="0.18" filter="url(#softMagicBlur)" />
          <circle cx="0" cy="0" r="88" fill="#fffbeb" mask="url(#crescentMoonMask)" filter="drop-shadow(0 0 28px rgba(254, 240, 138, 0.9))" />
          <!-- Subtle Moon Craters Inside Crescent -->
          <circle cx="-42" cy="12" r="11" fill="#fde68a" opacity="0.45" />
          <circle cx="-26" cy="42" r="15" fill="#fde68a" opacity="0.38" />
          <circle cx="-48" cy="-22" r="8" fill="#fde68a" opacity="0.35" />
        </g>

        <!-- Distant Misty Lavender Mountain Peaks -->
        <path d="M -60 490 L 110 335 L 255 425 L 410 290 L 585 440 L 760 350 L 960 465 L 1480 450 L 1480 900 L -60 900 Z" fill="#2e1065" opacity="0.65" />
        <path d="M 110 335 L 165 425 L 110 410 Z M 410 290 L 475 415 L 410 395 Z" fill="#581c87" opacity="0.5" />

        <!-- ========================================================================= -->
        <!-- 2. SECONDARY FLOATING SKY-ISLAND & ELVEN GAZEBO (CENTER-LEFT SKY)         -->
        <!-- ========================================================================= -->
        <!-- Static outer transform + animated inner group so CSS never resets X/Y! -->
        <g transform="translate(525, 165)">
          <g style="animation: floatingMiniIsland 6.5s ease-in-out infinite;">
            <polygon points="10,75 130,75 110,115 80,145 65,175 45,135 22,110" fill="url(#floatingCliffRock)" stroke="#6d28d9" stroke-width="1.5" />
            <polygon points="58,155 65,190 72,155 65,145" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
            <ellipse cx="70" cy="75" rx="64" ry="10" fill="#14b8a6" />
            <rect x="42" y="38" width="8" height="36" fill="url(#castleMarbleWall)" />
            <rect x="90" y="38" width="8" height="36" fill="url(#castleMarbleWall)" />
            <path d="M 36 38 Q 70 8 104 38 Z" fill="url(#roseGoldSpire)" stroke="#fef08a" stroke-width="1.5" />
            <circle cx="70" cy="54" r="6" fill="#fef08a" filter="drop-shadow(0 0 8px #fef08a)" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 3. MIDGROUND TERRACED FEYWILD MEADOWS & MIRROR LOTUS LAGOON               -->
        <!-- ========================================================================= -->
        <path d="M -80 515 Q 240 445 580 510 T 1520 490 L 1520 900 L -80 900 Z" fill="url(#farFeyMeadow)" />
        <path d="M -100 565 Q 320 495 740 560 T 1540 545 L 1540 900 L -100 900 Z" fill="url(#midFeyMeadow)" />

        <!-- ========================================================================= -->
        <!-- 4. GRAND CELESTIAL FLOATING FAIRY CITADEL (SHIFTED RIGHT & LOWERED)       -->
        <!-- ========================================================================= -->
        <!-- Prismatic Awakening Sky Pillar (Aligned to Castle Main Spire at x=1095) -->
        <g id="citadel-sky-beam">
          <rect x="1015" y="-50" width="160" height="510" fill="url(#citadelBeamGrad)" filter="url(#softMagicBlur)" />
          <rect x="1070" y="-50" width="50" height="510" fill="#ffffff" opacity="0.9" filter="url(#softMagicBlur)" />
          <circle cx="1095" cy="270" r="140" fill="none" stroke="#fef08a" stroke-width="4" stroke-dasharray="18 12" />
          <circle cx="1095" cy="270" r="95" fill="none" stroke="#f472b6" stroke-width="3" />
        </g>

        <!-- Outer Static Position Group (x=860, y=150) + Inner Bobbing Group -->
        <g transform="translate(860, 150)" filter="drop-shadow(0 18px 32px rgba(9, 4, 24, 0.75))">
          <g style="animation: floatingIslandBob 5.2s ease-in-out infinite;">
            
            <!-- A. Colossal Floating Sky-Cliff Base & Glowing Under-Crystals -->
            <polygon points="35,315 435,315 405,375 350,415 295,465 255,430 235,505 205,435 165,470 115,410 65,370" fill="url(#floatingCliffRock)" stroke="#7e22ce" stroke-width="2" />
            <polygon points="235,315 295,465 235,505 205,435" fill="#1e1b4b" opacity="0.7" />
            <polygon points="115,315 165,470 205,435 175,315" fill="#3b0764" opacity="0.6" />
            <polygon points="222,475 235,540 248,475 235,455" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.5" filter="drop-shadow(0 0 12px #38bdf8)" />
            <polygon points="155,445 165,495 175,445 165,430" fill="#f472b6" stroke="#fce7f3" stroke-width="1.5" filter="drop-shadow(0 0 10px #f472b6)" />
            <polygon points="285,440 295,492 305,440 295,425" fill="#f472b6" stroke="#fce7f3" stroke-width="1.5" filter="drop-shadow(0 0 10px #f472b6)" />

            <!-- Hanging Bioluminescent Vines & Roots Under Floating Island -->
            <path d="M 85 365 Q 80 410 88 445 M 135 395 Q 130 440 138 475 M 335 395 Q 342 440 334 475 M 385 360 Q 390 405 382 435" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="4 4" opacity="0.75" />

            <!-- Lush Emerald & Lavender Cliff-Top Gardens -->
            <path d="M 25 315 Q 125 295 235 312 Q 345 295 445 315 L 435 330 Q 235 342 35 330 Z" fill="#14b8a6" stroke="#5eead4" stroke-width="2" />

            <!-- B. Background Flanking Towers (Towers #1 & #7) -->
            <rect x="52" y="175" width="38" height="140" fill="url(#castleMarbleWall)" stroke="#7e22ce" stroke-width="1.5" />
            <polygon points="44,175 71,95 98,175" fill="url(#castleSpireRoof)" stroke="#fde047" stroke-width="1.5" />
            <line x1="71" y1="95" x2="71" y2="72" stroke="#fde047" stroke-width="2" />
            <circle cx="71" cy="70" r="3.5" fill="#fef08a" />

            <rect x="380" y="175" width="38" height="140" fill="url(#castleMarbleWall)" stroke="#7e22ce" stroke-width="1.5" />
            <polygon points="372,175 399,95 426,175" fill="url(#castleSpireRoof)" stroke="#fde047" stroke-width="1.5" />
            <line x1="399" y1="95" x2="399" y2="72" stroke="#fde047" stroke-width="2" />
            <circle cx="399" cy="70" r="3.5" fill="#fef08a" />

            <!-- C. Ornate Flying Buttresses & Arched Aqueduct Bridges -->
            <path d="M 90 245 Q 115 215 135 215 L 135 235 Q 110 235 90 265 Z" fill="url(#castleMarbleWall)" stroke="#9333ea" stroke-width="1.5" />
            <path d="M 380 245 Q 355 215 335 215 L 335 235 Q 360 235 380 265 Z" fill="url(#castleMarbleWall)" stroke="#9333ea" stroke-width="1.5" />

            <!-- D. Mid-Tier Rose-Gold Turrets (Towers #2 & #6) -->
            <rect x="112" y="135" width="48" height="180" fill="url(#castleMarbleWall)" stroke="#7e22ce" stroke-width="1.8" />
            <rect x="106" y="132" width="60" height="8" rx="3" fill="#fde047" stroke="#b45309" stroke-width="1.2" />
            <path d="M 106 132 C 106 95, 136 68, 136 38 C 136 68, 166 95, 166 132 Z" fill="url(#roseGoldSpire)" stroke="#fde047" stroke-width="1.8" />
            <rect x="128" y="162" width="16" height="32" rx="8" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="1.5" />
            <rect x="128" y="212" width="16" height="28" rx="8" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="1.5" />

            <rect x="310" y="135" width="48" height="180" fill="url(#castleMarbleWall)" stroke="#7e22ce" stroke-width="1.8" />
            <rect x="304" y="132" width="60" height="8" rx="3" fill="#fde047" stroke="#b45309" stroke-width="1.2" />
            <path d="M 304 132 C 304 95, 334 68, 334 38 C 334 68, 364 95, 364 132 Z" fill="url(#roseGoldSpire)" stroke="#fde047" stroke-width="1.8" />
            <rect x="326" y="162" width="16" height="32" rx="8" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="1.5" />
            <rect x="326" y="212" width="16" height="28" rx="8" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="1.5" />

            <!-- E. Grand Central Cathedral Keep & Rose Window -->
            <rect x="155" y="155" width="160" height="160" fill="url(#castleMarbleWall)" stroke="#6b21a8" stroke-width="2" />
            <path d="M 155 155 L 155 145 L 170 145 L 170 155 L 185 155 L 185 145 L 200 145 L 200 155 L 270 155 L 270 145 L 285 145 L 285 155 L 300 155 L 300 145 L 315 145 L 315 155 Z" fill="#fde047" stroke="#b45309" stroke-width="1.2" />

            <!-- Towering Central Citadel Spire (Tower #4) -->
            <rect x="198" y="68" width="74" height="145" fill="url(#castleMarbleWall)" stroke="#6b21a8" stroke-width="2" />
            <polygon points="186,68 235,-38 284,68" fill="url(#castleSpireRoof)" stroke="#fde047" stroke-width="2" />
            <line x1="235" y1="-38" x2="235" y2="68" stroke="#fde047" stroke-width="2" />
            <line x1="235" y1="-38" x2="210" y2="68" stroke="#60a5fa" stroke-width="1.5" />
            <line x1="235" y1="-38" x2="260" y2="68" stroke="#1e3a8a" stroke-width="1.5" />
            <polygon points="235,-58 240,-44 254,-44 242,-36 246,-22 235,-30 224,-22 228,-36 216,-44 230,-44" fill="#fef08a" filter="drop-shadow(0 0 10px #fef08a)" />

            <!-- Twin Flanking Inner Spirelets (Towers #3 & #5) -->
            <polygon points="172,145 192,75 212,145" fill="url(#roseGoldSpire)" stroke="#fde047" stroke-width="1.5" />
            <polygon points="258,145 278,75 298,145" fill="url(#roseGoldSpire)" stroke="#fde047" stroke-width="1.5" />

            <!-- Intricate Stained-Glass Rose Window in Center Keep -->
            <circle cx="235" cy="198" r="28" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="3" />
            <circle cx="235" cy="198" r="18" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="5 4" />
            <line x1="235" y1="170" x2="235" y2="226" stroke="#fde047" stroke-width="2" />
            <line x1="207" y1="198" x2="263" y2="198" stroke="#fde047" stroke-width="2" />
            <line x1="215" y1="178" x2="255" y2="218" stroke="#fde047" stroke-width="1.5" />
            <line x1="255" y1="178" x2="215" y2="218" stroke="#fde047" stroke-width="1.5" />
            <circle cx="235" cy="198" r="6" fill="#ffffff" />

            <!-- Grand Illuminated Palace Portal Gate & Colonnade Arches -->
            <path d="M 208 315 L 208 262 C 208 240, 262 240, 262 262 L 262 315 Z" fill="#fef08a" stroke="#b45309" stroke-width="3" filter="drop-shadow(0 0 14px rgba(254,240,138,0.8))" />
            <path d="M 216 315 L 216 268 C 216 252, 254 252, 254 268 L 254 315 Z" fill="#ffffff" opacity="0.75" />
            <path d="M 172 295 L 172 262 C 172 252, 192 252, 192 262 L 192 295 Z" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="1.8" />
            <path d="M 278 295 L 278 262 C 278 252, 298 252, 298 262 L 298 295 Z" fill="url(#stainedGlassGlow)" stroke="#fde047" stroke-width="1.8" />

            <!-- F. TWIN SHIMMERING WATERFALLS CASCADING INTO THE LAGOON BELOW -->
            <g>
              <path d="M 118 322 C 115 368, 110 408, 106 445 L 142 445 C 138 408, 136 368, 138 322 Z" fill="url(#skyWaterfallGrad)" opacity="0.88" />
              <path d="M 126 325 L 118 442 M 134 325 L 130 442" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="18 14" style="animation: waterfallFlow 1.8s linear infinite;" />
              <path d="M 332 322 C 335 368, 340 408, 344 445 L 308 445 C 312 408, 314 368, 312 322 Z" fill="url(#skyWaterfallGrad)" opacity="0.88" />
              <path d="M 320 325 L 322 442 M 328 325 L 334 442" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="18 14" style="animation: waterfallFlow 1.6s linear infinite;" />
            </g>
          </g>
        </g>

        <!-- Shimmering Bioluminescent Mirror Lagoon Under the Shifted Castle Waterfalls -->
        <g>
          <ellipse cx="1080" cy="605" rx="355" ry="76" fill="#a855f7" opacity="0.35" />
          <ellipse cx="1085" cy="608" rx="335" ry="66" fill="url(#feyLagoonWater)" stroke="#67e8f9" stroke-width="3" />

          <!-- Foaming Waterfall Plunge Pools (Aligned to x=984 & x=1186) -->
          <g transform="translate(984, 592)">
            <g style="animation: waterfallMistPulse 2.4s ease-in-out infinite;">
              <ellipse cx="0" cy="0" rx="44" ry="12" fill="#e0f2fe" opacity="0.85" />
              <circle cx="-18" cy="-7" r="12" fill="#ffffff" opacity="0.9" />
              <circle cx="0" cy="-11" r="16" fill="#ffffff" opacity="0.95" />
              <circle cx="20" cy="-7" r="12" fill="#ffffff" opacity="0.9" />
            </g>
          </g>
          <g transform="translate(1186, 592)">
            <g style="animation: waterfallMistPulse 2.7s ease-in-out 0.6s infinite;">
              <ellipse cx="0" cy="0" rx="44" ry="12" fill="#e0f2fe" opacity="0.85" />
              <circle cx="-18" cy="-7" r="12" fill="#ffffff" opacity="0.9" />
              <circle cx="0" cy="-11" r="16" fill="#ffffff" opacity="0.95" />
              <circle cx="18" cy="-7" r="12" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          <!-- Glowing Water Lilies & Lotus Blossoms Floating on Lagoon -->
          <g transform="translate(855, 608)">
            <ellipse cx="0" cy="6" rx="22" ry="7" fill="#10b981" stroke="#047857" stroke-width="1.5" />
            <polygon points="-10,4 -4,-8 0,2" fill="#f472b6" />
            <polygon points="10,4 4,-8 0,2" fill="#f472b6" />
            <polygon points="-6,5 0,-11 6,5" fill="#fbcfe8" />
            <circle cx="0" cy="2" r="3" fill="#fef08a" filter="drop-shadow(0 0 6px #fef08a)" />
          </g>
          <g transform="translate(1285, 622)">
            <ellipse cx="0" cy="6" rx="20" ry="6" fill="#10b981" stroke="#047857" stroke-width="1.5" />
            <polygon points="-9,4 -3,-7 0,2" fill="#f472b6" />
            <polygon points="9,4 3,-7 0,2" fill="#f472b6" />
            <polygon points="-5,5 0,-10 5,5" fill="#fbcfe8" />
            <circle cx="0" cy="2" r="2.8" fill="#fef08a" />
          </g>

          <!-- Graceful Crowned Crystal Swan Gliding on the Lagoon -->
          <g transform="translate(1085, 622)">
            <g style="animation: swanGlide 7s ease-in-out infinite;">
              <ellipse cx="0" cy="14" rx="28" ry="5" fill="#bae6fd" opacity="0.6" />
              <path d="M -18 10 C -18 -4, 14 -6, 24 8 C 16 14, -12 14, -18 10 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.8" />
              <path d="M -8 6 C 0 -2, 14 0, 18 7" fill="none" stroke="#cbd5e1" stroke-width="1.8" />
              <path d="M -14 8 C -26 -2, -12 -22, -22 -24" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
              <circle cx="-23" cy="-24" r="4.5" fill="#ffffff" />
              <polygon points="-27,-25 -34,-23 -27,-21" fill="#f59e0b" />
              <polygon points="-25,-28 -23,-34 -20,-28" fill="#fde047" />
            </g>
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 5. BIOLUMINESCENT GIANT MUSHROOM GROVE & ANCIENT WEEPING WILLOW (LEFT)    -->
        <!-- ========================================================================= -->
        <g transform="translate(35, 220)" filter="drop-shadow(0 12px 20px rgba(9,4,24,0.65))">
          <path d="M -20 420 C 15 350, 28 265, 22 175 C 48 135, 95 105, 155 92 L 165 104 C 108 122, 68 152, 48 195 C 52 275, 58 355, 82 420 Z" fill="#1e1b4b" stroke="#4c1d95" stroke-width="2" />
          <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" opacity="0.75">
            <path d="M 55 125 Q 48 185 52 245" stroke-dasharray="3 6" />
            <path d="M 82 115 Q 76 175 80 230" stroke-dasharray="4 6" />
            <path d="M 110 105 Q 105 160 108 215" stroke-dasharray="3 6" />
            <path d="M 138 98 Q 134 148 136 195" stroke-dasharray="4 6" />
          </g>
          <ellipse cx="85" cy="95" rx="105" ry="28" fill="#3b0764" />
          <ellipse cx="95" cy="88" rx="88" ry="20" fill="#6b21a8" />
          <ellipse cx="105" cy="82" rx="68" ry="12" fill="#c084fc" opacity="0.65" />

          <!-- Hanging Golden Fairy Lantern on Willow Branch -->
          <g style="transform-origin: 148px 102px; animation: lanternSwing 3.5s ease-in-out infinite;">
            <line x1="148" y1="102" x2="148" y2="132" stroke="#fde047" stroke-width="2" />
            <polygon points="140,132 156,132 152,150 144,150" fill="#fef08a" stroke="#b45309" stroke-width="2" filter="drop-shadow(0 0 12px #fef08a)" />
          </g>

          <!-- Giant Bioluminescent Mushroom #1 (Tall Pink/Magenta) -->
          <g transform="translate(88, 225)">
            <path d="M 38 72 C 34 115, 28 155, 18 190 L 46 190 C 48 155, 52 115, 56 72 Z" fill="#fdf4ff" stroke="#d8b4fe" stroke-width="2" />
            <ellipse cx="47" cy="72" rx="54" ry="14" fill="#fde047" opacity="0.85" />
            <path d="M 2 72 L 47 64 L 92 72 M 18 78 L 47 64 L 76 78 M 32 82 L 47 64 L 62 82" stroke="#b45309" stroke-width="1.5" />
            <path d="M -12 72 C -12 18, 106 18, 106 72 C 78 62, 16 62, -12 72 Z" fill="url(#mushroomCapPink)" stroke="#fbcfe8" stroke-width="2" />
            <ellipse cx="24" cy="48" rx="9" ry="6" transform="rotate(-18 24 48)" fill="#fdf4ff" opacity="0.85" />
            <ellipse cx="52" cy="36" rx="12" ry="7" fill="#fdf4ff" opacity="0.85" />
            <ellipse cx="78" cy="52" rx="8" ry="5" transform="rotate(20 78 52)" fill="#fdf4ff" opacity="0.85" />
          </g>

          <!-- Giant Bioluminescent Mushroom #2 (Cyan/Teal Beside It) -->
          <g transform="translate(168, 275)">
            <path d="M 28 52 C 26 85, 22 115, 16 142 L 38 142 C 40 115, 42 85, 42 52 Z" fill="#ecfeff" stroke="#67e8f9" stroke-width="2" />
            <ellipse cx="35" cy="52" rx="42" ry="11" fill="#a5f3fc" />
            <path d="M -10 52 C -10 12, 80 12, 80 52 C 58 44, 12 44, -10 52 Z" fill="url(#mushroomCapCyan)" stroke="#a5f3fc" stroke-width="2" />
            <circle cx="18" cy="34" r="6" fill="#ecfeff" opacity="0.85" />
            <circle cx="42" cy="26" r="8" fill="#ecfeff" opacity="0.85" />
            <circle cx="58" cy="38" r="5" fill="#ecfeff" opacity="0.85" />
          </g>
        </g>

        <!-- Ambient Floating Golden Fireflies Across the Meadow -->
        <g fill="#fef08a">
          <circle cx="215" cy="485" r="4" style="animation: fireflyTwinkle 3.2s ease-in-out infinite;" filter="drop-shadow(0 0 8px #fef08a)" />
          <circle cx="345" cy="525" r="3.5" style="animation: fireflyTwinkle 2.6s ease-in-out 0.8s infinite;" filter="drop-shadow(0 0 8px #fef08a)" />
          <circle cx="645" cy="465" r="4" style="animation: fireflyTwinkle 3.8s ease-in-out 1.4s infinite;" filter="drop-shadow(0 0 8px #fef08a)" />
          <circle cx="1295" cy="485" r="4.5" style="animation: fireflyTwinkle 2.9s ease-in-out 0.4s infinite;" filter="drop-shadow(0 0 8px #fef08a)" />
          <circle cx="1365" cy="545" r="3.5" style="animation: fireflyTwinkle 3.5s ease-in-out 1.9s infinite;" filter="drop-shadow(0 0 8px #fef08a)" />
        </g>

        <!-- FOREGROUND VELVET MOSS & CRYSTAL BANK -->
        <path d="M -120 735 Q 280 680 680 745 T 1560 715 L 1560 920 L -120 920 Z" fill="url(#nearFeyForeground)" />
        <path d="M -120 735 Q 280 680 680 745 T 1560 715" fill="none" stroke="#c084fc" stroke-width="5" opacity="0.55" />
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR GLOWING BUTTERFLIES & STARDUST -->
      <div id="fairy-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. GROUNDED FEYWILD STAGE: ELVEN MOONSTONE PORTAL ARCH + QUEEN TITANIA -->
      <div style="position: absolute; bottom: 178px; left: 42%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 30px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- CARVED ELVEN MOONSTONE ARCHWAY & ENCHANTED MIRROR BOARD -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <div id="grimoire-board" style="position: relative; width: 405px; max-width: 55vw; min-height: 260px; background: radial-gradient(circle at 50% 38%, #3b0764 0%, #1e1b4b 68%, #090418 100%); border: 7px solid #f3e8ff; border-radius: 130px 130px 20px 20px; box-shadow: 0 18px 38px rgba(9, 4, 24, 0.8), 0 0 25px rgba(192, 132, 252, 0.35), inset 0 0 32px rgba(232, 121, 249, 0.35); padding: 34px 32px 24px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
            
            <div style="position: absolute; inset: 8px; border: 2.5px solid #fde047; border-radius: 120px 120px 14px 14px; opacity: 0.8; pointer-events: none;"></div>

            <div style="position: absolute; left: 18px; bottom: 24px; top: 75px; display: flex; flex-direction: column; justify-content: space-between; color: #67e8f9; font-size: 0.9rem; font-weight: 900; opacity: 0.75; text-shadow: 0 0 8px #38bdf8;">
              <span>✦</span><span>◈</span><span>✧</span><span>◈</span>
            </div>
            <div style="position: absolute; right: 18px; bottom: 24px; top: 75px; display: flex; flex-direction: column; justify-content: space-between; color: #67e8f9; font-size: 0.9rem; font-weight: 900; opacity: 0.75; text-shadow: 0 0 8px #38bdf8;">
              <span>✦</span><span>◈</span><span>✧</span><span>◈</span>
            </div>

            <svg viewBox="0 0 400 90" style="position: absolute; top: -18px; left: 0; width: 100%; height: 90px; overflow: visible; pointer-events: none;">
              <path d="M 35 65 Q 85 10 200 10 Q 315 10 365 65" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round" />
              <circle cx="85" cy="28" r="10" fill="#f43f5e" stroke="#fecdd3" stroke-width="2" />
              <circle cx="85" cy="28" r="4" fill="#fde047" />
              <circle cx="315" cy="28" r="10" fill="#f43f5e" stroke="#fecdd3" stroke-width="2" />
              <circle cx="315" cy="28" r="4" fill="#fde047" />
            </svg>

            <div style="position: absolute; top: -15px; background: linear-gradient(90deg, #7e22ce, #db2777, #7e22ce); border: 3px solid #fde047; color: #fffbeb; font-weight: 900; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              ✨ Moonstone Spell Mirror
            </div>

            <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
              <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', sans-serif; font-size: 3.9rem; font-weight: 900; color: #fdf4ff; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 3px 0 #3b0764, 0 0 18px rgba(244, 114, 182, 0.85);">
                <div id="math-num1">16</div>
                <div style="display: flex; align-items: center; gap: 18px;">
                  <span id="math-op" style="color: #67e8f9; font-size: 3.2rem; text-shadow: 0 3px 0 #0e7490, 0 0 14px #38bdf8;">+</span>
                  <span id="math-num2">17</span>
                </div>
                <div style="width: 108%; height: 6px; background: linear-gradient(90deg, #67e8f9, #fde047, #f472b6); border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 3px 0 #3b0764;"></div>
                <div id="math-question-mark" style="color: #fde047; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 3px 0 #78350f, 0 0 14px #fde047;">??</div>
              </div>
            </div>
          </div>

          <!-- GROUNDED MARBLE PEDESTAL STEPS + GLOWING CRYSTAL CLUSTERS -->
          <div style="position: relative; width: 430px; height: 42px; margin-top: -6px; z-index: 1; display: flex; justify-content: center;">
            <div style="position: absolute; bottom: -8px; width: 440px; height: 28px; background: radial-gradient(ellipse at center, rgba(9, 4, 24, 0.88) 0%, rgba(88, 28, 135, 0.35) 60%, transparent 80%); border-radius: 50%;"></div>

            <svg viewBox="0 0 430 46" style="width: 100%; height: 46px; overflow: visible;">
              <rect x="28" y="2" width="374" height="18" rx="5" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5" />
              <rect x="12" y="18" width="406" height="20" rx="6" fill="#d8b4fe" stroke="#581c87" stroke-width="2.5" />
              <polygon points="18,38 8,10 26,18 32,-2 40,38" fill="#f472b6" stroke="#fce7f3" stroke-width="1.5" filter="drop-shadow(0 0 8px #f472b6)" />
              <polygon points="36,38 38,16 50,24 48,38" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.5" />
              <polygon points="412,38 422,10 404,18 398,-2 390,38" fill="#f472b6" stroke="#fce7f3" stroke-width="1.5" filter="drop-shadow(0 0 8px #f472b6)" />
              <polygon points="394,38 392,16 380,24 382,38" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.5" />
            </svg>
          </div>
        </div>

        <!-- QUEEN TITANIA — HIGH-DETAIL FEY MONARCH TEACHER -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -4px;">
          <div id="fae-speech-bubble" style="background: #fdf4ff; color: #581c87; border: 3px solid #e879f9; border-radius: 16px; padding: 6px 14px; font-size: 0.84rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #7e22ce, 0 8px 16px rgba(0,0,0,0.5); white-space: nowrap; transition: all 0.2s;">
            Solve the rune to illuminate the Grand Citadel! 🏰✨
          </div>

          <div style="position: relative; width: 225px; height: 255px; display: flex; justify-content: center; align-items: flex-end;">
            <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 185px; height: 28px; background: radial-gradient(ellipse at center, rgba(232, 121, 249, 0.55) 0%, rgba(9, 4, 24, 0.8) 60%, transparent 82%); border-radius: 50%; border: 1.5px dashed rgba(254, 240, 138, 0.6); z-index: 1;"></div>

            <div id="fae-mascot" class="titania-idle" style="position: relative; width: 220px; height: 248px; z-index: 2; filter: drop-shadow(0 12px 20px rgba(9, 4, 24, 0.65));">
              <svg viewBox="0 0 250 270" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <linearGradient id="monarchWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#67e8f9" stop-opacity="0.88" />
                    <stop offset="45%" stop-color="#e879f9" stop-opacity="0.85" />
                    <stop offset="85%" stop-color="#9333ea" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#3b0764" stop-opacity="0.95" />
                  </linearGradient>

                  <linearGradient id="petalGownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#fbcfe8" />
                    <stop offset="35%" stop-color="#ec4899" />
                    <stop offset="75%" stop-color="#9d174d" />
                    <stop offset="100%" stop-color="#4c1d95" />
                  </linearGradient>

                  <linearGradient id="titaniaHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#fdf4ff" />
                    <stop offset="40%" stop-color="#f5d0fe" />
                    <stop offset="100%" stop-color="#c084fc" />
                  </linearGradient>
                </defs>

                <!-- Left Upper & Lower Wings -->
                <g style="transform-origin: 118px 132px; animation: monarchWingFlapLeft 1.4s ease-in-out infinite;">
                  <path d="M 118 128 C 68 62, 4 58, 12 108 C 16 134, 58 148, 118 138 Z" fill="url(#monarchWingGrad)" stroke="#fde047" stroke-width="2.5" />
                  <path d="M 118 138 C 62 142, 24 176, 44 206 C 56 220, 66 202, 72 216 C 84 204, 106 178, 118 152 Z" fill="url(#monarchWingGrad)" stroke="#fde047" stroke-width="2.2" />
                  <path d="M 114 132 Q 62 96 22 98 M 74 108 Q 52 122 32 122 M 112 144 Q 68 168 52 194" fill="none" stroke="#fef08a" stroke-width="1.8" opacity="0.85" />
                  <circle cx="32" cy="94" r="6" fill="#fef08a" opacity="0.8" />
                  <circle cx="58" cy="186" r="5" fill="#67e8f9" opacity="0.85" />
                </g>

                <!-- Right Upper & Lower Wings -->
                <g style="transform-origin: 132px 132px; animation: monarchWingFlapRight 1.4s ease-in-out infinite;">
                  <path d="M 132 128 C 182 62, 246 58, 238 108 C 234 134, 192 148, 132 138 Z" fill="url(#monarchWingGrad)" stroke="#fde047" stroke-width="2.5" />
                  <path d="M 132 138 C 188 142, 226 176, 206 206 C 194 220, 184 202, 178 216 C 166 204, 144 178, 132 152 Z" fill="url(#monarchWingGrad)" stroke="#fde047" stroke-width="2.2" />
                  <path d="M 136 132 Q 188 96 228 98 M 176 108 Q 198 122 218 122 M 138 144 Q 182 168 198 194" fill="none" stroke="#fef08a" stroke-width="1.8" opacity="0.85" />
                  <circle cx="218" cy="94" r="6" fill="#fef08a" opacity="0.8" />
                  <circle cx="192" cy="186" r="5" fill="#67e8f9" opacity="0.85" />
                </g>

                <!-- Flowing Back Hair Tresses -->
                <path d="M 88 78 C 68 118, 66 175, 84 205 L 166 205 C 184 175, 182 118, 162 78 Z" fill="url(#titaniaHairGrad)" stroke="#6b21a8" stroke-width="2.5" />

                <!-- Layered Rose-Petal Royal Gown & Corset Bodice -->
                <path d="M 102 154 L 148 154 L 176 248 Q 125 258 74 248 Z" fill="#3b0764" stroke="#fde047" stroke-width="2.5" />
                <path d="M 104 152 C 84 178, 72 214, 82 238 C 98 232, 114 204, 122 154 Z" fill="url(#petalGownGrad)" stroke="#fde047" stroke-width="2" />
                <path d="M 146 152 C 166 178, 178 214, 168 238 C 152 232, 136 204, 128 154 Z" fill="url(#petalGownGrad)" stroke="#fde047" stroke-width="2" />
                <path d="M 110 152 C 102 192, 106 232, 125 244 C 144 232, 148 192, 140 152 Z" fill="#f472b6" stroke="#fde047" stroke-width="2" />

                <path d="M 98 114 L 152 114 L 144 156 L 106 156 Z" fill="#9d174d" stroke="#fde047" stroke-width="2.5" stroke-linejoin="round" />
                <polygon points="125,118 136,136 125,152 114,136" fill="#67e8f9" stroke="#ffffff" stroke-width="1.8" />

                <!-- Left Graceful Arm -->
                <path d="M 98 118 L 72 148 L 80 156 L 104 128 Z" fill="#fde8e8" stroke="#6b21a8" stroke-width="2.2" />

                <!-- Right Arm Wielding Ornate Crystal Star Scepter -->
                <g style="transform-origin: 150px 122px; animation: scepterWandWave 2.6s ease-in-out infinite;">
                  <path d="M 150 118 L 182 138 L 176 148 L 144 128 Z" fill="#fde8e8" stroke="#6b21a8" stroke-width="2.2" />
                  <line x1="168" y1="164" x2="206" y2="68" stroke="#fde047" stroke-width="4.5" stroke-linecap="round" />
                  <circle cx="208" cy="62" r="14" fill="none" stroke="#fde047" stroke-width="3" />
                  <polygon points="208,42 213,56 228,58 216,66 220,80 208,72 196,80 200,66 188,58 203,56" fill="#67e8f9" stroke="#ffffff" stroke-width="1.8" filter="drop-shadow(0 0 10px #38bdf8)" />
                </g>

                <!-- Pointed Elven Ears -->
                <polygon points="88,78 64,68 78,90" fill="#fde8e8" stroke="#6b21a8" stroke-width="2.2" />
                <polygon points="162,78 186,68 172,90" fill="#fde8e8" stroke="#6b21a8" stroke-width="2.2" />

                <!-- Head -->
                <circle cx="125" cy="76" r="34" fill="#fde8e8" stroke="#6b21a8" stroke-width="2.8" />

                <!-- Rosy Blush & Expressive Violet/Cyan Eyes -->
                <ellipse cx="103" cy="85" rx="5.5" ry="3" fill="#f43f5e" opacity="0.4" />
                <ellipse cx="147" cy="85" rx="5.5" ry="3" fill="#f43f5e" opacity="0.4" />

                <ellipse cx="111" cy="78" rx="6" ry="7" fill="#ffffff" stroke="#311042" stroke-width="2" />
                <circle cx="111" cy="78.5" r="4.8" fill="#9333ea" />
                <circle cx="111" cy="78.5" r="2.5" fill="#1e1b4b" />
                <circle cx="109" cy="76" r="1.8" fill="#ffffff" />
                <path d="M 103 73 Q 111 67 119 73" fill="none" stroke="#311042" stroke-width="2.6" stroke-linecap="round" />

                <ellipse cx="139" cy="78" rx="6" ry="7" fill="#ffffff" stroke="#311042" stroke-width="2" />
                <circle cx="139" cy="78.5" r="4.8" fill="#9333ea" />
                <circle cx="139" cy="78.5" r="2.5" fill="#1e1b4b" />
                <circle cx="137" cy="76" r="1.8" fill="#ffffff" />
                <path d="M 131 73 Q 139 67 147 73" fill="none" stroke="#311042" stroke-width="2.6" stroke-linecap="round" />

                <!-- Serene Royal Smile -->
                <path d="M 118 92 Q 125 98 132 92" fill="none" stroke="#6b21a8" stroke-width="2.6" stroke-linecap="round" />

                <!-- Sweeping Silver-Pink Bangs & Temple Locks -->
                <path d="M 88 84 C 84 44, 105 34, 125 34 C 145 34, 166 44, 162 84 C 154 62, 138 56, 125 50 C 112 56, 96 62, 88 84 Z" fill="url(#titaniaHairGrad)" stroke="#6b21a8" stroke-width="2.5" />

                <!-- High-Elven Golden & Diamond Tiara -->
                <polygon points="96,46 106,24 116,38 125,12 134,38 144,24 154,46" fill="#fde047" stroke="#b45309" stroke-width="2" />
                <polygon points="125,20 130,32 125,42 120,32" fill="#67e8f9" stroke="#ffffff" stroke-width="1.2" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. ROYAL ELVEN FILIGREE & CRYSTAL CONSOLE CONTROL DECK -->
      <div style="position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 26px rgba(9, 4, 24, 0.85));">
        <div style="background: linear-gradient(135deg, #2e1065 0%, #1e1b4b 50%, #3b0764 100%); border: 3px solid #fde047; border-radius: 16px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; box-shadow: inset 0 2px 0 rgba(255,255,255,0.28), 0 0 22px rgba(232, 121, 249, 0.35);">
          
          <div style="display: flex; flex-direction: column; min-width: 155px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #67e8f9; letter-spacing: 0.14em; text-transform: uppercase;">✨ CITADEL RUNE ALTAR</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #fdf4ff; letter-spacing: 0.06em;">CRYSTAL SPIRE: CALM</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.95rem; font-weight: 900; color: #3b0764; background: #fdf4ff; border: 3px solid #e879f9; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.2), 0 0 12px rgba(232,121,249,0.5);" />

          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #f472b6 0%, #9333ea 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #fde047; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 0 4px 14px rgba(236,72,153,0.5); transition: transform 0.1s;">
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

function triggerCitadelAwakening() {
  const beam = document.getElementById("citadel-sky-beam");
  const particleHost = document.getElementById("fairy-eruption-particles");

  if (beam) {
    beam.classList.remove("awakened");
    void beam.offsetWidth;
    beam.classList.add("awakened");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#67e8f9", "#f472b6", "#fde047", "#e879f9", "#ffffff"];

  for (let i = 0; i < 34; i++) {
    const p = document.createElement("div");
    const isButterfly = i < 16;
    const color = colors[i % colors.length];
    const tx = (Math.random() - 0.5) * 560 + "px";
    const ty = -(130 + Math.random() * 340) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";

    if (isButterfly) {
      p.innerHTML = `<svg viewBox="0 0 32 28" style="width:26px;height:22px;filter:drop-shadow(0 0 8px ${color});">
        <path d="M 16 14 C 6 2, 0 8, 4 16 C 6 20, 12 18, 16 14 Z" fill="${color}" />
        <path d="M 16 14 C 26 2, 32 8, 28 16 C 26 20, 20 18, 16 14 Z" fill="${color}" />
      </svg>`;
      p.style.cssText = `
        position: absolute;
        left: 76%;
        top: 50%;
        --tx: ${tx};
        --ty: ${ty};
        --rot: ${rot};
        animation: feyButterflyFlight ${1.15 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;
    } else {
      const size = 8 + Math.random() * 10;
      p.style.cssText = `
        position: absolute;
        left: 76%;
        top: 50%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #ffffff, ${color});
        box-shadow: 0 0 12px ${color};
        --tx: ${tx};
        --ty: ${ty};
        --rot: ${rot};
        animation: feyButterflyFlight ${1.0 + Math.random() * 0.5}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;
    }
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const fae = document.getElementById("fae-mascot");
  const speech = document.getElementById("fae-speech-bubble");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerCitadelAwakening();

      if (fae) {
        fae.classList.remove("titania-party", "titania-oops");
        void fae.offsetWidth;
        fae.classList.add("titania-party");
      }
      if (speech) {
        speech.textContent = "THE GRAND CITADEL SHINES!! 🏰🦋✨";
        speech.style.borderColor = "#fde047";
      }

      setStatus("✨ CITADEL AWAKENED!!");
      input.style.borderColor = "#67e8f9";

      setTimeout(() => {
        input.style.borderColor = "#e879f9";
        input.value = "";
        setStatus("CRYSTAL SPIRE: CALM");
        if (speech) {
          speech.textContent = "Magnificent magic! Cast the next rune! 🪄";
          speech.style.borderColor = "#e879f9";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (fae) {
        fae.classList.remove("titania-party", "titania-oops");
        void fae.offsetWidth;
        fae.classList.add("titania-oops");
      }
      if (speech) {
        speech.textContent = "The rune flickered! Try again! 💫";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("RUNE MISMATCH! RETRY");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#e879f9";
        input.value = "";
        setStatus("CRYSTAL SPIRE: CALM");
        if (speech) {
          speech.textContent = "Focus your starlight, apprentice! 🧚‍♀️";
          speech.style.borderColor = "#e879f9";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
