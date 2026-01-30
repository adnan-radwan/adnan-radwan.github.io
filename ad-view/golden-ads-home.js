/* =========================
   قاعدة بيانات الإعلانات
   ========================= */
var adsDB = [
  {
    id: 201,
    title: "عسل السدر الملكي — المنتج الأصلي",
    desc: "إعلان رسمي لعسل السدر الملكي من مناحل أبو شيبان. منتج فاخر ونقي 100%، موثّق ومعتمد.",
    image: "https://res.cloudinary.com/dm5yknnvi/image/upload/v1769506323/xbj21sbflquhdinnsizz.jpg",
    link: "/p/ad-honey.html",
    category: "health",
    featured: true,
    status: "active",
    expires: "2027-01-01",
    oldPrice: 0,
    newPrice: 0,
    currency: "$",
    tags: ["honey", "natural", "recommended"],
    badge: "recommended"
  },
  {
    image: "https://adnan-radwan.github.io/ads-img/car1.jpg",
    title: "سيارة تويوتا كامري 2020",
    link: "https://adnan-radwan.github.io/ad-view/car1.html"
  },
  {
    image: "https://adnan-radwan.github.io/ads-img/car2.jpg",
    title: "هونداي النترا 2019",
    link: "https://adnan-radwan.github.io/ad-view/car2.html"
  },
  {
    image: "https://adnan-radwan.github.io/ads-img/service1.jpg",
    title: "خدمة تنظيف منازل",
    link: "https://adnan-radwan.github.io/ad-view/service1.html"
  },
  {
    image: "https://adnan-radwan.github.io/ads-img/edu1.jpg",
    title: "دروس خصوصية في الرياضيات",
    link: "https://adnan-radwan.github.io/ad-view/edu1.html"
  },
  {
    image: "https://adnan-radwan.github.io/ads-img/real1.jpg",
    title: "شقة للإيجار – 3 غرف",
    link: "https://adnan-radwan.github.io/ad-view/real1.html"
  },
  {
    image: "https://adnan-radwan.github.io/ads-img/phone1.jpg",
    title: "هاتف آيفون 13 برو",
    link: "https://adnan-radwan.github.io/ad-view/phone1.html"
  }
];

/* =========================
   PARTICLES BACKGROUND
   ========================= */
var canvas = document.getElementById("particlesCanvas");
var ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var particles = [];
for (var i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.8 + 0.2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,215,0," + p.alpha + ")";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =========================
   PARALLAX VIDEO EFFECT
   ========================= */
window.addEventListener("scroll", function() {
  var video = document.getElementById("bg-video");
  if (!video) return;
  var offset = window.pageYOffset * 0.25;
  video.style.transform = "scale(1.1) translateY(" + offset + "px)";
});

/* =========================
   GOLD TRAIL
   ========================= */
document.addEventListener("mousemove", function(e) {
  var dot = document.createElement("div");
  dot.className = "gold-trail-dot";
  dot.style.left = e.pageX + "px";
  dot.style.top = e.pageY + "px";
  document.body.appendChild(dot);
  setTimeout(function() {
    dot.remove();
  }, 800);
});

/* =========================
   FLOATING ICONS
   ========================= */
(function addFloatingIcons() {
  var icons = [
    { char: "★", top: "20%", left: "10%" },
    { char: "✦", top: "70%", right: "20%" },
    { char: "✧", top: "40%", left: "80%" }
  ];

  icons.forEach(function(ic) {
    var el = document.createElement("div");
    el.className = "floating-icon";
    el.textContent = ic.char;
    if (ic.top) el.style.top = ic.top;
    if (ic.left) el.style.left = ic.left;
    if (ic.right) el.style.right = ic.right;
    document.body.appendChild(el);
  });
})();

/* =========================
   DATA SPLITTING
   ========================= */
var emperorAds = adsDB.slice(0, 7);
var featuredAds = adsDB.filter(function(ad) { return ad.featured === true; });
var latestAds = adsDB
  .slice()
  .sort(function(a, b) {
    return new Date(b.date || 0) - new Date(a.date || 0);
  })
  .slice(0, 8);
