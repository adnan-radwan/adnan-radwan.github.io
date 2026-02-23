// بناء شريط الفئات ديناميكيًا
const bar = document.getElementById("categoriesBar");
bar.innerHTML = categoriesDB.map(cat => `
  <a class="cat-tab" href="#${cat.slug}">
    ${cat.icon} ${cat.name_ar}
  </a>
`).join("");

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
            <a class="ad-card" href="${ad.link}">
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
  
window.categoriesDB = [
  { id: 1, slug: "electronics", name_ar: "إلكترونيات", icon: "📱" },
  { id: 2, slug: "fashion", name_ar: "أزياء", icon: "👗" },
  { id: 3, slug: "beauty", name_ar: "جمال", icon: "💄" },
  { id: 4, slug: "food", name_ar: "طعام", icon: "🍔" },
  { id: 5, slug: "realestate", name_ar: "عقارات", icon: "🏠" },
  { id: 6, slug: "cars", name_ar: "سيارات", icon: "🚗" },
  { id: 7, slug: "services", name_ar: "خدمات", icon: "🛠️" },
  { id: 8, slug: "education", name_ar: "تعليم", icon: "🎓" },
  { id: 9, slug: "health", name_ar: "صحة", icon: "🩺" },
  { id: 10, slug: "decor", name_ar: "ديكور", icon: "🪑" },
  { id: 11, slug: "shopping", name_ar: "تسوق", icon: "🛍️" },
  { id: 12, slug: "other", name_ar: "أخرى", icon: "✨" }
];

function renderCategories(targetId) {
  const box = document.getElementById(targetId);
  if (!box || !window.categoriesDB) return;

  let html = "";
  for (let i = 0; i < categoriesDB.length; i++) {
    const c = categoriesDB[i];
    html += `
      <div class="ga-cat-pill" data-cat="${c.slug}">
        <span class="icon">${c.icon}</span>
        <span class="text">${c.name_ar}</span>
      </div>
    `;
  }

  box.innerHTML = html;
}
  
document.addEventListener("DOMContentLoaded", () => {
  renderCategories("gaCatsScroll");
});
<script>
const CATEGORY_PAGE = "/p/categories.html"; // غيّرها للرابط الحقيقي لصفحة التصنيفات

function goToCategory(slug) {
  // ينقلك لصفحة التصنيفات مع البراميتر
  window.location.href = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);
}

document.addEventListener("DOMContentLoaded", function () {
  // أزرار التصنيفات في الرئيسية
  document.querySelectorAll(".ga-cat-pill").forEach(function (el) {
    el.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      if (slug) goToCategory(slug);
    });
  });

  // أزرار التصنيفات في صفحة التصنيفات (الشريط الثاني)
  document.querySelectorAll(".gaCatsScroll-pill").forEach(function (el) {
    el.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      if (slug) goToCategory(slug);
    });
  });
});
</script>
