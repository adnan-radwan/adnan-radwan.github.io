/* ============================================================
   GOLDEN ADS — CATEGORY PAGE ENGINE (Final Clean Version)
============================================================ */

/* 1) بناء شريط الفئات ديناميكيًا */
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


/* 2) تفعيل الانتقال إلى صفحة التصنيف */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-cat]").forEach(tab => {
    tab.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      const url = "https://www.adnan-radwan.net/p/category.html?cat=" + slug;
      window.open(url, "_blank");
    });
  });
});


/* 3) تحميل الإعلانات وعرضها حسب الفئة */
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("categoriesContainer");
  if (!container) return;

  // adsDB جاهز لأنك تستدعيه قبل هذا الملف في HTML
  categoriesDB.forEach(cat => {

    const ads = window.adsDB.filter(a => a.category === cat.slug);

    if (ads.length === 0) return;

    const section = document.createElement("div");
    section.className = "category-section";

    section.innerHTML = `
      <div class="section-title">${cat.icon} ${cat.name_ar} (${ads.length})</div>
      <div class="grid">
        ${ads.map(ad => `
          <a class="ad-card" href="${ad.link}" target="_blank">
            <img class="ad-img" src="${ad.img}">
            <div class="ad-title">${ad.title}</div>
            <div class="ad-desc">${ad.desc || ""}</div>
          </a>
        `).join("")}
      </div>
    `;

    container.appendChild(section);
  });

});
