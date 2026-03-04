/* ===========================================
   GOLDEN ADS — Mock Data Generator (30 per category)
   Arabic + English — 2026
=========================================== */

function generateMockAds(countPerCategory = 30) {

  const categories = [
    { slug: "electronics", name: "إلكترونيات", imageTag: "electronics" },
    { slug: "cars", name: "سيارات", imageTag: "car" },
    { slug: "services", name: "خدمات", imageTag: "service" },
    { slug: "education", name: "تعليم", imageTag: "education" },
    { slug: "health", name: "صحة", imageTag: "health" },
    { slug: "luxury-decor", name: "ديكور فاخر – Luxury Decor", imageTag: "luxury decor" }
  ];

  const ads = [];
  let idCounter = 1000;

  categories.forEach(cat => {
    for (let i = 1; i <= countPerCategory; i++) {

      const id = idCounter++;
      const expires = `2026-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`;

      ads.push({
        id,
        title: `${cat.name} — منتج رقم ${i}`,
        desc: `وصف مختصر لمنتج رقم ${i} ضمن فئة ${cat.name}.`,
        image: `https://source.unsplash.com/random/400x400?${cat.imageTag}&sig=${id}`,
        link: `/p/ad${id}.html`,
        category: cat.slug,
        featured: i % 7 === 0,
        status: "active",
        expires,
        oldPrice: 0,
        newPrice: 0,
        currency: "$",
        tags: [cat.slug, "gold", "premium"],
        badge: "gold"
      });
    }
  });

  console.log("Generated Ads:", ads);
  return ads;
}

/* Example usage:
   const mockAds = generateMockAds(30);
   window.allAds = mockAds;
*/
