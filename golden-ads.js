/* ============================
   SUPABASE CLIENT
============================ */

var supabaseUrl = "https://bsxwlwreydqvvvvyjjkx.supabase.co";
var supabaseKey = "sb_publishable_uRP0ZNbCzjglavhE6NOEWQ_E0YzCa7L";
var supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

function loadAllAds(callback) {
  supabaseClient
    .from("ads")
    .select("*")
    .order("id", { ascending: false })
    .then(function (result) {
      if (result.error) {
        console.log("Supabase Error:", result.error);
        callback([]);
        return;
      }
      window.allAds = result.data || [];
      callback(window.allAds);
    });
}

/* ============================
   UI RENDERING — DOM API
============================ */

function createAdCardElement(ad, variant) {
  var card = document.createElement("div");
  card.className = "ga-ad-card";
  if (variant) card.className += " " + variant;

  var imgWrap = document.createElement("div");
  imgWrap.className = "ga-ad-img-wrap";

  var img = document.createElement("img");
  img.src = ad.image;
  img.alt = ad.title || "";
  img.loading = "lazy";
  imgWrap.appendChild(img);

  if (ad.featured === true) {
    var featMark = document.createElement("span");
    featMark.className = "feat-mark";
    featMark.textContent = "★";
    imgWrap.appendChild(featMark);
  }

  var body = document.createElement("div");
  body.className = "ga-ad-body";

  var cat = document.createElement("div");
  cat.className = "ga-ad-cat";
  cat.textContent = ad.category || "";
  body.appendChild(cat);

  var title = document.createElement("h3");
  title.className = "ga-ad-title";
  title.textContent = ad.title || "";
  body.appendChild(title);

  var desc = document.createElement("p");
  desc.className = "ga-ad-desc";
  desc.textContent = ad.desc || "";
  body.appendChild(desc);

  var hasOld = ad.oldPrice && ad.oldPrice > 0;
  var hasNew = ad.newPrice && ad.newPrice > 0;

  if (hasOld || hasNew) {
    var prices = document.createElement("div");
    prices.className = "ad-prices";

    if (hasOld) {
      var oldSpan = document.createElement("span");
      oldSpan.className = "old";
      oldSpan.textContent = (ad.currency || "$") + ad.oldPrice;
      prices.appendChild(oldSpan);
    }

    if (hasNew) {
      var newSpan = document.createElement("span");
      newSpan.className = "new";
      newSpan.textContent = (ad.currency || "$") + ad.newPrice;
      prices.appendChild(newSpan);
    }

    body.appendChild(prices);
  }

  var footer = document.createElement("div");
  footer.className = "ga-ad-footer";

  if (ad.badge) {
    var badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = ad.badge;
    footer.appendChild(badge);
  }

  var link = document.createElement("a");
  link.className = "ga-ad-link";
  link.href = ad.link || "#";
  link.textContent = "عرض الإعلان";
  footer.appendChild(link);

  body.appendChild(footer);

  card.appendChild(imgWrap);
  card.appendChild(body);

  return card;
}

/* HERO STATS */
function renderHeroStats(ads) {
  var total = ads.length;
  var active = 0;
  var featured = 0;
  var catsMap = {};
  var i, c;

  for (i = 0; i < ads.length; i++) {
    if (ads[i].status === "active") active++;
    if (ads[i].featured === true) featured++;
    c = ads[i].category;
    if (c) catsMap[c] = true;
  }

  var categories = Object.keys(catsMap).length;

  var elTotal = document.getElementById("hero-total-ads");
  var sTotal = document.getElementById("stat-total");
  var sActive = document.getElementById("stat-active");
  var sCats = document.getElementById("stat-categories");
  var sFeat = document.getElementById("stat-featured");

  if (elTotal) elTotal.textContent = "Ads: " + total;
  if (sTotal) sTotal.textContent = total;
  if (sActive) sActive.textContent = active;
  if (sCats) sCats.textContent = categories;
  if (sFeat) sFeat.textContent = featured;
}

/* HERO LIVE COUNTER */
function renderHeroLiveCounter(ads) {
  var active = ads.filter(function (a) {
    return a.status === "active";
  }).length;

  var el = document.getElementById("heroLiveCounter");
  if (el) el.textContent = "عدد الإعلانات النشطة الآن: " + active;
}

