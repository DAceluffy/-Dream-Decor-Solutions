/**
 * ==============================================================================
 * DREAM DECOR SOLUTIONS (DDS) — OFFICIAL CATALOGUE & MATERIALS PORTAL
 * Powered by Real DDS Catalogues:
 * 1. DDS WPC Louvers (6.5" x 9.5 Ft, 23mm/17mm)
 * 2. DDS Premium Fluted Panels (10 Ft x 1 Ft, 10mm - GPL & GPR Series)
 * 3. DDS PVC Wall & Ceiling Panels (10 Ft x 10", 8mm/6mm Super Heavy)
 * ==============================================================================
 */

const DDS_CONFIG = {
  // Official Business Profile
  business: {
    name: "Dream Decor Solutions",
    shortName: "DDS",
    tagline: "Interior & Exterior Architectural Building Materials Supplier",
    subTagline: "Direct Wholesale & Project Supply of WPC Louvers, Premium Fluted Panels, PVC Wall & Ceiling Panels & Charcoal Sheets.",
  },

  // Verified Client Contact Details
  contact: {
    phoneDisplay: "+91 98359 45334",
    phoneDial: "+919835945334",
    whatsappNumber: "919835945334",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dream%20decor%20solutions&query_place_id=ChIJ8QoubJWh8jkREgk38T_E9hI",
    email: "dreamdecorsolutions@gmail.com",
    workingHours: "Monday to Saturday: 9:30 AM to 8:00 PM"
  },

  // Official PDF Catalogues for direct 1-click download
  catalogues: [
    {
      id: "fluted",
      name: "DDS Premium Fluted Panel (September 2026 Edition)",
      size: "24.5 MB",
      pages: "21 Pages",
      specs: "10 FT x 1 FT • Thickness: 10 MM",
      highlights: "GPL Marble & Gold Series, GPR Slat Series, Rose Gold Luxury Panels",
      downloadPath: "catalogues/DDS.FLUTED.PANEL.september26.pdf",
      coverImage: "catalog_pages/DDS.FLUTED.PANEL.september26_p01.jpg"
    },
    {
      id: "wpc",
      name: "DDS WPC Louvers (September 2026 Edition)",
      size: "11.0 MB",
      pages: "10 Pages",
      specs: "6.5 Inch x 9.5 FT • Thickness: 23 MM & 17 MM",
      highlights: "Heavy-Duty W-01 to W-06 Series (23mm), EG-01 to EG-03 Series (17mm)",
      downloadPath: "catalogues/DDS_WPC_September26.pdf",
      coverImage: "catalog_pages/DDS_WPC_September26_p01.jpg"
    },
    {
      id: "pvc",
      name: "DDS PVC Wall & Ceiling Panel (October 2026 Edition)",
      size: "23.1 MB",
      pages: "34 Pages",
      specs: "10 FT x 10 Inch • Thickness: 8 MM & 6 MM Super Heavy",
      highlights: "Ceiling Series, Wall Series (DPL-01 to DPL-45), Super Heavy (DPL-74, YDS Series)",
      downloadPath: "catalogues/DDS.PVC.panel. October.26.pdf",
      coverImage: "catalog_pages/DDS.PVC.panel. October.26_p01.jpg"
    }
  ]
};

// Global Store for Catalogue Items
let ALL_CATALOG_ITEMS = [];

// DOM Ready
document.addEventListener("DOMContentLoaded", async () => {
  initDynamicContactLinks();
  await loadCatalogueItems();
  initCatalogueTabs();
  initSearch();
  initBOQCalculator();
  initLightbox();
  initMobileDrawer();
});

/**
 * Bind verified contact details across all buttons, telephone links and WhatsApp links
 */
