/* ===========================================
   GOLDEN ADS — Homepage Logic v6.2
   Official Stable Release — (Adnan Radwan)
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
  const searchInput      = document.getElementById("gaSearchInput");

  /* DATA */
  const allActive  = GoldenAds.getAllActiveAds();
  const featured   = GoldenAds.getFeaturedAds();
  const decorAds   = GoldenAds.getAdsByCategory("ديكور فاخر – Luxury Decor");
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

  /* SEARCH */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        renderLatest(latestBase.slice(0, 20));
        return;
      }
      const filtered = allActive.filter(ad => {
        const t = (ad.title || "").toLowerCase();
        const d = (ad.desc || "").toLowerCase();
        const c = (ad.category || "").toLowerCase();
        return t.includes(q) || d.includes(q) || c.includes(q);
      });
      renderLatest(filtered);
    });
  }

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
