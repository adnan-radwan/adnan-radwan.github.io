/* ===========================================
   GOLDEN ADS — HOME (Unified 2026)
   الصفحة الرئيسية + السلايدر + الفئات + أحدث الإعلانات
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------
     1) السلايدر الرئيسي (Hero Slider)
  ------------------------------------------- */

  const sliderContainer = document.getElementById("ga-hero-slider");
  const sliderDots = document.getElementById("ga-hero-dots");

  const sliderAds = GoldenAds.getFeaturedAds().slice(0, 5); // أفضل 5 إعلانات مميزة

  if (sliderContainer && sliderAds.length > 0) {
    sliderContainer.innerHTML = "";
    sliderDots.innerHTML = "";

    sliderAds.forEach((ad, index) => {
      const slide = document.createElement("div");
      slide.className = "ga-hero-slide";
      if (index === 0) slide.classList.add("active");

      slide.innerHTML = `
        <img src="${ad.image}" alt="${ad.title}">
        <div class="ga-hero-overlay">
          <h2>${ad.title}</h2>
          <p>${ad.desc || ""}</p>
          <a href="/ad-view/ad-details.html?id=${ad.id}" class="ga-hero-btn">عرض الإعلان</a>
        </div>
      `;

      sliderContainer.appendChild(slide);

      const dot = document.createElement("span");
      dot.className = "ga-hero-dot";
      if (index === 0) dot.classList.add("active");
      dot.dataset.index = index;
      sliderDots.appendChild(dot);
    });

    let currentSlide = 0;

    function activateSlide(i) {
      const slides = document.querySelectorAll(".ga-hero-slide");
      const dots = document.querySelectorAll(".ga-hero-dot");

      slides.forEach(s => s.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      slides[i].classList.add("active");
      dots[i].classList.add("active");
    }

    sliderDots.addEventListener("click", e => {
      if (e.target.classList.contains("ga-hero-dot")) {
        currentSlide = Number(e.target.dataset.index);
        activateSlide(currentSlide);
      }
    });

    setInterval(() => {
      currentSlide = (currentSlide + 1) % sliderAds.length;
      activateSlide(currentSlide);
    }, 5000);
  }

  /* -------------------------------------------
     2) شريط الفئات (Category Pills)
  ------------------------------------------- */

  const pillsContainer = document.getElementById("homeCategories");

  if (pillsContainer) {
    pillsContainer.innerHTML = "";

    window.categoriesDB.forEach(cat => {
      const pill = document.createElement("div");
      pill.className = "ga-cat-pill";
      pill.dataset.cat = cat.slug;
      pill.innerHTML = `${cat.icon} ${cat.name_ar}`;
      pillsContainer.appendChild(pill);
    });
  }

  /* -------------------------------------------
     3) أحدث الإعلانات (Latest Ads)
  ------------------------------------------- */

  const latestGrid = document.getElementById("latestGrid");
  const latestCountLabel = document.getElementById("latestCountLabel");

  const latestAds = GoldenAds.getLatestAds(30);

  if (latestGrid) {
    latestGrid.innerHTML = "";
    latestAds.forEach(ad => {
      latestGrid.appendChild(GoldenAds.createAdCard(ad));
    });
  }

  if (latestCountLabel) {
    latestCountLabel.textContent = `${latestAds.length} إعلان`;
  }

  /* -------------------------------------------
     4) نظام التنقّل بين الفئات (Router)
  ------------------------------------------- */

  const CATEGORY_PAGE = "https://www.adnan-radwan.net/p/category.html";

  function getCategoryName(slug) {
    return window.categorySlugMap[slug] || slug;
  }

  document.querySelectorAll(".ga-cat-pill").forEach(pill => {
    pill.addEventListener("click", () => {

      document.querySelectorAll(".ga-cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const slug = pill.dataset.cat;
      const url = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);

      window.open(url, "_blank");
    });
  });

});
