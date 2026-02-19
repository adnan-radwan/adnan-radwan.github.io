// تحميل قاعدة بيانات الإعلانات
fetch("https://adnan-radwan.github.io/ad-view/adsDB.js")
  .then(() => {

    const container = document.getElementById("categoriesContainer");

    // المرور على كل تصنيف في categoriesDB
    categoriesDB.forEach(cat => {

      // جلب الإعلانات الخاصة بهذا التصنيف
      const ads = window.adsDB.filter(a => a.category === cat.slug);

      // تجاهل التصنيفات التي لا تحتوي إعلانات
      if (ads.length === 0) return;

      // بناء القسم
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
