# 🔥 دليل ربط الموقع بـ Firebase والنشر على Firebase Hosting

هذا الدليل يشرح **خطوة بخطوة** كيف تربط موقع "سوق دي زاد" بـ Firebase
لتفعيل: **تسجيل الدخول الحقيقي + نشر الإعلانات الحقيقي + قاعدة بيانات + تخزين الصور**،
ثم نشر الموقع على **Firebase Hosting**.

> 💡 قبل إضافة المفاتيح، يعمل الموقع في "وضع العرض التجريبي" ببيانات وهمية.
> بعد إضافة المفاتيح، يتحول تلقائياً إلى العمل الحقيقي.

---

## 📋 المتطلبات
- حساب Google (مجاني).
- Node.js مثبّت على جهازك.

---

## الخطوة 1️⃣ — إنشاء مشروع Firebase

1. اذهب إلى [console.firebase.google.com](https://console.firebase.google.com).
2. اضغط **Add project / إضافة مشروع**.
3. اكتب اسم المشروع (مثلاً `souk-dz`) ثم **Continue**.
4. يمكنك تعطيل Google Analytics (اختياري) ثم **Create project**.

---

## الخطوة 2️⃣ — إضافة تطبيق ويب والحصول على المفاتيح

1. داخل المشروع، اضغط على أيقونة الويب **`</>`**.
2. سجّل التطبيق باسم (مثلاً `souk-web`). **لا** تفعّل Firebase Hosting الآن (سنفعله لاحقاً).
3. ستظهر لك قطعة كود `firebaseConfig` تحتوي على المفاتيح. **انسخها**، مثال:

```js
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXX",
  authDomain: "souk-dz.firebaseapp.com",
  projectId: "souk-dz",
  storageBucket: "souk-dz.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcd1234"
};
```

4. في مجلد المشروع، انسخ ملف `.env.example` إلى `.env.local`:

```bash
cp .env.example .env.local
```

5. املأ `.env.local` بالقيم من `firebaseConfig`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=souk-dz.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=souk-dz
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=souk-dz.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcd1234
```

---

## الخطوة 3️⃣ — تفعيل المصادقة (Authentication)

1. من القائمة الجانبية: **Build → Authentication → Get started**.
2. تبويب **Sign-in method**.
3. فعّل:
   - **Email/Password** → Enable → Save.
   - **Google** (اختياري للدخول عبر جوجل) → Enable → اختر بريد الدعم → Save.

---

## الخطوة 4️⃣ — إنشاء قاعدة البيانات (Firestore)

1. من القائمة: **Build → Firestore Database → Create database**.
2. اختر موقعاً قريباً (مثل `eur3` أو أي موقع أوروبي).
3. ابدأ في **Production mode** (سنرفع قواعد الأمان لاحقاً).
4. اضغط **Enable**.

---

## الخطوة 5️⃣ — تفعيل التخزين (Storage) لرفع الصور

1. من القائمة: **Build → Storage → Get started**.
2. اقبل القواعد الافتراضية مؤقتاً → **Done**.
   (سنرفع قواعد الأمان المخصصة في الخطوة 7).

---

## الخطوة 6️⃣ — تثبيت أدوات Firebase وتسجيل الدخول

```bash
# تثبيت Firebase CLI عالمياً (مرة واحدة)
npm install -g firebase-tools

# تسجيل الدخول بحساب جوجل
firebase login
```

ثم اربط المشروع المحلي بمشروع Firebase الذي أنشأته:

```bash
# اعرض مشاريعك وانسخ Project ID
firebase projects:list

# عدّل ملف .firebaserc وضع Project ID الحقيقي مكان "your-project-id"
```

أو استخدم الأمر:
```bash
firebase use --add
```
واختر مشروعك.

---

## الخطوة 7️⃣ — رفع قواعد الأمان

المشروع يحتوي على ملفّي قواعد جاهزين: `firestore.rules` و `storage.rules`.
ارفعهما:

```bash
firebase deploy --only firestore:rules,storage
```

هذه القواعد تضمن:
- ✅ أي شخص يقرأ الإعلانات (عامة).
- ✅ فقط المستخدم المسجّل ينشر إعلاناً، وفقط صاحب الإعلان يحذفه/يعدّله.
- ✅ رفع الصور للمستخدم المسجّل فقط (وبحد أقصى 5 ميغابايت للصورة).

---

## الخطوة 8️⃣ — البناء والنشر على Firebase Hosting

```bash
# بناء النسخة الثابتة (تُنشأ في مجلد out/)
npm run build

# تفعيل Hosting أول مرة (إن طُلب منك، اختر "out" كمجلد عام
# و"Yes" لـ single-page app إذا سُئلت — لكن الإعداد جاهز في firebase.json)
firebase deploy --only hosting
```

أو ببساطة استخدم الأمر المختصر الذي يبني وينشر معاً:

```bash
npm run deploy
```

بعد انتهاء النشر سيظهر لك رابط الموقع المباشر، مثل:
```
✔ Hosting URL: https://souk-dz.web.app
```

🎉 **مبروك! موقعك الآن يعمل رسمياً على الإنترنت بمصادقة ونشر حقيقيين.**

---

## 🔁 ملخص أوامر النشر السريعة (للمرات القادمة)

| الأمر | الوظيفة |
|------|---------|
| `npm run dev` | تشغيل محلي للتطوير (http://localhost:3000) |
| `npm run build` | بناء النسخة الثابتة في `out/` |
| `npm run deploy` | بناء + نشر الموقع على Hosting |
| `npm run deploy:all` | نشر الموقع + قواعد الأمان معاً |
| `npm run deploy:rules` | نشر قواعد الأمان فقط |

---

## 🧪 (اختياري) إضافة إعلانات تجريبية للقاعدة

```bash
node scripts/seed.mjs
```
> ملاحظة: يتطلب تخفيف قواعد الكتابة مؤقتاً أو استخدام Admin SDK.
> الأفضل ببساطة: سجّل حساباً من الموقع وانشر إعلانات حقيقية.

---

## ❓ حل المشاكل الشائعة

| المشكلة | الحل |
|--------|------|
| يظهر شريط أصفر "وضع العرض التجريبي" | لم تُضف مفاتيح `.env.local` بشكل صحيح، أعد التحقق منها وأعد تشغيل `npm run dev` |
| `auth/operation-not-allowed` عند التسجيل | لم تفعّل Email/Password في تبويب Authentication |
| الصور لا تُرفع | تأكد أنك فعّلت Storage ورفعت `storage.rules` |
| `Missing or insufficient permissions` | ارفع قواعد Firestore: `firebase deploy --only firestore:rules` |
| صفحة الإعلان تظهر 404 بعد التحديث | تأكد أن `firebase.json` يحتوي على الـ rewrites (موجود مسبقاً) |

---

## 🔐 ملاحظة أمان مهمة

مفاتيح `NEXT_PUBLIC_FIREBASE_*` آمنة للعرض في المتصفح — هذا طبيعي في Firebase.
الحماية الحقيقية تأتي من **قواعد الأمان** (`firestore.rules` و `storage.rules`)
التي رفعناها في الخطوة 7. لا تشارك أبداً مفاتيح **Service Account** (Admin SDK) السرية.
