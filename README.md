# مكتبة عدنان كمال رضوان

هذا المشروع يحتوي على جميع مؤلفات الكاتب عدنان كمال رضوان، مصممة باستخدام HTML وCSS، مع دعم اللغة العربية، الصوتيات، وروابط الشراء من Lulu.

## 📁 هيكل المشروع
📂 root/ │ ├── index.html ← الصفحة الرئيسية لجميع الكتب ├── about.html ← صفحة السيرة الذاتية ├── style.css ← ملف التنسيق الموحد │ ├── 📂 books/ ← صفحات الكتب الفردية │ ├── self-mastery.html │ ├── novel-thoughts.html │ ├── letters-east-21.html │ ├── letters-east-23.html │ ├── ghost-of-rare.html │ ├── harouf.html │ └── mals.html │ ├── 📂 images/ ← صور الأغلفة وصورتك الشخصية │ └── adnan.jpg │ └── 📂 media/ ← ملف الصوت الخاص بالسيرة الذاتية └── adnan-bio.mp3


## 🚀 طريقة النشر على GitHub Pages

1. **أنشئ مستودع GitHub جديد** باسم: `adnan-radwan.github.io`
2. **ارفع جميع الملفات** من هذا المشروع إلى المستودع (بما في ذلك `index.html`, `style.css`, المجلدات `books`, `images`, `media`)
3. **تأكد أن الصفحة الرئيسية هي `index.html`** في جذر المشروع.
4. **اذهب إلى إعدادات المستودع → Pages**
   - اختر الفرع: `main`
   - اختر المسار: `/ (root)`
   - اضغط "Save"
5. خلال ثوانٍ، سيكون موقعك متاحًا على:  
   👉 https://adnan-radwan.github.io/

## ✍️ ملاحظات

- يمكنك تعديل أي صفحة كتاب داخل مجلد `books/` لتحديث المحتوى أو إضافة كتب جديدة.
- لتغيير صورة الكاتب أو الصوت، استبدل الملفات داخل `images/` و`media/`.
- التصميم متجاوب ويدعم اللغة العربية بالكامل.

---

هل ترغب أن أرسل لك أيضًا نسخة من هذا الملف بصيغة `.md` لتضعه داخل المستودع؟📂 adnan-radwan.github.io/
│
├── index.html                ← الصفحة الرئيسية لجميع الكتب
├── about.html                ← صفحة السيرة الذاتية
├── style.css                 ← ملف التنسيق الموحد
│
├── 📂 books/                 ← صفحات الكتب الفردية
│   ├── self-mastery.html
│   ├── novel-thoughts.html
│   ├── letters-east-21.html
│   ├── letters-east-23.html
│   ├── ghost-of-rare.html
│   ├── harouf.html
│   └── mals.html
│
├── 📂 images/                ← صور الأغلفة وصورتك الشخصية
│   └── adnan.jpg
│
└── 📂 media/                 ← ملف الصوت الخاص بالسيرة الذاتية
    └── adnan-bio.mp3

cd path/to/adnan-radwan.github.io
git init
git remote add origin https://github.com/adnan-radwan/adnan-radwan.github.io.git
git add .
git commit -m "إطلاق الموقع"
git push -u origin master



