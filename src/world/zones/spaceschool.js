import { generateProblem } from "../../math/mathEngine.js";
export function loadSpaceSchool() {
  const zoneLayer = document.getElementById('zone-layer');
  
  // Injecting the High-Fidelity 2.5D Space Classroom
  zoneLayer.innerHTML = `
    <!-- 1. MAIN CLASSROOM CONTAINER -->
    <div style="width: 100%; height: 100%; background: #0f172a; display: grid; grid-template-columns: 4fr 5fr; gap: 20px; padding: 20px; box-sizing: border-box; font-family: 'Segoe UI', sans-serif;">
      
      <!-- ============================================== -->
      <!-- 2. LEFT: OBSERVATION WINDOW -->
      <div style="position: relative; border-radius: 20px; overflow: hidden; border: 4px solid #334155; box-shadow: inset 0 0 30px rgba(0,0,0,0.95);">
        
        <!-- DEEP SPACE VOID -->
        <div style="position: absolute; width: 100%; height: 100%; background: #010409;"></div>
        
        <!-- MULTI-LAYER STAR FIELD -->
        <div style="position: absolute; width: 200%; height: 100%; 
                    background-image: 
                      radial-gradient(1.5px 1.5px at 25px 35px, #f8fafc 100%, transparent),
                      radial-gradient(1px 1px at 60px 80px, #38bdf8 100%, transparent),
                      radial-gradient(2px 2px at 110px 45px, #f472b6 80%, transparent),
                      radial-gradient(1.2px 1.2px at 140px 120px, #fde047 70%, transparent); 
                    background-size: 140px 140px; opacity: 0.85; animation: scrollStars 14s linear infinite;"></div>
        
        <!-- NEBULA BACKDROP -->
        <div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at 65% 35%, rgba(30, 58, 138, 0.45) 0%, transparent 65%); opacity: 0.6;"></div>
       <!-- SHOOTING STARS SYSTEM -->
        <div style="position: absolute; width: 120px; height: 2px; top: 12%; left: -100px; background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), #ffffff); transform: rotate(22deg); border-radius: 50%; filter: drop-shadow(0 0 4px #38bdf8); animation: shootStar1 4.5s ease-in infinite;"></div>
        <div style="position: absolute; width: 160px; height: 2px; top: 38%; left: -120px; background: linear-gradient(90deg, transparent, rgba(244, 114, 182, 0.4), #ffffff); transform: rotate(18deg); border-radius: 50%; filter: drop-shadow(0 0 5px #f472b6); animation: shootStar2 6s ease-in 1.5s infinite;"></div>
        <div style="position: absolute; width: 100px; height: 1.5px; top: 65%; left: -80px; background: linear-gradient(90deg, transparent, rgba(253, 224, 71, 0.4), #ffffff); transform: rotate(25deg); border-radius: 50%; filter: drop-shadow(0 0 4px #fde047); animation: shootStar3 3.8s ease-in 2.8s infinite;"></div>
        <div style="position: absolute; width: 140px; height: 2px; top: 82%; left: -110px; background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), #ffffff); transform: rotate(20deg); border-radius: 50%; filter: drop-shadow(0 0 4px #38bdf8); animation: shootStar4 5.2s ease-in 0.8s infinite;"></div>

        <style>
          @keyframes scrollStars {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes shootStar1 {
            0% { transform: translate(0, 0) rotate(22deg); opacity: 0; }
            15% { opacity: 1; }
            45% { transform: translate(650px, 260px) rotate(22deg); opacity: 0; }
            100% { transform: translate(650px, 260px) rotate(22deg); opacity: 0; }
          }
          @keyframes shootStar2 {
            0% { transform: translate(0, 0) rotate(18deg); opacity: 0; }
            15% { opacity: 1; }
            45% { transform: translate(650px, 210px) rotate(18deg); opacity: 0; }
            100% { transform: translate(650px, 210px) rotate(18deg); opacity: 0; }
          }
          @keyframes shootStar3 {
            0% { transform: translate(0, 0) rotate(25deg); opacity: 0; }
            15% { opacity: 1; }
            40% { transform: translate(650px, 300px) rotate(25deg); opacity: 0; }
            100% { transform: translate(650px, 300px) rotate(25deg); opacity: 0; }
          }
          @keyframes shootStar4 {
            0% { transform: translate(0, 0) rotate(20deg); opacity: 0; }
            15% { opacity: 1; }
            45% { transform: translate(650px, 240px) rotate(20deg); opacity: 0; }
            100% { transform: translate(650px, 240px) rotate(20deg); opacity: 0; }
          } 
      </style>

        <!-- WINDOW BEVEL / FRAME -->
        <div style="position: absolute; width: 100%; height: 100%; border: 18px solid #1e293b; box-shadow: inset 0 0 25px rgba(0,0,0,0.95); pointer-events: none;"></div>
      </div>
      <!-- ============================================== -->
      <!-- 3. RIGHT: BOARD & CONSOLE -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        
        <!-- 3A. MAIN WHITEBOARD HUD (Split: Equation Stage + Rocket Telemetry) -->
        <div id="classroom-hud" style="flex-grow: 1; margin: 0 0 16px 0; border: 4px solid #38bdf8; border-radius: 18px; background: rgba(15, 23, 42, 0.95); box-shadow: 0 0 25px rgba(56, 189, 248, 0.25), inset 0 0 20px rgba(0,0,0,0.7); display: grid; grid-template-columns: 2fr 1fr; align-items: center; position: relative; overflow: hidden; padding: 15px;">
          
          <!-- Blueprint Grid Background -->
          <div style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-image: linear-gradient(#1e293b 1.5px, transparent 1.5px), linear-gradient(90deg, #1e293b 1.5px, transparent 1.5px); background-size: 28px 28px; opacity: 0.5; pointer-events: none;"></div>
          
          <!-- EQUATION STAGE (Center-Left: Dedicated clean layout for arithmetic) -->
          <div id="equation-container" style="z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; font-family: monospace; font-size: 3.5rem; font-weight: bold; color: #f8fafc; letter-spacing: 0.1em; line-height: 1.1; text-shadow: 0 0 15px rgba(56, 189, 248, 0.6);">
              <div id="math-num1">54</div>
<div style="display: flex; align-items: center; gap: 15px;">
<span id="math-op" style="color: #38bdf8; font-size: 2.8rem;">-</span>
<span id="math-num2">28</span>
              </div>
              <div style="width: 100%; height: 4px; background: #38bdf8; margin: 8px 0; box-shadow: 0 0 10px #38bdf8;"></div>
              <div style="color: #38bdf8; letter-spacing: 0.2em;">??</div>
            </div>
          </div>

          <!-- HIGH-FIDELITY ROCKET TELEMETRY DOCK -->
          <div style="z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 2px dashed #334155; height: 85%; padding-left: 10px;">
            <svg viewBox="0 0 200 320" style="width: 105px; filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));">
              <defs>
                <!-- Plasma Core & Exhaust Shading -->
                <linearGradient id="plasmaCore" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="25%" stop-color="#7dd3fc" />
                  <stop offset="65%" stop-color="#0284c7" />
                  <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="hullMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#64748b" />
                  <stop offset="35%" stop-color="#cbd5e1" />
                  <stop offset="65%" stop-color="#94a3b8" />
                  <stop offset="100%" stop-color="#334155" />
                </linearGradient>
                <style>
                  @keyframes pulseFlameCore {
                    0% { transform: scaleY(0.95) scaleX(0.9); opacity: 0.85; filter: drop-shadow(0 0 6px #38bdf8); }
                    50% { transform: scaleY(1.3) scaleX(1.1); opacity: 1; filter: drop-shadow(0 0 18px #38bdf8); }
                    100% { transform: scaleY(0.9) scaleX(0.95); opacity: 0.8; filter: drop-shadow(0 0 10px #38bdf8); }
                  }
                  @keyframes pulseShockRings {
                    0% { opacity: 0.9; transform: translateY(0px) scale(0.9); }
                    100% { opacity: 0; transform: translateY(35px) scale(1.4); }
                  }
                  .vfx-core { transform-origin: top center; animation: pulseFlameCore 0.12s infinite alternate; }
                  .vfx-ring { transform-origin: top center; animation: pulseShockRings 0.4s infinite linear; }
                </style>
              </defs>
              
              <!-- ROCKET HULL & PANELS -->
              <!-- Main Fuselage -->
              <path d="M100 15 C85 60 60 120 60 210 L140 210 C140 120 115 60 100 15 Z" fill="url(#hullMetal)" stroke="#38bdf8" stroke-width="2" />
              <!-- Nosecone Cap -->
              <path d="M100 15 C92 45 80 80 80 80 L120 80 C120 80 108 45 100 15 Z" fill="#0284c7" opacity="0.8" />
              <!-- Center Spine & Seamlines -->
              <line x1="100" y1="80" x2="100" y2="210" stroke="#0f172a" stroke-width="2" opacity="0.5" />
              <line x1="75" y1="140" x2="125" y2="140" stroke="#0f172a" stroke-width="1.5" opacity="0.4" />
              <line x1="70" y1="180" x2="130" y2="180" stroke="#0f172a" stroke-width="1.5" opacity="0.4" />
              
              <!-- Porthole Window -->
              <circle cx="100" cy="115" r="20" fill="#0f172a" stroke="#38bdf8" stroke-width="3" />
              <circle cx="100" cy="115" r="14" fill="#0284c7" opacity="0.6" />
              <path d="M92 105 A 12 12 0 0 1 108 107" fill="none" stroke="#e0f2fe" stroke-width="2" opacity="0.8" />
              
              <!-- Aerodynamic Fins -->
              <path d="M60 170 L25 220 L60 215 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />
              <path d="M140 170 L175 220 L140 215 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />
              
              <!-- Engine Bell Nozzle -->
              <path d="M78 210 L68 230 L132 230 L122 210 Z" fill="#1e293b" stroke="#64748b" stroke-width="2" />
              
              <!-- HIGH-ENERGY PLASMA EXHAUST PLUME -->
              <!-- Outer Glow Plume -->
              <path class="vfx-core" d="M66 230 C66 270 90 310 100 320 C110 310 134 270 134 230 Z" fill="url(#plasmaCore)" opacity="0.8" />
              <!-- Inner Core Flame -->
              <path class="vfx-core" d="M78 230 C82 260 96 290 100 295 C104 290 118 260 122 230 Z" fill="#ffffff" opacity="0.9" />
              <!-- Plasma Shock Diamonds / Expansion Rings -->
              <ellipse class="vfx-ring" cx="100" cy="245" rx="16" ry="4" fill="none" stroke="#e0f2fe" stroke-width="2" />
              <ellipse class="vfx-ring" cx="100" cy="265" rx="22" ry="5" fill="none" stroke="#38bdf8" stroke-width="1.5" style="animation-delay: 0.2s;" />
            </svg>
            <span style="font-size: 0.75rem; color: #64748b; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 6px;">Propulsion</span>
          </div>
        </div>
        <!-- 3B. CONSOLE INTERFACE + ROBOT -->
        <div style="height: 125px; border-radius: 16px; background: #1e293b; border: 3px solid #475569; box-shadow: 0 6px 20px rgba(0,0,0,0.6); display: grid; grid-template-columns: 2fr 1fr; padding: 12px; box-sizing: border-box; gap: 10px;">
          
          <!-- Console Readouts -->
          <div style="display: flex; flex-direction: column; justify-content: space-around;">
            <div style="display: flex; gap: 10px; align-items: center;">
              <div style="width: 14px; height: 14px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 10px #38bdf8;"></div>
              <span style="font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.1em;">SYSTEM: READY</span>
            </div>
            <div style="width: 100%; height: 6px; border-radius: 3px; background: #334155; overflow: hidden;">
              <div style="width: 65%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8);"></div>
            </div>
            <div style="display: flex; gap: 8px;">
              <div style="width: 18px; height: 18px; border-radius: 4px; background: #f472b6; opacity: 0.75;"></div>
              <div style="width: 18px; height: 18px; border-radius: 4px; background: #38bdf8; opacity: 0.75;"></div>
              <div style="width: 18px; height: 18px; border-radius: 4px; background: #10b981; opacity: 0.75;"></div>
            </div>
          </div>

          <!-- FLOATING ROBOT INSTRUCTOR -->
          <div style="display: flex; justify-content: center; align-items: center; animation: hoverTeacher 4s ease-in-out infinite;">
            <svg style="width: 75px; height: 95px;" viewBox="0 0 100 120">
              <rect x="25" y="10" width="50" height="40" rx="10" fill="#e2e8f0" stroke="#334155" stroke-width="3" />
              <rect x="35" y="22" width="12" height="15" rx="3" fill="#0f172a" />
              <rect x="53" y="22" width="12" height="15" rx="3" fill="#0f172a" />
              <rect x="38" y="25" width="6" height="9" rx="2" fill="#38bdf8" />
              <rect x="56" y="25" width="6" height="9" rx="2" fill="#38bdf8" />
              <path d="M20,60 L80,60 L70,100 L30,100 Z" fill="#cbd5e1" stroke="#334155" stroke-width="3" />
              <circle cx="50" cy="110" r="10" fill="#38bdf8" opacity="0.8" style="animation: flickerRepulsor 0.2s infinite alternate;" />
              <circle cx="50" cy="110" r="5" fill="#e0f2fe" />
            </svg>
          </div>
        </div>
<style>
          @keyframes hoverTeacher {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-7px); }
          }
          @keyframes flickerRepulsor {
            0% { opacity: 0.7; filter: blur(2px); }
            100% { opacity: 1; filter: blur(4px); }
          }
        </style>
      </div>
    </div>
  `;
}
let currentProblem = null;

export function loadNewEquation() {
  currentProblem = generateProblem();
  const elNum1 = document.getElementById("math-num1");
  const elNum2 = document.getElementById("math-num2");
  const elOp = document.getElementById("math-op");

  if (elNum1 && elNum2 && elOp) {
    elNum1.textContent = currentProblem.num1;
    elNum2.textContent = currentProblem.num2;
    elOp.textContent = currentProblem.operation;
  }
}