var allAds = adsDB;

/* =========================
   EMPEROR SLIDER
   ========================= */
var slidesBox = document.getElementById("emperorSlides");
var dotsBox = document.getElementById("emperorDots");

if (slidesBox && dotsBox) {
  for (var i = 0; i < emperorAds.length; i++) {
    slidesBox.innerHTML +=
      '<div class="emperor-slide' + (i === 0 ? ' active' : '') + '">' +
      '<img src="' + emperorAds[i].image + '">' +
      '</div>';

    dotsBox.innerHTML +=
      '<span class="emperor-dot' + (i === 0 ? ' active' : '') +
      '" data-index="' + i + '"></span>';
  }
}

var current = 0;
var slides = document.getElementsByClassName("emperor-slide");
var dots = document.getElementsByClassName("emperor-dot");

function showSlide(index) {
  if (!slides.length) return;
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    slides[i].classList.remove("prev");
    if (dots[i]) dots[i].classList.remove("active");
  }
  slides[current].classList.add("prev");
  slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");
  current = index;
}

setInterval(function() {
  if (!slides.length) return;
  var next = (current + 1) % slides.length;
  showSlide(next);
}, 5000);

/* =========================
   RENDER FUNCTIONS
   ========================= */
function renderFeaturedRow() {
  var box = document.getElementById("featuredRow");
  if (!box) return;
  box.innerHTML = "";
  featuredAds.forEach(function(ad) {
    box.innerHTML +=
      '<div class="ad-card reveal">' +
      '<img class="ad-img" src="' + ad.image + '">' +
      '<div class="ad-title">' + ad.title + '</div>' +
      '<a class="ad-link" href="' + ad.link + '">عرض الإعلان</a>' +
      '</div>';
  });
}

function renderLatest() {
  var box = document.getElementById("latestGrid");
  if (!box) return;
  box.innerHTML = "";
  latestAds.forEach(function(ad) {
    box.innerHTML +=
      '<div class="ad-card reveal">' +
      '<img class="ad-img" src="' + ad.image + '">' +
      '<div class="ad-title">' + ad.title + '</div>' +
      '<a class="ad-link" href="' + ad.link + '">عرض الإعلان</a>' +
      '</div>';
  });
}

function renderAllAds() {
  var box = document.getElementById("allAdsGrid");
  if (!box) return;
  box.innerHTML = "";
  allAds.forEach(function(ad) {
    box.innerHTML +=
      '<div class="ad-card reveal">' +
      '<img class="ad-img" src="' + ad.image + '">' +
      '<div class="ad-title">' + ad.title + '</div>' +
      '<a class="ad-link" href="' + ad.link + '">عرض الإعلان</a>' +
      '</div>';
  });
}

/* =========================
   SCROLL REVEAL
   ========================= */
var revealItems = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealItems.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================
   BACK TO TOP
   ========================= */
var backTop = document.getElementById("backTop");

window.addEventListener("scroll", function() {
  if (!backTop) return;
  backTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

if (backTop) {
  backTop.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

/* =========================
   CINEMATIC INTRO
   ========================= */
window.addEventListener("load", function() {
  var intro = document.getElementById("introScreen");

  setTimeout(function() {
    if (intro) intro.style.opacity = "0";
  }, 1800);

  setTimeout(function() {
    if (intro) intro.style.display = "none";
  }, 3200);

  renderFeaturedRow();
  renderLatest();
  renderAllAds();
});
function renderRecommended() {
  const container = document.getElementById("recommendedGrid");
  if (!container || !window.internalAds) return;

  container.innerHTML = window.internalAds.map(ad => `
    <div class="recommended-card">
      <img src="${ad.image}" alt="${ad.title}">
      <div class="rec-content">
        <h3 class="rec-title">${ad.title}</h3>
        <p class="rec-desc">${ad.desc}</p>
        <a href="${ad.link}" class="rec-btn">عرض الإعلان</a>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderRecommended);
