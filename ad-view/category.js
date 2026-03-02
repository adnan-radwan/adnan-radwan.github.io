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
   2) التنقّل بين الفئات داخل نفس الصفحة
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      const slug = btn.getAttribute("data-cat");
      if (!slug) return;

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

  // إذا لم يتم تحديد فئة
  if (!slug) {
    titleEl.textContent = "جميع الإعلانات";
    gridEl.innerHTML = "<p>لم يتم اختيار فئة.</p>";
    return;
  }

  // جلب الفئة من قاعدة البيانات
  const cat = categoriesDB.find(c => c.slug === slug);

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

/* ===========================================
   GOLDEN ADS — Category Page Logic v6.2
   Official Stable Release — (Adnan Radwan)
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTS */
  const categoryTitleEl = document.getElementById("categoryTitle");
  const categoryCountEl = document.getElementById("categoryCount");
  const categoryGridEl  = document.getElementById("categoryGrid");

  /* قراءة التصنيف من URL */
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("cat");

  /* إذا لم يوجد تصنيف → عرض رسالة */
  if (!slug) {
    if (categoryTitleEl) categoryTitleEl.textContent = "تصنيف غير معروف";
    if (categoryGridEl) {
      categoryGridEl.innerHTML = `
        <div class="empty-msg">
          لم يتم تحديد أي تصنيف.
        </div>
      `;
    }
    return;
  }

  /* تحديث العنوان */
  if (categoryTitleEl) {
    categoryTitleEl.textContent = slug;
  }

  /* جلب الإعلانات */
  const filtered = GoldenAds.getAdsByCategory(slug);

  /* عرض الإعلانات */
  function renderCategoryPage(list) {
    if (!categoryGridEl) return;

    categoryGridEl.innerHTML = "";

    if (!list.length) {
      categoryGridEl.innerHTML = `
        <div class="empty-msg">
          لا توجد إعلانات في هذا التصنيف حاليًا.
        </div>
      `;
      if (categoryCountEl) categoryCountEl.textContent = "0 إعلان";
      return;
    }

    list.forEach(ad => {
      const card = GoldenAds.createAdCard(ad);
      categoryGridEl.appendChild(card);
    });

    if (categoryCountEl) {
      categoryCountEl.textContent = `${list.length} إعلان`;
    }
  }

  /* تشغيل العرض */
  renderCategoryPage(filtered);

  /* جعل الدالة متاحة للروتر */
  window.renderCategoryPage = renderCategoryPage;

  /* مؤثرات سينمائية */
  const revealElements = document.querySelectorAll(".cine-fade, .cine-slide");
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect().top;
      if (rect < trigger) el.classList.add("show");
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

});
