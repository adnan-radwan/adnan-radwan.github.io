/* ===========================================
   GOLDEN ADS — Core Engine v6.2
   Official Stable Release — (Adnan Radwan)
=========================================== */

window.GoldenAds = (function () {
  "use strict";

  /* -------------------------------------------
     1) ترتيب الإعلانات حسب ID
  ------------------------------------------- */
  const ads = (window.allAds || []).slice().sort((a, b) => a.id - b.id);

  /* -------------------------------------------
     2) تحويل تاريخ الانتهاء إلى Date
  ------------------------------------------- */
  function parseDate(dateStr) {
    return new Date(dateStr + "T23:59:59Z");
  }

  /* -------------------------------------------
     3) التحقق من أن الإعلان نشط
  ------------------------------------------- */
  function isActive(ad) {
    if (!ad || ad.status !== "active" || !ad.expires) return false;
    return parseDate(ad.expires) >= new Date();
  }

  /* -------------------------------------------
     4) جميع الإعلانات النشطة
  ------------------------------------------- */
  function getAllActiveAds() {
    return ads.filter(isActive);
  }

  /* -------------------------------------------
     5) الإعلانات المميزة (featured = true)
  ------------------------------------------- */
  function getFeaturedAds() {
    return getAllActiveAds().filter(ad => ad.featured === true);
  }

  /* -------------------------------------------
     6) الإعلانات حسب التصنيف
  ------------------------------------------- */
  function getAdsByCategory(category) {
    return getAllActiveAds().filter(ad => ad.category === category);
  }

  /* -------------------------------------------
     7) أحدث الإعلانات (مرتبة حسب تاريخ الانتهاء)
  ------------------------------------------- */
  function getLatestAds(limit = 20) {
    return getAllActiveAds()
      .sort((a, b) => new Date(b.expires) - new Date(a.expires))
      .slice(0, limit);
  }

  /* -------------------------------------------
     8) إنشاء كرت إعلان موحّد (ga-card)
  ------------------------------------------- */
  function createAdCard(ad, options = {}) {
    const card = document.createElement("a");
    card.className = "ga-card";

    // وضع شريط FEATURED إذا كان الإعلان مميزًا
    if (options.featuredMode) {
      card.classList.add("featured-mode");
    }

    card.href = ad.link || "#";

    card.innerHTML = `
      <div class="ga-card-img">
        <img src="${ad.image}" alt="${ad.title}">
        <span class="ga-badge">${ad.badge || "gold"}</span>
      </div>

      <div class="ga-card-body">
        <h3 class="ga-title">${ad.title}</h3>
        <p class="ga-desc">${ad.desc}</p>

        <div class="ga-meta">
          <span class="ga-cat">${ad.category}</span>
          <span class="ga-exp">${ad.expires ? "ينتهي: " + ad.expires : ""}</span>
        </div>
      </div>
    `;

    return card;
  }

  /* -------------------------------------------
     9) عرض قائمة إعلانات داخل عنصر معيّن
  ------------------------------------------- */
  function renderAds(containerId, list, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    list.forEach(ad => container.appendChild(createAdCard(ad, options)));
  }

  /* -------------------------------------------
     10) واجهة الـ API الرسمية
  ------------------------------------------- */
  return {
    getAllActiveAds,
    getFeaturedAds,
    getAdsByCategory,
    getLatestAds,
    renderAds,
    createAdCard
  };
})();
