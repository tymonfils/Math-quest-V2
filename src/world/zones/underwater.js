// src/world/zones/underwater.js - Ultra-Detailed Sunken Metropolis of Atlantis, Mermaids, Full Coral Reef & Giant Pearl Clam
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
      0%, 100% { opacity: 0.3; transform: skewX(-12deg) scaleX(1); }
      50% { opacity: 0.58; transform: skewX(-9deg) scaleX(1.08); }
    }
    @keyframes kelpSway {
      0%, 100% { transform: rotate(-4deg) skewX(-3deg); }
      50% { transform: rotate(5deg) skewX(4deg); }
    }
    @keyframes anemoneWave {
      0%, 100% { transform: scaleY(1) skewX(-4deg); }
      50% { transform: scaleY(1.08) skewX(5deg); }
    }
    @keyframes swimRightSlow {
      0% { transform: translateX(-420px) translateY(0px); }
      50% { transform: translateX(50vw) translateY(-16px); }
      100% { transform: translateX(118vw) translateY(8px); }
    }
    @keyframes swimLeftMed {
      0% { transform: translateX(115vw) translateY(0px); }
      50% { transform: translateX(45vw) translateY(18px); }
      100% { transform: translateX(-320px) translateY(-10px); }
    }
    @keyframes swimRightFast {
      0% { transform: translateX(-260px) translateY(0px); }
      25% { transform: translateX(25vw) translateY(-14px); }
      50% { transform: translateX(55vw) translateY(12px); }
      75% { transform: translateX(85vw) translateY(-8px); }
      100% { transform: translateX(115vw) translateY(4px); }
    }
    @keyframes mermaidGlideRight {
      0% { transform: translateX(-280px) translateY(0px) rotate(2deg); }
      25% { transform: translateX(22vw) translateY(-22px) rotate(-4deg); }
      50% { transform: translateX(52vw) translateY(10px) rotate(3deg); }
      75% { transform: translateX(82vw) translateY(-18px) rotate(-3deg); }
      100% { transform: translateX(118vw) translateY(0px) rotate(2deg); }
    }
    @keyframes mermaidGlideLeft {
      0% { transform: translateX(118vw) translateY(0px) rotate(-2deg); }
      25% { transform: translateX(78vw) translateY(18px) rotate(4deg); }
      50% { transform: translateX(45vw) translateY(-16px) rotate(-3deg); }
      75% { transform: translateX(15vw) translateY(12px) rotate(3deg); }
      100% { transform: translateX(-280px) translateY(0px) rotate(-2deg); }
    }
    @keyframes mermaidTailBeat {
      0%, 100% { transform: rotate(-12deg); }
      50% { transform: rotate(14deg); }
    }
    @keyframes mermaidFlukeSnap {
      0%, 100% { transform: rotate(16deg) scaleY(0.92); }
      50% { transform: rotate(-18deg) scaleY(1.08); }
    }
    @keyframes mermaidHairWave {
      0%, 100% { transform: rotate(-4deg) skewY(-2deg); }
      50% { transform: rotate(6deg) skewY(3deg); }
    }
    @keyframes jellyfishPulse {
      0%, 100% { transform: translateY(0px) scaleX(1) scaleY(1); }
      45% { transform: translateY(-20px) scaleX(0.88) scaleY(1.12); }
    }
    @keyframes seahorseBob {
      0%, 100% { transform: translateY(0px) rotate(-3deg); }
      50% { transform: translateY(-12px) rotate(4deg); }
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
      50% { transform: rotate(-2.8deg); }
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
    @keyframes atlantisDomeAwaken {
      0% { opacity: 0; transform: scale(0.6); }
      20% { opacity: 1; transform: scale(1.03); }
      60% { opacity: 0.95; transform: scale(1); }
      100% { opacity: 0; transform: scale(1.12); }
    }
    @keyframes pearlSonarPulse {
      0% { opacity: 0.95; transform: scale(0.2); }
      100% { opacity: 0; transform: scale(2.8); }
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
    #atlantis-awakening-fx {
      transform-origin: 940px 360px;
      opacity: 0;
      pointer-events: none;
    }
    #atlantis-awakening-fx.erupting {
      animation: atlantisDomeAwaken 1.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    #pearl-sonar-wave {
      transform-origin: 540px 580px;
      opacity: 0;
      pointer-events: none;
    }
    #pearl-sonar-wave.erupting {
      animation: pearlSonarPulse 1.5s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="underwater-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #0ea5e9 0%, #0284c7 18%, #0369a1 42%, #075985 68%, #041e3a 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN SUNKEN METROPOLIS OF ATLANTIS, MERMAIDS & LIVING CORAL REEF SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Volumetric Underwater Sunbeam Gradient -->
          <linearGradient id="godRayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.72" />
            <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.24" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
          </linearGradient>

          <!-- Atlantis Architecture Gradients -->
          <linearGradient id="atlantisMarble" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#cffafe" />
            <stop offset="45%" stop-color="#67e8f9" />
            <stop offset="80%" stop-color="#0891b2" />
            <stop offset="100%" stop-color="#164e63" />
          </linearGradient>

          <linearGradient id="atlantisGoldDome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef9c3" />
            <stop offset="35%" stop-color="#facc15" />
            <stop offset="75%" stop-color="#ca8a04" />
            <stop offset="100%" stop-color="#713f12" />
          </linearGradient>

          <linearGradient id="atlantisCrystalSpire" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="30%" stop-color="#5eead4" />
            <stop offset="75%" stop-color="#0d9488" />
            <stop offset="100%" stop-color="#134e4a" />
          </linearGradient>

          <radialGradient id="atlantisShieldDome" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#a5f3fc" stop-opacity="0.05" />
            <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.18" />
            <stop offset="92%" stop-color="#67e8f9" stop-opacity="0.48" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.75" />
          </radialGradient>

          <radialGradient id="awakenedDomeGlow" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.35" />
            <stop offset="65%" stop-color="#38bdf8" stop-opacity="0.55" />
            <stop offset="92%" stop-color="#fde047" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />
          </radialGradient>

          <!-- Seabed & Reef Shelf Gradients -->
          <linearGradient id="farReefRidge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0369a1" />
            <stop offset="100%" stop-color="#082f49" />
          </linearGradient>

          <linearGradient id="midSandSeabed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="22%" stop-color="#0284c7" />
            <stop offset="68%" stop-color="#0c4a6e" />
            <stop offset="100%" stop-color="#041e3a" />
          </linearGradient>

          <linearGradient id="goldenSandDune" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7dd3fc" />
            <stop offset="40%" stop-color="#0ea5e9" />
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
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="25%" stop-color="#bae6fd" stop-opacity="0.45" />
            <stop offset="75%" stop-color="#38bdf8" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0.8" />
          </radialGradient>

          <!-- Rich Coral Reef & Kelp Gradients -->
          <linearGradient id="staghornCoralPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fbcfe8" />
            <stop offset="45%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#881337" />
          </linearGradient>

          <linearGradient id="tableCoralPurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f5d0fe" />
            <stop offset="50%" stop-color="#c084fc" />
            <stop offset="100%" stop-color="#581c87" />
          </linearGradient>

          <linearGradient id="tubeCoralOrange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="45%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#9a3412" />
          </linearGradient>

          <linearGradient id="kelpBladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#86efac" />
            <stop offset="45%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#064e3b" />
          </linearGradient>

          <!-- Mermaid Tail Iridescent Scales -->
          <linearGradient id="mermaidTailTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5eead4" />
            <stop offset="50%" stop-color="#0d9488" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>

          <linearGradient id="mermaidTailRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbcfe8" />
            <stop offset="50%" stop-color="#ec4899" />
            <stop offset="100%" stop-color="#701a75" />
          </linearGradient>
        </defs>

        <!-- ========================================================================= -->
        <!-- 1. OCEAN SURFACE RIPPLES & VOLUMETRIC SUNLIGHT GOD-RAYS                   -->
        <!-- ========================================================================= -->
        <path d="M 0 0 L 1440 0 L 1440 48 Q 1260 68 1080 42 Q 900 18 720 46 Q 540 72 360 42 Q 180 16 0 48 Z" fill="#bae6fd" opacity="0.55" />
        <path d="M 0 0 L 1440 0 L 1440 26 Q 1180 46 920 22 Q 660 2 400 28 Q 180 48 0 24 Z" fill="#ffffff" opacity="0.65" />

        <!-- Shimmering Diagonal Sunbeams Piercing the Deep -->
        <g style="animation: sunRayShimmer 6s ease-in-out infinite;">
          <polygon points="140,0 290,0 490,680 220,680" fill="url(#godRayGrad)" />
          <polygon points="460,0 650,0 890,740 590,740" fill="url(#godRayGrad)" />
          <polygon points="840,0 1020,0 1260,680 980,680" fill="url(#godRayGrad)" />
          <polygon points="1160,0 1310,0 1490,620 1310,620" fill="url(#godRayGrad)" />
        </g>

        <!-- Distant Abyssal Mountain Range -->
        <path d="M -60 495 Q 260 400 620 470 T 1320 440 L 1480 480 L 1480 900 L -60 900 Z" fill="url(#farReefRidge)" opacity="0.82" />

        <!-- ========================================================================= -->
        <!-- 2. THE GRAND SUNKEN METROPOLIS OF ATLANTIS (BACKGROUND MASTERPIECE)       -->
        <!-- ========================================================================= -->
        <g transform="translate(650, 125)" filter="drop-shadow(0 14px 28px rgba(2, 12, 27, 0.75))">
          
          <!-- Protective Translucent Hydro-Shield Dome Over the City -->
          <path d="M -25 365 A 315 275 0 0 1 605 365 Z" fill="url(#atlantisShieldDome)" stroke="#a5f3fc" stroke-width="2" stroke-opacity="0.65" />

          <!-- Terraced Atlantean Acropolis Foundation Cliffs & Aqueducts -->
          <polygon points="-45,365 625,365 585,425 -5,425" fill="#083344" stroke="#06b6d4" stroke-width="2" />
          <polygon points="15,325 565,325 595,365 -15,365" fill="#0e7490" stroke="#67e8f9" stroke-width="2" />
          <!-- Glowing Aqueduct Arches Along the Lower Terrace -->
          <g fill="#041e3a" stroke="#fde047" stroke-width="1.5">
            <path d="M 35 365 L 35 342 A 14 14 0 0 1 63 342 L 63 365 Z" />
            <path d="M 85 365 L 85 342 A 14 14 0 0 1 113 342 L 113 365 Z" />
            <path d="M 135 365 L 135 342 A 14 14 0 0 1 163 342 L 163 365 Z" />
            <path d="M 415 365 L 415 342 A 14 14 0 0 1 443 342 L 443 365 Z" />
            <path d="M 465 365 L 465 342 A 14 14 0 0 1 493 342 L 493 365 Z" />
            <path d="M 515 365 L 515 342 A 14 14 0 0 1 543 342 L 543 365 Z" />
          </g>

          <!-- Left & Right Suspension Viaduct Bridges Connecting Outer Towers -->
          <path d="M 75 265 Q 130 245 185 265 L 185 282 Q 130 265 75 282 Z" fill="url(#atlantisMarble)" stroke="#0891b2" stroke-width="1.5" />
          <path d="M 395 265 Q 450 245 505 265 L 505 282 Q 450 265 395 282 Z" fill="url(#atlantisMarble)" stroke="#0891b2" stroke-width="1.5" />

          <!-- Outer Flanking Spire Towers (Left & Right) -->
          <rect x="32" y="195" width="46" height="130" fill="url(#atlantisMarble)" stroke="#0e7490" stroke-width="1.8" />
          <path d="M 24 195 C 24 155, 55 135, 55 95 C 55 135, 86 155, 86 195 Z" fill="url(#atlantisGoldDome)" stroke="#fef08a" stroke-width="1.5" />
          <polygon points="50,95 55,55 60,95" fill="#67e8f9" />

          <rect x="502" y="195" width="46" height="130" fill="url(#atlantisMarble)" stroke="#0e7490" stroke-width="1.8" />
          <path d="M 494 195 C 494 155, 525 135, 525 95 C 525 135, 556 155, 556 195 Z" fill="url(#atlantisGoldDome)" stroke="#fef08a" stroke-width="1.5" />
          <polygon points="520,95 525,55 530,95" fill="#67e8f9" />

          <!-- Mid-Tier Crystalline Orichalcum Obelisk Towers -->
          <rect x="118" y="155" width="54" height="170" fill="url(#atlantisMarble)" stroke="#0e7490" stroke-width="2" />
          <polygon points="110,155 145,55 180,155" fill="url(#atlantisCrystalSpire)" stroke="#a5f3fc" stroke-width="1.8" />
          <!-- Floating Energy Crystal Above Left Spire -->
          <polygon points="145,18 154,34 145,50 136,34" fill="#fde047" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 10px #fde047)" />

          <rect x="408" y="155" width="54" height="170" fill="url(#atlantisMarble)" stroke="#0e7490" stroke-width="2" />
          <polygon points="400,155 435,55 470,155" fill="url(#atlantisCrystalSpire)" stroke="#a5f3fc" stroke-width="1.8" />
          <!-- Floating Energy Crystal Above Right Spire -->
          <polygon points="435,18 444,34 435,50 426,34" fill="#fde047" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 10px #fde047)" />

          <!-- ======================================================= -->
          <!-- CENTRAL ROYAL PANTHEON OF POSEIDON (MAIN CITADEL)       -->
          <!-- ======================================================= -->
          <!-- Grand Ribbed Golden & Pearl Rotunda Dome -->
          <path d="M 182 185 C 182 85, 398 85, 398 185 Z" fill="url(#atlantisGoldDome)" stroke="#fef9c3" stroke-width="2.5" />
          <!-- Dome Meridian Ribs -->
          <path d="M 290 110 L 290 185 M 290 110 C 245 125, 225 155, 220 185 M 290 110 C 335 125, 355 155, 360 185" fill="none" stroke="#fef9c3" stroke-width="2" opacity="0.75" />
          <!-- Central Spire & Giant Golden Trident Finial -->
          <polygon points="274,112 290,22 306,112" fill="url(#atlantisCrystalSpire)" stroke="#ffffff" stroke-width="2" />
          <path d="M 276 26 L 280 2 L 290 22 L 300 2 L 304 26 Q 290 36 276 26 Z" fill="#fde047" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 12px #fde047)" />

          <!-- Classical Triangular Temple Pediment & Fluted Marble Colonnade -->
          <rect x="175" y="185" width="230" height="140" fill="#083344" stroke="#67e8f9" stroke-width="2" />
          <polygon points="165,190 290,142 415,190" fill="url(#atlantisMarble)" stroke="#fde047" stroke-width="2.5" />
          <circle cx="290" cy="172" r="12" fill="#38bdf8" stroke="#fde047" stroke-width="2" filter="drop-shadow(0 0 8px #38bdf8)" />

          <!-- 8 Fluted Marble Columns Across the Pantheon Facade -->
          <g fill="url(#atlantisMarble)" stroke="#0e7490" stroke-width="1.2">
            <rect x="184" y="190" width="14" height="135" />
            <rect x="212" y="190" width="14" height="135" />
            <rect x="240" y="190" width="14" height="135" />
            <rect x="268" y="190" width="14" height="135" />
            <rect x="298" y="190" width="14" height="135" />
            <rect x="326" y="190" width="14" height="135" />
            <rect x="354" y="190" width="14" height="135" />
            <rect x="382" y="190" width="14" height="135" />
          </g>

          <!-- Illuminated Bioluminescent Windows Across the Towers -->
          <g fill="#fef08a" filter="drop-shadow(0 0 6px #fde047)">
            <rect x="48" y="215" width="14" height="24" rx="7" />
            <rect x="48" y="255" width="14" height="24" rx="7" />
            <rect x="136" y="180" width="18" height="32" rx="9" />
            <rect x="136" y="228" width="18" height="32" rx="9" />
            <rect x="426" y="180" width="18" height="32" rx="9" />
            <rect x="426" y="228" width="18" height="32" rx="9" />
            <rect x="518" y="215" width="14" height="24" rx="7" />
            <rect x="518" y="255" width="14" height="24" rx="7" />
            <!-- Grand Glowing Sanctuary Portal in Center of Colonnade -->
            <path d="M 272 325 L 272 255 A 18 18 0 0 1 308 255 L 308 325 Z" fill="#67e8f9" stroke="#fde047" stroke-width="2" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 3. UNIQUE SUCCESS EVENT: AWAKENING OF ATLANTIS SHIELD & ENERGY ARCS       -->
        <!-- ========================================================================= -->
        <g id="atlantis-awakening-fx">
          <path d="M 625 490 A 315 275 0 0 1 1255 490 Z" fill="url(#awakenedDomeGlow)" />
          <!-- High-Voltage Orichalcum Energy Beams Connecting the Spires -->
          <polyline points="705,220 795,158 940,145 1085,158 1175,220" fill="none" stroke="#fef08a" stroke-width="5" filter="drop-shadow(0 0 16px #fde047)" />
          <circle cx="940" cy="145" r="28" fill="#ffffff" filter="drop-shadow(0 0 25px #67e8f9)" />
          <circle cx="795" cy="158" r="16" fill="#fef08a" />
          <circle cx="1085" cy="158" r="16" fill="#fef08a" />
        </g>

        <!-- ========================================================================= -->
        <!-- 4. MARINE LIFE & MERMAIDS (WHALE SHARK FACING FORWARD + 2 MERMAIDS!)      -->
        <!-- ========================================================================= -->

        <!-- LAYER A: Colossal Whale Shark Swimming RIGHT (Head at +X, Tail at -X!) -->
        <g style="animation: swimRightSlow 42s linear infinite;">
          <g transform="translate(0, 95)" opacity="0.72">
            <!-- Sweeping Crescent Caudal Tail Fin (On Left / Back!) -->
            <path d="M 68 58 L 14 16 L 32 58 L 18 96 L 68 68 Z" fill="#0c4a6e" stroke="#082f49" stroke-width="2" />
            <!-- Tall Dorsal Fin & Pectoral Wing Fin -->
            <path d="M 165 36 L 142 2 L 202 32 Z" fill="#0c4a6e" />
            <!-- Massive Streamlined Whale Shark Body Facing RIGHT (+X) -->
            <path d="M 62 56 C 120 32, 225 22, 315 44 C 335 49, 342 58, 332 66 C 312 74, 265 78, 195 78 C 135 78, 85 70, 62 66 Z" fill="#075985" stroke="#082f49" stroke-width="2" />
            <!-- Lighter Counter-Shaded White Underbelly -->
            <path d="M 85 66 Q 210 82 332 64 Q 265 78 195 78 Q 130 78 85 66 Z" fill="#bae6fd" opacity="0.8" />
            <!-- Sweeping Pectoral Fin -->
            <path d="M 245 64 L 205 108 L 272 68 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />
            <!-- Whale Shark White Checkerboard Spots & Stripes -->
            <g fill="#e0f2fe" opacity="0.85">
              <circle cx="135" cy="52" r="2.8" /><circle cx="155" cy="46" r="2.5" /><circle cx="155" cy="58" r="2.8" />
              <circle cx="178" cy="44" r="3" /><circle cx="178" cy="56" r="2.5" /><circle cx="202" cy="42" r="3" />
              <circle cx="202" cy="55" r="2.8" /><circle cx="226" cy="44" r="3" /><circle cx="226" cy="56" r="2.5" />
              <circle cx="250" cy="46" r="2.8" /><circle cx="250" cy="56" r="2.5" />
            </g>
            <!-- Five Gill Slits Behind Head (On Right Side) -->
            <path d="M 272 46 L 272 62 M 278 46 L 278 62 M 284 47 L 284 61 M 290 48 L 290 60" stroke="#041e3a" stroke-width="2" />
            <!-- Forward-Facing Eye & Wide Filter-Feeding Mouth at Front (+X) -->
            <circle cx="316" cy="52" r="3" fill="#020617" /><circle cx="317" cy="51" r="1" fill="#ffffff" />
            <path d="M 336 58 Q 322 61 312 58" fill="none" stroke="#041e3a" stroke-width="2" />
            <!-- Two Little Remora Pilot Fish Swimming Under the Whale Shark! -->
            <ellipse cx="245" cy="86" rx="12" ry="3.5" fill="#38bdf8" />
            <ellipse cx="215" cy="92" rx="10" ry="3" fill="#7dd3fc" />
          </g>
        </g>

        <!-- LAYER B: MERMAID #1 (Swimming Gracefully Left-to-Right Across Midwater!) -->
        <g style="animation: mermaidGlideRight 24s linear infinite;">
          <g transform="translate(0, 210) scale(0.92)" filter="drop-shadow(0 8px 14px rgba(2,12,27,0.45))">
            <!-- Flowing Ruby-Coral Hair Streaming Behind Her -->
            <g style="transform-origin: 135px 38px; animation: mermaidHairWave 2.2s ease-in-out infinite;">
              <path d="M 140 30 C 105 12, 58 18, 32 36 C 55 46, 85 52, 132 48 Z" fill="#e11d48" stroke="#881337" stroke-width="2" />
              <path d="M 135 36 C 98 26, 68 32, 46 42" fill="none" stroke="#fda4af" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
            </g>

            <!-- Undulating Iridescent Emerald-Teal Mermaid Tail & Translucent Fluke Fin -->
            <g style="transform-origin: 95px 56px; animation: mermaidTailBeat 1.4s ease-in-out infinite;">
              <path d="M 98 48 C 68 48, 36 56, 12 68 C 36 76, 68 74, 98 66 Z" fill="url(#mermaidTailTeal)" stroke="#0f766e" stroke-width="2.2" />
              <!-- Shimmering Scale Arcs on Tail -->
              <path d="M 82 52 Q 76 58 82 64 M 68 54 Q 62 60 68 66 M 54 56 Q 48 62 54 68 M 40 59 Q 34 64 40 69" fill="none" stroke="#99f6e4" stroke-width="1.8" opacity="0.8" />
              <!-- Decorative Waist Fin & Pearl Belt -->
              <path d="M 96 46 Q 88 38 78 44 Q 90 54 98 66 Z" fill="#5eead4" stroke="#0d9488" stroke-width="1.5" />
              <circle cx="97" cy="52" r="2.8" fill="#fef08a" /><circle cx="97" cy="58" r="2.8" fill="#fef08a" /><circle cx="97" cy="63" r="2.8" fill="#fef08a" />

              <!-- Bifurcated Translucent Caudal Fluke Fin -->
              <g style="transform-origin: 14px 68px; animation: mermaidFlukeSnap 1.4s ease-in-out infinite;">
                <path d="M 16 68 C -8 45, -24 52, -16 68 C -26 84, -8 92, 16 68 Z" fill="rgba(94, 234, 212, 0.78)" stroke="#2dd4bf" stroke-width="2" />
                <path d="M 12 68 L -10 56 M 12 68 L -12 68 M 12 68 L -10 80" stroke="#ccfbf1" stroke-width="1.5" />
              </g>
            </g>

            <!-- Mermaid Torso, Purple Seashell Top & Outstretched Arms -->
            <path d="M 96 48 C 112 44, 128 44, 140 50 C 138 62, 114 66, 96 65 Z" fill="#fde68a" stroke="#92400e" stroke-width="2" />
            <!-- Seashell Bodice -->
            <ellipse cx="124" cy="54" rx="6" ry="5" fill="#c084fc" stroke="#6b21a8" stroke-width="1.5" />
            <ellipse cx="132" cy="55" rx="5.5" ry="4.5" fill="#d8b4fe" stroke="#6b21a8" stroke-width="1.5" />
            <!-- Graceful Arms Holding a Glowing Pearl -->
            <path d="M 134 52 C 152 56, 166 54, 176 48" fill="none" stroke="#fde68a" stroke-width="5.5" stroke-linecap="round" />
            <circle cx="182" cy="45" r="6" fill="url(#giantPearlOrb)" filter="drop-shadow(0 0 8px #ffffff)" />

            <!-- Sculpted Mermaid Head, Crown Hair & Starfish Clip -->
            <circle cx="146" cy="38" r="13" fill="#fde68a" stroke="#92400e" stroke-width="2" />
            <path d="M 134 36 C 134 22, 156 22, 158 34 C 150 30, 142 30, 134 36 Z" fill="#e11d48" stroke="#881337" stroke-width="1.8" />
            <circle cx="151" cy="37" r="2.2" fill="#0f172a" /><circle cx="152" cy="36" r="0.8" fill="#ffffff" />
            <path d="M 149 43 Q 153 46 156 43" fill="none" stroke="#92400e" stroke-width="1.6" stroke-linecap="round" />
            <!-- Golden Starfish Hairpin -->
            <polygon points="140,26 142,30 146,30 143,33 144,37 140,34 136,37 137,33 134,30 138,30" fill="#fde047" stroke="#b45309" stroke-width="1" />
          </g>
        </g>

        <!-- LAYER C: MERMAID #2 (Swimming Right-to-Left Near Atlantis!) -->
        <g style="animation: mermaidGlideLeft 31s linear 5s infinite;">
          <!-- Flipped horizontally via scale(-0.76, 0.76) so she faces LEFT (-X)! -->
          <g transform="translate(0, 165) scale(-0.76, 0.76)" filter="drop-shadow(0 6px 12px rgba(2,12,27,0.4))">
            <g style="transform-origin: 135px 38px; animation: mermaidHairWave 2.5s ease-in-out infinite;">
              <path d="M 140 30 C 102 10, 54 16, 28 34 C 52 46, 85 52, 132 48 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
            </g>
            <g style="transform-origin: 95px 56px; animation: mermaidTailBeat 1.5s ease-in-out infinite;">
              <path d="M 98 48 C 68 48, 36 56, 12 68 C 36 76, 68 74, 98 66 Z" fill="url(#mermaidTailRose)" stroke="#9d174d" stroke-width="2.2" />
              <path d="M 80 52 Q 74 58 80 64 M 64 55 Q 58 61 64 67 M 48 58 Q 42 63 48 68" fill="none" stroke="#fbcfe8" stroke-width="1.8" />
              <g style="transform-origin: 14px 68px; animation: mermaidFlukeSnap 1.5s ease-in-out infinite;">
                <path d="M 16 68 C -8 45, -24 52, -16 68 C -26 84, -8 92, 16 68 Z" fill="rgba(244, 114, 182, 0.8)" stroke="#fbcfe8" stroke-width="2" />
              </g>
            </g>
            <path d="M 96 48 C 112 44, 128 44, 140 50 C 138 62, 114 66, 96 65 Z" fill="#fed7aa" stroke="#9a3412" stroke-width="2" />
            <ellipse cx="126" cy="54" rx="6" ry="5" fill="#38bdf8" stroke="#0369a1" stroke-width="1.5" />
            <path d="M 134 52 C 152 56, 166 54, 176 48" fill="none" stroke="#fed7aa" stroke-width="5.5" stroke-linecap="round" />
            <circle cx="146" cy="38" r="13" fill="#fed7aa" stroke="#9a3412" stroke-width="2" />
            <path d="M 134 36 C 134 22, 156 22, 158 34 C 150 30, 142 30, 134 36 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8" />
            <circle cx="151" cy="37" r="2.2" fill="#0f172a" />
          </g>
        </g>

        <!-- LAYER D: Graceful Green Sea Turtle Swimming Left -->
        <g style="animation: swimLeftMed 28s linear infinite;">
          <g transform="translate(0, 275) scale(0.86)">
            <path d="M 118 52 C 138 48, 148 58, 132 64 Z" fill="#15803d" stroke="#052e16" stroke-width="2" />
            <path d="M 32 42 C 12 36, 4 48, 16 56 C 24 60, 34 56, 38 50 Z" fill="#22c55e" stroke="#052e16" stroke-width="2.2" />
            <circle cx="18" cy="45" r="3" fill="#0f172a" /><circle cx="17" cy="44" r="1" fill="#ffffff" />
            <path d="M 34 46 C 42 12, 108 12, 124 48 C 102 58, 52 58, 34 46 Z" fill="#b45309" stroke="#451a03" stroke-width="2.5" />
            <polygon points="56,28 74,24 82,36 68,44 52,38" fill="#d97706" stroke="#451a03" stroke-width="1.8" />
            <polygon points="84,26 102,30 106,42 86,44 82,36" fill="#d97706" stroke="#451a03" stroke-width="1.8" />
            <path d="M 34 46 Q 78 58 124 48" fill="none" stroke="#fde047" stroke-width="3" />
            <path d="M 48 48 C 36 74, 54 92, 68 78 C 66 64, 60 54, 56 48 Z" fill="#22c55e" stroke="#052e16" stroke-width="2.2" />
          </g>
        </g>

        <!-- LAYER E: School of Tropical Regal Blue Tangs & Clownfish Swimming Right -->
        <g style="animation: swimRightFast 19s linear infinite;">
          <g transform="translate(0, 325)">
            <g transform="translate(65, 0)">
              <polygon points="-14,0 -28,-12 -24,0 -28,12" fill="#fde047" stroke="#0f172a" stroke-width="2" />
              <ellipse cx="0" cy="0" rx="22" ry="14" fill="#2563eb" stroke="#0f172a" stroke-width="2.2" />
              <path d="M -12 -4 C -2 -12, 12 -8, 14 2 C 6 4, -4 0, -12 6 Z" fill="#0f172a" />
              <circle cx="12" cy="-3" r="3" fill="#ffffff" /><circle cx="13" cy="-3" r="1.5" fill="#0f172a" />
            </g>
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
          </g>
        </g>

        <!-- LAYER F: Bioluminescent Pulsing Jellyfish -->
        <g transform="translate(1285, 185)">
          <g style="animation: jellyfishPulse 3.6s ease-in-out infinite;" filter="drop-shadow(0 0 14px rgba(244,114,182,0.8))">
            <path d="M -18 22 Q -26 55 -14 88 M -6 24 Q 4 60 -6 96 M 8 24 Q 18 58 8 92 M 20 22 Q 28 52 18 84" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-linecap="round" opacity="0.85" />
            <path d="M -34 22 C -34 -16, 34 -16, 34 22 C 22 16, 10 26, 0 20 C -10 26, -22 16, -34 22 Z" fill="rgba(244, 114, 182, 0.75)" stroke="#fbcfe8" stroke-width="2.5" />
            <ellipse cx="0" cy="6" rx="18" ry="10" fill="#fdf4ff" opacity="0.6" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 5. WALL-TO-WALL LIVING CORAL REEF & DETAILED GIANT KELP FORESTS           -->
        <!-- ========================================================================= -->
        <path d="M -100 540 Q 320 465 760 535 T 1540 505 L 1540 900 L -100 900 Z" fill="url(#midSandSeabed)" />
        <path d="M -80 595 Q 380 530 820 595 T 1540 575 L 1540 900 L -80 900 Z" fill="url(#goldenSandDune)" opacity="0.65" />

        <!-- LEFT REEF ECOSYSTEM: Multi-Bladed Kelp, Table Coral, Lacy Sea Fan, Staghorn, Brain Coral & Anemone -->
        <g transform="translate(15, 225)" filter="drop-shadow(0 10px 18px rgba(2,12,27,0.55))">
          
          <!-- Detailed Giant Kelp Forest (Central Stipe + Gas Bladders + Ruffled Blades) -->
          <g style="transform-origin: 55px 410px; animation: kelpSway 4.8s ease-in-out infinite;">
            <path d="M 55 410 C 35 330, 75 250, 48 170 C 25 90, 68 20, 52 -30" fill="none" stroke="#047857" stroke-width="7" stroke-linecap="round" />
            <!-- Left & Right Serrated Kelp Fronds with Pneumatocyst Gas Bulbs -->
            <circle cx="46" cy="65" r="5" fill="#86efac" />
            <path d="M 44 65 C 12 45, -8 62, 8 78 C 22 88, 36 78, 44 68 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="56" cy="115" r="5" fill="#86efac" />
            <path d="M 58 115 C 92 95, 112 112, 96 128 C 82 138, 68 128, 58 118 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="46" cy="168" r="5.5" fill="#86efac" />
            <path d="M 44 168 C 8 148, -14 168, 4 185 C 20 195, 36 184, 44 172 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="60" cy="222" r="5.5" fill="#86efac" />
            <path d="M 62 222 C 98 202, 118 222, 100 238 C 84 248, 70 238, 62 226 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="48" cy="280" r="6" fill="#86efac" />
            <path d="M 46 280 C 10 260, -12 280, 6 298 C 22 308, 38 296, 46 284 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
          </g>

          <!-- Second Kelp Stalk -->
          <g style="transform-origin: 120px 420px; animation: kelpSway 5.6s ease-in-out 1.1s infinite;">
            <path d="M 120 420 C 100 340, 138 265, 114 190 C 92 115, 130 50, 115 5" fill="none" stroke="#065f46" stroke-width="6" stroke-linecap="round" />
            <path d="M 112 105 C 82 88, 66 105, 82 118 C 94 126, 106 118, 112 108 Z" fill="url(#kelpBladeGrad)" />
            <path d="M 122 155 C 152 138, 168 155, 152 168 C 140 176, 128 168, 122 158 Z" fill="url(#kelpBladeGrad)" />
            <path d="M 110 210 C 80 192, 64 210, 80 224 C 92 232, 104 224, 110 214 Z" fill="url(#kelpBladeGrad)" />
          </g>

          <!-- Golden Seahorse Bobbing Next to the Kelp -->
          <g transform="translate(148, 175)">
            <g style="animation: seahorseBob 3.2s ease-in-out infinite;">
              <path d="M 12 12 C 12 2, 24 2, 26 10 L 36 12 L 26 16 C 32 24, 30 38, 20 44 C 12 50, 14 62, 22 62 C 26 62, 26 56, 22 56" fill="none" stroke="#fde047" stroke-width="5.5" stroke-linecap="round" />
              <path d="M 14 22 L 6 20 L 12 28 L 5 30 L 14 36 Z" fill="#f97316" />
              <circle cx="22" cy="10" r="2" fill="#0f172a" />
            </g>
          </g>

          <!-- Layered Purple Table/Plate Coral Colony -->
          <ellipse cx="185" cy="395" rx="75" ry="18" fill="url(#tableCoralPurple)" stroke="#f5d0fe" stroke-width="2" />
          <ellipse cx="165" cy="372" rx="62" ry="15" fill="url(#tableCoralPurple)" stroke="#f5d0fe" stroke-width="2" />
          <ellipse cx="205" cy="352" rx="48" ry="12" fill="url(#tableCoralPurple)" stroke="#f5d0fe" stroke-width="2" />

          <!-- Intricate Lacy Gorgonian Sea Fan Coral (Magenta/Gold Lattice) -->
          <g transform="translate(225, 255)">
            <path d="M 35 135 L 35 95 L 8 55 M 35 105 L 68 62 M 35 95 L 35 35 M 20 75 L 5 38 M 20 75 L 26 45 M 52 82 L 46 48 M 52 82 L 74 42" fill="none" stroke="#ec4899" stroke-width="5" stroke-linecap="round" />
            <path d="M 14 62 L 28 68 M 22 48 L 35 55 M 35 52 L 50 58 M 48 64 L 62 56 M 12 45 L 24 52" fill="none" stroke="#f472b6" stroke-width="2.2" />
            <circle cx="8" cy="55" r="3.5" fill="#fde047" /><circle cx="5" cy="38" r="3.5" fill="#fde047" />
            <circle cx="35" cy="35" r="4" fill="#fde047" /><circle cx="74" cy="42" r="3.5" fill="#fde047" />
          </g>

          <!-- Dense Branching Staghorn Coral Colony -->
          <path d="M 145 385 C 145 340, 115 305, 98 272 C 110 266, 128 292, 148 320 C 148 282, 140 248, 152 232 C 164 248, 158 282, 158 318 C 178 290, 198 268, 210 276 C 192 305, 170 338, 166 385 Z" fill="url(#staghornCoralPink)" stroke="#fecdd3" stroke-width="1.8" />

          <!-- Clustered Organ-Pipe & Barrel Sponges -->
          <rect x="22" y="325" width="20" height="75" rx="8" transform="rotate(-12 22 325)" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="2" />
          <ellipse cx="26" cy="326" rx="10" ry="4" transform="rotate(-12 26 326)" fill="#451a03" />
          <rect x="46" y="308" width="22" height="92" rx="9" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="2" />
          <ellipse cx="57" cy="308" rx="11" ry="4.5" fill="#451a03" />
          <rect x="72" y="330" width="18" height="70" rx="7" transform="rotate(10 72 330)" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="2" />

          <!-- Bioluminescent Grooved Brain Coral -->
          <ellipse cx="105" cy="402" rx="52" ry="34" fill="#0d9488" stroke="#5eead4" stroke-width="2.5" />
          <path d="M 68 396 Q 86 380 105 396 T 142 396 M 74 410 Q 92 396 112 410 T 138 408 M 82 382 Q 105 372 128 382" fill="none" stroke="#ccfbf1" stroke-width="2.8" stroke-linecap="round" />

          <!-- Waving Neon Sea Anemone on Reef Edge -->
          <g transform="translate(265, 365)">
            <path d="M 0 35 C 0 18, 48 18, 48 35 Z" fill="#be185d" stroke="#831843" stroke-width="2" />
            <g style="transform-origin: 24px 25px; animation: anemoneWave 2.8s ease-in-out infinite;">
              <path d="M 8 22 Q 2 4 6 -4 M 16 20 Q 14 0 18 -8 M 24 20 Q 24 -2 26 -10 M 32 20 Q 36 0 34 -6 M 40 22 Q 46 6 42 -2" fill="none" stroke="#f472b6" stroke-width="4.5" stroke-linecap="round" />
              <circle cx="6" cy="-4" r="3" fill="#fde047" /><circle cx="18" cy="-8" r="3" fill="#fde047" />
              <circle cx="26" cy="-10" r="3" fill="#fde047" /><circle cx="34" cy="-6" r="3" fill="#fde047" />
              <circle cx="42" cy="-2" r="3" fill="#fde047" />
            </g>
          </g>
        </g>

        <!-- RIGHT REEF ECOSYSTEM: Kelp Forest, Staghorn Colony, Table Corals, Sea Fans & Brain Coral -->
        <g transform="translate(1135, 245)" filter="drop-shadow(0 10px 18px rgba(2,12,27,0.55))">
          <!-- Detailed Giant Kelp Forest -->
          <g style="transform-origin: 215px 395px; animation: kelpSway 5.1s ease-in-out 0.4s infinite;">
            <path d="M 215 395 C 195 315, 235 235, 208 155 C 185 80, 228 15, 212 -25" fill="none" stroke="#047857" stroke-width="7" stroke-linecap="round" />
            <circle cx="206" cy="75" r="5" fill="#86efac" />
            <path d="M 204 75 C 172 55, 152 72, 168 88 C 182 98, 196 88, 204 78 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="216" cy="128" r="5" fill="#86efac" />
            <path d="M 218 128 C 252 108, 272 125, 256 142 C 242 152, 228 142, 218 132 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="206" cy="182" r="5.5" fill="#86efac" />
            <path d="M 204 182 C 168 162, 148 182, 166 198 C 182 208, 196 198, 204 186 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
            <circle cx="218" cy="238" r="5.5" fill="#86efac" />
            <path d="M 220 238 C 256 218, 276 238, 258 254 C 242 264, 228 254, 220 242 Z" fill="url(#kelpBladeGrad)" stroke="#34d399" stroke-width="1.2" />
          </g>

          <!-- Branching Pink Staghorn & Lacy Sea Fan -->
          <path d="M 85 375 C 85 330, 58 295, 42 265 C 54 260, 70 285, 88 312 C 88 275, 82 245, 92 228 C 102 245, 98 275, 98 310 C 115 285, 132 265, 144 272 C 128 298, 108 328, 105 375 Z" fill="url(#staghornCoralPink)" stroke="#fecdd3" stroke-width="1.8" />

          <!-- Tiered Table Coral & Purple Brain Coral -->
          <ellipse cx="65" cy="382" rx="68" ry="16" fill="url(#tableCoralPurple)" stroke="#f5d0fe" stroke-width="2" />
          <ellipse cx="145" cy="365" rx="54" ry="34" fill="#7e22ce" stroke="#d8b4fe" stroke-width="2.2" />
          <path d="M 108 360 Q 126 344 145 360 T 182 360 M 114 374 Q 132 360 152 374 T 178 372 M 122 346 Q 145 336 168 346" fill="none" stroke="#67e8f9" stroke-width="2.6" stroke-linecap="round" />

          <!-- Orange Barrel Sponges -->
          <rect x="195" y="315" width="22" height="78" rx="9" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="2" />
          <ellipse cx="206" cy="315" rx="11" ry="4.5" fill="#451a03" />
          <rect x="222" y="332" width="18" height="62" rx="7" transform="rotate(12 222 332)" fill="url(#tubeCoralOrange)" stroke="#7c2d12" stroke-width="2" />
        </g>

        <!-- ========================================================================= -->
        <!-- 6. CONTINUOUS RISING 3D BUBBLE STREAMS ACROSS THE REEF                    -->
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

        <!-- Expanding Harmonic Pearl Sonar Ring (Fires on Correct Answer!) -->
        <g id="pearl-sonar-wave">
          <circle cx="540" cy="580" r="140" fill="none" stroke="#fde047" stroke-width="6" />
          <circle cx="540" cy="580" r="95" fill="none" stroke="#67e8f9" stroke-width="4" stroke-dasharray="18 10" />
        </g>

        <!-- FOREGROUND ABYSSAL REEF TRENCH SILHOUETTE -->
        <path d="M -120 735 Q 280 685 680 745 T 1560 715 L 1560 920 L -120 920 Z" fill="url(#nearReefForeground)" />
        <path d="M -120 735 Q 280 685 680 745 T 1560 715" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.45" />
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR GOLDEN SEAHORSES, PEARLS & PRISM BUBBLES -->
      <div id="underwater-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. GROUNDED REEF STAGE: COLOSSAL OPEN GIANT CLAM (MATH BOARD) + PROFESSOR OCTAVIUS -->
      <div style="position: absolute; bottom: 172px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 28px; width: 95%; max-width: 950px; z-index: 5; pointer-events: none;">

        <!-- THE COLOSSAL OPEN GIANT CLAM & MOTHER-OF-PEARL MATH BOARD -->
        <div id="giant-clam-board" style="position: relative; width: 455px; max-width: 58vw; height: 315px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2;">
          
          <svg viewBox="0 0 480 340" style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 20px 32px rgba(2, 11, 24, 0.85));">
            <ellipse cx="240" cy="322" rx="210" ry="24" fill="rgba(2, 11, 24, 0.85)" />
            <path d="M 45 318 C 35 285, 85 275, 130 292 L 350 292 C 395 275, 445 285, 435 318 Z" fill="#0f766e" stroke="#134e4a" stroke-width="3" />

            <!-- UPPER SCALLOPED GIANT CLAM VALVE (Gently Breathes Open) -->
            <g style="transform-origin: 240px 265px; animation: clamTopBreathe 4.2s ease-in-out infinite;">
              <path d="M 28 195 C 12 125, 58 55, 115 48 C 145 22, 190 28, 240 14 C 290 28, 335 22, 365 48 C 422 55, 468 125, 452 195 C 395 245, 295 268, 240 268 C 185 268, 85 245, 28 195 Z" fill="url(#clamShellOuter)" stroke="#f5d0fe" stroke-width="4" />

              <g stroke="#a855f7" stroke-width="3" opacity="0.65" fill="none">
                <path d="M 240 260 L 115 48" />
                <path d="M 240 260 L 175 28" />
                <path d="M 240 260 L 240 16" />
                <path d="M 240 260 L 305 28" />
                <path d="M 240 260 L 365 48" />
                <path d="M 240 260 L 55 110" />
                <path d="M 240 260 L 425 110" />
              </g>

              <path d="M 48 192 C 38 132, 75 75, 125 68 C 155 44, 195 48, 240 34 C 285 48, 325 44, 355 68 C 405 75, 442 132, 432 192 C 382 238, 292 256, 240 256 C 188 256, 98 238, 48 192 Z" fill="url(#motherOfPearlNacre)" stroke="#ffffff" stroke-width="3" />

              <ellipse cx="240" cy="155" rx="155" ry="82" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.7" />
              <ellipse cx="240" cy="158" rx="125" ry="68" fill="rgba(255, 255, 255, 0.55)" />

              <!-- THE GIANT LUMINOUS PEARL BED CRADLING THE MATH EQUATION -->
              <circle cx="240" cy="158" r="88" fill="url(#giantPearlOrb)" stroke="#ffffff" stroke-width="3.5" filter="drop-shadow(0 0 22px rgba(244,114,182,0.65))" />
              <ellipse cx="208" cy="112" rx="26" ry="12" transform="rotate(-22 208 112)" fill="#ffffff" opacity="0.75" />
            </g>

            <!-- LOWER SCALLOPED GIANT CLAM LIP & MANTLE (Foreground) -->
            <path d="M 42 225 Q 140 265 240 265 Q 340 265 438 225 Q 415 282 240 286 Q 65 282 42 225 Z" fill="#06b6d4" stroke="#67e8f9" stroke-width="3" />
            <path d="M 24 222 C 55 268, 145 278, 240 278 C 335 278, 425 268, 456 222 C 442 292, 355 322, 240 322 C 125 322, 38 292, 24 222 Z" fill="url(#clamShellOuter)" stroke="#f5d0fe" stroke-width="4" />
            <path d="M 110 262 L 135 314 M 175 274 L 188 320 M 240 278 L 240 322 M 305 274 L 292 320 M 370 262 L 345 314" stroke="#d8b4fe" stroke-width="3.5" stroke-linecap="round" opacity="0.75" />

            <!-- Sea Star & Hinge Pearls -->
            <g transform="translate(88, 285) rotate(-15)">
              <polygon points="0,-16 5,-5 16,-4 8,4 10,15 0,9 -10,15 -8,4 -16,-4 -5,-5" fill="#fb7185" stroke="#be123c" stroke-width="2" stroke-linejoin="round" />
              <circle cx="0" cy="0" r="2.5" fill="#fde047" />
            </g>
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
          <div id="octo-speech-bubble" style="background: #ecfeff; color: #0c4a6e; border: 3px solid #06b6d4; border-radius: 16px; padding: 6px 14px; font-size: 0.84rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #0e7490, 0 8px 16px rgba(0,0,0,0.5); white-space: nowrap; transition: all 0.2s;">
            Solve the Pearl to awaken sunken Atlantis! 🏛️🧜‍♀️
          </div>

          <div style="position: relative; width: 230px; height: 245px; display: flex; justify-content: center; align-items: flex-end;">
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
                </defs>

                <!-- Back Layer Tentacles -->
                <path d="M 95 168 C 52 178, 14 212, 28 238 C 40 252, 65 236, 54 222 C 46 212, 68 192, 102 184 Z" fill="#9f1239" stroke="#4c0519" stroke-width="2.5" />
                <path d="M 165 168 C 208 178, 246 212, 232 238 C 220 252, 195 236, 206 222 C 214 212, 192 192, 158 184 Z" fill="#9f1239" stroke="#4c0519" stroke-width="2.5" />

                <!-- Left Waving Tentacle -->
                <g style="transform-origin: 95px 158px; animation: tentacleWaveLeft 2.6s ease-in-out infinite;">
                  <path d="M 98 152 C 48 142, 8 112, 18 84 C 26 68, 48 76, 40 92 C 32 108, 62 128, 102 138 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                  <circle cx="38" cy="102" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <circle cx="52" cy="116" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <circle cx="68" cy="126" r="5.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                </g>

                <!-- Right Waving Tentacle Wielding Golden Trident -->
                <g style="transform-origin: 165px 158px; animation: tentacleWaveRight 2.8s ease-in-out infinite;">
                  <path d="M 162 152 C 208 142, 244 114, 236 86 C 228 68, 208 78, 214 94 C 222 108, 196 128, 158 138 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                  <circle cx="218" cy="104" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <circle cx="204" cy="118" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                  <line x1="215" y1="138" x2="238" y2="42" stroke="#fde047" stroke-width="4.5" stroke-linecap="round" />
                  <path d="M 224 46 L 230 22 L 238 42 L 246 20 L 252 48 Q 238 56 224 46 Z" fill="#fde047" stroke="#b45309" stroke-width="1.8" filter="drop-shadow(0 0 8px #fde047)" />
                </g>

                <!-- Front Planted Coiled Tentacle Legs -->
                <path d="M 105 168 C 72 192, 54 232, 76 248 C 94 256, 112 238, 98 226 C 88 218, 98 196, 118 178 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                <circle cx="82" cy="242" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                <circle cx="94" cy="236" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />

                <path d="M 126 172 C 118 205, 114 242, 130 250 C 146 254, 150 232, 138 224 C 132 216, 134 195, 138 174 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />

                <path d="M 155 168 C 188 192, 206 232, 184 248 C 166 256, 148 238, 162 226 C 172 218, 162 196, 142 178 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="2.8" />
                <circle cx="178" cy="242" r="5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />
                <circle cx="166" cy="236" r="4.5" fill="#fecdd3" stroke="#9f1239" stroke-width="1.5" />

                <!-- Bulbous Octopus Head Mantle -->
                <path d="M 74 114 C 64 52, 98 24, 130 24 C 162 24, 196 52, 186 114 C 182 152, 162 174, 130 174 C 98 174, 78 152, 74 114 Z" fill="url(#octoBodyGrad)" stroke="#4c0519" stroke-width="3.2" />
                <path d="M 92 52 Q 125 36 158 52" fill="none" stroke="#fda4af" stroke-width="6" stroke-linecap="round" opacity="0.45" />
                <circle cx="88" cy="78" r="6" fill="#fda4af" opacity="0.35" />
                <circle cx="172" cy="82" r="7" fill="#fda4af" opacity="0.35" />

                <!-- Left Eye & Right Monocle Eye -->
                <ellipse cx="108" cy="112" rx="11" ry="13" fill="#ffffff" stroke="#4c0519" stroke-width="2.5" />
                <circle cx="109" cy="113" r="6.5" fill="#0f172a" />
                <circle cx="106" cy="109" r="2.8" fill="#ffffff" />

                <ellipse cx="152" cy="112" rx="13" ry="14" fill="#e0f2fe" stroke="#fde047" stroke-width="4" />
                <circle cx="151" cy="113" r="6.5" fill="#0f172a" />
                <circle cx="148" cy="109" r="2.8" fill="#ffffff" />
                <path d="M 165 114 Q 175 135 162 152" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="3 2" />

                <!-- Smile & Bowtie -->
                <path d="M 116 134 Q 130 144 144 134" fill="none" stroke="#4c0519" stroke-width="3.2" stroke-linecap="round" />
                <polygon points="130,158 110,148 110,168" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
                <polygon points="130,158 150,148 150,168" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
                <circle cx="130" cy="158" r="5.5" fill="#fde047" stroke="#b45309" stroke-width="1.8" />

                <!-- Nautical White Captain's Hat -->
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
          
          <div style="position: absolute; top: 6px; left: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>
          <div style="position: absolute; bottom: 6px; left: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>
          <div style="position: absolute; top: 6px; right: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>
          <div style="position: absolute; bottom: 6px; right: 8px; width: 6px; height: 6px; border-radius: 50%; background: #fde047;"></div>

          <div style="display: flex; flex-direction: column; min-width: 155px; padding-left: 4px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #67e8f9; letter-spacing: 0.14em; text-transform: uppercase;">🫧 ATLANTIS SONAR</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #f0f9ff; letter-spacing: 0.06em;">CITY DOME: STANDBY</span>
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

