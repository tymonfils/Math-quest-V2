// src/world/zones/dinolab.js - Indoor Jurassic Genetics Lab Biome
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
    @keyframes tubeBubble1 {
      0% { transform: translateY(0) scale(0.8); opacity: 0.2; }
      50% { opacity: 0.8; }
      100% { transform: translateY(-110px) scale(1.3); opacity: 0; }
    }
    @keyframes tubePulse {
      0%, 100% { filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.4)); }
      50% { filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.85)); }
    }
    @keyframes dinoBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-3px) scaleY(1.02); }
    }
    @keyframes dinoCelebrate {
      0% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-22px) rotate(-6deg); }
      50% { transform: translateY(0) rotate(0deg); }
      75% { transform: translateY(-12px) rotate(4deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    @keyframes successFlash {
      0% { background: rgba(34, 197, 94, 0.6); }
      100% { background: rgba(15, 23, 42, 0.95); }
    }
    .dino-mascot-idle {
      transform-origin: center bottom;
      animation: dinoBreathe 3.4s ease-in-out infinite;
    }
    .dino-mascot-party {
      transform-origin: center bottom;
      animation: dinoCelebrate 0.75s ease-in-out 2 !important;
    }
    .containment-tube {
      animation: tubePulse 3s ease-in-out infinite;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="dino-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: radial-gradient(circle at 50% 30%, #1e293b 0%, #0f172a 60%, #020617 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. BACKGROUND INDOOR LAB & CONTAINMENT TUBES -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <linearGradient id="metalPanel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <linearGradient id="tubeLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(74, 222, 128, 0.85)" />
            <stop offset="50%" stop-color="rgba(22, 163, 74, 0.65)" />
            <stop offset="100%" stop-color="rgba(20, 83, 45, 0.9)" />
          </linearGradient>

          <radialGradient id="screenGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#065f46" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#022c22" stop-opacity="0.95" />
          </radialGradient>
        </defs>

        <!-- Lab Wall Panels & Hazard Lines -->
        <rect width="1440" height="900" fill="url(#metalPanel)" />
        <line x1="0" y1="530" x2="1440" y2="530" stroke="#0f172a" stroke-width="8" />
        <rect x="0" y="522" width="1440" height="12" fill="#eab308" opacity="0.85" />

        <!-- ======================================================= -->
        <!-- CONTAINMENT TUBE #1 (Left Background - Baby T-Rex)       -->
        <!-- ======================================================= -->
        <g class="containment-tube" transform="translate(180, 160)">
          <!-- Glass Cylinder & Metal Base/Top -->
          <rect x="0" y="0" width="130" height="370" rx="65" fill="none" stroke="#64748b" stroke-width="8" />
          <path d="M -15 370 L 145 370 L 130 400 L 0 400 Z" fill="#475569" stroke="#334155" stroke-width="3" />
          <path d="M 15 0 L 115 0 L 130 -25 L 0 -25 Z" fill="#475569" stroke="#334155" stroke-width="3" />
          <!-- Glowing Green DNA Fluid -->
          <rect x="6" y="20" width="118" height="345" rx="55" fill="url(#tubeLiquid)" />
          <!-- Floating Baby T-Rex Silhouette Inside Tube -->
          <g transform="translate(35, 120) scale(0.65)">
            <path d="M 40 80 Q 20 60 40 30 Q 60 10 90 25 Q 110 40 120 70 Q 130 110 110 140 Q 90 170 60 170 Q 30 170 40 140 Z" fill="#14532d" opacity="0.85" />
            <circle cx="95" cy="35" r="5" fill="#fde047" />
          </g>
          <!-- Rising Bubbles -->
          <circle cx="50" cy="280" r="6" fill="#ffffff" opacity="0.75" style="animation: tubeBubble1 2.2s infinite ease-in;" />
          <circle cx="85" cy="320" r="4" fill="#ffffff" opacity="0.65" style="animation: tubeBubble1 1.8s infinite ease-in 0.7s;" />
        </g>

        <!-- ======================================================= -->
        <!-- CONTAINMENT TUBE #2 (Right Background - Baby Raptor)    -->
        <!-- ======================================================= -->
        <g class="containment-tube" transform="translate(1130, 160)">
          <rect x="0" y="0" width="130" height="370" rx="65" fill="none" stroke="#64748b" stroke-width="8" />
          <path d="M -15 370 L 145 370 L 130 400 L 0 400 Z" fill="#475569" stroke="#334155" stroke-width="3" />
          <path d="M 15 0 L 115 0 L 130 -25 L 0 -25 Z" fill="#475569" stroke="#334155" stroke-width="3" />
          <rect x="6" y="20" width="118" height="345" rx="55" fill="url(#tubeLiquid)" />
          <!-- Floating Baby Raptor Silhouette Inside Tube -->
          <g transform="translate(30, 130) scale(0.6)">
            <path d="M 30 70 Q 50 30 90 40 Q 120 50 110 90 Q 90 140 60 150 Q 30 140 30 100 Z" fill="#065f46" opacity="0.85" />
            <circle cx="80" cy="48" r="4.5" fill="#fde047" />
          </g>
          <!-- Rising Bubbles -->
          <circle cx="70" cy="260" r="5" fill="#ffffff" opacity="0.7" style="animation: tubeBubble1 2.5s infinite ease-in 0.3s;" />
          <circle cx="45" cy="310" r="7" fill="#ffffff" opacity="0.8" style="animation: tubeBubble1 1.9s infinite ease-in 1.1s;" />
        </g>
      </svg>

      <!-- 2. MAIN LAB STAGE: INGEN COMPUTER TERMINAL + TRICERATOPS ASSISTANT -->
      <div style="position: absolute; bottom: 185px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 36px; width: 94%; max-width: 920px; z-index: 5; pointer-events: none;">

        <!-- THE INGEN COMPUTER TERMINAL CHALKBOARD -->
        <div id="lab-terminal-board" style="position: relative; width: 410px; max-width: 56vw; min-height: 255px; background: linear-gradient(145deg, #064e3b 0%, #022c22 100%); border: 6px solid #059669; border-radius: 18px; box-shadow: 0 16px 32px rgba(0, 0, 0, 0.65), inset 0 0 25px rgba(34, 197, 94, 0.25); padding: 26px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
          
          <div style="position: absolute; top: -15px; background: #0f172a; border: 3px solid #22c55e; color: #4ade80; font-weight: 900; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 18px; border-radius: 999px; box-shadow: 0 4px 0 #15803d;">
            🧬 InGen Genetics Terminal
          </div>

          <!-- CRISP DIGITAL EQUATION READOUT -->
          <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', monospace; font-size: 3.9rem; font-weight: 900; color: #f0fdf4; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 0 12px rgba(74, 222, 128, 0.75);">
              <div id="math-num1">14</div>
              <div style="display: flex; align-items: center; gap: 18px;">
                <span id="math-op" style="color: #4ade80; font-size: 3.2rem;">+</span>
                <span id="math-num2">18</span>
              </div>
              <div style="width: 108%; height: 7px; background: #22c55e; border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 0 8px #22c55e;"></div>
              <div id="math-question-mark" style="color: #facc15; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 0 10px rgba(250, 204, 21, 0.7);">??</div>
            </div>
          </div>
        </div>

        <!-- TRICERATOPS LAB ASSISTANT WITH SCIENTIST GOGGLES & LAB COAT -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
          <div id="dino-speech-bubble" style="background: #022c22; color: #4ade80; border: 3px solid #22c55e; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 5px 0 #15803d; white-space: nowrap;">
            Synthesize DNA to power the lab! 🧬
          </div>

          <div id="dino-mascot" class="dino-mascot-idle" style="width: 195px; height: 215px; display: flex; justify-content: center; align-items: center; filter: drop-shadow(0 10px 16px rgba(0,0,0,0.5));">
            <svg viewBox="0 0 220 220" style="width: 100%; height: 100%; overflow: visible;">
              <!-- Triceratops Body & Lab Coat -->
              <ellipse cx="110" cy="145" rx="55" ry="42" fill="#15803d" stroke="#14532d" stroke-width="3" />
              <!-- White Lab Coat Over Body -->
              <path d="M 75 125 L 145 125 L 160 190 L 60 190 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.5" />
              <line x1="110" y1="125" x2="110" y2="190" stroke="#cbd5e1" stroke-width="2" />

              <!-- Triceratops Head & Bony Frill -->
              <path d="M 100 70 L 155 45 C 170 65 170 105 155 125 L 100 100 Z" fill="#22c55e" stroke="#14532d" stroke-width="3" />
              <circle cx="130" cy="92" r="32" fill="#22c55e" stroke="#14532d" stroke-width="3" />

              <!-- 3 Horns -->
              <polygon points="152,78 178,72 154,86" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
              <polygon points="135,62 142,35 142,62" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
              <polygon points="112,78 92,72 112,86" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />

              <!-- Scientist Goggles on Head -->
              <rect x="110" y="76" width="38" height="15" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <circle cx="121" cy="83.5" r="5.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
              <circle cx="137" cy="83.5" r="5.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />

              <!-- Smile -->
              <path d="M 124 105 Q 131 112 138 105" fill="none" stroke="#14532d" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          </div>
        </div>

      </div>

      <!-- 3. LAB CONTROL DECK CONSOLE -->
      <div style="position: absolute; bottom: 88px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.6));">
        <div style="background: #0f172a; border: 3px solid #059669; border-radius: 14px; padding: 10px 24px; display: flex; align-items: center; gap: 18px;">
          <div style="display: flex; flex-direction: column; min-width: 145px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #4ade80; letter-spacing: 0.14em; text-transform: uppercase;">DNA SYNTHESIZER</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #ffffff; letter-spacing: 0.06em;">STATUS: READY</span>
          </div>
          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 82px; height: 52px; text-align: center; font-size: 1.9rem; font-weight: 900; color: #f0fdf4; background: #022c22; border: 3px solid #22c55e; border-radius: 12px; outline: none; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);" />
          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 24px; background: linear-gradient(180deg, #22c55e 0%, #15803d 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #ffffff; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em;">
            Synthesize
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

function setupMathControls() {
  const btn = document.getElementById("math-submit-btn");
  const input = document.getElementById("math-answer-input");
  const statusSpan = document.getElementById("system-status-text");
  const dino = document.getElementById("dino-mascot");
  const speech = document.getElementById("dino-speech-bubble");
  const terminal = document.getElementById("lab-terminal-board");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      if (dino) {
        dino.classList.remove("dino-mascot-party");
        void dino.offsetWidth;
        dino.classList.add("dino-mascot-party");
      }
      if (speech) {
        speech.textContent = "DNA SYNTHESIS SUCCESS! 🧬🦖";
        speech.style.borderColor = "#facc15";
      }

      setStatus("SYNTHESIS COMPLETE");
      input.style.borderColor = "#4ade80";

      setTimeout(() => {
        input.style.borderColor = "#22c55e";
        input.value = "";
        setStatus("STATUS: READY");
        if (speech) {
          speech.textContent = "Great job! Next sample! 🧪";
          speech.style.borderColor = "#22c55e";
        }
        loadNewEquation();
      }, 1500);
    } else {
      if (speech) {
        speech.textContent = "Mutation detected! Try again! ⚠️";
        speech.style.borderColor = "#ef4444";
      }

      setStatus("MUTATION ERROR");
      input.style.borderColor = "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "#22c55e";
        input.value = "";
        setStatus("STATUS: READY");
        if (speech) {
          speech.textContent = "You got this, assistant! 🦖";
          speech.style.borderColor = "#22c55e";
        }
      }, 950);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
