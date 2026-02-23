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

function renderCategories(targetId) {
  const box = document.getElementById(targetId);
  if (!box || !window.getSmartCategories()
) return;

  let html = "";
  for (let i = 0; i < categoriesDB.length; i++) {
    const c = getSmartCategories()
[i];
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
