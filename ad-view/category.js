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

const CATEGORY_PAGE = "https://www.adnan-radwan.net/p/category.html";

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
