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

<!-- الشريط الثابت -->
<div class="top-sticky-bar">
  <div class="top-left">GOLDEN ADS 👑 – ( Radwan )</div>
  <div class="top-right">
    <a href="https://www.adnan-radwan.net/p/golden-ads-home.html" target="_blank">الرئيسية</a>
  </div>
</div>

<!-- الغلاف -->
<div class="page-header">
  <h1>التصنيفات</h1>
  <p>تصفح جميع الإعلانات بحسب الفئة</p>
</div>

<!-- شريط الفئات (مرتب سينمائيًا) -->
<div id="categoriesBar" class="categories-bar">

  <!-- الصف الأول -->
  <div class="ga-cat-pill" data-cat="cars">سيارات 🚗</div>
  <div class="ga-cat-pill" data-cat="realestate">عقارات 🏠</div>
  <div class="ga-cat-pill" data-cat="jobs">وظائف 👔</div>
  <div class="ga-cat-pill" data-cat="services">خدمات 🛠️</div>
  <div class="ga-cat-pill" data-cat="electronics">إلكترونيات 📱</div>
  <div class="ga-cat-pill" data-cat="fashion">أزياء 👗</div>

  <!-- الصف الثاني -->
  <div class="ga-cat-pill" data-cat="beauty">جمال 💄</div>
  <div class="ga-cat-pill" data-cat="food">طعام 🍔</div>
  <div class="ga-cat-pill" data-cat="education">تعليم 🎓</div>
  <div class="ga-cat-pill" data-cat="health">صحة 🩺</div>
  <div class="ga-cat-pill" data-cat="decor">ديكور 🪑</div>
  <div class="ga-cat-pill" data-cat="shopping">تسوق 🛍️</div>

  <!-- الصف الثالث (الجديد) -->
  <div class="ga-cat-pill" data-cat="books">كتب 📚</div>
  <div class="ga-cat-pill" data-cat="stationery">مكتبيات 🖇️</div>
  <div class="ga-cat-pill" data-cat="school-supplies">لوازم مدرسية ✏️</div>
  <div class="ga-cat-pill" data-cat="other">أخرى ✨</div>

</div>

<!-- مكان ظهور الإعلانات -->
<div id="categoriesContainer">جارٍ التحميل...</div>

<!-- ملفات CSS + JS -->
<link rel="stylesheet" href="https://adnan-radwan.github.io/ad-view/category.css">

<script src="https://adnan-radwan.github.io/ad-view/categoriesDB.js"></script>
<script src="https://adnan-radwan.github.io/ad-view/adsDB.js"></script>
<script src="https://adnan-radwan.github.io/ad-view/category.js"></script>

<!-- ملف التنقل -->
<script src="https://adnan-radwan.github.io/ad-view/router.js"></script>
