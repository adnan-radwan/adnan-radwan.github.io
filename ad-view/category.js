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
