/* حماية الصفحة من أي Metadata يتم حقنها من Edge Sidebar */
(function cleanInjectedMetadata() {
  const bad = [
    "edge_all_open_tabs",
    "User's Edge browser tabs metadata",
    "WebsiteContent_",
    "The edge_all_open_tabs metadata"
  ];

  const scripts = document.getElementsByTagName("script");
  for (let s of scripts) {
    if (!s.textContent) continue;

    let txt = s.textContent;
    bad.forEach(b => {
      if (txt.includes(b)) {
        console.warn("Blocked Edge metadata:", b);
        txt = txt
          .split("\n")
          .filter(line => !line.includes(b))
          .join("\n");
      }
    });

    s.textContent = txt;
  }
})();

/* ============================================================
   GOLDEN ADS — EFFECTS ENGINE
============================================================ */

/* 1) Royal Infinite Categories Loop */
function loadCategoriesRotator() {
  const rotator = document.getElementById('gaCatsRotator');
  if (!rotator || !window.categoriesDB) return;

  rotator.innerHTML = categoriesDB.map(cat => `
    <div class="ga-cat-pill" data-cat="${cat.slug}">
      <span class="icon">${cat.icon}</span>
      <span class="text">${cat.name_ar}</span>
    </div>
  `).join('');

  let offset = 0;
  const speed = 0.5;

  function step() {
    offset -= speed;
    rotator.style.transform = `translateX(${offset}px)`;

    const first = rotator.firstElementChild;
    if (!first) return requestAnimationFrame(step);

    const firstRect = first.getBoundingClientRect();
    const containerRect = rotator.parentElement.getBoundingClientRect();

    if (firstRect.right < containerRect.left) {
      rotator.appendChild(first);
      offset += firstRect.width + 18;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* 2) Scroll Observer */
(function () {
  const fadeEls = document.querySelectorAll('.cine-fade');
  const slideEls = document.querySelectorAll('.cine-slide');

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    [...fadeEls, ...slideEls].forEach(el => obs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('show'));
    slideEls.forEach(el => el.classList.add('show'));
  }
})();

/* 3) Parallax */
(function () {
  const hero = document.querySelector('.hero-visual-inner');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const r = hero.getBoundingClientRect();
    const h = window.innerHeight;

    if (r.top < h && r.bottom > 0) {
      const p = (h - r.top) / (h + r.height);
      hero.style.transform = `translateY(${-12 * p}px)`;
    }
  });
})();

/* 4) Golden Particles */
(function () {
  const hero = document.querySelector('.hero-visual-inner');
  if (!hero) return;

  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'gold-particle';
    p.style.top = Math.random() * 100 + '%';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (3 + Math.random() * 3) + 's';
    p.style.animationDelay = (Math.random() * 2) + 's';
    hero.appendChild(p);
  }
})();

/* 5) Theme Toggle */
(function () {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  const CLASS = 'gold-theme';

  if (localStorage.getItem('ga-theme') === 'gold') {
    document.body.classList.add(CLASS);
  }

  btn.addEventListener('click', () => {
    const isGold = document.body.classList.toggle(CLASS);
    localStorage.setItem('ga-theme', isGold ? 'gold' : 'dark');
  });
})();

/* 6) Back To Top */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  btn.classList.toggle("show", window.scrollY > 300);
});

/* ============================================================
   GOLDEN ADS — DATA ENGINE (Standalone v7.0 Clean)
============================================================ */

/* 0) Safe Waiter */
function waitForDB(callback) {
  if (window.adsDB && Array.isArray(window.adsDB)) callback();
  else setTimeout(() => waitForDB(callback), 100);
}

/* 1) Global State */
const gaState = { category: 'all', search: '', page: 1, perPage: 12 };

/* 2) Sync State */
function syncStateFromHash() {
  const hash = location.hash.replace('#', '');
  if (hash && !hash.includes('=')) gaState.category = hash;
}

/* 3) Featured */
function loadFeatured() {
  const row = document.getElementById('featured-row');
  const label = document.getElementById('featured-count-label');
  if (!row || !label) return;

  const featured = adsDB
    .filter(a => a.featured && a.status === "active")
    .sort((a, b) => b.id - a.id)
    .slice(0, 10);

  row.innerHTML = featured.map(ad => `
    <div class="featured-card">
      <div class="featured-img-wrap"><img src="${ad.image}"></div>
      <div class="featured-body">
        <div class="featured-title">${ad.title}</div>
        <div class="featured-desc">${ad.desc || ""}</div>
      </div>
    </div>
  `).join('');

  label.textContent = `${featured.length} إعلان`;
}

