// خريطة التصنيفات + الإيموجي
const CATEGORY_MAP = {
  tech:       { ar: "تقنية 💻",      en: "Tech 💻" },
  fashion:    { ar: "أزياء 👗",      en: "Fashion 👗" },
  beauty:     { ar: "جمال 💄",       en: "Beauty 💄" },
  food:       { ar: "طعام 🍽️",      en: "Food 🍽️" },
  realestate: { ar: "عقارات 🏠",     en: "Real Estate 🏠" },
  cars:       { ar: "سيارات 🚗",     en: "Cars 🚗" },
  services:   { ar: "خدمات 🛠️",     en: "Services 🛠️" },
  education:  { ar: "تعليم 🎓",      en: "Education 🎓" },
  health:     { ar: "صحة 🩺",        en: "Health 🩺" },
  home:       { ar: "منزل 🏡",       en: "Home 🏡" }
};

let ALL_ADS = [];
let CURRENT_CATEGORY = null;
let CATEGORY_PAGE = 1;
const PAGE_SIZE = 9;

// تبديل اللغة
function toggleLanguage() {
  document.body.classList.toggle("lang-en-active");
}

// تحميل الإعلانات من Supabase
async function loadCategoryAds() {
  try {
    const { data, error } = await supabaseClient
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading ads:", error);
      return;
    }

    ALL_ADS = data || [];
    setupCategoryTabs();
    renderCategorySection();
  } catch (e) {
    console.error("Unexpected error:", e);
  }
}

// إنشاء Tabs التصنيفات
function setupCategoryTabs() {
  const tabs = document.getElementById("ga-category-tabs");
  if (!tabs) return;

  tabs.innerHTML = `
    <button type="button" data-cat="" class="ga-cat-tab active">
      <span class="lang-ar">كل التصنيفات</span>
      <span class="lang-en">All Categories</span>
    </button>
  `;

  Object.keys(CATEGORY_MAP).forEach(key => {
    const c = CATEGORY_MAP[key];
    tabs.innerHTML += `
      <button type="button" data-cat="${key}" class="ga-cat-tab">
        <span class="lang-ar">${c.ar}</span>
        <span class="lang-en">${c.en}</span>
      </button>
    `;
  });

  tabs.querySelectorAll(".ga-cat-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.querySelectorAll(".ga-cat-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      CURRENT_CATEGORY = btn.getAttribute("data-cat") || null;
      CATEGORY_PAGE = 1;
      renderCategorySection();
    });
  });
}

// عرض الإعلانات + Pagination
function renderCategorySection() {
  const grid = document.getElementById("ga-category-grid");
  const pag  = document.getElementById("ga-category-pagination");

  if (!grid || !pag) return;

  let list = [...ALL_ADS];
  if (CURRENT_CATEGORY) {
    list = list.filter(ad => ad.category === CURRENT_CATEGORY);
  }

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  if (CATEGORY_PAGE > totalPages) CATEGORY_PAGE = totalPages;

  const start = (CATEGORY_PAGE - 1) * PAGE_SIZE;
  const pageItems = list.slice(start, start + PAGE_SIZE);

  grid.innerHTML = "";
  pageItems.forEach(ad => {
    const cat = CATEGORY_MAP[ad.category] || { ar: "إعلان", en: "Ad" };
    grid.innerHTML += `
      <article class="ga-card" onclick="viewOfficialAd('${ad.id}')">
        <div class="ga-card-tag">
          <span class="ga-card-tag-dot"></span>
          <span class="lang-ar">${cat.ar}</span>
          <span class="lang-en">${cat.en}</span>
        </div>
        <h3 class="ga-card-title">${ad.title}</h3>
        <p class="ga-card-text">${ad.description || ""}</p>
        <div class="ga-card-meta">
          <span>${new Date(ad.created_at).toLocaleDateString()}</span>
          <span class="ga-pill">
            <span class="lang-ar">عرض</span>
            <span class="lang-en">View</span>
          </span>
        </div>
      </article>
    `;
  });

  // Pagination
  pag.innerHTML = "";
  if (totalPages <= 1) return;

  if (CATEGORY_PAGE > 1)
    pag.innerHTML += `<button data-page="${CATEGORY_PAGE - 1}">‹</button>`;

  for (let p = 1; p <= totalPages; p++) {
    pag.innerHTML += `
      <button data-page="${p}" style="${p === CATEGORY_PAGE ? 'border-color:rgba(245,210,122,0.9);' : ''}">
        ${p}
      </button>
    `;
  }

  if (CATEGORY_PAGE < totalPages)
    pag.innerHTML += `<button data-page="${CATEGORY_PAGE + 1}">›</button>`;

  pag.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      CATEGORY_PAGE = parseInt(btn.getAttribute("data-page"), 10);
      renderCategorySection();
    });
  });
}

// فتح صفحة الإعلان
function viewOfficialAd(id) {
  window.location.href = "/ad-view/ad-details.html?id=" + id;
}

// تشغيل النظام
loadCategoryAds();
