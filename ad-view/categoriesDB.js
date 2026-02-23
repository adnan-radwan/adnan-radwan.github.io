var categoriesDB = [
   {
    id: 1,
    slug: "electronics",
    name_ar: "إلكترونيات",
    name_en: "Electronics",
    icon: "📱"
  },
  {
    id: 2,
    slug: "fashion",
    name_ar: "أزياء",
    name_en: "Fashion",
    icon: "👗"
  },
  {
    id: 3,
    slug: "beauty",
    name_ar: "جمال",
    name_en: "Beauty",
    icon: "💄"
  },
  {
    id: 4,
    slug: "food",
    name_ar: "طعام",
    name_en: "Food",
    icon: "🍔"
  },
  {
    id: 5,
    slug: "realestate",
    name_ar: "عقارات",
    name_en: "Real Estate",
    icon: "🏠"
  },
  {
    id: 6,
    slug: "cars",
    name_ar: "سيارات",
    name_en: "Cars",
    icon: "🚗"
  },
  {
    id: 7,
    slug: "services",
    name_ar: "خدمات",
    name_en: "Services",
    icon: "🛠️"
  },
  {
    id: 8,
    slug: "education",
    name_ar: "تعليم",
    name_en: "Education",
    icon: "🎓"
  },
  {
    id: 9,
    slug: "health",
    name_ar: "صحة",
    name_en: "Health",
    icon: "🩺"
  },
  {
    id: 10,
    slug: "decor",
    name_ar: "ديكور",
    name_en: "Decor",
    icon: "🪑"
  },
  {
    id: 11,
    slug: "shopping",
    name_ar: "تسوق",
    name_en: "Shopping",
    icon: "🛍️"
  },
  {
    id: 12,
    slug: "other",
    name_ar: "أخرى",
    name_en: "Other",
    icon: "✨"
  }
];

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

function renderCategoriesHome() {
  const box = document.getElementById("gaCatsBar");
  if (!box) return;

  const list = getSmartCategories();
  let html = "";

  list.forEach(c => {
    html += `
      <div class="ga-cat-pill" data-cat="${c.slug}">
        <span class="icon">${c.icon}</span>
        <span class="text">${c.name_ar}</span>
      </div>
    `;
  });

  box.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderCategoriesHome);

function renderCategoriesPage() {
  const box = document.getElementById("gaCatsScroll");
  if (!box) return;

  const list = getSmartCategories();
  let html = "";

  list.forEach(c => {
    html += `
      <div class="gaCatsScroll-pill" data-cat="${c.slug}">
        <span>${c.icon}</span>
        <span>${c.name_ar}</span>
      </div>
    `;
  });

  box.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderCategoriesPage);
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
