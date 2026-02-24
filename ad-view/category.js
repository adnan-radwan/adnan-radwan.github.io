// بناء شريط الفئات ديناميكيًا
const bar = document.getElementById("categoriesBar");
bar.innerHTML = categoriesDB.map(cat => `
  <a class="cat-tab" href="#${cat.slug}">
    ${cat.icon} ${cat.name_ar}
  </a>
`).join("");
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", function () {
      const slug = this.getAttribute("data-cat");
      if (slug) {
        const url = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);
        window.open(url, "_blank");
      }
    });
  });

});
