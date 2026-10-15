// shopmodal.js - Full Dressing Room Preview, 45-Item Shop & 3 Custom Parent Reward Slots
window.ShopModal = (function () {
  const SKIN_TONES = ["#fef08a", "#fcd34d", "#f59e0b", "#d97706", "#78350f"];
  const HAIR_COLORS = ["#0f172a", "#78350f", "#b45309", "#facc15", "#ef4444", "#ec4899"];
  const REWARD_ICONS = ["🍦", "🎮", "🎁", "🍕", "🎬", "🧸", "🛹", "🎨", "💵", "🎡"];

  let activeTab = "outfits"; // "outfits" | "hairs" | "pets" | "rewards"
  let selectedItemId = null;
  let parentUnlocked = false;
  let previewState = null;

  function cloneAvatarWithPreview() {
    const real = window.Economy.getAvatar();
    const copy = JSON.parse(JSON.stringify(real));
    if (previewState) {
      const g = copy.gender;
      if (previewState.outfit) copy.equipped[g].outfit = previewState.outfit;
      if (previewState.hair) copy.equipped[g].hair = previewState.hair;
      if (previewState.pet !== undefined) copy.equipped.pet = previewState.pet;
    }
    return copy;
  }

  function openShop() {
    const modalLayer = document.getElementById("modal-layer");
    if (!modalLayer || document.getElementById("shop-overlay")) return;
    if (!window.Economy || !window.AvatarRenderer) return;

    previewState = { outfit: null, hair: null, pet: undefined };
    selectedItemId = null;

    const overlay = document.createElement("div");
    overlay.id = "shop-overlay";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(4,7,18,0.88);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;z-index:10000;box-sizing:border-box;pointer-events:auto;padding:12px;";

    const card = document.createElement("div");
    card.style.cssText =
      "background:#0f172a;border:2px solid #fbbf24;border-radius:20px;padding:18px;width:96%;max-width:860px;height:88vh;max-height:640px;color:#f8fafc;font-family:system-ui,sans-serif;box-shadow:0 24px 50px rgba(0,0,0,0.85);display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;";

    // --- HEADER ---
    const header = document.createElement("div");
    header.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid #334155;flex-shrink:0;";

    const titleWrap = document.createElement("div");
    titleWrap.style.cssText = "display:flex;align-items:center;gap:12px;";
    const title = document.createElement("div");
    title.textContent = "🛒 Galactic Shop & Dressing Room";
    title.style.cssText = "font-size:1.25rem;font-weight:900;color:#fbbf24;";

    const goldBadge = document.createElement("div");
    goldBadge.style.cssText =
      "background:rgba(251,191,36,0.15);border:1.5px solid #fbbf24;color:#fde047;padding:4px 12px;border-radius:999px;font-weight:800;font-size:0.95rem;";

    titleWrap.appendChild(title);
    titleWrap.appendChild(goldBadge);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.style.cssText =
      "background:#1e293b;border:1px solid #475569;color:#f8fafc;width:34px;height:34px;border-radius:50%;font-size:1.1rem;cursor:pointer;font-weight:800;";

    header.appendChild(titleWrap);
    header.appendChild(closeBtn);
    card.appendChild(header);

    // --- MAIN BODY (Left: Live Avatar Preview, Right: Catalog & Tabs) ---
    const body = document.createElement("div");
    body.style.cssText =
      "display:flex;gap:16px;flex:1;min-height:0;margin-top:14px;flex-wrap:wrap;";

    // LEFT COLUMN: Live Preview Stage
    const leftCol = document.createElement("div");
    leftCol.style.cssText =
      "width:250px;background:radial-gradient(circle at 50% 45%, #1e293b 0%, #090d16 100%);border:1px solid #334155;border-radius:16px;padding:12px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;flex-shrink:0;box-sizing:border-box;position:relative;";

    const previewBanner = document.createElement("div");
    previewBanner.style.cssText =
      "font-size:0.72rem;font-weight:800;padding:3px 10px;border-radius:999px;letter-spacing:0.05em;text-transform:uppercase;";

    // Gender Switcher
    const genderRow = document.createElement("div");
    genderRow.style.cssText = "display:flex;gap:8px;width:100%;";

    const girlBtn = document.createElement("button");
    girlBtn.textContent = "👧 Girl";
    const boyBtn = document.createElement("button");
    boyBtn.textContent = "👦 Boy";

    [girlBtn, boyBtn].forEach((b) => {
      b.style.cssText =
        "flex:1;padding:7px 0;border-radius:8px;font-weight:800;font-size:0.85rem;cursor:pointer;border:2px solid #334155;background:#1e293b;color:#f8fafc;";
    });

    girlBtn.addEventListener("click", () => {
      window.Economy.setGender("girl");
      previewState = { outfit: null, hair: null, pet: undefined };
      selectedItemId = null;
      renderAll();
    });

    boyBtn.addEventListener("click", () => {
      window.Economy.setGender("boy");
      previewState = { outfit: null, hair: null, pet: undefined };
      selectedItemId = null;
      renderAll();
    });

    genderRow.appendChild(girlBtn);
    genderRow.appendChild(boyBtn);

    // Avatar & Pet Podium Box
    const stageBox = document.createElement("div");
    stageBox.style.cssText =
      "position:relative;width:190px;height:185px;display:flex;align-items:center;justify-content:center;";

    const avatarHolder = document.createElement("div");
    const petHolder = document.createElement("div");
    petHolder.style.cssText = "position:absolute;bottom:10px;right:4px;";

    stageBox.appendChild(avatarHolder);
    stageBox.appendChild(petHolder);

    // Skin & Hair Swatches
    const swatchBox = document.createElement("div");
    swatchBox.style.cssText = "width:100%;display:flex;flex-direction:column;gap:6px;";

    function buildSwatchRow(label, colors, onPick, getCurrent) {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;justify-content:space-between;";
      const lbl = document.createElement("span");
      lbl.textContent = label;
      lbl.style.cssText = "font-size:0.72rem;color:#94a3b8;font-weight:700;";
      const dots = document.createElement("div");
      dots.style.cssText = "display:flex;gap:5px;";

      colors.forEach((c) => {
        const dot = document.createElement("button");
        dot.style.cssText =
          "width:20px;height:20px;border-radius:50%;background:" +
          c +
          ";border:2px solid " +
          (getCurrent() === c ? "#38bdf8" : "#334155") +
          ";cursor:pointer;padding:0;";
        dot.addEventListener("click", () => {
          onPick(c);
          renderAll();
        });
        dots.appendChild(dot);
      });
      row.appendChild(lbl);
      row.appendChild(dots);
      return row;
    }

    // Action Bar at bottom of preview (Buy / Equip button for currently previewed item)
    const actionArea = document.createElement("div");
    actionArea.style.cssText = "width:100%;min-height:42px;display:flex;flex-direction:column;gap:4px;";

    leftCol.appendChild(genderRow);
    leftCol.appendChild(previewBanner);
    leftCol.appendChild(stageBox);
    leftCol.appendChild(swatchBox);
    leftCol.appendChild(actionArea);

    // RIGHT COLUMN: Category Tabs + Grid
    const rightCol = document.createElement("div");
    rightCol.style.cssText =
      "flex:1;min-width:280px;display:flex;flex-direction:column;height:100%;min-height:0;";

    const tabBar = document.createElement("div");
    tabBar.style.cssText = "display:flex;gap:8px;margin-bottom:10px;flex-shrink:0;flex-wrap:wrap;";

    const tabs = [
      { id: "outfits", label: "👕 Outfits (9)" },
      { id: "hairs", label: "💇 Hairstyles (9)" },
      { id: "pets", label: "🐾 Pets (9)" },
      { id: "rewards", label: "🎁 Parent Rewards (3)" }
    ];

    const gridWrap = document.createElement("div");
    gridWrap.style.cssText =
      "flex:1;overflow-y:auto;padding-right:6px;display:flex;flex-direction:column;gap:10px;";

    rightCol.appendChild(tabBar);
    rightCol.appendChild(gridWrap);

    body.appendChild(leftCol);
    body.appendChild(rightCol);
    card.appendChild(body);
    overlay.appendChild(card);
    modalLayer.appendChild(overlay);

    // --- RENDER ENGINE ---
    function renderAll() {
      const gold = window.Economy.getGold();
      const realAv = window.Economy.getAvatar();
      const previewAv = cloneAvatarWithPreview();
      const g = realAv.gender;

      goldBadge.textContent = "🪙 " + gold + " Gold";

      // Gender button highlight
      girlBtn.style.borderColor = g === "girl" ? "#ec4899" : "#334155";
      girlBtn.style.background = g === "girl" ? "rgba(236,72,153,0.2)" : "#1e293b";
      boyBtn.style.borderColor = g === "boy" ? "#38bdf8" : "#334155";
      boyBtn.style.background = g === "boy" ? "rgba(56,189,248,0.2)" : "#1e293b";

      // Check if previewing an unequipped item
      const isPreviewing =
        (previewState.outfit && previewState.outfit !== realAv.equipped[g].outfit) ||
        (previewState.hair && previewState.hair !== realAv.equipped[g].hair) ||
        (previewState.pet !== undefined && previewState.pet !== realAv.equipped.pet);

      if (isPreviewing) {
        previewBanner.textContent = "👁️ Previewing Item (Tap Buy/Equip Below)";
        previewBanner.style.background = "rgba(251,191,36,0.2)";
        previewBanner.style.color = "#fde047";
      } else {
        previewBanner.textContent = "✅ Currently Equipped Look";
        previewBanner.style.background = "rgba(34,197,94,0.18)";
        previewBanner.style.color = "#4ade80";
      }

      // Render SVG Avatar + Pet in Preview Box
      avatarHolder.innerHTML = window.AvatarRenderer.renderSVG(previewAv, 145, 165, false);
      petHolder.innerHTML = window.AvatarRenderer.renderPetSVG(previewAv.equipped.pet, 62);

      // Rebuild Swatches
      swatchBox.innerHTML = "";
      swatchBox.appendChild(
        buildSwatchRow(
          "Skin:",
          SKIN_TONES,
          (c) => window.Economy.setAppearance(c, null),
          () => realAv.skinTone
        )
      );
      swatchBox.appendChild(
        buildSwatchRow(
          "Hair:",
          HAIR_COLORS,
          (c) => window.Economy.setAppearance(null, c),
          () => realAv.hairColor
        )
      );

      // Action Button in Left Preview Box
      actionArea.innerHTML = "";
      if (selectedItemId && activeTab !== "rewards") {
        const item = window.Economy.getItemById(selectedItemId);
        if (item) {
          const owned = window.Economy.ownsItem(item.id);
          const isEq =
            (activeTab === "outfits" && realAv.equipped[g].outfit === item.id) ||
            (activeTab === "hairs" && realAv.equipped[g].hair === item.id) ||
            (activeTab === "pets" && realAv.equipped.pet === item.id);

          const mainBtn = document.createElement("button");
          mainBtn.style.cssText =
            "width:100%;padding:10px;border-radius:10px;font-weight:900;font-size:0.9rem;cursor:pointer;border:none;";

          if (owned) {
            mainBtn.textContent = isEq
              ? activeTab === "pets"
                ? "Unequip " + item.name
                : "✓ Equipped"
              : "Equip " + item.name;
            mainBtn.style.background = isEq ? "#334155" : "#22c55e";
            mainBtn.style.color = "#ffffff";
            mainBtn.addEventListener("click", () => {
              window.Economy.equipItem(activeTab, item.id);
              previewState = { outfit: null, hair: null, pet: undefined };
              renderAll();
            });
          } else {
            const canAfford = gold >= item.cost;
            mainBtn.textContent = canAfford
              ? "🪙 Buy & Equip (" + item.cost + "g)"
              : "🔒 Need " + (item.cost - gold) + "g More";
            mainBtn.style.background = canAfford
              ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
              : "#334155";
            mainBtn.style.color = canAfford ? "#0f172a" : "#94a3b8";
            mainBtn.addEventListener("click", () => {
              if (!canAfford) return;
              const res = window.Economy.buyItem(item.id);
              if (res.success) {
                window.Economy.equipItem(activeTab, item.id);
                previewState = { outfit: null, hair: null, pet: undefined };
                renderAll();
              }
            });
          }
          actionArea.appendChild(mainBtn);
        }
      }

      // Render Tabs
      tabBar.innerHTML = "";
      tabs.forEach((t) => {
        const b = document.createElement("button");
        b.textContent = t.label;
        const active = activeTab === t.id;
        b.style.cssText =
          "padding:8px 14px;border-radius:10px;font-weight:800;font-size:0.85rem;cursor:pointer;border:2px solid " +
          (active ? "#fbbf24" : "#334155") +
          ";background:" +
          (active ? "rgba(251,191,36,0.18)" : "#1e293b") +
          ";color:" +
          (active ? "#fde047" : "#cbd5e1") +
          ";";
        b.addEventListener("click", () => {
          activeTab = t.id;
          selectedItemId = null;
          renderAll();
        });
        tabBar.appendChild(b);
      });

      // Render Right Panel Content
      gridWrap.innerHTML = "";
      if (activeTab === "rewards") {
        renderParentRewards(gridWrap, gold);
      } else {
        renderCatalogGrid(gridWrap, activeTab, g, realAv, gold);
      }
    }

    function renderCatalogGrid(container, category, gender, realAv, gold) {
      const catalog = window.Economy.getCatalog();
      const items =
        category === "pets" ? catalog.pets : catalog[category][gender] || [];

      const tiers = [
        { key: "basic", title: "⭐ Basic Tier (Starter & Quick Wins)", color: "#38bdf8" },
        { key: "mid", title: "💎 Mid-Tier (Adventurer Gear)", color: "#c084fc" },
        { key: "insane", title: "🔥 Insane Tier (Animated Special FX!)", color: "#fb923c" }
      ];

      tiers.forEach((tObj) => {
        const tierHeader = document.createElement("div");
        tierHeader.textContent = tObj.title;
        tierHeader.style.cssText =
          "font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;color:" +
          tObj.color +
          ";margin-top:4px;";
        container.appendChild(tierHeader);

        const rowGrid = document.createElement("div");
        rowGrid.style.cssText =
          "display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;";

        items
          .filter((i) => i.tier === tObj.key)
          .forEach((item) => {
            const owned = window.Economy.ownsItem(item.id);
            const isEquipped =
              (category === "outfits" && realAv.equipped[gender].outfit === item.id) ||
              (category === "hairs" && realAv.equipped[gender].hair === item.id) ||
              (category === "pets" && realAv.equipped.pet === item.id);
            const isSelected = selectedItemId === item.id;

            const box = document.createElement("div");
            box.style.cssText =
              "background:#1e293b;border:2px solid " +
              (isSelected ? "#fbbf24" : isEquipped ? "#22c55e" : "#334155") +
              ";border-radius:12px;padding:10px;display:flex;flex-direction:column;justify-content:space-between;gap:6px;cursor:pointer;transition:transform 0.12s;";

            const top = document.createElement("div");
            top.style.cssText = "display:flex;justify-content:space-between;align-items:center;";
            const iconSpan = document.createElement("span");
            iconSpan.textContent = item.badge || item.icon || ( item.tier === "insane" ? "✨" : "💇");
            iconSpan.style.fontSize = "1.35rem";

            const statusTag = document.createElement("span");
            statusTag.style.cssText =
              "font-size:0.7rem;font-weight:800;padding:2px 7px;border-radius:999px;";
            if (isEquipped) {
              statusTag.textContent = "EQUIPPED";
              statusTag.style.background = "rgba(34,197,94,0.2)";
              statusTag.style.color = "#4ade80";
            } else if (owned) {
              statusTag.textContent = "OWNED";
              statusTag.style.background = "rgba(56,189,248,0.2)";
              statusTag.style.color = "#38bdf8";
            } else {
              statusTag.textContent = "🪙 " + item.cost;
              statusTag.style.background =
                gold >= item.cost ? "rgba(251,191,36,0.2)" : "rgba(148,163,184,0.15)";
              statusTag.style.color = gold >= item.cost ? "#fde047" : "#94a3b8";
            }

            top.appendChild(iconSpan);
            top.appendChild(statusTag);

            const nameEl = document.createElement("div");
            nameEl.textContent = item.name;
            nameEl.style.cssText = "font-weight:800;font-size:0.86rem;color:#f8fafc;";

            const subBtn = document.createElement("div");
            subBtn.style.cssText =
              "font-size:0.72rem;font-weight:700;text-align:center;padding:4px;border-radius:6px;background:rgba(15,23,42,0.6);color:#cbd5e1;";
            subBtn.textContent = owned
              ? isEquipped
                ? "✓ Wearing"
                : "Tap to Equip"
              : "👁️ Tap to Preview";

            box.appendChild(top);
            box.appendChild(nameEl);
            box.appendChild(subBtn);

            box.addEventListener("click", () => {
              selectedItemId = item.id;
              if (category === "outfits") previewState.outfit = item.id;
              if (category === "hairs") previewState.hair = item.id;
              if (category === "pets") previewState.pet = item.id;

              // If already owned, equip right away on click for effortless dressing!
              if (owned) {
                window.Economy.equipItem(category, item.id);
                previewState = { outfit: null, hair: null, pet: undefined };
              }
              renderAll();
            });

            rowGrid.appendChild(box);
          });

        container.appendChild(rowGrid);
      });
    }

    // --- 3 CUSTOM PARENT REWARD SLOTS ---
    function renderParentRewards(container, gold) {
      const topBar = document.createElement("div");
      topBar.style.cssText =
        "display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:10px 14px;border-radius:12px;border:1px solid #334155;";

      const info = document.createElement("div");
      info.innerHTML =
        '<div style="font-weight:800;font-size:0.92rem;color:#fde047;">🌟 Real-World Parent Rewards!</div>' +
        '<div style="font-size:0.76rem;color:#94a3b8;">Solve math problems to save up gold and unlock real-life prizes set by your parents!</div>';

      const lockBtn = document.createElement("button");
      lockBtn.textContent = parentUnlocked ? "🔓 Lock Parent Mode" : "🔒 Parent Setup (PIN)";
      lockBtn.style.cssText =
        "padding:7px 12px;border-radius:8px;font-weight:800;font-size:0.78rem;cursor:pointer;border:1px solid #38bdf8;background:rgba(56,189,248,0.15);color:#38bdf8;flex-shrink:0;";

      lockBtn.addEventListener("click", () => {
        if (parentUnlocked) {
          parentUnlocked = false;
          renderAll();
          return;
        }
        const pin = prompt("Enter Parent PIN to customize rewards (Default PIN is 1234):");
        if (pin !== null && window.Economy.verifyPin(pin)) {
          parentUnlocked = true;
          renderAll();
        } else if (pin !== null) {
          alert("Incorrect PIN!");
        }
      });

      topBar.appendChild(info);
      topBar.appendChild(lockBtn);
      container.appendChild(topBar);

      const rewards = window.Economy.getParentRewards();

      rewards.forEach((r, idx) => {
        const cardRow = document.createElement("div");
        cardRow.style.cssText =
          "background:#1e293b;border:2px solid " +
          (r.claimed ? "#22c55e" : "#334155") +
          ";border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;";

        const pct = Math.min(100, Math.round((gold / Math.max(1, r.cost)) * 100));

        const rowTop = document.createElement("div");
        rowTop.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:12px;";

        const leftInfo = document.createElement("div");
        leftInfo.style.cssText = "display:flex;align-items:center;gap:12px;";
        leftInfo.innerHTML =
          '<div style="font-size:2rem;background:#0f172a;width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid #334155;">' +
          r.icon +
          "</div>" +
          "<div>" +
          '<div style="font-size:0.72rem;font-weight:800;color:#38bdf8;text-transform:uppercase;">Reward Slot #' +
          (idx + 1) +
          "</div>" +
          '<div style="font-size:1.05rem;font-weight:900;color:#f8fafc;">' +
          r.title +
          "</div>" +
          '<div style="font-size:0.8rem;color:#fde047;font-weight:700;">Goal: 🪙 ' +
          r.cost +
          " Gold (" +
          Math.min(gold, r.cost) +
          " / " +
          r.cost +
          ")</div>" +
          "</div>";

        const redeemBtn = document.createElement("button");
        const canClaim = !r.claimed && gold >= r.cost;
        redeemBtn.textContent = r.claimed
          ? "🎉 CLAIMED! (Show Parent)"
          : canClaim
          ? "🎁 Redeem Reward!"
          : "Need " + (r.cost - gold) + "g";
        redeemBtn.style.cssText =
          "padding:10px 16px;border-radius:10px;font-weight:900;font-size:0.85rem;border:none;cursor:" +
          (canClaim ? "pointer" : "default") +
          ";background:" +
          (r.claimed
            ? "rgba(34,197,94,0.25)"
            : canClaim
            ? "linear-gradient(135deg,#22c55e,#4ade80)"
            : "#0f172a") +
          ";color:" +
          (r.claimed ? "#4ade80" : canClaim ? "#0f172a" : "#64748b") +
          ";";

        redeemBtn.addEventListener("click", () => {
          if (!canClaim) return;
          if (confirm('Redeem "' + r.title + '" for ' + r.cost + " Gold?")) {
            window.Economy.claimParentReward(idx);
            renderAll();
          }
        });

        rowTop.appendChild(leftInfo);
        rowTop.appendChild(redeemBtn);

        // Progress Bar
        const barBg = document.createElement("div");
        barBg.style.cssText =
          "width:100%;height:10px;background:#0f172a;border-radius:999px;overflow:hidden;border:1px solid #334155;";
        const barFill = document.createElement("div");
        barFill.style.cssText =
          "height:100%;width:" +
          (r.claimed ? 100 : pct) +
          "%;background:linear-gradient(90deg, #38bdf8, #fbbf24);transition:width 0.3s;";
        barBg.appendChild(barFill);

        cardRow.appendChild(rowTop);
        cardRow.appendChild(barBg);

        // Parent Edit Controls (Visible when PIN unlocked)
        if (parentUnlocked) {
          const editBox = document.createElement("div");
          editBox.style.cssText =
            "margin-top:6px;padding-top:10px;border-top:1px dashed #475569;display:flex;gap:8px;flex-wrap:wrap;align-items:center;";

          const iconSelect = document.createElement("select");
          iconSelect.style.cssText =
            "background:#0f172a;color:#f8fafc;border:1px solid #475569;border-radius:8px;padding:6px;font-size:1rem;";
          REWARD_ICONS.forEach((emo) => {
            const opt = document.createElement("option");
            opt.value = emo;
            opt.textContent = emo;
            if (emo === r.icon) opt.selected = true;
            iconSelect.appendChild(opt);
          });

          const titleInput = document.createElement("input");
          titleInput.type = "text";
          titleInput.value = r.title;
          titleInput.placeholder = "Reward Title";
          titleInput.style.cssText =
            "flex:1;min-width:140px;background:#0f172a;color:#f8fafc;border:1px solid #475569;border-radius:8px;padding:6px 10px;font-size:0.85rem;";

          const costInput = document.createElement("input");
          costInput.type = "number";
          costInput.value = r.cost;
          costInput.style.cssText =
            "width:80px;background:#0f172a;color:#fde047;border:1px solid #475569;border-radius:8px;padding:6px 8px;font-size:0.85rem;font-weight:800;";

          const saveSlotBtn = document.createElement("button");
          saveSlotBtn.textContent = "💾 Save";
          saveSlotBtn.style.cssText =
            "background:#38bdf8;color:#0f172a;border:none;border-radius:8px;padding:6px 12px;font-weight:800;font-size:0.8rem;cursor:pointer;";

          saveSlotBtn.addEventListener("click", () => {
            window.Economy.updateParentRewardSlot(idx, {
              icon: iconSelect.value,
              title: titleInput.value,
              cost: costInput.value,
              claimed: false
            });
            renderAll();
          });

          editBox.appendChild(iconSelect);
          editBox.appendChild(titleInput);
          editBox.appendChild(costInput);
          editBox.appendChild(saveSlotBtn);
          cardRow.appendChild(editBox);
        }

        container.appendChild(cardRow);
      });
    }

    function close() {
      previewState = null;
      if (overlay.parentNode === modalLayer) modalLayer.removeChild(overlay);
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    renderAll();
  }

  window.addEventListener("ui-shop-clicked", openShop);
  return { open: openShop };
})();
