/* ===========================================
   AD VIEW PAGE — GOLDEN ADS (Unified 2026)
   عرض إعلان واحد + إعلانات مشابهة
=========================================== */

/* 1) قراءة ID من الرابط */
function getAdIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/* 2) عرض الإعلان الرئيسي */
function renderAdView(ad) {
  const titleEl = document.getElementById("adTitle");
  const priceEl = document.getElementById("adPrice");
  const locEl = document.getElementById("adLocation");
  const imgEl = document.getElementById("adImage");
  const descEl = document.getElementById("adDescription");
  const catEl = document.getElementById("adCategory");

  titleEl.textContent = ad.title;
  priceEl.textContent = ad.price ? ad.price + " USD" : "—";
  locEl.textContent = ad.location || "—";
  descEl.textContent = ad.description || "—";
  imgEl.src = ad.image || "/ad-view/no-image.png";

  // عرض اسم الفئة من categoriesDB
  catEl.textContent = ad.category || "—";
}

/* 3) عرض إعلانات مشابهة */
function renderSimilarAds(ad) {
  const grid = document.getElementById("similarGrid");
  if (!grid) return;

  let ads = GoldenAds.getAdsByCategory(ad.category);

  // استبعاد الإعلان الحالي
  ads = ads.filter(a => a.id !== ad.id);

  // ترتيب الأحدث أولًا
  ads = ads.sort((a, b) => {
    const dateA = new Date(a.expires || a.created_at || 0);
    const dateB = new Date(b.expires || b.created_at || 0);
    return dateB - dateA;
  });

  // نعرض 6 فقط
  const subset = ads.slice(0, 6);

  grid.innerHTML = "";
  subset.forEach(a => {
    grid.appendChild(GoldenAds.createAdCard(a));
  });
}

/* 4) تهيئة الصفحة */
document.addEventListener("DOMContentLoaded", () => {
  const id = getAdIdFromURL();
  if (!id) return;

  const ad = GoldenAds.getAdById(id);
  if (!ad) {
    console.error("❌ الإعلان غير موجود");
    return;
  }

  renderAdView(ad);
  renderSimilarAds(ad);
});
