/* ============================================================
   GOLDEN ADS — CATEGORY PAGE ENGINE v8.0
   Clean • Unified • Single-Category Mode
============================================================ */

/* -----------------------------------------
   1) بناء شريط الفئات ديناميكيًا
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("categoriesBar");
  if (!bar || !window.categoriesDB) return;

  bar.innerHTML = categoriesDB.map(cat => `
    <div class="ga-cat-pill" data-cat="${cat.slug}">
      <span class="icon">${cat.icon}</span>
      <span class="text">${cat.name_ar}</span>
    </div>
  `).join("");
});

/* -----------------------------------------
   2) تفعيل الانتقال بين الفئات (نفس الصفحة)
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      const slug = btn.getAttribute("data-cat");
      if (!slug) return;

      // الانتقال داخل نفس الصفحة
      const url = "https://www.adnan-radwan.net/p/category.html?cat=" + slug;
      window.location.href = url;
    });
  });
});

/* -----------------------------------------
   3) قراءة ?cat وعرض الإعلانات الخاصة بها فقط
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("cat");

  const titleEl = document.getElementById("catTitle");
  const gridEl = document.getElementById("catGrid");

  if (!titleEl || !gridEl) return;

  // إذا لم يتم تحديد فئة → عرض رسالة
  if (!slug) {
    titleEl.textContent = "جميع الإعلانات";
    gridEl.innerHTML = "<p>لم يتم اختيار فئة.</p>";
    return;
  }

  // جلب الفئة من قاعدة البيانات
  const cat = categoriesDB.find(c => c.slug === slug);

  // إذا الفئة غير موجودة
  if (!cat) {
    titleEl.textContent = "فئة غير موجودة";
    gridEl.innerHTML = "<p>لا توجد فئة بهذا الاسم.</p>";
    return;
  }

  // عرض اسم الفئة
  titleEl.textContent = `${cat.icon} ${cat.name_ar}`;

  // فلترة الإعلانات
  const filtered = adsDB.filter(ad =>
    ad.category === slug && ad.status === "active"
  );

  // عرض الإعلانات
  if (filtered.length === 0) {
    gridEl.innerHTML = "<p>لا توجد إعلانات في هذه الفئة.</p>";
    return;
  }

  gridEl.innerHTML = filtered.map(ad => `
    <a class="ad-card" href="${ad.link}" target="_blank">
      <img class="ad-img" src="${ad.img}">
      <div class="ad-title">${ad.title}</div>
      <div class="ad-desc">${ad.desc || ""}</div>
    </a>
  `).join("");
});
