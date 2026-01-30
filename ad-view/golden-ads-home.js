/* ================================
   GOLDEN ADS — INTERNAL SLIDER + RECOMMENDED
   Cinematic Edition — Adnan Radwan
================================== */

/* ================================
   1) SLIDER BUILDER
================================== */

function buildSlider() {
  const sliderContainer = document.getElementById("emperorSlides");
  const dotsContainer = document.getElementById("emperorDots");

  if (!sliderContainer || !window.internalAds) return;

  sliderContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  window.internalAds.forEach((ad, index) => {
    // Slide
    const slide = document.createElement("div");
    slide.className = "emperor-slide";
    slide.innerHTML = `
      <img src="${ad.image}" alt="${ad.title}">
      <div class="slide-content wide-box">
        <h3 class="slide-title">${ad.title}</h3>
        <p class="slide-desc">${ad.desc}</p>
        <a href="${ad.link}" class="slide-btn">عرض الإعلان</a>
      </div>
    `;
    sliderContainer.appendChild(slide);

    // Dot
    const dot = document.createElement("span");
    dot.className = "emperor-dot";
    dot.dataset.index = index;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  activateSlide(0);
  startAutoSlide();
}

let currentSlide = 0;
let autoSlideInterval = null;

function activateSlide(index) {
  const slides = document.querySelectorAll(".emperor-slide");
  const dots = document.querySelectorAll(".emperor-dot");

  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function goToSlide(index) {
  activateSlide(index);
  restartAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const next = (currentSlide + 1) % window.internalAds.length;
    activateSlide(next);
  }, 5000); // 5 seconds
}

function restartAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

/* ================================
   2) RECOMMENDED SECTION
================================== */

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

/* ================================
   3) INITIALIZE EVERYTHING
================================== */

document.addEventListener("DOMContentLoaded", () => {
  buildSlider();
  renderRecommended();
});
