// كلمة المرور (يمكنك تغييرها)
const DASHBOARD_PASSWORD = "adnan-gold";

// إعدادات Cloudinary
const CLOUD_NAME = "dm5yknnvi";
const UPLOAD_PRESET = "gold_upload";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// بيانات العمل
let data = [];
let filteredView = null;

// فحص كلمة المرور
function checkPassword() {
  const pass = document.getElementById("dashboardPassword").value;
  const errorBox = document.getElementById("loginError");

  if (pass === DASHBOARD_PASSWORD) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    initDashboard();
  } else {
    errorBox.textContent = "كلمة المرور غير صحيحة.";
  }
}

// تهيئة لوحة التحكم
function initDashboard() {
  if (!window.ads || !Array.isArray(ads)) {
    alert("لم يتم تحميل adsDB.js بشكل صحيح.");
    return;
  }
  data = JSON.parse(JSON.stringify(ads));

  renderStats();
  renderTable(data);
  renderJSON();
  prepareNewId();

  document.getElementById("modeSelect").addEventListener("change", onModeChange);

  // بحث فوري
  document.getElementById("searchBox").addEventListener("input", function() {
    const q = this.value.trim().toLowerCase();
    let list = [...data];
    if (q) {
      list = list.filter(ad =>
        (ad.title || "").toLowerCase().includes(q) ||
        (ad.desc || "").toLowerCase().includes(q) ||
        String(ad.id).includes(q)
      );
    }
    filteredView = list;
    renderTable(list);
  });

  // تحديث رابط المعاينة عند تغيير ID يدويًا
  const idField = document.getElementById("adId");
  if (idField) {
    idField.addEventListener("input", updatePreviewLink);
  }
}

// إحصائيات
function renderStats() {
  const now = new Date();
  const total = data.length;
  const featured = data.filter(a => a.featured).length;
  const active = data.filter(a => new Date(a.expires) > now).length;
  const expired = data.filter(a => new Date(a.expires) <= now).length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statFeatured").textContent = featured;
  document.getElementById("statActive").textContent = active;
  document.getElementById("statExpired").textContent = expired;
}

// جدول الإعلانات
function renderTable(list) {
  const tbody = document.getElementById("adsTableBody");
  const now = new Date();
  tbody.innerHTML = list.map(ad => {
    const end = new Date(ad.expires);
    const expired = !isNaN(end.getTime()) && end <= now;
    return `
      <tr data-id="${ad.id}">
        <td>${ad.id}</td>
        <td>${ad.title}</td>
        <td>${ad.category}</td>
        <td>${ad.featured ? '<span class="badge badge-featured">نعم</span>' : ''}</td>
        <td>${ad.expires || ''} ${expired ? '<span class="badge badge-expired">منتهٍ</span>' : ''}</td>
        <td>
          <button class="btn btn-edit" onclick="loadForEdit(${ad.id})">تعديل</button>
          <button class="btn btn-delete" onclick="deleteAd(${ad.id})">حذف</button>
        </td>
      </tr>
    `;
  }).join("");
}

// فلترة
function applyFilters() {
  const cat = document.getElementById("filterCategory").value;
  const feat = document.getElementById("filterFeatured").value;
  const status = document.getElementById("filterStatus").value;
  const now = new Date();

  let list = [...data];

  if (cat) list = list.filter(a => a.category === cat);
  if (feat) list = list.filter(a => String(a.featured) === feat);

  if (status === "active") {
    list = list.filter(a => new Date(a.expires) > now);
  } else if (status === "expired") {
    list = list.filter(a => new Date(a.expires) <= now);
  }

  filteredView = list;
  renderTable(list);
}

function clearFilters() {
  document.getElementById("filterCategory").value = "";
  document.getElementById("filterFeatured").value = "";
  document.getElementById("filterStatus").value = "";
  document.getElementById("searchBox").value = "";
  filteredView = null;
  renderTable(data);
}

// ID تسلسلي
function getNextId() {
  if (data.length === 0) return 1;
  const ids = data.map(a => a.id).filter(n => typeof n === "number");
  return Math.max(...ids) + 1;
}

function prepareNewId() {
  const mode = document.getElementById("modeSelect").value;
  if (mode === "add") {
    document.getElementById("adId").value = getNextId();
    updatePreviewLink();
  }
}

// تغيير وضع العمل
function onModeChange() {
  const mode = document.getElementById("modeSelect").value;
  if (mode === "add") {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("image").value = "";
    document.getElementById("link").value = "";
    document.getElementById("category").value = "electronics";
    document.getElementById("newPrice").value = "";
    document.getElementById("oldPrice").value = "";
    document.getElementById("expires").value = "";
    document.getElementById("featured").value = "false";
    document.getElementById("uploadStatus").textContent = "";
    document.getElementById("uploadStatus").className = "upload-status";
    clearRowHighlight();
    prepareNewId();
  }
}

// تحميل إعلان للتعديل
function loadForEdit(id) {
  const ad = data.find(a => a.id === id);
  if (!ad) return;

  document.getElementById("modeSelect").value = "edit";
  document.getElementById("adId").value = ad.id;
  document.getElementById("title").value = ad.title;
  document.getElementById("desc").value = ad.desc;
  document.getElementById("image").value = ad.image;
  document.getElementById("link").value = ad.link;
  document.getElementById("category").value = ad.category;
  document.getElementById("newPrice").value = ad.newPrice || "";
  document.getElementById("oldPrice").value = ad.oldPrice || "";
  document.getElementById("expires").value = ad.expires;
  document.getElementById("featured").value = ad.featured ? "true" : "false";

  document.getElementById("uploadStatus").textContent = "";
  document.getElementById("uploadStatus").className = "upload-status";

  updatePreviewLink();
  highlightRow(id);
}

