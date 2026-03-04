/* ===========================================
   CATEGORY PAGE — GOLDEN ADS (Unified 2026)
   عرض الإعلانات حسب الفئة + شريط الفئات
=========================================== */

/* 1) قراءة slug من الرابط */
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("cat");
}

/* 2) عرض الهيرو */
function renderHero(category) {
  const titleEl = document.getElementById("catTitle");
  const subEl = document.getElementById("catSub");
  const iconEl = document.getElementById("catHeroIcon");

  titleEl.textContent = category.name_ar;
  subEl.textContent = `جميع إعلانات فئة ${category.name_ar}`;
  iconEl.textContent = category.icon;
}

/* 3) عرض شريط الفئات */
function renderCategoriesBar() {
  const bar1 = document.getElementById("categoriesBar");
  const bar2 = document.getElementById("categoriesBar2");

  if (!bar1 || !bar2) return;

  window.categoriesDB.forEach(cat => {
    const item = document.createElement("div");
    item.className = "ga-cat-item";
    item.textContent = `${cat.icon} ${cat.name_ar}`;
    item.onclick = () => {
      window.location.href = `/ad-view/category.html?cat=${cat.slug}`;
    };

    bar1.appendChild(item.cloneNode(true));
    bar2.appendChild(item);
  });
}

/* 4) عرض الإعلانات حسب الفئة */
function renderCategoryAds(category) {
  const grid = document.getElementById("catGrid");
  if (!grid) return;

  let ads = GoldenAds.getAdsByCategory(category.name_ar);

  ads = ads.sort((a, b) => {
    const dateA = new Date(a.expires || a.created_at || 0);
    const dateB = new Date(b.expires || b.created_at || 0);
    return dateB - dateA;
  });

  grid.innerHTML = "";
  ads.forEach(ad => {
    grid.appendChild(GoldenAds.createAdCard(ad));
  });
}

/* 5) تهيئة الصفحة */
document.addEventListener("DOMContentLoaded", () => {
  const slug = getSlugFromURL();
  if (!slug) return;

  const category = window.categoriesDB.find(c => c.slug === slug);
  if (!category) return;

  renderHero(category);
  renderCategoriesBar();
  renderCategoryAds(category);
});