/* HERO SLIDER */
function renderHeroSlider(ads) {
  var slider = document.getElementById("ga-hero-slider");
  var dots = document.getElementById("ga-hero-dots");
  if (!slider || !dots) return;

  slider.innerHTML = "";
  dots.innerHTML = "";

  var items = ads.slice(0, 6);
  if (!items.length) return;

  var slides = [];
  var dotButtons = [];
  var i;

  for (i = 0; i < items.length; i++) {
    var ad = items[i];

    var slide = document.createElement("div");
    slide.className = "ga-hero-slide";
    if (i === 0) slide.classList.add("active");

    var imgWrap = document.createElement("div");
    imgWrap.className = "ga-hero-slide-img";

    var img = document.createElement("img");
    img.src = ad.image;
    img.alt = ad.title || "";
    imgWrap.appendChild(img);

    var body = document.createElement("div");
    body.className = "ga-hero-slide-body";

    var cat = document.createElement("div");
    cat.className = "ga-hero-slide-cat";
    cat.textContent = ad.category || "";
    body.appendChild(cat);

    var title = document.createElement("h3");
    title.textContent = ad.title || "";
    body.appendChild(title);

    var desc = document.createElement("p");
    desc.textContent = ad.desc || "";
    body.appendChild(desc);

    var link = document.createElement("a");
    link.className = "ga-hero-slide-link";
    link.href = ad.link || "#";
    link.textContent = "عرض الإعلان";
    body.appendChild(link);

    slide.appendChild(imgWrap);
    slide.appendChild(body);

    slider.appendChild(slide);
    slides.push(slide);

    var dot = document.createElement("button");
    dot.className = "ga-hero-dot";
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    dots.appendChild(dot);
    dotButtons.push(dot);
  }

  var current = 0;

  function goTo(idx) {
    slides.forEach(function (s) {
      s.classList.remove("active");
    });
    dotButtons.forEach(function (d) {
      d.classList.remove("active");
    });
    slides[idx].classList.add("active");
    dotButtons[idx].classList.add("active");
    current = idx;
  }

  dotButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      goTo(parseInt(btn.dataset.index, 10));
    });
  });

  setInterval(function () {
    var next = (current + 1) % slides.length;
    goTo(next);
  }, 6000);
}

/* SPOTLIGHT */
function renderSpotlight(ads) {
  var grid = document.getElementById("spotlightGrid");
  if (!grid) return;
  grid.innerHTML = "";

  ads.forEach(function (ad) {
    grid.appendChild(createAdCardElement(ad, "spotlight"));
  });
}

/* TRENDING */
function renderTrending(ads) {
  var grid = document.getElementById("trendingGrid");
  if (!grid) return;
  grid.innerHTML = "";

  ads.forEach(function (ad) {
    grid.appendChild(createAdCardElement(ad, "trending"));
  });
}

/* MARKET */
function renderMarket(ads) {
  var grid = document.getElementById("marketGrid");
  if (!grid) return;
  grid.innerHTML = "";

  ads.forEach(function (ad) {
    grid.appendChild(createAdCardElement(ad, "market"));
  });
}

/* STORIES */
function renderStories(ads) {
  var grid = document.getElementById("storiesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  ads.forEach(function (ad) {
    var card = document.createElement("div");
    card.className = "ga-story-card";

    var imgWrap = document.createElement("div");
    imgWrap.className = "ga-story-img";

    var img = document.createElement("img");
    img.src = ad.image;
    img.alt = ad.title || "";
    imgWrap.appendChild(img);

    var body = document.createElement("div");
    body.className = "ga-story-body";

    var cat = document.createElement("div");
    cat.className = "ga-story-cat";
    cat.textContent = ad.category || "";
    body.appendChild(cat);

    var title = document.createElement("h3");
    title.textContent = ad.title || "";
    body.appendChild(title);

    var desc = document.createElement("p");
    desc.textContent = ad.desc || "";
    body.appendChild(desc);

    var link = document.createElement("a");
    link.className = "ga-story-link";
    link.href = ad.link || "#";
    link.textContent = "عرض الإعلان";
    body.appendChild(link);

    card.appendChild(imgWrap);
    card.appendChild(body);

    grid.appendChild(card);
  });
}

/* FEATURED SLIDER */
function renderFeaturedSlider(ads) {
  var track = document.getElementById("home-featured-grid");
  var label = document.getElementById("featured-count-label");
  if (!track) return;

  track.innerHTML = "";

  ads.forEach(function (ad) {
    track.appendChild(createAdCardElement(ad, "featured"));
  });

  if (label) label.textContent = ads.length + " إعلان";
}

