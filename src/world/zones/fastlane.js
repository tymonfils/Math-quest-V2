// src/world/zones/fastlane.js - First-Person F1 Cockpit POV with Real-Time Twisting Track & Grandstand Rafters
import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

let trackAnimId = null;

export function loadFastLane() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  if (trackAnimId) {
    cancelAnimationFrame(trackAnimId);
    trackAnimId = null;
  }

  let styleEl = document.getElementById("fastlane-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "fastlane-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes f1EngineVibrate {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(1.2px); }
    }
    @keyframes tireTreadBlur {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -48; }
    }
    @keyframes crowdFlashStrobe {
      0%, 92%, 100% { opacity: 0; transform: scale(0.4); }
      96% { opacity: 1; transform: scale(1.5); }
    }
    @keyframes flagWaveAnim {
      0%, 100% { transform: rotate(-10deg) skewX(-5deg); }
      50% { transform: rotate(12deg) skewX(6deg); }
    }
    @keyframes chiefHeadBob {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-4px) rotate(-1.5deg); }
    }
    @keyframes chiefCelebrate {
      0%, 100% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-20px) rotate(-5deg) scale(1.06); }
      50% { transform: translateY(-4px) rotate(4deg) scale(0.97, 1.03); }
      75% { transform: translateY(-14px) rotate(-3deg) scale(1.04); }
    }
    @keyframes chiefShakeError {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes drsWarpLines {
      0% { opacity: 0; transform: scale(0.65); }
      20% { opacity: 0.95; transform: scale(1.02); }
      75% { opacity: 0.85; transform: scale(1.12); }
      100% { opacity: 0; transform: scale(1.25); }
    }
    @keyframes sparkParticleFly {
      0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
      60% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.3); opacity: 0; }
    }
    .cockpit-chassis-vib {
      animation: f1EngineVibrate 0.09s linear infinite;
    }
    .chief-idle {
      transform-origin: center bottom;
      animation: chiefHeadBob 2.8s ease-in-out infinite;
    }
    .chief-party {
      transform-origin: center bottom;
      animation: chiefCelebrate 0.8s ease-in-out 2 !important;
    }
    .chief-oops {
      transform-origin: center bottom;
      animation: chiefShakeError 0.5s ease-in-out 1 !important;
    }
    #drs-warp-overlay {
      opacity: 0;
      pointer-events: none;
      transform-origin: 720px 320px;
    }
    #drs-warp-overlay.boosting {
      animation: drsWarpLines 1.55s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="fastlane-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: #060913; font-family: 'Segoe UI', system-ui, sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN DYNAMIC F1 TRACK, GRANDSTAND RAFTERS & COCKPIT POV SVG -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Sunset Grand Prix Sky Gradient -->
          <linearGradient id="gpSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#090d1e" />
            <stop offset="32%" stop-color="#1e1b4b" />
            <stop offset="65%" stop-color="#7c2d12" />
            <stop offset="92%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#fde047" />
          </linearGradient>

          <radialGradient id="gpHorizonSun" cx="50%" cy="88%" r="45%">
            <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.95" />
            <stop offset="25%" stop-color="#fde047" stop-opacity="0.7" />
            <stop offset="60%" stop-color="#ea580c" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
          </radialGradient>

          <!-- Asphalt Road & Runoff Gradients -->
          <linearGradient id="asphaltSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="30%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>

          <linearGradient id="turfRunoffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#064e3b" />
            <stop offset="50%" stop-color="#022c22" />
            <stop offset="100%" stop-color="#021712" />
          </linearGradient>

          <!-- 3D Carbon-Fiber Weave Pattern for Halo & Cockpit -->
          <pattern id="carbonWeavePattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#0f172a" />
            <polygon points="0,0 4,0 4,4 0,4" fill="#1e293b" />
            <polygon points="4,4 8,4 8,8 4,8" fill="#1e293b" />
            <rect width="4" height="2" fill="#334155" opacity="0.45" />
            <rect x="4" y="4" width="4" height="2" fill="#334155" opacity="0.45" />
          </pattern>

          <!-- Catch-Fence Wire Mesh Pattern -->
          <pattern id="catchFenceMesh" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 18 18 M 18 0 L 0 18" stroke="#94a3b8" stroke-width="1" stroke-opacity="0.38" />
          </pattern>

          <!-- Packed Stadium Crowd Pattern in Grandstand Rafters -->
          <pattern id="stadiumCrowdPattern" width="36" height="22" patternUnits="userSpaceOnUse">
            <rect width="36" height="22" fill="#0f172a" />
            <circle cx="6" cy="7" r="3.2" fill="#ef4444" />
            <circle cx="14" cy="6" r="3.2" fill="#fde047" />
            <circle cx="22" cy="7" r="3.2" fill="#38bdf8" />
            <circle cx="30" cy="6" r="3.2" fill="#f97316" />
            <circle cx="10" cy="16" r="3.2" fill="#a855f7" />
            <circle cx="18" cy="15" r="3.2" fill="#22c55e" />
            <circle cx="26" cy="16" r="3.2" fill="#f43f5e" />
            <circle cx="34" cy="15" r="3.2" fill="#e2e8f0" />
          </pattern>

          <!-- F1 Nosecone Metallic Crimson Livery -->
          <linearGradient id="f1RedLivery" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#7f1d1d" />
            <stop offset="22%" stop-color="#dc2626" />
            <stop offset="50%" stop-color="#ef4444" />
            <stop offset="78%" stop-color="#dc2626" />
            <stop offset="100%" stop-color="#7f1d1d" />
          </linearGradient>

          <!-- Pirelli P-Zero Tire Rubber -->
          <linearGradient id="pirelliTireRubber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#020617" />
            <stop offset="30%" stop-color="#1e293b" />
            <stop offset="55%" stop-color="#334155" />
            <stop offset="80%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>

          <!-- Titanium Halo Specular Highlight -->
          <linearGradient id="haloMetalHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="40%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
        </defs>

        <!-- ========================================================================= -->
        <!-- 1. SKYBOX, STADIUM FLOODLIGHTS & DISTANT SKYLINE                          -->
        <!-- ========================================================================= -->
        <rect width="1440" height="365" fill="url(#gpSkyGrad)" />
        <rect width="1440" height="365" fill="url(#gpHorizonSun)" />

        <!-- Dynamic Horizon Group (Shifts subtly as car corners!) -->
        <g id="f1-horizon-scenery">
          <!-- Distant City & Circuit Control Tower Silhouette -->
          <polygon points="180,355 180,265 215,265 215,355" fill="#1e1b4b" />
          <polygon points="230,355 230,235 275,215 275,355" fill="#1e1b4b" />
          <!-- Iconic F1 Race Control Tower -->
          <polygon points="555,355 570,205 615,205 630,355" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
          <ellipse cx="592" cy="222" rx="42" ry="12" fill="#1e293b" stroke="#fde047" stroke-width="2" />
          <rect x="562" y="218" width="60" height="8" rx="4" fill="#38bdf8" />
          <line x1="592" y1="205" x2="592" y2="165" stroke="#fde047" stroke-width="2.5" />
          <circle cx="592" cy="162" r="4" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)" />

          <!-- High-Intensity Stadium Floodlight Towers -->
          <g transform="translate(360, 145)">
            <line x1="25" y1="40" x2="10" y2="210" stroke="#475569" stroke-width="5" />
            <line x1="25" y1="40" x2="40" y2="210" stroke="#334155" stroke-width="4" />
            <rect x="0" y="15" width="52" height="26" rx="4" fill="#1e293b" stroke="#fde047" stroke-width="2" />
            <circle cx="12" cy="28" r="5" fill="#ffffff" filter="drop-shadow(0 0 12px #ffffff)" />
            <circle cx="26" cy="28" r="5" fill="#fef08a" filter="drop-shadow(0 0 12px #fef08a)" />
            <circle cx="40" cy="28" r="5" fill="#ffffff" filter="drop-shadow(0 0 12px #ffffff)" />
          </g>
          <g transform="translate(1030, 145)">
            <line x1="25" y1="40" x2="10" y2="210" stroke="#475569" stroke-width="5" />
            <line x1="25" y1="40" x2="40" y2="210" stroke="#334155" stroke-width="4" />
            <rect x="0" y="15" width="52" height="26" rx="4" fill="#1e293b" stroke="#fde047" stroke-width="2" />
            <circle cx="12" cy="28" r="5" fill="#ffffff" filter="drop-shadow(0 0 12px #ffffff)" />
            <circle cx="26" cy="28" r="5" fill="#fef08a" filter="drop-shadow(0 0 12px #fef08a)" />
            <circle cx="40" cy="28" r="5" fill="#ffffff" filter="drop-shadow(0 0 12px #ffffff)" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 2. FENCED-OFF CROWD IN GRANDSTAND RAFTERS (LEFT & RIGHT STADIUM STANDS)   -->
        <!-- ========================================================================= -->
        <!-- LEFT GRANDSTAND RAFTERS & CATCH-FENCE -->
        <g>
          <!-- Steel Rafter Roof Canopy & Trusses -->
          <polygon points="-20,40 430,245 430,275 -20,125" fill="#0f172a" stroke="#475569" stroke-width="3" />
          <line x1="40" y1="65" x2="20" y2="390" stroke="#334155" stroke-width="8" />
          <line x1="150" y1="115" x2="135" y2="375" stroke="#334155" stroke-width="6" />
          <line x1="265" y1="168" x2="255" y2="365" stroke="#334155" stroke-width="5" />
          <line x1="365" y1="215" x2="360" y2="355" stroke="#334155" stroke-width="4" />

          <!-- Tiered Stadium Bleachers Packed with Cheering Crowd -->
          <polygon points="-20,125 425,272 425,355 -20,445" fill="url(#stadiumCrowdPattern)" stroke="#1e293b" stroke-width="2" />
          <!-- Rafter Tier Divider Steps -->
          <line x1="-10" y1="205" x2="425" y2="295" stroke="#38bdf8" stroke-width="2" opacity="0.6" />
          <line x1="-10" y1="285" x2="425" y2="320" stroke="#ef4444" stroke-width="2.5" opacity="0.75" />
          <line x1="-10" y1="365" x2="425" y2="342" stroke="#fde047" stroke-width="2" opacity="0.7" />

          <!-- Waving Team Flags in Left Rafters -->
          <g style="transform-origin: 95px 255px; animation: flagWaveAnim 0.7s ease-in-out infinite;">
            <line x1="95" y1="255" x2="95" y2="215" stroke="#e2e8f0" stroke-width="2.5" />
            <polygon points="95,215 128,222 124,238 95,232" fill="#ef4444" stroke="#fde047" stroke-width="1.5" />
          </g>
          <g style="transform-origin: 225px 295px; animation: flagWaveAnim 0.85s ease-in-out 0.3s infinite;">
            <line x1="225" y1="295" x2="225" y2="262" stroke="#e2e8f0" stroke-width="2" />
            <polygon points="225,262 252,268 248,282 225,276" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
          </g>

          <!-- Camera Flash Strobes in Left Crowd -->
          <circle cx="75" cy="220" r="6" fill="#ffffff" style="animation: crowdFlashStrobe 2.1s infinite 0.2s;" filter="drop-shadow(0 0 8px #ffffff)" />
          <circle cx="185" cy="275" r="5" fill="#ffffff" style="animation: crowdFlashStrobe 1.7s infinite 0.9s;" filter="drop-shadow(0 0 8px #ffffff)" />
          <circle cx="310" cy="305" r="4.5" fill="#ffffff" style="animation: crowdFlashStrobe 2.5s infinite 1.4s;" filter="drop-shadow(0 0 8px #ffffff)" />
        </g>

        <!-- RIGHT GRANDSTAND RAFTERS & CATCH-FENCE -->
        <g>
          <!-- Steel Rafter Roof Canopy & Trusses -->
          <polygon points="1460,40 1010,245 1010,275 1460,125" fill="#0f172a" stroke="#475569" stroke-width="3" />
          <line x1="1400" y1="65" x2="1420" y2="390" stroke="#334155" stroke-width="8" />
          <line x1="1290" y1="115" x2="1305" y2="375" stroke="#334155" stroke-width="6" />
          <line x1="1175" y1="168" x2="1185" y2="365" stroke="#334155" stroke-width="5" />
          <line x1="1075" y1="215" x2="1080" y2="355" stroke="#334155" stroke-width="4" />

          <!-- Tiered Stadium Bleachers Packed with Cheering Crowd -->
          <polygon points="1460,125 1015,272 1015,355 1460,445" fill="url(#stadiumCrowdPattern)" stroke="#1e293b" stroke-width="2" />
          <line x1="1450" y1="205" x2="1015" y2="295" stroke="#38bdf8" stroke-width="2" opacity="0.6" />
          <line x1="1450" y1="285" x2="1015" y2="320" stroke="#ef4444" stroke-width="2.5" opacity="0.75" />
          <line x1="1450" y1="365" x2="1015" y2="342" stroke="#fde047" stroke-width="2" opacity="0.7" />

          <!-- Waving Checkered & Team Flags in Right Rafters -->
          <g style="transform-origin: 1345px 255px; animation: flagWaveAnim 0.75s ease-in-out 0.15s infinite;">
            <line x1="1345" y1="255" x2="1345" y2="215" stroke="#e2e8f0" stroke-width="2.5" />
            <polygon points="1345,215 1312,222 1316,238 1345,232" fill="#fde047" stroke="#0f172a" stroke-width="1.5" />
          </g>
          <g style="transform-origin: 1215px 295px; animation: flagWaveAnim 0.8s ease-in-out 0.5s infinite;">
            <line x1="1215" y1="295" x2="1215" y2="262" stroke="#e2e8f0" stroke-width="2" />
            <polygon points="1215,262 1188,268 1192,282 1215,276" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" />
          </g>

          <!-- Camera Flash Strobes in Right Crowd -->
          <circle cx="1365" cy="225" r="6" fill="#ffffff" style="animation: crowdFlashStrobe 1.9s infinite 0.5s;" filter="drop-shadow(0 0 8px #ffffff)" />
          <circle cx="1250" cy="280" r="5" fill="#ffffff" style="animation: crowdFlashStrobe 2.3s infinite 1.1s;" filter="drop-shadow(0 0 8px #ffffff)" />
          <circle cx="1130" cy="310" r="4.5" fill="#ffffff" style="animation: crowdFlashStrobe 1.6s infinite 0.1s;" filter="drop-shadow(0 0 8px #ffffff)" />
        </g>

        <!-- ========================================================================= -->
        <!-- 3. REAL-TIME PROCEDURAL TWISTING ROAD, KERBS & FENCED BARRIERS            -->
        <!-- ========================================================================= -->
        <!-- Green Astro-Turf Runoff Base -->
        <rect x="0" y="348" width="1440" height="552" fill="url(#turfRunoffGrad)" />

        <!-- Dynamic catch-fences, Armco barriers, kerbs & twisting asphalt rendered at 60fps -->
        <g id="f1-dynamic-track-layer"></g>

        <!-- ========================================================================= -->
        <!-- 4. DRS HYPERSPEED WARP LINES OVERLAY (Triggers on Correct Answer!)        -->
        <!-- ========================================================================= -->
        <g id="drs-warp-overlay">
          <g stroke="#38bdf8" stroke-width="4" stroke-linecap="round" opacity="0.85">
            <line x1="720" y1="320" x2="60" y2="40" />
            <line x1="720" y1="320" x2="1380" y2="40" />
            <line x1="720" y1="320" x2="0" y2="240" />
            <line x1="720" y1="320" x2="1440" y2="240" />
            <line x1="720" y1="320" x2="0" y2="520" />
            <line x1="720" y1="320" x2="1440" y2="520" />
          </g>
          <g stroke="#fde047" stroke-width="3" stroke-linecap="round" opacity="0.9">
            <line x1="720" y1="320" x2="240" y2="0" />
            <line x1="720" y1="320" x2="1200" y2="0" />
            <line x1="720" y1="320" x2="80" y2="680" />
            <line x1="720" y1="320" x2="1360" y2="680" />
          </g>
        </g>

        <!-- ========================================================================= -->
        <!-- 5. FIRST-PERSON F1 CAR FRONT WHEELS, WISHBONE SUSPENSION, NOSE & HALO     -->
        <!-- ========================================================================= -->
        <g class="cockpit-chassis-vib">
          <!-- Front Wing Aero Endplates Visible Ahead of Tires -->
          <polygon points="205,535 280,520 295,555 190,565" fill="#dc2626" stroke="#fde047" stroke-width="2" />
          <polygon points="1235,535 1160,520 1145,555 1250,565" fill="#dc2626" stroke="#fde047" stroke-width="2" />

          <!-- Double-Wishbone Carbon Suspension Pushrods & Tie-Rods (Left & Right) -->
          <g stroke="#0f172a" stroke-width="9" stroke-linecap="round">
            <line x1="335" y1="485" x2="615" y2="535" />
            <line x1="335" y1="548" x2="595" y2="575" />
            <line x1="1105" y1="485" x2="825" y2="535" />
            <line x1="1105" y1="548" x2="845" y2="575" />
          </g>
          <g stroke="#475569" stroke-width="3" stroke-linecap="round">
            <line x1="335" y1="483" x2="615" y2="533" />
            <line x1="335" y1="546" x2="595" y2="573" />
            <line x1="1105" y1="483" x2="825" y2="533" />
            <line x1="1105" y1="546" x2="845" y2="573" />
          </g>

          <!-- LEFT PIRELLI P-ZERO FRONT SLICK TIRE & CARBON BRAKE DUCT (Steers with road!) -->
          <g id="f1-wheel-left" transform="translate(230, 415)">
            <!-- Carbon Brake Duct & Aero Fender -->
            <path d="M 110 35 L 132 52 L 132 145 L 108 160 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
            <!-- Massive Exposed F1 Slick Tire -->
            <rect x="0" y="0" width="114" height="190" rx="26" fill="url(#pirelliTireRubber)" stroke="#020617" stroke-width="4" filter="drop-shadow(0 16px 24px rgba(0,0,0,0.85))" />
            <!-- High-Speed Spinning Tread & Pirelli Sidewall Striping -->
            <line x1="26" y1="6" x2="26" y2="184" stroke="#475569" stroke-width="3" stroke-dasharray="18 14" style="animation: tireTreadBlur 0.14s linear infinite;" opacity="0.65" />
            <line x1="58" y1="6" x2="58" y2="184" stroke="#334155" stroke-width="4" stroke-dasharray="22 14" style="animation: tireTreadBlur 0.14s linear infinite;" opacity="0.55" />
            <line x1="88" y1="6" x2="88" y2="184" stroke="#475569" stroke-width="3" stroke-dasharray="18 14" style="animation: tireTreadBlur 0.14s linear infinite;" opacity="0.65" />
            <!-- Red Soft-Compound Sidewall Ring -->
            <rect x="6" y="18" width="6" height="154" rx="3" fill="#ef4444" opacity="0.85" />
            <rect x="102" y="18" width="6" height="154" rx="3" fill="#ef4444" opacity="0.85" />
          </g>

          <!-- RIGHT PIRELLI P-ZERO FRONT SLICK TIRE & CARBON BRAKE DUCT -->
          <g id="f1-wheel-right" transform="translate(1096, 415)">
            <path d="M 4 35 L -18 52 L -18 145 L 6 160 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
            <rect x="0" y="0" width="114" height="190" rx="26" fill="url(#pirelliTireRubber)" stroke="#020617" stroke-width="4" filter="drop-shadow(0 16px 24px rgba(0,0,0,0.85))" />
            <line x1="26" y1="6" x2="26" y2="184" stroke="#475569" stroke-width="3" stroke-dasharray="18 14" style="animation: tireTreadBlur 0.14s linear infinite;" opacity="0.65" />
            <line x1="56" y1="6" x2="56" y2="184" stroke="#334155" stroke-width="4" stroke-dasharray="22 14" style="animation: tireTreadBlur 0.14s linear infinite;" opacity="0.55" />
            <line x1="88" y1="6" x2="88" y2="184" stroke="#475569" stroke-width="3" stroke-dasharray="18 14" style="animation: tireTreadBlur 0.14s linear infinite;" opacity="0.65" />
            <rect x="6" y="18" width="6" height="154" rx="3" fill="#ef4444" opacity="0.85" />
            <rect x="102" y="18" width="6" height="154" rx="3" fill="#ef4444" opacity="0.85" />
          </g>

          <!-- SCULPTED F1 AERODYNAMIC NOSECONE & CHASSIS MONOCOQUE -->
          <path d="M 555 615 L 665 445 C 685 430, 755 430, 775 445 L 885 615 Z" fill="url(#f1RedLivery)" stroke="#450a0a" stroke-width="3" />
          <!-- Gold & White Racing Livery Stripes Along Nosecone -->
          <polygon points="708,438 732,438 752,615 688,615" fill="#fef08a" />
          <polygon points="715,438 725,438 736,615 704,615" fill="#ffffff" />
          <!-- Nosecone Number "1" Crest & Pitot Aero Sensor Tube -->
          <text x="720" y="498" fill="#0f172a" font-family="sans-serif" font-weight="900" font-size="22" text-anchor="middle">01</text>
          <line x1="720" y1="435" x2="720" y2="402" stroke="#94a3b8" stroke-width="3" />
          <circle cx="720" cy="402" r="3.5" fill="#38bdf8" />

          <!-- LEFT & RIGHT AERODYNAMIC CARBON F1 WING MIRRORS -->
          <!-- Left Mirror Housing + Rearview Glass -->
          <path d="M 380 515 L 495 535 L 490 552 L 385 532 Z" fill="url(#carbonWeavePattern)" stroke="#334155" stroke-width="2" />
          <rect x="330" y="485" width="88" height="44" rx="12" fill="#dc2626" stroke="#0f172a" stroke-width="3" />
          <rect x="338" y="492" width="72" height="30" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
          <path d="M 345 516 L 375 496 L 402 516 Z" fill="#334155" opacity="0.7" />

          <!-- Right Mirror Housing + Rearview Glass -->
          <path d="M 1060 515 L 945 535 L 950 552 L 1055 532 Z" fill="url(#carbonWeavePattern)" stroke="#334155" stroke-width="2" />
          <rect x="1022" y="485" width="88" height="44" rx="12" fill="#dc2626" stroke="#0f172a" stroke-width="3" />
          <rect x="1030" y="492" width="72" height="30" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
          <path d="M 1038 516 L 1065 496 L 1095 516 Z" fill="#334155" opacity="0.7" />

          <!-- ======================================================================= -->
          <!-- CARBON-FIBER COCKPIT COWLING, TITANIUM HALO & WINDSCREEN                -->
          <!-- ======================================================================= -->
          <!-- Main Lower Cockpit Carbon Cowling -->
          <path d="M -40 900 L -40 620 Q 260 545 565 555 L 875 555 Q 1180 545 1480 620 L 1480 900 Z" fill="url(#carbonWeavePattern)" stroke="#334155" stroke-width="4" />
          <!-- Red Cockpit Rim Padding -->
          <path d="M 120 605 Q 420 552 720 552 Q 1020 552 1320 605" fill="none" stroke="#dc2626" stroke-width="10" stroke-linecap="round" />
          <!-- Smoked Polycarbonate Aero Windscreen Visor -->
          <path d="M 520 552 Q 720 512 920 552 Z" fill="rgba(56, 189, 248, 0.18)" stroke="#38bdf8" stroke-width="2" />

          <!-- ICONIC FIA TITANIUM HALO SAFETY BAR (Center Pillar + Sweeping Top Hoop) -->
          <!-- Center Halo Pylon (Slimmed so view ahead & dashboard stay 100% clear) -->
          <path d="M 698 115 L 742 115 L 730 455 L 710 455 Z" fill="url(#carbonWeavePattern)" stroke="#475569" stroke-width="2.5" />
          <line x1="720" y1="120" x2="720" y2="450" stroke="#dc2626" stroke-width="3" opacity="0.8" />
          <!-- Sweeping Top Halo Arch Framing the Top of the Screen -->
          <path d="M -30 225 C 240 35, 520 95, 720 95 C 920 95, 1200 35, 1470 225 L 1470 125 C 1180 -35, 920 35, 720 35 C 520 35, 260 -35, -30 125 Z" fill="url(#haloMetalHighlight)" stroke="#0f172a" stroke-width="4" filter="drop-shadow(0 14px 22px rgba(0,0,0,0.8))" />
          <!-- Halo Sponsor Telemetry Strip -->
          <path d="M 480 80 Q 720 62 960 80" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round" />
        </g>
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR TITANIUM FLOOR SPARKS & NITROUS FLAMES -->
      <div id="f1-spark-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. F1 STEERING WHEEL DASHBOARD (THE MATH BOARD) + RACE ENGINEER ("CHIEF APEX") -->
      <div style="position: absolute; bottom: 162px; left: 50%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 28px; width: 96%; max-width: 960px; z-index: 5; pointer-events: none;">

        <!-- F1 CARBON-FIBER STEERING WHEEL & HOLOGRAPHIC DASHBOARD -->
        <div id="f1-steering-wheel" style="position: relative; width: 475px; max-width: 60vw; min-height: 275px; background: linear-gradient(165deg, #1e293b 0%, #0f172a 55%, #020617 100%); border: 6px solid #334155; border-radius: 42px 42px 26px 26px; box-shadow: 0 22px 45px rgba(0,0,0,0.92), inset 0 3px 0 rgba(255,255,255,0.22), 0 0 25px rgba(56,189,248,0.22); padding: 16px 22px 20px 22px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; z-index: 2; transition: transform 0.08s linear;">

          <!-- Left & Right Sculpted Red Suede Thumb Grips on the Wheel -->
          <div style="position: absolute; left: -14px; top: 48px; bottom: 42px; width: 18px; background: linear-gradient(90deg, #991b1b, #ef4444); border: 3px solid #0f172a; border-radius: 14px 0 0 14px; box-shadow: -6px 0 14px rgba(0,0,0,0.6);"></div>
          <div style="position: absolute; right: -14px; top: 48px; bottom: 42px; width: 18px; background: linear-gradient(270deg, #991b1b, #ef4444); border: 3px solid #0f172a; border-radius: 0 14px 14px 0; box-shadow: 6px 0 14px rgba(0,0,0,0.6);"></div>

          <!-- Top 15-LED FIA RPM Shift-Light Strip Across Top of Steering Wheel -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 6px; background: #020617; padding: 6px 14px; border-radius: 999px; border: 2px solid #1e293b; margin-bottom: 8px;">
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px #ef4444;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px #ef4444;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px #ef4444;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px #ef4444;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 10px #38bdf8;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #a855f7; box-shadow: 0 0 10px #a855f7;"></div>
            <div style="width: 11px; height: 11px; border-radius: 50%; background: #a855f7; box-shadow: 0 0 10px #a855f7;"></div>
          </div>

          <!-- Steering Wheel Center Layout: Left Rotary Knobs | Center ECU Math Screen | Right Rotary Knobs -->
          <div style="display: grid; grid-template-columns: 58px 1fr 58px; gap: 12px; align-items: center; flex-grow: 1;">
            
            <!-- Left Telemetry Buttons & ERS Dial -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: #ef4444; border: 2.5px solid #ffffff; box-shadow: 0 0 8px #ef4444; font-size: 0.5rem; font-weight: 900; color: #fff; display: flex; align-items: center; justify-content: center;">DRS</div>
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #0f172a; border: 3px solid #fde047; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 0.62rem; font-weight: 900; color: #fde047;">ERS</div>
              <div style="width: 24px; height: 24px; border-radius: 50%; background: #22c55e; border: 2.5px solid #ffffff; font-size: 0.5rem; font-weight: 900; color: #020617; display: flex; align-items: center; justify-content: center;">PIT</div>
            </div>

            <!-- CENTER F1 ECU DIGITAL TELEMETRY DISPLAY (THE MATH EQUATION) -->
            <div style="position: relative; height: 100%; background: radial-gradient(circle at 50% 50%, #082f49 0%, #041628 70%, #020617 100%); border: 3px solid #38bdf8; border-radius: 14px; box-shadow: inset 0 0 24px rgba(0,0,0,0.9), 0 0 16px rgba(56,189,248,0.3); padding: 8px 18px; display: flex; align-items: center; justify-content: space-between; overflow: hidden;">
              
              <!-- Left Gear & Speed Readout Inside Dash -->
              <div style="display: flex; flex-direction: column; align-items: center; border-right: 1.5px solid rgba(56,189,248,0.3); padding-right: 12px;">
                <span style="font-family: monospace; font-size: 0.6rem; color: #38bdf8; font-weight: 900;">GEAR</span>
                <span id="f1-gear-num" style="font-family: monospace; font-size: 2.4rem; font-weight: 900; color: #fde047; line-height: 1; text-shadow: 0 0 10px rgba(250,204,21,0.6);">7</span>
                <span id="f1-speed-mph" style="font-family: monospace; font-size: 0.68rem; color: #4ade80; font-weight: 900; margin-top: 4px;">212 MPH</span>
              </div>

              <!-- Crisp High-Contrast Dash Equation -->
              <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-grow: 1;">
                <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Courier New', monospace; font-size: 3.5rem; font-weight: 900; color: #f8fafc; letter-spacing: 0.06em; line-height: 1.02; text-shadow: 0 0 14px rgba(56, 189, 248, 0.9);">
                  <div id="math-num1">18</div>
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <span id="math-op" style="color: #ef4444; font-size: 2.9rem; text-shadow: 0 0 12px #ef4444;">+</span>
                    <span id="math-num2">16</span>
                  </div>
                  <div style="width: 108%; height: 5px; background: #38bdf8; border-radius: 999px; margin: 5px -4% 4px 0; box-shadow: 0 0 10px #38bdf8;"></div>
                  <div id="math-question-mark" style="color: #fde047; letter-spacing: 0.14em; font-size: 2.7rem; text-shadow: 0 0 12px #fde047;">??</div>
                </div>
              </div>
            </div>

            <!-- Right Telemetry Buttons & Brake-Bias Dial -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: #38bdf8; border: 2.5px solid #ffffff; font-size: 0.5rem; font-weight: 900; color: #020617; display: flex; align-items: center; justify-content: center;">RAD</div>
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #0f172a; border: 3px solid #ef4444; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 0.62rem; font-weight: 900; color: #ef4444;">MAP</div>
              <div style="width: 24px; height: 24px; border-radius: 50%; background: #eab308; border: 2.5px solid #ffffff; font-size: 0.5rem; font-weight: 900; color: #020617; display: flex; align-items: center; justify-content: center;">lim</div>
            </div>

          </div>

        </div>

        <!-- RACE ENGINEER / CREW CHIEF ("CHIEF APEX") ON PIT-WALL RADIO HUD -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: 4px;">
          <!-- Pit-Wall Team Radio Speech Bubble -->
          <div id="f1-speech-bubble" style="background: rgba(9, 13, 22, 0.96); color: #38bdf8; border: 2.5px solid #ef4444; border-radius: 14px; padding: 6px 14px; font-family: monospace; font-size: 0.8rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 6px 16px rgba(0,0,0,0.75); white-space: nowrap; transition: all 0.2s;">
            📻 [TEAM RADIO]: Box-box! Solve dash for DRS Overtake!
          </div>

          <div id="f1-chief-mascot" class="chief-idle" style="width: 185px; height: 210px; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.8));">
            <svg viewBox="0 0 210 230" style="width: 100%; height: 100%; overflow: visible;">
              <!-- Telemetry Comms Frame Behind Crew Chief -->
              <rect x="20" y="25" width="170" height="190" rx="22" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" stroke-width="3" />
              <rect x="28" y="33" width="44" height="14" rx="4" fill="#ef4444" />
              <text x="50" y="43" fill="#ffffff" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">LIVE PIT</text>

              <!-- Crew Chief Racing Team Jacket & Collar -->
              <path d="M 42 155 L 168 155 L 178 212 L 32 212 Z" fill="#dc2626" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />
              <polygon points="82,155 128,155 118,212 92,212" fill="#0f172a" />
              <path d="M 76 146 L 134 146 L 140 162 L 70 162 Z" fill="#fde047" stroke="#0f172a" stroke-width="2.5" />

              <!-- Heavy Carbon-Fiber Noise-Canceling Pit Headset (Cups & Top Band) -->
              <path d="M 55 95 C 55 38, 155 38, 155 95" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round" />
              <rect x="42" y="78" width="22" height="38" rx="10" fill="#ef4444" stroke="#0f172a" stroke-width="3" />
              <rect x="146" y="78" width="22" height="38" rx="10" fill="#ef4444" stroke="#0f172a" stroke-width="3" />

              <!-- Crew Chief Head & Racing Cap -->
              <circle cx="105" cy="96" r="38" fill="#fcd34d" stroke="#0f172a" stroke-width="3" />
              <!-- Red Scuderia Team Cap & Curved Brim -->
              <path d="M 66 84 C 66 46, 144 46, 144 84 Z" fill="#dc2626" stroke="#0f172a" stroke-width="3" />
              <path d="M 62 82 Q 105 70 148 82 L 154 90 Q 105 80 56 90 Z" fill="#0f172a" stroke="#fde047" stroke-width="2" />
              <text x="105" y="70" fill="#fde047" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle">F1</text>

              <!-- Reflective Aviator Pit-Visor Sunglasses -->
              <rect x="74" y="86" width="28" height="18" rx="6" fill="#0284c7" stroke="#0f172a" stroke-width="2.5" />
              <rect x="108" y="86" width="28" height="18" rx="6" fill="#0284c7" stroke="#0f172a" stroke-width="2.5" />
              <line x1="102" y1="92" x2="108" y2="92" stroke="#fde047" stroke-width="3" />
              <line x1="78" y1="90" x2="92" y2="90" stroke="#bae6fd" stroke-width="2.5" stroke-linecap="round" />
              <line x1="112" y1="90" x2="126" y2="90" stroke="#bae6fd" stroke-width="2.5" stroke-linecap="round" />

              <!-- Confident Grin & Headset Boom Microphone -->
              <path d="M 94 114 Q 105 122 118 114" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
              <path d="M 156 104 Q 145 124 114 120" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
              <circle cx="112" cy="120" r="5" fill="#22c55e" stroke="#0f172a" stroke-width="1.5" />
            </svg>
          </div>
        </div>

      </div>

      <!-- 3. F1 PADDLE-SHIFTER & DRS THROTTLE CONTROL DECK -->
      <div style="position: absolute; bottom: 84px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 26px rgba(0,0,0,0.88));">
        <div style="background: linear-gradient(180deg, #1e293b 0%, #090d16 100%); border: 3px solid #ef4444; border-radius: 16px; padding: 10px 24px; display: flex; align-items: center; gap: 18px; box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 0 20px rgba(239,68,68,0.35);">
          
          <!-- Checkered Flag Accent & Telemetry Status -->
          <div style="display: flex; flex-direction: column; min-width: 160px;">
            <span style="font-family: monospace; font-size: 0.68rem; font-weight: 900; color: #fde047; letter-spacing: 0.14em; text-transform: uppercase;">🏁 ERS / DRS TELEMETRY</span>
            <span id="system-status-text" style="font-family: monospace; font-size: 0.85rem; font-weight: 900; color: #f8fafc; letter-spacing: 0.06em;">DRS ZONE: ARMED</span>
          </div>

          <!-- Answer Number Input -->
          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-family: monospace; font-size: 1.95rem; font-weight: 900; color: #fde047; background: #020617; border: 3px solid #38bdf8; border-radius: 12px; outline: none; box-shadow: inset 0 3px 8px rgba(0,0,0,0.8), 0 0 12px rgba(56,189,248,0.4);" />

          <!-- Clean "Submit" Button -->
          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #ef4444 0%, #991b1b 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #fde047; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; box-shadow: 0 4px 14px rgba(239,68,68,0.5); transition: transform 0.1s;">
            Submit
          </button>
        </div>
      </div>

    </div>
  `;

  loadNewEquation();
  setupMathControls();
  startProceduralTrackLoop();
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

// ============================================================================
// REAL-TIME 60FPS PSEUDO-3D TWISTING F1 CIRCUIT RENDERER
// ============================================================================
let boostActiveUntil = 0;

function startProceduralTrackLoop() {
  const trackGroup = document.getElementById("f1-dynamic-track-layer");
  const wheelEl = document.getElementById("f1-steering-wheel");
  const leftTire = document.getElementById("f1-wheel-left");
  const rightTire = document.getElementById("f1-wheel-right");
  const horizonEl = document.getElementById("f1-horizon-scenery");
  const speedEl = document.getElementById("f1-speed-mph");
  const gearEl = document.getElementById("f1-gear-num");

  let scrollDistance = 0;
  let curvePhase = 0;

  function renderFrame() {
    // Stop automatically if player leaves Fast Lane zone
    if (!document.getElementById("fastlane-world-root")) {
      trackAnimId = null;
      return;
    }

    const now = performance.now();
    const isBoosting = now < boostActiveUntil;

    // Advance road scroll & S-curve phase
    scrollDistance += isBoosting ? 0.16 : 0.062;
    curvePhase += isBoosting ? 0.024 : 0.013;

    // Smooth compound S-curve bending left and right
    const curve =
      Math.sin(curvePhase) * 205 +
      Math.cos(curvePhase * 0.48) * 85;

    // Rotate F1 Steering Wheel, Front Tires & Horizon Parallax to match the turn!
    const steerDeg = Math.max(-18, Math.min(18, curve * 0.065));
    if (wheelEl) {
      wheelEl.style.transform = `rotate(${steerDeg.toFixed(2)}deg)`;
    }
    if (leftTire && rightTire) {
      const tireShiftX = curve * 0.035;
      leftTire.setAttribute("transform", `translate(${(230 + tireShiftX).toFixed(1)}, 415) rotate(${(steerDeg * 0.35).toFixed(1)} 57 95)`);
      rightTire.setAttribute("transform", `translate(${(1096 + tireShiftX).toFixed(1)}, 415) rotate(${(steerDeg * 0.35).toFixed(1)} 57 95)`);
    }
    if (horizonEl) {
      horizonEl.setAttribute("transform", `translate(${(-curve * 0.22).toFixed(1)}, 0)`);
    }
    if (speedEl && gearEl) {
      const mph = isBoosting
        ? 238 + Math.round(Math.sin(now * 0.03) * 4)
        : 198 + Math.round(Math.abs(Math.cos(curvePhase)) * 18);
      speedEl.textContent = mph + " MPH";
      gearEl.textContent = isBoosting ? "8" : mph > 208 ? "7" : "6";
    }

    // Build 26 perspective depth slices from horizon (y=350) to bottom (y=880)
    const SLICES = 26;
    const horizonY = 350;
    const bottomY = 885;
    const pts = [];

    for (let i = 0; i <= SLICES; i++) {
      const t = i / SLICES; // 0 = horizon, 1 = foreground
      const p = Math.pow(t, 1.85); // Perspective foreshortening
      const y = horizonY + p * (bottomY - horizonY);

      // Center of road curves strongly near the horizon and anchors at the car's nose at bottom
      const centerX = 720 + curve * Math.pow(1 - t, 1.75) + Math.sin(t * 3.5 + curvePhase * 1.4) * 28 * (1 - t);
      const halfRoadW = 48 + p * 690;
      const kerbW = 8 + p * 64;
      const barrierOffset = 22 + p * 145;
      const fenceTopH = 18 + p * 140;

      pts.push({
        t,
        p,
        y,
        centerX,
        leftRoad: centerX - halfRoadW,
        rightRoad: centerX + halfRoadW,
        leftKerbOuter: centerX - halfRoadW - kerbW,
        rightKerbOuter: centerX + halfRoadW + kerbW,
        leftBarrier: centerX - halfRoadW - kerbW - barrierOffset,
        rightBarrier: centerX + halfRoadW + kerbW + barrierOffset,
        fenceTopH
      });
    }

    let svgHTML = "";

    // 1. Continuous Asphalt Track Surface Polygon
    const roadPoly =
      pts.map((pt) => `${pt.leftRoad.toFixed(1)},${pt.y.toFixed(1)}`).join(" ") +
      " " +
      pts.slice().reverse().map((pt) => `${pt.rightRoad.toFixed(1)},${pt.y.toFixed(1)}`).join(" ");
    svgHTML += `<polygon points="${roadPoly}" fill="url(#asphaltSurfaceGrad)" />`;

    // 2. Per-Slice Red/White FIA Kerbs, Center Dashed Line, Armco Barriers & Catch-Fence Posts
    for (let i = 0; i < SLICES; i++) {
      const a = pts[i];
      const b = pts[i + 1];

      // Alternating phase for red/white kerbs & dashed lane lines
      const stripeIndex = Math.floor(i + scrollDistance);
      const isRedKerb = stripeIndex % 2 === 0;
      const kerbColor = isRedKerb ? "#ef4444" : "#f8fafc";
      const armcoColor = isRedKerb ? "#cbd5e1" : "#94a3b8";

      // Left Apex Kerb Quad
      svgHTML += `<polygon points="${a.leftKerbOuter.toFixed(1)},${a.y.toFixed(1)} ${a.leftRoad.toFixed(1)},${a.y.toFixed(1)} ${b.leftRoad.toFixed(1)},${b.y.toFixed(1)} ${b.leftKerbOuter.toFixed(1)},${b.y.toFixed(1)}" fill="${kerbColor}" stroke="#0f172a" stroke-width="0.8" />`;

      // Right Apex Kerb Quad
      svgHTML += `<polygon points="${a.rightRoad.toFixed(1)},${a.y.toFixed(1)} ${a.rightKerbOuter.toFixed(1)},${a.y.toFixed(1)} ${b.rightKerbOuter.toFixed(1)},${b.y.toFixed(1)} ${b.rightRoad.toFixed(1)},${b.y.toFixed(1)}" fill="${kerbColor}" stroke="#0f172a" stroke-width="0.8" />`;

      // White Track Edge Lines
      svgHTML += `<line x1="${a.leftRoad.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.leftRoad.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="#ffffff" stroke-width="${(1.5 + b.p * 3).toFixed(1)}" />`;
      svgHTML += `<line x1="${a.rightRoad.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.rightRoad.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="#ffffff" stroke-width="${(1.5 + b.p * 3).toFixed(1)}" />`;

      // Center Racing Line Dashes
      if (stripeIndex % 3 === 0) {
        const lw = (2 + b.p * 8).toFixed(1);
        svgHTML += `<line x1="${a.centerX.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.centerX.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="rgba(255,255,255,0.45)" stroke-width="${lw}" />`;
      }

      // Left & Right Steel Armco Guardrails + High-Tension Crowd Catch-Fences
      const guardH_A = 10 + a.p * 42;
      const guardH_B = 10 + b.p * 42;

      // Left Catch-Fence Mesh Panel (Separates track from the grandstand crowd)
      svgHTML += `<polygon points="${a.leftBarrier.toFixed(1)},${(a.y - guardH_A).toFixed(1)} ${b.leftBarrier.toFixed(1)},${(b.y - guardH_B).toFixed(1)} ${b.leftBarrier.toFixed(1)},${(b.y - guardH_B - b.fenceTopH).toFixed(1)} ${a.leftBarrier.toFixed(1)},${(a.y - guardH_A - a.fenceTopH).toFixed(1)}" fill="url(#catchFenceMesh)" stroke="#64748b" stroke-width="1" />`;

      // Right Catch-Fence Mesh Panel
      svgHTML += `<polygon points="${a.rightBarrier.toFixed(1)},${(a.y - guardH_A).toFixed(1)} ${b.rightBarrier.toFixed(1)},${(b.y - guardH_B).toFixed(1)} ${b.rightBarrier.toFixed(1)},${(b.y - guardH_B - b.fenceTopH).toFixed(1)} ${a.rightBarrier.toFixed(1)},${(a.y - guardH_A - a.fenceTopH).toFixed(1)}" fill="url(#catchFenceMesh)" stroke="#64748b" stroke-width="1" />`;

      // Left & Right Armco Steel Barrier Walls
      const sponsorColor = stripeIndex % 4 === 0 ? "#ef4444" : stripeIndex % 4 === 2 ? "#0284c7" : armcoColor;
      svgHTML += `<polygon points="${a.leftBarrier.toFixed(1)},${a.y.toFixed(1)} ${b.leftBarrier.toFixed(1)},${b.y.toFixed(1)} ${b.leftBarrier.toFixed(1)},${(b.y - guardH_B).toFixed(1)} ${a.leftBarrier.toFixed(1)},${(a.y - guardH_A).toFixed(1)}" fill="${sponsorColor}" stroke="#0f172a" stroke-width="1.2" />`;
      svgHTML += `<polygon points="${a.rightBarrier.toFixed(1)},${a.y.toFixed(1)} ${b.rightBarrier.toFixed(1)},${b.y.toFixed(1)} ${b.rightBarrier.toFixed(1)},${(b.y - guardH_B).toFixed(1)} ${a.rightBarrier.toFixed(1)},${(a.y - guardH_A).toFixed(1)}" fill="${sponsorColor}" stroke="#0f172a" stroke-width="1.2" />`;

      // Vertical Steel Catch-Fence Stanchion Posts Rushing Past
      if (stripeIndex % 2 === 0) {
        const postW = (1.5 + b.p * 4.5).toFixed(1);
        svgHTML += `<line x1="${b.leftBarrier.toFixed(1)}" y1="${b.y.toFixed(1)}" x2="${b.leftBarrier.toFixed(1)}" y2="${(b.y - guardH_B - b.fenceTopH).toFixed(1)}" stroke="#e2e8f0" stroke-width="${postW}" />`;
        svgHTML += `<line x1="${b.rightBarrier.toFixed(1)}" y1="${b.y.toFixed(1)}" x2="${b.rightBarrier.toFixed(1)}" y2="${(b.y - guardH_B - b.fenceTopH).toFixed(1)}" stroke="#e2e8f0" stroke-width="${postW}" />`;
      }
    }

    if (trackGroup) {
      trackGroup.innerHTML = svgHTML;
    }

    trackAnimId = requestAnimationFrame(renderFrame);
  }

  trackAnimId = requestAnimationFrame(renderFrame);
}

