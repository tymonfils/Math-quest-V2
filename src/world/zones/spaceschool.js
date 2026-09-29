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
        
        <!-- ASTEROID 1 (Cyan Fast Skimmer with Multi-Light Particle Trail) -->
        <div style="position: absolute; width: 55px; height: 55px; left: 0%; top: 10%; animation: streakAsteroid1 20s linear infinite;">
          <!-- Main Ion Streaks -->
          <div style="position: absolute; width: 240px; height: 3px; right: 40px; top: 26px; background: linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.2) 30%, rgba(56, 189, 248, 0.9) 85%, #e0f2fe 100%); transform-origin: right center; transform: rotate(-25deg); filter: blur(0.5px); border-radius: 50%;"></div>
          <div style="position: absolute; width: 160px; height: 6px; right: 38px; top: 24px; background: linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.4) 50%, rgba(224, 242, 254, 0.85) 100%); transform-origin: right center; transform: rotate(-25deg); filter: blur(2px); border-radius: 50%;"></div>
          <!-- Multiple Trailing Light Orbs / Stardust -->
          <div style="position: absolute; width: 6px; height: 6px; right: 70px; top: 10px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8, 0 0 14px #e0f2fe; animation: flickerDust 0.3s infinite alternate;"></div>
          <div style="position: absolute; width: 4px; height: 4px; right: 120px; top: -10px; border-radius: 50%; background: #e0f2fe; box-shadow: 0 0 6px #38bdf8; animation: flickerDust 0.25s infinite alternate-reverse;"></div>
          <div style="position: absolute; width: 5px; height: 5px; right: 175px; top: -32px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8; animation: flickerDust 0.4s infinite alternate;"></div>
          <div style="position: absolute; width: 3px; height: 3px; right: 220px; top: -50px; border-radius: 50%; background: #93c5fd; box-shadow: 0 0 4px #93c5fd;"></div>
          
          <!-- Detailed SVG Rock -->
          <svg style="position: absolute; width: 100%; height: 100%; filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.35));" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="rock1-base" x1="20%" y1="20%" x2="90%" y2="90%">
                <stop offset="0%" stop-color="#94a3b8" />
                <stop offset="45%" stop-color="#475569" />
                <stop offset="85%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#0f172a" />
              </linearGradient>
            </defs>
            <path d="M25,18 L58,10 L84,24 L96,52 L78,86 L42,94 L14,76 L8,44 Z" fill="url(#rock1-base)" stroke="#334155" stroke-width="2" />
            <path d="M25,18 L48,38 L58,10 Z" fill="#cbd5e1" opacity="0.35" />
            <path d="M58,10 L48,38 L76,46 L84,24 Z" fill="#64748b" opacity="0.4" />
            <path d="M84,24 L76,46 L96,52 Z" fill="#334155" opacity="0.6" />
            <path d="M48,38 L34,70 L14,76 L8,44 Z" fill="#1e293b" opacity="0.5" />
            <path d="M48,38 L76,46 L62,78 L34,70 Z" fill="#475569" opacity="0.55" />
            <path d="M76,46 L96,52 L78,86 L62,78 Z" fill="#0f172a" opacity="0.7" />
            <ellipse cx="40" cy="52" rx="9" ry="7" fill="#0f172a" />
            <ellipse cx="39" cy="53" rx="8" ry="6" fill="#1e293b" />
            <path d="M32,54 A 8 6 0 0 0 46,55" fill="none" stroke="#64748b" stroke-width="1.5" opacity="0.7" />
            <ellipse cx="68" cy="32" rx="5" ry="4" fill="#0f172a" />
            <ellipse cx="67" cy="33" rx="4" ry="3" fill="#334155" />
            <path d="M25,18 L58,10 L84,24" fill="none" stroke="#e2e8f0" stroke-width="2" opacity="0.6" />
          </svg>
        </div>

        <!-- ASTEROID 2 (Magenta Heavy Drifter with Multi-Light Particle Trail) -->
        <div style="position: absolute; width: 75px; height: 75px; left: 90%; top: 70%; animation: streakAsteroid2 34s linear infinite;">
          <!-- Main Ion Streaks -->
          <div style="position: absolute; width: 280px; height: 4px; left: 55px; top: 36px; background: linear-gradient(270deg, transparent 0%, rgba(244, 114, 182, 0.2) 30%, rgba(244, 114, 182, 0.9) 85%, #fdf2f8 100%); transform-origin: left center; transform: rotate(18deg); filter: blur(0.5px); border-radius: 50%;"></div>
          <div style="position: absolute; width: 190px; height: 8px; left: 50px; top: 34px; background: linear-gradient(270deg, transparent 0%, rgba(244, 114, 182, 0.4) 50%, rgba(253, 242, 248, 0.8) 100%); transform-origin: left center; transform: rotate(18deg); filter: blur(2px); border-radius: 50%;"></div>
          <!-- Multiple Trailing Light Orbs / Stardust -->
          <div style="position: absolute; width: 7px; height: 7px; left: 100px; top: 52px; border-radius: 50%; background: #f472b6; box-shadow: 0 0 10px #f472b6, 0 0 16px #fdf2f8; animation: flickerDust 0.35s infinite alternate;"></div>
          <div style="position: absolute; width: 5px; height: 5px; left: 160px; top: 72px; border-radius: 50%; background: #fdf2f8; box-shadow: 0 0 8px #f472b6; animation: flickerDust 0.2s infinite alternate-reverse;"></div>
          <div style="position: absolute; width: 6px; height: 6px; left: 220px; top: 92px; border-radius: 50%; background: #f472b6; box-shadow: 0 0 9px #f472b6; animation: flickerDust 0.45s infinite alternate;"></div>
          <div style="position: absolute; width: 4px; height: 4px; left: 275px; top: 110px; border-radius: 50%; background: #fbcfe8; box-shadow: 0 0 5px #fbcfe8;"></div>
          
          <!-- Detailed SVG Rock -->
          <svg style="position: absolute; width: 100%; height: 100%; filter: drop-shadow(0 0 8px rgba(244, 114, 182, 0.25));" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="rock2-base" x1="15%" y1="15%" x2="85%" y2="85%">
                <stop offset="0%" stop-color="#64748b" />
                <stop offset="40%" stop-color="#334155" />
                <stop offset="85%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#020617" />
              </linearGradient>
            
            <path d="M30,12 L66,8 L92,30 L98,64 L74,90 L38,96 L12,80 L6,38 Z" fill="url(#rock2-base)" stroke="#1e293b" stroke-width="2.5" />
            <path d="M30,12 L54,34 L66,8 Z" fill="#94a3b8" opacity="0.35" />
            <path d="M66,8 L54,34 L82,42 L92,30 Z" fill="#475569" opacity="0.3" />
            <path d="M92,30 L82,42 L98,64 Z" fill="#0f172a" opacity="0.6" />
            <path d="M30,12 L18,52 L6,38 Z" fill="#334155" opacity="0.5" />
            <path d="M54,34 L46,74 L18,52 Z" fill="#1e293b" opacity="0.5" />
            <path d="M54,34 L82,42 L72,78 L46,74 Z" fill="#334155" opacity="0.45" />
            <path d="M82,42 L98,64 L74,90 L72,78 Z" fill="#020617" opacity="0.75" />
            <path d="M46,74 L72,78 L38,96 L12,80 Z" fill="#0f172a" opacity="0.65" />
            <ellipse cx="50" cy="52" rx="13" ry="10" fill="#020617" />
            <ellipse cx="49" cy="53" rx="11" ry="8" fill="#0f172a" />
            <path d="M39,56 A 11 8 0 0 0 60,57" fill="none" stroke="#475569" stroke-width="2" opacity="0.6" />
            <circle cx="28" cy="38" r="5" fill="#0f172a" />
            <circle cx="27" cy="39" r="4" fill="#1e293b" />
            <circle cx="76" cy="66" r="6" fill="#020617" />
            <path d="M30,12 L66,8 L92,30" fill="none" stroke="#cbd5e1" stroke-width="2" opacity="0.55" />
          </svg>
        </div>
        <!-- WINDOW BEVEL / FRAME -->
        <div style="position: absolute; width: 100%; height: 100%; border: 18px solid #1e293b; box-shadow: inset 0 0 25px rgba(0,0,0,0.95); pointer-events: none;"></div>
        
        <style>
          @keyframes scrollStars {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes streakAsteroid1 {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            4% { opacity: 1; }
            92% { opacity: 1; }
            100% { transform: translate(460%, 230%) rotate(220deg); opacity: 0; }
          }
          @keyframes streakAsteroid2 {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            4% { opacity: 1; }
            92% { opacity: 1; }
            100% { transform: translate(-440%, -190%) rotate(-200deg); opacity: 0; }
          }
          @keyframes flickerDust {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.3); }
          }
        </style>
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
              <div> 54</div>
              <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #38bdf8; font-size: 2.8rem;">-</span>
                <span>28</span>
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
