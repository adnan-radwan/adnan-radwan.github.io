const categoryImages = {
  "cars": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  "realestate": "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "jobs": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "services": "https://images.unsplash.com/photo-1581091012184-5c7b1a3bb0c1",
  "electronics": "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9",
  "fashion": "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
  "beauty": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  "food": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "education": "https://images.unsplash.com/photo-1521791136064-7986c2920216",
  "health": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "decor": "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
  "shopping": "https://images.unsplash.com/photo-1542831371-d531d36971e6",
  "books": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "stationery": "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "school-supplies": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  "other": "https://images.unsplash.com/photo-1503602642458-232111445657"
};

const categoriesConfig = [
  { slug: "cars",           name: "سيارات" },
  { slug: "realestate",     name: "عقارات" },
  { slug: "jobs",           name: "وظائف" },
  { slug: "services",       name: "خدمات" },
  { slug: "electronics",    name: "إلكترونيات" },
  { slug: "fashion",        name: "أزياء" },
  { slug: "beauty",         name: "جمال" },
  { slug: "food",           name: "طعام" },
  { slug: "education",      name: "تعليم" },
  { slug: "health",         name: "صحة" },
  { slug: "decor",          name: "ديكور" },
  { slug: "shopping",       name: "تسوق" },
  { slug: "books",          name: "كتب" },
  { slug: "stationery",     name: "مكتبيات" },
  { slug: "school-supplies",name: "لوازم مدرسية" },
  { slug: "other",          name: "أخرى" }
];
function getGenericTitle(catSlug) {
  const titles = {
    "cars": [
      "سيارة سيدان اقتصادية",
      "سيارة دفع رباعي عائلية",
      "سيارة صغيرة مناسبة للمدينة",
      "سيارة مستعملة بحالة ممتازة",
      "سيارة فاخرة مريحة",
      "سيارة رياضية أنيقة"
    ],
    "realestate": [
      "شقة للإيجار في موقع مميز",
      "منزل عائلي واسع",
      "مكتب تجاري جاهز للاستخدام",
      "استوديو مفروش بالكامل",
      "شقة حديثة التشطيب",
      "محل تجاري على شارع رئيسي"
    ],
    "jobs": [
      "وظيفة خدمة عملاء",
      "فرصة عمل بدوام جزئي",
      "مطلوب موظف مبيعات",
      "وظيفة إدارية مناسبة للجميع",
      "وظيفة عن بعد",
      "فرصة تدريبية مميزة"
    ],
    "services": [
      "خدمة تنظيف منازل",
      "خدمة صيانة كهرباء",
      "خدمة نقل أثاث",
      "خدمة سباكة منزلية",
      "خدمة دهان منازل",
      "خدمة حدائق منزلية"
    ],
    "electronics": [
      "سماعات بلوتوث",
      "هاتف ذكي مستعمل",
      "شاشة تلفزيون عالية الدقة",
      "كاميرا مراقبة منزلية",
      "جهاز لوحي عملي",
      "كمبيوتر مكتبي للأعمال"
    ],
    "fashion": [
      "فستان سهرة أنيق",
      "حذاء رياضي مريح",
      "حقيبة يد نسائية",
      "ملابس أطفال جديدة",
      "بدلة رسمية رجالية",
      "عباءة أنيقة"
    ],
    "beauty": [
      "عطر فاخر",
      "كريم عناية بالبشرة",
      "أدوات مكياج أساسية",
      "مجموعة عناية بالشعر",
      "عطر يومي خفيف",
      "مجموعة عناية كاملة"
    ],
    "food": [
      "وجبة سريعة لذيذة",
      "حلويات طازجة",
      "قهوة عربية ممتازة",
      "منتجات غذائية متنوعة",
      "وجبات جاهزة يومية",
      "مخبوزات طازجة"
    ],
    "education": [
      "دورة لغة إنجليزية",
      "دورة تطوير الذات",
      "دورة برمجة للمبتدئين",
      "دورة تصميم جرافيك",
      "دورة مهارات القيادة",
      "دورة إدارة المشاريع"
    ],
    "health": [
      "ميزان ذكي",
      "مكملات غذائية",
      "جهاز بخار منزلي",
      "أدوات رياضية منزلية",
      "جهاز قياس ضغط الدم",
      "منتج صحي طبيعي"
    ],
    "decor": [
      "مزهرية ديكور",
      "لوحة فنية حائطية",
      "طاولة قهوة أنيقة",
      "إضاءة ديكور منزلية",
      "سجادة ديكور فاخرة",
      "كرسي ديكور مميز"
    ],
    "shopping": [
      "عروض تسوق متنوعة",
      "منتجات منزلية يومية",
      "أدوات مطبخ عملية",
      "مستلزمات منزلية متنوعة",
      "عروض خاصة محدودة",
      "منتجات مخفضة السعر"
    ],
    "books": [
      "كتاب تطوير الذات",
      "رواية مشوقة",
      "كتاب تعليمي مفيد",
      "كتاب للأطفال",
      "مجموعة كتب متنوعة",
      "كتاب في ريادة الأعمال"
    ],
    "stationery": [
      "أدوات مكتبية أساسية",
      "دفاتر ملاحظات",
      "أقلام متنوعة",
      "ملفات وأوراق",
      "مستلزمات مكتب كاملة",
      "منظم مكتب أنيق"
    ],
    "school-supplies": [
      "حقيبة مدرسية",
      "أدوات هندسية",
      "دفاتر مدرسية",
      "مستلزمات دراسة كاملة",
      "علبة ألوان مدرسية",
      "مجموعة أدوات مدرسية"
    ],
    "other": [
      "منتج متنوع",
      "عرض خاص",
      "قطعة فريدة",
      "منتج جديد",
      "عرض محدود",
      "منتج مميز"
    ]
  };

  const list = titles[catSlug] || ["منتج مميز"];
  return list[Math.floor(Math.random() * list.length)];
}

function getGenericDescription(catName) {
  return `منتج عملي ضمن فئة ${catName}، مناسب للاستخدام اليومي ويتميز بجودة جيدة. `
       + `خيار مناسب لمن يبحث عن منتج موثوق وسعر معقول.`;
}

function generateMockAds(countPerCategory = 30, startId = 1000) {
  const ads = [];
  let idCounter = startId;

  categoriesConfig.forEach(cat => {
    for (let i = 0; i < countPerCategory; i++) {

      const id = idCounter++;
      const month = ((i % 12) + 1).toString().padStart(2, "0");
      const day = ((i % 28) + 1).toString().padStart(2, "0");
      const expires = `2026-${month}-${day}`;

      ads.push({
        id,
        title: getGenericTitle(cat.slug),
        desc: getGenericDescription(cat.name),
        image: categoryImages[cat.slug],
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

  console.log("Generated ads:", ads);
  return ads;
}

// بعد تعريف categoryImages + categoriesConfig + الدوال
window.allAds = generateMockAds(30, 1000);

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
