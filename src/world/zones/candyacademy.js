import { getCurrentProblem, submitAnswer } from "../../math/mathEngine.js";

export function loadCandyAcademy() {
  const zoneLayer = document.getElementById("game-container");
  if (!zoneLayer) return;

  let styleEl = document.getElementById("candyacademy-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "candyacademy-styles";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    @keyframes driftSprinklesSlow {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes bobCandyMoon {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(8deg); }
    }
    @keyframes shootCandyComet1 {
      0% { transform: translate(-140px, -20px) rotate(20deg); opacity: 0; }
      10% { opacity: 1; }
      40% { transform: translate(760px, 310px) rotate(20deg); opacity: 0; }
      100% { transform: translate(760px, 310px) rotate(20deg); opacity: 0; }
    }
    @keyframes shootCandyComet2 {
      0% { transform: translate(-150px, 40px) rotate(15deg); opacity: 0; }
      12% { opacity: 1; }
      44% { transform: translate(790px, 250px) rotate(15deg); opacity: 0; }
      100% { transform: translate(790px, 250px) rotate(15deg); opacity: 0; }
    }
    @keyframes fizzStream {
      0% { transform: scaleY(0.9) scaleX(0.92); opacity: 0.85; }
      50% { transform: scaleY(1.25) scaleX(1.1); opacity: 1; }
      100% { transform: scaleY(0.95) scaleX(0.95); opacity: 0.8; }
    }
    @keyframes bubbleRise {
      0% { opacity: 0.95; transform: translateY(0px) scale(0.85); }
      100% { opacity: 0; transform: translateY(36px) scale(1.35); }
    }
    .candy-fizz-core { transform-origin: top center; animation: fizzStream 0.14s infinite alternate; }
    .candy-bubble-ring { transform-origin: top center; animation: bubbleRise 0.45s infinite linear; }
    @keyframes hoverSugarBot {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-7px) rotate(-1.5deg); }
    }
    @keyframes sodaLaunch {
      0% { transform: translateY(0); }
      45% { transform: translateY(-700px); opacity: 0; }
      50% { transform: translateY(700px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .soda-launching {
      animation: sodaLaunch 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
  `;

  zoneLayer.innerHTML = [
    '<div style="width: 100%; height: 100%; background: #2e1026; display: grid; grid-template-columns: 4fr 5fr; gap: 20px; padding: 20px; box-sizing: border-box; font-family: \'Segoe UI\', sans-serif;">',

      // LEFT: COTTON CANDY SKY & LOLLIPOP OBSERVATION WINDOW
      '<div style="position: relative; border-radius: 20px; overflow: hidden; border: 4px solid #f472b6; box-shadow: inset 0 0 40px rgba(0,0,0,0.85);">',
        '<div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(ellipse at 35% 25%, #501842 0%, #2a0a24 65%, #160413 100%);"></div>',

        // Pink & Mint Cotton Candy Nebula Clouds
        '<div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at 70% 30%, rgba(244, 114, 182, 0.32) 0%, transparent 55%), radial-gradient(circle at 25% 70%, rgba(52, 211, 153, 0.22) 0%, transparent 55%), radial-gradient(circle at 55% 50%, rgba(250, 204, 21, 0.16) 0%, transparent 60%); pointer-events: none;"></div>',

        // Drifting Rainbow Sugar Sprinkles Layer
        '<div style="position: absolute; width: 200%; height: 100%; background-image: radial-gradient(2.5px 2.5px at 28px 34px, #f472b6 100%, transparent), radial-gradient(2.5px 2.5px at 84px 96px, #fde047 100%, transparent), radial-gradient(2.5px 2.5px at 138px 48px, #34d399 100%, transparent), radial-gradient(2.5px 2.5px at 175px 140px, #60a5fa 100%, transparent), radial-gradient(2px 2px at 50px 160px, #ffffff 100%, transparent); background-size: 190px 180px; opacity: 0.85; animation: driftSprinklesSlow 24s linear infinite;"></div>',

        // Giant Swirly Peppermint Lollipop Planet in Top-Right
        '<div style="position: absolute; top: 10%; right: 12%; width: 86px; height: 86px; pointer-events: none; animation: bobCandyMoon 7s ease-in-out infinite;">',
          '<svg viewBox="0 0 120 120" style="width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 0 14px rgba(244, 114, 182, 0.45));">',
            '<circle cx="60" cy="60" r="34" fill="#fbcfe8" stroke="#f472b6" stroke-width="4" />',
            '<path d="M60 60 C60 42 78 42 78 60 C78 82 40 82 40 56 C40 30 88 30 88 60" fill="none" stroke="#ec4899" stroke-width="6" stroke-linecap="round" />',
            '<ellipse cx="60" cy="62" rx="54" ry="13" fill="none" stroke="rgba(253, 224, 71, 0.55)" stroke-width="4" stroke-dasharray="8 6" />',
          '</svg>',
        '</div>',

        // Rolling Cotton Candy Hills at Bottom of Window
        '<svg viewBox="0 0 400 120" preserveAspectRatio="none" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 34%; pointer-events: none;">',
          '<path d="M0 70 Q 90 20 190 65 T 400 50 L 400 120 L 0 120 Z" fill="#831843" opacity="0.85" />',
          '<path d="M0 85 Q 130 45 250 80 T 400 75 L 400 120 L 0 120 Z" fill="#be185d" opacity="0.9" />',
          // Lollipop Trees on Hills
          '<line x1="75" y1="68" x2="75" y2="36" stroke="#fef08a" stroke-width="3" />',
          '<circle cx="75" cy="32" r="12" fill="#34d399" stroke="#ffffff" stroke-width="2" />',
          '<line x1="295" y1="74" x2="295" y2="42" stroke="#fef08a" stroke-width="3" />',
          '<circle cx="295" cy="38" r="14" fill="#f472b6" stroke="#ffffff" stroke-width="2" />',
        '</svg>',

        // Shooting Sugar Star Comets
        '<div style="position: absolute; top: 18%; left: 0; width: 150px; height: 3px; background: linear-gradient(90deg, transparent 0%, rgba(244, 114, 182, 0.2) 35%, #fbcfe8 88%, #ffffff 100%); border-radius: 999px; filter: drop-shadow(0 0 6px #f472b6); animation: shootCandyComet1 5.5s ease-in infinite;"></div>',
        '<div style="position: absolute; top: 46%; left: 0; width: 165px; height: 3px; background: linear-gradient(90deg, transparent 0%, rgba(253, 224, 71, 0.2) 35%, #fef08a 88%, #ffffff 100%); border-radius: 999px; filter: drop-shadow(0 0 6px #fde047); animation: shootCandyComet2 6.8s ease-in 2s infinite;"></div>',

        // Candy Cane Frame Bevel
        '<div style="position: absolute; width: 100%; height: 100%; border: 18px solid #4a153b; box-sizing: border-box; box-shadow: inset 0 0 28px rgba(0,0,0,0.9); pointer-events: none;"></div>',
      '</div>',

      // RIGHT: CANDY CHALKBOARD & CONSOLE
      '<div style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">',

        // MAIN CANDY BOARD HUD
        '<div id="classroom-hud" style="flex-grow: 1; margin: 0 0 16px 0; border: 4px solid #f472b6; border-radius: 18px; background: rgba(36, 10, 30, 0.95); box-shadow: 0 0 25px rgba(244, 114, 182, 0.3), inset 0 0 20px rgba(0,0,0,0.7); display: grid; grid-template-columns: 2fr 1fr; align-items: center; position: relative; overflow: hidden; padding: 15px;">',
          '<div style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-image: linear-gradient(#4a153b 1.5px, transparent 1.5px), linear-gradient(90deg, #4a153b 1.5px, transparent 1.5px); background-size: 28px 28px; opacity: 0.55; pointer-events: none;"></div>',

          '<div id="equation-container" style="z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">',
            '<div style="display: flex; flex-direction: column; align-items: flex-end; font-family: monospace; font-size: 3.5rem; font-weight: bold; color: #fdf2f8; letter-spacing: 0.1em; line-height: 1.1; text-shadow: 0 0 15px rgba(244, 114, 182, 0.7);">',
              '<div id="math-num1">12</div>',
              '<div style="display: flex; align-items: center; gap: 15px;">',
                '<span id="math-op" style="color: #f472b6; font-size: 2.8rem;">+</span>',
                '<span id="math-num2">15</span>',
              '</div>',
              '<div style="width: 100%; height: 4px; background: #f472b6; margin: 8px 0; box-shadow: 0 0 10px #f472b6;"></div>',
              '<div style="color: #fde047; letter-spacing: 0.2em;">??</div>',
            '</div>',
          '</div>',

          // SODA-POP BOTTLE ROCKET LAUNCHER
          '<div style="z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 2px dashed #701a57; height: 85%; padding-left: 10px;">',
            '<svg id="rocket-svg" viewBox="0 0 200 320" style="width: 105px; filter: drop-shadow(0 0 10px rgba(244, 114, 182, 0.45));">',
              '<defs>',
                '<linearGradient id="sodaFizz" x1="0%" y1="0%" x2="0%" y2="100%">',
                  '<stop offset="0%" stop-color="#ffffff" />',
                  '<stop offset="30%" stop-color="#fbcfe8" />',
                  '<stop offset="70%" stop-color="#ec4899" />',
                  '<stop offset="100%" stop-color="#831843" stop-opacity="0" />',
                '</linearGradient>',
                '<linearGradient id="candyBottle" x1="0%" y1="0%" x2="100%" y2="0%">',
                  '<stop offset="0%" stop-color="#ec4899" />',
                  '<stop offset="40%" stop-color="#f9a8d4" />',
                  '<stop offset="100%" stop-color="#be185d" />',
                '</linearGradient>',
              '</defs>',
              // Mint Wrapper Cone Top
              '<path d="M100 18 C85 55 64 115 64 210 L136 210 C136 115 115 55 100 18 Z" fill="url(#candyBottle)" stroke="#fde047" stroke-width="2.5" />',
              '<path d="M100 18 C92 45 80 78 80 78 L120 78 C120 78 108 45 100 18 Z" fill="#34d399" />',
              // Candy Stripes
              '<rect x="65" y="135" width="70" height="14" rx="4" fill="#fde047" />',
              '<rect x="65" y="168" width="70" height="10" rx="4" fill="#34d399" />',
              // Peppermint Window
              '<circle cx="100" cy="108" r="18" fill="#ffffff" stroke="#ec4899" stroke-width="3" />',
              '<circle cx="100" cy="108" r="9" fill="#f472b6" />',
              // Wafer Fins
              '<path d="M64 170 L28 220 L64 212 Z" fill="#fde047" stroke="#f59e0b" stroke-width="1.5" />',
              '<path d="M136 170 L172 220 L136 212 Z" fill="#fde047" stroke="#f59e0b" stroke-width="1.5" />',
              // Nozzle & Fizz Thrust
              '<path d="M78 210 L68 230 L132 230 L122 210 Z" fill="#831843" stroke="#f472b6" stroke-width="2" />',
              '<path class="candy-fizz-core" d="M66 230 C66 270 90 310 100 320 C110 310 134 270 134 230 Z" fill="url(#sodaFizz)" />',
              '<circle class="candy-bubble-ring" cx="92" cy="250" r="6" fill="#ffffff" opacity="0.85" />',
              '<circle class="candy-bubble-ring" cx="110" cy="265" r="8" fill="#fde047" opacity="0.75" style="animation-delay: 0.2s;" />',
            '</svg>',
            '<span style="font-size: 0.75rem; color: #f9a8d4; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 6px;">Soda Fizz</span>',
          '</div>',
        '</div>',

        // BOTTOM CONSOLE + CHEF SUGARPLUM BOT + INPUT
        '<div style="height: 125px; border-radius: 16px; background: #3b0f31; border: 3px solid #f472b6; box-shadow: 0 6px 20px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; box-sizing: border-box; gap: 12px;">',
          '<div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-width: 140px;">',
            '<div style="display: flex; gap: 10px; align-items: center;">',
              '<div style="width: 14px; height: 14px; border-radius: 50%; background: #f472b6; box-shadow: 0 0 10px #f472b6;"></div>',
              '<span id="system-status-text" style="font-size: 0.75rem; color: #fbcfe8; letter-spacing: 0.08em; font-weight: 700;">MIXER: SWEET</span>',
            '</div>',
            '<div style="width: 100%; height: 6px; border-radius: 3px; background: #24061d; overflow: hidden;">',
              '<div style="width: 75%; height: 100%; background: linear-gradient(90deg, #f472b6, #fde047);"></div>',
            '</div>',
            '<div style="display: flex; gap: 8px;">',
              '<div style="width: 18px; height: 18px; border-radius: 50%; background: #f472b6;"></div>',
              '<div style="width: 18px; height: 18px; border-radius: 50%; background: #fde047;"></div>',
              '<div style="width: 18px; height: 18px; border-radius: 50%; background: #34d399;"></div>',
            '</div>',
          '</div>',

          // CHEF SUGARPLUM (CUPCAKE-CHEF ROBOT TEACHER)
          '<div style="display: flex; justify-content: center; align-items: center; animation: hoverSugarBot 3.4s ease-in-out infinite;">',
            '<svg style="width: 88px; height: 104px; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.55));" viewBox="0 0 120 135">',
              // Whipped Cream Chef Hat + Cherry on Top
              '<path d="M34 22 C30 8 50 4 60 10 C70 4 90 8 86 22 Z" fill="#ffffff" stroke="#f9a8d4" stroke-width="2" />',
              '<circle cx="60" cy="6" r="5" fill="#ef4444" />',
              // Head Chassis
              '<rect x="25" y="20" width="70" height="42" rx="16" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5" />',
              '<rect x="32" y="26" width="56" height="28" rx="10" fill="#2a0a24" />',
              // Happy Mint & Pink Eyes
              '<circle cx="45" cy="38" r="6" fill="#34d399" />',
              '<circle cx="43" cy="36" r="2" fill="#ffffff" />',
              '<circle cx="75" cy="38" r="6" fill="#34d399" />',
              '<circle cx="73" cy="36" r="2" fill="#ffffff" />',
              '<path d="M52 46 Q60 52 68 46" fill="none" stroke="#fde047" stroke-width="2.5" stroke-linecap="round" />',
              // Cupcake Torso
              '<path d="M30 66 L90 66 L80 106 L40 106 Z" fill="#f472b6" stroke="#9d174d" stroke-width="2.5" />',
              '<circle cx="60" cy="85" r="10" fill="#fde047" stroke="#ffffff" stroke-width="2" />',
              // Floating Lollipop Hands
              '<circle cx="15" cy="84" r="7" fill="#34d399" stroke="#ffffff" stroke-width="2" />',
              '<circle cx="105" cy="84" r="7" fill="#fde047" stroke="#ffffff" stroke-width="2" />',
              // Cotton Candy Hover Plume
              '<ellipse cx="60" cy="118" rx="15" ry="7" fill="#f9a8d4" opacity="0.85" />',
            '</svg>',
          '</div>',

          // ANSWER INPUT + SUBMIT BUTTON
          '<div style="display: flex; align-items: center; gap: 8px; position: relative; z-index: 5; pointer-events: auto;">',
            '<input id="math-answer-input" type="number" placeholder="?" style="pointer-events: auto; width: 70px; height: 50px; text-align: center; font-size: 1.8rem; font-weight: bold; color: #ffffff; background: #24061d; border: 2px solid #f472b6; border-radius: 10px; outline: none; box-shadow: 0 0 12px rgba(244,114,182,0.35);" />',
            '<button id="math-submit-btn" style="pointer-events: auto; height: 50px; padding: 0 16px; background: linear-gradient(135deg, #ec4899, #fde047); color: #24061d; font-weight: 900; font-size: 1rem; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(244,114,182,0.45); text-transform: uppercase; letter-spacing: 0.05em;">Fizz!</button>',
          '</div>',
        '</div>',
      '</div>',
    '</div>'
  ].join("");

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
  const rocket = document.getElementById("rocket-svg");
  const statusSpan = document.getElementById("system-status-text");

  if (!btn || !input) return;

  function setStatus(text) {
    if (statusSpan) statusSpan.textContent = text;
  }

  setStatus("MIXER: SWEET");

  function handleCheck() {
    const result = submitAnswer(input.value.trim());
    if (result.ignored) return;

    if (result.success) {
      if (rocket) {
        rocket.classList.remove("soda-launching");
        void rocket.offsetWidth;
        rocket.classList.add("soda-launching");
        setTimeout(() => {
          rocket.classList.remove("soda-launching");
        }, 1400);
      }

      setStatus("SUGAR RUSH!");
      input.style.borderColor = "#34d399";
      setTimeout(() => {
        input.style.borderColor = "#f472b6";
        input.value = "";
        setStatus("MIXER: SWEET");
        loadNewEquation();
      }, 900);
    } else {
      setStatus("SOUR MIX!");
      input.style.borderColor = "#ef4444";
      setTimeout(() => {
        input.style.borderColor = "#f472b6";
        input.value = "";
        setStatus("MIXER: SWEET");
      }, 900);
    }
  }

  btn.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });
}
