// avatar.js - Shared SVG Avatar & Pet Renderer
window.AvatarRenderer = (function () {
  function renderSVG(avatar, width = 140, height = 160) {
    const gender = avatar.gender || "girl";
    const skin = avatar.skinTone || "#fcd34d";
    const hairColor = avatar.hairColor || "#78350f";
    const eq = avatar.equipped || {};
    const catalog = window.Economy ? window.Economy.getCatalog() : null;

    let outfitObj = null;
    let hairObj = null;

    if (catalog) {
      const oList = catalog.outfits[gender] || [];
      const hList = catalog.hairs[gender] || [];
      outfitObj = oList.find((i) => i.id === eq[gender].outfit) || oList[0];
      hairObj = hList.find((i) => i.id === eq[gender].hair) || hList[0];
    }

    const primary = outfitObj ? outfitObj.primary : "#0284c7";
    const accent = outfitObj ? outfitObj.accent : "#38bdf8";
    const badge = outfitObj ? outfitObj.badge : "⭐";
    const style = hairObj ? hairObj.style : "pigtails";

    // Hair Back
    let hairBack = "";
    if (gender === "girl" && (style === "pigtails" || style === "buns" || style === "drills")) {
      hairBack = '<circle cx="45" cy="85" r="18" fill="' + hairColor + '" />' +
                 '<circle cx="135" cy="85" r="18" fill="' + hairColor + '" />' +
                 '<path d="M 50 80 C 35 110 40 140 55 145 C 62 130 62 100 60 80 Z" fill="' + hairColor + '" />';
    }

    // Hair Front
    let hairFront = "";
    if (gender === "girl") {
      hairFront = '<path d="M 58 70 C 58 38 122 38 122 70 C 110 55 95 62 90 52 C 85 62 70 55 58 70 Z" fill="' + hairColor + '" />' +
                  '<circle cx="52" cy="72" r="5" fill="' + accent + '" />' +
                  '<circle cx="128" cy="72" r="5" fill="' + accent + '" />';
    } else {
      hairFront = '<path d="M 55 78 C 50 44 80 34 90 38 C 98 30 112 34 118 42 C 132 44 134 62 128 76 C 120 58 105 54 90 56 C 75 54 62 60 55 78 Z" fill="' + hairColor + '" />';
    }

    // Eyes & Face
    const lashes = gender === "girl" ? '<line x1="70" y1="82" x2="66" y2="78" stroke="#0f172a" stroke-width="2.2" stroke-linecap="round" /><line x1="110" y1="82" x2="114" y2="78" stroke="#0f172a" stroke-width="2.2" stroke-linecap="round" />' : '';

    return '<svg viewBox="0 0 180 200" style="width: ' + width + 'px; height: ' + height + 'px; overflow: visible;">' +
      hairBack +
      // Body / Outfit
      '<path d="M 55 125 L 125 125 L 115 180 L 65 180 Z" fill="' + primary + '" stroke="#0f172a" stroke-width="3" stroke-linejoin="round" />' +
      '<circle cx="90" cy="148" r="14" fill="' + accent + '" />' +
      '<text x="90" y="154" font-size="14" text-anchor="middle">' + badge + '</text>' +
      // Head & Skin
      '<circle cx="90" cy="85" r="32" fill="' + skin + '" stroke="#0f172a" stroke-width="3" />' +
      hairFront +
      // Face Features
      '<circle cx="78" cy="85" r="4" fill="#0f172a" />' +
      '<circle cx="102" cy="85" r="4" fill="#0f172a" />' +
      lashes +
      '<path d="M 84 96 Q 90 102 96 96" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />' +
    '</svg>';
  }

  return { renderSVG };
})();
