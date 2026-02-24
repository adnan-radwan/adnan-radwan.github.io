// رابط صفحة التصنيفات الرسمي
const CATEGORY_PAGE = "https://www.adnan-radwan.net/p/category.html";

// فتح التصنيف في تبويب جديد
function goToCategory(slug) {
  const url = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {

  // أزرار التصنيفات في الرئيسية
  document.querySelectorAll(".ga-cat-pill").forEach(function (el) {
    el.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      if (slug) goToCategory(slug);
    });
  });

  // أزرار التصنيفات في صفحة التصنيفات
  document.querySelectorAll(".gaCatsScroll-pill").forEach(function (el) {
    el.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      if (slug) goToCategory(slug);
    });
  });

});