function triggerAtlantisCityAwakening() {
  const domeFx = document.getElementById("atlantis-awakening-fx");
  const sonarWave = document.getElementById("pearl-sonar-wave");
  const clam = document.getElementById("giant-clam-board");
  const particleHost = document.getElementById("underwater-eruption-particles");

  if (domeFx) {
    domeFx.classList.remove("erupting");
    void domeFx.offsetWidth;
    domeFx.classList.add("erupting");
  }
  if (sonarWave) {
    sonarWave.classList.remove("erupting");
    void sonarWave.offsetWidth;
    sonarWave.classList.add("erupting");
  }
  if (clam) {
    clam.classList.remove("clam-pop-anim");
    void clam.offsetWidth;
    clam.classList.add("clam-pop-anim");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#fde047", "#67e8f9", "#f472b6", "#5eead4", "#ffffff"];

  for (let i = 0; i < 38; i++) {
    const p = document.createElement("div");
    const color = colors[i % colors.length];
    const fromCity = i % 2 === 0;
    const startX = fromCity ? "66%" : "40%";
    const startY = fromCity ? "38%" : "56%";
    const tx = (Math.random() - 0.5) * 580 + "px";
    const ty = -(130 + Math.random() * 340) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";

    if (i % 4 === 0) {
      // Glowing Golden Starfish / Seashell Charm
      p.innerHTML = `<svg viewBox="0 0 28 28" style="width:24px;height:24px;filter:drop-shadow(0 0 8px ${color});">
        <polygon points="14,2 17,10 26,11 19,17 21,26 14,21 7,26 9,17 2,11 11,10" fill="${color}" stroke="#ffffff" stroke-width="1.5" />
      </svg>`;
      p.style.cssText = `
        position: absolute;
        left: ${startX};
        top: ${startY};
        --tx: ${tx};
        --ty: ${ty};
        --rot: ${rot};
        animation: oceanParticleBurst ${1.15 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;
    } else {
      const size = 10 + Math.random() * 14;
      p.style.cssText = `
        position: absolute;
        left: ${startX};
        top: ${startY};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #ffffff, ${color});
        border: 1.5px solid #ffffff;
        box-shadow: 0 0 14px ${color};
        --tx: ${tx};
        --ty: ${ty};
        --rot: ${rot};
        animation: oceanParticleBurst ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;
    }
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
      triggerAtlantisCityAwakening();

      if (octo) {
        octo.classList.remove("octo-party", "octo-oops");
        void octo.offsetWidth;
        octo.classList.add("octo-party");
      }
      if (speech) {
        speech.textContent = "ATLANTIS AWAKENS!! THE DOMES SHINE! 🏛️🧜‍♀️✨";
        speech.style.borderColor = "#fde047";
      }

      setStatus("⚡ ATLANTIS DOME ACTIVE!!");
      input.style.borderColor = "#34d399";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("CITY DOME: STANDBY");
        if (speech) {
          speech.textContent = "Magnificent! Solve the next Pearl! 🦪";
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
        setStatus("CITY DOME: STANDBY");
        if (speech) {
          speech.textContent = "Steady your compass, diver! 🐙";
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
