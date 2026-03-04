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

/* ===========================================
   GOLDEN ADS — Core Engine (window.allAds)
=========================================== */
window.GoldenAds = (function () {
  "use strict";

  const ads = (window.allAds || []).slice().sort((a, b) => a.id - b.id);

  function parseDate(dateStr) {
    return new Date(dateStr + "T23:59:59Z");
  }

  function isActive(ad) {
    if (!ad || ad.status !== "active" || !ad.expires) return false;
    return parseDate(ad.expires) >= new Date();
  }

  function getAllActiveAds() {
    return ads.filter(isActive);
  }

  function getFeaturedAds() {
    return getAllActiveAds().filter(ad => ad.featured === true);
  }

  function getAdsByCategory(category) {
    return getAllActiveAds().filter(ad => ad.category === category);
  }

  function getLatestAds(limit = 20) {
    return getAllActiveAds()
      .sort((a, b) => new Date(b.expires) - new Date(a.expires))
      .slice(0, limit);
  }

  function createAdCard(ad, options = {}) {
    const card = document.createElement("a");
    card.className = "ga-card";

    if (options.featuredMode) {
      card.classList.add("featured-mode");
    }

    card.href = ad.link || "#";

    card.innerHTML = `
      <div class="ga-card-img">
        <img src="${ad.image}" alt="${ad.title}">
        <span class="ga-badge">${ad.badge || "gold"}</span>
      </div>

      <div class="ga-card-body">
        <h3 class="ga-title">${ad.title}</h3>
        <p class="ga-desc">${ad.desc}</p>

        <div class="ga-meta">
          <span class="ga-cat">${ad.category}</span>
          <span class="ga-exp">${ad.expires ? "ينتهي: " + ad.expires : ""}</span>
        </div>
      </div>
    `;

    return card;
  }

  function renderAds(containerId, list, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    list.forEach(ad => container.appendChild(createAdCard(ad, options)));
  }

  return {
    getAllActiveAds,
    getFeaturedAds,
    getAdsByCategory,
    getLatestAds,
    renderAds,
    createAdCard
  };
})();

