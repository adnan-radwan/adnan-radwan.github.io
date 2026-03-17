<!-- سكربت Supabase -->

/* ============================
   SUPABASE CLIENT — BLOGGER SAFE
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


<!-- سكربت UI DOM API -->

/* ============================
   UI RENDERING — DOM API, BLOGGER SAFE
============================ */

function createAdCardElement(ad, variant) {
  var card = document.createElement("div");
  card.className = "ga-ad-card";
  if (variant) {
    card.className += " " + variant;
  }

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

  var categories = 0;
  for (c in catsMap) {
    if (catsMap.hasOwnProperty(c)) categories++;
  }

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
  var active = 0;
  var i;
  for (i = 0; i < ads.length; i++) {
    if (ads[i].status === "active") active++;
  }
  var el = document.getElementById("heroLiveCounter");
  if (!el) return;
  el.textContent = "عدد الإعلانات النشطة الآن: " + active;
}

/* HERO SLIDER */
function renderHeroSlider(ads) {
  var slider = document.getElementById("ga-hero-slider");
  var dots = document.getElementById("ga-hero-dots");
  if (!slider || !dots) return;

  while (slider.firstChild) slider.removeChild(slider.firstChild);
  while (dots.firstChild) dots.removeChild(dots.firstChild);

  var items = ads.slice(0, 6);
  if (!items.length) return;

  var slides = [];
  var dotButtons = [];
  var i;

  for (i = 0; i < items.length; i++) {
    var ad = items[i];

    var slide = document.createElement("div");
    slide.className = "ga-hero-slide";
    if (i === 0) slide.className += " active";

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
    if (i === 0) dot.className += " active";
    dot.setAttribute("data-index", String(i));
    dots.appendChild(dot);
    dotButtons.push(dot);
  }

  var current = 0;

  function goTo(idx) {
    var j;
    for (j = 0; j < slides.length; j++) {
      slides[j].classList.remove("active");
      dotButtons[j].classList.remove("active");
    }
    slides[idx].classList.add("active");
    dotButtons[idx].classList.add("active");
    current = idx;
  }

  for (i = 0; i < dotButtons.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-index"), 10);
        goTo(idx);
      });
    })(dotButtons[i]);
  }

  setInterval(function () {
    if (!slides.length) return;
    var next = (current + 1) % slides.length;
    goTo(next);
  }, 6000);
}

/* SPOTLIGHT */
function renderSpotlight(ads) {
  var grid = document.getElementById("spotlightGrid");
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  var i;
  for (i = 0; i < ads.length; i++) {
    var card = createAdCardElement(ads[i], "spotlight");
    grid.appendChild(card);
  }
}

/* TRENDING */
function renderTrending(ads) {
  var grid = document.getElementById("trendingGrid");
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  var i;
  for (i = 0; i < ads.length; i++) {
    var card = createAdCardElement(ads[i], "trending");
    grid.appendChild(card);
  }
}

/* MARKET */
function renderMarket(ads) {
  var grid = document.getElementById("marketGrid");
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  var i;
  for (i = 0; i < ads.length; i++) {
    var card = createAdCardElement(ads[i], "market");
    grid.appendChild(card);
  }
}

/* STORIES */
function renderStories(ads) {
  var grid = document.getElementById("storiesGrid");
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  var i;
  for (i = 0; i < ads.length; i++) {
    var ad = ads[i];

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
  }
}

/* FEATURED SLIDER */
function renderFeaturedSlider(ads) {
  var track = document.getElementById("home-featured-grid");
  var label = document.getElementById("featured-count-label");
  if (!track) return;

  while (track.firstChild) track.removeChild(track.firstChild);

  var i;
  for (i = 0; i < ads.length; i++) {
    var card = createAdCardElement(ads[i], "featured");
    track.appendChild(card);
  }

  if (label) {
    label.textContent = ads.length + " إعلان";
  }
}

/* SMART SEARCH RESULTS */
function renderSearchResults(ads) {
  var box = document.getElementById("smartSearchResults");
  if (!box) return;

  while (box.firstChild) box.removeChild(box.firstChild);

  if (!ads.length) {
    var empty = document.createElement("div");
    empty.className = "ga-smart-empty";
    empty.textContent = "لا توجد نتائج مطابقة…";
    box.appendChild(empty);
    return;
  }

  var i;
  for (i = 0; i < ads.length; i++) {
    var ad = ads[i];

    var item = document.createElement("div");
    item.className = "ga-smart-item";

    var title = document.createElement("div");
    title.className = "ga-smart-title";
    title.textContent = ad.title || "";
    item.appendChild(title);

    var meta = document.createElement("div");
    meta.className = "ga-smart-meta";
    var metaText = (ad.category || "") + " · " + (ad.tags || "");
    meta.textContent = metaText;
    item.appendChild(meta);

    var link = document.createElement("a");
    link.className = "ga-smart-link";
    link.href = ad.link || "#";
    link.textContent = "فتح الإعلان";
    item.appendChild(link);

    box.appendChild(item);
  }
}

