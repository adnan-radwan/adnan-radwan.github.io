// قراءة ID من الرابط
const params = new URLSearchParams(window.location.search);
const adId = Number(params.get("id"));

// عناصر الصفحة
const adImage = document.getElementById("adImage");
const adTitle = document.getElementById("adTitle");
const adDesc = document.getElementById("adDesc");
const newPrice = document.getElementById("newPrice");
const oldPrice = document.getElementById("oldPrice");
const countdown = document.getElementById("countdown");
const openLink = document.getElementById("openLink");
const copyLink = document.getElementById("copyLink");
const similarAdsBox = document.getElementById("similarAds");

// جلب الإعلان
const ad = window.ads.find(a => a.id === adId);

if (!ad) {
  adTitle.textContent = "الإعلان غير موجود";
} else {
  adImage.src = ad.image;
  adTitle.textContent = ad.title;
  adDesc.textContent = ad.desc;
  newPrice.textContent = ad.newPrice ? ad.newPrice + " ر.س" : "";
  oldPrice.textContent = ad.oldPrice ? ad.oldPrice + " ر.س" : "";

  openLink.onclick = () => window.open(ad.link, "_blank");

  copyLink.onclick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("تم نسخ رابط الإعلان");
  };

  startCountdown(ad.expires);
  loadSimilarAds(ad.category, ad.id);
}

// عداد انتهاء العرض
function startCountdown(dateStr) {
  const end = new Date(dateStr).getTime();

  setInterval(() => {
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) {
      countdown.textContent = "انتهى العرض";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    countdown.textContent = `${d} يوم — ${h} ساعة — ${m} دقيقة`;
  }, 1000);
}

// إعلانات مشابهة
function loadSimilarAds(category, currentId) {
  const list = window.ads
    .filter(a => a.category === category && a.id !== currentId)
    .slice(0, 6);

  similarAdsBox.innerHTML = list.map(ad => `
    <div class="similar-card" onclick="location.href='ad-view.html?id=${ad.id}'">
      <img src="${ad.image}">
      <div class="similar-card-title">${ad.title}</div>
    </div>
  `).join("");
}