// تمييز صف
function highlightRow(id) {
  clearRowHighlight();
  const row = document.querySelector(`#adsTableBody tr[data-id="${id}"]`);
  if (row) row.style.background = "rgba(212,175,55,0.18)";
}
function clearRowHighlight() {
  const rows = document.querySelectorAll("#adsTableBody tr");
  rows.forEach(r => r.style.background = "");
}

// حذف إعلان
function deleteAd(id) {
  if (!confirm("هل تريد حذف هذا الإعلان من النسخة الجديدة؟")) return;
  data = data.filter(a => a.id !== id);
  renderStats();
  renderTable(filteredView || data);
  renderJSON();
  prepareNewId();
}

// تطبيق التغييرات
function applyChanges() {
  const mode = document.getElementById("modeSelect").value;
  const id = Number(document.getElementById("adId").value);

  const obj = {
    id: id,
    title: document.getElementById("title").value.trim(),
    desc: document.getElementById("desc").value.trim(),
    image: document.getElementById("image").value.trim(),
    link: document.getElementById("link").value.trim(),
    category: document.getElementById("category").value,
    featured: document.getElementById("featured").value === "true",
    oldPrice: document.getElementById("oldPrice").value.trim() || null,
    newPrice: document.getElementById("newPrice").value.trim() || null,
    expires: document.getElementById("expires").value
  };

  if (!obj.title || !obj.desc || !obj.image || !obj.expires) {
    alert("الرجاء تعبئة الحقول الأساسية (العنوان، الوصف، الصورة، تاريخ الانتهاء).");
    return;
  }

  if (mode === "add") {
    if (data.some(a => a.id === id)) {
      alert("هذا ID مستخدم مسبقًا. قم بإعادة تحميل الصفحة أو استخدم وضع التعديل.");
      return;
    }
    data.push(obj);
  } else {
    const index = data.findIndex(a => a.id === id);
    if (index === -1) {
      alert("لم يتم العثور على الإعلان في النسخة الحالية.");
      return;
    }
    data[index] = obj;
  }

  renderStats();
  renderTable(filteredView || data);
  renderJSON();
  prepareNewId();
}

// إعادة ضبط النموذج
function resetForm() {
  document.getElementById("modeSelect").value = "add";
  onModeChange();
}

// إخراج JSON
function renderJSON() {
  const content = "window.ads = " + JSON.stringify(data, null, 2) + ";";
  document.getElementById("jsonOutput").textContent = content;
}

// نسخ ملف adsDB.js كامل
function copyFullJSON() {
  const text = "window.ads = " + JSON.stringify(data, null, 2) + ";";
  navigator.clipboard.writeText(text);
  alert("تم نسخ ملف adsDB.js كامل بنجاح.");
}

// تنزيل نسخة احتياطية JSON (مصفوفة فقط)
function downloadBackup() {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ads-backup.json";
  a.click();

  URL.revokeObjectURL(url);
}

// استيراد ودمج JSON
function importJSON() {
  const fileInput = document.getElementById("importFile");
  const status = document.getElementById("importStatus");

  if (!fileInput.files.length) {
    status.textContent = "الرجاء اختيار ملف JSON أولًا.";
    status.style.color = "#ff8080";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);

      if (!Array.isArray(imported)) {
        throw new Error("صيغة الملف غير صحيحة. يجب أن يحتوي على مصفوفة JSON.");
      }

      imported.forEach(ad => {
        const existing = data.find(a => a.id === ad.id);
        if (existing) {
          Object.assign(existing, ad);
        } else {
          data.push(ad);
        }
      });

      renderStats();
      renderTable(filteredView || data);
      renderJSON();
      prepareNewId();

      status.textContent = "تم الاستيراد والدمج بنجاح.";
      status.style.color = "#c0ffb3";

    } catch (err) {
      status.textContent = "فشل استيراد الملف. تأكد من صحة JSON.";
      status.style.color = "#ff8080";
    }
  };

  reader.readAsText(file);
}

// رابط المعاينة
function updatePreviewLink() {
  const id = document.getElementById("adId").value;
  const base = "/p/ad-view.html?id=";
  const url = base + encodeURIComponent(id);
  document.getElementById("previewLinkBox").innerHTML =
    id ? `رابط المعاينة المقترح: <a href="${url}" target="_blank">${url}</a>` : "";
}

/* رفع الصور عبر Cloudinary */
function triggerFileInput() {
  document.getElementById("imageFile").click();
}

async function uploadToCloudinary(event) {
  const file = event.target.files[0];
  const status = document.getElementById("uploadStatus");
  const imageInput = document.getElementById("image");

  if (!file) return;

  status.textContent = "جاري رفع الصورة إلى Cloudinary...";
  status.className = "upload-status";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("خطأ في الرفع");
    }

    const dataRes = await response.json();
    if (dataRes.secure_url) {
      imageInput.value = dataRes.secure_url;
      status.textContent = "تم رفع الصورة بنجاح وربطها بالإعلان.";
      status.className = "upload-status success";
    } else {
      throw new Error("لم يتم استلام الرابط");
    }
  } catch (err) {
    status.textContent = "فشل رفع الصورة. تحقق من إعدادات Cloudinary أو أعد المحاولة.";
    status.className = "upload-status error";
  }
}

    <div class="similar-card" onclick="location.href='ad-view.html?id=${ad.id}'">
      <img src="${ad.image}">
      <div class="similar-card-title">${ad.title}</div>
    </div>
  `).join("");
}
