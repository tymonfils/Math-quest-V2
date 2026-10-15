To make switching grades or topics update the whiteboard instantly the moment you tap a button inside Settings, we just need to update settingsmodal.js and add a 1-line listener to src/world/zones/spaceschool.js.Step 1: Update settingsmodal.jsThis adds two clean, interactive control decks right at the top of your ⚙️ Control Deck:Grade Level (K, 1, 2, 3, 4, 5): Highlights the active grade in glowing cyan and saves your pick immediately.Math Focus (50/50 Mix, + Add, - Sub, × Mult, ÷ Div): Lets you keep the automatic mix or lock into a specific operation whenever Jemma wants to practice just one skill.Copy and paste this into settingsmodal.js:   JavaScript// settingsmodal.js - Clean DOM Modular Settings Deck with Live Grade & Topic Controls
const SettingsModal = (function () {
  function openSettings() {
    const modalLayer = document.getElementById("modal-layer");
    if (!modalLayer || document.getElementById("settings-overlay")) return;

    // Dimmed glass backdrop
    const overlay = document.createElement("div");
    overlay.id = "settings-overlay";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(4,7,18,0.85);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;z-index:10000;box-sizing:border-box;pointer-events:auto;";

    // Main Card Box
    const card = document.createElement("div");
    card.id = "settings-card";
    card.style.cssText =
      "background:#0f172a;border:2px solid #38bdf8;border-radius:18px;padding:24px;width:90%;max-width:440px;color:#f8fafc;font-family:system-ui,sans-serif;box-shadow:0 20px 40px rgba(0,0,0,0.8);display:flex;flex-direction:column;max-height:88vh;box-sizing:border-box;";

    // Header bar
    const header = document.createElement("div");
    header.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #334155;";

    const title = document.createElement("div");
    title.textContent = "⚙️ Control Deck";
    title.style.cssText = "font-size:1.3rem;font-weight:800;color:#f8fafc;";

    const closeIcon = document.createElement("button");
    closeIcon.textContent = "✕";
    closeIcon.style.cssText =
      "background:none;border:none;color:#94a3b8;font-size:1.4rem;cursor:pointer;line-height:1;";

    header.appendChild(title);
    header.appendChild(closeIcon);
    card.appendChild(header);

    // Scrollable container
    const listContainer = document.createElement("div");
    listContainer.style.cssText =
      "overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding-right:4px;";

    function addSectionLabel(text, color) {
      const label = document.createElement("div");
      label.textContent = text;
      label.style.cssText =
        "font-size:0.75rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;margin:10px 0 4px 4px;color:" + color + ";";
      listContainer.appendChild(label);
    }

    // --- 1. CURRICULUM GRADE LEVEL SELECTOR (K - 5) ---
    addSectionLabel("Grade Level (K – 5)", "#38bdf8");

    const currentGrade =
      window.GameState && window.GameState.data && window.GameState.data.math
        ? String(window.GameState.data.math.grade).toUpperCase()
        : "2";

    const gradeGrid = document.createElement("div");
    gradeGrid.style.cssText =
      "display:grid;grid-template-columns:repeat(6, 1fr);gap:8px;margin-bottom:4px;";

    const grades = ["K", "1", "2", "3", "4", "5"];
    const gradeButtons = [];

    function updateGradeButtonStyles(selectedGrade) {
      gradeButtons.forEach((item) => {
        const isActive = item.grade === selectedGrade;
        item.btn.style.background = isActive
          ? "linear-gradient(135deg, #0284c7, #38bdf8)"
          : "#1e293b";
        item.btn.style.color = isActive ? "#0f172a" : "#f8fafc";
        item.btn.style.border = isActive
          ? "2px solid #7dd3fc"
          : "2px solid #334155";
        item.btn.style.boxShadow = isActive
          ? "0 0 12px rgba(56, 189, 248, 0.45)"
          : "none";
      });
    }

    grades.forEach((g) => {
      const btn = document.createElement("button");
      btn.textContent = g === "K" ? "K" : "G" + g;
      btn.style.cssText =
        "padding:10px 0;border-radius:10px;font-weight:800;font-size:0.95rem;cursor:pointer;transition:all 0.15s;user-select:none;";

      btn.addEventListener("click", () => {
        if (window.GameState && typeof window.GameState.setGrade === "function") {
          window.GameState.setGrade(g);
        }
        updateGradeButtonStyles(g);
      });

      gradeButtons.push({ grade: g, btn });
      gradeGrid.appendChild(btn);
    });

    updateGradeButtonStyles(currentGrade);
    listContainer.appendChild(gradeGrid);

    // --- 2. MATH OPERATION / TOPIC SELECTOR ---
    addSectionLabel("Math Mode", "#fbbf24");

    const currentTopic =
      window.GameState && window.GameState.data && window.GameState.data.math
        ? window.GameState.data.math.topic || "mixed"
        : "mixed";

    const topicGrid = document.createElement("div");
    topicGrid.style.cssText =
      "display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;margin-bottom:4px;";

    const topics = [
      { id: "mixed", label: "🎲 50/50 Mix" },
      { id: "addition", label: "➕ Add" },
      { id: "subtraction", label: "➖ Subtract" },
      { id: "multiplication", label: "✖️ Multiply" },
      { id: "division", label: "➗ Divide" }
    ];

    const topicButtons = [];

    function updateTopicButtonStyles(selectedTopic) {
      topicButtons.forEach((item) => {
        const isActive = item.id === selectedTopic;
        item.btn.style.background = isActive
          ? "rgba(251, 191, 36, 0.2)"
          : "#1e293b";
        item.btn.style.color = isActive ? "#fbbf24" : "#cbd5e1";
        item.btn.style.border = isActive
          ? "2px solid #fbbf24"
          : "1px solid #334155";
      });
    }

    topics.forEach((t) => {
      const btn = document.createElement("button");
      btn.textContent = t.label;
      btn.style.cssText =
        "padding:8px 6px;border-radius:8px;font-weight:700;font-size:0.8rem;cursor:pointer;transition:all 0.15s;user-select:none;";

      btn.addEventListener("click", () => {
        if (window.GameState && typeof window.GameState.setTopic === "function") {
          window.GameState.setTopic(t.id);
        }
        updateTopicButtonStyles(t.id);
      });

      topicButtons.push({ id: t.id, btn });
      topicGrid.appendChild(btn);
    });

    updateTopicButtonStyles(currentTopic);
    listContainer.appendChild(topicGrid);

    // --- 3. NAVIGATION & SYSTEM ROWS ---
    function createRow(icon, text, tagText, tagBg, tagColor, onClick) {
      const row = document.createElement("div");
      row.style.cssText =
        "display:flex;justify-content:space-between;align-items:center;background:#1e293b;border:1px solid #334155;padding:12px 14px;border-radius:10px;cursor:pointer;user-select:none;";

      const left = document.createElement("div");
      left.style.cssText = "display:flex;align-items:center;gap:10px;font-weight:600;font-size:0.95rem;";
      left.textContent = icon + " " + text;

      const right = document.createElement("span");
      right.textContent = tagText;
      right.style.cssText =
        "background:" + tagBg + ";color:" + tagColor + ";font-size:0.75rem;font-weight:700;padding:4px 10px;border-radius:999px;";

      row.appendChild(left);
      row.appendChild(right);
      if (onClick) row.addEventListener("click", onClick);
      listContainer.appendChild(row);
    }

    addSectionLabel("Navigation", "#38bdf8");
    createRow("🗺️", "Fast Travel", "OPEN", "rgba(56,189,248,0.2)", "#38bdf8", () => {
      close();
      window.dispatchEvent(new CustomEvent("ui-map-clicked"));
    });
    createRow("🛒", "The Shop", "VISIT", "rgba(251,191,36,0.2)", "#fbbf24");

    addSectionLabel("System", "#94a3b8");
    createRow("🔲", "Full Screen", "TOGGLE", "rgba(255,255,255,0.15)", "#f8fafc", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    card.appendChild(listContainer);

    const resumeBtn = document.createElement("button");
    resumeBtn.textContent = "Resume Game";
    resumeBtn.style.cssText =
      "margin-top:16px;padding:12px;background:#ef4444;color:white;border:none;border-radius:10px;font-weight:700;font-size:0.95rem;cursor:pointer;";

    card.appendChild(resumeBtn);
    overlay.appendChild(card);
    modalLayer.appendChild(overlay);

    function close() {
      if (overlay.parentNode === modalLayer) modalLayer.removeChild(overlay);
    }

    closeIcon.addEventListener("click", close);
    resumeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
  }

  window.addEventListener("ui-settings-clicked", openSettings);
  return { open: openSettings };
})();
