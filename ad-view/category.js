/* ===========================================
   CATEGORY PAGE — GOLDEN ADS (FINAL VERSION)
   Unified Cinematic System — 2026
=========================================== */

/* 1) قاعدة بيانات الفئات */
const categoriesDB = [
  { slug: "cars", name_ar: "سيارات", icon: "🚗" },
  { slug: "realestate", name_ar: "عقارات", icon: "🏠" },
  { slug: "jobs", name_ar: "وظائف", icon: "👔" },
  { slug: "services", name_ar: "خدمات", icon: "🛠" },
  { slug: "electronics", name_ar: "إلكترونيات", icon: "📱" },
  { slug: "fashion", name_ar: "أزياء", icon: "👗" },
  { slug: "beauty", name_ar: "جمال", icon: "💄" },
  { slug: "food", name_ar: "طعام", icon: "🍔" },
  { slug: "education", name_ar: "تعليم", icon: "🎓" },
  { slug: "health", name_ar: "صحة", icon: "🩺" },
  { slug: "decor", name_ar: "ديكور فاخر – Luxury Decor", icon: "🪑" },
  { slug: "shopping", name_ar: "تسوق", icon: "🛍" },
  { slug: "books", name_ar: "كتب", icon: "📚" },
  { slug: "stationery", name_ar: "مكتبيات", icon: "🖇" },
  { slug: "school-supplies", name_ar: "لوازم مدرسية", icon: "🎒" },
  { slug: "other", name_ar: "أخرى", icon: "📦" }
];

/* 2) تحويل slug → الاسم العربي */
function getCategoryName(slug) {
  const cat = categoriesDB.find(c => c.slug === slug);
  return cat ? cat.name_ar : slug;
}

/* 3) قراءة ?cat من الـ URL */
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("cat");
}

/* 4) رسم شريطَي الفئات */
function renderCategoriesBar(activeSlug) {
  const bar1 = document.getElementById("categoriesBar");
  const bar2 = document.getElementById("categoriesBar2");

  bar1.innerHTML = "";
  if (bar2) bar2.innerHTML = "";

  categoriesDB.forEach(cat => {
    const pill = document.createElement("div");
    pill.className = "ga-cat-pill" + (cat.slug === activeSlug ? " active" : "");
    pill.textContent = `${cat.icon} ${cat.name_ar}`;
    pill.dataset.slug = cat.slug;

    pill.addEventListener("click", () => updateCategory(cat.slug));

    bar1.appendChild(pill);

    if (bar2) {
      const pill2 = pill.cloneNode(true);
      pill2.addEventListener("click", () => updateCategory(cat.slug));
      bar2.appendChild(pill2);
    }
  });
}

/* 5) رسم الإعلانات — بترتيب الأحدث أولًا */
function renderCategoryAds(slug) {
  const grid = document.getElementById("catGrid");
  const titleEl = document.getElementById("catTitle");
  const subEl = document.getElementById("catSub");
  const iconEl = document.getElementById("catHeroIcon");

  const cat = categoriesDB.find(c => c.slug === slug);
  const name_ar = cat.name_ar;

  titleEl.textContent = name_ar;
  subEl.textContent = `عرض الإعلانات الحقيقية لفئة "${name_ar}"`;
  iconEl.textContent = cat.icon;

  let ads = GoldenAds.getAdsByCategory(name_ar);

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

/* 6) تحديث الصفحة بدون Reload */
function updateCategory(slug) {
  history.replaceState(null, "", "?cat=" + encodeURIComponent(slug));
  renderCategoriesBar(slug);
  renderCategoryAds(slug);
}

/* 7) تهيئة الصفحة */
document.addEventListener("DOMContentLoaded", () => {
  let slug = getSlugFromURL();

  if (!slug) {
    slug = categoriesDB[0].slug;
    history.replaceState(null, "", "?cat=" + encodeURIComponent(slug));
  }

  renderCategoriesBar(slug);
  renderCategoryAds(slug);

  /* 8) السحب بالماوس */
  const scrollBoxes = document.querySelectorAll(".ga-scroll-cats");

  scrollBoxes.forEach(scrollBox => {
    let isDown = false, startX, scrollLeft;

    scrollBox.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - scrollBox.offsetLeft;
      scrollLeft = scrollBox.scrollLeft;
    });

    scrollBox.addEventListener("mouseleave", () => isDown = false);
    scrollBox.addEventListener("mouseup", () => isDown = false);

    scrollBox.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollBox.offsetLeft;
      scrollBox.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  });
});