function initDynamicContactLinks() {
  const c = DDS_CONFIG.contact;

  // Phone numbers
  document.querySelectorAll("[data-cfg-phone]").forEach(el => el.textContent = c.phoneDisplay);
  document.querySelectorAll("[data-cfg-phone-href]").forEach(el => el.setAttribute("href", `tel:${c.phoneDial}`));

  // Google Maps links
  document.querySelectorAll("[data-cfg-map-href]").forEach(el => el.setAttribute("href", c.googleMapsUrl));

  // WhatsApp general links
  const defaultMsg = "Namaste Dream Decor Solutions, maine aapki website dekhi aur mujhe WPC Louvers, Fluted Panels aur PVC Panels ke wholesale rate aur catalogue chahiye.";
  const waUrl = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;
  document.querySelectorAll("[data-cfg-wa-general]").forEach(el => el.setAttribute("href", waUrl));
}

/**
 * Fetch catalog_data.json and render grid
 */
async function loadCatalogueItems() {
  try {
    const res = await fetch("catalog_data.json");
    if (!res.ok) throw new Error("Could not load catalog_data.json");
    ALL_CATALOG_ITEMS = await res.json();
    renderCatalogueGrid("all");
    updateCounterBadges();
  } catch (err) {
    console.error("Error loading catalogue items:", err);
    // Fallback if fetch fails (e.g. file protocol)
    renderCatalogueGridFallback();
  }
}

/**
 * Render catalogue grid with real pages, codes, sizes and instant WhatsApp enquiry buttons
 */
