export function loadSpaceSchool() {
  const zoneLayer = document.getElementById('zone-layer');
  
  // Injecting the full 2.5D Space Classroom
  zoneLayer.innerHTML = `
    <!-- 1. THE MAIN CLASSROOM CONTAINER -->
    <div style="width: 100%; height: 100%; background: #0f172a; display: grid; grid-template-columns: 4fr 5fr; gap: 20px; padding: 20px; box-sizing: border-box; font-family: 'Segoe UI', sans-serif;">
      
      <!-- ============================================== -->
      <!-- 2. LEFT SIDE: PARALLAX OBSERVATION WINDOW -->
      <div style="position: relative; border-radius: 20px; overflow: hidden; border: 4px solid #334155; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
        
        <!-- LAYER 1: DEEP SPACE (Still) -->
        <div style="position: absolute; width: 100%; height: 100%; background: #010409;"></div>
        
        <!-- LAYER 2: PARALLAX DISTANT STARS (Fast) -->
        <div style="position: absolute; width: 200%; height: 100%; background-image: radial-gradient(white 1px, transparent 1px); background-size: 50px 50px; opacity: 0.6; animation: scrollStars 10s linear infinite;"></div>
        
        <!-- LAYER 3: PARALLAX NEARER STARS (Slow) -->
        <div style="position: absolute; width: 200%; height: 100%; background-image: radial-gradient(white 1.5px, transparent 1.5px); background-size: 100px 100px; opacity: 0.9; animation: scrollStars 25s linear infinite;"></div>
        
        <!-- LAYER 4: DRIFTING ASTEROIDS (Foreground) -->
        <!-- We use SVGs for the asteroids for detail -->
        <svg style="position: absolute; width: 50px; height: 50px; left: 10%; top: 20%; fill: #475569; animation: driftAsteroid1 30s linear infinite;" viewBox="0 0 100 100">
          <path d="M10,40 L30,10 L70,20 L90,50 L70,80 L30,90 Z" />
        </svg>
        <svg style="position: absolute; width: 80px; height: 80px; left: 60%; top: 60%; fill: #334155; animation: driftAsteroid2 45s linear infinite;" viewBox="0 0 100 100">
          <path d="M20,50 L40,20 L80,30 L95,60 L75,90 L35,85 Z" />
        </svg>
        
        <!-- LAYER 5: THE WINDOW FRAME/GREEBLES (Classroom Layer) -->
        <div style="position: absolute; width: 100%; height: 100%; border: 20px solid transparent; border-image: linear-gradient(to right, #64748b, #334155) 30; box-shadow: inset 0 0 30px rgba(0,0,0,1); pointer-events: none;"></div>
        
        <!-- Define CSS Animations locally (we can't put @keyframes in inline style tags easiy, so we wrap it in a real style tag within the innerHTML) -->
        <style>
          @keyframes scrollStars {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes driftAsteroid1 {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translate(400%, 150%) rotate(360deg); opacity: 0; }
          }
          @keyframes driftAsteroid2 {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(-300%, -200%) rotate(-180deg); opacity: 0; }
          }
        </style>
      </div>
      
      <!-- ============================================== -->
      <!-- 3. RIGHT SIDE: THE TEACHER & BOARD -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        
        <!-- 3A. FLOATING ROBOT INSTRUCTOR -->
        <div style="display: flex; justify-content: flex-end; padding-right: 30px; animation: hoverTeacher 4s ease-in-out infinite;">
          <svg style="width: 100px; height: 120px;" viewBox="0 0 100 120">
            <!-- Robot Head -->
            <rect x="25" y="10" width="50" height="40" rx="10" fill="#e2e8f0" stroke="#334155" stroke-width="3" />
            <rect x="30" y="5" width="40" height="10" rx="5" fill="#475569" /> <!-- Antenna base -->
            
            <!-- Expressive Screen Eyes -->
            <rect x="35" y="22" width="12" height="15" rx="3" fill="#1e293b" /> <!-- Left eye bg -->
            <rect x="53" y="22" width="12" height="15" rx="3" fill="#1e293b" /> <!-- Right eye bg -->
            <rect x="38" y="25" width="6" height="9" rx="2" fill="#38bdf8" /> <!-- Left pupil -->
            <rect x="56" y="25" width="6" height="9" rx="2" fill="#38bdf8" /> <!-- Right pupil -->
            
            <!-- Body & Repulsors -->
            <path d="M20,60 L80,60 L70,100 L30,100 Z" fill="#cbd5e1" stroke="#334155" stroke-width="3" />
            <circle cx="50" cy="110" r="10" fill="#38bdf8" opacity="0.8" style="animation: flickerRepulsor 0.2s infinite alternate;" />
            <circle cx="50" cy="110" r="5" fill="#e0f2fe" />
            
            <!-- Arms -->
            <path d="M10,65 Q20,60 20,70 L20,90 Q15,100 10,95 Z" fill="#64748b" /> <!-- Left -->
            <path d="M90,65 Q80,60 80,70 L80,90 Q85,100 90,95 Z" fill="#64748b" /> <!-- Right -->
          </svg>
        </div>
        
        <!-- 3B. THE MAIN CHALKBOARD / HUD -->
        <!-- For now, just the visual frame. The math engine will fill this area. -->
        <div id="classroom-hud" style="flex-grow: 1; margin: 20px 0; border: 6px solid #e2e8f0; border-radius: 20px; background: rgba(30, 41, 59, 0.9); box-shadow: 0 0 30px rgba(226, 232, 240, 0.2), inset 0 0 15px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          
          <!-- Blueprint Grid Background -->
          <div style="position: absolute; width: 100%; height: 100%; background-image: linear-gradient(#334155 1.5px, transparent 1.5px), linear-gradient(90deg, #334155 1.5px, transparent 1.5px); background-size: 30px 30px; opacity: 0.3;"></div>
          
          <!-- Placeholder Content (The Math Engine will replace this) -->
          <h1 style="font-size: 3rem; color: #e2e8f0; text-transform: uppercase; letter-spacing: 0.2em; text-shadow: 0 0 10px rgba(226, 232, 240, 0.6); font-weight: 300; z-index: 2;">
            System Active
          </h1>
        </div>
        
        <!-- 3C. HOLOGRAPHIC CONSOLE (Bottom area) -->
        <div style="height: 100px; border-radius: 15px; background: #1e293b; border: 3px solid #64748b; box-shadow: 0 5px 15px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; gap: 15px; padding: 0 20px;">
          <!-- Fake Interface Buttons (They don't do anything yet) -->
          <div style="width: 60px; height: 10px; border-radius: 5px; background: #334155;"></div>
          <div style="width: 20px; height: 20px; border-radius: 5px; background: #64748b; box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8;"></div> <!-- Glowing active button -->
          <div style="width: 60px; height: 10px; border-radius: 5px; background: #334155;"></div>
          <div style="width: 60px; height: 10px; border-radius: 5px; background: #334155;"></div>
        </div>
        
        <style>
          @keyframes hoverTeacher {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
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
