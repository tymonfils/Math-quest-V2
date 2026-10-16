// src/world/zones/dinolab.js - High-Detail Indoor Jurassic Genetics Lab Biome
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
      0% { transform: translateY(0) scale(0.7); opacity: 0.1; }
      40% { opacity: 0.9; }
      100% { transform: translateY(-130px) scale(1.4); opacity: 0; }
    }
    @keyframes tubeSurge {
      0%, 100% { filter: drop-shadow(0 0 18px rgba(34, 197, 94, 0.45)); }
      50% { filter: drop-shadow(0 0 38px rgba(74, 222, 128, 0.95)); }
    }
    @keyframes monitorFlicker {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 1; }
      52% { opacity: 0.5; }
      54% { opacity: 0.9; }
    }
    @keyframes dinoBreathe {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-3px) scaleY(1.02); }
    }
    @keyframes dinoCelebrate {
      0% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-24px) rotate(-6deg); }
      50% { transform: translateY(0) rotate(0deg); }
      75% { transform: translateY(-14px) rotate(4deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    @keyframes laserScanPulse {
      0% { opacity: 0; transform: scaleY(0); }
      20% { opacity: 1; transform: scaleY(1.1); }
      80% { opacity: 1; transform: scaleY(1); }
      100% { opacity: 0; transform: scaleY(0); }
    }
    .dino-mascot-idle {
      transform-origin: center bottom;
      animation: dinoBreathe 3.4s ease-in-out infinite;
    }
    .dino-mascot-party {
      transform-origin: center bottom;
      animation: dinoCelebrate 0.75s ease-in-out 2 !important;
    }
    .containment-cylinder {
      animation: tubeSurge 3.5s ease-in-out infinite;
    }
    .lab-monitor {
      animation: monitorFlicker 4s ease-in-out infinite;
    }
    #dna-laser-beam {
      transform-origin: 720px 200px;
      opacity: 0;
      pointer-events: none;
    }
    #dna-laser-beam.synthesizing {
      animation: laserScanPulse 1.4s ease-out forwards;
    }
  `;

  zoneLayer.innerHTML = `
    <div id="dino-world-root" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: radial-gradient(circle at 50% 25%, #0f172a 0%, #090d16 60%, #020408 100%); font-family: 'Nunito', 'Segoe UI', sans-serif; user-select: none;">

      <!-- 1. HIGH-DETAIL SVG LAB ENVIRONMENT -->
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <!-- Brushed Industrial Steel Panel Gradients -->
          <linearGradient id="wallPanelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="40%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>

          <linearGradient id="steelBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#64748b" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>

          <!-- Glowing Green DNA Bio-Fluid -->
          <linearGradient id="dnaFluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4ade80" stop-opacity="0.92" />
            <stop offset="45%" stop-color="#16a34a" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#064e3b" stop-opacity="0.95" />
          </linearGradient>

          <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="30%" stop-color="#4ade80" />
            <stop offset="100%" stop-color="#16a34a" stop-opacity="0" />
          </linearGradient>

          <!-- Glass Specular Reflection Highlight -->
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
            <stop offset="25%" stop-color="#ffffff" stop-opacity="0.05" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- Lab Wall Plates & Rivets -->
        <rect width="1440" height="900" fill="url(#wallPanelGrad)" />
        <rect x="0" y="520" width="1440" height="380" fill="#060913" />
        
        <!-- Floor Hazard Stripe Trench -->
        <rect x="0" y="514" width="1440" height="12" fill="#020617" />
        <line x1="0" y1="520" x2="1440" y2="520" stroke="#f59e0b" stroke-width="6" stroke-dasharray="35 25" />

        <!-- Wall Vertical Steel Support Pillars -->
        <rect x="360" y="0" width="30" height="520" fill="url(#steelBeam)" opacity="0.8" />
        <rect x="1050" y="0" width="30" height="520" fill="url(#steelBeam)" opacity="0.8" />

        <!-- Background Telemetry Monitoring Screens (DNA Helix Charts) -->
        <g class="lab-monitor" transform="translate(420, 95)">
          <rect x="0" y="0" width="200" height="140" rx="8" fill="#022c22" stroke="#059669" stroke-width="3" />
          <path d="M 20 100 Q 50 30 80 100 T 140 100 T 180 60" fill="none" stroke="#4ade80" stroke-width="3" />
          <path d="M 20 50 Q 60 110 100 50 T 180 90" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.8" />
          <text x="16" y="24" fill="#4ade80" font-family="monospace" font-size="11" font-weight="bold">SAMPLE #489-DNA</text>
        </g>

        <g class="lab-monitor" transform="translate(820, 95)">
          <rect x="0" y="0" width="200" height="140" rx="8" fill="#022c22" stroke="#059669" stroke-width="3" />
          <rect x="20" y="30" width="160" height="12" rx="3" fill="#064e3b" />
          <rect x="20" y="30" width="115" height="12" rx="3" fill="#22c55e" />
          <rect x="20" y="58" width="160" height="12" rx="3" fill="#064e3b" />
          <rect x="20" y="58" width="140" height="12" rx="3" fill="#38bdf8" />
          <text x="16" y="118" fill="#facc15" font-family="monospace" font-size="11" font-weight="bold">GENOME SYNTHESIS: 98%</text>
        </g>

        <!-- ======================================================= -->
        <!-- CONTAINMENT TUBE #1 (Left - Baby T-Rex Specimen)        -->
        <!-- ======================================================= -->
        <g class="containment-cylinder" transform="translate(140, 110)">
          <!-- Heavy Hydraulic Base & Top Collar Mounts -->
          <path d="M -15 390 L 155 390 L 140 430 L 0 430 Z" fill="#334155" stroke="#1e293b" stroke-width="3" />
          <rect x="25" y="410" width="90" height="10" rx="3" fill="#0f172a" />
          <path d="M 10 0 L 130 0 L 145 -30 L -5 -30 Z" fill="#334155" stroke="#1e293b" stroke-width="3" />
          
          <!-- Glass Cylinder Body -->
          <rect x="0" y="0" width="140" height="390" rx="70" fill="none" stroke="#64748b" stroke-width="9" />
          <rect x="7" y="22" width="126" height="360" rx="60" fill="url(#dnaFluidGrad)" />
          <rect x="12" y="22" width="28" height="360" fill="url(#glassReflection)" />

          <!-- Floating Detailed Baby T-Rex Specimen -->
          <g transform="translate(32, 130) scale(0.68)">
            <!-- Head & Sharp Teeth -->
            <path d="M 50 40 Q 30 20 60 10 Q 90 0 110 30 Q 120 50 110 70 Z" fill="#15803d" stroke="#14532d" stroke-width="2" />
            <circle cx="95" cy="22" r="6" fill="#facc15" />
            <circle cx="97" cy="22" r="2.5" fill="#0f172a" />
            <!-- Segmented Scaly Body & Tail -->
            <path d="M 45 65 Q 15 90 30 130 Q 50 170 90 170 Q 130 170 120 100 Q 110 60 70 60 Z" fill="#16a34a" stroke="#14532d" stroke-width="2.5" />
            <path d="M 30 130 Q 5 155 18 190 Q 25 180 35 150 Z" fill="#15803d" />
            <!-- Spine Scales -->
            <polygon points="65,58 72,48 78,58" fill="#4ade80" />
            <polygon points="82,65 90,54 96,65" fill="#4ade80" />
          </g>

          <!-- Rising Bio-Fluid Bubbles -->
          <circle cx="55" cy="280" r="7" fill="#ffffff" opacity="0.8" style="animation: tubeBubble1 2.2s infinite ease-in;" />
          <circle cx="90" cy="330" r="5" fill="#ffffff" opacity="0.7" style="animation: tubeBubble1 1.7s infinite ease-in 0.6s;" />
          <circle cx="70" cy="200" r="4" fill="#ffffff" opacity="0.75" style="animation: tubeBubble1 2.5s infinite ease-in 1.2s;" />
        </g>

        <!-- ======================================================= -->
        <!-- CONTAINMENT TUBE #2 (Right - Baby Raptor Specimen)      -->
        <!-- ======================================================= -->
        <g class="containment-cylinder" transform="translate(1160, 110)">
          <path d="M -15 390 L 155 390 L 140 430 L 0 430 Z" fill="#334155" stroke="#1e293b" stroke-width="3" />
          <rect x="25" y="410" width="90" height="10" rx="3" fill="#0f172a" />
          <path d="M 10 0 L 130 0 L 145 -30 L -5 -30 Z" fill="#334155" stroke="#1e293b" stroke-width="3" />
          
          <rect x="0" y="0" width="140" height="390" rx="70" fill="none" stroke="#64748b" stroke-width="9" />
          <rect x="7" y="22" width="126" height="360" rx="60" fill="url(#dnaFluidGrad)" />
          <rect x="12" y="22" width="28" height="360" fill="url(#glassReflection)" />

          <!-- Floating Detailed Baby Raptor Specimen -->
          <g transform="translate(30, 130) scale(0.65)">
            <path d="M 40 30 Q 70 10 100 30 Q 120 50 110 80 Q 90 120 70 140 Q 40 160 50 110 Z" fill="#065f46" stroke="#022c22" stroke-width="2" />
            <circle cx="85" cy="38" r="5" fill="#facc15" />
            <circle cx="87" cy="38" r="2" fill="#0f172a" />
            <!-- Long Balancer Tail -->
            <path d="M 70 140 Q 95 190 130 205 Q 110 180 80 145 Z" fill="#047857" />
          </g>

          <circle cx="75" cy="270" r="6" fill="#ffffff" opacity="0.75" style="animation: tubeBubble1 2.4s infinite ease-in 0.4s;" />
          <circle cx="45" cy="320" r="8" fill="#ffffff" opacity="0.85" style="animation: tubeBubble1 1.9s infinite ease-in 1s;" />
        </g>

        <!-- DNA Laser Synthesis Scan Beam (Fires on Correct Answer) -->
        <rect id="dna-laser-beam" x="710" y="50" width="20" height="450" fill="url(#laserBeamGrad)" />
      </svg>

      <!-- 2. MAIN LAB STAGE: INGen TERMINAL + TRICERATOPS ASSISTANT -->
      <div style="position: absolute; bottom: 185px; left: 48%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; gap: 38px; width: 94%; max-width: 940px; z-index: 5; pointer-events: none;">

        <!-- THE INGen COMPUTER TERMINAL CHALKBOARD -->
        <div id="lab-terminal-board" style="position: relative; width: 420px; max-width: 56vw; min-height: 265px; background: linear-gradient(145deg, #064e3b 0%, #022c22 65%, #011611 100%); border: 7px solid #059669; border-radius: 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(74, 222, 128, 0.28); padding: 26px 32px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2;">
          
          <!-- Rivet Bolt Corner Accents -->
          <div style="position: absolute; top: 10px; left: 10px; width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; box-shadow: inset 0 1px 2px #0f172a;"></div>
          <div style="position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; box-shadow: inset 0 1px 2px #0f172a;"></div>
          <div style="position: absolute; bottom: 10px; left: 10px; width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; box-shadow: inset 0 1px 2px #0f172a;"></div>
          <div style="position: absolute; bottom: 10px; right: 10px; width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; box-shadow: inset 0 1px 2px #0f172a;"></div>

          <div style="position: absolute; top: -16px; background: #090d16; border: 3px solid #22c55e; color: #4ade80; font-weight: 900; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(22,163,74,0.4);">
            🧬 InGen Genetics Terminal
          </div>

          <!-- CRISP DIGITAL EQUATION READOUT -->
          <div id="equation-container" style="position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 24px;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: 'Nunito', monospace; font-size: 4rem; font-weight: 900; color: #f0fdf4; letter-spacing: 0.06em; line-height: 1.04; text-shadow: 0 0 16px rgba(74, 222, 128, 0.85);">
              <div id="math-num1">14</div>
              <div style="display: flex; align-items: center; gap: 18px;">
                <span id="math-op" style="color: #4ade80; font-size: 3.2rem;">+</span>
                <span id="math-num2">18</span>
              </div>
              <div style="width: 108%; height: 7px; background: #22c55e; border-radius: 999px; margin: 7px -4% 6px 0; box-shadow: 0 0 10px #22c55e;"></div>
              <div id="math-question-mark" style="color: #facc15; letter-spacing: 0.16em; font-size: 3.1rem; text-shadow: 0 0 12px rgba(250, 204, 21, 0.75);">??</div>
            </div>
          </div>
        </div>

        <!-- TRICERATOPS LAB ASSISTANT ("DR. HORNS") -->
        <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
          <div id="dino-speech-bubble" style="background: #022c22; color: #4ade80; border: 3px solid #22c55e; border-radius: 16px; padding: 6px 14px; font-size: 0.85rem; font-weight: 900; margin-bottom: 6px; box-shadow: 0 5px 0 #15803d, 0 8px 16px rgba(0,0,0,0.4); white-space: nowrap; transition: all 0.2s;">
            Synthesize DNA to power the lab! 🧬
          </div>

          <div id="dino-mascot" class="dino-mascot-idle" style="width: 205px; height: 220px; display: flex; justify-content: center; align-items: center; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.55));">
            <svg viewBox="0 0 220 220" style="width: 100%; height: 100%; overflow: visible;">
              <!-- Triceratops Body & Professional Lab Coat -->
              <ellipse cx="110" cy="145" rx="55" ry="42" fill="#15803d" stroke="#14532d" stroke-width="3" />
              <!-- White Lab Coat + Lapels & Buttons -->
              <path d="M 72 122 L 148 122 L 164 194 L 56 194 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.5" />
              <line x1="110" y1="122" x2="110" y2="194" stroke="#e2e8f0" stroke-width="2" />
              <circle cx="102" cy="150" r="3" fill="#64748b" />
              <circle cx="102" cy="172" r="3" fill="#64748b" />

              <!-- Professional Stethoscope around Neck -->
              <path d="M 90 122 Q 110 145 130 122" fill="none" stroke="#64748b" stroke-width="3.5" stroke-linecap="round" />
              <circle cx="110" cy="148" r="7" fill="#94a3b8" stroke="#475569" stroke-width="2" />

              <!-- Triceratops Head & Bony Frill Plate -->
              <path d="M 98 68 L 158 42 C 172 62 172 104 158 124 L 98 98 Z" fill="#22c55e" stroke="#14532d" stroke-width="3" />
              <!-- Frill Spots -->
              <circle cx="145" cy="65" r="4.5" fill="#15803d" />
              <circle cx="152" cy="88" r="4.5" fill="#15803d" />
              <circle cx="138" cy="104" r="4" fill="#15803d" />

              <circle cx="130" cy="92" r="32" fill="#22c55e" stroke="#14532d" stroke-width="3" />

              <!-- 3 Horns -->
              <polygon points="152,78 182,72 154,88" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
              <polygon points="135,60 144,30 144,60" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
              <polygon points="112,78 88,72 112,88" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />

              <!-- Scientific Safety Goggles with Glass Highlight -->
              <rect x="108" y="74" width="42" height="17" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <circle cx="120" cy="82.5" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
              <path d="M 117 80 A 3 3 0 0 1 123 80" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.8" />
              <circle cx="138" cy="82.5" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
              <path d="M 135 80 A 3 3 0 0 1 141 80" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.8" />

              <!-- Friendly Smile -->
              <path d="M 124 105 Q 131 113 138 105" fill="none" stroke="#14532d" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          </div>
        </div>

      </div>

      <!-- 3. HEAVY TITANIUM LAB CONSOLE DECK -->
      <div style="position: absolute; bottom: 88px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; z-index: 10; pointer-events: auto; filter: drop-shadow(0 14px 24px rgba(0,0,0,0.65));">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #090d16 100%); border: 3px solid #059669; border-radius: 16px; padding: 12px 26px; display: flex; align-items: center; gap: 20px; box-shadow: inset 0 2px 5px rgba(255,255,255,0.12);">
          
          <div style="display: flex; flex-direction: column; min-width: 145px;">
            <span style="font-size: 0.68rem; font-weight: 900; color: #4ade80; letter-spacing: 0.14em; text-transform: uppercase;">DNA SYNTHESIZER</span>
            <span id="system-status-text" style="font-size: 0.85rem; font-weight: 900; color: #ffffff; letter-spacing: 0.06em;">STATUS: READY</span>
          </div>

          <input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 84px; height: 52px; text-align: center; font-size: 1.9rem; font-weight: 900; color: #f0fdf4; background: #022c22; border: 3px solid #22c55e; border-radius: 12px; outline: none; box-shadow: inset 0 3px 6px rgba(0,0,0,0.6);" />

          <button id="math-submit-btn" style="pointer-events: auto; height: 52px; padding: 0 26px; background: linear-gradient(180deg, #22c55e 0%, #15803d 100%); color: #ffffff; font-weight: 900; font-size: 1.08rem; border: 2px solid #ffffff; border-radius: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 0 4px 12px rgba(34,197,94,0.4); transition: transform 0.1s;">
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
  const laser = document.getElementById("dna-laser-beam");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      if (laser) {
        laser.classList.remove("synthesizing");
        void laser.offsetWidth;
        laser.classList.add("synthesizing");
      }
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
          speech.textContent = "Brilliant work, assistant! 🧪";
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
          speech.textContent = "You got this, scientist! 🦖";
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
