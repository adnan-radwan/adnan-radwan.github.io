// ===============================
// بناء شريط الفئات ديناميكيًا
// ===============================
const bar = document.getElementById("categoriesBar");

bar.innerHTML = categoriesDB.map(cat => `
  <a class="cat-tab" data-cat="${cat.slug}">
    ${cat.icon} ${cat.name_ar}
  </a>
`).join("");


// ===============================
// تفعيل الانتقال إلى صفحة التصنيف
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cat-tab").forEach(tab => {
    tab.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      const url = "https://www.adnan-radwan.net/p/category.html?cat=" + slug;
      window.open(url, "_blank"); // فتح في تبويب جديد
    });
  });
});


// ===============================
// تحميل قاعدة بيانات الإعلانات
// ===============================
fetch("https://adnan-radwan.github.io/ad-view/adsDB.js")
  .then(() => {

    const container = document.getElementById("categoriesContainer");

    categoriesDB.forEach(cat => {

      const ads = window.adsDB.filter(a => a.category === cat.slug);

      if (ads.length === 0) return;

      const section = document.createElement("div");
      section.innerHTML = `
        <div class="section-title">${cat.icon} ${cat.name_ar} (${ads.length})</div>
        <div class="grid">
          ${ads.map(ad => `
            <a class="ad-card" href="${ad.link}" target="_blank">
              <img class="ad-img" src="${ad.img}">
              <div class="ad-title">${ad.title}</div>
              <div class="ad-desc">${ad.desc}</div>
            </a>
          `).join("")}
        </div>
      `;

      container.appendChild(section);
    });

  });
