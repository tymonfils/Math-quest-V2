export function loadSpaceSchool() {
  const zoneLayer = document.getElementById('zone-layer');
  
  // Injecting the High-Fidelity 2.5D Space Classroom
  zoneLayer.innerHTML = `
    <!-- 1. THE MAIN CLASSROOM CONTAINER -->
    <div style="width: 100%; height: 100%; background: #0f172a; display: grid; grid-template-columns: 4fr 5fr; gap: 20px; padding: 20px; box-sizing: border-box; font-family: 'Segoe UI', sans-serif;">
      
      <!-- ============================================== -->
      <!-- 2. LEFT SIDE: PARALLAX OBSERVATION WINDOW -->
      <div style="position: relative; border-radius: 20px; overflow: hidden; border: 4px solid #334155; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
        
        <!-- LAYER 1: DEEP SPACE (Still) -->
        <div style="position: absolute; width: 100%; height: 100%; background: #010409;"></div>
        
        <!-- LAYER 2: MULTICOLOR STAR FIELD (Fast) -->
        <!-- Dense, colorful background using multiple gradients for detail -->
        <div style="position: absolute; width: 200%; height: 100%; 
                    background-image: 
                      radial-gradient(1.5px 1.5px at 20px 30px, #e2e8f0 100%, transparent),
                      radial-gradient(1px 1px at 50px 70px, #38bdf8 100%, transparent),
                      radial-gradient(2px 2px at 90px 40px, #f094e0 80%, transparent); 
                    background-size: 150px 150px; opacity: 0.8; animation: scrollStars 15s linear infinite;"></div>
        
        <!-- LAYER 3: DISTANT NEBULA CLOUD (Slow) -->
        <div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at 70% 30%, rgba(30, 58, 138, 0.4) 0%, transparent 60%); opacity: 0.5;"></div>
        
        <!-- LAYER 4: DRIFTING ASTEROIDS with trails -->
        <div style="position: absolute; width: 50px; height: 50px; left: 10%; top: 20%; animation: driftAsteroid1 30s linear infinite;">
          <!-- Trail SVG -->
          <svg style="position: absolute; top: -100px; left: -20px; width: 90px; height: 200px;" viewBox="0 0 100 200">
            <linearGradient id="trail1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0" />
              <stop offset="80%" stop-color="#38bdf8" stop-opacity="0.6" />
              <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0" />
            </linearGradient>
            <path d="M50 0 L 100 200 L 0 200 Z" fill="url(#trail1)" />
          </svg>
          <!-- Asteroid SVG -->
          <svg style="position: absolute; fill: #475569;" viewBox="0 0 100 100">
            <path d="M10,40 L30,10 L70,20 L90,50 L70,80 L30,90 Z" />
          </svg>
        </div>

        <div style="position: absolute; width: 80px; height: 80px; left: 60%; top: 60%; animation: driftAsteroid2 45s linear infinite;">
          <!-- Trail SVG -->
          <svg style="position: absolute; top: 0px; left: -150px; width: 200px; height: 100px;" viewBox="0 0 200 100">
             <linearGradient id="trail2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#f094e0" stop-opacity="0" />
              <stop offset="80%" stop-color="#f094e0" stop-opacity="0.5" />
              <stop offset="100%" stop-color="#f0f9ff" stop-opacity="0" />
            </linearGradient>
            <path d="M200 50 L 0 0 L 0 100 Z" fill="url(#trail2)" />
          </svg>
          <!-- Asteroid SVG -->
          <svg style="position: absolute; fill: #334155;" viewBox="0 0 100 100">
            <path d="M20,50 L40,20 L80,30 L95,60 L75,90 L35,85 Z" />
          </svg>
        </div>
        
        <!-- LAYER 5: THE WINDOW FRAME (Classroom Layer) -->
        <div style="position: absolute; width: 100%; height: 100%; border: 20px solid transparent; border-image: linear-gradient(to right, #64748b, #334155) 30; box-shadow: inset 0 0 30px rgba(0,0,0,1); pointer-events: none;"></div>
        
        <style>
          @keyframes scrollStars {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes driftAsteroid1 {
            0% { transform: translate(0, 0) rotate(0deg) scale(0.8); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translate(400%, 300%) rotate(360deg) scale(1); opacity: 0; }
          }
          @keyframes driftAsteroid2 {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(-400%, -150%) rotate(-180deg) scale(0.6); opacity: 0; }
          }
        </style>
      </div>
      
      <!-- ============================================== -->
      <!-- 3. RIGHT SIDE: THE BOARD & INTERFACE -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        
        <!-- 3A. THE MAIN CHALKBOARD / HUD -->
        <!-- Pure math board area. No robot here anymore. -->
        <div id="classroom-hud" style="flex-grow: 1; margin: 0 0 20px 0; border: 6px solid #e2e8f0; border-radius: 20px; background: rgba(30, 41, 59, 0.9); box-shadow: 0 0 30px rgba(226, 232, 240, 0.2), inset 0 0 15px rgba(0,0,0,0.5); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px; gap: 20px;">
          
          <!-- Blueprint Grid Background -->
          <div style="position: absolute; width: 100%; height: 100%; background-image: linear-gradient(#334155 1.5px, transparent 1.5px), linear-gradient(90deg, #334155 1.5px, transparent 1.5px); background-size: 30px 30px; opacity: 0.3;"></div>
          
          <!-- Placeholder Title (Math Engine replaces this) -->
          <h1 style="font-size: 3rem; color: #e2e8f0; text-transform: uppercase; letter-spacing: 0.2em; text-shadow: 0 0 10px rgba(226, 232, 240, 0.6); font-weight: 300; z-index: 2; margin: 0;">
            System Active
          </h1>

          <!-- THE BLUEPRINT ROCKETSHIP (POC Proof) -->
          <!-- We re-integrate the detailed SVG rocketship from our test! -->
          <svg viewBox="0 0 200 300" style="width: 130px; z-index: 2; opacity: 0.7;">
            <defs>
              <linearGradient id="plasma" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#e0f2fe" />
                <stop offset="20%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#1e3a8a" />
              </linearGradient>
              <style>
                @keyframes pulseFlame {
                  0% { transform: scaleY(1); opacity: 0.7; filter: drop-shadow(0 0 5px #38bdf8); }
                  50% { transform: scaleY(1.3); opacity: 1; filter: drop-shadow(0 0 15px #38bdf8); }
                  100% { transform: scaleY(0.9); opacity: 0.8; filter: drop-shadow(0 0 10px #38bdf8); }
                }
                .vfx-pulse { transform-origin: top center; animation: pulseFlame 0.15s infinite alternate; }
              
            </defs>
            <!-- Rocket Body Blueprint -->
            <path d="M100 20 C100 20, 50 100, 50 200 L150 200 C150 100, 100 20, 100 20 Z" fill="none" stroke="#e2e8f0" stroke-width="5" stroke-dasharray="8 4" />
            <circle cx="100" cy="110" r="25" fill="none" stroke="#e2e8f0" stroke-width="5" />
            <path d="M50 200 L20 250 L50 230 Z" fill="none" stroke="#e2e8f0" stroke-width="5" />
            <path d="M150 200 L180 250 L150 230 Z" fill="none" stroke="#e2e8f0" stroke-width="5" />
            <!-- The Animated Exhaust -->
            <path class="vfx-pulse" d="M70 200 L100 290 L130 200 Z" fill="url(#plasma)" />
          </svg>
        </div>
        
        <!-- 3B. THE MAIN HOLOGRAPHIC CONSOLE (Integrated bottom) -->
        <div style="height: 140px; border-radius: 15px; background: #1e293b; border: 3px solid #64748b; box-shadow: 0 5px 15px rgba(0,0,0,0.5); display: grid; grid-template-columns: 2fr 1fr; padding: 15px; box-sizing: border-box; gap: 10px; position: relative;">
          
          <!-- Console Interface Details -->
          <div style="display: flex; flex-direction: column; justify-content: space-around;">
            <div style="display: flex; gap: 10px;">
              <div style="width: 20px; height: 20px; border-radius: 5px; background: #64748b; box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8;"></div>
              <div style="width: 60px; height: 10px; border-radius: 5px; background: #334155;"></div>
            </div>
            <div style="width: 100%; height: 10px; border-radius: 5px; background: #334155; opacity: 0.5;"></div>
            <div style="display: flex; gap: 10px; align-items: center;">
               <div style="width: 20px; height: 20px; border-radius: 10px; background: #f094e0; opacity: 0.7;"></div>
               <div style="width: 20px; height: 20px; border-radius: 10px; background: #38bdf8; opacity: 0.7;"></div>
            </div>
          </div>

          <!-- 3C. THE FLOATING ROBOT INSTRUCTOR -->
          <!-- Robot is now much smaller and integrated here! -->
          <div style="display: flex; justify-content: center; align-items: center; animation: hoverTeacher 4s ease-in-out infinite;">
            <svg style="width: 80px; height: 100px;" viewBox="0 0 100 120">
              <rect x="25" y="10" width="50" height="40" rx="10" fill="#e2e8f0" stroke="#334155" stroke-width="3" />
              <rect x="35" y="22" width="12" height="15" rx="3" fill="#1e293b" /> <!-- Left eye bg -->
              <rect x="53" y="22" width="12" height="15" rx="3" fill="#1e293b" /> <!-- Right eye bg -->
              <rect x="38" y="25" width="6" height="9" rx="2" fill="#38bdf8" /> <!-- Left pupil -->
              <rect x="56" y="25" width="6" height="9" rx="2" fill="#38bdf8" /> <!-- Right pupil -->
              <path d="M20,60 L80,60 L70,100 L30,100 Z" fill="#cbd5e1" stroke="#334155" stroke-width="3" />
              <circle cx="50" cy="110" r="10" fill="#38bdf8" opacity="0.8" style="animation: flickerRepulsor 0.2s infinite alternate;" />
              <circle cx="50" cy="110" r="5" fill="#e0f2fe" />
            </svg>
          </div>
        </div>
        
        <style>
          @keyframes hoverTeacher {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
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
