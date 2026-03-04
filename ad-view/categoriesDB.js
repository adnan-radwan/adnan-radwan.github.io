/* 1) قاعدة بيانات الفئات */
window.categoriesDB = [
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
  {
  slug: "luxury-decor",
  name_ar: "ديكور فاخر – Luxury Decor",
  icon: "🏛️"
}
  { slug: "shopping", name_ar: "تسوق", icon: "🛍" },
  { slug: "books", name_ar: "كتب", icon: "📚" },
  { slug: "stationery", name_ar: "مكتبيات", icon: "🖇" },
  { slug: "school-supplies", name_ar: "لوازم مدرسية", icon: "🎒" },
  { slug: "other", name_ar: "أخرى", icon: "📦" }
];
window.categorySlugMap = {};
window.categoriesDB.forEach(cat => {
  window.categorySlugMap[cat.slug] = cat.name_ar;
});
