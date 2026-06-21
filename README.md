# RoodMix

موقع إعلانات مبوبة. مبني بـ **Next.js 14** + **Tailwind CSS** + **Firebase**، وجاهز للنشر على **Firebase Hosting**.

## التشغيل المحلي

```bash
npm install
npm run dev      # http://localhost:3000
```

## الإعداد والنشر على Firebase

اتبع الدليل الكامل خطوة بخطوة في [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md).

```bash
cp .env.example .env.local        # أضف مفاتيح Firebase
npm install -g firebase-tools
firebase login
firebase use --add                # اختر مشروعك
firebase deploy --only firestore:rules,storage
npm run deploy                    # next build + firebase deploy --only hosting
```

> قبل إضافة مفاتيح Firebase يعمل الموقع في "وضع العرض التجريبي" تلقائياً.
