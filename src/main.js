export function loadSpaceSchool() {
  const zoneLayer = document.getElementById('zone-layer');
  
  // Injecting the 2.5D visual layer
  zoneLayer.innerHTML = `
    <div style="width: 100%; height: 100%; background: #0f172a; display: flex; align-items: center; justify-content: center;">
      
      <!-- Glowing Digital Whiteboard -->
      <div style="width: 90%; height: 80%; background: #1e293b; border: 6px solid #38bdf8; border-radius: 20px; box-shadow: 0 0 40px rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        
        <!-- Blueprint Grid Background -->
        <div style="position: absolute; width: 100%; height: 100%; background-image: linear-gradient(#334155 2px, transparent 2px), linear-gradient(90deg, #334155 2px, transparent 2px); background-size: 40px 40px; opacity: 0.4;"></div>

        <!-- High-Fidelity SVG Rocket -->
        <svg viewBox="0 0 200 300" style="width: 180px; z-index: 2;">
          <defs>
            <!-- Plasma Flame Color -->
            <linearGradient id="plasma" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e0f2fe" />
              <stop offset="20%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#1e3a8a" />
            </linearGradient>
            
            <!-- The Flame Animation Keyframes -->
            <style>
              @keyframes pulseFlame {
                0% { transform: scaleY(1); opacity: 0.8; filter: drop-shadow(0 0 10px #38bdf8); }
                50% { transform: scaleY(1.4); opacity: 1; filter: drop-shadow(0 0 25px #38bdf8); }
                100% { transform: scaleY(0.9); opacity: 0.9; filter: drop-shadow(0 0 15px #38bdf8); }
              }
              .vfx-pulse {
                transform-origin: top center;
                animation: pulseFlame 0.15s infinite alternate;
              }
            </style>
          </defs>
          
          <!-- Rocket Blueprint Body -->
          <path d="M100 20 C100 20, 50 100, 50 200 L150 200 C150 100, 100 20, 100 20 Z" fill="none" stroke="#e2e8f0" stroke-width="6" stroke-dasharray="10 5" />
          <circle cx="100" cy="110" r="25" fill="none" stroke="#e2e8f0" stroke-width="6" />
          <path d="M50 200 L20 250 L50 230 Z" fill="none" stroke="#e2e8f0" stroke-width="6" />
          <path d="M150 200 L180 250 L150 230 Z" fill="none" stroke="#e2e8f0" stroke-width="6" />
          
          <!-- The Animated Blue Exhaust -->
          <path class="vfx-pulse" d="M70 200 L100 290 L130 200 Z" fill="url(#plasma)" />
        </svg>

      </div>
    </div>
  `;
}
