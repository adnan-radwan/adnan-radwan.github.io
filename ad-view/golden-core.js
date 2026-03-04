/* ===========================================
   GOLDEN ADS — CORE ENGINE (Unified 2026)
   محرك موحّد لكل الصفحات
=========================================== */

/* 1) التأكد من وجود قاعدة البيانات */
if (!window.allAds) {
  console.error("❌ ERROR: adsDB.js لم يتم تحميله — window.allAds غير موجود");
  window.allAds = [];
}

if (!window.categoriesDB) {
  console.error("❌ ERROR: categoriesDB.js لم يتم تحميله — window.categoriesDB غير موجود");
  window.categoriesDB = [];
}

/* 2) إنشاء خريطة slug → الاسم العربي (إن لم تكن موجودة) */
if (!window.categorySlugMap) {
  window.categorySlugMap = {};
  window.categoriesDB.forEach(cat => {
    window.categorySlugMap[cat.slug] = cat.name_ar;
  });
}

/* 3) محرك GOLDEN ADS */
window.GoldenAds = {

  /* جلب كل الإعلانات */
  getAllAds() {
    return window.allAds || [];
  },

  /* جلب إعلان واحد عبر ID */
  getAdById(id) {
    return window.allAds.find(ad => String(ad.id) === String(id));
  },

  /* جلب الإعلانات حسب الفئة (بالاسم العربي) */
  getAdsByCategory(categoryName) {
    return window.allAds.filter(ad => ad.category === categoryName);
  },

  /* إنشاء بطاقة إعلان موحّدة */
  createAdCard(ad) {
    const card = document.createElement("div");
    card.className = "ga-ad-card";

    card.innerHTML = `
      <div class="ga-ad-img">
        <img src="${ad.image || '/ad-view/no-image.png'}" alt="${ad.title}">
      </div>

      <div class="ga-ad-body">
        <h3 class="ga-ad-title">${ad.title}</h3>
        <p class="ga-ad-price">${ad.price ? ad.price + " USD" : "—"}</p>
        <p class="ga-ad-loc">${ad.location || "—"}</p>
      </div>

      <a class="ga-ad-link" href="/ad-view/ad-details.html?id=${ad.id}"></a>
    `;

    return card;
  }
};