/* expose on window */
window.renderHeroStats = renderHeroStats;
window.renderHeroLiveCounter = renderHeroLiveCounter;
window.renderHeroSlider = renderHeroSlider;
window.renderSpotlight = renderSpotlight;
window.renderTrending = renderTrending;
window.renderMarket = renderMarket;
window.renderStories = renderStories;
window.renderFeaturedSlider = renderFeaturedSlider;
window.renderSearchResults = renderSearchResults;


<!-- سكربت ENGINE -->

/* ============================
   ENGINE — BLOGGER SAFE
============================ */

/* Shuffle */
function shuffleArray(arr) {
  var a = arr.slice();
  var i, j, temp;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

/* Unique by category */
function uniqueByCategory(ads) {
  var map = {};
  var out = [];
  var i, c;
  for (i = 0; i < ads.length; i++) {
    c = ads[i].category;
    if (!c) continue;
    if (!map[c]) {
      map[c] = true;
      out.push(ads[i]);
    }
  }
  return out;
}

/* Category Bar */
function initCategoryBar(allAds) {
  var pills = document.querySelectorAll(".cat-pill");
  if (!pills.length) return;

  var i;
  for (i = 0; i < pills.length; i++) {
    (function (p) {
      p.addEventListener("click", function () {
        var j;
        for (j = 0; j < pills.length; j++) {
          pills[j].classList.remove("active");
        }
        p.classList.add("active");

        var cat = p.getAttribute("data-cat");
        var filtered = allAds.slice();

        if (cat === "featured") {
          filtered = [];
          for (j = 0; j < allAds.length; j++) {
            if (allAds[j].featured === true) filtered.push(allAds[j]);
          }
        } else if (cat && cat !== "all") {
          filtered = [];
          for (j = 0; j < allAds.length; j++) {
            if (allAds[j].category === cat) filtered.push(allAds[j]);
          }
        }

        if (window.renderSpotlight) {
          window.renderSpotlight(filtered.slice(0, 12));
        }
      });
    })(pills[i]);
  }
}

/* Smart Search */
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

    var results = [];
    var i, ad, hay;
    for (i = 0; i < allAds.length; i++) {
      ad = allAds[i];
      hay = (ad.title || "") + " " +
            (ad.desc || "") + " " +
            (ad.category || "") + " " +
            (ad.tags || "");
      hay = hay.toLowerCase();
      if (hay.indexOf(term) !== -1) {
        results.push(ad);
      }
    }

    if (window.renderSearchResults) {
      window.renderSearchResults(results.slice(0, 20));
    }
  });
}

/* Scroll Buttons */
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

/* MAIN ENGINE */
function initGoldenAdsEngine() {
  loadAllAds(function (ads) {
    if (!ads || !ads.length) {
      console.log("No ads loaded.");
      return;
    }

    /* HERO */
    if (window.renderHeroStats) window.renderHeroStats(ads);
    if (window.renderHeroLiveCounter) window.renderHeroLiveCounter(ads);

    /* HERO SLIDER */
    var heroSet = shuffleArray(ads).slice(0, 6);
    if (window.renderHeroSlider) window.renderHeroSlider(heroSet);

    /* SPOTLIGHT */
    var spotlightSet = shuffleArray(ads).slice(0, 12);
    if (window.renderSpotlight) window.renderSpotlight(spotlightSet);

    /* TRENDING */
    var featuredAds = [];
    var i;
    for (i = 0; i < ads.length; i++) {
      if (ads[i].featured === true) featuredAds.push(ads[i]);
    }
    var trendingSet = featuredAds.length > 0
      ? featuredAds.slice(0, 8)
      : shuffleArray(ads).slice(0, 8);
    if (window.renderTrending) window.renderTrending(trendingSet);

    /* MARKET */
    var marketSet = uniqueByCategory(ads).slice(0, 10);
    if (window.renderMarket) window.renderMarket(marketSet);

    /* STORIES */
    var storiesSet = shuffleArray(ads).slice(0, 6);
    if (window.renderStories) window.renderStories(storiesSet);

    /* FEATURED SLIDER */
    if (window.renderFeaturedSlider) window.renderFeaturedSlider(featuredAds);

    /* INIT UI */
    initCategoryBar(ads);
    initSmartSearch(ads);
    initScrollButtons();
  });
}

/* RUN ENGINE */
document.addEventListener("DOMContentLoaded", initGoldenAdsEngine);