/* ===========================================
   HOMEPAGE LOGIC
=========================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTS */
  const heroTotalAdsEl   = document.getElementById("hero-total-ads");
  const heroLiveCounter  = document.getElementById("heroLiveCounter");

  const statTotalEl      = document.getElementById("stat-total");
  const statActiveEl     = document.getElementById("stat-active");
  const statCategoriesEl = document.getElementById("stat-categories");
  const statFeaturedEl   = document.getElementById("stat-featured");

  const featuredRowEl        = document.getElementById("home-featured-grid");
  const featuredCountLabelEl = document.getElementById("featured-count-label");

  const decorGridEl      = document.getElementById("home-decor-grid");
  const decorCountLabel  = document.getElementById("decorCountLabel");
  const btnLoadMoreDecor = document.getElementById("btnLoadMoreDecor");

  const latestGridEl     = document.getElementById("latestGrid");
  const latestCountLabel = document.getElementById("latestCountLabel");

  const categoryListEl   = document.getElementById("category-list");

  /* DATA */
  const allActive  = GoldenAds.getAllActiveAds();
  const featured   = GoldenAds.getFeaturedAds();
  const decorAds = GoldenAds.getAdsByCategory("ديكور فاخر – Luxury Decor");
  const latestBase = GoldenAds.getLatestAds(40);

  /* FEATURED */
  if (featuredRowEl) {
    featuredRowEl.innerHTML = "";
    featured.forEach(ad => {
      const card = GoldenAds.createAdCard(ad, { featuredMode: true });
      featuredRowEl.appendChild(card);
    });
  }
  if (featuredCountLabelEl) {
    featuredCountLabelEl.textContent = featured.length + " إعلان";
  }

  /* DECOR — PAGE + LOAD MORE */
  let decorPage = 0;
  const DECOR_PAGE_SIZE = 12;

  function renderDecorPage(page) {
    if (!decorGridEl) return;

    const start = page * DECOR_PAGE_SIZE;
    const slice = decorAds.slice(start, start + DECOR_PAGE_SIZE);

    if (page === 0) decorGridEl.innerHTML = "";

    slice.forEach(ad => {
      const card = GoldenAds.createAdCard(ad);
      decorGridEl.appendChild(card);
    });

    if (decorCountLabel) {
      decorCountLabel.textContent = decorAds.length + " عنصر";
    }

    if (btnLoadMoreDecor) {
      const more = (page + 1) * DECOR_PAGE_SIZE < decorAds.length;
      btnLoadMoreDecor.style.display = more ? "inline-flex" : "none";
    }
  }

  renderDecorPage(0);

  if (btnLoadMoreDecor) {
    btnLoadMoreDecor.addEventListener("click", () => {
      decorPage += 1;
      renderDecorPage(decorPage);
    });
  }

  /* LATEST */
  function renderLatest(list) {
    if (!latestGridEl) return;
    latestGridEl.innerHTML = "";
    list.forEach(ad => {
      const card = GoldenAds.createAdCard(ad);
      latestGridEl.appendChild(card);
    });
    if (latestCountLabel) {
      latestCountLabel.textContent = `${list.length} إعلان`;
    }
  }
  renderLatest(latestBase.slice(0, 20));

  /* HERO STATS */
  if (heroTotalAdsEl) {
    heroTotalAdsEl.innerHTML = `<strong>Ads:</strong> ${(window.allAds || []).length}`;
  }
  if (heroLiveCounter) {
    heroLiveCounter.textContent = `${allActive.length} إعلان نشط الآن`;
  }
  if (statTotalEl) {
    statTotalEl.textContent = (window.allAds || []).length;
  }
  if (statActiveEl) {
    statActiveEl.textContent = allActive.length;
  }
  if (statFeaturedEl) {
    statFeaturedEl.textContent = featured.length;
  }
  if (statCategoriesEl) {
    const uniqueCats = new Set(allActive.map(ad => ad.category || "other"));
    statCategoriesEl.textContent = uniqueCats.size.toString();
  }

  /* CATEGORY LIST → FILTER LATEST */
  if (categoryListEl && latestGridEl) {
    categoryListEl.innerHTML = "";
    const map = new Map();
    allActive.forEach(ad => {
      const cat = ad.category || "other";
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    const entries = Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], "ar")
    );

    entries.forEach(([cat, count]) => {
      const row = document.createElement("div");
      row.className = "category-row";
      row.dataset.category = cat;

      row.innerHTML = `
        <div class="category-name">
          <span class="category-dot"></span>
          <span>${cat}</span>
        </div>
        <div class="category-count">${count} إعلان</div>
      `;

      row.addEventListener("click", () => {
        const filtered = allActive.filter(ad => ad.category === cat);
        renderLatest(filtered.length ? filtered : latestBase.slice(0, 20));
      });

      categoryListEl.appendChild(row);
    });
  }

  /* SCROLL BUTTONS */
  const scrollTargets = {
    btnScrollFeatured: "sectionFeatured",
    btnScrollDecor: "sectionDecor",
    btnScrollLatest: "sectionLatest"
  };

  Object.keys(scrollTargets).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", () => {
        const target = document.getElementById(scrollTargets[btnId]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });

  /* CINEMATIC REVEAL */
  const revealElements = document.querySelectorAll(".cine-fade, .cine-slide");
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect().top;
      if (rect < trigger) el.classList.add("show");
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  /* PARALLAX */
  const heroVisual = document.querySelector(".hero-visual-inner");
  window.addEventListener("scroll", () => {
    if (!heroVisual) return;
    const offset = window.scrollY;
    if (offset < 200) {
      heroVisual.classList.add("parallax");
    } else {
      heroVisual.classList.remove("parallax");
    }
  });

  /* GOLD PARTICLES */
  function spawnGoldParticles() {
    const container = document.querySelector(".hero-unified");
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("div");
      p.className = "gold-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = (Math.random() * 3) + "s";
      container.appendChild(p);
    }
  }
  spawnGoldParticles();

  /* ROUTER */
  const CATEGORY_PAGE = "https://www.adnan-radwan.net/p/category.html";
  const isCategoryPage = window.location.pathname.includes("category");

  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      const slug = btn.getAttribute("data-cat");
      if (!slug) return;

      if (isCategoryPage) {
        const header = document.getElementById("categoryTitle");
        if (header) header.textContent = slug;

        const filtered = GoldenAds.getAdsByCategory(slug);

        if (window.renderCategoryPage) {
          window.renderCategoryPage(filtered, slug);
        }

        history.replaceState(null, "", "?cat=" + encodeURIComponent(slug));
        return;
      }

      const url = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);
      window.open(url, "_blank");
    });
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const CATEGORY_PAGE = "https://www.adnan-radwan.net/p/category.html";
  const isCategoryPage = window.location.pathname.includes("category");

  function getCategoryName(slug) {
    return categorySlugMap[slug] || slug;
  }

  document.querySelectorAll(".ga-cat-pill").forEach(pill => {
    pill.addEventListener("click", () => {

      // تفعيل اللمعان
      document.querySelectorAll(".ga-cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const slug = pill.getAttribute("data-cat");
      const categoryName = getCategoryName(slug);

      // داخل صفحة التصنيف
      if (isCategoryPage) {

        const filtered = GoldenAds.getAdsByCategory(categoryName);

        if (window.renderCategoryPage) {
          window.renderCategoryPage(filtered, slug);
        }

        history.replaceState(null, "", "?cat=" + encodeURIComponent(slug));
        return;
      }

      // الصفحة الرئيسية → افتح صفحة التصنيف
      const url = CATEGORY_PAGE + "?cat=" + encodeURIComponent(slug);
      window.open(url, "_blank");
    });
  });
