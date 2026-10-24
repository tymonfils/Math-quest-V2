// treasureCove.js - High-Detail Subterranean Pirate Grotto, Glistening Equation Rock, Progressive Coin Trail & Gold Beam Chest
(function () {
  let mathEngine = null;

  async function loadMathEngine() {
    if (mathEngine) return mathEngine;
    const paths = [
      "./src/math/mathEngine.js",
      "../math/mathEngine.js",
      "./math/mathEngine.js"
    ];
    for (const p of paths) {
      try {
        const mod = await import(p);
        if (mod && mod.getCurrentProblem) {
          mathEngine = mod;
          return mathEngine;
        }
      } catch (e) {}
    }
    return null;
  }

  function injectCoveStyles() {
    if (document.getElementById("treasure-cove-styles")) return;
    const style = document.createElement("style");
    style.id = "treasure-cove-styles";
    style.textContent = `
      @keyframes coveWaterShimmer {
        0%, 100% { transform: translateX(0px) scaleY(1); opacity: 0.55; }
        50% { transform: translateX(14px) scaleY(1.06); opacity: 0.85; }
      }
      @keyframes rockGlistenSweep {
        0% { transform: translateX(-180px) rotate(25deg); opacity: 0; }
        20% { opacity: 0.55; }
        50% { transform: translateX(380px) rotate(25deg); opacity: 0; }
        100% { transform: translateX(380px) rotate(25deg); opacity: 0; }
      }
      @keyframes pirateCaptainIdle {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-7px) rotate(0.8deg); }
      }
      @keyframes pirateCaptainCheer {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-18px) scale(1.06) rotate(-3deg); }
        50% { transform: translateY(-4px) scale(1.02) rotate(3deg); }
        75% { transform: translateY(-14px) scale(1.05) rotate(-2deg); }
      }
      @keyframes lanternSwing {
        0%, 100% { transform: rotate(-3.5deg); }
        50% { transform: rotate(3.5deg); }
      }
      @keyframes goldGlintTwinkle {
        0%, 100% { transform: scale(0.5) rotate(0deg); opacity: 0.3; }
        50% { transform: scale(1.25) rotate(45deg); opacity: 1; }
      }
      @keyframes chestBeamShoot {
        0% { transform: scaleX(0.15) scaleY(0); opacity: 0; }
        12% { transform: scaleX(1.15) scaleY(1); opacity: 1; }
        55% { transform: scaleX(0.95) scaleY(1); opacity: 0.95; }
        85% { transform: scaleX(1.25) scaleY(1); opacity: 0.75; }
        100% { transform: scaleX(1.6) scaleY(1); opacity: 0; }
      }
      @keyframes chestAuraPulse {
        0%, 100% { transform: scale(1); opacity: 0.45; }
        50% { transform: scale(1.12); opacity: 0.85; }
      }
      @keyframes coveCoinArc {
        0% { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 1; }
        70% { opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(1.2) rotate(var(--rot)); opacity: 0; }
      }
      #cove-gold-beam-group {
        transform-origin: 735px 485px;
        transform: scaleY(0);
        opacity: 0;
        pointer-events: none;
      }
      #cove-gold-beam-group.beam-active {
        animation: chestBeamShoot 1.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      #cove-chest-open-group {
        display: none;
      }
      .chest-is-open #cove-chest-closed-group {
        display: none;
      }
      .chest-is-open #cove-chest-open-group {
        display: block;
      }
      .pirate-idle {
        animation: pirateCaptainIdle 3.4s ease-in-out infinite;
        transform-origin: bottom center;
      }
      .pirate-cheer {
        animation: pirateCaptainCheer 0.9s ease-in-out 2 !important;
        transform-origin: bottom center;
      }
    `;
    document.head.appendChild(style);
  }

  export async function renderTreasureCove(targetContainer) {
    injectCoveStyles();
    const container =
      targetContainer || document.getElementById("game-container");
    if (!container) return;

    const engine = await loadMathEngine();

    container.innerHTML = `
      <div id="treasure-world-root" style="position:relative;width:1440px;height:900px;overflow:hidden;background:#040814;font-family:'Nunito',sans-serif;user-select:none;">
        
        <!-- =========================================================================
             1. MASTER 1440x900 SVG GROTTO SCENE (CAVE, LAKE, GLISTENING ROCK, COIN TRAIL, CENTER CHEST & PIRATE TEACHER)
             ========================================================================= -->
        <svg viewBox="0 0 1440 900" style="position:absolute;inset:0;width:1440px;height:900px;pointer-events:none;">
          <defs>
            <!-- Deep Cavern & Skylight Gradients -->
            <radialGradient id="coveSkyVault" cx="52%" cy="18%" r="70%">
              <stop offset="0%" stop-color="#0e4f68" />
              <stop offset="35%" stop-color="#092238" />
              <stop offset="72%" stop-color="#051020" />
              <stop offset="100%" stop-color="#02060d" />
            </radialGradient>

            <linearGradient id="godRayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#67e8f9" stop-opacity="0.28" />
              <stop offset="50%" stop-color="#fde047" stop-opacity="0.12" />
              <stop offset="100%" stop-color="#051020" stop-opacity="0" />
            </linearGradient>

            <!-- Underground Bioluminescent Lake Gradient -->
            <linearGradient id="coveLakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0891b2" />
              <stop offset="38%" stop-color="#0e7490" />
              <stop offset="75%" stop-color="#164e63" />
              <stop offset="100%" stop-color="#041e2e" />
            </linearGradient>

            <radialGradient id="lakeGoldReflect" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stop-color="#fde047" stop-opacity="0.55" />
              <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.22" />
              <stop offset="100%" stop-color="#0891b2" stop-opacity="0" />
            </radialGradient>

            <!-- Glistening Equation Monolith Rock Gradients -->
            <linearGradient id="glisteningRockOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="35%" stop-color="#1e293b" />
              <stop offset="75%" stop-color="#0f172a" />
              <stop offset="100%" stop-color="#020617" />
            </linearGradient>

            <radialGradient id="glisteningCrystalFace" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stop-color="#0f293a" />
              <stop offset="65%" stop-color="#071521" />
              <stop offset="100%" stop-color="#020810" />
            </radialGradient>

            <linearGradient id="wetSheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
              <stop offset="50%" stop-color="#67e8f9" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>

            <!-- Gold Bullion & Coin Gradients -->
            <linearGradient id="goldCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="45%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#a16207" />
            </linearGradient>

            <linearGradient id="goldPileMoundGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#fde047" />
              <stop offset="55%" stop-color="#ca8a04" />
              <stop offset="100%" stop-color="#713f12" />
            </linearGradient>

            <!-- Heaven-Piercing Gold Beam Gradient -->
            <linearGradient id="chestHeavenBeam" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
              <stop offset="20%" stop-color="#fef08a" stop-opacity="0.95" />
              <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.65" />
              <stop offset="100%" stop-color="#fde047" stop-opacity="0" />
            </linearGradient>

            <clipPath id="rockFaceClip">
              <polygon points="88,92 145,62 395,62 452,92 468,452 418,492 118,492 72,452" />
            </clipPath>
          </defs>

          <!-- 1A. DEEP CAVERN VAULT & VOLUMETRIC SKYLIGHT GOD-RAYS -->
          <rect width="1440" height="900" fill="url(#coveSkyVault)" />
          <polygon points="580,0 890,0 1080,580 410,580" fill="url(#godRayGrad)" />
          <polygon points="660,0 790,0 920,580 540,580" fill="url(#godRayGrad)" />

          <!-- Distant Sunken Pirate Galleon Silhouette in Back Grotto -->
          <g opacity="0.38" transform="translate(815, 195)">
            <path d="M 10 140 L 220 120 L 200 185 L 35 185 Z" fill="#0f172a" stroke="#1e293b" stroke-width="3" />
            <line x1="75" y1="20" x2="85" y2="140" stroke="#1e293b" stroke-width="6" />
            <line x1="150" y1="5" x2="155" y2="135" stroke="#1e293b" stroke-width="7" />
            <path d="M 45 45 Q 85 65 115 40 L 108 105 Q 78 115 52 98 Z" fill="#1e293b" />
            <path d="M 122 32 Q 160 52 192 28 L 185 95 Q 152 108 128 88 Z" fill="#1e293b" />
          </g>

          <!-- Upper Cavern Stalactite Ceiling Arch & Glowing Crystal Clusters -->
          <path d="M 0,0 L 1440,0 L 1440,195 L 1365,125 L 1310,210 L 1240,110 L 1165,175 L 1090,85 L 1015,155 L 940,68 L 860,130 L 795,52 L 735,115 L 670,48 L 605,128 L 535,62 L 465,135 L 385,58 L 310,125 L 225,65 L 145,148 L 65,90 L 0,185 Z" fill="#040b16" stroke="#1e293b" stroke-width="2" />
          
          <!-- Bioluminescent Cyan & Gold Cave Crystals on Ceiling -->
          <polygon points="602,122 612,158 624,118" fill="#22d3ee" filter="drop-shadow(0 0 10px #06b6d4)" />
          <polygon points="855,124 866,164 878,120" fill="#fde047" filter="drop-shadow(0 0 10px #eab308)" />
          <polygon points="1085,82 1096,125 1108,80" fill="#22d3ee" filter="drop-shadow(0 0 10px #06b6d4)" />

          <!-- Swinging Hanging Chain Pirate Lanterns -->
          <g style="transform-origin: 535px 62px; animation: lanternSwing 4.2s ease-in-out infinite;">
            <line x1="535" y1="62" x2="535" y2="145" stroke="#475569" stroke-width="3" stroke-dasharray="6 3" />
            <polygon points="520,145 550,145 544,182 526,182" fill="#fde047" stroke="#78350f" stroke-width="3" filter="drop-shadow(0 0 18px #f59e0b)" />
          </g>
          <g style="transform-origin: 940px 68px; animation: lanternSwing 4.8s ease-in-out infinite;">
            <line x1="940" y1="68" x2="940" y2="152" stroke="#475569" stroke-width="3" stroke-dasharray="6 3" />
            <polygon points="925,152 955,152 949,188 931,188" fill="#fde047" stroke="#78350f" stroke-width="3" filter="drop-shadow(0 0 18px #f59e0b)" />
          </g>

          <!-- =========================================================================
               1B. THE UNDERGROUND MIRROR LAKE (MIDDLE OF THE CAVERN)
               ========================================================================= -->
          <ellipse cx="740" cy="605" rx="690" ry="185" fill="url(#coveLakeGrad)" stroke="#0e7490" stroke-width="4" />
          <ellipse cx="735" cy="565" rx="340" ry="110" fill="url(#lakeGoldReflect)" />

          <!-- Animated Shimmering Water Ripples Across the Lake -->
          <g style="animation: coveWaterShimmer 4.5s ease-in-out infinite;">
            <ellipse cx="560" cy="575" rx="85" ry="6" fill="#67e8f9" opacity="0.35" />
            <ellipse cx="735" cy="595" rx="145" ry="8" fill="#fde047" opacity="0.45" />
            <ellipse cx="910" cy="565" rx="95" ry="6" fill="#67e8f9" opacity="0.35" />
            <ellipse cx="645" cy="645" rx="110" ry="7" fill="#fde047" opacity="0.3" />
            <ellipse cx="835" cy="635" rx="120" ry="7" fill="#67e8f9" opacity="0.3" />
          </g>

          <!-- =========================================================================
               1C. CENTER ISLAND ALTAR, PROGRESSIVE GOLD COIN TRAIL & GRAND CHEST
               ========================================================================= -->
          <!-- Center Treasure Island Rock Pedestal in the Middle of the Lake -->
          <path d="M 485,548 C 510,482 615,462 735,462 C 855,462 960,482 985,548 C 945,578 845,592 735,592 C 625,592 525,578 485,548 Z" fill="#1e293b" stroke="#475569" stroke-width="4" />
          <ellipse cx="735" cy="528" rx="225" ry="42" fill="#334155" />

          <!-- Foreground Cavern Shoreline & Stepping Stones Leading to Center Chest -->
          <path d="M -40,645 C 180,625 360,675 560,695 C 780,715 1120,685 1480,635 L 1480,920 L -40,920 Z" fill="#091326" stroke="#1e293b" stroke-width="5" />
          
          <!-- Stone Causeway Stepping Stones from Foreground Shore to Center Chest Island -->
          <ellipse cx="445" cy="642" rx="58" ry="18" fill="#334155" stroke="#64748b" stroke-width="2.5" />
          <ellipse cx="535" cy="606" rx="64" ry="20" fill="#334155" stroke="#64748b" stroke-width="2.5" />
          <ellipse cx="630" cy="572" rx="72" ry="22" fill="#475569" stroke="#94a3b8" stroke-width="2.5" />

          <!-- =========================================================================
               PROGRESSIVE GOLD COIN TRAIL (SMALL -> MEDIUM -> MASSIVE HOARD AT CHEST)
               ========================================================================= -->
          <!-- STAGE 1: Small Scattered Coins on Left Shore (3-5 coins) -->
          <g id="coin-trail-stage-1">
            <ellipse cx="145" cy="705" rx="14" ry="6" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />
            <ellipse cx="165" cy="712" rx="14" ry="6" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />
            <ellipse cx="155" cy="698" rx="14" ry="6" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />

            <ellipse cx="245" cy="692" rx="15" ry="6.5" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />
            <ellipse cx="268" cy="698" rx="15" ry="6.5" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />
            <ellipse cx="255" cy="685" rx="15" ry="6.5" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />
            <ellipse cx="258" cy="678" rx="15" ry="6.5" fill="url(#goldCoinGrad)" stroke="#713f12" stroke-width="1.5" />
          </g>

          <!-- STAGE 2: Medium Coin Stacks & Goblets on Stepping Stones -->
          <g id="coin-trail-stage-2">
            <!-- Pile on Stone 1 -->
            <path d="M 405,644 Q 445,612 485,644 Z" fill="url(#goldPileMoundGrad)" stroke="#713f12" stroke-width="2" />
            <ellipse cx="428" cy="638" rx="14" ry="6" fill="url(#goldCoinGrad)" />
            <ellipse cx="452" cy="632" rx="15" ry="6" fill="url(#goldCoinGrad)" />
            <ellipse cx="468" cy="640" rx="14" ry="6" fill="url(#goldCoinGrad)" />
            <!-- Pile on Stone 2 (Taller Stack + Ruby Gem) -->
            <path d="M 488,608 Q 535,564 582,608 Z" fill="url(#goldPileMoundGrad)" stroke="#713f12" stroke-width="2" />
            <ellipse cx="515" cy="596" rx="16" ry="6.5" fill="url(#goldCoinGrad)" />
            <ellipse cx="538" cy="588" rx="16" ry="6.5" fill="url(#goldCoinGrad)" />
            <ellipse cx="556" cy="598" rx="16" ry="6.5" fill="url(#goldCoinGrad)" />
            <polygon points="535,572 545,582 535,592 525,582" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 8px #ef4444)" />
            <!-- Pile on Stone 3 (Large Mound + Golden Crown & Chalice) -->
            <path d="M 572,574 Q 630,515 688,574 Z" fill="url(#goldPileMoundGrad)" stroke="#713f12" stroke-width="2.5" />
            <polygon points="612,542 618,524 628,536 638,522 644,542" fill="#fde047" stroke="#a16207" stroke-width="2" />
            <ellipse cx="605" cy="562" rx="17" ry="7" fill="url(#goldCoinGrad)" />
            <ellipse cx="635" cy="555" rx="17" ry="7" fill="url(#goldCoinGrad)" />
            <ellipse cx="658" cy="564" rx="17" ry="7" fill="url(#goldCoinGrad)" />
          </g>

          <!-- STAGE 3: COLOSSAL MOUNTAINS OF GOLD BULLION SURROUNDING THE CENTER CHEST -->
          <g id="coin-trail-stage-3">
            <!-- Left & Right Mega Gold Mounds on the Island -->
            <path d="M 510,542 Q 615,435 715,542 Z" fill="url(#goldPileMoundGrad)" stroke="#713f12" stroke-width="3" filter="drop-shadow(0 0 18px rgba(250,204,21,0.45))" />
            <path d="M 755,542 Q 860,435 960,542 Z" fill="url(#goldPileMoundGrad)" stroke="#713f12" stroke-width="3" filter="drop-shadow(0 0 18px rgba(250,204,21,0.45))" />
            <path d="M 565,552 Q 735,445 905,552 Z" fill="url(#goldPileMoundGrad)" stroke="#a16207" stroke-width="3" />

            <!-- Gold Bullion Bars, Diamonds, Emeralds & Scattered Doubloons -->
            <polygon points="565,522 605,512 615,528 575,538" fill="#fef08a" stroke="#a16207" stroke-width="2" />
            <polygon points="855,518 895,528 885,544 845,534" fill="#fef08a" stroke="#a16207" stroke-width="2" />
            <polygon points="615,498 627,482 639,498 627,514" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 10px #38bdf8)" />
            <polygon points="835,496 847,480 859,496 847,512" fill="#10b981" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 10px #10b981)" />
            
            <!-- Animated Twinkling Star Glints on the Gold Trail -->
            <g style="transform-origin: 605px 495px; animation: goldGlintTwinkle 2.2s infinite;">
              <polygon points="605,480 609,491 620,495 609,499 605,510 601,499 590,495 601,491" fill="#ffffff" />
            </g>
            <g style="transform-origin: 865px 505px; animation: goldGlintTwinkle 2.8s infinite 0.7s;">
              <polygon points="865,490 869,501 880,505 869,509 865,520 861,509 850,505 861,501" fill="#ffffff" />
            </g>
            <g style="transform-origin: 535px 580px; animation: goldGlintTwinkle 2.5s infinite 1.2s;">
              <polygon points="535,568 538,577 547,580 538,583 535,592 532,583 523,580 532,577" fill="#ffffff" />
            </g>
          </g>

          <!-- =========================================================================
               1D. THE GRAND SOVEREIGN CHEST + HEAVEN-PIERCING GOLD BEAM (CENTER)
               ========================================================================= -->
          <!-- Volumetric Shining Gold Beam (Shoots from Inside the Chest to Top of Cave on Correct Answer!) -->
          <g id="cove-gold-beam-group">
            <polygon points="645,485 825,485 1040,-40 430,-40" fill="url(#chestHeavenBeam)" />
            <polygon points="685,485 785,485 890,-40 580,-40" fill="#ffffff" opacity="0.85" filter="drop-shadow(0 0 38px #fde047)" />
            <ellipse cx="735" cy="485" rx="195" ry="48" fill="#fef08a" opacity="0.75" filter="drop-shadow(0 0 35px #fde047)" />
          </g>

          <!-- Ambient Golden Aura Behind Center Chest -->
          <circle cx="735" cy="472" r="92" fill="url(#lakeGoldReflect)" style="transform-origin:735px 472px;animation:chestAuraPulse 3s ease-in-out infinite;" />

          <!-- THE CENTER CHEST ACTOR (Switches from Closed to Open with Gold Beam!) -->
          <g id="cove-center-chest" transform="translate(625, 378)">
            <!-- CLOSED CHEST STATE -->
            <g id="cove-chest-closed-group" filter="drop-shadow(0 16px 26px rgba(0,0,0,0.85))">
              <!-- Heavy Mahogany & Gold Base -->
              <rect x="24" y="76" width="172" height="84" rx="10" fill="#78350f" stroke="#fde047" stroke-width="5" />
              <rect x="34" y="86" width="152" height="64" rx="6" fill="#451a03" />
              <rect x="54" y="76" width="22" height="84" fill="url(#goldCoinGrad)" stroke="#451a03" stroke-width="2" />
              <rect x="144" y="76" width="22" height="84" fill="url(#goldCoinGrad)" stroke="#451a03" stroke-width="2" />
              <!-- Domed Pirate Lid -->
              <path d="M 20,76 C 20,18 200,18 200,76 Z" fill="#92400e" stroke="#fde047" stroke-width="5" />
              <path d="M 54,76 L 54,32 L 76,28 L 76,76 Z M 144,76 L 144,28 L 166,32 L 166,76 Z" fill="url(#goldCoinGrad)" stroke="#451a03" stroke-width="2" />
              <!-- Glowing Golden Seam Between Lid and Base -->
              <line x1="22" y1="76" x2="198" y2="76" stroke="#fef08a" stroke-width="4" filter="drop-shadow(0 0 10px #fde047)" />
              <!-- Golden Skull-and-Emerald Lock Plate -->
              <rect x="92" y="58" width="36" height="42" rx="8" fill="url(#goldCoinGrad)" stroke="#451a03" stroke-width="2.5" />
              <circle cx="110" cy="74" r="9" fill="#fef08a" />
              <circle cx="106" cy="73" r="2.5" fill="#dc2626" />
              <circle cx="114" cy="73" r="2.5" fill="#dc2626" />
              <polygon points="110,84 117,92 110,98 103,92" fill="#10b981" filter="drop-shadow(0 0 6px #10b981)" />
            </g>

            <!-- OPEN CHEST STATE (Revealed When Player Solves Equation!) -->
            <g id="cove-chest-open-group" filter="drop-shadow(0 0 35px #fde047)">
              <!-- Thrown-Back Open Chest Lid -->
              <path d="M 26,48 C 26,-6 194,-6 194,48 Z" fill="#451a03" stroke="#fde047" stroke-width="5" />
              <!-- Blinding Heap of Glowing Gold & Jewels Inside Open Chest -->
              <ellipse cx="110" cy="78" rx="82" ry="28" fill="#fef08a" stroke="#ffffff" stroke-width="3" filter="drop-shadow(0 0 25px #fde047)" />
              <circle cx="75" cy="72" r="14" fill="#ffffff" />
              <circle cx="110" cy="64" r="18" fill="#ffffff" />
              <circle cx="145" cy="72" r="14" fill="#ffffff" />
              <polygon points="88,62 98,44 108,62" fill="#38bdf8" />
              <polygon points="118,62 128,44 138,62" fill="#ef4444" />
              <!-- Chest Base -->
              <rect x="24" y="78" width="172" height="82" rx="10" fill="#78350f" stroke="#fde047" stroke-width="5" />
              <rect x="54" y="78" width="22" height="82" fill="url(#goldCoinGrad)" />
              <rect x="144" y="78" width="22" height="82" fill="url(#goldCoinGrad)" />
            </g>
          </g>

          <!-- =========================================================================
               1E. BIG GLISTENING EQUATION ROCK MONOLITH (LEFT SIDE)
               ========================================================================= -->
          <g id="cove-equation-monolith">
            <!-- Outer Jagged Wet Cavern Boulder -->
            <polygon points="42,495 55,95 118,45 270,28 422,45 482,95 498,495 442,535 95,535" fill="url(#glisteningRockOuter)" stroke="#64748b" stroke-width="4" filter="drop-shadow(0 22px 34px rgba(0,0,0,0.9))" />
            
            <!-- Glowing Gold & Emerald Ore Veins Cracked Into the Boulder Edges -->
            <path d="M 62,155 L 85,175 L 72,215 M 472,140 L 448,168 L 462,210 M 75,380 L 98,415 L 82,455" fill="none" stroke="#fde047" stroke-width="3.5" stroke-linecap="round" filter="drop-shadow(0 0 8px #eab308)" />
            <polygon points="52,265 28,245 44,295" fill="#22d3ee" filter="drop-shadow(0 0 10px #06b6d4)" />
            <polygon points="488,285 514,265 496,315" fill="#fde047" filter="drop-shadow(0 0 10px #eab308)" />

            <!-- Inner Polished Glistening Crystal Face (Where the Equation Appears) -->
            <polygon points="88,92 145,62 395,62 452,92 468,452 418,492 118,492 72,452" fill="url(#glisteningCrystalFace)" stroke="#eab308" stroke-width="4" />

            <!-- Animated Wet Glistening Light Sweep Across the Rock Surface -->
            <g clip-path="url(#rockFaceClip)">
              <rect x="0" y="0" width="120" height="650" fill="url(#wetSheenGrad)" style="animation: rockGlistenSweep 5.5s ease-in-out infinite;" />
            </g>

            <!-- Glistening Water Droplets & Star Sparkles on the Rock -->
            <circle cx="115" cy="125" r="3.5" fill="#67e8f9" opacity="0.85" />
            <circle cx="428" cy="145" r="4" fill="#67e8f9" opacity="0.85" />
            <circle cx="105" cy="425" r="4.5" fill="#67e8f9" opacity="0.85" />
            <circle cx="435" cy="410" r="3.5" fill="#fde047" opacity="0.9" />
          </g>

          <!-- =========================================================================
               1F. PIRATE TEACHER: CAPTAIN BARNABY GOLDBEARD & PARROT (RIGHT SIDE)
               ========================================================================= -->
          <!-- Wooden Ship Quarterdeck Pier on Right Bank -->
          <polygon points="995,505 1375,505 1410,565 965,565" fill="#451a03" stroke="#eab308" stroke-width="3" />
          <rect x="1025" y="565" width="26" height="95" fill="#270e05" />
          <rect x="1310" y="565" width="26" height="95" fill="#270e05" />

          <g id="pirate-teacher-svg" class="pirate-idle" transform="translate(1055, 165)">
            <!-- Crimson & Gold Admiral Coat Tails -->
            <path d="M 62,185 L 22,335 L 198,335 L 158,185 Z" fill="#991b1b" stroke="#fde047" stroke-width="4" />
            <rect x="88" y="185" width="44" height="150" fill="#fefce8" />
            <!-- Heavy Pirate Boots & Peg/Buckle -->
            <rect x="64" y="315" width="38" height="42" rx="6" fill="#1e293b" stroke="#eab308" stroke-width="3" />
            <rect x="118" y="315" width="38" height="42" rx="6" fill="#1e293b" stroke="#eab308" stroke-width="3" />
            <!-- Gold-Buckled Cross Belt -->
            <rect x="48" y="242" width="124" height="22" rx="4" fill="#1e293b" stroke="#fde047" stroke-width="3" />
            <rect x="94" y="238" width="32" height="30" rx="4" fill="#fde047" stroke="#78350f" stroke-width="2.5" />
            <!-- Left Arm Holding Golden Spyglass Telescope -->
            <path d="M 58,195 L 12,235 L 28,258 L 68,225 Z" fill="#b91c1c" stroke="#fde047" stroke-width="3" />
            <polygon points="-18,222 32,238 26,254 -24,238" fill="url(#goldCoinGrad)" stroke="#78350f" stroke-width="2.5" />
            <!-- Right Arm & Golden Hook/Cutlass Hilt -->
            <path d="M 162,195 L 208,235 L 192,258 L 152,225 Z" fill="#b91c1c" stroke="#fde047" stroke-width="3" />
            <circle cx="204" cy="248" r="13" fill="#fde047" stroke="#78350f" stroke-width="2.5" />
            <!-- Gold Epaulettes on Shoulders -->
            <ellipse cx="56" cy="192" rx="26" ry="12" fill="url(#goldCoinGrad)" stroke="#78350f" stroke-width="2.5" />
            <ellipse cx="164" cy="192" rx="26" ry="12" fill="url(#goldCoinGrad)" stroke="#78350f" stroke-width="2.5" />

            <!-- Emerald & Scarlet Pirate Parrot ("Polly Cosine") Perched on Right Shoulder -->
            <g transform="translate(158, 132)">
              <ellipse cx="18" cy="28" rx="16" ry="22" fill="#10b981" stroke="#064e3b" stroke-width="2.5" />
              <path d="M 6,22 Q -4,35 10,44" fill="#ef4444" />
              <circle cx="18" cy="10" r="13" fill="#10b981" stroke="#064e3b" stroke-width="2.5" />
              <path d="M 6,8 L -6,14 L 6,18 Z" fill="#fde047" stroke="#78350f" stroke-width="1.5" />
              <circle cx="15" cy="9" r="3" fill="#0f172a" />
            </g>

            <!-- Pirate Captain Head, Braided Beard & Eyepatch -->
            <circle cx="110" cy="135" r="44" fill="#fed7aa" stroke="#9a3412" stroke-width="3" />
            <!-- Magnificent Braided Pirate Beard with Gold Rings -->
            <path d="M 68,142 C 62,195 88,222 110,222 C 132,222 158,195 152,142 C 138,162 82,162 68,142 Z" fill="#451a03" stroke="#78350f" stroke-width="2.5" />
            <rect x="92" y="212" width="10" height="8" fill="#fde047" />
            <rect x="118" y="212" width="10" height="8" fill="#fde047" />
            <!-- Smile & Pirate Eyepatch -->
            <path d="M 96,162 Q 110,174 124,162" fill="none" stroke="#fefce8" stroke-width="4" stroke-linecap="round" />
            <circle cx="92" cy="132" r="6" fill="#0f172a" />
            <circle cx="90" cy="130" r="2" fill="#ffffff" />
            <circle cx="128" cy="132" r="10" fill="#0f172a" stroke="#fde047" stroke-width="2" />
            <line x1="68" y1="118" x2="152" y2="140" stroke="#0f172a" stroke-width="3.5" />

            <!-- Classic Pirate Tricorn Hat with Gold Skull Emblem & Feather Plume -->
            <path d="M 28,112 C 45,42 175,42 192,112 C 145,96 75,96 28,112 Z" fill="#0f172a" stroke="#fde047" stroke-width="4" />
            <path d="M 155,72 C 185,32 222,42 208,82" fill="#ef4444" stroke="#fef08a" stroke-width="2" />
            <circle cx="110" cy="82" r="12" fill="#fef08a" stroke="#78350f" stroke-width="2" />
          </g>
        </svg>

        <!-- =========================================================================
             2. EQUATION OVERLAY ON THE GLISTENING ROCK (SAFE BELOW FAST-TRAVEL BAR)
             ========================================================================= -->
        <div style="position:absolute;top:92px;left:92px;width:356px;height:385px;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;z-index:5;">
          <div style="font-family:'Pirata One','Nunito',cursive;font-size:1.15rem;color:#67e8f9;letter-spacing:0.12em;text-transform:uppercase;text-shadow:0 0 10px #06b6d4;margin-bottom:2px;">
            ⚓ Smuggler's Cipher Rock
          </div>

          <div style="width:250px;display:flex;flex-direction:column;align-items:flex-end;font-family:'Nunito',sans-serif;font-weight:900;line-height:1.02;padding-right:18px;">
            <div id="math-num1" style="font-size:4.9rem;color:#fefce8;text-shadow:0 0 22px #38bdf8, 0 5px 0 #020617;">15</div>
            <div style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:2px;">
              <span id="math-op" style="font-size:4.2rem;color:#fde047;text-shadow:0 0 20px #f59e0b, 0 4px 0 #451a03;">+</span>
              <span id="math-num2" style="font-size:4.9rem;color:#fefce8;text-shadow:0 0 22px #38bdf8, 0 5px 0 #020617;">38</span>
            </div>
            <!-- Glistening Golden Vein Divider Bar -->
            <div style="width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg,#22d3ee,#fde047,#f59e0b);box-shadow:0 0 18px #fde047;margin:10px 0 8px 0;"></div>
            <div id="math-question-mark" style="font-size:4.2rem;color:#fde047;letter-spacing:0.12em;text-shadow:0 0 24px #eab308, 0 4px 0 #451a03;">??</div>
          </div>
        </div>

        <!-- =========================================================================
             3. PIRATE TEACHER SPEECH BUBBLE (POSITIONED CLEANLY ABOVE CAPTAIN)
             ========================================================================= -->
        <div id="cove-speech-bubble" style="position:absolute;top:105px;right:95px;width:360px;background:rgba(15,23,42,0.95);border:3px solid #fde047;border-radius:20px;padding:12px 20px;color:#fef08a;font-size:1.02rem;font-weight:800;text-align:center;box-shadow:0 12px 28px rgba(0,0,0,0.85), 0 0 18px rgba(250,204,21,0.35);z-index:6;pointer-events:none;">
          "Ahoy, Matey! Crack the cipher etched in the Glistening Rock to blast open the Sovereign Chest!"
        </div>

        <!-- PARTICLE BURST LAYER FOR DOUBLOON FOUNTAIN -->
        <div id="cove-coin-particles" style="position:absolute;inset:0;pointer-events:none;z-index:12;overflow:hidden;"></div>

        <!-- =========================================================================
             4. BOTTOM-CENTER PIRATE COMPASS ALTAR INPUT DECK
             ========================================================================= -->
        <div style="position:absolute;bottom:98px;left:50%;transform:translateX(-50%);width:670px;background:linear-gradient(180deg,rgba(15,23,42,0.96) 0%,rgba(6,11,22,0.98) 100%);border:3.5px solid #eab308;border-radius:26px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 18px 40px rgba(0,0,0,0.9), 0 0 28px rgba(234,179,8,0.35);z-index:10;">
          
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="font-size:0.85rem;font-weight:900;color:#67e8f9;letter-spacing:0.12em;text-transform:uppercase;">
              🏴‍☠️ SOVEREIGN CHEST LOCK
            </div>
            <div id="cove-chest-status" style="font-size:1.05rem;font-weight:900;color:#fde047;letter-spacing:0.06em;">
              HOARD BEAM: ARMED
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:18px;">
            <input
              id="math-answer-input"
              type="number"
              placeholder="?"
              autocomplete="off"
              style="width:138px;height:68px;background:#fefce8;border:4px solid #f59e0b;border-radius:18px;text-align:center;font-family:'Nunito',sans-serif;font-size:2.4rem;font-weight:900;color:#451a03;outline:none;box-shadow:inset 0 4px 8px rgba(0,0,0,0.2), 0 0 16px rgba(250,204,21,0.5);"
            />
            <button
              id="math-submit-btn"
              style="height:68px;padding:0 34px;background:linear-gradient(180deg,#fbbf24 0%,#b45309 100%);border:3px solid #fef08a;border-radius:18px;color:#ffffff;font-family:'Nunito',sans-serif;font-size:1.35rem;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 20px rgba(245,158,11,0.55);text-shadow:0 2px 4px rgba(0,0,0,0.6);"
            >
              SUBMIT
            </button>
          </div>
        </div>

        <!-- =========================================================================
             5. INTERACTIVE AVATAR & MOVEMENT CONTROLS (MATCHES ALL ZONES)
             ========================================================================= -->
        <div id="cove-avatar-actor" style="position:absolute;bottom:58px;left:475px;width:125px;height:165px;z-index:14;pointer-events:none;transition:transform 0.08s linear;"></div>

        <div style="position:absolute;bottom:22px;left:32px;display:flex;gap:12px;z-index:15;">
          <button id="cove-left-btn" style="width:66px;height:54px;border-radius:14px;background:rgba(9,15,30,0.92);border:2.5px solid #38bdf8;color:#ffffff;font-size:1.35rem;font-weight:900;cursor:pointer;">◄</button>
          <button id="cove-right-btn" style="width:66px;height:54px;border-radius:14px;background:rgba(9,15,30,0.92);border:2.5px solid #38bdf8;color:#ffffff;font-size:1.35rem;font-weight:900;cursor:pointer;">►</button>
          <button id="cove-jump-btn" style="padding:0 24px;height:54px;border-radius:14px;background:rgba(9,15,30,0.92);border:2.5px solid #38bdf8;color:#ffffff;font-size:1.1rem;font-weight:900;letter-spacing:0.06em;cursor:pointer;">▲ JUMP</button>
        </div>

      </div>
    `;

    // Mount player's custom Avatar if AvatarStage helper exists, otherwise fallback SVG
    const avatarHost = document.getElementById("cove-avatar-actor");
    if (avatarHost) {
      if (window.AvatarStage && typeof window.AvatarStage.renderAvatarInto === "function") {
        window.AvatarStage.renderAvatarInto(avatarHost);
      } else if (window.Avatar && typeof window.Avatar.getSVG === "function") {
        avatarHost.innerHTML = window.Avatar.getSVG();
      } else {
        avatarHost.innerHTML = `
          <svg viewBox="0 0 120 160" style="width:100%;height:100%;filter:drop-shadow(0 10px 14px rgba(0,0,0,0.75));">
            <circle cx="60" cy="48" r="28" fill="#fcd34d" stroke="#1e293b" stroke-width="4"/>
            <path d="M 32,34 C 42,12 78,12 88,34 Z" fill="#b91c1c" stroke="#fde047" stroke-width="3"/>
            <circle cx="50" cy="48" r="5" fill="#0f172a"/><circle cx="70" cy="48" r="5" fill="#0f172a"/>
            <path d="M 50,60 Q 60,68 70,60" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>
            <rect x="38" y="78" width="44" height="46" rx="10" fill="#ec4899" stroke="#1e293b" stroke-width="4"/>
            <circle cx="60" cy="100" r="9" fill="#fef08a"/>
            <rect x="42" y="124" width="14" height="26" rx="4" fill="#1e293b"/>
            <rect x="64" y="124" width="14" height="26" rx="4" fill="#1e293b"/>
          </svg>
        `;
      }
    }

    // --- AVATAR MOVEMENT & JUMP CONTROLS ---
    let avatarX = 475;
    let isJumping = false;
    function updateAvatarTransform(jumpOffset = 0) {
      if (!avatarHost) return;
      avatarHost.style.left = avatarX + "px";
      avatarHost.style.transform = `translateY(${-jumpOffset}px)`;
    }

    const leftBtn = document.getElementById("cove-left-btn");
    const rightBtn = document.getElementById("cove-right-btn");
    const jumpBtn = document.getElementById("cove-jump-btn");

    if (leftBtn) {
      leftBtn.addEventListener("click", () => {
        avatarX = Math.max(60, avatarX - 55);
        updateAvatarTransform();
      });
    }
    if (rightBtn) {
      rightBtn.addEventListener("click", () => {
        avatarX = Math.min(1240, avatarX + 55);
        updateAvatarTransform();
      });
    }
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => {
        if (isJumping) return;
        isJumping = true;
        updateAvatarTransform(65);
        setTimeout(() => {
          updateAvatarTransform(0);
          isJumping = false;
        }, 360);
      });
    }

    // --- MATH ENGINE & SHINING GOLD BEAM CHEST CEREMONY ---
    const num1El = document.getElementById("math-num1");
    const num2El = document.getElementById("math-num2");
    const opEl = document.getElementById("math-op");
    const qMarkEl = document.getElementById("math-question-mark");
    const inputEl = document.getElementById("math-answer-input");
    const submitBtn = document.getElementById("math-submit-btn");
    const speechEl = document.getElementById("cove-speech-bubble");
    const statusEl = document.getElementById("cove-chest-status");
    const rootEl = document.getElementById("treasure-world-root");
    const beamEl = document.getElementById("cove-gold-beam-group");
    const captainEl = document.getElementById("pirate-teacher-svg");

    const PIRATE_CHEERS = [
      "SHIVER ME TIMBERS! Look at that Golden Beam erupt from the Sovereign Chest!",
      "BLIMEY! Bullseye calculation! The entire cave is glowing with doubloons!",
      "YO HO HO! Pure mathematical gold! Another chest unlatched, Captain!",
      "AVAST! Even Polly Cosine couldn't have solved that cipher faster!"
    ];

    function displayProblem() {
      if (!engine) return;
      const p = engine.getCurrentProblem();
      if (p && num1El && num2El && opEl) {
        num1El.textContent = p.num1;
        num2El.textContent = p.num2;
        opEl.textContent = p.operation;
      }
      if (qMarkEl) {
        qMarkEl.textContent = "??";
        qMarkEl.style.color = "#fde047";
      }
      if (inputEl) {
        inputEl.value = "";
        inputEl.focus();
      }
    }

    function spawnGoldChestFountain() {
      const host = document.getElementById("cove-coin-particles");
      if (!host) return;
      host.innerHTML = "";
      const colors = ["#fde047", "#fef08a", "#f59e0b", "#38bdf8", "#10b981"];
      for (let i = 0; i < 42; i++) {
        const coin = document.createElement("div");
        const c = colors[i % colors.length];
        const tx = (Math.random() - 0.5) * 580 + "px";
        const ty = -(120 + Math.random() * 340) + "px";
        const rot = (Math.random() * 720 - 360) + "deg";
        const sz = 14 + Math.random() * 14;
        coin.style.cssText = `
          position:absolute;left:735px;top:465px;width:${sz}px;height:${sz}px;border-radius:50%;
          background:radial-gradient(circle at 30% 30%,#ffffff,${c});
          border:2px solid #78350f;box-shadow:0 0 14px ${c};
          --tx:${tx};--ty:${ty};--rot:${rot};
          animation:coveCoinArc ${1.1 + Math.random() * 0.55}s cubic-bezier(0.16,1,0.3,1) forwards;
        `;
        host.appendChild(coin);
      }
    }

    function handleAnswerSubmit() {
      if (!engine || !inputEl) return;
      const val = inputEl.value.trim();
      if (!val) return;

      const res = engine.submitAnswer(val);
      if (res && res.ignored) return;

      if (res && res.success) {
        // 1. Show solved number on the Glistening Rock
        if (qMarkEl) {
          qMarkEl.textContent = val;
          qMarkEl.style.color = "#4ade80";
        }

        // 2. Open Center Chest & Fire Heaven-Piercing Gold Beam!
        if (rootEl) rootEl.classList.add("chest-is-open");
        if (beamEl) {
          beamEl.classList.remove("beam-active");
          void beamEl.offsetWidth;
          beamEl.classList.add("beam-active");
        }
        spawnGoldChestFountain();

        // 3. Pirate Captain Cheers
        if (captainEl) {
          captainEl.classList.remove("pirate-cheer");
          void captainEl.offsetWidth;
          captainEl.classList.add("pirate-cheer");
        }
        if (speechEl) {
          speechEl.textContent = `"${
            PIRATE_CHEERS[Math.floor(Math.random() * PIRATE_CHEERS.length)]
          }"`;
          speechEl.style.borderColor = "#4ade80";
        }
        if (statusEl) {
          statusEl.textContent = "✨ CHEST UNLOCKED! +GOLD!";
          statusEl.style.color = "#4ade80";
        }

        setTimeout(() => {
          if (rootEl) rootEl.classList.remove("chest-is-open");
          if (statusEl) {
            statusEl.textContent = "HOARD BEAM: ARMED";
            statusEl.style.color = "#fde047";
          }
          if (speechEl) speechEl.style.borderColor = "#fde047";
          displayProblem();
        }, 1650);
      } else {
        // Incorrect Answer Feedback
        if (speechEl) {
          speechEl.textContent =
            '"Arrgh! The chest lock jammed on that number! Check the Glistening Rock and try again!"';
          speechEl.style.borderColor = "#ef4444";
        }
        if (statusEl) {
          statusEl.textContent = "⚠️ CIPHER MISMATCH!";
          statusEl.style.color = "#ef4444";
        }
        inputEl.style.borderColor = "#ef4444";
        setTimeout(() => {
          inputEl.style.borderColor = "#f59e0b";
          inputEl.value = "";
          inputEl.focus();
          if (statusEl) {
            statusEl.textContent = "HOARD BEAM: ARMED";
            statusEl.style.color = "#fde047";
          }
        }, 700);
      }
    }

    if (submitBtn) submitBtn.addEventListener("click", handleAnswerSubmit);
    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleAnswerSubmit();
      });
    }

    displayProblem();
  }

  // Expose globally and as standard zone module exports
  window.TreasureCove = {
    render: renderTreasureCove,
    mount: () => renderTreasureCove(document.getElementById("game-container"))
  };
})();

export default function mount(container) {
  if (window.TreasureCove) window.TreasureCove.render(container);
}