function triggerDrsNitrousBoost() {
  boostActiveUntil = performance.now() + 1550;

  const warp = document.getElementById("drs-warp-overlay");
  const particleHost = document.getElementById("f1-spark-particles");

  if (warp) {
    warp.classList.remove("boosting");
    void warp.offsetWidth;
    warp.classList.add("boosting");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#fde047", "#f97316", "#38bdf8", "#ffffff", "#ef4444"];

  for (let i = 0; i < 38; i++) {
    const p = document.createElement("div");
    const color = colors[i % colors.length];
    const fromLeft = i % 2 === 0;
    const startX = fromLeft ? "26%" : "74%";
    const tx = (fromLeft ? -1 : 1) * (80 + Math.random() * 280) + "px";
    const ty = -(60 + Math.random() * 260) + "px";

    p.style.cssText = `
      position: absolute;
      left: ${startX};
      top: 58%;
      width: ${14 + Math.random() * 18}px;
      height: 5px;
      border-radius: 999px;
      background: ${color};
      box-shadow: 0 0 12px ${color};
      --tx: ${tx};
      --ty: ${ty};
      animation: sparkParticleFly ${0.65 + Math.random() * 0.45}s ease-out forwards;
    `;
    particleHost.appendChild(p);
  }
}

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const chief = document.getElementById("f1-chief-mascot");
  const speech = document.getElementById("f1-speech-bubble");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      triggerDrsNitrousBoost();

      if (chief) {
        chief.classList.remove("chief-party", "chief-oops");
        void chief.offsetWidth;
        chief.classList.add("chief-party");
      }
      if (speech) {
        speech.textContent = "📻 [TEAM RADIO]: PURPLE SECTOR! DRS WIDE OPEN!! 🏎️🔥";
        speech.style.borderColor = "#4ade80";
        speech.style.color = "#fde047";
      }

      setStatus("⚡ DRS OVERTAKE ACTIVE!!");
      input.style.borderColor = "#4ade80";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("DRS ZONE: ARMED");
        if (speech) {
          speech.textContent = "📻 [TEAM RADIO]: P1! Keep pushing, next lap! 🏁";
          speech.style.borderColor = "#ef4444";
          speech.style.color = "#38bdf8";
        }
        loadNewEquation();
      }, 1550);
    } else {
      if (chief) {
        chief.classList.remove("chief-party", "chief-oops");
        void chief.offsetWidth;
        chief.classList.add("chief-oops");
      }
      if (speech) {
        speech.textContent = "📻 [TEAM RADIO]: Locked the brakes! Re-calculate! ⚠️";
        speech.style.borderColor = "#ef4444";
        speech.style.color = "#fca5a5";
      }

      setStatus("⚠️ WHEELSPIN! RETRY");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#38bdf8";
        input.value = "";
        setStatus("DRS ZONE: ARMED");
        if (speech) {
          speech.textContent = "📻 [TEAM RADIO]: Hit the apex on this one! 🏎️";
          speech.style.borderColor = "#ef4444";
          speech.style.color = "#38bdf8";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
