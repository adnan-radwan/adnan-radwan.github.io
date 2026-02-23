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
<script>
const CATEGORY_PAGE = "https://www.adnan-radwan.net/p/category.html";

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      if (slug) {
        const url = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);
        window.open(url, "_blank"); // فتح في تبويب جديد
      }
    });
  });

});
</script>