/* SMART SEARCH RESULTS */
function renderSearchResults(ads) {
  var box = document.getElementById("smartSearchResults");
  if (!box) return;

  box.innerHTML = "";

  if (!ads.length) {
    var empty = document.createElement("div");
    empty.className = "ga-smart-empty";
    empty.textContent = "لا توجد نتائج مطابقة…";
    box.appendChild(empty);
    return;
  }

  ads.forEach(function (ad) {
    var item = document.createElement("div");
    item.className = "ga-smart-item";

    var title = document.createElement("div");
    title.className = "ga-smart-title";
    title.textContent = ad.title || "";
    item.appendChild(title);

    var meta = document.createElement("div");
    meta.className = "ga-smart-meta";
    meta.textContent = (ad.category || "") + " · " + (ad.tags || "");
    item.appendChild(meta);

    var link = document.createElement("a");
    link.className = "ga-smart-link";
    link.href = ad.link || "#";
    link.textContent = "فتح الإعلان";
    item.appendChild(link);

    box.appendChild(item);
  });
}

/* expose */
window.renderHeroStats = renderHeroStats;
window.renderHeroLiveCounter = renderHeroLiveCounter;
window.renderHeroSlider = renderHeroSlider;
window.renderSpotlight = renderSpotlight;
window.renderTrending = renderTrending;
window.renderMarket = renderMarket;
window.renderStories = renderStories;
window.renderFeaturedSlider = renderFeaturedSlider;
window.renderSearchResults = renderSearchResults;

/* ============================
   ENGINE
============================ */

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

function uniqueByCategory(ads) {
  var map = {};
  var out = [];
  ads.forEach(function (ad) {
    if (ad.category && !map[ad.category]) {
      map[ad.category] = true;
      out.push(ad);
    }
  });
  return out;
}

function initCategoryBar(allAds) {
  var pills = document.querySelectorAll(".cat-pill");
  if (!pills.length) return;

  pills.forEach(function (p) {
    p.addEventListener("click", function () {
      pills.forEach(function (x) {
        x.classList.remove("active");
      });
      p.classList.add("active");

      var cat = p.dataset.cat;
      var filtered = allAds.slice();

      if (cat === "featured") {
        filtered = allAds.filter(function (a) {
          return a.featured === true;
        });
      } else if (cat && cat !== "all") {
        filtered = allAds.filter(function (a) {
          return a.category === cat;
        });
      }

      if (window.renderSpotlight) {
        window.renderSpotlight(filtered.slice(0, 12));
      }
    });
  });
}

function initSmartSearch(allAds) {
  var input = document.getElementById("smartSearchInput");
  var box = document.getElementById("smartSearchResults");
  if (!input || !box) return;

  input.addEventListener("input", function () {
    var term = input.value.toLowerCase().trim();
    if (!term) {
      box.innerHTML = "";
      return;
    }

    var results = allAds.filter(function (ad) {
      var hay =
        (ad.title || "") +
        " " +
        (ad.desc || "") +
        " " +
        (ad.category || "") +
        " " +
        (ad.tags || "");
      return hay.toLowerCase().indexOf(term) !== -1;
    });

    if (window.renderSearchResults) {
      window.renderSearchResults(results.slice(0, 20));
    }
  });
}

function initScrollButtons() {
  var btnFeatured = document.getElementById("btnScrollFeatured");
  var btnDecor = document.getElementById("btnScrollDecor");

  if (btnFeatured) {
    btnFeatured.addEventListener("click", function () {
      var sec = document.getElementById("sectionFeatured");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (btnDecor) {
    btnDecor.addEventListener("click", function () {
      var pill = document.querySelector('[data-cat="decor"]');
      if (pill) {
        window.scrollTo({ top: pill.offsetTop, behavior: "smooth" });
      }
    });
  }
}

function initGoldenAdsEngine() {
  loadAllAds(function (ads) {
    if (!ads || !ads.length) {
      console.log("No ads loaded.");
      return;
    }

    if (window.renderHeroStats) window.renderHeroStats(ads);
    if (window.renderHeroLiveCounter) window.renderHeroLiveCounter(ads);

    var heroSet = shuffleArray(ads).slice(0, 6);
    if (window.renderHeroSlider) window.renderHeroSlider(heroSet);

    var spotlightSet = shuffleArray(ads).slice(0, 12);
    if (window.renderSpotlight) window.renderSpotlight(spotlightSet);

    var featuredAds = ads.filter(function (a) {
      return a.featured === true;
    });

    var trendingSet =
      featuredAds.length > 0
        ? featuredAds.slice(0, 8)
        : shuffleArray(ads).slice(0, 8);
    if (window.renderTrending) window.renderTrending(trendingSet);

    var marketSet = uniqueByCategory(ads).slice(0, 10);
    if (window.renderMarket) window.renderMarket(marketSet);

    var storiesSet = shuffleArray(ads).slice(0, 6);
    if (window.renderStories) window.renderStories(storiesSet);

    if (window.renderFeaturedSlider) window.renderFeaturedSlider(featuredAds);

    initCategoryBar(ads);
    initSmartSearch(ads);
    initScrollButtons();
  });
}

document.addEventListener("DOMContentLoaded", initGoldenAdsEngine);
