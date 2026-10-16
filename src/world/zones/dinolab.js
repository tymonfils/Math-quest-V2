// src/world/zones/dinolab.js - High-Detail InGen Bio-Genetics & Stasis Lab Biome
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadDinoLab() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("dinolab-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "dinolab-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes floatSpecimenLeft {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(-14px) rotate(1.5deg); }
    }
    @keyframes floatSpecimenRight {
      0%, 100% { transform: translateY(-6px) rotate(2deg); }
      50% { transform: translateY(10px) rotate(-1.5deg); }
    }
    @keyframes specimenThrash {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      20% { transform: translateY(-18px) rotate(-8deg) scale(1.06); }
      45% { transform: translateY(8px) rotate(7deg) scale(1.04); }
      70% { transform: translateY(-10px) rotate(-5deg) scale(1.05); }
    }
    @keyframes vatLaserScan {
      0% { transform: translateY(0px); opacity: 0.25; }
      15% { opacity: 0.9; }
      85% { opacity: 0.9; }
      100% { transform: translateY(350px); opacity: 0.25; }
    }
    @keyframes vatBubbleRise {
      0% { transform: translateY(0px) translateX(0px) scale(0.6); opacity: 0; }
      20% { opacity: 0.85; }
      50% { transform: translateY(-160px) translateX(6px) scale(1); }
      85% { opacity: 0.75; }
      100% { transform: translateY(-330px) translateX(-5px) scale(1.35); opacity: 0; }
    }
    @keyframes cableEnergyFlow {
      0% { stroke-dashoffset: 160; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes dnaHelixSpin {
      0% { transform: scaleX(1); opacity: 0.85; }
      25% { transform: scaleX(0.2); opacity: 0.5; }
      50% { transform: scaleX(-1); opacity: 0.95; }
      75% { transform: scaleX(0.2); opacity: 0.5; }
      100% { transform: scaleX(1); opacity: 0.85; }
    }
    @keyframes triceratopsBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(2px) scaleY(0.988) scaleX(1.01); }
    }
    @keyframes triceratopsTailSway {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(6deg); }
    }
    @keyframes triceratopsArmWork {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-9deg); }
    }
    @keyframes triceratopsCelebrate {
      0% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-22px) rotate(-3deg) scale(1.04); }
      50% { transform: translateY(0) rotate(2deg) scale(0.97, 1.03); }
      75% { transform: translateY(-14px) rotate(-2deg) scale(1.02); }
      100% { transform: translateY(0) scale(1); }
    }
    @keyframes triceratopsError {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes bioSurgeOverlay {
      0% { opacity: 0; }
      20% { opacity: 0.95; }
      60% { opacity: 0.7; }
      100% { opacity: 0; }
    }
    @keyframes dnaParticleBurst {
      0% { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 1; }
      60% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.25) rotate(var(--rot)); opacity: 0; }
    }
    .specimen-left-idle {
      transform-origin: center center;
      animation: floatSpecimenLeft 5.5s ease-in-out infinite;
    }
    .specimen-right-idle {
      transform-origin: center center;
      animation: floatSpecimenRight 4.8s ease-in-out infinite;
    }
    .specimen-thrashing {
      animation: specimenThrash 0.75s ease-in-out 2 !important;
    }
    .dino-doc-idle {
      transform-origin: center bottom;
      animation: triceratopsBreathe 3.4s ease-in-out infinite;
    }
    .dino-doc-party {
      transform-origin: center bottom;
      animation: triceratopsCelebrate 0.85s ease-in-out 2 !important;
    }
    .dino-doc-oops {
      transform-origin: center bottom;
      animation: triceratopsError 0.5s ease-in-out 1 !important;
    }
    #bio-surge-flash {
      opacity: 0;
      pointer-events: none;
    }
    #bio-surge-flash.surging {
      animation: bioSurgeOverlay 1.5s ease-out forwards;
    }
    .power-conduit-active {
      stroke-dasharray: 18 22;
      animation: cableEnergyFlow 0.8s linear infinite;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="dino-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: #040811; font-family: 'Segoe UI', system-ui, sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN HIGH-DETAIL INGEN GENETICS LAB SVG ENVIRONMENT -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Deep Industrial Wall & Floor Gradients -->
          <linearGradient id="labWallBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#070d19" />
            <stop offset="45%" stop-color="#0f172a" />
            <stop offset="80%" stop-color="#111c2d" />
            <stop offset="100%" stop-color="#060b14" />
          </linearGradient>

          <linearGradient id="labFloorDeck" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#162133" />
            <stop offset="25%" stop-color="#0d1522" />
            <stop offset="100%" stop-color="#03070e" />
          </linearGradient>

          <linearGradient id="steelPillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="28%" stop-color="#334155" />
            <stop offset="50%" stop-color="#475569" />
            <stop offset="75%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>

          <linearGradient id="vatCapMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="20%" stop-color="#64748b" />
            <stop offset="50%" stop-color="#94a3b8" />
            <stop offset="80%" stop-color="#475569" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <!-- Bioluminescent Green Stasis Fluid (Left Vat) -->
          <linearGradient id="stasisFluidEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34d399" stop-opacity="0.72" />
            <stop offset="35%" stop-color="#10b981" stop-opacity="0.82" />
            <stop offset="75%" stop-color="#047857" stop-opacity="0.88" />
            <stop offset="100%" stop-color="#022c22" stop-opacity="0.95" />
          </linearGradient>

          <!-- Bioluminescent Cyan-Teal Stasis Fluid (Right Vat) -->
          <linearGradient id="stasisFluidTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.72" />
            <stop offset="35%" stop-color="#0d9488" stop-opacity="0.82" />
            <stop offset="75%" stop-color="#0f766e" stop-opacity="0.88" />
            <stop offset="100%" stop-color="#042f2e" stop-opacity="0.95" />
          </linearGradient>

          <!-- Internal Core Glow Inside Stasis Tanks -->
          <radialGradient id="vatCoreLight" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stop-color="#a7f3d0" stop-opacity="0.55" />
            <stop offset="55%" stop-color="#10b981" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#022c22" stop-opacity="0" />
          </radialGradient>

          <!-- Cylindrical Glass Specular Highlight -->
          <linearGradient id="cylinderGlassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.32" />
            <stop offset="12%" stop-color="#ffffff" stop-opacity="0.06" />
            <stop offset="22%" stop-color="#ffffff" stop-opacity="0.42" />
            <stop offset="30%" stop-color="#ffffff" stop-opacity="0.02" />
            <stop offset="82%" stop-color="#000000" stop-opacity="0.25" />
            <stop offset="94%" stop-color="#a7f3d0" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15" />
          </linearGradient>

          <!-- Volumetric Ceiling Spotlight Cone -->
          <linearGradient id="ceilingSpotlight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.18" />
            <stop offset="60%" stop-color="#10b981" stop-opacity="0.06" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
          </linearGradient>

          <!-- Amber Fossil Extraction Glow -->
          <radialGradient id="amberHelixGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95" />
            <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.65" />
            <stop offset="75%" stop-color="#b45309" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#78350f" stop-opacity="0" />
          </radialGradient>

          <!-- Diagonal Yellow/Black Industrial Hazard Stripe Pattern -->
          <pattern id="hazardStripes" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="28" height="28" fill="#0f172a" />
            <rect width="14" height="28" fill="#eab308" />
          </pattern>

          <!-- Subtle Hexagonal Lab Wall Grid -->
          <pattern id="labTechGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1" />
          </pattern>
        </defs>

        <!-- ======================================================= -->
        <!-- BACKGROUND ARCHITECTURE, PIPES & BULKHEADS              -->
        <!-- ======================================================= -->
        <rect width="1440" height="600" fill="url(#labWallBg)" />
        <rect width="1440" height="600" fill="url(#labTechGrid)" opacity="0.55" />

        <!-- Overhead Ceiling Conduit Pipes & Structural Trusses -->
        <rect x="0" y="0" width="1440" height="58" fill="#050911" stroke="#1e293b" stroke-width="2" />
        <rect x="0" y="22" width="1440" height="12" fill="url(#steelPillarGrad)" />
        <rect x="0" y="42" width="1440" height="8" fill="#0f172a" stroke="#334155" stroke-width="1" />
        <!-- Glowing Green Cryo-Fluid Supply Pipe Across Ceiling -->
        <rect x="0" y="62" width="1440" height="10" fill="#022c22" stroke="#059669" stroke-width="1.5" />
        <line x1="0" y1="67" x2="1440" y2="67" stroke="#34d399" stroke-width="3" stroke-dasharray="24 14" opacity="0.7" />

        <!-- Structural Ribbed Steel Columns -->
        <g>
          <rect x="38" y="58" width="42" height="545" fill="url(#steelPillarGrad)" />
          <rect x="415" y="58" width="38" height="545" fill="url(#steelPillarGrad)" />
          <rect x="987" y="58" width="38" height="545" fill="url(#steelPillarGrad)" />
          <rect x="1360" y="58" width="42" height="545" fill="url(#steelPillarGrad)" />
          <!-- Column Warning Stencils -->
          <rect x="419" y="280" width="30" height="55" fill="url(#hazardStripes)" opacity="0.8" />
          <rect x="991" y="280" width="30" height="55" fill="url(#hazardStripes)" opacity="0.8" />
        </g>

        <!-- Volumetric Overhead Light Cones -->
        <polygon points="160,58 310,58 395,600 75,600" fill="url(#ceilingSpotlight)" />
        <polygon points="620,58 820,58 940,600 500,600" fill="url(#ceilingSpotlight)" />
        <polygon points="1130,58 1280,58 1365,600 1045,600" fill="url(#ceilingSpotlight)" />

        <!-- ======================================================= -->
        <!-- CENTER BACKGROUND: AMBER DNA EXTRACTION INCUBATOR       -->
        <!-- ======================================================= -->
        <g transform="translate(720, 215)">
          <!-- Recessed Wall Bay -->
          <rect x="-235" y="-115" width="470" height="295" rx="18" fill="#060c17" stroke="#1e293b" stroke-width="4" />
          <!-- Left Telemetry Sub-Screen -->
          <rect x="-215" y="-95" width="130" height="105" rx="6" fill="#021f1a" stroke="#0d9488" stroke-width="2" />
          <path d="M -205 -45 L -185 -45 L -175 -75 L -162 -20 L -150 -55 L -135 -45 L -95 -45" fill="none" stroke="#2dd4bf" stroke-width="2.5" />
          <text x="-205" y="-78" fill="#5eead4" font-family="monospace" font-size="9" font-weight="bold">HEARTBEAT: 68 BPM</text>
          <text x="-205" y="-5" fill="#94a3b8" font-family="monospace" font-size="9">GENOME: 99.4% PURE</text>

          <!-- Right Telemetry Sub-Screen -->
          <rect x="85" y="-95" width="130" height="105" rx="6" fill="#021f1a" stroke="#0d9488" stroke-width="2" />
          <rect x="98" y="-72" width="104" height="8" rx="2" fill="#064e3b" />
          <rect x="98" y="-72" width="88" height="8" rx="2" fill="#34d399" />
          <rect x="98" y="-54" width="104" height="8" rx="2" fill="#064e3b" />
          <rect x="98" y="-54" width="72" height="8" rx="2" fill="#facc15" />
          <rect x="98" y="-36" width="104" height="8" rx="2" fill="#064e3b" />
          <rect x="98" y="-36" width="96" height="8" rx="2" fill="#38bdf8" />
          <text x="98" y="-80" fill="#5eead4" font-family="monospace" font-size="9" font-weight="bold">AMINO SEQUENCE</text>
          <text x="98" y="-5" fill="#facc15" font-family="monospace" font-size="9">SECTOR 04: ACTIVE</text>

          <!-- Center Amber DNA Centrifuge Chamber -->
          <circle cx="0" cy="-25" r="68" fill="#091322" stroke="#334155" stroke-width="5" />
          <circle cx="0" cy="-25" r="58" fill="url(#amberHelixGlow)" />
          <!-- Rotating Double Helix & Amber Fossil Mosquito -->
          <g style="transform-origin: 0px -25px; animation: dnaHelixSpin 6s ease-in-out infinite;">
            <path d="M -22 -65 C 22 -45, -22 -5, 22 15" fill="none" stroke="#fef08a" stroke-width="3.5" />
            <path d="M 22 -65 C -22 -45, 22 -5, -22 15" fill="none" stroke="#f97316" stroke-width="3.5" />
            <line x1="-14" y1="-55" x2="14" y2="-55" stroke="#ffffff" stroke-width="2" opacity="0.7" />
            <line x1="-16" y1="-25" x2="16" y2="-25" stroke="#ffffff" stroke-width="2" opacity="0.7" />
            <line x1="-14" y1="5" x2="14" y2="5" stroke="#ffffff" stroke-width="2" opacity="0.7" />
          </g>
          <text x="-58" y="62" fill="#fbbf24" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="2">INGEN BIO-CORE</text>
        </g>

        <!-- ======================================================= -->
        <!-- PERSPECTIVE LAB FLOOR, SUB-FLOOR TRENCHES & GRATING     -->
        <!-- ======================================================= -->
        <polygon points="0,585 1440,585 1440,900 0,900" fill="url(#labFloorDeck)" />
        <!-- Industrial Hazard Baseboard -->
        <rect x="0" y="575" width="1440" height="14" fill="url(#hazardStripes)" />
        <line x1="0" y1="575" x2="1440" y2="575" stroke="#eab308" stroke-width="2" />
        <line x1="0" y1="589" x2="1440" y2="589" stroke="#020617" stroke-width="3" />

        <!-- Perspective Floor Grid Lines -->
        <g stroke="#1e293b" stroke-width="1.5" opacity="0.7">
          <line x1="720" y1="589" x2="720" y2="900" />
          <line x1="580" y1="589" x2="420" y2="900" />
          <line x1="440" y1="589" x2="120" y2="900" />
          <line x1="300" y1="589" x2="-180" y2="900" />
          <line x1="860" y1="589" x2="1020" y2="900" />
          <line x1="1000" y1="589" x2="1320" y2="900" />
          <line x1="1140" y1="589" x2="1620" y2="900" />
          <line x1="0" y1="635" x2="1440" y2="635" />
          <line x1="0" y1="695" x2="1440" y2="695" />
          <line x1="0" y1="770" x2="1440" y2="770" />
        </g>

        <!-- High-Voltage Bio-Fluid Floor Conduits Connecting Vats to Central Terminal -->
        <path d="M 235 615 Q 320 665 530 665" fill="none" stroke="#042f2e" stroke-width="14" stroke-linecap="round" />
        <path class="power-conduit-active" d="M 235 615 Q 320 665 530 665" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round" />

        <path d="M 1205 615 Q 1120 665 890 665" fill="none" stroke="#042f2e" stroke-width="14" stroke-linecap="round" />
        <path class="power-conduit-active" d="M 1205 615 Q 1120 665 890 665" fill="none" stroke="#2dd4bf" stroke-width="5" stroke-linecap="round" />

        <!-- ======================================================================= -->
        <!-- GIANT STASIS VAT #1 (LEFT — SPECIMEN #01: JUVENILE TYRANNOSAURUS REX)   -->
        <!-- ======================================================================= -->
        <g transform="translate(105, 92)" filter="drop-shadow(0 20px 35px rgba(0,0,0,0.85))">
          <!-- Ceiling Feed Hoses into Top of Vat -->
          <path d="M 45 -35 C 45 5, 75 -10, 75 20" fill="none" stroke="#334155" stroke-width="10" />
          <path d="M 185 -35 C 185 5, 155 -10, 155 20" fill="none" stroke="#059669" stroke-width="6" />

          <!-- Heavy Floor Pedestal Shadow -->
          <ellipse cx="115" cy="528" rx="135" ry="26" fill="rgba(0,0,0,0.75)" />
          <ellipse cx="115" cy="525" rx="115" ry="18" fill="rgba(16, 185, 129, 0.25)" />

          <!-- Pressurized Liquid Cylinder -->
          <rect x="18" y="38" width="194" height="422" fill="url(#stasisFluidEmerald)" />
          <ellipse cx="115" cy="245" rx="88" ry="180" fill="url(#vatCoreLight)" />
          <!-- Top Liquid Meniscus Surface Ring -->
          <ellipse cx="115" cy="48" rx="95" ry="12" fill="#6ee7b7" opacity="0.55" />

          <!-- SUSPENDED DETAILED T-REX SPECIMEN (#01) -->
          <g id="specimen-trex" class="specimen-left-idle" transform="translate(22, 105)">
            <!-- Umbilical Bio-Monitor Cord -->
            <path d="M 95 -55 Q 70 25 88 95" fill="none" stroke="#064e3b" stroke-width="4" stroke-dasharray="6 3" />
            <path d="M 122 65 Q 155 45 162 -55" fill="none" stroke="#34d399" stroke-width="2" opacity="0.7" />

            <!-- Muscular Sweeping Tail -->
            <path d="M 75 145 C 32 168, 8 215, 28 258 C 44 282, 78 275, 68 255 C 52 232, 68 195, 102 172 Z" fill="#065f46" stroke="#022c22" stroke-width="2.5" />
            <!-- Tail Dorsal Ridges -->
            <polygon points="48,165 36,158 42,175" fill="#34d399" />
            <polygon points="32,188 19,182 26,200" fill="#34d399" />
            <polygon points="22,215 10,212 18,228" fill="#34d399" />

            <!-- Powerful Hind Leg & 3-Toed Talons -->
            <ellipse cx="98" cy="168" rx="28" ry="36" transform="rotate(-12 98 168)" fill="#047857" stroke="#022c22" stroke-width="2.5" />
            <path d="M 88 196 L 74 232 L 92 238 L 105 202 Z" fill="#065f46" stroke="#022c22" stroke-width="2" />
            <path d="M 74 232 L 58 242 L 78 244 L 92 238 Z" fill="#047857" />
            <polygon points="58,242 48,246 60,247" fill="#fef08a" />
            <polygon points="68,244 59,250 72,249" fill="#fef08a" />

            <!-- Ribbed Torso & Lighter Underbelly Plates -->
            <path d="M 68 78 C 52 105, 58 158, 88 178 C 118 192, 142 162, 134 115 C 128 85, 95 68, 68 78 Z" fill="#047857" stroke="#022c22" stroke-width="2.5" />
            <path d="M 118 92 C 134 118, 132 152, 114 172" fill="none" stroke="#6ee7b7" stroke-width="5" stroke-linecap="round" opacity="0.45" />
            <!-- Neck & Back Spines -->
            <polygon points="64,72 50,65 58,84" fill="#34d399" />
            <polygon points="58,96 44,92 54,108" fill="#34d399" />
            <polygon points="58,120 44,118 56,134" fill="#34d399" />

            <!-- Tiny Two-Clawed T-Rex Forearms -->
            <path d="M 124 102 L 148 114 L 142 124 L 118 114 Z" fill="#065f46" stroke="#022c22" stroke-width="2" />
            <polygon points="148,114 156,118 148,121" fill="#fef08a" />
            <polygon points="144,121 152,126 142,126" fill="#fef08a" />

            <!-- Massive Sculpted T-Rex Skull & Jaw -->
            <path d="M 62 56 C 58 26, 88 12, 126 20 C 154 26, 168 42, 162 58 L 118 62 L 154 74 C 148 88, 118 90, 92 80 C 74 74, 64 68, 62 56 Z" fill="#059669" stroke="#022c22" stroke-width="2.5" stroke-linejoin="round" />
            <!-- Serrated Teeth -->
            <polygon points="124,61 127,68 131,61" fill="#ffffff" />
            <polygon points="134,61 137,69 141,61" fill="#ffffff" />
            <polygon points="144,60 147,68 151,60" fill="#ffffff" />
            <polygon points="152,60 155,66 158,59" fill="#ffffff" />
            <!-- Brow Ridge & Glowing Slit Eye -->
            <path d="M 96 28 Q 112 22 124 32" fill="none" stroke="#022c22" stroke-width="3" stroke-linecap="round" />
            <ellipse cx="112" cy="36" rx="7" ry="5.5" fill="#facc15" />
            <ellipse cx="113" cy="36" rx="2" ry="4.5" fill="#020617" />
            <circle cx="110" cy="34" r="1.5" fill="#ffffff" />
            <!-- Breathing Mask Bubble on Snout -->
            <circle cx="164" cy="52" r="5" fill="#a7f3d0" opacity="0.6" />
          </g>

          <!-- Rising Bio-Bubbles in Left Tank -->
          <circle cx="65" cy="410" r="6" fill="#d1fae5" style="animation: vatBubbleRise 3.4s linear infinite;" />
          <circle cx="115" cy="430" r="9" fill="#d1fae5" style="animation: vatBubbleRise 4.1s linear 1.1s infinite;" />
          <circle cx="165" cy="400" r="5" fill="#d1fae5" style="animation: vatBubbleRise 2.9s linear 0.5s infinite;" />
          <circle cx="90" cy="440" r="7" fill="#d1fae5" style="animation: vatBubbleRise 3.7s linear 2.1s infinite;" />
          <circle cx="145" cy="425" r="8" fill="#d1fae5" style="animation: vatBubbleRise 3.2s linear 1.6s infinite;" />

          <!-- Sweeping Laser Biometric Scanner Ring -->
          <g style="animation: vatLaserScan 4.2s ease-in-out infinite alternate;">
            <ellipse cx="115" cy="65" rx="97" ry="10" fill="none" stroke="#6ee7b7" stroke-width="3" />
            <ellipse cx="115" cy="65" rx="97" ry="10" fill="#34d399" opacity="0.18" />
          </g>

          <!-- Cylindrical Glass Wall Overlay + Measurement Tick Marks -->
          <rect x="18" y="38" width="194" height="422" fill="url(#cylinderGlassShine)" stroke="#6ee7b7" stroke-width="2.5" stroke-opacity="0.65" />
          <g stroke="#a7f3d0" stroke-width="1.5" opacity="0.55">
            <line x1="26" y1="90" x2="42" y2="90" />
            <line x1="26" y1="130" x2="36" y2="130" />
            <line x1="26" y1="170" x2="42" y2="170" />
            <line x1="26" y1="210" x2="36" y2="210" />
            <line x1="26" y1="250" x2="42" y2="250" />
            <line x1="26" y1="290" x2="36" y2="290" />
            <line x1="26" y1="330" x2="42" y2="330" />
            <line x1="26" y1="370" x2="36" y2="370" />
            <line x1="26" y1="410" x2="42" y2="410" />
          </g>

          <!-- Top & Bottom Heavy Bolted Hydraulic Steel Caps -->
          <path d="M 4 12 L 226 12 L 214 42 L 16 42 Z" fill="url(#vatCapMetal)" stroke="#0f172a" stroke-width="3" />
          <rect x="12" y="0" width="206" height="14" rx="4" fill="#334155" stroke="#0f172a" stroke-width="2" />

          <path d="M 14 456 L 216 456 L 232 522 L -2 522 Z" fill="url(#vatCapMetal)" stroke="#0f172a" stroke-width="3" />
          <rect x="8" y="465" width="214" height="10" fill="url(#hazardStripes)" />
          <!-- Specimen Bio-Plate Label -->
          <rect x="48" y="484" width="134" height="26" rx="4" fill="#022c22" stroke="#10b981" stroke-width="2" />
          <text x="60" y="501" fill="#6ee7b7" font-family="monospace" font-size="11" font-weight="bold">SPECIMEN: T-REX</text>
        </g>

        <!-- ======================================================================= -->
        <!-- GIANT STASIS VAT #2 (RIGHT — SPECIMEN #04: VELOCIRAPTOR)                -->
        <!-- ======================================================================= -->
        <g transform="translate(1105, 92)" filter="drop-shadow(0 20px 35px rgba(0,0,0,0.85))">
          <!-- Ceiling Feed Hoses -->
          <path d="M 55 -35 C 55 5, 80 -10, 80 20" fill="none" stroke="#0d9488" stroke-width="6" />
          <path d="M 185 -35 C 185 5, 155 -10, 155 20" fill="none" stroke="#334155" stroke-width="10" />

          <!-- Heavy Floor Pedestal Shadow -->
          <ellipse cx="115" cy="528" rx="135" ry="26" fill="rgba(0,0,0,0.75)" />
          <ellipse cx="115" cy="525" rx="115" ry="18" fill="rgba(45, 212, 191, 0.25)" />

          <!-- Pressurized Liquid Cylinder -->
          <rect x="18" y="38" width="194" height="422" fill="url(#stasisFluidTeal)" />
          <ellipse cx="115" cy="245" rx="88" ry="180" fill="url(#vatCoreLight)" />
          <ellipse cx="115" cy="48" rx="95" ry="12" fill="#5eead4" opacity="0.55" />

          <!-- SUSPENDED DETAILED VELOCIRAPTOR SPECIMEN (#04) -->
          <g id="specimen-raptor" class="specimen-right-idle" transform="translate(20, 100)">
            <!-- Umbilical Cord -->
            <path d="M 105 -50 Q 125 25 108 90" fill="none" stroke="#042f2e" stroke-width="4" stroke-dasharray="6 3" />

            <!-- Long Counter-Balance Whip Tail -->
            <path d="M 122 145 C 165 175, 178 232, 148 268 C 128 286, 102 272, 118 255 C 138 232, 138 190, 105 168 Z" fill="#115e59" stroke="#042f2e" stroke-width="2.5" />

            <!-- Agile Hind Leg with Iconic Raised Sickle Claw -->
            <ellipse cx="105" cy="165" rx="24" ry="34" transform="rotate(14 105 165)" fill="#0f766e" stroke="#042f2e" stroke-width="2.5" />
            <path d="M 98 192 L 112 232 L 96 238 L 84 198 Z" fill="#115e59" stroke="#042f2e" stroke-width="2" />
            <!-- Curved Raptor Sickle Talon -->
            <path d="M 92 228 Q 72 218 76 242 Q 86 242 96 236 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" />

            <!-- Sleek Striped Raptor Torso & S-Curved Neck -->
            <path d="M 82 65 C 88 38, 105 38, 112 72 C 135 92, 140 145, 112 172 C 85 182, 68 148, 76 108 C 80 88, 78 78, 82 65 Z" fill="#0f766e" stroke="#042f2e" stroke-width="2.5" />
            <!-- Tiger-Raptor Dorsal Stripes -->
            <path d="M 98 92 L 122 86" stroke="#134e4a" stroke-width="4" stroke-linecap="round" />
            <path d="M 102 110 L 128 104" stroke="#134e4a" stroke-width="4" stroke-linecap="round" />
            <path d="M 104 128 L 130 124" stroke="#134e4a" stroke-width="4" stroke-linecap="round" />

            <!-- Grasping 3-Fingered Raptor Forelimb -->
            <path d="M 78 102 L 48 118 L 54 128 L 82 114 Z" fill="#115e59" stroke="#042f2e" stroke-width="2" />
            <polygon points="48,118 38,124 48,125" fill="#fef08a" />
            <polygon points="52,126 42,132 54,130" fill="#fef08a" />

            <!-- Elongated Narrow Raptor Snout & Feather Crest -->
            <path d="M 112 42 C 118 22, 88 18, 52 28 C 32 34, 24 44, 30 54 L 68 54 L 38 66 C 46 76, 76 74, 98 62 Z" fill="#0d9488" stroke="#042f2e" stroke-width="2.5" stroke-linejoin="round" />
            <!-- Quill Feathers on Back of Skull -->
            <path d="M 108 26 L 132 16 M 112 34 L 136 28 M 112 42 L 132 40" stroke="#5eead4" stroke-width="2.5" stroke-linecap="round" />
            <!-- Predatory Amber Eye -->
            <ellipse cx="78" cy="38" rx="6" ry="5" fill="#facc15" />
            <ellipse cx="77" cy="38" rx="1.8" ry="4.2" fill="#020617" />
            <circle cx="79" cy="36" r="1.3" fill="#ffffff" />
          </g>

          <!-- Rising Bio-Bubbles in Right Tank -->
          <circle cx="65" cy="420" r="7" fill="#ccfbf1" style="animation: vatBubbleRise 3.1s linear 0.4s infinite;" />
          <circle cx="115" cy="400" r="6" fill="#ccfbf1" style="animation: vatBubbleRise 3.8s linear 1.4s infinite;" />
          <circle cx="160" cy="435" r="9" fill="#ccfbf1" style="animation: vatBubbleRise 2.7s linear 0.9s infinite;" />
          <circle cx="90" cy="415" r="5" fill="#ccfbf1" style="animation: vatBubbleRise 3.5s linear 2.3s infinite;" />

          <!-- Sweeping Laser Biometric Scanner Ring -->
          <g style="animation: vatLaserScan 3.8s ease-in-out 1.2s infinite alternate;">
            <ellipse cx="115" cy="65" rx="97" ry="10" fill="none" stroke="#5eead4" stroke-width="3" />
            <ellipse cx="115" cy="65" rx="97" ry="10" fill="#2dd4bf" opacity="0.18" />
          </g>

          <!-- Cylindrical Glass Wall Overlay + Measurement Ticks -->
          <rect x="18" y="38" width="194" height="422" fill="url(#cylinderGlassShine)" stroke="#5eead4" stroke-width="2.5" stroke-opacity="0.65" />
          <g stroke="#99f6e4" stroke-width="1.5" opacity="0.55">
            <line x1="188" y1="90" x2="204" y2="90" />
            <line x1="194" y1="130" x2="204" y2="130" />
            <line x1="188" y1="170" x2="204" y2="170" />
            <line x1="194" y1="210" x2="204" y2="210" />
            <line x1="188" y1="250" x2="204" y2="250" />
            <line x1="194" y1="290" x2="204" y2="290" />
            <line x1="188" y1="330" x2="204" y2="330" />
            <line x1="188" y1="410" x2="204" y2="410" />
          </g>

          <!-- Top & Bottom Heavy Bolted Hydraulic Steel Caps -->
          <path d="M 4 12 L 226 12 L 214 42 L 16 42 Z" fill="url(#vatCapMetal)" stroke="#0f172a" stroke-width="3" />
          <rect x="12" y="0" width="206" height="14" rx="4" fill="#334155" stroke="#0f172a" stroke-width="2" />

          <path d="M 14 456 L 216 456 L 232 522 L -2 522 Z" fill="url(#vatCapMetal)" stroke="#0f172a" stroke-width="3" />
          <rect x="8" y="465" width="214" height="10" fill="url(#hazardStripes)" />
          <rect x="44" y="484" width="142" height="26" rx="4" fill="#042f2e" stroke="#14b8a6" stroke-width="2" />
          <text x="53" y="501" fill="#5eead4" font-family="monospace" font-size="11" font-weight="bold">SPECIMEN: RAPTOR</text>
        </g>

        <!-- BIO-SURGE GREEN FLASH OVERLAY (Activates on Correct Answer) -->
        <g id="bio-surge-flash">
          <rect x="120" y="125" width="198" height="425" fill="#6ee7b7" opacity="0.55" filter="blur(8px)" />
          <rect x="1120" y="125" width="198" height="425" fill="#5eead4" opacity="0.55" filter="blur(8px)" />
          <circle cx="720" cy="190" r="85" fill="#fef08a" opacity="0.65" filter="blur(12px)" />
        </g>
      </svg>

      <!-- DYNAMIC PARTICLE BURST LAYER FOR DNA HELIX SPARKS -->
      <div id="dna-surge-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 7; overflow: hidden;"></div>

      <!-- 2. GROUNDED MAIN LAB STAGE: BOLTED INGEN MAINFRAME + DR. CERA (TRICERATOPS GENETICIST) -->
      <div style="position: absolute; bottom: 175px; left: 50%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 28px; width: 94%; max-width: 900px; z-index: 5; pointer-events: none;">

        <!-- GROUNDED HYDRAULIC INGEN MAINFRAME TERMINAL -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          
          <!-- Heavy Armor-Cased Holographic CRT Monitor -->
          <div id="lab-terminal-board" style="position: relative; width: 410px; max-width: 55vw; min-height: 255px; background: linear-gradient(160deg, #334155 0%, #1e293b 45%, #0f172a 100%); border: 5px solid #475569; border-radius: 18px; box-shadow: 0 20px 40px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.25); padding: 18px 22px 22px 22px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; z-index: 2;">
            
            <!-- Top Caution Header Bezel -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #090d16; padding-bottom: 8px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;"></div>
                <span style="font-family: monospace; font-size: 0.74rem; font-weight: 900; color: #cbd5e1; letter-spacing: 0.12em;">INGEN // GENOME SEQUENCER v4.2</span>
              </div>
              <span style="background: #eab308; color: #020617; font-family: monospace; font-size: 0.65rem; font-weight: 900; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.08em;">BIO-LEVEL 4</span>
            </div>

            <!-- Recessed Glowing Phosphor-Emerald CRT Math Screen -->
            <div style="position: relative; flex-grow: 1; background: radial-gradient(circle at 50% 50%, #053b2c 0%, #02231c 68%, #01110e 100%); border: 4px solid #090d16; border-radius: 12px; box-shadow: inset 0 0 28px rgba(0,0,0,0.9), 0 0 15px rgba(16,185,129,0.2); display: grid; grid-template-columns: 1fr 95px; align-items: center; padding: 10px 18px; overflow: hidden;">
              
              <!-- Subtle CRT Scanline & Grid Overlay -->
              <div style="position: absolute; inset: 0; background-image: linear-gradient(rgba(16, 185, 129, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.07) 1px, transparent 1px); background-size: 20px 20px; pointer-events: none;"></div>

              <!-- Crisp Sequencer Equation Display -->
              <div id="equation-container" style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Courier New', monospace; font-size: 3.7rem; font-weight: 900; color: #ecfdf5; letter-spacing: 0.08em; line-height: 1.04; text-shadow: 0 0 14px rgba(52, 211, 153, 0.85);">
                  <div id="math-num1">14</div>
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <span id="math-op" style="color: #34d399; font-size: 3rem;">+</span>
                    <span id="math-num2">18</span>
                  </div>
                  <div style="width: 108%; height: 5px; background: #10b981; border-radius: 999px; margin: 6px -4% 4px 0; box-shadow: 0 0 10px #10b981;"></div>
                  <div id="math-question-mark" style="color: #fde047; letter-spacing: 0.16em; font-size: 2.9rem; text-shadow: 0 0 12px rgba(250, 204, 21, 0.8);">??</div>
                </div>
              </div>

              <!-- Side DNA Telemetry Strip Inside Screen -->
              <div style="position: relative; z-index: 2; border-left: 1.5px dashed rgba(52, 211, 153, 0.35); height: 88%; padding-left: 12px; display: flex; flex-direction: column; justify-content: space-between; font-family: monospace; font-size: 0.62rem; color: #6ee7b7;">
                <div>Helix: STABLE</div>
                <svg viewBox="0 0 60 70" style="width: 54px; height: 62px;">
                  <path d="M 8 5 Q 52 22 8 38 Q 52 54 8 65" fill="none" stroke="#34d399" stroke-width="2.5" />
                  <path d="M 52 5 Q 8 22 52 38 Q 8 54 52 65" fill="none" stroke="#2dd4bf" stroke-width="2.5" />
                  <line x1="16" y1="12" x2="44" y2="12" stroke="#fde047" stroke-width="1.5" />
                  <line x1="16" y1="30" x2="44" y2="30" stroke="#fde047" stroke-width="1.5" />
                  <line x1="16" y1="46" x2="44" y2="46" stroke="#fde047" stroke-width="1.5" />
                </svg>
                <div style="color: #facc15;">SYNC: 100%</div>
              </div>
            </div>

          </div>

          <!-- Heavy Hydraulic Pedestal Base Bolted Into Lab Floor -->
          <div style="position: relative; width: 320px; height: 42px; margin-top: -6px; z-index: 1; display: flex; justify-content: center;">
            <!-- Floor Contact Shadow -->
            <div style="position: absolute; bottom: -8px; width: 360px; height: 26px; background: radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 60%, transparent 80%); border-radius: 50%;"></div>
            <!-- Steel Pedestal Neck & Bolted Floor Flange -->
            <svg viewBox="0 0 320 46" style="width: 100%; height: 46px; overflow: visible;">
              <path d="M 65 0 L 255 0 L 285 40 L 35 40 Z" fill="url(#vatCapMetal)" stroke="#0f172a" stroke-width="3" />
              <rect x="85" y="10" width="150" height="12" rx="3" fill="#090d16" stroke="#334155" stroke-width="1.5" />
              <circle cx="52" cy="32" r="4" fill="#94a3b8" />
              <circle cx="268" cy="32" r="4" fill="#94a3b8" />
            </svg>
          </div>
        </div>

        <!-- HIGH-DETAIL TRICERATOPS CHIEF GENETICIST ("DR. CERA") -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -6px;">
          <!-- Tactical Comms Speech Bubble -->
          <div id="dino-speech-bubble" style="background: rgba(2, 44, 34, 0.96); color: #6ee7b7; border: 2.5px solid #10b981; border-radius: 14px; padding: 7px 14px; font-family: monospace; font-size: 0.8rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 6px 16px rgba(0,0,0,0.65), 0 0 12px rgba(16,185,129,0.25); white-space: nowrap; transition: all 0.2s;">
            [DR. CERA]: Solve sequence to charge stasis vats!
          </div>

          <div style="position: relative; width: 235px; height: 255px; display: flex; justify-content: center; align-items: flex-end;">
            <!-- Ground Contact Shadow + Steel Floor Pad -->
            <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 215px; height: 30px; background: radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(16,185,129,0.2) 55%, transparent 78%); border-radius: 50%; z-index: 1;"></div>

            <div id="dino-mascot" class="dino-doc-idle" style="position: relative; width: 230px; height: 250px; z-index: 2; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.7));">
              <svg viewBox="0 0 260 275" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <!-- Sculpted Dinosaur Hide Gradients -->
                  <radialGradient id="ceraHideMain" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#4ade80" />
                    <stop offset="45%" stop-color="#16a34a" />
                    <stop offset="85%" stop-color="#14532d" />
                    <stop offset="100%" stop-color="#052e16" />
                  </radialGradient>

                  <radialGradient id="ceraFrillGrad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="#22c55e" />
                    <stop offset="60%" stop-color="#15803d" />
                    <stop offset="100%" stop-color="#064e3b" />
                  </radialGradient>

                  <linearGradient id="ivoryHornGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#78350f" />
                    <stop offset="30%" stop-color="#d97706" />
                    <stop offset="70%" stop-color="#fef3c7" />
                    <stop offset="100%" stop-color="#ffffff" />
                  </linearGradient>

                  <linearGradient id="labCoatFabric" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="60%" stop-color="#e2e8f0" />
                    <stop offset="100%" stop-color="#94a3b8" />
                  </linearGradient>
                </defs>

                <!-- Heavy Scaly Dinosaur Tail Swaying Behind Coat -->
                <g style="transform-origin: 165px 215px; animation: triceratopsTailSway 3s ease-in-out infinite;">
                  <path d="M 162 205 C 205 208, 238 228, 248 244 C 232 254, 195 248, 158 232 Z" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="3" />
                  <polygon points="195,208 202,198 208,211" fill="#86efac" />
                  <polygon points="218,216 226,207 230,221" fill="#86efac" />
                </g>

                <!-- Planted Heavy ElephantineDino Feet & Toe Hooves -->
                <ellipse cx="92" cy="252" rx="28" ry="16" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="3" />
                <path d="M 72 258 C 72 248, 82 248, 82 258 Z" fill="#fef3c7" stroke="#78350f" stroke-width="1.5" />
                <path d="M 86 260 C 86 250, 96 250, 96 260 Z" fill="#fef3c7" stroke="#78350f" stroke-width="1.5" />
                <path d="M 100 258 C 100 248, 110 248, 110 258 Z" fill="#fef3c7" stroke="#78350f" stroke-width="1.5" />

                <ellipse cx="164" cy="252" rx="28" ry="16" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="3" />
                <path d="M 144 258 C 144 248, 154 248, 154 258 Z" fill="#fef3c7" stroke="#78350f" stroke-width="1.5" />
                <path d="M 158 260 C 158 250, 168 250, 168 260 Z" fill="#fef3c7" stroke="#78350f" stroke-width="1.5" />

                <!-- Dino Underbelly & Ribbed Undershirt -->
                <rect x="74" y="132" width="108" height="114" rx="44" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="3" />
                <ellipse cx="122" cy="192" rx="34" ry="44" fill="#bbf7d0" opacity="0.75" />
                <line x1="94" y1="168" x2="148" y2="168" stroke="#15803d" stroke-width="2" opacity="0.45" />
                <line x1="92" y1="188" x2="150" y2="188" stroke="#15803d" stroke-width="2" opacity="0.45" />
                <line x1="96" y1="208" x2="146" y2="208" stroke="#15803d" stroke-width="2" opacity="0.45" />

                <!-- Tailored White InGen Scientist Lab Coat -->
                <path d="M 72 135 L 98 135 L 104 242 L 58 242 Z" fill="url(#labCoatFabric)" stroke="#475569" stroke-width="2.5" stroke-linejoin="round" />
                <path d="M 146 135 L 182 135 L 196 242 L 140 242 Z" fill="url(#labCoatFabric)" stroke="#475569" stroke-width="2.5" stroke-linejoin="round" />
                <!-- Coat Collar Lapels -->
                <polygon points="86,135 106,135 98,175 76,158" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
                <polygon points="158,135 138,135 146,175 168,158" fill="#f8fafc" stroke="#64748b" stroke-width="2" />

                <!-- Breast Pocket with Glowing Amber DNA Vial & Security ID Badge -->
                <rect x="154" y="172" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="2" />
                <rect x="160" y="156" width="8" height="18" rx="4" fill="#f59e0b" stroke="#78350f" stroke-width="1.5" />
                <rect x="170" y="160" width="6" height="14" rx="3" fill="#10b981" stroke="#064e3b" stroke-width="1.5" />
                <!-- Clipped InGen Security Badge -->
                <rect x="66" y="172" width="22" height="30" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
                <rect x="70" y="177" width="14" height="10" fill="#38bdf8" />
                <line x1="70" y1="192" x2="84" y2="192" stroke="#94a3b8" stroke-width="2" />
                <line x1="70" y1="197" x2="80" y2="197" stroke="#facc15" stroke-width="2" />

                <!-- Left Arm Holding Glowing Holographic Data Pad -->
                <g style="transform-origin: 70px 162px; animation: triceratopsArmWork 2.6s ease-in-out infinite;">
                  <path d="M 68 148 L 28 168 L 36 190 L 76 174 Z" fill="url(#labCoatFabric)" stroke="#475569" stroke-width="2.5" />
                  <circle cx="28" cy="178" r="12" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="2.5" />
                  <!-- Glowing Cyan Data Tablet in Hand -->
                  <rect x="2" y="152" width="34" height="44" rx="5" transform="rotate(-14 19 174)" fill="#022c22" stroke="#2dd4bf" stroke-width="2.5" />
                  <line x1="10" y1="164" x2="26" y2="160" stroke="#5eead4" stroke-width="2" />
                  <line x1="12" y1="172" x2="28" y2="168" stroke="#fde047" stroke-width="2" />
                  <path d="M 12 184 L 18 178 L 24 182 L 30 174" fill="none" stroke="#34d399" stroke-width="2" />
                </g>

                <!-- Right Arm in Lab Coat Sleeve -->
                <path d="M 182 148 L 214 174 L 202 194 L 174 172 Z" fill="url(#labCoatFabric)" stroke="#475569" stroke-width="2.5" />
                <circle cx="210" cy="186" r="12" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="2.5" />

                <!-- ======================================================= -->
                <!-- SCULPTED TRICERATOPS CREST FRILL, HORNS & HEAD          -->
                <!-- ======================================================= -->
                <!-- Massive Scalloped Bony Frill Shield Behind Head -->
                <path d="M 62 88 C 48 36, 98 8, 148 16 C 198 24, 224 68, 202 116 C 188 138, 84 128, 62 88 Z" fill="url(#ceraFrillGrad)" stroke="#052e16" stroke-width="3.5" />
                <!-- Ornamental Frill Pattern Markings -->
                <ellipse cx="102" cy="46" rx="14" ry="10" transform="rotate(-20 102 46)" fill="#86efac" opacity="0.4" />
                <ellipse cx="164" cy="54" rx="16" ry="11" transform="rotate(24 164 54)" fill="#86efac" opacity="0.4" />
                <!-- Perimeter Epoccipital Bone Spikes Around the Frill Rim -->
                <polygon points="62,64 46,56 68,48" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />
                <polygon points="78,36 68,20 92,24" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />
                <polygon points="110,20 112,2 128,16" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />
                <polygon points="146,18 158,2 166,22" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />
                <polygon points="180,32 198,20 194,44" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />
                <polygon points="202,62 220,58 208,78" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />
                <polygon points="206,92 222,96 202,108" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="1.5" />

                <!-- Sculpted Triceratops Head & Parrot-Like Beak Snout -->
                <path d="M 78 68 C 92 46, 152 48, 168 78 C 178 102, 166 134, 134 140 C 102 144, 68 138, 52 118 C 42 104, 58 84, 78 68 Z" fill="url(#ceraHideMain)" stroke="#052e16" stroke-width="3.5" />
                
                <!-- Keratin Rostral Beak & Nostril -->
                <path d="M 52 102 C 36 106, 34 124, 48 132 C 58 132, 66 124, 64 110 Z" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="2" />
                <ellipse cx="68" cy="108" rx="4" ry="3" fill="#052e16" />
                <!-- Friendly Confident Scientist Smile -->
                <path d="M 62 126 Q 82 135 98 124" fill="none" stroke="#052e16" stroke-width="3" stroke-linecap="round" />

                <!-- Upward-Curving Nasal Horn on Snout -->
                <path d="M 56 98 C 42 82, 36 66, 48 58 C 54 68, 62 82, 68 94 Z" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="2" />

                <!-- Pair of Long Curved Ivory Brow Horns -->
                <path d="M 102 62 C 76 42, 48 24, 30 22 C 42 38, 68 56, 92 72 Z" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="2" />
                <path d="M 136 62 C 112 38, 86 18, 66 14 C 78 32, 102 52, 124 72 Z" fill="url(#ivoryHornGrad)" stroke="#78350f" stroke-width="2" />

                <!-- High-Tech Cyan HUD Lab Visor Goggles -->
                <rect x="68" y="76" width="76" height="24" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
                <rect x="73" y="80" width="30" height="16" rx="5" fill="#0284c7" opacity="0.85" />
                <rect x="109" y="80" width="30" height="16" rx="5" fill="#0284c7" opacity="0.85" />
                <!-- Expressive Eyes Visible Behind Glowing HUD Lenses -->
                <circle cx="88" cy="88" r="5" fill="#fef08a" />
                <circle cx="87" cy="88" r="2.2" fill="#020617" />
                <circle cx="85" cy="86" r="1.5" fill="#ffffff" />
                <circle cx="124" cy="88" r="5" fill="#fef08a" />
                <circle cx="123" cy="88" r="2.2" fill="#020617" />
                <circle cx="121" cy="86" r="1.5" fill="#ffffff" />
                <!-- Lens Specular Glint -->
                <line x1="76" y1="83" x2="86" y2="83" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" opacity="0.8" />
                <line x1="112" y1="83" x2="122" y2="83" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. INDUSTRIAL BIO-SEQUENCER CONTROL DECK -->
      <div style="position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 26px rgba(0,0,0,0.85));">
        <div style="background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border: 3px solid #10b981; border-radius: 16px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; box-shadow: inset 0 2px 0 rgba(255,255,255,0.18), 0 0 20px rgba(16,185,129,0.25);">
          
          <!-- Left Caution Indicator & Status -->
          <div style="display: flex; flex-direction: column; min-width: 155px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: #facc15; box-shadow: 0 0 6px #facc15;"></div>
              <span style="font-family: monospace; font-size: 0.68rem; font-weight: 900; color: #34d399; letter-spacing: 0.14em; text-transform: uppercase;">STASIS CONTROL DECK</span>
            </div>
            <span id="system-status-text" style="font-family: monospace; font-size: 0.85rem; font-weight: 900; color: #f8fafc; letter-spacing: 0.06em;">VAT PRESSURE: NOMINAL</span>
          </div>

          <!-- Answer Number Input -->
          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-family: monospace; font-size: 1.95rem; font-weight: 900; color: #ecfdf5; background: #022c22; border: 3px solid #10b981; border-radius: 12px; outline: none; box-shadow: inset 0 3px 8px rgba(0,0,0,0.75), 0 0 12px rgba(16,185,129,0.35);" />

          <!-- Clean "Submit" Button -->
          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #10b981 0%, #047857 100%); color: #ecfdf5; font-weight: 900; font-size: 1.05rem; border: 2px solid #a7f3d0; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; box-shadow: 0 4px 14px rgba(16,185,129,0.45); transition: transform 0.1s;">
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

function triggerStasisBioSurge() {
  const flash = document.getElementById("bio-surge-flash");
  const trex = document.getElementById("specimen-trex");
  const raptor = document.getElementById("specimen-raptor");
  const particleHost = document.getElementById("dna-surge-particles");

  if (flash) {
    flash.classList.remove("surging");
    void flash.offsetWidth;
    flash.classList.add("surging");
  }
  if (trex) {
    trex.classList.remove("specimen-thrashing");
    void trex.offsetWidth;
    trex.classList.add("specimen-thrashing");
    setTimeout(() => trex.classList.remove("specimen-thrashing"), 1500);
  }
  if (raptor) {
    raptor.classList.remove("specimen-thrashing");
    void raptor.offsetWidth;
    raptor.classList.add("specimen-thrashing");
    setTimeout(() => raptor.classList.remove("specimen-thrashing"), 1500);
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#34d399", "#10b981", "#2dd4bf", "#facc15", "#a7f3d0", "#38bdf8"];

  for (let i = 0; i < 36; i++) {
    const p = document.createElement("div");
    const fromLeftTank = i % 2 === 0;
    const startX = fromLeftTank ? "16%" : "84%";
    const color = colors[i % colors.length];
    const tx = (Math.random() - 0.5) * 360 + "px";
    const ty = -(100 + Math.random() * 320) + "px";
    const rot = (Math.random() * 360 - 180) + "deg";
    const size = 8 + Math.random() * 12;

    p.style.cssText = `
      position: absolute;
      left: ${startX};
      top: 48%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #ffffff, ${color});
      box-shadow: 0 0 12px ${color};
      --tx: ${tx};
      --ty: ${ty};
      --rot: ${rot};
      animation: dnaParticleBurst ${1.0 + Math.random() * 0.5}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const dino = document.getElementById("dino-mascot");
  const speech = document.getElementById("dino-speech-bubble");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerStasisBioSurge();

      if (dino) {
        dino.classList.remove("dino-doc-party", "dino-doc-oops");
        void dino.offsetWidth;
        dino.classList.add("dino-doc-party");
      }
      if (speech) {
        speech.textContent = "[DR. CERA]: GENOME SURGE COMPLETE! 🦖⚡";
        speech.style.borderColor = "#facc15";
        speech.style.color = "#fef08a";
      }

      setStatus("⚡ BIO-STASIS OVERCHARGED!");
      input.style.borderColor = "#facc15";

      setTimeout(() => {
        input.style.borderColor = "#10b981";
        input.value = "";
        setStatus("VAT PRESSURE: NOMINAL");
        if (speech) {
          speech.textContent = "[DR. CERA]: Specimens thriving! Next sequence! 🧬";
          speech.style.borderColor = "#10b981";
          speech.style.color = "#6ee7b7";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (dino) {
        dino.classList.remove("dino-doc-party", "dino-doc-oops");
        void dino.offsetWidth;
        dino.classList.add("dino-doc-oops");
      }
      if (speech) {
        speech.textContent = "[DR. CERA]: Sequence mismatch! Recalculate! ⚠️";
        speech.style.borderColor = "#ef4444";
        speech.style.color = "#fca5a5";
      }

      setStatus("⚠️ DNA SEQUENCE ERROR");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#10b981";
        input.value = "";
        setStatus("VAT PRESSURE: NOMINAL");
        if (speech) {
          speech.textContent = "[DR. CERA]: Check the numbers & try again! 🧪";
          speech.style.borderColor = "#10b981";
          speech.style.color = "#6ee7b7";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
