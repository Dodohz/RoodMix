/**
 * سكربت اختياري لإضافة إعلانات تجريبية إلى Firestore.
 *
 * الاستخدام:
 *   1) تأكد من وجود ملف .env.local بمفاتيح Firebase.
 *   2) شغّل: node scripts/seed.mjs
 *
 * ملاحظة: قواعد الأمان تمنع الكتابة بدون تسجيل دخول. لتشغيل هذا السكربت
 * إمّا:
 *   (أ) فعّل مؤقتاً قاعدة كتابة مفتوحة، أو
 *   (ب) استخدم Firebase Admin SDK (موصى به للإنتاج).
 *
 * هذا السكربت يستخدم الـ Web SDK للتبسيط.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { readFileSync } from "node:fs";

// تحميل المتغيرات من .env.local يدوياً
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error("⚠️  لم يتم العثور على .env.local");
  process.exit(1);
}

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});

const db = getFirestore(app);

const samples = [
  {
    title: "Volkswagen Golf 7 - 2018 ديزل أوتوماتيك",
    description: "سيارة في حالة ممتازة، صيانة دورية، أول مالك.",
    price: 4500000,
    category: "vehicules",
    condition: "occasion",
    conditionLabel: "مستعملة",
    wilaya: "الجزائر",
    images: ["https://picsum.photos/seed/golf7/800/600"],
    featured: true,
    delivery: false,
    views: 0,
    seller: {
      uid: "seed-user",
      name: "بائع تجريبي",
      avatar:
        "https://ui-avatars.com/api/?name=Seed&background=e81111&color=fff",
      type: "particulier",
      phone: "0550 12 34 56",
      memberSince: "2025",
    },
  },
  {
    title: "iPhone 15 Pro Max 256GB - جديد مختوم",
    description: "هاتف جديد بالكرتونة مختوم، ضمان عام.",
    price: 320000,
    category: "telephones",
    condition: "neuf",
    conditionLabel: "جديد",
    wilaya: "وهران",
    images: ["https://picsum.photos/seed/iphone15/800/600"],
    featured: true,
    delivery: true,
    views: 0,
    seller: {
      uid: "seed-user",
      name: "بائع تجريبي",
      avatar:
        "https://ui-avatars.com/api/?name=Seed&background=e81111&color=fff",
      type: "professionnel",
      phone: "0770 11 22 33",
      memberSince: "2025",
    },
  },
];

async function run() {
  console.log("🚀 جارٍ إضافة الإعلانات التجريبية...");
  for (const s of samples) {
    const ref = await addDoc(collection(db, "listings"), {
      ...s,
      createdAt: serverTimestamp(),
    });
    console.log("  ✅ أُضيف:", s.title, "→", ref.id);
  }
  console.log("🎉 تم!");
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ خطأ:", e.message);
  process.exit(1);
});
