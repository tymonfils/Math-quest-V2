// src/world/zones/fairycastle.js - High-Detail Twilight Enchanted Fairy Castle Biome
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
    @keyframes faeFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(-2deg); }
    }
    @keyframes fairyWingsFlap {
      0%, 100% { transform: scaleX(1); }
      50% { transform: scaleX(0.25); }
    }
    @keyframes spellVortexSwirl {
      0% { transform: scale(0.2) rotate(0deg); opacity: 0; }
      20% { transform: scale(1.05) rotate(180deg); opacity: 1; }
      80% { transform: scale(1.25) rotate(540deg); opacity: 0.9; }
      100% { transform: scale(1.6) rotate(720deg); opacity: 0; }
    }
    @keyframes runeGlowPulse {
      0%, 100% { filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5)); }
      50% { filter: drop-shadow(0 0 24px rgba(244, 114, 182, 0.95)); }
    }
    @keyframes faeCelebrate {
      0% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-32px) rotate(-6deg) scale(1.06); }
      50% { transform: translateY(0) rotate(4deg) scale(0.96, 1.04); }
      75% { transform: translateY(-18px) rotate(-3deg) scale(1.03); }
      100% { transform: translateY(0) scale(1); }
    }
    @keyframes faeShakeNo {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    .fae-mascot-idle {
      transform-origin: center bottom;
      animation: faeFloat 3.6s ease-in-out infinite;
    }
    .fae-wings-anim {
      transform-origin: center center;
      animation: fairyWingsFlap 0.22s ease-in-out infinite;
    }
    .fae-mascot-party {
      transform-origin: center bottom;
      animation: faeCelebrate 0.85s ease-in-out 2 !important;
    }
    .fae-mascot-oops {
      transform-origin: center bottom;
      animation: faeShakeNo 0.55s ease-in-out 1 !important;
    }
    #spell-vortex-group {
      transform-origin: 720px 420px;
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
    }
    #spell-vortex-group.casting {
      animation: spellVortexSwirl 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .crystal-spire-glow {
      animation: runeGlowPulse 4s ease-in-out infinite;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="fairy-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(180deg, #1e1b4b 0%, #311042 28%, #581c87 55%, #7e22ce 80%, #a855f7 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. FULL-SCREEN TWILIGHT FAIRYLAND SVG LANDSCAPE -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <radialGradient id="fairySkyGlow" cx="50%" cy="30%" r="55%">
            <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.85" />
            <stop offset="35%" stop-color="#e879f9" stop-opacity="0.5" />
            <stop offset="70%" stop-color="#9333ea" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#311042" stop-opacity="0" />
          </radialGradient>

          <!-- Crystal Spire & Castle Gradients -->
          <linearGradient id="crystalSpireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf4ff" />
            <stop offset="30%" stop-color="#f472b6" />
            <stop offset="70%" stop-color="#c084fc" />
            <stop offset="100%" stop-color="#7e22ce" />
          </linearGradient>

          <!-- Mystical Hills & Forest Gradients -->
          <linearGradient id="farHillFairy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7e22ce" />
            <stop offset="100%" stop-color="#581c87" />
          </linearGradient>

          <linearGradient id="midHillFairy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#6b21a8" />
          </linearGradient>

          <linearGradient id="nearHillFairy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c084fc" />
            <stop offset="100%" stop-color="#4c1d95" />
          </linearGradient>

          <linearGradient id="magicStreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#67e8f9" />
            <stop offset="50%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#2563eb" />
          </linearGradient>
        </defs>

        <!-- Twilight Sky Glow & Fireflies -->
        <rect width="1440" height="900" fill="url(#fairySkyGlow)" />
        <circle cx="320" cy="180" r="3" fill="#fde047" opacity="0.8" />
        <circle cx="480" cy="240" r="4" fill="#fde047" opacity="0.9" />
        <circle cx="1120" cy="160" r="3.5" fill="#fde047" opacity="0.85" />
        <circle cx="1250" cy="280" r="3" fill="#fde047" opacity="0.75" />

        <!-- ========================================================================= -->
        <!-- DISTANT CRYSTAL SPIRE FAIRY CASTLE (BACKGROUND)                           -->
        <!-- ========================================================================= -->
        <g class="crystal-spire-glow" transform="translate(620, 195)">
          <!-- Central Crystal Spire Tower -->
          <polygon points="100,20 135,280 65,280" fill="url(#crystalSpireGrad)" stroke="#ffffff" stroke-width="2" />
          <polygon points="100,20 118,280 100,280" fill="#ffffff" opacity="0.4" />
          <!-- Left Spire Tower -->
          <polygon points="35,90 60,305 10,305" fill="url(#crystalSpireGrad)" stroke="#ffffff" stroke-width="1.5" />
          <!-- Right Spire Tower -->
          <polygon points="165,90 190,305 140,305" fill="url(#crystalSpireGrad)" stroke="#ffffff" stroke-width="1.5" />
          <!-- Castle Wall Connecting Bridge -->
          <rect x="25" y="215" width="150" height="90" rx="10" fill="#6b21a8" stroke="#f472b6" stroke-width="2.5" />
          <path d="M 90 305 Q 100 270 110 305 Z" fill="#311042" />
        </g>

        <!-- ========================================================================= -->
        <!-- SPELLCASTING STARDUST VORTEX (Triggers on Correct Answer!)               -->
        <!-- ========================================================================= -->
        <g id="spell-vortex-group">
          <!-- Swirling Magical Stardust Rings & Butterflies -->
          <circle cx="0" cy="0" r="160" fill="none" stroke="#fde047" stroke-width="6" stroke-dasharray="24 16" filter="drop-shadow(0 0 20px #e879f9)" />
          <circle cx="0" cy="0" r="115" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="16 12" />
          <path d="M -120 -120 Q 0 -220 120 -120 Q 220 0 120 120 Q 0 220 -120 120 Q -220 0 -120 -120 Z" fill="none" stroke="#f472b6" stroke-width="4" opacity="0.85" />
        </g>

        <!-- FAR HILLS & GLOWING MUSHROOMS -->
        <path d="M-80 500 Q 240 380 570 480 T 1180 450 T 1540 495 L 1540 900 L -80 900 Z" fill="url(#farHillFairy)" />

        <!-- MIDGROUND FAIRY MEADOW -->
        <path d="M-100 560 Q 320 480 720 560 T 1540 540 L 1540 900 L -100 900 Z" fill="url(#midHillFairy)" />

        <!-- WINDING MAGIC STREAM -->
        <path d="M 680 510 C 600 560, 820 620, 710 700 C 600 780, 880 850, 750 910 L 1020 910 C 1110 820, 850 750, 940 700 C 1020 650, 800 560, 750 510 Z" fill="url(#magicStreamGrad)" opacity="0.85" />

        <!-- FOREGROUND FAIRY BANK -->
        <path d="M-120 705 Q 260 635 620 725 T 1240 715 T 1560 685 L 1560 920 L -120 920 Z" fill="url(#nearHillFairy)" opacity="0.96" />
      </svg>

      <!-- DYNAMIC PARTICLE LAYER FOR MAGICAL STARDUST & SPARKS -->
      <div id="fairy-eruption-particles" style="position: absolute; inset: 0; pointer-events: none; z-index: 6; overflow: hidden;"></div>

      <!-- 2. PLANTED STAGE: ENCHANTED GRIMOIRE (SPELL BOOK) + FAE THE ARCH-FAIRY -->
      <div style="position: absolute; bottom: 185px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 32px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- THE OPEN ENCHANTED GRIMOIRE (SPELL BOOK CHALKBOARD) -->
        <div id="grimoire-board" style="position: relative; width: 415px; max-width: 58vw; min-height: 255px; background: linear-gradient(145deg, #fdf4ff 0%, #fce7f3 100%); border: 6px solid #a855f7; border-radius: 18px; box-shadow: 0 16px 32px rgba(49, 16, 66, 0.6), inset 0 0 25px rgba(236, 72, 153, 0.2); padding: 24px 30px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
          
          <!-- Center Book Spine Crease -->
          <div style="position: absolute; top: 12px; bottom: 12px; left: 50%; width: 4px; background: #c084fc; transform: translateX(-50%); border-radius: 999px;"></div>

          <!-- Top Gold Filigree Ribbon Tag -->
          <div style="position: absolute; top: -16px; background: linear-gradient(90deg, #c084fc, #e879f9, #c084fc); border: 3px solid #ffffff; color: #ffffff; font-weight: 900; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(168,85,247,0.45);">
            ✨ Enchanted Grimoire
          </div>

          <!-- GLOWING STARLIGHT INK EQUATION READOUT -->
          <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', sans-serif; font-size: 3.9rem; font-weight: 900; color: #581c87; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 2px 0 #fbcfe8, 0 4px 0 #f472b6, 0 0 16px rgba(168,85,247,0.35);">
              <div id="math-num1">16</div>
              <div style="display: flex; align-items: center; gap: 18px;">
                <span id="math-op" style="color: #db2777; font-size: 3.2rem; text-shadow: 0 2px 0 #fbcfe8;">+</span>
                <span id="math-num2">17</span>
              </div>
              <div style="width: 108%; height: 7px; background: #c084fc; border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 2.5px 0 #86198f;"></div>
              <div id="math-question-mark" style="color: #d946ef; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 2px 0 #fbcfe8;">??</div>
            </div>
          </div>
        </div>

        <!-- FAE THE ARCH-FAIRY TEACHER -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: -4px;">
          <!-- Speech Bubble -->
          <div id="fae-speech-bubble" style="background: #ffffff; color: #7e22ce; border: 3px solid #c084fc; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 4px; box-shadow: 0 5px 0 #9333ea, 0 8px 15px rgba(126,34,206,0.25); white-space: nowrap; transition: all 0.2s;">
            Cast the spell to awaken the crystal spire! 🧚‍♀️✨
          </div>

          <div style="position: relative; width: 190px; height: 235px; display: flex; justify-content: center; align-items: flex-end;">
            <div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 155px; height: 26px; background: radial-gradient(ellipse at center, rgba(126, 34, 206, 0.6) 0%, rgba(126, 34, 206, 0.22) 58%, transparent 80%); border-radius: 50%; z-index: 1;"></div>
            
            <div id="fae-mascot" class="fae-mascot-idle" style="position: relative; width: 185px; height: 220px; z-index: 2; filter: drop-shadow(0 10px 18px rgba(126, 34, 206, 0.45));">
              <svg viewBox="0 0 220 240" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <radialGradient id="faeBodyGrad" cx="38%" cy="32%" r="68%">
                    <stop offset="0%" stop-color="#fdf4ff" />
                    <stop offset="45%" stop-color="#f472b6" />
                    <stop offset="100%" stop-color="#9333ea" />
                  </radialGradient>
                </defs>

                <!-- Flapping Translucent Fairy Wings -->
                <g class="fae-wings-anim">
                  <path d="M 110 110 C 60 70, 10 90, 20 130 C 30 160, 70 150, 110 130 Z" fill="rgba(232, 121, 249, 0.65)" stroke="#ffffff" stroke-width="2.5" />
                  <path d="M 110 110 C 160 70, 210 90, 200 130 C 190 160, 150 150, 110 130 Z" fill="rgba(232, 121, 249, 0.65)" stroke="#ffffff" stroke-width="2.5" />
                </g>

                <!-- Petal Dress & Torso -->
                <path d="M 85 105 L 135 105 L 145 175 L 75 175 Z" fill="#ec4899" stroke="#7e22ce" stroke-width="2.5" />
                <path d="M 75 160 Q 110 185 145 160 L 130 178 L 90 178 Z" fill="#db2777" stroke="#7e22ce" stroke-width="2" />

                <!-- Head & Crown -->
                <circle cx="110" cy="72" r="32" fill="url(#faeBodyGrad)" stroke="#7e22ce" stroke-width="3" />
                <!-- Cute Face -->
                <circle cx="98" cy="70" r="4.5" fill="#311042" /><circle cx="96" cy="68" r="1.5" fill="#ffffff" />
                <circle cx="122" cy="70" r="4.5" fill="#311042" /><circle cx="120" cy="68" r="1.5" fill="#ffffff" />
                <path d="M 104 85 Q 110 91 116 85" fill="none" stroke="#7e22ce" stroke-width="2.5" stroke-linecap="round" />

                <!-- Star Wand in Hand -->
                <line x1="148" y1="130" x2="175" y2="85" stroke="#9333ea" stroke-width="3.5" stroke-linecap="round" />
                <polygon points="175,72 181,84 194,86 184,95 186,108 175,100 164,108 166,95 156,86 169,84" fill="#fde047" stroke="#ffffff" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. ALCHEMIST RUNE CONSOLE CONTROL DECK -->
      <div style="position: absolute; bottom: 88px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 12px 20px rgba(49, 16, 66, 0.6));">
        <div style="background: linear-gradient(135deg, #311042 0%, #1e1b4b 100%); border: 3px solid #c084fc; border-radius: 14px; padding: 10px 22px; display: flex; align-items: center; gap: 18px; box-shadow: inset 0 2px 5px rgba(255,255,255,0.15);">
          
          <div style="display: flex; flex-direction: column; min-width: 145px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #f472b6; letter-spacing: 0.14em; text-transform: uppercase;">SPELL CONSOLE</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #ffffff; letter-spacing: 0.06em;">STATUS: READY</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 82px; height: 52px; text-align: center; font-size: 1.9rem; font-weight: 900; color: #581c87; background: #fdf4ff; border: 3px solid #c084fc; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.18), 0 0 12px rgba(192,132,252,0.45);" />

          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #c084fc 0%, #9333ea 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #ffffff; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 0 4px 12px rgba(147,51,234,0.4);">
            Cast Spell
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

function triggerSpellVortex() {
  const vortex = document.getElementById("spell-vortex-group");
  const particleHost = document.getElementById("fairy-eruption-particles");

  if (vortex) {
    vortex.classList.remove("casting");
    void vortex.offsetWidth;
    vortex.classList.add("casting");
  }

  if (!particleHost) return;
  particleHost.innerHTML = "";

  const colors = ["#f472b6", "#c084fc", "#38bdf8", "#fde047", "#ffffff"];

  for (let i = 0; i < 34; i++) {
    const p = document.createElement("div");
    const color = colors[i % colors.length];
    const tx = (Math.random() - 0.5) * 520 + "px";
    const ty = -(140 + Math.random() * 340) + "px";
    const rot = (Math.random() * 540 - 270) + "deg";

    p.style.cssText = `
      position: absolute;
      left: 53%;
      top: 60%;
      width: ${12 + Math.random() * 14}px;
      height: ${12 + Math.random() * 14}px;
      border-radius: 50%;
      background: ${color};
      box-shadow: 0 0 12px ${color};
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
      triggerSpellVortex();

      if (fae) {
        fae.classList.remove("fae-mascot-party", "fae-mascot-oops");
        void fae.offsetWidth;
        fae.classList.add("fae-mascot-party");
      }
      if (speech) {
        speech.textContent = "SPELL SUCCESS! CASTLE AWAKENED! 🧚‍♀️✨";
        speech.style.borderColor = "#fde047";
      }

      setStatus("✨ SPELL CAST SUCCESS!!");
      input.style.borderColor = "#34d399";

      setTimeout(() => {
        input.style.borderColor = "#c084fc";
        input.value = "";
        setStatus("STATUS: READY");
        if (speech) {
          speech.textContent = "Wonderful! Cast another spell! 🪄";
          speech.style.borderColor = "#c084fc";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (fae) {
        fae.classList.remove("fae-mascot-party", "fae-mascot-oops");
        void fae.offsetWidth;
        fae.classList.add("fae-mascot-oops");
      }
      if (speech) {
        speech.textContent = "Spell fizzled! Try again! 💫";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("SPELL FIZZLE! TRY AGAIN");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#c084fc";
        input.value = "";
        setStatus("STATUS: READY");
        if (speech) {
          speech.textContent = "You got this, wizard! 🧚‍♀️";
          speech.style.borderColor = "#c084fc";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
