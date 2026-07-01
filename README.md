# RoodMix 🛒
**منصة إعلانات مبوبة احترافية عربية | Professional Classifieds Platform**

---

## 📋 نظرة سريعة | Quick Overview

| الميزة | التفاصيل |
|--------|----------|
| 🏗️ **البنية** | Next.js 14 + TypeScript + Tailwind CSS |
| 🔐 **المصادقة** | Firebase Auth (Email/Password + Google OAuth) |
| 🗄️ **قاعدة البيانات** | Cloud Firestore |
| 💾 **التخزين** | Firebase Storage (للصور) |
| 🚀 **الاستضافة** | Firebase Hosting (Static Export) |
| 🌍 **اللغة** | عربي RTL كامل |
| 🎨 **التصميم** | Responsive + Tailwind Components |

---

## 🚀 البدء السريع | Quick Start

### المتطلبات
```bash
node >= 18
npm >= 9
```

### التثبيت
```bash
git clone https://github.com/Dodohz/RoodMix.git
cd RoodMix
npm install
cp .env.example .env.local
npm run dev  # http://localhost:3000
```

### الربط بـ Firebase
اتبع **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** بالكامل خطوة بخطوة.

```bash
# بعد إكمال الخطوات:
firebase deploy --only firestore:rules,storage
npm run deploy  # build + host على Firebase
```

---

## 📁 هيكل المشروع

```
src/
├── app/                    # Next.js Pages (App Router)
│   ├── page.tsx           # الصفحة الرئيسية
│   ├── annonce/           # عرض إعلان واحد
│   ├── annonces/          # تصفح الإعلانات
│   ├── categorie/[slug]/  # حسب الفئة
│   ├── dashboard/         # لوحة التحكم (محمية)
│   ├── publier/           # نشر إعلان جديد
│   ├── login/register/    # المصادقة
│   └── globals.css        # التنسيقات العامة
│
├── components/            # React Components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── AuthForm.tsx
│   ├── PublishForm.tsx
│   ├── BrowseListings.tsx
│   └── ...
│
├── lib/                   # Utilities & Services
│   ├── firebase.ts        # إعدادات Firebase
│   ├── auth.ts            # وظائف المصادقة
│   ├── listings-service.ts # CRUD للإعلانات
│   ├── types.ts           # TypeScript Interfaces
│   ├── categories.ts      # البيانات الثابتة
│   └── utils.ts           # دوال مساعدة
│
└── context/              # React Context
    └── AuthContext.tsx   # إدارة المستخدم
```

---

## ✨ الميزات الرئيسية

### 🔐 المصادقة
- ✅ تسجيل بريد إلكتروني وكلمة مرور
- ✅ تسجيل دخول عبر Google
- ✅ ملفات مستخدم شاملة (الاسم، الموقع، الهاتف، النوع)

### 📢 نشر الإعلانات
- ✅ اختيار من الفئات المعرّفة مسبقاً
- ✅ رفع صور متعددة
- ✅ تحديد السعر والحالة والموقع
- ✅ تفاصيل إضافية حسب الفئة

### 🔍 البحث والتصفية
- ✅ بحث فوري حسب الكلمات المفتاحية
- ✅ فلترة حسب الفئة والولاية والسعر
- ✅ ترتيب (أحدث، السعر، المشاهدات)
- ✅ عرض الشبكة/القائمة

### 👤 لوحة التحكم
- ✅ عرض الإعلانات الخاصة بالمستخدم
- ✅ حذف/تعديل الإعلانات
- ✅ إحصائيات (المشاهدات، الرسائل)
- ✅ ملف المستخدم

### 🎨 التصميم
- ✅ Tailwind CSS بالكامل
- ✅ وضع مظلم/فاتح (جاهز للتوسع)
- ✅ Icons من Lucide React
- ✅ RTL عربي كامل

---

## 🛡️ الأمان

### قواعس Firestore (`firestore.rules`)
```rules
- القراءة العامة للإعلانات
- الكتابة فقط للمسجلين
- كل مستخدم يدير إعلاناته فقط
- منع التزوير عبر التحقق من الـ UID
```

### قواعس Storage (`storage.rules`)
```rules
- الوصول للصور عام (قراءة)
- الرفع للمسجلين فقط
- حد أقصى 5MB لكل صورة
- مسح تلقائي بعد 30 يوم
```

---

## 🔧 أوامر المشروع

```bash
# التطوير
npm run dev              # تشغيل محلي :3000

# البناء والنشر
npm run build            # بناء Static Export
npm run deploy           # build + Firebase deploy
npm run deploy:all       # deploy كل شيء (hosting + rules)
npm run deploy:rules     # قواعس الأمان فقط

# البيانات التجريبية (اختياري)
node scripts/seed.mjs    # إضافة إعلانات تجريبية
```

---

## 📖 الدلائل المفصلة

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** — إعداد Firebase خطوة بخطوة
- **[.github/CONTRIBUTING.md](./.github/CONTRIBUTING.md)** — إرشادات المساهمة
- **[.github/CHANGELOG.md](./.github/CHANGELOG.md)** — سجل التحديثات

---

## 🎯 حالة المشروع

| العنصر | الحالة |
|--------|--------|
| البناء | ✅ نجح |
| صفحات | ✅ 24 صفحة ثابتة |
| المصادقة | ✅ جاهزة |
| Firestore | ✅ قواعس مفعلة |
| Firebase Hosting | ✅ جاهز للنشر |
| التوثيق | ✅ كاملة بالعربية |

---

## 🚨 الأخطاء الشائعة

| المشكلة | الحل |
|--------|------|
| `auth/operation-not-allowed` | فعّل Email/Password في Firebase Console |
| الصور لا تُرفع | تأكد من تفعيل Storage والقواعس |
| `Missing permissions` | رفع `firestore.rules` و `storage.rules` |
| بيانات وهمية فقط | أضف مفاتيح `.env.local` من Firebase |

---

## 📱 متوافق مع

- ✅ Chrome/Firefox/Safari
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ الشاشات الصغيرة (mobile-first)

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر. استخدمه بحرية!

---

## 💬 الدعم

وجدت مشكلة؟
1. راجع **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**
2. تحقق من **[الأخطاء الشائعة](#-الأخطاء-الشائعة)**
3. افتح Issue إذا لم تجد الحل

---

**تم البناء بـ ❤️ من Dodohz**
