// avatarstage.js - Playable Bottom-of-Screen Character & Tag-Along Pet Physics
(function () {
  let x = 220;
  let y = 0;
  let vy = 0;
  let facing = 1; // 1 = right, -1 = left
  let keys = { left: false, right: false };
  let isMoving = false;

  // Pet follow coordinates
  let petX = 155;
  let petY = 0;
  let petVy = 0;

  let avatarWrap = null;
  let avatarInner = null;
  let petWrap = null;

  function initStage() {
    if (document.getElementById("avatar-stage-layer")) return;

    const stage = document.createElement("div");
    stage.id = "avatar-stage-layer";
    stage.style.cssText =
      "position:fixed;bottom:0;left:0;width:100vw;height:145px;z-index:8500;pointer-events:none;overflow:visible;";

    // Touch D-Pad + Jump Controls (Bottom-Left)
    const controls = document.createElement("div");
    controls.style.cssText =
      "position:absolute;bottom:14px;left:18px;display:flex;gap:8px;align-items:center;pointer-events:auto;z-index:8600;";

    function makeCtrlBtn(label, onDown, onUp) {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.cssText =
        "height:42px;min-width:44px;padding:0 12px;border-radius:10px;background:rgba(15,23,42,0.82);border:2px solid #38bdf8;color:#f8fafc;font-weight:900;font-size:0.95rem;cursor:pointer;user-select:none;box-shadow:0 4px 10px rgba(0,0,0,0.5);";
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        onDown();
      });
      btn.addEventListener("pointerup", onUp);
      btn.addEventListener("pointerleave", onUp);
      btn.addEventListener("pointercancel", onUp);
      return btn;
    }

    const leftBtn = makeCtrlBtn("◀", () => (keys.left = true), () => (keys.left = false));
    const rightBtn = makeCtrlBtn("▶", () => (keys.right = true), () => (keys.right = false));
    const jumpBtn = makeCtrlBtn("▲ JUMP", triggerJump, () => {});

    controls.appendChild(leftBtn);
    controls.appendChild(rightBtn);
    controls.appendChild(jumpBtn);

    // Pet Container
    petWrap = document.createElement("div");
    petWrap.id = "stage-pet-actor";
    petWrap.style.cssText =
      "position:absolute;bottom:14px;left:0;width:64px;height:64px;pointer-events:none;will-change:transform;";

    // Avatar Container
    avatarWrap = document.createElement("div");
    avatarWrap.id = "stage-avatar-actor";
    avatarWrap.style.cssText =
      "position:absolute;bottom:8px;left:0;width:110px;height:125px;pointer-events:auto;cursor:pointer;will-change:transform;filter:drop-shadow(0 6px 10px rgba(0,0,0,0.65));";
    avatarWrap.title = "Click to open Wardrobe & Shop!";
    avatarWrap.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("ui-shop-clicked"));
    });

    avatarInner = document.createElement("div");
    avatarWrap.appendChild(avatarInner);

    stage.appendChild(petWrap);
    stage.appendChild(avatarWrap);
    stage.appendChild(controls);
    document.body.appendChild(stage);

    refreshGraphics();
    requestAnimationFrame(loop);
  }

  function triggerJump() {
    if (y === 0) {
      vy = 11.5;
      // Pet jumps a split-second after player!
      setTimeout(() => {
        if (petY === 0) petVy = 9.5;
      }, 140);
    }
  }

  function refreshGraphics() {
    if (!window.Economy || !window.AvatarRenderer || !avatarInner) return;
    const avatar = window.Economy.getAvatar();
    avatarInner.innerHTML = window.AvatarRenderer.renderSVG(avatar, 105, 120, isMoving);
    if (petWrap) {
      petWrap.innerHTML = window.AvatarRenderer.renderPetSVG(avatar.equipped.pet, 58);
    }
  }

  function loop() {
    const maxW = Math.max(320, window.innerWidth - 120);
    const prevMoving = isMoving;

    if (keys.left) {
      x = Math.max(15, x - 4.5);
      facing = -1;
      isMoving = true;
    } else if (keys.right) {
      x = Math.min(maxW, x + 4.5);
      facing = 1;
      isMoving = true;
    } else {
      isMoving = false;
    }

    if (prevMoving !== isMoving) {
      refreshGraphics();
    }

    // Player Jump Gravity
    if (y > 0 || vy !== 0) {
      y += vy;
      vy -= 0.62;
      if (y <= 0) {
        y = 0;
        vy = 0;
      }
    }

    // Pet Follow AI (Smoothly trails behind player)
    const targetPetX = facing === 1 ? x - 58 : x + 78;
    petX += (targetPetX - petX) * 0.1;

    if (petY > 0 || petVy !== 0) {
      petY += petVy;
      petVy -= 0.58;
      if (petY <= 0) {
        petY = 0;
        petVy = 0;
      }
    }

    const bob = isMoving && y === 0 ? Math.abs(Math.sin(Date.now() * 0.015)) * 5 : 0;
    const petBob = Math.sin(Date.now() * 0.008) * 4;

    if (avatarWrap) {
      avatarWrap.style.transform =
        "translate3d(" + x.toFixed(1) + "px, " + (-y - bob).toFixed(1) + "px, 0) scaleX(" + facing + ")";
    }
    if (petWrap) {
      petWrap.style.transform =
        "translate3d(" + petX.toFixed(1) + "px, " + (-petY + petBob).toFixed(1) + "px, 0) scaleX(" + facing + ")";
    }

    requestAnimationFrame(loop);
  }

  // Keyboard Listeners (Arrows or WASD + Spacebar, ignored when typing in an input box)
  window.addEventListener("keydown", (e) => {
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      e.preventDefault();
      triggerJump();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
  });

  window.addEventListener("economy-updated", refreshGraphics);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStage);
  } else {
    initStage();
  }
})();
