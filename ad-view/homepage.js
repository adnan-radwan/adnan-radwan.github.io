/* ================================
   HOME PAGE — GOLDEN ADS
   Unified with ad-view system
================================ */

/* 1) تحميل أحدث الإعلانات */
function renderLatestAds() {
  const grid = document.getElementById("latestGrid");
  if (!grid) return;

  let ads = GoldenAds.getAllAds();

  ads = ads.sort((a, b) => {
    const dateA = new Date(a.expires || a.created_at || 0);
    const dateB = new Date(b.expires || b.created_at || 0);
    return dateB - dateA;
  });

  const latest = ads.slice(0, 12);

  grid.innerHTML = "";
  latest.forEach(ad => {
    grid.appendChild(GoldenAds.createAdCard(ad));
  });
}

/* 2) عرض فئة معينة */
function renderCategoryBlock(categoryName, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  let ads = GoldenAds.getAdsByCategory(categoryName);

  ads = ads.sort((a, b) => {
    const dateA = new Date(a.expires || a.created_at || 0);
    const dateB = new Date(b.expires || b.created_at || 0);
    return dateB - dateA;
  });

  const subset = ads.slice(0, 8);

  grid.innerHTML = "";
  subset.forEach(ad => {
    grid.appendChild(GoldenAds.createAdCard(ad));
  });
}

/* 3) تهيئة الصفحة */
document.addEventListener("DOMContentLoaded", () => {
  renderLatestAds();
  renderCategoryBlock("سيارات", "carsGrid");
  renderCategoryBlock("عقارات", "realestateGrid");
});