/* 4) Decor */
let decorPage = 0;
const decorLimit = 12;

function loadDecor(loadMore = false) {
  const grid = document.getElementById('decorGrid');
  const label = document.getElementById('decorCountLabel');
  if (!grid || !label) return;

  if (!loadMore) decorPage = 0;

  const decor = adsDB
    .filter(a => a.category === "decor" && a.status === "active")
    .sort((a, b) => b.id - a.id);

  const slice = decor.slice(decorPage * decorLimit, (decorPage + 1) * decorLimit);

  if (!loadMore) grid.innerHTML = "";

  grid.innerHTML += slice.map(ad => `
    <a class="ad-card" href="${ad.link}">
      <img src="${ad.image}">
      <h3>${ad.title}</h3>
    </a>
  `).join('');

  label.textContent = `${grid.children.length} عنصر`;
  decorPage++;
}

/* 5) Latest */
function getFilteredAds() {
  let list = adsDB.filter(a => a.status === "active").slice().reverse();

  if (gaState.category !== 'all')
    list = list.filter(a => a.category === gaState.category);

  if (gaState.search.trim() !== '') {
    const q = gaState.search.toLowerCase();
    list = list.filter(a =>
      (a.title || '').toLowerCase().includes(q) ||
      (a.desc || '').toLowerCase().includes(q)
    );
  }

  return list;
}

function renderListing() {
  const grid = document.getElementById('latestGrid');
  const label = document.getElementById('latestCountLabel');
  if (!grid || !label) return;

  const all = getFilteredAds();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / gaState.perPage));

  if (gaState.page > totalPages) gaState.page = totalPages;

  const start = (gaState.page - 1) * gaState.perPage;
  const slice = all.slice(start, start + gaState.perPage);

  grid.innerHTML = slice.map(ad => `
    <a class="ad-card" href="${ad.link}">
      <img src="${ad.image}">
      <h3>${ad.title}</h3>
      <p>${ad.desc || ""}</p>
    </a>
  `).join('');

  label.textContent = `${total} إعلان`;

  renderPaginationControls(totalPages);
}

/* 6) Pagination */
function renderPaginationControls(totalPages) {
  let pager = document.getElementById('gaPager');
  const section = document.getElementById('sectionLatest');

  if (!pager) {
    pager = document.createElement('div');
    pager.id = 'gaPager';
    pager.style.marginTop = '14px';
    pager.style.display = 'flex';
    pager.style.justifyContent = 'center';
    pager.style.gap = '10px';
    section.appendChild(pager);
  }

  pager.innerHTML = `
    <button id="gaPrevPage" class="btn-ghost">السابق</button>
    <span>صفحة ${gaState.page} من ${totalPages}</span>
    <button id="gaNextPage" class="btn-ghost">التالي</button>
  `;

  document.getElementById('gaPrevPage').onclick = () => {
    if (gaState.page > 1) {
      gaState.page--;
      renderListing();
    }
  };

  document.getElementById('gaNextPage').onclick = () => {
    if (gaState.page < totalPages) {
      gaState.page++;
      renderListing();
    }
  };
}

/* 7) Stats */
function loadStats() {
  const total = adsDB.length;
  const active = adsDB.filter(a => a.status === "active").length;
  const featured = adsDB.filter(a => a.featured).length;
  const decor = adsDB.filter(a => a.category === "decor").length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-active').textContent = active;
  document.getElementById('stat-featured').textContent = featured;
  document.getElementById('stat-categories').textContent = decor;

  document.getElementById('hero-total-ads').innerHTML = `<strong>Ads:</strong> ${total}`;
  document.getElementById('heroLiveCounter').textContent = `${active} active ads`;
}

/* 8) INIT */
document.addEventListener('DOMContentLoaded', () => {
  waitForDB(() => {
    syncStateFromHash();
    loadCategoriesRotator();
    loadFeatured();
    loadDecor();
    loadStats();
    renderListing();

    const searchInput = document.getElementById('gaSearchInput');
    if (searchInput) {
      searchInput.value = gaState.search;
      searchInput.addEventListener('input', () => {
        gaState.search = searchInput.value;
        gaState.page = 1;
        renderListing();
      });
    }

    const btnMore = document.getElementById('btnLoadMoreDecor');
    if (btnMore) btnMore.addEventListener('click', () => loadDecor(true));

    window.addEventListener('hashchange', () => {
      syncStateFromHash();
      renderListing();
    });
  });
});