function renderCatalogueGrid(category = "all", searchTerm = "") {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = ALL_CATALOG_ITEMS.filter(item => {
    const matchCat = category === "all" || item.category === category;
    const matchSearch = !searchTerm || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.raw_text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-dds-charcoal-700 bg-white rounded-3xl border border-dds-cream-300 p-8">
        <i class="fa-solid fa-magnifying-glass text-3xl text-dds-gold-500 mb-3 block"></i>
        <h4 class="font-bold text-lg text-dds-espresso-950">Koi match nahi mila</h4>
        <p class="text-xs text-dds-charcoal-700 mt-1">Dusra code (jaise GPL-01, W-01, DPL-06) search karein ya direct WhatsApp par photo bhejein.</p>
        <a href="#" data-cfg-wa-general target="_blank" class="dds-btn-whatsapp mt-4 inline-flex text-xs py-2.5 px-5">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp par Code Check Karein
        </a>
      </div>
    `;
    return;
  }

  filtered.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "group bg-white rounded-2xl overflow-hidden border border-dds-cream-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between";

    // Clean display title & code
    const displayCode = item.code.replace(/_/g, " ");
    const waItemMsg = `Namaste Dream Decor Solutions, mujhe is product ka wholesale rate aur stock check karna hai:\n*Code/Design:* ${displayCode}\n*Category:* ${item.title}\n*Size:* ${item.size} (${item.thickness})\nKripya rate aur minimum order quantity batayein.`;
    const waItemUrl = `https://wa.me/${DDS_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waItemMsg)}`;

    card.innerHTML = `
      <div>
        <!-- Image Preview / Lightbox Trigger -->
        <div class="relative h-72 sm:h-80 overflow-hidden bg-black cursor-pointer" onclick="openCatalogueLightbox('${item.image}', '${displayCode}', '${item.title}', '${item.size}', '${item.thickness}')">
          <img 
            src="${item.image}" 
            alt="${displayCode} - ${item.title}" 
            loading="lazy"
            class="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span class="text-xs text-white font-semibold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              <i class="fa-solid fa-expand text-dds-gold-400"></i> Click to Zoom Page
            </span>
          </div>

          <!-- Badge: Category -->
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-dds-espresso-950/85 backdrop-blur-md text-dds-gold-400 border border-white/15">
            ${item.category.toUpperCase()}
          </span>

          <!-- Badge: Code -->
          <span class="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/95 text-dds-espresso-950 shadow">
            ${displayCode}
          </span>
        </div>

        <!-- Details -->
        <div class="p-4 sm:p-5 space-y-2 border-t border-dds-cream-200">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase tracking-wider text-dds-walnut">${item.title}</span>
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Ready Stock</span>
          </div>
          
          <h4 class="font-serif font-bold text-base text-dds-espresso-950">
            Design Code: <span class="text-dds-gold-600">${displayCode}</span>
          </h4>

          <div class="pt-1 pb-2 text-xs text-dds-charcoal-700 space-y-1 font-mono border-b border-dds-cream-200">
            <div class="flex justify-between">
              <span class="text-dds-charcoal-700/70">Standard Size:</span>
              <strong class="text-dds-espresso-950">${item.size}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-dds-charcoal-700/70">Thickness:</span>
              <strong class="text-dds-espresso-950">${item.thickness}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-4 sm:p-5 pt-0">
        <a 
          href="${waItemUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full dds-btn-whatsapp text-xs py-2.5 px-4 text-center justify-center font-bold"
        >
          <i class="fa-brands fa-whatsapp text-base"></i>
          <span>Check Rate for ${displayCode}</span>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Filter Tabs Controller
 */
function initCatalogueTabs() {
  const tabs = document.querySelectorAll(".cat-filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("active", "bg-dds-espresso-950", "text-white");
        t.classList.add("bg-white", "text-dds-charcoal-700");
      });
      tab.classList.add("active", "bg-dds-espresso-950", "text-white");
      tab.classList.remove("bg-white", "text-dds-charcoal-700");

      const category = tab.getAttribute("data-cat");
      const searchVal = document.getElementById("catalogSearchInput")?.value || "";
      renderCatalogueGrid(category, searchVal);
    });
  });
}

/**
 * Search Bar Controller
 */
function initSearch() {
  const input = document.getElementById("catalogSearchInput");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const activeTab = document.querySelector(".cat-filter-tab.active");
    const activeCat = activeTab ? activeTab.getAttribute("data-cat") : "all";
    renderCatalogueGrid(activeCat, val);
  });
}

function updateCounterBadges() {
  const totalCount = ALL_CATALOG_ITEMS.length;
  const wpcCount = ALL_CATALOG_ITEMS.filter(i => i.category === "wpc").length;
  const flutedCount = ALL_CATALOG_ITEMS.filter(i => i.category === "fluted").length;
  const pvcCount = ALL_CATALOG_ITEMS.filter(i => i.category === "pvc").length;

  const bAll = document.getElementById("badgeCountAll");
  const bWpc = document.getElementById("badgeCountWpc");
  const bFluted = document.getElementById("badgeCountFluted");
  const bPvc = document.getElementById("badgeCountPvc");

  if (bAll) bAll.textContent = totalCount;
  if (bWpc) bWpc.textContent = wpcCount;
  if (bFluted) bFluted.textContent = flutedCount;
  if (bPvc) bPvc.textContent = pvcCount;
}

/**
 * Real Material BOQ / Panel Quantity Calculator for Customer & Contractor
 */
function initBOQCalculator() {
  const matSelect = document.getElementById("boqMaterial");
  const widthInput = document.getElementById("boqWidth");
  const heightInput = document.getElementById("boqHeight");
  const appSelect = document.getElementById("boqApplication");

  const calc = () => {
    const mat = matSelect?.value || "fluted";
    const width = parseFloat(widthInput?.value || 10);
    const height = parseFloat(heightInput?.value || 10);

    const netSqFt = Math.round(width * height);
    const withWastage = Math.round(netSqFt * 1.10); // +10% cutting safety

    let panelCoverage = 10.0; // Fluted panel = 10 ft x 1 ft = 10 sq.ft
    let panelName = "Fluted Panels (10 ft x 1 ft, 10mm)";

    if (mat === "wpc") {
      panelCoverage = 5.14; // WPC Louver: 6.5 inches = 0.541 ft x 9.5 ft = ~5.14 sq.ft
      panelName = "WPC Louvers (6.5 in x 9.5 ft, 23mm)";
    } else if (mat === "pvc") {
      panelCoverage = 8.33; // PVC Panel: 10 inches = 0.833 ft x 10 ft = ~8.33 sq.ft
      panelName = "PVC Panels (10 in x 10 ft, 8mm)";
    }

    const panelsRequired = Math.ceil(withWastage / panelCoverage);

    const outArea = document.getElementById("boqAreaResult");
    const outPanels = document.getElementById("boqPanelsResult");
    const outName = document.getElementById("boqPanelNameResult");

    if (outArea) outArea.textContent = `${netSqFt} sq.ft (${withWastage} sq.ft with 10% safety)`;
    if (outPanels) outPanels.textContent = `${panelsRequired} Panels`;
    if (outName) outName.textContent = panelName;
  };

  matSelect?.addEventListener("change", calc);
  widthInput?.addEventListener("input", calc);
  heightInput?.addEventListener("input", calc);
  appSelect?.addEventListener("change", calc);

  calc();
}

function sendCalculatedBOQToWhatsApp() {
  const matSelect = document.getElementById("boqMaterial");
  const widthInput = document.getElementById("boqWidth");
  const heightInput = document.getElementById("boqHeight");
  const appSelect = document.getElementById("boqApplication");
  const panels = document.getElementById("boqPanelsResult")?.textContent || "Calculated Panels";
  const area = document.getElementById("boqAreaResult")?.textContent || "Area";

  const msg = `*Dream Decor Solutions — Wall/Ceiling Panel Calculation*\n` +
    `📌 Material: ${matSelect?.options[matSelect.selectedIndex]?.text}\n` +
    `📐 Room/Application: ${appSelect?.value}\n` +
    `📏 Dimensions: ${widthInput?.value} FT (Width) x ${heightInput?.value} FT (Height)\n` +
    `📊 Net Area: ${area}\n` +
    `📦 Required Panels: *${panels}*\n\n` +
    `Kripya is requirement ka best wholesale quotation aur delivery timeline batayein.`;

  window.open(`https://wa.me/${DDS_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
}

/**
 * Lightbox Modal Controller
 */
function openCatalogueLightbox(imgUrl, code, title, size, thickness) {
  const modal = document.getElementById("catalogLightboxModal");
  const imgEl = document.getElementById("lightboxImage");
  const titleEl = document.getElementById("lightboxTitle");
  const specsEl = document.getElementById("lightboxSpecs");
  const waBtn = document.getElementById("lightboxWaBtn");

  if (!modal) return;

  if (imgEl) imgEl.src = imgUrl;
  if (titleEl) titleEl.textContent = `${title} — Code: ${code}`;
  if (specsEl) specsEl.textContent = `Standard Size: ${size} | Thickness: ${thickness}`;

  if (waBtn) {
    const msg = `Namaste Dream Decor Solutions, mujhe is catalogue design ka rate janna hai:\n*Code:* ${code}\n*Type:* ${title}\n*Size:* ${size} (${thickness})`;
    waBtn.href = `https://wa.me/${DDS_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCatalogueLightbox() {
  const modal = document.getElementById("catalogLightboxModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function initLightbox() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCatalogueLightbox();
  });
}

/**
 * Mobile Drawer Menu
 */
function initMobileDrawer() {
  const toggle = document.getElementById("ddsNavToggle");
  const drawer = document.getElementById("ddsMobileDrawer");
  const closeBtn = document.getElementById("ddsCloseDrawer");

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      drawer.classList.remove("translate-x-full");
      document.body.style.overflow = "hidden";
    });
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.add("translate-x-full");
      document.body.style.overflow = "";
    }
  }

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  document.querySelectorAll(".dds-drawer-link").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

function renderCatalogueGridFallback() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = `
    <div class="col-span-full py-10 text-center">
      <p class="text-sm text-dds-charcoal-700">Loading full catalogue... Aap directly hamare 3 catalogues PDF download kar sakte hain.</p>
    </div>
  `;
}
